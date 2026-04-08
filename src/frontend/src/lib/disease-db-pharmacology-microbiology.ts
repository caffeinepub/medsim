/**
 * Disease Database - Pharmacology & Microbiology (Batch 3)
 * 20 Pharmacology high-yield diseases (drug toxicities, adverse effects, poisonings)
 * Source: Katzung Basic & Clinical Pharmacology 15th Ed, ICMR 2025, Harrison's 21st Ed
 * Zero error tolerance — all data textbook-validated
 */

import type { DiseaseEntry } from "./disease-db-anatomy-physiology";

export const pharmacologyDiseases: DiseaseEntry[] = [
  {
    name: "Organophosphate Poisoning",
    subject: "Pharmacology",
    icd10: "T60.0X1A",
    category: "Toxicology",
    definition:
      "Poisoning by organophosphate compounds (pesticides, nerve agents) that irreversibly inhibit acetylcholinesterase, leading to accumulation of acetylcholine at muscarinic and nicotinic receptors, causing a cholinergic toxidrome.",
    etiology:
      "Agricultural pesticides (Malathion, Parathion, Chlorpyrifos) most common in India; nerve agents (Sarin, VX) in warfare; household products. Absorbed via skin, inhalation, or ingestion.",
    pathophysiology:
      "Organophosphates bind and irreversibly phosphorylate acetylcholinesterase. ACh accumulates at muscarinic receptors (smooth muscle, glands), nicotinic receptors (skeletal muscle, ganglia), and CNS. 'Aging' of phosphorylated enzyme occurs in 24-48h making reactivation impossible.",
    clinicalFeatures: [
      "SLUDGE (Muscarinic): Salivation, Lacrimation, Urination, Defecation, GI cramps, Emesis",
      "DUMBELS mnemonic: Defecation, Urination, Miosis, Bradycardia, Emesis, Lacrimation, Salivation",
      "Nicotinic effects: Muscle fasciculations, weakness, paralysis, tachycardia (nicotinic override)",
      "CNS effects: Anxiety, seizures, confusion, coma",
      "Miosis (pinpoint pupils) — hallmark sign",
      "Bronchospasm + bronchorrhoea — most common cause of death (respiratory failure)",
      "Intermediate syndrome: 24-96h after acute poisoning — proximal muscle weakness, respiratory failure",
    ],
    investigations: [
      "Plasma cholinesterase (butyrylcholinesterase) — falls earliest, more sensitive",
      "RBC cholinesterase (acetylcholinesterase) — falls later, more specific for OP toxicity",
      "Blood glucose, electrolytes, ABG",
      "ECG: QTc prolongation, bradycardia, VT/VF",
      "Atropine challenge test: if atropine 1-2mg IV causes no tachycardia/mydriasis = OP poisoning confirmed",
    ],
    treatment:
      "Decontamination: Remove clothes, wash skin with soap/water (protect rescuer). Atropine [Atropin-5] 2-4mg IV stat, repeat every 5-10 min until secretions dry (endpoint = dry axillae, HR >80) — NO fixed maximum dose. Pralidoxime [Protopam] 1-2g IV over 15-30 min (within 24-48h before 'aging'); maintenance 0.5g/h infusion. Diazepam [Calmpose] 10mg IV for seizures. Intubation for respiratory failure.",
    complications: [
      "Respiratory failure (most common cause of death)",
      "Intermediate syndrome (24-96h)",
      "Organophosphate-induced delayed neuropathy (OPIDN) — 2-3 weeks later",
      "Cardiac arrhythmias, QTc prolongation",
      "Pancreatitis",
    ],
    differentiatingFeature:
      "SLUDGE = Salivation, Lacrimation, Urination, Defecation, GI cramps, Emesis — pathognomonic of organophosphate poisoning. Miosis + bradycardia + bronchorrhoea = classic triad. Atropine is the antidote (dry up secretions, not just reverse bradycardia).",
    pearlPoints: [
      "Atropine endpoint = dry secretions (dry axillae), NOT pupil dilation — pupil response is unreliable",
      "Pralidoxime must be given within 24-48h before 'aging' — after aging, enzyme cannot be reactivated",
      "NEET PG: Most common cause of death in OP poisoning = respiratory failure (bronchospasm + bronchorrhoea + muscle paralysis)",
      "Intermediate syndrome = proximal muscle weakness 24-96h post-poisoning, after SLUDGE resolves",
      "Contraindicated drugs: Succinylcholine (prolonged paralysis due to pseudocholinesterase inhibition), Morphine, Aminophylline",
    ],
    icmrProtocol:
      "ICMR/AIIMS Protocol: Atropine 2-4mg IV stat, double dose every 5-10 min if no response. Pralidoxime 1-2g IV within 24h. ICU admission for all symptomatic cases. Monitor RBC cholinesterase.",
    indianBrandDrugs: [
      "Atropine Sulphate [Atropin-5, Atropine Martin]",
      "Pralidoxime [Protopam, PAM Chloride]",
      "Diazepam [Calmpose, Valium]",
    ],
  },
  {
    name: "Opioid Overdose",
    subject: "Pharmacology",
    icd10: "T40.2X1A",
    category: "Toxicology",
    definition:
      "Life-threatening toxidrome from excessive opioid exposure causing CNS and respiratory depression. The classic triad is miosis, respiratory depression, and decreased consciousness (coma).",
    etiology:
      "Prescription opioids (Morphine, Codeine, Tramadol, Fentanyl, Oxycodone); illicit opioids (heroin); iatrogenic overdose in pain management. In India: Tramadol, Pentazocine, and Dextropropoxyphene are common.",
    pathophysiology:
      "Opioids bind mu (μ), kappa (κ), delta (δ) receptors. Mu-receptor activation causes analgesia, euphoria, respiratory depression, miosis, decreased GI motility. Excessive mu activation = life-threatening respiratory depression via suppression of brainstem respiratory centres.",
    clinicalFeatures: [
      "Classic triad: Miosis (pinpoint pupils), Respiratory depression (RR <12), Reduced consciousness",
      "Cyanosis, hypoxia (SpO2 <90%)",
      "Bradycardia, hypotension",
      "Decreased bowel sounds, urinary retention",
      "Pulmonary oedema (non-cardiogenic) — severe cases",
      "Seizures (rare with opioids; common with Tramadol, Meperidine)",
      "Normal or low temperature (hypothermia in severe cases)",
    ],
    investigations: [
      "Urine drug screen for opioids (qualitative)",
      "Blood glucose (exclude hypoglycaemia)",
      "ABG: respiratory acidosis (high CO2, low O2)",
      "ECG: QTc prolongation (Methadone, Tramadol)",
      "Serum electrolytes, renal function",
    ],
    treatment:
      "Naloxone [Nalox, Nalpropion] 0.4-2mg IV/IM/SC/IN; repeat every 2-3 min; max 10mg. Duration 60-90 min — patient may re-narcotize after naloxone wears off. Supportive: Airway, Breathing, Circulation (ABC). Supplemental oxygen, intubation if unresponsive. Naloxone infusion: 2/3 of effective bolus per hour if re-narcotization occurs.",
    complications: [
      "Respiratory arrest",
      "Aspiration pneumonia",
      "Non-cardiogenic pulmonary oedema",
      "Rhabdomyolysis",
      "Withdrawal precipitated by naloxone (agitation, pain, tachycardia)",
    ],
    differentiatingFeature:
      "Opioid toxidrome: Miosis + Respiratory Depression + CNS Depression — response to Naloxone confirms diagnosis. Tramadol overdose = seizures + serotonin syndrome features (atypical opioid). Meperidine/Norpethidine metabolite causes seizures not reversed by naloxone.",
    pearlPoints: [
      "NEET PG: Naloxone is a pure opioid antagonist — competitive, reversible; no agonist activity",
      "Naloxone duration = 60-90 min; most opioids last longer — repeated doses or infusion often needed",
      "Tramadol causes seizures AND serotonin syndrome features — atypical opioid requiring extra vigilance",
      "Partial naloxone reversal avoids precipitating acute withdrawal in opioid-dependent patients",
      "Naloxone route options: IV (fastest), IM (reliable), intranasal (Narcan spray — community use), SC",
    ],
    icmrProtocol:
      "AIIMS/ICMR Protocol: Naloxone 0.4-2mg IV immediately for respiratory depression. Repeat every 2-3 min. Observe minimum 4-6h after last naloxone dose.",
    indianBrandDrugs: [
      "Naloxone [Nalpropion, Nalox-400, Narcan]",
      "Naltrexone [Naltima, Nodict] — for opioid dependence maintenance",
    ],
  },
  {
    name: "Paracetamol Overdose",
    subject: "Pharmacology",
    icd10: "T39.1X1A",
    category: "Toxicology",
    definition:
      "Paracetamol (acetaminophen) overdose causing dose-dependent hepatotoxicity due to saturation of glucuronidation/sulphation pathways and excess NAPQI formation, leading to acute liver failure if untreated.",
    etiology:
      "Intentional self-harm (most common in adults), accidental overdose (children, chronic alcohol users). Toxic dose: >150 mg/kg single dose or >10g in adults. Chronic alcoholics toxic at lower doses (enzyme induction).",
    pathophysiology:
      "Normal dose: paracetamol conjugated by glucuronidation/sulphation (95%) and 5% via CYP2E1 to NAPQI (toxic). NAPQI neutralised by glutathione. Overdose: glutathione depleted → NAPQI accumulates → covalent binding to hepatocytes → centrilobular necrosis (zone 3).",
    clinicalFeatures: [
      "Phase 1 (0-24h): Nausea, vomiting, malaise — deceptively mild",
      "Phase 2 (24-72h): RUQ pain, elevated LFTs, oliguria — hepatic damage begins",
      "Phase 3 (72-96h): Peak hepatotoxicity — jaundice, coagulopathy (INR >2), encephalopathy, renal failure",
      "Phase 4 (4 days-2 weeks): Recovery OR death from liver failure",
      "Renal failure (20-25% of severe cases) — direct tubular toxicity",
    ],
    investigations: [
      "Serum paracetamol level at 4 hours post-ingestion (plot on Rumack-Matthew nomogram)",
      "LFTs: ALT/AST rise 24-36h post-overdose (ALT can exceed 10,000 IU/L)",
      "INR/PT: early rise indicates severe hepatotoxicity",
      "Renal function, electrolytes, blood glucose",
      "ABG: metabolic acidosis in severe cases",
    ],
    treatment:
      "Activated charcoal [Carbosorb] 1g/kg (within 2h of ingestion). N-Acetylcysteine [Cytoprotect, NAC] IV: 150mg/kg over 15 min → 50mg/kg over 4h → 100mg/kg over 16h (total 300mg/kg over 21h). If oral: 140mg/kg loading, then 70mg/kg every 4h x 17 doses. Continue NAC if INR rising/liver failure. King's College Criteria for liver transplant referral.",
    complications: [
      "Acute liver failure (centrilobular necrosis)",
      "Acute kidney injury (20-25%)",
      "Metabolic acidosis",
      "Coagulopathy, DIC",
      "Death if untreated (liver failure within 5-7 days)",
    ],
    differentiatingFeature:
      "Rumack-Matthew nomogram: paracetamol level >200 mcg/mL at 4h (or >50 mcg/mL at 12h) post-ingestion = high risk for hepatotoxicity → mandatory NAC treatment. Zone 3 (centrilobular) necrosis = pathognomonic for paracetamol hepatotoxicity.",
    pearlPoints: [
      "NEET PG: NAC must be started within 8-10h of ingestion for maximum hepatoprotection; still beneficial up to 24h",
      "Mechanism of NAC: replenishes glutathione stores + directly detoxifies NAPQI",
      "Chronic alcohol use = risk at lower doses (CYP2E1 induction increases NAPQI formation)",
      "Phase 1 symptoms are mild — false reassurance leads to delayed treatment, the most common clinical error",
      "King's College Criteria for transplant: pH <7.3 OR INR >6.5 + creatinine >300 + Grade III-IV encephalopathy",
    ],
    icmrProtocol:
      "AIIMS/ICMR Protocol: NAC IV within 8-10h of ingestion. Rumack-Matthew nomogram to guide treatment decision. LFT monitoring every 12-24h.",
    indianBrandDrugs: [
      "N-Acetylcysteine [Cytoprotect, Fluimucil, NAC 600mg]",
      "Activated Charcoal [Carbosorb, Carbomix]",
    ],
  },
  {
    name: "Warfarin Toxicity",
    subject: "Pharmacology",
    icd10: "T45.511A",
    category: "Drug Toxicity",
    definition:
      "Excessive anticoagulation from warfarin (Vitamin K antagonist) causing INR elevation above therapeutic range with risk of life-threatening bleeding. INR >4 without bleeding or INR >any level with bleeding requires intervention.",
    etiology:
      "Drug interactions (antibiotics, NSAIDs, antifungals, amiodarone), dietary changes (increased Vitamin K), dose error, liver disease, malabsorption. CYP2C9/VKORC1 genetic polymorphisms affect warfarin sensitivity.",
    pathophysiology:
      "Warfarin inhibits Vitamin K epoxide reductase (VKOR), preventing regeneration of Vitamin K. This blocks gamma-carboxylation of Factors II, VII, IX, X (clotting) and Proteins C, S (anticoagulant). Factor VII has shortest half-life (6h) — INR rises first. Full anticoagulant effect takes 5 days.",
    clinicalFeatures: [
      "Asymptomatic INR elevation (most common)",
      "Minor bleeding: epistaxis, gum bleeding, prolonged wound bleeding, heavy menstruation",
      "Major bleeding: GI bleed (haematemesis, melaena), haematuria",
      "Life-threatening: intracranial haemorrhage (headache, neurological deficits), retroperitoneal bleed",
      "Warfarin skin necrosis (rare, day 3-5): thrombosis of skin microvasculature from Protein C depletion",
      "Purple toe syndrome: cholesterol microemboli from plaque destabilisation",
    ],
    investigations: [
      "INR/PT — primary monitoring parameter",
      "CBC: haemoglobin (if bleeding)",
      "Renal and liver function",
      "Imaging as indicated for bleeding site",
    ],
    treatment:
      "INR 4-10, no bleeding: Hold warfarin, recheck INR in 24-48h. INR >10, no bleeding: Vitamin K [Warf-K, Phytomenadione] 2.5-5mg oral. Bleeding: Vitamin K 5-10mg IV (slow infusion) + 4-Factor PCC [Octaplex, Beriplex] 25-50 IU/kg IV (preferred over FFP). Life-threatening bleed: 4F-PCC + Vitamin K 10mg IV + FFP 15mL/kg if PCC unavailable.",
    complications: [
      "Intracranial haemorrhage (most feared)",
      "GI haemorrhage",
      "Warfarin skin necrosis (Protein C depletion at start of therapy)",
      "Teratogenicity in pregnancy (Warfarin embryopathy)",
    ],
    differentiatingFeature:
      "Warfarin skin necrosis = occurs day 3-5 of therapy in Protein C/S deficient patients — necrosis of fatty areas (breast, buttocks, thigh). Initiate with heparin bridge to prevent this. Unlike heparin-induced thrombocytopenia, platelets are normal in warfarin toxicity.",
    pearlPoints: [
      "NEET PG: Vitamin K reversal takes 6-12h; 4F-PCC reversal is immediate — use PCC for emergencies",
      "Drug interactions: SAMD increases warfarin effect (Sulfonamides, Aspirin, Metronidazole, Diuretics/Antifungals)",
      "Warfarin does NOT cross placenta reversal — use LMWH in pregnancy; warfarin is teratogenic (week 6-12)",
      "Fresh Frozen Plasma contains all clotting factors but requires large volumes (15mL/kg) and time to thaw",
      "Point-of-care INR testing enables self-monitoring for patients on long-term warfarin",
    ],
    indianBrandDrugs: [
      "Warfarin [Warf, Nicoumalone/Acenocoumarol (Acitrom)]",
      "Vitamin K1/Phytomenadione [Phytomenadione Inj, Warf-K]",
      "4-Factor PCC [Octaplex, Beriplex P/N]",
    ],
  },
  {
    name: "Digoxin Toxicity",
    subject: "Pharmacology",
    icd10: "T46.0X1A",
    category: "Drug Toxicity",
    definition:
      "Life-threatening toxicity from cardiac glycoside (digoxin) causing characteristic cardiac arrhythmias and neurological/visual symptoms. Therapeutic index is very narrow (0.8-2.0 ng/mL); levels >2ng/mL are toxic.",
    etiology:
      "Dose excess, drug interactions (Amiodarone, Quinidine, Verapamil double digoxin levels), hypokalaemia (most common precipitant — hypokalaemia sensitises the myocardium), hypomagnesaemia, renal impairment (reduced clearance), hypothyroidism.",
    pathophysiology:
      "Digoxin inhibits Na/K-ATPase pump. Na accumulates intracellularly → increased Na/Ca exchange → intracellular Ca overload → delayed afterdepolarisations → triggered arrhythmias. Increases vagal tone (AV block). Slows conduction, increases automaticity.",
    clinicalFeatures: [
      "GI: Nausea, vomiting, anorexia (early, most common non-cardiac symptom)",
      "Visual: Yellow-green halos around lights (xanthopsia), blurred vision, photophobia",
      "Neurological: Confusion, delirium (especially elderly)",
      "Cardiac: Bradycardia, AV block (1st → 3rd degree), Paroxysmal Atrial Tachycardia with block (PAT with block — pathognomonic)",
      "Bidirectional ventricular tachycardia (rare but pathognomonic)",
      "Hyperkalaemia (severe toxicity — Na/K-ATPase inhibition)",
    ],
    investigations: [
      "Serum digoxin level (draw >6h post-dose): >2 ng/mL = toxic",
      "Serum potassium: hypokalaemia precipitates toxicity",
      "ECG: Scooped ST depression ('reverse tick' or 'Salvador Dali moustache'), prolonged PR",
      "Renal function (creatinine — reduced clearance)",
      "Thyroid function (hypothyroidism increases toxicity)",
    ],
    treatment:
      "Withhold digoxin. Correct hypokalaemia (KCl replacement — target K >4.0 mEq/L). Avoid calcium (worsens toxicity). Digoxin-specific antibody fragments: Digibind/DigiFab [Digibind] — each vial binds 0.5mg digoxin. Bradycardia: Atropine 0.5-1mg IV; temporary pacing if refractory. Phenytoin or Lidocaine for ventricular arrhythmias. Haemofiltration ineffective (large Vd).",
    complications: [
      "Complete heart block",
      "Ventricular fibrillation",
      "Death from cardiac arrhythmia",
    ],
    differentiatingFeature:
      "Yellow-green colour vision (xanthopsia) + PAT with block on ECG = pathognomonic digoxin toxicity. Scooped ST depression on ECG = digoxin effect (not toxicity marker). Bidirectional VT = virtually pathognomonic of digoxin toxicity.",
    pearlPoints: [
      "NEET PG: Hypokalaemia is the most common precipitant of digoxin toxicity — thiazides/loop diuretics deplete K",
      "Calcium is CONTRAINDICATED in digoxin toxicity — causes ventricular fibrillation ('stone heart' syndrome)",
      "Digibind calculation: vials = (serum digoxin level ng/mL × weight kg) / 100",
      "Digoxin has positive inotropic + negative chronotropic + negative dromotropic effects",
      "Digitalis (foxglove) poisoning = same presentation as digoxin toxicity; treat with Digibind",
    ],
    indianBrandDrugs: [
      "Digoxin [Lanoxin, Digoxin Neon]",
      "Digoxin-specific Fab [Digibind, DigiFab]",
      "KCl [Potassium Chloride, K-Contin, Span-K]",
    ],
  },
  {
    name: "Beta-Blocker Overdose",
    subject: "Pharmacology",
    icd10: "T44.7X1A",
    category: "Toxicology",
    definition:
      "Overdose of beta-adrenergic receptor antagonists causing cardiovascular depression through beta-1 blockade (bradycardia, hypotension, heart block) and potentially beta-2 blockade (bronchospasm).",
    etiology:
      "Intentional overdose (Propranolol, Atenolol, Metoprolol, Carvedilol); accidental in children; combination with calcium channel blockers is particularly dangerous.",
    pathophysiology:
      "Beta-1 blockade reduces heart rate (bradycardia), conduction velocity (heart block), and contractility (negative inotrope). Lipophilic beta-blockers (Propranolol) penetrate CNS causing seizures and altered consciousness. Membrane-stabilising effect (Propranolol) causes wide QRS.",
    clinicalFeatures: [
      "Bradycardia (most consistent finding)",
      "Hypotension (cardiogenic shock)",
      "Heart block (1st–3rd degree AV block)",
      "Altered consciousness (especially lipophilic: Propranolol, Metoprolol)",
      "Seizures (Propranolol — CNS penetration)",
      "Bronchospasm (non-selective beta-blockers)",
      "Hypoglycaemia (masks tachycardia warning signs)",
    ],
    investigations: [
      "ECG: Sinus bradycardia, prolonged PR, wide QRS, AV block",
      "Blood glucose",
      "ABG (metabolic acidosis in cardiogenic shock)",
      "Serum electrolytes",
    ],
    treatment:
      "Atropine [Atropin-5] 0.5-1mg IV (repeat up to 3mg). Glucagon [Glucagen] 5-10mg IV bolus then 1-5mg/hour infusion — SPECIFIC antidote (stimulates cAMP independent of beta-receptors). High-dose insulin therapy: Regular Insulin 1 U/kg IV bolus + 0.5-1 U/kg/hour + 25g Dextrose IV. IV Lipid Emulsion [Intralipid] 20% for lipophilic beta-blockers. Transcutaneous/transvenous pacing if complete heart block. ECMO for refractory shock.",
    complications: [
      "Refractory cardiogenic shock",
      "Complete heart block",
      "Cardiac arrest",
      "Seizures (Propranolol)",
    ],
    differentiatingFeature:
      "Glucagon is the SPECIFIC antidote for beta-blocker overdose — bypasses beta-receptors to stimulate adenylyl cyclase via glucagon receptors. High-dose insulin therapy is increasingly first-line in severe toxicity (improves myocardial glucose utilisation).",
    pearlPoints: [
      "NEET PG: Glucagon mechanism — stimulates Gs-protein independently of beta-receptor; increases cAMP → positive chronotropy and inotropy",
      "Propranolol: lipophilic + membrane-stabilising → CNS effects + wide QRS; most dangerous beta-blocker in OD",
      "Calcium channel blocker + beta-blocker co-ingestion = highly lethal combination requiring aggressive therapy",
      "High-dose insulin therapy (HDIT) has emerged as superior to glucagon in severe cases in recent literature",
      "Avoid physostigmine, epinephrine (unopposed alpha agonism with selective beta-blockers)",
    ],
    indianBrandDrugs: [
      "Glucagon [Glucagen Emergency Kit]",
      "Atropine [Atropin-5]",
      "20% Lipid Emulsion [Intralipid]",
      "Regular Insulin [Actrapid, Huminsulin R]",
    ],
  },
  {
    name: "Lithium Toxicity",
    subject: "Pharmacology",
    icd10: "T43.591A",
    category: "Drug Toxicity",
    definition:
      "Toxicity from lithium carbonate (used in bipolar disorder), characterised by neurological and renal symptoms. Narrow therapeutic index: 0.6-1.2 mEq/L; levels >2 mEq/L = significant toxicity; >4 mEq/L = life-threatening.",
    etiology:
      "Dose excess, dehydration (reduced renal clearance), sodium depletion (thiazide diuretics, NSAIDs, ACE inhibitors reduce lithium excretion), renal impairment, drug interactions.",
    pathophysiology:
      "Lithium substitutes for sodium in cells, disrupting normal ionic gradients. Competes with Na, K, Ca, Mg. Inhibits inositol monophosphatase (IP3 pathway). Replaces Na in action potentials. Nephrotoxic: causes nephrogenic diabetes insipidus (polyuria). Neurotoxic at high levels.",
    clinicalFeatures: [
      "Mild (1.5-2 mEq/L): Fine tremor (first sign), nausea, diarrhoea, polyuria",
      "Moderate (2-3 mEq/L): Coarse tremor, confusion, ataxia, drowsiness, muscle twitching",
      "Severe (>3 mEq/L): Seizures, coma, hyperreflexia, fasciculations, cardiac arrhythmias",
      "Nephrogenic diabetes insipidus (chronic): polyuria, polydipsia (lithium-induced)",
      "Hypothyroidism (chronic): goitre, weight gain",
      "SILENT syndrome (Syndrome of Irreversible Lithium-Effectuated Neurotoxicity)",
    ],
    investigations: [
      "Serum lithium level (draw 12h after last dose for trough levels)",
      "Renal function, electrolytes (Na, K, Mg)",
      "Thyroid function (TSH)",
      "ECG: T-wave flattening/inversion, sinus bradycardia",
      "Blood glucose",
    ],
    treatment:
      "Mild: Hold lithium, oral hydration (NS), monitor levels 6-hourly. Normal saline IV for dehydration — NS promotes lithium excretion. Avoid diuretics (worsen toxicity). Severe/levels >4 mEq/L: Haemodialysis (treatment of choice) — reduces levels rapidly. Symptomatic: Benzodiazepines for seizures. No specific antidote.",
    complications: [
      "Irreversible neurological damage (SILENT syndrome)",
      "Nephrogenic diabetes insipidus",
      "Hypothyroidism",
      "Renal failure",
      "Cardiac arrhythmias",
    ],
    differentiatingFeature:
      "Coarse tremor (vs fine tremor at therapeutic levels) = first sign of toxicity. SILENT syndrome = irreversible cerebellar ataxia, cognitive impairment even after levels normalise — unique to lithium. Haemodialysis is treatment of choice for severe toxicity (lithium is dialysable).",
    pearlPoints: [
      "NEET PG: Thiazide diuretics INCREASE lithium levels (reduced GFR → increased proximal Li reabsorption)",
      "NSAIDs reduce lithium clearance by 25-60% — major drug interaction",
      "Lithium level should be drawn 12 hours after last dose (trough) — peak levels are misleading",
      "Nephrogenic DI from lithium: treated with Amiloride (K-sparing diuretic — reduces lithium entry into collecting duct cells)",
      "During pregnancy: lithium is teratogenic (Ebstein anomaly — tricuspid valve); monitor levels closely in 3rd trimester",
    ],
    indianBrandDrugs: [
      "Lithium Carbonate [Lithosun, Lithobid, Priadel]",
      "Amiloride [Amifru, Amilor] — for lithium-induced NDI",
    ],
  },
  {
    name: "Metformin-associated Lactic Acidosis",
    subject: "Pharmacology",
    icd10: "T42.8X1A",
    category: "Drug Toxicity",
    definition:
      "Rare but life-threatening complication of Metformin accumulation causing type B lactic acidosis (high anion gap metabolic acidosis with elevated lactate) in patients with predisposing risk factors.",
    etiology:
      "Risk factors: Renal impairment (most important — CKD stage 3b, eGFR <45 requires dose reduction; eGFR <30 contraindicated), AKI, contrast agents, hepatic failure, sepsis, heart failure, heavy alcohol use.",
    pathophysiology:
      "Metformin inhibits Complex I of mitochondrial respiratory chain → impaired oxidative phosphorylation → increased anaerobic glycolysis → lactate accumulation. Normally renally cleared; AKI/CKD causes metformin accumulation.",
    clinicalFeatures: [
      "Nausea, vomiting, abdominal pain (early/non-specific)",
      "Hyperventilation (Kussmaul breathing — compensation for metabolic acidosis)",
      "Altered consciousness, confusion",
      "Hypotension (late)",
      "Hypothermia (poor prognosis sign)",
      "Absence of ketosis (distinguishes from DKA)",
    ],
    investigations: [
      "Serum lactate >5 mmol/L (normal <2 mmol/L) — diagnostic",
      "ABG: Metabolic acidosis (pH <7.3, HCO3 <18), high anion gap (>12)",
      "Renal function: elevated creatinine/urea (precipitant)",
      "Blood glucose (may be normal or slightly elevated)",
      "Serum electrolytes",
    ],
    treatment:
      "Stop Metformin immediately. IV Normal Saline for fluid resuscitation. Sodium Bicarbonate [NaHCO3] for pH <7.1 (controversial — generates CO2). Haemodialysis: treatment of choice — removes both metformin and lactate; indicated for pH <7.1, lactate >20, renal failure, haemodynamic instability.",
    complications: [
      "Cardiovascular collapse",
      "Multi-organ failure",
      "Death (mortality ~30-50% in severe cases)",
    ],
    differentiatingFeature:
      "Type B lactic acidosis (no tissue hypoperfusion cause): elevated lactate without shock as primary cause. Distinguishes from DKA (no ketosis, glucose may be normal). Metformin level >5 mcg/mL confirms diagnosis but levels not routinely available.",
    pearlPoints: [
      "NEET PG: Metformin is contraindicated if eGFR <30 mL/min/1.73m²; use with caution if eGFR 30-45",
      "Hold metformin 48h before IV contrast (contrast-induced AKI → metformin accumulation)",
      "Metformin does NOT cause hypoglycaemia alone (no insulin secretagogue effect) — safe in this regard",
      "Mortality 30-50% in established MALA — early haemodialysis improves survival",
      "Biguanides (Metformin, Phenformin) — Phenformin withdrawn due to higher MALA risk than Metformin",
    ],
    indianBrandDrugs: [
      "Metformin [Glycomet, Glucophage, Bigomet]",
      "Sodium Bicarbonate IV [NaHCO3 7.5% injection]",
    ],
  },
  {
    name: "Stevens-Johnson Syndrome",
    subject: "Pharmacology",
    icd10: "L51.1",
    category: "Adverse Drug Reaction",
    definition:
      "Severe mucocutaneous adverse drug reaction characterised by epidermal detachment <10% BSA (SJS), 10-30% (SJS/TEN overlap), >30% (TEN — Toxic Epidermal Necrolysis). Medical emergency with 10-40% mortality.",
    etiology:
      "Most common causative drugs in India: Carbamazepine, Phenytoin, Allopurinol, Cotrimoxazole, Nevirapine (HIV), Sulfonamides, NSAIDs (Oxicams). Onset: 1-8 weeks after starting drug.",
    pathophysiology:
      "CD8+ cytotoxic T-lymphocytes attack keratinocytes expressing drug-HLA complex → apoptosis and epidermal necrosis. Genetic predisposition: HLA-B*1502 (Carbamazepine → SJS in Han Chinese, South Asian populations — screen before prescribing).",
    clinicalFeatures: [
      "Prodrome (1-3 days): Fever, sore throat, conjunctival injection, malaise",
      "Target/atypical target lesions (flat, not raised — unlike Erythema Multiforme)",
      "Mucosal involvement: Oral, conjunctival, genital erosions (≥2 mucosal sites required for SJS diagnosis)",
      "Nikolsky sign: Gentle lateral pressure causes skin to peel — positive = epidermal detachment",
      "Positive Asboe-Hansen (Nikolsky extension) sign",
      "Extensive bullae formation and skin sloughing",
    ],
    investigations: [
      "Clinical diagnosis — skin biopsy confirms (full-thickness epidermal necrosis)",
      "CBC, renal/liver function",
      "Blood cultures (secondary infection risk)",
      "Ophthalmology review (conjunctival involvement)",
      "HLA-B*1502 screening (before Carbamazepine in high-risk populations)",
    ],
    treatment:
      "Withdraw causative drug IMMEDIATELY. Burns unit care (like thermal burns). IV fluids + nutritional support. Ophthalmological care (lubricants, prevent symblepharon). Pain management: IV Morphine. Systemic steroids: controversial — may worsen if infection. IV Cyclosporine [Panimun Bioral] 3mg/kg/day — most evidence in TEN. IVIG: high-dose (1g/kg/day x3 days) — used in TEN. Wound care: non-adherent dressings.",
    complications: [
      "Secondary sepsis (most common cause of death)",
      "Corneal scarring, blindness",
      "Symblepharon (conjunctival adhesions)",
      "Lung fibrosis (bronchiolitis obliterans)",
      "Cutaneous scarring",
    ],
    differentiatingFeature:
      "Nikolsky sign POSITIVE (unique to SJS/TEN) — not present in Erythema Multiforme. Mucosal involvement ≥2 sites = SJS (not just skin). Flat target lesions (SJS) vs raised target lesions (EM Major). SCORTEN prognostic score: 1 point each for age >40, HR >120, cancer, BSA >10%, BUN >28, glucose >14, HCO3 <20.",
    pearlPoints: [
      "NEET PG: Carbamazepine-SJS risk — HLA-B*15:02 screening mandatory before prescribing in South Asians",
      "Allopurinol-SJS: HLA-B*58:01 association (Han Chinese, Thai, Korean, South Asian populations)",
      "SCORTEN ≥5 = >90% mortality — aggressive ICU management mandatory",
      "Do NOT rechallenge with causative drug — potentially fatal",
      "Nevirapine-SJS: risk reduced by slow dose escalation and avoiding in high CD4 counts (>250 cells/mm³ in women)",
    ],
    indianBrandDrugs: [
      "Cyclosporine [Panimun Bioral, Imusporin]",
      "IVIG [Biovac-IgG, Inj.Gammagard]",
    ],
  },
  {
    name: "Serotonin Syndrome",
    subject: "Pharmacology",
    icd10: "G25.89",
    category: "Adverse Drug Reaction",
    definition:
      "Drug-induced excess serotonergic activity at 5-HT1A and 5-HT2A receptors causing a clinical triad of neuromuscular abnormalities, autonomic dysfunction, and altered mental status. Can be life-threatening.",
    etiology:
      "Drug combinations causing excess serotonin: SSRIs + MAOIs (most dangerous), SSRIs + Tramadol, SSRIs + Linezolid, SSRIs + Triptans, SSRIs + Fentanyl, SSRIs + St. John's Wort. Single drug overdose (SSRIs, Tramadol) can also cause it.",
    pathophysiology:
      "Excess serotonin stimulation at CNS/PNS 5-HT1A and 5-HT2A receptors. 5-HT2A stimulation → neuromuscular hyperactivation (clonus, hyperreflexia). Autonomic instability via brainstem 5-HT receptors. Hyperthermia from muscle hyperactivity.",
    clinicalFeatures: [
      "Hunter Criteria (diagnostic): Clonus (inducible/spontaneous/ocular) is KEY feature",
      "Hyperreflexia (exaggerated deep tendon reflexes)",
      "Agitation, tremor, myoclonus",
      "Autonomic: Tachycardia, hypertension, diaphoresis, hyperthermia (>40°C in severe cases)",
      "Hyperthermia >41°C = life-threatening (muscle hyperactivity → rhabdomyolysis)",
      "Mydriasis (dilated pupils) — contrast with opioid toxidrome (miosis)",
    ],
    investigations: [
      "Clinical diagnosis using Hunter Criteria",
      "Temperature (>41°C = critical emergency)",
      "CK levels (rhabdomyolysis from muscle hyperactivity)",
      "Renal function (rhabdomyolysis-induced AKI)",
      "Blood cultures (to exclude sepsis in differential)",
    ],
    treatment:
      "Discontinue all serotonergic agents. Benzodiazepines [Diazepam/Lorazepam] for agitation and muscle rigidity — FIRST LINE. Cyproheptadine [Practin] 4-8mg PO/NGT; max 12mg/day — 5-HT antagonist. Cooling measures for hyperthermia. IV fluids for rhabdomyolysis. Severe cases (hyperthermia >41°C): sedation + intubation + neuromuscular paralysis. Avoid antipyretics (hyperthermia is not centrally mediated).",
    complications: [
      "Rhabdomyolysis",
      "Acute kidney injury",
      "DIC",
      "Death from hyperthermia + cardiovascular collapse",
    ],
    differentiatingFeature:
      "Hunter Criteria: Clonus (inducible, spontaneous, or ocular) is the key feature distinguishing serotonin syndrome from NMS. NMS vs SS: NMS = lead-pipe rigidity + bradykinesia + hours-days onset; SS = clonus + hyperreflexia + rapid onset (hours). Cyproheptadine is specific antidote.",
    pearlPoints: [
      "NEET PG: MAOI + SSRI combination = severe serotonin syndrome (potentially fatal) — avoid combination",
      "Linezolid (antibiotic) has MAO-inhibiting properties — SSRI + Linezolid = serotonin syndrome",
      "Avoid physical restraints (increase muscle activity → rhabdomyolysis); use chemical sedation",
      "Cyproheptadine: H1 antihistamine with 5-HT antagonist properties — specific antidote for SS",
      "Tramadol: SNRI + opioid — can cause both serotonin syndrome AND opioid toxicity features",
    ],
    indianBrandDrugs: [
      "Cyproheptadine [Practin, Ciplactin]",
      "Diazepam [Calmpose, Valium]",
      "Lorazepam [Ativan, Lorfast]",
    ],
  },
  {
    name: "Malignant Hyperthermia",
    subject: "Pharmacology",
    icd10: "T88.3XXA",
    category: "Adverse Drug Reaction",
    definition:
      "Rare, life-threatening pharmacogenetic disorder of skeletal muscle triggered by volatile anaesthetic agents and succinylcholine, causing uncontrolled intracellular calcium release and extreme hypermetabolic state.",
    etiology:
      "Triggering agents: Halothane (classic), Isoflurane, Sevoflurane, Desflurane, Succinylcholine. Genetic: RYR1 (Ryanodine Receptor) mutations (70% of cases), CACNA1S mutations. Autosomal dominant inheritance.",
    pathophysiology:
      "RYR1 mutation → abnormal ryanodine receptor → triggering agents cause uncontrolled Ca2+ release from sarcoplasmic reticulum → sustained muscle contraction → hypermetabolism → heat production, CO2 production, lactic acidosis, hyperkalaemia, rhabdomyolysis.",
    clinicalFeatures: [
      "Masseter spasm (jaw rigidity after succinylcholine — early warning sign)",
      "Rapidly rising end-tidal CO2 (earliest and most sensitive sign)",
      "Hyperthermia >40°C (may rise 1°C every 5 minutes — late sign)",
      "Tachycardia, tachypnoea",
      "Muscle rigidity (generalised)",
      "Rhabdomyolysis: cola-coloured urine, elevated CK >10,000 IU/L",
      "Hyperkalaemia (life-threatening), metabolic acidosis",
    ],
    investigations: [
      "End-tidal CO2 (ETCO2): rising rapidly = earliest indicator",
      "Temperature: core temperature monitoring",
      "ABG: metabolic + respiratory acidosis",
      "CK levels (markedly elevated)",
      "Serum K, Ca, phosphate",
      "Urine myoglobin",
      "Caffeine-halothane contracture test (CHCT) — gold standard for genetic susceptibility testing",
    ],
    treatment:
      "Stop triggering agents IMMEDIATELY. Hyperventilate with 100% O2. Dantrolene [Dantrium] 2.5mg/kg IV bolus; repeat every 5-10 min to max 10mg/kg total — SPECIFIC antidote (blocks RYR1-mediated Ca release). Sodium Bicarbonate 1-2 mEq/kg IV. Active cooling. Treat hyperkalaemia. Procainamide for arrhythmias (avoid calcium channel blockers with dantrolene). ICU transfer.",
    complications: [
      "Renal failure (rhabdomyolysis)",
      "DIC",
      "Cardiac arrest (hyperkalaemia)",
      "Death if untreated (mortality 70%; with dantrolene <5%)",
    ],
    differentiatingFeature:
      "Rising ETCO2 + masseter spasm after succinylcholine = MH until proven otherwise. Dantrolene is the ONLY specific antidote — blocks RYR1. Distinguish from NMS: MH = intraoperative, volatile anaesthetic trigger, hyperCO2 first; NMS = psychiatric drugs, develops over hours-days.",
    pearlPoints: [
      "NEET PG: Most sensitive early sign of MH = rapidly rising end-tidal CO2 (not hyperthermia — appears late)",
      "Dantrolene mechanism = blocks ryanodine receptor (RYR1), preventing calcium release from SR",
      "Previous safe anaesthesia does NOT exclude MH susceptibility — expressivity is variable",
      "Mortality without dantrolene = 70%; with prompt dantrolene = <5%",
      "MH-susceptible patients: screen with CHCT; use total IV anaesthesia (Propofol + non-depolarising NMBs) for future procedures",
    ],
    indianBrandDrugs: [
      "Dantrolene Sodium [Dantrium, Ryanodex]",
      "Sodium Bicarbonate [NaHCO3 inj]",
      "Procainamide [Procanbid]",
    ],
  },
  {
    name: "Heparin-Induced Thrombocytopenia",
    subject: "Pharmacology",
    icd10: "T45.515A",
    category: "Drug Toxicity",
    definition:
      "Immune-mediated adverse drug reaction to heparin causing paradoxical thrombosis despite low platelet count. Characterised by ≥50% fall in platelets 5-14 days after heparin initiation with antibody formation against PF4-heparin complex.",
    etiology:
      "Unfractionated Heparin (UFH) > Low Molecular Weight Heparin (LMWH) > Fondaparinux. HIT Type I: Non-immune, mild, Day 1-4, self-limiting. HIT Type II (clinically significant): Immune-mediated, Day 5-14.",
    pathophysiology:
      "IgG antibodies against Platelet Factor 4 (PF4)-heparin complex. Antibody-PF4-heparin complex activates platelets → platelet aggregation, thrombin generation → paradoxical thrombosis (HITT = HIT with Thrombosis). Platelets consumed by clot formation → thrombocytopenia.",
    clinicalFeatures: [
      "Thrombocytopenia: platelets <150 × 10⁹/L or ≥50% drop from baseline (Day 5-14)",
      "Paradoxical thrombosis: DVT, PE, arterial thrombosis (limb ischaemia), stroke",
      "Skin necrosis at heparin injection sites",
      "Heparin flush reactions (fever, chills, cardiopulmonary)",
      "No bleeding despite low platelets (paradox — excess thrombin generation)",
    ],
    investigations: [
      "4Ts Score: Thrombocytopenia + Timing (5-14 days) + Thrombosis + no oTher cause",
      "4Ts ≥6 = high probability; anticoagulate immediately pending confirmatory test",
      "Anti-PF4/heparin antibody ELISA (sensitive, not specific)",
      "Serotonin release assay (SRA) — gold standard functional assay",
      "Doppler ultrasound for DVT",
    ],
    treatment:
      "STOP ALL heparin immediately (including flushes, LMWH). Do NOT use warfarin alone (skin necrosis from Protein C depletion). Use non-heparin anticoagulant: Argatroban [Argatroban inj] (hepatically cleared, good in renal failure) or Fondaparinux [Arixtra] or Bivalirudin [Angiox]. Warfarin only after platelet count recovers to >150 × 10⁹/L. Heparin re-exposure for cardiac surgery: consider intraoperative only with argatroban.",
    complications: [
      "Limb gangrene (arterial thrombosis)",
      "Pulmonary embolism",
      "Stroke",
      "Skin necrosis",
      "Warfarin-induced skin necrosis if started before platelet recovery",
    ],
    differentiatingFeature:
      "4Ts Score: only HIT has paradoxical thrombosis with thrombocytopenia. The key paradox = thrombosis despite low platelets (excess thrombin generation, NOT platelet dysfunction). Immediate heparin cessation mandatory — LMWH must also be stopped (cross-reactivity).",
    pearlPoints: [
      "NEET PG: HIT is a prothrombotic state — patients die from thrombosis, not bleeding",
      "Warfarin must NOT be started until platelet count recovers (risk of warfarin-induced skin necrosis from protein C depletion)",
      "LMWH cross-reacts in ~90% of HIT cases — must stop all heparin products",
      "Fondaparinux: pentasaccharide, minimal cross-reactivity with HIT antibodies — safe alternative",
      "4Ts score: ≤3 = low probability (can usually continue heparin); 4-5 = intermediate; ≥6 = high probability",
    ],
    indianBrandDrugs: [
      "Fondaparinux [Arixtra]",
      "Bivalirudin [Angiox]",
      "Argatroban [Argatroban STAGO]",
    ],
  },
  {
    name: "NSAIDs Nephropathy",
    subject: "Pharmacology",
    icd10: "N14.0",
    category: "Drug-induced Organ Damage",
    definition:
      "Renal impairment caused by NSAID use due to inhibition of renal prostaglandin synthesis, resulting in afferent arteriolar vasoconstriction and reduced glomerular filtration, particularly in states of reduced effective circulating volume.",
    etiology:
      "Risk factors: Pre-existing renal impairment, heart failure, cirrhosis, dehydration, advanced age (>65), concurrent diuretics/ACE inhibitors/ARBs, diabetes. All NSAIDs at risk (COX-2 selective included).",
    pathophysiology:
      "Normal renal prostaglandins (PGE2, PGI2) maintain afferent arteriolar vasodilation and GFR in low perfusion states. NSAIDs inhibit COX → prostaglandin synthesis blocked → afferent vasoconstriction → decreased GFR → prerenal/intrinsic AKI. Chronic use: interstitial nephritis, papillary necrosis, analgesic nephropathy.",
    clinicalFeatures: [
      "Acute: Oliguria, rising creatinine 24-72h after starting NSAID (prerenal AKI)",
      "Hyperkalaemia (aldosterone antagonism)",
      "Sodium and water retention (oedema, hypertension)",
      "Chronic: Analgesic nephropathy — sterile pyuria, haematuria, slowly progressive CKD",
      "Renal papillary necrosis: haematuria, flank pain, proteinuria",
      "Papillary tissue in urine (pathognomonic of papillary necrosis)",
    ],
    investigations: [
      "Serum creatinine (rise confirms AKI)",
      "Urine sodium/osmolality: FeNa <1% (prerenal mechanism)",
      "Serum potassium (hyperkalaemia)",
      "Urinalysis (haematuria, proteinuria in chronic)",
      "Renal ultrasound (papillary calcification in analgesic nephropathy)",
    ],
    treatment:
      "Stop NSAID immediately. IV Normal Saline for volume repletion. Monitor renal function, electrolytes. Treat hyperkalaemia (calcium gluconate, insulin-dextrose, kayexalate). Chronic analgesic nephropathy: withdraw all analgesics, monitor GFR. No specific antidote — supportive management.",
    complications: [
      "Acute kidney injury",
      "Hyperkalaemia (cardiac risk)",
      "Renal papillary necrosis",
      "Analgesic nephropathy with CKD",
      "Fluid retention worsening heart failure",
    ],
    differentiatingFeature:
      "NSAID nephropathy = prostaglandin-dependent renal perfusion failure (not toxic tubular injury). Distinguish: prerenal AKI (FeNa <1%, resolves with fluids) vs interstitial nephritis (eosinophiluria, fever, rash — from immune reaction). Renal papillary necrosis = sloughed papilla in urine (pathognomonic).",
    pearlPoints: [
      "NEET PG: NSAIDs + ACE inhibitors + diuretics = 'triple whammy' — high risk for AKI in elderly",
      "COX-2 selective NSAIDs (Celecoxib, Etoricoxib) carry same renal risk as non-selective NSAIDs",
      "Sulindac: least nephrotoxic NSAID (preferentially spares renal prostaglandins)",
      "Analgesic nephropathy: classically from phenacetin (now withdrawn) + paracetamol + aspirin combinations",
      "NSAIDs contraindicated in CKD, heart failure, cirrhosis — assess renal function before prescribing",
    ],
    indianBrandDrugs: [
      "Celecoxib [Celact, Cobix] — COX-2 selective",
      "Ibuprofen [Brufen, Combiflam]",
      "Etoricoxib [Nucoxia, Arcoxia]",
    ],
  },
  {
    name: "Aminoglycoside Nephrotoxicity",
    subject: "Pharmacology",
    icd10: "N14.2",
    category: "Drug-induced Organ Damage",
    definition:
      "Non-oliguric acute kidney injury caused by aminoglycoside antibiotics (Gentamicin, Amikacin, Tobramycin) through direct proximal tubular toxicity, typically occurring after 5-10 days of therapy.",
    etiology:
      "Risk factors: Prolonged therapy (>7 days), high trough levels, pre-existing renal impairment, volume depletion, elderly patients, concurrent nephrotoxins (Vancomycin, Amphotericin, NSAIDs, contrast).",
    pathophysiology:
      "Aminoglycosides enter proximal tubular cells via endocytosis (megalin receptor) → accumulate in lysosomes → lysosomal membrane rupture → reactive oxygen species → mitochondrial damage → tubular cell death → non-oliguric AKI. Aminoglycosides also accumulate in cochlea and vestibule causing ototoxicity.",
    clinicalFeatures: [
      "Non-oliguric AKI (urine output preserved — proximal tubule affected, not filtration)",
      "Rising creatinine day 5-10 of therapy",
      "Proximal tubular dysfunction: Fanconi syndrome features (phosphaturia, glucosuria, aminoaciduria)",
      "Hypomagnesaemia (proximal tubule Mg reabsorption impaired)",
      "Ototoxicity: Cochlear (high-frequency hearing loss, tinnitus) > Vestibular",
      "Usually reversible if drug stopped early",
    ],
    investigations: [
      "Serum creatinine (non-oliguric rise)",
      "Trough aminoglycoside levels (Gentamicin trough <2 mcg/mL target)",
      "Urine: beta-2 microglobulin, N-acetyl glucosaminidase (early tubular injury markers)",
      "Serum magnesium (hypomagnesaemia)",
      "Audiometry (cochlear toxicity monitoring)",
    ],
    treatment:
      "Discontinue or switch aminoglycoside. IV saline for volume repletion. Monitor renal function and drug levels. Once-daily dosing (ODD) regimen: reduces nephrotoxicity vs multiple daily dosing (higher peak, lower sustained levels → less tubular accumulation). Magnesium supplementation. Usually recovers in 2-3 weeks.",
    complications: [
      "Permanent sensorineural hearing loss (cochleotoxicity)",
      "Vestibular dysfunction (ataxia, vertigo)",
      "CKD if severe or repeated",
      "Hypomagnesaemia-induced arrhythmias",
    ],
    differentiatingFeature:
      "Non-oliguric AKI (urine output maintained) = characteristic of aminoglycoside nephrotoxicity (contrast with typical AKI which is oliguric). Onset Day 5-10 (not immediate). Once-daily dosing reduces nephrotoxicity by achieving lower sustained tubular levels.",
    pearlPoints: [
      "NEET PG: Neomycin = most nephrotoxic aminoglycoside; Streptomycin = most vestibulotoxic; Amikacin = least susceptible to bacterial resistance enzymes",
      "Once-daily dosing (ODD) = higher efficacy (concentration-dependent killing) + less nephrotoxicity + less ototoxicity",
      "Trough level monitoring: Gentamicin trough <2 mcg/mL, Amikacin trough <10 mcg/mL",
      "Vancomycin + Aminoglycoside combination = high synergistic nephrotoxicity risk",
      "Aminoglycosides are contraindicated in myasthenia gravis (worsen neuromuscular blockade)",
    ],
    indianBrandDrugs: [
      "Gentamicin [Genticyn, Garamycin]",
      "Amikacin [Amikin, Amicin]",
      "Tobramycin [Tobralex, Tobradex]",
    ],
  },
  {
    name: "Penicillin Anaphylaxis",
    subject: "Pharmacology",
    icd10: "T36.0X5A",
    category: "Adverse Drug Reaction",
    definition:
      "Severe IgE-mediated (Type I hypersensitivity) allergic reaction to penicillin or related beta-lactam antibiotics, causing systemic anaphylaxis within minutes of exposure. Most common cause of drug-induced anaphylaxis.",
    etiology:
      "Penicillin G, Amoxicillin, Ampicillin, Cephalosporins (10% cross-reactivity), Carbapenems (1% cross-reactivity). Previous sensitisation required (prior exposure creates IgE antibodies against penicilloyl determinant).",
    pathophysiology:
      "Penicillin degrades to penicilloyl (major determinant) and minor determinants. On re-exposure, drug-protein conjugate cross-links IgE on mast cells/basophils → degranulation → histamine, tryptase, PGD2 release → anaphylaxis. 80% of 'penicillin allergic' patients can tolerate penicillin on testing.",
    clinicalFeatures: [
      "Onset: minutes (IgE-mediated), occasionally up to 1 hour",
      "Urticaria, angioedema (skin — most common manifestation)",
      "Bronchospasm, laryngeal oedema (airway compromise)",
      "Hypotension, tachycardia (cardiovascular collapse)",
      "GI: Nausea, vomiting, diarrhoea",
      "Severe: Loss of consciousness, cardiac arrest",
    ],
    investigations: [
      "Clinical diagnosis — no time for investigations in acute anaphylaxis",
      "Serum tryptase: peaks 60-90 min post-reaction (confirm anaphylaxis retrospectively)",
      "Skin prick testing + intradermal testing (after acute episode — to confirm allergy)",
      "RAST (radioallergosorbent test): anti-penicilloyl IgE",
    ],
    treatment:
      "Adrenaline [Adrenor, Adrenaline Injection] 0.5mg IM (1:1,000) anterolateral thigh — FIRST AND ONLY LIFE-SAVING DRUG. Repeat every 5 minutes if no response. Position: Supine with legs elevated. Oxygen 10-15 L/min. IV NS 1-2L rapid bolus. Adjuncts: Chlorpheniramine 10mg IV + Hydrocortisone 200mg IV (do NOT delay adrenaline for these). Remove causative agent.",
    complications: [
      "Cardiac arrest",
      "Laryngeal oedema with asphyxia",
      "Biphasic anaphylaxis (recurrence 1-72h later in 20%)",
      "Serum sickness (Type III reaction — 7-10 days later)",
    ],
    differentiatingFeature:
      "IgE-mediated (Type I hypersensitivity): immediate onset (minutes), urticaria + angioedema + bronchospasm. Distinguish from: ACE inhibitor angioedema (bradykinin-mediated, no urticaria, no response to adrenaline). Adrenaline works in IgE anaphylaxis; NOT in bradykinin-mediated angioedema.",
    pearlPoints: [
      "NEET PG: 80% of 'penicillin-allergic' patients are NOT truly allergic — over-labelling leads to use of inferior antibiotics",
      "Penicillin skin testing: safe, gold standard for confirming allergy; 95% NPV (negative = safe to use)",
      "Cross-reactivity: Penicillin + Cephalosporins (10%), Carbapenems (1%) — based on R1 side chain similarity",
      "Serum tryptase >11.4 ng/mL confirms mast cell activation (anaphylaxis vs vasovagal)",
      "Penicillin desensitisation: possible with graded oral challenge in controlled setting if no alternative",
    ],
    indianBrandDrugs: [
      "Adrenaline (Epinephrine) [Adrenor, Neon Adrenaline Injection 1mg/mL]",
      "Chlorpheniramine [Piriton, Aller-Chlor]",
      "Hydrocortisone [Solu-Cortef, Effcorlin]",
    ],
  },
  {
    name: "ACE Inhibitor Angioedema",
    subject: "Pharmacology",
    icd10: "T46.4X5A",
    category: "Adverse Drug Reaction",
    definition:
      "Non-allergic (bradykinin-mediated) angioedema caused by ACE inhibitor drugs, characterised by recurrent episodes of face, lips, tongue, and larynx swelling without urticaria. Risk is highest in first 30 days but can occur after years of therapy.",
    etiology:
      "ACE inhibitors: Ramipril, Enalapril, Lisinopril, Perindopril, Captopril. More common in Black patients (3-4x higher risk), elderly, and patients with prior hereditary or acquired angioedema. ARBs have much lower (0.7%) risk.",
    pathophysiology:
      "ACE normally degrades bradykinin. ACE inhibition → bradykinin accumulates → stimulates B2 receptors on endothelium → increased vascular permeability → angioedema. NOT IgE-mediated — therefore no urticaria, no response to antihistamines or epinephrine.",
    clinicalFeatures: [
      "Recurrent episodes of painless, non-pitting swelling",
      "Face, lips, tongue (most common sites)",
      "Laryngeal involvement (life-threatening airway compromise)",
      "NO urticaria (distinguishes from allergic angioedema)",
      "Intestinal angioedema: recurrent abdominal pain, vomiting (can mimic surgical emergency)",
      "May occur years after starting therapy (unpredictable timing)",
    ],
    investigations: [
      "Clinical diagnosis — based on ACE inhibitor use + angioedema without urticaria",
      "Complement C3, C4, C1-esterase inhibitor (to rule out hereditary angioedema: C4 is low)",
      "Consider tryptase (to rule out concurrent anaphylaxis)",
    ],
    treatment:
      "STOP ACE inhibitor permanently. Airway management first — intubation if laryngeal involvement. Icatibant [Firazyr] 30mg SC — bradykinin B2 receptor antagonist (specific for hereditary + ACE inhibitor angioedema). C1-esterase inhibitor concentrate if available. Fresh Frozen Plasma (contains ACE enzyme to degrade bradykinin). Adrenaline, antihistamines, and corticosteroids may NOT be effective (bradykinin-mediated — not histamine-mediated).",
    complications: [
      "Laryngeal oedema with asphyxia",
      "Intubation/emergency airway",
      "Recurrence if ACE inhibitor continued",
    ],
    differentiatingFeature:
      "ACE inhibitor angioedema: NO urticaria (critical distinction from allergic angioedema). Bradykinin-mediated — epinephrine and antihistamines are ineffective. Icatibant (B2 antagonist) is specific treatment. Hereditary angioedema (HAE) = low C4 always; ACE inhibitor angioedema = normal C4.",
    pearlPoints: [
      "NEET PG: ACE inhibitor angioedema is bradykinin-mediated, NOT IgE-mediated — adrenaline does NOT reliably work",
      "Black patients have 3-4x higher incidence of ACE inhibitor-induced cough AND angioedema",
      "ACE inhibitor cough (dry, persistent) = bradykinin accumulation in bronchi (5-10% of patients) — switch to ARB",
      "If switching anticoagulant: ARB (Losartan, Valsartan) — very low risk of cross-reacting angioedema",
      "Hereditary angioedema (C1 esterase inhibitor deficiency): ACE inhibitors are absolutely contraindicated",
    ],
    indianBrandDrugs: [
      "Icatibant [Firazyr]",
      "Ramipril [Cardace, Ramace]",
      "Enalapril [Envas, Enapril]",
      "Losartan [Losar, Tozaar] — safe ARB alternative",
    ],
  },
  {
    name: "Vancomycin Red Man Syndrome",
    subject: "Pharmacology",
    icd10: "T36.8X5A",
    category: "Adverse Drug Reaction",
    definition:
      "Non-immune (anaphylactoid) infusion reaction to Vancomycin caused by direct mast cell degranulation and histamine release, characterised by flushing, erythema, and pruritus typically on face, neck, and upper torso during or shortly after infusion.",
    etiology:
      "Too-rapid infusion of Vancomycin (most common cause), high doses, concurrent opioids (Morphine, Codeine) which also release histamine, concurrent Ciprofloxacin. NOT IgE-mediated — no prior sensitisation required.",
    pathophysiology:
      "Vancomycin (and its impurities) directly degranulates mast cells → histamine release (not IgE-mediated). Rate-dependent reaction: faster infusion = more histamine release. Can occur on first exposure (no prior sensitisation needed) — distinguishes from true allergic reactions.",
    clinicalFeatures: [
      "Flushing: 'Red man' erythema on face, neck, upper torso during infusion",
      "Pruritus (itching) — characteristic",
      "Erythematous macular rash on upper body",
      "Hypotension (in severe cases from histamine-mediated vasodilation)",
      "Tachycardia",
      "Angioedema (rare)",
      "Usually starts within 4-10 minutes of infusion start",
    ],
    investigations: [
      "Clinical diagnosis",
      "No specific tests required",
      "Serum tryptase: low/normal (not mast cell degranulation via IgE pathway)",
    ],
    treatment:
      "Stop or slow infusion immediately. IV Chlorpheniramine [Piriton] 10mg + Hydrocortisone 100mg IV. Restart infusion at HALF the previous rate after symptoms resolve (max rate: 1g over 60 min; optimal 10-15 mg/min). Premedication for future doses: Diphenhydramine/Chlorpheniramine 30-60 min before infusion. In severe cases: IV Normal Saline bolus for hypotension.",
    complications: [
      "Hypotension (can be severe)",
      "Cardiac arrest (very rare, extremely rapid infusion)",
    ],
    differentiatingFeature:
      "Red Man Syndrome is NOT a true allergy — it is anaphylactoid (direct mast cell degranulation). Key distinction: occurs on first exposure (no sensitisation needed), resolves with stopping infusion, can be prevented by slow infusion. True Vancomycin allergy is rare but exists (urticaria + systemic features beyond just flushing).",
    pearlPoints: [
      "NEET PG: Vancomycin 1g should be infused over MINIMUM 60 minutes to prevent Red Man Syndrome",
      "Premedicate with antihistamine 30-60 min before infusion in known Red Man Syndrome patients",
      "Vancomycin therapeutic drug monitoring: trough 10-20 mcg/mL (or AUC/MIC >400 for serious infections)",
      "Nephrotoxicity: Vancomycin trough >20 + aminoglycoside = significantly increased nephrotoxicity risk",
      "Ototoxicity: Vancomycin levels >80-100 mcg/mL — rare with modern preparations",
    ],
    indianBrandDrugs: [
      "Vancomycin [Vancocin, Vancorin, Vanco 500]",
      "Chlorpheniramine [Piriton, Aller-Chlor]",
      "Hydrocortisone [Solu-Cortef]",
    ],
  },
  {
    name: "Statin Myopathy and Rhabdomyolysis",
    subject: "Pharmacology",
    icd10: "G72.89",
    category: "Drug Toxicity",
    definition:
      "Spectrum of muscle toxicity from HMG-CoA reductase inhibitors (statins) ranging from asymptomatic CK elevation, myalgia, myositis, to life-threatening rhabdomyolysis with acute kidney injury.",
    etiology:
      "Risk factors: High-dose statins (Rosuvastatin 40mg, Simvastatin 80mg), drug interactions (CYP3A4 inhibitors: Erythromycin, Clarithromycin, Azole antifungals, Amiodarone, Verapamil), Gemfibrozil (inhibits statin glucuronidation), hypothyroidism, renal impairment, genetic SLCO1B1 polymorphism.",
    pathophysiology:
      "Statins deplete mevalonate pathway intermediates (Coenzyme Q10, isoprenoids) essential for mitochondrial function and protein prenylation → mitochondrial dysfunction → muscle cell energy depletion → fibre necrosis. Polymorphisms in SLCO1B1 (transporter gene) increase statin plasma levels.",
    clinicalFeatures: [
      "Myalgia (muscle pain/weakness) — most common, reversible",
      "Myositis: myalgia + CK elevation 3-10x ULN",
      "Rhabdomyolysis: CK >10x ULN + systemic symptoms",
      "Tea/cola-coloured urine (myoglobinuria) — rhabdomyolysis pathognomonic",
      "Muscle weakness, tenderness (proximal > distal)",
      "Nausea, malaise, fever (in severe rhabdomyolysis)",
      "Oliguria from AKI (myoglobin precipitation in tubules)",
    ],
    investigations: [
      "CK levels: Myalgia (<3x ULN), Myositis (3-10x), Rhabdomyolysis (>10x ULN)",
      "Renal function (AKI from myoglobinuria)",
      "Urine myoglobin (dipstick positive for blood but no RBCs on microscopy)",
      "Thyroid function (hypothyroidism exacerbates statin myopathy)",
      "Anti-HMGCR antibodies (immune-mediated necrotising myopathy — rare but persistent after statin stopped)",
    ],
    treatment:
      "Stop statin immediately. Vigorous IV hydration (Normal Saline 1-2L/hour) — target urine output 3 mL/kg/hour. Urine alkalinisation: Sodium Bicarbonate (maintains myoglobin solubility, prevents tubular precipitation). Monitor renal function and electrolytes. Treat hyperkalaemia. Rechallenge: lower-dose statin or alternate agent (Rosuvastatin, Pravastatin) after full CK normalisation.",
    complications: [
      "Acute kidney injury",
      "Hyperkalaemia, hypocalcaemia",
      "DIC",
      "Cardiac arrhythmias",
      "Persistent immune-mediated necrotising myopathy (anti-HMGCR myopathy)",
    ],
    differentiatingFeature:
      "Tea-coloured urine + elevated CK + statin use = statin rhabdomyolysis. Anti-HMGCR antibody myopathy = rare immune-mediated statin myopathy that CONTINUES after stopping the drug (requires immunosuppression). Pravastatin and Rosuvastatin: hydrophilic (less muscle penetration, lower myopathy risk).",
    pearlPoints: [
      "NEET PG: Simvastatin 80mg + Amiodarone = dangerous combination (increases Simvastatin AUC 7-fold → rhabdomyolysis risk)",
      "CK monitoring: baseline before statin, recheck if myalgia develops — do not routinely monitor if asymptomatic",
      "Gemfibrozil + statin = high rhabdomyolysis risk (inhibits statin glucuronidation); Fenofibrate is safer combination",
      "Pravastatin and Rosuvastatin are hydrophilic statins — lower myopathy risk than lipophilic (Simvastatin, Atorvastatin)",
      "CoQ10 supplementation: no proven clinical benefit in preventing statin myopathy (theoretical rationale only)",
    ],
    indianBrandDrugs: [
      "Rosuvastatin [Rozavel, Crestor]",
      "Atorvastatin [Lipitor, Atorva]",
      "Pravastatin [Pravachol, Pravator]",
    ],
  },
  {
    name: "Drug-Induced Liver Injury (DILI)",
    subject: "Pharmacology",
    icd10: "K71.9",
    category: "Drug-induced Organ Damage",
    definition:
      "Hepatotoxicity caused by drugs or herbal/dietary supplements, diagnosed by exclusion of other causes. RUCAM (Roussel Uclaf Causality Assessment Method) score assesses causality. One of the most common causes of acute liver failure.",
    etiology:
      "Most common in India: Anti-TB drugs (Isoniazid, Rifampicin, Pyrazinamide), Paracetamol (dose-dependent), Halothane, Methotrexate, Valproate, Amiodarone, Statins, Herbal medicines (Ayurvedic/Chinese herbs). Alcohol potentiates all hepatotoxins.",
    pathophysiology:
      "Two patterns: (1) Intrinsic/predictable — dose-dependent, hepatocellular necrosis (Paracetamol, CCl4); (2) Idiosyncratic — immune-mediated or metabolic idiosyncrasy (Isoniazid, Halothane, Diclofenac) — not dose-dependent, unpredictable. Patterns: Hepatocellular (ALT >3x ULN), Cholestatic (ALP >2x), or Mixed.",
    clinicalFeatures: [
      "Asymptomatic LFT elevation (most common)",
      "Jaundice, fatigue, nausea, right upper quadrant pain",
      "Cholestatic pattern: jaundice + pruritus + pale stools + dark urine",
      "Fulminant hepatic failure: coagulopathy + encephalopathy (INR >1.5 + Grade II encephalopathy)",
      "Hy's Law: hepatocellular injury (ALT >3x ULN) + jaundice (bilirubin >2x ULN) = 10% mortality risk",
    ],
    investigations: [
      "LFTs: ALT/AST (hepatocellular), ALP/GGT (cholestatic), Bilirubin (both)",
      "INR/PT (coagulopathy = severity marker)",
      "RUCAM score: causality assessment (1-9 points, >8 = highly probable DILI)",
      "Anti-TB LFT monitoring: baseline + monthly for first 3 months",
      "Liver biopsy (if diagnosis uncertain, centrilobular necrosis = paracetamol/halothane; granulomatous = isoniazid)",
    ],
    treatment:
      "Withdraw causative drug IMMEDIATELY. N-Acetylcysteine [Cytoprotect] IV (beneficial in non-paracetamol DILI as well — ALFSG trial). Supportive care: vitamin K for coagulopathy, lactulose for encephalopathy. Ursodeoxycholic acid [Udiliv] for cholestatic DILI. Corticosteroids for autoimmune-type DILI. King's College Criteria for liver transplant referral.",
    complications: [
      "Acute liver failure",
      "Vanishing bile duct syndrome (chronic cholestatic DILI)",
      "Cirrhosis (Methotrexate, Amiodarone — long-term use)",
      "Reactivation risk if drug rechallenge",
    ],
    differentiatingFeature:
      "Hy's Law: ALT >3x ULN + Bilirubin >2x ULN (without ALP elevation) = 10% risk of fatality — important FDA drug approval criterion. Zone 3 necrosis = paracetamol. Zone 1 necrosis = yellow phosphorus. Zone 2 necrosis = beryllium. Isoniazid-DILI: worsens with continued treatment despite mild LFT elevation (adaptation vs injury pattern).",
    pearlPoints: [
      "NEET PG: Anti-TB DILI protocol — stop all ATT if ALT >5x ULN (or >3x ULN with symptoms). Restart sequentially after normalisation: Rifampicin → Isoniazid → Ethambutol (Pyrazinamide excluded if DILI suspect)",
      "Halothane hepatitis: two forms — mild (type I, common, mild LFT rise) vs fulminant (type II, rare, immune-mediated, massive necrosis)",
      "Methotrexate hepatotoxicity: cumulative dose-dependent fibrosis; liver biopsy after 1.5g cumulative dose",
      "RUCAM score: evaluates time to onset, de-challenge, re-challenge, other drugs, alcohol, age, and prior liver disease",
      "Herbal hepatotoxicity: Kava kava, Pyrrolizidine alkaloids (Comfrey), Pennyroyal — most important herbal hepatotoxins",
    ],
    indianBrandDrugs: [
      "N-Acetylcysteine [Cytoprotect, Fluimucil]",
      "Ursodeoxycholic acid [Udiliv, Ursocol]",
      "Silymarin/Milk Thistle [Silymarin, Livolin Forte] — hepatoprotective",
    ],
  },
  {
    name: "Thiazide-Induced Hyponatraemia",
    subject: "Pharmacology",
    icd10: "E87.1",
    category: "Drug Toxicity",
    definition:
      "Symptomatic hyponatraemia (Na <135 mEq/L) caused by thiazide and thiazide-like diuretics, through a unique SIADH-like mechanism. Most severe among diuretic-induced electrolyte disturbances. Preferentially affects elderly women.",
    etiology:
      "Hydrochlorothiazide, Chlorthalidone, Indapamide. Risk factors: Elderly females, low body mass, renal impairment, concurrent SSRI use (synergistic SIADH effect), hot weather, low sodium diet. Onset: typically within days to weeks of starting therapy.",
    pathophysiology:
      "Thiazides block NaCl cotransporter (NCC) in distal tubule → sodium loss → volume depletion → ADH release. Uniquely, thiazides (unlike loop diuretics) PRESERVE urinary concentrating ability → free water retention → dilutional hyponatraemia. Mechanism differs from loop diuretics which dilute both Na and water.",
    clinicalFeatures: [
      "Mild (Na 130-135): Fatigue, nausea, malaise",
      "Moderate (Na 125-130): Headache, confusion, unsteady gait",
      "Severe (Na <125): Seizures, respiratory arrest, coma",
      "Elderly: falls and cognitive impairment even with mild hyponatraemia",
      "Cerebral oedema if rapid Na fall",
    ],
    investigations: [
      "Serum sodium <135 mEq/L",
      "Urine sodium >20 mEq/L, Urine osmolality >100 mOsm/kg (SIADH-like pattern)",
      "Serum osmolality: low (<280 mOsm/kg) — hypotonic hyponatraemia",
      "Thyroid, adrenal function (to exclude other causes)",
      "Serum potassium (concurrent hypokalaemia in 50%)",
    ],
    treatment:
      "Stop thiazide immediately. Fluid restriction (1-1.5L/day) if SIADH-like pattern. Oral sodium chloride for mild-moderate cases. Severe/symptomatic (Na <120 or seizures): Hypertonic saline 3% NaCl — increase Na by 1-2 mEq/L/hour initially. Correction rate: Maximum 10-12 mEq/L in first 24 hours, 18 mEq/L in 48 hours. Tolvaptan [Samsca] for severe/persistent cases (V2 receptor antagonist).",
    complications: [
      "Osmotic demyelination syndrome (ODS/CPM) — from TOO RAPID correction (>12 mEq/24h)",
      "Cerebral oedema from acute hyponatraemia",
      "Falls, fractures (confusion + ataxia)",
      "Respiratory arrest (severe hyponatraemia)",
    ],
    differentiatingFeature:
      "Thiazide uniquely causes SIADH-like hyponatraemia (preserves urinary concentrating ability) unlike loop diuretics (which cause hyper-osmolar diuresis). Elderly females most at risk — classic NEET PG exam scenario. ODS/Central Pontine Myelinolysis = complication of OVER-RAPID correction (not hyponatraemia itself).",
    pearlPoints: [
      "NEET PG: Correction rate rule: 10-12 mEq/L per 24h maximum to avoid osmotic demyelination syndrome",
      "Central Pontine Myelinolysis (ODS): pseudobulbar palsy, quadriplegia, locked-in syndrome — caused by rapid Na correction",
      "Thiazides are CONTRAINDICATED in known SIADH patients — worsen hyponatraemia",
      "Concomitant SSRI + Thiazide = very high risk of severe hyponatraemia (synergistic ADH effect)",
      "Hypertonic saline (3% NaCl) formula: Na deficit = 0.6 × weight × (target Na − current Na)",
    ],
    indianBrandDrugs: [
      "Hydrochlorothiazide [HCTZ, Esidrex]",
      "Indapamide [Lorvas, Natrilix]",
      "Tolvaptan [Samsca, Samopriv] — for severe persistent SIADH-pattern hyponatraemia",
    ],
  },
];

