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
