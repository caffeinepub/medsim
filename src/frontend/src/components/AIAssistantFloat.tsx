import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Pill,
  Send,
  Stethoscope,
  X,
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

interface FloatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  diseases?: Disease[];
  responseType?:
    | "disease_info"
    | "comparison"
    | "symptom_match"
    | "no_match"
    | "backend";
  reasoning?: string;
  probability?: number;
  escalated?: boolean;
}

interface AIAssistantFloatProps {
  onNavigate: (page: string) => void;
}

// ─── Confidence color helper ──────────────────────────────────────

function confidenceColor(prob: number): string {
  if (prob >= 70) return "oklch(0.65 0.16 152)";
  if (prob >= 50) return "oklch(0.72 0.16 68)";
  return "oklch(0.65 0.22 27)";
}

// ─── Typing Dots ──────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      {[0, 0.15, 0.3].map((delay) => (
        <motion.span
          key={delay}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "oklch(0.65 0.16 196)" }}
          animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 0.7,
            repeat: Number.POSITIVE_INFINITY,
            delay,
          }}
        />
      ))}
    </div>
  );
}

// ─── Compact Disease Card ─────────────────────────────────────────

function CompactDiseaseCard({ disease }: { disease: Disease }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: "oklch(0.19 0.045 230 / 0.8)",
        border: "1px solid oklch(0.32 0.055 230 / 0.5)",
      }}
    >
      <button
        type="button"
        className="w-full text-left px-2.5 py-2"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-start justify-between gap-1.5">
          <div className="min-w-0">
            <p
              className="font-semibold text-xs leading-tight"
              style={{ color: "oklch(0.92 0.015 215)" }}
            >
              {disease.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {disease.icd10Code && (
                <span
                  className="font-mono text-[9px]"
                  style={{ color: "oklch(0.6 0.12 196)" }}
                >
                  {disease.icd10Code}
                </span>
              )}
              <span
                className="rounded px-1 py-0.5 text-[9px] font-medium"
                style={{
                  background: "oklch(0.65 0.16 196 / 0.12)",
                  color: "oklch(0.7 0.1 196)",
                }}
              >
                {disease.category}
              </span>
            </div>
          </div>
          <span
            className="text-[9px] flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.5 0.02 230)" }}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div
              className="px-2.5 pb-2.5 space-y-2"
              style={{ borderTop: "1px solid oklch(0.28 0.05 230 / 0.4)" }}
            >
              {/* Symptoms */}
              {disease.symptoms.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Stethoscope
                      className="h-2.5 w-2.5"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    />
                    <p
                      className="text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Symptoms
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 4).map((s) => (
                      <span
                        key={s.name}
                        className="px-1.5 py-0.5 rounded-full text-[9px]"
                        style={{
                          background: "oklch(0.55 0.18 68 / 0.1)",
                          border: "1px solid oklch(0.72 0.16 68 / 0.2)",
                          color: "oklch(0.75 0.12 68)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {disease.medicines.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Pill
                      className="h-2.5 w-2.5"
                      style={{ color: "oklch(0.65 0.16 152)" }}
                    />
                    <p
                      className="text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.65 0.16 196)" }}
                    >
                      Medicines
                    </p>
                  </div>
                  {disease.medicines.slice(0, 3).map((m) => (
                    <p
                      key={m.id}
                      className="text-[10px] py-0.5"
                      style={{ color: "oklch(0.72 0.015 215)" }}
                    >
                      • {m.name} — {m.dosage}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inline text renderer (compact) ───────────────────────────────

function InlineText({ text }: { text: string }) {
  if (!text) return null;
  // Show first 300 chars with basic bold support
  const truncated = text.length > 300 ? `${text.slice(0, 300)}…` : text;
  const lines = truncated.split("\n").filter((l) => l.trim());

  return (
    <div className="space-y-0.5">
      {lines.slice(0, 5).map((line, i) => {
        const lineKey = `fline-${i}`;
        const parts = line.split(/\*\*(.*?)\*\*/g);
        if (parts.length > 1) {
          return (
            <p
              key={lineKey}
              className="text-xs"
              style={{ color: "oklch(0.80 0.015 215)" }}
            >
              {parts.map((p, j) =>
                j % 2 === 1 ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <strong key={j} style={{ color: "oklch(0.90 0.015 215)" }}>
                    {p}
                  </strong>
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: split parts have no stable id
                  <span key={j}>{p}</span>
                ),
              )}
            </p>
          );
        }
        return (
          <p
            key={lineKey}
            className="text-xs"
            style={{ color: "oklch(0.78 0.015 215)" }}
          >
            {line.replace(/^[•\-]\s*/, "• ")}
          </p>
        );
      })}
    </div>
  );
}

// ─── Float Message ────────────────────────────────────────────────

function FloatMessageBubble({ msg }: { msg: FloatMessage }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[78%] rounded-2xl rounded-br-sm px-3 py-2 text-xs"
          style={{
            background: "oklch(0.45 0.12 200)",
            color: "oklch(0.96 0.01 215)",
          }}
        >
          {msg.content}
        </div>
      </div>
    );
  }

  const prob = msg.probability ?? 0;
  const isLowConf = prob < 50 && prob > 0;
  const showNeedMoreInfo =
    msg.responseType === "no_match" || (prob === 0 && !msg.diseases?.length);

  return (
    <div className="flex items-end gap-1.5">
      <div
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "oklch(0.25 0.055 230)" }}
      >
        <Brain className="h-3 w-3" style={{ color: "oklch(0.65 0.16 196)" }} />
      </div>
      <div
        className="max-w-[78%] space-y-2 rounded-2xl rounded-bl-sm px-3 py-2.5 text-xs"
        style={{
          background: "oklch(0.22 0.05 230 / 0.9)",
          border: "1px solid oklch(0.35 0.06 230)",
          color: "oklch(0.85 0.015 215)",
        }}
      >
        {/* Need more info */}
        {showNeedMoreInfo && (
          <div
            className="flex items-start gap-1.5 rounded-lg px-2.5 py-2"
            style={{
              background: "oklch(0.45 0.12 200 / 0.1)",
              border: "1px solid oklch(0.55 0.12 200 / 0.25)",
              color: "oklch(0.72 0.10 200)",
            }}
          >
            <HelpCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Aur detail mein batao</p>
              <p className="opacity-75 mt-0.5">
                Disease ka naam ya symptoms likhein.
              </p>
            </div>
          </div>
        )}

        {/* Escalation warning */}
        {isLowConf && !showNeedMoreInfo && (
          <div
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
            style={{
              background: "oklch(0.55 0.18 68 / 0.12)",
              color: "oklch(0.78 0.14 68)",
            }}
          >
            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
            <span>Expert ko forward kar diya gaya</span>
          </div>
        )}

        {/* Response text */}
        {msg.content && !showNeedMoreInfo && <InlineText text={msg.content} />}

        {/* Disease cards */}
        {msg.diseases && msg.diseases.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <Stethoscope
                className="h-2.5 w-2.5"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.16 196)" }}
              >
                {msg.responseType === "comparison"
                  ? "Comparison"
                  : "Disease Info"}
              </p>
            </div>
            {msg.diseases.slice(0, 3).map((d) => (
              <CompactDiseaseCard key={d.id} disease={d} />
            ))}
            {msg.diseases.length > 3 && (
              <p
                className="text-[10px] pl-1"
                style={{ color: "oklch(0.58 0.08 196)" }}
              >
                +{msg.diseases.length - 3} more — full page kholo
              </p>
            )}
          </div>
        )}

        {/* Confidence bar */}
        {msg.probability !== undefined && msg.probability > 0 && (
          <div className="flex items-center gap-2">
            <div
              className="h-1 flex-1 overflow-hidden rounded-full"
              style={{ background: "oklch(0.28 0.05 230)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${prob}%`,
                  background: confidenceColor(prob),
                }}
              />
            </div>
            <span
              className="font-mono text-[10px] font-bold"
              style={{ color: confidenceColor(prob) }}
            >
              {prob}%
            </span>
          </div>
        )}

        {/* Escalated note */}
        {msg.escalated && (
          <div
            className="flex items-center gap-1.5 rounded-lg px-2 py-1"
            style={{
              background: "oklch(0.65 0.16 196 / 0.08)",
              color: "oklch(0.65 0.16 196)",
            }}
          >
            <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
            <span>Expert ko alert bhej diya gaya</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Float Component ─────────────────────────────────────────

export function AIAssistantFloat({ onNavigate }: AIAssistantFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<FloatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data: diseases = [] } = useAllDiseases();
  const aiDiagnosis = useGetAIDiagnosis();
  const escalationAlert = useCreateAIEscalationAlert();

  // Scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered intentionally on message/thinking state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage || isThinking) return;

    setInput("");
    setIsThinking(true);

    const userMsg: FloatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // 1. Local disease database search first
      const matched = searchDiseases(userMessage, diseases);
      const localResult = generateResponse(userMessage, diseases, matched);

      if (localResult.type !== "no_match") {
        const aiMsg: FloatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: localResult.responseText,
          responseType: localResult.type,
          diseases: localResult.diseases,
          probability: localResult.confidence,
          escalated: false,
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (!isOpen) setUnreadCount((c) => c + 1);
        setIsThinking(false);
        return;
      }

      // 2. Backend fallback
      const patientData: PatientData = {
        id: crypto.randomUUID(),
        age: BigInt(25),
        gender: "unknown",
        symptoms: [userMessage],
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
          // Silent failure
        }
      }

      const aiMsg: FloatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.reasoning || "Koi jawab nahi mila.",
        responseType: "backend",
        diseases: result.diagnosis.map((d) => ({
          id: d.diseaseId,
          name: d.name,
          icd10Code: d.icd10Code,
          description: d.description,
          category: d.category,
          symptoms: d.symptoms ?? [],
          medicines: [],
          diagnosticCriteria: "",
          clinicalSigns: { bp: "—", hr: "—", rr: "—", spo2: "—", temp: "—" },
          associatedDiseases: [],
          subjectMapping: [],
        })),
        probability: prob,
        escalated,
      };
      setMessages((prev) => [...prev, aiMsg]);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: "Kuch error aa gaya. Dobara try karein.",
          probability: 0,
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            data-ocid="ai_float.panel"
            className="flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: "380px",
              height: "520px",
              background:
                "linear-gradient(180deg, oklch(0.17 0.05 235) 0%, oklch(0.15 0.04 230) 100%)",
              border: "1px solid oklch(0.35 0.06 230)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex flex-shrink-0 items-center gap-2.5 border-b px-4 py-3"
              style={{
                borderColor: "oklch(0.28 0.05 235)",
                background: "oklch(0.18 0.055 235 / 0.95)",
              }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.35 0.1 230))",
                }}
              >
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p
                  className="font-display text-sm font-bold"
                  style={{ color: "oklch(0.92 0.015 215)" }}
                >
                  AI Assistant
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  {diseases.length > 0
                    ? `${diseases.length} diseases loaded`
                    : "Powered by MedSim AI"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("ai-assistant")}
                title="Full page kholo"
                className="flex h-6 w-6 items-center justify-center rounded transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.65 0.02 215)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </button>

              <button
                data-ocid="ai_float.close_button"
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.65 0.02 215)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea
              className="flex-1 [&>[data-slot=scroll-area-viewport]]:bg-transparent"
              style={{ background: "transparent" }}
            >
              <div ref={scrollRef} className="space-y-3 px-3 py-4">
                {messages.length === 0 && (
                  <div className="py-8 text-center">
                    <Brain
                      className="mx-auto mb-2 h-8 w-8"
                      style={{ color: "oklch(0.65 0.16 196 / 0.4)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.02 230)" }}
                    >
                      {diseases.length > 0
                        ? `${diseases.length} diseases loaded. Koi bhi medical sawaal poochho.`
                        : "Koi bhi medical sawaal poochho"}
                    </p>
                    {/* Quick suggestions */}
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {[
                        "Malaria ke symptoms?",
                        "Dengue ka treatment?",
                        "TB ki diagnosis?",
                        "Diabetes management?",
                        "Hypertension ki medicines?",
                      ].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setInput(s)}
                          className="rounded-full px-2.5 py-1 text-[10px] transition-all hover:scale-105 active:scale-95"
                          style={{
                            background: "oklch(0.25 0.055 230 / 0.6)",
                            border: "1px solid oklch(0.35 0.06 230)",
                            color: "oklch(0.72 0.12 196)",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FloatMessageBubble msg={msg} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isThinking && <TypingDots />}
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className="flex flex-shrink-0 gap-2 border-t p-3"
              style={{ borderColor: "oklch(0.28 0.05 235)" }}
            >
              <Textarea
                data-ocid="ai_float.textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Medical sawaal likhein… (e.g. malaria symptoms)"
                rows={1}
                className="resize-none text-xs ai-textarea"
                style={{
                  background: "oklch(0.22 0.05 230 / 0.6)",
                  border: "1px solid oklch(0.35 0.06 230)",
                  color: "oklch(0.88 0.015 215)",
                  minHeight: "unset",
                }}
                disabled={isThinking}
              />
              <Button
                data-ocid="ai_float.submit_button"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                size="icon"
                className="h-9 w-9 flex-shrink-0 self-end"
                style={{
                  background:
                    input.trim() && !isThinking
                      ? "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.38 0.1 220))"
                      : "oklch(0.25 0.05 230)",
                  border: "none",
                }}
              >
                {isThinking ? (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send className="h-3.5 w-3.5 text-white" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        data-ocid="ai_float.open_modal_button"
        type="button"
        onClick={handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.16 200), oklch(0.42 0.12 230))",
          boxShadow:
            "0 0 0 0 oklch(0.55 0.16 200 / 0.4), 0 8px 32px -4px oklch(0.45 0.12 200 / 0.6)",
        }}
      >
        {/* Glow ring pulse */}
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0 oklch(0.55 0.16 200 / 0.5)",
              "0 0 0 10px oklch(0.55 0.16 200 / 0)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        />
        <Brain className="h-7 w-7 text-white drop-shadow-lg" />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: "oklch(0.65 0.22 27)" }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}

export default AIAssistantFloat;
