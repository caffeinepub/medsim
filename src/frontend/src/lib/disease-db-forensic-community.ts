import type { DiseaseEntry } from "./disease-db-anatomy-physiology";

export const forensicDiseases: DiseaseEntry[] = [
  {
    name: "Asphyxia by Hanging",
    subject: "Forensic",
    icd10: "T71.1",
    category: "Mechanical Asphyxia",
    definition:
      "Mechanical asphyxia caused by constriction of the neck by a ligature, with the weight of the body or part of body acting as the constricting force; characterized by venous obstruction, airway compression, and vagal inhibition leading to cerebral anoxia and death.",
    etiology:
      "Suicidal (most common in India, ~30-40% of all suicides), accidental (erotic/autoerotic asphyxia, especially adolescents), judicial/homicidal (rare). Risk factors: psychiatric illness, substance abuse, financial distress, previous attempts.",
    pathophysiology:
      "Ligature around neck → venous obstruction (JVP raised) → arterial compression at higher pressures → reflex vagal inhibition (carotid body compression) → cerebral venous congestion + hypoxia → unconsciousness in 10-15 seconds → death in 5-15 minutes (variable). Incomplete hanging (feet touching ground) may survive longer.",
    clinicalFeatures: [
      "Ligature mark: parchment-like, yellowish-brown, oblique-upward directed toward knot (suicidal)",
      "Petechial hemorrhages: conjunctivae, face, ears (venous hypertension)",
      "Cyanosis: face, lips, fingertips (venous obstruction)",
      "Tongue: protrusion and swelling (post-mortem)",
      "Neck elongation: rare in suicidal, common in judicial (drop method)",
      "Erection and ejaculation in males (antemortem vagal stimulation)",
      "Incontinence of urine and feces (sphincter relaxation)",
      "Dribbling of saliva from corner of mouth",
    ],
    investigations: [
      "Postmortem examination: ligature mark depth, width, direction, color, parchment appearance",
      "Hyoid bone: fracture present in judicial hanging (long drop), usually absent in suicidal",
      "Larynx/thyroid cartilage: fracture in judicial/forceful hanging",
      "Internal neck: hemorrhage in strap muscles, adventitia of carotid arteries",
      "Lungs: pulmonary edema, petechiae (Tardieu's spots)",
      "Toxicology: blood alcohol, sedatives (may indicate intent or forced intoxication)",
      "Histology: Tardieu's spots in lungs, brain, epicardium",
    ],
    treatment:
      "Emergency (found alive within minutes): 1) Cut ligature immediately (support body first to prevent drop injury). 2) ABC — Airway (intubate if GCS <8), Breathing (O2 100% NRM), Circulation (CPR if pulseless). 3) Cervical spine precaution (C-spine immobilization). 4) ICU admission: monitor for hypoxic-ischemic encephalopathy (HIE), rhabdomyolysis, aspiration pneumonia. 5) Supportive: Inj. Mannitol 1g/kg IV (cerebral edema), Tab. Phenytoin (Eptoin) if seizures. Note: If discovered after >10-15 min of complete hanging, resuscitation rarely successful.",
    complications: [
      "Hypoxic-ischemic encephalopathy (permanent brain damage if resuscitated late)",
      "Aspiration pneumonia (vomiting during resuscitation)",
      "Cervical spine injury (fracture-dislocation in judicial hanging with long drop)",
      "Rhabdomyolysis and acute kidney injury (prolonged hypoxia)",
      "Post-traumatic stress disorder (survivors)",
    ],
    differentiatingFeature:
      "SUICIDAL vs HOMICIDAL hanging: Suicidal = ligature mark oblique/diagonal (upward toward knot), saliva dribble on shoulder, intact hyoid. Homicidal = mark horizontal/symmetric, signs of struggle (defense wounds, facial bruising), hyoid fracture. Judicial = mark horizontal, hyoid+laryngeal fracture (long drop method).",
    pearlPoints: [
      "NEET PG Classic: Ligature mark in suicidal hanging is OBLIQUE-UPWARD directed toward point of suspension — distinguishes from strangulation (horizontal mark).",
      "Hyoid bone fracture: Associated with JUDICIAL (long-drop) hanging. In suicidal hanging, hyoid is usually intact because compression force is less.",
      "Petechial hemorrhages (Tardieu's spots): Mechanical asphyxia hallmark. Found in conjunctivae, face, lungs, epicardium. NOT specific to hanging alone.",
      "Cause of death in hanging: Primarily CEREBRAL ANOXIA (venous obstruction + arterial compression). Vagal inhibition causes rapid death even with incomplete hanging.",
      "Time to death: Complete suspension = 5-15 min. Judicial/long-drop = instantaneous (C2 fracture). Partial hanging = may survive >30 min.",
    ],
    icmrProtocol:
      "ICMR Medico-Legal Guidelines: Mandatory photography of ligature mark before removal. Detailed PM exam including neck dissection, hyoid/laryngeal assessment. Histology of lungs. Toxicology mandatory for suspected forced intoxication.",
  },
  {
    name: "Drowning",
    subject: "Forensic",
    icd10: "T75.1",
    category: "Mechanical Asphyxia / Immersion Death",
    definition:
      "Death due to asphyxia from submersion in liquid medium, causing hypoxia by aspiration of water into airways (wet drowning, ~85%) or laryngospasm without water aspiration (dry drowning, ~15%); distinguished from near-drowning (survival >24h after submersion).",
    etiology:
      "Accidental (swimming, floods, road accidents — most common), suicidal, homicidal (rare, usually infants). Risk factors: swimming inability, alcohol/drug intoxication, epilepsy, cardiovascular disease, fatigue, cold water shock.",
    pathophysiology:
      "WET DROWNING: Water aspiration → surfactant washout → atelectasis, pulmonary edema → hypoxia → cardiac arrest. Freshwater: hypotonic → absorbed into blood → hemodilution, hemolysis, hypervolemia → ventricular fibrillation. Saltwater: hypertonic → draws fluid from blood into alveoli → hemoconcentration, hypovolemia. DRY DROWNING: Laryngospasm → complete airway obstruction → rapid hypoxia → death without significant water aspiration. SECONDARY DROWNING: Pulmonary edema hours after apparent recovery.",
    clinicalFeatures: [
      "Frothy fluid: from mouth/nose (fine white/pinkish foam — pulmonary edema)",
      "Washerwoman's hands/feet: skin maceration from prolonged immersion",
      "Cutis anserina (goose skin): piloerection from cold water/antemortem response",
      "Mud, sand, aquatic plants in airways: indicates antemortem struggle",
      "Weed/algae in hands: cadaveric spasm (antemortem gripping)",
      "Pleural effusion: bilateral (fluid transudation)",
      "Blebs on lungs: water engorgement, overinflation",
      "Paltauf's hemorrhages: pale, ill-defined hemorrhages in drowning lungs (freshwater)",
    ],
    investigations: [
      "Diatom analysis: GOLD STANDARD for drowning diagnosis — diatoms in bone marrow/brain/liver match those at drowning site (confirming antemortem drowning)",
      "Gettler's test: Blood chloride levels — Freshwater: left heart chloride < right heart (hemodilution). Saltwater: left > right (hemoconcentration).",
      "Lung weight: Drowning lungs weigh 700-1000g (normal ~400g) due to fluid/edema",
      "Vitreous electrolytes: Potassium/sodium levels (postmortem changes less in vitreous)",
      "Toxicology: Blood alcohol, drugs (may precipitate drowning)",
      "Plankton in bone marrow: confirms antemortem drowning (diatoms cross blood-brain barrier only if heart beating)",
    ],
    treatment:
      "Resuscitation (near-drowning): 1) Remove from water carefully (C-spine precaution). 2) Assess: GCS, breathing, pulse. 3) CPR if pulseless (chest compressions 30:2). 4) O2 100% via NRM mask or intubation if GCS<8 or SpO2<90%. 5) Warm patient (hypothermia management — active rewarming). 6) ICU: ARDS management (lung-protective ventilation — TV 6ml/kg, PEEP 5-10 cmH2O), antibiotics for aspiration pneumonia (Inj. Piperacillin-Tazobactam 4.5g IV q8h). 7) Electrolyte correction. Remember: 'Never declare dead until warm and dead' in cold water submersion (hypothermia may be protective).",
    complications: [
      "ARDS (Acute Respiratory Distress Syndrome — delayed 12-24h)",
      "Aspiration pneumonia (secondary bacterial infection)",
      "Hypoxic encephalopathy (anoxic brain injury)",
      "Hypothermia complications (cardiac arrhythmias, coagulopathy)",
      "Secondary drowning (pulmonary edema 1-72h after apparent recovery — admit all near-drowning victims for 24h observation)",
    ],
    differentiatingFeature:
      "ANTEMORTEM vs POSTMORTEM drowning: Antemortem = diatoms in bone marrow/brain (diatoms enter systemic circulation only when heart is beating), cadaveric spasm (gripping of weed), Paltauf's hemorrhages, foam in airways. Postmortem = no diatoms in bone marrow, no cadaveric spasm, no foam.",
    pearlPoints: [
      "NEET PG Classic: DIATOM TEST (bone marrow) = GOLD STANDARD for antemortem drowning. Diatoms enter circulation only when heart pumping — absent in postmortem immersion.",
      "Dry drowning (15%): Laryngospasm without water aspiration. Lungs appear 'dry' at autopsy. Diatom test may be negative — must look for other signs.",
      "Gettler's test: Freshwater drowning → left heart blood MORE dilute than right heart (water absorbed into pulmonary circulation before left heart). Saltwater = opposite.",
      "Cadaveric spasm: Instantaneous stiffening at time of death (not rigor mortis) — seen in drowning from clutching weeds/objects. Medico-legal significance: PROVES antemortem immersion.",
      "Freshwater vs Saltwater drowning: Clinically, freshwater more dangerous (hemolysis, VF) vs saltwater (hemoconcentration, pulmonary edema) — both managed with same resuscitation protocol.",
    ],
    icmrProtocol:
      "Diatom analysis: Bone marrow from femur/sternum boiled in concentrated HNO3 → centrifuge → mount → microscopy. Compare with water sample from drowning site.",
  },
  {
    name: "Carbon Monoxide Poisoning",
    subject: "Forensic",
    icd10: "T58",
    category: "Toxic Asphyxia / Poisoning",
    definition:
      "Systemic poisoning by carbon monoxide (CO), a colorless, odorless, tasteless, non-irritant gas produced by incomplete combustion of carbonaceous fuels; causing tissue hypoxia by forming carboxyhemoglobin (COHb) with 210-250x greater affinity for hemoglobin than oxygen, and inhibiting cytochrome oxidase (mitochondrial toxicity).",
    etiology:
      "Motor vehicle exhaust (most common), coal/wood/charcoal burning in enclosed spaces, industrial furnaces, faulty gas heaters, generators (CO from petrol engines), fires (building fires), tobacco smoke (minor). High risk: enclosed space, winter, sleeping near running engines/heaters.",
    pathophysiology:
      "CO inhaled → binds Hgb (210x affinity of O2) → forms COHb (bright cherry red) → O2 carrying capacity reduced → Bohr effect leftward shift (O2 not released to tissues) → CO binds myoglobin (cardiac/muscle toxicity) + cytochrome c oxidase (mitochondrial inhibition) → cellular hypoxia even at normal PaO2 → brain/heart most vulnerable (high O2 demand) → CNS/cardiac dysfunction → death.",
    clinicalFeatures: [
      "Cherry-red skin/lips/mucous membranes (COHb in capillaries — classic postmortem finding)",
      "Severe frontal/global headache (earliest, most common symptom)",
      "Nausea and vomiting",
      "Dizziness, weakness, confusion (CO-Hgb 20-40%)",
      "Chest pain (cardiac toxicity — CO-Hgb >40%)",
      "Seizures and coma (CO-Hgb >50%)",
      "Death (CO-Hgb >60-70%)",
      "Pink lividity on autopsy (cherry-red postmortem staining)",
    ],
    investigations: [
      "COHb level: Gold standard — SpO2 pulse oximeter UNRELIABLE (reads COHb as OxyHgb) → must use CO-oximeter/ABG with CO-oximetry",
      "ABG: PaO2 may be NORMAL (dissolved O2 normal, only bound O2 reduced) — cannot rely on SpO2/PaO2 alone!",
      "ECG: Sinus tachycardia, ST changes, arrhythmias (cardiac toxicity)",
      "Cardiac enzymes: Troponin elevated (CO-induced myocardial damage)",
      "Neuroimaging CT/MRI: Bilateral globus pallidus hypodensity (classic CO poisoning finding on CT)",
      "PM findings: Cherry-red lividity, bright-red blood, cherry-red organs (especially lungs, liver)",
    ],
    treatment:
      "IMMEDIATE: 1) Remove patient from exposure to fresh air (protect rescuer — use SCBA in enclosed space). 2) 100% O2 via tight-fitting non-rebreather mask (CO half-life: 5h on room air → 60-90 min on 100% NRB O2). 3) Assess GCS. 4) IV access, cardiac monitoring. INDICATIONS FOR HYPERBARIC OXYGEN (HBO): COHb >25%, neurological symptoms (confusion/syncope/seizures), pregnancy (any COHb level), cardiac involvement, COHb >15% at any age >36yrs. HBO: 2.4-3 ATA for 90 min (CO half-life reduced to 20-30 min). 5) Seizures: Inj. Diazepam (Calmpose) 5-10mg IV. 6) Cerebral edema: Inj. Mannitol 1g/kg IV over 20 min. MONITORING: Repeat COHb q2h, ECG, cardiac enzymes.",
    complications: [
      "Delayed neuropsychiatric syndrome (DNS): memory loss, personality change, Parkinsonism — 10-30 days after apparent recovery",
      "Hypoxic-ischemic encephalopathy (bilateral globus pallidus infarction — classic CT finding)",
      "Acute myocardial injury (CO-myopathy)",
      "Rhabdomyolysis and AKI (prolonged hypoxia)",
      "ARDS (pulmonary edema from severe CO poisoning)",
    ],
    differentiatingFeature:
      "Cherry-red lividity (postmortem) + normal PaO2 with high COHb on CO-oximetry + bilateral globus pallidus hypodensity on CT = Carbon Monoxide poisoning. Distinguishes from cyanide poisoning (similar mechanism but bitter almond smell, no cherry-red color) and other asphyxias (cyanotic/blue lividity).",
    pearlPoints: [
      "NEET PG Classic: PaO2 is NORMAL in CO poisoning (dissolved O2 normal). SpO2 by pulse oximeter is FALSELY NORMAL (reads COHb as OxyHgb). Must use CO-oximeter!",
      "Delayed neuropsychiatric syndrome (DNS): Occurs 10-30 days after apparent recovery. Globus pallidus infarction = pathognomonic CT finding.",
      "CO affinity for Hgb: 210-250 times greater than O2. Half-life: 5h (room air) → 60-90 min (100% O2) → 20-30 min (HBO). Treatment goal: COHb <5%.",
      "PM finding: Cherry-red lividity and cherry-red blood (COHb remains red post-mortem). Distinguishes from other asphyxias (blue-purple lividity).",
      "Sources mnemonic 'CHEST': C=Coal, H=Heater (faulty), E=Engine exhaust, S=Smoke (fire), T=Tobacco (minor). Occupational: mine workers, garage mechanics at risk.",
    ],
    indianBrandDrugs: [
      "Inj. Diazepam (Calmpose) 5-10mg IV for seizures",
      "Inj. Mannitol 20% (Manitol) 1g/kg IV over 20 min for cerebral edema",
    ],
  },
  {
    name: "Organophosphorus Poisoning",
    subject: "Forensic",
    icd10: "T60.0",
    category: "Toxicology / Insecticide Poisoning",
    definition:
      "Acute or chronic poisoning by organophosphorus compounds (OPC), a class of organophosphate insecticides/nerve agents causing irreversible inhibition of acetylcholinesterase (AChE) enzyme, leading to accumulation of acetylcholine (ACh) at nerve synapses producing cholinergic toxidrome.",
    etiology:
      "Suicidal ingestion (most common cause of pesticide poisoning mortality in India — Endosulfan, Chlorpyrifos, Monocrotophos, Dichlorvos, Malathion, Parathion). Occupational exposure (agricultural workers — dermal/inhalation). Accidental food contamination. Bioterrorism (Sarin, VX nerve agents). India: one of highest OPC poisoning mortality countries globally.",
    pathophysiology:
      "OPC → irreversibly inhibits acetylcholinesterase (AChE) → ACh accumulates at muscarinic (parasympathetic + CNS) + nicotinic (NMJ + sympathetic ganglia) + CNS synapses → 3 syndromes: MUSCARINIC (SLUDGE): Salivation, Lacrimation, Urination, Defecation, GI cramps, Emesis + bradycardia + miosis + bronchospasm. NICOTINIC: Muscle fasciculations, weakness, paralysis (respiratory muscles), tachycardia. CNS: Seizures, coma, respiratory failure. AGING: OPC-AChE complex becomes irreversible after 24-48h (aging) — oximes useless after aging.",
    clinicalFeatures: [
      "SLUDGE: Excessive secretions (salivation, lacrimation, urination, diarrhea, GI cramps, emesis)",
      "Miosis: Pinpoint pupils (bilateral — classic)",
      "Bronchospasm and excessive bronchial secretions (wheezing, wet crackles)",
      "Bradycardia and hypotension (muscarinic)",
      "Muscle fasciculations: visible twitching (nicotinic NMJ)",
      "Muscle weakness and respiratory paralysis (nicotinic — most lethal)",
      "Seizures: tonic-clonic (CNS cholinergic excess)",
      "Altered consciousness: confusion → coma",
    ],
    investigations: [
      "Plasma cholinesterase (BuChE): Depressed <50% of normal = significant exposure. MOST PRACTICAL initial test.",
      "RBC cholinesterase (true AChE): More specific, depressed in OPC. Recovers slower.",
      "Urine organophosphate metabolites (alkyl phosphates — confirms OPC exposure)",
      "ECG: Prolonged QTc interval (risk of Torsades de Pointes), bradycardia",
      "ABG: Respiratory failure assessment (hypoxia/hypercapnia)",
      "Chest X-ray: Pulmonary edema, aspiration",
    ],
    treatment:
      "IMMEDIATE LIFE-SAVING (ABC first): 1) Decontamination: Remove clothing, wash skin with soap+water (protect staff — gloves + gown). Gastric lavage within 1h of ingestion (Airway secured first). 2) Specific antidotes: A) ATROPINE (Muscarinic antidote — FIRST LINE, large doses): 1-2 mg IV bolus → double every 5 min until secretions DRY (NOT pupils dilate). Endpoint: DRY secretions, clearing of bronchospasm. May need 20-100mg total in severe cases. Inj. Atropine sulfate available. B) PRALIDOXIME (PAM/2-PAM — Nicotinic antidote — oxime, AChE reactivator): MUST give within 48h (before aging). Inj. Pralidoxime (Contrathion/PAM-2) 1-2 g IV in 100mL NS over 15-30 min; then 0.5g/h infusion for 24-48h. Contraindicated in Carbamate poisoning. 3) Diazepam: Inj. Diazepam (Calmpose) 5-10mg IV for seizures. 4) ICU: Mechanical ventilation for respiratory failure (most common cause of death). 5) Benzodiazepines for seizures. Supportive care, electrolyte management.",
    complications: [
      "Intermediate syndrome (IMS): 24-96h after poisoning, proximal limb weakness + respiratory failure despite adequate atropinization — occurs after muscarinic symptoms resolve",
      "OPIDN (Organophosphorus-induced delayed neuropathy): 2-5 weeks post-exposure, distal sensorimotor neuropathy (peripheral nerve axonopathy)",
      "Recurrence: From fat-soluble OPCs (Fenthion) redistributing from adipose tissue",
      "Aspiration pneumonia (from excessive secretions)",
      "Cardiac arrhythmias (QTc prolongation → Torsades de Pointes)",
    ],
    differentiatingFeature:
      "SLUDGE + miosis + fasciculations + depressed plasma cholinesterase = OPC poisoning. Distinguishes from Carbamate poisoning (same symptoms but REVERSIBLE AChE inhibition — Pralidoxime CONTRAINDICATED in carbamates). Carbamate: self-limiting, spontaneous recovery without oximes.",
    pearlPoints: [
      "NEET PG Classic: Atropine is the FIRST-LINE antidote (muscarinic effects). Endpoint is DRY secretions — NOT pupil dilation. Give until 'atropinized' (dry mouth, tachycardia, clear chest).",
      "Pralidoxime (2-PAM): Reactivates AChE only if given within 24-48h (before 'aging' of OPC-AChE bond). Useless after aging. Contraindicated in Carbamate poisoning.",
      "Intermediate Syndrome (IMS): NEET PG favorite. Occurs 24-96h after OPC poisoning. Proximal muscle weakness + respiratory failure. Different from initial cholinergic crisis. Requires prolonged ventilation.",
      "Pupil in OPC poisoning: MIOSIS (pinpoint) from muscarinic stimulation. Ciliary muscle spasm. Contrast with Atropine poisoning (mydriasis — dilated pupils, dry mouth, tachycardia).",
      "Most common cause of poisoning death in rural India: Organophosphorus insecticides (Chlorpyrifos, Monocrotophos, Endosulfan). Suicidal intent most common.",
    ],
    indianBrandDrugs: [
      "Inj. Atropine sulfate (Atropine) 1-2mg IV, repeat q5min",
      "Inj. Pralidoxime chloride (Contrathion/PAM-2) 1-2g IV over 15-30 min",
      "Inj. Diazepam (Calmpose) 5-10mg IV for seizures",
      "Inj. Midazolam (Mezolam) 0.1-0.2mg/kg IV for refractory seizures",
    ],
  },
  {
    name: "Arsenic Poisoning",
    subject: "Forensic",
    icd10: "T57.0",
    category: "Toxicology / Heavy Metal Poisoning",
    definition:
      "Poisoning by arsenic (As), a metalloid element occurring as arsenic trioxide (As2O3 — rat poison/white arsenic), arsenite (As3+, more toxic), and arsenate (As5+); causing multisystem toxicity through enzyme inhibition (pyruvate dehydrogenase — As3+), uncoupling of oxidative phosphorylation (As5+), and DNA damage; with three clinical forms: acute, subacute, and chronic.",
    etiology:
      "Homicidal poisoning (arsenic trioxide — 'inheritance powder,' tasteless, odorless — classical homicidal poison in forensic history), suicidal, accidental (contaminated groundwater in Bengal/Bangladesh — arsenic in groundwater >50ppb, pesticide/wood preservative exposure). Industrial (smelting, semiconductor manufacturing). Chronic: groundwater contamination (West Bengal — Arsenicosis).",
    pathophysiology:
      "ACUTE (As2O3): GI mucosal damage (direct irritant) + arsenic absorbed → systemic distribution → enzyme inhibition (pyruvate dehydrogenase block → metabolic acidosis) + increased capillary permeability → profound fluid/electrolyte loss (cholera-like picture) → cardiovascular collapse. CHRONIC: Arsenic accumulates in keratin-rich tissues (hair, nails, skin) → Mee's lines, arsenical keratosis, Bowen's disease. Carcinogenic (lung, skin, bladder cancer).",
    clinicalFeatures: [
      "ACUTE: Garlic-like odor of breath/body",
      "Violent gastroenteritis: rice-water stools (arsenic cholera — resembles Asiatic cholera)",
      "Burning pain in throat/esophagus/abdomen",
      "Excessive thirst, vomiting",
      "Hypotension and cardiovascular collapse (rapid)",
      "CHRONIC (Arsenicosis): Raindrop pigmentation (hyperpigmentation + hypopigmentation)",
      "Arsenical keratosis: rough, warty skin on palms/soles",
      "Mee's lines: transverse white bands on nails (Aldrich-Mees lines)",
    ],
    investigations: [
      "ACUTE: Urine arsenic >50 mcg/L = exposure. >1000 mcg/L = acute poisoning. GOLD STANDARD: 24h urine arsenic.",
      "Hair/nail arsenic: Archives past exposure. Segmental hair analysis = timeline of poisoning (0.3cm/month). Mee's lines (nails) = exposure ~3-5 months prior.",
      "Reinsch test: Strip of clean copper + HCl + boiled with urine/blood → grey-black deposit on copper = arsenic (also selenium, bismuth, antimony — confirmatory with AAS).",
      "Atomic Absorption Spectroscopy (AAS): Gold standard for quantitation",
      "Abdominal X-ray: Radio-opaque arsenic in GI tract (acute ingestion)",
      "PM: Stomach odor of garlic, mucosal hemorrhages, Aldrich-Mees lines",
    ],
    treatment:
      "ACUTE: 1) Gastric lavage (within 1h, with tap water + 2% sodium bicarbonate). 2) Specific antidote: DIMERCAPROL (BAL — British Anti-Lewisite): Inj. Dimercaprol (BAL) 3-5mg/kg IM q4h for 2 days, then q12h for 7-10 days. Mechanism: BAL chelates arsenic (forms stable ring compound). 3) Alternatively: DMSA (Succimer) oral (less toxic than BAL) — Tab. Succimer 10mg/kg PO q8h x 5 days, then q12h x 14 days. 4) IV fluids (Ringer's lactate) — aggressive rehydration for rice-water diarrhea. 5) Electrolyte replacement. CHRONIC: DMSA chelation. Remove from exposure. Monitor: urine arsenic, blood count, LFT. Skin: emollients for keratosis.",
    complications: [
      "Peripheral neuropathy (subacute/chronic — sensorimotor, 'stocking-glove' distribution)",
      "Arsenical encephalopathy (acute — confusion, seizures, coma)",
      "Cardiovascular collapse and shock (acute)",
      "Skin cancers: Bowen's disease (SCC in situ), squamous cell carcinoma (chronic)",
      "Internal malignancies: lung cancer, bladder cancer, hepatocellular carcinoma (long-term chronic exposure)",
    ],
    differentiatingFeature:
      "Mee's lines (Aldrich-Mees lines) on ALL fingernails + raindrop pigmentation of skin + peripheral neuropathy = CHRONIC arsenic poisoning. Acute: garlic breath + rice-water diarrhea + Reinsch test positive. Groundwater source: West Bengal, Bangladesh (arsenic contamination >50ppb — ARSENICOSIS).",
    pearlPoints: [
      "NEET PG Classic: Mee's lines = transverse white bands across ALL nails. Each band = one episode of arsenic poisoning. 1 band at 3-5 months from tip = timing calculation.",
      "Reinsch test: Copper strip + HCl + heat with specimen → grey-black deposit = positive for As, Bi, Se, Sb. Confirmatory test: AAS (Atomic Absorption Spectroscopy).",
      "Chronic arsenicosis (groundwater): West Bengal + Bangladesh = most affected globally. Minimum 6-12 months exposure. 'Raindrop pigmentation' + keratosis on palms/soles = pathognomonic.",
      "Antidote: BAL (Dimercaprol) or DMSA (Succimer). BAL = first-line for acute, IM injection. DMSA = oral, safer for subacute/chronic. Do NOT use EDTA for arsenic (EDTA = for lead).",
      "Historical: Arsenic trioxide (white arsenic, As2O3) = 'inheritance powder' — classical homicidal poison (tasteless, odorless, slow acting). Napoleon's death attributed to chronic arsenic in wallpaper dyes.",
    ],
    indianBrandDrugs: [
      "Inj. Dimercaprol/BAL (BAL in Oil) 3-5mg/kg IM q4h",
      "Tab. Succimer/DMSA (Chemet) 10mg/kg PO q8h x 5 days",
    ],
  },
  {
    name: "Snake Bite",
    subject: "Forensic",
    icd10: "T63.0",
    category: "Toxicology / Envenomation",
    definition:
      "Envenomation by venomous snakes causing local tissue necrosis and/or systemic toxicity through two main venom types: neurotoxic (Elapidae — Cobra, Krait) causing neuromuscular blockade, or hemotoxic/vasculotoxic (Viperidae — Russell's Viper, Saw-scaled Viper) causing coagulopathy, fibrinolysis, and local tissue destruction; with 46,000 deaths/year in India (highest globally).",
    etiology:
      "India: Big Four snakes — Russell's Viper (Daboia russelii), Saw-scaled Viper (Echis carinatus), Common Krait (Bungarus caeruleus), Indian Cobra (Naja naja). Risk factors: barefoot farmers, night workers, rural areas, dry seasons. 70% bites on lower limbs.",
    pathophysiology:
      "NEUROTOXIC (Cobra/Krait): Postsynaptic neurotoxins (α-bungarotoxin) block ACh receptors at NMJ → descending paralysis (ptosis → bulbar → respiratory failure). Pre-synaptic (β-bungarotoxin) → prevents ACh release. HEMOTOXIC (Viper): Phospholipase A2 + hyaluronidase → local tissue necrosis/edema. Procoagulants → DIC → consumption coagulopathy (fibrinogen consumed → incoagulable blood). Metalloproteinases → direct endothelial damage → hemorrhage. Cardiotoxic: Russell's Viper → direct myocardial damage.",
    clinicalFeatures: [
      "NEUROTOXIC (Cobra/Krait): Ptosis (drooping of eyelids — first sign)",
      "Progressive descending paralysis: Ptosis → diplopia → bulbar palsy → respiratory failure",
      "Painless fang marks (Krait — nocturnal biting of sleeping persons, painless)",
      "HEMOTOXIC (Viper): Severe local pain, swelling, ecchymosis (extensive)",
      "Spontaneous bleeding: gums, IV sites, hematuria, hemoptysis",
      "Coagulopathy: prolonged 20-Minute Whole Blood Clotting Test (20WBCT)",
      "Acute kidney injury (Russell's Viper — direct nephrotoxicity)",
      "Cardiovascular collapse (shock)",
    ],
    investigations: [
      "20-Minute Whole Blood Clotting Test (20WBCT): GOLD STANDARD bedside test for viper envenomation. Fresh blood in clean glass tube — if not clotted in 20 min = coagulopathy (viperine envenomation confirmed).",
      "PT/aPTT/fibrinogen/D-dimer: DIC panel (fibrinogen <50mg/dL = severe)",
      "CBC: Thrombocytopenia, microangiopathic hemolytic anemia",
      "Renal function: Creatinine, BUN (Russell's Viper nephrotoxicity)",
      "ECG: ST changes, arrhythmias (cardiotoxic venoms)",
      "Urine: Hematuria, proteinuria (AKI monitoring)",
      "Wound examination: Fang marks, local tissue destruction, necrosis extent",
    ],
    treatment:
      "FIRST AID (Field): 1) Immobilize limb (splint, sling — NOT tourniquet). 2) Remove tight jewelry. 3) Mark swelling border + time. 4) Transport to hospital FAST. DO NOT: Cut and suck, apply tourniquet (causes necrosis), apply electric shock, apply ice. HOSPITAL TREATMENT: 1) Assess: WBCT, neuro exam. 2) Polyvalent Anti-Snake Venom (ASV): ONLY proven life-saving treatment. Indication: ANY sign of systemic envenomation (abnormal WBCT, ptosis, bleeding, AKI). Initial: 8-10 vials ASV (100mL NS IV over 60 min). Repeat 8-10 vials q6h if WBCT still abnormal (up to 20-30 vials in severe cases). PREMEDICATION: Inj. Adrenaline (Epinephrine) 0.25mg SC (prevents anaphylaxis to ASV). 3) Neostigmine (Prostigmin) + Atropine: For neurotoxic envenomation — neostigmine 0.01mg/kg IV (reverses postsynaptic neurotoxin in Cobra bite). 4) Mechanical ventilation: Respiratory failure in neurotoxic bites. 5) RRT (dialysis): AKI from Russell's Viper.",
    complications: [
      "Acute kidney injury (Russell's Viper — commonest cause of AKI in rural India)",
      "DIC and hemorrhage (viperine bites)",
      "Respiratory failure (neurotoxic bites — Cobra/Krait)",
      "Local tissue necrosis and gangrene (requiring amputation — Russell's Viper)",
      "Anaphylaxis from Anti-Snake Venom (ASV)",
    ],
    differentiatingFeature:
      "NEUROTOXIC (Cobra/Krait) = ptosis + descending paralysis + minimal local signs + normal WBCT. HEMOTOXIC (Russell's Viper/Echis) = severe local swelling/necrosis + spontaneous bleeding + abnormal WBCT (blood non-coagulable) + AKI. WBCT = simple bedside test to distinguish.",
    pearlPoints: [
      "NEET PG Classic: 20WBCT (20-Minute Whole Blood Clotting Test) = bedside gold standard for viperine envenomation. Normal clotting = neurotoxic. Non-clotting = hemotoxic = give ASV immediately.",
      "Anti-Snake Venom (ASV) — polyvalent (Bharat Serums) = only effective treatment. Not based on identifying species. Give if ANY systemic sign: ptosis/blurred vision OR abnormal WBCT OR spontaneous bleed OR AKI.",
      "Russell's Viper (Daboia russelii) = commonest cause of snakebite death in India. Direct nephrotoxicity causing AKI (commonest cause of AKI in rural India after snakebite).",
      "Neostigmine test: 0.5mg Neostigmine + 0.6mg Atropine IV → improvement of ptosis within 10 min = postsynaptic neurotoxin (Cobra bite). Krait: pre-synaptic toxin = does NOT respond to Neostigmine.",
      "'Big Four' in India: Cobra (Naja naja), Krait (Bungarus caeruleus), Russell's Viper (Daboia russelii), Saw-scaled Viper (Echis carinatus). Responsible for majority of India's 46,000 annual snakebite deaths.",
    ],
    indianBrandDrugs: [
      "Polyvalent Anti-Snake Venom (Bharat Serums ASV / VINS ASV) 8-10 vials IV",
      "Inj. Adrenaline (Epinephrine) 0.25mg SC premedication",
      "Inj. Neostigmine (Prostigmin) 0.5mg IV for neurotoxic",
      "Inj. Atropine 0.6mg IV with Neostigmine",
    ],
  },
  {
    name: "Burns — Medico-Legal Aspects",
    subject: "Forensic",
    icd10: "T31",
    category: "Thermal Injury / Medico-Legal",
    definition:
      "Thermal injury to tissues caused by flame, scalding (boiling liquids), contact (hot objects), chemical, electrical, or radiation; classified by depth (degree), extent (% TBSA using Rule of Nines/Lund and Browder), and mechanism; with medico-legal importance in distinction of antemortem vs postmortem burns, dowry death (bride burning), suicidal, homicidal, and accidental etiology.",
    etiology:
      "Accidental (household kitchen accidents, electrical — most common), suicidal (kerosene burns — common in young Indian females, dowry-related), homicidal (dowry death — most common cause of homicidal burns in India), industrial (occupational). India: highest global prevalence of flame burns in women (kitchen + dowry-related). Dowry Act 1961, Section 304B IPC.",
    pathophysiology:
      "Thermal energy → cellular protein denaturation → zone of coagulation (irreversible cell death) → zone of stasis (may recover or extend with inadequate care) → zone of hyperemia (inflammation, recovers). Systemic: massive plasma leak → hypovolemic shock (Burns shock — first 48h, Parkland formula). Inhalation injury: airway edema, CO poisoning, chemical bronchitis → early airway management critical. Post-burn: hypermetabolism, immunosuppression, infection risk.",
    clinicalFeatures: [
      "First degree (epidermal): Erythema + pain (sunburn-like), no blistering",
      "Second degree superficial (dermal): Blistering, moist red base, VERY PAINFUL",
      "Second degree deep (deep dermal): Pale/mottled, less pain (nerve endings damaged), takes >3 weeks",
      "Third degree (full thickness): Dry, leathery, white/brown/charred, PAINLESS (nerves destroyed)",
      "Fourth degree: Charring down to muscle/bone",
      "Burns >20% TBSA: Burns shock (hypovolemia, tachycardia, hypotension)",
      "Inhalation injury: Facial burns, singed nasal hair, carbonaceous sputum, hoarseness",
    ],
    investigations: [
      "Rule of Nines: Head+neck=9%, each arm=9%, chest=9%, abdomen=9%, back=18%, each leg=18%, perineum=1%",
      "Lund and Browder chart: More accurate (accounts for age-related variation)",
      "CBC, electrolytes, creatinine (baseline)",
      "ABG + COHb (inhalation injury/CO exposure)",
      "Urine myoglobin (electrical burns — rhabdomyolysis)",
      "PM burns: Vital reactions (hyperemia, inflammatory cells, blistering) = ANTEMORTEM. Absent = postmortem.",
      "PM: Pugilistic attitude (flexion posture from heat-contracted muscles) = does NOT indicate struggle",
    ],
    treatment:
      "IMMEDIATE: 1) Remove from source, cool with room-temperature water x 20 min (NOT ICE). 2) Airway: Early intubation if facial/oropharyngeal burns, hoarseness, stridor. 3) Fluid resuscitation (PARKLAND FORMULA): Total in 24h = 4 mL × Weight (kg) × %TBSA burned. Give HALF in first 8h, HALF in next 16h. Use Ringer's Lactate (not dextrose). 4) Pain: Inj. Morphine (Morphine sulphate) 0.1mg/kg IV titrated. 5) Tetanus prophylaxis: Inj. TT (Tetanus Toxoid) 0.5mL IM. 6) Wound: Silver sulfadiazine cream (Silverex/Burnheal) dressings. 7) Nutrition: Early enteral nutrition (>5000 kcal/day for major burns).",
    complications: [
      "Burns shock and acute hypovolemia (first 48h)",
      "Inhalation injury and ARDS (CO poisoning + chemical burns to airways)",
      "Sepsis (commonest cause of death after first 48h — Pseudomonas, Staph aureus)",
      "Contractures (scarring — physiotherapy essential)",
      "Marjolin's ulcer: Squamous cell carcinoma arising in chronic burn scar (late complication, >10 years)",
    ],
    differentiatingFeature:
      "ANTEMORTEM burns: vital reactions present (hyperemia, blistering with protein-rich fluid, inflammatory cells, COHb in blood if fire). POSTMORTEM burns: No vital reactions, dry charring without inflammation, pugilistic posture (heat artifact — NOT a sign of struggle — NEET PG favorite). DOWRY DEATH: Lower limb + back most involved (poured kerosene on sleeping victim).",
    pearlPoints: [
      "NEET PG Classic: Pugilistic posture (boxer's posture) in fire deaths = heat artifact (heat contracts flexor muscles) — does NOT indicate antemortem struggle. Frequently asked.",
      "Parkland formula: 4 mL × kg × %TBSA = total Ringer's Lactate in 24h. Half in first 8h (from TIME OF INJURY, not hospital arrival).",
      "Marjolin's ulcer = SCC arising in chronic burn scar (10-25 years later). Rapidly growing, aggressive, poor prognosis. Must biopsy any ulcer in old burn scar.",
      "Dowry death (India): Burns on back + lower limbs (poured on sleeping victim). Section 304B IPC: husband/in-laws convicted if death within 7 years of marriage with dowry harassment.",
      "Zone of Coagulation (irreversible) > Zone of Stasis (salvageable with good care) > Zone of Hyperemia (spontaneous recovery). Goal of burn management: prevent zone of stasis from extending to coagulation.",
    ],
    indianBrandDrugs: [
      "Ringer's Lactate IV (Parkland formula)",
      "Inj. Morphine sulphate 0.1mg/kg IV for pain",
      "Silver sulfadiazine cream 1% (Silverex/Burnheal) for wound",
      "Inj. Tetanus Toxoid 0.5mL IM",
    ],
  },
  {
    name: "Head Injury — Epidural vs Subdural Hematoma",
    subject: "Forensic",
    icd10: "S06.4",
    category: "Traumatic Head Injury / Medico-Legal",
    definition:
      "Intracranial hemorrhage secondary to head trauma; Epidural Hematoma (EDH): arterial blood collection between skull and dura mater (usually middle meningeal artery rupture — pterion fracture), classically with lucid interval; Subdural Hematoma (SDH): venous blood collection between dura and arachnoid from bridging vein rupture, classified as acute (<3 days), subacute (3-21 days), chronic (>21 days).",
    etiology:
      "EDH: Young adults, direct blow to temporal region (pterion — thinnest part of skull), road traffic accidents, assault (blunt force). SDH: Elderly (brain atrophy = stretched bridging veins), infants (shaken baby syndrome — no external trauma), fall from height, road traffic accidents, alcoholics (cortical atrophy). Acute SDH: High-velocity trauma. Chronic SDH: Minor trauma (may not recall).",
    pathophysiology:
      "EDH: Fracture of temporal bone → rupture of middle meningeal artery (or vein) → rapid arterial bleeding → hematoma expands under arterial pressure → uncal herniation → CN III compression (unilateral dilated pupil — 'blown pupil') → brainstem compression → death. SDH: Acceleration-deceleration → bridging veins (from cortex to sinuses) tear → venous blood accumulates → slow expansion (venous pressure) → cerebral compression.",
    clinicalFeatures: [
      "EPIDURAL HEMATOMA: Classic LUCID INTERVAL (immediate LOC → brief recovery → deterioration) — present in 30-50% only",
      "Unilateral dilated pupil (CN III compression by uncal herniation — ipsilateral to hematoma)",
      "Contralateral hemiparesis",
      "Headache, vomiting (raised ICP)",
      "Rapid deterioration from baseline",
      "SUBDURAL HEMATOMA (Acute): No lucid interval (typically), immediate deterioration",
      "Diffuse neurological deficits (venous, bilateral)",
      "Chronic SDH: weeks later — headache, confusion, mild weakness (elderly, may mimic dementia)",
    ],
    investigations: [
      "CT head (NON-CONTRAST) — FIRST LINE, IMMEDIATE: EDH: Biconvex (lens-shaped) hyperdense collection (arterial blood). SDH: Crescent-shaped hyperdense (acute) or hypodense (chronic) collection following brain contour.",
      "EDH: Associated temporal bone fracture (>90% cases)",
      "SDH: No fracture usually (bridging vein rupture)",
      "ICP monitoring: In severe TBI",
      "MRI brain: Better for subacute/chronic SDH, brainstem injuries",
      "CBC, coagulation (PT, aPTT) — especially chronic SDH (anticoagulant use)",
    ],
    treatment:
      "IMMEDIATE: ABC — Airway (intubate GCS <8), Breathing (SpO2 >95%), Circulation (SBP >90mmHg). Raise head of bed 30°. Avoid hypotonic fluids. RAISED ICP management: Inj. Mannitol (Manitol) 0.25-1g/kg IV. Controlled hyperventilation (PCO2 30-35 mmHg) for acute herniation only. SURGICAL TREATMENT (definitive): EDH: EMERGENCY craniotomy/burr holes — any EDH >10mm thick or >5mm midline shift → surgery within 1 hour of diagnosis. SDH Acute: Craniotomy if >10mm thick or >5mm shift. SDH Chronic: Burr hole drainage if symptomatic.",
    complications: [
      "Brain herniation and death (EDH — rapidly fatal without surgery)",
      "Permanent neurological deficit (motor, speech, cognitive)",
      "Epilepsy (post-traumatic seizures — prophylaxis with Phenytoin)",
      "Chronic vegetative state",
      "Diffuse axonal injury (DAI — shearing forces, no CT findings initially)",
    ],
    differentiatingFeature:
      "EDH = BICONVEX lens-shaped hyperdense on CT + temporal bone fracture + lucid interval + YOUNG patient + middle meningeal artery rupture. SDH = CRESCENT-SHAPED following brain contour + NO fracture + elderly/alcoholic/infant + bridging vein rupture. CT shape is the KEY distinguishing feature.",
    pearlPoints: [
      "NEET PG Classic: EDH = Biconvex (lenticular) hyperdense on CT. SDH = Crescent-shaped hypodense/isodense/hyperdense (depends on age of hematoma). CT shape is most commonly asked.",
      "Lucid interval in EDH: Classic teaching but ONLY present in 30-50%. Absence does NOT rule out EDH. Any head injury patient: CT head immediately.",
      "Pterion: Thinnest part of skull. H-shaped intersection of frontal, parietal, temporal, sphenoid bones. Fracture here → middle meningeal artery rupture → EDH.",
      "Shaken baby syndrome: SDH without external trauma. Retinal hemorrhages + SDH + no skull fracture in infant = pathognomonic. Must report to child protection.",
      "Chronic SDH management: Burr hole drainage. Small/asymptomatic: may observe. Recurrence common (20-30%) — may need drain.",
    ],
    indianBrandDrugs: [
      "Inj. Mannitol 20% (Manitol) 0.25-1g/kg IV over 20 min",
      "Tab. Phenytoin (Eptoin) 5mg/kg/day PO for seizure prophylaxis",
      "Inj. Levetiracetam (Keppra) 1000mg IV BD alternative",
    ],
  },
  {
    name: "Stab Wounds — Medico-Legal Classification",
    subject: "Forensic",
    icd10: "T14.1",
    category: "Wound Ballistics / Medico-Legal",
    definition:
      "Sharp force trauma causing cutaneous and deeper tissue injury, classified into: Incised wounds (cuts — length > depth, sharp edge), Stab wounds (puncture wounds — depth > length, sharp point), Chop wounds (combination of incised + laceration by heavy weapon — axe/machete), and Lacerated wounds (blunt force — torn, irregular edges with bridging strands); each with specific medico-legal characteristics for weapon identification and manner of death determination.",
    etiology:
      "Homicidal (stab and chop wounds most commonly homicidal), suicidal (incised wounds of wrist, throat — hesitation marks), accidental (rare). India: sharp weapon injuries common in road traffic accidents and inter-personal violence. Section 302 IPC (murder), 304 (culpable homicide), 307 (attempt to murder).",
    pathophysiology:
      "INCISED WOUND: Sharp cutting edge → clean tissue division with minimal bridging. Arteries and veins cut cleanly → profuse bleeding. Pain stimulates reflex vasoconstriction. Deep wounds → pneumothorax (chest), peritonitis (abdomen), hemarthrosis. STAB WOUND: Pointed weapon → puncture wound. Penetrating depth determined by handle impact mark (hilt mark). Organ damage depends on trajectory. Single entrance, organ injury may be distant from surface wound.",
    clinicalFeatures: [
      "INCISED WOUND: Clean margins, spindle-shaped, bleeds profusely, length > depth",
      "STAB WOUND: Small entrance, depth > length, may have hilt mark (weapon fully inserted)",
      "CHOP WOUND: Extensive tissue damage, bone involvement, clean-cut edges with tissue crushing",
      "LACERATED WOUND: Irregular margins, bridging strands of tissue, contaminated, less bleeding",
      "Hesitation cuts: Multiple superficial parallel wounds = suicidal (self-inflicted)",
      "Defense wounds: Incised wounds on hands/forearms = victim defended themselves (homicidal)",
      "Vital reactions: Bleeding, inflammation around wound = antemortem injury",
    ],
    investigations: [
      "PM wound examination: Measure dimensions (length, width, depth), shape, margins, edges",
      "Weapon identification: Wound track shape, hilt mark, wound dimensions match weapon",
      "Vital reactions: Histology (inflammation, hemorrhage) = antemortem wound. Absent = postmortem artifact.",
      "Blood pattern analysis: Spattering direction, castoff pattern, arterial spurting",
      "Toxicology: Alcohol/drugs in victim (incapacitation?)",
      "Forensic photography: Wound documentation before autopsy",
      "Wound track dissection: Internal organ injuries, hemorrhage estimation",
    ],
    treatment:
      "EMERGENCY (hospital): 1) ABC — Airway, Breathing (decompress tension pneumothorax if tracheal deviation + absent breath sounds: needle thoracocentesis at 2nd ICS MCL). 2) Control external hemorrhage: direct pressure, tourniquet (limbs). 3) IV access x2 large bore, Ringer's Lactate fast. 4) FAST ultrasound (focused abdominal sonography for trauma): pericardial/peritoneal free fluid. 5) Surgical consult: Exploratory laparotomy (evisceration, peritonism, hemorrhagic shock). 6) Chest tube (hemopneumothorax). 7) MLC (Medico-Legal Case) reporting mandatory. 8) Preserve wound margins for forensic examination (do NOT extend wounds during surgical exploration without marking original margins).",
    complications: [
      "Hemorrhagic shock (major vessel injury)",
      "Hemopneumothorax (chest stab)",
      "Bowel perforation and peritonitis (abdominal stab)",
      "Cardiac tamponade (precordial stab — Beck's triad: hypotension, JVD, muffled heart sounds)",
      "Infection and sepsis (contaminated wounds)",
    ],
    differentiatingFeature:
      "INCISED (cut) = Length > Depth + Clean margins + Profuse bleeding + Hesitation marks (suicidal). STAB = Depth > Length + Hilt mark possible + Small entrance. LACERATED (blunt force) = Irregular margins + Bridging strands of connective tissue across wound + Less bleeding. Bridging strands = diagnostic of laceration (blunt force).",
    pearlPoints: [
      "NEET PG Classic: Bridging strands of tissue across wound = LACERATED wound (blunt force). Clean margins, no bridging = incised or stab (sharp force). Frequently asked differentiation.",
      "Hesitation marks: Multiple parallel superficial incised wounds = suicidal. Present on accessible areas (wrist, neck, forearm). Absence does NOT exclude suicide.",
      "Defense wounds: Incised wounds on ulnar border of hand/forearm = victim attempted to block weapon = homicidal. Medico-legal importance: proves struggle.",
      "Hilt mark/Guard mark: Contusion matching weapon handle at wound entrance = stab wound depth = full length of blade. Important for weapon identification.",
      "Manner of death classification (Forensic): Incised wounds of throat = usually homicidal (cannot complete by self). Wrist incised = suicidal or accidental. Multiple deep stab wounds = homicidal.",
    ],
  },
  {
    name: "Sudden Infant Death Syndrome (SIDS)",
    subject: "Forensic",
    icd10: "R95",
    category: "Medico-Legal / Infant Mortality",
    definition:
      "Sudden and unexpected death of an apparently healthy infant <1 year of age (peak 2-4 months) that remains unexplained after thorough postmortem examination including complete autopsy, review of medical history, and investigation of scene; a diagnosis of exclusion after ruling out all identifiable causes of death.",
    etiology:
      "Multifactorial: Triple risk model (vulnerable infant + critical developmental period + exogenous stressor). Risk factors: PRONE SLEEPING POSITION (most important modifiable risk), soft bedding, overheating, parental smoking (pre/post-natal), premature birth, low birth weight, previous sibling SIDS, formula feeding (vs breastfeeding protective), maternal substance abuse, co-sleeping with intoxicated parents.",
    pathophysiology:
      "NOT fully understood. Leading theories: 1) Brainstem serotonin receptor defect → impaired arousal response to hypoxia/hypercapnia (failure to arouse from sleep when CO2 rises). 2) QT prolongation (cardiac arrhythmia during sleep). 3) Brainstem autonomic dysfunction. Combined with: prone position (CO2 rebreathing, reduces arousal) → silent fatal hypoxia during sleep.",
    clinicalFeatures: [
      "Sudden unexpected death in apparently healthy infant",
      "Age: 2-4 months (peak), rare <1 month and >6 months",
      "Found in morning (during overnight sleep)",
      "No apparent cause at scene",
      "Minor findings: frothy blood-tinged fluid from mouth/nose (pulmonary edema)",
      "Petechiae on thymic surface (common PM finding — NOT a sign of asphyxia)",
      "PM: Lungs congested, brain edema (non-specific)",
      "No evidence of injury or disease at autopsy (diagnosis by exclusion)",
    ],
    investigations: [
      "Complete postmortem (autopsy): Mandatory in all SIDS cases. Rule out: NAI (non-accidental injury — fractures, retinal hemorrhage), infection (meningitis, myocarditis), metabolic disease (MCAD deficiency), cardiac arrhythmia (QT prolongation — genetic).",
      "Scene investigation: Sleep position, bedding, temperature, co-sleeping",
      "Medical history review: Birth history, previous illnesses, vaccinations",
      "Genetics: MCAD gene analysis, long QT syndrome genes (KCNQ1, KCNH2, SCN5A)",
      "Microbiology: Viral studies (respiratory virus screen)",
      "Histopathology: Brainstem serotonin receptors (research)",
    ],
    treatment:
      "No treatment (infant found deceased). PREVENTION (Back to Sleep campaign — AAP 1992): 1) SUPINE sleeping position ALWAYS (most important). 2) Firm, flat sleep surface (no soft bedding, pillows, bumpers). 3) Room sharing (not bed sharing). 4) Avoid overheating. 5) Smoke-free environment (pre/postnatal). 6) Breastfeeding (protective). 7) Pacifier use during sleep (protective mechanism unknown). 8) Avoid alcohol/drug use by caregivers. Post-event: Family support, counseling, grief support. Siblings: increased risk — refer for monitoring. India: National guidelines per NHM on safe infant sleep practices.",
    complications: [
      "Not applicable — infant death. Parental complications: complicated grief, PTSD, depression, marriage breakdown",
      "Sibling risk: 3-5x increased risk in subsequent children",
      "Medicolegal: Must exclude NAI (non-accidental injury = infanticide) before certifying SIDS",
    ],
    differentiatingFeature:
      "SIDS vs INFANTICIDE: SIDS — no signs of injury, no neck petechiae, no bruising, normal autopsy findings (minor petechiae on thymus common). INFANTICIDE — signs of smothering (perioral bruising), fingernail marks, retinal hemorrhages, bilateral rib fractures, metaphyseal fractures = NON-ACCIDENTAL INJURY (NAI). PM thymic petechiae alone is NOT diagnostic of smothering.",
    pearlPoints: [
      "NEET PG Classic: SIDS diagnosis requires COMPLETE AUTOPSY + SCENE INVESTIGATION + MEDICAL HISTORY review. Diagnosis of EXCLUSION — cannot certify without full workup.",
      "Most important risk factor: PRONE SLEEPING POSITION. Back to Sleep campaign (1992) reduced SIDS rates by 50% in USA. Supine = safe.",
      "Peak incidence: 2-4 months age. Coincides with waning maternal antibodies + immature arousal response. Rare before 1 month or after 6 months.",
      "Thymic petechiae: Common PM finding in SIDS — NOT diagnostic of asphyxia/smothering (occurs from minor terminal hypoxia in any cause of death).",
      "MCAD deficiency (Medium-chain acyl-CoA dehydrogenase deficiency): Metabolic cause must be excluded in all SIDS. Presents as SIDS-like sudden death. Screened in neonatal metabolic panel.",
    ],
  },
];

