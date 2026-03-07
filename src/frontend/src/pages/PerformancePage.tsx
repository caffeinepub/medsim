import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import {
  useAllDiseases,
  useAllPatientCases,
  useMyCaseAttempts,
  useMyPerformanceStats,
} from "../hooks/useQueries";
import { getSubjectIcon, getSubjectsByYear } from "../lib/mbbs-subjects";

type TabType = "overview" | "history" | "recommendations";

function SubjectCard({
  subjectName,
  icon,
  attempts,
  correct,
  accuracy,
  isWeak,
  delay,
}: {
  subjectName: string;
  icon: string;
  attempts: number;
  correct: number;
  accuracy: number;
  isWeak: boolean;
  delay: number;
}) {
  const hasAttempts = attempts > 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`rounded-2xl border p-5 shadow-xs ${
        isWeak
          ? "border-destructive/20 bg-destructive/5"
          : accuracy >= 80 && hasAttempts
            ? "border-success/20 bg-success/5"
            : !hasAttempts
              ? "border-border/50 bg-card/50 opacity-70"
              : "border-border bg-card"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-display font-bold text-foreground text-sm">
            {subjectName}
          </span>
        </div>
        {isWeak && (
          <Badge variant="destructive" className="text-xs">
            Weak
          </Badge>
        )}
        {accuracy >= 80 && !isWeak && hasAttempts && (
          <Badge className="bg-success/10 text-success text-xs border-success/20">
            Strong
          </Badge>
        )}
        {!hasAttempts && (
          <Badge
            variant="outline"
            className="text-xs border-muted-foreground/30 text-muted-foreground"
          >
            Practice karein
          </Badge>
        )}
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span
          className={`font-display text-3xl font-black ${
            hasAttempts ? "text-foreground" : "text-muted-foreground/40"
          }`}
        >
          {accuracy}%
        </span>
        <span className="text-xs text-muted-foreground">
          {correct}/{attempts}
        </span>
      </div>
      <Progress
        value={accuracy}
        className={`h-2 ${
          accuracy >= 80 && hasAttempts
            ? "[&>div]:bg-success"
            : isWeak
              ? "[&>div]:bg-destructive"
              : ""
        }`}
      />
    </motion.div>
  );
}

export function PerformancePage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedAttempt, setExpandedAttempt] = useState<string | null>(null);

  const { data: perf, isLoading: perfLoading } = useMyPerformanceStats();
  const { data: attempts = [], isLoading: attemptsLoading } =
    useMyCaseAttempts();
  const { data: cases = [] } = useAllPatientCases();
  useAllDiseases(); // preload for future use

  const totalAttempts = perf ? Number(perf.totalAttempts) : 0;
  const correctCount = perf ? Number(perf.correctCount) : 0;
  const accuracy = perf ? Number(perf.accuracy) : 0;

  const sortedAttempts = [...attempts].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Subject Overview" },
    { id: "history", label: "Case History" },
    { id: "recommendations", label: "Recommendations" },
  ];

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
        {/* Header stats */}
        <div>
          <h1 className="font-display mb-2 text-2xl sm:text-3xl font-black text-foreground">
            Mera Performance
          </h1>
          <p className="text-muted-foreground">
            Aapki medical simulation progress dekhein
          </p>
        </div>

        {perfLoading ? (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {["stat1", "stat2", "stat3"].map((id) => (
              <Skeleton key={id} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {[
              {
                label: "Total Attempts",
                value: totalAttempts,
                icon: BookOpen,
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Correct Answers",
                value: correctCount,
                icon: CheckCircle2,
                color: "text-success",
                bg: "bg-success/10",
              },
              {
                label: "Overall Accuracy",
                value: `${accuracy}%`,
                icon: Target,
                color: accuracy >= 70 ? "text-success" : "text-warning",
                bg: accuracy >= 70 ? "bg-success/10" : "bg-warning/10",
              },
            ].map(({ label, value, icon: Icon, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs overflow-hidden"
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <p className={`font-display text-3xl font-black ${color}`}>
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-1">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div>
            {perfLoading ? (
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "sub1",
                  "sub2",
                  "sub3",
                  "sub4",
                  "sub5",
                  "sub6",
                  "sub7",
                  "sub8",
                  "sub9",
                ].map((id) => (
                  <Skeleton key={id} className="h-32 rounded-2xl" />
                ))}
              </div>
            ) : (
              (() => {
                // Build a map of subject stats from backend data
                const subjectDataMap = new Map<
                  string,
                  { attempts: number; correct: number; accuracy: number }
                >();
                if (perf) {
                  for (const item of perf.caseHistory) {
                    subjectDataMap.set(item.subjectName, {
                      attempts: Number(item.attempts),
                      correct: Number(item.correct),
                      accuracy: Number(item.accuracy),
                    });
                  }
                }

                const byYear = getSubjectsByYear();
                let globalIndex = 0;

                return (
                  <div
                    className="space-y-8"
                    data-ocid="performance.overview.section"
                  >
                    {Array.from(byYear.entries()).map(
                      ([yearLabel, subjects]) => (
                        <div key={yearLabel}>
                          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {yearLabel}
                          </h3>
                          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {subjects.map((s) => {
                              const data = subjectDataMap.get(s.name);
                              const isWeak =
                                perf?.weakSubjects.includes(s.name) ?? false;
                              const idx = globalIndex++;
                              return (
                                <SubjectCard
                                  key={s.name}
                                  subjectName={s.name}
                                  icon={s.icon}
                                  attempts={data?.attempts ?? 0}
                                  correct={data?.correct ?? 0}
                                  accuracy={data?.accuracy ?? 0}
                                  isWeak={isWeak}
                                  delay={0.03 * idx}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-2">
            {attemptsLoading ? (
              ["h1", "h2", "h3", "h4", "h5"].map((id) => (
                <Skeleton key={id} className="h-16 rounded-xl" />
              ))
            ) : sortedAttempts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border py-16 text-center">
                <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="font-semibold text-muted-foreground">
                  Koi attempt nahi mila
                </p>
              </div>
            ) : (
              sortedAttempts.map((attempt, i) => {
                const caseData = cases.find((c) => c.id === attempt.caseId);
                const isExpanded = expandedAttempt === attempt.caseId;

                return (
                  <motion.div
                    key={`${attempt.caseId}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.02 * i }}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-xs"
                  >
                    {/* Row */}
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 p-4 text-left"
                      onClick={() =>
                        setExpandedAttempt(isExpanded ? null : attempt.caseId)
                      }
                    >
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          attempt.isCorrect
                            ? "bg-success/20 text-success"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {attempt.isCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-foreground text-sm">
                          {caseData?.title ||
                            `Case ${attempt.caseId.slice(0, 8)}`}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{attempt.subject}</span>
                          <span>•</span>
                          <span>
                            {new Date(
                              Number(attempt.timestamp) / 1_000_000,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            attempt.isCorrect ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {attempt.isCorrect ? "Correct" : "Wrong"}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-border bg-muted/20 p-4 text-sm space-y-3">
                        <div>
                          <span className="font-semibold text-foreground">
                            Diagnosis:{" "}
                          </span>
                          <span
                            className={
                              attempt.isCorrect
                                ? "text-success"
                                : "text-destructive"
                            }
                          >
                            {attempt.diagnosisChosen}
                          </span>
                        </div>

                        {attempt.wrongDiagnosis && (
                          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                            <p className="font-semibold text-destructive text-xs mb-1">
                              Galat Diagnosis Kyun Tha?
                            </p>
                            <p className="text-muted-foreground">
                              {attempt.wrongDiagnosis.explanation}
                            </p>
                            <p className="mt-1 text-success">
                              Correct:{" "}
                              <strong>
                                {attempt.wrongDiagnosis.correctDiagnosis}
                              </strong>
                            </p>
                          </div>
                        )}

                        {attempt.wrongMedicines.length > 0 && (
                          <div className="space-y-2">
                            <p className="flex items-center gap-1 font-semibold text-warning text-xs">
                              <AlertTriangle className="h-3 w-3" />
                              Galat Medicines:
                            </p>
                            {attempt.wrongMedicines.map((wm) => (
                              <div
                                key={wm.medicineId}
                                className="rounded-lg border border-warning/20 bg-warning/5 p-3"
                              >
                                <p className="font-medium text-warning text-xs">
                                  Medicine ID: {wm.medicineId.slice(0, 8)}...
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  Reason: {wm.reason}
                                </p>
                                <p className="text-destructive text-xs">
                                  Side Effect: {wm.sideEffect}
                                </p>
                                <p className="text-success text-xs">
                                  Sahi Alternative: {wm.correctAlternative}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-4">
            {perfLoading ? (
              <Skeleton className="h-40 rounded-2xl" />
            ) : perf && perf.recommendations.length > 0 ? (
              <>
                {perf.weakSubjects.length > 0 && (
                  <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5">
                    <h3 className="font-display mb-3 flex items-center gap-2 font-bold text-foreground">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Weak Areas — Focus Here
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {perf.weakSubjects.map((sub) => (
                        <Badge
                          key={sub}
                          variant="outline"
                          className="border-warning/40 bg-warning/10 text-warning"
                        >
                          {getSubjectIcon(sub)} {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {perf.recommendations.map((rec, i) => (
                    <motion.div
                      key={rec}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm text-foreground">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border py-16 text-center">
                <TrendingUp className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="font-semibold text-muted-foreground">
                  Recommendations generate honge cases solve karne ke baad
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformancePage;
