import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Crown, Medal, Star, TrendingUp, Trophy } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useCallerUserProfile, useGetLeaderboard } from "../hooks/useQueries";

const TITLE_TIERS = [
  {
    min: 0,
    max: 99,
    title: "Medical Student",
    emoji: "📚",
    color: "text-slate-400",
    next: 100,
  },
  {
    min: 100,
    max: 299,
    title: "Clinical Intern",
    emoji: "🩺",
    color: "text-sky-400",
    next: 300,
  },
  {
    min: 300,
    max: 499,
    title: "Junior Resident",
    emoji: "📋",
    color: "text-blue-400",
    next: 500,
  },
  {
    min: 500,
    max: 699,
    title: "Senior Resident",
    emoji: "🔬",
    color: "text-violet-400",
    next: 700,
  },
  {
    min: 700,
    max: 899,
    title: "Associate Consultant",
    emoji: "🏥",
    color: "text-amber-400",
    next: 900,
  },
  {
    min: 900,
    max: 1199,
    title: "Senior Consultant",
    emoji: "⭐",
    color: "text-yellow-300",
    next: 1200,
  },
  {
    min: 1200,
    max: Number.POSITIVE_INFINITY,
    title: "Chief Medical Officer",
    emoji: "👑",
    color: "text-rose-300",
    next: null,
  },
];

export function getTitleForPoints(points: number) {
  return (
    TITLE_TIERS.find((t) => points >= t.min && points <= t.max) ??
    TITLE_TIERS[0]
  );
}

const DEMO_STUDENTS: Array<{ name: string; role: string; points: number }> = [
  { name: "Dr. Arjun Sharma", role: "Senior Resident 2", points: 1380 },
  { name: "Dr. Priya Mehta", role: "Assistant Professor", points: 1205 },
  { name: "Dr. Rahul Gupta", role: "Junior Resident 2", points: 1080 },
  { name: "Dr. Ananya Singh", role: "Senior Resident 1", points: 940 },
  { name: "Dr. Vikram Patel", role: "Junior Resident 1", points: 820 },
  { name: "Dr. Sneha Nair", role: "Intern", points: 740 },
  { name: "Dr. Rohit Verma", role: "Senior Resident 2", points: 665 },
  { name: "Dr. Kavya Reddy", role: "Junior Resident 2", points: 580 },
  { name: "Dr. Amit Kumar", role: "Student (MBBS)", points: 490 },
  { name: "Dr. Deepika Joshi", role: "Junior Resident 1", points: 420 },
  { name: "Dr. Sanjay Pillai", role: "Intern", points: 310 },
  { name: "Dr. Meera Iyer", role: "Student (MBBS)", points: 240 },
  { name: "Dr. Nikhil Malhotra", role: "Student (MBBS)", points: 160 },
  { name: "Dr. Pooja Tiwari", role: "Student (MBBS)", points: 95 },
  { name: "Dr. Kartik Bhatt", role: "Intern", points: 55 },
];

function seedLeaderboard(): LeaderboardEntry[] {
  const stored = localStorage.getItem("medsim_leaderboard");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // If it already has demo entries return them
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      /* fall through */
    }
  }
  const entries: LeaderboardEntry[] = DEMO_STUDENTS.map((s, i) => ({
    id: `demo_${i}`,
    name: s.name,
    role: s.role,
    points: s.points,
    isDemo: true,
  }));
  localStorage.setItem("medsim_leaderboard", JSON.stringify(entries));
  return entries;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  role: string;
  points: number;
  isDemo?: boolean;
  isCurrentUser?: boolean;
  joinedAt?: number;
}

