import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileQuestion,
  Loader2,
  RefreshCw,
  Send,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type ExamQuestion,
  ROLE_DESC_COUNT,
  ROLE_MCQ_COUNT,
  getQuestionsForRole,
} from "../utils/examSeedData";

interface ExamPageProps {
  onNavigate?: (page: string) => void;
  applicationId?: string;
}

interface ExamResult {
  applicationId: string;
  role: string;
  mcqScore: number;
  mcqTotal: number;
  descriptiveAnswers: { questionId: string; answer: string }[];
  status: "pass" | "pending" | "fail";
  submittedAt: string;
  pendingReview: boolean;
}

type AnswerMap = Record<string, string | number>;

// ─── Waiting screen when exam is locked ──────────────────────────
function ExamLockedScreen({
  application,
  onNavigate,
  onRefresh,
}: {
  application: {
    id: string;
    jobTitle: string;
    hospital: string;
    submittedAt: string;
  } | null;
  onNavigate?: (page: string) => void;
  onRefresh: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calc = () => {
      if (!application?.submittedAt) return;
      const unlockAt =
        new Date(application.submittedAt).getTime() + 24 * 60 * 60 * 1000;
      const remaining = unlockAt - Date.now();
      if (remaining <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ hours, minutes, seconds });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [application?.submittedAt]);

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-2xl p-8 text-center space-y-6"
          style={{
            background: "rgba(5, 15, 35, 0.98)",
            border: "1.5px solid rgba(255, 184, 0, 0.3)",
            boxShadow: "0 0 40px rgba(255, 184, 0, 0.08)",
          }}
        >
          {/* Animated clock */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <div
              className="rounded-full p-5"
              style={{
                background: "rgba(255, 184, 0, 0.1)",
                border: "1.5px solid rgba(255, 184, 0, 0.3)",
              }}
            >
              <Clock className="h-12 w-12" style={{ color: "#ffb800" }} />
            </div>
          </motion.div>

          <div>
            <h2
              className="font-display text-2xl font-black mb-2"
              style={{ color: "#ffb800" }}
            >
              Exam Abhi Unlock Nahi Hua
            </h2>
            <p
              className="text-sm"
              style={{ color: "rgba(150, 200, 255, 0.6)" }}
            >
              Admin approval ya 24 ghante baad exam unlock hoga
            </p>
          </div>

          {application && (
            <div
              className="rounded-xl p-4 text-left space-y-2"
              style={{
                background: "rgba(0, 10, 30, 0.6)",
                border: "1px solid rgba(0, 212, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <Building2
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "#00d4ff" }}
                />
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#e8f4ff" }}
                >
                  {application.hospital}
                </p>
              </div>
              <p
                className="text-xs"
                style={{ color: "rgba(100, 160, 220, 0.7)" }}
              >
                {application.jobTitle}
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(150, 200, 255, 0.4)" }}
              >
                Applied:{" "}
                {new Date(application.submittedAt).toLocaleString("en-IN")}
              </p>
            </div>
          )}

          {/* Countdown */}
          {timeLeft !== null && (
            <div>
              <p
                className="text-xs mb-2"
                style={{ color: "rgba(150, 200, 255, 0.4)" }}
              >
                Auto-unlock mein bacha waqt:
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { val: timeLeft.hours, label: "Hours" },
                  { val: timeLeft.minutes, label: "Min" },
                  { val: timeLeft.seconds, label: "Sec" },
                ].map(({ val, label }) => (
                  <div
                    key={label}
                    className="rounded-xl px-4 py-3 text-center min-w-[60px]"
                    style={{
                      background: "rgba(255, 184, 0, 0.08)",
                      border: "1px solid rgba(255, 184, 0, 0.2)",
                    }}
                  >
                    <p
                      className="font-display text-2xl font-black"
                      style={{ color: "#ffb800" }}
                    >
                      {String(val).padStart(2, "0")}
                    </p>
                    <p
                      className="font-mono text-[10px]"
                      style={{ color: "rgba(255,184,0,0.5)" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {timeLeft?.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0 && (
              <div
                className="rounded-xl p-3 text-xs text-center"
                style={{
                  background: "rgba(0, 230, 118, 0.08)",
                  border: "1px solid rgba(0, 230, 118, 0.2)",
                  color: "#00e676",
                }}
              >
                ✅ 24 ghante guzar gaye! Refresh karo — exam unlock ho gaya
                hoga.
              </div>
            )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              data-ocid="exam.locked.my_applications_button"
              onClick={() => onNavigate?.("my-applications")}
              className="flex-1 gap-2 rounded-xl border-0"
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              <BookOpen className="h-4 w-4" />
              Meri Applications
            </Button>
            <Button
              data-ocid="exam.locked.refresh_button"
              onClick={onRefresh}
              className="flex-1 gap-2 rounded-xl border-0"
              style={{
                background: "rgba(255, 184, 0, 0.1)",
                border: "1px solid rgba(255,184,0,0.2)",
                color: "#ffb800",
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExamPage({
  onNavigate,
  applicationId: propAppId,
}: ExamPageProps) {
  const applicationId =
    propAppId || localStorage.getItem("medsim_current_exam_app") || "";
  const role = localStorage.getItem("medsim_profile_role") || "junior";

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [_refreshTick, setRefreshTick] = useState(0);

  // ── Check unlock status ───────────────────────────────────────
  const checkUnlocked = useCallback((): {
    unlocked: boolean;
    app: {
      id: string;
      jobTitle: string;
      hospital: string;
      submittedAt: string;
      status: string;
    } | null;
  } => {
    const apps: Array<{
      id: string;
      status: string;
      submittedAt: string;
      jobTitle: string;
      hospital: string;
    }> = JSON.parse(localStorage.getItem("medsim_applications") || "[]");
    const currentApp = applicationId
      ? apps.find((a) => a.id === applicationId)
      : null;

    if (!currentApp) return { unlocked: true, app: null }; // direct nav → allow

    const is24hrPassed =
      currentApp.submittedAt &&
      Date.now() - new Date(currentApp.submittedAt).getTime() >
        24 * 60 * 60 * 1000;

    const unlocked =
      currentApp.status === "exam_unlocked" ||
      currentApp.status === "pending_exam" || // legacy
      Boolean(is24hrPassed);

    return { unlocked, app: currentApp };
  }, [applicationId]);

  const { unlocked: isUnlocked, app: currentApplication } = checkUnlocked();

  // Re-check every 30 seconds while locked
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setRefreshTick((t) => t + 1);
    }, 30_000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  // Load questions — check admin-uploaded first, fallback to seed data
  const questions: ExamQuestion[] = useMemo(() => {
    const adminQs = localStorage.getItem("medsim_exam_questions");
    if (adminQs) {
      try {
        const parsed = JSON.parse(adminQs) as Record<string, ExamQuestion[]>;
        const roleKey = role as keyof typeof parsed;
        if (parsed[roleKey] && parsed[roleKey].length > 0) {
          return parsed[roleKey];
        }
      } catch {
        // fallback
      }
    }
    return getQuestionsForRole(role);
  }, [role]);

  const mcqQuestions = questions.filter((q) => q.type === "mcq");
  const descQuestions = questions.filter((q) => q.type === "descriptive");
  const totalQuestions = questions.length;

  const answeredCount = Object.keys(answers).filter((k) => {
    const v = answers[k];
    return v !== undefined && v !== null && v !== "";
  }).length;

  const progress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Load existing result if already submitted
  useEffect(() => {
    if (applicationId) {
      const results = JSON.parse(
        localStorage.getItem("medsim_exam_results") || "{}",
      );
      if (results[applicationId]) {
        setResult(results[applicationId]);
        setSubmitted(true);
      }
    }
  }, [applicationId]);

  const handleMCQAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleDescAnswer = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    // Grade MCQs
    let mcqCorrect = 0;
    for (const q of mcqQuestions) {
      if (answers[q.id] === q.correctIndex) mcqCorrect++;
    }

    const mcqPct =
      mcqQuestions.length > 0 ? (mcqCorrect / mcqQuestions.length) * 100 : 100;
    const hasDescriptive = descQuestions.length > 0;
    const descriptiveAnswers = descQuestions.map((q) => ({
      questionId: q.id,
      answer: (answers[q.id] as string) || "",
    }));

    let status: ExamResult["status"] = "pending";
    if (!hasDescriptive) {
      status = mcqPct >= 70 ? "pass" : "fail";
    } else if (mcqPct >= 70) {
      status = "pending"; // pending descriptive review
    } else {
      status = "fail"; // MCQ already failed
    }

    const examResult: ExamResult = {
      applicationId,
      role,
      mcqScore: mcqCorrect,
      mcqTotal: mcqQuestions.length,
      descriptiveAnswers,
      status,
      submittedAt: new Date().toISOString(),
      pendingReview: hasDescriptive,
    };

    // Save result
    const results = JSON.parse(
      localStorage.getItem("medsim_exam_results") || "{}",
    );
    results[applicationId] = examResult;
    localStorage.setItem("medsim_exam_results", JSON.stringify(results));

    // Update application status
    const apps: Array<{ id: string; status: string }> = JSON.parse(
      localStorage.getItem("medsim_applications") || "[]",
    );
    const updatedApps = apps.map((a) =>
      a.id === applicationId
        ? {
            ...a,
            status: hasDescriptive
              ? "under_review"
              : status === "pass"
                ? "pass"
                : "fail",
          }
        : a,
    );
    localStorage.setItem("medsim_applications", JSON.stringify(updatedApps));

    setResult(examResult);
    setSubmitted(true);
    setSubmitting(false);
    toast.success("Exam submit ho gaya!");
  };

  const cardStyle = {
    background: "rgba(5, 15, 35, 0.95)",
    border: "1px solid rgba(0, 212, 255, 0.12)",
  };

  const mcqCount = ROLE_MCQ_COUNT[role] || 15;
  const descCount = ROLE_DESC_COUNT[role] || 0;

  // Locked screen — exam not yet unlocked by admin / 24hr
  if (!isUnlocked) {
    return (
      <ExamLockedScreen
        application={currentApplication}
        onNavigate={onNavigate}
        onRefresh={() => setRefreshTick((t) => t + 1)}
      />
    );
  }

  // Result screen
  if (submitted && result) {
    const mcqPct =
      result.mcqTotal > 0
        ? Math.round((result.mcqScore / result.mcqTotal) * 100)
        : 100;
    const statusColor =
      result.status === "pass"
        ? "#00e676"
        : result.status === "pending"
          ? "#ffb800"
          : "#ff3355";
    const statusLabel =
      result.status === "pass"
        ? "PASS"
        : result.status === "pending"
          ? "Under Review"
          : "FAIL";

    return (
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg space-y-5"
        >
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "rgba(5, 15, 35, 0.98)",
              border: `1.5px solid ${statusColor}40`,
              boxShadow: `0 0 40px ${statusColor}10`,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {result.status === "pass" ? (
                <Award
                  className="mx-auto h-16 w-16 mb-4"
                  style={{ color: "#00e676" }}
                />
              ) : result.status === "pending" ? (
                <Clock
                  className="mx-auto h-16 w-16 mb-4"
                  style={{ color: "#ffb800" }}
                />
              ) : (
                <XCircle
                  className="mx-auto h-16 w-16 mb-4"
                  style={{ color: "#ff3355" }}
                />
              )}
            </motion.div>
            <h2
              className="font-display text-4xl font-black mb-2"
              style={{ color: statusColor }}
            >
              {statusLabel}
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              {result.status === "pass"
                ? "Badhaai ho! Aap is position ke liye qualify kiye."
                : result.status === "pending"
                  ? "MCQ pass ho gaya. Descriptive answers admin review ke liye hain."
                  : "MCQ score 70% se kam hai. Dobara try karein."}
            </p>

            {/* Score breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {result.mcqTotal > 0 && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    background:
                      mcqPct >= 70
                        ? "rgba(0, 230, 118, 0.08)"
                        : "rgba(255, 51, 85, 0.08)",
                    border: `1px solid ${mcqPct >= 70 ? "rgba(0,230,118,0.2)" : "rgba(255,51,85,0.2)"}`,
                  }}
                >
                  <p
                    className="font-display text-2xl font-black"
                    style={{ color: mcqPct >= 70 ? "#00e676" : "#ff3355" }}
                  >
                    {result.mcqScore}/{result.mcqTotal}
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    MCQ Score ({mcqPct}%)
                  </p>
                </div>
              )}
              {result.pendingReview && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255, 184, 0, 0.08)",
                    border: "1px solid rgba(255, 184, 0, 0.2)",
                  }}
                >
                  <p
                    className="font-display text-xl font-black"
                    style={{ color: "#ffb800" }}
                  >
                    Pending
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    Descriptive Review
                  </p>
                </div>
              )}
            </div>

            <p
              className="text-xs mb-6"
              style={{ color: "rgba(100, 150, 200, 0.4)" }}
            >
              Submitted: {new Date(result.submittedAt).toLocaleString("en-IN")}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                data-ocid="exam.my_applications_button"
                onClick={() => onNavigate?.("my-applications")}
                className="gap-2 rounded-xl border-0"
                style={{
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#00d4ff",
                }}
              >
                <BookOpen className="h-4 w-4" />
                Meri Applications
              </Button>
              <Button
                data-ocid="exam.career_button"
                onClick={() => onNavigate?.("career")}
                className="gap-2 rounded-xl border-0"
                style={{
                  background: "rgba(0, 230, 118, 0.12)",
                  border: "1px solid rgba(0,230,118,0.2)",
                  color: "#00e676",
                }}
              >
                <ChevronRight className="h-4 w-4" />
                More Opportunities
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="font-display text-2xl font-black"
                style={{ color: "#e8f4ff" }}
              >
                Online Exam
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(150, 200, 255, 0.5)" }}
              >
                Role:{" "}
                <span
                  className="capitalize font-semibold"
                  style={{ color: "#00d4ff" }}
                >
                  {role}
                </span>
                {" • "}
                {mcqCount} MCQ
                {descCount > 0 ? ` + ${descCount} Descriptive` : ""}
              </p>
            </div>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 flex-shrink-0"
              style={cardStyle}
            >
              <div>
                <p
                  className="font-display text-lg font-black"
                  style={{
                    color:
                      answeredCount >= totalQuestions ? "#00e676" : "#00d4ff",
                  }}
                >
                  {answeredCount}/{totalQuestions}
                </p>
                <p
                  className="font-mono text-[10px]"
                  style={{ color: "rgba(150,200,255,0.4)" }}
                >
                  Answered
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 space-y-1">
            <div
              className="flex justify-between text-xs"
              style={{ color: "rgba(150,200,255,0.4)" }}
            >
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 rounded-full"
              style={
                { background: "rgba(0,212,255,0.1)" } as React.CSSProperties
              }
            />
          </div>
        </motion.div>

        <ScrollArea className="h-auto">
          <div className="space-y-5 pb-8">
            {/* MCQ Section */}
            {mcqQuestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileQuestion
                    className="h-4 w-4"
                    style={{ color: "#00d4ff" }}
                  />
                  <h2
                    className="font-display font-bold text-sm"
                    style={{ color: "rgba(180, 220, 255, 0.8)" }}
                  >
                    Section A — Multiple Choice Questions ({mcqQuestions.length}{" "}
                    × MCQ)
                  </h2>
                </div>
                <div className="space-y-4">
                  {mcqQuestions.map((q, idx) => {
                    const selectedOption = answers[q.id];
                    const isAnswered =
                      selectedOption !== undefined &&
                      selectedOption !== null &&
                      selectedOption !== "";

                    return (
                      <motion.div
                        key={q.id}
                        data-ocid={`exam.mcq.item.${idx + 1}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="rounded-2xl p-5"
                        style={{
                          ...cardStyle,
                          border: `1px solid ${isAnswered ? "rgba(0,230,118,0.2)" : "rgba(0,212,255,0.12)"}`,
                        }}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <span
                            className="flex-shrink-0 font-display text-sm font-bold h-7 w-7 rounded-full flex items-center justify-center"
                            style={{
                              background: isAnswered
                                ? "rgba(0,230,118,0.15)"
                                : "rgba(0,212,255,0.1)",
                              color: isAnswered ? "#00e676" : "#00d4ff",
                              border: `1px solid ${isAnswered ? "rgba(0,230,118,0.3)" : "rgba(0,212,255,0.2)"}`,
                            }}
                          >
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className="text-[10px] border-0 px-1.5"
                                style={{
                                  background: "rgba(0,212,255,0.08)",
                                  color: "rgba(100,180,255,0.6)",
                                }}
                              >
                                {q.subject}
                              </Badge>
                              <Badge
                                className="text-[10px] border-0 px-1.5"
                                style={{
                                  background: "rgba(255,184,0,0.08)",
                                  color: "#ffb800",
                                }}
                              >
                                {q.marks} mark{q.marks > 1 ? "s" : ""}
                              </Badge>
                              {isAnswered && (
                                <CheckCircle2
                                  className="h-3 w-3"
                                  style={{ color: "#00e676" }}
                                />
                              )}
                            </div>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "#e8f4ff" }}
                            >
                              {q.text}
                            </p>
                          </div>
                        </div>

                        {q.options && (
                          <div className="grid gap-2 sm:grid-cols-2 ml-10">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selectedOption === optIdx;
                              return (
                                <button
                                  key={`${q.id}-opt-${optIdx}`}
                                  type="button"
                                  data-ocid={`exam.option.${idx + 1}.${optIdx + 1}`}
                                  onClick={() => handleMCQAnswer(q.id, optIdx)}
                                  className="flex items-start gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                                  style={{
                                    background: isSelected
                                      ? "rgba(0, 212, 255, 0.12)"
                                      : "rgba(0, 10, 30, 0.5)",
                                    border: `1px solid ${isSelected ? "rgba(0,212,255,0.35)" : "rgba(0,212,255,0.08)"}`,
                                    color: isSelected
                                      ? "#00d4ff"
                                      : "rgba(180, 210, 255, 0.7)",
                                  }}
                                >
                                  <span
                                    className="flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold mt-px"
                                    style={{
                                      background: isSelected
                                        ? "#00d4ff"
                                        : "transparent",
                                      borderColor: isSelected
                                        ? "#00d4ff"
                                        : "rgba(0,212,255,0.2)",
                                      color: isSelected
                                        ? "#000"
                                        : "rgba(100,180,255,0.5)",
                                    }}
                                  >
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="flex-1 leading-relaxed">
                                    {opt}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Descriptive Section */}
            {descQuestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 mt-6">
                  <BookOpen className="h-4 w-4" style={{ color: "#9b59ff" }} />
                  <h2
                    className="font-display font-bold text-sm"
                    style={{ color: "rgba(180, 220, 255, 0.8)" }}
                  >
                    Section B — Descriptive Questions ({descQuestions.length}{" "}
                    questions)
                  </h2>
                </div>
                <div className="space-y-4">
                  {descQuestions.map((q, idx) => {
                    const answer = (answers[q.id] as string) || "";
                    const isAnswered = answer.trim().length > 50;

                    return (
                      <motion.div
                        key={q.id}
                        data-ocid={`exam.descriptive.item.${idx + 1}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-2xl p-5"
                        style={{
                          background: "rgba(5, 15, 35, 0.95)",
                          border: `1px solid ${isAnswered ? "rgba(155,89,255,0.25)" : "rgba(155,89,255,0.1)"}`,
                        }}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <span
                            className="flex-shrink-0 font-display text-sm font-bold h-7 w-7 rounded-full flex items-center justify-center"
                            style={{
                              background: isAnswered
                                ? "rgba(155,89,255,0.15)"
                                : "rgba(155,89,255,0.1)",
                              color: "#9b59ff",
                              border: "1px solid rgba(155,89,255,0.2)",
                            }}
                          >
                            {mcqQuestions.length + idx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className="text-[10px] border-0 px-1.5"
                                style={{
                                  background: "rgba(155,89,255,0.1)",
                                  color: "#9b59ff",
                                }}
                              >
                                {q.subject}
                              </Badge>
                              <Badge
                                className="text-[10px] border-0 px-1.5"
                                style={{
                                  background: "rgba(255,184,0,0.08)",
                                  color: "#ffb800",
                                }}
                              >
                                {q.marks} marks
                              </Badge>
                              {isAnswered && (
                                <CheckCircle2
                                  className="h-3 w-3"
                                  style={{ color: "#9b59ff" }}
                                />
                              )}
                            </div>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "#e8f4ff" }}
                            >
                              {q.text}
                            </p>
                          </div>
                        </div>
                        <div className="ml-10">
                          <Textarea
                            data-ocid={`exam.descriptive.textarea.${idx + 1}`}
                            value={answer}
                            onChange={(e) =>
                              handleDescAnswer(q.id, e.target.value)
                            }
                            placeholder="Apna detailed answer likhein... (minimum 50 words recommended)"
                            rows={6}
                            className="border-0 focus-visible:ring-0"
                            style={{
                              background: "rgba(0, 10, 30, 0.6)",
                              border: "1px solid rgba(155, 89, 255, 0.15)",
                              color: "#e8f4ff",
                              borderRadius: "0.75rem",
                              fontSize: "0.875rem",
                              resize: "vertical",
                            }}
                          />
                          <p
                            className="mt-1 text-xs font-mono text-right"
                            style={{ color: "rgba(155,89,255,0.4)" }}
                          >
                            {answer.split(/\s+/).filter(Boolean).length} words
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(5, 15, 35, 0.95)",
                border: "1px solid rgba(0, 212, 255, 0.12)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="font-display font-bold"
                    style={{ color: "#e8f4ff" }}
                  >
                    Exam Submit Karo
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(150, 200, 255, 0.4)" }}
                  >
                    {answeredCount}/{totalQuestions} questions answered
                  </p>
                </div>
                <div
                  className="rounded-full h-12 w-12 flex items-center justify-center"
                  style={{
                    background:
                      progress === 100
                        ? "rgba(0,230,118,0.12)"
                        : "rgba(255,184,0,0.1)",
                    border: `2px solid ${progress === 100 ? "rgba(0,230,118,0.3)" : "rgba(255,184,0,0.2)"}`,
                  }}
                >
                  <span
                    className="font-display text-sm font-black"
                    style={{ color: progress === 100 ? "#00e676" : "#ffb800" }}
                  >
                    {progress}%
                  </span>
                </div>
              </div>

              {answeredCount < totalQuestions && (
                <div
                  className="mb-4 rounded-xl p-3 text-xs"
                  style={{
                    background: "rgba(255, 184, 0, 0.06)",
                    border: "1px solid rgba(255, 184, 0, 0.15)",
                    color: "#ffb800",
                  }}
                >
                  ⚠️ {totalQuestions - answeredCount} questions unanswered hain.
                  Submit kar sakte hain, lekin score affect hoga.
                </div>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    data-ocid="exam.submit_button"
                    size="lg"
                    className="w-full h-12 rounded-xl border-0 font-bold text-base gap-2"
                    disabled={submitting}
                    style={{
                      background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                      color: "#000",
                      boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Exam
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  data-ocid="exam.submit_dialog"
                  style={{
                    background: "rgba(3, 10, 28, 0.98)",
                    border: "1.5px solid rgba(0, 212, 255, 0.25)",
                  }}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle style={{ color: "#e8f4ff" }}>
                      Exam Submit Karein?
                    </AlertDialogTitle>
                    <AlertDialogDescription
                      style={{ color: "rgba(150, 200, 255, 0.6)" }}
                    >
                      Ek baar submit karne ke baad answers change nahi ho sakte.
                      {answeredCount < totalQuestions && (
                        <span
                          className="block mt-2"
                          style={{ color: "#ffb800" }}
                        >
                          {totalQuestions - answeredCount} questions abhi bhi
                          unanswered hain.
                        </span>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      data-ocid="exam.submit_cancel_button"
                      style={{
                        background: "rgba(0,10,25,0.6)",
                        borderColor: "rgba(0,212,255,0.15)",
                        color: "rgba(150,200,255,0.6)",
                      }}
                    >
                      Wapas Jaao
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="exam.submit_confirm_button"
                      onClick={handleSubmit}
                      style={{
                        background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                        color: "#000",
                        border: "none",
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Haan, Submit Karein
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default ExamPage;
