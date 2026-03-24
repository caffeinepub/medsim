import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  HelpCircle,
  Pill,
  Search,
  Send,
  Sparkles,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AdminAlert, Disease, PatientData } from "../backend.d";
import {
  useAllDiseases,
  useCreateAIEscalationAlert,
  useGetAIDiagnosis,
} from "../hooks/useQueries";
import { generateResponse, searchDiseases } from "../lib/aiSearch";

// ─── Types ────────────────────────────────────────────────────────

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  responseType?:
    | "disease_info"
    | "comparison"
    | "symptom_match"
    | "no_match"
    | "backend"
    | "icmr_protocol"
    | "dose_warning";
  diseases?: Disease[];
  intent?: string;
  reasoning?: string;
  probability?: number;
  escalated?: boolean;
  timestamp: number;
  icmrProtocol?: {
    title: string;
    overview: string;
    firstLine: string[];
    differentiatingFeature: string;
    pearlPoints: string[];
  };
  doseWarning?: string;
}

// ─── ICMR Protocols ───────────────────────────────────────────────

const ICMR_PROTOCOLS: Record<
  string,
  {
    title: string;
    overview: string;
    firstLine: string[];
    differentiatingFeature: string;
    pearlPoints: string[];
    keywords: string[];
  }
> = {
  anaphylaxis: {
    title: "Anaphylaxis",
    overview:
      "Life-threatening systemic hypersensitivity reaction. Immediate recognition and treatment is critical.",
    firstLine: [
      "Adrenaline (Epinephrine) 0.5mg IM (1:1,000) in anterolateral thigh — FIRST LINE",
      "Position: Supine with legs elevated (or recovery position if vomiting)",
      "Oxygen 10-15 L/min via non-rebreather mask",
      "IV access: Normal Saline 1-2L rapid bolus if hypotensive",
      "Chlorpheniramine 10mg IV + Hydrocortisone 200mg IV (adjuncts only, NOT first-line)",
      "If no improvement in 5 min: repeat Adrenaline 0.5mg IM",
    ],
    differentiatingFeature:
      "Differentiating Feature: Biphasic reaction occurs in 20% of cases, 1-72 hours after initial response. Patient must be observed for minimum 6 hours.",
    pearlPoints: [
      "Adrenaline dose is 1:1,000 IM — NEVER give 1:1,000 IV (cardiac arrest risk). IV route only with 1:10,000 solution.",
      "Antihistamines treat urticaria but do NOT reverse anaphylaxis — adrenaline is the only life-saving drug.",
      "H2 blockers (Ranitidine/Famotidine) + H1 blockers together are more effective than H1 alone.",
      "NEET PG High-Yield: Most common cause in India — drugs (penicillin, NSAIDs), followed by insect stings.",
      "Serum tryptase peaks at 60-90 min post-reaction — useful for confirmation.",
    ],
    keywords: [
      "anaphylaxis",
      "anaphylactic",
      "allergic reaction",
      "epinephrine",
      "adrenaline allergy",
    ],
  },
  sepsis: {
    title: "Sepsis / Septic Shock",
    overview:
      "Life-threatening organ dysfunction caused by dysregulated host response to infection. Septic shock = Sepsis + vasopressor requirement + lactate >2 mmol/L despite adequate fluid.",
    firstLine: [
      "Sepsis Bundle (within 1 hour — 'Hour-1 Bundle'):",
      "1. Blood cultures x2 BEFORE antibiotics",
      "2. Broad-spectrum antibiotics within 1 hour: Piperacillin-Tazobactam 4.5g IV 8-hourly",
      "3. Lactate measurement — if >4 mmol/L: aggressive resuscitation",
      "4. IV fluids: Crystalloid (Normal Saline/Lactated Ringer) 30 mL/kg over 3 hours",
      "5. Vasopressors if MAP <65 despite fluids: Noradrenaline 0.1-0.3 mcg/kg/min (first-line)",
      "6. Hydrocortisone 200mg/day IV only if refractory shock",
    ],
    differentiatingFeature:
      "Differentiating Feature (Sepsis vs SIRS): SOFA score ≥2 confirms sepsis. qSOFA (bedside): RR ≥22, altered mentation, SBP ≤100 — 2 of 3 = high risk.",
    pearlPoints: [
      "NEET PG: Surviving Sepsis Campaign (SSC) 2021 — 'Hour-1 Bundle' replaced the older 3-hour and 6-hour bundles.",
      "Noradrenaline is first-line vasopressor; Dopamine is no longer recommended as first-line.",
      "Procalcitonin is the best marker for bacterial infection and guide for antibiotic de-escalation.",
      "Blood cultures must be drawn BEFORE antibiotics — drawing after reduces yield by 40%.",
      "Lactate-guided resuscitation: target lactate clearance ≥10% every 2 hours.",
    ],
    keywords: [
      "sepsis",
      "septic shock",
      "bacteremia",
      "sirs",
      "infection shock",
    ],
  },
  acs: {
    title: "Acute Coronary Syndrome (ACS) / STEMI",
    overview:
      "Spectrum of conditions: STEMI, NSTEMI, Unstable Angina. Time is myocardium — rapid diagnosis and reperfusion is essential.",
    firstLine: [
      "MONA protocol (initial stabilization):",
      "Morphine 2-4mg IV for pain (if not contraindicated)",
      "Oxygen only if SpO2 <94% — routine O2 is NOT recommended",
      "Nitrates: Sorbitrate 5mg SL (contraindicated if hypotensive, RV infarct, or sildenafil use)",
      "Aspirin 325mg (loading) + Clopidogrel 300mg (loading) — DAPT",
      "STEMI: Primary PCI within 90 min (door-to-balloon) OR Streptokinase 1.5 MU IV if PCI unavailable",
      "Heparin: UFH 60 U/kg IV bolus + infusion for anticoagulation",
      "Beta-blocker (Metoprolol 25-50mg PO) within 24h if no contraindications",
    ],
    differentiatingFeature:
      "Differentiating Feature: STEMI vs NSTEMI — ST elevation ≥1mm in ≥2 contiguous leads (or LBBB). Posterior MI: ST depression V1-V3 + tall R wave = posterior STEMI (do posterior leads V7-V9).",
    pearlPoints: [
      "NEET PG: Sgarbossa criteria for STEMI in LBBB: concordant ST elevation ≥1mm is most specific.",
      "RV Infarction (inferior STEMI): ST elevation in V4R. Avoid nitrates and diuretics — preload dependent.",
      "Wellens syndrome: biphasic/deep T-wave inversion in V2-V3 — proximal LAD stenosis, high-risk for massive MI.",
      "Time targets: Door-to-ECG <10 min, Door-to-balloon <90 min, Door-to-needle (thrombolysis) <30 min.",
      "Troponin I/T: rises at 3-6h, peaks at 12-24h, returns to normal in 7-10 days (useful for reinfarction detection).",
    ],
    keywords: [
      "acs",
      "stemi",
      "nstemi",
      "acute coronary",
      "heart attack",
      "myocardial infarction",
      "mi",
      "chest pain",
    ],
  },
  stroke: {
    title: "Acute Ischemic Stroke",
    overview:
      "Medical emergency — 'time is brain'. Every minute of delay = 1.9 million neurons lost. Rapid assessment and reperfusion therapy is the priority.",
    firstLine: [
      "FAST assessment: Face drooping, Arm weakness, Speech difficulty, Time to call",
      "CT brain WITHOUT contrast immediately — to exclude hemorrhage before thrombolysis",
      "If ischemic + within 4.5 hours: IV Alteplase (tPA) 0.9 mg/kg (max 90mg) — 10% as bolus, 90% over 60 min",
      "Blood pressure: maintain <185/110 mmHg before tPA; <180/105 after",
      "Aspirin 300mg PO/NG within 24-48 hours (NOT within 24h of tPA)",
      "Mechanical thrombectomy: up to 24 hours for large vessel occlusion (LVO)",
      "Avoid glucose infusion (hyperglycemia worsens outcome)",
      "Maintain normoglycemia (target 7.7-10 mmol/L)",
    ],
    differentiatingFeature:
      "Differentiating Feature — Stroke Mimics: Todd's paralysis (post-seizure), hypoglycemia, hemiplegic migraine, subdural hematoma. Always check blood glucose before diagnosing stroke.",
    pearlPoints: [
      "NEET PG: NIHSS (NIH Stroke Scale) — score >25 is very severe; tPA contraindicated if NIHSS <4 (minor stroke).",
      "CT shows ischemic changes only after 6-24h; MRI DWI shows infarct within minutes.",
      "Cardioembolic stroke (AF, valvular): anticoagulate with warfarin/NOAC after 2 weeks (not acutely).",
      "WAKE-UP stroke: unknown onset — MRI mismatch DWI/FLAIR can guide tPA decision.",
      "Posterior circulation (vertebrobasilar) stroke: vertigo, ataxia, diplopia, dysphagia — often missed initially.",
    ],
    keywords: [
      "stroke",
      "tpa",
      "alteplase",
      "ischemic stroke",
      "brain attack",
      "cerebral infarction",
      "tia",
      "hemiplegia",
    ],
  },
  tb: {
    title: "Tuberculosis (TB) — NTEP Protocols",
    overview:
      "India accounts for 26% of global TB burden. NTEP (National TB Elimination Programme) uses standardized treatment regimens. Drug-resistant TB requires special regimens.",
    firstLine: [
      "Presumptive TB: CBNAAT (Xpert MTB/RIF) from sputum — test of choice (detects rifampicin resistance)",
      "Category 1 TB (new cases): 2HRZE + 4HR",
      "  Intensive Phase (2 months): Isoniazid (H) + Rifampicin (R) + Pyrazinamide (Z) + Ethambutol (E) daily",
      "  Continuation Phase (4 months): Isoniazid + Rifampicin daily",
      "Drug doses (weight-based): H=5mg/kg, R=10mg/kg, Z=25mg/kg, E=15mg/kg",
      "Fixed-dose combinations (FDCs): Akurit-4 (intensive), Akurit-2 (continuation)",
      "Pyridoxine (Vitamin B6) 10mg/day with INH to prevent peripheral neuropathy",
      "DR-TB: BPaL regimen (Bedaquiline + Pretomanid + Linezolid) — new WHO 2022 protocol",
    ],
    differentiatingFeature:
      "Differentiating Feature: Primary Complex (Ghon's focus + Ghon's complex) — Ranke complex is Ghon's complex that has calcified. High-yield NEET PG question.",
    pearlPoints: [
      "NEET PG: Isoniazid side effects — hepatotoxicity (most common), peripheral neuropathy (prevented by B6), lupus-like syndrome, pellagra.",
      "Rifampicin: red-orange discoloration of urine/secretions is harmless — warn patients. It is a potent enzyme inducer (CYP450).",
      "Ethambutol: optic neuritis — check visual acuity before and monthly during treatment.",
      "Paradoxical reaction: worsening of symptoms after starting ATT — due to immune reconstitution.",
      "Nikshay Poshan Yojana: ₹500/month nutritional support for all TB patients under NTEP.",
    ],
    keywords: [
      "tuberculosis",
      "tb",
      "ntep",
      "rntcp",
      "isoniazid",
      "rifampicin",
      "mycobacterium",
      "Koch's",
    ],
  },
  malaria: {
    title: "Malaria — NVBDCP Protocols",
    overview:
      "India has both P. vivax (most common) and P. falciparum (most dangerous). Falciparum malaria can cause severe/cerebral malaria with mortality >20% if untreated.",
    firstLine: [
      "Diagnosis: Peripheral blood smear (gold standard) + Rapid Diagnostic Test (RDT)",
      "P. vivax: Chloroquine 25mg/kg over 3 days + Primaquine 0.25mg/kg/day for 14 days (check G6PD status first)",
      "P. falciparum (uncomplicated): Artemether-Lumefantrine (AL) — 6-dose regimen over 3 days",
      "P. falciparum (severe/cerebral): IV Artesunate 2.4 mg/kg at 0, 12, 24h then daily x3 days",
      "Cerebral malaria: IV Artesunate + Dexamethasone (controversial — do NOT use routinely)",
      "Supportive: antipyretics (Paracetamol 650mg), IV fluids for dehydration, blood transfusion if Hb <7g/dL",
    ],
    differentiatingFeature:
      "Differentiating Feature: Quartan fever (P. malariae — every 72h), Tertian fever (P. vivax/P. ovale — every 48h), Quotidian (P. falciparum — daily or irregular). Schüffner's dots: P. vivax/P. ovale. Maurer's clefts: P. falciparum.",
    pearlPoints: [
      "NEET PG: G6PD deficiency is a contraindication to Primaquine (causes hemolysis). Check before prescribing.",
      "Blackwater fever: massive intravascular hemolysis with hemoglobinuria in P. falciparum — associated with quinine use.",
      "Splenomegaly index (Hackett's grading): used to measure malaria endemicity in communities.",
      "Banana-shaped/crescent gametocytes are pathognomonic for P. falciparum.",
      "Artemisinin resistance has emerged in Southeast Asia — monitor for treatment failure.",
    ],
    keywords: [
      "malaria",
      "falciparum",
      "vivax",
      "plasmodium",
      "fever",
      "chills",
      "rigor",
      "cerebral malaria",
    ],
  },
  dengue: {
    title: "Dengue Fever",
    overview:
      "Dengue virus (DENV 1-4) transmitted by Aedes aegypti. Three phases: febrile (1-3 days), critical (3-7 days, plasma leak), recovery (7-10 days). Most deaths occur during critical phase.",
    firstLine: [
      "Diagnosis: NS1 Ag (days 1-5), IgM ELISA (from day 5), CBC for thrombocytopenia",
      "Dengue without warning signs: Oral rehydration, Paracetamol 650mg for fever (NOT aspirin/NSAIDs — risk of bleeding)",
      "Dengue with warning signs (platelet <100,000 or rapid drop): Hospital admission",
      "IV fluid: NS/RL at maintenance rate; increase if HCT rises >20%",
      "Dengue Shock Syndrome: IV fluid bolus NS 10-20 mL/kg over 15-30 min; repeat",
      "Platelet transfusion: ONLY if <10,000 without bleeding, or <20,000 with significant bleeding",
      "NO steroids, NO prophylactic platelet transfusion, NO aspirin",
    ],
    differentiatingFeature:
      "Differentiating Feature: Leukopenia (WBC <5,000) + thrombocytopenia + positive tourniquet test (Rumpel-Leede) = classic dengue triad. Platelet count <20,000 = dengue hemorrhagic fever Grade III-IV.",
    pearlPoints: [
      "NEET PG: Saddleback fever pattern — temperature drops briefly on day 3-4 then rises again (the 'break-bone fever').",
      "Warning signs: abdominal pain, persistent vomiting, mucosal bleeding, lethargy, liver enlargement, rapid increase in HCT with rapid fall in platelets.",
      "Dengue Hemorrhagic Fever criteria: fever + hemorrhagic tendency + thrombocytopenia ≤100,000 + evidence of plasma leakage.",
      "Paracetamol is the ONLY safe antipyretic — NSAIDs/aspirin worsen thrombocytopenia and increase bleeding risk.",
      "Recovery phase paradox: reabsorption of leaked plasma can cause fluid overload — reduce IV fluids.",
    ],
    keywords: [
      "dengue",
      "dengue fever",
      "dhf",
      "dengue hemorrhagic",
      "aedes",
      "thrombocytopenia dengue",
    ],
  },
  pneumonia: {
    title: "Community-Acquired Pneumonia (CAP)",
    overview:
      "CAP is a leading cause of mortality in India. Streptococcus pneumoniae is the most common pathogen. CURB-65 score guides severity assessment and admission decisions.",
    firstLine: [
      "CURB-65 score (1 point each): Confusion, Urea >7mmol/L, RR ≥30, BP <90/60, Age ≥65",
      "Score 0-1 (mild, treat at home): Amoxicillin 500mg PO TDS x5 days",
      "Score 2 (moderate, hospital): Amoxicillin-Clavulanate 625mg PO TDS + Azithromycin 500mg OD",
      "Score 3-5 (severe, ICU): IV Co-Amoxiclav 1.2g TDS + IV Azithromycin 500mg OD",
      "Atypical pneumonia (Mycoplasma/Chlamydia/Legionella): Azithromycin 500mg OD or Doxycycline 100mg BD",
      "Hospital-Acquired Pneumonia (HAP): Piperacillin-Tazobactam 4.5g IV TDS",
      "Oxygen: target SpO2 >94% (>88% in COPD patients)",
    ],
    differentiatingFeature:
      "Differentiating Feature: Lobar consolidation = Pneumococcal. Interstitial pattern = Atypical (Mycoplasma/Viral). Cavitation = Staphylococcal/TB/Klebsiella. Klebsiella: 'bulging fissure sign' on CXR, currant jelly sputum.",
    pearlPoints: [
      "NEET PG: Pneumococcal vaccine (PCV13 + PPSV23) recommended for adults ≥65 and immunocompromised.",
      "Legionella pneumophila: associated with air conditioners/cooling towers, hyponatremia (Na<130), elevated LFTs, non-responsive to beta-lactams.",
      "PSI/PORT score is more accurate than CURB-65 but complex — CURB-65 used in clinical practice.",
      "Aspiration pneumonia: anaerobes, typically in right lower/middle lobe, foul-smelling sputum, often in alcoholics or post-seizure patients.",
      "Empyema criteria (Light's criteria for exudate): protein >3g/dL, LDH >200, pleural:serum LDH >0.6.",
    ],
    keywords: [
      "pneumonia",
      "cap",
      "lower respiratory",
      "lobar",
      "community acquired pneumonia",
      "lung infection",
    ],
  },
  dka: {
    title: "Diabetic Ketoacidosis (DKA)",
    overview:
      "Acute metabolic emergency in Type 1 Diabetes (occasionally Type 2). Triad: hyperglycemia >250mg/dL, ketosis (ketonuria/ketonemia), metabolic acidosis (pH <7.3, HCO3 <15).",
    firstLine: [
      "Resuscitation: IV NS 0.9% 1L over 1st hour, then 250-500mL/h based on hemodynamic status",
      "Insulin: ONLY after potassium >3.5 mEq/L. Regular Insulin 0.1 U/kg/h IV infusion (Actrapid/Huminsulin-R)",
      "Target: glucose fall 50-75 mg/dL/hour. When glucose <250: switch to 5% Dextrose + Saline",
      "Potassium replacement: KCl 20-40 mEq/L in IV fluid if K+ 3.5-5.5 (DO NOT give if K+ >5.5 or no urine output)",
      "Bicarbonate: ONLY if pH <6.9 — NaHCO3 50mEq in 200mL over 2h",
      "Monitor: Blood glucose hourly, electrolytes 2-hourly, blood gas 4-hourly",
      "Trigger treatment: antibiotics if infection suspected (common precipitant)",
    ],
    differentiatingFeature:
      "Differentiating Feature — DKA vs HHS: DKA has ketosis + acidosis, glucose usually 250-600. HHS has extreme hyperglycemia (>600), no significant ketosis, more severe dehydration, high mortality (20-40%).",
    pearlPoints: [
      "NEET PG: Kussmaul breathing (deep, rapid) is the respiratory compensation for metabolic acidosis in DKA.",
      "Potassium paradox: DKA patients are total body K+ depleted but serum K+ may be HIGH initially (due to acidosis shifting K+ extracellularly). Always correct K+ before starting insulin.",
      "Cerebral edema: most dangerous complication — seen in children, caused by rapid correction. Signs: headache, altered consciousness after initial improvement.",
      "Phosphate replacement is not routinely recommended despite depletion.",
      "SGLT2 inhibitors (Dapagliflozin, Empagliflozin) can cause Euglycemic DKA — glucose may be near normal but ketoacidosis present.",
    ],
    keywords: [
      "dka",
      "diabetic ketoacidosis",
      "ketoacidosis",
      "hyperglycemia",
      "diabetic emergency",
      "insulin infusion",
    ],
  },
  snakebite: {
    title: "Snake Bite Management",
    overview:
      "India has 50,000+ deaths annually. Most venomous species: Big Four — Russell's Viper, Common Cobra, Common Krait, Saw-Scaled Viper. Rapid assessment and antivenin therapy is critical.",
    firstLine: [
      "First aid: Immobilize limb at heart level, remove constrictive items, DO NOT incise/suck wound",
      "20-Minute Whole Blood Clotting Test (20WBCT) — if blood clots = normal; non-clotting = viperine envenomation",
      "Polyvalent Anti-Snake Venom (ASV) — only effective treatment for systemic envenomation",
      "ASV dose: 10 vials IV in 100mL NS over 30-60 min (NOT IM). Can repeat 6 hourly up to 30 vials",
      "Premedicate: Adrenaline 0.25mg SC + Chlorpheniramine 10mg IV before ASV (reduces anaphylaxis risk)",
      "Neostigmine test: for neurotoxic (elapid) bites — Neostigmine 1.5mg IM + Atropine 0.6mg IM; if ptosis improves = responsive",
      "Heparin/FFP: NOT recommended for coagulopathy — ASV is the only treatment",
    ],
    differentiatingFeature:
      "Differentiating Feature: Viperine bites — local effects (swelling, necrosis) + systemic bleeding + coagulopathy (non-clotting 20WBCT). Elapine bites — minimal local effects, neurotoxicity (ptosis, bulbar palsy, respiratory paralysis) with normal 20WBCT.",
    pearlPoints: [
      "NEET PG: Common Krait bites occur at night during sleep (patient may not recall bite), cause ascending paralysis — ptosis first, then respiratory failure. Often fatal because onset is delayed.",
      "20WBCT is the most practical bedside test for viperine envenomation in India — place 2mL blood in clean dry glass tube, tilt at 20 min.",
      "ASV is effective regardless of species — polyvalent covers all Big Four Indian species.",
      "DO NOT apply tourniquet — worsens local necrosis and compartment syndrome.",
      "Acute kidney injury (AKI) is a major complication of Russell's Viper bite — monitor urine output.",
    ],
    keywords: [
      "snake bite",
      "snakebite",
      "viper",
      "cobra",
      "krait",
      "anti-snake venom",
      "asv",
      "envenomation",
    ],
  },
};