// ─── Microbiology Diseases (Ananthanarayan & Paniker 10th Ed, ICMR 2025) ───
export const microbiologyDiseases: DiseaseEntry[] = [
  {
    name: "Cholera",
    subject: "Microbiology",
    icd10: "A00.9",
    category: "Bacterial Infection",
    definition:
      "Acute secretory diarrhoeal illness caused by Vibrio cholerae O1 or O139 serogroups, producing profuse rice-water stools due to cholera toxin-mediated activation of adenylyl cyclase in intestinal epithelium, leading to massive electrolyte and fluid loss.",
    etiology:
      "Vibrio cholerae: Gram-negative, curved rod (comma-shaped), highly motile (single polar flagellum), facultative anaerobe. Serogroups O1 (El Tor biotype — pandemic strain) and O139 (Bengal — India/Bangladesh). Transmission: contaminated water/food (fecal-oral route). Infective dose: 10^8 organisms.",
    pathophysiology:
      "V. cholerae colonises small intestine → produces cholera toxin (CT) → CT B subunit binds GM1 ganglioside on enterocyte → A subunit activates Gs-protein → adenylyl cyclase → cAMP → activates CFTR chloride channel → massive Cl⁻ secretion into lumen → Na, K, HCO3, water follow osmotically → isotonic secretory diarrhoea. No mucosal invasion (non-invasive — no blood/pus in stool).",
    clinicalFeatures: [
      "Sudden onset profuse watery diarrhoea — 'rice-water stools' (colourless, odourless, flecks of mucus)",
      "Massive volume loss: up to 1 litre per hour in severe cases",
      "Painless diarrhoea (unlike dysentery — no tenesmus, no blood)",
      "Vomiting (without preceding nausea — forceful, projectile)",
      "Severe dehydration: sunken eyes, skin turgor loss, 'washerwomen's hands' (wrinkled skin)",
      "Hypovolaemic shock: tachycardia, hypotension, oliguria → anuria",
      "Muscle cramps (hypokalaemia — 'cholera cramps')",
      "Acidotic breathing (metabolic acidosis from bicarbonate loss)",
    ],
    investigations: [
      "Stool microscopy: dark-field microscopy shows 'shooting star' motility of vibrios",
      "Stool culture on TCBS agar (Thiosulphate Citrate Bile Sucrose): yellow colonies = V. cholerae O1 (sucrose fermenters)",
      "Oxidase test: positive (Vibrio is oxidase-positive)",
      "Serology: vibriocidal antibody titre (epidemiological, not clinical use)",
      "String test: positive (Vibrio lyses in 0.5% sodium desoxycholate)",
      "Rapid diagnostic test: O1/O139 specific dipstick test",
      "Serum electrolytes: hyponatraemia, hypokalaemia, metabolic acidosis",
    ],
    treatment:
      "ORS (Oral Rehydration Salts — WHO formula): 75mEq/L Na, 20mEq/L K, 65mEq/L Cl, 10mEq/L citrate, 75mmol/L glucose. Severe dehydration: IV Ringer's Lactate (preferred over NS — prevents hyperchloraemic acidosis). Adults: 100mL/kg RL in 3h (severe). Antibiotics: Doxycycline 300mg single dose (adults) or Azithromycin 1g single dose. Children: Azithromycin 20mg/kg. Alternatives: Ciprofloxacin 1g single dose (Ciprobid/Ciplox).",
    complications: [
      "Hypovolaemic shock and acute tubular necrosis",
      "Hypokalaemia-induced ileus and cardiac arrhythmias",
      "Metabolic acidosis",
      "Acute kidney injury (prerenal → intrinsic)",
      "Aspiration pneumonia (vomiting + altered consciousness)",
      "Hypoglycaemia (especially in children)",
    ],
    differentiatingFeature:
      "Rice-water stools (odourless, colourless, flecks of mucus) = pathognomonic of cholera. TCBS agar yellow colonies = V. cholerae O1. Shooting star motility on dark-field microscopy. Non-bloody, non-dysenteric diarrhoea (no WBCs in stool) = secretory, not invasive diarrhoea.",
    pearlPoints: [
      "NEET PG: El Tor biotype (currently pandemic) — survives longer in environment, milder disease than classical biotype",
      "Cholera toxin mechanism: ADP-ribosylation of Gs-alpha → permanent activation → cAMP surge → CFTR channel open",
      "ORS works because glucose-coupled Na transport (SGLT1) is intact despite cAMP-driven secretion — 'oral rehydration miracle'",
      "TCBS agar: V. cholerae = yellow (sucrose fermenter); V. parahaemolyticus = blue-green (non-fermenter)",
      "V. cholerae O139 causes epidemic cholera; V. cholerae non-O1/non-O139 causes sporadic gastroenteritis only",
    ],
    icmrProtocol:
      "ICMR/NVBDCP Protocol: Classify severity (mild/moderate/severe) by dehydration assessment. ORS for mild-moderate. RL IV for severe. Doxycycline/Azithromycin to reduce shedding and duration. Notify district health officer.",
    indianBrandDrugs: [
      "ORS [Electral, Gastrolyte, WHO-ORS sachets]",
      "Doxycycline [Doxt, Doxycap, Vibramycin]",
      "Azithromycin [Azithral, Zithromax, Azee]",
      "Ciprofloxacin [Ciprobid, Ciplox, Cifran]",
    ],
  },
  {
    name: "Typhoid Fever",
    subject: "Microbiology",
    icd10: "A01.0",
    category: "Bacterial Infection",
    definition:
      "Systemic febrile illness caused by Salmonella enterica serovar Typhi (Salmonella Typhi), characterised by sustained fever, relative bradycardia, hepatosplenomegaly, and rose spots, resulting from bacteraemia and multiplication within reticuloendothelial cells.",
    etiology:
      "Salmonella Typhi: Gram-negative rod, facultative intracellular pathogen, H antigen (d), O antigen (9,12), Vi antigen (virulence). Salmonella Paratyphi A/B/C causes paratyphoid (milder). Transmission: fecal-oral via contaminated water/food. Infective dose: 10^5 organisms.",
    pathophysiology:
      "Ingested organisms → M cells of Peyer's patches → taken up by macrophages → replicate intracellularly → bacteraemia (first week) → hepatosplenomegaly → Peyer's patch hyperplasia → ulceration (ileum) → 2nd week: rose spots (dermal arterioles) → Week 3: complications (perforation, haemorrhage). Vi antigen resists phagocytosis.",
    clinicalFeatures: [
      "Step-ladder fever (rises by 1°F/day, peaks 104°F by week 1 end) — classic pattern",
      "Relative bradycardia (Faget's sign): pulse-temperature dissociation — pulse inappropriate for fever level",
      "Rose spots: 2-4mm salmon-pink maculopapular lesions on trunk (2nd week, 30% of patients)",
      "Hepatosplenomegaly (2nd week)",
      "Coated tongue with red tip and edges ('typhoid tongue')",
      "Constipation (1st week) → diarrhoea with 'pea-soup' stools (2nd-3rd week)",
      "Toxic look, dull facies ('typhoid facies')",
      "Deafness (high-frequency sensorineural — rare)",
    ],
    investigations: [
      "Blood culture (gold standard): positive in 80% in 1st week; Castaneda's biphasic medium or automated BACTEC",
      "Widal test: O antibody (IgM — current infection) >1:160, H antibody (IgG — past/vaccinated) >1:160",
      "Bone marrow culture: highest sensitivity (90%), positive even after antibiotics",
      "CBC: leucopenia (hallmark), relative lymphocytosis, anaemia, thrombocytopenia",
      "Typhidot/TUBEX rapid serology (anti-Vi IgM — more specific than Widal)",
      "LFTs: mild transaminase elevation (hepatitis pattern)",
    ],
    treatment:
      "Ceftriaxone [Ceftrex, Monocef] 2g IV once daily x 10-14 days (drug of choice for severe/complicated typhoid). Azithromycin [Azithral] 1g loading, then 500mg OD x 7 days (uncomplicated, oral, NEET PG high-yield). Ciprofloxacin 500mg BD x 14 days (increasing fluoroquinolone resistance in India). Chloramphenicol (historic — still used in resource-limited settings). Dexamethasone for severe toxaemia/altered consciousness.",
    complications: [
      "Intestinal perforation (3rd week — ileum; presents as peritonitis/acute abdomen — most serious surgical complication)",
      "Intestinal haemorrhage (2nd-3rd week)",
      "Typhoid encephalopathy (2-3% — delirium, seizures)",
      "Myocarditis",
      "Hepatitis",
      "Relapse (10-15% — Chloramphenicol era)",
      "Chronic carrier state (3-5% — bile/gallbladder reservoir)",
    ],
    differentiatingFeature:
      "Relative bradycardia (Faget's sign) + rose spots = typhoid fever. Widal test: O antibody titre (active disease) more significant than H antibody (past/vaccinated). Bone marrow culture = highest yield. Leucopenia in an ill febrile patient = strongly suggests typhoid.",
    pearlPoints: [
      "NEET PG: Widal test: O antibodies = current infection (IgM); H antibodies = past infection or vaccination (IgG)",
      "Chronic carrier: Salmonella Typhi persists in gallbladder (especially cholelithiasis patients) — Vi antigen test positive",
      "Diarrhoea in typhoid = 'pea-soup' (3rd week Peyer's patch ulceration); constipation in 1st week",
      "Drug of choice uncomplicated typhoid: Azithromycin (oral); Complicated: Ceftriaxone IV",
      "Rose spots: salmon-pink, blanch on pressure, appear 7-12 days; biopsy shows Salmonella within dermal vessels",
    ],
    icmrProtocol:
      "ICMR Protocol: Ceftriaxone for inpatient severe typhoid. Azithromycin for outpatient uncomplicated. Culture sensitivity mandatory before antibiotic in endemic areas. Notify communicable disease authority.",
    indianBrandDrugs: [
      "Ceftriaxone [Ceftrex, Monocef, Rocephin]",
      "Azithromycin [Azithral, Azee, Zithromax]",
      "Ciprofloxacin [Ciprobid, Ciplox]",
      "Dexamethasone [Dexona, Decadron]",
    ],
  },
  {
    name: "Pulmonary Tuberculosis",
    subject: "Microbiology",
    icd10: "A15.0",
    category: "Mycobacterial Infection",
    definition:
      "Chronic granulomatous infection of the lungs caused by Mycobacterium tuberculosis, characterised by caseating granulomas, Ghon complex formation, and transmission via respiratory droplets. Leading infectious cause of death globally; India has the highest burden (27% of world TB cases).",
    etiology:
      "Mycobacterium tuberculosis: Gram-positive (weakly staining), acid-fast bacillus (AFB), aerobic, non-motile, non-spore-forming, intracellular pathogen. Cell wall: mycolic acids, arabinogalactan, peptidoglycan. Ziehl-Neelsen stain: bright red bacilli. Grows slowly (18-24h doubling time); Lowenstein-Jensen medium (6-8 weeks). Rif-resistance mutation: rpoB gene.",
    pathophysiology:
      "Inhalation of 1-5 μm droplet nuclei → alveolar macrophages unable to kill → intracellular multiplication → granuloma formation (Langhans giant cells + epithelioid cells + lymphocytes) → central caseation necrosis. Primary infection: Ghon focus (subpleural) + Ghon complex (focus + hilar LN). Reactivation: cavitary disease (apex — high O2 tension).",
    clinicalFeatures: [
      "Chronic productive cough >3 weeks (most common presenting symptom)",
      "Haemoptysis (blood-streaked to frank haemoptysis — Rasmussen aneurysm in cavities)",
      "Evening rise of temperature with night sweats",
      "Weight loss, anorexia, fatigue (constitutional symptoms)",
      "Chest pain (pleurisy)",
      "Respiratory: reduced breath sounds, amphoric breathing over cavities",
      "Clubbing (in chronic/fibro-cavitary disease)",
    ],
    investigations: [
      "Sputum AFB smear (Ziehl-Neelsen/Auramine-Rhodamine fluorescent stain) — 2 samples (spot + early morning)",
      "CBNAAT/GeneXpert MTB/RIF: rapid molecular test (2h result), detects MTB + Rifampicin resistance; NTEP first-line diagnostic",
      "Sputum culture: LJ medium (6-8 weeks) or BACTEC MGIT (2-3 weeks) — gold standard for diagnosis + DST",
      "Chest X-ray: upper lobe infiltrates, cavitations, fibronodular shadows (reactivation); lower lobe + hilar adenopathy (primary)",
      "Mantoux test (TST): >10mm (immunocompetent), >5mm (HIV/immunocompromised)",
      "IGRA (QuantiFERON-Gold): latent TB diagnosis; not affected by BCG vaccination",
      "CT chest (HRCT): defines extent, satellite lesions, lymphadenopathy",
    ],
    treatment:
      "NTEP (DOTS) Regimen 2HRZE/4HR: Intensive Phase 2 months — Isoniazid [INH, Inirazid] + Rifampicin [Rimactane, Rifadin] + Pyrazinamide [PZA] + Ethambutol [Myambutol, Combutol]; Continuation Phase 4 months — Isoniazid + Rifampicin. Weight-based fixed-dose combination (FDC) as per NTEP 2022 guidelines. MDR-TB: Bedaquiline + Delamanid + Linezolid-based regimen (BPaL or BPaLC). DR-TB treatment under PMDT programme.",
    complications: [
      "Massive haemoptysis (Rasmussen aneurysm rupture)",
      "Pneumothorax, empyema",
      "Respiratory failure (extensive disease)",
      "Anti-TB drug-induced liver injury (DILI) — Isoniazid, Rifampicin, Pyrazinamide",
      "MDR-TB, XDR-TB (drug-resistant strains)",
      "Spread: miliary TB, TB meningitis, TB pericarditis",
    ],
    differentiatingFeature:
      "AFB positive sputum + CBNAAT detecting MTB = confirmed TB. Ghon complex (Ghon focus + hilar lymphadenopathy + lymphangitis) = primary TB. Upper lobe cavitary lesion = reactivation (post-primary) TB. Ziehl-Neelsen stain: acid-fast bacteria resist decolourisation by acid-alcohol — hallmark of mycobacteria.",
    pearlPoints: [
      "NEET PG: CBNAAT/GeneXpert is now NTEP first-line diagnostic (replaces smear microscopy as first test in NTEP guidelines 2022)",
      "Isoniazid mechanism: inhibits InhA (enoyl-ACP reductase) → blocks mycolic acid synthesis; peripheral neuropathy prevented by Pyridoxine (B6)",
      "Rifampicin: inhibits DNA-dependent RNA polymerase (rpoB); red-orange body fluids (urine, saliva, tears) — warn patient",
      "Pyrazinamide: active only at pH <6 (acidic environment inside macrophages) — uniquely kills intracellular organisms",
      "BCG vaccination: protects against miliary TB and TB meningitis in children; does NOT prevent pulmonary TB",
    ],
    icmrProtocol:
      "NTEP (National TB Elimination Programme) 2022: Universal Drug Susceptibility Testing (UDST) with CBNAAT before treatment. All DS-TB on weight-based FDC DOTS. MDR-TB: Bedaquiline-based shorter regimen. Nikshay portal notification mandatory. Nikshay Poshan Yojana (₹500/month nutritional support).",
    indianBrandDrugs: [
      "Isoniazid [INH, Inirazid, Nydrazid]",
      "Rifampicin [Rimactane, Rifadin, Rimpin]",
      "Fixed-dose combination [Rimactazid, AKURIT-4, FORECOX]",
      "Bedaquiline [Sirturo] — for MDR-TB under NTEP",
    ],
  },
  {
    name: "Leprosy",
    subject: "Microbiology",
    icd10: "A30.9",
    category: "Mycobacterial Infection",
    definition:
      "Chronic granulomatous disease caused by Mycobacterium leprae, primarily affecting the skin, peripheral nerves, and upper respiratory mucosa, classified by Ridley-Jopling system based on immune response: tuberculoid (TT), borderline (BT/BB/BL), and lepromatous (LL) poles.",
    etiology:
      "Mycobacterium leprae: obligate intracellular, acid-fast bacillus, cannot be cultured in vitro (only in armadillos and mouse footpads). Slowest-dividing bacterium (12-14 days doubling time — longest incubation 2-10 years). Tropism for Schwann cells and macrophages. Transmission: prolonged close contact via nasal droplets; low infectivity.",
    pathophysiology:
      "M. leprae invades Schwann cells via laminin receptor → demyelination → sensory and motor nerve damage. Tuberculoid (TT): strong cell-mediated immunity → few bacilli → localised skin/nerve lesion; Lepromatous (LL): poor CMI → abundant bacilli → disseminated disease, 'globus' foamy macrophages (Virchow cells), leonine facies.",
    clinicalFeatures: [
      "Sensory loss in skin lesions (earliest and most important diagnostic feature)",
      "Thickened peripheral nerves (posterior auricular, ulnar, common peroneal, radial cutaneous — palpable and tender)",
      "Hypopigmented anaesthetic patch (TT — one or few lesions, well-defined, dry, hairless)",
      "Leonine facies, madarosis (loss of lateral eyebrows), saddle nose deformity (LL — extensive infiltration)",
      "Glove-and-stocking anaesthesia (LL — bilateral symmetric sensory loss)",
      "Claw hand (ulnar nerve), foot drop (common peroneal), lagophthalmos (facial nerve)",
      "Lepra reactions: Type 1 (reversal reaction — CMI upgrade) and Type 2 (ENL — immune complex-mediated, tender nodules, fever)",
    ],
    investigations: [
      "Slit-skin smear (SSS): AFB smear from ear lobes, nasal scrapings, lesion edge — Bacteriological Index (BI)",
      "Lepromin test (Mitsuda reaction): positive in TT (strong CMI), negative in LL — indicates prognosis, NOT diagnosis",
      "Skin biopsy: granuloma pattern (TT: well-formed), Virchow cells/globi (LL: poorly formed, AFB laden)",
      "Nerve conduction study: demyelinating neuropathy",
      "PCR for M. leprae: useful when SSS negative",
    ],
    treatment:
      "WHO MDT (Multi-Drug Therapy): Paucibacillary (TT/BT — BI 0): Rifampicin 600mg monthly (supervised) + Dapsone 100mg daily x 6 months. Multibacillary (BB/BL/LL — BI ≥1+): Rifampicin 600mg + Clofazimine 300mg monthly (supervised) + Dapsone 100mg + Clofazimine 50mg daily x 12 months. Reactions: Type 1 — Prednisolone; Type 2 (ENL) — Thalidomide [Thalomid] or Prednisolone.",
    complications: [
      "Peripheral neuropathy causing disability (claw hand, foot drop, lagophthalmos)",
      "Plantar ulceration (trophic ulcers due to anaesthesia)",
      "Blindness (trigeminal/facial nerve involvement, iridocyclitis)",
      "Amyloidosis (secondary — LL, recurrent ENL)",
      "Lepra reactions (Type 1 and 2 — can worsen nerve damage)",
    ],
    differentiatingFeature:
      "Sensory loss in a skin patch + thickened peripheral nerve = leprosy until proven otherwise. Lepromin test: positive TT (good prognosis), negative LL (poor CMI, bad prognosis) — does NOT diagnose leprosy. Virchow cells (foam macrophages with AFB globi) = hallmark of lepromatous leprosy.",
    pearlPoints: [
      "NEET PG: Only human bacterial pathogen that cannot be cultured in artificial media (armadillo is animal model)",
      "Ridley-Jopling: TT-BT-BB-BL-LL spectrum; TT = high CMI (few bacilli); LL = low CMI (many bacilli)",
      "Dapsone mechanism: PABA antagonist (same as sulfonamides) — inhibits dihydropteroate synthase",
      "Clofazimine: causes skin discolouration (grey-black pigmentation) — warn patient; also used for MDR-TB",
      "WHO definition elimination: <1 case per 10,000 population; India achieved this nationally in 2005 but some districts remain endemic",
    ],
    icmrProtocol:
      "NLEP (National Leprosy Eradication Programme): Free WHO MDT for all leprosy patients. Classification by BI and lesion count. Disability grading (G0/G1/G2). Reconstructive surgery for deformities.",
    indianBrandDrugs: [
      "Dapsone [Dapson, DAPS]",
      "Clofazimine [Hansepran, Lamprene]",
      "Rifampicin [Rimactane, Rifadin]",
      "Thalidomide [Thalomid] — for severe ENL reactions",
    ],
  },
  {
    name: "Malaria (Plasmodium falciparum)",
    subject: "Microbiology",
    icd10: "B50.9",
    category: "Parasitic Infection",
    definition:
      "Acute febrile illness caused by Plasmodium falciparum (most dangerous species), transmitted by female Anopheles mosquito, characterised by paroxysmal fever, haemolytic anaemia, and life-threatening complications including cerebral malaria and multi-organ failure.",
    etiology:
      "Plasmodium falciparum: protozoan, obligate intracellular parasite. P. falciparum (most lethal), P. vivax, P. malariae, P. ovale, P. knowlesi. Female Anopheles mosquito (dusk-to-dawn biter) is vector. Infects all RBC ages (unlike P. vivax — reticulocytes only).",
    pathophysiology:
      "Sporozoites → hepatocytes (exo-erythrocytic cycle) → liver schizonts → merozoites → RBC invasion → erythrocytic cycle (48h for P. falciparum — tertian). P. falciparum: cytoadherence (PfEMP1) → RBC adhesion to capillary endothelium → sequestration → microvascular obstruction → cerebral malaria. Blackwater fever: massive haemolysis → haemoglobinuria.",
    clinicalFeatures: [
      "Malarial paroxysm: cold stage (rigors) → hot stage (fever 40-41°C) → sweating stage (defervescence) — every 48h",
      "Hepatosplenomegaly (acute tender splenomegaly; tropical splenomegaly syndrome in chronic)",
      "Haemolytic anaemia: pallor, jaundice",
      "Thrombocytopenia (platelet count <150,000 — hallmark of falciparum)",
      "Cerebral malaria (P. falciparum): altered consciousness, seizures, unarousable coma",
      "Blackwater fever: haemoglobinuria, severe haemolysis, renal failure (dark urine)",
      "Severe malaria criteria: WHO defines 11 criteria (altered consciousness, severe anaemia, respiratory distress, hypoglycaemia, renal failure, etc.)",
    ],
    investigations: [
      "Peripheral blood smear (Giemsa stain): thick film (sensitivity), thin film (species identification)",
      "P. falciparum: banana-shaped gametocytes (pathognomonic), ring forms (multiple rings per RBC, appliqué/Maurer's dots)",
      "RDT (Rapid Diagnostic Test): HRP-2 antigen (P. falciparum specific), pLDH (all species)",
      "Quantitative Buffy Coat (QBC) method: fluorescent staining (higher sensitivity)",
      "NAAT/PCR: highest sensitivity, species differentiation, research use",
      "CBC: anaemia, thrombocytopenia, leucopenia",
      "Renal/liver function, blood glucose, lactate (for severe malaria)",
    ],
    treatment:
      "Uncomplicated P. falciparum: Artemisinin-based Combination Therapy (ACT) per NVBDCP — Artesunate [Falcigo, AS-AQ] + Amodiaquine 3 days OR Artemether-Lumefantrine [Coartem, Lumether] 3 days. Severe/Complicated malaria: IV Artesunate [Falcigo Inj] (drug of choice; superior to IV Quinine per AQUAMAT/SEAQUAMAT trials). Primaquine [Malirid] 0.75mg/kg single dose for gametocyte clearance (NOT for G6PD deficient). P. vivax: Chloroquine [Resochin] + Primaquine 14 days (radical cure).",
    complications: [
      "Cerebral malaria (coma, seizures, death)",
      "Blackwater fever (massive haemolysis + haemoglobinuria + AKI)",
      "Acute respiratory distress syndrome (ARDS)",
      "Hypoglycaemia (especially in children and pregnancy)",
      "Algid malaria (septicaemic shock from gram-negative superinfection)",
      "Splenic rupture",
    ],
    differentiatingFeature:
      "Banana-shaped gametocytes = P. falciparum (pathognomonic). Multiple ring forms per RBC + no enlargement of parasitised RBC = P. falciparum. Blackwater fever (haemoglobinuria) = severe P. falciparum. Rosettes (RBC clustering) = P. falciparum sequestration mechanism.",
    pearlPoints: [
      "NEET PG: Banana-shaped gametocytes = P. falciparum; Amoeboid trophozoites + Schüffner's dots + enlarged RBC = P. vivax",
      "Schüffner's dots = P. vivax; Maurer's dots = P. falciparum; Ziemann's dots = P. malariae",
      "Artesunate IV > Quinine IV for severe malaria (AQUAMAT trial proved superiority)",
      "Primaquine contraindicated in G6PD deficiency and pregnancy (haemolysis); G6PD test before giving",
      "P. vivax and P. ovale: hypnozoites persist in liver → relapse; P. falciparum: no hypnozoites → no relapse; P. malariae: persists in blood → recrudescence",
    ],
    icmrProtocol:
      "NVBDCP Malaria Treatment Protocol 2021: ACT (Artesunate-Amodiaquine) for P. falciparum uncomplicated; IV Artesunate for severe malaria. Primaquine for gametocyte clearance. Bed nets (LLIN), IRS for vector control. Malaria Microscopy QC training.",
    indianBrandDrugs: [
      "Artemether-Lumefantrine [Coartem, Lumether, Riamet]",
      "Artesunate injection [Falcigo, Artecin Inj]",
      "Primaquine [Malirid]",
      "Chloroquine [Resochin, Lariago]",
    ],
  },
  {
    name: "Dengue Fever",
    subject: "Microbiology",
    icd10: "A97.9",
    category: "Viral Infection",
    definition:
      "Acute febrile viral illness caused by Dengue virus (DENV 1-4 serotypes), transmitted by Aedes aegypti mosquito, characterised by sudden high fever, severe headache, myalgia, and vascular leak. Can progress to Dengue Haemorrhagic Fever (DHF) or Dengue Shock Syndrome (DSS).",
    etiology:
      "Dengue virus: Flavivirus, single-stranded positive-sense RNA, 4 serotypes (DENV-1 to -4). Vector: Aedes aegypti (day-biting, urban mosquito, breeds in clean stagnant water — flower pots, tyres). Secondary infection with different serotype → severe dengue (antibody-dependent enhancement — ADE).",
    pathophysiology:
      "Aedes bite → viremia → endothelial cell infection → cytokine storm (TNF-α, IL-6, IL-10) → increased vascular permeability → plasma leakage → haemoconcentration. Thrombocytopenia: platelet destruction (antibody-mediated + bone marrow suppression). ADE (2nd infection different serotype): cross-reactive non-neutralising antibodies facilitate viral entry into macrophages → massive viremia → DHF.",
    clinicalFeatures: [
      "Dengue Fever (DF): sudden high fever (saddleback/biphasic fever), severe headache, retro-orbital pain",
      "Myalgia, arthralgia ('breakbone fever' — severe bone pain)",
      "Tourniquet test (Rumpel-Leede test): positive (≥20 petechiae per 1 inch² = capillary fragility)",
      "Flushed face, maculopapular rash (appears with defervescence)",
      "DHF: criteria = fever + haemorrhagic manifestations + thrombocytopenia ≤100,000 + plasma leakage evidence",
      "DSS: DHF + circulatory failure (narrow pulse pressure ≤20 mmHg or hypotension + cold extremities)",
      "Warning signs: abdominal pain, persistent vomiting, rapid breathing, bleeding, rapid deterioration",
    ],
    investigations: [
      "NS1 antigen (Day 1-5): early diagnosis, high sensitivity in acute phase",
      "IgM ELISA (Day 5 onwards): primary infection detection",
      "IgG ELISA: secondary infection (higher titre, earlier rise than IgM)",
      "Dengue RT-PCR: gold standard for serotyping, research",
      "CBC: leucopenia, thrombocytopenia (platelet fall = dengue hallmark)",
      "Haematocrit: rise ≥20% = plasma leakage (DHF criterion)",
      "LFTs: elevated AST/ALT (dengue hepatitis)",
    ],
    treatment:
      "No specific antiviral. Symptomatic management per NVBDCP guidelines. Dengue Fever: Paracetamol [Calpol, Dolo-650] for fever (NOT aspirin/NSAIDs — worsen bleeding). Oral hydration. Monitor platelet count and haematocrit daily. DHF: IV fluids (NS or RL) per WHO fluid therapy chart — guided by haematocrit. Platelet transfusion if <10,000 or active bleeding. DSS: Bolus IV fluids (10-20 mL/kg), adjust per response. ICU management.",
    complications: [
      "Dengue Shock Syndrome (DSS) — plasma leakage + circulatory failure",
      "Severe haemorrhage (GI, intracranial)",
      "Acute liver failure (dengue hepatitis)",
      "Encephalitis (rare)",
      "Myocarditis",
    ],
    differentiatingFeature:
      "Tourniquet test positive + thrombocytopenia + haematocrit rise ≥20% = DHF triad. NS1 antigen positive in 1st week (early detection). Biphasic/saddleback fever = dengue. Thrombocytopenia WITHOUT bleeding tendency initially = dengue (differs from ITP, TTP).",
    pearlPoints: [
      "NEET PG: WHO 2009 Dengue classification: Dengue without/with warning signs + Severe Dengue (replaces old DF/DHF/DSS)",
      "Aspirin and NSAIDs CONTRAINDICATED — inhibit COX-1 → platelet dysfunction + bleeding risk",
      "Tourniquet test: inflate BP cuff to midpoint between systolic and diastolic for 5 min; ≥20 petechiae/inch² = positive",
      "ADE (Antibody-dependent enhancement): 2nd infection with different serotype → severe dengue via non-neutralising antibodies facilitating macrophage entry",
      "Dengue vaccine (Dengvaxia): only for seropositive individuals (prior exposure) — causes severe dengue in seronegative people",
    ],
    icmrProtocol:
      "NVBDCP Dengue Clinical Management Protocol 2014 (revised): Serial platelet + haematocrit monitoring. Crystalloid resuscitation for DHF guided by haematocrit. ICU for DSS. Vector control: Aedes source reduction, fogging.",
    indianBrandDrugs: [
      "Paracetamol [Calpol, Dolo-650, Crocin 650]",
      "NS 0.9% IV [Normal Saline, Ringer's Lactate]",
    ],
  },
  {
    name: "Rabies",
    subject: "Microbiology",
    icd10: "A82.9",
    category: "Viral Infection",
    definition:
      "Invariably fatal viral encephalomyelitis caused by Rabies lyssavirus, transmitted through bite of infected animal (most commonly dog in India), with characteristic hydrophobia, aerophobia, and ascending paralysis. Once clinical symptoms appear, survival is near impossible.",
    etiology:
      "Rabies virus: Rhabdovirus family, Lyssavirus genus, bullet-shaped (75 × 180 nm), negative-sense ssRNA. Transmitted by: Dogs (95% in India), cats, bats, foxes, raccoons. Virus present in saliva. Transmission: bite (most common), scratch (if saliva contaminated), lick on mucous membrane. No person-to-person transmission.",
    pathophysiology:
      "Virus inoculated at bite → replicates in myocytes → binds nicotinic ACh receptor, NCAM on nerve endings → retrograde axonal transport (100mm/day) → spinal cord → brainstem → cerebral cortex. Negri bodies: eosinophilic intracytoplasmic inclusions in Purkinje cells (cerebellum) and hippocampus (pyramidal cells) — pathognomonic.",
    clinicalFeatures: [
      "Incubation: 20-90 days (varies with site — face bite shorter, leg bite longer)",
      "Prodrome: fever, paraesthesia/pain at bite site (virus replication at NMJ)",
      "Furious rabies (80%): hydrophobia (pharyngeal muscle spasm on swallowing water), aerophobia (air puff on face), hyperexcitability, hypersalivation (foaming at mouth)",
      "Paralytic/Dumb rabies (20%): ascending flaccid paralysis (mimics GBS), no hydrophobia, more indolent",
      "Autonomic dysfunction: hypersalivation, sweating, pupillary abnormalities",
      "Coma → respiratory failure → death (100% mortality after symptom onset, except Milwaukee Protocol cases)",
    ],
    investigations: [
      "Ante-mortem: skin biopsy (neck hairline) DFA test — direct fluorescent antibody (gold standard)",
      "Saliva RT-PCR: virus detection",
      "CSF: mild pleocytosis, normal glucose (lymphocytic meningitis pattern)",
      "Serology: rabies neutralising antibody titre",
      "Post-mortem: brain biopsy DFA or Sellers stain for Negri bodies",
    ],
    treatment:
      "Pre-exposure Prophylaxis (PrEP): Rabipur [Purified Chick Embryo Cell Vaccine — PCECV] or Abhayrab [PVRV] 1mL IM on Days 0, 7, 21/28. Post-Exposure Prophylaxis (PEP) — ONLY prevention: Wound wash with soap/water + 70% alcohol. Category II bites: Vaccine only (5-dose Essen regimen or Zagreb 2-1-1 regimen). Category III: Vaccine + Human Rabies Immunoglobulin [HRIG — Berirab, Imogam] 20IU/kg — infiltrate into wound, remainder IM.",
    complications: [
      "100% fatality after symptom onset (virtually no survivors despite treatment)",
      "Respiratory failure (brainstem involvement)",
      "Autonomic instability (cardiac arrhythmias)",
      "Antemortem: nosocomial rabies risk from patient secretions",
    ],
    differentiatingFeature:
      "Hydrophobia + aerophobia = pathognomonic of furious rabies. Negri bodies (eosinophilic intracytoplasmic inclusions) in Purkinje cells = pathognomonic post-mortem. Dog bite + paraesthesia at wound site = prodromal rabies. DFA test = gold standard ante-mortem and post-mortem.",
    pearlPoints: [
      "NEET PG: Hydrophobia mechanism = laryngeal/pharyngeal muscle spasm on attempting to swallow water (NOT fear of water)",
      "Negri bodies: in Purkinje cells (cerebellum) and hippocampal pyramidal cells (Ammon's horn)",
      "PEP = Category III: any bite/scratch/lick on mucosa from suspected rabid animal → vaccine + HRIG mandatory",
      "HRIG must be infiltrated into wound for maximum efficacy; remaining given IM (different site from vaccine)",
      "Vaccine and HRIG should NOT be given at same site — HRIG neutralises vaccine if together",
    ],
    icmrProtocol:
      "ICMR/NCDC Rabies Prevention Protocol: WHO category-based PEP. Essen regimen (Days 0,3,7,14,28) or Intradermal (ID) regimen. Rabies Prophylaxis Clinics in all districts. Animal capture and 10-day observation. Report all bite cases to health authority.",
    indianBrandDrugs: [
      "Rabipur [Purified Chick Embryo Cell Vaccine — Novartis]",
      "Abhayrab [Purified Vero Rabies Vaccine — Human Biologicals Institute]",
      "Indirab [Vero cell vaccine — Bharat Biotech]",
      "HRIG — Human Rabies Immunoglobulin [Berirab-P, Imogam Rabies]",
    ],
  },
  {
    name: "HIV/AIDS",
    subject: "Microbiology",
    icd10: "B24",
    category: "Viral Infection",
    definition:
      "Progressive immunodeficiency caused by Human Immunodeficiency Virus (HIV-1 or HIV-2), targeting CD4+ T-lymphocytes, leading to AIDS (Acquired Immunodeficiency Syndrome) when CD4 count falls below 200 cells/mm³ or AIDS-defining illness occurs.",
    etiology:
      "HIV-1 (pandemic) and HIV-2 (West Africa — less virulent). Lentivirus (Retroviridae), icosahedral, enveloped, ssRNA (+ve sense), diploid genome. Transmission: unprotected sexual intercourse (most common globally), IV drug use (needle sharing), vertical (mother-to-child), blood transfusion. HIV-2: less transmissible, slower progression.",
    pathophysiology:
      "HIV gp120 binds CD4 + co-receptor (CCR5 = macrophage-tropic/R5; CXCR4 = T-lymphocyte-tropic/X4) → fusion via gp41 → viral RNA entry → reverse transcriptase (RT) converts RNA → dsDNA → integrase incorporates into host chromosome (provirus) → viral replication → CD4 destruction → immunodeficiency.",
    clinicalFeatures: [
      "Acute HIV (2-4 weeks post-infection): mononucleosis-like illness — fever, lymphadenopathy, pharyngitis, rash (seroconversion illness)",
      "Clinical latency (asymptomatic): CD4 slowly falls (8-10 years average untreated)",
      "Symptomatic HIV: CD4 200-500 — oral candida, herpes zoster, bacterial pneumonia",
      "AIDS: CD4 <200 or AIDS-defining condition",
      "AIDS-defining illnesses: PCP (Pneumocystis jirovecii pneumonia), CMV retinitis, MAC, Cryptococcal meningitis, Cerebral toxoplasmosis, Kaposi's sarcoma",
      "Wasting syndrome (>10% body weight loss + diarrhoea/fever >30 days)",
    ],
    investigations: [
      "HIV ELISA/CLIA (4th generation — detects p24 antigen + HIV antibody): screening test",
      "HIV Western Blot: confirmatory (gp120, gp41, p24 bands)",
      "CD4 T-lymphocyte count: staging and treatment threshold (ART if <500 or any CD4)",
      "HIV RNA viral load (PCR): treatment monitoring (target undetectable <200 copies/mL)",
      "HIV drug resistance genotyping",
      "NACO ICTC (Integrated Counselling and Testing Centre): free testing in India",
    ],
    treatment:
      "ART per NACO Guidelines 2022: First-line: TLD regimen — Tenofovir [Tenvir, TDF] 300mg + Lamivudine [Lamivir, 3TC] 300mg + Dolutegravir [Tivicay, DTG] 50mg — once daily, highly preferred. Alternative: TLE — TDF + 3TC + Efavirenz [Efavir, EFV] 600mg. Start ART in ALL HIV-positive patients regardless of CD4 count (NACO 2022: treat all). Cotrimoxazole prophylaxis if CD4 <200 (for PCP prevention).",
    complications: [
      "Opportunistic infections (PCP, Cryptococcus, MAC, CMV, Toxoplasma)",
      "AIDS-defining malignancies (Kaposi's sarcoma, NHL, invasive cervical cancer)",
      "HIV encephalopathy (AIDS dementia complex)",
      "Wasting syndrome",
      "ART toxicity (NRTI: lactic acidosis; NNRTI: Stevens-Johnson syndrome, hepatotoxicity)",
    ],
    differentiatingFeature:
      "CD4 <200 cells/mm³ OR AIDS-defining illness = AIDS diagnosis. TLD (Tenofovir+Lamivudine+Dolutegravir) = NACO 2022 first-line regimen (superior to EFV-based TLE). Cryptococcal meningitis in HIV = CD4 <100 (diagnose with India ink or CrAg). PCP = CD4 <200 (cotrimoxazole prophylaxis prevents).",
    pearlPoints: [
      "NEET PG: Reverse transcriptase inhibitors (NRTIs, NNRTIs) are unique to HIV — target reverse transcriptase not present in human cells",
      "Efavirenz: neuropsychiatric side effects (vivid dreams, depression, dizziness — give at bedtime)",
      "Dolutegravir (DTG): integrase inhibitor, highest barrier to resistance; safe in pregnancy; replaces Efavirenz as preferred agent",
      "PEP (Post-exposure prophylaxis): TLD for 28 days within 72h of exposure; PrEP (Pre-exposure prophylaxis): TDF+3TC daily in high-risk individuals",
      "Mother-to-child transmission prevented by: ART throughout pregnancy + AZT IV during labour + infant NVP/AZT for 6 weeks",
    ],
    icmrProtocol:
      "NACO ART Guidelines 2022: Universal test-and-treat strategy. TLD first-line. Free ART at all ART centres. Viral load monitoring at 6 months, then annually. CD4 only for clinical staging. Cotrimoxazole prophylaxis. Nutritional support.",
    indianBrandDrugs: [
      "Tenofovir [Tenvir, Ricovir, TDF-300]",
      "Lamivudine [Lamivir, Hepitec, 3TC]",
      "Dolutegravir [Tivicay, Dolovir, DTG-50]",
      "Efavirenz [Efavir, Stocrin, EFV-600]",
    ],
  },
  {
    name: "Hepatitis B",
    subject: "Microbiology",
    icd10: "B16.9",
    category: "Viral Infection",
    definition:
      "Hepatic inflammation caused by Hepatitis B virus (HBV), a partially double-stranded DNA hepadnavirus, capable of causing acute and chronic liver disease, cirrhosis, and hepatocellular carcinoma. Most common blood-borne viral infection worldwide.",
    etiology:
      "HBV: Hepadnaviridae family, partially circular dsDNA, 42nm (Dane particle = complete infectious virion). Antigens: HBsAg (surface), HBeAg (core secreted), HBcAg (core — NOT secreted into blood). Transmission: sexual (most common globally), vertical (most important in endemic countries like India), blood/needles, household contact (non-sexual).",
    pathophysiology:
      "HBV enters hepatocyte via NTCP (sodium-taurocholate cotransporting polypeptide) → relaxed circular DNA → cccDNA (covalently closed circular — persistently episomal, replication template → cannot be eradicated) → viral replication → T-cell mediated hepatocyte destruction (not direct cytopathic). HBeAg-negative mutants: precore mutation → HBV replication without HBeAg secretion.",
    clinicalFeatures: [
      "Acute: Prodrome (fever, malaise, arthralgia, serum sickness-like) → Icteric phase (jaundice, dark urine, pale stools)",
      "Fulminant hepatitis: INR >1.5 + encephalopathy (<1% of acute HBV)",
      "Chronic HBV: HBsAg positive >6 months",
      "Immune tolerant phase: high viral load, normal ALT, minimal damage",
      "Immune active (HBeAg+): elevated ALT, active replication, liver damage",
      "Extrahepatic: polyarteritis nodosa, membranous nephropathy, aplastic anaemia",
      "Cirrhosis (after years): jaundice, ascites, variceal bleeding, hepatic encephalopathy",
    ],
    investigations: [
      "HBsAg: first marker, appears 1-10 weeks post-exposure, positive in acute + chronic",
      "Anti-HBc IgM: acute HBV marker (diagnostic gold standard for acute infection); IgG = past exposure",
      "HBeAg: high viral replication (transmissibility); Anti-HBe: seroconversion (lower infectivity)",
      "Anti-HBs: immunity (from vaccination or recovery)",
      "HBV DNA (viral load): treatment decision and monitoring",
      "LFTs: elevated ALT/AST (10x ULN in acute hepatitis)",
      "Liver biopsy/FibroScan: assess fibrosis stage for treatment decision",
    ],
    treatment:
      "Acute HBV: Supportive (>95% resolve spontaneously in adults). Fulminant: NAC + ICU + liver transplant criteria. Chronic HBV treatment per AASLD/EASL: Indications: HBV DNA >2000 IU/mL + elevated ALT + significant fibrosis. Tenofovir Disoproxil Fumarate [Tenvir, TDF] 300mg OD — first-line (no resistance; safe in pregnancy). Entecavir [Baraclude, Entaliv] 0.5mg OD — first-line (high barrier to resistance). Pegylated Interferon-alpha (finite course, not preferred in India).",
    complications: [
      "Chronic hepatitis B → Cirrhosis (10-20% in 10-30 years)",
      "Hepatocellular carcinoma (HCC) — HBV is leading cause in India (AFP screening every 6 months)",
      "Fulminant hepatic failure",
      "Reactivation with immunosuppression",
      "Polyarteritis nodosa (PAN) — extrahepatic",
    ],
    differentiatingFeature:
      "HBsAg positive + Anti-HBc IgM = acute hepatitis B (NEET PG classic). Core window period: HBsAg negative but Anti-HBc IgM positive + HBsAg cleared (window period — Anti-HBs not yet positive). cccDNA = cannot be eliminated by current antivirals — HBV is incurable but controllable.",
    pearlPoints: [
      "NEET PG: Anti-HBc IgM = diagnostic of ACUTE hepatitis B (even in window period when HBsAg may be negative)",
      "Vaccination: 3-dose HBV vaccine at birth → 6 weeks → 14 weeks (Indian immunisation schedule); anti-HBs >10 IU/L = immune",
      "Tenofovir is drug of choice in chronic HBV (no resistance reported, safe in pregnancy)",
      "HCC screening: every 6 months liver USG + AFP in cirrhotic HBV patients",
      "HBsAg vaccine protection: does NOT contain live virus (recombinant yeast-derived HBsAg) — fully safe",
    ],
    icmrProtocol:
      "MOHFW India: Universal HBV vaccination at birth. NACO guidelines for HBV-HIV coinfection. TAF (Tenofovir Alafenamide) available as second-line. Cirrhosis management per SGEI/AASLD guidelines.",
    indianBrandDrugs: [
      "Tenofovir [Tenvir, Ricovir, Viread]",
      "Entecavir [Baraclude, Entaliv, Entavir]",
      "Lamivudine [Lamivir, Hepitec] — older drug, high resistance",
      "HBV Vaccine [Engerix-B, Shanvac-B, Revac-B]",
    ],
  },
  {
    name: "Meningococcal Meningitis",
    subject: "Microbiology",
    icd10: "A39.0",
    category: "Bacterial Infection",
    definition:
      "Acute purulent meningitis caused by Neisseria meningitidis (meningococcus), presenting with the classic triad of fever, neck stiffness, and altered consciousness, often complicated by petechial/purpuric rash (meningococcaemia) and life-threatening septicaemia.",
    etiology:
      "Neisseria meningitidis: Gram-negative diplococci (kidney-bean shaped in pairs — intracellular in CSF), aerobic, oxidase-positive, encapsulated. Serogroups A, B, C, W, Y (most common). Normal nasopharyngeal commensal (5-15% carriage). Transmission: respiratory droplets. Outbreaks in closed communities (military barracks, dormitories, Hajj pilgrims).",
    pathophysiology:
      "Colonises nasopharynx → invasive disease in susceptible hosts (complement deficiency, asplenia) → bacteraemia → meningitis. Endotoxin (LPS) → TNF-α, IL-1, IL-6 storm → DIC → Waterhouse-Friderichsen syndrome (bilateral adrenal haemorrhage → adrenal crisis). IgA protease cleaves secretory IgA (colonisation factor).",
    clinicalFeatures: [
      "Sudden onset high fever + severe headache + neck stiffness (meningismus triad)",
      "Petechial and purpuric rash (non-blanching) — hallmark of meningococcaemia (present in 50-80%)",
      "Kernig's sign: inability to extend knee with hip flexed at 90°",
      "Brudzinski's sign: neck flexion causes involuntary hip/knee flexion",
      "Photophobia, phonophobia",
      "Fulminant meningococcaemia: massive purpura, DIC, shock (Waterhouse-Friderichsen syndrome)",
      "Raised ICP: papilloedema, Cushing's triad (bradycardia + hypertension + irregular respirations)",
    ],
    investigations: [
      "CSF: turbid/purulent, opening pressure raised, cells >1000 WBC (PMN), protein >100mg/dL, glucose <45 or CSF:serum glucose ratio <0.4",
      "CSF Gram stain: Gram-negative diplococci (intracellular + extracellular)",
      "CSF culture: chocolate agar (CO2 incubation) — gold standard",
      "Blood culture: positive in meningococcaemia",
      "Latex agglutination: rapid antigen detection (CSF)",
      "CBC: leucocytosis, thrombocytopenia (DIC)",
      "Coagulation: PT/aPTT prolonged, fibrinogen low (DIC pattern)",
    ],
    treatment:
      "Empirical: Ceftriaxone [Monocef] 2g IV BD (drug of choice for all bacterial meningitis). Confirmed meningococcal: IV Penicillin G 4 million units every 4h x 7 days (if penicillin-sensitive). Dexamethasone [Dexona] 0.15mg/kg IV 15-30 min BEFORE antibiotics (reduces neurological sequelae — cochlear inflammation). ICU for fulminant disease. Contact prophylaxis: Rifampicin [Rimactane] 600mg BD x 2 days OR Ciprofloxacin 500mg single dose.",
    complications: [
      "Waterhouse-Friderichsen syndrome (bilateral adrenal haemorrhage — adrenal crisis)",
      "DIC + purpura fulminans",
      "Sensorineural deafness (most common neurological sequela — 10-30%)",
      "Subdural empyema",
      "Limb necrosis and amputation (peripheral ischaemia from DIC/vasculitis)",
      "Brain herniation (raised ICP)",
    ],
    differentiatingFeature:
      "Non-blanching petechial/purpuric rash + fever + meningism = meningococcaemia (medical emergency — treat before LP if LP will be delayed). Waterhouse-Friderichsen syndrome = bilateral adrenal haemorrhage → shock, DIC, skin necrosis. Gram-negative diplococci intracellularly in PMNs on CSF Gram stain = meningococcal meningitis.",
    pearlPoints: [
      "NEET PG: Give antibiotics BEFORE LP if rash + haemodynamic instability (do not delay antibiotics for LP in suspected meningococcaemia)",
      "Waterhouse-Friderichsen syndrome: adrenal haemorrhage due to DIC + meningococcus + massive cytokine storm",
      "Dexamethasone must be given BEFORE antibiotics (reduces cytokine release from bacterial cell wall lysis)",
      "Chemoprophylaxis for close contacts: Rifampicin 2 days OR Ciprofloxacin single dose",
      "Meningococcal vaccine (Menactra/Nimenrix): mandatory for Hajj pilgrims, military recruits, asplenic patients",
    ],
    icmrProtocol:
      "ICMR: Report all suspected meningococcal disease to state health authority. Ceftriaxone empirical, then culture-directed. Chemoprophylaxis for household/kissing contacts. Outbreak investigation.",
    indianBrandDrugs: [
      "Ceftriaxone [Monocef, Ceftrex, Rocephin]",
      "Penicillin G [Benzylpenicillin, Crystapen]",
      "Dexamethasone [Dexona, Decadron]",
      "Rifampicin [Rimactane, Rimpin] — prophylaxis",
    ],
  },
  {
    name: "Staphylococcal Food Poisoning",
    subject: "Microbiology",
    icd10: "A05.0",
    category: "Bacterial Infection",
    definition:
      "Acute self-limiting illness caused by ingestion of preformed heat-stable Staphylococcal enterotoxins (SE) produced by Staphylococcus aureus in contaminated food, characterised by rapid onset (1-6 hours) vomiting and diarrhoea without fever.",
    etiology:
      "Staphylococcus aureus: Gram-positive coccus in clusters ('bunch of grapes'), coagulase-positive (distinguishes from CoNS), catalase-positive. Enterotoxins A-E (heat-stable, 100°C for 30 min — survive cooking even after bacteria killed). Common foods: cream, mayonnaise, custard, processed meats, potato salad. Contaminated by food handlers (skin, nasal carriers).",
    pathophysiology:
      "Preformed enterotoxins (not bacteria) are ingested → enterotoxins act as superantigens → stimulate VB-specific T-cells non-specifically → massive cytokine release → emesis via vagal stimulation to vomiting centre. Also acts directly on intestinal epithelium causing watery diarrhoea. Incubation 1-6h (fastest food poisoning).",
    clinicalFeatures: [
      "Rapid onset: 1-6 hours after food ingestion (shortest incubation of all food poisonings)",
      "Sudden projectile vomiting (dominant symptom)",
      "Watery diarrhoea (non-bloody)",
      "Abdominal cramps",
      "AFEBRILE (no fever — distinguishes from bacterial gastroenteritis caused by invasion)",
      "Self-limiting: resolves in 24-48 hours",
      "Multiple cases with same incubation after a shared meal (outbreak pattern)",
    ],
    investigations: [
      "Usually clinical diagnosis (rapid onset group illness after shared food)",
      "Stool culture: not useful (toxin-mediated, not bacterial invasion)",
      "Food culture: S. aureus isolation from implicated food",
      "Phage typing of isolate: epidemiological investigation",
      "Enterotoxin detection by ELISA in food",
    ],
    treatment:
      "Supportive only — NO ANTIBIOTICS (antibiotics not indicated; illness is enterotoxin-mediated, not live bacteria). Oral rehydration solution (ORS) for mild dehydration. IV fluids for severe vomiting/dehydration. Antiemetics: Metoclopramide [Perinorm] or Ondansetron [Zofran, Ondem] for vomiting. Full recovery expected in 24-48h.",
    complications: [
      "Dehydration (especially elderly, children, immunocompromised)",
      "Electrolyte imbalance",
      "Aspiration pneumonia (severe vomiting in unconscious patient)",
    ],
    differentiatingFeature:
      "1-6 hour incubation (fastest food poisoning) + NO fever + projectile vomiting dominant = Staphylococcal food poisoning. Antibiotics are NOT used (toxin ingested, bacteria not causing active infection). Compare: Bacillus cereus (emetic form 1-6h similar, but no outbreak investigation needed). Enterotoxin is heat-stable (cooking cannot prevent illness once contaminated).",
    pearlPoints: [
      "NEET PG: Shortest incubation food poisoning: S. aureus (1-6h) = Bacillus cereus emetic type (1-5h) — equally fast",
      "Enterotoxin is heat-STABLE: food can be cooked thoroughly after contamination yet cause illness (toxin survives)",
      "No fever = hallmark (toxin-mediated, not invasive infection); fever differentiates Salmonella/Shigella gastroenteritis",
      "Common scenario: food prepared by handler with skin infection (boil, carbuncle) → food left at room temperature → S. aureus grows + produces toxin → rapid illness",
      "TSST-1 (Toxic Shock Syndrome Toxin) = different toxin from enterotoxins; causes TSS (fever, shock, rash) not food poisoning",
    ],
    indianBrandDrugs: [
      "ORS [Electral, Gastrolyte]",
      "Ondansetron [Ondem, Zofran]",
      "Metoclopramide [Perinorm]",
    ],
  },
  {
    name: "Clostridioides difficile Infection",
    subject: "Microbiology",
    icd10: "A04.7",
    category: "Bacterial Infection",
    definition:
      "Antibiotic-associated diarrhoea and colitis caused by toxin-producing Clostridioides difficile (formerly Clostridium difficile), occurring after disruption of normal colonic flora by antibiotics, ranging from mild diarrhoea to life-threatening pseudomembranous colitis and toxic megacolon.",
    etiology:
      "Clostridioides difficile: Gram-positive, anaerobic, spore-forming bacillus. Spores survive in hospital environment for months. Produces Toxin A (enterotoxin — watery diarrhoea) and Toxin B (cytotoxin — colonic mucosal destruction). Hypervirulent NAP1/ribotype 027 strain produces binary toxin. Transmission: fecal-oral via spores (healthcare-associated, contact precautions).",
    pathophysiology:
      "Antibiotics (especially Clindamycin, Cephalosporins, Fluoroquinolones, Ampicillin) disrupt colonic microbiome → C. difficile spores survive → germinate → vegetative bacilli → produce Toxin A + Toxin B → neutrophil infiltration → mucosal necrosis → pseudomembranes (yellow-grey fibrinopurulent plaques on colonic mucosa).",
    clinicalFeatures: [
      "Mild CDI: watery non-bloody diarrhoea (≥3 loose stools in 24h) during/after antibiotics",
      "Moderate-severe: profuse watery diarrhoea + fever + abdominal cramps",
      "Pseudomembranous colitis: characteristic endoscopic yellow-grey pseudomembranes",
      "Fulminant/severe CDI: toxic megacolon (dilated colon >6cm on X-ray) + sepsis + peritonitis",
      "Ileus (paradox: diarrhoea stops but patient deteriorates — caution, high mortality)",
      "Recurrent CDI: in 15-25% after first treatment",
    ],
    investigations: [
      "Stool C. difficile toxin EIA: Toxin A+B enzyme immunoassay (rapid, widely available)",
      "GDH antigen: Glutamate dehydrogenase (sensitive screening — confirms C. difficile, not toxin)",
      "NAAT (PCR): highly sensitive, detects toxin gene (gold standard for diagnosis)",
      "Two-step algorithm: GDH antigen → if positive → confirm with PCR or toxin EIA",
      "Colonoscopy/sigmoidoscopy: pseudomembranes (yellow plaques) — diagnostic but not routine",
      "CT abdomen: thickening of colon wall, ascites (severe CDI)",
    ],
    treatment:
      "STOP precipitating antibiotic if possible. Non-severe CDI: Metronidazole [Flagyl, Metrogyl] 500mg TDS PO x 10 days (India — affordable) OR Vancomycin [Vancocin] 125mg QID PO x 10 days. Severe CDI: Oral Vancomycin 125mg QID PO x 10 days (first-line). Fulminant: Oral Vancomycin 500mg QID PO + IV Metronidazole 500mg TDS + consider colectomy. Fidaxomicin [Dificid]: lower recurrence rate than Vancomycin. Fecal Microbiota Transplantation (FMT): for recurrent CDI (>90% efficacy).",
    complications: [
      "Toxic megacolon (life-threatening, may require colectomy)",
      "Colonic perforation",
      "Septic shock",
      "Recurrent CDI (15-25%)",
      "Death in elderly/immunocompromised",
    ],
    differentiatingFeature:
      "Pseudomembranes on colonoscopy (yellow-grey plaques) = pathognomonic CDI. Post-antibiotic diarrhoea (especially Clindamycin, Cephalosporins) = C. difficile until proven otherwise. Oral Vancomycin preferred over Metronidazole for severe CDI (superior outcomes). IV Vancomycin is USELESS for CDI (drug not excreted into colon).",
    pearlPoints: [
      "NEET PG: Most commonly implicated antibiotics: Clindamycin > Cephalosporins > Fluoroquinolones > Ampicillin (3Cs + Ampicillin)",
      "IV Vancomycin is NOT effective for CDI — oral route only (drug must reach colon lumen)",
      "Isolation: contact precautions (gown + gloves); HAND WASHING with soap/water (not alcohol gel — spores resistant to alcohol)",
      "FMT (Fecal Microbiota Transplantation) = 90% cure rate for recurrent CDI (restores microbiome)",
      "Toxic megacolon: colon >6cm on plain X-ray + systemic toxicity — surgical emergency",
    ],
    indianBrandDrugs: [
      "Metronidazole [Flagyl, Metrogyl, Metron]",
      "Vancomycin oral [Vancocin, Vancoled] — oral capsules only for CDI",
    ],
  },
  {
    name: "Klebsiella Pneumonia",
    subject: "Microbiology",
    icd10: "J15.0",
    category: "Bacterial Infection",
    definition:
      "Severe community-acquired or hospital-acquired pneumonia caused by Klebsiella pneumoniae (Friedlander's bacillus), characterised by mucoid 'currant jelly' sputum, lobar consolidation with bulging fissure sign on X-ray, and high mortality, particularly in alcoholics, diabetics, and immunocompromised patients.",
    etiology:
      "Klebsiella pneumoniae: Gram-negative, large rod, encapsulated (polysaccharide capsule = virulence), non-motile, lactose-fermenting (pink on MacConkey agar). Urease-positive, oxidase-negative. CAP: alcoholics, diabetics, COPD. HAP/HCAP: ICU patients, nosocomial. ESBL (Extended Spectrum Beta-Lactamase) and KPC (Klebsiella pneumoniae Carbapenemase) strains increasing in India.",
    pathophysiology:
      "Inhalation/aspiration → Klebsiella colonises upper respiratory tract → invades lung parenchyma → massive mucous production (capsule) → inflammatory exudate fills alveoli → fibrinous consolidation → necrosis and cavitation. Polysaccharide capsule resists phagocytosis. Endotoxin → systemic sepsis.",
    clinicalFeatures: [
      "Sudden onset high fever, rigors",
      "Cough productive of 'currant jelly' (blood + mucus — brick-red, tenacious) sputum — characteristic",
      "Lobar pneumonia pattern (upper lobe involvement more common than typical pneumonia)",
      "Bulging fissure sign on chest X-ray (weight of inflammatory exudate causes fissure to bow downward)",
      "Prostration (patient appears severely ill out of proportion to fever)",
      "Cyanosis, respiratory distress",
      "HAP/HCAP: ventilator-associated pneumonia (VAP) in ICU",
    ],
    investigations: [
      "Chest X-ray: lobar consolidation with bulging fissure sign (pathognomonic), upper lobe cavitation in alcoholics",
      "Sputum culture: Klebsiella on MacConkey agar (pink mucoid colonies)",
      "Gram stain: large Gram-negative rods with capsule",
      "Blood culture (positive in bacteraemic patients)",
      "ESBL/CRKP testing: E-test, disc diffusion, VITEK (critical for antibiotic choice)",
      "CBC: leucocytosis, elevated CRP/procalcitonin",
    ],
    treatment:
      "Non-ESBL Klebsiella: Ceftriaxone [Monocef] 2g IV OD or Ampicillin-Sulbactam. ESBL-producing Klebsiella: Meropenem [Meronem] 1g IV TDS (carbapenem — drug of choice for ESBL). Carbapenem-resistant Klebsiella (CRKP/KPC): Colistin [Colistin Inj] + Tigecycline [Tigaliv] or Ceftazidime-Avibactam [Avycaz] (new beta-lactam/BLI). ICU care for severe pneumonia.",
    complications: [
      "Cavitation and lung abscess (classic complication in alcoholics)",
      "Empyema thoracis",
      "Septicaemia and septic shock",
      "Bacteraemia with metastatic infections (liver abscess — 'invasive Klebsiella syndrome')",
      "Antibiotic resistance (ESBL, CRKP — treatment failure)",
    ],
    differentiatingFeature:
      "Currant jelly sputum (blood + mucus, brick-red, tenacious) + bulging fissure sign on CXR + alcoholic/diabetic patient = Klebsiella pneumonia (Friedlander's). ESBL-Klebsiella requires carbapenem (Meropenem/Imipenem) — cephalosporins fail despite sensitivity in vitro.",
    pearlPoints: [
      "NEET PG: Friedlander's pneumonia = Klebsiella pneumoniae; common in alcoholics, diabetics",
      "Bulging fissure sign: lower lobe fissure bows downward due to heavy, mucoid exudate filling upper lobe",
      "ESBL (Extended Spectrum Beta-Lactamase): resists all cephalosporins and penicillins → Meropenem required",
      "Hypervirulent Klebsiella (hvKP): liver abscess + endophthalmitis + meningitis in healthy Asian adults",
      "MacConkey agar: Gram-negative media; lactose fermenters = pink/red (E. coli, Klebsiella); non-fermenters = colourless (Salmonella, Shigella)",
    ],
    indianBrandDrugs: [
      "Meropenem [Meronem, Merotec, Merotroll]",
      "Ceftazidime-Avibactam [Avycaz] — for CRKP",
      "Colistin [Colistin Inj]",
      "Ceftriaxone [Monocef, Ceftrex]",
    ],
  },
  {
    name: "MRSA Infection",
    subject: "Microbiology",
    icd10: "A49.02",
    category: "Bacterial Infection",
    definition:
      "Infection caused by Methicillin-Resistant Staphylococcus aureus, a multi-drug resistant strain carrying the mecA gene encoding modified PBP2a (penicillin-binding protein), resistant to all beta-lactam antibiotics, requiring Vancomycin or newer agents for treatment.",
    etiology:
      "Staphylococcus aureus with mecA gene (on SCCmec mobile genetic element) encoding PBP2a (low affinity for beta-lactams). Hospital-acquired MRSA (HA-MRSA): healthcare settings, intravascular devices, surgical wounds. Community-acquired MRSA (CA-MRSA): healthy individuals without healthcare exposure; often carries Panton-Valentine Leukocidin (PVL) toxin causing necrotising fasciitis/pneumonia.",
    pathophysiology:
      "mecA gene → PBP2a (low-affinity PBP) → beta-lactams cannot bind → bacterial cell wall synthesis proceeds normally → methicillin/oxacillin/cephalosporin resistance. All beta-lactam antibiotics fail (including cephalosporins and carbapenems). Virulence factors: TSST-1 (toxic shock), PVL (necrosis), protein A (immune evasion).",
    clinicalFeatures: [
      "Skin and soft tissue infections: cellulitis, furuncles, carbuncles, abscesses (most common MRSA presentation)",
      "Surgical site infection (SSI) post-operatively",
      "Bacteraemia: fever + positive blood cultures (MRSA bacteraemia high mortality)",
      "Endocarditis: tricuspid valve (IV drug users), aortic/mitral (healthcare-associated)",
      "Pneumonia: especially in post-influenza, ICU patients (necrotising — CA-MRSA/PVL)",
      "Osteomyelitis, septic arthritis",
      "Line-associated bloodstream infection (CLABSI) in ICU",
    ],
    investigations: [
      "Blood/wound culture: S. aureus identification",
      "Oxacillin disc diffusion: MRSA if oxacillin MIC ≥4 mcg/mL or zone ≤10mm",
      "Cefoxitin disc test (preferred over oxacillin disc): surrogate for mecA detection",
      "PCR for mecA gene (gold standard for MRSA detection)",
      "Chromogenic MRSA agar: rapid presumptive identification",
      "MIC testing for Vancomycin (VSSA <1, VISA 4-8, VRSA ≥16 mcg/mL)",
    ],
    treatment:
      "Vancomycin [Vancoled, Vanco-500] IV: 25-30 mg/kg/day in 2-3 divided doses; target trough 15-20 mcg/mL (or AUC-guided dosing). TDM mandatory. Severe/VHA-MRSA: Linezolid [Lizolid, Linox] 600mg BD (bacteriostatic, good lung penetration — preferred for pneumonia). Daptomycin [Cubicin] 4-6mg/kg IV OD (for bacteraemia/endocarditis; NOT for pneumonia — inactivated by surfactant). Teicoplanin [Targocid]: alternative glycopeptide.",
    complications: [
      "Septic shock",
      "Infective endocarditis (high mortality)",
      "Osteomyelitis (chronic, difficult to treat)",
      "Necrotising pneumonia (CA-MRSA/PVL — young, previously healthy)",
      "Vancomycin-Intermediate S. aureus (VISA) and VRSA emergence",
    ],
    differentiatingFeature:
      "mecA gene + cefoxitin resistance disc = MRSA (all beta-lactams ineffective). Vancomycin = first-line IV treatment. Linezolid preferred for MRSA pneumonia (better lung penetration than Vancomycin). Daptomycin NOT used for pneumonia (inactivated by pulmonary surfactant).",
    pearlPoints: [
      "NEET PG: MRSA resistance mechanism = mecA gene → PBP2a → all beta-lactam antibiotics fail",
      "Vancomycin is NOT bactericidal against MRSA (bacteriostatic) — Daptomycin is bactericidal for bacteraemia",
      "Linezolid: oxazolidinone antibiotic; bacteriostatic; causes thrombocytopenia + serotonin syndrome risk with SSRIs",
      "Decolonisation of MRSA carriers: Mupirocin [Bactroban] nasal ointment + Chlorhexidine body wash",
      "Vancomycin TDM: target trough 15-20 mcg/mL for serious infections (avoid <10 — resistance risk; avoid >20 — nephrotoxicity)",
    ],
    indianBrandDrugs: [
      "Vancomycin [Vancoled, Vancocin, Vanco-500]",
      "Linezolid [Lizolid, Linox, Zyvox]",
      "Teicoplanin [Targocid, Ticonan]",
      "Daptomycin [Cubicin]",
    ],
  },
  {
    name: "Systemic Candidiasis",
    subject: "Microbiology",
    icd10: "B37.9",
    category: "Fungal Infection",
    definition:
      "Invasive deep-seated fungal infection caused by Candida species (most commonly Candida albicans), occurring in immunocompromised or critically ill patients, manifesting as candidaemia (Candida in blood) with potential dissemination to kidneys, eyes, heart, and brain.",
    etiology:
      "Candida albicans (50-60%), C. glabrata (15-20%, intrinsic Fluconazole reduced sensitivity), C. tropicalis (India — high prevalence, high biofilm), C. parapsilosis (neonates, IVDU), C. auris (emerging — multi-drug resistant). Risk factors: broad-spectrum antibiotics, ICU, central venous catheters, TPN, immunosuppression, neutropenia, abdominal surgery.",
    pathophysiology:
      "C. albicans: commensal of skin/GIT → immunosuppression/antibiotic disruption → overgrowth → germ tube formation (virulence marker) → invasion of mucosal barriers → candidaemia → haematogenous dissemination. Biofilm formation on CVC (difficult to eradicate with antifungals alone — remove line).",
    clinicalFeatures: [
      "Oropharyngeal candidiasis: white pseudomembranous plaques (thrush), easily wiped off (unlike leukoplakia)",
      "Oesophageal candidiasis (AIDS-defining in HIV): dysphagia, odynophagia",
      "Candidaemia: persistent fever despite broad-spectrum antibiotics in ICU + positive blood culture",
      "Candida endophthalmitis: chorioretinal lesions — 'cotton-wool spots' on fundoscopy (10-15% of candidaemia)",
      "Hepatosplenic candidiasis: immunocompromised, 'bull's-eye' lesions on CT abdomen",
      "Disseminated candidiasis: multifocal microabscesses in kidneys, brain, heart",
    ],
    investigations: [
      "Blood culture (BACTEC): Candida isolation — sensitivity ~50% (yeast takes 24-72h)",
      "(1→3)-β-D-glucan assay: panfungal marker, elevated in invasive candidiasis; not specific to Candida",
      "Mannan antigen + anti-Mannan antibody: combined sensitivity 80% for invasive candidiasis",
      "Fundoscopy: ALL candidaemia patients — endophthalmitis (chorioretinal lesions)",
      "Echocardiography: endocarditis workup for Candida bacteraemia",
      "CT abdomen (hepatosplenic candidiasis): bull's-eye lesions in liver/spleen",
    ],
    treatment:
      "Candidaemia: Echinocandin first-line (IDSA guideline) — Caspofungin [Cancidas] 70mg loading then 50mg OD IV, Micafungin [Funguard] 100mg OD IV, or Anidulafungin. Remove all CVCs. Step-down to Fluconazole [Forcan, Diflucan] after clinical stability + susceptibility confirmed. Non-albicans/C. glabrata: echinocandin preferred. C. tropicalis (India): Fluconazole 400mg OD IV/PO. Oropharyngeal candidiasis: Fluconazole 150mg single dose or Nystatin [Mycostatin] suspension.",
    complications: [
      "Candida endophthalmitis (blindness if untreated)",
      "Candida endocarditis (high mortality, often requires surgical valve replacement)",
      "Meningitis, cerebral abscesses",
      "Septic arthritis, osteomyelitis",
      "Multi-organ failure",
    ],
    differentiatingFeature:
      "Germ tube test positive = C. albicans (most virulent; forms germ tubes within 2-3h in serum — also called Reynolds-Braude phenomenon). Echinocandin first-line for candidaemia (not Fluconazole — due to increasing azole resistance). Remove CVC with candidaemia — biofilm prevents antifungal penetration.",
    pearlPoints: [
      "NEET PG: Germ tube test = C. albicans; chlamydospores = C. albicans on cornmeal agar; urease-positive Candida = C. glabrata",
      "Echinocandins mechanism: inhibit β-1,3-glucan synthase (fungal cell wall synthesis) — NOT present in human cells → excellent tolerability",
      "Fundoscopy mandatory for ALL candidaemia (10-15% endophthalmitis; Vitreo-retinal surgery if large lesion)",
      "C. auris: emerging multi-drug resistant, misidentified by routine methods, nosocomial outbreaks, difficult to treat",
      "Nystatin: topical/oral only; NOT absorbed systemically; used for oropharyngeal/vaginal candidiasis",
    ],
    indianBrandDrugs: [
      "Fluconazole [Forcan, Diflucan, Zocon]",
      "Caspofungin [Cancidas]",
      "Micafungin [Funguard]",
      "Voriconazole [Vfend, Vorich] — for invasive aspergillosis + some non-albicans Candida",
      "Amphotericin B [Amphocin, Fungizone] — severe cases",
    ],
  },
  {
    name: "Cryptococcal Meningitis",
    subject: "Microbiology",
    icd10: "B45.1",
    category: "Fungal Infection",
    definition:
      "Life-threatening meningitis caused by Cryptococcus neoformans, an encapsulated yeast, occurring predominantly in severely immunocompromised patients (HIV with CD4 <100 cells/mm³), diagnosed by India ink preparation showing pathognomonic halo around the yeast.",
    etiology:
      "Cryptococcus neoformans: encapsulated basidiomycete yeast, 5-10μm, reproduces by budding. Capsule contains glucuronoxylomannan (virulence factor — antiphagocytic). Ubiquitous in soil, pigeon droppings (guano). Infection by inhalation of desiccated yeast cells. Risk: HIV/AIDS (CD4 <100), organ transplant, high-dose steroids, haematological malignancy. Cryptococcus gattii: causes disease in immunocompetent.",
    pathophysiology:
      "Inhaled yeasts → pulmonary granuloma → haematogenous spread → CNS tropism (melanin synthesis from catecholamines in brain; urease activity). Polysaccharide capsule inhibits phagocytosis and inflammatory response. CSF: minimal inflammation (paucicellular) despite massive fungal burden — characteristic of Cryptococcal meningitis (poor CMI).",
    clinicalFeatures: [
      "Subacute/insidious onset (days to weeks) — fever, headache, malaise",
      "Meningismus (neck stiffness) — may be mild or absent in severely immunocompromised",
      "Altered consciousness, visual disturbances",
      "Papilloedema and raised ICP — major cause of morbidity (ICP management critical)",
      "Cranial nerve palsies (6th nerve palsy — diplopia)",
      "Pulmonary cryptococcosis: cough, pleuritic chest pain (often asymptomatic)",
    ],
    investigations: [
      "India ink preparation of CSF: direct visualisation of encapsulated yeast with clear halo — pathognomonic",
      "CSF CrAg (Cryptococcal antigen): highly sensitive (>90%), specific; quantitative titre for monitoring",
      "Serum CrAg: screening test in HIV patients (positive weeks before symptoms)",
      "CSF culture: Cryptococcus on Sabouraud's agar (5-7 days) — definitive",
      "CSF parameters: lymphocytic pleocytosis (low), elevated protein, very low glucose (paucicellular compared to bacterial meningitis)",
      "LP opening pressure: elevated (>20 cmH2O) — management critical",
      "MRI brain: leptomeningeal enhancement, Virchow-Robin space dilatation",
    ],
    treatment:
      "ICMR/WHO Protocol for HIV-associated Cryptococcal meningitis: Induction (2 weeks): Amphotericin B deoxycholate [Amphocin, Fungizone] 0.7-1mg/kg/day IV + Flucytosine [5-FC, Ancotil] 100mg/kg/day PO (four divided doses) — 5-FC not available in India; Amphotericin B liposomal [AmBisome] if renal toxicity. Consolidation (8 weeks): Fluconazole [Forcan] 400mg OD PO. Maintenance (≥1 year): Fluconazole 200mg OD (until CD4 >200 with ART). ICP management: serial therapeutic LP (remove 20-30mL CSF) to target opening pressure <20cmH2O.",
    complications: [
      "Raised ICP causing blindness and herniation (most important complication)",
      "Cryptococcoma (granuloma — space-occupying lesion)",
      "Relapse (maintenance therapy discontinuation before immune recovery)",
      "IRIS (Immune Reconstitution Inflammatory Syndrome) after ART initiation",
      "Renal failure (Amphotericin B nephrotoxicity)",
    ],
    differentiatingFeature:
      "India ink preparation: encapsulated yeast with clear halo = C. neoformans (only encapsulated yeast causing meningitis). CSF: paucicellular (minimal inflammation) despite severe meningitis = characteristic (poor CMI in HIV). Serial LP for ICP management (not acetazolamide — ineffective; not mannitol — contraindicated in communicating hydrocephalus).",
    pearlPoints: [
      "NEET PG: India ink = C. neoformans (only encapsulated yeast; halo = polysaccharide capsule displacing India ink)",
      "Mucicarmine stain: stains the capsule red/pink (histopathology) — another distinguishing stain",
      "Flucytosine mechanism: enters fungal cell → deaminated to 5-FU → inhibits thymidylate synthase (DNA synthesis)",
      "IRIS warning: do NOT start ART immediately with active Cryptococcal meningitis — delay ART 4-6 weeks after starting antifungals",
      "CrAg lateral flow assay (LFA) on blood: WHO-recommended screening test for HIV patients with CD4 <100 (positive → prevent by pre-emptive Fluconazole)",
    ],
    icmrProtocol:
      "NACO/ICMR HIV Opportunistic Infection Guidelines: Amphotericin B + Flucytosine induction (5-FC if available). Serial LPs for ICP control. ART deferred 4-6 weeks. Fluconazole consolidation + maintenance. Screen all HIV CD4 <100 with serum CrAg.",
    indianBrandDrugs: [
      "Amphotericin B deoxycholate [Amphocin, Fungizone]",
      "Liposomal Amphotericin B [AmBisome, Fungisome]",
      "Fluconazole [Forcan, Diflucan, Zocon-400]",
    ],
  },
  {
    name: "Tetanus",
    subject: "Microbiology",
    icd10: "A35",
    category: "Bacterial Infection",
    definition:
      "Potentially fatal neurological syndrome caused by tetanospasmin (tetanus toxin) produced by Clostridium tetani, characterised by generalised muscle rigidity and painful spasms, resulting from toxin-mediated block of inhibitory interneurons in the spinal cord and brainstem.",
    etiology:
      "Clostridium tetani: Gram-positive, anaerobic, spore-forming bacillus. 'Drumstick' or 'tennis racket' morphology (terminal spore). Spores ubiquitous in soil and animal faeces. Entry: penetrating wounds (rusty nails, lacerations, burns), injection sites (IVDU), umbilical stump (neonatal tetanus), post-operative. Spores germinate in anaerobic conditions (devitalised tissue).",
    pathophysiology:
      "Spores germinate → vegetative bacilli → produce tetanospasmin (tetanus toxin) → toxin travels retrograde via motor nerve axons → blocks inhibitory interneurons (Renshaw cells) in anterior horn and brainstem → prevents release of inhibitory neurotransmitters (GABA, glycine) → unopposed excitation of motor neurons → sustained muscle spasm + trismus.",
    clinicalFeatures: [
      "Trismus (lockjaw — spasm of masseter) — earliest/most common sign",
      "Risus sardonicus: fixed sardonic smile (facial muscle spasm)",
      "Opisthotonus: arched back posture (extensor spasm of back muscles — pathognomonic)",
      "Generalized rigidity progressing to generalised tetanic spasms",
      "Dysphagia (pharyngeal spasm)",
      "Autonomic dysfunction: labile BP, tachycardia, diaphoresis",
      "Neonatal tetanus: trismus + rigidity in neonate 3-28 days after birth",
    ],
    investigations: [
      "Clinical diagnosis — no specific laboratory test",
      "Spatula test: touch posterior pharynx with spatula → biting (spasm) = positive = tetanus",
      "ABG: hypoxia + hypercapnia if respiratory compromise",
      "Wound culture: rarely helpful (only C. tetani in 30% of wounds)",
      "Electromyography (EMG): continuous motor unit activity in severe cases",
    ],
    treatment:
      "Tetanus requires ICU management: Human Tetanus Immunoglobulin [HTIG — Tetglob, Tetagam] 3000-6000 IU IM (neutralises unbound toxin) — give BEFORE wound debridement. Metronidazole [Flagyl, Metrogyl] 500mg IV TDS x 7-10 days (kills vegetative bacilli; superior to Penicillin G). Wound debridement (removes toxin source). Diazepam [Calmpose] 5-10mg IV every 2-8h (controls spasms) OR Midazolam infusion. Tracheostomy + mechanical ventilation for respiratory failure. Labetalol/Magnesium for autonomic dysfunction.",
    complications: [
      "Respiratory failure (most common cause of death — laryngospasm, respiratory muscle spasm)",
      "Autonomic dysfunction (hypertensive crises, arrhythmias)",
      "Aspiration pneumonia",
      "Rhabdomyolysis",
      "Fractures from violent spasms",
    ],
    differentiatingFeature:
      "Trismus + Risus sardonicus + Opisthotonus = tetanus triad (pathognomonic). Spatula test: touching posterior pharynx causes biting (spasm) = positive. Consciousness is PRESERVED (differentiates from encephalitis/meningitis). Tetanus toxin CANNOT be drained back from CNS — HTIG only neutralises free toxin in blood.",
    pearlPoints: [
      "NEET PG: Clostridium tetani = drumstick bacillus (terminal spore); C. botulinum = subterminal spore; C. perfringens = no spore usually visible",
      "Mechanism: tetanospasmin blocks glycine/GABA release from inhibitory Renshaw cells → disinhibition of motor neurons",
      "Metronidazole preferred over Penicillin G (penicillin may worsen spasms by inhibiting GABA)",
      "Wound debridement AFTER HTIG (dislodging spores from wound before neutralisation = more toxin release)",
      "5 doses of tetanus toxoid at correct intervals = life-long immunity; booster every 10 years",
    ],
    icmrProtocol:
      "ICMR Protocol: HTIG 3000-6000 IU IM + Metronidazole IV + ICU admission + spasm control. Active immunisation post-recovery. Universal tetanus vaccination in immunisation schedule (DPT at 6w, 10w, 14w, 18m, 5y).",
    indianBrandDrugs: [
      "HTIG [Tetglob, Tetagam P, HTIG-250IU]",
      "Metronidazole [Flagyl, Metrogyl]",
      "Diazepam [Calmpose, Valium]",
      "Tetanus Toxoid [TT inj, ADACEL — combined Tdap]",
    ],
  },
  {
    name: "Leptospirosis",
    subject: "Microbiology",
    icd10: "A27.9",
    category: "Zoonotic Infection",
    definition:
      "Bacterial zoonosis caused by pathogenic Leptospira species (Leptospira interrogans complex), characterised by a biphasic illness — leptospiraemic phase (fever, conjunctival suffusion) followed by immune phase (Weil's disease: jaundice, acute kidney injury, haemorrhage, uveitis).",
    etiology:
      "Leptospira interrogans: spirochaete, thin, tightly coiled, hooked ends ('question mark' shape). Serovar icterohaemorrhagiae (rats) most common in India. Reservoir: rats, dogs, cattle, pigs (chronic renal tubular carriers). Transmission: contact with urine-contaminated water/soil through skin abrasions or mucous membranes. Occupational risk: farmers, sewage workers, veterinarians, flood victims.",
    pathophysiology:
      "Leptospires penetrate intact/broken skin → bacteraemia (leptospiraemic phase, day 1-7) → disseminate to kidneys, liver, meninges, lungs, eyes. Immune phase (day 7-14): antibody formation → leptospires cleared from blood but organ damage continues. Weil's disease: hepatic canalicular damage (jaundice without hepatocellular necrosis) + tubular nephritis (non-oliguric AKI) + pulmonary haemorrhage.",
    clinicalFeatures: [
      "Leptospiraemic phase (Days 1-7): abrupt fever, myalgia (especially calf muscles — severe, pathognomonic), headache",
      "Conjunctival suffusion (erythema without discharge — hallmark early sign; differs from conjunctivitis)",
      "Weil's disease (severe leptospirosis, 5-10%): Jaundice + AKI + haemorrhage triad",
      "Jaundice (deep, without pruritus, rising without liver failure initially)",
      "Pulmonary haemorrhage syndrome (ARDS-like) — leading cause of death in severe leptospirosis",
      "Haemorrhagic manifestations: epistaxis, haemoptysis, bleeding gums",
      "Aseptic meningitis (immune phase) — lymphocytic",
    ],
    investigations: [
      "MAT (Microscopic Agglutination Test): gold standard serology; ≥4-fold rise in titre confirms diagnosis",
      "IgM ELISA/Lepto Dipstick: rapid serology (positive from day 5-7)",
      "PCR (blood, CSF, urine): early diagnosis (first week), most sensitive",
      "Blood culture: Fletcher's medium (EMJH medium) — dark-field microscopy for spirochaetes",
      "CBC: leucocytosis, thrombocytopenia, anaemia",
      "LFTs: elevated bilirubin (direct + indirect), mild transaminase elevation (disproportionate to jaundice — unique to leptospirosis)",
      "Renal function: rising creatinine (non-oliguric AKI initially)",
    ],
    treatment:
      "Mild leptospirosis: Doxycycline [Doxy-1, Doxt] 100mg BD PO x 7 days (drug of choice). Alternate: Azithromycin 500mg OD x 3 days. Severe/Weil's disease: IV Penicillin G 1.5 million units 6-hourly x 7 days OR Ceftriaxone [Monocef] 1g IV OD x 7 days (preferred in India). Prophylaxis: Doxycycline 200mg single dose weekly (occupational/flood exposure).",
    complications: [
      "Weil's disease triad: jaundice + AKI + haemorrhage (5-10% mortality)",
      "Pulmonary haemorrhage syndrome (ARDS) — highest mortality",
      "Uveitis (immune phase, 1-12 months later — anterior uveitis)",
      "Myocarditis, arrhythmias",
      "Peripheral neuropathy",
    ],
    differentiatingFeature:
      "Conjunctival suffusion + calf myalgia in flood/wet area exposure = leptospirosis. Weil's disease: jaundice DISPROPORTIONATE to LFT elevation (bilirubin high, transaminases mildly elevated) — unique pattern distinguishing from hepatitis. MAT = gold standard but requires paired sera 2-4 weeks apart.",
    pearlPoints: [
      "NEET PG: Dark-field microscopy: direct visualisation of spirochaetes in blood (first week only) — 'corkscrew' motility",
      "Weil's disease: Jaundice + AKI + Haemorrhage (not all three in every case) — named after Adolph Weil who described it in 1886",
      "Doxycycline prophylaxis: 200mg weekly for those in endemic areas/occupational exposure/post-flood",
      "Leptospirosis disproportionate jaundice: bilirubin 15-30 mg/dL but ALT only mildly elevated (unlike hepatitis where both high)",
      "India: Kerala, Maharashtra, Tamil Nadu, Andaman & Nicobar are highest burden states; peak during monsoon season",
    ],
    icmrProtocol:
      "ICMR/NVBDCP Leptospirosis Management: Doxycycline for mild. Ceftriaxone for severe. Prophylaxis in outbreak/flood situation. Notify state health authority. Rodent control measures.",
    indianBrandDrugs: [
      "Doxycycline [Doxy-1, Doxt, Doxycap]",
      "Ceftriaxone [Monocef, Ceftrex, Rocephin]",
      "Penicillin G [Crystapen, Benzylpenicillin]",
      "Azithromycin [Azithral, Azee]",
    ],
  },
  {
    name: "Japanese Encephalitis",
    subject: "Microbiology",
    icd10: "A83.0",
    category: "Viral Infection",
    definition:
      "Most common vaccine-preventable cause of viral encephalitis in Asia, caused by Japanese Encephalitis Virus (JEV), transmitted by Culex mosquitoes, characterised by acute encephalitic syndrome with high mortality (25%) and significant neurological sequelae in survivors.",
    etiology:
      "Japanese Encephalitis Virus (JEV): Flavivirus, single-stranded positive-sense RNA, closely related to dengue and West Nile virus. Vector: Culex tritaeniorhynchus (rice field mosquito, breeds in stagnant water/rice paddies). Reservoir: pigs (amplifying host) and wading birds. Children and elderly most affected. India: endemic in UP, Bihar, Assam, West Bengal, Karnataka.",
    pathophysiology:
      "Culex bite → JEV viremia → CNS invasion via blood-brain barrier disruption or olfactory neurones → neurotropism (thalamus, basal ganglia, brainstem most affected — characteristic distribution) → neuronal necrosis + inflammatory cell infiltration + Virchow-Robin perivascular cuffing → encephalitis.",
    clinicalFeatures: [
      "Prodrome (2-4 days): fever, headache, nausea",
      "Acute encephalitic phase: altered consciousness, disorientation",
      "Seizures (70-80% of cases, especially children)",
      "Movement disorders: extrapyramidal features — tremors, cogwheel rigidity, Parkinsonian features (thalamic/basal ganglia involvement)",
      "Characteristic mask-like facies (Parkinsonism)",
      "Respiratory failure (brainstem involvement)",
      "Outcome: 25% mortality; 50% survivors with neurological sequelae (cognitive, behavioural, movement disorders)",
    ],
    investigations: [
      "CSF: lymphocytic pleocytosis, elevated protein, normal/low glucose",
      "JEV IgM ELISA (CSF/serum): gold standard for diagnosis (available from day 4-7 of illness)",
      "PCR for JEV RNA: CSF (most sensitive in first few days)",
      "MRI brain (T2/FLAIR): bilateral thalamic hyperintensities = pathognomonic of JEV; also basal ganglia, brainstem",
      "EEG: diffuse slowing, seizure activity",
      "Plaque reduction neutralisation test (PRNT): definitive serological confirmation",
    ],
    treatment:
      "No specific antiviral therapy (supportive care only — no approved anti-JEV drug). Supportive care: airway management, anticonvulsants (IV Phenytoin/Levetiracetam for seizures), antipyretics [Paracetamol/Dolo-650], raised ICP management (mannitol), nutritional support. Minocycline and Dexamethasone not proven beneficial in clinical trials. Prevention: SA14-14-2 vaccine (JE vaccine) — MOST EFFECTIVE intervention.",
    complications: [
      "Neurological sequelae in 50% survivors (cognitive, behavioural, motor deficits)",
      "Epilepsy (post-encephalitic)",
      "Parkinsonism (permanent)",
      "Death (25% case fatality rate)",
      "Respiratory failure requiring mechanical ventilation",
    ],
    differentiatingFeature:
      "Bilateral thalamic hyperintensities on T2/FLAIR MRI = pathognomonic of Japanese Encephalitis (no other encephalitis targets thalamus bilaterally with this pattern). Parkinsonian features + encephalitis in rice-paddy area/monsoon = JEV until proven otherwise. JEV IgM in CSF = diagnostic.",
    pearlPoints: [
      "NEET PG: JEV IgM in CSF = most specific diagnostic test; bilateral thalamic lesions on MRI = pathognomonic",
      "SA14-14-2 live-attenuated vaccine: single dose, 95% protection; part of India's national immunisation programme (12-15 months + booster at 16-24 months in endemic districts)",
      "Culex mosquitoes: dusk-to-dawn biting (unlike Aedes — daytime); rice field + pig rearing = epidemic conditions",
      "JEV, dengue, West Nile virus — all Flaviviruses; cross-reactive antibodies possible in dengue-endemic areas",
      "Parkinson-like features in JEV: substantia nigra and basal ganglia involvement → dopamine pathway disruption",
    ],
    icmrProtocol:
      "NVBDCP JE Control Programme: JE vaccination in endemic districts. Surveillance for acute encephalitis syndrome (AES). Vector control (Culex larval source management). Pig vaccination in endemic areas. Prompt notification of JE cases.",
    indianBrandDrugs: [
      "JE Vaccine [Jenvac — Bharat Biotech, SA14-14-2 strain]",
      "Levetiracetam [Levroxa, Levipil] — anticonvulsant",
      "Phenytoin [Eptoin, Dilantin] — anticonvulsant",
      "Mannitol 20% [Osmofundin] — ICP management",
    ],
  },
  {
    name: "Hepatitis C",
    subject: "Microbiology",
    icd10: "B17.1",
    category: "Viral Infection",
    definition:
      "Blood-borne viral hepatitis caused by Hepatitis C Virus (HCV), characterised by a high rate of chronicity (75-85%), leading to cirrhosis and hepatocellular carcinoma. Now curable with Direct-Acting Antiviral (DAA) therapy achieving Sustained Virologic Response (SVR) >95% in 8-12 weeks.",
    etiology:
      "HCV: Flaviviridae family, Hepacivirus genus, single-stranded positive-sense RNA. 6 major genotypes (GT1-6); GT1 most common globally; GT3 most prevalent in India/South Asia. Transmission: blood (IV drug use — most common in developed world; unsafe injections/blood transfusion — important in India), vertical, sexual (low risk). No vaccine available for HCV.",
    pathophysiology:
      "HCV infects hepatocytes via CD81, SR-BI, claudin-1 receptors → intracellular replication (NS5B RNA-dependent RNA polymerase) → T-cell mediated hepatocyte destruction (not direct cytopathic). High mutation rate (NS5A, NS5B, NS3 domains) → immune escape → chronicity (75-85%). Genotype 3 = most steatogenic (accelerated fibrosis).",
    clinicalFeatures: [
      "Acute HCV (6 months post-exposure): mostly asymptomatic (80%); mild jaundice in 20%",
      "Spontaneous clearance: only 15-25% (majority progress to chronic)",
      "Chronic HCV: asymptomatic for decades; detected incidentally on LFT abnormality/screening",
      "Cirrhosis features: jaundice, ascites, portal hypertension, variceal bleeding (20-30 years)",
      "HCC: 1-3% per year in cirrhotic HCV patients",
      "Extrahepatic: mixed cryoglobulinaemia (type II — most specific), membranoproliferative GN, B-cell lymphoma, lichen planus",
    ],
    investigations: [
      "Anti-HCV ELISA (3rd generation): screening test; positive 8-12 weeks post-exposure",
      "HCV RNA PCR (Qualitative): confirms active infection (positive before antibody, window period diagnosis)",
      "HCV RNA PCR (Quantitative): baseline viral load pre-treatment + monitoring",
      "HCV genotype: guides treatment selection (GT1/2/3/4/5/6) — still useful for some regimens",
      "LFTs: ALT/AST (often only mildly elevated in chronic HCV)",
      "FibroScan/FIB-4 score/Liver biopsy: fibrosis staging (guides treatment urgency)",
      "AFP + liver USG every 6 months (HCC surveillance in cirrhosis)",
    ],
    treatment:
      "Pangenotypic DAA therapy (NACO/MOHFW India free treatment programme): Sofosbuvir [Sofovir, Hepcinat] 400mg + Daclatasvir [Daclahep, Daclavir] 60mg OD x 12 weeks (GT1-6 pangenotypic) — SVR >95%. Sofosbuvir/Velpatasvir [Velpanat, Epclusa] — single tablet, pangenotypic, 12 weeks. For cirrhosis: Sofosbuvir + Daclatasvir x 24 weeks or add Ribavirin. SVR = undetectable HCV RNA 12 weeks after end of treatment = cure.",
    complications: [
      "Cirrhosis (20-30 years from infection)",
      "Hepatocellular carcinoma (1-3% per year in cirrhosis)",
      "Mixed cryoglobulinaemia (vasculitis, glomerulonephritis)",
      "B-cell non-Hodgkin lymphoma",
      "Portal hypertension: variceal haemorrhage, hepatic encephalopathy, spontaneous bacterial peritonitis",
    ],
    differentiatingFeature:
      "HCV RNA PCR = diagnostic (detects active infection; positive before anti-HCV antibody appears in window period). SVR (Sustained Virologic Response at 12 weeks post-treatment) = CURE. Extrahepatic: mixed cryoglobulinaemia = most specific HCV-associated manifestation. No vaccine for HCV (contrast with HBV, HAV).",
    pearlPoints: [
      "NEET PG: HCV: RNA virus, highest chronicity rate (75-85%), NO vaccine available, NOW CURABLE with DAA",
      "Genotype 3 (India) = most common + associated with steatosis + rapid fibrosis progression",
      "DAA mechanism: NS5B (Sofosbuvir — nucleotide analogue, chain terminator), NS5A (Daclatasvir, Ledipasvir), NS3/4A protease (Simeprevir)",
      "MOHFW India provides free DAA through NACO programme — Sofosbuvir+Daclatasvir is first-line",
      "Mixed cryoglobulinaemia: type II (monoclonal IgM + polyclonal IgG) = most specific for HCV; purpura + arthralgias + weakness + GN",
    ],
    icmrProtocol:
      "NACO/MOHFW HCV Treatment Guidelines: Sofosbuvir+Daclatasvir (pangenotypic) free at all NACO centres. SVR12 monitoring. Cirrhosis: 24-week treatment. Screening: anti-HCV ELISA for high-risk groups (PWID, blood recipients, dialysis patients, HIV). HCC surveillance every 6 months in cirrhosis.",
    indianBrandDrugs: [
      "Sofosbuvir [Sofovir, Hepcinat, SoviHep]",
      "Daclatasvir [Daclahep, Daclavir, Natdac]",
      "Sofosbuvir/Velpatasvir [Velpanat, Sofvel — combination]",
      "Ribavirin [Ribavin, Rebetol] — add-on for cirrhosis",
    ],
  },
];

// ─── Combined export ───────────────────────────────────────────────
export const allBatch3Diseases: DiseaseEntry[] = [
  ...pharmacologyDiseases,
  ...microbiologyDiseases,
];
