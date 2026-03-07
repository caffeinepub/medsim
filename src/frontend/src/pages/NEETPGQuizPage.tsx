import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Filter,
  GraduationCap,
  ListChecks,
  RefreshCw,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { MBBS_SUBJECTS } from "../lib/mbbs-subjects";
import {
  NEET_PG_QUESTIONS,
  type NeetPGQuestion,
  SUBJECT_CHAPTERS,
  getChaptersForSubject,
} from "../lib/neet-pg-questions";

// ─── Types ──────────────────────────────────────────────────────────────────

type QuizState = "browse" | "quiz" | "result";

interface AttemptRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

// ─── Colour helpers ──────────────────────────────────────────────────────────

const DIFF_STYLE: Record<string, { bg: string; text: string; border: string }> =
  {
    Easy: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    Medium: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    Hard: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
    },
  };

// ─── Subject Selector (Browse Screen) ────────────────────────────────────────

function SubjectCard({
  name,
  icon,
  questionCount,
  onClick,
}: {
  name: string;
  icon: string;
  questionCount: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all hover:shadow-lg"
      style={{
        background: "oklch(0.18 0.05 235 / 0.7)",
        borderColor: "oklch(0.35 0.06 230)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{icon}</span>
        <span
          className="flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
          style={{
            background: "oklch(0.65 0.16 196 / 0.15)",
            color: "oklch(0.65 0.16 196)",
          }}
        >
          {questionCount} Q
        </span>
      </div>
      <div>
        <p
          className="font-display font-bold text-sm leading-tight"
          style={{ color: "oklch(0.92 0.015 215)" }}
        >
          {name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "oklch(0.65 0.16 196)" }}>
          {getChaptersForSubject(name).length} chapters
        </p>
      </div>
      <div className="flex items-center justify-end">
        <ChevronRight
          className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ color: "oklch(0.65 0.16 196)" }}
        />
      </div>
    </motion.button>
  );
}

// ─── Filter Bar ──────────────────────────────────────────────────────────────

