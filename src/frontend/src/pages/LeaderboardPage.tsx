import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Crown, Medal, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useCallerUserProfile } from "../hooks/useQueries";

const TITLE_TIERS = [
  {
    min: 0,
    max: 500,
    title: "Medical Intern",
    emoji: "🩺",
    color: "text-slate-400",
  },
  {
    min: 501,
    max: 1500,
    title: "Junior Resident",
    emoji: "📋",
    color: "text-blue-400",
  },
  {
    min: 1501,
    max: 3000,
    title: "Senior Resident",
    emoji: "🔬",
    color: "text-violet-400",
  },
  {
    min: 3001,
    max: 5000,
    title: "Consultant",
    emoji: "🏥",
    color: "text-amber-400",
  },
  {
    min: 5001,
    max: Number.POSITIVE_INFINITY,
    title: "Senior Consultant",
    emoji: "⭐",
    color: "text-yellow-300",
  },
];

export function getTitleForPoints(points: number) {
  return (
    TITLE_TIERS.find((t) => points >= t.min && points <= t.max) ??
    TITLE_TIERS[0]
  );
}

const DEMO_NAMES = [
  "Dr. Arjun Sharma",
  "Dr. Priya Mehta",
  "Dr. Rahul Gupta",
  "Dr. Ananya Singh",
  "Dr. Vikram Patel",
  "Dr. Sneha Nair",
  "Dr. Rohit Verma",
  "Dr. Kavya Reddy",
  "Dr. Amit Kumar",
  "Dr. Deepika Joshi",
  "Dr. Sanjay Pillai",
  "Dr. Meera Iyer",
  "Dr. Nikhil Malhotra",
  "Dr. Pooja Tiwari",
  "Dr. Kartik Bhatt",
  "Dr. Shreya Rao",
  "Dr. Manish Agarwal",
  "Dr. Divya Shetty",
  "Dr. Arun Desai",
  "Dr. Riya Chaudhary",
];

const DEMO_ROLES = [
  "Student (MBBS)",
  "Intern",
  "Junior Resident 1",
  "Junior Resident 2",
  "Senior Resident 1",
  "Senior Resident 2",
  "Assistant Professor",
];

function seedLeaderboard(): LeaderboardEntry[] {
  const stored = localStorage.getItem("medsim_leaderboard");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* fall through */
    }
  }
  const entries: LeaderboardEntry[] = DEMO_NAMES.map((name, i) => ({
    id: `demo_${i}`,
    name,
    role: DEMO_ROLES[i % DEMO_ROLES.length],
    points: Math.floor(200 + Math.random() * 7800),
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
}

export function LeaderboardPage(_props: {
  onNavigate?: (page: string) => void;
}) {
  const { data: profile } = useCallerUserProfile();
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
    const base = seedLeaderboard();
    const userName = profile?.name || "You";
    const mobile = localStorage.getItem("medsim_login_mobile") || "";
    const userId = `user_${mobile}`;

    const withoutMe = base.filter((e) => e.id !== userId);
    const me: LeaderboardEntry = {
      id: userId,
      name: userName,
      role: profile?.role || "Student (MBBS)",
      points: currentUserPoints,
      isCurrentUser: true,
    };
    const all = [...withoutMe, me].sort((a, b) => b.points - a.points);
    setEntries(all);
  }, [profile, currentUserPoints]);

  const myRank = entries.findIndex((e) => e.isCurrentUser) + 1;
  const myEntry = entries.find((e) => e.isCurrentUser);
  const myTitle = getTitleForPoints(currentUserPoints);
  const top3 = entries.slice(0, 3);
  const podiumColors = [
    {
      bg: "from-yellow-500/20 to-yellow-500/5",
      border: "border-yellow-500/40",
      text: "text-yellow-400",
      glow: "0 0 20px oklch(0.8 0.18 85 / 0.4)",
    },
    {
      bg: "from-slate-400/20 to-slate-400/5",
      border: "border-slate-400/40",
      text: "text-slate-300",
      glow: "0 0 16px oklch(0.7 0.04 235 / 0.3)",
    },
    {
      bg: "from-amber-600/20 to-amber-600/5",
      border: "border-amber-600/40",
      text: "text-amber-500",
      glow: "0 0 16px oklch(0.65 0.15 55 / 0.3)",
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
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2">
              <Trophy className="h-7 w-7 text-yellow-400" />
              Global Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Top performers in MedSim India
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

        {/* My rank banner */}
        {myRank > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border p-4 bg-gradient-to-r from-primary/15 to-accent/10 border-primary/30"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                  <span className="font-black text-primary text-lg">
                    #{myRank}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {myEntry?.name || "You"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {myTitle.emoji} {myTitle.title} •{" "}
                    {currentUserPoints.toLocaleString()} pts
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Your Rank</p>
                <p className="font-black text-2xl text-primary">#{myRank}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Podium - top 3 */}
        {top3.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card/50 p-6"
          >
            <h2 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
              Top 3
            </h2>
            <div className="flex items-end justify-center gap-4">
              {podiumOrder.map((entry, i) => {
                const rank = entries.indexOf(entry) + 1;
                const style = podiumColors[rank - 1];
                const title = getTitleForPoints(entry.points);
                const PodiumIcon =
                  rank === 1 ? Crown : rank === 2 ? Medal : Award;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`flex flex-col items-center flex-1 ${podiumHeights[i]}`}
                    style={
                      rank === 1 ? { filter: `drop-shadow(${style.glow})` } : {}
                    }
                  >
                    <div
                      className={`rounded-2xl border bg-gradient-to-b ${style.bg} ${style.border} p-3 text-center w-full`}
                      style={rank === 1 ? { boxShadow: style.glow } : {}}
                    >
                      <PodiumIcon
                        className={`h-6 w-6 mx-auto mb-2 ${style.text}`}
                      />
                      <p className="font-bold text-foreground text-xs truncate">
                        {entry.name.replace("Dr. ", "")}
                      </p>
                      <p className={`font-black text-lg ${style.text}`}>
                        {entry.points.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {title.title}
                      </p>
                      {rank === 1 && (
                        <Badge className="mt-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]">
                          #{rank} 🥇
                        </Badge>
                      )}
                      {rank === 2 && (
                        <Badge className="mt-1 bg-slate-500/20 text-slate-300 border-slate-500/30 text-[10px]">
                          #{rank} 🥈
                        </Badge>
                      )}
                      {rank === 3 && (
                        <Badge className="mt-1 bg-amber-600/20 text-amber-500 border-amber-600/30 text-[10px]">
                          #{rank} 🥉
                        </Badge>
                      )}
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
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-muted/30"
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`w-8 text-center font-black text-sm ${
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
                        ? "bg-primary/30 text-primary border border-primary/40"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {entry.name.charAt(entry.name.includes("Dr.") ? 4 : 0)}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-semibold text-sm truncate ${isMe ? "text-primary" : "text-foreground"}`}
                      >
                        {entry.name}
                        {isMe ? " (You)" : ""}
                      </p>
                      {isMe && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] py-0">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.role}
                    </p>
                  </div>
                  {/* Title + Points */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-black text-sm ${title.color}`}>
                      {entry.points.toLocaleString()} pts
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {title.emoji} {title.title}
                    </p>
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
