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
import {
  type DiseaseEntry,
  allBatch1Diseases,
} from "../lib/disease-db-anatomy-physiology";
import { allBatch2Diseases } from "../lib/disease-db-biochemistry-pathology";
import { allBatch4Diseases } from "../lib/disease-db-forensic-community";
import { allBatch3Diseases } from "../lib/disease-db-pharmacology-microbiology";

const ALL_DISEASES_DB: DiseaseEntry[] = [
  ...allBatch1Diseases,
  ...allBatch2Diseases,
  ...allBatch3Diseases,
  ...allBatch4Diseases,
];

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
  heart_failure: {
    title: "Acute Decompensated Heart Failure",
    overview:
      "Acute worsening of heart failure with fluid overload. Classified as HFrEF (<40% EF) or HFpEF (>50% EF).",
    firstLine: [
      "Sit upright (high Fowler's position) — reduces preload",
      "Oxygen: Target SpO2 >95%; use NIV (CPAP/BiPAP) if respiratory distress",
      "Furosemide 40-80mg IV bolus (double oral dose if on chronic diuretics)",
      "Morphine 2-4mg IV for dyspnea/anxiety (use cautiously)",
      "GTN (Nitroglycerine) 0.5mg SL or IV infusion if SBP >90mmHg",
      "Echocardiography within 24-48 hours for all new presentations",
    ],
    differentiatingFeature:
      "Differentiating Feature: Orthopnoea (worse lying flat) and PND (Paroxysmal Nocturnal Dyspnoea) are pathognomonic of left heart failure. S3 gallop rhythm = hallmark of acute LVF.",
    pearlPoints: [
      "BNP >100 pg/mL or NT-proBNP >300 pg/mL confirms cardiac origin of dyspnea",
      "Furosemide dose = 2.5x the total oral daily dose when converting to IV",
      "LVEDP rises before clinical symptoms — diastolic dysfunction can precede symptoms by years",
      "NEET PG: 'Cardiac asthma' = nocturnal wheeze from bronchospasm due to pulmonary edema",
      "Digoxin: avoid in acute phase; useful for rate control in AF+HF (not in sinus rhythm HF)",
    ],
    keywords: [
      "heart failure",
      "cardiac failure",
      "LVF",
      "left ventricular failure",
      "pulmonary edema",
      "pulmonary oedema",
      "bhf",
      "decompensated",
      "dyspnea",
      "dyspnoea",
      "orthopnea",
      "furosemide",
    ],
  },
  hypertensive_emergency: {
    title: "Hypertensive Emergency",
    overview:
      "BP >180/120 mmHg with evidence of end-organ damage (HYPERTENSIVE EMERGENCY) vs. no damage (URGENCY). Immediate IV therapy needed for emergency only.",
    firstLine: [
      "Target: Reduce MAP by no more than 25% in first hour, then to 160/100 over next 2-6 hours",
      "Labetalol 20mg IV bolus, repeat 40-80mg every 10 min (max 300mg)",
      "Sodium Nitroprusside 0.3-10 mcg/kg/min IV infusion (for most emergencies)",
      "Hypertensive encephalopathy: Labetalol or Nicardipine preferred",
      "Acute Ischaemic Stroke: Do NOT lower BP unless >220/120 (cerebral autoregulation impaired)",
      "Aortic Dissection: Target SBP <120 in 20 min — IV Labetalol + Morphine",
    ],
    differentiatingFeature:
      "Differentiating Feature: Papilloedema on fundoscopy = Malignant Hypertension (Grade IV Keith-Wagener retinopathy). Flame-shaped retinal hemorrhages + cotton wool spots = accelerated hypertension.",
    pearlPoints: [
      "Too rapid BP reduction = watershed infarct (bilateral posterior cerebral infarction)",
      "Phaeochromocytoma crisis: never give beta-blocker alone (paradoxical hypertension) — always alpha-block first with Phentolamine",
      "NEET PG: ACE inhibitors are contraindicated in bilateral renal artery stenosis — worsen renal function",
      "Hydralazine preferred in pregnancy-induced hypertension (eclampsia)",
      "MgSO4 4g IV loading dose for eclampsia seizure prophylaxis — NOT an antihypertensive",
    ],
    keywords: [
      "hypertensive emergency",
      "hypertensive crisis",
      "malignant hypertension",
      "high BP emergency",
      "BP crisis",
      "eclampsia",
      "hypertension treatment",
      "blood pressure emergency",
    ],
  },
  copd_exacerbation: {
    title: "COPD Acute Exacerbation",
    overview:
      "Acute worsening of respiratory symptoms beyond day-to-day variation. Most commonly triggered by viral URTI (50%), bacterial (25%), or environmental factors.",
    firstLine: [
      "Controlled Oxygen: Target SpO2 88-92% (NOT 95-100% — may suppress hypoxic drive)",
      "Salbutamol 2.5mg + Ipratropium 500mcg via nebulizer every 4-6 hours",
      "Prednisolone 40mg oral x 5 days (or Hydrocortisone 200mg IV if severe)",
      "Antibiotics if 2 of 3 Anthonisen criteria: increased dyspnea, sputum volume, sputum purulence",
      "Amoxicillin-Clavulanate 625mg TID or Azithromycin 500mg OD x 5 days",
      "NIV (BiPAP) if pH <7.35 despite initial therapy — reduces intubation rate by 65%",
    ],
    differentiatingFeature:
      "Differentiating Feature: Type II respiratory failure (hypercapnia + hypoxia) with pH <7.35 = NIV indication. Barrel chest + pursed-lip breathing + use of accessory muscles = classic chronic COPD.",
    pearlPoints: [
      "Give Oxygen 28% Venturi mask (2L/min) — not high-flow; hypercapnic patients lose hypoxic drive",
      "Spirometry: FEV1/FVC <0.7 post-bronchodilator = obstructive pattern (GOLD criteria)",
      "NEET PG: Pink Puffer = emphysema (type A COPD); Blue Bloater = chronic bronchitis (type B COPD)",
      "Annual influenza + pneumococcal vaccine mandatory for all COPD patients (ICMR/GOLD guidelines)",
      "Theophylline: last resort due to narrow therapeutic index — monitor levels 10-20 mcg/mL",
    ],
    keywords: [
      "COPD",
      "chronic obstructive",
      "copd exacerbation",
      "emphysema",
      "chronic bronchitis",
      "respiratory failure",
      "GOLD",
      "bronchodilator",
      "salbutamol nebulizer",
    ],
  },
  asthma_acute: {
    title: "Acute Severe Asthma",
    overview:
      "Life-threatening bronchospasm. Near-fatal asthma = PEFR <33% predicted, SpO2 <92%, silent chest, cyanosis, bradycardia, or exhaustion.",
    firstLine: [
      "Salbutamol 5mg via nebulizer, driven by Oxygen 6-8 L/min",
      "Ipratropium 500mcg via nebulizer (add to first 3 nebulizers in severe attack)",
      "Prednisolone 40-50mg oral or Hydrocortisone 100mg IV 6-hourly",
      "Oxygen: Target SpO2 94-98% (contrast with COPD)",
      "IV Magnesium Sulphate 1.2-2g IV over 20 min for severe attacks (NEET PG high-yield)",
      "Heliox, IV Aminophylline: Second-line in ICU settings",
    ],
    differentiatingFeature:
      "Differentiating Feature: Silent chest in asthma = DANGER SIGN (no air movement for wheeze). Pulsus paradoxus >10mmHg = severe attack. Rising PaCO2 in an asthmatic = impending respiratory arrest.",
    pearlPoints: [
      "MgSO4 1.2-2g IV over 20 minutes — smooth muscle relaxant, evidence-based in acute severe asthma",
      "Aminophylline loading dose 5mg/kg IV over 20 min (if not on theophylline); halve dose if already on theophylline",
      "NEET PG: FEV1 <60% predicted = moderate; FEV1 <40% = severe; FEV1 <25% = life-threatening",
      "Spacer + MDI = as effective as nebulizer in mild-moderate attacks (BTS/SIGN guidelines)",
      "Avoid beta-blockers (even topical eye drops) in all asthmatic patients — can trigger fatal bronchospasm",
    ],
    keywords: [
      "asthma",
      "bronchial asthma",
      "acute asthma",
      "asthma attack",
      "bronchospasm",
      "wheezing",
      "wheeze",
      "PEFR",
      "salbutamol",
      "nebulizer",
    ],
  },
  meningitis: {
    title: "Bacterial Meningitis",
    overview:
      "Medical emergency. Classic triad: Fever + Neck stiffness + Altered sensorium (present in only 44% patients). Most common causes: N. meningitidis (young adults), S. pneumoniae (adults >50 years).",
    firstLine: [
      "Do NOT delay antibiotics for LP if LP would take >30 minutes",
      "Dexamethasone 0.15mg/kg IV 15-30 min BEFORE first antibiotic dose (reduces mortality)",
      "Ceftriaxone 2g IV 12-hourly (adult) — drug of choice",
      "Add Ampicillin 2g IV 4-hourly if age >50 or immunocompromised (covers Listeria)",
      "LP: Opening pressure >20 cmH2O, CSF turbid/cloudy, neutrophilic pleocytosis",
      "Isolate patient, notify public health — give prophylaxis to close contacts (Rifampicin 600mg BD x 2 days)",
    ],
    differentiatingFeature:
      "Differentiating Feature: Non-blanching petechial/purpuric rash = N. meningitidis septicaemia (meningococcaemia) — give Benzylpenicillin IM immediately, before transfer. Kernig's sign positive = bacterial meningitis.",
    pearlPoints: [
      "CSF in bacterial meningitis: glucose <45 mg/dL (or CSF:serum glucose <0.4), protein >150 mg/dL, neutrophilia",
      "Viral (aseptic) meningitis: lymphocytic pleocytosis, normal glucose, mildly elevated protein — no antibiotics",
      "NEET PG: India Ink stain = Cryptococcal meningitis; AFB in CSF = TB meningitis (low glucose, very high protein)",
      "Waterhouse-Friderichsen syndrome: bilateral adrenal hemorrhage + meningococcaemia + DIC — high mortality",
      "Give Dexamethasone before antibiotics — reduces incidence of hearing loss and neurological sequelae",
    ],
    keywords: [
      "meningitis",
      "bacterial meningitis",
      "neck stiffness",
      "Kernig",
      "Brudzinski",
      "meningococcal",
      "CSF",
      "lumbar puncture",
      "brain fever",
    ],
  },
  pe_dvt: {
    title: "Pulmonary Embolism & DVT",
    overview:
      "Venous thromboembolism (VTE) spectrum: DVT (most commonly ileofemoral) → Pulmonary Embolism (PE). Massive PE = hemodynamic instability (SBP <90 or drop >40 mmHg).",
    firstLine: [
      "Massive PE with hemodynamic instability: Thrombolysis — Alteplase 100mg IV over 2 hours",
      "Submassive/Stable PE: Anticoagulation — LMWH (Enoxaparin 1mg/kg SC 12-hourly)",
      "Heparin UFH: Bolus 80 U/kg IV, then 18 U/kg/hour infusion (target aPTT 60-100 seconds)",
      "NOAC preferred for long-term: Rivaroxaban 15mg BD x 3 weeks, then 20mg OD",
      "Oxygen to maintain SpO2 >94%; IV fluids judiciously (RV already stressed)",
      "IVC filter: only if anticoagulation absolutely contraindicated",
    ],
    differentiatingFeature:
      "Differentiating Feature: Saddle embolus = large PE at bifurcation of main pulmonary artery. ECG: S1Q3T3 pattern (S wave in I, Q wave in III, inverted T in III) = classic but present in only 20% of PE.",
    pearlPoints: [
      "Wells Score >4 = high probability PE; D-dimer negative (<500 ng/mL) rules out PE in low-probability patients",
      "CTPA (CT Pulmonary Angiography) = gold standard for PE diagnosis",
      "NEET PG: Most common source of DVT = ileofemoral veins; most common cause of death = massive PE with RV failure",
      "Homan's sign (calf pain on dorsiflexion) = low sensitivity/specificity for DVT — clinical examination insufficient alone",
      "Virchow's Triad: Stasis + Hypercoagulability + Endothelial injury = DVT formation",
    ],
    keywords: [
      "pulmonary embolism",
      "PE",
      "DVT",
      "deep vein thrombosis",
      "blood clot",
      "VTE",
      "venous thromboembolism",
      "Alteplase",
      "LMWH",
      "heparin PE",
    ],
  },
  upper_gi_bleed: {
    title: "Upper GI Bleed",
    overview:
      "GI bleed proximal to Treitz ligament. Most common causes: Peptic ulcer (50%), varices (20%), Mallory-Weiss tear (15%). Rockall score predicts rebleeding and mortality.",
    firstLine: [
      "Resuscitate: 2 large bore IV cannulas, O-negative blood if cross-match unavailable",
      "IV PPI: Omeprazole 80mg bolus then 8mg/hour infusion x 72 hours (for non-variceal)",
      "For Variceal Bleed: Terlipressin 2mg IV 6-hourly + prophylactic Ceftriaxone 1g/day",
      "Urgent OGD (within 24 hours, within 12 hours if variceal suspected or hemodynamic instability)",
      "Endoscopic haemostasis: adrenaline injection + thermal coagulation or clipping for ulcer",
      "TIPSS (Transjugular Intrahepatic Portosystemic Shunt) if variceal bleeding uncontrolled",
    ],
    differentiatingFeature:
      "Differentiating Feature: Haematemesis (bright red) = active arterial bleed; Coffee-ground vomiting = slow upper GI bleed. Melaena (tarry black stool) = UGIB; Haematochezia (bright red PR bleed) = LGIB or massive UGIB.",
    pearlPoints: [
      "Rockall Score ≥3 = high risk; Score 0-1 = early discharge safe",
      "H. pylori eradication mandatory for all PUD patients — reduces rebleeding by 80%",
      "NEET PG: Most common cause of UGI bleed in India = peptic ulcer (duodenal > gastric)",
      "IV PPI before endoscopy reduces need for endoscopic intervention but does NOT reduce mortality",
      "Sengstaken-Blakemore tube: balloon tamponade for variceal bleed as bridge to definitive therapy",
    ],
    keywords: [
      "GI bleed",
      "gastrointestinal bleed",
      "upper GI bleed",
      "UGIB",
      "haematemesis",
      "hematemesis",
      "melaena",
      "melena",
      "peptic ulcer bleed",
      "variceal bleed",
      "OGD",
    ],
  },
  acute_pancreatitis: {
    title: "Acute Pancreatitis",
    overview:
      "Inflammatory condition of pancreas. Most common causes: Gallstones (40%) + Alcohol (35%) in India. Severity: Mild (no organ failure) vs Severe (organ failure >48h, Ranson's score ≥3).",
    firstLine: [
      "Aggressive IV fluid resuscitation: Ringer's Lactate 250-500mL/hour (preferred over normal saline)",
      "Nil by mouth initially; start feeding early (within 24-48h) once tolerated",
      "Adequate analgesia: Morphine or Tramadol IV (old teaching — avoid morphine — now outdated)",
      "Monitor: hourly urine output target >0.5mL/kg/hour",
      "Prophylactic antibiotics NOT recommended unless infected necrosis suspected",
      "Infected pancreatic necrosis: CT-guided FNA for culture, then targeted antibiotics (Imipenem-Cilastatin)",
    ],
    differentiatingFeature:
      "Differentiating Feature: Grey Turner's sign (flank bruising) + Cullen's sign (periumbilical bruising) = hemorrhagic pancreatitis — severe, high mortality. Serum lipase more specific than amylase (elevated longer).",
    pearlPoints: [
      "Serum amylase >3x upper limit of normal = diagnostic (but also elevated in other conditions)",
      "Ranson's Criteria: Age >55, WBC >16,000, glucose >200, LDH >350, AST >250 on admission",
      "NEET PG: Most common complication = pseudocyst (4 weeks later, fluid collection without epithelial lining)",
      "ERCP + sphincterotomy within 24-72 hours for gallstone pancreatitis with biliary obstruction",
      "Hypocalcaemia (fat saponification) = poor prognostic sign; Chvostek's/Trousseau's sign positive",
    ],
    keywords: [
      "pancreatitis",
      "acute pancreatitis",
      "pancreas",
      "amylase",
      "lipase",
      "gallstone pancreatitis",
      "Ranson",
      "abdominal pain severe",
    ],
  },
  acute_liver_failure: {
    title: "Acute Liver Failure",
    overview:
      "Rapid hepatic dysfunction (jaundice + coagulopathy + encephalopathy) without prior liver disease. Most common causes in India: Viral hepatitis E (pregnancy), Hepatitis B reactivation, drug-induced (anti-TB drugs, paracetamol).",
    firstLine: [
      "NAC (N-Acetyl Cysteine) IV: Even in non-paracetamol ALF — improves transplant-free survival",
      "Paracetamol overdose specific: NAC 150mg/kg IV over 15 min, then 50mg/kg over 4h, then 100mg/kg over 16h",
      "Lactulose 30mL TID to QID (target: 2-3 soft stools/day) for hepatic encephalopathy",
      "Avoid sedatives, opioids, aminoglycosides",
      "Coagulopathy: FFP only if active bleeding or procedure planned (NOT to correct INR alone)",
      "Liver transplant evaluation URGENTLY — King's College Criteria to assess transplant eligibility",
    ],
    differentiatingFeature:
      "Differentiating Feature: INR >1.5 + encephalopathy = Acute Liver Failure (not just jaundice alone). Paracetamol-induced ALF = best prognosis (NAC effective). Indeterminate aetiology = worst prognosis.",
    pearlPoints: [
      "King's College Criteria (paracetamol): pH <7.3, OR INR >6.5 + creatinine >300 + Grade III-IV encephalopathy = transplant",
      "Cerebral oedema is the #1 cause of death in ALF — grade III-IV encephalopathy = ICU admission",
      "NEET PG: Anti-TB drugs = hepatotoxic (Isoniazid, Rifampicin, Pyrazinamide) — monitor LFT monthly",
      "Hepatic encephalopathy stages: I (confusion) → II (drowsy) → III (stupor) → IV (coma)",
      "Zinc supplementation + BCAA (Branched Chain Amino Acids) diet recommended in chronic hepatic encephalopathy",
    ],
    keywords: [
      "liver failure",
      "acute liver failure",
      "ALF",
      "hepatic encephalopathy",
      "hepatic failure",
      "jaundice encephalopathy",
      "fulminant hepatic failure",
      "NAC",
      "N-acetyl cysteine",
    ],
  },
  acute_kidney_injury: {
    title: "Acute Kidney Injury",
    overview:
      "Abrupt loss of kidney function. KDIGO staging: Stage 1 (1.5-1.9x baseline creatinine), Stage 2 (2-2.9x), Stage 3 (>3x or <0.3mL/kg/h urine for 24h). Most common causes: Prerenal (60%), intrinsic (35%), postrenal (5%).",
    firstLine: [
      "Identify and treat cause: prerenal (fluids), intrinsic (stop nephrotoxins), postrenal (catheterize/relieve obstruction)",
      "IV NS 500mL bolus for prerenal AKI, reassess after 30 minutes",
      "Monitor: strict fluid balance, hourly urine output, daily weight",
      "Hyperkalaemia management: ECG monitoring; Calcium gluconate 10mL of 10% IV for cardioprotection",
      "Dialysis indications: AEIOU — Acidosis (pH <7.1), Electrolytes (K >6.5), Intoxication, Overload, Uraemia (urea >30 mmol/L)",
      "Avoid NSAIDs, ACE inhibitors, contrast dye, aminoglycosides in AKI",
    ],
    differentiatingFeature:
      "Differentiating Feature: FeNa <1% = prerenal (tubules intact, conserving Na); FeNa >2% = intrinsic renal (ATN — tubules damaged, cannot conserve Na). RBC casts = glomerulonephritis; Muddy brown granular casts = ATN.",
    pearlPoints: [
      "Hyperkalaemia ECG changes (in order): Peaked T waves → Prolonged PR → Widened QRS → Sine wave → VF/Asystole",
      "Contrast nephropathy prevention: IV saline + N-Acetylcysteine 600mg BD before and after contrast",
      "NEET PG: Most common cause of AKI in ICU = Sepsis (septic AKI)",
      "Rhabdomyolysis-induced AKI: myoglobinuria (dark tea-coloured urine), CK >5x ULN — aggressive hydration",
      "Avoid dietary potassium, phosphate; protein restriction 0.6-0.8 g/kg/day in oliguric AKI",
    ],
    keywords: [
      "AKI",
      "acute kidney injury",
      "renal failure",
      "oliguria",
      "anuria",
      "creatinine raised",
      "kidney failure",
      "ATN",
      "prerenal",
      "dialysis",
      "hyperkalaemia",
    ],
  },
  typhoid: {
    title: "Enteric Fever / Typhoid",
    overview:
      "Systemic infection with Salmonella Typhi (or Paratyphi). Transmitted feco-oral. India: 4.5 million cases/year. Stepladder fever pattern + relative bradycardia + Rose spots (on trunk) = classic triad.",
    firstLine: [
      "Ceftriaxone 2-3g IV OD x 10-14 days — drug of choice for severe typhoid",
      "Azithromycin 500mg OD x 7 days — for uncomplicated typhoid (oral)",
      "Fluoroquinolones (Ciprofloxacin, Ofloxacin) — use only if susceptibility confirmed (high resistance in India)",
      "Dexamethasone 3mg/kg IV bolus then 1mg/kg 6-hourly x 48h — for typhoid encephalopathy/severe disease",
      "Blood culture in 1st week (highest yield); Widal test (baseline titre >1:160 O, >1:80 H suggestive)",
      "Notify health authorities; sanitation measures",
    ],
    differentiatingFeature:
      "Differentiating Feature: Relative bradycardia (pulse slower than expected for temperature) = Faget's sign — classic of typhoid. Intestinal perforation at Peyer's patches in distal ileum = most dangerous complication (3rd week).",
    pearlPoints: [
      "Blood culture Week 1 > Stool/Urine culture Week 2-3 > Widal Week 2 onwards",
      "Typhoid Vi polysaccharide vaccine (injectable, single dose) — 60-70% efficacy, lasts 3 years",
      "NEET PG: Rose spots on trunk = salmon-pink macules, 2-4mm, blanch on pressure",
      "MDR Typhoid: resistant to Chloramphenicol + Ampicillin + Cotrimoxazole — use ceftriaxone/azithromycin",
      "Carriers: treat with Ciprofloxacin 750mg BD x 4 weeks + cholecystectomy if gallbladder stones",
    ],
    keywords: [
      "typhoid",
      "enteric fever",
      "Salmonella typhi",
      "stepladder fever",
      "Widal test",
      "typhoid treatment",
      "blood culture fever",
    ],
  },
  ckd_management: {
    title: "Chronic Kidney Disease",
    overview:
      "GFR <60 mL/min/1.73m² for >3 months. Stages G1-G5. Most common causes in India: Diabetic nephropathy (40%), Hypertensive nephropathy (30%), Chronic glomerulonephritis (15%). CKD Stage 5 (GFR <15) = ESRD.",
    firstLine: [
      "Blood pressure target: <130/80 with ACE inhibitor or ARB (first choice — nephroprotective)",
      "Glycemic control: HbA1c <7% (but avoid hypoglycemia; reduce insulin doses as GFR falls)",
      "Restrict protein 0.6-0.8 g/kg/day (reduces urea, slows progression)",
      "Phosphate binders (Calcium carbonate, Sevelamer) for hyperphosphataemia",
      "EPO (Erythropoietin) 50-100 U/kg SC 3x/week for anaemia of CKD (target Hb 10-12 g/dL)",
      "AV fistula creation when GFR <15-20 (prepare for dialysis 6 months ahead)",
    ],
    differentiatingFeature:
      "Differentiating Feature: CKD anaemia = normocytic normochromic (due to EPO deficiency). Renal osteodystrophy = secondary hyperparathyroidism due to low 1,25-OH-D3 and high phosphate.",
    pearlPoints: [
      "Avoid NSAIDs, contrast agents, aminoglycosides in CKD — worsen renal function",
      "Vitamin D deficiency in CKD = low 1-alpha hydroxylase activity — give Calcitriol (active form)",
      "NEET PG: Diabetic nephropathy: earliest sign = microalbuminuria (30-300 mg/day); Kim-1 and Cystatin C are early biomarkers",
      "Uremic frost = urea crystals on skin in advanced CKD (rare today with dialysis)",
      "Anaemia of CKD: iron stores should be replenished BEFORE starting EPO therapy",
    ],
    keywords: [
      "CKD",
      "chronic kidney disease",
      "renal failure chronic",
      "creatinine high",
      "EPO",
      "kidney dialysis",
      "glomerulonephritis",
      "nephrotic",
      "nephritic",
      "proteinuria",
    ],
  },
  appendicitis: {
    title: "Acute Appendicitis",
    overview:
      "Most common surgical emergency worldwide. Peak incidence 10-30 years. Luminal obstruction (faecolith, lymphoid hyperplasia) → infection → gangrene → perforation. Perforation risk: 36 hours (30%), 72 hours (80%).",
    firstLine: [
      "IV fluid resuscitation + NBM (Nil By Mouth)",
      "Analgesia: Morphine or Tramadol IV — does NOT mask signs (old teaching debunked)",
      "Antibiotics pre-operatively: Co-amoxiclav 1.2g IV or Metronidazole 500mg + Cefuroxime 1.5g IV",
      "Appendicectomy: Laparoscopic (preferred) or open; within 12-24 hours of diagnosis",
      "Perforation/peritonitis: urgent surgery + IV antibiotics (Piperacillin-Tazobactam + Metronidazole)",
      "CT abdomen: sensitivity 94%, specificity 95% — gold standard when clinical diagnosis uncertain",
    ],
    differentiatingFeature:
      "Differentiating Feature: Rovsing's sign (pressure in LIF causes pain in RIF) = peritoneal irritation from appendix. McBurney's point tenderness (2/3 from umbilicus to ASIS) = classic sign.",
    pearlPoints: [
      "Alvarado Score ≥7 = likely appendicitis; ≥9 = almost certain — useful for decision making",
      "Retrocaecal appendix (75%): psoas sign positive (pain on right hip extension); Pelvic appendix: dysuria, frequency",
      "NEET PG: First symptom is periumbilical pain, migrates to RIF (McBurney's point)",
      "Negative appendicectomy rate should be <15% (acceptable to operate on clinical diagnosis)",
      "Conservative management (antibiotics alone) for uncomplicated appendicitis — 30% recurrence at 5 years",
    ],
    keywords: [
      "appendicitis",
      "appendix pain",
      "McBurney",
      "RIF pain",
      "right iliac fossa pain",
      "appendicectomy",
      "rebound tenderness",
    ],
  },
  fracture_management: {
    title: "Fracture Principles & Management",
    overview:
      "Disruption in bone continuity. Classification: open/closed, displacement, comminution. Healing phases: Haematoma (days) → Soft callus (weeks) → Hard callus (months) → Remodelling (years).",
    firstLine: [
      "Primary survey: ATLS approach for polytrauma — Airway, Breathing, Circulation first",
      "Immobilize above and below the fracture — reduce pain, prevent neurovascular injury",
      "Neurovascular check: Pulse, sensation, movement distal to fracture before and after manipulation",
      "Open fracture: IV antibiotics within 3 hours (Co-amoxiclav 1.2g IV) + tetanus prophylaxis + wound irrigation",
      "Compartment syndrome: Urgent fasciotomy if compartment pressure >30 mmHg or within 30 mmHg of diastolic",
      "Definitive fixation: ORIF, IM nailing, external fixation based on fracture type",
    ],
    differentiatingFeature:
      "Differentiating Feature: Fat embolism syndrome = petechiae on upper body + hypoxia + confusion 24-72h after long bone fracture. Compartment syndrome 6 Ps: Pain, Pressure, Paraesthesia, Paralysis, Pallor, Pulselessness.",
    pearlPoints: [
      "Most common complication of femoral fracture = fat embolism (long bone marrow fat → pulmonary emboli)",
      "Colles' fracture: dinner-fork deformity (dorsal displacement of distal radius, 1 inch above wrist)",
      "NEET PG: Scaphoid fracture: pain in anatomical snuffbox; high risk of avascular necrosis — treat all as fracture",
      "Volkmann's ischaemic contracture: late complication of compartment syndrome — forearm flexor contracture",
      "Salter-Harris classification: Type I (physis) → Type V (crush) — higher type = worse prognosis for growth",
    ],
    keywords: [
      "fracture",
      "bone fracture",
      "broken bone",
      "orthopaedic",
      "compartment syndrome",
      "ORIF",
      "fat embolism",
      "Colles fracture",
      "scaphoid",
    ],
  },
  hypothyroidism: {
    title: "Hypothyroidism & Myxoedema",
    overview:
      "Primary hypothyroidism (elevated TSH, low T4) most common — due to Hashimoto's thyroiditis in iodine-sufficient areas, iodine deficiency in India. Myxoedema coma = severe hypothyroidism + precipitant = medical emergency.",
    firstLine: [
      "Levothyroxine (L-T4): Start 25-50 mcg OD in elderly/CAD; 50-100 mcg OD in young adults",
      "Increase dose by 25-50 mcg every 4-6 weeks; target TSH 0.5-2.5 mIU/L",
      "Myxoedema coma: IV T4 300-500 mcg IV bolus + IV T3 5-20 mcg 8-12 hourly + IV Hydrocortisone 100mg TID",
      "Avoid iron supplements, antacids (reduce L-T4 absorption) — take L-T4 30 min before food",
      "Iodine supplementation for population-level prevention (iodized salt)",
    ],
    differentiatingFeature:
      "Differentiating Feature: Myxoedema coma triggers: infection, cold, sedatives. Non-pitting oedema (myxoedema) = glycosaminoglycan accumulation, not fluid. Hung-up ankle reflexes (delayed relaxation phase) = classic sign.",
    pearlPoints: [
      "Subclinical hypothyroidism: elevated TSH, normal T4 — treat if TSH >10 or symptomatic",
      "Cretinism = congenital hypothyroidism — intellectual disability + growth retardation; neonatal screening mandatory (heel-prick TSH)",
      "NEET PG: Most sensitive test = TSH (not T3/T4). For monitoring Levothyroxine therapy, check TSH 6-8 weeks after dose change",
      "Hashimoto's: anti-TPO antibodies (most sensitive), anti-Tg antibodies; goitre with hypothyroidism",
      "L-T4 half-life = 7 days; T3 half-life = 1 day (T3 more potent, faster onset)",
    ],
    keywords: [
      "hypothyroidism",
      "thyroid",
      "TSH raised",
      "low thyroid",
      "levothyroxine",
      "myxoedema",
      "Hashimoto",
      "cretinism",
      "thyroid hormone",
    ],
  },
  diabetic_complications: {
    title: "Diabetes Mellitus & Complications",
    overview:
      "DM1 (autoimmune, absolute insulin deficiency) vs DM2 (insulin resistance + relative deficiency). Major complications: Microvascular (retinopathy, nephropathy, neuropathy) and Macrovascular (IHD, stroke, PVD).",
    firstLine: [
      "Lifestyle: Medical nutrition therapy + exercise 150 min/week moderate aerobic",
      "DM2 first-line: Metformin 500mg OD (with food) → increase to 1g BD",
      "Add-on if HbA1c >7%: SGLT2 inhibitor (Dapagliflozin) or GLP-1 RA (Semaglutide) — cardioprotective",
      "Annual screening: HbA1c (target <7%), lipids, urine ACR (microalbuminuria), fundoscopy, foot examination",
      "Hypoglycaemia <70 mg/dL: Rule of 15 — 15g fast carbs, check after 15 min; if unconscious: Glucagon 1mg IM or Dextrose 50% 25mL IV",
      "Foot care: Daily inspection, appropriate footwear, monofilament testing for neuropathy",
    ],
    differentiatingFeature:
      "Differentiating Feature: Painless diabetic foot ulcer = peripheral neuropathy (loss of protective sensation). Charcot's arthropathy = hot, swollen, deformed foot with normal pulses = severe neuropathy complication.",
    pearlPoints: [
      "SGLT2 inhibitors (Dapagliflozin, Empagliflozin): reduce HbA1c + CV events + CKD progression + HF hospitalizations",
      "Diabetic ketoacidosis: DM1 emergency — insulin deficiency → ketone formation (see DKA protocol)",
      "NEET PG: First sign of diabetic nephropathy = microalbuminuria (30-300 mg/day); treat with ACE inhibitor",
      "Insulin storage: Room temperature up to 28 days; refrigerator (2-8°C) for unused vials",
      "Metformin: contraindicated if eGFR <30 (risk of lactic acidosis); hold 48 hours before contrast",
    ],
    keywords: [
      "diabetes",
      "diabetes mellitus",
      "DM2",
      "type 2 diabetes",
      "metformin",
      "HbA1c",
      "diabetic foot",
      "insulin resistance",
      "blood sugar control",
      "hyperglycemia",
    ],
  },
  ectopic_pregnancy: {
    title: "Ectopic Pregnancy",
    overview:
      "Implantation outside uterine cavity, 95% in fallopian tube. Medical emergency when ruptured. Risk factors: previous PID, tubal surgery, IUD use, previous ectopic. In India, incidence rising due to increasing PID rates.",
    firstLine: [
      "Ruptured ectopic = haemodynamic emergency: IV access x2, cross-match, urgent laparotomy",
      "Resuscitate: IV fluids + blood transfusion; O-negative blood if cross-match pending",
      "Salpingectomy (removal of tube) or salpingostomy (conservation) — depends on contralateral tube status",
      "Unruptured ectopic, stable: Methotrexate 50mg/m² IM — single dose (if bHCG <5000, no cardiac activity)",
      "Anti-D immunoglobulin 250 IU IM if Rh-negative patient",
      "Monitor bHCG weekly until undetectable post-methotrexate",
    ],
    differentiatingFeature:
      "Differentiating Feature: Amenorrhoea + Abdominal pain + Vaginal bleeding = ectopic until proven otherwise. Shoulder-tip pain = diaphragmatic irritation from haemoperitoneum. Cullen's sign = periumbilical bruising from haemoperitoneum.",
    pearlPoints: [
      "Serum bHCG should double every 48h in normal intrauterine pregnancy; sub-optimal rise = suspicious",
      "Discriminatory zone: bHCG >1500-2000 mIU/mL — intrauterine sac should be visible on TVS",
      "NEET PG: Most common site = ampullary portion of fallopian tube (most common rupture = isthmus)",
      "Criteria for Methotrexate: bHCG <5000, no cardiac activity on USS, tube <3.5cm, no rupture",
      "Salpingitis isthmica nodosa = risk factor for recurrent ectopic pregnancy",
    ],
    keywords: [
      "ectopic pregnancy",
      "tubal pregnancy",
      "PID",
      "fallopian tube",
      "bHCG",
      "ruptured ectopic",
      "methotrexate ectopic",
      "amenorrhoea pain bleeding",
    ],
  },
  acute_mi: {
    title: "ST-Elevation MI / STEMI",
    overview:
      "Complete occlusion of coronary artery — full thickness myocardial infarction. Time = Muscle: every 30 min delay = 7.5% increased mortality. Golden hour: PCI within 90 min, Thrombolysis within 30 min (if PCI unavailable).",
    firstLine: [
      "MONA: Morphine 2-4mg IV, Oxygen (if SpO2 <94%), Nitrates SL (avoid if hypotensive or RV infarct), Aspirin 300mg crushed/chewed",
      "Dual antiplatelet: Aspirin 300mg + Ticagrelor 180mg (preferred over Clopidogrel 600mg)",
      "Primary PCI within 90 minutes (door-to-balloon time) = gold standard in India at PCI-capable centres",
      "Thrombolysis (if PCI unavailable within 120 min): Tenecteplase/Streptokinase weight-based IV",
      "IV Heparin: UFH 60 U/kg IV bolus (max 4000 U) then 12 U/kg/hour infusion",
      "Beta-blocker (Metoprolol 25-50mg oral) within 24h if stable — reduce infarct size and arrhythmia risk",
    ],
    differentiatingFeature:
      "Differentiating Feature: STEMI = persistent ST elevation >1mm in 2+ contiguous limb leads (or >2mm in V1-V4). Posterior MI = tall R wave + ST depression in V1-V2 (mirror image). RV MI = ST elevation in V4R.",
    pearlPoints: [
      "Contraindications to thrombolysis: recent surgery (<3 months), stroke (<3 months), active bleeding, aortic dissection",
      "RV MI: Avoid nitrates + diuretics (preload-dependent RV); give IV fluids",
      "NEET PG: Troponin I/T = most sensitive AND specific marker for MI; rises 4-6h, peaks 24h, normalises 7-14 days",
      "Post-MI drugs: Aspirin + Beta-blocker + ACE inhibitor + Statin (ABAS) for life",
      "Door-to-balloon time <90 minutes = Class I recommendation (AHA/ESC/Indian guidelines)",
    ],
    keywords: [
      "heart attack",
      "MI",
      "myocardial infarction",
      "STEMI",
      "chest pain crushing",
      "coronary",
      "ECG ST elevation",
      "troponin",
      "thrombolysis",
      "PCI",
      "ACS STEMI",
    ],
  },
  dengue_severe: {
    title: "Dengue Haemorrhagic Fever / Severe Dengue",
    overview:
      "Dengue virus (4 serotypes, DENV1-4) — transmitted by Aedes aegypti. Severe dengue criteria: plasma leakage with shock (DSS), severe bleeding, severe organ impairment. Platelet <20,000 or active bleeding = danger sign.",
    firstLine: [
      "NS1 Antigen (Day 1-5), IgM ELISA (Day 5+), IgG for secondary infection",
      "Hydration: Oral rehydration for non-severe; IV RL/NS for severe (5-10 mL/kg/hour)",
      "Dengue Shock Syndrome: IV NS/RL 10-20 mL/kg over 15-30 min; titrate to haemodynamic response",
      "Platelet transfusion: ONLY for platelet <10,000 OR <20,000 with active bleeding",
      "Paracetamol for fever — AVOID NSAIDs and Aspirin (bleeding risk)",
      "Daily CBC monitoring — watch for haematocrit rise >20% (plasma leakage warning)",
    ],
    differentiatingFeature:
      "Differentiating Feature: Tourniquet test (≥10 petechiae per square inch) = positive = thrombocytopaenia/vascular fragility. Saddle-back fever (biphasic) + thrombocytopenia + leukopenia = classic Dengue triad.",
    pearlPoints: [
      "Critical phase: Day 3-7 of illness — plasma leakage, thrombocytopenia, risk of shock",
      "Dengue vs Chikungunya: Dengue = severe myalgia + thrombocytopenia; Chikungunya = severe joint pain (arthralgia), normal platelets",
      "NEET PG: Dengue shock syndrome = plasma leakage across endothelium due to NS1 protein (not blood loss)",
      "Warning signs: abdominal pain, persistent vomiting, rapid breathing, bleeding gums, fatigue, liver enlargement, rising HCT + rapid platelet drop",
      "No specific antiviral for dengue — management is purely supportive",
    ],
    keywords: [
      "dengue severe",
      "dengue hemorrhagic fever",
      "DHF",
      "dengue shock",
      "DSS",
      "platelet transfusion dengue",
      "NS1 antigen",
      "dengue warning signs",
    ],
  },
  seizures_epilepsy: {
    title: "Seizures & Status Epilepticus",
    overview:
      "Status Epilepticus = continuous seizure >5 min OR 2+ seizures without recovery. GCSE (Generalized Convulsive Status Epilepticus) = life-threatening emergency. Mortality 20% if not treated within 30 min.",
    firstLine: [
      "0-5 min: Benzodiazepines IV — Lorazepam 0.1mg/kg IV (max 4mg) OR Diazepam 0.15mg/kg IV",
      "If no IV: Midazolam 10mg IM or Buccal Midazolam 10mg (equally effective to IV lorazepam)",
      "5-30 min: Levetiracetam 60mg/kg IV over 15 min (preferred, less side effects than Phenytoin)",
      "OR Fosphenytoin 20mg PE/kg IV (150mg PE/min max) — monitor ECG during infusion",
      "30-60 min (Refractory SE): Phenobarbitone 20mg/kg IV + general anaesthesia (Propofol/Thiopentone)",
      "Check: BGL (hypoglycaemia), electrolytes (Na, Ca, Mg), drug levels, sepsis",
    ],
    differentiatingFeature:
      "Differentiating Feature: Absence seizure = 3Hz spike-wave on EEG + blank stare (childhood) — no post-ictal confusion. Temporal lobe seizure = aura (déjà vu/jamais vu) + automatisms + post-ictal confusion.",
    pearlPoints: [
      "IV Glucose 50mL of 50% Dextrose empirically if hypoglycaemia suspected — never withhold",
      "Thiamine 100mg IV before dextrose in alcoholics (prevents Wernicke's encephalopathy)",
      "NEET PG: Juvenile Myoclonic Epilepsy (JME) = most common genetic epilepsy; Valproate = drug of choice (avoid in women of childbearing age)",
      "Driving restrictions: minimum 6 months seizure-free before driving (in India — variable by state)",
      "Febrile seizures: not epilepsy; recurrence risk 30-50%; only antipyretics needed, not AEDs",
    ],
    keywords: [
      "seizure",
      "epilepsy",
      "status epilepticus",
      "convulsion",
      "fit",
      "diazepam seizure",
      "lorazepam seizure",
      "antiepileptic",
      "ECT brain",
    ],
  },
};

