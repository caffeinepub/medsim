import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import {
  useAllPatientCases,
  useCallerUserProfile,
  useMyCaseAttempts,
  useMyPerformanceStats,
} from "../hooks/useQueries";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const SUBJECT_COLORS: Record<string, string> = {
  Pharmacology: "text-purple-300 bg-purple-950/60",
  Medicine: "text-blue-300 bg-blue-950/60",
  Surgery: "text-orange-300 bg-orange-950/60",
  Pathology: "text-rose-300 bg-rose-950/60",
  Microbiology: "text-green-300 bg-green-950/60",
  Pediatrics: "text-yellow-300 bg-yellow-950/60",
  Default: "text-primary bg-primary/10",
};

function getSubjectColor(subject: string): string {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS.Default;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: profile, isLoading: profileLoading } = useCallerUserProfile();
  const { data: perf, isLoading: perfLoading } = useMyPerformanceStats();
  const { data: attempts = [], isLoading: attemptsLoading } =
    useMyCaseAttempts();
  const { data: cases = [] } = useAllPatientCases();

  const totalAttempts = perf ? Number(perf.totalAttempts) : 0;
  const accuracy = perf ? Number(perf.accuracy) : 0;
  const recentAttempts = [...attempts]
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, 3);

  const timeOfDay = new Date().getHours();
  const greeting =
    timeOfDay < 12
      ? "Good Morning"
      : timeOfDay < 17
        ? "Good Afternoon"
        : "Good Evening";

  const quickActions = [
    {
      id: "exercise",
      label: "Practice Karo",
      sublabel: "Exercise Mode",
      icon: BookOpen,
      color: "from-primary/20 to-primary/5 border-primary/30",
      iconColor: "text-primary",
    },
    {
      id: "custom-patient",
      label: "Apna Patient",
      sublabel: "Custom Case",
      icon: Users,
      color: "from-success/20 to-success/5 border-success/30",
      iconColor: "text-success",
    },
    {
      id: "performance",
      label: "Results Dekho",
      sublabel: "Performance",
      icon: BarChart3,
      color: "from-warning/20 to-warning/5 border-warning/30",
      iconColor: "text-warning",
    },
  ];

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-br from-primary/15 via-background to-accent/10 border border-border p-4 sm:p-6 lg:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              {profileLoading ? (
                <Skeleton className="mb-2 h-8 w-56" />
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{greeting} 👋</p>
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground truncate">
                    {profile?.name || "Doctor Ji"}
                  </h1>
                  <p className="mt-1 text-sm capitalize text-muted-foreground truncate">
                    {profile?.role || "MBBS Student"} • MedSim India
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {perfLoading ? (
                <Skeleton className="h-20 w-32 rounded-2xl" />
              ) : (
                <div className="flex flex-col items-center rounded-2xl bg-card border border-border px-4 py-3 text-center shadow-xs">
                  <span className="font-display text-2xl sm:text-3xl font-black text-primary">
                    {accuracy}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Accuracy
                  </span>
                </div>
              )}
              <div className="flex flex-col items-center rounded-2xl bg-card border border-border px-4 py-3 text-center shadow-xs">
                <span className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  {totalAttempts}
                </span>
                <span className="text-xs text-muted-foreground">Cases</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <div>
          <h2 className="font-display mb-3 text-base sm:text-lg font-bold text-foreground">
            Kya Karna Hai Aaj?
          </h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {quickActions.map(
              ({ id, label, sublabel, icon: Icon, color, iconColor }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => onNavigate(id)}
                  className={`group relative flex items-center gap-3 rounded-2xl border bg-gradient-to-br p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-medical overflow-hidden ${color}`}
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ${iconColor}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground">{sublabel}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </motion.button>
              ),
            )}
          </div>
        </div>

        {/* Subject performance */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
              Subject-wise Performance
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("performance")}
              className="text-primary"
            >
              Sab Dekho →
            </Button>
          </div>

          {perfLoading ? (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {["s1", "s2", "s3"].map((id) => (
                <Skeleton key={id} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : perf && perf.caseHistory.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {perf.caseHistory.map((item, i) => (
                <motion.div
                  key={item.subjectName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-xs overflow-hidden"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold truncate ${getSubjectColor(item.subjectName)}`}
                    >
                      {item.subjectName}
                    </span>
                    <span className="font-display text-lg font-bold text-foreground flex-shrink-0">
                      {Number(item.accuracy)}%
                    </span>
                  </div>
                  <Progress value={Number(item.accuracy)} className="h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {Number(item.correct)}/{Number(item.attempts)} correct
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
              <Target className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="font-semibold text-muted-foreground">
                Abhi koi attempt nahi kiya
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Exercise mode mein koi case solve karein
              </p>
              <Button
                size="sm"
                className="mt-4"
                onClick={() => onNavigate("exercise")}
              >
                Pehla Case Shuru Karein
              </Button>
            </div>
          )}
        </div>

        {/* Weak subjects */}
        {perf && perf.weakSubjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-warning/30 bg-warning/5 p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="font-display font-bold text-foreground">
                Inhe Improve Karo
              </h3>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {perf.weakSubjects.map((sub) => (
                <Badge
                  key={sub}
                  variant="outline"
                  className="border-warning/40 bg-warning/10 text-warning"
                >
                  {sub}
                </Badge>
              ))}
            </div>
            {perf.recommendations.slice(0, 2).map((rec) => (
              <p key={rec} className="text-sm text-muted-foreground">
                • {rec}
              </p>
            ))}
          </motion.div>
        )}

        {/* Recent activity */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">
              Recent Activity
            </h2>
          </div>

          {attemptsLoading ? (
            <div className="space-y-2">
              {["a1", "a2", "a3"].map((id) => (
                <Skeleton key={id} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : recentAttempts.length > 0 ? (
            <div className="space-y-2">
              {recentAttempts.map((attempt, i) => {
                const caseData = cases.find((c) => c.id === attempt.caseId);
                return (
                  <motion.div
                    key={`${attempt.caseId}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm ${
                        attempt.isCorrect
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {attempt.isCorrect ? "✓" : "✗"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {caseData?.title ||
                          `Case #${attempt.caseId.slice(0, 8)}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.subject} •{" "}
                        {new Date(
                          Number(attempt.timestamp) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <Badge
                      variant={attempt.isCorrect ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {attempt.isCorrect ? "Correct" : "Wrong"}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
              <Clock className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Koi recent activity nahi. Pehla case try karein!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-destructive">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
