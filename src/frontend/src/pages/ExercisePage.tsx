import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GraduationCap,
  Lightbulb,
  Search,
  Send,
  Star,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState, useMemo, useRef } from "react";
import { toast } from "sonner";
import type {
  AdminAlert,
  Disease,
  PatientCase,
  PatientData,
} from "../backend.d";
import { EffectsTimeline } from "../components/EffectsTimeline";
import { VirtualPatient } from "../components/VirtualPatient";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllDiseases,
  useAllPatientCases,
  useCreateAdminAlert,
  useGetAIDiagnosis,
  useSubmitCaseAttempt,
} from "../hooks/useQueries";
import { MBBS_SUBJECTS, getSubjectsByYear } from "../lib/mbbs-subjects";
import { SEED_CASES } from "../lib/seed-cases";

// ─── Vitals parsing helpers ──────────────────────────────────────
/** Extract the first numeric value from strings like "110 bpm", "37.2°C", "98%", "16/min" */
function parseVitalNumber(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const match = raw.match(/[\d]+(?:\.[\d]+)?/);
  if (!match) return fallback;
  return Number.parseFloat(match[0]);
}

/** Parse BP string: may be "90/60 mmHg" → return "90/60", else fallback */
function parseVitalBP(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback;
  const match = raw.match(/[\d]+\/[\d]+/);
  return match ? match[0] : fallback;
}

type DifficultyColor = { bg: string; text: string; border: string };
const DIFFICULTY_COLORS: Record<string, DifficultyColor> = {
  Easy: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
  },
  Medium: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
  },
  Hard: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
  },
};

// ─── Difficulty Stats Card ────────────────────────────────────────