// ─── Extended Disease DB Search ──────────────────────────────────
function searchExtendedDB(query: string): DiseaseEntry | null {
  const q = query.toLowerCase();
  const direct = ALL_DISEASES_DB.find((d) => q.includes(d.name.toLowerCase()));
  if (direct) return direct;
  const scored = ALL_DISEASES_DB.map((d) => {
    let score = 0;
    const text =
      `${d.name} ${d.definition} ${d.category} ${d.clinicalFeatures.join(" ")}`.toLowerCase();
    for (const w of q.split(/\s+/).filter((w) => w.length > 3)) {
      if (text.includes(w)) score += 1;
    }
    if (
      d.name
        .toLowerCase()
        .split(" ")
        .some((w) => q.includes(w) && w.length > 3)
    )
      score += 5;
    return { d, score };
  });
  const best = scored.sort((a, b) => b.score - a.score)[0];
  return best && best.score > 0 ? best.d : null;
}

function formatExtendedDBResponse(entry: DiseaseEntry): string {
  const drugs = entry.indianBrandDrugs
    ? `\n\n**Indian Brands:** ${entry.indianBrandDrugs.join(", ")}`
    : "";
  const icmr = entry.icmrProtocol
    ? `\n\n**ICMR Protocol:** ${entry.icmrProtocol}`
    : "";
  return [
    `**${entry.name}** (${entry.icd10})`,
    `**Subject:** ${entry.subject} | **Category:** ${entry.category}`,
    "",
    "**Definition:**",
    entry.definition,
    "",
    `**Etiology:** ${entry.etiology}`,
    "",
    "**Clinical Features:**",
    entry.clinicalFeatures.map((f) => `• ${f}`).join("\n"),
    "",
    "**Key Investigations:**",
    entry.investigations.map((i) => `• ${i}`).join("\n"),
    "",
    `**Treatment:** ${entry.treatment}`,
    icmr,
    drugs,
  ].join("\n");
}

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
  {
    pattern: /metformin.*(stage|GFR|CKD).*(3b|4|5|<30|30)/i,
    warning:
      "Warning: Metformin is contraindicated when eGFR <30 mL/min (CKD Stage 4-5). Risk of lactic acidosis. Check renal function before prescribing.",
  },
  {
    pattern: /digoxin\s*(0\.[5-9]|[1-9])\s*mg/i,
    warning:
      "Warning: Digoxin therapeutic range is narrow (0.5-0.9 ng/mL). Standard dose is 0.125-0.25mg OD. Adjust for renal function and check K+ levels — hypokalaemia potentiates toxicity.",
  },
  {
    pattern: /warfarin\s*[5-9]\s*mg|warfarin\s*1[0-9]\s*mg/i,
    warning:
      "Warning: Warfarin doses >5mg are unusual without dose-escalation titration. INR must guide dosing (target 2-3 for most indications, 2.5-3.5 for mechanical heart valves).",
  },
  {
    pattern: /lithium\s*(2[0-9]{2,}|[3-9]\d{2,})\s*mg/i,
    warning:
      "Warning: Lithium has a narrow therapeutic index (0.6-1.2 mEq/L). Signs of toxicity: tremor, ataxia, confusion, polyuria. Monitor levels every 3 months and ensure adequate hydration.",
  },
  {
    pattern:
      /vancomycin.*(500|750|1000|1500|2000)\s*mg\s*rapid|rapid.*vancomycin/i,
    warning:
      "Warning: Vancomycin must be infused slowly (over minimum 60 minutes, ideally 90-120 min). Rapid infusion causes Red Man Syndrome (flushing, erythema, hypotension). Not a true allergy — slow the infusion.",
  },
];

