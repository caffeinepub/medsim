import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  HelpCircle,
  Pill,
  Search,
  Send,
  Sparkles,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AdminAlert, Disease, PatientData } from "../backend.d";
import {
  useAllDiseases,
  useCreateAIEscalationAlert,
  useGetAIDiagnosis,
} from "../hooks/useQueries";
import { generateResponse, searchDiseases } from "../lib/aiSearch";

// ─── Types ────────────────────────────────────────────────────────

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  responseType?:
    | "disease_info"
    | "comparison"
    | "symptom_match"
    | "no_match"
    | "backend";
  diseases?: Disease[];
  intent?: string;
  reasoning?: string;
  probability?: number;
  escalated?: boolean;
  timestamp: number;
}

// ─── Quick suggestion chips ───────────────────────────────────────

const QUICK_SUGGESTIONS = [
  "Malaria ke symptoms?",
  "Dengue ka treatment?",
  "TB ki diagnosis kaise hoti hai?",
  "Diabetes management?",
  "Hypertension ki medicines?",
  "What is the difference between Dengue and Typhoid?",
];

// ─── Confidence color helper ──────────────────────────────────────

function confidenceColor(prob: number): string {
  if (prob >= 70) return "oklch(0.65 0.16 152)";
  if (prob >= 50) return "oklch(0.72 0.16 68)";
  return "oklch(0.65 0.22 27)";
}

// ─── Typed response text renderer ────────────────────────────────

