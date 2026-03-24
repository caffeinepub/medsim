/**
 * AI Medical Search Engine
 * Searches disease database locally with Hinglish/English support
 * before falling back to the backend AI.
 */

import type { Disease } from "../backend.d";

// ─── Hinglish keyword map ──────────────────────────────────────────────────

const HINGLISH_MAP: Record<string, string[]> = {
  bukhaar: ["fever"],
  bukhar: ["fever"],
  dard: ["pain"],
  khasi: ["cough"],
  khansi: ["cough"],
  "sans lena": ["breathing", "respiration"],
  sans: ["breathing", "respiration"],
  ulti: ["vomiting", "nausea"],
  dast: ["diarrhea", "loose stool"],
  "sir dard": ["headache"],
  thakaan: ["fatigue", "weakness"],
  thakan: ["fatigue", "weakness"],
  sujan: ["swelling", "edema"],
  chamdi: ["skin", "rash"],
  chamra: ["skin"],
  khujli: ["itching", "pruritus"],
  paseena: ["sweating", "perspiration"],
  kaanpna: ["chills", "rigors"],
  kaamp: ["chills"],
  bhook: ["appetite"],
  pyaas: ["thirst"],
  pet: ["abdomen", "stomach"],
  "pet dard": ["abdominal pain", "stomach pain"],
  jundis: ["jaundice"],
  pagalpan: ["confusion", "altered consciousness"],
  chakkar: ["dizziness", "vertigo"],
  aankhein: ["eyes", "vision"],
  kaala: ["black"],
  peshab: ["urine", "urination"],
  khoon: ["blood", "hemorrhage"],
  naak: ["nose"],
  muh: ["mouth"],
  gala: ["throat", "pharynx"],
  dil: ["heart"],
  seena: ["chest"],
  "seena dard": ["chest pain"],
  saans: ["breathing"],
  // Treatment/query intent
  ilaj: ["treatment", "therapy", "medicines"],
  dawa: ["medicine", "drug", "treatment"],
  dawai: ["medicine", "drug"],
  treatment: ["treatment"],
  lakshan: ["symptoms", "signs"],
  nishaan: ["signs", "symptoms"],
  pehchan: ["diagnosis", "identification"],
  diagnosis: ["diagnosis"],
  bachao: ["prevention", "prophylaxis"],
  rokna: ["prevention"],
  // Comparison intent
  farak: ["difference", "comparison", "versus"],
  antar: ["difference"],
  mein: ["in", "of"],
  aur: ["and"],
  ka: ["of", "for"],
  ki: ["of", "for"],
  ke: ["of", "for"],
};

// ─── Query intent detection ────────────────────────────────────────────────

export type QueryIntent =
  | "symptoms"
  | "treatment"
  | "diagnosis"
  | "comparison"
  | "general";

export interface ParsedQuery {
  intent: QueryIntent;
  terms: string[];
  diseaseNames: string[];
  comparisonPair?: [string, string];
}

export function parseQuery(query: string, diseases: Disease[]): ParsedQuery {
  const lower = query.toLowerCase().trim();

  // Expand Hinglish terms
  let expanded = lower;
  for (const [hin, eng] of Object.entries(HINGLISH_MAP)) {
    if (expanded.includes(hin)) {
      expanded = expanded.replace(
        new RegExp(hin, "g"),
        `${eng.join(" ")} ${hin}`,
      );
    }
  }

  // Detect intent
  let intent: QueryIntent = "general";
  if (/symptom|lakshan|sign|feel|hota|dikhna/i.test(expanded)) {
    intent = "symptoms";
  } else if (
    /treatment|ilaj|dawa|dawai|medicine|drug|therapy|cure|theek/i.test(expanded)
  ) {
    intent = "treatment";
  } else if (/diagnos|pehchan|test|confirm|kaise|criteria/i.test(expanded)) {
    intent = "diagnosis";
  } else if (
    /farak|antar|differ|vs|versus|compare|aur.*mein|between/i.test(expanded)
  ) {
    intent = "comparison";
  }

  // Extract key terms (remove stopwords)
  const stopWords = new Set([
    "ke",
    "ka",
    "ki",
    "mein",
    "hai",
    "hota",
    "hoti",
    "hain",
    "kya",
    "kaise",
    "toh",
    "to",
    "aur",
    "or",
    "and",
    "in",
    "of",
    "for",
    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "karo",
    "karo",
    "dena",
    "lena",
    "hoga",
    "hogi",
    "raha",
    "rahi",
    "wala",
    "wali",
    "wale",
    "se",
    "tak",
    "par",
    "pe",
    "per",
    "jo",
    "jab",
    "jahan",
    "symptoms",
    "treatment",
    "diagnosis",
    "medicine",
    "disease",
    "patient",
  ]);

  const terms = expanded
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ""))
    .filter((t) => t.length > 2 && !stopWords.has(t));

  // Find disease names mentioned
  const diseaseNames: string[] = [];
  for (const disease of diseases) {
    const nameLower = disease.name.toLowerCase();
    if (lower.includes(nameLower) || expanded.includes(nameLower)) {
      diseaseNames.push(disease.name);
    }
    // Also check icd10Code
    if (disease.icd10Code && lower.includes(disease.icd10Code.toLowerCase())) {
      if (!diseaseNames.includes(disease.name)) diseaseNames.push(disease.name);
    }
  }

  // Detect comparison pair
  let comparisonPair: [string, string] | undefined;
  if (intent === "comparison" && diseaseNames.length >= 2) {
    comparisonPair = [diseaseNames[0], diseaseNames[1]];
  }

  return { intent, terms, diseaseNames, comparisonPair };
}