function DifficultyStatCard({
  label,
  count,
  total,
  colorClass,
  bgClass,
  borderClass,
}: {
  label: string;
  count: number;
  total: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div
      className={`flex flex-col gap-1.5 rounded-2xl border p-4 ${bgClass} ${borderClass}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}
        >
          {label}
        </span>
        <span className={`text-2xl font-black font-mono ${colorClass}`}>
          {count}
        </span>
      </div>
      <Progress value={pct} className="h-1.5" />
      <p className="text-xs text-muted-foreground">{pct}% of total cases</p>
    </div>
  );
}

// ─── Case Browser ──────────────────────────────────────────────────

function CaseBrowser({
  cases,
  diseases,
  isLoading,
  onSelectCase,
  onNavigate,
}: {
  cases: PatientCase[];
  diseases: Disease[];
  isLoading: boolean;
  onSelectCase: (c: PatientCase) => void;
  onNavigate?: (page: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Merge backend cases with seed cases (use seed when backend is empty)
  const allCases = useMemo<PatientCase[]>(
    () => (cases.length > 0 ? cases : (SEED_CASES as unknown as PatientCase[])),
    [cases],
  );

  // Difficulty counts (based on allCases)
  const easyCnt = useMemo(
    () => allCases.filter((c) => c.difficulty === "Easy").length,
    [allCases],
  );
  const mediumCnt = useMemo(
    () => allCases.filter((c) => c.difficulty === "Medium").length,
    [allCases],
  );
  const hardCnt = useMemo(
    () => allCases.filter((c) => c.difficulty === "Hard").length,
    [allCases],
  );

  const filtered = useMemo(() => {
    return allCases.filter((c) => {
      const disease = diseases.find((d) => d.id === c.diseaseId);
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.subject.toLowerCase().includes(search.toLowerCase()) ||
        (disease?.name || "").toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === "all" || disease?.category === categoryFilter;
      const matchSubject =
        subjectFilter === "all" || c.subject === subjectFilter;
      const matchDifficulty =
        difficultyFilter === "all" || c.difficulty === difficultyFilter;
      return matchSearch && matchCategory && matchSubject && matchDifficulty;
    });
  }, [
    allCases,
    search,
    categoryFilter,
    subjectFilter,
    difficultyFilter,
    diseases,
  ]);

  const getAgeDisplay = (ageMonths: bigint) => {
    const m = Number(ageMonths);
    if (m < 12) return `${m}m`;
    if (m < 24) return `${Math.floor(m / 12)}y ${m % 12}m`;
    return `${Math.floor(m / 12)}y`;
  };

  const difficultyTabs = ["all", "Easy", "Medium", "Hard"] as const;
  type DiffTab = (typeof difficultyTabs)[number];

  const tabLabel: Record<DiffTab, string> = {
    all: "All",
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard",
  };

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 sm:mb-6">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground">
            Exercise Mode
          </h1>
          <p className="text-muted-foreground">
            Apna case chunein aur diagnosis shuru karein
          </p>
        </div>

        {/* NEET PG Banner */}
        {onNavigate && (
          <motion.button
            type="button"
            data-ocid="exercise.neet_pg_banner.button"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNavigate("neet-pg")}
            className="mb-5 flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.06 235 / 0.8), oklch(0.18 0.05 235 / 0.7))",
              borderColor: "oklch(0.65 0.16 196 / 0.4)",
              boxShadow: "0 0 20px oklch(0.65 0.16 196 / 0.08)",
            }}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ background: "oklch(0.65 0.16 196 / 0.15)" }}
            >
              <GraduationCap
                className="h-5 w-5"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-display font-bold text-sm"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                NEET PG Practice Mode
              </p>
              <p
                className="text-xs truncate"
                style={{ color: "oklch(0.65 0.16 196)" }}
              >
                NEET PG standard MCQs — all 19 subjects, chapter-wise, with
                detailed explanations & references
              </p>
            </div>
            <ChevronRight
              className="h-4 w-4 flex-shrink-0"
              style={{ color: "oklch(0.65 0.16 196 / 0.6)" }}
            />
          </motion.button>
        )}

        {/* Difficulty Stats Row */}
        {!isLoading && allCases.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-3">
            <DifficultyStatCard
              label="Easy"
              count={easyCnt}
              total={allCases.length}
              colorClass="text-success"
              bgClass="bg-success/5"
              borderClass="border-success/20"
            />
            <DifficultyStatCard
              label="Medium"
              count={mediumCnt}
              total={allCases.length}
              colorClass="text-warning"
              bgClass="bg-warning/5"
              borderClass="border-warning/20"
            />
            <DifficultyStatCard
              label="Hard"
              count={hardCnt}
              total={allCases.length}
              colorClass="text-destructive"
              bgClass="bg-destructive/5"
              borderClass="border-destructive/20"
            />
          </div>
        )}

        {/* Difficulty Quick-Filter Tabs */}
        <div className="mb-4 flex gap-1 rounded-xl border border-border bg-muted/40 p-1">
          {difficultyTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={
                tab === "all"
                  ? "exercise.difficulty_all.tab"
                  : tab === "Easy"
                    ? "exercise.difficulty_easy.tab"
                    : tab === "Medium"
                      ? "exercise.difficulty_medium.tab"
                      : "exercise.difficulty_hard.tab"
              }
              onClick={() => setDifficultyFilter(tab)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                difficultyFilter === tab
                  ? tab === "all"
                    ? "bg-card text-foreground shadow-xs"
                    : tab === "Easy"
                      ? "bg-success/15 text-success shadow-xs"
                      : tab === "Medium"
                        ? "bg-warning/15 text-warning shadow-xs"
                        : "bg-destructive/15 text-destructive shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabLabel[tab]}
              {tab !== "all" && !isLoading && allCases.length > 0 && (
                <span className="ml-1.5 text-xs opacity-60">
                  (
                  {tab === "Easy"
                    ? easyCnt
                    : tab === "Medium"
                      ? mediumCnt
                      : hardCnt}
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-ocid="exercise.search_input"
              placeholder="Case, disease, ya subject search karein..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Communicable">Communicable</SelectItem>
              <SelectItem value="NonCommunicable">Non-Communicable</SelectItem>
              <SelectItem value="Zoonotic">Zoonotic</SelectItem>
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger
              data-ocid="exercise.subject.select"
              className="w-full sm:w-52"
            >
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {Array.from(getSubjectsByYear().entries()).map(
                ([yearLabel, subjects]) => (
                  <SelectGroup key={yearLabel}>
                    <SelectLabel>{yearLabel}</SelectLabel>
                    {subjects.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.icon} {s.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ),
              )}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject Stats Strip */}
        {!isLoading && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {MBBS_SUBJECTS.map((s) => {
              const count = allCases.filter((c) => c.subject === s.name).length;
              return (
                <button
                  key={s.name}
                  type="button"
                  data-ocid="exercise.subject.tab"
                  onClick={() => setSubjectFilter(s.name)}
                  className={`flex-shrink-0 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                    subjectFilter === s.name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.icon} {s.name}{" "}
                  <span className="ml-1 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Cases grid */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["c1", "c2", "c3", "c4", "c5", "c6"].map((id) => (
              <Skeleton key={id} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 && allCases.length === 0 ? (
          <div
            data-ocid="exercise.case.empty_state"
            className="rounded-2xl border border-dashed border-border py-16 text-center"
          >
            <Target className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="font-semibold text-muted-foreground">
              Koi case nahi mila
            </p>
            <p className="text-sm text-muted-foreground">
              Admin panel se cases add karein
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="exercise.case.empty_state"
            className="rounded-2xl border border-dashed border-border py-16 text-center"
          >
            <Target className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="font-semibold text-muted-foreground">
              Koi case nahi mila
            </p>
            <p className="text-sm text-muted-foreground">
              Filter change karein ya search modify karein
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => {
              const disease = diseases.find((d) => d.id === c.diseaseId);
              const diff =
                DIFFICULTY_COLORS[c.difficulty] || DIFFICULTY_COLORS.Medium;
              return (
                <motion.button
                  key={c.id}
                  data-ocid={`exercise.case.item.${i + 1}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                  onClick={() => onSelectCase(c)}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-medical"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-foreground line-clamp-2">
                      {c.title}
                    </h3>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${diff.bg} ${diff.text}`}
                    >
                      {c.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {c.chiefComplaint}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {c.subject}
                    </Badge>
                    {disease && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          disease.category === "Communicable"
                            ? "border-primary/30 text-primary"
                            : disease.category === "Zoonotic"
                              ? "border-warning/40 text-warning"
                              : "border-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        {disease.category}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Patient: {getAgeDisplay(c.patientAge)} {c.patientGender}
                    </span>
                    {c.patientDisability && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {c.patientDisability}
                      </span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Medicine Info Expandable ─────────────────────────────────────

function MedicineInfoPanel({
  medicine,
  index,
}: {
  medicine: {
    id: string;
    name: string;
    dosage: string;
    route: string;
    duration: string;
    contraindications: string[];
    sideEffects: Array<{ description: string; timeMinutes: bigint }>;
    goodEffects: Array<{ description: string; timeMinutes: bigint }>;
  };
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-1.5 text-xs">
      <button
        type="button"
        data-ocid={`exercise.medicine_info.toggle.${index}`}
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((v) => !v);
        }}
        className="flex items-center gap-1 text-primary/70 hover:text-primary transition-colors"
      >
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
        Medicine details
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 space-y-1.5 rounded-lg border border-border bg-muted/40 p-2.5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-background px-1.5 py-0.5 font-mono text-foreground/80">
                  {medicine.dosage}
                </span>
                <span className="rounded bg-background px-1.5 py-0.5 font-mono text-foreground/80">
                  {medicine.route}
                </span>
                <span className="rounded bg-background px-1.5 py-0.5 font-mono text-foreground/80">
                  {medicine.duration}
                </span>
              </div>
              {medicine.contraindications.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-destructive/80 mb-0.5">
                    Contraindications
                  </p>
                  <ul className="space-y-0.5">
                    {medicine.contraindications.slice(0, 3).map((c) => (
                      <li
                        key={c}
                        className="text-[11px] text-muted-foreground flex gap-1"
                      >
                        <span className="text-destructive/60">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {medicine.goodEffects.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-success/80 mb-0.5">
                    Good Effects
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {medicine.goodEffects[0]?.description}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Score Stars ──────────────────────────────────────────────────

function StarRating({ score }: { score: number }) {
  const stars = score >= 85 ? 3 : score >= 60 ? 2 : 1;
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((s) => (
        <motion.div
          key={s}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 + s * 0.1, type: "spring", stiffness: 300 }}
        >
          <Star
            className={`h-7 w-7 ${s <= stars ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Clinical Reasoning Guide ─────────────────────────────────────

function ClinicalReasoningGuide({
  disease,
  patientCase,
}: {
  disease: Disease;
  patientCase: PatientCase;
}) {
  const topSymptoms = [...disease.symptoms]
    .sort((a, b) => Number(b.severity) - Number(a.severity))
    .slice(0, 3);

  return (
    <motion.div
      data-ocid="exercise.clinical_guide.panel"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="rounded-xl border border-primary/20 bg-primary/5 p-4 overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-primary" />
        <h4 className="font-semibold text-sm text-primary">
          Clinical Reasoning Guide
        </h4>
      </div>

      {topSymptoms.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
            Key Clues Jo Point Karte The Correct Diagnosis Ki Taraf
          </p>
          <div className="space-y-1.5">
            {topSymptoms.map((sym) => (
              <div key={sym.name} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">
                    {sym.name}
                  </span>
                  {sym.description && (
                    <span className="text-muted-foreground">
                      {" "}
                      — {sym.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {disease.clinicalSigns.bp && (
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
            Clinical Signs
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              `BP: ${disease.clinicalSigns.bp}`,
              `HR: ${disease.clinicalSigns.hr}`,
              `Temp: ${disease.clinicalSigns.temp}`,
              `SpO2: ${disease.clinicalSigns.spo2}`,
              `RR: ${disease.clinicalSigns.rr}`,
            ].map((sign) => (
              <span
                key={sign}
                className="rounded-full bg-background border border-border px-2 py-0.5 text-xs font-mono text-foreground/80"
              >
                {sign}
              </span>
            ))}
          </div>
        </div>
      )}

      {patientCase.investigations && (
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
            Investigations Jo Confirm Karte
          </p>
          <p className="text-sm text-muted-foreground">
            {patientCase.investigations}
          </p>
        </div>
      )}

      {disease.diagnosticCriteria && (
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-primary/70 mb-1">
            Diagnostic Criteria
          </p>
          <p className="text-sm text-foreground/80">
            {disease.diagnosticCriteria}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Comprehensive Results Section ───────────────────────────────

function ComprehensiveResults({
  results,
  disease,
  patientCase,
  selectedDiagnosis,
  selectedMedicines,
  onBack,
  onComplete,
}: {
  results: {
    diagnosisCorrect: boolean;
    medicinesCorrect: string[];
    medicinesWrong: Array<{
      id: string;
      name: string;
      contraindications: string[];
      topSideEffects: string[];
      correctAlternative: string;
    }>;
    missedMedicines: Array<{ id: string; name: string }>;
  };
  disease: Disease;
  patientCase: PatientCase;
  selectedDiagnosis: string;
  selectedMedicines: string[];
  onBack: () => void;
  onComplete: () => void;
}) {
  // Score calculation: diagnosis = 50%, each correct medicine proportional to remaining 50%
  const totalCorrectMeds = patientCase.correctMedicines.length;
  const correctMedScore =
    totalCorrectMeds > 0
      ? (results.medicinesCorrect.length / totalCorrectMeds) * 50
      : 50;
  const diagScore = results.diagnosisCorrect ? 50 : 0;
  const totalScore = Math.round(diagScore + correctMedScore);

  const headingText =
    totalScore >= 85
      ? "Shabash! Bahut Sahi Kiya! 🎉"
      : totalScore >= 60
        ? "Theek Hai, Par Seekhne Ki Zarurat Hai"
        : "Kafi Galtiyan Hain — Revise Karein";

  const firstCorrectMed =
    results.medicinesCorrect.length > 0
      ? disease.medicines.find((m) => m.id === results.medicinesCorrect[0])
      : null;

  return (
    <motion.div
      key="results"
      data-ocid="exercise.results.section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* ── Score Card ── */}
      <div
        className={`rounded-2xl border-2 p-5 ${
          totalScore >= 85
            ? "border-success/40 bg-success/5"
            : totalScore >= 60
              ? "border-warning/40 bg-warning/5"
              : "border-destructive/40 bg-destructive/5"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-black text-foreground mb-1">
              {headingText}
            </h2>
            <p className="text-sm text-muted-foreground">
              {patientCase.subject} · {patientCase.difficulty} Case
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StarRating score={totalScore} />
            <div className="flex items-center gap-2">
              <Progress value={totalScore} className="w-24 h-2" />
              <span
                className={`font-mono font-black text-lg ${
                  totalScore >= 85
                    ? "text-success"
                    : totalScore >= 60
                      ? "text-warning"
                      : "text-destructive"
                }`}
              >
                {totalScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-border bg-card/60 p-2.5 flex items-center gap-2">
            {results.diagnosisCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            )}
            <div>
              <p className="font-semibold text-foreground">Diagnosis</p>
              <p className="text-muted-foreground">
                {results.diagnosisCorrect ? "+50 pts" : "+0 pts"}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-2.5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Medicines</p>
              <p className="text-muted-foreground">
                {results.medicinesCorrect.length}/{totalCorrectMeds} sahi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Diagnosis Review ── */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Diagnosis Review
        </h3>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground font-medium min-w-20">
              Aapne chuna:
            </span>
            <span
              className={`font-semibold ${results.diagnosisCorrect ? "text-success" : "text-destructive"}`}
            >
              {selectedDiagnosis}
              {results.diagnosisCorrect ? " ✓" : " ✗"}
            </span>
          </div>
          {!results.diagnosisCorrect && (
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground font-medium min-w-20">
                Sahi tha:
              </span>
              <span className="font-semibold text-success">
                {patientCase.correctDiagnosis} ✓
              </span>
            </div>
          )}
        </div>

        {/* Clinical reasoning guide — only on wrong diagnosis */}
        {!results.diagnosisCorrect && (
          <ClinicalReasoningGuide disease={disease} patientCase={patientCase} />
        )}
      </div>

      {/* ── Medicine Review ── */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Medicine Review
        </h3>

        <div className="space-y-2.5">
          {/* Correct medicines */}
          {results.medicinesCorrect.map((medId) => {
            const med = disease.medicines.find((m) => m.id === medId);
            if (!med) return null;
            const goodSummary =
              med.goodEffects[0]?.description || "Effective treatment";
            return (
              <motion.div
                key={medId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2.5 rounded-xl border border-success/25 bg-success/5 p-3"
              >
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{med.name}</p>
                  <p className="text-muted-foreground text-xs">{goodSummary}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Wrong medicines — with specific data-driven reasoning */}
          {results.medicinesWrong.map((wm) => (
            <motion.div
              key={wm.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-destructive/25 bg-destructive/5 p-3 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="font-semibold text-destructive text-sm">
                  {wm.name}
                </p>
              </div>
              {wm.contraindications.length > 0 && (
                <p className="text-xs text-muted-foreground pl-6">
                  <strong className="text-foreground/80">Kyun galat:</strong>{" "}
                  Yeh medicine contraindicated hai kyunki:{" "}
                  {wm.contraindications.slice(0, 2).join("; ")}
                </p>
              )}
              {wm.topSideEffects.length > 0 && (
                <p className="text-xs text-destructive/80 pl-6">
                  <strong>Side effects:</strong> {wm.topSideEffects.join(", ")}
                </p>
              )}
              <p className="text-xs text-success pl-6">
                <strong>Sahi alternative:</strong> {wm.correctAlternative}
              </p>
            </motion.div>
          ))}

          {/* Missed correct medicines */}
          {results.missedMedicines.map((mm) => (
            <motion.div
              key={mm.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2.5 rounded-xl border border-warning/25 bg-warning/5 p-3"
            >
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">{mm.name}</p>
                <p className="text-muted-foreground text-xs">
                  Aapne yeh miss kar diya — treatment ke liye important thi
                </p>
              </div>
            </motion.div>
          ))}

          {selectedMedicines.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Koi medicine select nahi ki gayi.
            </p>
          )}
        </div>
      </div>

      {/* ── Key Learning Points ── */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          Key Learning Points
        </h3>

        {disease.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {disease.description}
          </p>
        )}

        {disease.associatedDiseases.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
              Related Conditions to Study
            </p>
            <div className="flex flex-wrap gap-1.5">
              {disease.associatedDiseases.map((ad) => (
                <Badge key={ad} variant="outline" className="text-xs">
                  {ad}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── What to Study Next ── */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          Aage Kya Padhein?
        </h3>

        <div className="space-y-2 text-sm">
          {!results.diagnosisCorrect && (
            <div className="flex items-start gap-2 rounded-lg bg-background border border-border p-3">
              <span className="font-mono text-primary/60 text-xs mt-0.5">
                01
              </span>
              <p className="text-foreground/80">
                <strong className="text-foreground">
                  Revise {patientCase.subject}:
                </strong>{" "}
                Focus on diagnostic criteria for{" "}
                <em>{patientCase.correctDiagnosis}</em> — symptoms, signs, aur
                investigations.
              </p>
            </div>
          )}

          {results.medicinesWrong.length > 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-background border border-border p-3">
              <span className="font-mono text-primary/60 text-xs mt-0.5">
                {!results.diagnosisCorrect ? "02" : "01"}
              </span>
              <p className="text-foreground/80">
                <strong className="text-foreground">
                  Revise Pharmacology:
                </strong>{" "}
                {results.medicinesWrong.map((wm) => wm.name).join(", ")} ke
                contraindications aur alternatives revise karein.
              </p>
            </div>
          )}

          {results.diagnosisCorrect && results.medicinesWrong.length === 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-background border border-border p-3">
              <span className="font-mono text-success/60 text-xs mt-0.5">
                ✓
              </span>
              <p className="text-foreground/80">
                <strong className="text-success">Excellent performance!</strong>{" "}
                Is case mein sab kuch sahi kiya. Ek harder case try karein ya
                dusra subject explore karein.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Effects Timeline for first correct medicine ── */}
      {firstCorrectMed && (
        <EffectsTimeline
          medicineName={firstCorrectMed.name}
          goodEffects={firstCorrectMed.goodEffects}
          sideEffects={firstCorrectMed.sideEffects}
          autoPlay
        />
      )}

      {/* ── Actions ── */}
      <div className="flex gap-3">
        <Button
          data-ocid="exercise.results.new_case.button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Naya Case Chunein
        </Button>
        <Button
          data-ocid="exercise.results.home.button"
          onClick={onComplete}
          className="flex-1"
        >
          Home Jaao
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Case Solver ──────────────────────────────────────────────────

type SolverStep = "diagnose" | "medicines" | "results";

function CaseSolver({
  patientCase,
  disease,
  onBack,
  onComplete,
}: {
  patientCase: PatientCase;
  disease: Disease | undefined;
  onBack: () => void;
  onComplete: () => void;
}) {
  const { identity } = useInternetIdentity();
  const submitAttempt = useSubmitCaseAttempt();
  const aiDiagnosis = useGetAIDiagnosis();
  const createAlert = useCreateAdminAlert();

  const [step, setStep] = useState<SolverStep>("diagnose");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
  const [results, setResults] = useState<{
    diagnosisCorrect: boolean;
    medicinesCorrect: string[];
    medicinesWrong: Array<{
      id: string;
      name: string;
      contraindications: string[];
      topSideEffects: string[];
      correctAlternative: string;
    }>;
    missedMedicines: Array<{ id: string; name: string }>;
  } | null>(null);

  // AI Help Sheet state
  const [aiSheetOpen, setAiSheetOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState<{
    diagnoses: Array<{ diseaseId: string; name: string; icd10Code: string }>;
    reasoning: string;
    probability: number;
    escalated: boolean;
  } | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  const handleAIHelp = () => {
    // Pre-fill with case context
    const prefill = `Chief complaint: ${patientCase.chiefComplaint}. Symptoms: ${
      disease?.symptoms
        .slice(0, 3)
        .map((s) => s.name)
        .join(", ") || "See case"
    }`;
    setAiInput(prefill);
    setAiResponse(null);
    setAiSheetOpen(true);
  };

  const handleAIQuery = async () => {
    const userMsg = aiInput.trim();
    if (!userMsg || aiThinking) return;

    setAiThinking(true);
    setAiResponse(null);

    try {
      const patientData: PatientData = {
        id: crypto.randomUUID(),
        age: patientCase.patientAge,
        gender: patientCase.patientGender,
        symptoms: [userMsg, patientCase.chiefComplaint],
        history: patientCase.history,
        hasDisability: !!patientCase.patientDisability,
        allergies: [],
        medicinesChosen: [],
        diagnosisAttempt: userMsg,
        vitals: {
          bp: disease?.clinicalSigns.bp || "120/80",
          hr: BigInt(80),
          rr: BigInt(16),
          spo2: BigInt(98),
          temp: BigInt(37),
        },
        outcome: {
          isCorrect: false,
          effectsTimeline: [],
          details: "",
          responseTime: BigInt(0),
        },
      };

      const result = await aiDiagnosis.mutateAsync(patientData);
      const prob = Number(result.probability);
      const lowConf = prob < 50 || result.diagnosis.length === 0;

      let escalated = false;
      if (lowConf) {
        const alert: AdminAlert = {
          id: crypto.randomUUID(),
          title: "AI Unresolved Query",
          message: `Exercise case query: "${userMsg}" — AI could not confidently answer.`,
          status: "unresolved",
          severity: BigInt(2),
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
        };
        try {
          await createAlert.mutateAsync(alert);
          escalated = true;
        } catch {
          // silent
        }
      }

      setAiResponse({
        diagnoses: result.diagnosis,
        reasoning: result.reasoning,
        probability: prob,
        escalated,
      });
    } catch {
      toast.error("AI se response nahi mila");
    } finally {
      setAiThinking(false);
    }
  };

  // Build 4 diagnosis options (correct + 3 distractors)
  const diagnosisOptions = useMemo(() => {
    const correct = patientCase.correctDiagnosis;
    const distractors = [
      "Viral Upper Respiratory Tract Infection",
      "Type 2 Diabetes Mellitus",
      "Essential Hypertension",
      "Pulmonary Tuberculosis",
      "Dengue Fever",
      "Enteric Fever (Typhoid)",
      "Community-Acquired Pneumonia",
      "Urinary Tract Infection",
      "Acute Appendicitis",
      "Peptic Ulcer Disease",
    ].filter((d) => d !== correct);

    const shuffled = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correct, ...shuffled].sort(() => 0.5 - Math.random());
  }, [patientCase.correctDiagnosis]);

  // Build medicine options
  const medicineOptions = useMemo(() => {
    if (!disease) return [];
    return disease.medicines;
  }, [disease]);

  const handleDiagnosisSubmit = () => {
    if (!selectedDiagnosis) return;
    setStep("medicines");
  };

  const handleMedicinesSubmit = async () => {
    if (!disease) return;
    const diagnosisCorrect = selectedDiagnosis === patientCase.correctDiagnosis;
    const correctMedIds = patientCase.correctMedicines;

    const medicinesCorrect = selectedMedicines.filter((m) =>
      correctMedIds.includes(m),
    );

    // Wrong = chosen but not in correct list
    const medicinesWrong = selectedMedicines
      .filter((m) => !correctMedIds.includes(m))
      .map((medId) => {
        const med = disease.medicines.find((m) => m.id === medId);
        const contraindications = med?.contraindications || [];
        const topSideEffects = (med?.sideEffects || [])
          .slice(0, 2)
          .map((se) => se.description);
        const correctAlternative = correctMedIds
          .map((id) => disease.medicines.find((m) => m.id === id)?.name || id)
          .join(", ");

        // Data-driven reason using contraindications
        let reason: string;
        if (contraindications.length > 0) {
          reason = `Yeh medicine contraindicated hai kyunki: ${contraindications.slice(0, 2).join("; ")}`;
        } else if (topSideEffects.length > 0) {
          reason = `Is case mein appropriate nahi — significant side effects: ${topSideEffects.join(", ")}`;
        } else {
          reason = "Is case ke liye yeh medicine first-line treatment nahi hai";
        }

        return {
          id: medId,
          name: med?.name || medId,
          contraindications,
          topSideEffects,
          correctAlternative,
          reason,
          sideEffect: topSideEffects.join(", ") || "Side effects possible",
          correct: correctAlternative,
        };
      });

    // Missed = in correct list but not chosen
    const missedMedicines = correctMedIds
      .filter((id) => !selectedMedicines.includes(id))
      .map((id) => {
        const med = disease.medicines.find((m) => m.id === id);
        return { id, name: med?.name || id };
      });

    const isCorrect = diagnosisCorrect && medicinesCorrect.length > 0;

    const attempt = {
      caseId: patientCase.id,
      studentId: identity?.getPrincipal().toString() || "anonymous",
      subject: patientCase.subject,
      diagnosisChosen: selectedDiagnosis,
      medicinesChosen: selectedMedicines,
      isCorrect,
      wrongDiagnosis: !diagnosisCorrect
        ? {
            explanation: `Aapne "${selectedDiagnosis}" choose kiya tha, lekin correct tha "${patientCase.correctDiagnosis}"`,
            correctDiagnosis: patientCase.correctDiagnosis,
          }
        : undefined,
      wrongMedicines: medicinesWrong.map((wm) => ({
        medicineId: wm.id,
        reason: wm.reason,
        sideEffect: wm.sideEffect,
        correctAlternative: wm.correct,
      })),
      outcome: {
        isCorrect,
        effectsTimeline: [],
        details: isCorrect
          ? "Sahi diagnosis aur treatment!"
          : "Galat choice. Review karein.",
        responseTime: BigInt(Date.now()) * BigInt(1_000_000),
      },
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    };

    try {
      await submitAttempt.mutateAsync(attempt);
      setResults({
        diagnosisCorrect,
        medicinesCorrect,
        medicinesWrong,
        missedMedicines,
      });
      setStep("results");
    } catch {
      toast.error("Attempt submit nahi hua. Try again.");
    }
  };

  const symptoms = disease?.symptoms.map((s) => s.name) || [];

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Wapas
          </Button>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-black text-foreground">
              {patientCase.title}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{patientCase.subject}</Badge>
              <Badge
                variant="outline"
                className={
                  patientCase.difficulty === "Hard"
                    ? "border-destructive/30 text-destructive"
                    : patientCase.difficulty === "Easy"
                      ? "border-success/30 text-success"
                      : "border-warning/30 text-warning"
                }
              >
                {patientCase.difficulty}
              </Badge>
            </div>
          </div>

          {/* Step indicator */}
          <div className="hidden items-center gap-2 sm:flex">
            {(["diagnose", "medicines", "results"] as SolverStep[]).map(
              (s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : i < ["diagnose", "medicines", "results"].indexOf(step)
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && <div className="h-px w-6 bg-border" />}
                </React.Fragment>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Patient info panel */}
          <div className="space-y-4">
            {/* Vitals */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-foreground">
                  Patient Information
                </h2>
                <Button
                  data-ocid="exercise.ai_help.open_modal_button"
                  size="sm"
                  variant="outline"
                  onClick={handleAIHelp}
                  className="gap-1.5 text-xs"
                  style={{
                    borderColor: "oklch(0.65 0.16 196 / 0.4)",
                    color: "oklch(0.65 0.16 196)",
                  }}
                >
                  <Brain className="h-3.5 w-3.5" />
                  AI Se Poochho
                </Button>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  { label: "BP", value: disease?.clinicalSigns.bp || "120/80" },
                  { label: "HR", value: disease?.clinicalSigns.hr || "82/min" },
                  {
                    label: "Temp",
                    value: disease?.clinicalSigns.temp || "37.2°C",
                  },
                  {
                    label: "SpO2",
                    value: disease?.clinicalSigns.spo2 || "98%",
                  },
                  { label: "RR", value: disease?.clinicalSigns.rr || "16/min" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-muted/30 p-3 text-center"
                  >
                    <p className="font-mono text-base font-bold text-foreground">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-foreground">
                    Chief Complaint:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {patientCase.chiefComplaint}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    History:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {patientCase.history}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    Examination:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {patientCase.examinationFindings}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    Investigations:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {patientCase.investigations}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Diagnosis */}
              {step === "diagnose" && (
                <motion.div
                  key="diagnose"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs select-none-important"
                >
                  <h2 className="font-display mb-1 text-lg font-bold text-foreground">
                    Apna Diagnosis Chuno
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Patient ke symptoms aur history ke basis pe diagnosis select
                    karein
                  </p>
                  <div className="space-y-2">
                    {diagnosisOptions.map((option, idx) => (
                      <button
                        type="button"
                        key={option}
                        data-ocid={`exercise.diagnosis_option.${idx + 1}`}
                        onClick={() => setSelectedDiagnosis(option)}
                        className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                          selectedDiagnosis === option
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40 hover:bg-muted/40"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex-shrink-0 ${
                            selectedDiagnosis === option
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {selectedDiagnosis === option && (
                            <div className="h-full w-full rounded-full flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-foreground">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                  <Button
                    data-ocid="exercise.diagnosis.submit_button"
                    className="mt-4 w-full"
                    disabled={!selectedDiagnosis}
                    onClick={handleDiagnosisSubmit}
                  >
                    Diagnosis Confirm Karein →
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Medicines */}
              {step === "medicines" && (
                <motion.div
                  key="medicines"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs select-none-important"
                >
                  <h2 className="font-display mb-1 text-lg font-bold text-foreground">
                    Medicine Select Karo
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Is patient ke liye suitable medicines chunein — info icon se
                    details dekhein
                  </p>

                  {medicineOptions.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Is disease ke liye medicine data available nahi
                    </p>
                  ) : (
                    <ScrollArea className="max-h-[460px]">
                      <div className="space-y-2 pr-2">
                        {medicineOptions.map((med, idx) => (
                          <div
                            key={med.id}
                            data-ocid={`exercise.medicine.item.${idx + 1}`}
                            className={`rounded-xl border-2 p-4 transition-all ${
                              selectedMedicines.includes(med.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                id={med.id}
                                checked={selectedMedicines.includes(med.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedMedicines((prev) => [
                                      ...prev,
                                      med.id,
                                    ]);
                                  } else {
                                    setSelectedMedicines((prev) =>
                                      prev.filter((id) => id !== med.id),
                                    );
                                  }
                                }}
                                className="mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <Label
                                  htmlFor={med.id}
                                  className="cursor-pointer font-semibold text-foreground"
                                >
                                  {med.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {med.dosage} • {med.route} • {med.duration}
                                </p>
                                <MedicineInfoPanel
                                  medicine={med}
                                  index={idx + 1}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}

                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("diagnose")}
                    >
                      ← Wapas
                    </Button>
                    <Button
                      data-ocid="exercise.medicine.submit_button"
                      className="flex-1"
                      disabled={
                        selectedMedicines.length === 0 ||
                        submitAttempt.isPending
                      }
                      onClick={handleMedicinesSubmit}
                    >
                      {submitAttempt.isPending ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submit Ho Raha Hai...
                        </>
                      ) : (
                        "Results Dekho →"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Comprehensive Results */}
              {step === "results" && results && disease && (
                <ComprehensiveResults
                  results={results}
                  disease={disease}
                  patientCase={patientCase}
                  selectedDiagnosis={selectedDiagnosis}
                  selectedMedicines={selectedMedicines}
                  onBack={onBack}
                  onComplete={onComplete}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Virtual patient column */}
          <div className="space-y-4">
            <VirtualPatient
              ageMonths={Number(patientCase.patientAge)}
              gender={
                patientCase.patientGender.toLowerCase() === "female"
                  ? "female"
                  : patientCase.patientGender.toLowerCase() === "other"
                    ? "other"
                    : "male"
              }
              disability={patientCase.patientDisability}
              symptoms={symptoms}
              diseaseName={disease?.name}
              bp={parseVitalBP(disease?.clinicalSigns?.bp, "120/80")}
              hr={parseVitalNumber(disease?.clinicalSigns?.hr, 72)}
              temp={parseVitalNumber(disease?.clinicalSigns?.temp, 37)}
              spo2={parseVitalNumber(disease?.clinicalSigns?.spo2, 98)}
              rr={parseVitalNumber(disease?.clinicalSigns?.rr, 16)}
              outcome={
                step === "results" && results
                  ? results.diagnosisCorrect
                    ? "improving"
                    : "worsening"
                  : "neutral"
              }
              animating
            />

            {/* Disease info */}
            {disease && (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm">
                <p className="mb-2 font-semibold text-foreground">
                  ICD-10: {disease.icd10Code}
                </p>
                <div className="flex flex-wrap gap-1">
                  {disease.subjectMapping.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Help Sheet */}
      <Sheet open={aiSheetOpen} onOpenChange={setAiSheetOpen}>
        <SheetContent
          data-ocid="exercise.ai_help.sheet"
          side="right"
          className="w-[380px] flex flex-col p-0 sm:max-w-[380px]"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.17 0.05 235) 0%, oklch(0.15 0.04 230) 100%)",
            borderLeft: "1px solid oklch(0.35 0.06 230)",
          }}
        >
          <SheetHeader
            className="border-b px-5 py-4"
            style={{ borderColor: "oklch(0.28 0.05 235)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.35 0.1 230))",
                }}
              >
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <SheetTitle
                  className="font-display text-base"
                  style={{ color: "oklch(0.92 0.015 215)" }}
                >
                  AI Medical Assistant
                </SheetTitle>
                <p
                  className="text-[11px]"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  Case ke baare mein poochho
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* AI Response area */}
          <div className="flex-1 overflow-y-auto px-5 py-4" ref={aiScrollRef}>
            {!aiResponse && !aiThinking && (
              <div
                className="rounded-xl border p-4 text-sm"
                style={{
                  background: "oklch(0.22 0.05 230 / 0.5)",
                  borderColor: "oklch(0.35 0.06 230)",
                  color: "oklch(0.75 0.02 215)",
                }}
              >
                <p className="leading-relaxed">
                  Is case ke symptoms ke baare mein AI se guidance lo. AI
                  directly correct answer nahi batayega — sirf clinical
                  reasoning mein help karega.
                </p>
              </div>
            )}

            {aiThinking && (
              <div
                className="flex items-center gap-2 rounded-xl border p-4"
                style={{
                  background: "oklch(0.22 0.05 230 / 0.5)",
                  borderColor: "oklch(0.35 0.06 230)",
                }}
              >
                {[0, 0.15, 0.3].map((delay) => (
                  <motion.span
                    key={delay}
                    className="h-2 w-2 rounded-full"
                    style={{ background: "oklch(0.65 0.16 196)" }}
                    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay,
                    }}
                  />
                ))}
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.02 215)" }}
                >
                  AI soch raha hai...
                </span>
              </div>
            )}

            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Low confidence warning */}
                {(aiResponse.probability < 50 ||
                  aiResponse.diagnoses.length === 0) && (
                  <div
                    className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
                    style={{
                      background: "oklch(0.55 0.18 68 / 0.12)",
                      border: "1px solid oklch(0.72 0.16 68 / 0.35)",
                      color: "oklch(0.78 0.14 68)",
                    }}
                  >
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    <span>Yeh sawaal expert ko forward kar diya gaya</span>
                  </div>
                )}

                {/* Diagnoses (without revealing correct answer directly) */}
                {aiResponse.diagnoses.length > 0 && (
                  <div
                    className="rounded-xl border p-3 space-y-2"
                    style={{
                      background: "oklch(0.22 0.05 230 / 0.6)",
                      borderColor: "oklch(0.35 0.06 230)",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Possible Differential Diagnoses
                    </p>
                    {aiResponse.diagnoses.map((d) => (
                      <div
                        key={d.diseaseId}
                        className="flex items-center justify-between text-xs"
                      >
                        <span
                          className="font-medium"
                          style={{ color: "oklch(0.88 0.015 215)" }}
                        >
                          {d.name}
                        </span>
                        {d.icd10Code && (
                          <span
                            className="font-mono text-[10px]"
                            style={{ color: "oklch(0.55 0.12 196)" }}
                          >
                            {d.icd10Code}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Reasoning */}
                {aiResponse.reasoning && (
                  <div
                    className="rounded-xl border p-3 space-y-1.5"
                    style={{
                      background: "oklch(0.22 0.05 230 / 0.6)",
                      borderColor: "oklch(0.35 0.06 230)",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Clinical Reasoning
                    </p>
                    <blockquote
                      className="text-xs leading-relaxed italic border-l-2 pl-3"
                      style={{
                        borderColor: "oklch(0.65 0.16 196 / 0.4)",
                        color: "oklch(0.75 0.02 215)",
                      }}
                    >
                      {aiResponse.reasoning}
                    </blockquote>
                  </div>
                )}

                {/* Confidence */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "oklch(0.6 0.02 215)" }}>
                      AI Confidence
                    </span>
                    <span
                      className="font-mono font-bold"
                      style={{
                        color:
                          aiResponse.probability >= 70
                            ? "oklch(0.65 0.16 152)"
                            : aiResponse.probability >= 50
                              ? "oklch(0.72 0.16 68)"
                              : "oklch(0.65 0.22 27)",
                      }}
                    >
                      {aiResponse.probability}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full"
                    style={{ background: "oklch(0.28 0.05 230)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${aiResponse.probability}%`,
                        background:
                          aiResponse.probability >= 70
                            ? "oklch(0.65 0.16 152)"
                            : aiResponse.probability >= 50
                              ? "oklch(0.72 0.16 68)"
                              : "oklch(0.65 0.22 27)",
                      }}
                    />
                  </div>
                </div>

                {aiResponse.escalated && (
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
                    style={{
                      background: "oklch(0.65 0.16 196 / 0.08)",
                      border: "1px solid oklch(0.65 0.16 196 / 0.2)",
                      color: "oklch(0.65 0.16 196)",
                    }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Expert ko alert bhej diya gaya</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 border-t p-4 space-y-2"
            style={{ borderColor: "oklch(0.28 0.05 235)" }}
          >
            <Textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Case ke baare mein sawaal likhein..."
              rows={3}
              className="resize-none text-xs"
              style={{
                background: "oklch(0.22 0.05 230 / 0.6)",
                border: "1px solid oklch(0.35 0.06 230)",
                color: "oklch(0.88 0.015 215)",
              }}
              disabled={aiThinking}
            />
            <Button
              onClick={handleAIQuery}
              disabled={!aiInput.trim() || aiThinking}
              className="w-full gap-2 text-sm"
              style={{
                background:
                  aiInput.trim() && !aiThinking
                    ? "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.38 0.1 220))"
                    : "oklch(0.25 0.05 230)",
                border: "none",
              }}
            >
              {aiThinking ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {aiThinking ? "AI Soch Raha Hai..." : "AI Se Poochho"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Main ExercisePage ────────────────────────────────────────────

export function ExercisePage({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const { data: cases = [], isLoading: casesLoading } = useAllPatientCases();
  const { data: diseases = [], isLoading: diseasesLoading } = useAllDiseases();

  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);

  const isLoading = casesLoading || diseasesLoading;
  const disease = selectedCase
    ? diseases.find((d) => d.id === selectedCase.diseaseId)
    : undefined;

  if (selectedCase) {
    return (
      <CaseSolver
        patientCase={selectedCase}
        disease={disease}
        onBack={() => setSelectedCase(null)}
        onComplete={() => onNavigate("home")}
      />
    );
  }

  return (
    <CaseBrowser
      cases={cases}
      diseases={diseases}
      isLoading={isLoading}
      onSelectCase={setSelectedCase}
      onNavigate={onNavigate}
    />
  );
}

export default ExercisePage;
