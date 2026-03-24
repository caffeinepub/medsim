import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileQuestion,
  Loader2,
  PenLine,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  hospital: string;
  status:
    | "pending_admin_approval"
    | "exam_unlocked"
    | "pending_exam"
    | "under_review"
    | "pass"
    | "fail"
    | "exam_submitted"
    | "rejected";
  submittedAt: string;
  formData?: {
    name?: string;
    specialization?: string;
    availabilityDate?: string;
  };
}

interface ExamResult {
  applicationId: string;
  role: string;
  mcqScore: number;
  mcqTotal: number;
  status: "pass" | "pending" | "fail";
  submittedAt: string;
  pendingReview: boolean;
}

interface MyApplicationsPageProps {
  onNavigate?: (page: string) => void;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  pending_admin_approval: {
    label: "Awaiting Admin Approval",
    color: "#ffb800",
    bg: "rgba(255,184,0,0.08)",
    border: "rgba(255,184,0,0.2)",
    icon: Clock,
  },
  exam_unlocked: {
    label: "Exam Ready!",
    color: "#00e676",
    bg: "rgba(0,230,118,0.08)",
    border: "rgba(0,230,118,0.2)",
    icon: FileQuestion,
  },
  pending_exam: {
    label: "Exam Pending",
    color: "#ffb800",
    bg: "rgba(255,184,0,0.08)",
    border: "rgba(255,184,0,0.2)",
    icon: FileQuestion,
  },
  under_review: {
    label: "Under Review",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.2)",
    icon: Clock,
  },
  exam_submitted: {
    label: "Exam Submitted",
    color: "#9b59ff",
    bg: "rgba(155,89,255,0.08)",
    border: "rgba(155,89,255,0.2)",
    icon: CheckCircle2,
  },
  pass: {
    label: "Pass ✓",
    color: "#00e676",
    bg: "rgba(0,230,118,0.08)",
    border: "rgba(0,230,118,0.2)",
    icon: Award,
  },
  fail: {
    label: "Not Cleared",
    color: "#ff3355",
    bg: "rgba(255,51,85,0.08)",
    border: "rgba(255,51,85,0.2)",
    icon: XCircle,
  },
  rejected: {
    label: "Rejected",
    color: "#ff3355",
    bg: "rgba(255,51,85,0.08)",
    border: "rgba(255,51,85,0.2)",
    icon: XCircle,
  },
};

