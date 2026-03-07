import type { PatientCase } from "../backend.d";

// Seed cases are frontend-only fallbacks used when backend returns empty.
// They do NOT go to the backend.
// correctMedicines contains medicine names as strings (not IDs) for display only.

type SeedCase = Omit<PatientCase, "correctMedicines"> & {
  correctMedicines: string[];
};

export const SEED_CASES: SeedCase[] = [
  // ──────────────────────────────────────────────
  // ANATOMY (2 cases: theory + clinical correlation)
  // ──────────────────────────────────────────────
  {
    id: "seed-anatomy-001",
    diseaseId: "seed-disease-anatomy-1",
    title: "Brachial Plexus Injury — Erb's Palsy",
    patientAge: BigInt(28),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Right arm weakness after motorcycle accident",
    history:
      "28-year-old male came in after falling off a motorcycle and landing on his right shoulder. He cannot lift his arm and reports numbness along the outer aspect of the arm. No loss of consciousness.",
    examinationFindings:
      "Waiter's tip posture (arm medially rotated, forearm pronated). Loss of shoulder abduction and elbow flexion. Diminished sensation over lateral arm (C5 dermatome).",
    investigations:
      "X-ray cervical spine and right shoulder: no fracture. EMG: denervation pattern at C5–C6 level consistent with Erb's palsy.",
    correctDiagnosis: "Erb's Palsy (Upper Brachial Plexus Injury — C5, C6)",
    correctMedicines: ["Physiotherapy", "NSAIDs (Ibuprofen)"],
    difficulty: "Medium",
    subject: "Anatomy",
  },
  {
    id: "seed-anatomy-002",
    diseaseId: "seed-disease-anatomy-2",
    title: "Femoral Triangle Pulsatile Mass",
    patientAge: BigInt(45),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Pulsatile lump in right groin for 2 months",
    history:
      "45-year-old female with hypertension noticed a gradually enlarging swelling in her right groin. Mild discomfort on walking. No fever or skin changes. History of previous femoral artery catheterisation 3 months ago.",
    examinationFindings:
      "Soft, pulsatile swelling in right femoral triangle. Expansile impulse on coughing. Bruit on auscultation. Skin over it is normal.",
    investigations:
      "Doppler USG: femoral artery pseudoaneurysm measuring 3 × 2 cm. CT angiography confirms diagnosis.",
    correctDiagnosis: "Femoral Artery Pseudoaneurysm",
    correctMedicines: [
      "Ultrasound-guided thrombin injection",
      "Surgical repair if large",
    ],
    difficulty: "Hard",
    subject: "Anatomy",
  },

  // ──────────────────────────────────────────────
  // PHYSIOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-physiology-001",
    diseaseId: "seed-disease-physiology-1",
    title: "Kussmaul Breathing in DKA",
    patientAge: BigInt(35),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Rapid deep breathing and fatigue for 1 day",
    history:
      "Known Type 1 diabetic who missed insulin for 3 days. Presents with nausea, vomiting, rapid deep breathing, and generalised weakness.",
    examinationFindings:
      "Kussmaul breathing (deep, rapid respirations). Dehydrated — dry mucous membranes, reduced skin turgor. Fruity (acetone) breath odour. HR 108/min, BP 94/60 mmHg.",
    investigations:
      "ABG: pH 7.10, PaCO2 20 mmHg, HCO3 8 mEq/L (metabolic acidosis with respiratory compensation). Blood glucose: 450 mg/dL. Urine ketones: 3+.",
    correctDiagnosis:
      "Diabetic Ketoacidosis (DKA) with Respiratory Compensation",
    correctMedicines: [
      "Regular Insulin infusion",
      "IV 0.9% Normal Saline",
      "IV Potassium Chloride",
    ],
    difficulty: "Medium",
    subject: "Physiology",
  },
  {
    id: "seed-physiology-002",
    diseaseId: "seed-disease-physiology-2",
    title: "Starling's Law — Acute Heart Failure",
    patientAge: BigInt(62),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Breathlessness on lying flat and ankle swelling",
    history:
      "62-year-old male with known ischaemic heart disease presenting with worsening dyspnoea over 5 days. Cannot lie flat — uses 3 pillows. Bilateral ankle swelling. Reduced urine output.",
    examinationFindings:
      "Raised JVP. Bilateral basal crepitations. S3 gallop. Bilateral pitting oedema up to knees. BP 150/95, HR 100/min.",
    investigations:
      "CXR: cardiomegaly, upper lobe diversion, Kerley B lines. Echo: EF 30%, dilated LV. BNP markedly elevated.",
    correctDiagnosis: "Congestive Cardiac Failure (Systolic Dysfunction)",
    correctMedicines: [
      "Furosemide (IV)",
      "ACE Inhibitor (Enalapril)",
      "Beta Blocker (Carvedilol)",
      "Spironolactone",
    ],
    difficulty: "Medium",
    subject: "Physiology",
  },

  // ──────────────────────────────────────────────
  // BIOCHEMISTRY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-biochemistry-001",
    diseaseId: "seed-disease-biochemistry-1",
    title: "Wilson's Disease — Copper Metabolism Defect",
    patientAge: BigInt(18),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Tremors, jaundice, and behavioural changes",
    history:
      "18-year-old male presents with progressive tremors for 6 months, jaundice, and his family reports personality changes and deteriorating school performance. Family history: elder sibling died of liver disease.",
    examinationFindings:
      "Kayser-Fleischer rings on slit-lamp examination. Hepatosplenomegaly. Extrapyramidal signs — wing-beating tremor. Mild jaundice.",
    investigations:
      "Serum ceruloplasmin: low (8 mg/dL). 24-hour urine copper: elevated. Liver biopsy: copper deposition. LFT: transaminitis.",
    correctDiagnosis: "Wilson's Disease (Hepatolenticular Degeneration)",
    correctMedicines: ["D-Penicillamine", "Zinc acetate", "Low copper diet"],
    difficulty: "Hard",
    subject: "Biochemistry",
  },
  {
    id: "seed-biochemistry-002",
    diseaseId: "seed-disease-biochemistry-2",
    title: "Phenylketonuria — Newborn Screening",
    patientAge: BigInt(2),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Musty odour, fair complexion, and developmental delay",
    history:
      "2-month-old infant brought by parents with concerns about unusual musty odour in urine. Baby appears lethargic and feeds poorly. Parents are consanguineous.",
    examinationFindings:
      "Fair complexion (hypopigmentation) compared to parents. Eczematous skin rash. Mild hypotonia. Microcephaly developing.",
    investigations:
      "Guthrie (heel prick) test: positive. Serum phenylalanine: 30 mg/dL (markedly elevated). Urine: phenylpyruvic acid on FeCl3 test (green colour).",
    correctDiagnosis:
      "Phenylketonuria (PKU) — Phenylalanine Hydroxylase Deficiency",
    correctMedicines: [
      "Phenylalanine-restricted diet",
      "Tyrosine supplementation",
      "BH4 (Sapropterin) if responsive",
    ],
    difficulty: "Medium",
    subject: "Biochemistry",
  },

  // ──────────────────────────────────────────────
  // PATHOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-pathology-001",
    diseaseId: "seed-disease-pathology-1",
    title: "Hodgkin's Lymphoma — Young Adult",
    patientAge: BigInt(22),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Painless neck swelling and fever for 3 months",
    history:
      "22-year-old female with painless bilateral cervical lymphadenopathy for 3 months. Associated with evening fever, drenching night sweats, and weight loss of 7 kg (B symptoms).",
    examinationFindings:
      "Multiple firm, rubbery, non-tender cervical and axillary lymph nodes. Splenomegaly. No hepatomegaly. Mediastinal dullness on percussion.",
    investigations:
      "CXR: mediastinal widening. CT chest-abdomen-pelvis: mediastinal adenopathy. Excision biopsy: Reed-Sternberg cells (owl-eye appearance). CD15+, CD30+ on IHC.",
    correctDiagnosis: "Hodgkin's Lymphoma — Nodular Sclerosis Subtype",
    correctMedicines: [
      "ABVD chemotherapy (Doxorubicin, Bleomycin, Vinblastine, Dacarbazine)",
      "Radiotherapy",
    ],
    difficulty: "Hard",
    subject: "Pathology",
  },
  {
    id: "seed-pathology-002",
    diseaseId: "seed-disease-pathology-2",
    title: "Barrett's Oesophagus — GERD Complication",
    patientAge: BigInt(55),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Longstanding heartburn with recent dysphagia",
    history:
      "55-year-old obese male with 15-year history of heartburn and acid regurgitation, now presenting with difficulty swallowing solid food. Non-smoker, occasional alcohol use.",
    examinationFindings:
      "Obese (BMI 34). Epigastric tenderness on deep palpation. No palpable lymph nodes. No hepatomegaly.",
    investigations:
      "OGD: salmon-coloured mucosa extending proximally from GEJ. Biopsy: intestinal metaplasia with goblet cells (Barrett's oesophagus). pH monitoring: DeMeester score 50.",
    correctDiagnosis: "Barrett's Oesophagus (Intestinal Metaplasia at GEJ)",
    correctMedicines: [
      "High-dose Proton Pump Inhibitor (Omeprazole 40 mg BD)",
      "Endoscopic ablation (RFA) for dysplasia",
      "Lifestyle modification",
    ],
    difficulty: "Medium",
    subject: "Pathology",
  },

  // ──────────────────────────────────────────────
  // MICROBIOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-microbiology-001",
    diseaseId: "seed-disease-microbiology-1",
    title: "Pulmonary Tuberculosis — AFB Positive",
    patientAge: BigInt(30),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Cough with blood-stained sputum for 6 weeks",
    history:
      "30-year-old male labourer with persistent cough for 6 weeks, occasional haemoptysis, evening fever, night sweats, and 10 kg weight loss. Lives in a crowded chawl. No prior TB treatment.",
    examinationFindings:
      "Wasted appearance. Dullness on percussion right upper zone. Reduced breath sounds with crackles right apex. Hilar lymph nodes palpable in supraclavicular fossa.",
    investigations:
      "Sputum AFB smear: 3+ acid-fast bacilli (Ziehl-Neelsen stain). CXR: right upper lobe cavitary lesion. Gene Xpert: M. tuberculosis detected, Rifampicin sensitive.",
    correctDiagnosis: "Pulmonary Tuberculosis — Smear Positive",
    correctMedicines: [
      "Rifampicin",
      "Isoniazid",
      "Pyrazinamide",
      "Ethambutol (RIPE regimen 2HRZE/4HR)",
    ],
    difficulty: "Easy",
    subject: "Microbiology",
  },
  {
    id: "seed-microbiology-002",
    diseaseId: "seed-disease-microbiology-2",
    title: "MRSA Wound Infection Post-Surgery",
    patientAge: BigInt(48),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Wound redness and discharge after knee replacement",
    history:
      "48-year-old male, day 5 post right total knee arthroplasty. Wound site shows increasing redness, warmth, and purulent discharge. Fever 38.8°C. Did not respond to empirical Cefazolin.",
    examinationFindings:
      "Surgical wound erythematous, swollen, with yellowish purulent discharge. Surrounding cellulitis extending 4 cm. Tender on palpation. No lymphangitis.",
    investigations:
      "Wound swab culture: Staphylococcus aureus — Oxacillin resistant (MRSA). Sensitivity: Vancomycin-sensitive, Linezolid-sensitive.",
    correctDiagnosis: "MRSA Surgical Site Infection",
    correctMedicines: [
      "Vancomycin (IV)",
      "Wound debridement",
      "Daptomycin (alternative)",
    ],
    difficulty: "Medium",
    subject: "Microbiology",
  },

  // ──────────────────────────────────────────────
  // PHARMACOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-pharmacology-001",
    diseaseId: "seed-disease-pharmacology-1",
    title: "Paracetamol Overdose — Hepatotoxicity",
    patientAge: BigInt(25),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Abdominal pain and nausea after taking many tablets",
    history:
      "25-year-old female brought to casualty after intentional ingestion of approximately 25 tablets of Paracetamol 500 mg (12.5 g total) 4 hours ago. Nausea and right upper quadrant pain.",
    examinationFindings:
      "Alert but distressed. RUQ tenderness. No jaundice yet (too early). HR 98/min, BP 110/70 mmHg.",
    investigations:
      "Serum paracetamol level at 4 hours: 200 mcg/mL (above treatment line on Rumack-Matthew nomogram). LFTs: elevated AST/ALT. PT: prolonged.",
    correctDiagnosis: "Paracetamol Overdose — Risk of Hepatotoxicity",
    correctMedicines: [
      "N-Acetylcysteine (NAC) IV infusion",
      "Activated charcoal (if within 1 hour)",
      "Supportive care",
    ],
    difficulty: "Medium",
    subject: "Pharmacology",
  },
  {
    id: "seed-pharmacology-002",
    diseaseId: "seed-disease-pharmacology-2",
    title: "Drug Interaction — Warfarin + Aspirin",
    patientAge: BigInt(68),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint:
      "Gum bleeding and easy bruising after starting new medication",
    history:
      "68-year-old male on Warfarin for AF (INR stable at 2.5) started Aspirin 75 mg daily self-prescribed for joint pain 2 weeks ago. Now presents with spontaneous gum bleeding and multiple bruises.",
    examinationFindings:
      "Gum bleeding on pressure. Multiple ecchymoses over forearms and thighs. No active internal bleeding signs. INR on admission: 5.8.",
    investigations:
      "INR: 5.8 (supratherapeutic). PT markedly prolonged. CBC: Hb 11.2 g/dL.",
    correctDiagnosis: "Warfarin Toxicity due to Drug Interaction with Aspirin",
    correctMedicines: [
      "Stop Aspirin immediately",
      "Reduce Warfarin dose",
      "Vitamin K1 (Phytomenadione) oral",
      "Monitor INR closely",
    ],
    difficulty: "Medium",
    subject: "Pharmacology",
  },

  // ──────────────────────────────────────────────
  // FORENSIC MEDICINE & TOXICOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-forensic-001",
    diseaseId: "seed-disease-forensic-1",
    title: "Organophosphate Poisoning — Pesticide Exposure",
    patientAge: BigInt(40),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint:
      "Excessive salivation, tears, and vomiting after working in farm",
    history:
      "40-year-old farmer brought by family after spraying pesticide without protective gear. Developed vomiting, excessive salivation, lacrimation, and difficulty breathing within 30 minutes. Urinary incontinence noted.",
    examinationFindings:
      "Pinpoint pupils (miosis). Profuse salivation, lacrimation, urination (SLUDGE syndrome). Bronchospasm with wheeze. Bradycardia HR 48/min. Fasciculations in limb muscles. Altered consciousness.",
    investigations:
      "Serum/RBC cholinesterase: markedly depressed. ECG: bradycardia, QTc prolonged. CXR: pulmonary oedema developing.",
    correctDiagnosis: "Organophosphate Poisoning (Cholinergic Crisis)",
    correctMedicines: [
      "Atropine (large doses IV)",
      "Pralidoxime (2-PAM) IV",
      "Remove clothing and decontaminate skin",
      "Diazepam for seizures",
    ],
    difficulty: "Hard",
    subject: "Forensic Medicine & Toxicology",
  },
  {
    id: "seed-forensic-002",
    diseaseId: "seed-disease-forensic-2",
    title: "Wound Age Estimation — Medico-legal Case",
    patientAge: BigInt(32),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Stab wound — police requisition for wound age estimation",
    history:
      "32-year-old male with a stab wound to the left flank brought by police. Patient claims the assault happened 3 days ago. Police suspect the wound is more recent. Forensic opinion requested.",
    examinationFindings:
      "Wound: 3 cm incised wound, left flank. Wound edges show early granulation tissue and mild fibroblastic activity. No sutures. Surrounding bruising is yellowish-green (bile pigment). No fresh bleeding.",
    investigations:
      "Histopathology of wound edge biopsy: fibroblast infiltration, new capillary formation, beginning collagen deposition. Compatible with 3–5 day old wound.",
    correctDiagnosis: "Wound age 3–5 days (consistent with patient's history)",
    correctMedicines: [
      "Wound cleaning and dressing",
      "Tetanus prophylaxis",
      "Analgesics",
    ],
    difficulty: "Hard",
    subject: "Forensic Medicine & Toxicology",
  },

  // ──────────────────────────────────────────────
  // COMMUNITY MEDICINE (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-community-001",
    diseaseId: "seed-disease-community-1",
    title: "Measles Outbreak — Unvaccinated Village",
    patientAge: BigInt(60),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Multiple children in village developing fever and rash",
    history:
      "A village PHC reports 15 children aged 6 months to 5 years developing high fever, cough, coryza, and maculopapular rash within 2 weeks. Vaccination coverage audit shows only 30% coverage for MMR.",
    examinationFindings:
      "Typical case: Koplik spots on buccal mucosa. Maculopapular rash spreading centrifugally from face. High fever (40°C). Conjunctivitis.",
    investigations:
      "Serology: anti-measles IgM positive in 12 of 15 cases. Attack rate: 18%. Herd immunity threshold not met.",
    correctDiagnosis: "Measles Outbreak due to Vaccine Preventable Disease",
    correctMedicines: [
      "Supportive care (ORS, Vitamin A supplementation)",
      "Immunisation of all susceptible contacts",
      "Isolation of cases",
    ],
    difficulty: "Easy",
    subject: "Community Medicine",
  },
  {
    id: "seed-community-002",
    diseaseId: "seed-disease-community-2",
    title: "Vitamin A Deficiency — Nutritional Night Blindness",
    patientAge: BigInt(48),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint:
      "Child cannot see in dim light — difficulty walking at night",
    history:
      "Mother brings 4-year-old child from a tribal area. Child has difficulty seeing at dusk (night blindness) for 3 months. Diet consists mainly of rice and dal with no green leafy vegetables or dairy.",
    examinationFindings:
      "Bitot's spots (foamy grey spots on temporal bulbar conjunctiva). Corneal xerosis. Growth retarded — weight for age below 3rd centile.",
    investigations:
      "Serum retinol: 0.12 mg/L (severe deficiency, normal >0.30 mg/L). MUAC: 11.5 cm.",
    correctDiagnosis:
      "Vitamin A Deficiency (Xerophthalmia) with Night Blindness",
    correctMedicines: [
      "Vitamin A capsule 200,000 IU (oral, day 1, day 2, day 14)",
      "Nutritional supplementation",
      "Diet counselling — green leafy vegetables",
    ],
    difficulty: "Easy",
    subject: "Community Medicine",
  },

  // ──────────────────────────────────────────────
  // OPHTHALMOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-ophthalmology-001",
    diseaseId: "seed-disease-ophthalmology-1",
    title: "Acute Angle-Closure Glaucoma",
    patientAge: BigInt(58),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint:
      "Sudden severe right eye pain with vomiting and blurred vision",
    history:
      "58-year-old female with sudden onset severe right eye pain radiating to the head, nausea, vomiting, and rainbow halos around lights. Came after watching a movie in a dark theatre.",
    examinationFindings:
      "Right eye: red, cornea steamy (oedematous), fixed mid-dilated pupil (4 mm), IOP by tonometry: 58 mmHg. Left eye: normal. Semi-dilated pupil suggests predisposing shallow anterior chamber.",
    investigations:
      "Gonioscopy: closed angle right eye. VF: early constriction. Fundus: cup:disc ratio 0.7 right eye.",
    correctDiagnosis: "Acute Primary Angle-Closure Glaucoma (Right Eye)",
    correctMedicines: [
      "IV Acetazolamide 500 mg immediately",
      "Topical Pilocarpine 2% (to constrict pupil)",
      "IV Mannitol 20% (to reduce IOP rapidly)",
      "Laser iridotomy after acute episode",
    ],
    difficulty: "Hard",
    subject: "Ophthalmology",
  },
  {
    id: "seed-ophthalmology-002",
    diseaseId: "seed-disease-ophthalmology-2",
    title: "Diabetic Retinopathy — Fundus Examination",
    patientAge: BigInt(52),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Gradual painless visual blurring for 6 months",
    history:
      "52-year-old male with 12-year history of Type 2 diabetes with poor glycaemic control (HbA1c 9.8%). Presents with gradual painless blurring in both eyes. No pain or floaters.",
    examinationFindings:
      "BCVA: 6/18 OD, 6/9 OS. Fundus: bilateral dot and blot haemorrhages, hard exudates around fovea, cotton wool spots, new vessel formation (NVD) right eye — proliferative changes.",
    investigations:
      "FFA: neovascularisation disc right eye with leakage. OCT: centre-involving DME with subretinal fluid.",
    correctDiagnosis:
      "Proliferative Diabetic Retinopathy with Diabetic Macular Oedema",
    correctMedicines: [
      "Intravitreal Anti-VEGF (Ranibizumab/Bevacizumab)",
      "Pan-Retinal Photocoagulation (PRP laser)",
      "Optimise glycaemic control",
    ],
    difficulty: "Hard",
    subject: "Ophthalmology",
  },

  // ──────────────────────────────────────────────
  // ENT (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-ent-001",
    diseaseId: "seed-disease-ent-1",
    title: "CSOM — Safe Type (Tubotympanic)",
    patientAge: BigInt(120),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint:
      "Ear discharge and hearing loss in left ear since childhood",
    history:
      "10-year-old male (age in months: 120) with intermittent mucopurulent discharge from left ear since age 3. Discharge worsens during upper respiratory tract infections. No pain, no vertigo.",
    examinationFindings:
      "Otoscopy left ear: central perforation in pars tensa (tubotympanic), mucopurulent discharge. Hearing loss — pure tone audiometry: conductive loss 35 dB. No cholesteatoma. Right ear: normal.",
    investigations:
      "Audiometry: conductive hearing loss left ear 35 dB. Culture from discharge: Pseudomonas aeruginosa. CT mastoids: no bone erosion.",
    correctDiagnosis:
      "Chronic Suppurative Otitis Media — Safe Type (Tubotympanic)",
    correctMedicines: [
      "Ciprofloxacin ear drops",
      "Ear syringing/aural toilet",
      "Myringoplasty (after dry period)",
    ],
    difficulty: "Medium",
    subject: "ENT",
  },
  {
    id: "seed-ent-002",
    diseaseId: "seed-disease-ent-2",
    title: "Allergic Rhinitis — House Dust Mite",
    patientAge: BigInt(24),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Persistent nasal congestion, sneezing, and itchy eyes",
    history:
      "24-year-old female medical student with 2-year history of morning sneezing attacks (>10 consecutive sneezes), watery nasal discharge, nasal blockage, and itchy eyes. Symptoms worsen in bedroom and during bed-making. Family history of asthma.",
    examinationFindings:
      "Pale, boggy, bluish nasal mucosa bilaterally. Clear watery discharge. Allergic salute crease across nose. Conjunctival injection. No polyps.",
    investigations:
      "Nasal smear: eosinophilia. Skin prick test: positive to house dust mite (Dermatophagoides). Total IgE: 450 IU/mL.",
    correctDiagnosis:
      "Allergic Rhinitis — Persistent Moderate-Severe (House Dust Mite)",
    correctMedicines: [
      "Intranasal Fluticasone spray",
      "Non-sedating Antihistamine (Cetirizine/Loratadine)",
      "Dust mite avoidance measures",
      "Allergen immunotherapy (SIT) for long-term",
    ],
    difficulty: "Easy",
    subject: "ENT",
  },

  // ──────────────────────────────────────────────
  // GENERAL MEDICINE (3 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-medicine-001",
    diseaseId: "seed-disease-medicine-1",
    title: "Falciparum Malaria — Severe",
    patientAge: BigInt(25),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "High fever, confusion, and altered consciousness",
    history:
      "25-year-old male returned from a forested tribal district in Odisha 7 days ago. High fever (40°C), chills, headache, and now confusion. Vomiting, unable to stand.",
    examinationFindings:
      "Conscious but confused (GCS 12). Temp 40.2°C, HR 118/min, BP 90/60 mmHg. Severe pallor. Hepatosplenomegaly. Jaundice. No neck stiffness.",
    investigations:
      "RDT: P. falciparum positive. Peripheral smear: ring forms and banana-shaped gametocytes. Hb: 6.2 g/dL. Platelet: 28,000. Bilirubin: 5.8 mg/dL. Creatinine: 2.8 mg/dL.",
    correctDiagnosis:
      "Severe Falciparum Malaria (Cerebral Malaria with Multi-organ Involvement)",
    correctMedicines: [
      "IV Artesunate (drug of choice for severe falciparum)",
      "IV fluids for haemodynamic support",
      "Blood transfusion for severe anaemia",
      "Dialysis if renal failure",
    ],
    difficulty: "Hard",
    subject: "General Medicine",
  },
  {
    id: "seed-medicine-002",
    diseaseId: "seed-disease-medicine-2",
    title: "Dengue Haemorrhagic Fever — Dengue Shock",
    patientAge: BigInt(16),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Fever for 5 days, now cold extremities and restlessness",
    history:
      "16-year-old girl from Mumbai with 5 days of high fever, retro-orbital headache, and myalgia. Now on day 5, fever has suddenly dropped but patient is restless, cold, clammy.",
    examinationFindings:
      "Temperature 36.5°C (defervescence). HR 128/min, BP 80/50 mmHg. Cold clammy extremities. Petechiae over limbs. Positive tourniquet test. Hepatomegaly.",
    investigations:
      "NS1 antigen: positive. Dengue IgM: positive. Platelet: 18,000. PCV 48% (haemoconcentration). Dengue shock = dengue fever + shock + haemoconcentration.",
    correctDiagnosis:
      "Dengue Haemorrhagic Fever Grade III (Dengue Shock Syndrome)",
    correctMedicines: [
      "Crystalloid IV fluid resuscitation (RL or Normal Saline)",
      "Platelet transfusion if <10,000 or active bleeding",
      "Close monitoring of PCV",
    ],
    difficulty: "Hard",
    subject: "General Medicine",
  },
  {
    id: "seed-medicine-003",
    diseaseId: "seed-disease-medicine-3",
    title: "Hypertensive Emergency — Hypertensive Encephalopathy",
    patientAge: BigInt(55),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Severe headache, visual disturbance, and confusion",
    history:
      "55-year-old male with known hypertension (non-compliant with medication). Sudden severe headache, blurred vision, and confusion for 2 hours. On no medications for 3 months.",
    examinationFindings:
      "BP: 230/140 mmHg. HR: 90/min. Papilloedema on fundoscopy. Neurologically: mildly confused, no focal deficit. No meningism.",
    investigations:
      "Urinalysis: protein 2+. ECG: LVH. Creatinine: 1.8 mg/dL. CT head: no bleed, no infarct.",
    correctDiagnosis: "Hypertensive Emergency — Hypertensive Encephalopathy",
    correctMedicines: [
      "IV Labetalol or IV Nicardipine",
      "Target: reduce MAP by 25% in first hour",
      "IV Nitroprusside (if available)",
      "Monitor end-organ damage closely",
    ],
    difficulty: "Medium",
    subject: "General Medicine",
  },

  // ──────────────────────────────────────────────
  // GENERAL SURGERY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-surgery-001",
    diseaseId: "seed-disease-surgery-1",
    title: "Acute Appendicitis — Rebound Tenderness",
    patientAge: BigInt(22),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Central abdominal pain migrating to right iliac fossa",
    history:
      "22-year-old male with pain starting periumbilically 12 hours ago, now localised to right iliac fossa. Anorexia, one episode of vomiting. Low-grade fever.",
    examinationFindings:
      "Temp 38.2°C. Maximal tenderness at McBurney's point. Rebound tenderness positive. Rovsing's sign positive. Psoas sign positive.",
    investigations:
      "WBC: 14,200 (neutrophilia). CRP: elevated. USG abdomen: non-compressible tubular structure in RIF measuring 9 mm with periappendiceal fat stranding. Alvarado score: 8/10.",
    correctDiagnosis: "Acute Appendicitis",
    correctMedicines: [
      "Emergency Appendicectomy (laparoscopic/open)",
      "IV Metronidazole + Ceftriaxone (pre-op)",
      "IV fluids",
    ],
    difficulty: "Easy",
    subject: "General Surgery",
  },
  {
    id: "seed-surgery-002",
    diseaseId: "seed-disease-surgery-2",
    title: "Thyroid Goitre — Solitary Nodule with Hyperthyroidism",
    patientAge: BigInt(38),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Neck swelling with palpitations and weight loss",
    history:
      "38-year-old female with 6-month history of neck swelling, palpitations, heat intolerance, weight loss of 6 kg despite normal appetite, and tremors. Swelling moves with swallowing.",
    examinationFindings:
      "Solitary nodule right lobe thyroid, 3 × 3 cm, firm, moves with swallowing. Fine tremor. Tachycardia 108/min. Brisk reflexes. No exophthalmos.",
    investigations:
      "TSH: <0.01 mIU/L (suppressed). Free T4: 34 pmol/L (elevated). Technetium scan: hot nodule right lobe (autonomous toxic adenoma). FNAC: benign follicular cells.",
    correctDiagnosis: "Toxic Adenoma (Autonomous Functioning Thyroid Nodule)",
    correctMedicines: [
      "Carbimazole (to achieve euthyroid state pre-surgery)",
      "Propranolol (for symptom control)",
      "Radioactive Iodine I-131 or Surgical hemithyroidectomy",
    ],
    difficulty: "Medium",
    subject: "General Surgery",
  },

  // ──────────────────────────────────────────────
  // OBSTETRICS & GYNAECOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-obsgyne-001",
    diseaseId: "seed-disease-obsgyne-1",
    title: "Pre-eclampsia — Primigravida at 34 Weeks",
    patientAge: BigInt(24),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint:
      "Headache, visual disturbance, and swollen legs at 34 weeks",
    history:
      "24-year-old primigravida at 34 weeks gestation presenting with headache, blurring of vision, and facial puffiness for 2 days. No prior hypertension.",
    examinationFindings:
      "BP 160/110 mmHg (repeat). Facial oedema. Pitting oedema bilateral legs. FH: 32 cm (IUGR?). FHR 148/min. Hyperreflexia.",
    investigations:
      "Urine dipstick: protein 3+. 24-hour urine protein: 3.8 g. LFTs mildly elevated. Platelet: 95,000. USG: IUGR with oligohydramnios.",
    correctDiagnosis: "Severe Pre-eclampsia with HELLP syndrome features",
    correctMedicines: [
      "IV Magnesium Sulphate (seizure prophylaxis)",
      "IV Labetalol or Hydralazine (for BP control)",
      "Corticosteroids (Betamethasone for fetal lung maturity)",
      "Delivery after stabilisation",
    ],
    difficulty: "Hard",
    subject: "Obstetrics & Gynaecology",
  },
  {
    id: "seed-obsgyne-002",
    diseaseId: "seed-disease-obsgyne-2",
    title: "Ectopic Pregnancy — Tubal Rupture",
    patientAge: BigInt(28),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Sudden severe lower abdominal pain with fainting",
    history:
      "28-year-old woman, LMP 7 weeks ago, presents with sudden severe lower abdominal pain, shoulder tip pain, and a fainting episode. Urine pregnancy test positive. Previous history of PID.",
    examinationFindings:
      "Pale, sweating, cold clammy extremities. HR 120/min, BP 80/60 mmHg. Diffuse abdominal tenderness. Cervical motion tenderness (CMT positive). No adnexal mass palpable (guarding).",
    investigations:
      "Urine beta-hCG: positive. TVS: no intrauterine pregnancy, free fluid in POD, right adnexal mass 4 cm. Culdocentesis: non-clotting blood.",
    correctDiagnosis: "Ruptured Ectopic Pregnancy (Right Tubal)",
    correctMedicines: [
      "Emergency laparotomy/laparoscopy (salpingectomy)",
      "IV fluid resuscitation",
      "Blood transfusion",
      "Anti-D immunoglobulin (if Rh negative)",
    ],
    difficulty: "Hard",
    subject: "Obstetrics & Gynaecology",
  },

  // ──────────────────────────────────────────────
  // PAEDIATRICS (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-paediatrics-001",
    diseaseId: "seed-disease-paediatrics-1",
    title: "Febrile Seizure — Simple Type",
    patientAge: BigInt(18),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Generalised jerking movements during high fever",
    history:
      "18-month-old male brought after a single episode of generalised tonic-clonic convulsion lasting 2 minutes during fever. Stopped spontaneously. No previous seizures.",
    examinationFindings:
      "Post-ictal drowsy but rousable. Temp 39.8°C. Ear exam: right otitis media. No neck stiffness. Fontanelle normal.",
    investigations:
      "CBC: WBC 14,500 (neutrophilia). CRP: elevated. No further workup required for typical simple febrile seizure.",
    correctDiagnosis:
      "Simple Febrile Seizure (secondary to Acute Otitis Media)",
    correctMedicines: [
      "Paracetamol/Ibuprofen (antipyretic)",
      "Amoxicillin (for otitis media)",
      "Reassurance of parents",
    ],
    difficulty: "Easy",
    subject: "Paediatrics",
  },
  {
    id: "seed-paediatrics-002",
    diseaseId: "seed-disease-paediatrics-2",
    title: "Severe Acute Malnutrition — Kwashiorkor",
    patientAge: BigInt(30),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Puffy face, oedema, and hair changes in child from Bihar",
    history:
      "30-month-old girl from rural Bihar with oedema of both feet and face for 3 months. Diet mainly rice water with minimal protein. Child is irritable, withdrawn.",
    examinationFindings:
      "Bilateral pitting oedema feet and ankles. Oedematous face. Hair: reddish, sparse, easily pluckable (flag sign). Skin: flaky paint dermatosis. Weight-for-height: -3 SD. No medical complications currently.",
    investigations:
      "Serum albumin: 1.8 g/dL. Hb: 7.5 g/dL. RBS: 62 mg/dL (low). MUAC: 10.2 cm.",
    correctDiagnosis: "Severe Acute Malnutrition — Kwashiorkor",
    correctMedicines: [
      "F75 (starter therapeutic milk) then F100",
      "Ready-to-Use Therapeutic Food (RUTF — Plumpy'Nut)",
      "Folic acid, Multivitamins, Zinc",
      "Treat underlying infection",
    ],
    difficulty: "Medium",
    subject: "Paediatrics",
  },

  // ──────────────────────────────────────────────
  // ORTHOPAEDICS (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-ortho-001",
    diseaseId: "seed-disease-ortho-1",
    title: "Colles' Fracture — Distal Radius",
    patientAge: BigInt(65),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Wrist pain and deformity after fall on outstretched hand",
    history:
      "65-year-old post-menopausal woman with known osteoporosis fell on an outstretched hand at home. Immediate pain and swelling over the right wrist. Unable to move the wrist.",
    examinationFindings:
      "Dinner fork deformity of right wrist. Swelling and ecchymosis over dorsum. Tenderness over distal radius. Median nerve sensation intact. Capillary refill normal.",
    investigations:
      "X-ray right wrist AP and lateral: distal radial fracture with dorsal angulation, radial shortening (Colles' type). DEXA: osteoporosis (T-score -2.8).",
    correctDiagnosis: "Colles' Fracture Distal Radius (with Osteoporosis)",
    correctMedicines: [
      "Closed reduction and POP (Plaster of Paris) backslab",
      "Analgesics (Diclofenac)",
      "Start osteoporosis treatment: Bisphosphonates + Calcium + Vitamin D",
    ],
    difficulty: "Easy",
    subject: "Orthopaedics",
  },
  {
    id: "seed-ortho-002",
    diseaseId: "seed-disease-ortho-2",
    title: "Lumbar Disc Prolapse — L4-L5",
    patientAge: BigInt(42),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Low back pain radiating to left leg with tingling",
    history:
      "42-year-old IT professional with chronic low back pain, now 3 weeks of severe pain radiating from left buttock down to the lateral leg and foot (L5 dermatomal distribution). Tingling and numbness. Worse on coughing and sneezing.",
    examinationFindings:
      "Antalgic gait leaning right. SLR positive left at 30°. Lasègue's sign positive. Weakness of left foot dorsiflexion (EHL weakness). Reduced sensation dorsum left foot.",
    investigations:
      "MRI lumbosacral spine: large posterolateral disc prolapse L4-L5 compressing left L5 nerve root.",
    correctDiagnosis: "Lumbar Disc Prolapse L4-L5 with L5 Radiculopathy",
    correctMedicines: [
      "NSAIDs (Diclofenac/Etoricoxib)",
      "Physiotherapy (McKenzie exercises)",
      "Epidural steroid injection",
      "Microdiscectomy if no improvement in 6 weeks",
    ],
    difficulty: "Medium",
    subject: "Orthopaedics",
  },

  // ──────────────────────────────────────────────
  // DERMATOLOGY & VENEREOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-derma-001",
    diseaseId: "seed-disease-derma-1",
    title: "Leprosy — Borderline Tuberculoid",
    patientAge: BigInt(35),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Hypopigmented patches with loss of sensation",
    history:
      "35-year-old male from Jharkhand with 3 hypopigmented patches on trunk for 6 months. No itching. Patient does not feel touch or temperature in these areas. Contact with a known leprosy patient.",
    examinationFindings:
      "3 hypopigmented, well-defined patches with loss of sensation to touch and temperature. Peripheral nerve thickening: left ulnar nerve enlarged and tender. No lagophthalmos or claw hand yet.",
    investigations:
      "Slit skin smear: negative (paucibacillary). Skin biopsy: granulomata with lymphocyte infiltration, PAS negative for bacilli. Lepromin test: positive.",
    correctDiagnosis: "Borderline Tuberculoid (BT) Leprosy",
    correctMedicines: [
      "MDT-PB (Multi-Drug Therapy Paucibacillary): Rifampicin 600 mg monthly + Dapsone 100 mg daily × 6 months",
      "Physiotherapy for nerve involvement",
    ],
    difficulty: "Hard",
    subject: "Dermatology & Venereology",
  },
  {
    id: "seed-derma-002",
    diseaseId: "seed-disease-derma-2",
    title: "Scabies — Intensely Pruritic Skin Infestation",
    patientAge: BigInt(96),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint:
      "Intensely itchy rash worse at night affecting family members",
    history:
      "8-year-old male (96 months) with severe nocturnal itching for 3 weeks. Rash over fingers, wrists, axillae, and groin. His parents and younger sibling also have similar rash.",
    examinationFindings:
      "Multiple papules, vesicles, and excoriations over finger web spaces, wrists, and groin. Characteristic S-shaped burrows visible between fingers. Secondary impetiginisation present.",
    investigations:
      "Skin scraping under mineral oil: microscopy shows Sarcoptes scabiei mites, eggs, and faecal pellets (scybala).",
    correctDiagnosis: "Scabies (Sarcoptes scabiei infestation)",
    correctMedicines: [
      "Permethrin 5% cream (apply neck to toe, wash after 8 hours, repeat after 1 week)",
      "Treat all household contacts simultaneously",
      "Wash all clothes and bedding in hot water",
      "Oral Ivermectin (for crusted/Norwegian scabies)",
    ],
    difficulty: "Easy",
    subject: "Dermatology & Venereology",
  },

  // ──────────────────────────────────────────────
  // PSYCHIATRY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-psychiatry-001",
    diseaseId: "seed-disease-psychiatry-1",
    title: "Major Depressive Disorder — Moderate",
    patientAge: BigInt(30),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Persistent sadness, poor sleep, and inability to work",
    history:
      "30-year-old married woman with 3-month history of pervasive sadness, hopelessness, poor appetite (5 kg weight loss), initial insomnia, inability to concentrate, loss of interest in daily activities, fatigue, and thoughts of worthlessness. Denies suicidal ideation currently.",
    examinationFindings:
      "Unkempt appearance. Psychomotor retardation. Depressed affect. Tearful. Cognitive: difficulty concentrating. No psychosis.",
    investigations:
      "Hamilton Depression Rating Scale: 22/52 (moderate depression). TSH: normal. CBC: normal.",
    correctDiagnosis:
      "Major Depressive Disorder — Moderate (Without Psychosis)",
    correctMedicines: [
      "SSRI: Escitalopram 10 mg daily (first-line)",
      "Cognitive Behavioural Therapy (CBT)",
      "Psychoeducation and supportive therapy",
    ],
    difficulty: "Medium",
    subject: "Psychiatry",
  },
  {
    id: "seed-psychiatry-002",
    diseaseId: "seed-disease-psychiatry-2",
    title: "Alcohol Withdrawal Delirium (DTs)",
    patientAge: BigInt(45),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Tremors, confusion, seeing things after stopping alcohol",
    history:
      "45-year-old male chronic alcoholic who abruptly stopped drinking 3 days ago due to hospitalisation for pneumonia. Now agitated, confused, and reports seeing insects on the wall (tactile and visual hallucinations). Generalized tremors.",
    examinationFindings:
      "Agitated, disoriented to time and place. Coarse tremors. Diaphoresis. Tachycardia 118/min. BP 158/95. Visual and tactile hallucinations. Hyperthermia.",
    investigations:
      "CIWA-Ar score: 28 (severe withdrawal). CBC: macrocytosis. LFT: elevated GGT, AST:ALT ratio 2:1. Blood alcohol: 0.",
    correctDiagnosis: "Alcohol Withdrawal Delirium (Delirium Tremens)",
    correctMedicines: [
      "IV Diazepam or Lorazepam (symptom-triggered, CIWA protocol)",
      "IV Thiamine (100 mg) before glucose (prevent Wernicke's encephalopathy)",
      "IV fluids with electrolyte replacement",
      "Haloperidol for hallucinations (adjunct)",
    ],
    difficulty: "Hard",
    subject: "Psychiatry",
  },

  // ──────────────────────────────────────────────
  // ANAESTHESIA & CRITICAL CARE (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-anaesthesia-001",
    diseaseId: "seed-disease-anaesthesia-1",
    title: "Post-operative Respiratory Failure — Atelectasis",
    patientAge: BigInt(58),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Breathlessness and low oxygen saturation on POD 2",
    history:
      "58-year-old obese male (BMI 36) on post-operative day 2 after open cholecystectomy. Complains of worsening breathlessness. SpO2 dropping to 88% on room air. Not doing deep breathing exercises.",
    examinationFindings:
      "Respiratory rate 26/min. SpO2 88% on RA, improving to 94% on O2 4L/min. Dull on percussion left lower zone. Reduced breath sounds left base. Mild tachycardia.",
    investigations:
      "ABG: pH 7.38, PaO2 58, PaCO2 42, HCO3 24 (type 1 respiratory failure). CXR: left lower lobe atelectasis with plate-like collapse.",
    correctDiagnosis:
      "Post-operative Atelectasis with Type 1 Respiratory Failure",
    correctMedicines: [
      "Supplemental O2 (target SpO2 >94%)",
      "Chest physiotherapy and incentive spirometry",
      "Early mobilisation",
      "Pain management (adequate analgesia to enable deep breathing)",
    ],
    difficulty: "Medium",
    subject: "Anaesthesia & Critical Care",
  },
  {
    id: "seed-anaesthesia-002",
    diseaseId: "seed-disease-anaesthesia-2",
    title: "Septic Shock — Gram-negative Bacteraemia",
    patientAge: BigInt(65),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint: "Fever, hypotension, and confusion in ICU — post-urosepsis",
    history:
      "65-year-old diabetic female admitted with UTI, now day 3 in ICU with worsening hypotension despite fluids. Confused. Oliguria (urine output <0.5 mL/kg/hr).",
    examinationFindings:
      "Temp 39.5°C. HR 128/min. BP 80/50 mmHg (not responding to 30 mL/kg crystalloid bolus). SpO2 92% on 4L O2. Mottled skin. Cold peripheries.",
    investigations:
      "Lactate: 4.8 mmol/L. Blood cultures: Klebsiella pneumoniae (ESBL producer). WBC: 22,000. Procalcitonin: markedly elevated. Creatinine: 2.8 (AKI).",
    correctDiagnosis: "Septic Shock (Gram-negative — ESBL Klebsiella)",
    correctMedicines: [
      "Vasopressors: Noradrenaline (first-line vasopressor)",
      "Meropenem (carbapenem for ESBL coverage)",
      "Crystalloid fluids (early goal-directed therapy)",
      "Hydrocortisone (for refractory shock)",
    ],
    difficulty: "Hard",
    subject: "Anaesthesia & Critical Care",
  },

  // ──────────────────────────────────────────────
  // RADIOLOGY (2 cases)
  // ──────────────────────────────────────────────
  {
    id: "seed-radiology-001",
    diseaseId: "seed-disease-radiology-1",
    title: "Tension Pneumothorax — X-ray Interpretation",
    patientAge: BigInt(22),
    patientGender: "Male",
    patientDisability: undefined,
    chiefComplaint: "Sudden dyspnoea and tracheal deviation after stab wound",
    history:
      "22-year-old male brought to A&E after stab wound to right chest. Rapid deterioration — severe dyspnoea, agitation, hypotension.",
    examinationFindings:
      "Trachea deviated to left. Right chest hyperresonant to percussion. Absent breath sounds right side. HR 130/min, BP 80/50 mmHg. Distended neck veins.",
    investigations:
      "CXR (erect AP): absent lung markings right side, collapsed right lung, mediastinal shift to left, depressed right hemidiaphragm. Classic tension pneumothorax appearance.",
    correctDiagnosis: "Right Tension Pneumothorax (Traumatic)",
    correctMedicines: [
      "Immediate needle decompression (2nd ICS, MCL right side)",
      "Followed by chest tube insertion (5th ICS, MAL)",
      "High flow O2",
      "IV access and fluids",
    ],
    difficulty: "Hard",
    subject: "Radiology",
  },
  {
    id: "seed-radiology-002",
    diseaseId: "seed-disease-radiology-2",
    title: "Pulmonary Embolism — CT-PA Interpretation",
    patientAge: BigInt(48),
    patientGender: "Female",
    patientDisability: undefined,
    chiefComplaint:
      "Pleuritic chest pain and sudden dyspnoea after long flight",
    history:
      "48-year-old woman 2 days after returning from a 14-hour flight from USA. Sudden onset pleuritic chest pain and dyspnoea. No fever. On OCP.",
    examinationFindings:
      "HR 112/min (tachycardia). Mild tachypnoea RR 22. SpO2 93% on RA. Left calf swollen and tender. ECG: S1Q3T3 pattern.",
    investigations:
      "D-dimer: markedly elevated. CT-PA: filling defect in right pulmonary artery and bilateral segmental arteries (saddle embolus). Wells score: 7.5 (high probability).",
    correctDiagnosis: "Bilateral Pulmonary Embolism (Massive PE)",
    correctMedicines: [
      "Anticoagulation: Low Molecular Weight Heparin (enoxaparin)",
      "Consider thrombolysis (tPA) if haemodynamically unstable",
      "Supplemental O2",
      "Long-term Warfarin or DOAC (Rivaroxaban/Apixaban)",
    ],
    difficulty: "Hard",
    subject: "Radiology",
  },
];
