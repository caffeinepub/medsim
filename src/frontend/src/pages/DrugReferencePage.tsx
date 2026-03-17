import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────

interface Drug {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  drugClass: string;
  moa: string;
  indications: string[];
  sideEffects: string[];
  dosage: string;
  contraindications: string[];
  renalDose?: string;
  pregnancyCategory?: string;
}

// ─── Seed Data ─────────────────────────────────────────────────────

const DRUG_DATABASE: Drug[] = [
  // ── Cardiovascular ────────────────────────────────────────────
  {
    id: "digoxin",
    name: "Digoxin",
    category: "Cardiovascular",
    drugClass: "Cardiac Glycoside",
    moa: "Inhibits Na+/K+-ATPase pump → increases intracellular Ca²⁺ → positive inotropy. Also increases vagal tone → slows AV conduction (negative chronotropy).",
    indications: [
      "Atrial fibrillation (rate control)",
      "Heart failure with reduced EF",
      "Atrial flutter",
    ],
    sideEffects: [
      "Nausea / vomiting",
      "Visual disturbances (xanthopsia)",
      "Bradycardia",
      "Heart block",
      "Arrhythmias (toxicity)",
    ],
    dosage: "0.125–0.25 mg PO OD; loading: 0.5–1 mg IV in divided doses",
    contraindications: [
      "Ventricular fibrillation",
      "WPW syndrome",
      "Hypertrophic obstructive cardiomyopathy",
    ],
    renalDose: "Dose reduction required; monitor levels",
    pregnancyCategory: "C",
  },
  {
    id: "furosemide",
    name: "Furosemide",
    category: "Cardiovascular",
    drugClass: "Loop Diuretic",
    moa: "Inhibits Na+/K+/2Cl⁻ co-transporter in thick ascending limb of loop of Henle → reduces salt and water reabsorption.",
    indications: [
      "Acute pulmonary oedema",
      "Heart failure",
      "Hypertension",
      "Nephrotic syndrome",
      "Hypercalcaemia",
    ],
    sideEffects: [
      "Hypokalaemia",
      "Hyponatraemia",
      "Ototoxicity (high dose IV)",
      "Hyperuricaemia",
      "Dehydration",
    ],
    dosage: "20–80 mg PO/IV OD–BD; acute oedema: 40–120 mg IV bolus",
    contraindications: [
      "Anuria",
      "Sulphonamide hypersensitivity",
      "Severe hypokalaemia",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "atenolol",
    name: "Atenolol",
    category: "Cardiovascular",
    drugClass: "Selective β₁-Blocker",
    moa: "Selectively blocks β₁-adrenoceptors → reduces heart rate, myocardial contractility, and renin release → lowers blood pressure and myocardial oxygen demand.",
    indications: [
      "Hypertension",
      "Angina pectoris",
      "Post-MI cardioprotection",
      "Arrhythmias",
    ],
    sideEffects: [
      "Bradycardia",
      "Fatigue",
      "Cold extremities",
      "Bronchoconstriction (high dose)",
      "Masking of hypoglycaemia",
    ],
    dosage: "25–100 mg PO OD",
    contraindications: [
      "Severe bradycardia",
      "AV block (2nd/3rd degree)",
      "Decompensated heart failure",
      "Severe asthma",
    ],
    pregnancyCategory: "D",
  },
  {
    id: "amlodipine",
    name: "Amlodipine",
    category: "Cardiovascular",
    drugClass: "Dihydropyridine Calcium Channel Blocker",
    moa: "Blocks L-type Ca²⁺ channels in vascular smooth muscle → vasodilation → reduced peripheral resistance and blood pressure.",
    indications: [
      "Hypertension",
      "Stable angina",
      "Vasospastic (Prinzmetal) angina",
    ],
    sideEffects: [
      "Peripheral oedema",
      "Flushing",
      "Headache",
      "Palpitations",
      "Gingival hyperplasia (rare)",
    ],
    dosage: "5–10 mg PO OD",
    contraindications: [
      "Cardiogenic shock",
      "Severe aortic stenosis",
      "Unstable angina (without nitrates)",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "enalapril",
    name: "Enalapril",
    category: "Cardiovascular",
    drugClass: "ACE Inhibitor",
    moa: "Inhibits angiotensin-converting enzyme → reduces angiotensin II and aldosterone → vasodilation, decreased preload/afterload, decreased Na+ retention.",
    indications: [
      "Hypertension",
      "Heart failure",
      "Post-MI LV dysfunction",
      "Diabetic nephropathy",
    ],
    sideEffects: [
      "Dry cough (bradykinin accumulation)",
      "Hyperkalaemia",
      "First-dose hypotension",
      "Angioedema",
      "Renal impairment",
    ],
    dosage: "2.5–40 mg PO OD–BD",
    contraindications: [
      "Pregnancy",
      "Bilateral renal artery stenosis",
      "Angioedema history",
      "Hyperkalaemia",
    ],
    pregnancyCategory: "D",
  },
  {
    id: "warfarin",
    name: "Warfarin",
    category: "Cardiovascular",
    drugClass: "Vitamin K Antagonist (Anticoagulant)",
    moa: "Inhibits VKORC1 enzyme → reduces regeneration of Vitamin K → decreased synthesis of clotting factors II, VII, IX, X, and proteins C and S.",
    indications: [
      "DVT/PE (treatment and prevention)",
      "Atrial fibrillation (stroke prevention)",
      "Mechanical heart valves",
    ],
    sideEffects: [
      "Bleeding",
      "Skin necrosis (early, protein C deficiency)",
      "Teratogenicity",
      "Drug interactions (extensive)",
    ],
    dosage:
      "Individualised; target INR 2–3 (most indications), 2.5–3.5 (mechanical valves)",
    contraindications: [
      "Pregnancy",
      "Active bleeding",
      "Severe liver disease",
      "Recent surgery on brain/eye/spinal cord",
    ],
    pregnancyCategory: "X",
  },
  {
    id: "aspirin",
    name: "Aspirin (Acetylsalicylic Acid)",
    category: "Cardiovascular",
    drugClass: "Antiplatelet / NSAID",
    moa: "Irreversibly inhibits COX-1 and COX-2 → reduces TXA₂ synthesis → inhibits platelet aggregation (antiplatelet at low dose); anti-inflammatory/analgesic at higher doses.",
    indications: [
      "ACS / MI prevention",
      "Stroke prevention",
      "Kawasaki disease",
      "Fever / pain (higher doses)",
    ],
    sideEffects: [
      "GI irritation / ulceration",
      "Bleeding",
      "Reye's syndrome (children)",
      "Tinnitus (high dose)",
      "Bronchospasm (aspirin-sensitive asthma)",
    ],
    dosage:
      "75–150 mg PO OD (antiplatelet); 300 mg loading for ACS; 650 mg–1 g for analgesia",
    contraindications: [
      "Active peptic ulcer",
      "Bleeding disorders",
      "Children with viral illness",
      "Aspirin-sensitive asthma",
    ],
    pregnancyCategory: "D (3rd trimester)",
  },
  {
    id: "clopidogrel",
    name: "Clopidogrel",
    category: "Cardiovascular",
    drugClass: "P2Y12 ADP Receptor Antagonist (Antiplatelet)",
    moa: "Irreversibly blocks P2Y12 ADP receptor on platelets → inhibits ADP-induced platelet aggregation and activation.",
    indications: [
      "ACS (dual antiplatelet with aspirin)",
      "PTCA/stent (prevention of stent thrombosis)",
      "Ischaemic stroke / TIA",
      "PAD",
    ],
    sideEffects: ["Bleeding", "GI upset", "TTP (rare)", "Rash"],
    dosage: "75 mg PO OD (maintenance); 300–600 mg loading dose for ACS/PCI",
    contraindications: [
      "Active pathological bleeding",
      "Severe hepatic impairment",
    ],
    pregnancyCategory: "B",
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    category: "Cardiovascular",
    drugClass: "HMG-CoA Reductase Inhibitor (Statin)",
    moa: "Competitively inhibits HMG-CoA reductase → reduces hepatic cholesterol synthesis → upregulates LDL receptors → lowers LDL-C, VLDL, triglycerides; mild HDL increase.",
    indications: [
      "Primary / secondary prevention of ASCVD",
      "Hypercholesterolaemia",
      "Hypertriglyceridaemia",
    ],
    sideEffects: [
      "Myalgia / myopathy / rhabdomyolysis",
      "Elevated liver enzymes",
      "New-onset diabetes",
      "Headache",
    ],
    dosage: "10–80 mg PO OD (evening preferred)",
    contraindications: [
      "Active liver disease",
      "Pregnancy / lactation",
      "Co-administration with strong CYP3A4 inhibitors",
    ],
    pregnancyCategory: "X",
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin (GTN)",
    category: "Cardiovascular",
    drugClass: "Organic Nitrate / Vasodilator",
    moa: "Releases NO → activates guanylate cyclase → ↑cGMP → smooth muscle relaxation → venodilation (reduces preload); coronary vasodilation at higher doses.",
    indications: [
      "Acute angina (sublingual)",
      "Acute MI",
      "Hypertensive emergency",
      "Acute pulmonary oedema",
    ],
    sideEffects: [
      "Headache",
      "Hypotension",
      "Reflex tachycardia",
      "Flushing",
      "Tolerance with continuous use",
    ],
    dosage:
      "0.4 mg SL PRN (angina); IV infusion 5–200 µg/min for acute indications",
    contraindications: [
      "Hypotension (SBP <90 mmHg)",
      "Concurrent PDE-5 inhibitors (sildenafil)",
      "Severe aortic stenosis",
      "Raised ICP",
    ],
    pregnancyCategory: "C",
  },
  // ── Respiratory ───────────────────────────────────────────────
  {
    id: "salbutamol",
    name: "Salbutamol (Albuterol)",
    category: "Respiratory",
    drugClass: "Short-Acting β₂ Agonist (SABA)",
    moa: "Selectively stimulates β₂-adrenoceptors in bronchial smooth muscle → bronchodilation via ↑cAMP → smooth muscle relaxation.",
    indications: [
      "Acute bronchospasm / asthma attack",
      "COPD (acute exacerbation)",
      "Exercise-induced bronchospasm",
      "Hyperkalaemia (IV)",
    ],
    sideEffects: [
      "Tremor",
      "Tachycardia",
      "Palpitations",
      "Hypokalaemia (high dose)",
      "Headache",
    ],
    dosage:
      "2.5 mg nebulised or 100–200 µg inhaled PRN; 2.5–5 mg IV for hyperkalaemia",
    contraindications: ["Hypersensitivity"],
    pregnancyCategory: "C",
  },
  {
    id: "ipratropium",
    name: "Ipratropium Bromide",
    category: "Respiratory",
    drugClass: "Short-Acting Muscarinic Antagonist (SAMA)",
    moa: "Blocks muscarinic M3 receptors in bronchial smooth muscle → prevents bronchoconstriction and reduces secretions.",
    indications: [
      "COPD maintenance",
      "Acute severe asthma (adjunct to salbutamol)",
      "Rhinorrhoea",
    ],
    sideEffects: [
      "Dry mouth",
      "Urinary retention",
      "Constipation",
      "Blurred vision",
      "Paradoxical bronchospasm (rare)",
    ],
    dosage: "250–500 µg nebulised 4–6 hourly; 20–40 µg inhaled TID–QID",
    contraindications: [
      "Narrow-angle glaucoma",
      "Prostatic hypertrophy (caution)",
    ],
    pregnancyCategory: "B",
  },
  {
    id: "fluticasone",
    name: "Fluticasone Propionate",
    category: "Respiratory",
    drugClass: "Inhaled Corticosteroid (ICS)",
    moa: "Binds glucocorticoid receptors → inhibits inflammatory cytokines (IL-4, IL-5, TNF-α) → reduces airway inflammation, oedema, and mucus secretion.",
    indications: [
      "Asthma (maintenance)",
      "COPD (with LABA)",
      "Allergic rhinitis (intranasal)",
    ],
    sideEffects: [
      "Oropharyngeal candidiasis",
      "Dysphonia",
      "Adrenal suppression (high dose)",
      "Osteoporosis (long-term)",
    ],
    dosage: "100–500 µg inhaled BD",
    contraindications: ["Hypersensitivity"],
    pregnancyCategory: "C",
  },
  {
    id: "montelukast",
    name: "Montelukast",
    category: "Respiratory",
    drugClass: "Leukotriene Receptor Antagonist (LTRA)",
    moa: "Selectively antagonises cysteinyl leukotriene CysLT1 receptors → reduces bronchoconstriction and airway inflammation.",
    indications: [
      "Asthma (add-on therapy)",
      "Allergic rhinitis",
      "Exercise-induced bronchoconstriction",
    ],
    sideEffects: [
      "Headache",
      "Neuropsychiatric effects (depression, suicidal ideation — rare)",
      "GI disturbance",
    ],
    dosage: "10 mg PO OD (adults); 5 mg (children 6–14 yrs)",
    contraindications: ["Hypersensitivity"],
    pregnancyCategory: "B",
  },
  {
    id: "nac",
    name: "N-Acetylcysteine (NAC)",
    category: "Respiratory",
    drugClass: "Mucolytic / Antidote",
    moa: "Replenishes glutathione stores (antidote use); breaks disulphide bonds in mucus glycoproteins → reduces mucus viscosity (mucolytic use).",
    indications: [
      "Paracetamol (acetaminophen) overdose",
      "COPD (mucolytic)",
      "Contrast-induced nephropathy prevention",
    ],
    sideEffects: [
      "Nausea / vomiting",
      "Flushing",
      "Anaphylactoid reaction (IV, rare)",
    ],
    dosage:
      "Paracetamol OD: 150 mg/kg IV over 60 min then protocol; mucolytic: 200 mg PO TID",
    contraindications: ["Hypersensitivity (relative for IV)"],
    pregnancyCategory: "B",
  },
  // ── Antibiotics ───────────────────────────────────────────────
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "Antibiotics",
    drugClass: "Aminopenicillin (β-lactam)",
    moa: "Binds PBPs (penicillin-binding proteins) → inhibits transpeptidation step in bacterial cell wall synthesis → bactericidal.",
    indications: [
      "Community-acquired pneumonia",
      "UTI",
      "Otitis media",
      "Sinusitis",
      "H. pylori eradication (combination)",
    ],
    sideEffects: [
      "Diarrhoea",
      "Nausea",
      "Rash (especially in EBV infection)",
      "Anaphylaxis",
    ],
    dosage: "250–500 mg PO TID; 1 g PO TID for severe infections",
    contraindications: ["Penicillin / β-lactam allergy"],
    pregnancyCategory: "B",
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    category: "Antibiotics",
    drugClass: "Fluoroquinolone",
    moa: "Inhibits bacterial DNA gyrase (topoisomerase II) and topoisomerase IV → prevents DNA supercoiling and replication → bactericidal.",
    indications: [
      "UTI (complicated)",
      "GI infections (typhoid, traveller's diarrhoea)",
      "RTI",
      "Anthrax prophylaxis",
    ],
    sideEffects: [
      "Tendinopathy / tendon rupture",
      "QTc prolongation",
      "Photosensitivity",
      "GI disturbance",
      "CNS effects",
    ],
    dosage: "500–750 mg PO BD; 400 mg IV BD",
    contraindications: [
      "Concurrent QTc-prolonging drugs",
      "Children (cartilage damage — avoid)",
      "G6PD deficiency (relative)",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "metronidazole",
    name: "Metronidazole",
    category: "Antibiotics",
    drugClass: "Nitroimidazole",
    moa: "Reduced by microbial enzymes to reactive nitro radical intermediates → damage microbial DNA → bactericidal / antiprotozoal.",
    indications: [
      "Anaerobic bacterial infections",
      "C. difficile colitis",
      "Amoebiasis",
      "Trichomoniasis",
      "H. pylori eradication",
    ],
    sideEffects: [
      "Metallic taste",
      "Nausea",
      "Peripheral neuropathy (prolonged use)",
      "Disulfiram-like reaction with alcohol",
    ],
    dosage: "400–500 mg PO TID; 500 mg IV TID for severe infection",
    contraindications: [
      "First trimester pregnancy",
      "Alcohol use (disulfiram reaction)",
    ],
    pregnancyCategory: "B (avoid 1st trimester)",
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    category: "Antibiotics",
    drugClass: "Macrolide",
    moa: "Binds 50S ribosomal subunit (23S rRNA) → inhibits translocation → bacteriostatic; bactericidal at high concentrations.",
    indications: [
      "Community-acquired pneumonia",
      "Atypical pneumonia (Mycoplasma, Chlamydia)",
      "STIs (Chlamydia, gonorrhoea)",
      "Typhoid (alternative)",
    ],
    sideEffects: [
      "GI disturbance",
      "QTc prolongation",
      "Hepatotoxicity (rare)",
      "Hearing loss (rare, high dose)",
    ],
    dosage: "500 mg PO OD on day 1, then 250 mg OD for 4 days; Z-pack",
    contraindications: [
      "QTc prolongation / concurrent QTc-prolonging drugs",
      "Macrolide allergy",
    ],
    pregnancyCategory: "B",
  },
  {
    id: "vancomycin",
    name: "Vancomycin",
    category: "Antibiotics",
    drugClass: "Glycopeptide",
    moa: "Binds D-Ala-D-Ala terminus of peptidoglycan precursors → inhibits cell wall synthesis. Active against Gram-positive organisms including MRSA.",
    indications: [
      "MRSA infections",
      "C. difficile colitis (oral, non-absorbed)",
      "Endocarditis (penicillin allergy)",
      "CNSI meningitis (adjunct)",
    ],
    sideEffects: [
      "'Red-man syndrome' (rapid infusion)",
      "Nephrotoxicity",
      "Ototoxicity",
      "Thrombophlebitis",
    ],
    dosage:
      "15–20 mg/kg IV Q8–12H (AUC/MIC-guided dosing); 125–500 mg PO QID for C. diff",
    contraindications: ["Hypersensitivity"],
    renalDose: "Significant dose reduction; TDM mandatory",
    pregnancyCategory: "C",
  },
  {
    id: "meropenem",
    name: "Meropenem",
    category: "Antibiotics",
    drugClass: "Carbapenem (β-lactam)",
    moa: "Binds PBPs → inhibits cell wall synthesis. Ultra-broad spectrum; stable to most β-lactamases including ESBL.",
    indications: [
      "Hospital-acquired pneumonia",
      "Intra-abdominal infections",
      "Febrile neutropaenia",
      "Meningitis",
      "MDR Gram-negative infections",
    ],
    sideEffects: [
      "Diarrhoea",
      "Nausea",
      "Elevated liver enzymes",
      "Seizures (high dose, renal impairment)",
    ],
    dosage: "500 mg–1 g IV Q8H; 2 g IV Q8H for meningitis / severe infections",
    contraindications: ["β-lactam allergy (cross-reactivity low)"],
    renalDose: "Reduce dose and/or frequency based on eGFR",
    pregnancyCategory: "B",
  },
  {
    id: "doxycycline",
    name: "Doxycycline",
    category: "Antibiotics",
    drugClass: "Tetracycline",
    moa: "Binds 30S ribosomal subunit → inhibits binding of aminoacyl-tRNA → bacteriostatic.",
    indications: [
      "Atypical pneumonia",
      "Malaria prophylaxis",
      "Rickettsial infections",
      "Acne vulgaris",
      "STIs (Chlamydia, syphilis)",
      "Lyme disease",
    ],
    sideEffects: [
      "Photosensitivity",
      "Oesophageal ulceration",
      "GI disturbance",
      "Tooth discolouration (children)",
    ],
    dosage: "100 mg PO BD (with food); 200 mg loading dose",
    contraindications: [
      "Pregnancy",
      "Children <8 years",
      "Severe hepatic impairment",
    ],
    pregnancyCategory: "D",
  },
  {
    id: "clindamycin",
    name: "Clindamycin",
    category: "Antibiotics",
    drugClass: "Lincosamide",
    moa: "Binds 50S ribosomal subunit → inhibits translocation → bacteriostatic against most; bactericidal against some organisms.",
    indications: [
      "Skin and soft tissue infections (SSTI)",
      "Bone and joint infections",
      "Anaerobic infections",
      "Toxin-producing staphylococcal / streptococcal infections",
      "Malaria (combination)",
    ],
    sideEffects: [
      "C. difficile colitis (high risk)",
      "Diarrhoea",
      "Nausea",
      "Metallic taste",
    ],
    dosage: "150–450 mg PO QID; 600–2700 mg/day IV in divided doses",
    contraindications: ["History of C. difficile colitis"],
    pregnancyCategory: "B",
  },
  // ── CNS ───────────────────────────────────────────────────────
  {
    id: "phenytoin",
    name: "Phenytoin",
    category: "CNS",
    drugClass: "Anticonvulsant (Hydantoin)",
    moa: "Blocks voltage-gated Na⁺ channels (inactivated state) → stabilises neuronal membranes → reduces repetitive firing.",
    indications: [
      "Generalised tonic-clonic seizures",
      "Partial (focal) seizures",
      "Status epilepticus (IV)",
      "Trigeminal neuralgia (alternative)",
    ],
    sideEffects: [
      "Nystagmus",
      "Ataxia",
      "Gingival hyperplasia",
      "Hirsutism",
      "Megaloblastic anaemia",
      "Teratogenicity (fetal hydantoin syndrome)",
    ],
    dosage: "300–400 mg PO OD/BD; 18–20 mg/kg IV loading (max rate 50 mg/min)",
    contraindications: ["Sinus bradycardia", "AV block", "Porphyria"],
    pregnancyCategory: "D",
  },
  {
    id: "valproate",
    name: "Sodium Valproate",
    category: "CNS",
    drugClass: "Anticonvulsant / Mood Stabiliser",
    moa: "Multiple: inhibits voltage-gated Na⁺ and Ca²⁺ channels; increases GABA by inhibiting GABA transaminase and succinate semialdehyde dehydrogenase.",
    indications: [
      "All seizure types (especially absence and myoclonic)",
      "Bipolar disorder (acute mania)",
      "Migraine prophylaxis",
    ],
    sideEffects: [
      "Weight gain",
      "Tremor",
      "Alopecia",
      "Hepatotoxicity",
      "Pancreatitis",
      "Neural tube defects (teratogen — avoid in women of childbearing age)",
    ],
    dosage: "500 mg–2000 mg/day PO in 2 divided doses; TDM target 50–100 mg/L",
    contraindications: [
      "Pregnancy (high teratogen risk)",
      "Hepatic dysfunction",
      "Urea cycle disorders",
    ],
    pregnancyCategory: "D",
  },
  {
    id: "phenobarbitone",
    name: "Phenobarbitone (Phenobarbital)",
    category: "CNS",
    drugClass: "Barbiturate Anticonvulsant",
    moa: "Enhances GABA-A receptor activity (prolongs Cl⁻ channel opening) → CNS depression; also blocks AMPA and kainate receptors.",
    indications: [
      "Neonatal seizures",
      "Status epilepticus (2nd line)",
      "Generalised tonic-clonic seizures",
      "Febrile seizures prophylaxis",
    ],
    sideEffects: [
      "Sedation",
      "Cognitive impairment",
      "Dependence",
      "Paradoxical hyperactivity in children",
      "Enzyme induction (multiple drug interactions)",
    ],
    dosage:
      "60–180 mg PO OD (nocte); 15–20 mg/kg IV loading for status epilepticus",
    contraindications: ["Acute porphyria", "Severe respiratory depression"],
    pregnancyCategory: "D",
  },
  {
    id: "haloperidol",
    name: "Haloperidol",
    category: "CNS",
    drugClass: "Typical Antipsychotic (Butyrophenone)",
    moa: "Potent D2 dopamine receptor antagonist in mesolimbic pathway → antipsychotic effect. Also blocks α1, H1, muscarinic receptors.",
    indications: [
      "Schizophrenia",
      "Acute psychosis",
      "Delirium (ICU)",
      "Tourette syndrome",
      "Antiemetic (IV/IM)",
    ],
    sideEffects: [
      "EPS (dystonia, akathisia, parkinsonism, tardive dyskinesia)",
      "QTc prolongation",
      "NMS (rare but fatal)",
      "Sedation",
      "Hyperprolactinaemia",
    ],
    dosage: "0.5–5 mg PO BD–TID; 2–10 mg IM/IV for acute agitation",
    contraindications: [
      "QTc prolongation / concurrent QTc drugs",
      "Parkinson's disease",
      "Coma / CNS depression",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "diazepam",
    name: "Diazepam",
    category: "CNS",
    drugClass: "Benzodiazepine",
    moa: "Positive allosteric modulator of GABA-A receptor → increases frequency of Cl⁻ channel opening → CNS depression.",
    indications: [
      "Acute seizures / status epilepticus (IV)",
      "Alcohol withdrawal",
      "Anxiety disorders",
      "Muscle spasm",
      "Pre-procedural sedation",
    ],
    sideEffects: [
      "Sedation",
      "Respiratory depression",
      "Dependence / withdrawal",
      "Anterograde amnesia",
      "Paradoxical agitation",
    ],
    dosage:
      "5–10 mg IV for seizures (can repeat once); 2–10 mg PO TID–QID for anxiety",
    contraindications: [
      "Respiratory depression",
      "Sleep apnoea",
      "Myasthenia gravis",
      "Acute narrow-angle glaucoma",
    ],
    pregnancyCategory: "D",
  },
  {
    id: "morphine",
    name: "Morphine Sulphate",
    category: "CNS",
    drugClass: "Opioid Analgesic (μ-agonist)",
    moa: "Activates μ (mu) opioid receptors → inhibits adenylyl cyclase → ↓cAMP → inhibition of neuronal transmission; inhibits substance P release in dorsal horn.",
    indications: [
      "Moderate–severe acute pain (post-op, MI, trauma)",
      "Cancer pain",
      "Acute pulmonary oedema (reduces preload)",
      "Dyspnoea in palliative care",
    ],
    sideEffects: [
      "Respiratory depression",
      "Constipation",
      "Nausea / vomiting",
      "Sedation",
      "Dependence",
      "Miosis",
    ],
    dosage:
      "2–4 mg IV Q2–4H titrated; 5–15 mg PO Q4H; 10 mg/mL standard IV concentration",
    contraindications: [
      "Respiratory depression without airway support",
      "Acute asthma",
      "Raised ICP (caution)",
      "Concurrent MAOIs",
    ],
    renalDose: "Reduce dose; active metabolites accumulate",
    pregnancyCategory: "C",
  },
  {
    id: "tramadol",
    name: "Tramadol",
    category: "CNS",
    drugClass: "Opioid Agonist + SNRI",
    moa: "Weak μ-opioid receptor agonist; inhibits reuptake of noradrenaline and serotonin → central analgesia via dual mechanism.",
    indications: [
      "Moderate pain (when NSAIDs insufficient)",
      "Neuropathic pain",
    ],
    sideEffects: [
      "Nausea / vomiting",
      "Seizures (lower threshold)",
      "Serotonin syndrome (with SSRIs)",
      "Dependence",
      "Dizziness",
    ],
    dosage: "50–100 mg PO Q4–6H PRN; max 400 mg/day",
    contraindications: [
      "Concurrent MAOIs or SSRIs (serotonin syndrome)",
      "Seizure disorder",
      "Severe renal/hepatic impairment",
    ],
    pregnancyCategory: "C",
  },
  // ── Endocrine ─────────────────────────────────────────────────
  {
    id: "metformin",
    name: "Metformin",
    category: "Endocrine",
    drugClass: "Biguanide (Antidiabetic)",
    moa: "Activates AMPK → inhibits hepatic gluconeogenesis (primary effect); improves peripheral insulin sensitivity; does not cause hypoglycaemia (insulin-independent).",
    indications: [
      "Type 2 diabetes mellitus (1st-line)",
      "Polycystic ovary syndrome (PCOS)",
      "Pre-diabetes",
    ],
    sideEffects: [
      "GI disturbance (nausea, diarrhoea — take with food)",
      "Lactic acidosis (rare, with renal impairment)",
      "Vitamin B12 deficiency (long-term)",
    ],
    dosage:
      "500 mg PO BD with meals; titrate to 500–1000 mg BD–TID; max 2550 mg/day",
    contraindications: [
      "eGFR <30 mL/min",
      "Acute kidney injury",
      "IV contrast (hold 48H)",
      "Metabolic acidosis",
      "Hepatic failure",
    ],
    renalDose:
      "eGFR 30–45: use with caution, reduce dose; <30: contraindicated",
    pregnancyCategory: "B",
  },
  {
    id: "insulin-regular",
    name: "Insulin Regular (Soluble)",
    category: "Endocrine",
    drugClass: "Short-Acting Insulin",
    moa: "Binds insulin receptor (tyrosine kinase) → promotes glucose uptake in muscle/fat (GLUT4 translocation); inhibits hepatic gluconeogenesis; promotes glycogen synthesis.",
    indications: [
      "Type 1 and Type 2 diabetes (tight control)",
      "Diabetic ketoacidosis",
      "Hyperosmolar hyperglycaemic state",
      "Hyperkalaemia (with glucose)",
      "Peri-operative glucose control",
    ],
    sideEffects: [
      "Hypoglycaemia (most important)",
      "Hypokalaemia",
      "Weight gain",
      "Lipodystrophy",
      "Oedema",
    ],
    dosage:
      "DKA: 0.1 units/kg/hr IV infusion; SC dosing individualised by sliding scale",
    contraindications: ["Hypoglycaemia"],
    pregnancyCategory: "B",
  },
  {
    id: "levothyroxine",
    name: "Levothyroxine (T4)",
    category: "Endocrine",
    drugClass: "Thyroid Hormone",
    moa: "Exogenous T4 converted to active T3 peripherally → binds nuclear thyroid hormone receptors → regulates gene transcription for metabolism, growth, development.",
    indications: [
      "Hypothyroidism",
      "Goitre suppression",
      "Myxoedema coma (IV)",
      "Post-thyroidectomy replacement",
    ],
    sideEffects: [
      "Palpitations / tachycardia (over-replacement)",
      "Anxiety",
      "Insomnia",
      "Weight loss",
      "Osteoporosis (long-term over-treatment)",
    ],
    dosage:
      "50–100 µg PO OD (fasting, 30 min before breakfast); myxoedema: 5–100 µg IV slowly",
    contraindications: ["Uncorrected adrenal insufficiency", "Thyrotoxicosis"],
    pregnancyCategory: "A",
  },
  {
    id: "prednisolone",
    name: "Prednisolone",
    category: "Endocrine",
    drugClass: "Synthetic Corticosteroid (Glucocorticoid)",
    moa: "Binds glucocorticoid receptor → translocates to nucleus → inhibits NF-κB → reduces pro-inflammatory cytokines (IL-1, IL-6, TNF-α); stabilises mast cells; inhibits phospholipase A2.",
    indications: [
      "Asthma (acute exacerbation)",
      "Allergic reactions",
      "Autoimmune diseases (SLE, RA)",
      "IBD",
      "Adrenal insufficiency",
      "Organ transplantation",
    ],
    sideEffects: [
      "Hyperglycaemia",
      "Osteoporosis",
      "Cushing's syndrome",
      "Immunosuppression",
      "Peptic ulcer",
      "Adrenal suppression",
    ],
    dosage:
      "1–2 mg/kg/day for inflammatory conditions; 40 mg/day for asthma exacerbation; taper over weeks for long courses",
    contraindications: [
      "Active systemic infection (untreated)",
      "Live vaccines",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "hydrocortisone",
    name: "Hydrocortisone",
    category: "Endocrine",
    drugClass: "Endogenous Corticosteroid",
    moa: "Identical mechanism to prednisolone; also has significant mineralocorticoid activity (Na⁺ retention, K⁺ excretion). Used IV for rapid adrenal replacement.",
    indications: [
      "Acute adrenal crisis (Addisonian crisis)",
      "Anaphylaxis",
      "Septic shock (adjunct)",
      "Status asthmaticus",
      "Allergic reactions",
    ],
    sideEffects: [
      "Hyperglycaemia",
      "Fluid retention",
      "Hypertension",
      "Immunosuppression",
    ],
    dosage:
      "Adrenal crisis: 100 mg IV bolus then 100–200 mg/24H IV infusion; anaphylaxis: 200 mg IV",
    contraindications: ["Active systemic infection (untreated)"],
    pregnancyCategory: "C",
  },
  // ── GI ────────────────────────────────────────────────────────
  {
    id: "omeprazole",
    name: "Omeprazole",
    category: "GI",
    drugClass: "Proton Pump Inhibitor (PPI)",
    moa: "Irreversibly inhibits H+/K+-ATPase (proton pump) on parietal cells → maximal inhibition of gastric acid secretion.",
    indications: [
      "GERD / GORD",
      "Peptic ulcer disease",
      "H. pylori eradication (combination)",
      "Zollinger-Ellison syndrome",
      "NSAID gastroprotection",
    ],
    sideEffects: [
      "Headache",
      "Hypomagnesaemia (long-term)",
      "C. difficile risk (long-term)",
      "Osteoporosis (long-term)",
      "Vitamin B12 deficiency",
    ],
    dosage: "20–40 mg PO OD (fasting); 40–80 mg IV OD for upper GI bleed",
    contraindications: [
      "Hypersensitivity",
      "Clopidogrel interaction (use pantoprazole instead)",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "GI",
    drugClass: "5-HT₃ Antagonist (Antiemetic)",
    moa: "Selectively antagonises 5-HT₃ serotonin receptors in the chemoreceptor trigger zone (CTZ) and vagal afferents in GI tract → antiemetic effect.",
    indications: [
      "Chemotherapy-induced nausea/vomiting (CINV)",
      "Post-operative nausea and vomiting (PONV)",
      "Radiation-induced nausea",
      "Acute gastroenteritis vomiting",
    ],
    sideEffects: ["Headache", "Constipation", "QTc prolongation", "Flushing"],
    dosage: "4–8 mg PO/IV Q8H; 8 mg IV 30 min before chemotherapy",
    contraindications: [
      "Congenital long QT syndrome",
      "Concurrent apomorphine",
    ],
    pregnancyCategory: "B",
  },
  {
    id: "metoclopramide",
    name: "Metoclopramide",
    category: "GI",
    drugClass: "D2 Antagonist / Prokinetic / Antiemetic",
    moa: "Blocks D2 receptors in CTZ (antiemetic); blocks D2 in GI tract → increases lower oesophageal sphincter tone, accelerates gastric emptying (prokinetic).",
    indications: [
      "Nausea and vomiting",
      "Gastroparesis",
      "GERD (adjunct)",
      "Migraine-related nausea",
    ],
    sideEffects: [
      "EPS (dystonia, akathisia — especially children)",
      "Tardive dyskinesia (long-term)",
      "Sedation",
      "Hyperprolactinaemia",
    ],
    dosage: "10 mg PO/IV/IM TID; max 30 mg/day; avoid >5 days",
    contraindications: [
      "GI obstruction or perforation",
      "Pheochromocytoma",
      "Parkinson's disease",
    ],
    pregnancyCategory: "B",
  },
  {
    id: "ranitidine",
    name: "Ranitidine",
    category: "GI",
    drugClass: "H₂ Receptor Antagonist",
    moa: "Competitively antagonises H₂ receptors on gastric parietal cells → reduces histamine-stimulated acid secretion.",
    indications: [
      "GERD",
      "Peptic ulcer disease",
      "Stress ulcer prophylaxis (ICU)",
      "Zollinger-Ellison syndrome (alternative)",
    ],
    sideEffects: [
      "Headache",
      "Dizziness",
      "Gynecomastia (rare, high dose)",
      "Note: withdrawn from many markets due to NDMA contamination concerns",
    ],
    dosage: "150 mg PO BD or 300 mg OD (nocte); 50 mg IV Q6–8H",
    contraindications: ["Hypersensitivity"],
    pregnancyCategory: "B",
  },
  // ── Emergency Drugs ───────────────────────────────────────────
  {
    id: "adrenaline",
    name: "Adrenaline (Epinephrine)",
    category: "Emergency",
    drugClass: "Catecholamine / Sympathomimetic",
    moa: "Non-selective α and β adrenoceptor agonist. α1: vasoconstriction (↑SVR); β1: ↑HR and contractility; β2: bronchodilation. Reverses anaphylaxis and supports cardiac output.",
    indications: [
      "Cardiac arrest (VF/VT/PEA/asystole)",
      "Anaphylaxis",
      "Acute severe asthma (adjunct)",
      "Croup (nebulised)",
    ],
    sideEffects: [
      "Tachyarrhythmias",
      "Hypertension",
      "Anxiety / tremor",
      "Pulmonary oedema",
    ],
    dosage:
      "Cardiac arrest: 1 mg IV Q3–5 min; Anaphylaxis: 0.3–0.5 mg IM (1:1000) in anterolateral thigh",
    contraindications: [
      "No absolute contraindications in cardiac arrest or anaphylaxis",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "Emergency",
    drugClass: "Antimuscarinic / Anticholinergic",
    moa: "Competitive antagonist of muscarinic acetylcholine receptors → blocks parasympathetic effects: ↑HR (SA node), ↓secretions, bronchodilation, mydriasis, ↓GI motility.",
    indications: [
      "Symptomatic bradycardia",
      "Organophosphate poisoning",
      "Pre-anaesthetic medication",
      "Reversal of neuromuscular blockade (with neostigmine)",
    ],
    sideEffects: [
      "Tachycardia",
      "Dry mouth",
      "Urinary retention",
      "Blurred vision",
      "CNS toxicity (high dose)",
    ],
    dosage:
      "Bradycardia: 0.5–1 mg IV (repeat Q3–5 min, max 3 mg); OP poisoning: 1–2 mg IV Q5–10 min until secretions dry",
    contraindications: [
      "Angle-closure glaucoma",
      "Tachyarrhythmias",
      "Myasthenia gravis",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "sodium-bicarb",
    name: "Sodium Bicarbonate",
    category: "Emergency",
    drugClass: "Alkalinising Agent / Buffer",
    moa: "Provides HCO₃⁻ which combines with H⁺ → forms carbonic acid → CO₂ + H₂O → corrects metabolic acidosis. Also alkalinises urine.",
    indications: [
      "Severe metabolic acidosis (pH <7.1)",
      "Tricyclic antidepressant overdose",
      "Hyperkalaemia (acute)",
      "Urinary alkalinisation (aspirin OD, rhabdomyolysis)",
    ],
    sideEffects: [
      "Hypernatraemia",
      "Hypokalaemia",
      "Metabolic alkalosis (overshoot)",
      "Paradoxical CNS acidosis",
    ],
    dosage:
      "1 mEq/kg IV slow bolus; 50 mL of 8.4% solution (50 mEq) IV for hyperkalaemia",
    contraindications: [
      "Metabolic/respiratory alkalosis",
      "Hypocalcaemia (can precipitate tetany)",
    ],
    pregnancyCategory: "C",
  },
  {
    id: "adenosine",
    name: "Adenosine",
    category: "Emergency",
    drugClass: "Antiarrhythmic (Purine Nucleoside)",
    moa: "Activates A1 adenosine receptors → ↑K⁺ conductance → hyperpolarises SA and AV nodes → transient complete AV block; terminates re-entrant SVT circuits.",
    indications: [
      "Paroxysmal SVT (1st-line termination)",
      "Diagnosis of broad-complex tachycardia",
    ],
    sideEffects: [
      "Transient chest tightness / flushing",
      "Bronchospasm (avoid in asthma)",
      "Transient complete heart block",
      "Feeling of 'impending doom'",
    ],
    dosage:
      "6 mg rapid IV bolus via large antecubital vein; if no effect after 2 min: 12 mg; can repeat 12 mg once",
    contraindications: [
      "Asthma / COPD",
      "2nd/3rd degree AV block",
      "WPW with AF",
      "Dipyridamole use (potentiates effect markedly)",
    ],
    pregnancyCategory: "C",
  },
];

const CATEGORIES = [
  "All",
  "Cardiovascular",
  "Respiratory",
  "Antibiotics",
  "CNS",
  "Endocrine",
  "GI",
  "Emergency",
];

const CATEGORY_COLORS: Record<string, string> = {
  Cardiovascular: "oklch(0.65 0.2 15)",
  Respiratory: "oklch(0.65 0.16 220)",
  Antibiotics: "oklch(0.65 0.16 152)",
  CNS: "oklch(0.65 0.2 300)",
  Endocrine: "oklch(0.72 0.16 68)",
  GI: "oklch(0.65 0.18 40)",
  Emergency: "oklch(0.65 0.22 27)",
};

// ─── Drug Card ─────────────────────────────────────────────────────

function DrugCard({ drug }: { drug: Drug }) {
  const [expanded, setExpanded] = useState(false);
  const categoryColor =
    CATEGORY_COLORS[drug.category] ?? "oklch(0.65 0.16 196)";

  return (
    <motion.div
      layout
      data-ocid={`drug.item.${drug.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.18 0.055 235 / 0.92)",
        border: `1px solid ${categoryColor}40`,
        boxShadow: expanded
          ? `0 0 28px ${categoryColor}25, 0 2px 16px oklch(0.1 0.03 235 / 0.5)`
          : "0 2px 8px oklch(0.1 0.03 235 / 0.4)",
        backdropFilter: "blur(16px)",
        transition: "box-shadow 0.3s",
      }}
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* Card header */}
      <div className="flex items-start justify-between p-4 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className="font-bold text-base truncate"
              style={{ color: "oklch(0.94 0.015 215)" }}
            >
              {drug.name}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                background: `${categoryColor}22`,
                color: categoryColor,
                border: `1px solid ${categoryColor}44`,
              }}
            >
              {drug.category}
            </span>
          </div>
          <p className="text-xs" style={{ color: "oklch(0.65 0.12 196)" }}>
            {drug.drugClass}
          </p>
          {!expanded && (
            <p
              className="text-xs mt-1.5 line-clamp-2"
              style={{ color: "oklch(0.7 0.015 215)" }}
            >
              {drug.moa}
            </p>
          )}
        </div>
        <button
          type="button"
          aria-label={expanded ? "Collapse" : "Expand"}
          className="flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: `${categoryColor}18`,
            color: categoryColor,
            border: `1px solid ${categoryColor}33`,
          }}
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 space-y-3"
              style={{ borderTop: `1px solid ${categoryColor}25` }}
            >
              {/* MOA */}
              <div className="pt-3">
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: categoryColor }}
                >
                  Mechanism of Action
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.82 0.015 215)" }}
                >
                  {drug.moa}
                </p>
              </div>

              {/* Indications */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.16 152)" }}
                >
                  Indications
                </p>
                <ul className="mt-1 space-y-0.5">
                  {drug.indications.map((ind) => (
                    <li
                      key={ind}
                      className="flex items-start gap-1.5 text-sm"
                      style={{ color: "oklch(0.82 0.015 215)" }}
                    >
                      <span
                        style={{ color: "oklch(0.65 0.16 152)" }}
                        className="mt-1 text-xs"
                      >
                        ▸
                      </span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dosage */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "oklch(0.72 0.16 68)" }}
                >
                  Standard Dosage
                </p>
                <p
                  className="text-sm mt-1 px-3 py-2 rounded-lg font-mono"
                  style={{
                    color: "oklch(0.88 0.015 215)",
                    background: "oklch(0.72 0.16 68 / 0.1)",
                    border: "1px solid oklch(0.72 0.16 68 / 0.25)",
                  }}
                >
                  {drug.dosage}
                </p>
              </div>

              {/* Side effects */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.22 27)" }}
                >
                  Common Side Effects
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {drug.sideEffects.map((se) => (
                    <span
                      key={se}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.65 0.22 27 / 0.12)",
                        color: "oklch(0.78 0.14 27)",
                        border: "1px solid oklch(0.65 0.22 27 / 0.3)",
                      }}
                    >
                      {se}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contraindications */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.2 15)" }}
                >
                  Contraindications
                </p>
                <ul className="mt-1 space-y-0.5">
                  {drug.contraindications.map((ci) => (
                    <li
                      key={ci}
                      className="flex items-start gap-1.5 text-sm"
                      style={{ color: "oklch(0.82 0.015 215)" }}
                    >
                      <span
                        style={{ color: "oklch(0.65 0.2 15)" }}
                        className="mt-1 text-xs"
                      >
                        ✕
                      </span>
                      {ci}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Renal / Pregnancy row */}
              {(drug.renalDose || drug.pregnancyCategory) && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {drug.renalDose && (
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "oklch(0.65 0.16 220)" }}
                      >
                        Renal Dose Adjustment
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.75 0.015 215)" }}
                      >
                        {drug.renalDose}
                      </p>
                    </div>
                  )}
                  {drug.pregnancyCategory && (
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "oklch(0.65 0.16 300)" }}
                      >
                        Pregnancy
                      </p>
                      <div className="mt-0.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: "oklch(0.65 0.16 300 / 0.15)",
                            color: "oklch(0.78 0.14 300)",
                            border: "1px solid oklch(0.65 0.16 300 / 0.35)",
                          }}
                        >
                          Category {drug.pregnancyCategory}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

export function DrugReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDrugs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DRUG_DATABASE.filter((drug) => {
      const matchesCategory =
        selectedCategory === "All" || drug.category === selectedCategory;
      const matchesSearch =
        !q ||
        drug.name.toLowerCase().includes(q) ||
        drug.drugClass.toLowerCase().includes(q) ||
        drug.moa.toLowerCase().includes(q) ||
        drug.indications.some((i) => i.toLowerCase().includes(q)) ||
        drug.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 235) 0%, oklch(0.15 0.06 250) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-20 px-4 pt-4 pb-3"
        style={{
          background: "oklch(0.14 0.05 235 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.65 0.16 196 / 0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.65 0.16 196 / 0.2)",
                border: "1px solid oklch(0.65 0.16 196 / 0.4)",
                boxShadow: "0 0 16px oklch(0.65 0.16 196 / 0.3)",
              }}
            >
              <FlaskConical
                className="h-5 w-5"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
            </div>
            <div>
              <h1
                className="text-lg font-bold"
                style={{ color: "oklch(0.94 0.015 215)" }}
              >
                Drug Reference
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.6 0.015 215)" }}>
                {DRUG_DATABASE.length} drugs · MBBS / Clinical Practice
              </p>
            </div>
            <Badge
              className="ml-auto flex-shrink-0 text-xs"
              style={{
                background: "oklch(0.65 0.16 196 / 0.15)",
                color: "oklch(0.65 0.16 196)",
                border: "1px solid oklch(0.65 0.16 196 / 0.35)",
              }}
            >
              Educational
            </Badge>
          </div>

          {/* Search bar */}
          <div className="relative mb-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.65 0.16 196)" }}
            />
            <Input
              data-ocid="drug.search_input"
              placeholder="Search drugs, class, indication…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 rounded-xl border-0 text-sm"
              style={{
                background: "oklch(0.2 0.055 235 / 0.8)",
                color: "oklch(0.92 0.015 215)",
                boxShadow: searchQuery
                  ? "0 0 0 2px oklch(0.65 0.16 196 / 0.5), 0 0 20px oklch(0.65 0.16 196 / 0.15)"
                  : "0 0 0 1px oklch(0.65 0.16 196 / 0.25)",
                transition: "box-shadow 0.2s",
              }}
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`drug.${cat.toLowerCase()}.tab`}
                onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background:
                    selectedCategory === cat
                      ? cat === "All"
                        ? "oklch(0.65 0.16 196 / 0.25)"
                        : `${CATEGORY_COLORS[cat] ?? "oklch(0.65 0.16 196)"}28`
                      : "oklch(0.22 0.06 235 / 0.7)",
                  color:
                    selectedCategory === cat
                      ? cat === "All"
                        ? "oklch(0.65 0.16 196)"
                        : (CATEGORY_COLORS[cat] ?? "oklch(0.65 0.16 196)")
                      : "oklch(0.6 0.015 215)",
                  border:
                    selectedCategory === cat
                      ? `1px solid ${cat === "All" ? "oklch(0.65 0.16 196 / 0.5)" : `${CATEGORY_COLORS[cat] ?? "oklch(0.65 0.16 196)"}66`}`
                      : "1px solid oklch(0.4 0.04 235 / 0.5)",
                  boxShadow:
                    selectedCategory === cat
                      ? `0 0 10px ${cat === "All" ? "oklch(0.65 0.16 196 / 0.15)" : `${CATEGORY_COLORS[cat] ?? "oklch(0.65 0.16 196)"}22`}`
                      : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-3xl mx-auto px-4 pt-3 pb-1">
        <p className="text-xs" style={{ color: "oklch(0.55 0.015 215)" }}>
          {filteredDrugs.length}{" "}
          {filteredDrugs.length === 1 ? "result" : "results"}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Drug list */}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredDrugs.length > 0 ? (
            <div className="space-y-3">
              {filteredDrugs.map((drug) => (
                <DrugCard key={drug.id} drug={drug} />
              ))}
            </div>
          ) : (
            <motion.div
              data-ocid="drug.empty_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <FlaskConical
                className="h-12 w-12 mb-3"
                style={{ color: "oklch(0.4 0.06 235)" }}
              />
              <p
                className="font-medium"
                style={{ color: "oklch(0.6 0.015 215)" }}
              >
                No drugs found
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.45 0.015 215)" }}
              >
                Try a different search term or category
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div
        data-ocid="drug.disclaimer.panel"
        className="max-w-3xl mx-auto px-4 pb-8"
      >
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-xl"
          style={{
            background: "oklch(0.65 0.22 27 / 0.08)",
            border: "1px solid oklch(0.65 0.22 27 / 0.25)",
          }}
        >
          <AlertTriangle
            className="h-4 w-4 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.72 0.16 68)" }}
          />
          <p className="text-xs" style={{ color: "oklch(0.65 0.015 215)" }}>
            <strong style={{ color: "oklch(0.78 0.12 68)" }}>
              Educational Use Only.
            </strong>{" "}
            Drug information is provided for academic and training purposes.
            Always verify dosages, contraindications, and interactions with
            current formularies and prescribing guidelines before clinical use.
            MedSim does not replace clinical judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
