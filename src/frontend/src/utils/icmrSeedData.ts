import type { Disease } from "../backend.d";

export const icmrDiseaseData: Disease[] = [
  // ══════════════════════════════════════════════════════════════
  // COMMUNICABLE DISEASES
  // ══════════════════════════════════════════════════════════════

  {
    id: "malaria-falciparum",
    name: "Malaria (Plasmodium falciparum)",
    category: "Communicable",
    icd10Code: "B50",
    description:
      "Severe malaria caused by Plasmodium falciparum — most lethal species. India ke high-burden states (Odisha, Jharkhand, Chhattisgarh) mein prevalent. Cerebral malaria, severe anaemia, multi-organ failure ka risk.",
    subjectMapping: [
      "Medicine",
      "Pharmacology",
      "Microbiology",
      "Parasitology",
    ],
    diagnosticCriteria:
      "Thick & thin blood smear: P. falciparum ring forms + gametocytes. RDT: HRP-2 antigen positive. PCR confirmation in low-parasitemia cases. CBC: thrombocytopenia, anaemia. LFT/RFT if severe malaria suspected. WHO severe malaria criteria: parasitemia >5%, cerebral malaria, severe anaemia (Hb<7), renal failure, pulmonary oedema, hypoglycaemia.",
    associatedDiseases: [
      "Dengue",
      "Typhoid",
      "Blackwater fever",
      "Severe anaemia",
      "Cerebral malaria",
    ],
    clinicalSigns: {
      bp: "90/60 mmHg",
      hr: "110 bpm",
      temp: "103-105°F",
      rr: "24/min",
      spo2: "94%",
    },
    symptoms: [
      {
        name: "High-grade Fever",
        severity: BigInt(8),
        description:
          "Classic periodic fever — quotidian pattern (every 48 hrs). Spiking 103-105°F with rigors.",
      },
      {
        name: "Severe Chills & Rigors",
        severity: BigInt(7),
        description:
          "Paroxysmal shaking chills lasting 15-60 minutes before fever spike.",
      },
      {
        name: "Headache",
        severity: BigInt(7),
        description:
          "Severe frontal/retroorbital headache, can progress to confusion in cerebral malaria.",
      },
      {
        name: "Nausea & Vomiting",
        severity: BigInt(6),
        description:
          "Persistent nausea, projectile vomiting, inability to retain oral medications.",
      },
      {
        name: "Splenomegaly",
        severity: BigInt(5),
        description:
          "Tender, enlarged spleen — palpable in chronic/repeated infections.",
      },
      {
        name: "Jaundice",
        severity: BigInt(6),
        description:
          "Haemolytic jaundice — scleral icterus, dark urine (haemoglobinuria in blackwater fever).",
      },
    ],
    medicines: [
      {
        id: "artemether-lumefantrine",
        name: "Artemether-Lumefantrine (Coartem)",
        dosage: "80/480 mg",
        route: "Oral",
        duration: "3 days (6 doses)",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description: "Rapid parasite clearance begins within 30 minutes",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Fever reduces significantly by 24 hours in uncomplicated cases",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "Parasitemia cleared >99% by 72 hours (3-day course complete)",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Nausea, dizziness, headache (first dose — common and transient)",
          },
          {
            timeMinutes: BigInt(480),
            description:
              "QT prolongation possible (ECG monitoring if cardiac risk)",
          },
          {
            timeMinutes: BigInt(2880),
            description: "Mild anaemia worsening temporarily as parasites lyse",
          },
        ],
        contraindications: [
          "1st trimester pregnancy",
          "Severe hepatic impairment",
          "QT prolongation",
          "Concurrent CYP3A4 inhibitors",
        ],
        drugInteractions: [
          "Rifampicin (reduces levels)",
          "Antiretrovirals",
          "Antifungals (azoles)",
        ],
      },
      {
        id: "artesunate-iv",
        name: "Artesunate IV",
        dosage: "2.4 mg/kg IV",
        route: "Intravenous",
        duration: "At 0, 12, 24 hrs then daily",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Fastest acting antimalarial — ring-stage parasite kill begins immediately",
          },
          {
            timeMinutes: BigInt(720),
            description:
              "Parasitemia reduction >90% within 12 hours in severe malaria",
          },
          {
            timeMinutes: BigInt(2880),
            description:
              "Clinical improvement: consciousness returns in cerebral malaria",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(120),
            description: "Hypoglycaemia (monitor blood glucose hourly)",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Post-artesunate delayed haemolysis (PADH) — monitor at 2-4 weeks",
          },
          {
            timeMinutes: BigInt(60),
            description: "Injection site reactions, bradycardia",
          },
        ],
        contraindications: [
          "Known hypersensitivity to artemisinins",
          "Use oral form when possible",
        ],
        drugInteractions: ["Other QT-prolonging drugs"],
      },
    ],
  },

  {
    id: "malaria-vivax",
    name: "Malaria (Plasmodium vivax)",
    category: "Communicable",
    icd10Code: "B51",
    description:
      "Most prevalent malaria species in India (70% cases). Forms hypnozoites in liver causing relapses. Associated with anaemia and splenomegaly. North India plains, forested tribal areas commonly affected.",
    subjectMapping: ["Medicine", "Pharmacology", "Parasitology"],
    diagnosticCriteria:
      "Blood smear: P. vivax trophozoites (Schüffner's dots), enlarged RBCs. RDT: pLDH-based rapid test (HRP-2 negative for vivax). Haemogram: anaemia, thrombocytopenia. G6PD testing mandatory before primaquine therapy.",
    associatedDiseases: [
      "Anaemia",
      "Splenomegaly",
      "Splenic rupture (rare)",
      "P. falciparum co-infection",
    ],
    clinicalSigns: {
      bp: "100/70 mmHg",
      hr: "100 bpm",
      temp: "102-104°F",
      rr: "20/min",
      spo2: "97%",
    },
    symptoms: [
      {
        name: "Tertian Fever",
        severity: BigInt(7),
        description:
          "Classic every-48-hour fever pattern — cold stage → hot stage → sweating stage.",
      },
      {
        name: "Profound Fatigue",
        severity: BigInt(6),
        description: "Extreme weakness persisting between fever episodes.",
      },
      {
        name: "Myalgia/Arthralgia",
        severity: BigInt(5),
        description:
          "Generalised body ache, joint pain during febrile episodes.",
      },
      {
        name: "Pallor",
        severity: BigInt(6),
        description:
          "Conjunctival pallor due to haemolytic anaemia — insidious onset.",
      },
      {
        name: "Tender Splenomegaly",
        severity: BigInt(5),
        description:
          "Left hypochondriac pain/fullness — spleen may be massively enlarged in chronic cases.",
      },
    ],
    medicines: [
      {
        id: "chloroquine-cq",
        name: "Chloroquine",
        dosage: "600 mg base, then 300 mg at 6h, 24h, 48h",
        route: "Oral",
        duration: "3 days",
        goodEffects: [
          {
            timeMinutes: BigInt(120),
            description:
              "Rapid fever reduction — acts in 2-4 hours for vivax malaria",
          },
          {
            timeMinutes: BigInt(1440),
            description: "Complete parasite clearance within 24-48 hours",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description: "Nausea, metallic taste, GI upset (take with food)",
          },
          {
            timeMinutes: BigInt(60),
            description: "Pruritus (especially in dark-skinned individuals)",
          },
          {
            timeMinutes: BigInt(43200),
            description:
              "Retinopathy with long-term use (ophthalmology review)",
          },
        ],
        contraindications: [
          "CQ-resistant P. vivax areas (Papua New Guinea, Indonesia)",
          "Porphyria",
          "Retinal disease",
          "Known CQ hypersensitivity",
        ],
        drugInteractions: [
          "Antacids (reduce absorption)",
          "Mefloquine (seizure risk)",
        ],
      },
      {
        id: "primaquine-radical",
        name: "Primaquine (Radical Cure)",
        dosage: "0.25 mg/kg/day",
        route: "Oral",
        duration: "14 days",
        goodEffects: [
          {
            timeMinutes: BigInt(20160),
            description:
              "Kills hypnozoites (liver dormant forms) — prevents relapse at 14 days",
          },
          {
            timeMinutes: BigInt(40320),
            description: "Radical cure complete — no further relapses expected",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(720),
            description:
              "Abdominal pain, nausea with food (reduce by taking with meals)",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Haemolytic anaemia in G6PD-deficient patients — LIFE-THREATENING, screen G6PD first",
          },
          {
            timeMinutes: BigInt(480),
            description:
              "Methaemoglobinaemia — cyanosis, dyspnoea (monitor pulse oximetry)",
          },
        ],
        contraindications: [
          "G6PD deficiency (absolute)",
          "Pregnancy",
          "Breastfeeding (unless G6PD tested)",
        ],
        drugInteractions: [
          "Other oxidant drugs",
          "Quinolones (additive haemolysis risk)",
        ],
      },
    ],
  },

  {
    id: "dengue-fever",
    name: "Dengue Fever",
    category: "Communicable",
    icd10Code: "A90",
    description:
      "Arboviral infection by Dengue virus (DENV 1-4) transmitted by Aedes aegypti mosquito. India mein 2-4 lakh reported cases annually (actual burden 3-5 crore). Urban epidemic cycles. Second infection with different serotype → Dengue Haemorrhagic Fever risk.",
    subjectMapping: ["Medicine", "Pharmacology", "Microbiology"],
    diagnosticCriteria:
      "NS1 antigen (positive days 1-5), IgM/IgG ELISA (from day 5). CBC: thrombocytopenia (<1 lakh), haemoconcentration (rising haematocrit ≥20%). LFT: transaminitis common. USG abdomen: ascites, pleural effusion (dengue haemorrhagic fever markers). Warning signs: severe abdominal pain, persistent vomiting, mucosal bleed, rapid fall in platelet count.",
    associatedDiseases: [
      "Dengue Haemorrhagic Fever",
      "Dengue Shock Syndrome",
      "Chikungunya co-infection",
      "Malaria",
    ],
    clinicalSigns: {
      bp: "100/70 mmHg",
      hr: "105 bpm",
      temp: "103-104°F",
      rr: "22/min",
      spo2: "97%",
    },
    symptoms: [
      {
        name: "Sudden High Fever",
        severity: BigInt(8),
        description:
          "Abrupt onset fever 103-104°F with severe headache — 'breakbone fever' appearance.",
      },
      {
        name: "Retro-orbital Pain",
        severity: BigInt(7),
        description:
          "Characteristic pain behind eyes worsening with eye movement — pathognomonic.",
      },
      {
        name: "Myalgia & Arthralgia",
        severity: BigInt(8),
        description:
          "Severe bone/joint/muscle pain — 'breakbone fever' nickname. Debilitating.",
      },
      {
        name: "Dengue Rash",
        severity: BigInt(5),
        description:
          "Maculopapular rash appearing day 3-5, blanching, islands of white in sea of red.",
      },
      {
        name: "Thrombocytopenia",
        severity: BigInt(7),
        description:
          "Falling platelet count — haemorrhagic risk when <20,000. Monitor daily.",
      },
      {
        name: "Petechiae/Bleeding",
        severity: BigInt(7),
        description:
          "Tourniquet test positive, petechiae, gum bleeding, haematemesis (DHF).",
      },
    ],
    medicines: [
      {
        id: "paracetamol-dengue",
        name: "Paracetamol (Acetaminophen)",
        dosage: "500-1000 mg",
        route: "Oral/IV",
        duration: "Every 6-8 hours as needed",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description: "Fever reduction begins within 30 minutes",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Pain relief — myalgia/headache significantly reduced at 1 hour",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(14400),
            description:
              "Hepatotoxicity with overdose (max 3g/day in dengue due to existing hepatitis)",
          },
        ],
        contraindications: [
          "Hepatic impairment",
          "Alcohol dependence",
          "G6PD deficiency",
        ],
        drugInteractions: ["Warfarin (potentiates anticoagulation)"],
      },
      {
        id: "iv-fluids-dengue",
        name: "IV Crystalloid (NS/Ringer's Lactate)",
        dosage: "5-10 mL/kg/hr",
        route: "Intravenous",
        duration: "As per plasma leakage monitoring",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Haemodynamic stabilisation in DHF — improves plasma volume",
          },
          {
            timeMinutes: BigInt(30),
            description: "Correction of haemoconcentration",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(180),
            description:
              "Fluid overload if over-resuscitated — pulmonary oedema risk in recovery phase",
          },
        ],
        contraindications: [
          "Recovery phase (day 7-8) — fluid overload risk",
          "Heart failure",
        ],
        drugInteractions: [],
      },
    ],
  },

  {
    id: "typhoid-fever",
    name: "Typhoid Fever",
    category: "Communicable",
    icd10Code: "A01.0",
    description:
      "Enteric fever caused by Salmonella typhi. Fecal-oral transmission — contaminated water/food. India mein endemic — 1-2 crore cases/year estimated. Multidrug-resistant (MDR) and extensively drug-resistant (XDR) strains emerging in South Asia.",
    subjectMapping: ["Medicine", "Pharmacology", "Microbiology"],
    diagnosticCriteria:
      "Blood culture (gold standard — positive week 1, sensitivity 40-80%). Widal test (≥1:160 O antibodies suggestive but low specificity). Bone marrow culture (gold standard for treated cases). Typhidot: IgM/IgG (sensitivity 85%). CBC: leukopenia with relative lymphocytosis, mild anaemia. LFT: transaminitis. CXR: rose spots (2-4mm maculopapular lesions) on trunk day 7-10.",
    associatedDiseases: [
      "Intestinal perforation",
      "GI haemorrhage",
      "Hepatitis",
      "Myocarditis",
      "Paratyphoid fever",
    ],
    clinicalSigns: {
      bp: "100/70 mmHg",
      hr: "78 bpm",
      temp: "103-104°F",
      rr: "18/min",
      spo2: "97%",
    },
    symptoms: [
      {
        name: "Stepwise Fever",
        severity: BigInt(8),
        description:
          "Classic step-ladder fever — rises 1°F each day, plateaus at 103-104°F in week 2.",
      },
      {
        name: "Relative Bradycardia",
        severity: BigInt(6),
        description:
          "Faget sign — pulse-temperature dissociation: high temp with low HR. Diagnostic clue.",
      },
      {
        name: "Rose Spots",
        severity: BigInt(5),
        description:
          "Salmon-pink maculopapular lesions (2-4mm) on trunk/abdomen, blanch on pressure, day 7-10.",
      },
      {
        name: "Abdominal Distension",
        severity: BigInt(6),
        description:
          "Doughy abdomen — Peyer's patches inflammation. Peritonism if perforated.",
      },
      {
        name: "Hepatosplenomegaly",
        severity: BigInt(5),
        description:
          "Palpable liver and spleen by week 2 — soft, mildly tender.",
      },
      {
        name: "Constipation/Diarrhoea",
        severity: BigInt(5),
        description:
          "Week 1: constipation (more common). Week 2-3: pea-soup diarrhoea. Perforation risk.",
      },
    ],
    medicines: [
      {
        id: "ceftriaxone-typhoid",
        name: "Ceftriaxone",
        dosage: "2g IV/IM once daily",
        route: "Intravenous/Intramuscular",
        duration: "10-14 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description: "Fever defervescence within 3-5 days of treatment",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "Bacteraemia clearance — patient becomes afebrile, less toxic",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Pain at injection site, phlebitis with IV administration",
          },
          {
            timeMinutes: BigInt(720),
            description:
              "Biliary sludge/gallstones with prolonged use (pseudo-lithiasis)",
          },
          {
            timeMinutes: BigInt(60),
            description: "Hypersensitivity reactions (beta-lactam allergy)",
          },
        ],
        contraindications: [
          "Penicillin/cephalosporin allergy",
          "Neonatal jaundice (displaces bilirubin)",
        ],
        drugInteractions: [
          "Calcium-containing IV fluids (precipitate formation in neonates)",
        ],
      },
      {
        id: "azithromycin-typhoid",
        name: "Azithromycin",
        dosage: "1g loading, then 500 mg daily",
        route: "Oral",
        duration: "7 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Good tissue penetration — active against intracellular Salmonella",
          },
          {
            timeMinutes: BigInt(2880),
            description: "Fever reduction usually within 4-5 days",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description: "GI side effects — nausea, diarrhoea (take with food)",
          },
          {
            timeMinutes: BigInt(480),
            description: "QT prolongation — avoid in cardiac patients",
          },
        ],
        contraindications: [
          "Macrolide hypersensitivity",
          "Severe hepatic disease",
          "QT prolongation",
        ],
        drugInteractions: ["Antacids (reduce absorption)", "Warfarin"],
      },
    ],
  },

  {
    id: "tuberculosis-pulmonary",
    name: "Pulmonary Tuberculosis",
    category: "Communicable",
    icd10Code: "A15",
    description:
      "Mycobacterium tuberculosis airborne infection. India has highest TB burden globally — 26 lakh notified cases/year (2022). Nikshay portal-based notification mandatory. Drug-resistant TB (MDR/XDR) is major challenge. Government's National TB Elimination Programme (NTEP) targets elimination by 2025.",
    subjectMapping: ["Medicine", "Pulmonology", "Pharmacology", "Microbiology"],
    diagnosticCriteria:
      "Sputum AFB smear (Ziehl-Neelsen staining). CBNAAT/GeneXpert (detects MTB + rifampicin resistance — gold standard). Sputum culture (LJ medium — 6-8 weeks). CXR/HRCT: upper lobe infiltrates, cavitation, hilar lymphadenopathy. IGRA/Mantoux (latent TB). Bronchoscopy/BAL if sputum smear-negative. FNAC/biopsy for lymph node TB.",
    associatedDiseases: [
      "HIV/AIDS",
      "Diabetes mellitus",
      "MDR-TB",
      "Pleural effusion",
      "TB Meningitis",
      "Miliary TB",
    ],
    clinicalSigns: {
      bp: "110/70 mmHg",
      hr: "95 bpm",
      temp: "100-101°F",
      rr: "22/min",
      spo2: "94%",
    },
    symptoms: [
      {
        name: "Chronic Cough >2 weeks",
        severity: BigInt(8),
        description:
          "Persistent productive cough — mucopurulent sputum, progressing to haemoptysis.",
      },
      {
        name: "Night Sweats",
        severity: BigInt(7),
        description:
          "Drenching nocturnal sweating — soaking clothes/bedsheets. Constitutional symptom.",
      },
      {
        name: "Weight Loss",
        severity: BigInt(7),
        description:
          "Gradual unexplained weight loss >10% body weight — cachexia in advanced disease.",
      },
      {
        name: "Haemoptysis",
        severity: BigInt(8),
        description:
          "Blood-stained sputum (streaks to frank blood) — cavity erosion of bronchial vessel.",
      },
      {
        name: "Afternoon Fever",
        severity: BigInt(6),
        description:
          "Low-grade evening pyrexia (100-101°F) — classic but non-specific.",
      },
      {
        name: "Clubbing",
        severity: BigInt(5),
        description:
          "Digital clubbing in chronic/complicated pulmonary TB — empyema, bronchiectasis.",
      },
    ],
    medicines: [
      {
        id: "hrze-regimen",
        name: "HRZE (Isoniazid + Rifampicin + Pyrazinamide + Ethambutol)",
        dosage: "Weight-based combination (DOTS)",
        route: "Oral",
        duration: "2 months intensive + 4 months continuation (HRZE→HR)",
        goodEffects: [
          {
            timeMinutes: BigInt(43200),
            description:
              "Smear conversion — sputum AFB becomes negative by week 2-4 in responsive TB",
          },
          {
            timeMinutes: BigInt(86400),
            description:
              "Significant symptom relief — fever, sweats, cough improve month 1-2",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Hepatotoxicity (Isoniazid + Rifampicin synergistic) — monitor LFT monthly",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "Peripheral neuropathy (INH) — give pyridoxine 25mg/day routinely",
          },
          {
            timeMinutes: BigInt(720),
            description:
              "Hyperuricaemia/gout (Pyrazinamide) — monitor uric acid",
          },
          {
            timeMinutes: BigInt(10080),
            description:
              "Optic neuritis (Ethambutol) — red-green colour vision testing monthly",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Orange urine/tears/sweat (Rifampicin) — inform patient",
          },
        ],
        contraindications: [
          "Active hepatitis (modify regimen)",
          "Optic neuritis (avoid ethambutol)",
        ],
        drugInteractions: [
          "Rifampicin: induces CYP450 — reduces levels of OCP, antiretrovirals, warfarin, antifungals",
          "INH: phenytoin toxicity",
        ],
      },
    ],
  },

  {
    id: "cholera",
    name: "Cholera",
    category: "Communicable",
    icd10Code: "A00",
    description:
      "Vibrio cholerae O1/O139 infection — fecal-oral route via contaminated water. Rapid massive fluid/electrolyte loss. India prone to outbreaks in flood situations and areas with poor sanitation (West Bengal, Odisha, Bihar). Notifiable disease under IDSP.",
    subjectMapping: ["Medicine", "Microbiology", "Pharmacology"],
    diagnosticCriteria:
      "Stool culture (TCBS agar — yellow colonies V. cholerae). Dark-field microscopy: 'shooting star' motility. Rectal swab/stool microscopy. Serotyping: O1 (El Tor biotype) or O139. Serum electrolytes: hyponatraemia, hypokalaemia, metabolic acidosis.",
    associatedDiseases: [
      "Dehydration",
      "Hypovolaemic shock",
      "Hypokalaemia",
      "Metabolic acidosis",
      "Acute renal failure",
    ],
    clinicalSigns: {
      bp: "80/50 mmHg",
      hr: "120 bpm",
      temp: "36.5°F",
      rr: "26/min",
      spo2: "95%",
    },
    symptoms: [
      {
        name: "Rice-water Diarrhoea",
        severity: BigInt(9),
        description:
          "Profuse, odourless, watery stools resembling rice water — up to 1L/hour fluid loss.",
      },
      {
        name: "Profuse Vomiting",
        severity: BigInt(8),
        description:
          "Projectile, effortless vomiting — worsens dehydration rapidly.",
      },
      {
        name: "Severe Dehydration",
        severity: BigInt(9),
        description:
          "Sunken eyes, dry mouth, skin turgor loss, poor capillary refill — sign of >10% fluid loss.",
      },
      {
        name: "Muscle Cramps",
        severity: BigInt(7),
        description:
          "Painful muscle cramps — especially legs (hypokalaemia, metabolic acidosis).",
      },
      {
        name: "Anuria",
        severity: BigInt(8),
        description: "No urine output due to profound volume depletion.",
      },
    ],
    medicines: [
      {
        id: "ors-cholera",
        name: "ORS / IV Ringer's Lactate",
        dosage: "WHO ORS or RL 30 mL/kg in 30 min",
        route: "Oral/Intravenous",
        duration: "Until rehydrated",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Rapid haemodynamic improvement — pulse improves, BP recovers",
          },
          {
            timeMinutes: BigInt(180),
            description:
              "Consciousness restored, urine output re-established in severe cholera",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(240),
            description:
              "Fluid overload if administered too rapidly — pulmonary oedema risk",
          },
        ],
        contraindications: ["Hypernatraemia", "Paralytic ileus (IV route)"],
        drugInteractions: [],
      },
      {
        id: "doxycycline-cholera",
        name: "Doxycycline",
        dosage: "300 mg single dose",
        route: "Oral",
        duration: "Single dose",
        goodEffects: [
          {
            timeMinutes: BigInt(720),
            description:
              "Reduces stool volume and duration of diarrhoea by 50%",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Shortens duration of illness from 5-7 days to 2-3 days",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Nausea, oesophageal irritation (take with plenty of water)",
          },
          {
            timeMinutes: BigInt(30),
            description: "Photosensitivity — avoid sun exposure",
          },
        ],
        contraindications: [
          "Pregnancy",
          "Children <8 years",
          "Severe hepatic disease",
        ],
        drugInteractions: ["Antacids (reduce absorption)", "Iron supplements"],
      },
    ],
  },

  {
    id: "leptospirosis",
    name: "Leptospirosis",
    category: "Communicable",
    icd10Code: "A27",
    description:
      "Leptospira interrogans infection — transmitted via contaminated water/soil contact with rodent urine. India mein monsoon ke baad epidemic (Kerala, Maharashtra, Tamil Nadu, Gujarat). Weil's disease (severe form): jaundice + renal failure + bleeding.",
    subjectMapping: ["Medicine", "Microbiology", "Pharmacology"],
    diagnosticCriteria:
      "MAT (Microscopic Agglutination Test — gold standard, ≥1:200). ELISA IgM (positive from day 5-7). Leptospira PCR (blood — acute phase). Dark-field microscopy. CBC: neutrophilic leukocytosis, thrombocytopenia. LFT: bilirubinemia, elevated transaminases. RFT: renal failure. CK elevated (myositis). CXR: diffuse infiltrates (ARDS).",
    associatedDiseases: [
      "Weil's disease",
      "Pulmonary haemorrhage syndrome",
      "Acute kidney injury",
      "Uveitis (post-infectious)",
      "ARDS",
    ],
    clinicalSigns: {
      bp: "100/65 mmHg",
      hr: "105 bpm",
      temp: "103°F",
      rr: "24/min",
      spo2: "94%",
    },
    symptoms: [
      {
        name: "Abrupt Fever",
        severity: BigInt(8),
        description:
          "Sudden high fever with severe headache, rigors — biphasic course (3-7 days fever → brief improvement → leptospiruric phase).",
      },
      {
        name: "Conjunctival Suffusion",
        severity: BigInt(6),
        description:
          "Painless bilateral conjunctival redness without discharge — distinguishes from conjunctivitis.",
      },
      {
        name: "Myalgia",
        severity: BigInt(8),
        description:
          "Severe calf/thigh muscle pain — pathognomonic tenderness. Patient can't walk.",
      },
      {
        name: "Jaundice",
        severity: BigInt(7),
        description:
          "Deepening jaundice (Weil's disease) — hepatocellular + cholestatic pattern.",
      },
      {
        name: "Oliguria",
        severity: BigInt(7),
        description:
          "Declining urine output — acute tubular necrosis, AKI requiring dialysis.",
      },
      {
        name: "Haemorrhage",
        severity: BigInt(7),
        description:
          "Pulmonary haemorrhage, GI bleed, subconjunctival haemorrhage — high mortality risk.",
      },
    ],
    medicines: [
      {
        id: "penicillin-g-lepto",
        name: "Benzyl Penicillin",
        dosage: "1.5 million units IV",
        route: "Intravenous",
        duration: "Every 6 hours for 7 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Fever reduction and clinical improvement within 24-48 hours",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "Bacterial clearance — spirochaete eradication from blood/urine",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Jarisch-Herxheimer reaction (fever, chills, rigor) 2-8 hours post 1st dose",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Hypersensitivity/anaphylaxis (penicillin allergy — skin test first)",
          },
        ],
        contraindications: ["Penicillin allergy"],
        drugInteractions: ["Probenecid (increases penicillin levels)"],
      },
      {
        id: "doxycycline-lepto-mild",
        name: "Doxycycline (Mild/Moderate Disease)",
        dosage: "100 mg",
        route: "Oral",
        duration: "Twice daily for 7 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description: "Shortens duration of mild leptospirosis",
          },
          {
            timeMinutes: BigInt(480),
            description:
              "Post-exposure prophylaxis: 200mg once weekly during flood relief",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description: "GI upset, photosensitivity (avoid direct sun)",
          },
        ],
        contraindications: ["Pregnancy", "Children <8 years"],
        drugInteractions: ["Antacids", "Iron (chelation)"],
      },
    ],
  },

  {
    id: "japanese-encephalitis",
    name: "Japanese Encephalitis",
    category: "Communicable",
    icd10Code: "A83.0",
    description:
      "JEV flavivirus — Culex mosquito vector, amplified in pigs/birds. Epidemic in UP, Bihar, West Bengal, Assam especially post-monsoon (Aug-Oct). 50% mortality in encephalitis phase; 30-50% survivors have neurological sequelae. Paediatric population most affected. SA 14-14-2 vaccine available.",
    subjectMapping: ["Medicine", "Paediatrics", "Neurology", "Microbiology"],
    diagnosticCriteria:
      "CSF analysis: lymphocytic pleocytosis, elevated protein, normal glucose. JEV IgM in CSF (gold standard — MAC-ELISA). Blood JEV IgM from day 3-5. MRI brain: bilateral thalamic lesions (T2 hyperintensity) — virtually pathognomonic. EEG: diffuse slowing, seizure activity. CT brain: thalamic, basal ganglia, brainstem hypodensities.",
    associatedDiseases: [
      "Acute Flaccid Paralysis",
      "ADEM",
      "Status epilepticus",
      "Cerebral herniation",
    ],
    clinicalSigns: {
      bp: "100/60 mmHg",
      hr: "110 bpm",
      temp: "104-105°F",
      rr: "28/min",
      spo2: "90%",
    },
    symptoms: [
      {
        name: "Acute Encephalopathy",
        severity: BigInt(9),
        description:
          "Rapid deterioration in consciousness — confusion → stupor → coma within 48-72 hours.",
      },
      {
        name: "Seizures",
        severity: BigInt(9),
        description:
          "Generalised or focal seizures — status epilepticus common in children.",
      },
      {
        name: "Parkinsonian Features",
        severity: BigInt(7),
        description:
          "Mask-like facies, cogwheel rigidity, resting tremor — thalamic/basal ganglia damage.",
      },
      {
        name: "Nuchal Rigidity",
        severity: BigInt(7),
        description:
          "Meningism — Kernig/Brudzinski signs positive, photophobia.",
      },
      {
        name: "Hyperpyrexia",
        severity: BigInt(8),
        description:
          "Extreme fever 104-106°F — central fever from hypothalamic involvement.",
      },
    ],
    medicines: [
      {
        id: "supportive-je",
        name: "Supportive Care (Mannitol + Levetiracetam + ICU)",
        dosage: "Mannitol 0.25-1 g/kg IV",
        route: "Intravenous",
        duration: "ICU-based management",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Mannitol: ICP reduction within 15-60 minutes — brain herniation prevention",
          },
          {
            timeMinutes: BigInt(30),
            description:
              "Levetiracetam: seizure control within 30 minutes IV loading",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Mannitol: rebound cerebral oedema, electrolyte disturbances",
          },
          {
            timeMinutes: BigInt(720),
            description: "Levetiracetam: behavioural changes, somnolence",
          },
        ],
        contraindications: ["Mannitol in anuria", "Hypernatraemia"],
        drugInteractions: [],
      },
    ],
  },

  {
    id: "rabies",
    name: "Rabies",
    category: "Communicable",
    icd10Code: "A82",
    description:
      "Fatal encephalitis caused by Rabies lyssavirus — transmitted via saliva of infected animals (dogs 97% in India). India has highest rabies burden — 18,000-20,000 deaths/year. Once clinical signs appear, virtually 100% fatal. Prevention via post-exposure prophylaxis (PEP) is the key intervention.",
    subjectMapping: ["Medicine", "Pharmacology", "Public Health"],
    diagnosticCriteria:
      "Ante-mortem: Saliva RT-PCR (virus detection), skin biopsy (neck, DFA), CSF PCR. Serology (unvaccinated >5 IU/mL). Nagri bodies (pathognomonic). History of animal bite critical. Post-mortem: Negri bodies in Purkinje cells (H&E stain), DFA brain.",
    associatedDiseases: [
      "Encephalitis",
      "Autonomic dysfunction",
      "Paralytic rabies",
      "Hydrophobia",
      "Aerophobia",
    ],
    clinicalSigns: {
      bp: "140/90 mmHg",
      hr: "120 bpm",
      temp: "100-102°F",
      rr: "30/min",
      spo2: "88%",
    },
    symptoms: [
      {
        name: "Hydrophobia",
        severity: BigInt(10),
        description:
          "Pathognomonic — intense pharyngeal spasm on sight/sound of water. Caused by hydrophobia reflex.",
      },
      {
        name: "Aerophobia",
        severity: BigInt(9),
        description:
          "Spasm on exposure to air currents — fan wind triggers pharyngospasm.",
      },
      {
        name: "Furious Agitation",
        severity: BigInt(9),
        description:
          "Periods of extreme agitation, aggression, hallucinations alternating with lucid intervals.",
      },
      {
        name: "Paresthesia at Bite Site",
        severity: BigInt(7),
        description:
          "Early prodrome — tingling/pain at old healed bite site (virus traveling centripetally).",
      },
      {
        name: "Hypersalivation",
        severity: BigInt(7),
        description:
          "Excessive drooling — can't swallow saliva due to pharyngospasm.",
      },
    ],
    medicines: [
      {
        id: "pep-rabies",
        name: "Rabies Post-Exposure Prophylaxis (PEP)",
        dosage: "HRIG 20 IU/kg + Cell-culture vaccine 1mL",
        route: "Intramuscular/Intradermal",
        duration: "Days 0, 3, 7, 14 (Essen) or Day 0, 3, 7 (Zagreb)",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "HRIG: passive immunity immediately — neutralises virus at bite site",
          },
          {
            timeMinutes: BigInt(10080),
            description:
              "Active immunisation complete by day 7-14 — >99% prevention if given before symptoms",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Local reactions — pain, redness, swelling at injection site",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Serum sickness (HRIG — rare) — fever, arthralgia, rash",
          },
        ],
        contraindications: [
          "No absolute contraindication for PEP after rabies exposure",
        ],
        drugInteractions: [
          "Immunosuppressants reduce vaccine response",
          "Chloroquine (reduces rabies vaccine antibody response)",
        ],
      },
    ],
  },

  {
    id: "chikungunya",
    name: "Chikungunya",
    category: "Communicable",
    icd10Code: "A92.0",
    description:
      "Alphavirus infection — Aedes aegypti/albopictus vector. India mein major outbreak 2006 (1.4 million cases). Arthralgia can persist months-years (chronic chikungunya). Co-circulates with dengue in urban endemic areas.",
    subjectMapping: ["Medicine", "Pharmacology", "Microbiology"],
    diagnosticCriteria:
      "CHIKV RT-PCR (acute phase — days 1-8). IgM ELISA (from day 5). IgG (past infection). Differentiate from dengue: thrombocytopenia mild, haemorrhage rare, severe joint pain predominant in CHIKV.",
    associatedDiseases: [
      "Dengue co-infection",
      "Reactive arthritis",
      "Post-chikungunya chronic arthralgia",
      "Encephalitis (rare)",
    ],
    clinicalSigns: {
      bp: "110/70 mmHg",
      hr: "100 bpm",
      temp: "103-104°F",
      rr: "20/min",
      spo2: "98%",
    },
    symptoms: [
      {
        name: "Polyarthralgia",
        severity: BigInt(9),
        description:
          "Hallmark — bilateral symmetric small joint involvement (MCPs, PIPs, wrists, ankles). 'Chikungunya' = stooped walking (African origin meaning).",
      },
      {
        name: "Sudden Fever",
        severity: BigInt(8),
        description: "Abrupt onset high fever 103-104°F, resolves in 2-3 days.",
      },
      {
        name: "Maculopapular Rash",
        severity: BigInt(5),
        description:
          "Trunk and extremities rash day 2-5 — blanching, maculopapular.",
      },
      {
        name: "Bilateral Ankle Swelling",
        severity: BigInt(7),
        description:
          "Periarticular oedema — pitting, painful, limiting ambulation.",
      },
      {
        name: "Conjunctivitis",
        severity: BigInt(4),
        description:
          "Bilateral non-purulent conjunctivitis — differentiating clue from other fevers.",
      },
    ],
    medicines: [
      {
        id: "nsaids-chikungunya",
        name: "Naproxen / Ibuprofen",
        dosage: "Naproxen 500mg or Ibuprofen 400mg",
        route: "Oral",
        duration: "Twice daily with food until arthralgia resolves",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description: "Joint pain and swelling relief within 1-2 hours",
          },
          {
            timeMinutes: BigInt(1440),
            description: "Improved mobility and function by day 2-3",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(120),
            description:
              "GI irritation — peptic ulcer, GI bleed risk (add PPI/misoprostol)",
          },
          {
            timeMinutes: BigInt(720),
            description:
              "Renal impairment with prolonged use — monitor renal function",
          },
        ],
        contraindications: [
          "Avoid NSAIDs if dengue co-infection suspected (haemorrhage risk)",
          "Peptic ulcer disease",
          "Renal failure",
          "Pregnancy (3rd trimester)",
        ],
        drugInteractions: ["Warfarin", "Lithium", "ACE inhibitors"],
      },
    ],
  },

  {
    id: "scrub-typhus",
    name: "Scrub Typhus",
    category: "Communicable",
    icd10Code: "A75.3",
    description:
      "Orientia tsutsugamushi rickettsial infection — trombiculid mite (chigger) vector. Prevalent in 'tsutsugamushi triangle' including India (Jammu, Himachal, Uttarakhand, North-East India, Tamil Nadu, Maharashtra). Seasonal (Aug-Oct). Underdiagnosed due to lack of awareness.",
    subjectMapping: ["Medicine", "Microbiology", "Pharmacology"],
    diagnosticCriteria:
      "Clinical — eschar (pathognomonic, 50-80% cases), fever, lymphadenopathy. Weil-Felix test: OX-K agglutination (low sensitivity). IFA (gold standard serology, ≥1:128). IgM ELISA. PCR blood (acute phase). CBC: leukopenia/leukocytosis, mild thrombocytopenia, elevated LFT.",
    associatedDiseases: [
      "Meningoencephalitis",
      "ARDS",
      "AKI",
      "Multi-organ failure",
      "Myocarditis",
    ],
    clinicalSigns: {
      bp: "95/65 mmHg",
      hr: "108 bpm",
      temp: "103-105°F",
      rr: "24/min",
      spo2: "94%",
    },
    symptoms: [
      {
        name: "Eschar",
        severity: BigInt(8),
        description:
          "Painless black necrotic ulcer with erythematous halo at mite bite site — axilla, groin, behind ear. PATHOGNOMONIC — search carefully!",
      },
      {
        name: "Regional Lymphadenopathy",
        severity: BigInt(6),
        description:
          "Tender enlarged lymph nodes draining eschar region — fever lymphadenopathy rash triad.",
      },
      {
        name: "Maculopapular Rash",
        severity: BigInt(6),
        description: "Trunk-first rash spreading to extremities day 5-8.",
      },
      {
        name: "Hepatosplenomegaly",
        severity: BigInt(5),
        description: "Liver and spleen enlargement — transaminitis.",
      },
      {
        name: "Confusion/Encephalitis",
        severity: BigInt(7),
        description:
          "Altered sensorium in severe scrub typhus — respond to doxycycline (empirical treatment warranted).",
      },
    ],
    medicines: [
      {
        id: "doxycycline-scrub",
        name: "Doxycycline",
        dosage: "100 mg",
        route: "Oral",
        duration: "Twice daily for 7 days (minimum 3 days after defervescence)",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Dramatic fever defervescence within 24-48 hours — therapeutic trial is diagnostic",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "Complete clinical recovery in uncomplicated cases by day 3-5",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "GI upset, oesophageal irritation (take sitting upright with water)",
          },
          {
            timeMinutes: BigInt(120),
            description: "Photosensitivity — advise sun protection",
          },
        ],
        contraindications: [
          "Pregnancy (use azithromycin as alternative)",
          "Children <8 years (use azithromycin)",
        ],
        drugInteractions: ["Antacids reduce absorption"],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // NON-COMMUNICABLE DISEASES
  // ══════════════════════════════════════════════════════════════

  {
    id: "diabetes-type2",
    name: "Type 2 Diabetes Mellitus",
    category: "NonCommunicable",
    icd10Code: "E11",
    description:
      "Insulin resistance + progressive beta-cell failure. India mein 77 million diabetics (2nd highest globally). Major cardiovascular risk factor. ICMR-INDIAB study: national prevalence 11.4%. Diabetic ketoacidosis (DKA) predominantly Type 1; Hyperosmolar Hyperglycaemic State (HHS) Type 2.",
    subjectMapping: [
      "Medicine",
      "Pharmacology",
      "Endocrinology",
      "Community Medicine",
    ],
    diagnosticCriteria:
      "ADA criteria: FPG ≥126 mg/dL, 2h OGTT ≥200 mg/dL, HbA1c ≥6.5%, random glucose ≥200 with symptoms. Confirm on 2 separate days unless symptoms + random ≥200. HbA1c target: <7% generally, <8% elderly/high hypoglycaemia risk. Urinary microalbumin (nephropathy screening). Fundoscopy (retinopathy). Ankle reflexes/monofilament (neuropathy).",
    associatedDiseases: [
      "Hypertension",
      "Dyslipidaemia",
      "CKD",
      "Coronary artery disease",
      "Diabetic retinopathy",
      "Diabetic neuropathy",
      "NAFLD",
    ],
    clinicalSigns: {
      bp: "140/90 mmHg",
      hr: "80 bpm",
      temp: "37°C",
      rr: "16/min",
      spo2: "98%",
    },
    symptoms: [
      {
        name: "Polyuria",
        severity: BigInt(7),
        description:
          "Osmotic diuresis — glucose >180 mg/dL exceeds renal threshold. Frequent urination, nocturia.",
      },
      {
        name: "Polydipsia",
        severity: BigInt(6),
        description:
          "Excessive thirst — compensatory response to osmotic fluid loss.",
      },
      {
        name: "Polyphagia",
        severity: BigInt(5),
        description:
          "Increased appetite despite eating — cells starved due to insulin resistance.",
      },
      {
        name: "Unexplained Weight Loss",
        severity: BigInt(6),
        description: "Protein/fat catabolism in insulin-deficient state.",
      },
      {
        name: "Recurrent Infections",
        severity: BigInt(6),
        description:
          "Impaired neutrophil function — candidiasis, recurrent UTI, skin infections, slow wound healing.",
      },
      {
        name: "Visual Blurring",
        severity: BigInt(5),
        description:
          "Refractive changes (acute hyperglycaemia) + diabetic retinopathy (chronic).",
      },
    ],
    medicines: [
      {
        id: "metformin",
        name: "Metformin",
        dosage: "500-2000 mg/day",
        route: "Oral",
        duration: "Long-term",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Reduces hepatic glucose output — plasma glucose reduction begins",
          },
          {
            timeMinutes: BigInt(20160),
            description: "HbA1c reduction 1-1.5% over 2-3 months",
          },
          {
            timeMinutes: BigInt(131400),
            description:
              "Cardiovascular mortality reduction (UKPDS) — weight neutral/modest loss",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "GI side effects (nausea, diarrhoea, metallic taste) — start low, titrate slowly with food",
          },
          {
            timeMinutes: BigInt(87600),
            description:
              "Vitamin B12 deficiency with long-term use — check annually",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Lactic acidosis risk (rare) — contraindicated if eGFR <30",
          },
        ],
        contraindications: [
          "eGFR <30 mL/min",
          "Hepatic failure",
          "IV contrast (hold 48 hours before/after)",
          "Acute illness/dehydration",
        ],
        drugInteractions: ["Contrast media", "Alcohol (lactic acidosis risk)"],
      },
      {
        id: "glipizide",
        name: "Glipizide (Sulfonylurea)",
        dosage: "5-20 mg/day",
        route: "Oral",
        duration: "Long-term",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Insulin secretagogue — glucose lowering effect within 30-60 min",
          },
          {
            timeMinutes: BigInt(10080),
            description: "HbA1c reduction 1-2% over 4-8 weeks",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(120),
            description:
              "HYPOGLYCAEMIA — most important SE; risk with missed meals, renal failure, elderly",
          },
          {
            timeMinutes: BigInt(43200),
            description: "Weight gain 2-4 kg over months",
          },
        ],
        contraindications: [
          "Type 1 DM",
          "DKA",
          "Renal/hepatic failure",
          "Pregnancy",
          "Sulfa drug allergy",
        ],
        drugInteractions: [
          "Fluconazole (potentiates hypoglycaemia)",
          "Beta-blockers (mask hypoglycaemia symptoms)",
          "NSAIDs",
        ],
      },
    ],
  },

  {
    id: "hypertension-primary",
    name: "Essential Hypertension",
    category: "NonCommunicable",
    icd10Code: "I10",
    description:
      "Primary (essential) hypertension — BP ≥140/90 mmHg (JNC 8, ESH) on ≥2 readings. Affects 283 million Indians (ICMR CARRS study). Leading risk factor for stroke, MI, CKD. India hypertension control cascade: only 37% diagnosed, 30% treated, 15% controlled — major health system gap.",
    subjectMapping: [
      "Medicine",
      "Pharmacology",
      "Cardiology",
      "Community Medicine",
    ],
    diagnosticCriteria:
      "Office BP: ≥140/90 mmHg on 2+ visits. ABPM/HBPM preferred for diagnosis. Grade 1: 140-159/90-99, Grade 2: 160-179/100-109, Grade 3: ≥180/110, Isolated systolic: ≥140/<90. Hypertensive urgency: BP>180/120 without organ damage. Emergency: with organ damage. ECG (LVH), echo, fundoscopy, RFT, urinalysis.",
    associatedDiseases: [
      "Coronary artery disease",
      "Stroke",
      "CKD",
      "Heart failure",
      "Hypertensive retinopathy",
      "Aortic dissection",
    ],
    clinicalSigns: {
      bp: "170/100 mmHg",
      hr: "82 bpm",
      temp: "37°C",
      rr: "18/min",
      spo2: "98%",
    },
    symptoms: [
      {
        name: "Headache",
        severity: BigInt(6),
        description:
          "Occipital headache — worse in morning, with exertion. 'Silent' in most cases.",
      },
      {
        name: "Epistaxis",
        severity: BigInt(5),
        description:
          "Spontaneous nosebleed — more associated with uncontrolled hypertensive emergency.",
      },
      {
        name: "Exertional Dyspnoea",
        severity: BigInt(6),
        description:
          "Left ventricular hypertrophy → diastolic dysfunction → breathlessness on exertion.",
      },
      {
        name: "Visual Disturbances",
        severity: BigInt(7),
        description:
          "Blurred vision, photopsia — hypertensive retinopathy, papilloedema in severe HTN.",
      },
      {
        name: "Chest Pain",
        severity: BigInt(8),
        description:
          "Angina (CAD complication) or aortic dissection (tearing/ripping pain — emergency).",
      },
    ],
    medicines: [
      {
        id: "amlodipine",
        name: "Amlodipine (CCB)",
        dosage: "5-10 mg once daily",
        route: "Oral",
        duration: "Long-term",
        goodEffects: [
          {
            timeMinutes: BigInt(240),
            description: "BP reduction begins 4-6 hours after first dose",
          },
          {
            timeMinutes: BigInt(10080),
            description:
              "Steady-state BP control achieved in 7-14 days of regular use",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Peripheral oedema (ankle swelling) — dose-related, common (10-30%)",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Headache, flushing, palpitations — vasodilatation effect",
          },
          {
            timeMinutes: BigInt(43200),
            description: "Gingival hyperplasia with long-term use",
          },
        ],
        contraindications: [
          "Severe aortic stenosis",
          "Cardiogenic shock",
          "Unstable angina (dihydropyridines)",
        ],
        drugInteractions: [
          "CYP3A4 inhibitors (ketoconazole, ritonavir) increase levels",
          "Simvastatin >20mg (increased myopathy risk)",
        ],
      },
      {
        id: "enalapril",
        name: "Enalapril (ACE Inhibitor)",
        dosage: "5-40 mg daily",
        route: "Oral",
        duration: "Long-term",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description: "ACE inhibition — BP reduction within 1-4 hours",
          },
          {
            timeMinutes: BigInt(131400),
            description:
              "Renoprotective — delays CKD progression in diabetic nephropathy",
          },
          {
            timeMinutes: BigInt(131400),
            description:
              "Mortality reduction in heart failure and post-MI (cardioprotective)",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Dry persistent cough (bradykinin accumulation) — 10-15% (switch to ARB)",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "First-dose hypotension (especially with diuretic/volume depletion) — start low dose",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Hyperkalaemia — monitor K+ levels especially with CKD, potassium-sparing diuretics",
          },
          {
            timeMinutes: BigInt(30),
            description:
              "Angioedema (rare, serious) — tongue/lip swelling requiring emergency airway management",
          },
        ],
        contraindications: [
          "Pregnancy (teratogenic — ABSOLUTELY CONTRAINDICATED)",
          "Bilateral renal artery stenosis",
          "Prior ACE inhibitor angioedema",
          "Hyperkalaemia (K >5.5)",
        ],
        drugInteractions: [
          "NSAIDs (reduce antihypertensive effect + AKI risk)",
          "Potassium-sparing diuretics (hyperkalaemia)",
          "Aliskiren (in DM/CKD — contraindicated)",
        ],
      },
    ],
  },

  {
    id: "acute-mi",
    name: "Acute Myocardial Infarction (STEMI)",
    category: "NonCommunicable",
    icd10Code: "I21",
    description:
      "Complete occlusion of coronary artery → myocardial ischaemia → necrosis. ST-elevation MI (STEMI): complete occlusion requiring urgent reperfusion. India mein STEMI burden is massive — younger patients (10-15 years earlier than Western cohorts), low thrombolysis rates in tier-2/3 cities. Golden hour reperfusion is key — time = myocardium.",
    subjectMapping: ["Medicine", "Pharmacology", "Cardiology"],
    diagnosticCriteria:
      "ECG: ST elevation ≥1mm in 2 consecutive limb leads or ≥2mm in V1-V6. New LBBB. 12-lead ECG within 10 minutes of presentation. Troponin I/T (elevated — may be normal in first 3-6 hours). CK-MB (complementary). Echocardiography (wall motion abnormality). Coronary angiography (definitive). Killip classification for haemodynamic assessment.",
    associatedDiseases: [
      "Cardiogenic shock",
      "Acute pulmonary oedema",
      "Arrhythmias",
      "Papillary muscle rupture",
      "VSD",
      "Post-MI pericarditis",
    ],
    clinicalSigns: {
      bp: "90/60 mmHg",
      hr: "115 bpm",
      temp: "37.5°C",
      rr: "26/min",
      spo2: "90%",
    },
    symptoms: [
      {
        name: "Crushing Chest Pain",
        severity: BigInt(10),
        description:
          "Severe retrosternal squeezing/pressure pain radiating to left arm, jaw, back. >20 minutes, not relieved by nitrates.",
      },
      {
        name: "Diaphoresis",
        severity: BigInt(8),
        description:
          "Profuse cold sweating — sympathetic activation in cardiogenic shock.",
      },
      {
        name: "Nausea/Vomiting",
        severity: BigInt(6),
        description:
          "Vagal response — especially in inferior MI (right coronary artery involvement).",
      },
      {
        name: "Syncope/Near-syncope",
        severity: BigInt(8),
        description:
          "Loss of consciousness — arrhythmia (VT, VF), cardiogenic shock, vasovagal (inferior MI).",
      },
      {
        name: "Breathlessness",
        severity: BigInt(8),
        description:
          "Acute pulmonary oedema — LV failure, frothy pink sputum in severe cases.",
      },
    ],
    medicines: [
      {
        id: "mona-ami",
        name: "Aspirin + Clopidogrel + Morphine (MONA Protocol)",
        dosage: "Aspirin 325mg + Clopidogrel 300-600mg loading",
        route: "Oral/IV",
        duration: "Acute management",
        goodEffects: [
          {
            timeMinutes: BigInt(15),
            description:
              "Aspirin: platelet aggregation inhibition within 15-30 minutes — clot propagation stopped",
          },
          {
            timeMinutes: BigInt(30),
            description:
              "Morphine 2-4mg IV: pain relief, reduces preload (reduces oxygen demand)",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Dual antiplatelet: DAPT maintains coronary patency post-PCI",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Morphine: respiratory depression, hypotension, nausea (ondansetron).",
          },
          {
            timeMinutes: BigInt(720),
            description:
              "Aspirin: GI upset, peptic ulcer risk — add PPI (pantoprazole)",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Clopidogrel: increased bleeding risk — critical before CABG (hold 5-7 days)",
          },
        ],
        contraindications: [
          "Aspirin: active GI bleeding, allergy (use prasugrel)",
          "Morphine: respiratory depression, head injury",
          "Avoid NSAIDs in MI",
        ],
        drugInteractions: [
          "PPIs with clopidogrel (reduced efficacy — omeprazole worst, use pantoprazole)",
          "Warfarin triple therapy (high bleed risk)",
        ],
      },
      {
        id: "streptokinase-thrombolysis",
        name: "Streptokinase (Thrombolysis)",
        dosage: "1.5 million units IV over 60 min",
        route: "Intravenous",
        duration: "Single infusion (within 12h of symptoms if PCI unavailable)",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Coronary artery recanalization — TIMI 2-3 flow in 50-60% within 90 minutes",
          },
          {
            timeMinutes: BigInt(90),
            description:
              "Reperfusion markers: chest pain relief, ST resolution ≥50%, reperfusion arrhythmia",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description: "Hypotension (slow infusion) — manage with IV fluids",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Haemorrhage — intracranial (1%), GI, access site (major bleed risk 10%)",
          },
          {
            timeMinutes: BigInt(60),
            description:
              "Allergic reaction (streptokinase is protein) — fever, rigors, anaphylaxis",
          },
        ],
        contraindications: [
          "Prior streptokinase within 6 months",
          "Recent surgery/trauma",
          "Active internal bleeding",
          "Intracranial neoplasm, AVM",
          "Previous haemorrhagic stroke",
          "BP >180/110",
        ],
        drugInteractions: [
          "Anticoagulants (warfarin, heparin) — additive bleeding risk",
        ],
      },
    ],
  },

  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease (COPD)",
    category: "NonCommunicable",
    icd10Code: "J44",
    description:
      "Progressive irreversible airflow limitation. India mein 55 million COPD patients — 4th leading cause of death. Biomass fuel/indoor air pollution (primary cause in rural India — 50% cases), smoking (urban India). GOLD guidelines for staging. Acute exacerbations drive disease progression.",
    subjectMapping: ["Medicine", "Pharmacology", "Pulmonology"],
    diagnosticCriteria:
      "Spirometry: post-bronchodilator FEV1/FVC <0.70 (gold standard). GOLD staging: Grade 1 (FEV1≥80%), Grade 2 (50-79%), Grade 3 (30-49%), Grade 4 (<30%). 6-MWT, mMRC dyspnoea scale, CAT score. CXR: hyperinflation, flattened diaphragm. ABG (hypoxaemia, hypercapnia in severe).",
    associatedDiseases: [
      "Cor pulmonale",
      "Respiratory failure",
      "Pulmonary hypertension",
      "Lung cancer",
      "Pneumonia",
      "Osteoporosis",
    ],
    clinicalSigns: {
      bp: "130/85 mmHg",
      hr: "92 bpm",
      temp: "37°C",
      rr: "26/min",
      spo2: "88%",
    },
    symptoms: [
      {
        name: "Progressive Dyspnoea",
        severity: BigInt(8),
        description:
          "Breathlessness on exertion progressing to rest — insidious, often underreported.",
      },
      {
        name: "Chronic Cough",
        severity: BigInt(7),
        description:
          "Morning cough with mucoid/mucopurulent sputum (chronic bronchitis variant).",
      },
      {
        name: "Barrel Chest",
        severity: BigInt(6),
        description:
          "Increased AP diameter — hyperinflation, pursed-lip breathing in emphysema.",
      },
      {
        name: "Cyanosis",
        severity: BigInt(8),
        description:
          "Peripheral/central cyanosis — 'Blue Bloater' type (chronic bronchitis) vs 'Pink Puffer' (emphysema).",
      },
      {
        name: "Wheeze",
        severity: BigInt(7),
        description:
          "Expiratory wheeze (more prolonged than asthma), reduced air entry.",
      },
    ],
    medicines: [
      {
        id: "tiotropium",
        name: "Tiotropium (LAMA)",
        dosage: "18 mcg/day",
        route: "Inhalation (Handihaler)",
        duration: "Long-term daily",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Bronchodilatation onset in 30 minutes post inhalation",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "24-hour bronchodilation — once-daily dosing convenience",
          },
          {
            timeMinutes: BigInt(131400),
            description:
              "Reduces exacerbations by 20-30%, improves exercise tolerance",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(30),
            description:
              "Dry mouth (most common, 14%) — anticholinergic effect",
          },
          {
            timeMinutes: BigInt(60),
            description: "Urinary retention (caution in BPH)",
          },
          {
            timeMinutes: BigInt(30),
            description: "Constipation, blurred vision (anticholinergic)",
          },
        ],
        contraindications: [
          "Narrow angle glaucoma",
          "Prostatic hyperplasia with urinary retention",
          "Hypersensitivity to tiotropium/atropine",
        ],
        drugInteractions: ["Other anticholinergics (additive effects)"],
      },
    ],
  },

  {
    id: "ischemic-stroke",
    name: "Ischemic Stroke",
    category: "NonCommunicable",
    icd10Code: "I63",
    description:
      "Cerebral infarction due to arterial occlusion (thrombosis/embolism). India mein 1.85 million stroke cases/year — 2nd leading cause of death. Stroke belt: north India high prevalence. Time-critical: 'Time is Brain' — 1.9 million neurons lost/minute. Thrombolysis window: 4.5 hours (eligible only 1-2% in India due to late presentation).",
    subjectMapping: ["Medicine", "Neurology", "Pharmacology"],
    diagnosticCriteria:
      "Clinical: FAST (Face, Arm, Speech, Time). NIHSS score. CT head (non-contrast — exclude haemorrhage before thrombolysis). MRI DWI (most sensitive early infarction). CTA/MRA (vessel occlusion). ECG (AF — source of cardioembolism). ECHO (cardioembolic source). CBC, PT/INR, blood glucose (exclude mimics).",
    associatedDiseases: [
      "Atrial fibrillation",
      "Hypertension",
      "Carotid artery stenosis",
      "Aspiration pneumonia",
      "DVT/PE",
      "Post-stroke epilepsy",
    ],
    clinicalSigns: {
      bp: "170/100 mmHg",
      hr: "88 bpm",
      temp: "37.5°C",
      rr: "20/min",
      spo2: "94%",
    },
    symptoms: [
      {
        name: "Sudden Hemiplegia",
        severity: BigInt(9),
        description:
          "Abrupt unilateral weakness/paralysis (arm > leg — MCA territory). UMN pattern: spasticity, hyperreflexia.",
      },
      {
        name: "Aphasia",
        severity: BigInt(8),
        description:
          "Broca's (expressive) or Wernicke's (receptive) aphasia — dominant hemisphere MCA stroke.",
      },
      {
        name: "Facial Deviation",
        severity: BigInt(7),
        description:
          "Contralateral lower facial droop — forehead spared (UMN) distinguishes from peripheral VII palsy.",
      },
      {
        name: "Homonymous Hemianopia",
        severity: BigInt(7),
        description:
          "Contralateral visual field defect — temporal/parietal optic radiation involvement.",
      },
      {
        name: "Sudden Onset",
        severity: BigInt(9),
        description:
          "Abrupt maximal onset distinguishes stroke from other neurological conditions.",
      },
    ],
    medicines: [
      {
        id: "rtpa-stroke",
        name: "IV Alteplase (rt-PA)",
        dosage: "0.9 mg/kg IV (max 90mg) — 10% bolus, 90% over 60 min",
        route: "Intravenous",
        duration: "Single infusion within 4.5 hours",
        goodEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Recanalization: excellent recovery (mRS 0-1) in 32% treated vs 26% placebo (NINDS trial)",
          },
          {
            timeMinutes: BigInt(90),
            description:
              "Earlier treatment = better outcome: NNT 9 at <90 min, NNT 14 at 3-4.5h",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Symptomatic intracranial haemorrhage (sICH) 6% — strict BP control during infusion",
          },
          {
            timeMinutes: BigInt(30),
            description:
              "Orolingual angioedema (ACE inhibitor interactions) — may need airway management",
          },
          {
            timeMinutes: BigInt(120),
            description: "Systemic haemorrhage — access sites, GI tract",
          },
        ],
        contraindications: [
          "Recent surgery <14 days",
          "BP >185/110 at time of treatment",
          "Prior intracranial haemorrhage",
          "Active internal bleeding",
          "Anticoagulation (INR>1.7)",
          "Seizure at onset (Todd's palsy mimic)",
          "Blood glucose <50 or >400 (treat first)",
        ],
        drugInteractions: [
          "Anticoagulants (absolute contraindication)",
          "Antiplatelet drugs (increased bleed risk within 24h)",
        ],
      },
      {
        id: "aspirin-stroke-secondary",
        name: "Aspirin (Secondary Prevention)",
        dosage: "75-100 mg once daily",
        route: "Oral",
        duration: "Long-term (start 24h after thrombolysis)",
        goodEffects: [
          {
            timeMinutes: BigInt(30),
            description: "Irreversible platelet cyclooxygenase inhibition",
          },
          {
            timeMinutes: BigInt(131400),
            description:
              "25% relative risk reduction for recurrent stroke/TIA (IST, CAST trials)",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description: "GI irritation — give enteric-coated form with food",
          },
          {
            timeMinutes: BigInt(720),
            description: "Aspirin-exacerbated respiratory disease (AERD)",
          },
        ],
        contraindications: ["Haemorrhagic stroke", "Active GI bleed"],
        drugInteractions: [
          "Warfarin",
          "Clopidogrel (dual therapy in ACS only)",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ZOONOTIC DISEASES
  // ══════════════════════════════════════════════════════════════

  {
    id: "brucellosis",
    name: "Brucellosis",
    category: "Zoonotic",
    icd10Code: "A23",
    description:
      "Brucella species (B. melitensis, B. abortus, B. suis) — direct contact with infected animals (cattle, goats, sheep) or consumption of unpasteurised milk/cheese. Rajasthan, Gujarat, Punjab, Haryana — livestock-rich states. Undulant fever pattern. Osteoarticular complications in 10-85%.",
    subjectMapping: ["Medicine", "Microbiology", "Pharmacology"],
    diagnosticCriteria:
      "Blood culture (gold standard — 90% sensitivity in bacteraemic phase, BACTEC preferred). SAT (Standard Agglutination Test) ≥1:160. Rose Bengal Plate Test (screening). ELISA IgM/IgG. CBC: leukopenia, anaemia, thrombocytopenia. LFT: mild elevation. Bone marrow culture (if blood culture negative). MRI spine/joints (spondylitis/arthritis).",
    associatedDiseases: [
      "Sacroiliitis",
      "Vertebral osteomyelitis",
      "Epididymo-orchitis",
      "Hepatitis",
      "Neurobrucellosis",
      "Endocarditis",
    ],
    clinicalSigns: {
      bp: "110/70 mmHg",
      hr: "95 bpm",
      temp: "102-104°F",
      rr: "20/min",
      spo2: "97%",
    },
    symptoms: [
      {
        name: "Undulant Fever",
        severity: BigInt(8),
        description:
          "Classic wave-like fever pattern — fever rises and falls cyclically, 2-5 weeks each cycle. Evening peaks.",
      },
      {
        name: "Night Sweats",
        severity: BigInt(7),
        description:
          "Drenching night sweats — hallmark constitutional symptom, similar to TB.",
      },
      {
        name: "Arthralgia/Sacroiliitis",
        severity: BigInt(8),
        description:
          "Large joint arthralgia, sacroiliac joint involvement — lower back pain with bilateral sacroiliac tenderness.",
      },
      {
        name: "Hepatosplenomegaly",
        severity: BigInt(6),
        description:
          "Enlarged tender liver and spleen — granulomatous infiltration.",
      },
      {
        name: "Epididymo-orchitis",
        severity: BigInt(6),
        description:
          "Unilateral painful testicular swelling — male patients, B. melitensis.",
      },
      {
        name: "Malaise/Depression",
        severity: BigInt(7),
        description:
          "Profound fatigue, depression — neuropsychiatric manifestations in neurobrucellosis.",
      },
    ],
    medicines: [
      {
        id: "doxycycline-rifampicin",
        name: "Doxycycline + Rifampicin",
        dosage: "Doxycycline 100mg BD + Rifampicin 600mg OD",
        route: "Oral",
        duration: "6 weeks (uncomplicated) to 3-6 months (complications)",
        goodEffects: [
          {
            timeMinutes: BigInt(2880),
            description: "Fever resolution within 3-7 days of dual therapy",
          },
          {
            timeMinutes: BigInt(43200),
            description:
              "Relapse rate <5% with 6-week regimen (vs 15-25% monotherapy)",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description:
              "Doxycycline: GI upset, photosensitivity, oesophagitis",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Rifampicin: orange discolouration (urine/tears/secretions), hepatotoxicity, drug interactions",
          },
        ],
        contraindications: [
          "Pregnancy (trimethoprim-sulfamethoxazole alternative)",
          "Children <8 years",
        ],
        drugInteractions: [
          "Rifampicin induces CYP450 (OCP, warfarin, antiretrovirals)",
          "Doxycycline with antacids/iron",
        ],
      },
    ],
  },

  {
    id: "kfd-kyasanur",
    name: "Kyasanur Forest Disease (KFD)",
    category: "Zoonotic",
    icd10Code: "A98.2",
    description:
      "KFD virus (Flavivirus) — tick-borne (Haemaphysalis spinigera) from forest areas of Karnataka (Shimoga, Uttara Kannada, Chickmagalur). Annual outbreaks Feb-May (peak tick activity). Associated with monkey deaths (sentinel events). Forest workers, tribal communities at risk. 2-10% mortality in severe neurological phase. KFD vaccine (formalin-killed) available in endemic areas.",
    subjectMapping: ["Medicine", "Microbiology", "Public Health"],
    diagnosticCriteria:
      "PCR (blood — acute phase, highly sensitive). ELISA IgM/IgG (from day 5-7). Virus isolation (BSL-3 facility). CBC: profound leukopenia (1000-2000/µL), thrombocytopenia, anaemia. LFT: elevated. Proteinuria, haematuria. CSF in neurological phase (lymphocytic pleocytosis). Monkey mortality surveillance.",
    associatedDiseases: [
      "Haemorrhagic fever",
      "Encephalitis (second phase)",
      "Hepatitis",
      "Renal failure",
      "Respiratory failure",
    ],
    clinicalSigns: {
      bp: "90/60 mmHg",
      hr: "115 bpm",
      temp: "104-106°F",
      rr: "26/min",
      spo2: "92%",
    },
    symptoms: [
      {
        name: "Abrupt Haemorrhagic Fever",
        severity: BigInt(9),
        description:
          "Sudden high fever with haemorrhagic manifestations — epistaxis, haemoptysis, GI bleeding, haematuria.",
      },
      {
        name: "Profound Myalgia",
        severity: BigInt(8),
        description:
          "Severe generalised muscle pain — debilitating, often prostrates the patient.",
      },
      {
        name: "Biphasic Illness",
        severity: BigInt(8),
        description:
          "Phase 1 (1-2 weeks fever/haemorrhage) → apparent recovery → Phase 2 neurological (meningitis, encephalitis) in 30-40% cases.",
      },
      {
        name: "Conjunctival Injection",
        severity: BigInt(5),
        description:
          "Bilateral conjunctival suffusion — early sign with periorbital oedema.",
      },
      {
        name: "Thrombocytopenia/Haemorrhage",
        severity: BigInt(9),
        description:
          "Platelet count <50,000, DIC features — haemorrhage from multiple sites.",
      },
    ],
    medicines: [
      {
        id: "ribavirin-kfd",
        name: "Ribavirin (Investigational) + Supportive Care",
        dosage:
          "2g loading, then 1g every 6h × 4 days, then 500mg every 8h × 6 days",
        route: "Oral/IV",
        duration: "10 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Antiviral activity against flaviviruses — reduces viral load",
          },
          {
            timeMinutes: BigInt(4320),
            description:
              "May reduce severity and duration if given early (day 1-3)",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Haemolytic anaemia — monitor haemoglobin (decrease dose if Hb <10)",
          },
          {
            timeMinutes: BigInt(120),
            description: "Nausea, headache, fatigue",
          },
          {
            timeMinutes: BigInt(720),
            description: "Teratogenic — strict contraception required",
          },
        ],
        contraindications: [
          "Pregnancy (teratogenic)",
          "Haemolytic anaemia",
          "Renal failure (GFR <50)",
        ],
        drugInteractions: ["Didanosine (pancreatitis/lactic acidosis)"],
      },
    ],
  },

  {
    id: "nipah-virus",
    name: "Nipah Virus Disease",
    category: "Zoonotic",
    icd10Code: "A98.8",
    description:
      "Paramyxovirus — fruit bats (Pteropus) reservoir. India outbreaks: Kerala 2018 (17 deaths), 2021 (1 death), 2023 (6 deaths). Human-to-human transmission (healthcare workers at risk — nosocomial clusters). Encephalitis dominant. Mortality 40-75%. No approved specific treatment (no licensed antiviral/vaccine).",
    subjectMapping: [
      "Medicine",
      "Microbiology",
      "Infectious Disease",
      "Public Health",
    ],
    diagnosticCriteria:
      "RT-PCR (blood, CSF, urine, throat swab). ELISA IgM/IgG (CDC approved). Cell culture (BSL-4 required). MRI brain: multifocal discrete lesions (white matter, brainstem). CDC/ICMR confirmation required. Contact history: bat exposure, date palm sap consumption (Bangladesh), exposure to sick patients.",
    associatedDiseases: [
      "ARDS",
      "Encephalitis",
      "Meningitis",
      "Multi-organ failure",
      "Healthcare worker transmission",
    ],
    clinicalSigns: {
      bp: "90/50 mmHg",
      hr: "120 bpm",
      temp: "104-105°F",
      rr: "32/min",
      spo2: "85%",
    },
    symptoms: [
      {
        name: "Encephalitis",
        severity: BigInt(10),
        description:
          "Rapid-onset encephalitis — fever, severe headache → confusion → coma within days.",
      },
      {
        name: "Myoclonus",
        severity: BigInt(8),
        description:
          "Segmental myoclonus, ataxia, dystonia — brainstem involvement characteristic.",
      },
      {
        name: "Respiratory Distress",
        severity: BigInt(9),
        description:
          "ARDS in Malaysian strain (pig exposure) — pulmonary involvement in India strains too.",
      },
      {
        name: "Seizures",
        severity: BigInt(8),
        description:
          "Focal and generalised seizures — early neurological deterioration.",
      },
      {
        name: "Pharyngitis/Cough",
        severity: BigInt(6),
        description:
          "Initial prodrome — fever, headache, pharyngitis before neurological manifestations.",
      },
    ],
    medicines: [
      {
        id: "favipiravir-nipah",
        name: "Favipiravir / Remdesivir (Investigational) + ICU Support",
        dosage: "Favipiravir: 1800mg BD day 1, then 800mg BD",
        route: "Oral/IV",
        duration: "5-14 days",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description:
              "Broad-spectrum antiviral — inhibits viral RNA polymerase",
          },
          {
            timeMinutes: BigInt(2880),
            description:
              "Case series suggest possible benefit if initiated early",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(1440),
            description: "Elevated uric acid, hepatotoxicity, teratogenicity",
          },
          {
            timeMinutes: BigInt(120),
            description: "GI intolerance",
          },
        ],
        contraindications: [
          "Pregnancy (teratogenic)",
          "Severe hepatic impairment",
        ],
        drugInteractions: ["Pyrazinamide (hyperuricaemia)"],
      },
    ],
  },

  {
    id: "q-fever",
    name: "Q Fever (Query Fever)",
    category: "Zoonotic",
    icd10Code: "A78",
    description:
      "Coxiella burnetii — obligate intracellular organism. Inhalation of contaminated aerosols (parturient ruminants — cattle, sheep, goats). Highly infectious (1 organism can cause disease). Common in Punjab, Haryana, Rajasthan. Acute: self-limited flu-like illness. Chronic: endocarditis (90% of chronic Q fever — often pre-existing valvular disease).",
    subjectMapping: ["Medicine", "Microbiology", "Pharmacology"],
    diagnosticCriteria:
      "ELISA: Phase II IgM/IgG (acute disease — phase II > phase I). Phase I IgG ≥1:800 (chronic Q fever — endocarditis). PCR blood (acute phase). CBC: thrombocytopenia, abnormal LFT. Echo (vegetations in chronic endocarditis). Liver biopsy: ring-granulomas ('doughnut granuloma') pathognomonic for Q fever hepatitis.",
    associatedDiseases: [
      "Chronic Q fever endocarditis",
      "Hepatitis",
      "Pneumonia",
      "Osteomyelitis",
      "Fatigue syndrome",
    ],
    clinicalSigns: {
      bp: "110/70 mmHg",
      hr: "95 bpm",
      temp: "102-103°F",
      rr: "22/min",
      spo2: "95%",
    },
    symptoms: [
      {
        name: "Fever + Severe Headache",
        severity: BigInt(8),
        description:
          "High fever with retro-orbital headache — acute Q fever flu-like presentation.",
      },
      {
        name: "Atypical Pneumonia",
        severity: BigInt(7),
        description:
          "Non-productive cough, patchy consolidation on CXR — atypical walking pneumonia.",
      },
      {
        name: "Hepatitis",
        severity: BigInt(6),
        description:
          "Granulomatous hepatitis — jaundice, elevated transaminases, ring granulomas on biopsy.",
      },
      {
        name: "Cardiac Murmur",
        severity: BigInt(8),
        description:
          "New/changed murmur in chronic Q fever — culture-negative endocarditis.",
      },
      {
        name: "Fatigue",
        severity: BigInt(7),
        description:
          "Prolonged fatigue post-acute illness — post-Q fever fatigue syndrome (QFFS).",
      },
    ],
    medicines: [
      {
        id: "doxycycline-qfever",
        name: "Doxycycline",
        dosage: "100 mg BD",
        route: "Oral",
        duration: "Acute: 2-3 weeks; Chronic endocarditis: 18-36 months",
        goodEffects: [
          {
            timeMinutes: BigInt(1440),
            description: "Fever defervescence within 2-4 days",
          },
          {
            timeMinutes: BigInt(10080),
            description: "Complete recovery in uncomplicated cases",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description: "GI upset, photosensitivity",
          },
          {
            timeMinutes: BigInt(43200),
            description:
              "Oesophageal erosion with long-term use (chronic therapy)",
          },
        ],
        contraindications: ["Pregnancy", "Children <8 years"],
        drugInteractions: [
          "Antacids",
          "Rifampicin (used as combination for chronic Q fever)",
        ],
      },
    ],
  },

  {
    id: "anthrax",
    name: "Anthrax",
    category: "Zoonotic",
    icd10Code: "A22",
    description:
      "Bacillus anthracis spore-forming gram-positive rod. Agricultural zoonosis — India: UP, MP, Rajasthan, Karnataka. Forms: cutaneous (most common, 95%), inhalational (woolsorter's disease), gastrointestinal, meningeal. Also a potential bioterrorism agent.",
    subjectMapping: ["Medicine", "Microbiology", "Public Health"],
    diagnosticCriteria:
      "Culture (blood, vesicular fluid, CSF) — safety protocols (BSL-3). Gram stain: large gram-positive rods in chains (bamboo cane appearance). PCR (pag gene). ELISA (anti-PA IgG). Skin lesion: black eschar (malignant pustule) — painless necrotic ulcer with vesicular ring. CXR in inhalational: widened mediastinum (haemorrhagic mediastinitis).",
    associatedDiseases: [
      "Haemorrhagic mediastinitis",
      "Meningitis",
      "Septicaemia",
      "Toxic shock",
    ],
    clinicalSigns: {
      bp: "80/50 mmHg",
      hr: "130 bpm",
      temp: "103°F",
      rr: "28/min",
      spo2: "88%",
    },
    symptoms: [
      {
        name: "Black Eschar",
        severity: BigInt(8),
        description:
          "PATHOGNOMONIC of cutaneous anthrax — painless black necrotic ulcer with oedema at inoculation site.",
      },
      {
        name: "Mediastinal Widening Symptoms",
        severity: BigInt(10),
        description:
          "Inhalational anthrax: fever → apparent improvement → rapid deterioration — haemorrhagic mediastinitis, shock, death within hours.",
      },
      {
        name: "Haemorrhagic Meningitis",
        severity: BigInt(9),
        description:
          "Sudden severe headache, meningism, haemorrhagic CSF — most common cause of anthrax death.",
      },
      {
        name: "Massive Oedema",
        severity: BigInt(7),
        description:
          "Brawny non-pitting oedema surrounding cutaneous lesion — anthrax toxin (LeTx + EdTx) mediated.",
      },
    ],
    medicines: [
      {
        id: "ciprofloxacin-anthrax",
        name: "Ciprofloxacin",
        dosage: "400 mg IV / 500 mg oral",
        route: "IV (severe) / Oral (cutaneous/prophylaxis)",
        duration: "Cutaneous: 7-10 days; Systemic/Inhalational: 60 days",
        goodEffects: [
          {
            timeMinutes: BigInt(120),
            description:
              "Rapid bactericidal effect — Bacillus anthracis sensitive",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Post-exposure prophylaxis: 60 days ciprofloxacin prevents disease after spore inhalation",
          },
        ],
        sideEffects: [
          {
            timeMinutes: BigInt(60),
            description: "GI intolerance, nausea",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "Tendinopathy/tendon rupture (especially Achilles) — avoid heavy exercise",
          },
          {
            timeMinutes: BigInt(1440),
            description:
              "QT prolongation, CNS effects (seizures in elderly/CRF)",
          },
        ],
        contraindications: [
          "Quinolone hypersensitivity",
          "Children (use if benefit outweighs risk)",
          "Pregnancy (only if no safer alternative)",
        ],
        drugInteractions: [
          "Antacids/multivitamins (reduce absorption — separate by 2h)",
          "Warfarin (enhances anticoagulation)",
          "Theophylline (toxicity)",
        ],
      },
    ],
  },
];