function ResponseText({ text }: { text: string }) {
  // Split into lines and render basic markdown (bold, bullets)
  // Keys use position + prefix to satisfy lint rules for static text content
  const lines = text.split("\n");
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const lineKey = `line-${i}`;
        if (!line.trim()) return <div key={lineKey} className="h-1" />;

        // Bold headers **text**
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p
              key={lineKey}
              className="font-bold mt-2"
              style={{ color: "oklch(0.85 0.12 196)" }}
            >
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }

        // Inline bold text
        const parts = line.split(/\*\*(.*?)\*\*/g);
        if (parts.length > 1) {
          return (
            <p key={lineKey} style={{ color: "oklch(0.85 0.015 215)" }}>
              {parts.map((part, j) =>
                j % 2 === 1 ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <strong key={j} style={{ color: "oklch(0.92 0.015 215)" }}>
                    {part}
                  </strong>
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <span key={j}>{part}</span>
                ),
              )}
            </p>
          );
        }

        // Bullet points
        if (line.startsWith("•") || line.startsWith("-")) {
          return (
            <p
              key={lineKey}
              className="pl-2 flex gap-1.5"
              style={{ color: "oklch(0.78 0.02 215)" }}
            >
              <span style={{ color: "oklch(0.65 0.16 196)" }}>•</span>
              <span>{line.replace(/^[•\-]\s*/, "")}</span>
            </p>
          );
        }

        // Warning lines
        if (line.startsWith("⚠")) {
          return (
            <p
              key={lineKey}
              className="text-xs"
              style={{ color: "oklch(0.72 0.16 68)" }}
            >
              {line}
            </p>
          );
        }

        // Table rows
        if (line.startsWith("|")) {
          return (
            <p
              key={lineKey}
              className="font-mono text-xs"
              style={{ color: "oklch(0.72 0.02 215)" }}
            >
              {line}
            </p>
          );
        }

        return (
          <p key={lineKey} style={{ color: "oklch(0.78 0.02 215)" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── Disease Card (compact) ────────────────────────────────────────

function DiseaseCard({
  disease,
  showDetail = false,
}: { disease: Disease; showDetail?: boolean }) {
  const [expanded, setExpanded] = useState(showDetail);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.19 0.045 230 / 0.8)",
        border: "1px solid oklch(0.32 0.055 230 / 0.6)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-start justify-between gap-2 px-3.5 py-3 text-left"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.95 0.015 215)" }}
            >
              {disease.name}
            </p>
            {disease.icd10Code && (
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: "oklch(0.65 0.16 196 / 0.12)",
                  color: "oklch(0.65 0.16 196)",
                }}
              >
                {disease.icd10Code}
              </span>
            )}
          </div>
          <p
            className="mt-0.5 text-[11px] leading-snug"
            style={{ color: "oklch(0.62 0.02 215)" }}
          >
            {disease.description.slice(0, 80)}
            {disease.description.length > 80 ? "…" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            className="text-[10px] font-medium"
            style={{
              background: "oklch(0.65 0.16 196 / 0.12)",
              color: "oklch(0.72 0.12 196)",
              border: "1px solid oklch(0.65 0.16 196 / 0.25)",
            }}
          >
            {disease.category}
          </Badge>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.02 230)" }}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-3.5 pb-3.5 pt-0 space-y-3"
              style={{ borderTop: "1px solid oklch(0.28 0.05 230 / 0.5)" }}
            >
              {/* Symptoms */}
              {disease.symptoms.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Thermometer
                      className="h-3 w-3"
                      style={{ color: "oklch(0.72 0.16 68)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Symptoms
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 6).map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-0.5 rounded-full text-[10px]"
                        style={{
                          background: "oklch(0.55 0.18 68 / 0.1)",
                          border: "1px solid oklch(0.72 0.16 68 / 0.2)",
                          color: "oklch(0.78 0.12 68)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Signs */}
              {disease.clinicalSigns && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Stethoscope
                      className="h-3 w-3"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Clinical Signs
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "BP", value: disease.clinicalSigns.bp },
                      { label: "HR", value: disease.clinicalSigns.hr },
                      {
                        label: "Temp",
                        value: `${disease.clinicalSigns.temp}°C`,
                      },
                      {
                        label: "SpO2",
                        value: `${disease.clinicalSigns.spo2}%`,
                      },
                      { label: "RR", value: disease.clinicalSigns.rr },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg px-2 py-1.5 text-center"
                        style={{ background: "oklch(0.15 0.04 230 / 0.8)" }}
                      >
                        <p
                          className="text-[9px] font-bold uppercase"
                          style={{ color: "oklch(0.55 0.02 215)" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-[11px] font-mono font-bold"
                          style={{ color: "oklch(0.78 0.14 196)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {disease.medicines.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Pill
                      className="h-3 w-3"
                      style={{ color: "oklch(0.65 0.16 152)" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Medicines
                    </p>
                  </div>
                  <div className="space-y-1">
                    {disease.medicines.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        className="flex items-start justify-between gap-2 rounded-lg px-2.5 py-1.5"
                        style={{ background: "oklch(0.16 0.04 230 / 0.6)" }}
                      >
                        <div className="min-w-0">
                          <p
                            className="text-[11px] font-semibold"
                            style={{ color: "oklch(0.88 0.015 215)" }}
                          >
                            {m.name}
                          </p>
                          <p
                            className="text-[10px]"
                            style={{ color: "oklch(0.58 0.02 215)" }}
                          >
                            {m.dosage}
                            {m.route ? ` · ${m.route}` : ""}
                          </p>
                        </div>
                        {m.contraindications?.length > 0 && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{
                              background: "oklch(0.65 0.22 27 / 0.1)",
                              color: "oklch(0.72 0.18 27)",
                            }}
                          >
                            ⚠ CI
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated diseases */}
              {disease.associatedDiseases.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.65 0.16 196)" }}
                  >
                    Associated Conditions
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "oklch(0.62 0.02 215)" }}
                  >
                    {disease.associatedDiseases.slice(0, 5).join(", ")}
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

// ─── Typing Indicator ─────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2"
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "oklch(0.25 0.055 230)" }}
      >
        <Brain className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
        style={{
          background: "oklch(0.22 0.05 230 / 0.8)",
          border: "1px solid oklch(0.35 0.06 230)",
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
      </div>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <Skeleton
        className="h-20 w-20 rounded-2xl"
        style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
      />
      <div className="space-y-2 w-48">
        <Skeleton
          className="h-4 w-full rounded"
          style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
        />
        <Skeleton
          className="h-3 w-4/5 mx-auto rounded"
          style={{ background: "oklch(0.25 0.055 230 / 0.5)" }}
        />
      </div>
      <p
        className="text-xs animate-pulse"
        style={{ color: "oklch(0.55 0.12 196)" }}
      >
        Loading disease database…
      </p>
    </div>
  );
}

// ─── AI Message Bubble ────────────────────────────────────────────

function AIMessageBubble({
  message,
  index,
}: {
  message: AIMessage;
  index: number;
}) {
  if (message.role === "user") {
    return (
      <motion.div
        data-ocid={`ai_assistant.message.item.${index + 1}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3 text-sm"
          style={{
            background: "oklch(0.45 0.12 200)",
            color: "oklch(0.96 0.01 215)",
          }}
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  const prob = message.probability ?? 0;
  const isLowConfidence = prob < 50;
  const showNeedMoreInfo =
    message.responseType === "no_match" ||
    (prob === 0 && !message.diseases?.length);

  return (
    <motion.div
      data-ocid={`ai_assistant.message.item.${index + 1}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 }}
      className="flex items-end gap-2"
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "oklch(0.25 0.055 230)" }}
      >
        <Brain className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
      </div>

      <div className="max-w-[84%] space-y-2">
        {/* Main card */}
        <div
          className="rounded-2xl rounded-bl-sm px-4 py-3.5 space-y-3"
          style={{
            background: "oklch(0.22 0.05 230 / 0.8)",
            border: "1px solid oklch(0.35 0.06 230)",
            color: "oklch(0.88 0.015 215)",
          }}
        >
          {/* No match / need more info */}
          {showNeedMoreInfo && (
            <div
              className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs"
              style={{
                background: "oklch(0.45 0.12 200 / 0.1)",
                border: "1px solid oklch(0.55 0.12 200 / 0.3)",
                color: "oklch(0.75 0.10 200)",
              }}
            >
              <HelpCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold">Tell me more details</p>
                <p className="opacity-80">
                  Disease ka naam, symptoms, ya medicines likhein taaki AI
                  better answer de sake.
                </p>
              </div>
            </div>
          )}

          {/* Escalation warning */}
          {isLowConfidence && !showNeedMoreInfo && (
            <div
              className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
              style={{
                background: "oklch(0.55 0.18 68 / 0.12)",
                border: "1px solid oklch(0.72 0.16 68 / 0.35)",
                color: "oklch(0.78 0.14 68)",
              }}
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="font-medium">
                Low confidence — yeh sawaal expert ko forward kar diya gaya
              </span>
            </div>
          )}

          {/* Response text */}
          {message.content && !showNeedMoreInfo && (
            <ResponseText text={message.content} />
          )}

          {/* Disease cards */}
          {message.diseases && message.diseases.length > 0 && (
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-1.5">
                <Stethoscope
                  className="h-3.5 w-3.5"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  {message.responseType === "comparison"
                    ? "Comparison"
                    : "Disease Info"}
                </p>
              </div>
              {message.diseases.map((disease, di) => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  showDetail={di === 0}
                />
              ))}
            </div>
          )}

          {/* Confidence bar */}
          {message.probability !== undefined && message.probability > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "oklch(0.58 0.02 215)" }}>
                  AI Confidence
                </span>
                <span
                  className="font-mono font-bold"
                  style={{ color: confidenceColor(prob) }}
                >
                  {prob}%
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ background: "oklch(0.28 0.05 230)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prob}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: confidenceColor(prob) }}
                />
              </div>
            </div>
          )}

          {/* Escalated note */}
          {message.escalated && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
              style={{
                background: "oklch(0.65 0.16 196 / 0.08)",
                border: "1px solid oklch(0.65 0.16 196 / 0.2)",
                color: "oklch(0.65 0.16 196)",
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Expert ko alert bhej diya gaya hai</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p
          className="pl-1 text-[10px]"
          style={{ color: "oklch(0.5 0.02 230)" }}
        >
          {new Date(message.timestamp).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────

export function AIAssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: diseases = [], isLoading: diseasesLoading } = useAllDiseases();
  const aiDiagnosis = useGetAIDiagnosis();
  const escalationAlert = useCreateAIEscalationAlert();

  // Scroll to bottom on new messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered intentionally on message/thinking state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking]);

  // ── Quick search bar handler ──────────────────────────────────

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchQuery("");
    processQuery(q);
  };

  // ── Core query processor ──────────────────────────────────────

  const processQuery = async (userMessage: string) => {
    if (!userMessage || isThinking) return;
    setIsThinking(true);

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // 1. Search local disease database first
      const matched = searchDiseases(userMessage, diseases);
      const localResult = generateResponse(userMessage, diseases, matched);

      if (localResult.type !== "no_match") {
        // Local result found — use it
        const aiMsg: AIMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: localResult.responseText,
          responseType: localResult.type,
          diseases: localResult.diseases,
          intent: localResult.intent,
          probability: localResult.confidence,
          escalated: false,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        return;
      }

      // 2. Fallback to backend AI
      const patientData: PatientData = {
        id: crypto.randomUUID(),
        age: BigInt(
          Number.parseInt(localStorage.getItem("medsim_age") || "25") || 25,
        ),
        gender: localStorage.getItem("medsim_gender") || "unknown",
        symptoms: userMessage
          .split(/[,،;।]+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2)
          .slice(0, 5),
        history: userMessage,
        hasDisability: false,
        allergies: [],
        medicinesChosen: [],
        diagnosisAttempt: userMessage,
        vitals: {
          bp: "120/80",
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
          message: `Student question: "${userMessage}" — AI could not confidently answer. Confidence: ${prob}%.`,
          status: "unresolved",
          severity: BigInt(2),
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
        };
        try {
          await escalationAlert.mutateAsync(alert);
          escalated = true;
        } catch {
          // Silent
        }
      }

      const aiMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.reasoning || "No answer found.",
        responseType: "backend",
        diseases: result.diagnosis.map((d) => ({
          id: d.diseaseId,
          name: d.name,
          icd10Code: d.icd10Code,
          description: d.description,
          category: d.category,
          symptoms: d.symptoms ?? [],
          medicines:
            diseases.find((ld) => ld.id === d.diseaseId)?.medicines ?? [],
          diagnosticCriteria: "",
          clinicalSigns: { bp: "—", hr: "—", rr: "—", spo2: "—", temp: "—" },
          associatedDiseases: [],
          subjectMapping: [],
        })),
        reasoning: result.reasoning,
        probability: prob,
        escalated,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "An error occurred. Please try again.",
        probability: 0,
        escalated: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage || isThinking) return;
    setInput("");
    processQuery(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.045 235) 0%, oklch(0.14 0.04 230) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 border-b px-3 sm:px-5 py-3 sm:py-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.17 0.05 235 / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl animate-monitor-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.35 0.1 230))",
              }}
            >
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1
                className="font-display text-lg font-black"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                AI Medical Assistant
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.65 0.16 196)" }}>
                {diseasesLoading
                  ? "Loading disease database…"
                  : `${diseases.length} diseases loaded · Apna medical sawaal poochho`}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${diseasesLoading ? "opacity-50" : "animate-pulse"}`}
                style={{ background: "oklch(0.65 0.16 152)" }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.65 0.02 215)" }}
              >
                {diseasesLoading ? "Loading" : "Online"}
              </span>
            </div>
          </div>

          {/* Quick search bar */}
          <form onSubmit={handleQuickSearch} className="relative group">
            {/* Animated outer glow ring */}
            <div
              className="absolute -inset-[1.5px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.16 196), oklch(0.58 0.18 240), oklch(0.65 0.16 152), oklch(0.65 0.16 196))",
                backgroundSize: "300% 100%",
                animation: "searchGradientShift 3s linear infinite",
                filter: "blur(3px)",
              }}
            />
            {/* Static subtle border always visible */}
            <div
              className="absolute -inset-[1px] rounded-xl"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.45 0.10 196 / 0.5), oklch(0.38 0.08 240 / 0.4), oklch(0.45 0.10 152 / 0.5))",
              }}
            />
            {/* Inner container */}
            <div
              className="relative flex items-center rounded-xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.06 230 / 0.95), oklch(0.17 0.05 235 / 0.95))",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Left icon with pulse */}
              <div className="relative pl-3.5 flex-shrink-0">
                <Search
                  className="h-4 w-4 pointer-events-none"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                {/* Ping dot on icon */}
                <span
                  className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "oklch(0.65 0.16 152)",
                    animation: !diseasesLoading
                      ? "ping 2s cubic-bezier(0,0,0.2,1) infinite"
                      : "none",
                    opacity: 0.75,
                  }}
                />
              </div>
              <Input
                ref={searchRef}
                data-ocid="ai_assistant.search_input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  diseasesLoading
                    ? "Database load ho rahi hai..."
                    : "Bimari ka naam, symptoms, ya dawa likhein… jaise Malaria, bukhaar, Paracetamol"
                }
                className="flex-1 border-0 bg-transparent pl-2.5 pr-2 text-sm h-11 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[oklch(0.45_0.05_220)]"
                style={{
                  color: "oklch(0.90 0.015 215)",
                }}
                disabled={diseasesLoading}
              />
              {/* Search button */}
              <div className="pr-1.5 flex-shrink-0">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: searchQuery.trim()
                      ? "linear-gradient(135deg, oklch(0.48 0.14 200), oklch(0.38 0.10 225))"
                      : "oklch(0.28 0.06 230 / 0.7)",
                    color: searchQuery.trim()
                      ? "oklch(0.96 0.01 215)"
                      : "oklch(0.50 0.03 220)",
                    boxShadow: searchQuery.trim()
                      ? "0 0 10px oklch(0.55 0.14 200 / 0.4)"
                      : "none",
                    border: searchQuery.trim()
                      ? "1px solid oklch(0.58 0.14 196 / 0.4)"
                      : "1px solid oklch(0.35 0.05 230 / 0.5)",
                  }}
                  disabled={!searchQuery.trim() || diseasesLoading}
                >
                  <Sparkles className="h-3 w-3" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-3xl space-y-4 px-3 sm:px-5 py-4 sm:py-6">
          {/* Loading skeleton */}
          {diseasesLoading && messages.length === 0 && <LoadingSkeleton />}

          {/* Empty state */}
          {!diseasesLoading && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 py-12 text-center"
            >
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.12 200 / 0.3), oklch(0.35 0.1 230 / 0.2))",
                  border: "1px solid oklch(0.65 0.16 196 / 0.3)",
                }}
              >
                <Brain
                  className="h-10 w-10"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                <Sparkles
                  className="absolute -right-1 -top-1 h-5 w-5"
                  style={{ color: "oklch(0.72 0.16 68)" }}
                />
              </div>
              <div>
                <p
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.88 0.015 215)" }}
                >
                  AI Medical Assistant
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.02 230)" }}
                >
                  {diseases.length > 0
                    ? `${diseases.length} Indian diseases loaded. Use the search bar or chat below.`
                    : "Koi bhi medical sawaal poochho — symptoms, diseases, medicines..."}
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-full px-3 py-1.5 text-xs transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "oklch(0.25 0.055 230 / 0.6)",
                      border: "1px solid oklch(0.35 0.06 230)",
                      color: "oklch(0.75 0.12 196)",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* DB stats */}
              {diseases.length > 0 && (
                <div
                  className="flex items-center gap-4 rounded-xl px-5 py-3 text-xs"
                  style={{
                    background: "oklch(0.20 0.05 230 / 0.6)",
                    border: "1px solid oklch(0.32 0.055 230 / 0.4)",
                  }}
                >
                  {[
                    {
                      label: "Communicable",
                      count: diseases.filter(
                        (d) =>
                          d.category.toLowerCase().includes("communicable") &&
                          !d.category.toLowerCase().includes("non"),
                      ).length,
                    },
                    {
                      label: "Non-communicable",
                      count: diseases.filter((d) =>
                        d.category.toLowerCase().includes("non-communicable"),
                      ).length,
                    },
                    {
                      label: "Zoonotic",
                      count: diseases.filter((d) =>
                        d.category.toLowerCase().includes("zoonotic"),
                      ).length,
                    },
                  ].map(({ label, count }) => (
                    <div key={label} className="text-center">
                      <p
                        className="text-base font-bold font-mono"
                        style={{ color: "oklch(0.72 0.14 196)" }}
                      >
                        {count}
                      </p>
                      <p style={{ color: "oklch(0.55 0.02 215)" }}>{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Message list */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <AIMessageBubble key={msg.id} message={msg} index={i} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>{isThinking && <TypingIndicator />}</AnimatePresence>
        </div>
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0 border-t px-3 sm:px-5 pt-3 pb-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.15 0.05 235 / 0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          {/* Decorative label badge */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: "oklch(0.65 0.22 152)" }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "oklch(0.65 0.16 196)" }}
              >
                Medical AI Chat
              </span>
              <span
                className="text-[10px]"
                style={{ color: "oklch(0.45 0.05 230)" }}
              >
                —
              </span>
              <span
                className="text-[10px]"
                style={{ color: "oklch(0.50 0.04 220)" }}
              >
                {isThinking ? "Processing…" : "Ready"}
              </span>
            </div>
            <div
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5"
              style={{
                background: "oklch(0.25 0.08 200 / 0.4)",
                border: "1px solid oklch(0.45 0.12 196 / 0.3)",
              }}
            >
              <Brain
                className="h-2.5 w-2.5"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
              <span
                className="text-[9px] font-semibold"
                style={{ color: "oklch(0.62 0.12 196)" }}
              >
                ICMR DB
              </span>
            </div>
          </div>

          {/* Input + Send row */}
          <div className="flex items-end gap-3">
            {/* Glowing textarea wrapper */}
            <div className="relative flex-1 group/input">
              {/* Always-on ambient glow (pulsing) */}
              <div
                className="absolute -inset-[2px] rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.18 196 / 0.35), oklch(0.48 0.16 240 / 0.25), oklch(0.55 0.18 152 / 0.2))",
                  animation: "chatInputAmbient 4s ease-in-out infinite",
                  filter: "blur(4px)",
                }}
              />
              {/* Focus-triggered gradient ring */}
              <div
                className="absolute -inset-[1.5px] rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.18 196), oklch(0.55 0.2 240), oklch(0.65 0.18 152), oklch(0.58 0.16 200), oklch(0.65 0.18 196))",
                  backgroundSize: "400% 100%",
                  animation:
                    "chatGradientShift 3s linear infinite, chatGlow 2s ease-in-out infinite",
                  filter: "blur(2px)",
                }}
              />
              {/* Static border */}
              <div
                className="absolute -inset-[1px] rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.40 0.10 196 / 0.6), oklch(0.35 0.08 240 / 0.4), oklch(0.40 0.10 152 / 0.5))",
                }}
              />
              {/* Inner textarea container */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.06 230 / 0.95), oklch(0.17 0.05 235 / 0.98))",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Shimmer scan line */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                  style={{ zIndex: 1 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "60%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.65 0.16 196 / 0.06), transparent)",
                      animation: "chatScanLine 4s ease-in-out infinite",
                    }}
                  />
                </div>
                <Textarea
                  ref={textareaRef}
                  data-ocid="ai_assistant.textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Apna medical sawaal yahan likhein… (Enter bhejo, Shift+Enter nayi line)"
                  rows={2}
                  className="resize-none text-sm relative"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "oklch(0.90 0.015 215)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "12px 16px",
                    zIndex: 2,
                    caretColor: "oklch(0.65 0.16 196)",
                  }}
                  disabled={isThinking}
                />
              </div>
            </div>

            {/* Send button — large, vibrant */}
            <div className="relative flex-shrink-0 group/send">
              {/* Button ambient glow */}
              <div
                className="absolute -inset-[3px] rounded-xl opacity-60 group-hover/send:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    input.trim() && !isThinking
                      ? "linear-gradient(135deg, oklch(0.55 0.18 196), oklch(0.45 0.16 220))"
                      : "oklch(0.30 0.06 230)",
                  filter: "blur(6px)",
                  animation:
                    input.trim() && !isThinking
                      ? "sendButtonPulse 2s ease-in-out infinite"
                      : "none",
                }}
              />
              <Button
                data-ocid="ai_assistant.submit_button"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="relative h-[72px] w-14 flex-shrink-0 rounded-xl transition-all duration-300 active:scale-95 group-hover/send:scale-105 border-0"
                style={{
                  background:
                    input.trim() && !isThinking
                      ? "linear-gradient(135deg, oklch(0.48 0.16 200), oklch(0.40 0.14 225), oklch(0.45 0.15 195))"
                      : "oklch(0.22 0.05 230)",
                  boxShadow:
                    input.trim() && !isThinking
                      ? "0 0 20px oklch(0.55 0.16 196 / 0.5), inset 0 1px 0 oklch(0.75 0.10 196 / 0.3)"
                      : "none",
                }}
              >
                {isThinking ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span
                      className="text-[8px] font-bold"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      AI
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Send
                      className="h-5 w-5 transition-transform duration-200 group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5"
                      style={{
                        color: input.trim() ? "white" : "oklch(0.45 0.05 230)",
                      }}
                    />
                    <span
                      className="text-[8px] font-bold tracking-wider"
                      style={{
                        color: input.trim()
                          ? "oklch(0.80 0.10 196)"
                          : "oklch(0.40 0.04 230)",
                      }}
                    >
                      SEND
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          <p
            className="mt-2 text-center text-[10px]"
            style={{ color: "oklch(0.40 0.02 230)" }}
          >
            AI ke jawab sirf educational purposes ke liye hain — clinical
            decisions ke liye senior ki guidance zaruri hai
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantPage;
