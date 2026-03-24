import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  Smartphone,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
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

// Animated ECG pulse line SVG
function EcgPulseLine() {
  return (
    <svg
      viewBox="0 0 400 60"
      className="w-full max-w-md"
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points="0,30 40,30 50,10 60,50 70,15 80,45 90,30 160,30 170,5 180,55 190,20 200,40 210,30 400,30"
        stroke="oklch(0.65 0.16 196)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

function LeaderboardRankCard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const mobile = localStorage.getItem("medsim_login_mobile") || "";
  const pts = Number(localStorage.getItem("medsim_leaderboard_points") || "0");

  const getTitleForPoints = (points: number) => {
    if (points > 5000) return { title: "Senior Consultant", emoji: "⭐" };
    if (points > 3000) return { title: "Consultant", emoji: "🏥" };
    if (points > 1500) return { title: "Senior Resident", emoji: "🔬" };
    if (points > 500) return { title: "Junior Resident", emoji: "📋" };
    return { title: "Medical Intern", emoji: "🩺" };
  };

  const getRank = () => {
    try {
      const lb = JSON.parse(localStorage.getItem("medsim_leaderboard") || "[]");
      const all = [...lb, { id: `user_${mobile}`, points: pts }].sort(
        (a: { points: number }, b: { points: number }) => b.points - a.points,
      );
      const idx = all.findIndex(
        (e: { id: string }) => e.id === `user_${mobile}`,
      );
      return idx + 1;
    } catch {
      return 0;
    }
  };

  const rank = getRank();
  const { title, emoji } = getTitleForPoints(pts);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 p-4 flex items-center gap-4 cursor-pointer hover:from-yellow-500/15 transition-all"
      onClick={() => onNavigate("leaderboard")}
      data-ocid="home.leaderboard_card"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/15 border border-yellow-500/25">
        <Trophy className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {rank > 0 && (
            <span className="font-black text-lg text-yellow-400">#{rank}</span>
          )}
          <span className="font-semibold text-foreground text-sm">
            {emoji} {title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {pts.toLocaleString()} points earned • Tap to view leaderboard
        </p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </motion.div>
  );
}

function PwaInstallBanner({
  onInstall,
  onDismiss,
}: { onInstall: () => void; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative mx-3 mt-3 sm:mx-4 rounded-2xl overflow-hidden"
      data-ocid="home.install_banner"
    >
      <div
        className="flex items-center gap-3 p-3 sm:p-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.12 175) 0%, oklch(0.28 0.10 195) 100%)",
          border: "1px solid oklch(0.55 0.14 175 / 0.4)",
          boxShadow: "0 4px 24px oklch(0.45 0.14 175 / 0.3)",
          borderRadius: "inherit",
        }}
      >
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "oklch(0.55 0.16 175 / 0.25)",
            border: "1px solid oklch(0.65 0.14 175 / 0.4)",
          }}
        >
          <Smartphone
            className="h-5 w-5"
            style={{ color: "oklch(0.82 0.14 175)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm"
            style={{ color: "oklch(0.95 0.02 175)" }}
          >
            Install MedSim on your device
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.72 0.06 175)" }}
          >
            Offline access &middot; Faster loading &middot; Home screen icon
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onInstall}
            className="rounded-lg px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.65 0.16 175)",
              color: "oklch(0.98 0 0)",
              boxShadow: "0 2px 8px oklch(0.55 0.16 175 / 0.5)",
            }}
            data-ocid="home.install_now_button"
          >
            Install Now
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.72 0.06 175)" }}
            aria-label="Dismiss install banner"
            data-ocid="home.install_dismiss_button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem("medsim_install_dismissed") === "1",
  );

  const handleInstall = async () => {
    await promptInstall();
    setBannerDismissed(true);
    localStorage.setItem("medsim_install_dismissed", "1");
  };

  const handleDismiss = () => {
    setBannerDismissed(true);
    localStorage.setItem("medsim_install_dismissed", "1");
  };

  const showBanner = canInstall && !isInstalled && !bannerDismissed;

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
      label: "Clinical Case Practice",
      sublabel: "Exercise Mode",
      icon: BookOpen,
      color: "from-primary/20 to-primary/5 border-primary/30",
      iconColor: "text-primary",
    },
    {
      id: "custom-patient",
      label: "Custom Patient Simulator",
      sublabel: "Custom Case",
      icon: Users,
      color: "from-success/20 to-success/5 border-success/30",
      iconColor: "text-success",
    },
    {
      id: "performance",
      label: "Clinical Proficiency",
      sublabel: "Performance Analytics",
      icon: BarChart3,
      color: "from-warning/20 to-warning/5 border-warning/30",
      iconColor: "text-warning",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 px-4 py-10 sm:px-6 sm:py-14">
        {/* ECG background decoration */}
        <div className="absolute bottom-4 left-0 right-0 opacity-20 pointer-events-none">
          <EcgPulseLine />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.16 196)" }}
            >
              Advanced Medical Education
            </p>
            <h1
              className="font-display mb-3 text-3xl font-black sm:text-4xl lg:text-5xl"
              style={{ color: "oklch(0.97 0.005 215)" }}
            >
              MedSim Clinical Training Platform
            </h1>
            <p
              className="mb-6 text-sm sm:text-base"
              style={{ color: "oklch(0.75 0.03 215)" }}
            >
              Advanced Medical Simulation for MBBS Students &amp; Residents
            </p>
            <Button
              size="lg"
              data-ocid="home.start_practice_button"
              onClick={() => onNavigate("exercise")}
              className="h-12 px-8 text-base font-bold shadow-lg hover:scale-105 transition-transform"
              style={{
                background: "oklch(0.65 0.16 196)",
                color: "oklch(0.99 0 0)",
                boxShadow: "0 0 24px oklch(0.65 0.16 196 / 0.4)",
              }}
            >
              Start Clinical Practice
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showBanner && (
          <PwaInstallBanner
            onInstall={handleInstall}
            onDismiss={handleDismiss}
          />
        )}
      </AnimatePresence>

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
                    <p className="text-sm text-muted-foreground">
                      {greeting} 👋
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground truncate">
                      {profile?.name || "Doctor"}
                    </h2>
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
                  <span className="text-xs text-muted-foreground">
                    Cases Attempted
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard rank card */}
          <LeaderboardRankCard onNavigate={onNavigate} />

          {/* Quick actions */}
          <div>
            <h2 className="font-display mb-3 text-base sm:text-lg font-bold text-foreground">
              Quick Clinical Access
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
                      <p className="text-xs text-muted-foreground">
                        {sublabel}
                      </p>
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
                Performance by Clinical Specialty
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("performance")}
                className="text-primary"
              >
                View All →
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
                      answers
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center"
                data-ocid="home.performance.empty_state"
              >
                <Target className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="font-semibold text-muted-foreground">
                  No clinical attempts recorded.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Begin your first case in Exercise Mode.
                </p>
                <Button
                  size="sm"
                  className="mt-4"
                  data-ocid="home.begin_practice_button"
                  onClick={() => onNavigate("exercise")}
                >
                  Begin Clinical Practice
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
                  Areas Requiring Attention
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
                Recent Clinical Activity
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
                        {attempt.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div
                className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center"
                data-ocid="home.activity.empty_state"
              >
                <Clock className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No recent clinical activity. Begin a case to start tracking
                  progress.
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
    </div>
  );
}

export default HomePage;
