// Disease Database: Biochemistry + Pathology (Batch 2)
// Source: Harper's Biochemistry 31st Ed, Robbins Basic Pathology 10th Ed, ICMR Guidelines
// Conforms to DiseaseEntry type from disease-db-anatomy-physiology.ts

import type { DiseaseEntry } from "./disease-db-anatomy-physiology";

export const biochemistryDiseases: DiseaseEntry[] = [
  {
    name: "Phenylketonuria (PKU)",
    subject: "Biochemistry",
    icd10: "E70.1",
    category: "Amino Acid Metabolism",
    definition:
      "Autosomal recessive disorder of phenylalanine metabolism due to deficiency of phenylalanine hydroxylase (PAH), leading to accumulation of phenylalanine and neurotoxic metabolites.",
    etiology:
      "Mutation in PAH gene (chromosome 12q23.2). Phenylalanine cannot be converted to tyrosine. Phenylpyruvate, phenylacetate, phenyllactate accumulate causing brain toxicity.",
    pathophysiology:
      "Phenylalanine accumulates → competes with large neutral amino acids at blood-brain barrier → impairs brain myelination → intellectual disability. Phenylacetate → musty odor.",
    clinicalFeatures: [
      "Fair skin, blue eyes, blonde hair (reduced melanin synthesis)",
      "Musty/mousy body odor (phenylacetate in sweat)",
      "Progressive intellectual disability if untreated",
      "Seizures, hyperactivity, behavioral problems",
      "Eczema in 30% cases",
      "Microcephaly",
      "Normal at birth (maternal phenylalanine cleared via placenta)",
    ],
    investigations: [
      "Guthrie test (bacterial inhibition assay) – newborn screening day 3-5",
      "Serum phenylalanine >20 mg/dL (normal <2 mg/dL)",
      "Urine ferric chloride test – green color",
      "Serum phenylalanine:tyrosine ratio >3",
      "BH4 loading test to rule out BH4-responsive PKU",
      "MRI brain: white matter abnormalities",
    ],
    treatment:
      "Low phenylalanine diet (start within 3 weeks of birth). Phenylalanine-free amino acid formula. Sapropterin (Kuvan) 10-20 mg/kg/day for BH4-responsive cases. Regular monitoring: target phenylalanine 2-6 mg/dL. Maternal PKU: strict diet control throughout pregnancy.",
    complications: [
      "Intellectual disability (IQ <50 if untreated)",
      "Maternal PKU (fetal cardiac defects, microcephaly)",
      "White matter disease",
    ],
    differentiatingFeature:
      "Musty/mousy odor + fair complexion in dark-skinned family + positive Guthrie test = PKU until proven otherwise. Tyrosine becomes essential amino acid in PKU.",
    pearlPoints: [
      "Guthrie test done on day 3-5 of life (not at birth)",
      "Tyrosine becomes essential amino acid in PKU",
      "BH4 deficiency causes PKU + neurological features despite diet",
      "Maternal PKU: high phenylalanine in mother → fetal cardiac defects",
      "PKU = most common aminoacidopathy in India",
    ],
    icmrProtocol:
      "Newborn screening mandatory per ICMR 2023. Diet therapy within 3 weeks of birth for normal intellectual development.",
    indianBrandDrugs: [
      "Sapropterin (Kuvan)",
      "Phenylalanine-free amino acid formula",
    ],
  },
  {
    name: "Homocystinuria",
    subject: "Biochemistry",
    icd10: "E72.1",
    category: "Amino Acid Metabolism",
    definition:
      "Autosomal recessive disorder of methionine metabolism due to deficiency of cystathionine beta-synthase (CBS), causing accumulation of homocysteine.",
    etiology:
      "CBS deficiency → homocysteine cannot be converted to cystathionine → homocysteine accumulates → damages endothelium and connective tissue.",
    pathophysiology:
      "Homocysteine damages endothelium → premature atherosclerosis + thrombosis. Cross-links fibrillin → connective tissue weakness (Marfanoid features). Inhibits lysyl oxidase → collagen/elastin defects.",
    clinicalFeatures: [
      "Marfanoid habitus (tall, long limbs, arachnodactyly)",
      "Downward lens dislocation (ectopia lentis) – differentiates from Marfan (upward)",
      "Intellectual disability",
      "Osteoporosis, scoliosis",
      "Premature vascular disease, thromboembolic events",
      "Malar flush",
    ],
    investigations: [
      "Urine cyanide-nitroprusside test – positive (red-purple)",
      "Plasma homocysteine elevated (>100 μmol/L)",
      "Serum methionine elevated",
      "Urine amino acid chromatography",
      "Pyridoxine loading test (50% respond to B6)",
    ],
    treatment:
      "Pyridoxine (Vitamin B6) 100-500 mg/day for B6-responsive cases. Low methionine diet. Betaine (Cystadane) 3-6g twice daily for remethylation. Folate + B12 supplementation. Aspirin 75-100 mg/day for thromboprophylaxis.",
    complications: [
      "Premature MI/stroke",
      "Pulmonary embolism",
      "Retinal detachment",
    ],
    differentiatingFeature:
      "Downward lens dislocation + Marfanoid + intellectual disability + thrombosis = Homocystinuria. (Marfan: upward dislocation + normal intelligence + no thrombosis)",
    pearlPoints: [
      "Lens dislocation: DOWN in Homocystinuria, UP in Marfan syndrome",
      "50% cases are B6 (pyridoxine) responsive",
      "Homocysteine is independent risk factor for atherosclerosis",
      "Cyanide-nitroprusside test also positive in cystinuria",
      "Most common AR disorder with Marfanoid habitus after Marfan itself",
    ],
    icmrProtocol:
      "Pyridoxine trial recommended first in all CBS deficiency cases (50% are B6-responsive).",
    indianBrandDrugs: [
      "Pyridoxine (B-Long, Pyrigesic)",
      "Folate (Folvite 5mg)",
      "Betaine (Cystadane)",
      "Aspirin (Ecosprin 75mg)",
    ],
  },
  {
    name: "Galactosemia",
    subject: "Biochemistry",
    icd10: "E74.2",
    category: "Carbohydrate Metabolism",
    definition:
      "Autosomal recessive disorder of galactose metabolism due to deficiency of galactose-1-phosphate uridyltransferase (GALT), causing galactose-1-phosphate accumulation in liver, brain, and kidney.",
    etiology:
      "GALT deficiency → galactose-1-phosphate accumulates. Galactitol (via aldose reductase) → osmotic cataracts. Liver toxicity → jaundice, cirrhosis.",
    pathophysiology:
      "Galactose-1-phosphate inhibits phosphoglucomutase → energy failure. Galactitol accumulates in lens → osmotic cataracts. Liver toxicity → jaundice. Impaired neutrophil function → E.coli sepsis.",
    clinicalFeatures: [
      "Jaundice and hepatomegaly in neonates after milk feeding",
      "Bilateral cataracts",
      "Intellectual disability",
      "E. coli sepsis in neonates (impaired neutrophil function)",
      "Vomiting, diarrhea after milk",
      "Hypoglycemia",
    ],
    investigations: [
      "Reducing substances in urine (Clinitest positive, Clinistix negative)",
      "Enzyme assay: GALT activity in RBC",
      "Urine galactose chromatography",
      "Newborn screening: fluorescent spot test",
      "LFT: elevated bilirubin, transaminases",
    ],
    treatment:
      "Immediate lactose-free diet (soy formula). Calcium and Vitamin D supplementation. Regular ophthalmologic follow-up. Dietary restriction lifelong. Cognitive support and special education.",
    complications: [
      "Cirrhosis",
      "Premature ovarian failure (females)",
      "Speech/learning difficulties despite treatment",
    ],
    differentiatingFeature:
      "Jaundice + cataracts + E.coli sepsis in neonate after milk feeding = Classic Galactosemia. Clinistix NEGATIVE (galactose not detected by glucose oxidase method).",
    pearlPoints: [
      "Galactose NOT detected by Clinistix (glucose oxidase specific)",
      "Cataract is due to galactitol accumulation in lens",
      "E.coli neonatal sepsis → think galactosemia",
      "Ovarian failure occurs despite treatment in girls",
      "GALT on chromosome 9p13",
    ],
    icmrProtocol:
      "Immediate soy-based lactose-free formula. Newborn screening at day 3-5.",
    indianBrandDrugs: [
      "Nan Soy (soy formula)",
      "Calcirol sachets (Calcium + D3)",
    ],
  },
  {
    name: "Von Gierke Disease (GSD Type I)",
    subject: "Biochemistry",
    icd10: "E74.01",
    category: "Glycogen Storage Disease",
    definition:
      "GSD Type Ia: Deficiency of glucose-6-phosphatase in liver and kidney leading to inability to release free glucose from glycogen, causing fasting hypoglycemia and multi-system complications.",
    etiology:
      "Mutation in G6PC gene → glucose-6-phosphate cannot be hydrolyzed → glycogen and fat accumulate in liver, kidney, intestine.",
    pathophysiology:
      "No free glucose release → severe fasting hypoglycemia. G6P shunted to glycolysis → lactic acidosis. G6P to pentose pathway → uric acid. Excess G6P to fat synthesis → hyperlipidemia.",
    clinicalFeatures: [
      "Doll-like face (fat cheeks, cherubic appearance)",
      "Massive hepatomegaly (no splenomegaly in early stage)",
      "Fasting hypoglycemia with seizures",
      "Lactic acidosis",
      "Hyperuricemia → gout",
      "Hyperlipidemia → xanthomas",
      "Short stature, growth retardation",
    ],
    investigations: [
      "Blood glucose: severe hypoglycemia on fasting",
      "Blood lactate: elevated",
      "Serum uric acid: elevated",
      "Serum triglycerides: elevated",
      "Glucagon test: no rise in blood glucose",
      "Liver biopsy: glycogen + fat accumulation",
      "Enzyme assay: G6Pase activity in liver",
    ],
    treatment:
      "Frequent feeds (every 2-3 hours). Uncooked cornstarch 1.75-2.5 g/kg every 4-6 hours. Continuous overnight nasogastric glucose infusion in infants. Allopurinol 100-300 mg/day for hyperuricemia. Fenofibrate for hyperlipidemia. Liver transplant for severe cases.",
    complications: [
      "Hepatocellular adenoma (may malignize to HCC)",
      "CKD",
      "Gout",
      "Pulmonary hypertension",
    ],
    differentiatingFeature:
      "Doll-like face + massive hepatomegaly (no spleen) + fasting hypoglycemia + lactic acidosis + no glucagon response = Von Gierke disease (GSD Type I)",
    pearlPoints: [
      "Von Gierke = most common glycogen storage disease (Type I)",
      "No glucagon response: cannot mobilize glucose (no G6Pase)",
      "Cornstarch releases glucose slowly: preferred long-term treatment",
      "Hepatocellular adenoma risk → annual ultrasound surveillance",
      "Both liver AND kidney are enlarged (unlike other GSDs)",
    ],
    indianBrandDrugs: [
      "Allopurinol (Zyloric 100mg)",
      "Fenofibrate (Tricor 145mg)",
      "Cornstarch (Weikfield)",
    ],
  },
  {
    name: "Maple Syrup Urine Disease (MSUD)",
    subject: "Biochemistry",
    icd10: "E71.0",
    category: "Amino Acid Metabolism",
    definition:
      "Autosomal recessive disorder of branched-chain amino acid catabolism due to deficiency of branched-chain alpha-keto acid dehydrogenase (BCKAD) complex, causing leucine, isoleucine, valine accumulation.",
    etiology:
      "BCKAD deficiency → leucine, isoleucine, valine and their keto-acids accumulate → neurotoxicity (leucine is most toxic).",
    pathophysiology:
      "Leucine excess → inhibits glutamate dehydrogenase → hypoglycemia. Alloisoleucine (pathognomonic) accumulates. Cerebral edema → encephalopathy.",
    clinicalFeatures: [
      "Sweet/maple syrup odor in urine and cerumen (earwax)",
      "Normal at birth; deterioration by day 3-5",
      "Poor feeding, vomiting",
      "Lethargy → coma",
      "Alternating hypotonia and hypertonia",
      "Seizures",
      "Cerebral edema",
    ],
    investigations: [
      "Plasma amino acids: leucine, isoleucine, valine elevated",
      "Alloisoleucine in plasma (pathognomonic)",
      "Urine DNPH test (2,4-dinitrophenylhydrazine) – yellow precipitate",
      "Newborn screening (tandem mass spectrometry)",
      "MRI brain: cerebral edema, myelination defects",
    ],
    treatment:
      "Emergency: dialysis/peritoneal dialysis to rapidly lower leucine. BCAA-free formula + careful reintroduction of Ile/Val. Thiamine (B1) 10-300 mg/day for thiamine-responsive variant. Liver transplant (corrects enzyme defect). Target leucine: 100-300 μmol/L.",
    complications: [
      "Neurological damage",
      "Intellectual disability",
      "Cerebral edema (acute crisis = life-threatening)",
    ],
    differentiatingFeature:
      "Sweet/maple syrup odor in urine + neurological deterioration day 3-5 of life = MSUD. ALLOISOLEUCINE in plasma is PATHOGNOMONIC.",
    pearlPoints: [
      "Leucine is most neurotoxic BCAA in MSUD",
      "Alloisoleucine = pathognomonic for MSUD (not present normally)",
      "DNPH test: yellow precipitate with keto-acids",
      "Liver transplant corrects BCKAD deficiency",
      "Thiamine-responsive MSUD: 10-20% cases respond to B1",
    ],
    indianBrandDrugs: [
      "Thiamine (Benfotiamine, Neurobion forte)",
      "BCAA-free formula (Milupa MSUD 1/2)",
    ],
  },
  {
    name: "Alkaptonuria (Ochronosis)",
    subject: "Biochemistry",
    icd10: "E70.2",
    category: "Amino Acid Metabolism",
    definition:
      "Autosomal recessive disorder of tyrosine catabolism due to deficiency of homogentisate-1,2-dioxygenase, leading to homogentisic acid accumulation and ochronosis.",
    etiology:
      "Deficiency of homogentisate oxidase → homogentisic acid (HGA) cannot be oxidized → accumulates in connective tissue → ochronosis (bluish-black pigmentation).",
    pathophysiology:
      "HGA polymerizes → binds collagen in cartilage, tendons → dark pigmentation (ochronosis). HGA in urine darkens on standing/alkali exposure.",
    clinicalFeatures: [
      "Urine darkens on standing (diagnostic, NOT at voiding)",
      "Ochronosis: bluish-black pigmentation of sclera, ear cartilage, nose",
      "Arthritis of large joints and spine (after age 30)",
      "Dark cerumen (earwax)",
      "Cardiac: aortic stenosis, mitral valve calcification",
      "Renal and prostate stones",
    ],
    investigations: [
      "Urine homogentisic acid (gas chromatography)",
      "Urine ferric chloride test – blue-black color",
      "Benedict's test positive (HGA is a reducing substance)",
      "X-ray spine: calcification of intervertebral discs (bamboo spine-like)",
      "Echocardiogram for valve disease",
    ],
    treatment:
      "Nitisinone (NTBC) 2 mg/kg/day – HPPD inhibitor (blocks HGA production). Low protein diet (reduces phenylalanine/tyrosine intake). Vitamin C 1g/day – antioxidant. Joint replacement for severe arthritis. Regular cardiac monitoring.",
    complications: ["Severe arthropathy", "Aortic stenosis", "Renal calculi"],
    differentiatingFeature:
      "Urine darkens on STANDING (not at time of voiding) = Alkaptonuria. Scleral pigmentation (bluish-black) is pathognomonic. Benign in childhood.",
    pearlPoints: [
      "Alkaptonuria: urine darkens on STANDING, not immediately at voiding",
      "Clinical Triad: dark urine + ochronosis + arthritis",
      "Only AR amino acid disorder that is benign in childhood",
      "Nitisinone: also used in Tyrosinemia Type I",
      "Benedict's test positive: HGA is a reducing substance",
    ],
    indianBrandDrugs: [
      "Nitisinone (Orfadin)",
      "Ascorbic acid (Limcee 500mg)",
      "NSAIDs (Combiflam)",
    ],
  },
  {
    name: "Wilson Disease",
    subject: "Biochemistry",
    icd10: "E83.0",
    category: "Metal Metabolism",
    definition:
      "Autosomal recessive disorder of copper metabolism due to mutation in ATP7B gene (chromosome 13), causing copper accumulation in liver, brain, cornea, and kidney.",
    etiology:
      "ATP7B (copper-transporting ATPase) mutation → failure of copper incorporation into ceruloplasmin + failure of biliary copper excretion → copper accumulates in tissues.",
    pathophysiology:
      "Free copper → reactive oxygen species → hepatocyte damage. Copper in lenticular nucleus (putamen) → neurological disease. Copper in Descemet membrane → Kayser-Fleischer rings.",
    clinicalFeatures: [
      "Kayser-Fleischer rings (golden-brown at corneal periphery – slit lamp)",
      "Chronic hepatitis/cirrhosis",
      "Neurological: tremor, dysarthria, dysphagia, dystonia",
      "Psychiatric: personality change, psychosis, depression",
      "Hemolytic anemia (Coombs negative)",
      "Fanconi syndrome (renal tubular acidosis)",
      "Sunflower cataracts",
    ],
    investigations: [
      "Serum ceruloplasmin: LOW (<20 mg/dL)",
      "24-hour urine copper: HIGH (>100 μg/24h)",
      "Liver biopsy: copper >250 μg/g dry weight (gold standard)",
      "Slit lamp examination: Kayser-Fleischer rings",
      "ATP7B gene mutation analysis",
      "MRI brain: basal ganglia hyperintensity",
    ],
    treatment:
      "D-Penicillamine 250-500 mg QID (copper chelation, 1st line). Trientine (alternative if penicillamine intolerant). Zinc acetate 50 mg TDS (blocks intestinal copper absorption, maintenance). Low copper diet (avoid shellfish, organ meats, chocolate, nuts). Liver transplant for fulminant or decompensated cases.",
    complications: [
      "Fulminant hepatic failure",
      "Neuropsychiatric disease",
      "Cirrhosis",
      "Hemolytic crisis",
    ],
    differentiatingFeature:
      "KF rings + low ceruloplasmin + liver disease in young patient = Wilson Disease. Coombs-NEGATIVE hemolytic anemia is hallmark. KF rings absent in 50% of hepatic presentations.",
    pearlPoints: [
      "Ceruloplasmin LOW in Wilson, but can be normal in acute hepatic form",
      "KF rings seen in slit lamp at superior pole first",
      "Coombs-NEGATIVE hemolytic anemia = hallmark of Wilson disease",
      "Liver biopsy with copper >250 μg/g is gold standard",
      "Zinc: safest maintenance therapy, safe in pregnancy",
    ],
    icmrProtocol:
      "Wilson disease: D-Penicillamine 1st line. Liver transplant for fulminant hepatic failure. Screen siblings with serum ceruloplasmin and slit lamp.",
    indianBrandDrugs: [
      "D-Penicillamine (Artamin 250mg)",
      "Zinc acetate (Zincovit)",
      "Trientine (Syprine)",
    ],
  },
  {
    name: "Gaucher Disease",
    subject: "Biochemistry",
    icd10: "E75.2",
    category: "Lysosomal Storage Disease",
    definition:
      "Most common lysosomal storage disease. Autosomal recessive deficiency of glucocerebrosidase → glucocerebroside accumulates in macrophages (Gaucher cells) of liver, spleen, bone marrow.",
    etiology:
      "GBA gene mutation → glucocerebrosidase deficiency → glucocerebroside in macrophages. Type 1: no CNS. Type 2: acute infantile CNS. Type 3: subacute CNS.",
    pathophysiology:
      "Gaucher cells (lipid-laden macrophages) → infiltrate organs → hepatosplenomegaly. Bone marrow infiltration → pancytopenia, Erlenmeyer flask deformity, avascular necrosis.",
    clinicalFeatures: [
      "Massive splenomegaly (larger than liver)",
      "Hepatomegaly",
      "Pancytopenia (anemia, thrombocytopenia, leukopenia)",
      "Bone pain, pathological fractures",
      "Erlenmeyer flask deformity of distal femur",
      "Type 1: no CNS involvement (most common, Ashkenazi Jews)",
      "Type 2: acute CNS involvement, fatal in infancy",
    ],
    investigations: [
      "Glucocerebrosidase enzyme assay (leukocytes/fibroblasts) – gold standard",
      "Bone marrow biopsy: Gaucher cells (wrinkled tissue paper / crumpled newspaper appearance)",
      "Serum chitotriosidase: elevated (disease activity marker)",
      "X-ray: Erlenmeyer flask deformity, osteopenia",
      "GBA gene mutation analysis",
    ],
    treatment:
      "Enzyme replacement therapy (ERT): Imiglucerase (Cerezyme) 60 IU/kg IV every 2 weeks. Substrate reduction therapy: Miglustat (Zavesca) orally. BMT for Type 2/3. Bisphosphonates for bone disease. Splenectomy only if severe hypersplenism.",
    complications: [
      "Avascular necrosis of hip",
      "Pathological fractures",
      "Hepatopulmonary syndrome",
      "Parkinson disease risk (Type 1 in elderly)",
    ],
    differentiatingFeature:
      "Erlenmeyer flask deformity + Gaucher cells (crumpled tissue paper) in bone marrow + massive splenomegaly = Gaucher Disease. Chitotriosidase monitors treatment.",
    pearlPoints: [
      "Gaucher = most common lysosomal storage disease",
      "Gaucher cells: look like crumpled tissue paper / soap bubbles",
      "Chitotriosidase: monitoring marker for ERT response",
      "Type 1: most common, Ashkenazi Jews, NO CNS involvement",
      "ERT does not cross BBB: cannot treat CNS disease (Types 2/3)",
    ],
    indianBrandDrugs: ["Imiglucerase (Cerezyme)", "Miglustat (Zavesca)"],
  },
  {
    name: "Tay-Sachs Disease",
    subject: "Biochemistry",
    icd10: "E75.0",
    category: "Lysosomal Storage Disease",
    definition:
      "Autosomal recessive lysosomal storage disorder due to deficiency of hexosaminidase A → GM2 ganglioside accumulates in neurons → progressive neurodegeneration.",
    etiology:
      "HEXA gene mutation → Hex-A (alpha subunit) deficiency → GM2 ganglioside accumulation in neurons (most severe in retinal ganglion cells, cerebellar neurons).",
    pathophysiology:
      "GM2 accumulation in lysosomes → neuronal swelling → cell death. Retinal ganglion cells lose ganglioside contrast against avascular macula → cherry-red spot.",
    clinicalFeatures: [
      "Normal development until 3-6 months",
      "Cherry-red spot on macula (ophthalmoscopy)",
      "Progressive hypotonia → hypertonia",
      "Exaggerated startle response (hyperacusis)",
      "Loss of developmental milestones",
      "Seizures",
      "Blindness, deafness",
      "Death by age 3-4 years",
    ],
    investigations: [
      "Enzyme assay: Hexosaminidase A activity – absent",
      "HEXA gene mutation analysis",
      "Fundoscopy: cherry-red spot",
      "CT/MRI brain: thalamic hyperdensity, cerebral atrophy",
    ],
    treatment:
      "No effective disease-modifying treatment available. Supportive: anticonvulsants (Sodium valproate, Levetiracetam). Nutritional support. Palliative care. Genetic counseling and carrier testing in at-risk populations.",
    complications: ["Fatal by age 4-5 years", "Aspiration pneumonia"],
    differentiatingFeature:
      "Cherry-red spot + hyperacusis (exaggerated startle) + progressive neurodegeneration in infant = Tay-Sachs. Sandhoff disease also has cherry-red spot but adds visceral involvement.",
    pearlPoints: [
      "Tay-Sachs: Hex A ONLY deficient (HEXA mutation)",
      "Sandhoff = Hex A + B deficiency (HEXB mutation) + visceral involvement",
      "Cherry-red spot: also in Niemann-Pick A, GM1, Farber – Tay-Sachs most common cause",
      "Exaggerated startle to sound = earliest clinical sign",
      "Most common in Ashkenazi Jews and French Canadians",
    ],
    indianBrandDrugs: [
      "Sodium Valproate (Valparin)",
      "Levetiracetam (Levroxa)",
    ],
  },
  {
    name: "Niemann-Pick Disease Type A",
    subject: "Biochemistry",
    icd10: "E75.2",
    category: "Lysosomal Storage Disease",
    definition:
      "Autosomal recessive lysosomal storage disorder due to deficiency of acid sphingomyelinase → sphingomyelin accumulates in reticuloendothelial cells, neurons, and visceral organs.",
    etiology:
      "SMPD1 gene mutation → sphingomyelinase deficiency → sphingomyelin in macrophages (foam cells), neurons, liver, spleen. Type A: severe CNS. Type B: visceral only.",
    pathophysiology:
      "Sphingomyelin in lysosomes → foam cells in liver, spleen, lungs, bone marrow. Neuronal accumulation → neurodegeneration. Sea-blue histiocytes in bone marrow.",
    clinicalFeatures: [
      "Hepatosplenomegaly (prominent splenomegaly)",
      "Cherry-red spot (50% cases)",
      "Progressive neurodegeneration (Type A)",
      "Failure to thrive",
      "Sea-blue histiocytes in bone marrow",
      "Interstitial lung disease (Type B)",
      "Death by age 3 years (Type A)",
    ],
    investigations: [
      "Bone marrow biopsy: sea-blue histiocytes / foam cells",
      "Enzyme assay: sphingomyelinase activity",
      "Liver biopsy: lipid-laden Kupffer cells",
      "SMPD1 gene analysis",
      "Plasma lyso-sphingomyelin (biomarker)",
    ],
    treatment:
      "Type A: no effective treatment (palliative only). Type B: Olipudase alfa (Xenpozyme) – ERT for non-neurological. Supportive: nutritional support, anticonvulsants. Lung transplant for severe pulmonary disease. Hematopoietic SCT (investigational).",
    complications: [
      "Fatal in infancy (Type A)",
      "Pulmonary fibrosis (Type B)",
      "Liver failure",
    ],
    differentiatingFeature:
      "Sea-blue histiocytes in bone marrow + hepatosplenomegaly + neurodegeneration + cherry-red spot = Niemann-Pick Type A. Type C: cholesterol transport defect (NPC1/NPC2), NOT sphingomyelinase.",
    pearlPoints: [
      "Niemann-Pick Type C: cholesterol transport defect (NPC1/NPC2), vertical gaze palsy",
      "Sea-blue histiocytes = classic bone marrow finding in Types A/B",
      "Type B: no CNS, lung involvement dominates",
      "Type A vs Tay-Sachs: NP has hepatosplenomegaly; Tay-Sachs does not",
      "Sphingomyelin has phosphocholine head group",
    ],
    indianBrandDrugs: [
      "Olipudase alfa (Xenpozyme)",
      "Phenobarbitone for seizures",
    ],
  },
];