export function LeaderboardPage(_props: {
  onNavigate?: (page: string) => void;
}) {
  const { data: profile } = useCallerUserProfile();
  const { data: backendEntries } = useGetLeaderboard();
  const [filter, setFilter] = useState<"all" | "month" | "week">("all");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const currentUserPoints = (() => {
    try {
      const pts = localStorage.getItem("medsim_leaderboard_points");
      return pts ? Number(pts) : 0;
    } catch {
      return 0;
    }
  })();

  useEffect(() => {
    const mobile = localStorage.getItem("medsim_login_mobile") || "";
    const userId = `user_${mobile}`;
    const userName = profile?.name || "You";

    let base: LeaderboardEntry[];

    if (backendEntries && backendEntries.length > 0) {
      // Use real backend data
      base = backendEntries.map((e) => ({
        id: e.id,
        name: e.name,
        role: e.role,
        points: Number(e.points),
        isCurrentUser: e.id === userId,
        joinedAt: Date.now(),
      }));
      // Ensure current user is included even if not yet in backend
      const hasMe = base.some((e) => e.isCurrentUser);
      if (!hasMe) {
        base = [
          ...base,
          {
            id: userId,
            name: userName,
            role: profile?.role || "Student (MBBS)",
            points: currentUserPoints,
            isCurrentUser: true,
          },
        ];
      } else {
        // Update points from local if higher
        base = base.map((e) =>
          e.isCurrentUser
            ? {
                ...e,
                name: userName,
                points: Math.max(e.points, currentUserPoints),
              }
            : e,
        );
      }
    } else {
      // Fallback to demo data
      const demoBase = seedLeaderboard();
      const withoutMe = demoBase.filter((e) => e.id !== userId);
      const me: LeaderboardEntry = {
        id: userId,
        name: userName,
        role: profile?.role || "Student (MBBS)",
        points: currentUserPoints,
        isCurrentUser: true,
      };
      base = [...withoutMe, me];
    }

    const all = [...base].sort((a, b) => b.points - a.points);
    setEntries(all);
  }, [profile, currentUserPoints, backendEntries]);

  const displayEntries = useMemo(() => {
    if (filter === "all") return entries;
    const cutoff =
      filter === "month"
        ? Date.now() - 30 * 24 * 60 * 60 * 1000
        : Date.now() - 7 * 24 * 60 * 60 * 1000;
    return entries.filter(
      (e) => e.isDemo || e.isCurrentUser || (e.joinedAt && e.joinedAt > cutoff),
    );
  }, [entries, filter]);

  const myRank = entries.findIndex((e) => e.isCurrentUser) + 1;
  const myEntry = entries.find((e) => e.isCurrentUser);
  const myTitle = getTitleForPoints(currentUserPoints);
  const pointsToNext =
    myTitle.next !== null ? myTitle.next - currentUserPoints : 0;

  const top3 = displayEntries.slice(0, 3);
  const podiumColors = [
    {
      bg: "from-yellow-500/20 to-yellow-500/5",
      border: "border-yellow-500/40",
      text: "text-yellow-400",
      glow: "0 0 24px rgba(234,179,8,0.4)",
    },
    {
      bg: "from-slate-400/20 to-slate-400/5",
      border: "border-slate-400/40",
      text: "text-slate-300",
      glow: "",
    },
    {
      bg: "from-amber-600/20 to-amber-600/5",
      border: "border-amber-600/40",
      text: "text-amber-500",
      glow: "",
    },
  ];

  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
  const podiumHeights = ["pt-8", "pt-0", "pt-12"];

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2">
              <Trophy className="h-7 w-7 text-yellow-400" />
              Global Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Clinical performance rankings — MedSim India
            </p>
          </div>
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as typeof filter)}
          >
            <TabsList className="text-xs">
              <TabsTrigger value="all" data-ocid="leaderboard.all_tab">
                All Time
              </TabsTrigger>
              <TabsTrigger value="month" data-ocid="leaderboard.month_tab">
                Month
              </TabsTrigger>
              <TabsTrigger value="week" data-ocid="leaderboard.week_tab">
                Week
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Your Rank card */}
        {myRank > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border p-4 bg-gradient-to-r from-primary/15 to-accent/10 border-primary/30"
            style={{ boxShadow: "0 0 20px rgba(0,229,255,0.08)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                  <span className="font-black text-primary text-xl">
                    #{myRank}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {myEntry?.name || "You"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {myTitle.emoji} {myTitle.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentUserPoints.toLocaleString()} pts
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Your Rank
                </p>
                <p className="font-black text-3xl text-primary">#{myRank}</p>
                {myTitle.next !== null ? (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-cyan-400" />
                    <span className="text-cyan-400 font-medium">
                      {pointsToNext} pts
                    </span>
                    <span>
                      to{" "}
                      {
                        TITLE_TIERS[
                          TITLE_TIERS.findIndex(
                            (t) => t.title === myTitle.title,
                          ) + 1
                        ]?.title
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">
                      Max Rank Achieved
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Podium — top 3 */}
        {top3.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card/50 p-6"
          >
            <h2 className="text-center text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
              Top Performers
            </h2>
            <div className="flex items-end justify-center gap-3 sm:gap-4">
              {podiumOrder.map((entry, i) => {
                const rank = entries.indexOf(entry) + 1;
                const style = podiumColors[rank - 1];
                const title = getTitleForPoints(entry.points);
                const PodiumIcon =
                  rank === 1 ? Crown : rank === 2 ? Medal : Award;
                const medal = ["🥇", "🥈", "🥉"][rank - 1];
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`flex flex-col items-center flex-1 ${podiumHeights[i]}`}
                  >
                    <div
                      className={`rounded-2xl border bg-gradient-to-b ${style.bg} ${style.border} p-3 sm:p-4 text-center w-full`}
                      style={
                        rank === 1 && style.glow
                          ? { boxShadow: style.glow }
                          : {}
                      }
                    >
                      <PodiumIcon
                        className={`h-6 w-6 mx-auto mb-2 ${style.text}`}
                      />
                      <p className="font-bold text-foreground text-xs truncate">
                        {entry.name.replace("Dr. ", "")}
                      </p>
                      <p
                        className={`font-black text-base sm:text-lg ${style.text}`}
                      >
                        {entry.points.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {title.title}
                      </p>
                      <Badge
                        className={`mt-1 text-[10px] ${
                          rank === 1
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : rank === 2
                              ? "bg-slate-500/20 text-slate-300 border-slate-500/30"
                              : "bg-amber-600/20 text-amber-500 border-amber-600/30"
                        }`}
                      >
                        {medal} #{rank}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Full ranked list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card/50 overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-foreground">Full Rankings</h2>
          </div>

          {/* Header row */}
          <div className="hidden sm:grid grid-cols-[40px_1fr_140px_110px_90px] gap-2 px-4 py-2 border-b border-border bg-muted/20">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
              #
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
              Name
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
              Clinical Title
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
              Role
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase text-right">
              Score
            </span>
          </div>

          <div className="divide-y divide-border">
            {entries.map((entry, idx) => {
              const rank = idx + 1;
              const title = getTitleForPoints(entry.points);
              const isMe = entry.isCurrentUser;
              return (
                <div
                  key={entry.id}
                  data-ocid={`leaderboard.item.${rank}`}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isMe
                      ? "bg-primary/10 border-l-2 border-cyan-400"
                      : "hover:bg-muted/30"
                  }`}
                  style={
                    isMe
                      ? { boxShadow: "inset 0 0 20px rgba(0,229,255,0.06)" }
                      : {}
                  }
                >
                  {/* Rank */}
                  <div
                    className={`w-8 flex-shrink-0 text-center font-black text-sm ${
                      rank === 1
                        ? "text-yellow-400"
                        : rank === 2
                          ? "text-slate-300"
                          : rank === 3
                            ? "text-amber-500"
                            : "text-muted-foreground"
                    }`}
                  >
                    {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`h-9 w-9 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${
                      isMe
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {entry.name.charAt(entry.name.includes("Dr.") ? 4 : 0)}
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-semibold text-sm truncate ${
                          isMe ? "text-cyan-400" : "text-foreground"
                        }`}
                      >
                        {entry.name}
                        {isMe ? " (You)" : ""}
                      </p>
                    </div>
                    {/* Mobile: show title + role stacked */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[11px] font-medium ${title.color}`}
                      >
                        {title.emoji} {title.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground hidden sm:inline">
                        •
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate hidden sm:inline">
                        {entry.role}
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-black text-sm ${title.color}`}>
                      {entry.points.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          Earn points by completing ER Simulations and Exercise Mode cases
        </p>
      </div>
    </div>
  );
}
