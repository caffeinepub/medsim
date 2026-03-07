import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  HelpCircle,
  Send,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AdminAlert, PatientData } from "../backend.d";
import {
  useCreateAIEscalationAlert,
  useGetAIDiagnosis,
} from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────

interface AIMessage {
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
  timestamp: number;
}

// ─── Quick suggestion chips ───────────────────────────────────────

const QUICK_SUGGESTIONS = [
  "Malaria ke symptoms?",
  "Dengue ka treatment?",
  "TB ki diagnosis kaise hoti hai?",
  "Diabetes management?",
  "Hypertension ki medicines?",
  "Dengue aur Typhoid mein kya farak hai?",
];

// ─── Confidence color helper ──────────────────────────────────────

function confidenceColor(prob: number): string {
  if (prob >= 70) return "oklch(0.65 0.16 152)";
  if (prob >= 50) return "oklch(0.72 0.16 68)";
  return "oklch(0.65 0.22 27)";
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
  const hasNoDiagnoses = !message.diagnoses || message.diagnoses.length === 0;
  const showNeedMoreInfo = hasNoDiagnoses && isLowConfidence;

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

      <div className="max-w-[80%] space-y-2">
        {/* Main card */}
        <div
          className="rounded-2xl rounded-bl-sm px-4 py-3.5 text-sm space-y-3"
          style={{
            background: "oklch(0.22 0.05 230 / 0.8)",
            border: "1px solid oklch(0.35 0.06 230)",
            color: "oklch(0.88 0.015 215)",
          }}
        >
          {/* "Need more detail" message when no diagnoses + low confidence */}
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
                <p className="font-semibold">Aur detail mein batao</p>
                <p className="opacity-80">
                  Symptoms, duration, patient ki age, ya koi aur information add
                  karo taaki AI better answer de sake.
                </p>
              </div>
            </div>
          )}

          {/* Escalation warning (low confidence with diagnoses present) */}
          {isLowConfidence && !hasNoDiagnoses && (
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

          {/* Diagnoses */}
          {message.diagnoses && message.diagnoses.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Stethoscope
                  className="h-3.5 w-3.5"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  Possible Diagnoses
                </p>
              </div>
              <div className="space-y-2">
                {message.diagnoses.map((diag) => (
                  <div
                    key={diag.diseaseId}
                    className="rounded-xl px-3 py-2.5"
                    style={{
                      background: "oklch(0.28 0.055 230 / 0.6)",
                      border: "1px solid oklch(0.38 0.06 230 / 0.5)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-sm leading-tight"
                          style={{ color: "oklch(0.95 0.015 215)" }}
                        >
                          {diag.name}
                        </p>
                        {diag.icd10Code && (
                          <p
                            className="mt-0.5 text-[11px] font-mono"
                            style={{ color: "oklch(0.65 0.16 196)" }}
                          >
                            ICD-10: {diag.icd10Code}
                          </p>
                        )}
                        {diag.description && (
                          <p
                            className="mt-1 text-[11px] leading-relaxed"
                            style={{ color: "oklch(0.68 0.02 215)" }}
                          >
                            {diag.description.slice(0, 100)}
                            {diag.description.length > 100 ? "…" : ""}
                          </p>
                        )}
                      </div>
                      {diag.category && (
                        <Badge
                          className="flex-shrink-0 text-[10px] font-medium"
                          style={{
                            background: "oklch(0.65 0.16 196 / 0.15)",
                            color: "oklch(0.75 0.12 196)",
                            border: "1px solid oklch(0.65 0.16 196 / 0.3)",
                          }}
                        >
                          {diag.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Reasoning */}
          {message.reasoning && (
            <div className="space-y-1.5">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.16 196)" }}
              >
                Clinical Reasoning
              </p>
              <div
                className="rounded-xl px-3.5 py-3"
                style={{
                  background: "oklch(0.19 0.04 230 / 0.7)",
                  border: "1px solid oklch(0.32 0.055 230 / 0.5)",
                }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.78 0.02 215)" }}
                >
                  {message.reasoning}
                </p>
              </div>
            </div>
          )}

          {/* Confidence bar */}
          {message.probability !== undefined && (
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

          {/* Fallback plain text */}
          {!message.diagnoses?.length &&
            !message.reasoning &&
            !showNeedMoreInfo && <p>{message.content}</p>}
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
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const aiDiagnosis = useGetAIDiagnosis();
  const escalationAlert = useCreateAIEscalationAlert();

  // Scroll to bottom on new messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered intentionally on message/thinking state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage || isThinking) return;

    setInput("");
    setIsThinking(true);

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
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
          // Alert failed silently — still show response
        }
      }

      const aiMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.reasoning || "Koi jawab nahi mila.",
        diagnoses: result.diagnosis,
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
        content: "Kuch error aa gaya. Dobara try karein.",
        probability: 0,
        escalated: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
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
        className="flex-shrink-0 border-b px-5 py-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.17 0.05 235 / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
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
              Apna medical sawaal poochho
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.65 0.16 152)" }}
            />
            <span className="text-xs" style={{ color: "oklch(0.65 0.02 215)" }}>
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="mx-auto max-w-3xl space-y-4 px-5 py-6">
          {/* Empty state */}
          {messages.length === 0 && (
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
                  Koi bhi medical sawaal poochho — symptoms, diseases,
                  medicines...
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
      </ScrollArea>

      {/* Input area */}
      <div
        className="flex-shrink-0 border-t px-5 py-4"
        style={{
          borderColor: "oklch(0.28 0.05 235)",
          background: "oklch(0.17 0.05 235 / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-3xl gap-3">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              data-ocid="ai_assistant.textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Apna medical sawaal yahan likhein... (Enter to send, Shift+Enter for new line)"
              rows={2}
              className="resize-none pr-12 text-sm"
              style={{
                background: "oklch(0.22 0.05 230 / 0.6)",
                border: "1px solid oklch(0.35 0.06 230)",
                color: "oklch(0.88 0.015 215)",
              }}
              disabled={isThinking}
            />
          </div>
          <Button
            data-ocid="ai_assistant.submit_button"
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            size="icon"
            className="h-[68px] w-12 flex-shrink-0 self-end"
            style={{
              background:
                input.trim() && !isThinking
                  ? "linear-gradient(135deg, oklch(0.45 0.12 200), oklch(0.38 0.1 220))"
                  : "oklch(0.25 0.05 230)",
              border: "none",
            }}
          >
            {isThinking ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Send className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
        <p
          className="mx-auto mt-2 max-w-3xl text-center text-[10px]"
          style={{ color: "oklch(0.45 0.02 230)" }}
        >
          AI ke jawab sirf educational purposes ke liye hain — clinical
          decisions ke liye senior ki guidance zaruri hai
        </p>
      </div>
    </div>
  );
}

export default AIAssistantPage;
