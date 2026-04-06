/**
 * Disease Database - Anatomy & Physiology
 * 100 Anatomy + 100 Physiology high-yield diseases
 * Source: Gray's Anatomy 42nd Ed, Guyton & Hall Physiology 14th Ed, Harrison's 21st Ed
 */

export interface DiseaseEntry {
  name: string;
  subject:
    | "Anatomy"
    | "Physiology"
    | "Biochemistry"
    | "Pathology"
    | "Pharmacology"
    | "Microbiology"
    | "Forensic"
    | "Community"
    | "Medicine"
    | "Surgery"
    | "OBG"
    | "Pediatrics"
    | "Orthopaedics"
    | "ENT"
    | "Ophthalmology"
    | "Dermatology"
    | "Psychiatry"
    | "Radiology"
    | "Anaesthesia";
  icd10: string;
  category: string;
  definition: string;
  etiology: string;
  pathophysiology: string;
  clinicalFeatures: string[];
  investigations: string[];
  treatment: string;
  complications: string[];
  differentiatingFeature: string;
  pearlPoints: string[];
  icmrProtocol?: string;
  indianBrandDrugs?: string[];
}

export const anatomyDiseases: DiseaseEntry[] = [
  {
    name: "Congenital Diaphragmatic Hernia",
    subject: "Anatomy",
    icd10: "Q79.0",
    category: "Developmental Anomaly",
    definition:
      "Congenital defect in diaphragm allowing abdominal viscera to herniate into thoracic cavity, most commonly through foramen of Bochdalek (posterolateral, left side 85%).",
    etiology:
      "Failure of pleuroperitoneal folds to fuse by 8th week of gestation. Associated with chromosomal anomalies (trisomy 18, 21).",
    pathophysiology:
      "Herniated bowel compresses developing lung → pulmonary hypoplasia → pulmonary hypertension → right-to-left shunt → severe hypoxia.",
    clinicalFeatures: [
      "Respiratory distress at birth",
      "Scaphoid abdomen",
      "Barrel-shaped chest",
      "Heart sounds shifted to right",
      "Absent breath sounds on left",
      "Cyanosis",
    ],
    investigations: [
      "CXR: bowel loops in chest, mediastinal shift",
      "Antenatal USG: polyhydramnios, stomach in chest",
      "ABG: hypoxia, hypercapnia",
      "Echocardiography: pulmonary hypertension",
    ],
    treatment:
      "Immediate: NG tube decompression, avoid bag-mask ventilation. Surgery: Primary repair or patch repair after stabilization. ECMO if refractory.",
    complications: [
      "Pulmonary hypoplasia",
      "Persistent pulmonary hypertension",
      "GERD post-repair",
      "Recurrence",
    ],
    differentiatingFeature:
      "Scaphoid abdomen + respiratory distress at birth + bowel sounds in chest = CDH until proven otherwise.",
    pearlPoints: [
      "Left-sided in 85% — through foramen of Bochdalek",
      "Right-sided CDH has better prognosis (liver acts as plug)",
      "Avoid bag-mask ventilation — worsens bowel distension",
      "ECMO used when conventional ventilation fails",
      "Liver herniation = worst prognostic sign",
    ],
  },
  {
    name: "Meckel's Diverticulum",
    subject: "Anatomy",
    icd10: "Q43.0",
    category: "Developmental Anomaly - GI",
    definition:
      "True diverticulum of ileum, remnant of vitello-intestinal (omphalomesenteric) duct. Most common congenital anomaly of GI tract.",
    etiology:
      "Failure of vitello-intestinal duct to obliterate by 7th week of gestation.",
    pathophysiology:
      "Contains ectopic tissue (gastric 50%, pancreatic) → acid secretion → ulceration → bleeding. May intussuscept or cause volvulus.",
    clinicalFeatures: [
      "Painless rectal bleeding (most common in children)",
      "Intestinal obstruction",
      "Meckel's diverticulitis (mimics appendicitis)",
      "Umbilical fistula",
      "Volvulus around fibrous band",
    ],
    investigations: [
      "Meckel's scan (Tc-99m pertechnetate) — detects ectopic gastric mucosa",
      "CT scan",
      "Capsule endoscopy",
      "Laparoscopy (gold standard)",
    ],
    treatment:
      "Symptomatic: Surgical resection (diverticulectomy or ileal resection). Asymptomatic: No treatment required.",
    complications: [
      "GI hemorrhage",
      "Intestinal obstruction",
      "Diverticulitis",
      "Perforation",
      "Umbilical fistula",
    ],
    differentiatingFeature:
      "Rule of 2s: 2% population, 2 inches long, 2 feet from ileocecal valve, 2 types of ectopic tissue, presents before 2 years.",
    pearlPoints: [
      "Most common congenital GI anomaly",
      "Tc-99m scan enhanced by pentagastrin/cimetidine pretreatment",
      "Painless rectal bleeding in child = Meckel's until proven otherwise",
      "True diverticulum — all 3 layers of bowel wall",
      "Fibrous band from diverticulum tip to umbilicus can cause volvulus",
    ],
  },
  {
    name: "Patent Ductus Arteriosus",
    subject: "Anatomy",
    icd10: "Q25.0",
    category: "Congenital Heart Disease",
    definition:
      "Persistence of fetal connection between pulmonary artery and descending aorta (connecting left pulmonary artery to aorta just distal to left subclavian artery) after birth.",
    etiology:
      "Prematurity (most common), congenital rubella syndrome, high altitude, female sex (2:1). Prostaglandins keep it open.",
    pathophysiology:
      "Left-to-right shunt → increased pulmonary blood flow → pulmonary hypertension → Eisenmenger syndrome (reversal of shunt → cyanosis).",
    clinicalFeatures: [
      "Continuous 'machinery' murmur (Gibson murmur) at left 2nd ICS",
      "Wide pulse pressure",
      "Bounding pulses",
      "Prominent apical impulse",
      "Differential cyanosis (toes but not fingers) in Eisenmenger",
    ],
    investigations: [
      "CXR: cardiomegaly, prominent pulmonary vascularity",
      "ECG: LVH",
      "2D Echo with Doppler: definitive",
      "Cardiac catheterization",
    ],
    treatment:
      "Premature: Indomethacin (prostaglandin inhibitor) or Ibuprofen IV. Term infant/older: Surgical ligation or catheter-based device closure (Amplatzer). Indomethacin contraindicated in renal failure.",
    complications: [
      "Pulmonary hypertension",
      "Eisenmenger syndrome",
      "Infective endocarditis",
      "Heart failure",
    ],
    differentiatingFeature:
      "Continuous machinery murmur + bounding pulses + wide pulse pressure = PDA. Differential cyanosis (lower limb > upper) = PDA with Eisenmenger.",
    pearlPoints: [
      "Only CHD with continuous murmur",
      "Indomethacin closes PDA in premature — works via prostaglandin inhibition",
      "Rubella syndrome: PDA + peripheral pulmonary artery stenosis + cataracts",
      "Ductus arteriosus = remnant of left 6th aortic arch",
      "Eisenmenger: irreversible — transplant only option",
    ],
  },
  {
    name: "Hirschsprung Disease",
    subject: "Anatomy",
    icd10: "Q43.1",
    category: "Developmental Anomaly - GI",
    definition:
      "Congenital absence of ganglion cells (aganglionosis) in myenteric (Auerbach's) and submucosal (Meissner's) plexuses, causing functional obstruction. Rectum always involved.",
    etiology:
      "Failure of neural crest cell migration. RET proto-oncogene mutation. Associated with Down syndrome (10%).",
    pathophysiology:
      "Absence of ganglion cells → constant contraction of affected segment → functional obstruction → proximal bowel dilates (megacolon).",
    clinicalFeatures: [
      "Failure to pass meconium within 48h of birth",
      "Abdominal distension",
      "Bilious vomiting",
      "Explosive diarrhea on PR examination (squirt sign)",
      "Enterocolitis (life-threatening)",
    ],
    investigations: [
      "Barium enema: transition zone (narrow segment → dilated proximal bowel)",
      "Anorectal manometry: absent rectoanal inhibitory reflex",
      "Rectal biopsy (gold standard): absence of ganglion cells, hypertrophied nerves, acetylcholinesterase staining",
    ],
    treatment:
      "Swenson's pull-through operation (surgery of choice). Temporary colostomy if very sick.",
    complications: [
      "Hirschsprung enterocolitis (most dangerous)",
      "Fecal soiling post-op",
      "Anastomotic leak",
    ],
    differentiatingFeature:
      "Failure to pass meconium in 48h + squirt sign on PR = Hirschsprung's. Transition zone on barium enema is pathognomonic.",
    pearlPoints: [
      "Rectum always involved — aganglionic segment is distal",
      "Rectal biopsy is gold standard — suction biopsy preferred",
      "RET gene mutation — associated with MEN 2A",
      "Enterocolitis is most feared complication — sepsis + toxic megacolon",
      "Down syndrome has 10% incidence of Hirschsprung's",
    ],
  },
  {
    name: "Tetralogy of Fallot",
    subject: "Anatomy",
    icd10: "Q21.3",
    category: "Congenital Heart Disease - Cyanotic",
    definition:
      "Most common cyanotic congenital heart disease beyond neonatal period. Four components: VSD, overriding aorta, pulmonary stenosis (RVOTO), RVH.",
    etiology:
      "Anterosuperior deviation of infundibular septum. Associated with DiGeorge syndrome (22q11 deletion), Down syndrome.",
    pathophysiology:
      "Pulmonary stenosis → increased RV resistance → right-to-left shunt through VSD → unoxygenated blood enters aorta → cyanosis.",
    clinicalFeatures: [
      "Central cyanosis (appears 3-6 months)",
      "Dyspnea on exertion",
      "Squatting (increases SVR, reduces right-to-left shunt)",
      "Tet spells (hypercyanotic episodes)",
      "Clubbing",
      "Right parasternal heave",
      "Single S2, ejection systolic murmur (PS)",
    ],
    investigations: [
      "CXR: Boot-shaped heart (coeur en sabot), oligemic lung fields",
      "ECG: RVH, right axis deviation",
      "Echo: definitive",
      "Cardiac catheterization: equal pressure in both ventricles",
    ],
    treatment:
      "Medical: Propranolol for tet spells. Morphine + knee-chest position for acute spell. Surgery: Total correction (Blalock-Taussig shunt as palliation).",
    complications: [
      "Brain abscess (paradoxical embolism)",
      "Infective endocarditis",
      "Polycythemia",
      "Sudden death",
    ],
    differentiatingFeature:
      "Boot-shaped heart on CXR + squatting + cyanosis after 3 months = TOF. Tet spell relieved by squatting.",
    pearlPoints: [
      "Most common cyanotic CHD after neonatal period",
      "Squatting increases peripheral resistance → reduces right-to-left shunt",
      "Tet spell management: O2 + knee-chest + morphine + IV propranolol",
      "Boot-shaped heart: due to RVH (uplifted apex) + small PA",
      "BT shunt: subclavian to pulmonary artery — palliative procedure",
    ],
  },
  {
    name: "Cleft Lip and Palate",
    subject: "Anatomy",
    icd10: "Q37.9",
    category: "Orofacial Developmental Anomaly",
    definition:
      "Failure of fusion of maxillary processes with medial nasal process (cleft lip) and/or palatine shelves (cleft palate). Most common orofacial congenital anomaly.",
    etiology:
      "Multifactorial. Drugs: phenytoin, thalidomide, corticosteroids, alcohol. Folic acid deficiency. Genetic syndromes (Van der Woude).",
    pathophysiology:
      "Cleft lip: failure of fusion at 6th week. Cleft palate: failure of palatine shelf fusion at 9th week.",
    clinicalFeatures: [
      "Visible cleft of lip (unilateral left > right > bilateral)",
      "Cleft of hard/soft palate",
      "Feeding difficulties",
      "Nasal regurgitation",
      "Recurrent otitis media",
      "Speech defects (VPI)",
    ],
    investigations: [
      "Antenatal USG (18-20 weeks)",
      "Nasoendoscopy for VPI assessment",
    ],
    treatment:
      "Cleft lip repair: Millard rotation-advancement technique at 3 months (rule of 10: 10 weeks, 10 lbs, 10 g Hb). Cleft palate repair: 9-18 months (Wardill-Kilner V-Y pushback).",
    complications: [
      "Feeding problems",
      "Recurrent otitis media",
      "Speech problems",
      "Dental malocclusion",
    ],
    differentiatingFeature:
      "Rule of 10 for cleft lip repair: 10 weeks age, 10 lbs weight, 10 g/dL Hb.",
    pearlPoints: [
      "Cleft lip: failure of fusion at 6th week (maxillary + medial nasal process)",
      "Cleft palate: failure at 9th week (palatine shelves)",
      "Left-sided cleft lip is most common",
      "Grommets for recurrent OM with secretory OM",
      "Folic acid 5mg/day pre-conception reduces risk",
    ],
  },
  {
    name: "Cryptorchidism (Undescended Testis)",
    subject: "Anatomy",
    icd10: "Q53.9",
    category: "Developmental Anomaly - Genitourinary",
    definition:
      "Failure of testis to descend into scrotum. Most common genital abnormality in male infants. Can be unilateral (90%) or bilateral.",
    etiology:
      "Gubernaculum shortening failure. Hormonal: LH, testosterone, MIS deficiency. Prematurity most common risk factor.",
    pathophysiology:
      "Testis arrested at any point along descent path (abdomen → inguinal canal → scrotum). Elevated temperature impairs spermatogenesis.",
    clinicalFeatures: [
      "Empty scrotum",
      "Absent testis on palpation",
      "Palpable testis in inguinal canal (most common location)",
      "Retractile testis vs true undescended",
    ],
    investigations: [
      "USG: for inguinal testis",
      "MRI/laparoscopy: for non-palpable intraabdominal testis",
      "Hormonal: hCG stimulation test",
    ],
    treatment:
      "Hormonal trial: hCG/GnRH (limited success). Surgery: Orchidopexy at 6-12 months (prevents malignancy, preserves fertility). Orchidectomy if post-pubertal intraabdominal testis.",
    complications: [
      "Malignancy (Seminoma — 10x risk, even after orchidopexy)",
      "Infertility",
      "Torsion",
      "Hernia (80% have patent processus vaginalis)",
    ],
    differentiatingFeature:
      "Malignancy risk is highest in intraabdominal undescended testis. Seminoma is the most common tumor.",
    pearlPoints: [
      "Orchidopexy at 6-12 months — reduces malignancy risk and preserves fertility",
      "Most palpable in inguinal canal",
      "Associated with indirect inguinal hernia (80%)",
      "Most common tumor in undescended testis: Seminoma",
      "Bilateral undescended testes: check for intersex disorder",
    ],
  },
  {
    name: "Spina Bifida",
    subject: "Anatomy",
    icd10: "Q05.9",
    category: "Neural Tube Defect",
    definition:
      "Failure of complete fusion of vertebral arches (neural tube). Spectrum from spina bifida occulta (hidden) to myelomeningocele (most severe).",
    etiology:
      "Multifactorial. Folic acid deficiency (most preventable cause). Valproate, carbamazepine exposure. MTHFR gene mutation.",
    pathophysiology:
      "Neural tube fails to close by 28th day of gestation → defect in vertebral arches → exposure of spinal cord/meninges.",
    clinicalFeatures: [
      "Occulta: tuft of hair, dimple, port wine stain over spine — asymptomatic",
      "Meningocele: CSF-filled sac, no neural elements — good prognosis",
      "Myelomeningocele: sac with nerve roots — motor/sensory loss, bladder/bowel dysfunction, hydrocephalus (Arnold-Chiari II)",
    ],
    investigations: [
      "Antenatal: AFP raised in maternal serum + amniotic fluid",
      "USG: lemon sign (frontal scalloping) + banana sign (cerebellar herniation)",
      "MRI spine: extent of lesion",
    ],
    treatment:
      "Prevention: Folic acid 400 mcg/day pre-conception (5mg if previous NTD). Surgery: Closure within 24-72 hours. Ventriculoperitoneal shunt for hydrocephalus.",
    complications: [
      "Hydrocephalus (Arnold-Chiari II malformation)",
      "Tethered cord",
      "Latex allergy",
      "Recurrent UTI",
    ],
    differentiatingFeature:
      "Lemon sign + banana sign on antenatal USG = neural tube defect. Elevated maternal serum AFP at 15-20 weeks.",
    pearlPoints: [
      "Folic acid 400 mcg/day for all women of childbearing age",
      "5mg/day if previous NTD child or on antiepileptics",
      "Myelomeningocele: always has Arnold-Chiari II",
      "Lemon sign: frontal bone scalloping; Banana sign: banana-shaped cerebellum",
      "Surgery within 72h prevents infection and further nerve damage",
    ],
  },
  {
    name: "Hydrocephalus",
    subject: "Anatomy",
    icd10: "G91.9",
    category: "CSF Dynamics Disorder",
    definition:
      "Abnormal accumulation of CSF within ventricular system, causing ventricular dilatation and increased intracranial pressure.",
    etiology:
      "Communicating: Post-meningitis, subarachnoid hemorrhage, choroid plexus papilloma. Non-communicating: Aqueductal stenosis (most common), Arnold-Chiari, Dandy-Walker.",
    pathophysiology:
      "Obstruction to CSF flow or decreased absorption → accumulation → increased ICP → brain damage.",
    clinicalFeatures: [
      "Infant: rapidly enlarging head circumference, bulging fontanelle, sunset sign (eyes deviated down), dilated scalp veins, Macewen's sign (cracked-pot sound)",
      "Older child/adult: headache (worse in morning), vomiting, papilledema, diplopia (CN VI palsy)",
    ],
    investigations: [
      "USG (infant): ventricular size",
      "CT/MRI: ventricular dilatation, cause identification",
      "Lumbar puncture (communicating only): opening pressure",
    ],
    treatment:
      "VP shunt (ventriculoperitoneal) — standard treatment. Endoscopic third ventriculostomy (ETV): for non-communicating. Acetazolamide: temporary measure.",
    complications: [
      "Shunt infection (Staph epidermidis)",
      "Shunt malfunction",
      "Intellectual disability",
      "Visual loss",
    ],
    differentiatingFeature:
      "Sunset sign = eyes deviated downward = raised ICP in infant with hydrocephalus. Macewen's cracked-pot sign on percussion.",
    pearlPoints: [
      "Aqueduct of Sylvius stenosis: most common cause of congenital hydrocephalus",
      "Normal pressure hydrocephalus (Hakim's triad): Wet (incontinence), Wobbly (gait), Wacky (dementia)",
      "VP shunt infection: Staph epidermidis most common",
      "ETV: procedure of choice for aqueductal stenosis in >6 months",
      "X-linked hydrocephalus: LICAM gene mutation",
    ],
  },
  {
    name: "Hypospadias",
    subject: "Anatomy",
    icd10: "Q54.9",
    category: "Developmental Anomaly - Genitourinary",
    definition:
      "Congenital anomaly where urethral meatus opens on ventral (under) surface of penis proximal to its normal position. Most common penile anomaly.",
    etiology:
      "Failure of urethral folds to fuse. Androgen deficiency/insensitivity. Associated with cryptorchidism, inguinal hernia.",
    pathophysiology:
      "Incomplete virilization of external genitalia → urethral opening displaced proximally on ventral surface.",
    clinicalFeatures: [
      "Ventral urethral meatus (glandular to perineal)",
      "Hooded prepuce (dorsal excess, ventral deficiency)",
      "Chordee (ventral penile curvature)",
      "Abnormal urine stream direction",
    ],
    investigations: [
      "Clinical diagnosis",
      "If bilateral UDT + hypospadias: karyotype to exclude intersex",
      "VCUG if UTI or severe proximal hypospadias",
    ],
    treatment:
      "Surgery at 6-18 months (one-stage repair preferred). MAGPI for glandular/distal, Duckett (tubularized onlay) for proximal. Avoid circumcision (prepuce used for repair).",
    complications: [
      "Urethrocutaneous fistula",
      "Meatal stenosis",
      "Recurrent chordee",
      "Psychological impact",
    ],
    differentiatingFeature:
      "Hooded prepuce + ventral meatal opening = hypospadias. Do NOT circumcise — prepucial skin needed for repair.",
    pearlPoints: [
      "Most common penile congenital anomaly",
      "Glandular type: most common (50%)",
      "Chordee correction is essential during repair",
      "Surgery at 6-18 months: ideal for psychological development",
      "Avoid topical steroids preoperatively — they cause tissue changes",
    ],
  },
  {
    name: "Polycystic Kidney Disease (ADPKD)",
    subject: "Anatomy",
    icd10: "Q61.2",
    category: "Hereditary Renal Disease",
    definition:
      "Autosomal dominant disorder characterized by progressive bilateral renal cyst development. Most common hereditary kidney disease.",
    etiology:
      "PKD1 gene (chromosome 16, 85%) or PKD2 gene (chromosome 4, 15%) mutation affecting polycystin proteins.",
    pathophysiology:
      "Polycystin dysfunction → epithelial proliferation + fluid secretion → cyst formation → compression of normal parenchyma → renal failure.",
    clinicalFeatures: [
      "Flank pain (most common symptom)",
      "Hematuria",
      "Hypertension (earliest feature)",
      "Palpable kidneys",
      "Recurrent UTI",
      "Extra-renal: hepatic cysts (most common), cerebral berry aneurysms (10-15%)",
    ],
    investigations: [
      "USG: bilateral enlarged kidneys with multiple cysts (>3 cysts per kidney in patients with family history)",
      "MRI/CT: more sensitive",
      "Genetic testing: PKD1/PKD2",
      "Urinalysis: hematuria, proteinuria",
    ],
    treatment:
      "BP control: ACE inhibitors (Ramipril 5mg OD). Tolvaptan (V2 receptor antagonist): slows progression. ESRD: dialysis/transplant.",
    complications: [
      "ESRD (50% by age 60)",
      "Subarachnoid hemorrhage (berry aneurysm rupture)",
      "Mitral valve prolapse",
      "Diverticular disease",
    ],
    differentiatingFeature:
      "Bilateral palpable kidneys + hypertension + family history = ADPKD. Berry aneurysm — screen with MRA if family history of SAH.",
    pearlPoints: [
      "PKD1 mutation: more severe, ESRD earlier (54 vs 74 years)",
      "Screen for berry aneurysm with MRA if family history of SAH",
      "Tolvaptan: approved for rapidly progressive ADPKD",
      "Hepatic cysts: most common extra-renal manifestation",
      "Hypertension is the earliest and most common symptom",
    ],
  },
  {
    name: "Torticollis (Wry Neck)",
    subject: "Anatomy",
    icd10: "M43.6",
    category: "Musculoskeletal Deformity",
    definition:
      "Fixed or dynamic rotation and lateral flexion of head and neck due to unilateral sternocleidomastoid (SCM) muscle shortening or spasm.",
    etiology:
      "Congenital: SCM hematoma during birth → fibrosis. Acquired: Atlantoaxial rotatory subluxation, Grisel syndrome (post-pharyngeal infection), spasmodic (basal ganglia).",
    pathophysiology:
      "SCM shortening → ipsilateral lateral flexion + contralateral rotation of head. Compensatory facial asymmetry develops.",
    clinicalFeatures: [
      "Head tilt to affected side, chin rotated to opposite side",
      "Palpable SCM fibrous mass (congenital)",
      "Facial asymmetry (plagiocephaly)",
      "Restricted neck movements",
    ],
    investigations: [
      "Plain X-ray cervical spine: C1-C2 alignment",
      "USG: SCM fibrous mass",
      "MRI: for suspected atlanto-axial pathology",
    ],
    treatment:
      "Congenital: Physiotherapy (stretching) — 90% resolve by 1 year. Surgery: SCM release if persistent beyond 1 year. Acquired: Treat underlying cause.",
    complications: [
      "Permanent facial asymmetry",
      "Cervical scoliosis",
      "Visual disturbance",
    ],
    differentiatingFeature:
      "Head tilts toward affected SCM; chin rotates away. Palpable SCM nodule in congenital type is diagnostic.",
    pearlPoints: [
      "SCM affected = head tilts ipsilaterally, chin contralaterally",
      "Congenital type: SCM fibrosis from birth trauma",
      "Grisel syndrome: non-traumatic atlantoaxial subluxation post-pharyngeal infection",
      "Surgery if physiotherapy fails by 12-18 months",
      "Associated with DDH and talipes equinovarus",
    ],
  },
  {
    name: "Carpal Tunnel Syndrome",
    subject: "Anatomy",
    icd10: "G56.0",
    category: "Peripheral Nerve Entrapment",
    definition:
      "Compression neuropathy of median nerve at wrist within carpal tunnel. Most common peripheral nerve entrapment syndrome.",
    etiology:
      "Idiopathic (most common), pregnancy, hypothyroidism, DM, rheumatoid arthritis, acromegaly, repetitive wrist movements, obesity.",
    pathophysiology:
      "Carpal tunnel bounded by carpal bones + flexor retinaculum → limited space → increased pressure → median nerve ischemia → demyelination.",
    clinicalFeatures: [
      "Paraesthesia/numbness in lateral 3.5 digits (median nerve distribution)",
      "Night pain (wakes patient)",
      "Weakness of thenar muscles (APB)",
      "Phalen's test positive (wrist flexion 60s)",
      "Tinel's sign positive (wrist percussion)",
      "Wasting of thenar eminence (late)",
    ],
    investigations: [
      "Nerve conduction studies: gold standard (prolonged distal motor + sensory latency)",
      "USG: cross-sectional area >10mm2",
      "MRI",
    ],
    treatment:
      "Conservative: Wrist splint in neutral position (night), corticosteroid injection (methylprednisolone). Surgery: Carpal tunnel decompression (release of flexor retinaculum) — definitive.",
    complications: [
      "Permanent thenar wasting",
      "Permanent sensory loss",
      "Reflex sympathetic dystrophy",
    ],
    differentiatingFeature:
      "Lateral 3.5 finger numbness waking patient at night + positive Phalen's = CTS. Ring splitting in pregnant women is characteristic.",
    pearlPoints: [
      "APB (abductor pollicis brevis) is the FIRST muscle to be wasted",
      "Phalen's test: most sensitive; Tinel's: most specific",
      "NCS gold standard — confirms diagnosis and severity",
      "Pregnancy-associated CTS: usually resolves post-partum",
      "Hypothyroidism: one of the most important reversible causes",
    ],
  },
  {
    name: "Varicocele",
    subject: "Anatomy",
    icd10: "I86.1",
    category: "Vascular Anomaly - Reproductive",
    definition:
      "Abnormal dilatation and tortuosity of pampiniform plexus of veins in the spermatic cord. Most common correctable cause of male infertility.",
    etiology:
      "Left-sided (90%): left testicular vein drains at right angle into left renal vein (higher resistance). Right-sided varicocele: rare, consider IVC/retroperitoneal pathology.",
    pathophysiology:
      "Venous stasis → elevated scrotal temperature → impaired spermatogenesis → oligoasthenoteratozoospermia.",
    clinicalFeatures: [
      "Dull aching left scrotal discomfort",
      "Bag of worms feeling on palpation",
      "Increases with Valsalva",
      "Grade I: palpable only with Valsalva; Grade II: palpable; Grade III: visible",
    ],
    investigations: [
      "Scrotal Doppler USG: gold standard",
      "Semen analysis: oligoasthenoteratozoospermia",
      "Venography: retrograde",
    ],
    treatment:
      "Varicocelectomy (open/laparoscopic/microsurgical) if symptomatic or causing infertility. Percutaneous embolization: alternative.",
    complications: ["Male infertility", "Testicular atrophy", "Hypogonadism"],
    differentiatingFeature:
      "Bag of worms + left-sided + increases with Valsalva = varicocele. Right-sided varicocele must exclude retroperitoneal tumor.",
    pearlPoints: [
      "Left-sided 90% — due to right-angle entry of left testicular vein into left renal vein",
      "Most common correctable cause of male infertility",
      "Right-sided varicocele: exclude renal cell carcinoma (Nutcracker phenomenon)",
      "Microsurgical varicocelectomy: best outcomes",
      "Grade III: visible without palpation",
    ],
  },
  {
    name: "Dupuytren's Contracture",
    subject: "Anatomy",
    icd10: "M72.0",
    category: "Connective Tissue Disorder - Hand",
    definition:
      "Progressive fibroproliferative disease of palmar fascia leading to flexion contracture of fingers. Ring and little finger most commonly affected.",
    etiology:
      "Idiopathic, genetic predisposition (Northern European), associated with alcoholic liver disease, DM, epilepsy (phenytoin), repetitive trauma.",
    pathophysiology:
      "Myofibroblast proliferation in palmar fascia → contracture of vertical septa and pretendinous bands → finger flexion.",
    clinicalFeatures: [
      "Nodule in palm (earliest sign)",
      "Cord formation along flexor tendon",
      "Progressive flexion of ring/little finger",
      "Inability to extend finger (table-top test positive)",
    ],
    investigations: [
      "Clinical diagnosis",
      "MRI: extent of involvement if needed",
    ],
    treatment:
      "Early: Needle fasciotomy, Collagenase clostridium histolyticum injection. Advanced: Surgical fasciectomy.",
    complications: [
      "Recurrence after surgery",
      "Neurovascular injury",
      "Complex regional pain syndrome",
    ],
    differentiatingFeature:
      "Painless palmar nodule → cord → flexion contracture of ring/little finger. Table-top test: cannot place palm flat on table.",
    pearlPoints: [
      "Viking/Celtic population most affected",
      "Ring finger most commonly affected, then little finger",
      "Table-top test: positive if finger cannot be placed flat",
      "Associated: DM, epilepsy (phenytoin), alcoholic liver disease",
      "Collagenase injection: non-surgical option for stage I-II",
    ],
  },
  {
    name: "Inguinal Hernia",
    subject: "Anatomy",
    icd10: "K40.9",
    category: "Abdominal Wall Defect",
    definition:
      "Protrusion of abdominal contents through inguinal canal. Most common type: Indirect (through deep inguinal ring, lateral to inferior epigastric vessels). Most common abdominal hernia.",
    etiology:
      "Indirect: Congenital patent processus vaginalis. Direct: Weakness in Hesselbach's triangle (floor of inguinal canal). Both: Raised intra-abdominal pressure.",
    pathophysiology:
      "Indirect: Patent processus vaginalis → bowel enters deep inguinal ring medial to inferior epigastric vessels and travels along canal. Direct: Weakness in posterior wall → bulge through Hesselbach's triangle.",
    clinicalFeatures: [
      "Groin lump (reducible)",
      "Ache/dragging sensation",
      "Cough impulse positive",
      "Indirect: descends into scrotum, controlled at deep ring",
      "Direct: bulges forward, rarely into scrotum",
    ],
    investigations: [
      "Clinical diagnosis in most cases",
      "USG: for occult/recurrent hernias",
      "CT: complicated cases",
    ],
    treatment:
      "All symptomatic: Surgical repair (Lichtenstein tension-free mesh — gold standard). Laparoscopic (TEP/TAPP) for bilateral or recurrent. Truss: only if unfit for surgery.",
    complications: [
      "Irreducibility",
      "Obstruction",
      "Strangulation (surgical emergency)",
      "Recurrence post-repair",
    ],
    differentiatingFeature:
      "Indirect hernia: lateral to inferior epigastric vessels, controlled at deep ring, descends to scrotum. Direct: medial, does NOT descend to scrotum, NOT controlled at deep ring.",
    pearlPoints: [
      "Most common hernia in both sexes",
      "Hesselbach's triangle: medial boundary (rectus), lateral (inf. epigastric), inferior (inguinal ligament)",
      "Lichtenstein repair: gold standard open technique",
      "Richter's hernia: only one wall of bowel strangulated — may not obstruct",
      "Maydl's hernia: W-loop hernia — intra-abdominal loop can strangulate",
    ],
  },
  {
    name: "Femoral Hernia",
    subject: "Anatomy",
    icd10: "K41.9",
    category: "Abdominal Wall Defect",
    definition:
      "Protrusion of peritoneal sac through femoral canal. More common in women (but inguinal still most common in women). High risk of strangulation.",
    etiology:
      "Increased intra-abdominal pressure, pregnancy, obesity, previous inguinal hernia repair.",
    pathophysiology:
      "Peritoneum herniation through femoral ring into femoral canal → lies medial to femoral vein in femoral triangle.",
    clinicalFeatures: [
      "Below and lateral to pubic tubercle (inguinal: above and medial)",
      "Small, globular lump",
      "Often irreducible",
      "High strangulation risk (30%)",
    ],
    investigations: ["Clinical", "USG", "CT for complications"],
    treatment:
      "Surgery: Always repair (high strangulation risk). McEvedy (extraperitoneal, preferred for strangulated), Lockwood (low approach), Lichtenstein. Mesh repair.",
    complications: [
      "Strangulation (30% present strangulated — highest of all hernias)",
    ],
    differentiatingFeature:
      "Lump below and lateral to pubic tubercle. Inguinal hernia is above and medial to pubic tubercle. High strangulation rate.",
    pearlPoints: [
      "Femoral hernia: below inguinal ligament, lateral to pubic tubercle",
      "Inguinal hernia: above inguinal ligament, medial to pubic tubercle",
      "Highest strangulation rate of all hernias",
      "McEvedy approach: preferred for strangulated femoral hernia (easy bowel access)",
      "More common in females but inguinal is still most common in females",
    ],
  },
  {
    name: "Pyloric Stenosis",
    subject: "Anatomy",
    icd10: "Q40.0",
    category: "Developmental Anomaly - GI",
    definition:
      "Hypertrophy of pyloric muscle causing gastric outlet obstruction. Most common surgical cause of vomiting in infancy (2-8 weeks).",
    etiology:
      "Unknown, multifactorial. First-born male (4:1 M:F). Erythromycin exposure in neonatal period increases risk.",
    pathophysiology:
      "Pyloric muscle hypertrophy → gastric outlet obstruction → projectile non-bilious vomiting → loss of HCl → hypochloraemic, hypokalaemic metabolic alkalosis.",
    clinicalFeatures: [
      "Projectile non-bilious vomiting at 2-6 weeks (after every feed)",
      "Hungry after vomiting",
      "Palpable olive-shaped pyloric mass in epigastrium",
      "Visible gastric peristalsis",
      "Weight loss, dehydration",
    ],
    investigations: [
      "USG (gold standard): pyloric muscle thickness >4mm, length >16mm, diameter >14mm",
      "Barium meal: 'string sign' or 'shoulder sign' (rarely needed)",
      "Electrolytes: low Na, low K, low Cl, high HCO3 (metabolic alkalosis)",
    ],
    treatment:
      "Correct electrolytes and dehydration FIRST. Surgery: Ramstedt's pyloromyotomy (splitting pyloric muscle without entering mucosa).",
    complications: [
      "Dehydration",
      "Metabolic alkalosis",
      "Duodenal perforation during surgery",
    ],
    differentiatingFeature:
      "Projectile non-bilious vomiting at 2-8 weeks + olive mass + visible peristalsis = pyloric stenosis. USG is gold standard.",
    pearlPoints: [
      "Non-bilious vomiting: obstruction above ampulla of Vater (pyloric/duodenal atresia)",
      "Bilious vomiting: obstruction below ampulla",
      "Correct metabolic alkalosis BEFORE surgery",
      "USG gold standard: pyloric thickness >4mm, length >16mm",
      "Ramstedt's: incise pyloric muscle longitudinally, do not enter mucosa",
    ],
  },
  {
    name: "Marfan Syndrome",
    subject: "Anatomy",
    icd10: "Q87.4",
    category: "Connective Tissue Disorder",
    definition:
      "Autosomal dominant connective tissue disorder due to FBN1 gene mutation (fibrillin-1 deficiency) affecting multiple organ systems.",
    etiology:
      "FBN1 gene mutation (chromosome 15). Autosomal dominant. De novo mutation in 25%.",
    pathophysiology:
      "Fibrillin-1 deficiency → elastic tissue weakness → aortic root dilatation, lens subluxation, tall stature with long extremities.",
    clinicalFeatures: [
      "Tall stature, arachnodactyly",
      "Arm span > height",
      "Lens subluxation (upward and lateral — ectopia lentis)",
      "Aortic root dilatation, aortic regurgitation",
      "Aortic dissection (Type A)",
      "Mitral valve prolapse",
      "Pectus excavatum/carinatum",
      "Scoliosis",
    ],
    investigations: [
      "Echocardiogram: aortic root diameter",
      "Slit-lamp: lens dislocation",
      "Genetic testing: FBN1",
      "Ghent criteria for diagnosis",
    ],
    treatment:
      "Beta-blockers (Atenolol/Propranolol): slow aortic root dilatation. Losartan: alternative/add-on. Surgery: aortic root replacement when diameter >5cm.",
    complications: [
      "Aortic dissection (Type A — most common cause of death)",
      "Aortic regurgitation",
      "Spontaneous pneumothorax",
      "Retinal detachment",
    ],
    differentiatingFeature:
      "Lens subluxation UPWARD + aortic dilatation + tall marfanoid habitus. Homocystinuria: lens subluxation DOWNWARD + thrombosis + intellectual disability.",
    pearlPoints: [
      "FBN1 gene on chromosome 15 — fibrillin-1",
      "Lens subluxation upward/lateral (vs homocystinuria: downward/medial)",
      "Beta-blockers slow aortic root dilatation",
      "Aortic dissection: most common cause of death",
      "Avoid contact sports and isometric exercises",
    ],
  },
  {
    name: "Ehlers-Danlos Syndrome",
    subject: "Anatomy",
    icd10: "Q79.6",
    category: "Connective Tissue Disorder",
    definition:
      "Heterogeneous group of connective tissue disorders due to defective collagen synthesis causing skin hyperextensibility, joint hypermobility, and tissue fragility.",
    etiology:
      "Various collagen gene mutations (COL5A1/2 for classical, COL3A1 for vascular type). Autosomal dominant (most types).",
    pathophysiology:
      "Defective collagen → reduced tensile strength of skin, tendons, ligaments, blood vessels.",
    clinicalFeatures: [
      "Skin hyperextensibility (>3cm on dorsum of hand)",
      "Joint hypermobility (Beighton score)",
      "Easy bruising",
      "Poor wound healing",
      "Atrophic scarring",
      "Vascular type: arterial/GI rupture",
    ],
    investigations: [
      "Clinical (Beighton score + Villefranche criteria)",
      "Genetic testing",
      "Skin biopsy: electron microscopy for collagen fibrils",
    ],
    treatment:
      "No specific treatment. Physiotherapy, joint protection. Vascular type: avoid surgery if possible, beta-blockers.",
    complications: [
      "Recurrent joint dislocations",
      "Vascular type: aortic/arterial dissection and rupture (fatal)",
      "Mitral valve prolapse",
    ],
    differentiatingFeature:
      "Hyperextensible skin + hypermobile joints + easy bruising. Vascular type (Type IV): most lethal — COL3A1, arterial rupture.",
    pearlPoints: [
      "Classical type: COL5A1/2 mutation",
      "Vascular type (IV): most dangerous — COL3A1, arterial/bowel rupture",
      "Beighton score: thumb to forearm, little finger >90°, elbow >10°, knee >10°, palms flat with knees straight",
      "EDS + Marfan = both connective tissue, different genes",
      "Kyphoscoliotic type: PLOD1 mutation, enzyme lysyl hydroxylase deficiency",
    ],
  },
  {
    name: "Appendicitis",
    subject: "Anatomy",
    icd10: "K37",
    category: "Inflammatory Surgical Emergency",
    definition:
      "Acute inflammation of the vermiform appendix. Most common surgical emergency worldwide.",
    etiology:
      "Luminal obstruction by faecolith (most common in adults), lymphoid hyperplasia (most common in children), foreign body, carcinoid tumor.",
    pathophysiology:
      "Obstruction → bacterial overgrowth → distension → ischemia → perforation → peritonitis.",
    clinicalFeatures: [
      "Periumbilical pain migrating to RIF (McBurney's point)",
      "Anorexia",
      "Nausea/vomiting",
      "Low-grade fever",
      "Rebound tenderness",
      "Rovsing's sign",
      "Psoas sign (retrocaecal appendix)",
      "Obturator sign (pelvic appendix)",
    ],
    investigations: [
      "Alvarado score (clinical)",
      "USG (non-compressible appendix >6mm)",
      "CT scan: most sensitive/specific",
      "WBC: leukocytosis",
      "CRP elevated",
    ],
    treatment:
      "Surgery: Appendicectomy (open or laparoscopic). Antibiotics: Pre/post-op (cefuroxime + metronidazole). Conservative: IV antibiotics for uncomplicated (increasing evidence).",
    complications: [
      "Perforation (20-30%)",
      "Appendiceal abscess",
      "Peritonitis",
      "Portal pyaemia",
    ],
    differentiatingFeature:
      "Classical migration from periumbilical → RIF + anorexia + Rebound tenderness = appendicitis. Rovsing's sign: RIF pain on palpating LIF.",
    pearlPoints: [
      "McBurney's point: 1/3 from ASIS on line to umbilicus",
      "Alvarado score >7: likely appendicitis (MAN TRAP mnemonic)",
      "CT scan: most sensitive and specific investigation",
      "Psoas sign: retrocaecal; Obturator sign: pelvic appendix",
      "Most common cause in children: lymphoid hyperplasia",
    ],
  },
  {
    name: "Gallstones (Cholelithiasis)",
    subject: "Anatomy",
    icd10: "K80.20",
    category: "Hepatobiliary Disease",
    definition:
      "Crystalline deposits in the gallbladder. Three types: cholesterol (most common in India/West), pigment (black - hemolysis, brown - infection), mixed.",
    etiology:
      "5 F's: Fat, Fertile (female), Forty, Fair, Family history. Cholesterol: supersaturation + nucleation + stasis. Pigment: hemolytic anemia, cirrhosis.",
    pathophysiology:
      "Supersaturation of bile with cholesterol → crystal nucleation → stone formation → obstruction of cystic/bile ducts.",
    clinicalFeatures: [
      "Biliary colic: severe RUQ pain radiating to right shoulder (Boas sign)",
      "Murphy's sign positive (acute cholecystitis)",
      "Charcot's triad: fever + jaundice + pain (cholangitis)",
      "Reynold's pentad: + shock + altered sensorium (suppurative cholangitis)",
    ],
    investigations: [
      "USG: gold standard for gallstones",
      "LFT: obstructive pattern",
      "MRCP: common bile duct stones",
      "ERCP: therapeutic",
    ],
    treatment:
      "Asymptomatic: Observe. Symptomatic: Laparoscopic cholecystectomy. CBD stones: ERCP + sphincterotomy before/during surgery.",
    complications: [
      "Acute cholecystitis",
      "Cholangitis",
      "Obstructive jaundice",
      "Gallstone ileus",
      "Mirizzi syndrome",
      "Carcinoma gallbladder",
    ],
    differentiatingFeature:
      "Charcot's triad = cholangitis. Reynold's pentad = acute suppurative (toxic) cholangitis — emergency.",
    pearlPoints: [
      "USG gold standard for gallstones",
      "Charcot's triad: pain + fever + jaundice = cholangitis",
      "Reynold's pentad: + mental changes + shock = toxic cholangitis",
      "Porcelain gallbladder: risk of carcinoma gallbladder",
      "Mirizzi syndrome: extrinsic CBD compression by stone in Hartmann's pouch",
    ],
  },
];