export const pathologyDiseases: DiseaseEntry[] = [
  {
    name: "Amyloidosis",
    subject: "Pathology",
    icd10: "E85",
    category: "Protein Folding Disorder",
    definition:
      "Group of diseases characterized by extracellular deposition of insoluble fibrillar proteins (amyloid) in tissues, forming beta-pleated sheets resistant to proteolysis.",
    etiology:
      "AL amyloid: immunoglobulin light chains (multiple myeloma, primary). AA amyloid: serum amyloid A (chronic inflammation – TB, RA, IBD). ATTR: transthyretin (hereditary/senile).",
    pathophysiology:
      "Misfolded proteins aggregate → beta-pleated sheet fibrils → deposit in organs → mechanical disruption + pressure atrophy of adjacent cells → organ failure.",
    clinicalFeatures: [
      "Nephrotic syndrome (renal amyloid – most common)",
      "Hepatosplenomegaly",
      "Cardiac: restrictive cardiomyopathy, arrhythmias",
      "Macroglossia (AL type) – pathognomonic",
      "Peripheral neuropathy",
      "Periorbital purpura (raccoon eyes)",
      "Carpal tunnel syndrome",
    ],
    investigations: [
      "Congo red stain: salmon-pink deposits → apple-green birefringence under polarized light (DIAGNOSTIC)",
      "Rectal biopsy (safest, most accessible)",
      "Fat pad aspirate",
      "Bone marrow biopsy",
      "Echocardiogram: granular sparkling pattern",
      "SAP (serum amyloid P) scintigraphy",
    ],
    treatment:
      "AL amyloid: Bortezomib + Cyclophosphamide + Dexamethasone (VCyD). Autologous SCT for eligible patients. AA amyloid: treat underlying inflammatory disease. ATTR: Tafamidis (Vyndaqel) – TTR stabilizer. Organ supportive: dialysis, cardiac transplant.",
    complications: ["Renal failure", "Heart failure", "Nephrotic syndrome"],
    differentiatingFeature:
      "Apple-green birefringence with Congo red under POLARIZED LIGHT = DIAGNOSTIC for amyloid. No other substance gives this reaction. Macroglossia = AL amyloid specifically.",
    pearlPoints: [
      "Congo red → apple-green birefringence = pathognomonic for amyloid",
      "Rectal biopsy: safest diagnostic procedure for amyloid",
      "Macroglossia = AL amyloid only (not AA)",
      "AA amyloid: kidney most commonly affected organ",
      "Cardiac amyloid: granular sparkling pattern on echo",
    ],
    indianBrandDrugs: [
      "Bortezomib (Velcade)",
      "Tafamidis (Vyndaqel)",
      "Cyclophosphamide (Endoxan)",
    ],
  },
  {
    name: "Systemic Lupus Erythematosus",
    subject: "Pathology",
    icd10: "M32",
    category: "Autoimmune Disease",
    definition:
      "Prototype systemic autoimmune disease with widespread immune complex deposition causing multisystem involvement. Characterized by autoantibodies against nuclear antigens (ANA, anti-dsDNA, anti-Sm).",
    etiology:
      "Genetic (HLA-DR2/DR3, complement deficiency) + hormonal (estrogen) + environmental (UV, drugs, infections) → defective clearance of apoptotic cells → autoantibody formation.",
    pathophysiology:
      "Anti-dsDNA + complement → immune complexes → deposit in kidney, skin, joints, vessels → complement activation → inflammation → end-organ damage.",
    clinicalFeatures: [
      "Malar (butterfly) rash (cheeks + nose bridge, spares nasolabial folds)",
      "Discoid rash",
      "Photosensitivity",
      "Painless oral ulcers",
      "Non-erosive arthritis",
      "Serositis (pleuritis, pericarditis)",
      "Lupus nephritis (wire-loop lesion)",
      "Neurological (seizures, psychosis)",
      "Libman-Sacks endocarditis (all valves)",
    ],
    investigations: [
      "ANA (99% sensitive – best screening test)",
      "Anti-dsDNA (specific 70%, monitors disease activity)",
      "Anti-Sm (most specific 25%)",
      "C3, C4: decreased during active disease",
      "Urine: RBC casts (active nephritis)",
      "Kidney biopsy: wire-loop lesion (immune deposits in capillary walls)",
      "CBC: pancytopenia",
    ],
    treatment:
      "Hydroxychloroquine 400 mg/day (ALL SLE patients). NSAIDs for arthritis/serositis. Low-dose prednisolone 5-10 mg/day. Lupus nephritis: Mycophenolate mofetil + Prednisolone. Severe/refractory: Cyclophosphamide (NIH protocol). Belimumab (Benlysta) for refractory cases.",
    complications: [
      "ESRD",
      "Antiphospholipid syndrome",
      "Premature atherosclerosis",
      "Avascular necrosis (steroid-related)",
    ],
    differentiatingFeature:
      "Wire-loop lesion on kidney biopsy = SLE nephritis (Class IV most common and most severe). Anti-Sm: most SPECIFIC for SLE. Anti-dsDNA: correlates with disease activity.",
    pearlPoints: [
      "Anti-Sm: most SPECIFIC for SLE",
      "Anti-dsDNA: monitors disease activity + correlates with nephritis",
      "Drug-induced lupus: anti-histone antibody (NO anti-dsDNA)",
      "Neonatal lupus: anti-Ro causes congenital heart block",
      "Libman-Sacks: NBTE on all valves, especially mitral",
    ],
    icmrProtocol:
      "Hydroxychloroquine mandatory in all SLE. Lupus nephritis Class III/IV: Mycophenolate + Prednisolone (induction). Maintenance: low-dose MMF.",
    indianBrandDrugs: [
      "Hydroxychloroquine (Plaqunil 200mg)",
      "Mycophenolate (Cellcept 500mg)",
      "Belimumab (Benlysta)",
      "Prednisolone (Wysolone)",
    ],
  },
  {
    name: "Rheumatoid Arthritis",
    subject: "Pathology",
    icd10: "M06",
    category: "Autoimmune Arthritis",
    definition:
      "Chronic systemic autoimmune disease with symmetric inflammatory arthritis, characterized by synovial proliferation (pannus formation) causing progressive erosive joint destruction.",
    etiology:
      "HLA-DRB1 (shared epitope) + anti-CCP antibodies + molecular mimicry → CD4+ T cell activation → synovitis → pannus formation.",
    pathophysiology:
      "Synovial hyperplasia → pannus (aggressive granulation tissue) → invades and destroys cartilage and bone. IL-1, IL-6, TNF-alpha → systemic inflammation.",
    clinicalFeatures: [
      "Symmetric small joint arthritis (MCPs, PIPs – spares DIPs)",
      "Morning stiffness >1 hour",
      "Ulnar deviation of fingers",
      "Swan neck deformity (PIP hyperextension, DIP flexion)",
      "Boutonnière deformity (PIP flexion, DIP hyperextension)",
      "Rheumatoid nodules (extensor surfaces)",
      "Extra-articular: lung fibrosis, scleritis, vasculitis",
    ],
    investigations: [
      "Anti-CCP antibodies – 97% specific (best early test)",
      "RF (Rheumatoid Factor) – IgM anti-IgG – 70% sensitive",
      "ESR, CRP: elevated",
      "X-ray: periarticular osteopenia → erosions → joint space narrowing",
      "Synovial biopsy: pannus (plasma cells, lymphocytes)",
    ],
    treatment:
      "MTX (Methotrexate) 7.5-20 mg/week – DMARD of choice (anchor drug). Hydroxychloroquine + Sulfasalazine + MTX (triple therapy). Biologics: Adalimumab, Etanercept (anti-TNF). JAK inhibitors: Tofacitinib, Baricitinib. NSAIDs for pain: Diclofenac 50mg BD.",
    complications: [
      "Atlanto-axial subluxation",
      "Amyloidosis",
      "Felty syndrome",
      "Interstitial lung disease",
      "Cardiovascular disease",
    ],
    differentiatingFeature:
      "Anti-CCP antibodies (97% specific) + symmetric MCP/PIP arthritis + morning stiffness >1 hour = Rheumatoid Arthritis. Anti-CCP appears 10+ years before symptoms.",
    pearlPoints: [
      "Anti-CCP: most specific autoantibody for RA (97%)",
      "MTX: anchor DMARD; always add folic acid 5mg/week to prevent toxicity",
      "Caplan syndrome: RA + pulmonary nodules in coal miners",
      "Felty syndrome: RA + splenomegaly + neutropenia",
      "Anti-TNF use: screen for TB before starting (PPD/IGRA)",
    ],
    icmrProtocol:
      "Early aggressive DMARD therapy. MTX first-line. Screen latent TB before biologics. DAS28 score guides treatment escalation.",
    indianBrandDrugs: [
      "MTX (Folitrax 7.5mg)",
      "Hydroxychloroquine (Plaqunil)",
      "Adalimumab (Humira, Cimtai)",
      "Tofacitinib (Xeljanz)",
      "Diclofenac (Voveran 50mg)",
    ],
  },
  {
    name: "Atherosclerosis",
    subject: "Pathology",
    icd10: "I70",
    category: "Cardiovascular Pathology",
    definition:
      "Chronic inflammatory disease of large and medium arteries characterized by endothelial dysfunction, lipid accumulation, and fibrous plaque formation leading to arterial narrowing and thrombosis.",
    etiology:
      "Risk factors: hyperlipidemia (LDL), smoking, hypertension, DM, obesity, family history. Pathogenesis: response-to-injury hypothesis (Ross).",
    pathophysiology:
      "Endothelial injury → LDL oxidation → monocyte recruitment → foam cells (lipid-laden macrophages) → fatty streak → fibrous plaque → vulnerable plaque rupture → thrombosis → ACS/stroke.",
    clinicalFeatures: [
      "Asymptomatic until >70% stenosis",
      "Angina (coronary), TIA/stroke (carotid)",
      "Intermittent claudication (peripheral vascular disease)",
      "Renal artery stenosis → renovascular hypertension",
      "Mesenteric ischemia",
      "Aortic aneurysm",
    ],
    investigations: [
      "Lipid profile: LDL, HDL, TG, total cholesterol",
      "hsCRP: marker of vascular inflammation",
      "Coronary angiography: gold standard for coronary disease",
      "Carotid IMT (intima-media thickness)",
      "CT coronary calcium score",
    ],
    treatment:
      "Statins: Rosuvastatin 10-40 mg, Atorvastatin 10-80 mg (LDL goal <70 mg/dL in high risk). Aspirin 75-100 mg/day (antiplatelet). ACE inhibitors (Ramipril 5-10 mg). Beta-blockers post-MI. Lifestyle: Mediterranean diet, smoking cessation, exercise. PCSK9 inhibitors: Evolocumab for refractory hyperlipidemia.",
    complications: [
      "AMI",
      "Ischemic stroke",
      "Peripheral vascular disease",
      "Aortic aneurysm rupture",
    ],
    differentiatingFeature:
      "Foam cells (lipid-laden macrophages) = earliest cellular event in atherosclerosis. Fatty streak = first visible lesion (age 10-15 years). Vulnerable plaque rupture → ACS (NOT gradual stenosis).",
    pearlPoints: [
      "Fatty streak: reversible, universal (present even in children)",
      "Vulnerable plaque: thin fibrous cap + large lipid core + inflammation",
      "Plaque RUPTURE → thrombus → ACS (not gradual lumen closure)",
      "HDL: reverse cholesterol transport – protective against atherosclerosis",
      "Response-to-injury hypothesis: endothelial damage → LDL oxidation → foam cells",
    ],
    icmrProtocol:
      "Primary prevention: statin if LDL >190 or 10-yr risk >10%. Secondary prevention: high-intensity statin + aspirin lifelong.",
    indianBrandDrugs: [
      "Rosuvastatin (Rozavel 20mg)",
      "Atorvastatin (Atorva, Lipitor)",
      "Aspirin (Ecosprin 75mg)",
      "Ramipril (Cardace 5mg)",
      "Evolocumab (Repatha)",
    ],
  },
  {
    name: "Pulmonary Tuberculosis (Pathology)",
    subject: "Pathology",
    icd10: "A15",
    category: "Granulomatous Disease",
    definition:
      "Chronic granulomatous infection caused by Mycobacterium tuberculosis, characterized by caseating granulomas (epithelioid cell granulomas with Langhans giant cells and central caseous necrosis).",
    etiology:
      "M. tuberculosis (AFB) → inhaled → macrophage uptake → incomplete killing → granuloma formation. Primary (1st exposure) vs Secondary/Reactivation TB.",
    pathophysiology:
      "Macrophage-TB interaction → TNF-alpha → epithelioid cell transformation → fusion to Langhans giant cells → caseous center (cheese-like necrosis). Liquefaction → cavity → spread.",
    clinicalFeatures: [
      "Primary TB: Ghon focus (lower lobe) + hilar lymphadenopathy = Ghon complex",
      "Secondary TB: Upper lobe cavitation (Simon's focus)",
      "Productive cough, hemoptysis",
      "Night sweats, weight loss",
      "Low-grade fever (evening rise)",
      "Miliary TB: hematogenous spread (millet seed shadows on CXR)",
    ],
    investigations: [
      "Sputum AFB smear (ZN stain) – sensitivity 50-60%",
      "Sputum culture (LJ medium) – gold standard (8 weeks)",
      "CBNAAT (GeneXpert MTB/RIF) – rapid, detects rifampicin resistance",
      "CXR: upper lobe consolidation, cavities, calcification",
      "Mantoux test (PPD 5TU): >10mm in immunocompetent",
      "IGRA (Quantiferon Gold): latent TB detection",
    ],
    treatment:
      "DOTS (NTEP): 2HRZE/4HR. Intensive phase (2 months): INH + Rifampicin + Pyrazinamide + Ethambutol. Continuation phase (4 months): INH + Rifampicin. Pyridoxine 10-25 mg/day with INH (prevents neuropathy). MDR-TB: 18-20 month regimen with Bedaquiline, Linezolid.",
    complications: [
      "Cavity → aspergilloma",
      "Fibrothorax",
      "Cor pulmonale",
      "Addison's disease (adrenal TB)",
      "CNS TB",
    ],
    differentiatingFeature:
      "Langhans giant cells (nuclei at PERIPHERY in horseshoe) + central caseation necrosis + epithelioid cells = TB granuloma. Ghon complex = primary TB hallmark.",
    pearlPoints: [
      "Ghon focus: lower lobe (inhaled) + calcified hilar LN = Ghon complex → Ranke complex (calcified)",
      "Langhans giant cell: nuclei arranged at PERIPHERY (horseshoe pattern)",
      "Foreign body giant cell: nuclei scattered RANDOMLY",
      "Caseous necrosis: SPECIFIC to TB granuloma (unlike liquefactive in bacterial abscess)",
      "Simon focus: apical seeding during primary TB → reactivation site",
    ],
    icmrProtocol:
      "NTEP DOTS: 2HRZE/4HR standard regimen. GeneXpert for rapid diagnosis and rifampicin resistance. MDR-TB: BPaLM regimen (Bedaquiline + Pretomanid + Linezolid + Moxifloxacin).",
    indianBrandDrugs: [
      "DOTS kit (NTEP fixed-dose combination)",
      "Pyridoxine (Benfotiamine)",
      "Bedaquiline (Sirturo)",
    ],
  },
  {
    name: "Carcinoma Cervix",
    subject: "Pathology",
    icd10: "C53",
    category: "Gynecological Oncology",
    definition:
      "Malignant neoplasm of the uterine cervix, predominantly squamous cell carcinoma (80%), caused by persistent HPV infection (high-risk types 16, 18).",
    etiology:
      "HPV 16, 18 (oncogenic) → E6 protein degrades p53, E7 protein inactivates Rb → uncontrolled cell proliferation → CIN → invasive carcinoma. Progression takes 10-15 years.",
    pathophysiology:
      "HPV infects transformation zone (squamocolumnar junction) → koilocyte formation → CIN 1→2→3 → invasive carcinoma.",
    clinicalFeatures: [
      "Postcoital bleeding (most common symptom)",
      "Intermenstrual bleeding, menorrhagia",
      "Vaginal discharge (offensive)",
      "Advanced: pelvic pain, renal failure (ureteric obstruction)",
      "Fistulas (vesicovaginal, rectovaginal)",
      "CIN: often asymptomatic",
    ],
    investigations: [
      "Pap smear (cervical cytology) – screening test",
      "Colposcopy + directed biopsy – diagnostic",
      "LEEP/cone biopsy for CIN",
      "MRI pelvis: local staging",
      "FIGO staging: clinical staging",
    ],
    treatment:
      "CIN 1: watchful waiting. CIN 2/3: LEEP, cryotherapy, or cold knife conization. Stage IA1: simple hysterectomy. Stage IB-IIA: radical hysterectomy (Wertheim) OR concurrent chemoradiotherapy. Stage IIB+: Cisplatin + Radiotherapy. Prevention: HPV vaccine (Cervarix, Gardasil).",
    complications: ["Hydronephrosis", "Vesicovaginal fistula", "Lymphedema"],
    differentiatingFeature:
      "Koilocytes (perinuclear halo + raisinoid nucleus) on Pap smear = HPV-infected squamous cells = precursor to cervical cancer. Koilocyte is pathognomonic of HPV infection.",
    pearlPoints: [
      "HPV 16 → squamous cell carcinoma; HPV 18 → adenocarcinoma",
      "Koilocyte = pathognomonic of HPV infection",
      "CIN 3 = carcinoma in situ (full thickness dysplasia)",
      "Pap smear screening: from age 21 or 3 years after first intercourse",
      "India has highest cervical cancer burden globally (HPV vaccination critical)",
    ],
    icmrProtocol:
      "ICMR: HPV vaccination at 9-14 years. Cervical cancer screening via VIA (Visual Inspection with Acetic acid) in low-resource settings. Colposcopy for abnormal Pap.",
    indianBrandDrugs: [
      "Cervarix (GSK)",
      "Gardasil (MSD)",
      "Cisplatin (Cisplatino)",
    ],
  },
  {
    name: "Colorectal Carcinoma",
    subject: "Pathology",
    icd10: "C18",
    category: "GI Oncology",
    definition:
      "Malignant neoplasm arising from colonic mucosa, predominantly adenocarcinoma. Right colon: polypoid/fungating. Left colon: annular constricting (apple-core lesion on barium enema).",
    etiology:
      "Sporadic (APC mutation, K-ras, p53). FAP: APC gene mutation (100% malignancy if untreated). HNPCC (Lynch): mismatch repair genes (MLH1, MSH2).",
    pathophysiology:
      "Normal mucosa → adenoma (APC mutation) → carcinoma (K-ras → p53). Fearon-Vogelstein multistep carcinogenesis model.",
    clinicalFeatures: [
      "Right colon: occult bleeding → iron deficiency anemia, right iliac fossa mass",
      "Left colon: change in bowel habits, fresh blood, obstruction",
      "Rectal carcinoma: tenesmus, pencil stools, fresh blood PR",
      "Metastasis: liver (most common) → lung → bone",
    ],
    investigations: [
      "Colonoscopy + biopsy (gold standard)",
      "CEA (carcinoembryonic antigen) – monitoring, not screening",
      "Barium enema: apple-core sign (left colon)",
      "CT chest/abdomen/pelvis: staging",
      "KRAS/NRAS/BRAF mutation testing (guides biologic therapy)",
    ],
    treatment:
      "Curative: right/left hemicolectomy (laparoscopic preferred). Rectal: anterior resection or APR (abdominoperineal). Adjuvant: FOLFOX (Oxaliplatin + 5-FU + Leucovorin). Metastatic: FOLFOX/FOLFIRI ± Bevacizumab (anti-VEGF). MSI-High: Pembrolizumab (PD-1 inhibitor).",
    complications: ["Bowel obstruction", "Perforation", "Liver metastasis"],
    differentiatingFeature:
      "Apple-core lesion on barium enema = Left colon carcinoma. Fearon-Vogelstein sequence: APC → K-ras → DCC → p53. FAP: prophylactic colectomy by age 20.",
    pearlPoints: [
      "FAP: hundreds of polyps + APC mutation + 100% cancer risk if untreated",
      "HNPCC (Lynch): MLH1/MSH2, right colon, microsatellite instability, better prognosis",
      "CEA: not for screening, used for post-operative monitoring only",
      "Villous adenoma: highest malignant potential (vs tubular = lowest)",
      "MSI-High tumors respond to PD-1 inhibitors (Pembrolizumab)",
    ],
    icmrProtocol:
      "Colonoscopy screening for high-risk individuals >40 years or with FAP/Lynch syndrome. MSI testing for all colorectal cancers.",
    indianBrandDrugs: [
      "5-FU (Fivocil)",
      "Oxaliplatin (Oxali)",
      "Bevacizumab (Avastin)",
      "Pembrolizumab (Keytruda)",
    ],
  },
  {
    name: "Hepatocellular Carcinoma",
    subject: "Pathology",
    icd10: "C22.0",
    category: "Hepatic Oncology",
    definition:
      "Primary malignant tumor of hepatocytes, most common primary liver cancer, strongly associated with cirrhosis (HBV, HCV, alcoholic, NAFLD).",
    etiology:
      "HBV (HBsAg → HCC even without cirrhosis). HCV (via cirrhosis). Aflatoxin B1 (p53 codon 249 mutation). NAFLD/NASH. Alcoholic cirrhosis.",
    pathophysiology:
      "Chronic hepatocyte injury → regeneration → DNA damage → HBV integration → p53/Rb inactivation → dysplasia → HCC. AFP produced by dedifferentiated hepatocytes.",
    clinicalFeatures: [
      "RUQ pain, hepatomegaly",
      "Worsening ascites in known cirrhotic",
      "Sudden decompensation in stable cirrhotic",
      "AFP >500 ng/mL (highly suggestive)",
      "Fever (tumor fever)",
      "Paraneoplastic: hypoglycemia, polycythemia, hypercalcemia",
    ],
    investigations: [
      "AFP: >20 ng/mL (screening), >500 ng/mL (diagnostic)",
      "Triphasic CT/MRI: arterial enhancement + portal washout = HCC (LI-RADS 5)",
      "Liver biopsy: only if imaging inconclusive",
      "PIVKA-II (DCP): more sensitive marker than AFP",
    ],
    treatment:
      "Resection (Child-Pugh A, no portal HTN, single ≤5cm). Liver transplant (Milan criteria: single ≤5cm or ≤3 nodules ≤3cm). Ablation (RFA/MWA) for ≤3cm lesions. TACE for intermediate stage. Sorafenib (Nexavar) 400mg BD – systemic. Atezolizumab + Bevacizumab (IMbrave150) – 1st line systemic.",
    complications: [
      "Portal vein thrombosis",
      "Hepatic failure",
      "Hemoperitoneum",
    ],
    differentiatingFeature:
      "Arterial enhancement + portal washout on triphasic CT = HCC in cirrhotic patient (no biopsy needed). Milan criteria = standard for liver transplant listing.",
    pearlPoints: [
      "HBV: HCC without cirrhosis possible (direct viral integration)",
      "Aflatoxin + HBV = synergistic risk (codon 249 p53 hot-spot mutation)",
      "Milan criteria: single ≤5cm OR ≤3 nodules ≤3cm – basis for transplant listing",
      "TACE: bridges transplant, NOT curative alone",
      "Sorafenib: first oral targeted therapy for HCC",
    ],
    icmrProtocol:
      "HCC surveillance: 6-monthly ultrasound + AFP in all cirrhotic patients. HBV vaccination for prevention.",
    indianBrandDrugs: [
      "Sorafenib (Nexavar 200mg)",
      "Lenvatinib (Lenvima)",
      "Bevacizumab (Avastin)",
    ],
  },
  {
    name: "Nephrotic Syndrome",
    subject: "Pathology",
    icd10: "N04",
    category: "Renal Pathology",
    definition:
      "Clinical syndrome defined by heavy proteinuria (>3.5g/day), hypoalbuminemia, edema, and hyperlipidemia. Caused by podocyte damage and loss of glomerular charge barrier.",
    etiology:
      "Minimal Change Disease (children, most common). FSGS (adults, HIV). Membranous Nephropathy (adults #1 in West, anti-PLA2R). Diabetic nephropathy (MC worldwide).",
    pathophysiology:
      "Podocyte damage → loss of charge barrier → proteinuria → hypoalbuminemia → reduced oncotic pressure → edema. Liver compensates by increasing lipoprotein synthesis → hyperlipidemia.",
    clinicalFeatures: [
      "Periorbital puffiness (morning) – earliest sign",
      "Pitting edema (dependent)",
      "Ascites, pleural effusion",
      "Frothy urine (heavy proteinuria)",
      "Xanthomas (hyperlipidemia)",
      "Increased infection risk (SBP, pneumococcal)",
    ],
    investigations: [
      "Urine protein: >3.5g/24h or PCR >350mg/mmol",
      "Serum albumin: <3.5g/dL",
      "Lipid profile: elevated cholesterol, triglycerides",
      "Urine: oval fat bodies, fatty casts, maltese cross birefringence",
      "Kidney biopsy: definitive diagnosis",
      "EM: foot process effacement (MCD)",
    ],
    treatment:
      "Minimal Change Disease: Prednisolone 1 mg/kg/day × 4 weeks → taper. Membranous Nephropathy: Cyclophosphamide/Rituximab. FSGS: Prednisolone ± Cyclosporine. Furosemide 40-80 mg for edema. ACE inhibitor (Enalapril) for proteinuria reduction. Statins for hyperlipidemia. Anticoagulation for renal vein thrombosis.",
    complications: [
      "Thrombosis (DVT/PE – loss of antithrombin III)",
      "Infections (loss of immunoglobulins)",
      "ESRD",
      "Protein malnutrition",
    ],
    differentiatingFeature:
      "Foot process effacement on EM (NO immune deposits on IF) = Minimal Change Disease. Most common nephrotic syndrome in children. Responds to steroids (steroid-sensitive).",
    pearlPoints: [
      "MCD: selective proteinuria (albumin mainly), responds to steroids",
      "FSGS: steroid-resistant, worst prognosis among primary nephrotic syndromes",
      "Membranous: thickened GBM, spike and dome pattern on EM, anti-PLA2R positive",
      "Renal vein thrombosis: complication of nephrotic (loss of antithrombin III)",
      "Oval fat bodies / lipid-laden casts = nephrotic syndrome",
    ],
    icmrProtocol:
      "Children: Prednisolone 2mg/kg/day for 4 weeks, then 1.5mg/kg on alternate days for 4 weeks. Steroid-resistant: Cyclosporine/Tacrolimus.",
    indianBrandDrugs: [
      "Prednisolone (Wysolone 40mg)",
      "Furosemide (Lasix 40mg)",
      "Enalapril (Envas 5mg)",
      "Rituximab (Ristova)",
      "Cyclosporine (Panimun Bioral)",
    ],
  },
  {
    name: "Acute Myeloid Leukemia (AML)",
    subject: "Pathology",
    icd10: "C91.0",
    category: "Hematological Oncology",
    definition:
      "Malignant clonal proliferation of myeloid progenitor cells with >20% blasts in bone marrow (WHO criterion). Auer rods in blasts are pathognomonic.",
    etiology:
      "De novo or secondary (post-MDS, after alkylating agent chemotherapy). Down syndrome (AML-M7). t(15;17) → APL (AML-M3). FLT3, NPM1, DNMT3A mutations.",
    pathophysiology:
      "Genetic mutations → myeloid blast accumulation → normal hematopoiesis failure → pancytopenia. Auer rods = crystallized azurophilic granules in blasts. APL: promyelocyte granules → DIC.",
    clinicalFeatures: [
      "Fatigue, pallor (anemia)",
      "Fever, recurrent infections (neutropenia)",
      "Bleeding: petechiae, ecchymoses (thrombocytopenia)",
      "Bone pain (marrow expansion)",
      "Gum hypertrophy (M4/M5 – monocytic AML)",
      "DIC: APL (M3) – emergency, life-threatening",
      "Auer rods in peripheral smear: pathognomonic",
    ],
    investigations: [
      "CBC: pancytopenia with circulating blasts",
      "Peripheral smear: >20% myeloblasts with Auer rods",
      "Bone marrow biopsy: >20% blasts (WHO criterion)",
      "Flow cytometry: CD13, CD33, CD117 (myeloid markers)",
      "Cytogenetics: t(15;17) APL, t(8;21), inv(16)",
      "FLT3/NPM1 mutation analysis for prognosis",
    ],
    treatment:
      "Induction: 7+3 regimen (Cytarabine 7 days + Idarubicin 3 days). APL (M3): ATRA + Arsenic trioxide (ATRA-ATO) – curative (>95% CR). Consolidation: high-dose Cytarabine. Allogeneic SCT for high-risk disease. Venetoclax + Azacitidine for elderly/unfit patients.",
    complications: [
      "DIC (especially APL)",
      "Tumor lysis syndrome",
      "CNS involvement",
      "Sepsis",
    ],
    differentiatingFeature:
      "Auer rods = pathognomonic for AML (NEVER in ALL). t(15;17) + DIC + promyelocytes = APL (AML-M3) → ATRA life-saving, give before cytogenetics result.",
    pearlPoints: [
      "Auer rods: AML ONLY – never in ALL, not in MDS",
      "APL (M3): DIC emergency – give ATRA immediately without waiting for cytogenetics",
      "Down syndrome: AML-M7 (megakaryoblastic leukemia)",
      "M4/M5 (monocytic): gum hypertrophy + skin infiltration (leukemia cutis)",
      "FLT3-ITD mutation: poor prognosis, add Midostaurin",
    ],
    icmrProtocol:
      "APL: ATRA + Arsenic trioxide (ATRA-ATO) standard. Non-APL AML: 7+3 induction. Allogeneic SCT for high-risk.",
    indianBrandDrugs: [
      "Cytarabine (Depocyt)",
      "Idarubicin (Zavedos)",
      "ATRA (Vesanoid 10mg)",
      "Arsenic trioxide (Trisenox)",
      "Venetoclax (Venclyxto)",
    ],
  },
];

export const allBatch2Diseases: DiseaseEntry[] = [
  ...biochemistryDiseases,
  ...pathologyDiseases,
];