const DOSE_WARNINGS: Array<{ pattern: RegExp; warning: string }> = [
  {
    pattern: /1\s*mg?\s*(of\s*)?adrenaline\s*(IV|intravenous)/i,
    warning:
      "Warning: Adrenaline 1mg IV (1:1,000) is incorrect and potentially fatal. For anaphylaxis: use Adrenaline 0.5mg IM (1:1,000). IV adrenaline is only used in cardiac arrest as 1mg of 1:10,000 solution (10mL).",
  },
  {
    pattern: /1:1[,.]?000\s*(IV|intravenous)/i,
    warning:
      "Warning: 1:1,000 adrenaline IV carries a high risk of fatal arrhythmia. IM route (anterolateral thigh) is safe for anaphylaxis. IV adrenaline requires 1:10,000 dilution and cardiac monitoring.",
  },
  {
    pattern: /atropine\s*2\s*mg/i,
    warning:
      "Warning: Atropine for bradycardia is dosed at 0.5-1mg IV (repeat up to 3mg total). 2mg as a single dose is above recommended. For organophosphate poisoning, 2-4mg IV is appropriate — clarify indication.",
  },
  {
    pattern: /morphine\s*(10|15|20)\s*mg\s*(IV|intravenous)/i,
    warning:
      "Warning: Morphine >10mg IV as a single dose exceeds standard analgesia limits for acute pain. Standard IV dose is 2-4mg titrated; max 10mg IV in acute settings. Check weight and pain assessment.",
  },
  {
    pattern: /heparin\s*(10000|15000|20000)/i,
    warning:
      "Warning: Heparin doses above 10,000 units require clinical justification. Standard STEMI UFH bolus is 60 U/kg IV (max 4,000 U). Review the indication and use weight-based dosing.",
  },
];

