import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Send,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AdminAlert, PatientData } from "../backend.d";
import {
  useCreateAIEscalationAlert,
  useGetAIDiagnosis,
} from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────

interface FloatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  diagnoses?: Array<{
    diseaseId: string;
    name: string;
    icd10Code: string;
    description: string;
    category: string;
  }>;
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
  const isLowConf = prob < 50;
  const hasNoDiag = !msg.diagnoses || msg.diagnoses.length === 0;
  const showNeedMoreInfo = hasNoDiag && isLowConf;

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
                Symptoms, duration ya age add karo.
              </p>
            </div>
          </div>
        )}

        {/* Escalation warning */}
        {isLowConf && !hasNoDiag && (
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

        {/* Diagnoses */}
        {msg.diagnoses && msg.diagnoses.length > 0 && (
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
                Diagnoses
              </p>
            </div>
            {msg.diagnoses.slice(0, 3).map((d) => (
              <div
                key={d.diseaseId}
                className="rounded-lg px-2.5 py-2"
                style={{
                  background: "oklch(0.28 0.055 230 / 0.6)",
                  border: "1px solid oklch(0.36 0.055 230 / 0.4)",
                }}
              >
                <p
                  className="font-semibold leading-tight"
                  style={{ color: "oklch(0.92 0.015 215)" }}
                >
                  {d.name}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  {d.icd10Code && (
                    <span
                      className="font-mono text-[9px]"
                      style={{ color: "oklch(0.6 0.12 196)" }}
                    >
                      {d.icd10Code}
                    </span>
                  )}
                  {d.category && (
                    <span
                      className="rounded px-1 py-0.5 text-[9px] font-medium"
                      style={{
                        background: "oklch(0.65 0.16 196 / 0.12)",
                        color: "oklch(0.7 0.1 196)",
                      }}
                    >
                      {d.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {msg.diagnoses.length > 3 && (
              <p
                className="text-[10px] pl-1"
                style={{ color: "oklch(0.58 0.08 196)" }}
              >
                +{msg.diagnoses.length - 3} more — full page kholo
              </p>
            )}
          </div>
        )}

        {/* Clinical Reasoning */}
        {msg.reasoning && (
          <div className="space-y-1">
            <p
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.65 0.16 196)" }}
            >
              Clinical Reasoning
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "oklch(0.7 0.02 215)" }}
            >
              {msg.reasoning.slice(0, 200)}
              {msg.reasoning.length > 200 ? "…" : ""}
            </p>
          </div>
        )}

        {/* Confidence bar */}
        {msg.probability !== undefined && (
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

        {/* Fallback plain text */}
        {!msg.diagnoses?.length && !msg.reasoning && !showNeedMoreInfo && (
          <p>{msg.content}</p>
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
        diagnoses: result.diagnosis,
        reasoning: result.reasoning,
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
          role: "assistant",
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
                  Powered by MedSim AI
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
            <ScrollArea className="flex-1">
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
                      Koi bhi medical sawaal poochho
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
                placeholder="Medical sawaal likhein..."
                rows={1}
                className="resize-none text-xs"
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