function FilterBar({
  subject,
  chapter,
  difficulty,
  onSubjectChange,
  onChapterChange,
  onDifficultyChange,
  totalCount,
}: {
  subject: string;
  chapter: string;
  difficulty: string;
  onSubjectChange: (v: string) => void;
  onChapterChange: (v: string) => void;
  onDifficultyChange: (v: string) => void;
  totalCount: number;
}) {
  const chapters = subject !== "all" ? getChaptersForSubject(subject) : [];
  const yearGroups = useMemo(() => {
    const map = new Map<string, typeof MBBS_SUBJECTS>();
    for (const s of MBBS_SUBJECTS) {
      const list = map.get(s.yearLabel) ?? [];
      list.push(s);
      map.set(s.yearLabel, list);
    }
    return map;
  }, []);

  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        background: "oklch(0.18 0.05 235 / 0.6)",
        borderColor: "oklch(0.35 0.06 230)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
        <span
          className="text-sm font-semibold"
          style={{ color: "oklch(0.92 0.015 215)" }}
        >
          Filters
        </span>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold"
          style={{
            background: "oklch(0.65 0.16 196 / 0.15)",
            color: "oklch(0.65 0.16 196)",
          }}
        >
          {totalCount} questions match
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {/* Subject */}
        <Select value={subject} onValueChange={onSubjectChange}>
          <SelectTrigger
            data-ocid="neet_pg.subject.select"
            className="text-sm"
            style={{
              background: "oklch(0.22 0.05 235 / 0.8)",
              borderColor: "oklch(0.35 0.06 230)",
              color: "oklch(0.92 0.015 215)",
            }}
          >
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {Array.from(yearGroups.entries()).map(([yearLabel, subjects]) => (
              <SelectGroup key={yearLabel}>
                <SelectLabel>{yearLabel}</SelectLabel>
                {subjects.map((s) => {
                  const count = NEET_PG_QUESTIONS.filter(
                    (q) => q.subject === s.name,
                  ).length;
                  return (
                    <SelectItem key={s.name} value={s.name}>
                      {s.icon} {s.name} ({count})
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {/* Chapter */}
        <Select
          value={chapter}
          onValueChange={onChapterChange}
          disabled={subject === "all"}
        >
          <SelectTrigger
            data-ocid="neet_pg.chapter.select"
            className="text-sm"
            style={{
              background: "oklch(0.22 0.05 235 / 0.8)",
              borderColor: "oklch(0.35 0.06 230)",
              color: "oklch(0.92 0.015 215)",
            }}
          >
            <SelectValue placeholder="All Chapters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chapters</SelectItem>
            {chapters.map((ch) => {
              const count = NEET_PG_QUESTIONS.filter(
                (q) => q.subject === subject && q.chapter === ch,
              ).length;
              return (
                <SelectItem key={ch} value={ch}>
                  {ch} ({count})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Difficulty */}
        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger
            data-ocid="neet_pg.difficulty.select"
            className="text-sm"
            style={{
              background: "oklch(0.22 0.05 235 / 0.8)",
              borderColor: "oklch(0.35 0.06 230)",
              color: "oklch(0.92 0.015 215)",
            }}
          >
            <SelectValue placeholder="All Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Single Question Card ─────────────────────────────────────────────────────

function QuestionCard({
  question,
  index,
  total,
  onAnswer,
}: {
  question: NeetPGQuestion;
  index: number;
  total: number;
  onAnswer: (selectedIndex: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
    onAnswer(selected);
  };

  const optionLetters = ["A", "B", "C", "D"];
  const diffStyle = DIFF_STYLE[question.difficulty] ?? DIFF_STYLE.Medium;

  const getOptionStyle = (idx: number) => {
    if (!revealed) {
      if (selected === idx) {
        return {
          background: "oklch(0.65 0.16 196 / 0.15)",
          borderColor: "oklch(0.65 0.16 196 / 0.6)",
        };
      }
      return {
        background: "oklch(0.22 0.05 235 / 0.5)",
        borderColor: "oklch(0.35 0.06 230)",
      };
    }
    // After reveal
    if (idx === question.correctIndex) {
      return {
        background: "oklch(0.45 0.12 145 / 0.2)",
        borderColor: "oklch(0.55 0.15 145)",
      };
    }
    if (idx === selected && idx !== question.correctIndex) {
      return {
        background: "oklch(0.45 0.18 25 / 0.2)",
        borderColor: "oklch(0.55 0.2 25)",
      };
    }
    return {
      background: "oklch(0.22 0.05 235 / 0.3)",
      borderColor: "oklch(0.28 0.05 230)",
    };
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="rounded-2xl border p-5 sm:p-6 space-y-5"
      style={{
        background: "oklch(0.17 0.05 235 / 0.85)",
        borderColor: "oklch(0.35 0.06 230)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-xs font-mono font-bold"
          style={{ color: "oklch(0.65 0.16 196)" }}
        >
          Q {index + 1}/{total}
        </span>
        <Badge
          variant="outline"
          className={`text-xs ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
        >
          {question.difficulty}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs"
          style={{
            background: "oklch(0.65 0.16 196 / 0.08)",
            color: "oklch(0.65 0.16 196)",
            borderColor: "oklch(0.65 0.16 196 / 0.3)",
          }}
        >
          {question.subject}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs"
          style={{
            background: "oklch(0.28 0.06 230 / 0.5)",
            color: "oklch(0.75 0.02 215)",
            borderColor: "oklch(0.35 0.06 230)",
          }}
        >
          {question.chapter}
        </Badge>
        {question.year && (
          <span
            className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{
              background: "oklch(0.55 0.18 68 / 0.15)",
              color: "oklch(0.75 0.14 68)",
            }}
          >
            {question.year}
          </span>
        )}
      </div>

      {/* Stem */}
      <p
        className="text-sm sm:text-base leading-relaxed font-medium select-none"
        style={{ color: "oklch(0.92 0.015 215)" }}
      >
        {question.stem}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((opt, idx) => (
          <button
            key={`${question.id}-opt-${idx}`}
            type="button"
            data-ocid={`neet_pg.option.${idx + 1}`}
            onClick={() => handleSelect(idx)}
            disabled={revealed}
            className="w-full flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all select-none"
            style={getOptionStyle(idx)}
          >
            <span
              className="flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold font-mono mt-0.5"
              style={
                revealed && idx === question.correctIndex
                  ? {
                      background: "oklch(0.55 0.15 145)",
                      borderColor: "oklch(0.55 0.15 145)",
                      color: "white",
                    }
                  : revealed &&
                      idx === selected &&
                      idx !== question.correctIndex
                    ? {
                        background: "oklch(0.55 0.2 25)",
                        borderColor: "oklch(0.55 0.2 25)",
                        color: "white",
                      }
                    : selected === idx && !revealed
                      ? {
                          background: "oklch(0.65 0.16 196)",
                          borderColor: "oklch(0.65 0.16 196)",
                          color: "white",
                        }
                      : {
                          background: "transparent",
                          borderColor: "oklch(0.45 0.07 230)",
                          color: "oklch(0.65 0.16 196)",
                        }
              }
            >
              {revealed && idx === question.correctIndex ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : revealed &&
                idx === selected &&
                idx !== question.correctIndex ? (
                <XCircle className="h-3.5 w-3.5" />
              ) : (
                optionLetters[idx]
              )}
            </span>
            <span
              className="text-sm leading-relaxed"
              style={{
                color:
                  revealed && idx === question.correctIndex
                    ? "oklch(0.75 0.15 145)"
                    : revealed &&
                        idx === selected &&
                        idx !== question.correctIndex
                      ? "oklch(0.72 0.18 25)"
                      : selected === idx && !revealed
                        ? "oklch(0.88 0.02 215)"
                        : "oklch(0.78 0.02 215)",
              }}
            >
              {opt}
            </span>
          </button>
        ))}
      </div>

      {/* Submit / Next */}
      {!revealed ? (
        <Button
          data-ocid="neet_pg.submit_answer.button"
          onClick={handleReveal}
          disabled={selected === null}
          className="w-full font-semibold"
          style={{
            background:
              selected !== null
                ? "linear-gradient(135deg, oklch(0.50 0.14 200), oklch(0.40 0.12 220))"
                : "oklch(0.25 0.05 230)",
            border: "none",
            color: "oklch(0.95 0.01 215)",
          }}
        >
          Answer Confirm Karein
        </Button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Explanation Panel */}
            <div
              className="rounded-xl border p-4 space-y-3"
              style={{
                background: "oklch(0.15 0.05 235 / 0.8)",
                borderColor:
                  selected === question.correctIndex
                    ? "oklch(0.55 0.15 145 / 0.5)"
                    : "oklch(0.55 0.2 25 / 0.5)",
              }}
            >
              {/* Result banner */}
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{
                  background:
                    selected === question.correctIndex
                      ? "oklch(0.45 0.12 145 / 0.15)"
                      : "oklch(0.45 0.18 25 / 0.15)",
                }}
              >
                {selected === question.correctIndex ? (
                  <CheckCircle2
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "oklch(0.65 0.15 145)" }}
                  />
                ) : (
                  <XCircle
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "oklch(0.65 0.2 25)" }}
                  />
                )}
                <span
                  className="text-sm font-bold"
                  style={{
                    color:
                      selected === question.correctIndex
                        ? "oklch(0.75 0.15 145)"
                        : "oklch(0.72 0.18 25)",
                  }}
                >
                  {selected === question.correctIndex
                    ? "Sahi Jawab! Bahut Achha!"
                    : `Galat! Sahi jawab: Option ${["A", "B", "C", "D"][question.correctIndex]}`}
                </span>
              </div>

              {/* Explanation heading */}
              <div className="flex items-center gap-2">
                <BookOpen
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                >
                  Detailed Explanation
                </span>
              </div>

              {/* Full explanation — preformatted for line breaks */}
              <div className="space-y-2">
                {question.explanation.split("\n\n").map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.82 0.015 215)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Reference */}
              <div
                className="flex items-start gap-2 rounded-lg px-3 py-2"
                style={{
                  background: "oklch(0.55 0.18 68 / 0.08)",
                  border: "1px solid oklch(0.55 0.18 68 / 0.25)",
                }}
              >
                <GraduationCap
                  className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: "oklch(0.72 0.14 68)" }}
                />
                <p
                  className="text-xs leading-relaxed italic"
                  style={{ color: "oklch(0.72 0.14 68)" }}
                >
                  <strong>Ref:</strong> {question.reference}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

// ─── Quiz Session ─────────────────────────────────────────────────────────────

function QuizSession({
  questions,
  onComplete,
  onBack,
}: {
  questions: NeetPGQuestion[];
  onComplete: (attempts: AttemptRecord[]) => void;
  onBack: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [currentAnswered, setCurrentAnswered] = useState(false);

  const progress = (currentIndex / questions.length) * 100;

  const handleAnswer = (selectedIndex: number) => {
    const q = questions[currentIndex];
    setCurrentAnswered(true);
    setAttempts((prev) => [
      ...prev,
      {
        questionId: q.id,
        selectedIndex,
        isCorrect: selectedIndex === q.correctIndex,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      // Finalize
      const finalAttempts = attempts;
      onComplete(finalAttempts);
    } else {
      setCurrentIndex((i) => i + 1);
      setCurrentAnswered(false);
    }
  };

  const q = questions[currentIndex];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Top bar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="neet_pg.back_to_browse.button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors"
            style={{ color: "oklch(0.65 0.16 196)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Exit
          </button>
          <div className="flex-1">
            <Progress
              value={progress}
              className="h-1.5"
              style={
                {
                  "--progress-foreground": "oklch(0.65 0.16 196)",
                } as React.CSSProperties
              }
            />
          </div>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: "oklch(0.65 0.16 196)" }}
          >
            {currentIndex + 1}/{questions.length}
          </span>
        </div>

        {/* Score tally */}
        <div className="flex gap-3 text-xs">
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1"
            style={{
              background: "oklch(0.45 0.12 145 / 0.15)",
              color: "oklch(0.7 0.15 145)",
            }}
          >
            <CheckCircle2 className="h-3 w-3" />
            {attempts.filter((a) => a.isCorrect).length} Sahi
          </span>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1"
            style={{
              background: "oklch(0.45 0.18 25 / 0.15)",
              color: "oklch(0.7 0.18 25)",
            }}
          >
            <XCircle className="h-3 w-3" />
            {attempts.filter((a) => !a.isCorrect).length} Galat
          </span>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 ml-auto"
            style={{
              background: "oklch(0.28 0.06 230 / 0.5)",
              color: "oklch(0.65 0.02 215)",
            }}
          >
            {questions.length - currentIndex - 1} remaining
          </span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={q.id}
            question={q}
            index={currentIndex}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>

        {/* Next button (shown after answer) */}
        {currentAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              data-ocid="neet_pg.next_question.button"
              onClick={handleNext}
              className="w-full font-bold py-3"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.50 0.14 200), oklch(0.40 0.12 220))",
                border: "none",
                color: "oklch(0.95 0.01 215)",
              }}
            >
              {currentIndex + 1 >= questions.length
                ? "Results Dekho →"
                : "Agla Sawaal →"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Results Summary ──────────────────────────────────────────────────────────

function ResultsSummary({
  questions,
  attempts,
  onRetry,
  onBrowse,
}: {
  questions: NeetPGQuestion[];
  attempts: AttemptRecord[];
  onRetry: () => void;
  onBrowse: () => void;
}) {
  const correct = attempts.filter((a) => a.isCorrect).length;
  const total = attempts.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

  const grade =
    score >= 80
      ? { label: "Outstanding!", color: "oklch(0.7 0.15 145)" }
      : score >= 60
        ? { label: "Good Attempt!", color: "oklch(0.72 0.14 68)" }
        : { label: "Revise Karein", color: "oklch(0.65 0.2 25)" };

  // Subject-wise breakdown
  const subjectBreakdown = useMemo(() => {
    const map = new Map<string, { correct: number; total: number }>();
    for (const attempt of attempts) {
      const q = questions.find((q) => q.id === attempt.questionId);
      if (!q) continue;
      const curr = map.get(q.subject) ?? { correct: 0, total: 0 };
      curr.total += 1;
      if (attempt.isCorrect) curr.correct += 1;
      map.set(q.subject, curr);
    }
    return Array.from(map.entries()).map(([subject, stats]) => ({
      subject,
      ...stats,
      pct: Math.round((stats.correct / stats.total) * 100),
    }));
  }, [attempts, questions]);

  // Wrong questions for review
  const wrongAttempts = attempts.filter((a) => !a.isCorrect);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Hero score */}
        <div
          className="rounded-2xl border p-6 text-center"
          style={{
            background: "oklch(0.17 0.05 235 / 0.85)",
            borderColor: "oklch(0.35 0.06 230)",
          }}
        >
          <Trophy
            className="mx-auto mb-3 h-10 w-10"
            style={{ color: grade.color }}
          />
          <p
            className="font-display text-4xl font-black mb-1"
            style={{ color: grade.color }}
          >
            {score}%
          </p>
          <p
            className="font-display text-lg font-bold mb-1"
            style={{ color: "oklch(0.92 0.015 215)" }}
          >
            {grade.label}
          </p>
          <p className="text-sm" style={{ color: "oklch(0.65 0.02 215)" }}>
            {correct} / {total} questions sahi
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            {[
              { label: "Sahi", val: correct, color: "oklch(0.7 0.15 145)" },
              {
                label: "Galat",
                val: total - correct,
                color: "oklch(0.65 0.2 25)",
              },
              { label: "Total", val: total, color: "oklch(0.65 0.16 196)" },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                className="rounded-xl px-3 py-2"
                style={{ background: "oklch(0.22 0.05 235 / 0.6)" }}
              >
                <p className="font-mono font-black text-xl" style={{ color }}>
                  {val}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.02 215)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subject breakdown */}
        {subjectBreakdown.length > 0 && (
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{
              background: "oklch(0.17 0.05 235 / 0.85)",
              borderColor: "oklch(0.35 0.06 230)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <ListChecks
                className="h-4 w-4"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
              <h3
                className="font-display font-bold text-sm"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                Subject-wise Performance
              </h3>
            </div>
            {subjectBreakdown.map(({ subject, correct, total: tot, pct }) => (
              <div key={subject} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "oklch(0.82 0.015 215)" }}>
                    {subject}
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{
                      color:
                        pct >= 70
                          ? "oklch(0.7 0.15 145)"
                          : pct >= 50
                            ? "oklch(0.72 0.14 68)"
                            : "oklch(0.65 0.2 25)",
                    }}
                  >
                    {correct}/{tot} ({pct}%)
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.28 0.05 230)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background:
                        pct >= 70
                          ? "oklch(0.65 0.15 145)"
                          : pct >= 50
                            ? "oklch(0.68 0.14 68)"
                            : "oklch(0.58 0.2 25)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wrong questions review */}
        {wrongAttempts.length > 0 && (
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{
              background: "oklch(0.17 0.05 235 / 0.85)",
              borderColor: "oklch(0.35 0.06 230)",
            }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle
                className="h-4 w-4"
                style={{ color: "oklch(0.65 0.2 25)" }}
              />
              <h3
                className="font-display font-bold text-sm"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                Galat Jawab — Review Karein
              </h3>
            </div>
            <div className="space-y-3">
              {wrongAttempts.map((attempt) => {
                const q = questions.find((q) => q.id === attempt.questionId);
                if (!q) return null;
                const letters = ["A", "B", "C", "D"];
                return (
                  <div
                    key={attempt.questionId}
                    className="rounded-xl border p-3 space-y-2"
                    style={{
                      background: "oklch(0.22 0.05 235 / 0.5)",
                      borderColor: "oklch(0.35 0.06 230)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold leading-snug"
                      style={{ color: "oklch(0.85 0.015 215)" }}
                    >
                      {q.stem}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span
                        className="rounded px-1.5 py-0.5"
                        style={{
                          background: "oklch(0.45 0.18 25 / 0.15)",
                          color: "oklch(0.68 0.18 25)",
                        }}
                      >
                        Aapka: {letters[attempt.selectedIndex]}.{" "}
                        {q.options[attempt.selectedIndex]}
                      </span>
                      <span
                        className="rounded px-1.5 py-0.5"
                        style={{
                          background: "oklch(0.45 0.12 145 / 0.15)",
                          color: "oklch(0.68 0.15 145)",
                        }}
                      >
                        Sahi: {letters[q.correctIndex]}.{" "}
                        {q.options[q.correctIndex]}
                      </span>
                    </div>
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: "oklch(0.68 0.02 215)" }}
                    >
                      {q.explanation.split("\n\n")[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            data-ocid="neet_pg.retry.button"
            variant="outline"
            onClick={onRetry}
            className="gap-2 font-semibold"
            style={{
              borderColor: "oklch(0.35 0.06 230)",
              color: "oklch(0.82 0.015 215)",
              background: "oklch(0.22 0.05 235 / 0.5)",
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Dobara Karo
          </Button>
          <Button
            data-ocid="neet_pg.browse.button"
            onClick={onBrowse}
            className="gap-2 font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.50 0.14 200), oklch(0.40 0.12 220))",
              border: "none",
              color: "oklch(0.95 0.01 215)",
            }}
          >
            <BookOpen className="h-4 w-4" />
            Naya Practice
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main NEETPGQuizPage ──────────────────────────────────────────────────────

export function NEETPGQuizPage({
  onNavigate: _onNavigate,
}: {
  onNavigate?: (page: string) => void;
}) {
  const [quizState, setQuizState] = useState<QuizState>("browse");

  // Filters
  const [subject, setSubject] = useState("all");
  const [chapter, setChapter] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  // Active session
  const [sessionQuestions, setSessionQuestions] = useState<NeetPGQuestion[]>(
    [],
  );
  const [sessionAttempts, setSessionAttempts] = useState<AttemptRecord[]>([]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return NEET_PG_QUESTIONS.filter((q) => {
      const matchSubject = subject === "all" || q.subject === subject;
      const matchChapter = chapter === "all" || q.chapter === chapter;
      const matchDiff = difficulty === "all" || q.difficulty === difficulty;
      return matchSubject && matchChapter && matchDiff;
    });
  }, [subject, chapter, difficulty]);

  const handleSubjectChange = (v: string) => {
    setSubject(v);
    setChapter("all"); // reset chapter when subject changes
  };

  const handleStartQuiz = () => {
    if (filteredQuestions.length === 0) return;
    // Shuffle
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled);
    setSessionAttempts([]);
    setQuizState("quiz");
  };

  const handleQuizComplete = (attempts: AttemptRecord[]) => {
    setSessionAttempts(attempts);
    setQuizState("result");
  };

  const handleRetry = () => {
    const shuffled = [...sessionQuestions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled);
    setSessionAttempts([]);
    setQuizState("quiz");
  };

  const handleBrowse = () => {
    setQuizState("browse");
    setSessionAttempts([]);
    setSessionQuestions([]);
  };

  // ── Browse screen ─────────────────────────────────────────────────────
  if (quizState === "browse") {
    const subjectStats = MBBS_SUBJECTS.map((s) => ({
      ...s,
      count: NEET_PG_QUESTIONS.filter((q) => q.subject === s.name).length,
    }));

    const totalQuestions = NEET_PG_QUESTIONS.length;

    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap
                className="h-6 w-6"
                style={{ color: "oklch(0.65 0.16 196)" }}
              />
              <h1
                className="font-display text-2xl sm:text-3xl font-black"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                NEET PG Practice
              </h1>
            </div>
            <p style={{ color: "oklch(0.65 0.16 196)" }} className="text-sm">
              {totalQuestions} NEET PG standard questions — all 19 MBBS
              subjects, chapter-wise, with detailed explanations & textbook
              references
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Total Questions",
                val: totalQuestions,
                color: "oklch(0.65 0.16 196)",
              },
              {
                label: "Subjects Covered",
                val: 19,
                color: "oklch(0.7 0.15 145)",
              },
              {
                label: "Chapters Covered",
                val: Object.values(SUBJECT_CHAPTERS).flat().length,
                color: "oklch(0.72 0.14 68)",
              },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                className="rounded-2xl border p-4 text-center"
                style={{
                  background: "oklch(0.18 0.05 235 / 0.6)",
                  borderColor: "oklch(0.35 0.06 230)",
                }}
              >
                <p
                  className="font-display font-black text-2xl"
                  style={{ color }}
                >
                  {val}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.65 0.02 215)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <FilterBar
            subject={subject}
            chapter={chapter}
            difficulty={difficulty}
            onSubjectChange={handleSubjectChange}
            onChapterChange={setChapter}
            onDifficultyChange={setDifficulty}
            totalCount={filteredQuestions.length}
          />

          {/* Start button */}
          <Button
            data-ocid="neet_pg.start_quiz.button"
            disabled={filteredQuestions.length === 0}
            onClick={handleStartQuiz}
            className="w-full py-4 text-base font-bold"
            style={{
              background:
                filteredQuestions.length > 0
                  ? "linear-gradient(135deg, oklch(0.50 0.14 200), oklch(0.40 0.12 220))"
                  : "oklch(0.25 0.05 230)",
              border: "none",
              color: "oklch(0.95 0.01 215)",
            }}
          >
            {filteredQuestions.length > 0
              ? `Practice Shuru Karein — ${filteredQuestions.length} Questions`
              : "Koi question nahi mila — filter change karein"}
          </Button>

          {/* Subject grid */}
          <div>
            <h2
              className="font-display font-bold mb-3"
              style={{ color: "oklch(0.82 0.015 215)" }}
            >
              Subject-wise Practice
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {subjectStats
                .filter((s) => s.count > 0)
                .map((s) => (
                  <SubjectCard
                    key={s.name}
                    name={s.name}
                    icon={s.icon}
                    questionCount={s.count}
                    onClick={() => {
                      setSubject(s.name);
                      setChapter("all");
                      setDifficulty("all");
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────
  if (quizState === "quiz") {
    return (
      <QuizSession
        questions={sessionQuestions}
        onComplete={handleQuizComplete}
        onBack={handleBrowse}
      />
    );
  }

  // ── Result screen ─────────────────────────────────────────────────────
  return (
    <ResultsSummary
      questions={sessionQuestions}
      attempts={sessionAttempts}
      onRetry={handleRetry}
      onBrowse={handleBrowse}
    />
  );
}

export default NEETPGQuizPage;