// ─── Disease scoring ───────────────────────────────────────────────────────

interface ScoredDisease {
  disease: Disease;
  score: number;
}

export function searchDiseases(query: string, diseases: Disease[]): Disease[] {
  if (!diseases.length) return [];

  const parsed = parseQuery(query, diseases);
  const lower = query.toLowerCase();

  // If specific disease names found, prioritize them
  if (parsed.diseaseNames.length > 0) {
    const matched = diseases.filter((d) =>
      parsed.diseaseNames.some(
        (name) =>
          d.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(d.name.toLowerCase()),
      ),
    );
    if (matched.length > 0) return matched.slice(0, 5);
  }

  // Score every disease
  const scored: ScoredDisease[] = diseases.map((disease) => {
    let score = 0;
    const dName = disease.name.toLowerCase();
    const dDesc = disease.description.toLowerCase();
    const dCat = disease.category.toLowerCase();
    const dDiag = disease.diagnosticCriteria?.toLowerCase() ?? "";

    // Direct name match (highest weight)
    if (lower.includes(dName)) score += 100;
    if (dName.includes(lower.replace(/[^a-z0-9 ]/g, ""))) score += 80;

    // ICD code match
    if (disease.icd10Code && lower.includes(disease.icd10Code.toLowerCase()))
      score += 60;

    // Category match
    if (lower.includes(dCat)) score += 20;

    // Term matching
    for (const term of parsed.terms) {
      if (term.length < 3) continue;

      // Name contains term
      if (dName.includes(term)) score += 30;

      // Description contains term
      if (dDesc.includes(term)) score += 10;

      // Diagnostic criteria
      if (dDiag.includes(term)) score += 8;

      // Symptom name match
      for (const sym of disease.symptoms) {
        const sName = sym.name.toLowerCase();
        const sDesc = sym.description.toLowerCase();
        if (sName.includes(term) || term.includes(sName)) score += 15;
        if (sDesc.includes(term)) score += 5;
      }

      // Medicine name match
      for (const med of disease.medicines) {
        if (med.name.toLowerCase().includes(term)) score += 20;
      }

      // Associated diseases
      for (const assoc of disease.associatedDiseases) {
        if (assoc.toLowerCase().includes(term)) score += 8;
      }
    }

    return { disease, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.disease);
}

// ─── Response generation ───────────────────────────────────────────────────

export interface AISearchResult {
  type: "disease_info" | "comparison" | "symptom_match" | "no_match";
  diseases: Disease[];
  intent: QueryIntent;
  responseText: string;
  confidence: number;
}

export function generateResponse(
  query: string,
  diseases: Disease[],
  matchedDiseases: Disease[],
): AISearchResult {
  const parsed = parseQuery(query, diseases);

  if (matchedDiseases.length === 0) {
    return {
      type: "no_match",
      diseases: [],
      intent: parsed.intent,
      responseText:
        "No matching condition found in the clinical database. Please refine your query or consult the Drug Reference tool.",
      confidence: 0,
    };
  }

  // Comparison mode
  if (parsed.intent === "comparison" && matchedDiseases.length >= 2) {
    const d1 = matchedDiseases[0];
    const d2 = matchedDiseases[1];
    const text = buildComparisonText(d1, d2);
    return {
      type: "comparison",
      diseases: [d1, d2],
      intent: "comparison",
      responseText: text,
      confidence: 85,
    };
  }

  const primary = matchedDiseases[0];

  // Symptom intent
  if (parsed.intent === "symptoms") {
    return {
      type: "disease_info",
      diseases: matchedDiseases,
      intent: "symptoms",
      responseText: buildSymptomsText(primary),
      confidence: 90,
    };
  }

  // Treatment intent
  if (parsed.intent === "treatment") {
    return {
      type: "disease_info",
      diseases: matchedDiseases,
      intent: "treatment",
      responseText: buildTreatmentText(primary),
      confidence: 90,
    };
  }

  // Diagnosis intent
  if (parsed.intent === "diagnosis") {
    return {
      type: "disease_info",
      diseases: matchedDiseases,
      intent: "diagnosis",
      responseText: buildDiagnosisText(primary),
      confidence: 88,
    };
  }

  // General / symptom match
  return {
    type: "symptom_match",
    diseases: matchedDiseases,
    intent: "general",
    responseText: buildGeneralText(primary, matchedDiseases),
    confidence: 75,
  };
}

// ─── Text builders ─────────────────────────────────────────────────────────

function buildSymptomsText(d: Disease): string {
  const symList = d.symptoms
    .slice(0, 6)
    .map((s) => `• ${s.name}${s.description ? ` — ${s.description}` : ""}`)
    .join("\n");

  const clinicalSigns = d.clinicalSigns
    ? `**Clinical Signs:** BP ${d.clinicalSigns.bp}, HR ${d.clinicalSigns.hr}, Temp ${d.clinicalSigns.temp}°C, SpO2 ${d.clinicalSigns.spo2}%\n`
    : "";
  const associated = d.associatedDiseases.length
    ? `\n**Associated conditions:** ${d.associatedDiseases.slice(0, 4).join(", ")}`
    : "";
  return `**${d.name}** (${d.icd10Code}) ke primary symptoms:\n\n${symList}\n\n**Category:** ${d.category}\n${clinicalSigns}${associated}`;
}

function buildTreatmentText(d: Disease): string {
  const medList = d.medicines
    .slice(0, 5)
    .map((m) => {
      const route = m.route ? ` (${m.route})` : "";
      const ci = m.contraindications?.length
        ? `\n  ⚠ Contraindicated in: ${m.contraindications.slice(0, 2).join(", ")}`
        : "";
      return `• **${m.name}** — ${m.dosage}${route}${ci}`;
    })
    .join("\n");

  const diagCriteria = d.diagnosticCriteria
    ? `**Diagnosis confirm karne ke liye:** ${d.diagnosticCriteria.slice(0, 150)}...\n`
    : "";
  return `**${d.name}** ka treatment:\n\n**Medicines:**\n${medList}\n\n${diagCriteria}\n⚠ Yeh sirf educational reference hai. Actual prescription ke liye senior physician se consult karein.`;
}

function buildDiagnosisText(d: Disease): string {
  const criteria = d.diagnosticCriteria
    ? `**Diagnostic Criteria:**\n${d.diagnosticCriteria}\n\n`
    : "";
  const keySym = d.symptoms
    .filter((s) => Number(s.severity) >= 2)
    .slice(0, 4)
    .map((s) => `• ${s.name}`)
    .join("\n");
  const signs = d.clinicalSigns
    ? `\n\n**Expected Clinical Signs:**\n• BP: ${d.clinicalSigns.bp}\n• HR: ${d.clinicalSigns.hr}\n• Temp: ${d.clinicalSigns.temp}°C\n• SpO2: ${d.clinicalSigns.spo2}%`
    : "";
  return `**${d.name}** (ICD-10: ${d.icd10Code}) ki diagnosis:\n\n**Category:** ${d.category}\n\n${criteria}**Key Symptoms to look for:**\n${keySym}${signs}`;
}

function buildGeneralText(primary: Disease, all: Disease[]): string {
  const sym = primary.symptoms
    .slice(0, 4)
    .map((s) => s.name)
    .join(", ");
  const meds = primary.medicines
    .slice(0, 3)
    .map((m) => m.name)
    .join(", ");
  const symLine = sym ? `**Main Symptoms:** ${sym}\n` : "";
  const medsLine = meds ? `**Common Medicines:** ${meds}\n` : "";
  const related =
    all.length > 1
      ? `\n**Related conditions:** ${all
          .slice(1, 4)
          .map((d) => d.name)
          .join(", ")}`
      : "";
  return `**${primary.name}** (${primary.icd10Code})\n**Category:** ${primary.category}\n\n${primary.description}\n\n${symLine}${medsLine}${related}`;
}

function buildComparisonText(d1: Disease, d2: Disease): string {
  const sym1 = d1.symptoms
    .slice(0, 4)
    .map((s) => s.name)
    .join(", ");
  const sym2 = d2.symptoms
    .slice(0, 4)
    .map((s) => s.name)
    .join(", ");
  const med1 = d1.medicines
    .slice(0, 3)
    .map((m) => m.name)
    .join(", ");
  const med2 = d2.medicines
    .slice(0, 3)
    .map((m) => m.name)
    .join(", ");

  return `**${d1.name} vs ${d2.name}** comparison:\n\n| Feature | ${d1.name} | ${d2.name} |\n|---------|-----------|----------|\n| ICD-10 | ${d1.icd10Code} | ${d2.icd10Code} |\n| Category | ${d1.category} | ${d2.category} |\n| Key Symptoms | ${sym1 || "—"} | ${sym2 || "—"} |\n| Treatment | ${med1 || "—"} | ${med2 || "—"} |\n\n**${d1.name}:** ${d1.description.slice(0, 120)}...\n\n**${d2.name}:** ${d2.description.slice(0, 120)}...`;
}