// ─── Quick suggestion chips ───────────────────────────────────────

const QUICK_SUGGESTIONS = [
  "Malaria Symptoms",
  "Dengue Treatment",
  "ACS Management Protocol",
  "TB/NTEP Protocol",
  "Anaphylaxis First-Line",
  "DKA Management",
];

// ─── Confidence color helper ──────────────────────────────────────

function confidenceColor(prob: number): string {
  if (prob >= 70) return "oklch(0.65 0.16 152)";
  if (prob >= 50) return "oklch(0.72 0.16 68)";
  return "oklch(0.65 0.22 27)";
}

// ─── Typed response text renderer ────────────────────────────────

function ResponseText({ text }: { text: string }) {
  const lines = text.split("\n");

  // Group consecutive table lines
  const elements: Array<
    | { type: "table"; rows: string[] }
    | { type: "line"; content: string; index: number }
  > = [];
  let tableBuffer: string[] = [];
  let lineIndex = 0;

  for (const line of lines) {
    if (line.trim().startsWith("|")) {
      tableBuffer.push(line);
    } else {
      if (tableBuffer.length > 0) {
        elements.push({ type: "table", rows: [...tableBuffer] });
        tableBuffer = [];
      }
      elements.push({ type: "line", content: line, index: lineIndex });
      lineIndex++;
    }
  }
  if (tableBuffer.length > 0) {
    elements.push({ type: "table", rows: tableBuffer });
  }

  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {elements.map((el, elIdx) => {
        if (el.type === "table") {
          // Parse table rows
          const dataRows = el.rows.filter((r) => !r.match(/^\|[-\s|]+\|$/));
          const [headerRow, ...bodyRows] = dataRows;
          const parseRow = (row: string) =>
            row
              .split("|")
              .map((c) => c.trim())
              .filter((c) => c.length > 0);
          const headers = headerRow ? parseRow(headerRow) : [];
          return (
            <div
              key={`table-block-${el.rows[0]?.slice(0, 30) ?? String(elIdx)}`}
              className="overflow-x-auto rounded-lg my-2"
              style={{ border: "1px solid oklch(0.32 0.055 230 / 0.5)" }}
            >
              <table className="w-full text-xs">
                {headers.length > 0 && (
                  <thead>
                    <tr style={{ background: "oklch(0.22 0.06 230 / 0.8)" }}>
                      {headers.map((h, hi) => (
                        <th
                          key={`th-${h.slice(0, 10)}-${hi}`}
                          className="px-3 py-2 text-left font-bold"
                          style={{
                            color: "oklch(0.78 0.14 196)",
                            borderBottom:
                              "1px solid oklch(0.32 0.055 230 / 0.5)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {bodyRows.map((row, ri) => {
                    const cells = parseRow(row);
                    return (
                      <tr
                        key={`tr-${row.slice(0, 15)}-${ri}`}
                        style={{
                          background:
                            ri % 2 === 0
                              ? "oklch(0.18 0.045 230 / 0.5)"
                              : "oklch(0.15 0.04 230 / 0.3)",
                        }}
                      >
                        {cells.map((cell, ci) => (
                          <td
                            key={`td-${cell.slice(0, 8)}-${ci}`}
                            className="px-3 py-1.5"
                            style={{
                              color: "oklch(0.78 0.02 215)",
                              borderBottom:
                                "1px solid oklch(0.28 0.05 230 / 0.3)",
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }

        const { content: line, index: i } = el;
        const lineKey = `line-${elIdx}-${i}`;
        if (!line.trim()) return <div key={lineKey} className="h-1" />;

        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p
              key={lineKey}
              className="font-bold mt-2"
              style={{ color: "oklch(0.85 0.12 196)" }}
            >
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }

        const parts = line.split(/(\*\*.*?\*\*)/g);
        if (parts.length > 1) {
          return (
            <p key={lineKey} style={{ color: "oklch(0.85 0.015 215)" }}>
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <strong key={j} style={{ color: "oklch(0.92 0.015 215)" }}>
                    {part.replace(/\*\*/g, "")}
                  </strong>
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <span key={j}>{part}</span>
                ),
              )}
            </p>
          );
        }

        if (line.startsWith("•") || line.startsWith("-")) {
          return (
            <p
              key={lineKey}
              className="pl-2 flex gap-1.5"
              style={{ color: "oklch(0.78 0.02 215)" }}
            >
              <span style={{ color: "oklch(0.65 0.16 196)" }}>•</span>
              <span>{line.replace(/^[•\-]\s*/, "")}</span>
            </p>
          );
        }

        if (line.startsWith("⚠")) {
          return (
            <p
              key={lineKey}
              className="text-xs"
              style={{ color: "oklch(0.72 0.16 68)" }}
            >
              {line}
            </p>
          );
        }

        return (
          <p key={lineKey} style={{ color: "oklch(0.78 0.02 215)" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── ICMR Protocol Card ───────────────────────────────────────────

function ICMRProtocolCard({
  protocol,
}: {
  protocol: NonNullable<AIMessage["icmrProtocol"]>;
}) {
  return (
    <div className="space-y-3">
      {/* Overview */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.82 0.015 215)" }}
      >
        {protocol.overview}
      </p>

      {/* First-line treatments */}
      <div
        className="rounded-xl p-3.5 space-y-2"
        style={{
          background: "oklch(0.18 0.05 230 / 0.6)",
          border: "1px solid oklch(0.35 0.08 230 / 0.5)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: "oklch(0.65 0.16 196)" }}
        >
          First-Line Management (ICMR 2025)
        </p>
        <ol className="space-y-1.5">
          {protocol.firstLine.map((item, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ordered list by position
            <li key={i} className="flex gap-2 text-xs leading-relaxed">
              {item.match(/^\d+\./) ? (
                <span style={{ color: "oklch(0.78 0.02 215)" }}>{item}</span>
              ) : (
                <>
                  <span
                    className="flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                    style={{
                      background: "oklch(0.45 0.14 196 / 0.3)",
                      color: "oklch(0.72 0.14 196)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "oklch(0.82 0.015 215)" }}>{item}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Differentiating Feature — amber box */}
      <div
        className="rounded-xl px-3.5 py-3 text-xs leading-relaxed"
        style={{
          background: "oklch(0.72 0.16 68 / 0.08)",
          border: "1px solid oklch(0.72 0.16 68 / 0.35)",
          color: "oklch(0.85 0.12 68)",
        }}
      >
        <p className="font-bold mb-1 flex items-center gap-1.5">
          <span>🔑</span> Key Differentiating Feature
        </p>
        <p>{protocol.differentiatingFeature}</p>
      </div>

      {/* Pearl Points — green box */}
      <div
        className="rounded-xl px-3.5 py-3 space-y-1.5"
        style={{
          background: "oklch(0.65 0.16 152 / 0.08)",
          border: "1px solid oklch(0.65 0.16 152 / 0.35)",
        }}
      >
        <p
          className="text-xs font-bold mb-2 flex items-center gap-1.5"
          style={{ color: "oklch(0.72 0.14 152)" }}
        >
          <span>🌟</span> NEET PG Pearl Points
        </p>
        <ul className="space-y-1.5">
          {protocol.pearlPoints.map((point, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: list by position
            <li key={i} className="flex gap-2 text-xs leading-relaxed">
              <span style={{ color: "oklch(0.65 0.16 152)", flexShrink: 0 }}>
                •
              </span>
              <span style={{ color: "oklch(0.80 0.02 215)" }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Disease Card (compact) ────────────────────────────────────────

function DiseaseCard({
  disease,
  showDetail = false,
}: { disease: Disease; showDetail?: boolean }) {
  const [expanded, setExpanded] = useState(showDetail);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.19 0.045 230 / 0.8)",
        border: "1px solid oklch(0.32 0.055 230 / 0.6)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-start justify-between gap-2 px-3.5 py-3 text-left"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.95 0.015 215)" }}
            >
              {disease.name}
            </p>
            {disease.icd10Code && (
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: "oklch(0.65 0.16 196 / 0.12)",
                  color: "oklch(0.65 0.16 196)",
                }}
              >
                {disease.icd10Code}
              </span>
            )}
          </div>
          <p
            className="mt-0.5 text-[11px] leading-snug"
            style={{ color: "oklch(0.62 0.02 215)" }}
          >
            {disease.description.slice(0, 80)}
            {disease.description.length > 80 ? "…" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            className="text-[10px] font-medium"
            style={{
              background: "oklch(0.65 0.16 196 / 0.12)",
              color: "oklch(0.72 0.12 196)",
              border: "1px solid oklch(0.65 0.16 196 / 0.25)",
            }}
          >
            {disease.category}
          </Badge>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.02 230)" }}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-3.5 pb-3.5 pt-0 space-y-3"
              style={{ borderTop: "1px solid oklch(0.28 0.05 230 / 0.5)" }}
            >
              {/* Symptoms */}
              {disease.symptoms.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Thermometer
                      className="h-3 w-3"
                      style={{ color: "oklch(0.72 0.16 68)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Symptoms
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 6).map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-0.5 rounded-full text-[10px]"
                        style={{
                          background: "oklch(0.55 0.18 68 / 0.1)",
                          border: "1px solid oklch(0.72 0.16 68 / 0.2)",
                          color: "oklch(0.78 0.12 68)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Signs */}
              {disease.clinicalSigns && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Stethoscope
                      className="h-3 w-3"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Clinical Signs
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "BP", value: disease.clinicalSigns.bp },
                      { label: "HR", value: disease.clinicalSigns.hr },
                      {
                        label: "Temp",
                        value: `${disease.clinicalSigns.temp}°C`,
                      },
                      {
                        label: "SpO2",
                        value: `${disease.clinicalSigns.spo2}%`,
                      },
                      { label: "RR", value: disease.clinicalSigns.rr },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg px-2 py-1.5 text-center"
                        style={{ background: "oklch(0.15 0.04 230 / 0.8)" }}
                      >
                        <p
                          className="text-[9px] font-bold uppercase"
                          style={{ color: "oklch(0.55 0.02 215)" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-[11px] font-mono font-bold"
                          style={{ color: "oklch(0.78 0.14 196)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {disease.medicines.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Pill
                      className="h-3 w-3"
                      style={{ color: "oklch(0.65 0.16 152)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Medicines
                    </p>
                  </div>
                  <div className="space-y-1">
                    {disease.medicines.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        className="flex items-start justify-between gap-2 rounded-lg px-2.5 py-1.5"
                        style={{ background: "oklch(0.16 0.04 230 / 0.6)" }}
                      >
                        <div className="min-w-0">
                          <p
                            className="text-[11px] font-semibold"
                            style={{ color: "oklch(0.88 0.015 215)" }}
                          >
                            {m.name}
                          </p>
                          <p
                            className="text-[10px]"
                            style={{ color: "oklch(0.58 0.02 215)" }}
                          >
                            {m.dosage}
                            {m.route ? ` · ${m.route}` : ""}
                          </p>
                        </div>
                        {m.contraindications?.length > 0 && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{
                              background: "oklch(0.65 0.22 27 / 0.1)",
                              color: "oklch(0.72 0.18 27)",
                            }}
                          >
                            ⚠ CI
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated diseases */}
              {disease.associatedDiseases.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.65 0.16 196)" }}
                  >
                    Associated Conditions
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "oklch(0.62 0.02 215)" }}
                  >
                    {disease.associatedDiseases.slice(0, 5).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2"
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "oklch(0.25 0.055 230)" }}
      >
        <Brain className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
        style={{
          background: "oklch(0.22 0.05 230 / 0.8)",
          border: "1px solid oklch(0.35 0.06 230)",
        }}
      >
        {[0, 0.15, 0.3].map((delay) => (
          <motion.span
            key={delay}
            className="h-2 w-2 rounded-full"
            style={{ background: "oklch(0.65 0.16 196)" }}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <Skeleton
        className="h-20 w-20 rounded-2xl"
        style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
      />
      <div className="space-y-2 w-48">
        <Skeleton
          className="h-4 w-full rounded"
          style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
        />
        <Skeleton
          className="h-3 w-4/5 mx-auto rounded"
          style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
        />
      </div>
      <p
        className="text-xs animate-pulse"
        style={{ color: "oklch(0.55 0.12 196)" }}
      >
        Loading disease database…
      </p>
    </div>
  );
}

// ─── AI Message Bubble ────────────────────────────────────────────

function AIMessageBubble({
  message,
  index,
}: {
  message: AIMessage;
  index: number;
}) {
  if (message.role === "user") {
    return (
      <motion.div
        data-ocid={`ai_assistant.message.item.${index + 1}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3 text-sm"
          style={{
            background: "oklch(0.45 0.12 200)",
            color: "oklch(0.96 0.01 215)",
          }}
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  const prob = message.probability ?? 0;
  const isLowConfidence = prob < 50;
  const showNeedMoreInfo =
    message.responseType === "no_match" ||
    (prob === 0 &&
      !message.diseases?.length &&
      message.responseType !== "icmr_protocol");

  return (
    <motion.div
      data-ocid={`ai_assistant.message.item.${index + 1}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 }}
      className="flex items-end gap-2"
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "oklch(0.25 0.055 230)" }}
      >
        <Brain className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
      </div>

      <div className="max-w-[88%] space-y-2">
        {/* ICMR Protocol Card */}
        {message.responseType === "icmr_protocol" && message.icmrProtocol ? (
          <div
            className="rounded-2xl rounded-bl-sm px-4 py-3.5 space-y-3"
            style={{
              background: "oklch(0.22 0.05 230 / 0.8)",
              border: "1px solid oklch(0.45 0.14 196 / 0.5)",
            }}
          >
            {/* Dose warning if present */}
            {message.doseWarning && (
              <div
                className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs"
                style={{
                  background: "oklch(0.65 0.22 27 / 0.12)",
                  border: "1px solid oklch(0.65 0.22 27 / 0.5)",
                  color: "oklch(0.82 0.16 38)",
                }}
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-medium">{message.doseWarning}</span>
              </div>
            )}
            {/* Protocol header */}
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.45 0.14 196 / 0.25)" }}
              >
                <Stethoscope
                  className="h-3.5 w-3.5"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  ICMR 2025 Protocol
                </p>
                <p
                  className="text-base font-black"
                  style={{ color: "oklch(0.95 0.015 215)" }}
                >
                  {message.icmrProtocol.title}
                </p>
              </div>
            </div>
            <ICMRProtocolCard protocol={message.icmrProtocol} />
          </div>
        ) : (
          <div
            className="rounded-2xl rounded-bl-sm px-4 py-3.5 space-y-3"
            style={{
              background: "oklch(0.22 0.05 230 / 0.8)",
              border: "1px solid oklch(0.35 0.06 230)",
              color: "oklch(0.88 0.015 215)",
            }}
          >
            {/* Dose warning standalone */}
            {message.doseWarning && (
              <div
                className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs"
                style={{
                  background: "oklch(0.65 0.22 27 / 0.12)",
                  border: "1px solid oklch(0.65 0.22 27 / 0.5)",
                  color: "oklch(0.82 0.16 38)",
                }}
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-medium">{message.doseWarning}</span>
              </div>
            )}

            {/* No match / need more info */}
            {showNeedMoreInfo && (
              <div
                className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs"
                style={{
                  background: "oklch(0.45 0.12 200 / 0.1)",
                  border: "1px solid oklch(0.55 0.12 200 / 0.3)",
                  color: "oklch(0.75 0.10 200)",
                }}
              >
                <HelpCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold">Clinical Query Assistance</p>
                  <p className="opacity-80">
                    Enter a disease name, symptoms, or medication to receive
                    clinical guidance.
                  </p>
                </div>
              </div>
            )}

            {/* Escalation warning */}
            {isLowConfidence &&
              !showNeedMoreInfo &&
              message.responseType !== "icmr_protocol" && (
                <div
                  className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
                  style={{
                    background: "oklch(0.55 0.18 68 / 0.12)",
                    border: "1px solid oklch(0.72 0.16 68 / 0.35)",
                    color: "oklch(0.78 0.14 68)",
                  }}
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span className="font-medium">
                    This query has been escalated to the clinical team for
                    expert review.
                  </span>
                </div>
              )}

            {/* Response text */}
            {message.content && !showNeedMoreInfo && (
              <ResponseText text={message.content} />
            )}

            {/* Disease cards */}
            {message.diseases && message.diseases.length > 0 && (
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-1.5">
                  <Stethoscope
                    className="h-3.5 w-3.5"
                    style={{ color: "oklch(0.65 0.16 196)" }}
                  />
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "oklch(0.65 0.16 196)" }}
                  >
                    {message.responseType === "comparison"
                      ? "Comparison"
                      : "Disease Info"}
                  </p>
                </div>
                {message.diseases.map((disease, di) => (
                  <DiseaseCard
                    key={disease.id}
                    disease={disease}
                    showDetail={di === 0}
                  />
                ))}
              </div>
            )}

            {/* Confidence bar */}
            {message.probability !== undefined && message.probability > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "oklch(0.58 0.02 215)" }}>
                    AI Confidence
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{ color: confidenceColor(prob) }}
                  >
                    {prob}%
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: "oklch(0.28 0.05 230)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prob}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: confidenceColor(prob) }}
                  />
                </div>
              </div>
            )}

            {/* Escalated note */}
            {message.escalated && (
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
                style={{
                  background: "oklch(0.65 0.16 196 / 0.08)",
                  border: "1px solid oklch(0.65 0.16 196 / 0.2)",
                  color: "oklch(0.65 0.16 196)",
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Expert has been alerted</span>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p
          className="pl-1 text-[10px]"
          style={{ color: "oklch(0.5 0.02 230)" }}
        >
          {new Date(message.timestamp).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────

export function AIAssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: diseases = [], isLoading: diseasesLoading } = useAllDiseases();
  const aiDiagnosis = useGetAIDiagnosis();
  const escalationAlert = useCreateAIEscalationAlert();

  // Scroll to bottom on new messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered intentionally on message/thinking state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking]);

  // ── Quick search bar handler ──────────────────────────────────

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchQuery("");
    processQuery(q);
  };

  // ── Core query processor ──────────────────────────────────────

  const processQuery = async (userMessage: string) => {
    if (!userMessage || isThinking) return;
    setIsThinking(true);

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // 0. Check dose warnings first
      const matchedWarning = DOSE_WARNINGS.find((d) =>
        d.pattern.test(userMessage),
      );

      // 1. Check ICMR protocol match
      const queryLower = userMessage.toLowerCase();
      const matchedProtocolEntry = Object.entries(ICMR_PROTOCOLS).find(
        ([, p]) => p.keywords.some((k) => queryLower.includes(k.toLowerCase())),
      );

      if (matchedProtocolEntry) {
        const [, protocol] = matchedProtocolEntry;
        const aiMsg: AIMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "",
          responseType: "icmr_protocol",
          icmrProtocol: {
            title: protocol.title,
            overview: protocol.overview,
            firstLine: protocol.firstLine,
            differentiatingFeature: protocol.differentiatingFeature,
            pearlPoints: protocol.pearlPoints,
          },
          doseWarning: matchedWarning?.warning,
          probability: 95,
          escalated: false,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        return;
      }

      // 2. Search local disease database
      const matched = searchDiseases(userMessage, diseases);
      const localResult = generateResponse(userMessage, diseases, matched);

      if (localResult.type !== "no_match") {
        const aiMsg: AIMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: localResult.responseText,
          responseType: localResult.type,
          diseases: localResult.diseases,
          intent: localResult.intent,
          probability: localResult.confidence,
          doseWarning: matchedWarning?.warning,
          escalated: false,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        return;
      }

      // 3. Fallback to backend AI
      const profile = JSON.parse(
        localStorage.getItem("medsim_profile") || "{}",
      );
      const roleAgeMap: Record<string, number> = {
        "Student (MBBS)": 21,
        Intern: 24,
        "Junior Resident 1": 26,
        "Junior Resident 2": 27,
        "Senior Resident 1": 28,
        "Senior Resident 2": 29,
        "Assistant Professor": 32,
        "Associate Professor": 38,
        Professor: 45,
        HOD: 50,
      };
      const patientAge = roleAgeMap[profile.role] || 25;
      const patientGender: string = profile.gender || "unknown";

      const patientData: PatientData = {
        id: crypto.randomUUID(),
        age: BigInt(patientAge),
        gender: patientGender,
        symptoms: userMessage
          .split(/[,،;।]+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2)
          .slice(0, 5),
        history: userMessage,
        hasDisability: false,
        allergies: [],
        medicinesChosen: [],
        diagnosisAttempt: userMessage,
        vitals: {
          bp: "120/80",
          hr: BigInt(80),
          rr: BigInt(16),
          spo2: BigInt(98),
          temp: BigInt(37),
        },
        outcome: {
          isCorrect: false,
          effectsTimeline: [],
          details: "",
          responseTime: BigInt(0),
        },
      };

      const result = await aiDiagnosis.mutateAsync(patientData);
      const prob = Number(result.probability);
      const lowConf = prob < 50 || result.diagnosis.length === 0;

      let escalated = false;
      if (lowConf) {
        const alert: AdminAlert = {
          id: crypto.randomUUID(),
          title: "AI Unresolved Query",
          message: `Student question: "${userMessage}" — AI could not confidently answer. Confidence: ${prob}%.`,
          status: "unresolved",
          severity: BigInt(2),
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
        };
        try {
          await escalationAlert.mutateAsync(alert);
          escalated = true;
        } catch {
          // Silent
        }
      }

      const aiMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.reasoning || "No answer found.",
        responseType: "backend",
        diseases: result.diagnosis.map((d) => ({
          id: d.diseaseId,
          name: d.name,
          icd10Code: d.icd10Code,
          description: d.description,
          category: d.category,
          symptoms: d.symptoms ?? [],
          medicines:
            diseases.find((ld) => ld.id === d.diseaseId)?.medicines ?? [],
          diagnosticCriteria: "",
          clinicalSigns: { bp: "—", hr: "—", rr: "—", spo2: "—", temp: "—" },
          associatedDiseases: [],
          subjectMapping: [],
        })),
        reasoning: result.reasoning,
        probability: prob,
        doseWarning: matchedWarning?.warning,
        escalated,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "An error occurred. Please try again.",
        probability: 0,
        escalated: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage || isThinking) return;
    setInput("");
    processQuery(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.045 235) 0%, oklch(0.14 0.04 230) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 border-b px-3 sm:px-5 py-3 sm:py-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.17 0.05 235 / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl animate-monitor-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.35 0.1 230))",
              }}
            >
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1
                className="font-display text-lg font-black"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                AI Medical Assistant
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.65 0.16 196)" }}>
                {diseasesLoading
                  ? "Loading disease database…"
                  : `${diseases.length} diseases loaded · Ask your clinical question`}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${diseasesLoading ? "opacity-50" : "animate-pulse"}`}
                style={{ background: "oklch(0.65 0.16 152)" }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.65 0.02 215)" }}
              >
                {diseasesLoading ? "Loading" : "Online"}
              </span>
            </div>
          </div>

          {/* Quick search bar */}
          <form onSubmit={handleQuickSearch} className="relative group">
            {/* Animated outer glow ring */}
            <div
              className="absolute -inset-[1.5px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.16 196), oklch(0.58 0.18 240), oklch(0.65 0.16 152), oklch(0.65 0.16 196))",
                backgroundSize: "300% 100%",
                animation: "searchGradientShift 3s linear infinite",
                filter: "blur(3px)",
              }}
            />
            {/* Static subtle border always visible */}
            <div
              className="absolute -inset-[1px] rounded-xl"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.45 0.10 196 / 0.5), oklch(0.38 0.08 240 / 0.4), oklch(0.45 0.10 152 / 0.5))",
              }}
            />
            {/* Inner container */}
            <div
              className="relative flex items-center rounded-xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.06 230 / 0.95), oklch(0.17 0.05 235 / 0.95))",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Left icon with pulse */}
              <div className="relative pl-3.5 flex-shrink-0">
                <Search
                  className="h-4 w-4 pointer-events-none"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                {/* Ping dot on icon */}
                <span
                  className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "oklch(0.65 0.16 152)",
                    animation: !diseasesLoading
                      ? "ping 2s cubic-bezier(0,0,0.2,1) infinite"
                      : "none",
                    opacity: 0.75,
                  }}
                />
              </div>
              <Input
                ref={searchRef}
                data-ocid="ai_assistant.search_input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diseases, symptoms, protocols..."
                className="flex-1 border-0 bg-transparent pl-2.5 pr-2 text-sm h-11 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[oklch(0.45_0.05_220)]"
                style={{
                  color: "oklch(0.90 0.015 215)",
                }}
                disabled={diseasesLoading}
              />
              {/* Search button */}
              <div className="pr-1.5 flex-shrink-0">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: searchQuery.trim()
                      ? "linear-gradient(135deg, oklch(0.48 0.14 200), oklch(0.38 0.10 225))"
                      : "oklch(0.28 0.06 230 / 0.7)",
                    color: searchQuery.trim()
                      ? "oklch(0.96 0.01 215)"
                      : "oklch(0.50 0.03 220)",
                    boxShadow: searchQuery.trim()
                      ? "0 0 10px oklch(0.55 0.14 200 / 0.4)"
                      : "none",
                    border: searchQuery.trim()
                      ? "1px solid oklch(0.58 0.14 196 / 0.4)"
                      : "1px solid oklch(0.35 0.05 230 / 0.5)",
                  }}
                  disabled={!searchQuery.trim() || diseasesLoading}
                >
                  <Sparkles className="h-3 w-3" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-3xl space-y-4 px-3 sm:px-5 py-4 sm:py-6">
          {/* Loading skeleton */}
          {diseasesLoading && messages.length === 0 && <LoadingSkeleton />}

          {/* Empty state */}
          {!diseasesLoading && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 py-12 text-center"
            >
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.12 200 / 0.3), oklch(0.35 0.1 230 / 0.2))",
                  border: "1px solid oklch(0.65 0.16 196 / 0.3)",
                }}
              >
                <Brain
                  className="h-10 w-10"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                <Sparkles
                  className="absolute -right-1 -top-1 h-5 w-5"
                  style={{ color: "oklch(0.72 0.16 68)" }}
                />
              </div>
              <div>
                <p
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.88 0.015 215)" }}
                >
                  AI Medical Assistant
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.02 230)" }}
                >
                  {diseases.length > 0
                    ? `${diseases.length} Indian diseases loaded. Use the search bar or chat below.`
                    : "Ask any clinical question — symptoms, diseases, medicines..."}
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-full px-3 py-1.5 text-xs transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "oklch(0.25 0.055 230 / 0.6)",
                      border: "1px solid oklch(0.35 0.06 230)",
                      color: "oklch(0.75 0.12 196)",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* DB stats */}
              {diseases.length > 0 && (
                <div
                  className="flex items-center gap-4 rounded-xl px-5 py-3 text-xs"
                  style={{
                    background: "oklch(0.20 0.05 230 / 0.6)",
                    border: "1px solid oklch(0.32 0.055 230 / 0.4)",
                  }}
                >
                  {[
                    {
                      label: "Communicable",
                      count: diseases.filter(
                        (d) =>
                          d.category.toLowerCase().includes("communicable") &&
                          !d.category.toLowerCase().includes("non"),
                      ).length,
                    },
                    {
                      label: "Non-communicable",
                      count: diseases.filter((d) =>
                        d.category.toLowerCase().includes("non-communicable"),
                      ).length,
                    },
                    {
                      label: "Zoonotic",
                      count: diseases.filter((d) =>
                        d.category.toLowerCase().includes("zoonotic"),
                      ).length,
                    },
                  ].map(({ label, count }) => (
                    <div key={label} className="text-center">
                      <p
                        className="text-base font-bold font-mono"
                        style={{ color: "oklch(0.72 0.14 196)" }}
                      >
                        {count}
                      </p>
                      <p style={{ color: "oklch(0.55 0.02 215)" }}>{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Message list */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <AIMessageBubble key={msg.id} message={msg} index={i} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>{isThinking && <TypingIndicator />}</AnimatePresence>
        </div>
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0 border-t px-3 sm:px-5 pt-3 pb-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.15 0.05 235 / 0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          {/* Decorative label badge */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: "oklch(0.65 0.22 152)" }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "oklch(0.65 0.16 196)" }}
              >
                Medical AI Chat
              </span>
              <span
                className="text-[10px]"
                style={{ color: "oklch(0.45 0.05 230)" }}
              >
                —
              </span>
              <span
                className="text-[10px]"
                style={{ color: "oklch(0.50 0.04 220)" }}
              >
                {isThinking ? "Processing…" : "Ready"}
              </span>
            </div>
            <div
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5"
              style={{
                background: "oklch(0.25 0.08 200 / 0.4)",
                border: "1px solid oklch(0.45 0.12 196 / 0.3)",
              }}
            >
              <Brain
                className="h-2.5 w-2.5"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
              <span
                className="text-[9px] font-semibold"
                style={{ color: "oklch(0.62 0.12 196)" }}
              >
                ICMR DB
              </span>
            </div>
          </div>

          {/* Input + Send row */}
          <div className="flex items-end gap-3">
            {/* Glowing textarea wrapper */}
            <div className="relative flex-1 group/input">
              {/* Always-on ambient glow (pulsing) */}
              <div
                className="absolute -inset-[2px] rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.18 196 / 0.35), oklch(0.48 0.16 240 / 0.25), oklch(0.55 0.18 152 / 0.2))",
                  animation: "chatInputAmbient 4s ease-in-out infinite",
                  filter: "blur(4px)",
                }}
              />
              {/* Focus-triggered gradient ring */}
              <div
                className="absolute -inset-[1.5px] rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.18 196), oklch(0.55 0.2 240), oklch(0.65 0.18 152), oklch(0.58 0.16 200), oklch(0.65 0.18 196))",
                  backgroundSize: "400% 100%",
                  animation:
                    "chatGradientShift 3s linear infinite, chatGlow 2s ease-in-out infinite",
                  filter: "blur(2px)",
                }}
              />
              {/* Static border */}
              <div
                className="absolute -inset-[1px] rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.40 0.10 196 / 0.6), oklch(0.35 0.08 240 / 0.4), oklch(0.40 0.10 152 / 0.5))",
                }}
              />
              {/* Inner textarea container */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.06 230 / 0.95), oklch(0.17 0.05 235 / 0.98))",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Shimmer scan line */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                  style={{ zIndex: 1 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "60%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.65 0.16 196 / 0.06), transparent)",
                      animation: "chatScanLine 4s ease-in-out infinite",
                    }}
                  />
                </div>
                <Textarea
                  ref={textareaRef}
                  data-ocid="ai_assistant.textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe symptoms, ask about treatment protocols, or query drug dosages..."
                  rows={2}
                  className="resize-none text-sm relative"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "oklch(0.90 0.015 215)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "12px 16px",
                    zIndex: 2,
                    caretColor: "oklch(0.65 0.16 196)",
                  }}
                  disabled={isThinking}
                />
              </div>
            </div>

            {/* Send button — large, vibrant */}
            <div className="relative flex-shrink-0 group/send">
              {/* Button ambient glow */}
              <div
                className="absolute -inset-[3px] rounded-xl opacity-60 group-hover/send:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    input.trim() && !isThinking
                      ? "linear-gradient(135deg, oklch(0.55 0.18 196), oklch(0.45 0.16 220))"
                      : "oklch(0.30 0.06 230)",
                  filter: "blur(6px)",
                  animation:
                    input.trim() && !isThinking
                      ? "sendButtonPulse 2s ease-in-out infinite"
                      : "none",
                }}
              />
              <Button
                data-ocid="ai_assistant.submit_button"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="relative h-[72px] w-14 flex-shrink-0 rounded-xl transition-all duration-300 active:scale-95 group-hover/send:scale-105 border-0"
                style={{
                  background:
                    input.trim() && !isThinking
                      ? "linear-gradient(135deg, oklch(0.48 0.16 200), oklch(0.40 0.14 225), oklch(0.45 0.15 195))"
                      : "oklch(0.22 0.05 230)",
                  boxShadow:
                    input.trim() && !isThinking
                      ? "0 0 20px oklch(0.55 0.16 196 / 0.5), inset 0 1px 0 oklch(0.75 0.10 196 / 0.3)"
                      : "none",
                }}
              >
                {isThinking ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span
                      className="text-[8px] font-bold"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      AI
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Send
                      className="h-5 w-5 transition-transform duration-200 group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5"
                      style={{
                        color: input.trim() ? "white" : "oklch(0.45 0.05 230)",
                      }}
                    />
                    <span
                      className="text-[8px] font-bold tracking-wider"
                      style={{
                        color: input.trim()
                          ? "oklch(0.80 0.10 196)"
                          : "oklch(0.40 0.04 230)",
                      }}
                    >
                      SEND
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          <p
            className="mt-2 text-center text-[10px]"
            style={{ color: "oklch(0.40 0.02 230)" }}
          >
            AI responses are for educational purposes only. Always follow
            institutional protocols and verified clinical guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantPage;