export function MyApplicationsPage({ onNavigate }: MyApplicationsPageProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [examResults, setExamResults] = useState<Record<string, ExamResult>>(
    {},
  );
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => {
    const apps: Application[] = JSON.parse(
      localStorage.getItem("medsim_applications") || "[]",
    );
    const results: Record<string, ExamResult> = JSON.parse(
      localStorage.getItem("medsim_exam_results") || "{}",
    );
    setApplications(apps.reverse()); // newest first
    setExamResults(results);
  }, []);

  const handleTakeExam = (appId: string) => {
    setNavigatingTo(appId);
    localStorage.setItem("medsim_current_exam_app", appId);
    setTimeout(() => {
      onNavigate?.("exam");
      setNavigatingTo(null);
    }, 400);
  };

  const cardStyle = {
    background: "rgba(5, 15, 35, 0.95)",
    border: "1px solid rgba(0, 212, 255, 0.12)",
  };

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <h1
              className="font-display text-3xl font-black"
              style={{ color: "#e8f4ff" }}
            >
              Meri Applications
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              {applications.length} application
              {applications.length !== 1 ? "s" : ""} submitted
            </p>
          </div>
          {onNavigate && (
            <Button
              data-ocid="my-applications.career_link"
              onClick={() => onNavigate("career")}
              className="gap-2 rounded-xl border-0 flex-shrink-0"
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              <Briefcase className="h-4 w-4" />
              Browse Opportunities
            </Button>
          )}
        </motion.div>

        {/* Stats */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              {
                label: "Total",
                value: applications.length,
                color: "#00d4ff",
                icon: ClipboardList,
              },
              {
                label: "Awaiting Approval",
                value: applications.filter(
                  (a) => a.status === "pending_admin_approval",
                ).length,
                color: "#ffb800",
                icon: Clock,
              },
              {
                label: "Exam Ready",
                value: applications.filter(
                  (a) =>
                    a.status === "exam_unlocked" ||
                    a.status === "pending_exam" ||
                    (!!a.submittedAt &&
                      Date.now() - new Date(a.submittedAt).getTime() >
                        24 * 60 * 60 * 1000 &&
                      a.status !== "exam_submitted" &&
                      a.status !== "pass" &&
                      a.status !== "fail"),
                ).length,
                color: "#00e676",
                icon: FileQuestion,
              },
              {
                label: "Pass",
                value: applications.filter((a) => a.status === "pass").length,
                color: "#9b59ff",
                icon: Award,
              },
            ].map(({ label, value, color, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl p-4"
                style={cardStyle}
              >
                <Icon className="h-5 w-5 flex-shrink-0" style={{ color }} />
                <div>
                  <p className="font-display font-bold" style={{ color }}>
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Applications list */}
        <ScrollArea className="h-auto">
          <AnimatePresence mode="popLayout">
            {applications.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-5 py-20 text-center"
                data-ocid="my-applications.empty_state"
              >
                <div
                  className="rounded-full p-5"
                  style={{
                    background: "rgba(0, 212, 255, 0.06)",
                    border: "1px solid rgba(0, 212, 255, 0.12)",
                  }}
                >
                  <ClipboardList
                    className="h-14 w-14"
                    style={{ color: "rgba(0, 212, 255, 0.3)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: "rgba(150, 200, 255, 0.7)" }}
                  >
                    No applications found
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "rgba(100, 150, 200, 0.4)" }}
                  >
                    Visit the Career Opportunities page to apply
                  </p>
                </div>
                {onNavigate && (
                  <Button
                    data-ocid="my-applications.explore_button"
                    onClick={() => onNavigate("career")}
                    className="gap-2 rounded-xl border-0 mt-2"
                    style={{
                      background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                      color: "#000",
                    }}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Explore Opportunities
                  </Button>
                )}
              </motion.div>
            ) : (
              <div className="space-y-3 pb-8">
                {applications.map((app, idx) => {
                  const statusConfig =
                    STATUS_CONFIG[app.status] || STATUS_CONFIG.pending_exam;
                  const StatusIcon = statusConfig.icon;
                  const result = examResults[app.id];
                  const canTakeExam =
                    app.status === "exam_unlocked" ||
                    app.status === "pending_exam" ||
                    (!!app.submittedAt &&
                      Date.now() - new Date(app.submittedAt).getTime() >
                        24 * 60 * 60 * 1000);
                  const isNavigating = navigatingTo === app.id;

                  return (
                    <motion.div
                      key={app.id}
                      data-ocid={`my-applications.item.${idx + 1}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl p-5"
                      style={{
                        ...cardStyle,
                        border: `1px solid ${statusConfig.border}`,
                      }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        {/* Left */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className="gap-1 text-[10px] border px-2 py-0.5"
                              style={{
                                background: statusConfig.bg,
                                color: statusConfig.color,
                                borderColor: statusConfig.border,
                              }}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building2
                              className="h-4 w-4 flex-shrink-0"
                              style={{ color: "#00d4ff" }}
                            />
                            <h3
                              className="font-display font-bold text-sm truncate"
                              style={{ color: "#e8f4ff" }}
                            >
                              {app.hospital}
                            </h3>
                          </div>
                          <p
                            className="text-sm mb-2"
                            style={{ color: "rgba(100, 180, 255, 0.7)" }}
                          >
                            {app.jobTitle}
                          </p>
                          <div
                            className="flex flex-wrap items-center gap-3 text-xs"
                            style={{ color: "rgba(100, 150, 200, 0.5)" }}
                          >
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              <span>
                                Applied:{" "}
                                {new Date(app.submittedAt).toLocaleDateString(
                                  "en-IN",
                                )}
                              </span>
                            </div>
                            {app.formData?.specialization && (
                              <span style={{ color: "#9b59ff" }}>
                                {app.formData.specialization}
                              </span>
                            )}
                          </div>

                          {/* Exam result preview */}
                          {result && (
                            <div
                              className="mt-3 rounded-xl p-3 flex items-center gap-4"
                              style={{
                                background:
                                  result.status === "pass"
                                    ? "rgba(0,230,118,0.06)"
                                    : result.status === "fail"
                                      ? "rgba(255,51,85,0.06)"
                                      : "rgba(255,184,0,0.06)",
                                border: `1px solid ${result.status === "pass" ? "rgba(0,230,118,0.15)" : result.status === "fail" ? "rgba(255,51,85,0.15)" : "rgba(255,184,0,0.15)"}`,
                              }}
                            >
                              {result.mcqTotal > 0 && (
                                <div className="text-center">
                                  <p
                                    className="font-display text-base font-black"
                                    style={{
                                      color:
                                        result.mcqScore / result.mcqTotal >= 0.7
                                          ? "#00e676"
                                          : "#ff3355",
                                    }}
                                  >
                                    {result.mcqScore}/{result.mcqTotal}
                                  </p>
                                  <p
                                    className="font-mono text-[9px]"
                                    style={{ color: "rgba(150,200,255,0.4)" }}
                                  >
                                    MCQ
                                  </p>
                                </div>
                              )}
                              {result.pendingReview && (
                                <div className="text-center">
                                  <p
                                    className="font-display text-base font-black"
                                    style={{ color: "#ffb800" }}
                                  >
                                    Pending
                                  </p>
                                  <p
                                    className="font-mono text-[9px]"
                                    style={{ color: "rgba(150,200,255,0.4)" }}
                                  >
                                    Descriptive
                                  </p>
                                </div>
                              )}
                              <div
                                className="ml-auto text-xs"
                                style={{ color: "rgba(150,200,255,0.45)" }}
                              >
                                Exam on{" "}
                                {new Date(
                                  result.submittedAt,
                                ).toLocaleDateString("en-IN")}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          {canTakeExam && (
                            <Button
                              data-ocid={`my-applications.take_exam_button.${idx + 1}`}
                              size="sm"
                              onClick={() => handleTakeExam(app.id)}
                              disabled={isNavigating}
                              className="gap-2 rounded-xl border-0 h-9 text-xs font-semibold"
                              style={{
                                background:
                                  "linear-gradient(135deg, #ffb800cc, #ffb800)",
                                color: "#000",
                                boxShadow: "0 4px 12px rgba(255, 184, 0, 0.25)",
                              }}
                            >
                              {isNavigating ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <PenLine className="h-3.5 w-3.5" />
                              )}
                              {isNavigating ? "Loading..." : "Exam Do"}
                            </Button>
                          )}
                          {result && (
                            <Button
                              data-ocid={`my-applications.view_result_button.${idx + 1}`}
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                localStorage.setItem(
                                  "medsim_current_exam_app",
                                  app.id,
                                );
                                onNavigate?.("exam");
                              }}
                              className="gap-2 rounded-xl h-9 text-xs"
                              style={{
                                border: "1px solid rgba(0,212,255,0.15)",
                                color: "rgba(100, 180, 255, 0.6)",
                              }}
                            >
                              View Result
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>
    </div>
  );
}

export default MyApplicationsPage;