// ─── Quick suggestion chips ───────────────────────────────────────

const QUICK_SUGGESTIONS = [
  "Heart Failure Management",
  "STEMI Protocol",
  "Seizure Emergency",
  "Meningitis Treatment",
  "AKI Management",
  "Typhoid Protocol",
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
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-3 py-2.5"
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
          className="max-w-[75%] rounded-2xl rounded-br-sm px-3 py-2.5 text-sm"
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
            className="rounded-2xl rounded-bl-sm px-3 py-2.5 space-y-2.5"
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
            className="rounded-2xl rounded-bl-sm px-3 py-2.5 space-y-2.5"
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

      // 1b. Search extended disease DB (Anatomy + Physiology batch)
      const extendedMatch = searchExtendedDB(userMessage);
      if (extendedMatch) {
        const responseText = formatExtendedDBResponse(extendedMatch);
        const pearlEntry = extendedMatch;
        const aiMsg: AIMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: responseText,
          responseType: "icmr_protocol" as const,
          icmrProtocol: {
            title: pearlEntry.name,
            overview: pearlEntry.definition,
            firstLine: pearlEntry.clinicalFeatures.slice(0, 4),
            differentiatingFeature: pearlEntry.differentiatingFeature,
            pearlPoints: pearlEntry.pearlPoints,
          },
          doseWarning: matchedWarning?.warning,
          probability: 90,
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
        className="flex-shrink-0 border-b px-3 sm:px-5 py-2 sm:py-3"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.17 0.05 235 / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto max-w-3xl space-y-2">
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
        <div className="mx-auto max-w-3xl space-y-3 px-3 sm:px-5 py-3 sm:py-4">
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