// Community Medicine — Batch 4 Part B
// Source: Park's Textbook of Preventive & Social Medicine 27th Ed, ICMR 2025, NTEP, NVBDCP, NACP India
export const communityDiseases: DiseaseEntry[] = [
  {
    name: "Tuberculosis (TB) — NTEP Protocol",
    subject: "Community",
    icd10: "A15.0",
    category: "Communicable Disease / National Programme",
    definition:
      "Chronic infectious disease caused by Mycobacterium tuberculosis complex (Koch's bacillus), primarily affecting lungs (pulmonary TB — 80%), but capable of involving any organ (extrapulmonary TB); transmitted via respiratory droplets; a major public health problem in India contributing ~26% of global TB burden (2.8 million new cases annually, highest globally).",
    etiology:
      "Causative agent: M. tuberculosis (most common), M. bovis (cattle, zoonotic — decreasing). Transmission: Airborne (droplet nuclei, 1–5 μm — remain suspended for hours), direct contact rare. Risk factors: HIV co-infection (greatest risk — 20–30×), malnutrition, diabetes, immunosuppression (corticosteroids, TNF inhibitors), silicosis, alcoholism, overcrowding, poor ventilation, smoking.",
    pathophysiology:
      "Inhalation of droplet nuclei → alveolar macrophages ingest mycobacteria → M. tb resists phagocytic killing (inhibits phagolysosome fusion) → granuloma formation (Ghon's focus — primary complex) → latent TB infection (LTBI — 90% of infected, never progress). Active TB: Cell-mediated immunity fails → caseous necrosis → cavity formation → infectious. Drug-resistant: MDR-TB (resistant to H+R), XDR-TB (MDR + quinolone + injectable).",
    clinicalFeatures: [
      "Cough >2 weeks (cardinal symptom — must screen all patients)",
      "Hemoptysis (blood in sputum — advanced/cavitary disease)",
      "Night sweats (cholinergic, systemic — drenching, damp pillow)",
      "Evening rise of temperature (low-grade pyrexia, peaks 38–38.5°C)",
      "Significant weight loss (>10% body weight — constitutional symptom)",
      "Fatigue and loss of appetite (systemic inflammation)",
      "Chest pain (pleurisy — extrapulmonary spread to pleural space)",
      "Miliary TB: acute onset fever, dyspnea, diffuse bilateral nodular infiltrates (snowstorm appearance on CXR)",
    ],
    investigations: [
      "Sputum CBNAAT (GeneXpert MTB/RIF): GOLD STANDARD first-line per NTEP. Detects M. tb AND rifampicin resistance in 2 hours. Mandatory for all presumptive TB cases.",
      "Sputum AFB smear (ZN stain): 3 sputum samples, 2 on consecutive days. Sensitivity 40–60% (less than CBNAAT). Still used in peripheral areas.",
      "Chest X-ray: Upper lobe infiltrates, cavities, miliary pattern. NOT diagnostic alone — must have bacteriological confirmation.",
      "Mantoux test (TST): 2TU PPD intradermally. Read at 48–72h. Induration >10mm = positive in Indian context (does NOT diagnose active disease).",
      "IGRA (Interferon-Gamma Release Assay): Better for LTBI diagnosis (not affected by BCG status). QuantiFERON-TB Gold.",
      "Sputum culture + DST (Drug Sensitivity Testing): Lowenstein-Jensen medium, 6–8 weeks. Required for MDR/XDR-TB.",
      "HIV testing: Mandatory for ALL TB patients (ICTC/PPTCT referral per NACP-NTEP co-ordination).",
    ],
    treatment:
      "NTEP (National Tuberculosis Elimination Programme) — WEIGHT-BASED DAILY DOSING (since 2019, replaced thrice-weekly DOT): REGIMEN 2HRZE/4HR: Intensive phase (2 months): H (Isoniazid 5mg/kg) + R (Rifampicin 10mg/kg) + Z (Pyrazinamide 25mg/kg) + E (Ethambutol 15mg/kg) DAILY. Continuation phase (4 months): H + R DAILY. FDC (Fixed Dose Combination) tablets: 4-drug FDC (HRZE) + 2-drug FDC (HR) weight-based — available at DOTS centers FREE. DOT (Direct Observed Treatment): mandatory — supervised by ASHA/healthcare worker. NIKSHAY NOTIFICATION: Mandatory within 24h of diagnosis. NIKSHAY POSHAN YOJANA: Rs.500/month nutritional support for all TB patients. MDR-TB: Cat IV regimen (Bedaquiline + Delamanid + SLID based) — 18–20 months. ALL TB treatment FREE through NTEP.",
    complications: [
      "MDR-TB (Multidrug-resistant: H+R resistance) — India has ~130,000 MDR-TB cases/year (2nd highest globally)",
      "HIV-TB co-infection (20–30× risk — TB is leading cause of death in PLHIV in India)",
      "Hemoptysis (massive — Rasmussen's aneurysm in cavitary TB)",
      "Pleuritis, pericarditis, meningitis (extrapulmonary spread)",
      "Post-TB lung damage (bronchiectasis, fibrosis, aspergilloma in old cavities)",
    ],
    differentiatingFeature:
      "TB vs Lung cancer in India: TB — young patient, fever+night sweats+cough, upper lobe cavity/infiltrate, AFB positive/CBNAAT positive, responds to anti-TB treatment. Lung cancer — older smoker, hemoptysis without systemic features, hilar mass + lymphadenopathy, cytology/biopsy positive. BOTH can coexist — must exclude TB in all suspected lung cancer in India. CBNAAT negativity does not exclude TB (sensitivity ~87%).",
    pearlPoints: [
      "NEET PG Classic: India's NTEP regimen = 2HRZE/4HR (daily dosing, weight-based, FDC tablets since 2019). DOT (Direct Observed Treatment) mandatory. ALL TB patients notified on NIKSHAY within 24h.",
      "CBNAAT (GeneXpert MTB/RIF) = first-line test per NTEP. Detects MTB AND rifampicin resistance in 2 hours. Replaced sputum smear as primary diagnostic in NTEP (2019 onwards).",
      "Nikshay Poshan Yojana: Rs.500/month nutritional incentive for TB patients — direct benefit transfer (DBT) to bank account. Part of India's TB elimination strategy (TB-free India target: 2025, ahead of SDG target 2030).",
      "MDR-TB definition: Resistance to at minimum Isoniazid (H) AND Rifampicin (R) simultaneously. India = 2nd highest MDR-TB burden globally. Bedaquiline-based oral regimens preferred per NTEP 2023.",
      "BCG vaccine: Protects against miliary TB and TB meningitis in children (NOT adult pulmonary TB). Given at birth in UIP. Mantoux >10mm = significant in India (does NOT differentiate LTBI from active TB alone).",
    ],
    icmrProtocol:
      "NTEP (National Tuberculosis Elimination Programme) India 2023. All TB patients: free DOTS regimen, NIKSHAY notification mandatory, NIKSHAY Poshan Yojana Rs.500/month, HIV testing mandatory at ICTC.",
    indianBrandDrugs: [
      "NTEP FDC Tablets (FREE): HRZE 4-drug FDC + HR 2-drug FDC (weight-based dosing)",
      "Tab. Isoniazid (INH/Isonex) 5mg/kg/day",
      "Tab. Rifampicin (Macox-R/Rifampin) 10mg/kg/day",
      "Tab. Pyrazinamide (Pyrafat/PZA) 25mg/kg/day",
      "Tab. Ethambutol (Myambutol/EMB) 15mg/kg/day",
    ],
  },
  {
    name: "Malaria — NVBDCP Protocol",
    subject: "Community",
    icd10: "B54",
    category: "Vector-Borne Disease / National Programme",
    definition:
      "Protozoan infection caused by Plasmodium species (P. falciparum — most lethal, P. vivax — most common in India, P. malariae, P. ovale, P. knowlesi) transmitted by bite of infected female Anopheles mosquito; characterized by cyclical fever, chills, rigors, and systemic complications; a major public health problem under NVBDCP (National Vector Borne Disease Control Programme) with 1.6 million cases/year in India.",
    etiology:
      "Causative organisms: P. falciparum (cerebral malaria, most fatal), P. vivax (most prevalent in India — 60–65% cases; relapses from liver hypnozoites), P. malariae (quartan malaria), P. ovale (rare in India). Vector: Female Anopheles mosquito (dusk-to-dawn biter, breeds in clear, clean stagnant water — ponds, rice fields). High-burden states: Odisha, Jharkhand, Chhattisgarh, NE India (tribal belt).",
    pathophysiology:
      "Sporozoites injected → hepatocytes → pre-erythrocytic schizogony (liver stage, 7–14 days) → merozoites released → RBC invasion → erythrocytic schizogony → rupture of RBCs every 48h (P. falciparum/vivax/ovale) or 72h (P. malariae) → fever spikes with merozoite release. P. vivax/ovale: hypnozoites persist in liver → relapses months–years later. P. falciparum: cytoadherence (PfEMP1 on RBCs) → cerebral/organ sequestration → cerebral malaria, ARDS, AKI.",
    clinicalFeatures: [
      "Classic malarial paroxysm: COLD stage (rigor, chattering teeth, 15–60 min) → HOT stage (fever 104–106°F, 2–6 hrs) → SWEATING stage (profuse sweating, defervescence)",
      "P. vivax: Tertian fever — every 48h (every 3rd day counting inclusively)",
      "P. malariae: Quartan fever — every 72h (every 4th day)",
      "P. falciparum: Irregular, continuous fever (no classic paroxysm — multiple RBC cohorts rupturing asynchronously)",
      "Splenomegaly (repeated malaria → Bignami–Frugoni spleen; tropical splenomegaly in chronic vivax)",
      "Hepatomegaly (tender, mild jaundice from hemolysis)",
      "Anemia (hemolytic — RBC destruction + bone marrow suppression)",
      "SEVERE MALARIA (P. falciparum): Cerebral malaria (unrousable coma — WHO definition), hypoglycemia, severe anemia (<5g/dL), ARDS, AKI, jaundice (>3mg/dL), blackwater fever (massive hemoglobinuria)",
    ],
    investigations: [
      "Peripheral blood smear thick + thin: GOLD STANDARD. Thick smear: screening (sensitivity). Thin smear: species identification + parasite density. P. falciparum: banana/crescent-shaped gametocytes, multiple ring forms/RBC, no RBC enlargement. P. vivax: enlarged RBCs + Schüffner's dots (pink stippling) + ameboid trophozoites.",
      "Rapid Diagnostic Test (RDT — malaria antigen): HRP-2 antigen for P. falciparum + pLDH for P. vivax. Result in 15 minutes. Used in field/peripheral health facilities.",
      "Quantitative Buffy Coat (QBC): Fluorescence acridine orange staining — rapid, sensitive.",
      "PCR: Highest sensitivity, species differentiation, mixed infections; reference/research labs.",
      "Blood sugar: Mandatory in all cases (severe malaria/quinine causes hypoglycemia).",
      "CBC: Hemoglobin (anemia), platelets (thrombocytopenia — characteristic of P. falciparum).",
    ],
    treatment:
      "NVBDCP India Protocol 2023: P. VIVAX: Chloroquine 25mg base/kg over 3 days (Day1: 10mg/kg, Day2: 10mg/kg, Day3: 5mg/kg) + Primaquine 0.25mg/kg/day × 14 days (radical cure — eliminates hypnozoites, prevents relapse). Check G6PD before Primaquine (risk of hemolytic anemia in G6PD-deficient patients). P. FALCIPARUM: ACT (Artemisinin Combination Therapy) — Artesunate 4mg/kg + Amodiaquine 10mg/kg DAILY × 3 days (Tab. Co-Arinate/Artesunate-Amodiaquine). Add Primaquine 0.75mg/kg single dose (gametocyte clearance). SEVERE P. FALCIPARUM: Inj. Artesunate (preferred over quinine per WHO 2015) 2.4mg/kg IV at 0, 12, 24h then daily × 7 days. ICU support: glucose (10% dextrose for hypoglycemia), blood transfusion (Hb <5g/dL), renal replacement therapy (AKI). PREVENTION: LLIN (Long-Lasting Insecticidal Nets — free distribution NHM), IRS (Indoor Residual Spraying — Deltamethrin/Malathion), larval source management (anti-larval measures).",
    complications: [
      "Cerebral malaria (P. falciparum — unarousable coma, mortality 15–25% even with treatment)",
      "Blackwater fever (massive intravascular hemolysis → hemoglobinuria → AKI — dark cola-colored urine)",
      "Acute Respiratory Distress Syndrome (non-cardiogenic pulmonary edema)",
      "Hypoglycemia (quinine stimulates insulin secretion; or disease-related impaired hepatic gluconeogenesis)",
      "Hyperreactive malarial splenomegaly / Tropical Splenomegaly Syndrome (repeated P. vivax — massive splenomegaly, risk of rupture)",
    ],
    differentiatingFeature:
      "P. falciparum vs P. vivax on blood smear: P. falciparum = small delicate ring forms, MULTIPLE rings per RBC (double chromatin dots), no RBC enlargement, BANANA-SHAPED (crescent) gametocytes — pathognomonic. P. vivax = ENLARGED RBCs + SCHÜFFNER'S DOTS (pink stippling of RBC cytoplasm) + ameboid trophozoites + NO banana gametocytes. Banana/crescent gametocytes = P. falciparum ONLY — most asked NEET PG identification.",
    pearlPoints: [
      "NEET PG Classic: Banana/crescent-shaped gametocytes = P. FALCIPARUM only. Schüffner's dots (RBC stippling) = P. VIVAX and P. OVALE. Most commonly asked species identification question.",
      "Hypnozoites: Dormant liver stage of P. vivax and P. ovale. Cause relapses months–years later. Primaquine is the ONLY drug that eliminates hypnozoites (radical cure). Always check G6PD status before prescribing.",
      "Cerebral malaria: WHO definition = unarousable coma (GCS <11 in adults, Blantyre <3 in children) + P. falciparum parasitemia + no other cause of coma. Mortality 15–25%. IV Artesunate = treatment of choice.",
      "G6PD deficiency: Must test before Primaquine — G6PD-deficient patients (X-linked, more common in South India, tribal populations) develop hemolytic anemia. Use weekly Primaquine regimen (0.75mg/kg/week × 8 weeks) for G6PD-deficient P. vivax patients.",
      "NVBDCP strategy: Annual Parasite Incidence (API) = cases per 1000 population/year. API >2 = high endemic area. India target: Zero indigenous malaria transmission by 2030. LLIN + IRS + ACT = core interventions.",
    ],
    icmrProtocol:
      "NVBDCP India 2023: Chloroquine + Primaquine (14 days) for vivax; ACT (Artesunate-Amodiaquine) for falciparum. Severe malaria: IV Artesunate. G6PD testing mandatory before Primaquine.",
    indianBrandDrugs: [
      "Tab. Chloroquine (Lariago/Resochin) 500mg base",
      "Tab. Primaquine (Malirid) 7.5mg or 15mg",
      "Tab. Artesunate+Amodiaquine (Co-Arinate/Falcigo+Amodiaquine) 100+270mg",
      "Inj. Artesunate (Falcigo/Artecef) 60mg vial IV for severe malaria",
    ],
  },
  {
    name: "Dengue Fever — National Dengue Control Programme",
    subject: "Community",
    icd10: "A90",
    category: "Vector-Borne Disease / Arboviral",
    definition:
      "Acute febrile arboviral illness caused by Dengue virus (DENV, 4 serotypes — DENV 1–4, Flaviviridae), transmitted by Aedes aegypti (primary) and Aedes albopictus (secondary) mosquitoes; ranging from undifferentiated fever to severe dengue with plasma leakage (Dengue Hemorrhagic Fever — DHF) and Dengue Shock Syndrome (DSS); India has the largest dengue burden in Southeast Asia (seasonal peaks July–November post-monsoon).",
    etiology:
      "Causative: Dengue virus (DENV 1–4). Vector: Aedes aegypti — daytime biter, breeds in clean stagnant water in artificial containers (tyres, coolers, flower pots, water storage — peridomestic breeding). Previous infection with one serotype → antibody-dependent enhancement (ADE) → more severe disease on second infection with different serotype (secondary infection more dangerous). India: major outbreaks in Delhi, Mumbai, Chennai, Rajasthan annually.",
    pathophysiology:
      "Aedes bite → DENV enters bloodstream → infects macrophages/monocytes → systemic viremia → cytokine storm (TNF-α, IL-6, IFN-γ) → increased vascular permeability → plasma leakage → effusions/hemoconcentration/thrombocytopenia. DENGUE FEVER (DF): self-limiting, no plasma leakage. DHF (Dengue Hemorrhagic Fever): plasma leakage + hemorrhage + thrombocytopenia (<100,000/mm³) + hematocrit rise >20%. DSS (Dengue Shock Syndrome): DHF + shock (narrow pulse pressure <20mmHg or hypotension).",
    clinicalFeatures: [
      "Sudden high-grade fever (saddleback/biphasic fever: fever → brief afebrile → second fever peak around Day 5–6)",
      "Severe retro-orbital pain (pathognomonic feature — pain behind eyes, worse on eye movement)",
      "Severe myalgia and arthralgia ('Breakbone fever' — extreme bone/joint pain)",
      "Facial flushing + conjunctival injection (erythema without exudate)",
      "Rash: maculopapular → petechiae; positive tourniquet test (Hess test)",
      "WARNING SIGNS of severe dengue: abdominal pain/tenderness, persistent vomiting, clinical fluid accumulation, mucosal bleed, lethargy/restlessness, liver enlargement >2cm, rising HCT with rapid platelet fall",
      "DHF: spontaneous hemorrhage (petechiae, purpura, ecchymosis, epistaxis, gum bleed, GI bleed)",
      "DSS: narrow pulse pressure (<20mmHg), cold clammy skin, rapid feeble pulse, altered consciousness",
    ],
    investigations: [
      "NS1 antigen test: Positive Days 1–5 (early acute phase — before antibodies appear). High sensitivity in early dengue. Dengue NS1 Ag rapid test (point-of-care).",
      "Dengue IgM/IgG ELISA: IgM positive from Day 5 (primary infection). IgG positive earlier in secondary infection (rises rapidly). IgM:IgG ratio helps distinguish primary vs secondary infection.",
      "CBC: Thrombocytopenia (<100,000/mm³ = DHF criterion), hematocrit rise >20% (hemoconcentration = plasma leakage evidence).",
      "Dengue RT-PCR: Most sensitive (Days 1–5), serotyping; reference/research labs.",
      "Tourniquet test (Hess/Rumpel-Leede): Inflate BP cuff to midpoint between SBP and DBP × 5 min → count petechiae in 1 inch² area (>10 petechiae/inch² = positive) — correlates with thrombocytopenia.",
      "USG abdomen: Ascites, pleural effusion, gallbladder wall thickening (plasma leakage evidence — Group B/C management).",
      "Liver function tests: ALT/AST elevated (dengue hepatitis — transaminase rise 10× in severe dengue).",
    ],
    treatment:
      "NO SPECIFIC ANTIVIRAL TREATMENT. SUPPORTIVE CARE per WHO 2012/National Dengue Control Programme (NVBDCP/MoHFW India): GROUP A (Dengue without warning signs, tolerating oral fluids): ORS + Tab. Paracetamol (Calpol/Dolo-650) 10–15mg/kg q4–6h for fever. AVOID Aspirin/NSAIDs (Ibuprofen, Diclofenac — antiplatelet + Reye's risk). Monitor CBC daily. GROUP B (Warning signs OR co-morbidities): Hospital admission. IV crystalloids — Ringer's Lactate 5–7mL/kg/h if unable to maintain oral intake. Serial HCT + vital monitoring q4–6h. Platelet transfusion NOT recommended unless active significant bleeding + platelet <10,000/mm³. GROUP C (Severe dengue — shock/organ failure): ICU. Fluid resuscitation: 10–20mL/kg IV bolus RL, repeat as needed monitoring HCT/BP. Blood products for hemorrhage. Strict fluid balance. Note: Steroids NOT recommended in uncomplicated dengue.",
    complications: [
      "Dengue Shock Syndrome (DSS) — mortality up to 40% if untreated, <1% with proper management",
      "Dengue hepatitis (transaminase elevation, acute liver failure — rare but serious)",
      "Dengue encephalopathy/encephalitis (CNS dengue — fits, altered sensorium)",
      "Myocarditis (cardiac dengue — arrhythmias, heart failure)",
      "Post-dengue fatigue syndrome (weeks of fatigue, myalgia, cognitive dysfunction after recovery)",
    ],
    differentiatingFeature:
      "DENGUE vs CHIKUNGUNYA: Dengue = thrombocytopenia + NS1 positive + retro-orbital pain + hemorrhagic manifestations + plasma leakage. Chikungunya = SEVERE, DISABLING joint pain (arthralgia/arthritis persisting weeks to months after fever) + NO significant thrombocytopenia + CHIKV IgM positive. Both spread by Aedes aegypti. Dengue = platelet drop (hallmark). Chikungunya = crippling joint pain (hallmark).",
    pearlPoints: [
      "NEET PG Classic: NS1 antigen = positive in FIRST 5 DAYS (before IgM). IgM positive from Day 5 onwards. For early diagnosis: NS1 Ag. For confirmation/late presentation: IgM ELISA.",
      "Dengue vector: Aedes aegypti = DAYTIME biter (peak biting 2h after sunrise and before sunset), breeds in CLEAN STAGNANT WATER in artificial containers. Contrast: Anopheles (malaria) = dusk-to-dawn biter, breeds in natural water bodies.",
      "Platelet transfusion in dengue: NOT recommended as a routine. Indicated ONLY when: active significant bleeding + platelet <10,000/mm³. Platelet count alone (even <10,000) without bleeding is NOT an indication.",
      "Saddleback fever (biphasic): Days 1–3 fever → Day 4 defervescence → Days 5–6 second fever = 'critical phase' (plasma leakage period). Warning signs appear during critical phase.",
      "AVOID in dengue: Aspirin (antiplatelet, Reye's syndrome risk), NSAIDs (Ibuprofen, Diclofenac), IM injections (bleeding risk), corticosteroids (no benefit, harm). Only Paracetamol is safe antipyretic.",
    ],
    icmrProtocol:
      "National Dengue Control Programme (NVBDCP/MoHFW India 2022). WHO Dengue 2012 guidelines. NS1 testing for early diagnosis. Platelet transfusion criteria: <10,000/mm³ + active bleeding only.",
    indianBrandDrugs: [
      "Tab. Paracetamol (Calpol/Crocin/Dolo-650) 10–15mg/kg q4–6h ONLY",
      "Ringer's Lactate IV for Group B/C management",
      "ORS (Electral/Pedialyte) for Group A oral rehydration",
    ],
  },
  {
    name: "Cholera — Prevention and Control",
    subject: "Community",
    icd10: "A00.9",
    category: "Water-Borne Disease / Epidemic Control",
    definition:
      "Acute secretory diarrheal disease caused by Vibrio cholerae O1 (biotypes El Tor — currently pandemic, Classical — rare) or O139 (Bengal — India/Bangladesh), producing cholera toxin (CT) which irreversibly activates adenylyl cyclase → massive intestinal secretion of isotonic fluid/electrolytes causing profuse rice-water stools without mucosal invasion; 7th cholera pandemic (El Tor) ongoing since 1961.",
    etiology:
      "Causative: V. cholerae O1 (El Tor biotype, Ogawa/Inaba serotypes). V. cholerae O139 (Bengal strain — first non-O1 epidemic, emerged Madras/Chennai, India 1992). Transmission: Fecal-oral route — contaminated water (most important) and food. Risk factors: contaminated water supply, poor sanitation, flooding/post-disaster, overcrowding, blood group O (greatest susceptibility to severe cholera). India: epidemic-prone — West Bengal, Odisha, Bihar, NE India. Mandatory notifiable disease.",
    pathophysiology:
      "Ingestion (infective dose 10^6–10^8 organisms — less in achlorhydria) → small intestine colonization → cholera toxin (CT) elaborated — A+B subunit protein. CT-B subunit binds GM1 ganglioside on enterocyte brush border → CT-A subunit enters cell → activates adenylyl cyclase → intracellular cAMP ↑↑ → chloride hypersecretion via CFTR + sodium/water malabsorption → isotonic fluid loss up to 1 litre/hour → profound dehydration, electrolyte loss (Na, Cl, K, HCO3), metabolic acidosis, hypokalemia → cardiovascular collapse. No mucosal invasion → no blood/pus in stools.",
    clinicalFeatures: [
      "Abrupt onset profuse watery diarrhea (rice-water stools — colorless with mucus flecks, fishy/sweet odor)",
      "Profuse vomiting (early, without nausea — follows diarrhea)",
      "PAINLESS diarrhea (no abdominal cramps — distinguishes from dysentery/invasive diarrhea)",
      "Rapid severe dehydration: sunken eyes, dry mucosa, skin tenting (turgor reduced), absent urine output",
      "Muscle cramps (hypokalemia, hyponatremia — prominent, especially calf muscles)",
      "Hypotension and tachycardia (hypovolemic shock — cholera gravis)",
      "Voice change/aphonia (extreme dehydration — classic description)",
      "Rapid deterioration — death within hours of onset if untreated",
    ],
    investigations: [
      "Stool culture on TCBS agar: GOLD STANDARD — Thiosulfate-Citrate-Bile Salts-Sucrose medium. V. cholerae = YELLOW colonies (sucrose fermenter). V. parahaemolyticus = blue-green colonies.",
      "Stool dark-field/phase-contrast microscopy: Rapid — 'shooting star' darting motility of V. cholerae. Inhibited by adding V. cholerae antiserum (immobilization test — diagnostic confirmation).",
      "Stool RDT (Crystal VC Rapid Test): Detects V. cholerae O1 + O139 antigens in 15 minutes — field diagnosis.",
      "Serum electrolytes: Hyponatremia, hypokalemia, low bicarbonate (metabolic acidosis).",
      "Serum creatinine/BUN: Pre-renal AKI from profound dehydration.",
      "Stool PCR: Reference labs, outbreak confirmation, serotyping.",
    ],
    treatment:
      "CORNERSTONE = ORAL REHYDRATION THERAPY (ORT) — 90% of cholera cases managed with ORS alone: WHO/UNICEF Low-Osmolarity ORS (2002): Na 75 + K 20 + Cl 65 + Citrate 10 + Glucose 75 mmol/L, osmolarity 245 mOsm/L. Volume: Replace stool losses (mL for mL) + maintenance. IV FLUIDS (Severe dehydration/cholera gravis): Ringer's Lactate (PREFERRED over Normal Saline — corrects metabolic acidosis). 100mL/kg in 3 hours (adults WHO plan C). Monitor: pulse, BP, urine output. ANTIBIOTICS (reduce duration by 50% + shedding): First-line adults: Tab. Doxycycline (Doxycap) 300mg single dose. Alternative: Tab. Azithromycin (Azee) 1g single dose — preferred for children + pregnant women. Children: Azithromycin 20mg/kg (max 1g) single dose. ZINC (children <5 years): Tab. Zinc sulfate (Zinconia) 20mg/day × 14 days (reduces duration + prevents recurrence per WHO). NOTIFICATION: Mandatory under IDSP (Integrated Disease Surveillance Programme) — outbreak investigation within 24h.",
    complications: [
      "Hypovolemic shock and death (untreated CFR 25–50%; <1% with ORT — dramatic reduction with simple ORS)",
      "Acute kidney injury (pre-renal from severe dehydration → intrinsic AKI if prolonged)",
      "Hypokalemia and cardiac arrhythmias (massive K loss in rice-water stools)",
      "Hypoglycemia (children — prolonged vomiting + reduced oral intake + impaired gluconeogenesis)",
      "Aspiration pneumonia (vomiting + altered consciousness in extreme dehydration)",
    ],
    differentiatingFeature:
      "CHOLERA vs other acute diarrheas: Cholera = PAINLESS profuse rice-water stools, abrupt onset, RAPID severe dehydration, NO blood/pus, NO fever (in early disease). Shigella dysentery = bloody mucoid stools, tenesmus, fever, abdominal cramps (invasive). ETEC (traveler's diarrhea) = watery but milder, traveler context. V. cholerae O139 first emerged in MADRAS (Chennai), India 1992 — key historical NEET PG fact.",
    pearlPoints: [
      "NEET PG Classic: ORS is the FIRST and MOST IMPORTANT treatment for cholera. WHO Low-Osmolarity ORS (osmolarity 245 mOsm/L, Na 75 mmol/L). Ringer's Lactate for IV therapy (NOT Normal Saline as first choice — NS does not correct metabolic acidosis).",
      "TCBS agar: Selective medium for Vibrio species. V. cholerae = YELLOW colonies (fermenting sucrose). V. parahaemolyticus = BLUE-GREEN colonies (non-sucrose fermenter). Most asked culture medium question.",
      "'Shooting star' motility: Dark-field microscopy of fresh stool shows V. cholerae darting in one direction rapidly. Inhibited by specific antiserum (immobilization test confirms species).",
      "Antibiotic in cholera: ADJUNCT only — ORT saves lives. Antibiotics reduce duration by 50% and bacterial shedding. Doxycycline single dose (adults). Azithromycin for children and pregnant women (tetracycline resistance rising).",
      "V. cholerae O139 (Bengal strain): First non-O1 strain to cause epidemic cholera. Emerged simultaneously in Chennai (Madras) and Bangladesh in 1992. Has polysaccharide capsule (unlike O1). Important NEET PG historical question.",
    ],
    icmrProtocol:
      "IDSP (Integrated Disease Surveillance Programme) outbreak protocol. Mandatory notification. WHO cholera case management guidelines. ORT first-line. Epidemic response team activation.",
    indianBrandDrugs: [
      "ORS (Electral/Pedialyte) — WHO Low-Osmolarity ORS 245 mOsm/L",
      "Ringer's Lactate IV (Cholera saline/RL) for severe dehydration",
      "Tab. Doxycycline (Doxycap/Doxt-SL) 300mg single dose adults",
      "Tab. Azithromycin (Azee/Zithromax) 1g single dose adults; 20mg/kg children",
      "Tab. Zinc sulfate (Zinconia/Zinopin) 20mg/day × 14 days children",
    ],
  },
  {
    name: "Poliomyelitis — Eradication Strategy",
    subject: "Community",
    icd10: "A80.9",
    category: "Vaccine-Preventable Disease / Eradication Programme",
    definition:
      "Acute infectious viral disease caused by Poliovirus (Enterovirus, 3 serotypes — PV1, PV2, PV3), transmitted via fecal-oral route; in <1% of infected individuals invades the CNS → destruction of anterior horn cells of spinal cord → irreversible asymmetric flaccid paralysis (AFP); India declared polio-free by WHO on 27 March 2014 (last case: Howrah, West Bengal, 13 January 2011 — WPV Type 1).",
    etiology:
      "Causative: Poliovirus (Enterovirus, Picornaviridae). Serotypes: PV1 (most common, most paralytic), PV2 (globally eradicated 1999), PV3 (globally eradicated 2019). Only PV1 remains endemic (Pakistan + Afghanistan). Transmission: Fecal-oral (primary), oropharyngeal secretions. Incubation: 7–14 days (range 3–35 days). Natural reservoir: Humans only (no animal reservoir). Risk: Unimmunized children <5 years.",
    pathophysiology:
      "Fecal-oral ingestion → pharynx + gut epithelium (primary replication, M cells in Peyer's patches) → mesenteric lymph nodes → blood (primary viremia, minor illness) → CNS invasion in <1% (blood-brain barrier penetration; retrograde axonal transport) → anterior horn cells of spinal cord/brainstem (motor neurons) → cytolytic destruction → denervation → acute flaccid (lower motor neuron) paralysis. Bulbar polio: involvement of medullary respiratory centers → respiratory paralysis → death if unventilated. Maximum deficit by 2–3 days (distinguishes from GBS).",
    clinicalFeatures: [
      "95% infections: INAPPARENT (subclinical — no symptoms, most common outcome)",
      "Abortive polio (minor illness, 4–8%): Fever, headache, sore throat, GI symptoms — spontaneously resolves in 2–3 days",
      "Non-paralytic polio/aseptic meningitis (~1%): Meningismus + CSF pleocytosis without paralysis",
      "PARALYTIC POLIO (<1%): Acute asymmetric FLACCID paralysis (LMN type), maximum within 2–3 days, fever at onset. Spinal: lower limb > upper limb. Bulbar: cranial nerve palsy, respiratory failure. Bulbospinal: combined.",
      "Post-polio syndrome: New muscle weakness, fatigue, pain 25–40 years after initial paralysis (motor neuron fatigue/attrition)",
    ],
    investigations: [
      "Stool culture (2 specimens 24–48h apart): GOLD STANDARD for poliovirus isolation. Must be collected within 14 days of paralysis onset. Sent to National Polio Reference Laboratory (NPRL).",
      "ALL AFP (Acute Flaccid Paralysis) cases in children <15 years MUST be reported to NPSP within 24h and stool collected within 48h — mandatory under surveillance.",
      "CSF analysis: Lymphocytic pleocytosis (50–500 cells/mm³) in non-paralytic/early paralytic phase (aseptic meningitis pattern).",
      "Nerve conduction study/EMG: Denervation pattern (anterior horn cell disease — pure motor, no sensory involvement).",
      "Intrathecal IgM/serology: Reference labs.",
      "Stool PCR + sequencing: Differentiates Wild Poliovirus (WPV) from Vaccine-Derived Poliovirus (VDPV) — critical for eradication surveillance.",
    ],
    treatment:
      "NO SPECIFIC ANTIVIRAL TREATMENT. SUPPORTIVE: 1) Complete bed rest (acute phase — reduces extent of paralysis). 2) Pain: Analgesics (Tab. Ibuprofen/Paracetamol), warm moist hot packs for muscle pain. 3) Physiotherapy: Passive range-of-motion exercises — begins after acute phase to prevent contractures. 4) Orthopedic aids: Calipers (leg braces), foot drop splints, crutches. 5) Respiratory support: Positive pressure mechanical ventilation for bulbar/spinal respiratory failure. PREVENTION (KEY): UIP Schedule: OPV (Oral Polio Vaccine) at birth + 6, 10, 14 weeks + 16–18 months booster + 5 years. IPV (Inactivated Polio Vaccine) added 2015: fractional IPV (fIPV) 0.1mL intradermal at 6 and 14 weeks (reduces cost, same immunogenicity). Pulse Immunization (Polio NIDs): 2-day national immunization days, all children <5 years regardless of prior doses.",
    complications: [
      "Permanent asymmetric flaccid paralysis (irreversible motor neuron destruction — lifelong disability)",
      "Respiratory failure (bulbar/bulbospinal polio — requires lifelong ventilation in severe cases)",
      "Post-polio syndrome (new muscle weakness/fatigue/pain 25–40 years later — affects 25–40% of survivors)",
      "Skeletal deformities: scoliosis, limb shortening, joint contractures (from asymmetric paralysis)",
      "VAPP (Vaccine-Associated Paralytic Polio): 1 per 750,000 first OPV doses — risk that prompted addition of IPV to UIP",
    ],
    differentiatingFeature:
      "POLIO vs GBS (Guillain-Barré Syndrome): Polio = ASYMMETRIC flaccid paralysis, fever prodrome, NO sensory loss (pure motor), maximum deficit in 2–3 days, CSF normal/mild pleocytosis, anterior horn cell on EMG. GBS = SYMMETRIC ascending paralysis, sensory symptoms (paraesthesia), albuminocytological dissociation in CSF (high protein, normal cells), maximum deficit over 2–4 weeks. Both detected by AFP surveillance — key distinction for management.",
    pearlPoints: [
      "NEET PG Classic: India polio-free declared 27 March 2014 by WHO. Last wild poliovirus case: Howrah, West Bengal, 13 January 2011 (WPV Type 1). Remaining endemic countries: Pakistan + Afghanistan (WPV1 only).",
      "WPV eradication milestones: Type 2 = globally eradicated 1999. Type 3 = globally eradicated 2019. Type 1 = only remaining (Pakistan/Afghanistan). OPV now bivalent (bOPV types 1+3) globally since 2016.",
      "VAPP (Vaccine-Associated Paralytic Polio): 1/750,000 first OPV doses. Risk: first dose > subsequent doses. Reason IPV (inactivated, no VAPP risk) added to India's UIP in 2015 as fractional IPV.",
      "AFP Surveillance: ALL AFP cases in children <15 years MUST be reported. Non-polio AFP rate target: >2/100,000 children <15 years (surveillance adequacy indicator). Stool adequacy rate >80% (two adequate stool specimens from ≥80% AFP cases).",
      "Salk (IPV) vs Sabin (OPV): Salk = injected, killed, no VAPP risk, no mucosal immunity, no herd immunity. Sabin = oral, live attenuated, gut immunity + herd immunity, VAPP risk (rare). India UIP: BOTH used (IPV + OPV in combined schedule).",
    ],
    icmrProtocol:
      "NPSP (National Polio Surveillance Project) India. AFP case reporting mandatory within 24h. Stool to NPRL within 72h. IPV+OPV combined in UIP per NHM/NPSP 2023.",
    indianBrandDrugs: [
      "OPV (Oral Polio Vaccine/Polio Sabin drops) — bivalent types 1+3",
      "IPV (Inactivated Polio Vaccine/Ipol) — fractional 0.1mL intradermal",
    ],
  },
  {
    name: "Measles — Immunization Programme",
    subject: "Community",
    icd10: "B05.9",
    category: "Vaccine-Preventable Disease / Childhood Immunization",
    definition:
      "Highly contagious acute viral exanthem caused by Measles virus (Morbillivirus, Paramyxoviridae), transmitted via respiratory droplets/aerosols; one of most contagious known infections (R0 = 12–18); characterized by Koplik's spots (pathognomonic), morbilliform cephalocaudal rash, 3C prodrome (cough, coryza, conjunctivitis), and immunological amnesia; a leading vaccine-preventable cause of childhood mortality globally — India contributes the largest number of measles deaths.",
    etiology:
      "Causative: Measles virus (single serotype — unlike influenza, no antigenic shift/drift). Transmission: Respiratory droplets and aerosols (most contagious human disease — secondary attack rate ~90% in susceptibles), virus survives on surfaces 2h, infectious 4 days before rash to 4 days after. Incubation: 8–12 days (range 7–21 days). India: major outbreaks in low-immunization states (UP, Bihar, MP, Rajasthan). MCV1 coverage India: ~93% (2022 data), MCV2: ~88%.",
    pathophysiology:
      "Inhaled virus → respiratory epithelium → infects macrophages/dendritic cells → lymphoid organs → viremia → skin + mucous membranes. Immune response (T-cell mediated) → rash + recovery. IMMUNOLOGICAL AMNESIA: Measles virus selectively depletes pre-existing memory B and T cells → loss of immunity to previously encountered pathogens — increased susceptibility to infections for 2–3 years post-measles. Subacute Sclerosing Panencephalitis (SSPE): Defective measles virus persists in CNS → years later → progressive fatal encephalitis.",
    clinicalFeatures: [
      "Prodrome (3 Cs) lasting 3–4 days: COUGH (harsh, croupy), CORYZA (profuse nasal discharge), CONJUNCTIVITIS (non-purulent, photophobia) — all before rash",
      "Koplik's spots: Bluish-white/grey spots on bright red buccal mucosa (opposite lower molars) — PATHOGNOMONIC. Appear 1–2 days before rash, DISAPPEAR as rash appears.",
      "High-grade fever (up to 104–105°F, peaks with rash onset on Day 3–4 of prodrome)",
      "Morbilliform rash: Maculopapular, starts behind ears/hairline/forehead → centrifugal cephalocaudal spread to face → trunk → limbs over 3 days",
      "Rash fades with brownish discoloration (staining) + fine bran-like desquamation in same cephalocaudal order",
      "Generalized lymphadenopathy (cervical, axillary) + splenomegaly (uncommon)",
    ],
    investigations: [
      "Clinical diagnosis: Classic 3C prodrome + Koplik's spots + cephalocaudal morbilliform rash = measles (no lab test needed in outbreak setting).",
      "Measles IgM ELISA: Confirmatory for surveillance. Positive from Day 3 of rash onset. Standard for individual case confirmation.",
      "Measles RT-PCR: Throat swab/urine specimen. Most sensitive, genotyping for outbreak investigation.",
      "Measles IgG: Paired acute + convalescent sera (2 weeks apart) showing ≥4-fold rise = confirmation.",
      "CBC: Leukopenia (lymphopenia characteristic) + thrombocytopenia (mild).",
      "Chest X-ray: Bilateral interstitial infiltrates (measles pneumonia); Warthin-Finkeldey giant cells in histology.",
    ],
    treatment:
      "NO SPECIFIC ANTIVIRAL. SUPPORTIVE CARE: 1) Isolation (5 days from rash onset — respiratory isolation). 2) VITAMIN A supplementation (MANDATORY per WHO/NHM — reduces measles mortality by 50%): ALL children with measles in developing countries. Dose: <6 months: 50,000 IU; 6 months–1 year: 100,000 IU; >1 year: 200,000 IU — on Day 1 AND Day 2. Tab./Cap. Vitamin A (Arovit/Aquasol A). 3) Antipyretics: Tab. Paracetamol (Calpol) 10–15mg/kg q4–6h. 4) ORS for diarrhea (Electral). 5) Antibiotics ONLY for secondary bacterial pneumonia: Inj. Amoxicillin-Clavulanate (Augmentin) or Azithromycin (Azee). PREVENTION: MCV1 at 9–12 months + MCV2 at 16–24 months (UIP). MR (Measles-Rubella) vaccine used in India since 2017. Herd immunity threshold: 95% coverage required.",
    complications: [
      "Pneumonia (most common cause of measles mortality — Hecht's/giant cell pneumonia with Warthin-Finkeldey cells)",
      "Otitis media (secondary bacterial infection, most common non-fatal complication)",
      "Encephalitis (1/1000 cases — acute demyelinating, mortality 15%, neurological disability 25%)",
      "SSPE (Subacute Sclerosing Panencephalitis): Progressive fatal encephalitis 5–10 years post-measles. Myoclonic jerks + dementia + EEG periodic complexes + Dawson's inclusions (intranuclear). Always fatal.",
      "Corneal ulceration and blindness (Vitamin A deficiency + measles = leading preventable cause of childhood blindness in India)",
    ],
    differentiatingFeature:
      "MEASLES vs RUBELLA vs ROSEOLA INFANTUM: Measles = 3C prodrome (3–4 days) + Koplik's spots (pathognomonic) + cephalocaudal morbilliform rash + high fever throughout rash. Rubella = mild fever, RETROAURICULAR + posterior cervical lymphadenopathy, rash 1–3 days only, NO Koplik's spots, NO cephalocaudal progression. Roseola (HHV-6) = high fever STOPS FIRST then rash appears (opposite of measles — fever + rash simultaneously in measles). Koplik's spots = ONLY measles, pathognomonic.",
    pearlPoints: [
      "NEET PG Classic: Koplik's spots (Filatov-Koplik) = bluish-white/grey spots on bright red buccal mucosa. PATHOGNOMONIC for measles. Appear 1–2 days BEFORE rash, DISAPPEAR as rash appears. Most asked clinical sign.",
      "Vitamin A in measles: WHO MANDATORY for all children in developing countries. Reduces measles mortality by 50%, prevents corneal ulceration/blindness. Dose for >1 year: 200,000 IU × 2 days.",
      "Measles R0 = 12–18 (one of highest known infectious diseases). Herd immunity requires ≥95% population immunity. Below this threshold — outbreaks inevitable (as seen in Delhi/UP 2022–23).",
      "SSPE (Subacute Sclerosing Panencephalitis): Presents 5–10 years after measles (especially if measles contracted <2 years age). Progressive myoclonic jerks → dementia → vegetative state → death. Dawson's intranuclear inclusions in neurons. EEG: periodic Rademecker complexes. Always fatal.",
      "Hecht's pneumonia (giant cell/measles pneumonia): Multinucleated Warthin-Finkeldey giant cells in lung tissue. Most common cause of measles death. Different from measles encephalitis (which has higher case fatality rate but lower incidence).",
    ],
    icmrProtocol:
      "UIP (Universal Immunization Programme) India: MCV1 at 9–12 months, MCV2 at 16–24 months. MR (Measles-Rubella) vaccine. NHM Vitamin A supplementation protocol. National MR Campaign 2017–2020.",
    indianBrandDrugs: [
      "Cap./Tab. Vitamin A (Arovit/Aquasol A) 200,000 IU — Day 1 and Day 2",
      "Tab. Paracetamol (Calpol/Crocin) 10–15mg/kg q4–6h for fever",
      "ORS (Electral) for diarrhea",
      "Tab./Syr. Azithromycin (Azee) for secondary bacterial pneumonia",
    ],
  },
  {
    name: "Leprosy — NLEP Protocol",
    subject: "Community",
    icd10: "A30.9",
    category: "Communicable Disease / National Programme",
    definition:
      "Chronic granulomatous infectious disease caused by Mycobacterium leprae (Hansen's bacillus, 1873), an obligate intracellular organism that cannot be cultured on artificial media; primarily affecting skin, peripheral nerves, upper respiratory mucosa, and eyes; characterized by hypopigmented/erythematous skin lesions with sensory loss, peripheral neuropathy, and deformities; India achieved national elimination (<1 case/10,000 population) in 2005 under NLEP but still reports ~125,000 new cases/year.",
    etiology:
      "Causative: Mycobacterium leprae (Hansen, 1873 — first bacterium proved to cause human disease, first disease shown to be caused by a bacterium). CANNOT be cultured on artificial media — grows only in mouse footpad + 9-banded armadillo footpad. Transmission: Prolonged close contact (nasal droplets/secretions from untreated MB leprosy — primary route). Incubation: 2–7 years average (range 6 months–20 years — longest of any bacterial disease). High infectivity, LOW pathogenicity (only 5% develop disease).",
    pathophysiology:
      "M. leprae inhaled → taken up by macrophages → multiplies very slowly (doubling time 12–14 days — slowest bacterium) → tropism for skin + Schwann cells of peripheral nerves (preferentially cooler body areas: ears, nose, limbs, testes). Clinical spectrum determined by HOST CELL-MEDIATED IMMUNITY (CMI): HIGH CMI → Tuberculoid (TT) — few asymmetric lesions, well-formed granulomas, very few bacilli, no dissemination. LOW CMI → Lepromatous (LL) — many symmetric lesions, diffuse infiltration, poor granulomas, billions of bacilli (most infectious form). Mid-spectrum: Borderline (BT, BB, BL) — unstable, prone to lepra reactions.",
    clinicalFeatures: [
      "TUBERCULOID (PB leprosy): 1–5 hypopigmented/erythematous patches with DEFINITE sensory loss (touch, temperature, pain) — sensory loss is HALLMARK of leprosy",
      "Thickened, palpable peripheral nerve (ulnar — most common, peroneal, posterior tibial, greater auricular, radial cutaneous — 'nerve of election')",
      "Dry, non-sweating, hairless patches in lesion (autonomic nerve dysfunction)",
      "LEPROMATOUS (MB leprosy): Multiple symmetric nodules, plaques, diffuse infiltration (leonine facies — lion-like facies from facial infiltration)",
      "Loss of lateral eyebrow (madarosis) + loss of eyelashes (milphosis) — LL leprosy",
      "Perforated/collapsed nasal septum (nasal mucosa heavily infiltrated with bacilli)",
      "Lagophthalmos + corneal anesthesia (facial nerve + trigeminal involvement → risk of corneal blindness)",
      "TYPE 1 REACTION (reversal): Erythema + swelling of existing lesions; TYPE 2 (ENL): Erythematous tender nodules + systemic features (fever, arthralgia)",
    ],
    investigations: [
      "Slit-skin smear (SSS) with ZN stain: GOLD STANDARD for bacillary load (BI). PB leprosy: BI 0 (smear-negative). MB leprosy: BI 1–6+ (smear-positive). Sites: earlobes, lesion edges.",
      "Skin biopsy + histopathology: Ridley-Jopling classification. Tuberculoid (TT): well-formed epithelioid granulomas + Langhans giant cells + few/no AFB. Lepromatous (LL): foamy macrophages (Virchow/lepra cells) packed with globi of AFB, poor granulomas.",
      "Lepromin test (Mitsuda reaction): Intradermal M. leprae antigen. Read at 28 days (Mitsuda reading). TT: strongly positive (+3). LL: negative. Tests host CMI — NOT diagnostic of leprosy (does NOT confirm infection).",
      "PCR (M. leprae-specific): High sensitivity especially PB leprosy where smears are negative. Not routinely available.",
      "Nerve conduction studies: Sensory/motor slowing in affected peripheral nerves.",
    ],
    treatment:
      "NLEP MDT (Multi-Drug Therapy) — FREE at all government health facilities per WHO/NLEP: PAUCIBACILLARY (PB) — 1–5 lesions: 6 MONTHS MDT: Rifampicin 600mg once monthly SUPERVISED + Dapsone 100mg daily self-administered (blister pack). MULTIBACILLARY (MB) — >5 lesions: 12 MONTHS MDT: Rifampicin 600mg monthly SUPERVISED + Clofazimine 300mg monthly SUPERVISED + Dapsone 100mg daily self-administered + Clofazimine 50mg daily self-administered. LEPRA REACTIONS: Type 1 (Reversal reaction) — in BT/BB/BL: Prednisolone 40–60mg/day tapering over 3–6 months (do NOT stop MDT). Type 2 (ENL) — in BL/LL: Thalidomide 100–300mg/day (males only, teratogenic) OR Prednisolone 40mg/day tapering. MDT must NOT be stopped during reactions. MDT available as WHO blister packs FREE. DEFORMITY PREVENTION: Physiotherapy, special footwear for insensate feet, daily self-inspection, soaking + oil application.",
    complications: [
      "Lepra reactions (Type 1 and Type 2 ENL) causing acute severe nerve damage if untreated — major cause of new deformity",
      "Peripheral neuropathy: Clawed hand (ulnar), foot drop (common peroneal), wrist drop (radial), facial palsy (CN VII)",
      "Corneal blindness (lagophthalmos + corneal anesthesia + inadequate eye blinking → exposure keratitis → blindness)",
      "Plantar neuropathic ulcers (insensate feet → repeated trauma → ulcers → secondary bacterial infection → osteomyelitis → amputation)",
      "Social stigma and discrimination (leprosy remains most stigmatized disease in India — Constitutional Amendment 2019 to remove leprosy as ground for divorce/disqualification from elections)",
    ],
    differentiatingFeature:
      "LEPROSY PATCH vs VITILIGO: Leprosy = hypopigmented patch with DEFINITE LOSS OF SENSATION (touch/temperature/pain) + impaired or absent sweating + thickened nearby peripheral nerve. Vitiligo = COMPLETE depigmentation (milk-white, not hypopigmented), NORMAL sensation, normal sweating, no nerve thickening. SENSATION TESTING is the single most important examination to distinguish leprosy from other skin conditions.",
    pearlPoints: [
      "NEET PG Classic: M. leprae = CANNOT be cultured on artificial media. Grown only in mouse footpad (Shepard) and 9-banded armadillo (Dasypus novemcinctus). Doubling time 12–14 days (slowest bacterium).",
      "PB vs MB classification (WHO field classification): PB = 1–5 skin lesions, 6-month MDT. MB = >5 lesions, 12-month MDT. Simple, smear-independent — used at PHC level for treatment decision.",
      "India leprosy elimination: National level achieved 2005 (<1/10,000). But NOT eradicated — still 125,000 new cases/year. Sub-national elimination pending in Bihar, UP, Maharashtra, Chhattisgarh (>1/10,000 at state/district level).",
      "Lepra reactions: Type 1 (Reversal) = T-cell mediated, in borderline (BT/BB/BL). Type 2 (ENL) = immune complex, in BL/LL. Both require prednisolone (do NOT stop MDT). Major cause of new deformities if missed.",
      "Clofazimine skin discoloration: Reddish-brown to pink discoloration of skin (especially sun-exposed areas). Occurs during MB MDT. Reversible after stopping clofazimine. Patients must be counselled before starting MB-MDT.",
    ],
    icmrProtocol:
      "NLEP (National Leprosy Eradication Programme) India 2023. WHO-MDT blister packs free. SPARSH Leprosy Awareness Campaign. Target: Sub-national elimination <1/10,000 at district level.",
    indianBrandDrugs: [
      "WHO-MDT blister packs (FREE via NLEP PHCs): PB-MDT (6 months) and MB-MDT (12 months)",
      "Rifampicin 600mg monthly supervised (included in MDT pack)",
      "Tab. Dapsone (Dapsone/Avlosulfon) 100mg daily",
      "Tab. Clofazimine (Clofazimine/Lamprene) 50mg daily + 300mg monthly",
      "Tab. Prednisolone (Wysolone) 40–60mg/day for lepra reactions",
    ],
  },
  {
    name: "Protein Energy Malnutrition (PEM) — SAM Management",
    subject: "Community",
    icd10: "E43",
    category: "Nutritional Disease / Child Health",
    definition:
      "Spectrum of nutritional disorders in children resulting from deficiency of dietary protein and/or energy, ranging from mild-moderate malnutrition to Severe Acute Malnutrition (SAM); clinically classified as: Kwashiorkor (protein deficiency predominant — edema, skin/hair changes), Marasmus (energy/calorie deficiency — severe wasting), and Marasmic-Kwashiorkor (combined features); major contributor to under-5 mortality in India (NFHS-5: 35% children underweight, SAM 7.7% — 8.7 million SAM children).",
    etiology:
      "Primary: Inadequate dietary intake (poverty, food insecurity, early weaning, inadequate complementary feeding after 6 months — MOST COMMON). Secondary: Recurrent infections (diarrhea, malaria, TB, measles — increase catabolism, reduce absorption). Risk factors: Low birth weight (<2500g), early cessation of exclusive breastfeeding, large family size (birth interval <2 years), low maternal education/literacy, poor WASH (water-hygiene-sanitation), premature birth. India: 38% children stunted, 21% wasted (NFHS-5 2019–21).",
    pathophysiology:
      "Inadequate protein/energy → adaptive responses: reduced growth (stunting), reduced activity, metabolic adaptation (reduced BMR, thyroid hormones, IGF-1). KWASHIORKOR: protein deficiency → reduced hepatic synthesis of albumin → hypoalbuminemia → reduced plasma oncotic pressure → fluid shifts to interstitium → bilateral pitting edema + ascites + pleural effusion. Fatty liver (hepatic fat accumulation from impaired apolipoprotein/VLDL synthesis). Skin/hair changes from sulfur amino acid (cysteine/methionine) deficiency. MARASMUS: severe energy (calorie) deficit → mobilization of fat stores → then muscle protein → severe cachexia. Albumin relatively preserved (adequate relative protein). No edema. Immune suppression in both forms.",
    clinicalFeatures: [
      "KWASHIORKOR: Bilateral pitting edema (ALWAYS starts in feet — dependent edema, hallmark)",
      "Muscle wasting (hidden by edema — 'fat baby' appearance deceptive)",
      "Distended abdomen (ascites, hepatomegaly from fatty liver, gaseous distension)",
      "Dermatosis: flaky paint dermatosis (hyperpigmented areas peeling off — like flaking paint)",
      "Hair changes: hypopigmented, thin, easily pluckable, FLAG SIGN (alternating bands of pale and dark hair = alternating nutritional deficiency and recovery periods)",
      "Apathy, misery, and irritability (characteristic behavioural feature of kwashiorkor vs alert marasmus)",
      "MARASMUS: Severe wasting (skin and bones), 'old man facies' (wizened, shriveled face, prominent bony landmarks), NO edema",
      "Alert, active, wide-eyed, fretful but not apathetic — important clinical distinction from kwashiorkor",
    ],
    investigations: [
      "Anthropometric measurements (diagnosis and grading): Weight-for-Height Z-score (WHZ): SAM = WHZ <−3SD. MUAC (Mid-Upper Arm Circumference): SAM = <11.5cm in 6–59 months. Stunting = Height-for-Age Z-score <−2SD.",
      "Bilateral pitting edema (nutritional): AUTOMATIC SAM classification regardless of weight — any child with bilateral pitting edema = SAM per WHO/NHM.",
      "Serum albumin: <2.8g/dL = low (kwashiorkor). Normal/near-normal in marasmus.",
      "Blood glucose: Hypoglycemia (most dangerous acute complication — BG <54mg/dL = emergency).",
      "CBC: Anemia (common — iron, folate, B12 deficiency combined with chronic disease anemia).",
      "Electrolytes: Hypokalemia, hyponatremia, hypomagnesemia (SAM — 'sick cell syndrome' — intracellular K/Mg depletion).",
      "Sepsis screen: Blood culture, urine culture, malaria RDT, CXR (pneumonia — common co-morbidity in SAM).",
    ],
    treatment:
      "WHO 10-STEP MANAGEMENT OF SAM (NRC/Nutrition Rehabilitation Centre protocol, NHM India): Step 1: Treat/prevent HYPOGLYCEMIA (BG <54mg/dL → 50mL 10% dextrose or 5 tsp sugar in 50mL water — oral or NG). Step 2: Treat/prevent HYPOTHERMIA (warm clothing, skin-to-skin kangaroo care, warm room). Step 3: Treat/prevent DEHYDRATION — use ReSoMal (Rehydration Solution for Malnutrition — NOT standard ORS, Na lower). 5mL/kg q30min × 2h, then 5–10mL/kg/h for 4–10h. Step 4: Correct ELECTROLYTES (K 3–4mmol/kg/day, Mg 0.4–0.6mmol/kg/day). Step 5: Treat/prevent INFECTION — Inj./Tab. Amoxicillin (Mox) 25mg/kg BD × 7 days (ALL SAM children receive empirical antibiotics). Step 6: Correct MICRONUTRIENT DEFICIENCIES (Vitamin A single dose, Zinc 2mg/kg/day × 2 weeks, Folic acid 5mg Day 1 then 1mg/day, multi-micronutrients). Step 7: Start CAUTIOUS FEEDING (F-75 starter formula — 75kcal/100mL; initial 100mL/kg/day divided 8–12 feeds/day). Step 8: TRANSITION — F-100 formula (100kcal/100mL) or RUTF (Plumpy'nut, 500kcal/92g sachet) — gradual increase. Step 9: SENSORY STIMULATION (play, love, age-appropriate activities). Step 10: FOLLOW-UP (fortnightly NRC, link to ICDS/Anganwadi).",
    complications: [
      "Hypoglycemia (most dangerous acute complication — mortality risk within hours; prevent by 2-hourly feeds, avoid prolonged fasting)",
      "Hypothermia (impaired thermogenesis — core temperature <35.5°C; prevent by warm clothing, skin-to-skin care)",
      "Refeeding syndrome (rapid refeeding → phosphate/K/Mg shift intracellularly → hypophosphatemia + cardiac failure — prevented by WHO F-75 slow protocol)",
      "Opportunistic infections (measles, TB, Pneumocystis jirovecii, systemic candidiasis — due to severe immunosuppression)",
      "Electrolyte imbalances (hypokalemia → cardiac arrhythmias; hypomagnesemia → tetany, refractory hypokalemia)",
    ],
    differentiatingFeature:
      "KWASHIORKOR vs MARASMUS: Kwashiorkor = BILATERAL PITTING EDEMA (ALWAYS present, hallmark) + skin/hair changes (flaky paint, flag sign) + apathy/misery + distended abdomen + relatively preserved fat stores (edema masks wasting) + low albumin. Marasmus = NO EDEMA + severe generalized wasting (skin and bones — 'old man face') + alert, active child + normal/near-normal albumin. EDEMA = the single most important distinguishing feature between kwashiorkor and marasmus.",
    pearlPoints: [
      "NEET PG Classic: BILATERAL PITTING EDEMA = Kwashiorkor (protein deficiency). NO EDEMA + severe wasting = Marasmus (energy/calorie deficiency). Edema is the most asked single distinguishing feature.",
      "SAM criteria (any ONE = SAM): WHZ <−3SD OR MUAC <11.5cm (6–59 months) OR bilateral pitting edema — refer to NRC (Nutrition Rehabilitation Centre).",
      "Refeeding syndrome: Dangerous complication of rapid refeeding in severely malnourished. Sudden intracellular shift of phosphate/K/Mg → hypophosphatemia → cardiac arrhythmia/failure. Prevented by WHO F-75 protocol (slow start, gradual caloric escalation).",
      "ICDS (Integrated Child Development Services): Main GoI programme for PEM prevention. 6 services: supplementary nutrition, immunization, health check-up, referral, pre-school education, nutrition/health education. Anganwadi center = delivery platform.",
      "Flag sign in hair: Alternating PALE bands (protein-deficient periods) and DARK bands (protein-adequate periods) in hair shaft. Each pale band ~3 months of severe protein deficiency. Each band = timeline of malnutrition history.",
    ],
    icmrProtocol:
      "WHO 10-step SAM management. NRC (Nutrition Rehabilitation Centre) programme — NHM India. RUTF (Plumpy'nut) for outpatient SAM. ICDS supplementary nutrition. MAM (Moderate Acute Malnutrition) managed at Anganwadi level.",
    indianBrandDrugs: [
      "F-75 therapeutic formula (initial phase) — 75kcal/100mL",
      "F-100 therapeutic formula (rehabilitation phase) — 100kcal/100mL",
      "RUTF (Ready-to-Use Therapeutic Food/Plumpy'nut) — 500kcal/92g sachet",
      "Tab. Amoxicillin (Mox/Novamox) 25mg/kg BD × 7 days",
      "ReSoMal (Rehydration Solution for Malnutrition) — low Na ORS",
      "Tab. Zinc sulfate (Zinconia) 2mg/kg/day × 14 days",
    ],
  },
  {
    name: "HIV/AIDS — NACP Protocol",
    subject: "Community",
    icd10: "B24",
    category: "Communicable Disease / National Programme",
    definition:
      "Chronic progressive immunodeficiency caused by Human Immunodeficiency Virus (HIV — RNA retrovirus, Lentivirus genus, Retroviridae family), primarily infecting CD4+ T-lymphocytes and macrophages via gp120 binding to CD4 receptor + CCR5/CXCR4 co-receptors; leading to progressive CD4+ cell depletion → AIDS (Acquired Immunodeficiency Syndrome) defined as CD4 <200/mm³ and/or AIDS-defining illness; India has 2.4 million PLHIV (People Living with HIV) — 3rd largest globally (NACP Phase V, 2022–2027).",
    etiology:
      "HIV-1 (global pandemic — subtype C predominant in India — 99% of Indian infections), HIV-2 (West Africa, mild). Transmission routes: Sexual (heterosexual transmission — >85% of HIV in India — unprotected intercourse), blood-to-blood (IVDU needle sharing, pre-screening transfusions), vertical (mother-to-child — 30–45% without interventions, <2% with ART+PMTCT), breast milk. High-risk groups (MARPS — Most At-Risk Populations): Female Sex Workers (FSW), Men who have Sex with Men (MSM), Intravenous Drug Users (IVDU), Transgenders.",
    pathophysiology:
      "HIV gp120 binds CD4 receptor + CCR5 co-receptor (macrophage-tropic, early infection) or CXCR4 (T-tropic, late/AIDS stage) → viral fusion (gp41) → reverse transcription (RNA → DNA by error-prone reverse transcriptase → mutations → resistance) → integrase-mediated proviral DNA integration into host genome → viral replication → budding → new virions. CD4 cell destruction (direct viral cytopathic effect + CTL-mediated killing) → progressive immunosuppression. Natural progression: CD4 decline 50–100/mm³/year without ART → 8–10 years average to AIDS → 2–3 years AIDS to death (untreated). AIDS defined: CD4 <200/mm³ or AIDS-defining illness (OIs, malignancies).",
    clinicalFeatures: [
      "PRIMARY HIV (Acute Retroviral Syndrome, ARS): 2–4 weeks post-exposure — fever, lymphadenopathy, pharyngitis, maculopapular rash, myalgia, oral ulcers — 'mononucleosis-like illness' — spontaneously resolves in 2–4 weeks",
      "ASYMPTOMATIC PHASE (8–10 years): Clinically silent. CD4 declining. HIV RNA detectable. Persistent Generalized Lymphadenopathy (PGL) may develop.",
      "SYMPTOMATIC HIV (CD4 200–500): Oral candidiasis (thrush), Herpes zoster (shingles), hairy leukoplakia, seborrheic dermatitis, recurrent bacterial infections, constitutional symptoms",
      "AIDS (CD4 <200): Opportunistic Infections — TB (most common OI in India), PCP pneumonia, CMV retinitis, Toxoplasma encephalitis, Cryptococcal meningitis, MAC; AIDS-defining malignancies (Kaposi's sarcoma, NHL, invasive cervical cancer); HIV dementia",
    ],
    investigations: [
      "HIV screening: 4th generation ELISA (HIV Ag+Ab combined — detects p24 antigen during window period). Used at ICTC (Integrated Counseling and Testing Centers). India strategy: 3 ELISA tests with different antigens (S1/S2/S3 strategy — reactive on all 3 = HIV-positive).",
      "Confirmatory: Western Blot (reference standard globally) OR HIV RNA PCR (NAT — Nucleic Acid Testing, most sensitive).",
      "CD4 count (CD4+ T-lymphocytes/mm³): Disease staging, ART initiation monitoring, OI prophylaxis thresholds. Normal >500/mm³. AIDS <200/mm³.",
      "HIV viral load (HIV RNA PCR copies/mL): ART monitoring — undetectable (<200 copies/mL) = treatment success. Detectable = treatment failure/adherence issue.",
      "CBC: Lymphopenia, anemia (normocytic), thrombocytopenia.",
      "OI screening: Sputum AFB/CBNAAT (TB — most common OI in India), fundoscopy (CMV retinitis — CD4 <50), CSF India ink staining (Cryptococcal meningitis — CD4 <100), Toxoplasma IgG serology.",
    ],
    treatment:
      "NACP India (NACO) ART Guidelines 2021 — UNIVERSAL TEST AND TREAT (UTT) policy since 2017: ALL HIV-positive individuals start ART regardless of CD4 count, WHO stage, or clinical status. PREFERRED FIRST-LINE ART (adults): TDF (Tenofovir 300mg) + 3TC (Lamivudine 300mg) + DTG (Dolutegravir 50mg) — ONCE DAILY tablet (TLD). HIGH GENETIC BARRIER to resistance — preferred over EFV. Tab. TLE (TDF + 3TC + EFV 600mg) still used where DTG unavailable. CHILDREN: ABC (Abacavir) + 3TC + DTG (weight-based dosing). ART is LIFE-LONG — adherence >95% required. OI PROPHYLAXIS: CD4 <200/mm³ → Tab. Cotrimoxazole/TMP-SMX (Septran/Bactrim) 960mg daily (PCP + Toxoplasma prophylaxis). PMTCT (Prevention of Mother-to-Child Transmission): ALL HIV+ pregnant women on ART + infant Tab./Syr. Nevirapine (NVP) × 6 weeks. ART + PMTCT FREE at all ARTC (ART Centres) — 700+ centers across India.",
    complications: [
      "Opportunistic Infections: TB (leading OI cause of death in PLHIV — India), PCP pneumonia, CMV retinitis, Cryptococcal meningitis, CNS toxoplasmosis",
      "AIDS-defining malignancies: Kaposi's sarcoma (HHV-8), Non-Hodgkin lymphoma (EBV), invasive cervical cancer (HPV), anal cancer",
      "HIV-associated neurocognitive disorders (HAND) and HIV dementia (subcortical dementia)",
      "IRIS (Immune Reconstitution Inflammatory Syndrome): Paradoxical worsening of OI within weeks of ART start due to immune recovery — especially TB-IRIS",
      "ART drug toxicity: TDF → nephrotoxicity/Fanconi syndrome (monitor creatinine); EFV → CNS toxicity (vivid dreams, dizziness); Nevirapine → hepatotoxicity/SJS",
    ],
    differentiatingFeature:
      "HIV STAGING by CD4: CD4 >500/mm³ = Stage 1 (asymptomatic). CD4 200–499 = Stage 2–3 (minor to major symptomatic). CD4 <200 = Stage 4 (AIDS — major OIs). BUT: ART started at ANY CD4 (UTT policy since 2017). OI prophylaxis with Cotrimoxazole when CD4 <200. Viral load is the BEST marker of ART efficacy (not CD4 — CD4 rises slowly after ART).",
    pearlPoints: [
      "NEET PG Classic: UNIVERSAL TEST AND TREAT (UTT) = ALL HIV+ persons start ART regardless of CD4 count (India NACO 2017). ART is LIFE-LONG. First-line: TDF + 3TC + DTG (TLD tablet — once daily).",
      "Window period: Time from HIV infection to antibody positivity = 3–12 weeks (ELISA). 4th gen Ag+Ab ELISA detects earlier (p24 antigen appears 2 weeks post-exposure). HIV RNA PCR detects earliest (1–2 weeks). During window period — all tests may be negative despite infection.",
      "India NACP objectives (Phase V, 2022–2027): 95-95-95 targets — 95% HIV+ persons know status, 95% of those on ART, 95% virally suppressed. ICTC = testing; ARTC = treatment. Both FREE.",
      "OI prophylaxis thresholds: CD4 <200 → start Cotrimoxazole (PCP + Toxoplasma). CD4 <50 → start Azithromycin 1200mg weekly (MAC prophylaxis). STOP prophylaxis when CD4 >200 on ART × 3 months.",
      "TB-HIV co-infection: TB is leading cause of death in PLHIV in India. When BOTH diagnosed: Start ATT first → ART within 2 weeks (CD4 <50) or 8 weeks (CD4 >50). Rifampicin interaction: Use DTG 50mg BD (doubled dose) or switch EFV when on Rifampicin.",
    ],
    icmrProtocol:
      "NACO (National AIDS Control Organisation) ART Guidelines 2021. Universal Test and Treat. ICTC for testing. ARTC for ART. PMTCT protocol under NACP + PPTCT programme.",
    indianBrandDrugs: [
      "Tab. TLD (TDF 300mg + 3TC 300mg + DTG 50mg) once daily — FREE at ARTC",
      "Tab. TLE (TDF + 3TC + EFV 600mg) once daily — alternative",
      "Tab. Cotrimoxazole/TMP-SMX (Bactrim/Septran) 960mg daily — OI prophylaxis",
      "Tab. Fluconazole (Forcan/Zocon) for Cryptococcal prophylaxis",
      "Syr. Nevirapine (Nevimune) for infant PMTCT",
    ],
  },
  {
    name: "Vitamin A Deficiency — Prevention Programme",
    subject: "Community",
    icd10: "E50.9",
    category: "Nutritional Deficiency Disease / National Programme",
    definition:
      "Nutritional deficiency of Vitamin A (retinol — fat-soluble vitamin), the leading preventable cause of childhood blindness globally and a major cause of increased susceptibility to infections and mortality in children <5 years; manifesting as Xerophthalmia (WHO classification X0–XF: night blindness → corneal ulceration → keratomalacia), impaired immunity, growth retardation; addressed through India's NHM Vitamin A Supplementation Programme (9 doses, 9 months to 5 years).",
    etiology:
      "Primary: Inadequate dietary intake (low consumption of dark green leafy vegetables, yellow/orange fruits/vegetables, liver, dairy — poverty-related). Secondary: Fat malabsorption (chronic diarrhea, celiac disease, cystic fibrosis — fat-soluble vitamin absorption impaired). Risk factors: PEM (protein required for retinol-binding protein synthesis/transport), measles (dramatically depletes Vitamin A acutely), HIV, exclusive breastfeeding cessation without complementary feeding, premature infants. India: 18% under-5 children have subclinical VAD; predominantly affects children 1–5 years + pregnant/lactating women.",
    pathophysiology:
      "Vitamin A (retinol) → retinal (retinaldehyde) by retinal dehydrogenase → combines with opsin in rod photoreceptors → rhodopsin (visual pigment of rods — night/dim light vision). Deficiency → rhodopsin depletion → NIGHT BLINDNESS (nyctalopia — earliest symptom). Retinoic acid → nuclear retinoic acid receptors (RAR/RXR) → gene transcription → epithelial cell differentiation (goblet cell maintenance). Deficiency → squamous metaplasia: conjunctiva → conjunctival xerosis → Bitot's spots → corneal xerosis → corneal ulceration → keratomalacia (irreversible softening/liquefaction). Immune function: Vitamin A regulates TH1/TH2 balance, NK cell function, innate immunity (mucus barrier).",
    clinicalFeatures: [
      "Night blindness (nyctalopia — X0): EARLIEST and MOST COMMON symptom. Child cannot see in dim light/darkness. History: 'child trips at dusk', 'cannot move in dark room'.",
      "Conjunctival xerosis (X1A): Dull, dry conjunctiva losing normal lustre and 'wet' appearance — first objective sign",
      "Bitot's spots (X1B): Foamy, glistening, triangular/oval, pearly-white/silvery-grey plaques on TEMPORAL (and nasal) bulbar conjunctiva — PATHOGNOMONIC of Vitamin A deficiency",
      "Corneal xerosis (X2): Dry, hazy, lackluster cornea — reversible if treated",
      "Corneal ulceration (X3A): Punched-out corneal ulcers (superadded bacterial infection — Pseudomonas, Streptococcus) — medical emergency",
      "Keratomalacia (X3B): Complete liquefaction/softening/melting of entire cornea → irreversible total blindness — MEDICAL EMERGENCY",
      "Growth retardation and increased susceptibility to respiratory infections, diarrhea (epithelial integrity lost)",
      "Follicular hyperkeratosis (Phrynoderma/'Toad skin'): Dry, rough, papular skin at hair follicles — extracutaneous sign",
    ],
    investigations: [
      "Serum retinol level: <10 mcg/dL (0.35 μmol/L) = clinical deficiency. 10–20 mcg/dL = subclinical deficiency. GOLD STANDARD biochemical test.",
      "Conjunctival impression cytology (CIC): Loss of goblet cells + squamous metaplasia of conjunctival epithelium = subclinical VAD (sensitive field/research test).",
      "Dark adaptation test: Elevated threshold for dark adaptation (rod function test). Portable devices for field use.",
      "Slit-lamp biomicroscopy: Direct visualization of Bitot's spots, corneal changes (clinical gold standard for ocular staging).",
      "Modified relative dose response (MRDR): Blood retinol before and after Vitamin A loading dose (hepatic stores assessment).",
      "WHO Xerophthalmia Classification: XN (night blindness), X1A (conjunctival xerosis), X1B (Bitot's), X2 (corneal xerosis), X3A (corneal ulceration <⅓), X3B (keratomalacia ≥⅓ cornea), XS (corneal scar), XF (xerophthalmic fundus).",
    ],
    treatment:
      "VITAMIN A SUPPLEMENTATION (WHO/IAP/NHM protocol): THERAPEUTIC DOSE (deficiency states/measles): THREE doses — Day 1 + Day 2 + after 2 weeks: <6 months: 50,000 IU each. 6 months–1 year: 100,000 IU each. >1 year: 200,000 IU each. Cap./Tab. Vitamin A (Arovit/Aquasol A). KERATOMALACIA (EMERGENCY): SAME three-dose regimen urgently — corneal improvement in 24–48h if treatment started early before perforation. Eye care: tetracycline eye ointment (prevent superinfection), eye pad/patch, topical Vitamin A drops. PREVENTIVE SUPPLEMENTATION (India NHM): Universal schedule — 9 months, 18 months, 2, 3, 4, 5 years: 2,00,000 IU (2 lakh IU) every 6 months. Delivery platform: VHSND (Village Health Sanitation and Nutrition Day) at Anganwadi centre by ANM/ASHA. DIETARY COUNSELLING: Dark green leafy vegetables (palak, methi), ripe mango, papaya, carrot, orange/yellow fruits, dairy products, eggs, liver.",
    complications: [
      "Keratomalacia and permanent total blindness (irreversible if treatment delayed beyond corneal perforation — most devastating outcome)",
      "Greatly increased susceptibility to respiratory infections (measles, pneumonia) and diarrheal diseases — contributes to >1 million child deaths/year globally",
      "Growth retardation and stunting (retinoic acid essential for growth and differentiation)",
      "Increased maternal mortality during pregnancy (severe VAD associated with night blindness in mothers and maternal mortality)",
      "Follicular hyperkeratosis (Phrynoderma) — cosmetically distressing, marker of severe deficiency",
    ],
    differentiatingFeature:
      "BITOT'S SPOTS in children vs adults: Bitot's spots in CHILDREN (<5 years) + night blindness = TRUE Vitamin A deficiency — treat with Vitamin A (200,000 IU). Bitot's spots in ADULTS (elderly) without night blindness = may be PHYSIOLOGICAL (inactive, non-Vitamin A related degenerative change) — Vitamin A will NOT resolve them. Location: temporal conjunctiva (most common). Triangular, foamy, pearly-white, adherent to conjunctival surface.",
    pearlPoints: [
      "NEET PG Classic: Bitot's spots = PATHOGNOMONIC of Vitamin A deficiency. Triangular foamy pearly-white plaques on TEMPORAL bulbar conjunctiva. WHO Xerophthalmia Stage X1B. Most asked sign.",
      "Night blindness (nyctalopia) = EARLIEST sign of VAD. Rod photoreceptor dysfunction (rhodopsin depletion). Tested by history from mother ('child cannot see at dusk'). Earliest treatable stage.",
      "India Vitamin A supplementation schedule (NHM): 2 lakh IU at 9 months, 18 months, then every 6 months until 5 years = 9 doses total. Via VHSND (Village Health Sanitation and Nutrition Day) at Anganwadi.",
      "Measles + Vitamin A deficiency = most dangerous combination. Measles causes ACUTE SEVERE depletion of Vitamin A → keratomalacia within days → irreversible blindness. Every child with measles must receive Vitamin A IMMEDIATELY (even if no deficiency signs).",
      "Keratomalacia (X3B): Complete liquefaction of cornea = IRREVERSIBLE total blindness. Medical emergency — treat within hours. Three doses of Vitamin A urgently (Day 1 + Day 2 + after 2 weeks). Prevention is the only real solution — treat before X3A.",
    ],
    icmrProtocol:
      "NHM Vitamin A Supplementation Programme. VHSND delivery platform. WHO Xerophthalmia classification for staging. Vitamin A in measles mandatory (NHM/WHO recommendation).",
    indianBrandDrugs: [
      "Cap./Tab. Vitamin A (Arovit/Aquasol A) 200,000 IU (100,000 IU for 6–12 months)",
      "Vitamin A eye drops (topical, for corneal xerosis/ulceration)",
      "Tetracycline eye ointment 1% (for infected corneal ulcers in keratomalacia)",
    ],
  },
];

export const allBatch4Diseases: DiseaseEntry[] = [
  ...forensicDiseases,
  ...communityDiseases,
];
