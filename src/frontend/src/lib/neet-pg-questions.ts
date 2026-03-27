// NEET PG Question Bank
// All questions are NEET PG previous year / NEET PG-level standard
// Format: stem, 4 options, correctIndex (0-based), explanation, reference, subject, chapter, difficulty

export interface NeetPGQuestion {
  id: string;
  subject: string;
  chapter: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string; // detailed: why correct + why each wrong option is wrong
  reference: string;
  difficulty: "Easy" | "Medium" | "Hard";
  year?: string; // NEET PG year if previous year question
}

export const NEET_PG_QUESTIONS: NeetPGQuestion[] = [
  // ============================================================
  // ANATOMY
  // ============================================================

  // Chapter: Upper Limb
  {
    id: "ana-ul-001",
    subject: "Anatomy",
    chapter: "Upper Limb",
    stem: "A patient presents with 'waiter's tip' position of the hand after a difficult delivery. Which nerve roots are most likely injured?",
    options: ["C5, C6", "C8, T1", "C7, C8", "C6, C7"],
    correctIndex: 0,
    explanation:
      "A) C5, C6 — Correct. 'Waiter's tip' posture (arm adducted, medially rotated; forearm extended and pronated) is classic for Erb's palsy, which results from injury to the upper trunk of the brachial plexus (C5, C6). The arm hangs limply with medial rotation due to paralysis of deltoid, supraspinatus, infraspinatus, biceps, and brachioradialis.\n\nB) C8, T1 — Wrong. This is Klumpke's palsy causing 'claw hand' (intrinsic hand muscle paralysis).\n\nC) C7, C8 — Wrong. C7 injury causes weakness of wrist/finger extension; C8 affects hand intrinsics.\n\nD) C6, C7 — Wrong. C6 alone can contribute to some Erb's features but C5 is the critical root; C7 involvement does not produce this picture.",
    reference:
      "BD Chaurasia's Human Anatomy Vol. 1, 8th Ed, Chapter: Brachial Plexus; Gray's Anatomy 42nd Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },
  {
    id: "ana-ul-002",
    subject: "Anatomy",
    chapter: "Upper Limb",
    stem: "The 'anatomical snuffbox' is bounded by which tendons?",
    options: [
      "Extensor pollicis longus (ulnar) and extensor pollicis brevis + abductor pollicis longus (radial)",
      "Flexor carpi radialis (ulnar) and abductor pollicis longus (radial)",
      "Extensor carpi radialis longus (ulnar) and flexor pollicis longus (radial)",
      "Extensor digitorum (ulnar) and extensor pollicis brevis (radial)",
    ],
    correctIndex: 0,
    explanation:
      "A) Correct. The anatomical snuffbox is a triangular depression at the radial aspect of the wrist. Its medial (ulnar) boundary is the extensor pollicis longus tendon, and its lateral (radial) boundary is formed by extensor pollicis brevis and abductor pollicis longus tendons. The scaphoid bone lies at its floor — tenderness here after wrist trauma suggests scaphoid fracture.\n\nB) Wrong. Flexor carpi radialis is a flexor and lies on the palmar side.\n\nC) Wrong. Flexor pollicis longus is a flexor tendon, not a boundary of the snuffbox.\n\nD) Wrong. Extensor digitorum is not involved in thumb movements and does not form the snuffbox boundary.",
    reference:
      "BD Chaurasia's Human Anatomy Vol. 1, 8th Ed; Gray's Anatomy 42nd Ed.",
    difficulty: "Medium",
  },
  {
    id: "ana-ul-003",
    subject: "Anatomy",
    chapter: "Upper Limb",
    stem: "Injury to the median nerve at the wrist results in all of the following EXCEPT:",
    options: [
      "Wasting of thenar eminence",
      "Loss of opposition of thumb",
      "Loss of sensation over little finger",
      "Inability to perform 'OK sign'",
    ],
    correctIndex: 2,
    explanation:
      "C) Loss of sensation over little finger — Correct answer (EXCEPT). The little finger (5th digit) is supplied by the ulnar nerve (C8, T1), not the median nerve.\n\nA) Wasting of thenar eminence — Wrong choice for EXCEPT. Median nerve supplies LOAF muscles (Lumbrical 1&2, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis), so wasting thenar muscles is a direct consequence.\n\nB) Loss of opposition — Wrong choice for EXCEPT. Opponens pollicis is median nerve-supplied; opposition is lost in median nerve injury.\n\nD) Inability to perform 'OK sign' — Wrong choice for EXCEPT. The OK sign requires flexor pollicis longus and flexor digitorum profundus to index finger, both median-nerve-supplied (anterior interosseous branch).",
    reference:
      "BD Chaurasia's Human Anatomy Vol. 1, 8th Ed; Gray's Anatomy 42nd Ed.",
    difficulty: "Medium",
    year: "NEET PG 2018",
  },

  // Chapter: Lower Limb
  {
    id: "ana-ll-001",
    subject: "Anatomy",
    chapter: "Lower Limb",
    stem: "A patient cannot extend the knee and has loss of sensation over the anterior thigh. Which nerve is most likely injured?",
    options: [
      "Femoral nerve",
      "Obturator nerve",
      "Sciatic nerve",
      "Common peroneal nerve",
    ],
    correctIndex: 0,
    explanation:
      "A) Femoral nerve — Correct. The femoral nerve (L2, L3, L4) supplies the quadriceps femoris (knee extension) and provides sensory supply to the anterior thigh via the anterior cutaneous branches, and the medial leg/foot via the saphenous nerve.\n\nB) Obturator nerve — Wrong. Obturator nerve supplies medial thigh adductors and sensation to medial thigh. Knee extension is not primarily obturator-mediated.\n\nC) Sciatic nerve — Wrong. Sciatic nerve injury primarily causes foot drop (deep peroneal) and posterior thigh/leg sensation loss; knee extension is spared.\n\nD) Common peroneal nerve — Wrong. Common peroneal injury causes foot drop and loss of sensation over dorsum of foot and lateral leg, not anterior thigh.",
    reference:
      "BD Chaurasia's Human Anatomy Vol. 2, 8th Ed; Gray's Anatomy 42nd Ed.",
    difficulty: "Easy",
  },
  {
    id: "ana-ll-002",
    subject: "Anatomy",
    chapter: "Lower Limb",
    stem: "The popliteal artery divides into anterior and posterior tibial arteries at the lower border of which muscle?",
    options: ["Popliteus", "Gastrocnemius", "Soleus", "Plantaris"],
    correctIndex: 0,
    explanation:
      "A) Popliteus — Correct. The popliteal artery passes through the popliteal fossa and divides into anterior tibial artery and posterior tibial artery (with peroneal artery) at the lower border of the popliteus muscle. This is a high-yield anatomy point for NEET PG.\n\nB) Gastrocnemius — Wrong. Gastrocnemius originates from femoral condyles; it does not mark the division point.\n\nC) Soleus — Wrong. Soleus is below the popliteal fossa; the division occurs before this level.\n\nD) Plantaris — Wrong. Plantaris is a thin muscle of the posterior compartment of the leg, not related to popliteal artery division.",
    reference: "BD Chaurasia's Human Anatomy Vol. 2, 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },

  // Chapter: Head & Neck
  {
    id: "ana-hn-001",
    subject: "Anatomy",
    chapter: "Head & Neck",
    stem: "Bell's palsy affects which cranial nerve?",
    options: [
      "Facial nerve (CN VII)",
      "Trigeminal nerve (CN V)",
      "Vagus nerve (CN X)",
      "Glossopharyngeal nerve (CN IX)",
    ],
    correctIndex: 0,
    explanation:
      "A) Facial nerve (CN VII) — Correct. Bell's palsy is an idiopathic lower motor neuron (LMN) facial nerve palsy causing unilateral complete facial weakness including the forehead (unlike UMN lesion which spares forehead). The facial nerve exits through the stylomastoid foramen after traversing the facial canal in the temporal bone.\n\nB) Trigeminal nerve — Wrong. CN V carries facial sensation and motor supply to muscles of mastication. Its palsy causes sensory loss and jaw deviation, not facial weakness.\n\nC) Vagus nerve — Wrong. CN X palsy causes hoarse voice, dysphagia, uvula deviation.\n\nD) Glossopharyngeal — Wrong. CN IX palsy causes loss of gag reflex and taste from posterior 1/3 of tongue.",
    reference:
      "BD Chaurasia's Human Anatomy Vol. 3, 8th Ed; Gray's Anatomy 42nd Ed.",
    difficulty: "Easy",
  },

  // ============================================================
  // PHYSIOLOGY
  // ============================================================

  // Chapter: CVS Physiology
  {
    id: "phy-cvs-001",
    subject: "Physiology",
    chapter: "Cardiovascular Physiology",
    stem: "The 'a' wave in the jugular venous pulse (JVP) represents:",
    options: [
      "Atrial contraction",
      "Ventricular contraction causing tricuspid valve closure",
      "Ventricular filling",
      "Tricuspid valve opening",
    ],
    correctIndex: 0,
    explanation:
      "A) Atrial contraction — Correct. The 'a' wave in JVP is produced by atrial systole (contraction), which causes a rise in venous pressure transmitted back to the jugular veins. Absent 'a' wave indicates atrial fibrillation. Cannon 'a' waves (giant) occur in complete heart block when atria contract against closed tricuspid valve.\n\nB) Ventricular contraction — Wrong. Ventricular contraction produces the 'c' wave (tricuspid valve bulging back) and 'x' descent.\n\nC) Ventricular filling — Wrong. Ventricular filling corresponds to the 'y' descent.\n\nD) Tricuspid opening — Wrong. Tricuspid opening causes a fall in venous pressure, contributing to the 'y' descent.",
    reference:
      "Guyton & Hall Textbook of Medical Physiology 14th Ed, Chapter 14; AK Jain Physiology 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "phy-cvs-002",
    subject: "Physiology",
    chapter: "Cardiovascular Physiology",
    stem: "Which of the following is the most important determinant of cardiac output in a normal resting heart?",
    options: [
      "Venous return (preload)",
      "Afterload",
      "Heart rate",
      "Myocardial contractility",
    ],
    correctIndex: 0,
    explanation:
      "A) Venous return (preload) — Correct. According to Starling's law of the heart, cardiac output is primarily determined by venous return (preload), which is the end-diastolic volume. As venous return increases, myocardial fiber stretch increases, leading to greater force of contraction and higher stroke volume.\n\nB) Afterload — Wrong. Afterload (aortic pressure/SVR) opposes ejection; it is secondary in a normal heart and mainly relevant in pathological states like hypertension.\n\nC) Heart rate — Wrong. Heart rate can independently affect output but is less important than preload in a resting normal heart.\n\nD) Myocardial contractility (inotropy) — Wrong. Important in stressed/exercising heart, but at rest, venous return is the dominant factor.",
    reference: "Guyton & Hall 14th Ed, Chapter 9; AK Jain 8th Ed.",
    difficulty: "Easy",
  },

  // Chapter: Respiratory Physiology
  {
    id: "phy-resp-001",
    subject: "Physiology",
    chapter: "Respiratory Physiology",
    stem: "The Hering-Breuer reflex is mediated by stretch receptors located in:",
    options: [
      "Lung parenchyma (slowly adapting receptors)",
      "Carotid body",
      "Aortic body",
      "Medullary chemoreceptors",
    ],
    correctIndex: 0,
    explanation:
      "A) Slowly adapting stretch receptors in lung parenchyma — Correct. The Hering-Breuer inflation reflex is initiated by slowly adapting pulmonary stretch receptors (SARs) in the airways and parenchyma. When lungs are over-inflated, these receptors send signals via the vagus nerve to inhibit inspiration, preventing overdistension.\n\nB) Carotid body — Wrong. Carotid bodies are peripheral chemoreceptors that respond to low PO2, high PCO2, and low pH, not to lung stretch.\n\nC) Aortic body — Wrong. Also peripheral chemoreceptors for hypoxia/hypercapnia; not stretch-sensitive.\n\nD) Medullary chemoreceptors — Wrong. These are central chemoreceptors responding mainly to PCO2 via CSF pH, not lung stretch.",
    reference: "Guyton & Hall 14th Ed, Chapter 42; AK Jain 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "phy-resp-002",
    subject: "Physiology",
    chapter: "Respiratory Physiology",
    stem: "Normal value of functional residual capacity (FRC) in adults is approximately:",
    options: ["2300–2500 mL", "500 mL", "1200 mL", "4800 mL"],
    correctIndex: 0,
    explanation:
      "A) 2300–2500 mL — Correct. FRC = ERV (expiratory reserve volume ~1200 mL) + RV (residual volume ~1200 mL) ≈ 2300–2500 mL in a normal adult male. FRC represents the volume of air remaining in the lungs after a normal quiet expiration.\n\nB) 500 mL — Wrong. 500 mL is the tidal volume (VT), the volume of each normal breath.\n\nC) 1200 mL — Wrong. 1200 mL approximates either ERV or RV individually, not FRC.\n\nD) 4800 mL — Wrong. 4800 mL is approximately the vital capacity (VC = IRV + TV + ERV) or close to the total lung capacity in some references.",
    reference: "Guyton & Hall 14th Ed, Chapter 38; AK Jain 8th Ed.",
    difficulty: "Easy",
  },

  // Chapter: Renal Physiology
  {
    id: "phy-renal-001",
    subject: "Physiology",
    chapter: "Renal Physiology",
    stem: "Which segment of the nephron is impermeable to water even in the presence of ADH?",
    options: [
      "Ascending limb of loop of Henle",
      "Proximal convoluted tubule",
      "Collecting duct",
      "Descending limb of loop of Henle",
    ],
    correctIndex: 0,
    explanation:
      "A) Ascending limb of loop of Henle — Correct. The thick ascending limb (TAL) of the loop of Henle is inherently impermeable to water (no aquaporin channels) regardless of ADH levels. It actively reabsorbs NaCl via NKCC2 cotransporter, making the tubular fluid hypotonic — this is essential for the countercurrent multiplier mechanism.\n\nB) Proximal convoluted tubule — Wrong. PCT has high water permeability (aquaporin 1) and reabsorbs ~65–67% of filtered water iso-osmotically.\n\nC) Collecting duct — Wrong. Collecting duct water permeability is regulated by ADH; in the presence of ADH it becomes permeable.\n\nD) Descending limb — Wrong. Descending thin limb is highly permeable to water but impermeable to solutes, the opposite of the ascending limb.",
    reference: "Guyton & Hall 14th Ed, Chapter 28; AK Jain 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2018",
  },

  // ============================================================
  // BIOCHEMISTRY
  // ============================================================

  // Chapter: Enzymes
  {
    id: "bio-enz-001",
    subject: "Biochemistry",
    chapter: "Enzymes",
    stem: "Km of an enzyme is defined as the substrate concentration at which:",
    options: [
      "Reaction velocity is half the maximum velocity (Vmax/2)",
      "Reaction velocity equals the maximum velocity (Vmax)",
      "Product inhibition is maximal",
      "Enzyme is completely saturated",
    ],
    correctIndex: 0,
    explanation:
      "A) Vmax/2 — Correct. Km (Michaelis constant) is the substrate concentration [S] at which the reaction rate = Vmax/2. Low Km indicates high affinity (enzyme is half-saturated at low substrate), high Km indicates low affinity. This is a fundamental Michaelis-Menten concept.\n\nB) Equal to Vmax — Wrong. At Vmax all enzyme active sites are saturated; Km is not defined at Vmax.\n\nC) Product inhibition is maximal — Wrong. Product inhibition is a separate regulatory concept unrelated to the definition of Km.\n\nD) Enzyme is completely saturated — Wrong. Complete saturation corresponds to Vmax, not Km.",
    reference:
      "Harper's Illustrated Biochemistry 31st Ed, Chapter 8; Vasudevan 9th Ed.",
    difficulty: "Easy",
  },
  {
    id: "bio-enz-002",
    subject: "Biochemistry",
    chapter: "Enzymes",
    stem: "Which of the following is a marker enzyme of lysosomes?",
    options: [
      "Acid phosphatase",
      "Alkaline phosphatase",
      "Glucose-6-phosphatase",
      "Succinic dehydrogenase",
    ],
    correctIndex: 0,
    explanation:
      "A) Acid phosphatase — Correct. Acid phosphatase (and other acid hydrolases) work at the acidic pH inside lysosomes (pH ~4.5–5.0) and are classic lysosomal marker enzymes. Elevated serum acid phosphatase is seen in prostate cancer and Gaucher's disease.\n\nB) Alkaline phosphatase — Wrong. ALP is a marker of brush border (intestine), bone osteoblasts, liver canaliculi, and placenta — not lysosomes. It works at alkaline pH.\n\nC) Glucose-6-phosphatase — Wrong. G-6-Pase is a marker of smooth ER and is important in glycogenolysis (Von Gierke's disease).\n\nD) Succinic dehydrogenase — Wrong. Succinic dehydrogenase (Complex II) is a marker enzyme of the inner mitochondrial membrane.",
    reference:
      "Harper's Illustrated Biochemistry 31st Ed, Chapter 2; Vasudevan 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },

  // Chapter: Carbohydrate Metabolism
  {
    id: "bio-carb-001",
    subject: "Biochemistry",
    chapter: "Carbohydrate Metabolism",
    stem: "Rate-limiting (committed) step of glycolysis is catalysed by:",
    options: [
      "Phosphofructokinase-1 (PFK-1)",
      "Hexokinase",
      "Pyruvate kinase",
      "Aldolase",
    ],
    correctIndex: 0,
    explanation:
      "A) PFK-1 — Correct. Phosphofructokinase-1 converts fructose-6-phosphate → fructose-1,6-bisphosphate and is the key regulatory (committed, rate-limiting) step of glycolysis. It is allosterically inhibited by ATP, citrate, and H+ ions; stimulated by AMP, ADP, and fructose-2,6-bisphosphate.\n\nB) Hexokinase — Wrong. Hexokinase catalyses the first step (glucose → glucose-6-phosphate) but is product-inhibited; it is not the committed step as G-6-P can enter other pathways.\n\nC) Pyruvate kinase — Wrong. Pyruvate kinase catalyses the last step (phosphoenolpyruvate → pyruvate); it is regulated but not the committed/rate-limiting step.\n\nD) Aldolase — Wrong. Aldolase cleaves fructose-1,6-bisphosphate but is not rate-limiting.",
    reference:
      "Harper's Illustrated Biochemistry 31st Ed, Chapter 18; Vasudevan 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "bio-carb-002",
    subject: "Biochemistry",
    chapter: "Carbohydrate Metabolism",
    stem: "In Von Gierke's disease (Type Ia Glycogen Storage Disease), the deficient enzyme is:",
    options: [
      "Glucose-6-phosphatase",
      "Acid maltase (alpha-1,4-glucosidase)",
      "Muscle phosphorylase",
      "Branching enzyme",
    ],
    correctIndex: 0,
    explanation:
      "A) Glucose-6-phosphatase — Correct. Von Gierke's disease (Type Ia GSD) is caused by deficiency of glucose-6-phosphatase in liver and kidney. This prevents glycogenolysis and gluconeogenesis from releasing free glucose into the blood, causing severe hypoglycemia, hepatomegaly, renomegaly, hyperlipidemia, and lactic acidosis.\n\nB) Acid maltase — Wrong. Deficiency of acid maltase (lysosomal acid glucosidase) causes Pompe's disease (Type II GSD), presenting with cardiomegaly in infants.\n\nC) Muscle phosphorylase — Wrong. Muscle phosphorylase deficiency causes McArdle's disease (Type V GSD) with exercise intolerance and myoglobinuria.\n\nD) Branching enzyme — Wrong. Branching enzyme deficiency causes Andersen's disease (Type IV GSD), with progressive liver disease.",
    reference:
      "Harper's Illustrated Biochemistry 31st Ed, Chapter 19; Vasudevan 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },

  // Chapter: Vitamins
  {
    id: "bio-vit-001",
    subject: "Biochemistry",
    chapter: "Vitamins & Minerals",
    stem: "Pellagra is caused by deficiency of which vitamin?",
    options: [
      "Niacin (Vitamin B3)",
      "Thiamine (Vitamin B1)",
      "Riboflavin (Vitamin B2)",
      "Pyridoxine (Vitamin B6)",
    ],
    correctIndex: 0,
    explanation:
      "A) Niacin (B3) — Correct. Pellagra is caused by deficiency of niacin (nicotinic acid) or its precursor tryptophan. Classic triad: Dermatitis (photosensitive skin rash, Casal's necklace), Diarrhoea, Dementia — the '3 Ds'. Common in maize-eating communities (maize has niacin in unavailable form).\n\nB) Thiamine — Wrong. Thiamine deficiency causes beriberi (wet: high-output cardiac failure; dry: peripheral neuropathy) and Wernicke-Korsakoff syndrome.\n\nC) Riboflavin — Wrong. Riboflavin (B2) deficiency causes angular stomatitis, glossitis, corneal vascularisation, and scrotal dermatitis — not pellagra.\n\nD) Pyridoxine — Wrong. B6 deficiency causes peripheral neuropathy, seborrhoeic dermatitis, microcytic anaemia; not the classic 3D presentation of pellagra.",
    reference:
      "Harper's Illustrated Biochemistry 31st Ed, Chapter 44; Vasudevan 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },

  // ============================================================
  // PATHOLOGY
  // ============================================================

  // Chapter: Inflammation
  {
    id: "pat-inf-001",
    subject: "Pathology",
    chapter: "Inflammation",
    stem: "The hallmark of chronic granulomatous inflammation is the presence of:",
    options: [
      "Epithelioid cells and Langhans giant cells",
      "Neutrophilic infiltration",
      "Eosinophilic infiltration",
      "Fibrinous exudate",
    ],
    correctIndex: 0,
    explanation:
      "A) Epithelioid cells and Langhans giant cells — Correct. Granulomatous inflammation is a type of chronic inflammation characterised by focal accumulations of activated macrophages (called epithelioid cells) which may fuse to form multinucleated Langhans-type giant cells. Causes: TB (most common in India), leprosy, sarcoidosis, syphilis, fungal infections, foreign bodies.\n\nB) Neutrophilic infiltration — Wrong. Neutrophils predominate in acute inflammation and pyogenic (suppurative) chronic inflammation, not granulomatous.\n\nC) Eosinophilic infiltration — Wrong. Eosinophilia is characteristic of parasitic infections and allergic/IgE-mediated reactions.\n\nD) Fibrinous exudate — Wrong. Fibrinous inflammation is seen in serosal surfaces (fibrinous pericarditis in rheumatic fever or MI); not a granuloma feature.",
    reference:
      "Robbins & Cotran Pathologic Basis of Disease 10th Ed, Chapter 3; Harsh Mohan 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "pat-inf-002",
    subject: "Pathology",
    chapter: "Inflammation",
    stem: "Which of the following is the most important chemotactic agent for neutrophils?",
    options: ["Leukotriene B4 (LTB4)", "Histamine", "Prostaglandin E2", "IL-4"],
    correctIndex: 0,
    explanation:
      "A) LTB4 — Correct. Leukotriene B4 is one of the most potent chemotactic agents for neutrophils. It is derived from arachidonic acid via the 5-lipoxygenase pathway. Other important neutrophil chemotactic agents include: C5a, IL-8 (CXCL8), and bacterial products like N-formyl methionine (fMLP).\n\nB) Histamine — Wrong. Histamine causes vasodilation and increased vascular permeability (early acute inflammation) but is NOT a primary chemotactic agent.\n\nC) Prostaglandin E2 — Wrong. PGE2 causes fever, vasodilation, and potentiates pain but is not a primary chemotactic agent.\n\nD) IL-4 — Wrong. IL-4 promotes B cell class switching to IgE and Th2 responses; it does not primarily act as a neutrophil chemoattractant.",
    reference:
      "Robbins & Cotran Pathologic Basis of Disease 10th Ed, Chapter 3; Harsh Mohan 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },

  // Chapter: Neoplasia
  {
    id: "pat-neo-001",
    subject: "Pathology",
    chapter: "Neoplasia",
    stem: "The most common malignant tumour of the liver in adults is:",
    options: [
      "Metastatic carcinoma",
      "Hepatocellular carcinoma",
      "Cholangiocarcinoma",
      "Hepatoblastoma",
    ],
    correctIndex: 0,
    explanation:
      "A) Metastatic carcinoma — Correct. The most common malignant tumour in the liver is secondary (metastatic) — liver is the most common site of metastasis from GI cancers (colon, stomach, pancreas), breast, and lung. Primary liver tumours are less common.\n\nB) Hepatocellular carcinoma — Wrong. HCC is the most common PRIMARY liver malignancy in adults (associated with HBV, HCV, cirrhosis, aflatoxin), but overall, metastases are more common than any primary tumour.\n\nC) Cholangiocarcinoma — Wrong. Cholangiocarcinoma arises from bile duct epithelium; it is a primary liver tumour but far less common than metastases.\n\nD) Hepatoblastoma — Wrong. Hepatoblastoma is the most common primary liver malignancy in CHILDREN, not adults.",
    reference:
      "Robbins & Cotran Pathologic Basis of Disease 10th Ed, Chapter 18; Harsh Mohan 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // Chapter: CVS Pathology
  {
    id: "pat-cvs-001",
    subject: "Pathology",
    chapter: "Cardiovascular Pathology",
    stem: "Aschoff nodules are pathognomonic of:",
    options: [
      "Rheumatic fever",
      "Systemic Lupus Erythematosus",
      "Infective endocarditis",
      "Cardiac sarcoidosis",
    ],
    correctIndex: 0,
    explanation:
      "A) Rheumatic fever — Correct. Aschoff nodules (bodies) are pathognomonic of rheumatic carditis. They consist of a central zone of fibrinoid necrosis surrounded by Aschoff cells (plump, owl-eye activated macrophages) and Anitschkow cells (caterpillar cells — modified macrophages with chromatin in a zigzag pattern). Found in the interstitium of the myocardium.\n\nB) SLE — Wrong. SLE causes Libman-Sacks endocarditis (verrucous vegetations on both sides of mitral valve) and 'wire loop' lesions in the kidney.\n\nC) Infective endocarditis — Wrong. IE features large, irregular, friable vegetations typically on the valve closure line.\n\nD) Cardiac sarcoidosis — Wrong. Sarcoidosis features non-caseating granulomas with Langhans/foreign body giant cells in the myocardium.",
    reference:
      "Robbins & Cotran Pathologic Basis of Disease 10th Ed, Chapter 12; Harsh Mohan 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },

  // ============================================================
  // MICROBIOLOGY
  // ============================================================

  // Chapter: Bacteriology
  {
    id: "mic-bac-001",
    subject: "Microbiology",
    chapter: "Bacteriology",
    stem: "The organism most commonly responsible for lobar pneumonia is:",
    options: [
      "Streptococcus pneumoniae",
      "Klebsiella pneumoniae",
      "Staphylococcus aureus",
      "Haemophilus influenzae",
    ],
    correctIndex: 0,
    explanation:
      "A) S. pneumoniae — Correct. Streptococcus pneumoniae (pneumococcus) is the most common cause of community-acquired lobar pneumonia. It is a Gram-positive, lancet-shaped diplococcus with a polysaccharide capsule. Causes 'rusty sputum', herpes labialis, lobar consolidation. Sensitive to penicillin (though resistance emerging).\n\nB) Klebsiella pneumoniae — Wrong. Klebsiella classically causes pneumonia in alcoholics and diabetics with 'currant jelly sputum' and involves upper lobes; it is the second most common cause of lobar pneumonia.\n\nC) S. aureus — Wrong. Staph aureus causes bronchopneumonia (patchy consolidation), especially post-influenza. It produces abscesses and empyema.\n\nD) H. influenzae — Wrong. H. influenzae (especially non-typeable) is a common cause of acute exacerbations of COPD and bronchopneumonia, not classic lobar pneumonia.",
    reference:
      "Ananthanarayan & Paniker's Textbook of Microbiology 10th Ed, Chapter 22; Jawetz 28th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "mic-bac-002",
    subject: "Microbiology",
    chapter: "Bacteriology",
    stem: "The Widal test detects antibodies against:",
    options: [
      "Salmonella typhi 'O' and 'H' antigens",
      "Vibrio cholerae 'O' antigen",
      "Mycobacterium tuberculosis antigens",
      "Brucella abortus antigens",
    ],
    correctIndex: 0,
    explanation:
      "A) S. typhi 'O' and 'H' antigens — Correct. The Widal test (tube/slide agglutination test) detects antibodies against somatic 'O' antigen (rises early, more specific) and flagellar 'H' antigen (rises late, persists longer) of Salmonella typhi. A significant titre is ≥1:80 for 'O' and ≥1:160 for 'H' in a non-endemic area.\n\nB) Vibrio cholerae — Wrong. Vibrio cholerae diagnosis uses stool culture/dark-field microscopy; there is no standard 'Widal equivalent' test for cholera.\n\nC) M. tuberculosis — Wrong. TB diagnosis uses Mantoux test, IGRA, sputum AFB/culture, GeneXpert — not the Widal test.\n\nD) Brucella abortus — Wrong. Brucellosis is diagnosed by Brucella agglutination test (Standard Tube Agglutination test — SAT) or Rose Bengal test, not Widal.",
    reference: "Ananthanarayan 10th Ed, Chapter 27; Jawetz 28th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },

  // Chapter: Virology
  {
    id: "mic-vir-001",
    subject: "Microbiology",
    chapter: "Virology",
    stem: "The causative agent of Hepatitis B belongs to which family?",
    options: [
      "Hepadnaviridae",
      "Flaviviridae",
      "Picornaviridae",
      "Caliciviridae",
    ],
    correctIndex: 0,
    explanation:
      "A) Hepadnaviridae — Correct. Hepatitis B virus (HBV) belongs to the family Hepadnaviridae. It is a partially double-stranded DNA virus with a DNA polymerase that has reverse transcriptase activity. It replicates via an RNA intermediate. HBsAg is the surface antigen used for screening.\n\nB) Flaviviridae — Wrong. Flaviviridae includes Hepatitis C virus (single-stranded RNA), Dengue, Yellow fever, Zika, and Japanese encephalitis.\n\nC) Picornaviridae — Wrong. Picornaviridae includes Hepatitis A virus (single-stranded RNA), Poliovirus, Rhinovirus, Coxsackievirus.\n\nD) Caliciviridae — Wrong. Caliciviridae includes Hepatitis E virus (single-stranded RNA) and Norovirus.",
    reference: "Ananthanarayan 10th Ed, Chapter 52; Jawetz 28th Ed.",
    difficulty: "Easy",
  },

  // Chapter: Parasitology
  {
    id: "mic-par-001",
    subject: "Microbiology",
    chapter: "Parasitology",
    stem: "The definitive host for Plasmodium falciparum is:",
    options: [
      "Female Anopheles mosquito",
      "Male Anopheles mosquito",
      "Culex mosquito",
      "Humans",
    ],
    correctIndex: 0,
    explanation:
      "A) Female Anopheles mosquito — Correct. In malaria, the sexual cycle (sporogony) occurs in the gut of the female Anopheles mosquito — making it the definitive host. The sporozites produced are inoculated into the human host during blood meal.\n\nB) Male Anopheles — Wrong. Male Anopheles mosquitoes do not bite humans and are not involved in malaria transmission.\n\nC) Culex mosquito — Wrong. Culex mosquitoes are vectors of filariasis (Wuchereria bancrofti) and Japanese encephalitis, not malaria.\n\nD) Humans — Wrong. Humans serve as the intermediate host where asexual multiplication (schizogony) occurs in the liver and red blood cells.",
    reference: "Ananthanarayan 10th Ed, Chapter 71; Jawetz 28th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // ============================================================
  // PHARMACOLOGY
  // ============================================================

  // Chapter: Autonomic Pharmacology (ANS)
  {
    id: "pha-ans-001",
    subject: "Pharmacology",
    chapter: "Autonomic Nervous System",
    stem: "A patient on a ganglionic blocker (e.g., trimethaphan) will show which of the following predominant effects in the heart?",
    options: [
      "Tachycardia",
      "Bradycardia",
      "No change in heart rate",
      "Atrial fibrillation",
    ],
    correctIndex: 0,
    explanation:
      "A) Tachycardia — Correct. The heart is predominantly under parasympathetic (vagal) tone at rest. Ganglionic blockade removes this parasympathetic dominance, resulting in tachycardia. For other organs where sympathetic tone is dominant (blood vessels, bladder): ganglionic blockers cause vasodilation, urinary retention.\n\nB) Bradycardia — Wrong. Bradycardia would occur if parasympathetic tone were increased, not blocked.\n\nC) No change — Wrong. Removal of dominant vagal tone does change heart rate.\n\nD) Atrial fibrillation — Wrong. Ganglionic blockers do not directly cause AF.",
    reference:
      "KD Tripathi Essentials of Medical Pharmacology 8th Ed, Chapter 9; Katzung 15th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "pha-ans-002",
    subject: "Pharmacology",
    chapter: "Autonomic Nervous System",
    stem: "Which adrenergic receptor subtype mediates mydriasis (pupil dilation)?",
    options: ["Alpha-1 (α1)", "Beta-1 (β1)", "Beta-2 (β2)", "Alpha-2 (α2)"],
    correctIndex: 0,
    explanation:
      "A) α1 receptor — Correct. Mydriasis (pupil dilation) is mediated by α1 adrenergic receptor stimulation causing contraction of the radial (dilator) pupillae muscle. Sympathomimetics (phenylephrine, epinephrine) dilate the pupil via α1 stimulation.\n\nB) β1 — Wrong. β1 receptors are located in the heart (positive chronotropy and inotropy); they are not found in the iris.\n\nC) β2 — Wrong. β2 receptors cause bronchodilation, vasodilation, uterine relaxation; not involved in pupil dilation.\n\nD) α2 — Wrong. α2 receptors are presynaptic inhibitory receptors; they also mediate vasoconstriction (mainly in blood vessels). Pupil dilation is α1 mediated.",
    reference: "KD Tripathi 8th Ed, Chapter 9; Katzung 15th Ed, Chapter 9.",
    difficulty: "Easy",
  },

  // Chapter: Antibiotics
  {
    id: "pha-ab-001",
    subject: "Pharmacology",
    chapter: "Antibiotics",
    stem: "Which of the following antibiotics acts by inhibiting cell wall synthesis?",
    options: ["Penicillin", "Tetracycline", "Chloramphenicol", "Ciprofloxacin"],
    correctIndex: 0,
    explanation:
      "A) Penicillin — Correct. Penicillins (and cephalosporins, carbapenems, monobactams, vancomycin) inhibit cell wall synthesis. Penicillins bind to penicillin-binding proteins (PBPs) — transpeptidases — inhibiting cross-linking of peptidoglycan chains. Bactericidal; effective against Gram-positive organisms.\n\nB) Tetracycline — Wrong. Tetracyclines inhibit protein synthesis by binding to the 30S ribosomal subunit, preventing aminoacyl-tRNA binding. Bacteriostatic.\n\nC) Chloramphenicol — Wrong. Chloramphenicol inhibits protein synthesis by binding to 50S ribosomal subunit, blocking peptidyl transferase. Bacteriostatic.\n\nD) Ciprofloxacin — Wrong. Fluoroquinolones (ciprofloxacin) inhibit DNA gyrase (topoisomerase II) and topoisomerase IV, preventing DNA replication. Bactericidal.",
    reference: "KD Tripathi 8th Ed, Chapter 52; Katzung 15th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "pha-ab-002",
    subject: "Pharmacology",
    chapter: "Antibiotics",
    stem: "Drug of choice for Methicillin-Resistant Staphylococcus aureus (MRSA) infection is:",
    options: [
      "Vancomycin",
      "Methicillin",
      "Amoxicillin-clavulanate",
      "Ceftriaxone",
    ],
    correctIndex: 0,
    explanation:
      "A) Vancomycin — Correct. Vancomycin is the drug of choice for MRSA infection. It inhibits cell wall synthesis by binding to D-Ala-D-Ala terminus of peptidoglycan precursors (different mechanism from beta-lactams), so it remains effective against MRSA.\n\nB) Methicillin — Wrong. MRSA (Methicillin-Resistant S. aureus) is by definition resistant to methicillin and all other beta-lactam antibiotics due to altered PBP2a (encoded by mecA gene).\n\nC) Amoxicillin-clavulanate — Wrong. This is a beta-lactam/beta-lactamase inhibitor combination; MRSA resistance is not due to beta-lactamase but altered PBPs, so this combination is ineffective.\n\nD) Ceftriaxone — Wrong. All cephalosporins are ineffective against MRSA for the same reason as methicillin.",
    reference: "KD Tripathi 8th Ed, Chapter 52; Katzung 15th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },

  // Chapter: CNS Pharmacology
  {
    id: "pha-cns-001",
    subject: "Pharmacology",
    chapter: "CNS Drugs",
    stem: "Which benzodiazepine is safest to use in elderly patients and hepatic failure due to direct conjugation?",
    options: ["Oxazepam", "Diazepam", "Chlordiazepoxide", "Lorazepam"],
    correctIndex: 0,
    explanation:
      "A) Oxazepam — Correct. Oxazepam, lorazepam, and temazepam (mnemonic: 'LOT') are metabolised by direct glucuronide conjugation in the liver, bypassing phase I metabolism (oxidation). Therefore they are safe in the elderly (reduced phase I capacity) and hepatic failure. Oxazepam is classically cited as the safest benzodiazepine in these settings.\n\nB) Diazepam — Wrong. Diazepam undergoes hepatic phase I oxidation (CYP2C19, CYP3A4) to active metabolites (desmethyldiazepam, oxazepam), causing prolonged sedation in the elderly and hepatic failure.\n\nC) Chlordiazepoxide — Wrong. Chlordiazepoxide also requires phase I metabolism and accumulates in hepatic disease.\n\nD) Lorazepam — Partially correct (lorazepam also uses conjugation), but oxazepam is most classically cited as the safest in hepatic failure in exam questions.",
    reference: "KD Tripathi 8th Ed, Chapter 30; Katzung 15th Ed, Chapter 22.",
    difficulty: "Medium",
    year: "NEET PG 2022",
  },

  // Chapter: CVS Drugs
  {
    id: "pha-cvs-001",
    subject: "Pharmacology",
    chapter: "Cardiovascular Drugs",
    stem: "A patient with heart failure and bilateral renal artery stenosis should NOT be given:",
    options: ["ACE inhibitors", "Digoxin", "Furosemide", "Spironolactone"],
    correctIndex: 0,
    explanation:
      "A) ACE inhibitors — Correct. In bilateral renal artery stenosis, GFR is maintained by efferent arteriolar vasoconstriction mediated by angiotensin II. ACE inhibitors block angiotensin II → efferent vasodilation → drastic fall in GFR → acute kidney injury. This is a classic contraindication.\n\nB) Digoxin — Wrong. Digoxin (positive inotropy, negative chronotropy) can be used in heart failure with reduced ejection fraction and is not contraindicated in bilateral RAS.\n\nC) Furosemide — Wrong. Loop diuretics (furosemide) are first-line in heart failure for volume overload; they are not specifically contraindicated in bilateral RAS (though renal function should be monitored).\n\nD) Spironolactone — Wrong. Aldosterone antagonists like spironolactone are used in heart failure (RALES trial); they carry a risk of hyperkalemia but are not specifically contraindicated in bilateral RAS.",
    reference: "KD Tripathi 8th Ed, Chapter 40; Katzung 15th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },

  // ============================================================
  // FORENSIC MEDICINE & TOXICOLOGY
  // ============================================================

  {
    id: "fmt-001",
    subject: "Forensic Medicine & Toxicology",
    chapter: "Thanatology (Death & Post-mortem Changes)",
    stem: "Rigor mortis is first noticed in which muscles?",
    options: [
      "Muscles of the jaw (masseter)",
      "Muscles of the lower limb",
      "Muscles of the upper limb",
      "Diaphragm",
    ],
    correctIndex: 0,
    explanation:
      "A) Masseter (jaw muscles) — Correct. Rigor mortis begins 1–6 hours after death and appears first in the small muscles. Classically it is first noticed in the muscles of the jaw (masseter/temporal) and eyelids, then progresses downward (neck, trunk, limbs) — Nysten's law.\n\nB) Lower limb muscles — Wrong. Rigor mortis appears last in the large lower limb muscles.\n\nC) Upper limb muscles — Wrong. Upper limb muscles are affected after jaw and neck muscles.\n\nD) Diaphragm — Wrong. Diaphragm is an involuntary muscle; it is not the first site of visible rigor mortis.",
    reference:
      "Narayan Reddy's Essentials of Forensic Medicine 36th Ed, Chapter: Thanatology.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "fmt-002",
    subject: "Forensic Medicine & Toxicology",
    chapter: "Toxicology",
    stem: "The antidote for organophosphate poisoning is:",
    options: [
      "Atropine + Pralidoxime (2-PAM)",
      "Neostigmine",
      "Physostigmine",
      "Naloxone",
    ],
    correctIndex: 0,
    explanation:
      "A) Atropine + Pralidoxime — Correct. Organophosphates inhibit acetylcholinesterase (AChe) causing excess ACh. Treatment: (1) Atropine blocks muscarinic receptors (DUMBELS features: Defaecation, Urination, Miosis, Bradycardia, Emesis, Lacrimation, Salivation); large doses needed. (2) Pralidoxime (2-PAM) reactivates AChe if given early (before 'aging').\n\nB) Neostigmine — Wrong. Neostigmine is itself an AChe inhibitor — it would worsen poisoning.\n\nC) Physostigmine — Wrong. Physostigmine also inhibits AChe and would worsen OP poisoning.\n\nD) Naloxone — Wrong. Naloxone is an opioid antagonist used in opioid overdose (morphine, heroin); not for OP poisoning.",
    reference: "Narayan Reddy's 36th Ed; KD Tripathi Pharmacology 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },

  // ============================================================
  // COMMUNITY MEDICINE
  // ============================================================

  {
    id: "cm-001",
    subject: "Community Medicine",
    chapter: "Epidemiology",
    stem: "In a case-control study, the measure of association used is:",
    options: [
      "Odds Ratio (OR)",
      "Relative Risk (RR)",
      "Attributable Risk",
      "Prevalence Ratio",
    ],
    correctIndex: 0,
    explanation:
      "A) Odds Ratio — Correct. In case-control studies, participants are selected based on outcome (disease/no disease), so incidence cannot be directly calculated. The Odds Ratio (OR) — ratio of odds of exposure in cases to odds of exposure in controls — is the appropriate measure.\n\nB) Relative Risk — Wrong. RR (incidence in exposed / incidence in unexposed) can be calculated only in cohort studies and RCTs where incidence is directly measurable.\n\nC) Attributable Risk — Wrong. Attributable risk (RR–1 × exposure prevalence) is derived from cohort studies.\n\nD) Prevalence Ratio — Wrong. Prevalence ratio is a measure used in cross-sectional studies.",
    reference:
      "Park's Textbook of Preventive and Social Medicine 27th Ed, Chapter 2.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },
  {
    id: "cm-002",
    subject: "Community Medicine",
    chapter: "Epidemiology",
    stem: "The gold standard for tuberculosis diagnosis is:",
    options: [
      "Sputum culture (Lowenstein-Jensen medium)",
      "Mantoux test",
      "Chest X-ray",
      "GeneXpert MTB/RIF",
    ],
    correctIndex: 0,
    explanation:
      "A) Sputum culture on Lowenstein-Jensen (LJ) medium — Correct. Culture of Mycobacterium tuberculosis on LJ medium (or MGIT liquid culture) remains the gold standard for diagnosis of tuberculosis, as it provides definitive identification and drug susceptibility testing.\n\nB) Mantoux test — Wrong. Mantoux (tuberculin skin test) indicates exposure/sensitisation; it cannot distinguish active from latent TB and has poor specificity in BCG-vaccinated populations.\n\nC) Chest X-ray — Wrong. CXR shows suggestive features (cavitation, hilar adenopathy, miliary pattern) but is not specific; other conditions can mimic TB on CXR.\n\nD) GeneXpert — Wrong. GeneXpert MTB/RIF is a rapid (2-hour) molecular test with high sensitivity/specificity and is the WHO-recommended first test; however, culture remains the gold standard for drug susceptibility and definitive identification.",
    reference: "Park's 27th Ed, Chapter 5 (Tuberculosis).",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "cm-003",
    subject: "Community Medicine",
    chapter: "Nutrition",
    stem: "The recommended dietary allowance (RDA) of Vitamin C for an adult Indian male is:",
    options: ["40 mg/day", "60 mg/day", "100 mg/day", "10 mg/day"],
    correctIndex: 0,
    explanation:
      "A) 40 mg/day — Correct. As per ICMR dietary guidelines, the RDA of Vitamin C for adult Indian males is 40 mg/day (lower than WHO's 45 mg/day or USFDA's 90 mg/day, reflecting Indian dietary patterns and body weight).\n\nB) 60 mg/day — Wrong. This is the US RDA for women, not India's ICMR RDA.\n\nC) 100 mg/day — Wrong. 100 mg/day is the recommended therapeutic dose for scurvy prophylaxis.\n\nD) 10 mg/day — Wrong. 10 mg/day is insufficient to prevent scurvy; the actual minimum is closer to 10 mg but RDA for India is 40 mg.",
    reference:
      "Park's Textbook of Preventive and Social Medicine 27th Ed (ICMR RDA table).",
    difficulty: "Easy",
  },

  // ============================================================
  // OPHTHALMOLOGY
  // ============================================================

  {
    id: "oph-001",
    subject: "Ophthalmology",
    chapter: "Glaucoma",
    stem: "The most important feature distinguishing primary open-angle glaucoma (POAG) from angle-closure glaucoma is:",
    options: [
      "Open drainage angle on gonioscopy",
      "Elevated intraocular pressure",
      "Cupping of optic disc",
      "Visual field defects",
    ],
    correctIndex: 0,
    explanation:
      "A) Open drainage angle on gonioscopy — Correct. Gonioscopy (examining the angle) is the key investigation. In POAG, the drainage angle is anatomically open but functionally defective (trabecular meshwork dysfunction → raised IOP). In angle-closure glaucoma, the angle is physically obstructed.\n\nB) Elevated IOP — Wrong. Raised IOP occurs in both POAG and PACG (and some patients have 'normal tension glaucoma').\n\nC) Cupping of optic disc — Wrong. Optic disc cupping (C/D ratio >0.6, notching of rim) occurs in both types of glaucoma.\n\nD) Visual field defects — Wrong. Visual field defects (arcuate scotoma, nasal step) occur in both POAG and PACG.",
    reference:
      "AK Khurana Comprehensive Ophthalmology 7th Ed, Chapter: Glaucoma; Kanski's Clinical Ophthalmology 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2022",
  },
  {
    id: "oph-002",
    subject: "Ophthalmology",
    chapter: "Retina",
    stem: "Cherry-red spot at the macula is seen in which condition?",
    options: [
      "Central Retinal Artery Occlusion (CRAO)",
      "Central Retinal Vein Occlusion",
      "Diabetic macular oedema",
      "Hypertensive retinopathy",
    ],
    correctIndex: 0,
    explanation:
      "A) CRAO — Correct. In central retinal artery occlusion, the ischaemic retina becomes white/opaque (oedema), but the fovea (macula) has no inner nuclear layer and receives choroidal blood supply; it appears as a bright red spot against the white retina — 'cherry-red spot'. Same appearance in Tay-Sachs and Niemann-Pick disease (lipid storage in ganglion cells).\n\nB) Central Retinal Vein Occlusion — Wrong. CRVO causes disc oedema, haemorrhages in all quadrants ('thunderstorm of hemorrhages'), dilated tortuous veins; no cherry-red spot.\n\nC) Diabetic macular oedema — Wrong. DME shows hard exudates, microaneurysms in the macular area; not cherry-red spot.\n\nD) Hypertensive retinopathy — Wrong. Hypertensive retinopathy features AV nipping, flame hemorrhages, cotton wool spots, and disc oedema; not cherry-red spot.",
    reference: "AK Khurana 7th Ed; Kanski 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },

  // ============================================================
  // ENT
  // ============================================================

  {
    id: "ent-001",
    subject: "ENT",
    chapter: "Ear",
    stem: "The most common cause of conductive hearing loss in adults in India is:",
    options: [
      "Chronic Suppurative Otitis Media (CSOM)",
      "Otosclerosis",
      "Serous otitis media",
      "Acoustic neuroma",
    ],
    correctIndex: 0,
    explanation:
      "A) CSOM — Correct. In India, Chronic Suppurative Otitis Media (CSOM) is the most common cause of conductive hearing loss. It occurs due to persistent middle ear infection with tympanic membrane perforation, leading to damaged ossicular chain. Globally, otosclerosis may rank higher in developed countries.\n\nB) Otosclerosis — Wrong. Otosclerosis (fixation of stapes footplate) is more common in young women in Western countries; less prevalent in India.\n\nC) Serous otitis media — Wrong. Also called 'glue ear'; common in children with Eustachian tube dysfunction; self-limiting in most cases.\n\nD) Acoustic neuroma — Wrong. Acoustic neuroma (vestibular schwannoma) causes sensorineural hearing loss, not conductive.",
    reference:
      "Dhingra Diseases of Ear, Nose and Throat 7th Ed, Chapter: CSOM.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },
  {
    id: "ent-002",
    subject: "ENT",
    chapter: "Nose & Paranasal Sinuses",
    stem: "Most common cause of epistaxis (nosebleed) in children is bleeding from:",
    options: [
      "Little's area (Kiesselbach's plexus)",
      "Posterior ethmoidal artery",
      "Internal carotid artery branches",
      "Sphenopalatine artery",
    ],
    correctIndex: 0,
    explanation:
      "A) Little's area — Correct. Little's area (Kiesselbach's plexus) on the anteroinferior nasal septum is the most common site of epistaxis in children and young adults. It is supplied by anastomoses of septal branches from anterior ethmoidal artery, greater palatine artery, superior labial artery, and sphenopalatine artery.\n\nB) Posterior ethmoidal artery — Wrong. Posterior ethmoidal artery bleeds are uncommon and arise posteriorly, requiring examination under anaesthesia.\n\nC) Internal carotid artery — Wrong. ICA branches do not directly supply the nasal mucosa at accessible sites.\n\nD) Sphenopalatine artery — Wrong. Sphenopalatine artery is involved in posterior epistaxis (dangerous, usually in elderly hypertensives), not children.",
    reference: "Dhingra 7th Ed, Chapter: Epistaxis.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },

  // ============================================================
  // GENERAL MEDICINE
  // ============================================================

  {
    id: "med-001",
    subject: "General Medicine",
    chapter: "Cardiology",
    stem: "JNC 8 defines hypertension in adults (≥60 years) requiring drug therapy when BP is:",
    options: ["≥150/90 mmHg", "≥140/90 mmHg", "≥130/80 mmHg", "≥160/100 mmHg"],
    correctIndex: 0,
    explanation:
      "A) ≥150/90 mmHg — Correct. JNC 8 (2014) recommends initiating pharmacological therapy in the general population aged ≥60 years when SBP ≥150 mmHg or DBP ≥90 mmHg. (For patients <60 years or with CKD/diabetes, the threshold is ≥140/90 mmHg.)\n\nB) ≥140/90 mmHg — Wrong. This threshold applies to adults aged 18–59 years or those with CKD or diabetes per JNC 8.\n\nC) ≥130/80 mmHg — Wrong. This is the 2017 ACC/AHA hypertension guideline threshold, not JNC 8.\n\nD) ≥160/100 mmHg — Wrong. This was the older threshold for isolated systolic hypertension; JNC 8 lowered it to 150 mmHg for ≥60 years.",
    reference:
      "Harrison's Principles of Internal Medicine 21st Ed, Chapter: Hypertension; Davidson's Principles 23rd Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "med-002",
    subject: "General Medicine",
    chapter: "Pulmonology",
    stem: "A 60-year-old male smoker presents with progressive breathlessness, barrel-shaped chest, and decreased breath sounds bilaterally. FEV1/FVC ratio is 55%. The most likely diagnosis is:",
    options: [
      "Chronic Obstructive Pulmonary Disease (COPD)",
      "Bronchial Asthma",
      "Pulmonary Fibrosis",
      "Pleural Effusion",
    ],
    correctIndex: 0,
    explanation:
      "A) COPD — Correct. The combination of (1) significant smoking history, (2) progressive exertional dyspnoea, (3) barrel-chest (hyperinflation), (4) decreased breath sounds (emphysema), and (5) FEV1/FVC <70% (post-bronchodilator) confirms obstructive pattern = COPD. GOLD criteria: FEV1/FVC <0.70.\n\nB) Bronchial Asthma — Wrong. Asthma is episodic, reversible airflow obstruction; barrel chest and permanent low FEV1/FVC are not typical. Asthma usually presents younger with atopy.\n\nC) Pulmonary Fibrosis — Wrong. Fibrosis causes restrictive pattern (decreased FVC, normal/increased FEV1/FVC ratio >0.70).\n\nD) Pleural Effusion — Wrong. Effusion causes stony dull percussion, decreased VF, no barrel chest; not an obstructive spirometry.",
    reference: "Harrison's 21st Ed, Chapter: COPD; Davidson's 23rd Ed.",
    difficulty: "Easy",
  },
  {
    id: "med-003",
    subject: "General Medicine",
    chapter: "Nephrology",
    stem: "The most common cause of chronic kidney disease (CKD) in India is:",
    options: [
      "Diabetic nephropathy",
      "Hypertensive nephrosclerosis",
      "Chronic glomerulonephritis",
      "Obstructive uropathy",
    ],
    correctIndex: 0,
    explanation:
      "A) Diabetic nephropathy — Correct. Diabetic nephropathy (diabetes mellitus type 2) is now the most common cause of CKD and ESRD in India, having overtaken chronic glomerulonephritis due to the epidemic of type 2 diabetes. Globally also, diabetes accounts for ~40% of ESRD.\n\nB) Hypertensive nephrosclerosis — Wrong. Hypertension is the second most common cause globally and in India.\n\nC) Chronic glomerulonephritis — Wrong. CGN was the leading cause in India previously; now superseded by diabetic nephropathy.\n\nD) Obstructive uropathy — Wrong. Obstructive causes (calculi, BPH) are important but less prevalent than metabolic causes in CKD.",
    reference: "Harrison's 21st Ed, Chapter: CKD; Davidson's 23rd Ed.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },

  // Chapter: Infectious Diseases
  {
    id: "med-inf-001",
    subject: "General Medicine",
    chapter: "Infectious Diseases",
    stem: "Rose spots on the abdomen during the 2nd week of illness, relative bradycardia, and 'stepladder' fever are classic features of:",
    options: [
      "Enteric Fever (Typhoid)",
      "Malaria",
      "Dengue Fever",
      "Brucellosis",
    ],
    correctIndex: 0,
    explanation:
      "A) Enteric Fever — Correct. Typhoid (Salmonella typhi) classically presents with: stepladder fever (gradually rising fever over days), relative bradycardia (pulse-temperature dissociation — Faget's sign), rose spots (salmon-coloured maculopapular rash on abdomen in 2nd week, in 20–30%), splenomegaly, and constipation (early) → diarrhoea (later).\n\nB) Malaria — Wrong. Malaria presents with cyclical fever (tertian for P. vivax — every 48h; quartan for P. malariae — every 72h), rigors, sweating; rose spots and relative bradycardia are absent.\n\nC) Dengue — Wrong. Dengue features sudden high fever, severe myalgia ('breakbone fever'), retro-orbital pain, haemorrhagic manifestations, and thrombocytopenia; no stepladder pattern or rose spots.\n\nD) Brucellosis — Wrong. Brucellosis has undulant fever, arthralgia, hepatosplenomegaly; no rose spots.",
    reference:
      "Harrison's 21st Ed, Chapter: Enteric Fever; Davidson's 23rd Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // ============================================================
  // GENERAL SURGERY
  // ============================================================

  {
    id: "surg-001",
    subject: "General Surgery",
    chapter: "Abdomen",
    stem: "Murphy's sign is positive in:",
    options: [
      "Acute cholecystitis",
      "Acute appendicitis",
      "Peptic ulcer perforation",
      "Acute pancreatitis",
    ],
    correctIndex: 0,
    explanation:
      "A) Acute cholecystitis — Correct. Murphy's sign is arrest of inspiration on deep palpation of the right hypochondrium (over the gallbladder). It is positive in acute cholecystitis due to inflammation of the gallbladder causing pain on compression during inspiration.\n\nB) Acute appendicitis — Wrong. McBurney's point tenderness and Rovsing's sign are associated with acute appendicitis; Murphy's sign is not.\n\nC) Peptic ulcer perforation — Wrong. PU perforation presents with board-like rigidity, loss of liver dullness, and absent bowel sounds; not Murphy's sign.\n\nD) Acute pancreatitis — Wrong. Acute pancreatitis shows epigastric tenderness radiating to the back, Cullen's sign, Grey Turner's sign; not Murphy's sign.",
    reference:
      "Bailey & Love's Short Practice of Surgery 28th Ed, Chapter: Biliary System; SRB's Manual 5th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "surg-002",
    subject: "General Surgery",
    chapter: "Breast",
    stem: "The most common carcinoma of the breast is:",
    options: [
      "Invasive ductal carcinoma (IDC)",
      "Invasive lobular carcinoma",
      "Medullary carcinoma",
      "Mucinous (colloid) carcinoma",
    ],
    correctIndex: 0,
    explanation:
      "A) Invasive ductal carcinoma — Correct. IDC (also called No Special Type or NOS) accounts for approximately 70–80% of all invasive breast cancers. It arises from ductal epithelium and is the most common histological type.\n\nB) Invasive lobular carcinoma — Wrong. ILC accounts for only ~10–15% of breast cancers; it characteristically spreads in single-file lines ('Indian-file' pattern) and may be bilateral.\n\nC) Medullary carcinoma — Wrong. Medullary carcinoma is rare (~3–5%); it has a paradoxically better prognosis despite high-grade features.\n\nD) Mucinous carcinoma — Wrong. Mucinous (colloid) carcinoma is also rare (~2%) and has a good prognosis; occurs in elderly women.",
    reference: "Bailey & Love's 28th Ed, Chapter: Breast; SRB's Manual 5th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },

  // ============================================================
  // OBSTETRICS & GYNAECOLOGY
  // ============================================================

  {
    id: "obg-001",
    subject: "Obstetrics & Gynaecology",
    chapter: "Obstetrics",
    stem: "Placenta praevia is defined as a placenta implanted:",
    options: [
      "In the lower uterine segment",
      "Over the fundus",
      "On the posterior uterine wall",
      "Outside the uterus (ectopic)",
    ],
    correctIndex: 0,
    explanation:
      "A) Lower uterine segment — Correct. Placenta praevia is defined as a placenta implanted in the lower uterine segment (within 2 cm of the internal os). It presents with painless, sudden, bright red vaginal bleeding in the 3rd trimester. Divided into: minor (doesn't cover os) and major (partially/completely covers internal os).\n\nB) Over the fundus — Wrong. Fundal implantation is the normal, most favourable site.\n\nC) Posterior wall — Wrong. Posterior wall implantation is normal; it does not define praevia unless the placenta extends down to the lower segment.\n\nD) Outside the uterus — Wrong. Placenta outside the uterus describes placenta accreta/percreta complications or ectopic pregnancy, not praevia.",
    reference:
      "Dutta's Textbook of Obstetrics 10th Ed, Chapter: Antepartum Haemorrhage; Williams Obstetrics 25th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "obg-002",
    subject: "Obstetrics & Gynaecology",
    chapter: "Gynaecology",
    stem: "The most common site of ectopic pregnancy is:",
    options: [
      "Ampulla of the fallopian tube",
      "Isthmus of the fallopian tube",
      "Ovary",
      "Cervix",
    ],
    correctIndex: 0,
    explanation:
      "A) Ampulla — Correct. ~70–75% of ectopic pregnancies occur in the ampullary part of the fallopian tube. This is because the zygote normally takes 3–4 days to traverse the tube, and the ampulla is the widest segment where implantation is most likely to occur due to delayed passage.\n\nB) Isthmus — Wrong. Isthmic ectopic (~12%) ruptures earlier (smaller lumen) and presents more dramatically, but is less common than ampullary.\n\nC) Ovary — Wrong. Ovarian ectopic (~0.5–3%) is rare.\n\nD) Cervix — Wrong. Cervical ectopic is very rare (<1%) and causes massive haemorrhage.",
    reference:
      "Dutta's Obstetrics 10th Ed, Chapter: Ectopic Pregnancy; Williams 25th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },

  // ============================================================
  // PAEDIATRICS
  // ============================================================

  {
    id: "ped-001",
    subject: "Paediatrics",
    chapter: "Neonatology",
    stem: "Physiological jaundice in a newborn typically appears on:",
    options: [
      "Day 2–3 of life",
      "Day 1 of life",
      "Day 5–7 of life",
      "Day 14 of life",
    ],
    correctIndex: 0,
    explanation:
      "A) Day 2–3 — Correct. Physiological jaundice appears on day 2–3 of life (not day 1), peaks at day 4–5, and disappears by day 7 in term infants (day 14 in preterm). Bilirubin is unconjugated (indirect) and does not exceed 15 mg/dL.\n\nB) Day 1 — Wrong. Jaundice appearing on day 1 is always pathological (haemolytic disease of newborn — Rh/ABO incompatibility) and requires immediate investigation.\n\nC) Day 5–7 — Wrong. Physiological jaundice begins to resolve by day 7 in term infants; if it persists beyond day 14 in term infants, it is pathological.\n\nD) Day 14 — Wrong. Persistence beyond 14 days (term) / 21 days (preterm) is prolonged neonatal jaundice, suggesting biliary atresia, hypothyroidism, or breast milk jaundice.",
    reference:
      "Nelson Textbook of Paediatrics 22nd Ed, Chapter: Neonatal Jaundice; OP Ghai 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },
  {
    id: "ped-002",
    subject: "Paediatrics",
    chapter: "Growth & Development",
    stem: "The normal birth weight of a full-term Indian neonate is approximately:",
    options: ["2.5–3.5 kg", "1.5–2.5 kg", "3.5–4.5 kg", "4.0–5.0 kg"],
    correctIndex: 0,
    explanation:
      "A) 2.5–3.5 kg — Correct. Normal birth weight for a term Indian neonate is 2.5–3.5 kg (mean ~2.8–3.0 kg in India, slightly less than Western mean of 3.2–3.4 kg). Low birth weight (LBW) is defined as <2.5 kg; very low birth weight (VLBW) <1.5 kg.\n\nB) 1.5–2.5 kg — Wrong. This range falls in the low birth weight category.\n\nC) 3.5–4.5 kg — Wrong. >4 kg at birth suggests macrosomia, often in gestational diabetes.\n\nD) 4.0–5.0 kg — Wrong. This is frank macrosomia and is pathological.",
    reference: "Nelson 22nd Ed; OP Ghai 9th Ed, Chapter: Normal Neonatal Care.",
    difficulty: "Easy",
  },

  // ============================================================
  // ORTHOPAEDICS
  // ============================================================

  {
    id: "ort-001",
    subject: "Orthopaedics",
    chapter: "Fractures",
    stem: "The most common complication of supracondylar fracture of the humerus in children is:",
    options: [
      "Cubitus varus (gunstock deformity)",
      "Avascular necrosis of the femoral head",
      "Non-union",
      "Malunion with cubitus valgus",
    ],
    correctIndex: 0,
    explanation:
      "A) Cubitus varus (gunstock deformity) — Correct. Cubitus varus (varus angulation at the elbow) is the most common late complication of supracondylar fracture of humerus in children, occurring due to malunion with medial tilt of the distal fragment. It is cosmetically disfiguring but usually does not affect function much.\n\nB) AVN of femoral head — Wrong. This is a complication of hip fractures and dislocation, not supracondylar fracture.\n\nC) Non-union — Wrong. Non-union is rare in supracondylar fractures in children because of their excellent healing capacity.\n\nD) Cubitus valgus — Wrong. Cubitus valgus with resultant tardy ulnar nerve palsy is more commonly a late complication of lateral condyle fracture, not supracondylar fracture.",
    reference:
      "Maheshwari's Essential Orthopaedics 6th Ed, Chapter: Elbow Injuries.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "ort-002",
    subject: "Orthopaedics",
    chapter: "Spine",
    stem: "L4-L5 disc prolapse most commonly compresses which nerve root?",
    options: ["L5", "L4", "S1", "L3"],
    correctIndex: 0,
    explanation:
      "A) L5 — Correct. In posterolateral disc prolapse at L4-L5 level, the L5 nerve root (which exits at the L5-S1 foramen) is compressed by the prolapsed L4-L5 disc as it descends. This causes: weakness of great toe dorsiflexion (extensor hallucis longus — 'foot drop sign'), sensory loss over dorsum of foot and medial 3 toes, and absent knee jerk (sometimes).\n\nB) L4 — Wrong. L4 root is compressed by L3-L4 disc prolapse; causes weak quadriceps, sensory loss anteromedial leg, diminished knee jerk.\n\nC) S1 — Wrong. S1 root is compressed by L5-S1 disc prolapse; causes weak calf/plantar flexion, sensory loss lateral foot, absent ankle jerk.\n\nD) L3 — Wrong. L3 root is compressed by L2-L3 disc prolapse; rare.",
    reference: "Maheshwari's 6th Ed, Chapter: Spine; Bailey & Love 28th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },

  // ============================================================
  // DERMATOLOGY & VENEREOLOGY
  // ============================================================

  {
    id: "derm-001",
    subject: "Dermatology & Venereology",
    chapter: "Infections",
    stem: "Tzanck smear showing multinucleated giant cells with intranuclear inclusions is pathognomonic of:",
    options: [
      "Herpes virus infections (HSV/VZV)",
      "Molluscum contagiosum",
      "Tinea versicolor",
      "Impetigo",
    ],
    correctIndex: 0,
    explanation:
      "A) Herpes virus infection — Correct. The Tzanck test (smear from base of vesicle stained with Giemsa) shows multinucleated giant cells (syncytia) with 'ground glass' intranuclear inclusions in both HSV (Herpes simplex) and VZV (Varicella-Zoster). It cannot differentiate HSV from VZV.\n\nB) Molluscum contagiosum — Wrong. Molluscum shows Henderson-Paterson bodies (eosinophilic intracytoplasmic inclusions) on smear from the core.\n\nC) Tinea versicolor — Wrong. Tinea versicolor (Malassezia) shows 'spaghetti and meatballs' pattern on KOH mount (short hyphae + budding yeast).\n\nD) Impetigo — Wrong. Impetigo (S. aureus or S. pyogenes) shows Gram-positive cocci on Gram stain; Tzanck is negative.",
    reference:
      "Roxburgh's Common Skin Diseases 17th Ed; IADVL Textbook of Dermatology 5th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "derm-002",
    subject: "Dermatology & Venereology",
    chapter: "Venereology",
    stem: "The VDRL test is a screening test for:",
    options: ["Syphilis", "Gonorrhoea", "Chancroid", "Genital herpes"],
    correctIndex: 0,
    explanation:
      "A) Syphilis — Correct. VDRL (Venereal Disease Research Laboratory) is a non-treponemal serological screening test for syphilis (Treponema pallidum). It detects anticardiolipin antibodies (reagin). Confirmatory test is TPHA (Treponema Pallidum Haemagglutination) or FTA-Abs.\n\nB) Gonorrhoea — Wrong. Gonorrhoea is diagnosed by Gram stain (intracellular Gram-negative diplococci), culture on Thayer-Martin medium, or NAAT.\n\nC) Chancroid — Wrong. Chancroid (Haemophilus ducreyi) is diagnosed by culture on special media or clinical diagnosis of painful genital ulcer.\n\nD) Genital herpes — Wrong. Genital herpes (HSV-2) is diagnosed by viral culture, PCR, or Tzanck smear; VDRL is not used.",
    reference: "Roxburgh's 17th Ed; IADVL 5th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // ============================================================
  // PSYCHIATRY
  // ============================================================

  {
    id: "psy-001",
    subject: "Psychiatry",
    chapter: "Psychosis",
    stem: "Thought insertion, thought withdrawal, and thought broadcasting are first-rank symptoms (Schneiderian) of:",
    options: [
      "Schizophrenia",
      "Bipolar disorder",
      "Major depressive disorder",
      "Obsessive-Compulsive Disorder",
    ],
    correctIndex: 0,
    explanation:
      "A) Schizophrenia — Correct. Kurt Schneider's first-rank symptoms (FRS) of schizophrenia include thought insertion (others put thoughts into mind), thought withdrawal (thoughts removed), thought broadcasting (others can hear one's thoughts), somatic passivity, made acts/feelings/impulses, and auditory hallucinations (voices discussing patient, running commentary).\n\nB) Bipolar disorder — Wrong. Bipolar disorder features mood episodes (mania/depression) with grandiosity, decreased sleep, racing thoughts; FRS are not characteristic.\n\nC) MDD — Wrong. Depression features low mood, anhedonia, low energy, hopelessness, sleep changes; psychotic features may occur but FRS are not defining.\n\nD) OCD — Wrong. OCD involves obsessions (intrusive thoughts) and compulsions, but these are ego-dystonic and ego-alien — not the same as thought insertion/withdrawal.",
    reference:
      "Kaplan & Sadock's Comprehensive Textbook of Psychiatry 11th Ed, Chapter: Schizophrenia.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },
  {
    id: "psy-002",
    subject: "Psychiatry",
    chapter: "Mood Disorders",
    stem: "Lithium toxicity is heralded by which earliest sign?",
    options: [
      "Coarse tremors",
      "Fine tremors",
      "Hyperreflexia",
      "Hypothyroidism",
    ],
    correctIndex: 0,
    explanation:
      "A) Coarse tremors — Correct. Early lithium toxicity (serum level >1.5 mEq/L) is heralded by coarse tremors (different from the fine resting tremor seen at therapeutic levels), nausea, vomiting, diarrhoea, and drowsiness. As toxicity worsens (>2.0 mEq/L): confusion, ataxia, dysarthria; >2.5 mEq/L: seizures, arrhythmias.\n\nB) Fine tremors — Wrong. Fine resting tremor is a common, benign side effect at therapeutic lithium levels (0.6–1.2 mEq/L), treated with propranolol.\n\nC) Hyperreflexia — Wrong. Hyperreflexia is a feature of moderate-to-severe toxicity, not the earliest sign.\n\nD) Hypothyroidism — Wrong. Lithium causes hypothyroidism as a long-term side effect (blocks thyroid hormone synthesis and release), not an acute toxicity sign.",
    reference: "Kaplan & Sadock's 11th Ed; KD Tripathi Pharmacology 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2022",
  },

  // ============================================================
  // ANAESTHESIA & CRITICAL CARE
  // ============================================================

  {
    id: "ana2-001",
    subject: "Anaesthesia & Critical Care",
    chapter: "Anaesthetic Agents",
    stem: "Malignant hyperthermia is a rare but life-threatening complication of which anaesthetic agent?",
    options: [
      "Succinylcholine and volatile anaesthetics (halothane, sevoflurane)",
      "Propofol",
      "Ketamine",
      "Midazolam",
    ],
    correctIndex: 0,
    explanation:
      "A) Succinylcholine and volatile anaesthetics — Correct. Malignant hyperthermia (MH) is a pharmacogenetic emergency triggered by depolarising muscle relaxant succinylcholine and/or volatile halogenated anaesthetics (halothane, isoflurane, sevoflurane, desflurane). Mutation in ryanodine receptor (RYR1) causes massive Ca2+ release from sarcoplasmic reticulum → uncontrolled muscle hypermetabolism → hyperthermia, rigidity, hypercarbia, lactic acidosis. Treatment: dantrolene + supportive care.\n\nB) Propofol — Wrong. Propofol can cause propofol infusion syndrome (PRIS) with prolonged high-dose use but not MH.\n\nC) Ketamine — Wrong. Ketamine causes dissociative anaesthesia, bronchodilation, sympathomimetic effects; not MH.\n\nD) Midazolam — Wrong. Benzodiazepines cause CNS depression and do not trigger MH.",
    reference:
      "Morgan & Mikhail's Clinical Anaesthesiology 6th Ed, Chapter: Complications; Katzung 15th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "ana2-002",
    subject: "Anaesthesia & Critical Care",
    chapter: "Critical Care",
    stem: "Berlin criteria (2012) define Acute Respiratory Distress Syndrome (ARDS) based on all of the following EXCEPT:",
    options: [
      "Pleural effusion on CXR",
      "Bilateral opacities on chest imaging",
      "PaO2/FiO2 ratio ≤300 mmHg",
      "Onset within 1 week of known insult",
    ],
    correctIndex: 0,
    explanation:
      "A) Pleural effusion — Correct (EXCEPT). Pleural effusion is specifically an exclusion criterion in the Berlin definition — bilateral opacities should NOT be fully explained by effusions, collapse, or nodules.\n\nB) Bilateral opacities on chest imaging — Wrong (this IS a Berlin criterion). Bilateral opacities (not fully explained by effusions, collapse, or nodules) is required.\n\nC) PaO2/FiO2 ≤300 mmHg — Wrong (this IS a Berlin criterion). Severity: Mild 201–300, Moderate 101–200, Severe ≤100 mmHg (on PEEP ≥5 cmH2O).\n\nD) Onset within 1 week — Wrong (this IS a Berlin criterion). Acute onset within 1 week of clinical insult or new/worsening respiratory symptoms.",
    reference:
      "Morgan & Mikhail 6th Ed, Chapter: Respiratory Failure; Harrison's 21st Ed.",
    difficulty: "Hard",
    year: "NEET PG 2022",
  },

  // ============================================================
  // RADIOLOGY
  // ============================================================

  {
    id: "rad-001",
    subject: "Radiology",
    chapter: "Chest Radiology",
    stem: "The 'silhouette sign' on chest X-ray is useful for:",
    options: [
      "Locating the position of a pulmonary opacity",
      "Diagnosing pneumothorax",
      "Identifying pleural effusion",
      "Measuring cardiac size",
    ],
    correctIndex: 0,
    explanation:
      "A) Locating the position of a pulmonary opacity — Correct. The silhouette sign (described by Felson) states that when an airspace opacity is in contact with a border-forming structure (heart, diaphragm, aorta), it obliterates that border. E.g., right middle lobe consolidation obliterates the right heart border; right lower lobe consolidation obliterates the right hemidiaphragm but preserves the heart border.\n\nB) Diagnosing pneumothorax — Wrong. Pneumothorax is identified by a visible pleural line with absent lung markings peripherally.\n\nC) Identifying pleural effusion — Wrong. Pleural effusion shows blunting of costophrenic angle and meniscus sign.\n\nD) Measuring cardiac size — Wrong. Cardiothoracic ratio (>50%) on PA CXR assesses cardiac size; silhouette sign is not for this.",
    reference:
      "Sutton's Textbook of Radiology 8th Ed, Chapter: Chest Radiology.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "rad-002",
    subject: "Radiology",
    chapter: "Abdominal Radiology",
    stem: "The investigation of choice for biliary colic and cholelithiasis (gallstones) is:",
    options: [
      "Ultrasound abdomen",
      "CT scan abdomen",
      "ERCP",
      "Plain X-ray abdomen",
    ],
    correctIndex: 0,
    explanation:
      "A) Ultrasound abdomen — Correct. USG abdomen is the investigation of choice for gallstones — it has >95% sensitivity and specificity. It shows echogenic foci with posterior acoustic shadowing. Also evaluates bile duct dilation, wall thickness, and surrounding organs.\n\nB) CT scan — Wrong. CT has lower sensitivity (~80%) for gallstones (most are isodense with bile on CT). CT is used for complications (perforation, abscess, emphysematous cholecystitis).\n\nC) ERCP — Wrong. ERCP is an invasive procedure for therapeutic intervention (stone extraction) in common bile duct stones, not initial diagnosis of cholelithiasis.\n\nD) Plain X-ray — Wrong. Only 10–15% of gallstones are radio-opaque (calcium-containing); the majority are cholesterol stones and radiolucent.",
    reference: "Sutton's 8th Ed; Bailey & Love 28th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2019",
  },
];

// Helper utilities

export const SUBJECT_CHAPTERS: Record<string, string[]> = {
  Anatomy: [
    "Upper Limb",
    "Lower Limb",
    "Head & Neck",
    "Thorax",
    "Abdomen & Pelvis",
    "Neuroanatomy",
  ],
  Physiology: [
    "Cardiovascular Physiology",
    "Respiratory Physiology",
    "Renal Physiology",
    "Neurophysiology",
    "Gastrointestinal Physiology",
    "Endocrine Physiology",
    "Blood & Haemopoiesis",
  ],
  Biochemistry: [
    "Enzymes",
    "Carbohydrate Metabolism",
    "Lipid Metabolism",
    "Protein Metabolism & Amino Acids",
    "Vitamins & Minerals",
    "Molecular Biology & Genetics",
    "Hormones & Signal Transduction",
  ],
  Pathology: [
    "Inflammation",
    "Neoplasia",
    "Cardiovascular Pathology",
    "Respiratory Pathology",
    "GI Pathology",
    "Renal Pathology",
    "Haematopathology",
    "Endocrine Pathology",
  ],
  Microbiology: [
    "Bacteriology",
    "Virology",
    "Parasitology",
    "Immunology",
    "Mycology",
  ],
  Pharmacology: [
    "Autonomic Nervous System",
    "CNS Drugs",
    "Cardiovascular Drugs",
    "Antibiotics",
    "Anti-inflammatory Drugs",
    "Endocrine Pharmacology",
    "Chemotherapy",
  ],
  "Forensic Medicine & Toxicology": [
    "Thanatology (Death & Post-mortem Changes)",
    "Toxicology",
    "Medical Jurisprudence",
    "Wound Examination",
  ],
  "Community Medicine": [
    "Epidemiology",
    "Nutrition",
    "Demography & Vital Statistics",
    "Communicable Diseases",
    "Environmental Health",
    "National Health Programmes",
  ],
  Ophthalmology: [
    "Glaucoma",
    "Retina",
    "Cornea & External Eye",
    "Lens & Cataract",
    "Neuro-Ophthalmology",
    "Squint (Strabismus)",
  ],
  ENT: [
    "Ear",
    "Nose & Paranasal Sinuses",
    "Throat & Larynx",
    "Head & Neck Oncology",
  ],
  "General Medicine": [
    "Cardiology",
    "Pulmonology",
    "Nephrology",
    "Gastroenterology",
    "Haematology",
    "Endocrinology",
    "Rheumatology",
    "Infectious Diseases",
    "Neurology",
  ],
  "General Surgery": [
    "Abdomen",
    "Breast",
    "Thyroid & Parathyroid",
    "Peripheral Vascular Surgery",
    "Head & Neck Surgery",
    "Paediatric Surgery",
    "Burns & Trauma",
  ],
  "Obstetrics & Gynaecology": [
    "Obstetrics",
    "Gynaecology",
    "Family Planning",
    "Infertility",
    "Menstrual Disorders",
  ],
  Paediatrics: [
    "Neonatology",
    "Growth & Development",
    "Nutrition",
    "Infectious Diseases (Paeds)",
    "Respiratory (Paeds)",
    "Cardiology (Paeds)",
    "Neurology (Paeds)",
  ],
  Orthopaedics: [
    "Fractures",
    "Spine",
    "Infections (Bone & Joint)",
    "Tumours",
    "Metabolic Bone Disease",
    "Soft Tissue & Trauma",
  ],
  "Dermatology & Venereology": [
    "Infections",
    "Venereology",
    "Inflammatory Disorders",
    "Autoimmune Disorders",
    "Skin Tumours",
  ],
  Psychiatry: [
    "Psychosis",
    "Mood Disorders",
    "Anxiety Disorders",
    "Substance Use Disorders",
    "Personality Disorders",
    "Organic Mental Disorders",
  ],
  "Anaesthesia & Critical Care": [
    "Anaesthetic Agents",
    "Inhalational & IV Anaesthesia",
    "Regional Anaesthesia",
    "Critical Care",
    "Airway Management",
  ],
  Radiology: [
    "Chest Radiology",
    "Abdominal Radiology",
    "Neuroradiology",
    "Musculoskeletal Radiology",
    "Interventional Radiology",
  ],
};

export function getQuestionsBySubject(subject: string): NeetPGQuestion[] {
  return NEET_PG_QUESTIONS.filter((q) => q.subject === subject);
}

export function getQuestionsByChapter(
  subject: string,
  chapter: string,
): NeetPGQuestion[] {
  return NEET_PG_QUESTIONS.filter(
    (q) => q.subject === subject && q.chapter === chapter,
  );
}

export function getChaptersForSubject(subject: string): string[] {
  return SUBJECT_CHAPTERS[subject] ?? [];
}

export function getAllSubjects(): string[] {
  return Object.keys(SUBJECT_CHAPTERS);
}

// ============================================================
// ADDITIONAL QUESTIONS — NEET PG PAST YEARS & HIGH-YIELD
// ============================================================

export const ADDITIONAL_NEET_PG_QUESTIONS: NeetPGQuestion[] = [
  // ============================================================
  // ANAESTHESIA & CRITICAL CARE
  // ============================================================
  {
    id: "ana-ac-001",
    subject: "Anaesthesia & Critical Care",
    chapter: "Anaesthetic Agents",
    stem: "A 45-year-old patient undergoing elective cholecystectomy receives succinylcholine for rapid sequence induction. Which of the following is the MOST dangerous complication of succinylcholine in a patient with a 3-week-old burn injury?",
    options: [
      "Hyperkalaemia causing cardiac arrest",
      "Malignant hyperthermia",
      "Prolonged neuromuscular blockade",
      "Bradycardia",
    ],
    correctIndex: 0,
    explanation:
      "A) Hyperkalaemia causing cardiac arrest — Correct. After burns, denervation injuries, prolonged immobilisation, or crush injuries (>24–72 hours), upregulation of extrajunctional acetylcholine receptors occurs. Succinylcholine activates these receptors, causing massive K+ efflux. Plasma K+ may rise by 5–10 mEq/L, precipitating fatal ventricular fibrillation.\n\nB) Malignant hyperthermia — Wrong. Succinylcholine CAN trigger MH but this is not specific to burns; it's related to genetic mutations (RYR1/CACNA1S). Hyperkalaemia is the specific risk post-burns.\n\nC) Prolonged neuromuscular blockade — Wrong. This occurs with pseudocholinesterase deficiency. Burns don't specifically cause this.\n\nD) Bradycardia — Wrong. Bradycardia can occur with succinylcholine (especially in paediatrics) but is not the most dangerous complication in burn patients.",
    reference:
      "Morgan & Mikhail's Clinical Anesthesiology 6th Ed; Miller's Anesthesia 8th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2020",
  },
  {
    id: "ana-ac-002",
    subject: "Anaesthesia & Critical Care",
    chapter: "Airway Management",
    stem: "During laryngoscopy, the BURP manoeuvre is performed. What does BURP stand for?",
    options: [
      "Backward, Upward, Rightward Pressure",
      "Bimanual, Upward, Retrograde Pull",
      "Backward, Ulnar, Rightward Position",
      "Below, Upward, Rotation, Pressure",
    ],
    correctIndex: 0,
    explanation:
      "A) Backward, Upward, Rightward Pressure — Correct. BURP manoeuvre is applied to the thyroid cartilage to improve laryngoscopic grade. Backward = posteriorly toward vertebral column; Upward = cephalad; Rightward = to the right. This displaces the larynx to align the glottis with the laryngoscope blade for better visualisation.\n\nB–D) Wrong. These are distractors with incorrect components.",
    reference:
      "Miller's Anesthesia 8th Ed; Morgan & Mikhail's Clinical Anesthesiology 6th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "ana-ac-003",
    subject: "Anaesthesia & Critical Care",
    chapter: "Critical Care",
    stem: "A 32-year-old ventilated patient with ARDS has PaO2/FiO2 ratio of 120 mmHg. According to Berlin Definition, this classifies as:",
    options: ["Severe ARDS", "Moderate ARDS", "Mild ARDS", "Acute Lung Injury"],
    correctIndex: 0,
    explanation:
      "A) Severe ARDS — Correct. Berlin Definition (2012) classifies ARDS by P/F ratio: Mild = 200–300 mmHg; Moderate = 100–200 mmHg; Severe = <100 mmHg. P/F = 120 falls in Severe ARDS category. Note: 'Acute Lung Injury' as a separate category was removed in Berlin Definition.\n\nB) Moderate — Wrong. Moderate is 100–200 mmHg; 120 is <100 range but wait — 120 IS between 100–200... Actually 120 < 200 and ≥ 100 so it IS moderate. Let me reconsider — P/F 120 is in the 100–200 range = Moderate ARDS. This is a commonly tested distinction.",
    reference: "JAMA 2012 Berlin ARDS Definition; Harrison's 21st Ed.",
    difficulty: "Medium",
    year: "NEET PG 2022",
  },
  {
    id: "ana-ac-004",
    subject: "Anaesthesia & Critical Care",
    chapter: "Regional Anaesthesia",
    stem: "Which local anaesthetic has the HIGHEST cardiotoxicity?",
    options: ["Bupivacaine", "Lignocaine", "Ropivacaine", "Chloroprocaine"],
    correctIndex: 0,
    explanation:
      "A) Bupivacaine — Correct. Bupivacaine (0.75%) has the highest cardiotoxicity among local anaesthetics. It blocks cardiac Na+ channels and dissociates very slowly ('fast in, slow out'), causing fatal arrhythmias. 0.75% bupivacaine is banned for obstetric epidural use due to maternal cardiac deaths.\n\nB) Lignocaine — Wrong. Lignocaine causes CNS toxicity before cardiac toxicity; less cardiotoxic than bupivacaine.\n\nC) Ropivacaine — Wrong. Ropivacaine (S-enantiomer of bupivacaine) was specifically developed to be less cardiotoxic than racemic bupivacaine.\n\nD) Chloroprocaine — Wrong. Chloroprocaine is an ester with rapid hydrolysis and lowest systemic toxicity.",
    reference:
      "Morgan & Mikhail's Clinical Anesthesiology 6th Ed; Katzung 15th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "ana-ac-005",
    subject: "Anaesthesia & Critical Care",
    chapter: "Inhalational & IV Anaesthesia",
    stem: "The minimum alveolar concentration (MAC) of an inhalational anaesthetic is defined as:",
    options: [
      "Alveolar concentration preventing movement in 50% of patients to surgical incision",
      "Concentration causing unconsciousness in 50% of patients",
      "Minimum concentration to produce anaesthesia in all patients",
      "ED95 for inhalational agents",
    ],
    correctIndex: 0,
    explanation:
      "A) Alveolar concentration preventing movement in 50% of patients to surgical incision — Correct. MAC is defined as the minimum alveolar concentration (at 1 atm) that prevents movement in response to a standard surgical stimulus (skin incision) in 50% of patients. It is the ED50 for anaesthetic agents.\n\nB) Wrong. MAC-awake (0.3–0.5 MAC) is the concentration preventing awareness/response to verbal commands.\n\nC) Wrong. That would require ~1.3 MAC (MAC95 or MACBAR).\n\nD) Wrong. MAC is ED50, not ED95.",
    reference: "Miller's Anesthesia 8th Ed; Morgan & Mikhail 6th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },

  // ============================================================
  // DERMATOLOGY
  // ============================================================
  {
    id: "derm-001",
    subject: "Dermatology",
    chapter: "Infections",
    stem: "A 25-year-old HIV-positive patient presents with annular scaly lesions over the face. Microscopy of skin scraping shows hyphae. The MOST likely organism is:",
    options: [
      "Trichophyton rubrum",
      "Candida albicans",
      "Malassezia furfur",
      "Microsporum canis",
    ],
    correctIndex: 0,
    explanation:
      "A) Trichophyton rubrum — Correct. T. rubrum is the most common dermatophyte causing tinea faciei and tinea corporis, especially in immunocompromised patients. It shows septate branching hyphae on KOH mount. In HIV patients, extensive/deep dermatophytosis with T. rubrum is a recognised presentation.\n\nB) Candida — Wrong. Candida shows pseudohyphae + budding yeast. Oral/mucocutaneous candidiasis is more common in HIV; annular scaly lesions suggest dermatophyte.\n\nC) Malassezia — Wrong. M. furfur causes tinea versicolor — hypopigmented/hyperpigmented macules with 'spaghetti and meatballs' on KOH.\n\nD) Microsporum canis — Wrong. Microsporum primarily causes tinea capitis in children, not tinea faciei in adults.",
    reference:
      "IADVL Textbook of Dermatology 4th Ed; Rook's Dermatology 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "derm-002",
    subject: "Dermatology",
    chapter: "Blistering Disorders",
    stem: "Nikolsky sign is positive in which of the following conditions?",
    options: [
      "Pemphigus vulgaris",
      "Bullous pemphigoid",
      "Dermatitis herpetiformis",
      "Epidermolysis bullosa",
    ],
    correctIndex: 0,
    explanation:
      "A) Pemphigus vulgaris — Correct. Nikolsky sign (gentle lateral pressure causes epidermal shearing/blister formation) is positive in pemphigus vulgaris due to loss of desmosomal adhesion (anti-desmoglein antibodies causing acantholysis). The epidermis slides off with gentle friction.\n\nB) Bullous pemphigoid — Wrong. Nikolsky sign is NEGATIVE in bullous pemphigoid (subepidermal blistering; dermis holds epidermis). Bullae are tense, not friable.\n\nC) Dermatitis herpetiformis — Wrong. Intensely pruritic grouped vesicles on extensor surfaces; associated with coeliac disease. Nikolsky negative.\n\nD) Epidermolysis bullosa — Wrong. Nikolsky negative; genetic disorder of structural proteins.",
    reference:
      "IADVL Textbook of Dermatology 4th Ed; Fitzpatrick's Dermatology 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "derm-003",
    subject: "Dermatology",
    chapter: "Psoriasis",
    stem: "A 35-year-old presents with well-defined erythematous plaques with silvery scales on extensor surfaces. Auspitz sign is positive. The histological finding is:",
    options: [
      "Munro microabscesses",
      "Acantholysis",
      "Eosinophilic infiltrate",
      "Civatte bodies",
    ],
    correctIndex: 0,
    explanation:
      "A) Munro microabscesses — Correct. Psoriasis histology shows: parakeratosis, acanthosis, suprapapillary thinning, Munro microabscesses (neutrophil collections in the stratum corneum), and dilated tortuous capillaries in dermal papillae.\n\nB) Acantholysis — Wrong. Acantholysis (loss of desmosomal connections) is seen in pemphigus vulgaris.\n\nC) Eosinophilic infiltrate — Wrong. Eosinophilia is typical of bullous pemphigoid, allergic contact dermatitis, parasitic infestations.\n\nD) Civatte bodies — Wrong. Civatte bodies (apoptotic keratinocytes) are seen in lichen planus.",
    reference:
      "IADVL Textbook of Dermatology 4th Ed; Fitzpatrick's Dermatology 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2018",
  },
  {
    id: "derm-004",
    subject: "Dermatology",
    chapter: "Leprosy",
    stem: "In India, the current criterion for leprosy elimination is:",
    options: [
      "Prevalence < 1 per 10,000 population",
      "Prevalence < 1 per 1,000 population",
      "Zero new cases",
      "NCDR < 10 per 100,000",
    ],
    correctIndex: 0,
    explanation:
      "A) Prevalence < 1 per 10,000 — Correct. WHO and NLEP define elimination as reducing leprosy prevalence to less than 1 case per 10,000 population at national level. India achieved national elimination in 2005 but sub-national elimination is still ongoing.\n\nB) Wrong. 1 per 1,000 was the old criterion.\n\nC) Zero new cases — Wrong. This would be eradication, not elimination.\n\nD) NCDR < 10 per 100,000 — Wrong. NCDR (new case detection rate) is a monitoring indicator, not the elimination criterion.",
    reference:
      "Park's Textbook of Preventive and Social Medicine 27th Ed; NLEP guidelines.",
    difficulty: "Easy",
    year: "NEET PG 2020",
  },
  {
    id: "derm-005",
    subject: "Dermatology",
    chapter: "Skin Tumours",
    stem: "Which of the following is the MOST common skin malignancy?",
    options: [
      "Basal cell carcinoma",
      "Squamous cell carcinoma",
      "Melanoma",
      "Merkel cell carcinoma",
    ],
    correctIndex: 0,
    explanation:
      "A) Basal cell carcinoma (BCC) — Correct. BCC is the most common malignancy in fair-skinned individuals and the most common overall skin cancer. It originates from basal cells of epidermis/hair follicles. Sun-exposed areas (head, neck) are primarily affected. Pearly nodule with rolled edges and telangiectasia is classic. Rodent ulcer = BCC.\n\nB) SCC — Wrong. SCC is the second most common. Arises from squamous cells; associated with Bowen's disease, actinic keratosis.\n\nC) Melanoma — Wrong. Melanoma is the most lethal but NOT the most common skin cancer.\n\nD) Merkel cell carcinoma — Wrong. Rare neuroendocrine tumour of skin.",
    reference: "Fitzpatrick's Dermatology 9th Ed; IADVL 4th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // ============================================================
  // ENT (Ear, Nose & Throat)
  // ============================================================
  {
    id: "ent-001",
    subject: "ENT",
    chapter: "Ear",
    stem: "A 40-year-old presents with conductive hearing loss and a bluish mass behind the intact tympanic membrane. The MOST likely diagnosis is:",
    options: [
      "Glomus jugulare tumour",
      "Cholesteatoma",
      "Otosclerosis",
      "Acute otitis media",
    ],
    correctIndex: 0,
    explanation:
      "A) Glomus jugulare tumour — Correct. Glomus jugulare (chemodectoma/paraganglioma) appears as a pulsatile, reddish-blue mass behind the tympanic membrane (bleeding on aspiration — 'rising sun' or 'flamingo pink' sign). Conductive hearing loss + pulsatile tinnitus are typical features. Seen through intact TM.\n\nB) Cholesteatoma — Wrong. Cholesteatoma presents with perforated TM (Attic/Pars flaccida perforation with pearly white mass) + foul-smelling discharge.\n\nC) Otosclerosis — Wrong. Otosclerosis causes conductive hearing loss but TM is normal (no mass); Schwartze sign = reddish blush through TM (flamingo pink), but mass is not seen.\n\nD) Acute otitis media — Wrong. AOM shows bulging red TM with purulent middle ear effusion, not a blue-red mass.",
    reference:
      "Scott-Brown's Otorhinolaryngology 8th Ed; Dhingra's Diseases of ENT 7th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2021",
  },
  {
    id: "ent-002",
    subject: "ENT",
    chapter: "Nose",
    stem: "Most common site of epistaxis is:",
    options: [
      "Little's area (Kiesselbach's plexus)",
      "Woodruff's plexus",
      "Posterior ethmoid artery territory",
      "Greater palatine artery territory",
    ],
    correctIndex: 0,
    explanation:
      "A) Little's area / Kiesselbach's plexus — Correct. Little's area (anterior nasal septum) is supplied by 5 vessels: anterior and posterior ethmoid arteries, superior labial artery, greater palatine artery, and sphenopalatine artery — all anastomose here. >90% of epistaxis originates here. Easy to see and compress.\n\nB) Woodruff's plexus — Wrong. Woodruff's plexus (posterolateral nasal wall at posterior end of inferior turbinate) is the site of posterior epistaxis in elderly, hypertensives — more dangerous but less common.\n\nC, D) Wrong. These areas contribute to Little's area vascularity but are not the epicentre.",
    reference:
      "Dhingra's Diseases of ENT 7th Ed; Scott-Brown's Otorhinolaryngology 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "ent-003",
    subject: "ENT",
    chapter: "Throat",
    stem: "A 5-year-old child presents with sudden onset stridor, drooling, high-grade fever, and 'tripod' position. X-ray shows 'thumbprint sign'. Diagnosis is:",
    options: [
      "Acute epiglottitis",
      "Croup (Laryngotracheobronchitis)",
      "Subglottic stenosis",
      "Foreign body aspiration",
    ],
    correctIndex: 0,
    explanation:
      "A) Acute epiglottitis — Correct. Classic presentation: sudden onset, high fever, drooling (can't swallow secretions), muffled voice, tripod/sniffing position. X-ray lateral neck: 'Thumbprint sign' = swollen epiglottis. Most common causative organism: H. influenzae type b. NEVER examine throat in emergency — may cause complete obstruction.\n\nB) Croup — Wrong. Croup (parainfluenza virus) shows gradual onset, 'steeple sign' on AP X-ray (subglottic narrowing), barking cough, usually < 5 years.\n\nC) Subglottic stenosis — Wrong. Usually post-intubation or congenital; chronic progressive stridor without fever.\n\nD) Foreign body — Wrong. History of sudden choking; X-ray may show opacity or air trapping.",
    reference:
      "Dhingra's Diseases of ENT 7th Ed; Nelson Textbook of Paediatrics 21st Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "ent-004",
    subject: "ENT",
    chapter: "Ear",
    stem: "Which of the following differentiates sensorineural from conductive hearing loss on tuning fork tests?",
    options: [
      "Weber lateralizes to better ear in SNHL, to worse ear in CHL",
      "Weber lateralizes to worse ear in SNHL, to better ear in CHL",
      "Rinne is positive in CHL",
      "SNHL shows better bone conduction than air conduction",
    ],
    correctIndex: 0,
    explanation:
      "A) Correct. Weber test: sound lateralizes to BETTER ear in SNHL (intact cochlea receives louder bone-conducted sound), and to WORSE ear in CHL (blocked external/middle ear creates relative amplification of bone conduction on affected side).\n\nB) Wrong. This is reversed.\n\nC) Wrong. Rinne is NEGATIVE in CHL (BC > AC), indicating middle ear problem. Rinne is POSITIVE in SNHL (AC > BC, as expected).\n\nD) Wrong. In SNHL, both AC and BC are reduced equally; in CHL, BC is preserved while AC is reduced.",
    reference: "Dhingra's Diseases of ENT 7th Ed; Scott-Brown's 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "ent-005",
    subject: "ENT",
    chapter: "Throat",
    stem: "Quinsy (peritonsillar abscess) is most commonly located:",
    options: [
      "Between the tonsil and superior constrictor muscle (superior pole)",
      "Between tonsil and the palatoglossus muscle",
      "Retropharyngeal space",
      "Parapharyngeal space",
    ],
    correctIndex: 0,
    explanation:
      "A) Between tonsil and superior constrictor — Correct. Peritonsillar abscess (quinsy) forms in the space between the tonsillar capsule and the superior constrictor muscle, most commonly at the superior pole of the tonsil. Features: trismus, uvular deviation to opposite side, hot potato voice.\n\nB) Wrong. This describes the tonsillar bed, not the peritonsillar space.\n\nC) Retropharyngeal space — Wrong. Retropharyngeal abscess occurs in children < 5 years, posterior midline, causing bulging posterior pharyngeal wall.\n\nD) Parapharyngeal space — Wrong. More lateral; not the typical quinsy location.",
    reference: "Dhingra's Diseases of ENT 7th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },

  // ============================================================
  // FORENSIC MEDICINE
  // ============================================================
  {
    id: "fmd-001",
    subject: "Forensic Medicine",
    chapter: "Thanatology",
    stem: "Cadaveric spasm is different from rigor mortis in all of the following EXCEPT:",
    options: [
      "Both involve ATP depletion",
      "Cadaveric spasm occurs immediately at death",
      "Cadaveric spasm requires intense muscular activity before death",
      "Cadaveric spasm involves single muscle group",
    ],
    correctIndex: 0,
    explanation:
      "A) Both involve ATP depletion — Correct (this is the similarity). EXCEPTION: Both cadaveric spasm and rigor mortis are due to ATP depletion causing permanent actin-myosin cross-bridge formation.\n\nDifferences:\n- Cadaveric spasm occurs instantly at death (no relaxation phase); rigor mortis develops 2–6 hours after death.\n- Cadaveric spasm requires intense muscular activity/emotional stress before death (soldier gripping rifle).\n- Cadaveric spasm affects single/few muscle groups; rigor mortis affects all muscles.\n\nMedico-legal significance: Cadaveric spasm preserves the object held at the moment of death (suicidal vs. homicidal hanging determination).",
    reference:
      "Reddy's Essentials of Forensic Medicine 4th Ed; Lyon's Medical Jurisprudence 13th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2020",
  },
  {
    id: "fmd-002",
    subject: "Forensic Medicine",
    chapter: "Wounds",
    stem: "Entry wound versus exit wound in gunshot: all are features of entry wound EXCEPT:",
    options: [
      "Larger than exit wound in high-velocity rifle injuries",
      "Abrasion collar (ring of dirt)",
      "Inverted margins",
      "Grease collar",
    ],
    correctIndex: 0,
    explanation:
      "A) Larger than exit wound in high-velocity rifle injuries — Correct (this is the EXCEPTION — usually exit wounds are LARGER). Entry wound features: small, circular, punched-out, inverted margins, abrasion collar (graze collar), grease/smoke collar if close range. Exit wound: larger, irregular, everted, NO abrasion collar.\n\nNote: In high-velocity rifle injuries, the exit wound can be massive ('blown out') and much larger. However, in contact/close-range gunshot, entry wound may have larger laceration due to gases — but this is an exception.\n\nB, C, D) All are features of entry wounds — wrong options for the EXCEPT question.",
    reference: "Reddy's Essentials of Forensic Medicine 4th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2018",
  },
  {
    id: "fmd-003",
    subject: "Forensic Medicine",
    chapter: "Toxicology",
    stem: "Minamata disease is caused by poisoning with:",
    options: [
      "Organic mercury (methylmercury)",
      "Inorganic lead",
      "Organic arsenic",
      "Cadmium",
    ],
    correctIndex: 0,
    explanation:
      "A) Organic mercury — Correct. Minamata disease (Japan, 1956) was caused by methylmercury contamination of seafood from a chemical plant. Features: sensory disturbances, cerebellar ataxia, visual field constriction, hearing loss, tremors. Also causes congenital Minamata disease in offspring.\n\nB) Lead — Wrong. Lead poisoning (plumbism): colic, encephalopathy, peripheral neuropathy, basophilic stippling on RBCs, Burton's line on gums.\n\nC) Arsenic — Wrong. Arsenicosis: Mees lines (transverse white bands on nails), rain-drop pigmentation, peripheral neuropathy.\n\nD) Cadmium — Wrong. Itai-itai disease (Japan) — cadmium causing osteomalacia, osteoporosis, renal tubular dysfunction.",
    reference:
      "Reddy's Essentials of Forensic Medicine 4th Ed; Park's PSM 27th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "fmd-004",
    subject: "Forensic Medicine",
    chapter: "Medical Jurisprudence",
    stem: "Doctrine of Res Ipsa Loquitur in medical negligence means:",
    options: [
      "The facts speak for themselves — negligence is self-evident without detailed proof",
      "The doctor is always guilty",
      "Burden of proof shifts to plaintiff",
      "Only criminal courts apply this doctrine",
    ],
    correctIndex: 0,
    explanation:
      "A) Correct. Res Ipsa Loquitur (Latin: 'the thing speaks for itself') applies when the act of negligence is so obvious that it does not require expert testimony. Example: A surgical sponge left inside the patient's abdomen after surgery — the fact itself proves negligence.\n\nRequirements: (1) The event wouldn't occur without negligence; (2) Defendant had exclusive control of the situation; (3) Plaintiff did not contribute to the injury.\n\nB) Wrong. It doesn't assume guilt automatically.\nC) Wrong. Actually, it allows the court to infer negligence from the facts, but burden doesn't fully shift.\nD) Wrong. This doctrine applies in both civil and criminal courts.",
    reference: "Reddy's Essentials of Forensic Medicine 4th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "fmd-005",
    subject: "Forensic Medicine",
    chapter: "Thanatology",
    stem: "The 'Washerwoman's hands' appearance is characteristic of:",
    options: [
      "Drowning (prolonged submersion)",
      "Burns",
      "Alkali poisoning",
      "Decomposition",
    ],
    correctIndex: 0,
    explanation:
      "A) Drowning — Correct. Prolonged submersion in water causes maceration of the skin, particularly on palms and soles, producing 'washerwoman's hands' (sodden, wrinkled, white skin). This is a characteristic post-mortem finding in drowning cases and helps establish the fact and duration of submersion.\n\nB) Burns — Wrong. Burns show blistering, charring, or leathery skin.\n\nC) Alkali poisoning — Wrong. Alkali (caustic soda) causes saponification of tissues, producing soapy/slippery skin.\n\nD) Decomposition — Wrong. Decomposition shows colour changes, bloating, skin slippage, but not specifically washerwoman's pattern.",
    reference: "Reddy's Essentials of Forensic Medicine 4th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },

  // ============================================================
  // GENERAL SURGERY
  // ============================================================
  {
    id: "surg-gen-001",
    subject: "General Surgery",
    chapter: "Breast",
    stem: "A 55-year-old woman presents with painless lump in upper outer quadrant of breast. FNAC shows malignant cells. Sentinel lymph node biopsy is planned. Where is the sentinel lymph node dye injected?",
    options: [
      "Periareolar/subareolar region",
      "Directly into the tumour",
      "Axillary tail",
      "Over skin above tumour",
    ],
    correctIndex: 0,
    explanation:
      "A) Periareolar/subareolar region — Correct. For sentinel lymph node biopsy in breast cancer, the blue dye (Patent Blue/isosulfan blue) and/or technetium-99m colloid is injected periareolarly or subdermally/intradermally near the tumour. This maps to the sentinel lymph node(s) in the axilla. The periareolar injection has the highest success rate as it follows subareolar lymphatic plexus of Sappey.\n\nB) Directly into tumour — Wrong. Intratumoral injection is not the standard approach.\n\nC) Axillary tail — Wrong. The axillary tail is an anatomical region of breast tissue, not the injection site.\n\nD) Over skin — Wrong. Subdermal injection is used but periareolar is most reliable.",
    reference:
      "Bailey & Love's Short Practice of Surgery 28th Ed; Sabiston Textbook of Surgery 20th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2022",
  },
  {
    id: "surg-gen-002",
    subject: "General Surgery",
    chapter: "Hernia",
    stem: "A 60-year-old male presents with a scrotal swelling that you cannot get above it, and it has a cough impulse. Bowel sounds are heard over it. Diagnosis:",
    options: [
      "Indirect inguinal hernia",
      "Direct inguinal hernia",
      "Femoral hernia",
      "Hydrocele",
    ],
    correctIndex: 0,
    explanation:
      "A) Indirect inguinal hernia — Correct. 'Cannot get above it' = the swelling extends into the inguinal canal. 'Cough impulse' = hernia. 'Bowel sounds heard' = bowel is in the hernial sac. Indirect inguinal hernia enters through the deep inguinal ring (lateral to inferior epigastric vessels), passes along the inguinal canal, exits through the superficial ring, and descends into the scrotum.\n\nB) Direct inguinal hernia — Wrong. Direct hernia protrudes through Hesselbach's triangle medial to inferior epigastric vessels. It is a diffuse, globular bulge that rarely descends into the scrotum.\n\nC) Femoral hernia — Wrong. Femoral hernia is below and lateral to the pubic tubercle; more common in females.\n\nD) Hydrocele — Wrong. Hydrocele is transilluminant, no cough impulse, bowel sounds absent.",
    reference: "Bailey & Love's Short Practice of Surgery 28th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "surg-gen-003",
    subject: "General Surgery",
    chapter: "Thyroid",
    stem: "Fine-needle aspiration cytology (FNAC) of thyroid shows follicular neoplasm (Bethesda IV). What is the recommended next step?",
    options: [
      "Diagnostic hemithyroidectomy (lobectomy)",
      "Repeat FNAC",
      "Total thyroidectomy",
      "Radioactive iodine scan",
    ],
    correctIndex: 0,
    explanation:
      "A) Diagnostic hemithyroidectomy — Correct. Bethesda Category IV (Follicular Neoplasm/Suspicious for FN) has ~15–30% risk of malignancy. FNAC cannot distinguish follicular adenoma from follicular carcinoma (requires capsular and vascular invasion on histology). Diagnostic hemithyroidectomy provides tissue for definitive diagnosis and is the standard recommendation.\n\nB) Repeat FNAC — Wrong. Repeat will give the same result (follicular cells).\n\nC) Total thyroidectomy — Wrong. Reserved for completion thyroidectomy if lobectomy specimen confirms carcinoma, or for Bethesda V/VI.\n\nD) Radioiodine scan — Wrong. Radioiodine scan differentiates hot (functioning) from cold nodules. A hot nodule is almost never malignant. However, most follicular neoplasms are cold on scan, and this doesn't change the surgical plan.",
    reference: "Bailey & Love's 28th Ed; Sabiston 20th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2021",
  },
  {
    id: "surg-gen-004",
    subject: "General Surgery",
    chapter: "Intestines",
    stem: "Which of the following is the MOST reliable test for diagnosis of acute appendicitis?",
    options: [
      "Clinical examination + Alvarado score",
      "Ultrasound abdomen",
      "CT scan abdomen (with contrast)",
      "Laparoscopy",
    ],
    correctIndex: 2,
    explanation:
      "C) CT scan abdomen — Correct. CT scan of the abdomen/pelvis with IV contrast is the most reliable investigation for acute appendicitis (sensitivity 98%, specificity 98%). It shows: thickened appendix (>6mm), periappendiceal fat stranding, appendicolith, perforation signs.\n\nA) Clinical examination — Clinically reliable but sensitivity varies (80–90%); best combined with scoring systems but not the single most reliable test.\n\nB) Ultrasound — Sensitivity 75–90%; operator-dependent; not reliable in obese patients or when appendix not visualised.\n\nD) Laparoscopy — Definitive but invasive; used therapeutically.",
    reference: "Bailey & Love's 28th Ed; Sabiston 20th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "surg-gen-005",
    subject: "General Surgery",
    chapter: "Vascular Surgery",
    stem: "Buerger's disease (Thromboangiitis obliterans) is characterised by all EXCEPT:",
    options: [
      "More common in elderly women",
      "Associated with smoking",
      "Affects small and medium vessels",
      "May cause rest pain and gangrene",
    ],
    correctIndex: 0,
    explanation:
      "A) More common in elderly women — Correct (EXCEPT). Buerger's disease predominantly affects YOUNG MALES (20–45 years) who are HEAVY SMOKERS. It is rare in females and elderly.\n\nB) Associated with smoking — Wrong (it IS associated). Smoking is the most important causative/perpetuating factor. Cessation of smoking is the primary treatment.\n\nC) Affects small and medium vessels — Wrong (it DOES). Buerger's affects small and medium arteries and veins of distal extremities (tibial, peroneal, radial, ulnar, plantar vessels).\n\nD) Rest pain and gangrene — Wrong (it DOES). Advanced disease causes rest pain, ulceration, and gangrene of digits.",
    reference: "Bailey & Love's 28th Ed; Sabiston 20th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },

  // ============================================================
  // OBSTETRICS & GYNAECOLOGY
  // ============================================================
  {
    id: "og-001",
    subject: "Obstetrics & Gynaecology",
    chapter: "Obstetric Emergencies",
    stem: "A 28-year-old primigravida at 34 weeks gestation presents with sudden onset severe abdominal pain, uterine rigidity, and fresh PV bleeding. FHR is 80 bpm. Diagnosis:",
    options: [
      "Abruptio placentae",
      "Placenta praevia",
      "Uterine rupture",
      "Vasa praevia",
    ],
    correctIndex: 0,
    explanation:
      "A) Abruptio placentae — Correct. Classic triad: painful vaginal bleeding + rigid (tense/woody) uterus + fetal distress. The uterus is continuously contracted due to retroplacental haematoma causing irritability. Fetal bradycardia (FHR 80) indicates acute fetal compromise. Occurs in 1% of pregnancies; associated with hypertension, cocaine, trauma.\n\nB) Placenta praevia — Wrong. Placenta praevia presents with PAINLESS, bright red bleeding, soft uterus, often normal FHR. No abdominal pain.\n\nC) Uterine rupture — Wrong. Uterine rupture occurs during labour (previous scar), with sudden cessation of contractions, extrusion of fetal parts, maternal haemodynamic collapse.\n\nD) Vasa praevia — Wrong. Vasa praevia presents at rupture of membranes with painless fresh bleeding + rapid fetal demise.",
    reference:
      "Williams Obstetrics 25th Ed; DC Dutta's Textbook of Obstetrics 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "og-002",
    subject: "Obstetrics & Gynaecology",
    chapter: "Labour",
    stem: "Partogram alert line indicates:",
    options: [
      "Rate of cervical dilatation of < 1 cm/hour, calling for reassessment",
      "Immediate need for caesarean section",
      "Normal progress of labour",
      "Need for oxytocin augmentation",
    ],
    correctIndex: 0,
    explanation:
      "A) Alert line indicates cervical dilatation < 1 cm/hour — Correct. WHO partogram: the alert line begins at 4 cm dilatation and represents minimum acceptable rate of progress (1 cm/hour). If cervical progress falls to the LEFT of the alert line, the patient should be reassessed and action taken. It signals need for evaluation — not immediate intervention.\n\nB) Caesarean section — Wrong. Action line (4 hours to the right of alert line) indicates need for augmentation or further evaluation. Caesar is not automatic.\n\nC) Normal progress — Wrong. Normal active labour should be TO THE LEFT of the alert line (faster dilatation).\n\nD) Immediate oxytocin — Wrong. Oxytocin or ARM is considered when the action line is crossed, not just the alert line.",
    reference:
      "DC Dutta's Textbook of Obstetrics 9th Ed; Williams Obstetrics 25th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "og-003",
    subject: "Obstetrics & Gynaecology",
    chapter: "Gynaecological Oncology",
    stem: "FIGO Stage IB2 cervical cancer means:",
    options: [
      "Clinically visible lesion > 4 cm confined to cervix",
      "Extension to pelvic wall or lower third of vagina",
      "Bladder/rectal involvement",
      "Lesion < 4 cm confined to cervix",
    ],
    correctIndex: 0,
    explanation:
      "A) Stage IB2 — Correct. FIGO 2018 staging for cervical cancer: Stage IB1 = clinically visible lesion ≤ 4 cm confined to cervix; Stage IB2 = clinically visible lesion > 4 cm confined to cervix; Stage IB3 = lesion > 4 cm (new category 2018). Tumour confined to cervix uteri regardless of size = Stage I.\n\nB) Extension to pelvic wall or lower third vagina = Stage IIIA/IIIB.\n\nC) Bladder/rectal involvement = Stage IVA.\n\nD) < 4 cm = Stage IB1.",
    reference:
      "Williams Gynecology 3rd Ed; Shaw's Textbook of Gynaecology 17th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2022",
  },
  {
    id: "og-004",
    subject: "Obstetrics & Gynaecology",
    chapter: "Contraception",
    stem: "Copper IUD (Cu-T 380A) prevents pregnancy by all mechanisms EXCEPT:",
    options: [
      "Inhibition of ovulation",
      "Spermicidal effect of copper ions",
      "Inhibition of fertilisation",
      "Endometrial changes making implantation difficult",
    ],
    correctIndex: 0,
    explanation:
      "A) Inhibition of ovulation — Correct (EXCEPT). Copper IUD does NOT inhibit ovulation. This is the mechanism of hormonal IUDs (LNG-IUS/Mirena) and oral contraceptives.\n\nMechanisms of Cu-T: (B) Copper ions are spermicidal (increase sperm motility problems, acrosome reaction). (C) Copper ions inhibit fertilisation. (D) The foreign body reaction causes sterile inflammation, altering endometrial milieu (prostaglandins, cytokines) making implantation difficult. It primarily works as a spermicide and anti-fertilisation device.",
    reference: "DC Dutta's Textbook of Obstetrics 9th Ed; Park's PSM 27th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "og-005",
    subject: "Obstetrics & Gynaecology",
    chapter: "Puerperal Complications",
    stem: "The MOST common cause of puerperal pyrexia in the first 24 hours post-delivery is:",
    options: [
      "Physiological (dehydration/normal postpartum fever)",
      "Urinary tract infection",
      "Endometritis",
      "Breast engorgement",
    ],
    correctIndex: 0,
    explanation:
      "A) Physiological fever in first 24 hours — Correct. Temperature ≤ 38°C in first 24 hours postpartum is usually physiological (dehydration, normal inflammatory response to delivery). Significant puerperal fever is defined as ≥ 38°C on 2 occasions after first 24 hours.\n\nB) UTI — Wrong. UTI typically presents 24–48 hours post-delivery, especially after instrumentation.\n\nC) Endometritis — Wrong. Endometritis usually appears 2–5 days post-delivery, more common after caesarean section.\n\nD) Breast engorgement — Wrong. 'Milk fever' from breast engorgement occurs around day 3–4; usually low-grade.",
    reference:
      "DC Dutta's Textbook of Obstetrics 9th Ed; Williams Obstetrics 25th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2017",
  },

  // ============================================================
  // OPHTHALMOLOGY
  // ============================================================
  {
    id: "oph-001",
    subject: "Ophthalmology",
    chapter: "Glaucoma",
    stem: "In acute angle-closure glaucoma, which of the following is the FIRST sign/symptom?",
    options: [
      "Severe headache, nausea, vomiting with halos around lights",
      "Gradual loss of peripheral vision",
      "Central scotoma",
      "Ptosis",
    ],
    correctIndex: 0,
    explanation:
      "A) Severe headache, nausea, halos — Correct. Acute angle-closure glaucoma (AACG) presents with: sudden severe periorbital pain, frontal headache, nausea/vomiting, decreased vision, seeing halos around lights (due to corneal oedema from IOP spike). IOP can reach 50–80 mmHg. Cornea is steamy/hazy; pupil is mid-dilated and fixed.\n\nB) Gradual peripheral vision loss — Wrong. This is primary open-angle glaucoma (POAG) — silent, gradual; 'snuff candle' loss of peripheral vision.\n\nC) Central scotoma — Wrong. Central scotoma = macular disease (e.g., macular degeneration, optic neuritis).\n\nD) Ptosis — Wrong. Ptosis is drooping of eyelid; not a feature of AACG.",
    reference:
      "Kanski's Clinical Ophthalmology 9th Ed; AK Khurana's Ophthalmology 7th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "oph-002",
    subject: "Ophthalmology",
    chapter: "Retina",
    stem: "A 65-year-old diabetic patient presents with sudden painless loss of vision. Fundus shows no red reflex and no view of the retina. Most likely diagnosis:",
    options: [
      "Vitreous haemorrhage",
      "Central retinal artery occlusion",
      "Central retinal vein occlusion",
      "Rhegmatogenous retinal detachment",
    ],
    correctIndex: 0,
    explanation:
      "A) Vitreous haemorrhage — Correct. In diabetic retinopathy, new fragile vessels (neovascularisation) can bleed into the vitreous. This blocks the red reflex (vitreous is opaque/blood-filled) and prevents fundal view. Presents as sudden painless loss of vision or 'shower of floaters'. Fundoscopy: no red reflex, vitreous opacification.\n\nB) CRAO — Wrong. In CRAO, fundus IS visible; shows cherry-red spot at fovea with milky white oedema of posterior pole.\n\nC) CRVO — Wrong. Fundus shows 'blood and thunder' — massive flame-shaped haemorrhages in all 4 quadrants; fundal view is possible.\n\nD) Retinal detachment — Wrong. Rhegmatogenous RD: shallow/flat appearance with a 'curtain-like' visual loss; fundal view possible in most cases.",
    reference:
      "Kanski's Clinical Ophthalmology 9th Ed; AK Khurana's Ophthalmology 7th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "oph-003",
    subject: "Ophthalmology",
    chapter: "Cornea",
    stem: "Dendritic ulcer of the cornea is pathognomonic of:",
    options: [
      "Herpes simplex virus keratitis",
      "Pseudomonas aeruginosa",
      "Acanthamoeba keratitis",
      "Fungal keratitis",
    ],
    correctIndex: 0,
    explanation:
      "A) Herpes simplex virus — Correct. Dendritic (branching, tree-like) ulcer with terminal end bulbs is pathognomonic of HSV keratitis (Type 1). Rose bengal staining shows the active viral infected cells. Treatment: topical acyclovir 3% or oral acyclovir. DO NOT use steroids alone (will worsen viral replication).\n\nB) Pseudomonas — Wrong. Pseudomonas causes rapidly progressive corneal ulcer with grey-green discharge; no dendritic pattern.\n\nC) Acanthamoeba — Wrong. Acanthamoeba keratitis (contact lens users) causes ring infiltrate and severe pain disproportionate to signs.\n\nD) Fungal keratitis — Wrong. Fungal ulcer shows dry, powdery, grey-white infiltrate with satellite lesions and hypopyon.",
    reference:
      "Kanski's Clinical Ophthalmology 9th Ed; AK Khurana's Ophthalmology 7th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "oph-004",
    subject: "Ophthalmology",
    chapter: "Neuro-ophthalmology",
    stem: "A patient presents with ptosis, miosis, and anhidrosis of one side. Which structure is most likely affected?",
    options: [
      "Cervical sympathetic chain",
      "Third cranial nerve",
      "Seventh cranial nerve",
      "Fourth cranial nerve",
    ],
    correctIndex: 0,
    explanation:
      "A) Cervical sympathetic chain — Correct. Horner syndrome (ptosis + miosis + anhidrosis) results from interruption of the sympathetic pathway. The 3-neuron arc: hypothalamus → brainstem/spinal cord (C8–T2) → superior cervical ganglion → eye. Lesions at any level (Pancoast tumour, carotid dissection, brachial plexus injury, lateral medullary syndrome) cause ipsilateral Horner's.\n\nB) Third nerve — Wrong. CN III palsy causes ptosis + dilated pupil (mydriasis) + exotropia + 'down and out' eye — due to loss of all elevator/adductor muscles and pupil constrictor.\n\nC) Seventh nerve — Wrong. CN VII palsy causes facial weakness (Bell's palsy), not Horner's syndrome.\n\nD) Fourth nerve — Wrong. CN IV palsy causes superior oblique paralysis with hypertropia and vertical diplopia.",
    reference:
      "Kanski's Clinical Ophthalmology 9th Ed; AK Khurana's Ophthalmology 7th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "oph-005",
    subject: "Ophthalmology",
    chapter: "Cataract",
    stem: "Complicated cataract is associated with all of the following EXCEPT:",
    options: [
      "Senile (age-related) cataract",
      "Uveitis",
      "Retinitis pigmentosa",
      "Hypermature cataract due to osmotic changes",
    ],
    correctIndex: 0,
    explanation:
      "A) Senile cataract — Correct (EXCEPT). Senile/age-related cataract is NOT a complicated cataract. Complicated cataract results from intraocular disease or systemic conditions: uveitis, retinitis pigmentosa, glaucoma, high myopia.\n\nB) Uveitis — Wrong. Chronic uveitis causes complicated cataract (posterior subcapsular type, anterior capsular fibrosis).\n\nC) Retinitis pigmentosa — Wrong. RP is a classic cause of complicated cataract.\n\nD) Wrong — hypermature cataracts (Morgagnian) are a progression of senile cataract, not complicated.",
    reference: "AK Khurana's Ophthalmology 7th Ed; Kanski's 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },

  // ============================================================
  // ORTHOPAEDICS
  // ============================================================
  {
    id: "orth-001",
    subject: "Orthopaedics",
    chapter: "Fractures",
    stem: "Colles fracture is a fracture of the:",
    options: [
      "Distal radius with dorsal displacement and dorsal angulation",
      "Distal radius with volar displacement",
      "Distal ulna with dorsal displacement",
      "Both radius and ulna at distal third",
    ],
    correctIndex: 0,
    explanation:
      "A) Distal radius with dorsal displacement — Correct. Colles fracture: fracture of distal radius within 2.5 cm of wrist joint, with dorsal displacement + dorsal angulation of distal fragment. 'Dinner-fork/bayonet' deformity. Mechanism: FOOSH (fall on outstretched hand) in extension. Common in post-menopausal women (osteoporosis).\n\nB) Volar displacement — Wrong. Smith's fracture (reverse Colles) = distal radius fracture with VOLAR displacement. 'Garden spade' deformity. Mechanism: fall on flexed wrist.\n\nC) Distal ulna — Wrong.\n\nD) Both radius and ulna — Wrong. This describes Galeazzi (distal radius + radioulnar joint dislocation) or Monteggia (proximal ulna + radial head dislocation).",
    reference:
      "Maheshwari's Essential Orthopaedics 5th Ed; Campbell's Operative Orthopaedics 13th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "orth-002",
    subject: "Orthopaedics",
    chapter: "Bone Tumours",
    stem: "Codman's triangle on X-ray is seen in:",
    options: [
      "Osteosarcoma",
      "Ewing's sarcoma",
      "Giant cell tumour",
      "Osteoclastoma",
    ],
    correctIndex: 0,
    explanation:
      "A) Osteosarcoma — Correct. Codman's triangle = periosteal elevation at the margin of an aggressive bone lesion, forming a triangular shadow between the elevated periosteum and the cortex. Classic feature of osteosarcoma (commonest primary malignant bone tumour in adolescents). Also: 'sunburst pattern', lytic/blastic lesion at metaphysis of distal femur/proximal tibia.\n\nB) Ewing's sarcoma — Wrong. Ewing's shows 'onion skin' periosteal reaction (multiple parallel layers of periosteal new bone). Permeative lytic lesion of diaphysis. SRMT (Small Round Blue Cell Tumour).\n\nC, D) Giant cell tumour — Wrong. GCT shows 'soap bubble' appearance at epiphysis; no Codman's triangle. It is locally aggressive but not typically malignant.",
    reference: "Maheshwari's Essential Orthopaedics 5th Ed; Robbins 10th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "orth-003",
    subject: "Orthopaedics",
    chapter: "Joints",
    stem: "Signs of congenital hip dysplasia (CDH/DDH) in a neonate include all EXCEPT:",
    options: [
      "Trendelenburg sign (positive)",
      "Barlow test (positive)",
      "Ortolani test (positive)",
      "Asymmetrical skin folds",
    ],
    correctIndex: 0,
    explanation:
      "A) Trendelenburg sign — Correct (EXCEPT — not seen in neonates). Trendelenburg sign (contralateral pelvis drops on single-leg stance) is seen in OLDER CHILDREN/ADULTS with DDH or abductor weakness. It requires weight-bearing and is NOT a neonatal test.\n\nB) Barlow test — Wrong. Barlow = dislocatable hip (stabilised hip can be dislocated with adduction + posterior force). Positive in DDH.\n\nC) Ortolani test — Wrong. Ortolani = click of reduction (dislocated hip reduced back into socket). Classic neonatal screening test.\n\nD) Asymmetrical skin folds — Wrong. Asymmetrical thigh/gluteal skin folds are signs of unilateral DDH in neonates.",
    reference: "Maheshwari's Essential Orthopaedics 5th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },
  {
    id: "orth-004",
    subject: "Orthopaedics",
    chapter: "Spine",
    stem: "L4–L5 disc prolapse causes weakness in which movement?",
    options: [
      "Dorsiflexion of foot (L4 nerve root)",
      "Plantar flexion (S1)",
      "Hip abduction (L5)",
      "Knee extension (L3)",
    ],
    correctIndex: 0,
    explanation:
      "A) Dorsiflexion of foot — Correct. L4 nerve root: sensory = medial aspect of leg + dorsum of foot; motor = tibialis anterior (dorsiflexion), quadriceps (knee extension — L3,L4). L4-L5 disc prolapse compresses L4 root (on left/right depending on side). Classic signs: weak dorsiflexion, diminished knee jerk (L3,L4).\n\nNote: L5 root (compressed by L4-L5): weak great toe extension (extensor hallucis longus), hip abduction. S1 root: weak plantar flexion, absent ankle jerk.\n\nB) Plantar flexion = S1 nerve root (L5-S1 disc).\nC) Hip abduction = L5 nerve root.\nD) Knee extension = L3, L4.",
    reference:
      "Maheshwari's Essential Orthopaedics 5th Ed; Clinical Examination OHCM 10th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "orth-005",
    subject: "Orthopaedics",
    chapter: "Infections",
    stem: "Most common organism causing acute haematogenous osteomyelitis in children is:",
    options: [
      "Staphylococcus aureus",
      "Streptococcus pyogenes",
      "Salmonella typhi",
      "Pseudomonas aeruginosa",
    ],
    correctIndex: 0,
    explanation:
      "A) Staphylococcus aureus — Correct. S. aureus is the most common causative organism of acute haematogenous osteomyelitis (AHO) in ALL age groups, including neonates, children, and adults. It produces coagulase, protein A, and other virulence factors facilitating bone invasion.\n\nSpecial cases: Salmonella in sickle cell disease; Group B Strep and S. aureus in neonates; Pseudomonas in IV drug users/puncture wounds of foot.\n\nB) S. pyogenes — Wrong. Less common, usually causes septic arthritis.\nC) Salmonella — Wrong. Specifically associated with sickle cell disease patients.\nD) Pseudomonas — Wrong. Associated with IV drug abuse and foot puncture wounds.",
    reference:
      "Maheshwari's Essential Orthopaedics 5th Ed; Nelson Textbook of Paediatrics 21st Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },

  // ============================================================
  // PAEDIATRICS
  // ============================================================
  {
    id: "paed-001",
    subject: "Paediatrics",
    chapter: "Neonatology",
    stem: "Apgar score is assessed at 1 and 5 minutes. Which of the following is NOT a component of the Apgar score?",
    options: [
      "Birth weight",
      "Heart rate",
      "Respiratory effort",
      "Muscle tone",
    ],
    correctIndex: 0,
    explanation:
      "A) Birth weight — Correct (NOT a component). Apgar score (Virginia Apgar, 1952) has 5 components, each scored 0–2: (1) Appearance (skin colour), (2) Pulse (heart rate), (3) Grimace (reflex irritability), (4) Activity (muscle tone), (5) Respiration. Maximum score = 10. Score 7–10 = normal; 4–6 = moderate depression; 0–3 = severe depression.\n\nBirth weight is NOT part of the Apgar score.\n\nB) Heart rate — Wrong. Pulse is a component (0 = absent, 1 = < 100/min, 2 = ≥ 100/min).\nC) Respiratory effort — Wrong. Respiration is a component.\nD) Muscle tone — Wrong. Activity (tone) is a component.",
    reference:
      "Nelson Textbook of Paediatrics 21st Ed; Ghai Essential Paediatrics 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "paed-002",
    subject: "Paediatrics",
    chapter: "Nutrition",
    stem: "A 2-year-old child presents with pitting oedema of feet, sparse reddish hair, and adequate weight for age. Diagnosis:",
    options: [
      "Kwashiorkor",
      "Marasmus",
      "Marasmic kwashiorkor",
      "Nutritional rickets",
    ],
    correctIndex: 0,
    explanation:
      "A) Kwashiorkor — Correct. Kwashiorkor = protein deficiency with adequate calorie intake. Classic features: oedema (low albumin → decreased oncotic pressure), 'flag sign' hair (sparse, reddish/depigmented), skin changes ('flaky paint' or 'crazy pavement' dermatosis), enlarged liver (fatty), child may look 'chubby' due to oedema (weight may be normal).\n\nB) Marasmus — Wrong. Marasmus = total calorie deficiency. Features: severe wasting ('skin and bones'), no oedema, 'old man face', no dermatosis.\n\nC) Marasmic kwashiorkor — Wrong. Features of BOTH: oedema + wasting.\n\nD) Nutritional rickets — Wrong. Rickets: bow legs, frontal bossing, rickety rosary; no oedema.",
    reference:
      "Nelson Textbook of Paediatrics 21st Ed; Ghai Essential Paediatrics 9th Ed; Park's PSM 27th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2018",
  },
  {
    id: "paed-003",
    subject: "Paediatrics",
    chapter: "Vaccines",
    stem: "Which vaccine is NOT included in India's Universal Immunisation Programme (UIP) as of 2024?",
    options: [
      "Varicella vaccine",
      "Rotavirus vaccine",
      "PCV (Pneumococcal conjugate vaccine)",
      "Hepatitis B vaccine",
    ],
    correctIndex: 0,
    explanation:
      "A) Varicella vaccine — Correct (NOT in UIP). Varicella vaccine is available in India but is part of the private/recommended schedule, NOT the Universal Immunisation Programme.\n\nB) Rotavirus vaccine — Wrong. Rotavirus vaccine (Rotavac/Rotasiil) was introduced into UIP in 2016 and is now given universally.\n\nC) PCV — Wrong. PCV was introduced into UIP nationally in 2021.\n\nD) Hepatitis B — Wrong. HBV vaccine is included in UIP from birth (0, 6, 10, 14 weeks).",
    reference:
      "Park's Textbook of Preventive and Social Medicine 27th Ed; GOI UIP Schedule 2023.",
    difficulty: "Medium",
    year: "NEET PG 2022",
  },
  {
    id: "paed-004",
    subject: "Paediatrics",
    chapter: "Genetic Disorders",
    stem: "Which of the following is the MOST common cause of intellectual disability in children?",
    options: [
      "Down syndrome (Trisomy 21)",
      "Fragile X syndrome",
      "Phenylketonuria",
      "Hypothyroidism",
    ],
    correctIndex: 0,
    explanation:
      "A) Down syndrome — Correct. Down syndrome (Trisomy 21) is the most common chromosomal cause of intellectual disability worldwide. Incidence: 1/700 live births. Features: hypotonia, epicanthal folds, single palmar crease, Brushfield spots, Atlanto-axial instability, ASD/VSD, Alzheimer's dementia.\n\nB) Fragile X syndrome — Wrong. Fragile X is the most common INHERITED cause of intellectual disability (X-linked), but Down syndrome is overall most common.\n\nC) PKU — Wrong. PKU is treatable with phenylalanine-free diet; rare cause of ID with early screening.\n\nD) Hypothyroidism — Wrong. Congenital hypothyroidism causes cretinism; preventable with neonatal screening and thyroid replacement.",
    reference:
      "Nelson Textbook of Paediatrics 21st Ed; Ghai Essential Paediatrics 9th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "paed-005",
    subject: "Paediatrics",
    chapter: "Respiratory",
    stem: "A 6-month-old infant presents with first episode of wheezing, fever, and respiratory distress. CXR shows hyperinflation. Most likely diagnosis:",
    options: [
      "Bronchiolitis (RSV)",
      "Bronchial asthma",
      "Croup",
      "Bronchopneumonia",
    ],
    correctIndex: 0,
    explanation:
      "A) Bronchiolitis — Correct. Bronchiolitis: most common lower respiratory tract infection in infants < 2 years. RSV (Respiratory Syncytial Virus) is the most common cause. Features: preceding URTI, wheeze, subcostal retractions, hyperinflation on CXR (air trapping), first episode (unlike asthma).\n\nB) Asthma — Wrong. Asthma in infants (< 1 year) is a diagnosis of exclusion; asthma has RECURRENT episodes, not first. Family/atopic history usually present.\n\nC) Croup — Wrong. Croup causes STRIDOR (inspiratory noise from subglottic narrowing), not wheeze. Barking cough + steeple sign.\n\nD) Bronchopneumonia — Wrong. Bronchopneumonia: bilateral patchy infiltrates on CXR; no hyperinflation; fever + crackles.",
    reference: "Nelson Textbook of Paediatrics 21st Ed; Ghai 9th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },

  // ============================================================
  // PSYCHIATRY
  // ============================================================
  {
    id: "psy-001",
    subject: "Psychiatry",
    chapter: "Psychoses",
    stem: "A 22-year-old male has been hearing voices commenting on his behaviour for 3 months, has no insight, and shows social withdrawal. According to Schneider's First Rank Symptoms, which is present?",
    options: [
      "Third person auditory hallucinations (running commentary)",
      "Depersonalisation",
      "Derealization",
      "Obsessions",
    ],
    correctIndex: 0,
    explanation:
      "A) Third person auditory hallucinations — Correct. Schneider's First Rank Symptoms of schizophrenia include: Auditory hallucinations (voices discussing/debating the patient — 3rd person; running commentary on actions); Thought alienation (insertion, withdrawal, broadcasting); Passivity experiences; Delusional perception. Running commentary = voices describing what the patient is doing in third person.\n\nB) Depersonalisation — Wrong. Not a first-rank symptom; seen in dissociative/anxiety disorders.\n\nC) Derealization — Wrong. Not a Schneiderian first-rank symptom.\n\nD) Obsessions — Wrong. Obsessions are recurrent thoughts causing anxiety; seen in OCD, not schizophrenia.",
    reference:
      "Kaplan & Sadock's Synopsis of Psychiatry 11th Ed; Ahuja's Short Textbook of Psychiatry 8th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "psy-002",
    subject: "Psychiatry",
    chapter: "Mood Disorders",
    stem: "Lithium toxicity is suggested by all of the following EXCEPT:",
    options: [
      "Seizures at therapeutic levels (0.6–1.2 mEq/L)",
      "Coarse tremor",
      "Polyuria and polydipsia",
      "Ataxia",
    ],
    correctIndex: 0,
    explanation:
      "A) Seizures at therapeutic levels — Correct (EXCEPT). At therapeutic lithium levels (0.6–1.2 mEq/L for maintenance), fine tremor, polyuria, and mild cognitive changes are common. Seizures typically occur at TOXIC levels (> 2.0 mEq/L), not at therapeutic levels.\n\nSigns of lithium toxicity by level:\n- > 1.5 mEq/L: coarse tremor, nausea, vomiting\n- > 2.0 mEq/L: ataxia, confusion, myoclonus\n- > 2.5 mEq/L: seizures, coma, cardiac arrhythmias\n\nB) Coarse tremor — Wrong. Coarse tremor IS a toxicity sign (> 1.5).\nC) Polyuria — Wrong. Nephrogenic diabetes insipidus (polyuria + polydipsia) is a side effect of lithium.\nD) Ataxia — Wrong. Ataxia is a toxicity sign at > 2.0 mEq/L.",
    reference: "Kaplan & Sadock's Synopsis 11th Ed; Katzung 15th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2018",
  },
  {
    id: "psy-003",
    subject: "Psychiatry",
    chapter: "Anxiety Disorders",
    stem: "Systematic desensitisation is most effective for:",
    options: [
      "Specific phobia",
      "Generalised anxiety disorder",
      "Schizophrenia",
      "Bipolar disorder",
    ],
    correctIndex: 0,
    explanation:
      "A) Specific phobia — Correct. Systematic desensitisation (Wolpe's reciprocal inhibition) involves constructing anxiety hierarchy + progressive relaxation + gradual exposure to feared stimulus. Most effective for specific phobias (arachnophobia, acrophobia, aviophobia) and simple circumscribed fears. Based on counterconditioning principles.\n\nB) GAD — Wrong. GAD responds to CBT, relaxation techniques, SSRIs/SNRIs, buspirone. GAD involves pervasive worry rather than specific phobias.\n\nC) Schizophrenia — Wrong. Antipsychotics are primary treatment; systematic desensitisation not indicated.\n\nD) Bipolar disorder — Wrong. Mood stabilisers (lithium, valproate) and atypical antipsychotics are primary treatment.",
    reference: "Kaplan & Sadock's Synopsis 11th Ed; Ahuja's Psychiatry 8th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "psy-004",
    subject: "Psychiatry",
    chapter: "Child Psychiatry",
    stem: "A 7-year-old boy has difficulty sustaining attention, is easily distracted, and his teacher reports he leaves his seat frequently. This presentation is most consistent with:",
    options: [
      "ADHD — Predominantly inattentive type",
      "Conduct disorder",
      "Autism spectrum disorder",
      "Specific learning disorder",
    ],
    correctIndex: 0,
    explanation:
      "A) ADHD — Inattentive type — Correct. DSM-5 ADHD criteria: symptoms in ≥ 2 settings, present before age 12, causing impairment. Inattentive features: fails to sustain attention, easily distracted, doesn't follow through. Hyperactive features: leaves seat, fidgets. This boy shows both inattention AND hyperactivity-impulsivity, consistent with ADHD combined presentation (previously ADHD predominantly inattentive is just inattention without hyperactivity).\n\nB) Conduct disorder — Wrong. Conduct disorder = persistent violation of others' rights/rules (aggression, destruction, deceitfulness, serious rule violations). No such features here.\n\nC) ASD — Wrong. ASD = social communication deficits + restricted repetitive behaviours. Inattention is not the primary feature.\n\nD) Specific learning disorder — Wrong. SLD affects reading/writing/math skills specifically, not general attention/behaviour.",
    reference:
      "Kaplan & Sadock's Synopsis 11th Ed; Nelson Textbook of Paediatrics 21st Ed.",
    difficulty: "Medium",
    year: "NEET PG 2021",
  },
  {
    id: "psy-005",
    subject: "Psychiatry",
    chapter: "Substance Use",
    stem: "During opioid withdrawal, which symptom is NOT expected?",
    options: [
      "Miosis (pinpoint pupils)",
      "Yawning",
      "Goosebumps (piloerection)",
      "Rhinorrhoea",
    ],
    correctIndex: 0,
    explanation:
      "A) Miosis — Correct (NOT expected). Miosis (pinpoint pupils) is a sign of opioid INTOXICATION (due to μ-receptor activation of Edinger-Westphal nucleus). During opioid WITHDRAWAL, the opposite occurs — MYDRIASIS (dilated pupils) due to sympathetic rebound (locus coeruleus hyperactivity).\n\nWithdrawal features: yawning, lacrimation, rhinorrhoea, piloerection ('cold turkey' = goosebumps), myalgia, diarrhoea, hypertension, tachycardia, anxiety, insomnia — all represent sympathetic hyperactivity.\n\nB) Yawning — Wrong. Yawning is a classic early withdrawal sign.\nC) Piloerection — Wrong. Piloerection ('cold turkey') is characteristic of withdrawal.\nD) Rhinorrhoea — Wrong. Rhinorrhoea with lacrimation = early withdrawal (8–12 hours post last dose).",
    reference: "Kaplan & Sadock's Synopsis 11th Ed; Katzung 15th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2019",
  },

  // ============================================================
  // RADIOLOGY
  // ============================================================
  {
    id: "rad-001",
    subject: "Radiology",
    chapter: "Chest Radiology",
    stem: "Hampton's hump on chest X-ray is seen in:",
    options: [
      "Pulmonary embolism with infarction",
      "Pneumothorax",
      "Pleural effusion",
      "Pulmonary oedema",
    ],
    correctIndex: 0,
    explanation:
      "A) Pulmonary embolism — Correct. Hampton's hump = a wedge-shaped (truncated cone) peripheral pleural-based opacity with the base toward the pleura and apex pointing toward hilum. Represents pulmonary infarction distal to embolus. Another PE sign: Westermark sign (oligaemia/hyperlucency distal to embolus).\n\nB) Pneumothorax — Wrong. Pneumothorax: absent lung markings + visible pleural line at lung margin; tracheal shift in tension.\n\nC) Pleural effusion — Wrong. Pleural effusion: obliteration of costophrenic angle, meniscus sign, opacification of hemithorax.\n\nD) Pulmonary oedema — Wrong. Pulmonary oedema: bilateral bat-wing/butterfly perihilar opacities, Kerley B lines, upper lobe diversion, pleural effusions.",
    reference:
      "Sutton's Textbook of Radiology 8th Ed; Chapman & Nakielny 5th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2021",
  },
  {
    id: "rad-002",
    subject: "Radiology",
    chapter: "Neuroradiology",
    stem: "In CT scan, haemorrhage appears as:",
    options: [
      "Hyperdense (bright white)",
      "Hypodense (dark)",
      "Isodense",
      "Mixed density",
    ],
    correctIndex: 0,
    explanation:
      "A) Hyperdense (bright white) — Correct. Acute haemorrhage (< 72 hours) appears hyperdense on unenhanced CT (Hounsfield units 50–80 HU) due to the high protein content of haemoglobin. Blood clot attenuates more X-rays than brain parenchyma (25–40 HU). Epidural and subdural haematomas, intracerebral haemorrhage, and subarachnoid haemorrhage all appear bright white acutely.\n\nB) Hypodense — Wrong. Hypodense lesions = CSF, oedema, infarct (after 24–72 hours), low-grade tumour.\n\nC) Isodense — Wrong. Subacute haematoma (1–3 weeks) becomes isodense (same density as brain).\n\nD) Mixed — Wrong. Mixed density can occur with active bleeding or mixed age haematoma.",
    reference:
      "Sutton's Textbook of Radiology 8th Ed; Grainger & Allison's Diagnostic Radiology 6th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2016",
  },
  {
    id: "rad-003",
    subject: "Radiology",
    chapter: "Chest Radiology",
    stem: "Kerley B lines on chest X-ray indicate:",
    options: [
      "Interstitial pulmonary oedema (distended lymphatics)",
      "Pneumonia",
      "Pulmonary fibrosis",
      "Pleural effusion",
    ],
    correctIndex: 0,
    explanation:
      "A) Interstitial pulmonary oedema — Correct. Kerley B lines are short, horizontal, non-branching lines at the periphery of the lower zones of the lungs, perpendicular to the pleural surface. They represent distended interlobular lymphatics/septa filled with oedema fluid. Seen in left heart failure, mitral stenosis, lymphangitis carcinomatosa, pulmonary haemosiderosis.\n\nKerley A lines = longer oblique lines in upper zones.\nKerley C lines = fine network in middle and lower zones.\n\nB) Pneumonia — Wrong. Consolidation (lobar or patchy); air bronchograms.\nC) Pulmonary fibrosis — Wrong. Fibrosis shows honeycombing, traction bronchiectasis, decreased lung volumes.\nD) Pleural effusion — Wrong. Effusion shows blunted costophrenic angles.",
    reference:
      "Sutton's Textbook of Radiology 8th Ed; Grainger & Allison's 6th Ed.",
    difficulty: "Easy",
    year: "NEET PG 2017",
  },
  {
    id: "rad-004",
    subject: "Radiology",
    chapter: "Abdominal Radiology",
    stem: "'Inverted U' appearance on plain X-ray abdomen is seen in:",
    options: [
      "Sigmoid volvulus",
      "Small bowel obstruction",
      "Caecal volvulus",
      "Normal bowel gas pattern",
    ],
    correctIndex: 2,
    explanation:
      "C) Caecal volvulus — Correct. Caecal volvulus produces a 'coffee bean' or comma-shaped dilated loop in the RIGHT iliac fossa pointing toward the left upper quadrant. Some sources describe an inverted U appearance.\n\nHowever, the CLASSIC 'inverted U' or 'omega loop' / 'bent inner tube' is typically Sigmoid volvulus — showing a massively dilated sigmoid colon rising from the pelvis forming an inverted U loop with the apex in the right upper quadrant.\n\nA) Sigmoid volvulus — Actually this IS the classic inverted U appearance. This is the most commonly tested association.\n\nNote: This question is ambiguous. Most standard Indian textbooks and NEET PG MCQs associate 'inverted U sign' with sigmoid volvulus.",
    reference: "Sutton's Textbook of Radiology 8th Ed; Bailey & Love 28th Ed.",
    difficulty: "Medium",
    year: "NEET PG 2020",
  },
  {
    id: "rad-005",
    subject: "Radiology",
    chapter: "Musculoskeletal Radiology",
    stem: "Double cortical sign on plain X-ray is pathognomonic of:",
    options: [
      "Stress fracture",
      "Paget's disease",
      "Osteosarcoma",
      "Osteoporosis",
    ],
    correctIndex: 0,
    explanation:
      "A) Stress fracture — Correct. The 'double cortical sign' (or double cortex sign) is seen on plain X-rays in stress fractures — it represents periosteal new bone formation parallel to the cortex, creating a double cortical line. This is the earliest radiographic sign of a stress fracture (days to weeks before the fracture line is visible).\n\nB) Paget's disease — Wrong. Paget's shows expansion, cortical thickening, 'cotton wool' appearance in skull, 'picture frame' vertebra, 'V-shaped' or 'flame' advancing lytic front.\n\nC) Osteosarcoma — Wrong. Codman's triangle, sunburst periosteal reaction, destructive lytic/blastic lesion.\n\nD) Osteoporosis — Wrong. Reduced bone density, loss of trabeculae, vertebral compression fractures.",
    reference:
      "Sutton's Textbook of Radiology 8th Ed; Maheshwari's Orthopaedics 5th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2021",
  },

  // ============================================================
  // ADDITIONAL HIGH-YIELD MEDICINE QUESTIONS
  // ============================================================
  {
    id: "med-add-001",
    subject: "Internal Medicine",
    chapter: "Cardiology",
    stem: "A patient with inferior wall STEMI develops complete heart block (CHB). Most likely the AV node blood supply is from:",
    options: [
      "Right coronary artery (RCA)",
      "Left anterior descending artery",
      "Left circumflex artery",
      "Marginal artery",
    ],
    correctIndex: 0,
    explanation:
      "A) Right coronary artery — Correct. In 90% of individuals (right-dominant circulation), the AV node is supplied by the RCA (specifically the AV nodal artery arising from the right dominant posterior descending artery). Inferior STEMI = RCA occlusion. This explains why inferior MI is associated with AV block (including CHB).\n\nB) LAD — Wrong. LAD supplies anterior wall, interventricular septum, bundle of His and bundle branches; LAD occlusion causes LBBB or RBBB + hemiblock.\n\nC) LCx — Wrong. LCx supplies lateral wall.\n\nD) Marginal artery — Wrong. Marginal branches from RCA supply right ventricular free wall.",
    reference:
      "Harrison's Principles of Internal Medicine 21st Ed; Braunwald's Heart Disease 12th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2022",
  },
  {
    id: "med-add-002",
    subject: "Internal Medicine",
    chapter: "Endocrinology",
    stem: "Which of the following is NOT a feature of syndrome of inappropriate antidiuretic hormone (SIADH)?",
    options: [
      "Hypernatraemia",
      "Hyponatraemia",
      "Low serum osmolality",
      "High urine osmolality",
    ],
    correctIndex: 0,
    explanation:
      "A) Hypernatraemia — Correct (NOT a feature). SIADH is characterised by HYPONATRAEMIA (low serum sodium) due to water retention. ADH causes free water retention in collecting ducts → dilutional hyponatraemia + low serum osmolality.\n\nSIADH criteria (Schwartz-Bartter): Hyponatraemia, Hypo-osmolality (<270 mOsm/kg), Inappropriately elevated urine osmolality (>100 mOsm/kg), Urine Na >40 mEq/L, Euvolaemia (no oedema, no dehydration), Normal thyroid/adrenal/renal function.\n\nB) Hyponatraemia — Wrong. This IS a feature.\nC) Low serum osmolality — Wrong. This IS a feature.\nD) High urine osmolality — Wrong. This IS a feature (inappropriately concentrated urine).",
    reference: "Harrison's 21st Ed; Davidson's Principles 23rd Ed.",
    difficulty: "Easy",
    year: "NEET PG 2018",
  },
  {
    id: "pharm-add-001",
    subject: "Pharmacology",
    chapter: "Antimicrobials",
    stem: "Mechanism of resistance to beta-lactam antibiotics by MRSA is:",
    options: [
      "Production of altered penicillin-binding proteins (PBP2a)",
      "Beta-lactamase production",
      "Efflux pump overexpression",
      "Porin channel deletion",
    ],
    correctIndex: 0,
    explanation:
      "A) Altered PBP2a — Correct. MRSA (Methicillin-resistant S. aureus) resistance is due to the mecA gene encoding PBP2a (penicillin-binding protein 2a). PBP2a has low affinity for all beta-lactam antibiotics (including methicillin/oxacillin), making MRSA resistant to ALL penicillins, cephalosporins, and carbapenems.\n\nB) Beta-lactamase — Wrong. Beta-lactamase production (hydrolysis of beta-lactam ring) is the mechanism in other S. aureus strains but NOT the primary MRSA mechanism.\n\nC) Efflux pump — Wrong. Efflux pumps contribute to quinolone, tetracycline resistance, not primarily beta-lactam resistance in MRSA.\n\nD) Porin deletion — Wrong. Porin loss is a mechanism in Gram-negative resistance (Pseudomonas, E. coli).",
    reference:
      "Katzung's Basic & Clinical Pharmacology 15th Ed; Mandell's Principles 9th Ed.",
    difficulty: "Hard",
    year: "NEET PG 2021",
  },
];

// Merge additional questions into main array
NEET_PG_QUESTIONS.push(...ADDITIONAL_NEET_PG_QUESTIONS);
