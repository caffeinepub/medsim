export interface MbbsSubject {
  name: string;
  year: 1 | 2 | 3 | 4;
  yearLabel: string;
  icon: string;
}

export const MBBS_SUBJECTS: MbbsSubject[] = [
  { name: "Anatomy", year: 1, yearLabel: "Year 1 — Pre-clinical", icon: "🦷" },
  {
    name: "Physiology",
    year: 1,
    yearLabel: "Year 1 — Pre-clinical",
    icon: "⚡",
  },
  {
    name: "Biochemistry",
    year: 1,
    yearLabel: "Year 1 — Pre-clinical",
    icon: "🧪",
  },
  {
    name: "Pathology",
    year: 2,
    yearLabel: "Year 2 — Para-clinical",
    icon: "🔬",
  },
  {
    name: "Microbiology",
    year: 2,
    yearLabel: "Year 2 — Para-clinical",
    icon: "🦠",
  },
  {
    name: "Pharmacology",
    year: 2,
    yearLabel: "Year 2 — Para-clinical",
    icon: "💊",
  },
  {
    name: "Forensic Medicine & Toxicology",
    year: 2,
    yearLabel: "Year 2 — Para-clinical",
    icon: "⚖️",
  },
  {
    name: "Community Medicine",
    year: 2,
    yearLabel: "Year 2 — Para-clinical",
    icon: "🏘️",
  },
  { name: "Ophthalmology", year: 3, yearLabel: "Year 3 — Clinical", icon: "👁️" },
  { name: "ENT", year: 3, yearLabel: "Year 3 — Clinical", icon: "👂" },
  {
    name: "General Medicine",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🏥",
  },
  {
    name: "General Surgery",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🔪",
  },
  {
    name: "Obstetrics & Gynaecology",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🤱",
  },
  {
    name: "Paediatrics",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "👶",
  },
  {
    name: "Orthopaedics",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🦴",
  },
  {
    name: "Dermatology & Venereology",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🩹",
  },
  {
    name: "Psychiatry",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🧠",
  },
  {
    name: "Anaesthesia & Critical Care",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "😷",
  },
  {
    name: "Radiology",
    year: 4,
    yearLabel: "Final Year — Clinical",
    icon: "🩻",
  },
];

export const MBBS_SUBJECT_NAMES = MBBS_SUBJECTS.map((s) => s.name);

export function getSubjectIcon(name: string): string {
  return MBBS_SUBJECTS.find((s) => s.name === name)?.icon ?? "📋";
}

export function getSubjectsByYear(): Map<string, MbbsSubject[]> {
  const map = new Map<string, MbbsSubject[]>();
  for (const s of MBBS_SUBJECTS) {
    const list = map.get(s.yearLabel) ?? [];
    list.push(s);
    map.set(s.yearLabel, list);
  }
  return map;
}