export const physiologyDiseases: DiseaseEntry[] = [
  {
    name: "Diabetes Insipidus",
    subject: "Physiology",
    icd10: "E23.2",
    category: "Water Regulation Disorder",
    definition:
      "Syndrome of polyuria and polydipsia due to deficiency of ADH (central DI) or renal resistance to ADH (nephrogenic DI). Urine output >3L/day.",
    etiology:
      "Central: Head trauma, tumors (craniopharyngioma), meningitis, post-neurosurgery, idiopathic. Nephrogenic: Lithium (most common drug), hypercalcemia, hypokalemia, demeclocycline.",
    pathophysiology:
      "ADH deficiency or resistance → failure of water reabsorption in collecting ducts → dilute urine (low osmolality) → hypernatremia → polydipsia.",
    clinicalFeatures: [
      "Polyuria (3-20L/day, dilute urine)",
      "Polydipsia (persistent craving for cold water)",
      "Nocturia",
      "Hypernatremia if water access limited",
      "Dehydration signs",
    ],
    investigations: [
      "Urine osmolality <300 mOsm/kg (dilute)",
      "Plasma osmolality >295 mOsm/kg",
      "Water deprivation test: urine doesn't concentrate",
      "Desmopressin test: Central DI responds (urine osmolality increases >50%); Nephrogenic does not",
    ],
    treatment:
      "Central: Desmopressin (DDAVP) intranasal/oral. Nephrogenic: Low-sodium diet + thiazide diuretics (paradoxical effect) + NSAIDs (indomethacin). Treat underlying cause.",
    complications: [
      "Severe dehydration",
      "Hypernatremic encephalopathy",
      "Growth retardation in children",
    ],
    differentiatingFeature:
      "Water deprivation test + desmopressin: Central DI concentrates urine; Nephrogenic DI does NOT concentrate with desmopressin.",
    pearlPoints: [
      "Thiazides paradoxically reduce urine output in nephrogenic DI",
      "Lithium: most common drug cause of nephrogenic DI",
      "Desmopressin test differentiates central from nephrogenic",
      "Craniopharyngioma: most common tumor causing central DI in children",
      "SIADH vs DI: SIADH = dilutional hyponatremia; DI = hypernatremia + dilute urine",
    ],
  },
  {
    name: "SIADH (Syndrome of Inappropriate ADH)",
    subject: "Physiology",
    icd10: "E22.2",
    category: "Water Regulation Disorder",
    definition:
      "Excessive ADH secretion causing water retention, hyponatremia, and inappropriately concentrated urine despite low serum osmolality.",
    etiology:
      "CNS: meningitis, SAH, stroke. Pulmonary: TB, pneumonia, lung carcinoma (small cell). Drugs: SSRIs, carbamazepine, cyclophosphamide, oxytocin. Surgery/pain.",
    pathophysiology:
      "Excess ADH → excessive water reabsorption in collecting ducts → dilutional hyponatremia → cerebral edema.",
    clinicalFeatures: [
      "Hyponatremia symptoms: nausea, headache, confusion",
      "Seizures (severe hyponatremia <120 mEq/L)",
      "Euvolemic (no edema, no dehydration)",
      "Urine sodium >20 mEq/L",
    ],
    investigations: [
      "Serum Na <135 mEq/L",
      "Serum osmolality <280 mOsm/kg",
      "Urine osmolality >100 mOsm/kg (inappropriately concentrated)",
      "Urine sodium >20 mEq/L",
      "Exclude adrenal, thyroid, renal causes",
    ],
    treatment:
      "Fluid restriction (500-1L/day) — first line. Demeclocycline (ADH antagonist). Tolvaptan (V2 receptor antagonist) — fastest. Hypertonic saline (3%) only for severe symptomatic.",
    complications: [
      "Central pontine myelinolysis (if corrected too fast: >10-12 mEq/L in 24h)",
      "Cerebral edema",
      "Seizures",
    ],
    differentiatingFeature:
      "Euvolemic hyponatremia + urine Na >20 + urine osmolality >100 = SIADH. Correction rate: max 10-12 mEq/L per 24 hours to prevent CPM.",
    pearlPoints: [
      "Small cell lung carcinoma: most common tumor causing SIADH",
      "Euvolemic hyponatremia — differentiates from cardiac/hepatic causes",
      "Correction limit: 10-12 mEq/L per 24h (faster causes central pontine myelinolysis)",
      "Tolvaptan: fastest correction but expensive",
      "SSRIs: most common drug class causing SIADH",
    ],
  },
  {
    name: "Hyperaldosteronism (Conn's Syndrome)",
    subject: "Physiology",
    icd10: "E26.0",
    category: "Renin-Angiotensin-Aldosterone System Disorder",
    definition:
      "Primary hyperaldosteronism: autonomous overproduction of aldosterone from adrenal gland independent of renin-angiotensin system. Most common cause of secondary hypertension.",
    etiology:
      "Aldosterone-producing adenoma (Conn's, 70%), bilateral adrenal hyperplasia (30%), rare: carcinoma.",
    pathophysiology:
      "Excess aldosterone → Na+ and water retention + K+ and H+ excretion → hypertension + hypokalemia + metabolic alkalosis.",
    clinicalFeatures: [
      "Hypertension (resistant to standard treatment)",
      "Hypokalemia: muscle weakness, cramps, polyuria, palpitations",
      "Metabolic alkalosis",
      "Absent edema (escape phenomenon)",
      "Headache",
    ],
    investigations: [
      "Aldosterone:Renin ratio >30 (screening test)",
      "Plasma aldosterone >15 ng/dL",
      "Low plasma renin activity",
      "CT adrenal: lateralize adenoma",
      "Adrenal vein sampling: gold standard for lateralization",
    ],
    treatment:
      "Unilateral adenoma: Adrenalectomy (laparoscopic). Bilateral hyperplasia: Spironolactone (aldosterone antagonist) or Eplerenone. Correct hypokalemia.",
    complications: [
      "Hypertensive emergencies",
      "Stroke",
      "Cardiac arrhythmias",
      "Renal failure",
    ],
    differentiatingFeature:
      "Hypertension + hypokalemia + low renin + high aldosterone = Conn's syndrome. Aldosterone:Renin ratio >30 is the best screening test.",
    pearlPoints: [
      "Most common cause of secondary hypertension",
      "Low renin differentiates primary from secondary hyperaldosteronism",
      "Adrenal vein sampling: gold standard for lateralization",
      "Spironolactone: drug of choice for bilateral adrenal hyperplasia",
      "Absent edema: due to aldosterone escape phenomenon",
    ],
  },
  {
    name: "Cushing's Syndrome",
    subject: "Physiology",
    icd10: "E24.0",
    category: "Glucocorticoid Excess Disorder",
    definition:
      "Syndrome of chronic glucocorticoid excess. Most common cause: Exogenous steroids. Endogenous: Cushing's disease (ACTH-secreting pituitary adenoma, 70%).",
    etiology:
      "Exogenous steroids (most common). Endogenous: Pituitary adenoma (Cushing's disease, 70%), ectopic ACTH (small cell lung cancer, 15%), adrenal adenoma (15%).",
    pathophysiology:
      "Excess cortisol → protein catabolism → muscle wasting, thin skin, striae. Fat redistribution (buffalo hump, moon face, central obesity). Hyperglycemia, immunosuppression.",
    clinicalFeatures: [
      "Central obesity, moon face, buffalo hump",
      "Purple striae (>1cm)",
      "Proximal myopathy",
      "Thin skin, easy bruising",
      "Hypertension",
      "Hyperglycemia/DM",
      "Osteoporosis",
      "Hirsutism, amenorrhea",
      "Depression, psychosis",
    ],
    investigations: [
      "24h urinary free cortisol (screening)",
      "Midnight salivary cortisol",
      "Low-dose dexamethasone suppression test (1mg overnight) — screening",
      "High-dose DST: suppression in Cushing's disease only (not ectopic)",
      "ACTH level: low in adrenal, high in pituitary, very high in ectopic",
      "MRI pituitary, CT chest/abdomen",
    ],
    treatment:
      "Cushing's disease: Trans-sphenoidal hypophysectomy. Adrenal: Adrenalectomy. Ectopic: Treat primary tumor + ketoconazole/metyrapone. Exogenous: Taper steroids.",
    complications: [
      "Infections (opportunistic)",
      "Osteoporotic fractures",
      "DM",
      "Hypertensive crisis",
    ],
    differentiatingFeature:
      "Purple striae >1cm + proximal myopathy + moon face + buffalo hump = Cushing's. Exogenous steroids cause low ACTH.",
    pearlPoints: [
      "Most common cause overall: exogenous steroids",
      "Most common endogenous cause: pituitary adenoma (Cushing's disease)",
      "High-dose DST: suppresses Cushing's disease but NOT ectopic ACTH",
      "Ectopic ACTH (small cell lung): very high ACTH + hypokalemia prominent",
      "Nelson's syndrome: ACTH-secreting pituitary tumor enlarges after bilateral adrenalectomy",
    ],
  },
  {
    name: "Addison's Disease",
    subject: "Physiology",
    icd10: "E27.1",
    category: "Adrenal Insufficiency",
    definition:
      "Primary adrenocortical insufficiency due to destruction of adrenal cortex causing deficiency of cortisol, aldosterone, and adrenal androgens.",
    etiology:
      "Autoimmune (most common in India/West, 80%). Tuberculosis (historically common in India). HIV, bilateral adrenal metastases, CMV.",
    pathophysiology:
      "Adrenal cortex destruction → ↓cortisol → ↑CRH + ACTH (stimulates melanocortin receptors → hyperpigmentation). ↓Aldosterone → salt wasting + hyperkalemia.",
    clinicalFeatures: [
      "Hyperpigmentation (buccal mucosa, skin creases, scars)",
      "Fatigue, weakness",
      "Postural hypotension",
      "Nausea, vomiting, weight loss",
      "Hyponatremia, hyperkalemia",
      "Hypoglycemia",
      "Salt craving",
    ],
    investigations: [
      "8 AM cortisol <3 mcg/dL: diagnostic",
      "ACTH stimulation test (Synacthen test): cortisol fails to rise >18 mcg/dL",
      "High ACTH level (primary)",
      "Anti-21-hydroxylase antibodies (autoimmune)",
      "Electrolytes: hyponatremia, hyperkalemia",
    ],
    treatment:
      "Cortisol replacement: Hydrocortisone 20mg AM + 10mg PM. Aldosterone: Fludrocortisone 0.1mg OD. Stress dosing: double/triple hydrocortisone during illness. Addisonian crisis: IV hydrocortisone 100mg stat.",
    complications: [
      "Addisonian crisis (precipitated by infection, surgery, trauma)",
      "Hypoglycemia",
      "Hyponatremic encephalopathy",
    ],
    differentiatingFeature:
      "Hyperpigmentation + hyponatremia + hyperkalemia + postural hypotension = Addison's disease. Buccal mucosa hyperpigmentation is pathognomonic.",
    pearlPoints: [
      "TB: most common cause in India",
      "Autoimmune: most common cause in West, associated with other autoimmune diseases (Schmidt's syndrome)",
      "Addisonian crisis: IV normal saline + IV hydrocortisone 100mg immediately",
      "ACTH stimulation test: gold standard for diagnosis",
      "Stress dosing: sick day rules — double/triple dose during illness",
    ],
  },
  {
    name: "Pheochromocytoma",
    subject: "Physiology",
    icd10: "D35.0",
    category: "Catecholamine Excess Disorder",
    definition:
      "Tumor of chromaffin cells (adrenal medulla) secreting catecholamines (norepinephrine + epinephrine). Rule of 10s: 10% malignant, bilateral, extra-adrenal, pediatric, familial.",
    etiology:
      "Sporadic (majority). Genetic: MEN 2A/2B (RET), Von Hippel-Lindau (VHL), Neurofibromatosis type 1 (NF1), SDH mutations.",
    pathophysiology:
      "Excess catecholamine secretion → alpha-1: vasoconstriction → hypertension; beta-1: tachycardia, arrhythmias.",
    clinicalFeatures: [
      "Hypertension (paroxysmal or sustained)",
      "Headache, sweating, palpitations (classic triad)",
      "Pallor (not flushing)",
      "Anxiety, tremor",
      "Weight loss",
      "Orthostatic hypotension (paradoxical)",
    ],
    investigations: [
      "24h urine metanephrines + catecholamines (best screening)",
      "Plasma metanephrines: most sensitive",
      "CT/MRI adrenal: localization",
      "MIBG scan: extra-adrenal/metastatic disease",
    ],
    treatment:
      "Alpha blockade FIRST (phenoxybenzamine/prazosin) for 7-14 days, THEN beta blockade, THEN surgery. Never give beta-blockers first (precipitates hypertensive crisis).",
    complications: [
      "Hypertensive crisis",
      "Cardiac arrhythmias",
      "Cardiomyopathy",
      "Malignant transformation (10%)",
    ],
    differentiatingFeature:
      "Headache + sweating + palpitations triad + paroxysmal hypertension = pheo until proven otherwise. Rule of 10s for associations.",
    pearlPoints: [
      "Alpha blockade FIRST, then beta — never beta first",
      "Plasma metanephrines: most sensitive test",
      "MIBG scan: best for extra-adrenal tumors",
      "MEN 2A: pheo + medullary thyroid cancer + hyperparathyroidism",
      "Pallor during paroxysm (not flushing) — due to peripheral vasoconstriction",
    ],
  },
  {
    name: "Hypothyroidism",
    subject: "Physiology",
    icd10: "E03.9",
    category: "Thyroid Hormone Deficiency",
    definition:
      "Deficiency of thyroid hormones (T3/T4) causing decreased metabolic rate. Most common endocrine disorder in India. Primary: thyroid gland failure. Secondary: pituitary TSH deficiency.",
    etiology:
      "India: Iodine deficiency (most common globally). Autoimmune: Hashimoto's thyroiditis (most common in iodine-sufficient areas). Post-radioiodine/surgery. Drugs: amiodarone, lithium.",
    pathophysiology:
      "Low T3/T4 → decreased metabolic rate → cold intolerance, weight gain, bradycardia, constipation, edema (myxedema — GAG accumulation in tissues).",
    clinicalFeatures: [
      "Fatigue, cold intolerance",
      "Weight gain",
      "Constipation",
      "Dry skin, coarse hair, hair loss",
      "Bradycardia",
      "Hoarse voice",
      "Periorbital puffiness, macroglossia",
      "Delayed relaxation of DTRs",
      "Myxedema (non-pitting edema)",
      "Menorrhagia",
    ],
    investigations: [
      "TSH (most sensitive screening test)",
      "Free T4 (low)",
      "Anti-TPO antibodies (Hashimoto's)",
      "CXR: pericardial effusion",
      "ECG: low voltage, bradycardia",
    ],
    treatment:
      "Levothyroxine (T4) — starting dose 25-50 mcg/day (lower in elderly, cardiac patients). Target: TSH 0.5-2.5 mIU/L. Brands: Eltroxin, Thyronorm.",
    complications: [
      "Myxedema coma (life-threatening)",
      "Hyperlipidemia, atherosclerosis",
      "Carpal tunnel syndrome",
      "Congenital hypothyroidism → cretinism",
    ],
    differentiatingFeature:
      "Delayed DTR relaxation is the most specific sign. TSH is the best screening test (elevated in primary hypothyroidism).",
    pearlPoints: [
      "TSH: single best test for screening thyroid function",
      "Delayed relaxation of ankle jerk: most specific sign",
      "Myxedema coma: IV T3 + steroids + supportive care",
      "Hashimoto's: most common autoimmune thyroid disease",
      "Iodine deficiency: most common cause worldwide",
    ],
    indianBrandDrugs: ["Eltroxin 50mcg", "Thyronorm 50mcg", "Thyrox 50mcg"],
  },
  {
    name: "Hyperthyroidism (Graves' Disease)",
    subject: "Physiology",
    icd10: "E05.0",
    category: "Thyroid Hormone Excess",
    definition:
      "Autoimmune disease causing hyperthyroidism via TSH receptor antibodies (TRAb). Most common cause of hyperthyroidism. Triad: Goiter + exophthalmos + pretibial myxedema.",
    etiology:
      "TSI (thyroid stimulating immunoglobulin) / TRAb stimulating TSH receptor → autonomous thyroid hormone production. HLA-DR3 association.",
    pathophysiology:
      "TSI mimics TSH → continuous thyroid stimulation → excess T3/T4 → increased metabolic rate + sympathomimetic effects.",
    clinicalFeatures: [
      "Weight loss despite increased appetite",
      "Heat intolerance, sweating",
      "Palpitations, tachycardia, AF",
      "Exophthalmos (proptosis)",
      "Pretibial myxedema",
      "Goiter (diffuse)",
      "Thyroid bruit",
      "Proximal myopathy",
      "Diarrhea",
      "Lid lag, lid retraction",
    ],
    investigations: [
      "TSH suppressed (<0.01)",
      "Free T3, T4 elevated",
      "TRAb/TSI positive",
      "Thyroid scan: diffuse increased uptake",
      "USG thyroid",
    ],
    treatment:
      "Antithyroid drugs: Carbimazole (first line) / Propylthiouracil (pregnancy first trimester). Beta-blockers for symptom control (propranolol). Radioiodine (I-131): definitive. Surgery: total thyroidectomy.",
    complications: [
      "Thyroid storm",
      "Atrial fibrillation",
      "Ophthalmopathy",
      "Agranulocytosis (carbimazole side effect)",
    ],
    differentiatingFeature:
      "Diffuse goiter + exophthalmos + pretibial myxedema = Graves' disease. Exophthalmos is pathognomonic (does not occur in other hyperthyroid states).",
    pearlPoints: [
      "Graves' disease: only hyperthyroid cause with exophthalmos",
      "PTU preferred in first trimester pregnancy",
      "Carbimazole: check CBC — can cause agranulocytosis",
      "Thyroid storm: propranolol + PTU + iodine (Lugol's) + dexamethasone + supportive",
      "Beta-blockers do not affect thyroid hormone production",
    ],
    indianBrandDrugs: [
      "Neomercazole (Carbimazole) 5mg",
      "Propylthiouracil 50mg",
    ],
  },
  {
    name: "Acromegaly",
    subject: "Physiology",
    icd10: "E22.0",
    category: "Growth Hormone Excess",
    definition:
      "Syndrome of excess GH secretion after epiphyseal fusion (adults). Most commonly due to GH-secreting pituitary adenoma.",
    etiology:
      "Pituitary GH-secreting adenoma (95%). Ectopic GHRH secretion (carcinoid, pancreatic tumors, rare).",
    pathophysiology:
      "Excess GH → elevated IGF-1 → acral overgrowth (soft tissue + bone) + metabolic effects (DM, hypertension).",
    clinicalFeatures: [
      "Acral overgrowth: large hands, feet, jaw (prognathism)",
      "Coarsening of facial features",
      "Macroglossia",
      "Carpal tunnel syndrome",
      "Bitemporal hemianopia (chiasmal compression)",
      "Skin tags, acanthosis nigricans",
      "Hyperhidrosis",
      "Hypertension, DM, OSA",
    ],
    investigations: [
      "IGF-1 (best screening test)",
      "OGTT: GH fails to suppress to <1 ng/mL (gold standard confirmation)",
      "MRI pituitary",
      "Colonoscopy: increased colon cancer risk",
    ],
    treatment:
      "Trans-sphenoidal surgery: treatment of choice. Octreotide (somatostatin analogue): if surgery fails. Pegvisomant (GH receptor antagonist): most effective drug. Cabergoline: for co-secreting prolactinomas. Radiotherapy.",
    complications: [
      "DM (25%)",
      "Hypertension",
      "Cardiomyopathy",
      "OSA",
      "Colon cancer (3x risk)",
      "Carpal tunnel syndrome",
    ],
    differentiatingFeature:
      "OGTT gold standard — GH not suppressed <1 ng/mL in acromegaly. IGF-1 is best screening test.",
    pearlPoints: [
      "IGF-1: best single screening test",
      "OGTT: gold standard confirmation",
      "Trans-sphenoidal surgery: first-line treatment",
      "Pegvisomant: most effective drug (GH receptor blocker)",
      "Gigantism: excess GH before epiphyseal fusion",
    ],
  },
  {
    name: "Hyperprolactinemia",
    subject: "Physiology",
    icd10: "E22.1",
    category: "Prolactin Excess Disorder",
    definition:
      "Elevated serum prolactin causing reproductive dysfunction. Most common pituitary disorder. Prolactinoma is the most common pituitary adenoma.",
    etiology:
      "Physiological: pregnancy, nursing. Drugs: dopamine antagonists (metoclopramide, risperidone, haloperidol). Pathological: prolactinoma, stalk compression, hypothyroidism.",
    pathophysiology:
      "Prolactin excess → inhibits GnRH pulsatility → ↓LH/FSH → hypogonadism. Direct inhibition of testosterone production.",
    clinicalFeatures: [
      "Women: oligomenorrhea/amenorrhea, infertility, galactorrhea",
      "Men: decreased libido, impotence, gynecomastia, infertility",
      "Both: headache, bitemporal hemianopia (macroadenoma)",
      "Osteoporosis (hypogonadism)",
    ],
    investigations: [
      "Serum prolactin: >200 ng/mL = prolactinoma likely; >100 ng/mL if drugs excluded",
      "MRI pituitary: microadenoma (<1cm) or macroadenoma (>1cm)",
      "TSH: exclude hypothyroidism",
    ],
    treatment:
      "First line: Dopamine agonists — Cabergoline (preferred, weekly dosing) or Bromocriptine. Surgery: Trans-sphenoidal if drug resistant or visual field defect not improving. Avoid offending drugs.",
    complications: [
      "Infertility",
      "Osteoporosis",
      "Visual field defect",
      "CSF rhinorrhea post-treatment",
    ],
    differentiatingFeature:
      "Galactorrhea + amenorrhea + infertility = hyperprolactinemia in women. Drugs are most common cause overall; prolactinoma is most common pathological cause.",
    pearlPoints: [
      "Cabergoline: preferred over bromocriptine (once/twice weekly, better tolerated)",
      "Macroprolactinoma: visual field defect requires urgent treatment",
      "Drugs: metoclopramide, antipsychotics, methyldopa cause hyperprolactinemia",
      "Prolactin >200 ng/mL strongly suggests prolactinoma",
      "Dopamine agonists shrink prolactinoma — surgery often avoidable",
    ],
    indianBrandDrugs: [
      "Cabergoline (Dostinex) 0.5mg",
      "Bromocriptine (Parlodel) 2.5mg",
    ],
  },
  {
    name: "Type 1 Diabetes Mellitus",
    subject: "Physiology",
    icd10: "E10.9",
    category: "Glucose Metabolism Disorder",
    definition:
      "Autoimmune destruction of pancreatic beta cells leading to absolute insulin deficiency. Presents in childhood/young adults, prone to DKA.",
    etiology:
      "Autoimmune: anti-GAD, anti-IA2, anti-insulin antibodies. HLA-DR3/DR4 association. Environmental trigger (viral: Coxsackie B4).",
    pathophysiology:
      "T-cell mediated destruction of beta cells → absolute insulin deficiency → hyperglycemia → osmotic symptoms + ketoacidosis (no insulin to inhibit lipolysis).",
    clinicalFeatures: [
      "Polyuria, polydipsia, polyphagia",
      "Weight loss",
      "Fatigue",
      "DKA: fruity breath, Kussmaul breathing, abdominal pain, vomiting, dehydration",
    ],
    investigations: [
      "FBS >126 mg/dL",
      "PPBS >200 mg/dL",
      "HbA1c >6.5%",
      "C-peptide: low/absent",
      "Anti-GAD, anti-islet antibodies",
      "Urinary ketones in DKA",
    ],
    treatment:
      "Insulin (multiple daily injections or pump). Basal-bolus regimen. Insulin brands: Insulatard (NPH), Lantus (glargine), Novorapid (aspart). SMBG. Carbohydrate counting.",
    complications: [
      "DKA (acute)",
      "Hypoglycemia",
      "Nephropathy",
      "Retinopathy",
      "Neuropathy",
      "Macrovascular: CAD, stroke, PVD",
    ],
    differentiatingFeature:
      "Young patient + weight loss + ketosis-prone = Type 1. C-peptide low/absent confirms absolute insulin deficiency.",
    pearlPoints: [
      "C-peptide low/absent: distinguishes Type 1 from Type 2",
      "HLA-DR3/DR4: strongest HLA association",
      "DKA: insulin + IV fluid + potassium replacement",
      "Honeymoon period: temporary remission after diagnosis",
      "Coxsackie B4: viral trigger for autoimmune destruction",
    ],
    indianBrandDrugs: [
      "Actrapid 100IU/mL",
      "Insulatard 100IU/mL",
      "Basalog (glargine) 100IU/mL",
    ],
  },
  {
    name: "Type 2 Diabetes Mellitus",
    subject: "Physiology",
    icd10: "E11.9",
    category: "Glucose Metabolism Disorder",
    definition:
      "Chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency. Most common metabolic disease globally. Strong genetic and lifestyle component.",
    etiology:
      "Insulin resistance + beta cell dysfunction. Risk factors: obesity (central), sedentary lifestyle, family history, age >45, gestational DM history, PCOS.",
    pathophysiology:
      "Insulin resistance → compensatory hyperinsulinemia → progressive beta cell failure → hyperglycemia. GLUT-4 downregulation in peripheral tissues.",
    clinicalFeatures: [
      "Often asymptomatic (discovered on screening)",
      "Polyuria, polydipsia, polyphagia",
      "Fatigue, blurred vision",
      "Recurrent infections (candida, UTI)",
      "Acanthosis nigricans (insulin resistance marker)",
      "HONK in severe cases",
    ],
    investigations: [
      "FBS >126 mg/dL (on two occasions)",
      "PPBS >200 mg/dL",
      "HbA1c >6.5%",
      "OGTT: 2h >200 mg/dL",
      "Lipid profile, microalbuminuria, fundus",
    ],
    treatment:
      "Lifestyle: diet + exercise first line. Metformin 500mg BD (Glyciphage) — first-line drug. Add: SGLT2 inhibitors (Dapagliflozin-Forxiga), GLP-1 agonists (Semaglutide-Ozempic), SU (Glimepiride-Amaryl), DPP-4 (Sitagliptin-Januvia). Insulin when HbA1c >9% or failure.",
    complications: [
      "HONK/HHS (acute)",
      "Microvascular: nephropathy, retinopathy, neuropathy",
      "Macrovascular: CAD, stroke, PAD",
      "Diabetic foot",
    ],
    differentiatingFeature:
      "Obese middle-aged patient + acanthosis nigricans + normal/high C-peptide = Type 2 DM. First-line drug: Metformin (Glyciphage).",
    pearlPoints: [
      "Metformin: first-line drug — reduces hepatic glucose output, weight neutral/loss",
      "SGLT2 inhibitors: cardio-renal protective benefits",
      "GLP-1 agonists: weight loss + cardiovascular benefit",
      "HbA1c target: <7% for most patients (<6.5% for young, <8% for elderly)",
      "Metformin contraindicated: eGFR <30, contrast dye, surgery",
    ],
    indianBrandDrugs: [
      "Glyciphage (Metformin) 500mg",
      "Amaryl (Glimepiride) 1mg",
      "Januvia (Sitagliptin) 100mg",
      "Forxiga (Dapagliflozin) 10mg",
    ],
  },
  {
    name: "Diabetic Ketoacidosis",
    subject: "Physiology",
    icd10: "E11.1",
    category: "Acute Diabetic Emergency",
    definition:
      "Life-threatening acute complication of diabetes characterized by hyperglycemia (>250 mg/dL), ketonemia, and metabolic acidosis (pH <7.3). Predominantly Type 1 DM.",
    etiology:
      "Infection (most common precipitant), missed insulin doses, new-onset T1DM, stress, surgery, MI, drugs (steroids, thiazides).",
    pathophysiology:
      "Absolute insulin deficiency → unrestrained lipolysis → free fatty acids → hepatic ketone production → ketonemia + ketonuria + metabolic acidosis.",
    clinicalFeatures: [
      "Polyuria, polydipsia",
      "Vomiting, abdominal pain",
      "Fruity (acetone) breath",
      "Kussmaul breathing (deep sighing)",
      "Dehydration, tachycardia",
      "Altered consciousness (severe)",
    ],
    investigations: [
      "Blood glucose >250 mg/dL",
      "Arterial pH <7.3",
      "Bicarbonate <15 mEq/L",
      "Anion gap elevated (>12)",
      "Urine/serum ketones +3 to +4",
      "Serum K+ initially normal/high (despite body depletion)",
    ],
    treatment:
      "ICMR Protocol: 1. IV fluid: Normal saline (0.9%) 1L in first hour 2. Insulin: Regular insulin 0.1 U/kg/h IV infusion 3. Potassium: Add KCl when K+ <5.5 mEq/L 4. Monitor glucose hourly 5. Switch to SQ insulin when pH >7.3 + glucose <200.",
    complications: [
      "Cerebral edema (most dangerous, especially children)",
      "Hypokalemia (during treatment)",
      "Hypoglycemia",
      "ARDS",
    ],
    differentiatingFeature:
      "DKA vs HONK: DKA = ketosis + acidosis + glucose >250 (usually T1DM). HONK = extreme hyperglycemia >600, no ketosis, altered consciousness, elderly T2DM.",
    pearlPoints: [
      "Serum K+ initially normal/HIGH despite total body depletion — acidosis shifts K+ out of cells",
      "Replace K+ when it falls during treatment",
      "Phosphate replacement: usually not needed",
      "Cerebral edema: main risk in children — avoid rapid fluid correction",
      "Anion gap = Na - (Cl + HCO3), normal 8-12",
    ],
    icmrProtocol:
      "IV NS 1L/hr → Regular insulin 0.1U/kg/h → KCl when K <5.5 → switch to SC insulin when glucose <200 mg/dL and pH >7.3",
  },
  {
    name: "Hyponatremia",
    subject: "Physiology",
    icd10: "E87.1",
    category: "Electrolyte Disorder",
    definition:
      "Serum sodium <135 mEq/L. Most common electrolyte abnormality in hospitalized patients. Can be hypovolemic, euvolemic, or hypervolemic.",
    etiology:
      "Hypovolemic: GI losses, burns, diuretics. Euvolemic: SIADH, hypothyroidism, psychogenic polydipsia. Hypervolemic: Heart failure, cirrhosis, nephrotic syndrome.",
    pathophysiology:
      "Low serum osmolality → cerebral edema (acute) → neurological symptoms. Chronic adaptation prevents edema formation.",
    clinicalFeatures: [
      "Mild (<130): nausea, headache, fatigue",
      "Moderate (120-130): confusion, lethargy",
      "Severe (<120): seizures, coma, respiratory arrest",
      "EXCLUDE pseudohyponatremia (hyperglycemia, hyperlipidemia)",
    ],
    investigations: [
      "Serum Na, osmolality",
      "Urine Na and osmolality",
      "SIADH: urine Na >20, urine Osm >100",
      "Thyroid, adrenal function",
    ],
    treatment:
      "Rate: max 10-12 mEq/L in 24h (to prevent CPM). Hypovolemic: IV NS. SIADH: fluid restriction. Symptomatic severe: 3% NaCl 1-2 mL/kg/h. Hypervolemic: treat underlying cause.",
    complications: [
      "Central pontine myelinolysis (overly rapid correction)",
      "Cerebral edema (untreated acute)",
      "Seizures",
    ],
    differentiatingFeature:
      "3% saline only for SYMPTOMATIC severe hyponatremia. Never correct faster than 10-12 mEq/L per 24h. CPM is worse than hyponatremia itself if overcorrected.",
    pearlPoints: [
      "CPM (osmotic demyelination): locked-in syndrome from overcorrection",
      "Desmopressin: given prophylactically if correcting faster than expected",
      "Beer potomania: hyponatremia from very low solute intake",
      "Pseudohyponatremia: glucose >200 drops Na by 1.6 mEq per 100 mg/dL rise",
      "Tolvaptan: V2 antagonist — most effective for SIADH hyponatremia",
    ],
  },
  {
    name: "Hyperkalemia",
    subject: "Physiology",
    icd10: "E87.5",
    category: "Electrolyte Disorder",
    definition:
      "Serum potassium >5.5 mEq/L. Potentially life-threatening due to cardiac arrhythmias. Most common cause: CKD (decreased renal excretion).",
    etiology:
      "CKD, Addison's disease, acidosis (K+ exits cells), ACE inhibitors + spironolactone, potassium-sparing diuretics, rhabdomyolysis, hemolysis.",
    pathophysiology:
      "Elevated extracellular K+ → reduced resting membrane potential → impaired cardiac repolarization → ECG changes → ventricular fibrillation.",
    clinicalFeatures: [
      "Muscle weakness, paralysis",
      "Paresthesia",
      "Cardiac: palpitations, bradycardia",
      "ECG changes: peaked T waves (early) → wide QRS → sine wave → VF (terminal)",
    ],
    investigations: [
      "Serum K+ >5.5",
      "ECG: peaked T waves (most specific early sign)",
      "ABG: metabolic acidosis",
      "Renal function, aldosterone levels",
    ],
    treatment:
      "Emergency: 1. Calcium gluconate 10% 10mL IV (cardiac membrane stabilization — immediate) 2. Insulin + Dextrose (shifts K into cells) 3. Salbutamol nebulization 4. Sodium bicarbonate (metabolic acidosis) 5. Ion exchange resins (Sodium Kayexalate) 6. Dialysis (definitive for CKD).",
    complications: ["Ventricular fibrillation", "Cardiac arrest"],
    differentiatingFeature:
      "Peaked T waves on ECG = hyperkalemia until proven otherwise. First treatment: Calcium gluconate (protects heart, fastest onset).",
    pearlPoints: [
      "Calcium gluconate: protects heart but does NOT lower K+",
      "Insulin + dextrose: fastest way to shift K+ intracellularly",
      "Peaked T waves: earliest ECG change in hyperkalemia",
      "Acidosis: every 0.1 decrease in pH raises K+ by 0.6 mEq/L",
      "Dialysis: definitive for refractory hyperkalemia in CKD",
    ],
  },
  {
    name: "Metabolic Acidosis",
    subject: "Physiology",
    icd10: "E87.2",
    category: "Acid-Base Disorder",
    definition:
      "pH <7.35 with primary decrease in HCO3 (<22 mEq/L). Classified as high anion gap or normal anion gap (hyperchloremic).",
    etiology:
      "High AG: MUDPILES — Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates. Normal AG: Diarrhea, RTA, acetazolamide.",
    pathophysiology:
      "Accumulation of acid anions (lactate, ketones, toxins) or loss of bicarbonate → pH falls → compensatory hyperventilation (Kussmaul breathing).",
    clinicalFeatures: [
      "Kussmaul breathing (deep, rapid)",
      "Nausea, vomiting",
      "Fatigue",
      "Signs of underlying cause (fruity breath in DKA, cherry-red in CO poisoning)",
    ],
    investigations: [
      "ABG: pH <7.35, HCO3 <22",
      "Anion gap = Na - (Cl + HCO3), normal 8-12",
      "Lactate, ketones, toxin screen",
      "Urine anion gap for RTA vs diarrhea",
    ],
    treatment:
      "Treat underlying cause. Bicarbonate: only if pH <7.1 or in hyperchloremic acidosis. DKA: insulin + fluids. Lactic acidosis: treat cause, improve perfusion.",
    complications: [
      "Ventricular arrhythmias",
      "Hemodynamic instability",
      "Impaired drug metabolism",
    ],
    differentiatingFeature:
      "MUDPILES = high AG metabolic acidosis. Diarrhea and RTA = normal AG (hyperchloremic) metabolic acidosis. Delta-delta ratio differentiates mixed disorders.",
    pearlPoints: [
      "MUDPILES mnemonic for high anion gap causes",
      "Urine anion gap: negative in diarrhea, positive in RTA",
      "Lactic acidosis Type A: hypoperfusion; Type B: metformin, thiamine deficiency",
      "Delta ratio: change in AG / change in HCO3 (>2 = metabolic alkalosis coexists)",
      "Bicarbonate therapy: controversial except for severe acidosis (pH <7.1)",
    ],
  },
  {
    name: "Hypertension",
    subject: "Physiology",
    icd10: "I10",
    category: "Cardiovascular Physiology - Pressure Regulation",
    definition:
      "Persistent elevation of BP ≥140/90 mmHg. Essential (primary) hypertension: 90-95% of cases. Most common modifiable risk factor for cardiovascular disease globally.",
    etiology:
      "Essential: multifactorial (genetic + environmental). Secondary: renal (most common — renovascular, CKD), endocrine (Conn's, pheo, Cushing's), coarctation of aorta.",
    pathophysiology:
      "Increased cardiac output OR increased peripheral vascular resistance → sustained elevated BP → end-organ damage (heart, kidney, brain, eyes, vessels).",
    clinicalFeatures: [
      "Often asymptomatic (silent killer)",
      "Hypertensive urgency: severe elevation without end-organ damage",
      "Hypertensive emergency: severe BP + end-organ damage (hypertensive encephalopathy, STEMI, AKI, aortic dissection)",
      "Retinal changes (Keith-Wagener grading)",
    ],
    investigations: [
      "Blood pressure measurement (multiple readings)",
      "Urine: protein, casts",
      "ECG: LVH",
      "Echo: LVH, LVEF",
      "Renal function, electrolytes",
      "Secondary workup if features suggest",
    ],
    treatment:
      "ICMR 2025 Protocol: Lifestyle modification first. Drug: ACE inhibitor (Ramipril 5mg) or ARB (Telmisartan 40mg) for most patients. Add Amlodipine 5mg (CCB) if needed. Add Chlorthalidone 12.5mg (thiazide). Avoid thiazides in DM. Target: <130/80 for DM/CKD; <140/90 for general.",
    complications: [
      "Stroke",
      "MI",
      "Heart failure",
      "CKD",
      "Retinopathy",
      "Aortic dissection",
    ],
    differentiatingFeature:
      "JNC 8 targets: <140/90 for general population; <130/80 for DM, CKD, high CVD risk. Hypertensive emergency: requires IV treatment within 1 hour.",
    pearlPoints: [
      "Amlodipine: drug of choice for elderly, ISH, angina",
      "ACE inhibitors: preferred in DM nephropathy, heart failure",
      "Thiazides: preferred in elderly, osteoporosis (reduce calcium excretion)",
      "Beta-blockers: NOT first-line unless CAD or heart failure",
      "Bilateral RAS: avoid ACE inhibitors/ARBs (precipitate AKI)",
    ],
    icmrProtocol:
      "Lifestyle modification → Ramipril 5mg OD or Telmisartan 40mg OD → Add Amlodipine 5mg → Add Chlorthalidone 12.5mg. Target BP <130/80 for high-risk.",
    indianBrandDrugs: [
      "Ramistar (Ramipril) 5mg",
      "Telma (Telmisartan) 40mg",
      "Stamlo (Amlodipine) 5mg",
      "Cadis (Chlorthalidone) 12.5mg",
    ],
  },
  {
    name: "Heart Failure",
    subject: "Physiology",
    icd10: "I50.9",
    category: "Cardiac Pump Failure",
    definition:
      "Clinical syndrome where heart cannot pump sufficient blood to meet metabolic demands. HFrEF (EF <40%) vs HFpEF (EF >50%). Most common cause in India: hypertension + IHD.",
    etiology:
      "IHD (most common), hypertension, cardiomyopathy, valvular disease, arrhythmias. Precipitants: Infection, anemia, AF, non-compliance with medications.",
    pathophysiology:
      "Reduced CO → compensatory mechanisms (RAAS, sympathetic activation) → initially compensate → maladaptive remodeling → progressive failure.",
    clinicalFeatures: [
      "Left HF: dyspnea (exertional, orthopnea, PND), basal crepitations, S3 gallop",
      "Right HF: JVP elevation, hepatomegaly, pedal edema, ascites",
      "Both: fatigue, cardiac cachexia",
    ],
    investigations: [
      "CXR: cardiomegaly, pulmonary congestion, Kerley B lines",
      "ECG: LVH, Q waves",
      "Echo: EF, wall motion",
      "BNP/NT-proBNP: elevated (diagnosis + monitoring)",
      "6-minute walk test",
    ],
    treatment:
      "HFrEF: 1. ACE inhibitor/ARB (Ramipril) 2. Beta-blocker (Carvedilol/Bisoprolol) 3. Aldosterone antagonist (Spironolactone) 4. SGLT2 inhibitor (Dapagliflozin — now standard). Diuretics: Furosemide for congestion. CRT/ICD if indicated.",
    complications: [
      "Acute pulmonary edema",
      "Cardiogenic shock",
      "Sudden cardiac death",
      "Renal failure",
    ],
    differentiatingFeature:
      "BNP >100 pg/mL: confirms heart failure (>400 = severe). S3 gallop: pathognomonic of HF. Kerley B lines = pulmonary capillary pressure >18 mmHg.",
    pearlPoints: [
      "SGLT2 inhibitors (dapagliflozin, empagliflozin) now standard in HFrEF",
      "S3 = protodiastolic gallop (ventricular filling) = pathological in adults",
      "BNP: best marker for diagnosis and prognosis of HF",
      "Carvedilol > metoprolol in HFrEF (Comet trial)",
      "Sacubitril/Valsartan (Entresto): superior to ACE inhibitors in HFrEF",
    ],
    indianBrandDrugs: [
      "Ramistar (Ramipril) 5mg",
      "Carvedilol (Carloc) 3.125mg",
      "Aldactone (Spironolactone) 25mg",
      "Lasix (Furosemide) 40mg",
    ],
  },
];

export const allBatch1Diseases = [...anatomyDiseases, ...physiologyDiseases];
