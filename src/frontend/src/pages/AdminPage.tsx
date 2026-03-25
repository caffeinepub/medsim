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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  Cloud,
  CloudDownload,
  Database,
  Download,
  Edit2,
  Eye,
  FileJson,
  FileQuestion,
  FileText,
  Lock,
  Plus,
  RefreshCw,
  Shield,
  Target,
  Trash2,
  Upload,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import type { Disease, PatientCase, UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";
import {
  useAddDisease,
  useAddPatientCase,
  useAllAdminAlerts,
  useAllDiseases,
  useAllPatientCases,
  useAllSecurityEvents,
  useAllStudents,
  useDashboardStats,
  useDeleteDisease,
  useDeletePatientCase,
  useStudentPerformanceStats,
  useUpdateAdminAlertStatus,
  useUpdateDisease,
  useUpdatePatientCase,
  useUpdateSecurityEventStatus,
  useUpdateStudentStatus,
} from "../hooks/useQueries";
import { MBBS_SUBJECT_NAMES } from "../lib/mbbs-subjects";
import { icmrDiseaseData } from "../utils/icmrSeedData";

type AdminTab =
  | "dashboard"
  | "students"
  | "diseases"
  | "cases"
  | "alerts"
  | "security"
  | "database"
  | "exams"
  | "applications"
  | "careers"
  | "certificates";

const ADMIN_TABS = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: BarChart3 },
  { id: "students" as AdminTab, label: "Students", icon: Users },
  { id: "diseases" as AdminTab, label: "Diseases", icon: Database },
  { id: "cases" as AdminTab, label: "Patient Cases", icon: BookOpen },
  { id: "alerts" as AdminTab, label: "AI Alerts", icon: Bell },
  { id: "security" as AdminTab, label: "Security", icon: Shield },
  { id: "database" as AdminTab, label: "DB Import", icon: CloudDownload },
  { id: "exams" as AdminTab, label: "Exams", icon: FileQuestion },
  {
    id: "applications" as AdminTab,
    label: "Applications",
    icon: ClipboardList,
  },
  {
    id: "careers" as AdminTab,
    label: "Career Jobs",
    icon: Briefcase,
  },
  {
    id: "certificates" as AdminTab,
    label: "Certificates",
    icon: Award,
  },
];

// ─── Dashboard Tab ────────────────────────────────────────────────

function DashboardTab() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: alerts = [] } = useAllAdminAlerts();
  const { data: students = [] } = useAllStudents();
  const _unresolved = alerts.filter((a) => a.status === "unresolved");

  // Compute dashboard stats from localStorage
  const dailySims = (() => {
    try {
      const stored = localStorage.getItem("medsim_performance");
      if (!stored) return 0;
      const entries: Array<{ timestamp?: number }> = JSON.parse(stored);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return entries.filter((e) => e.timestamp && e.timestamp > today.getTime())
        .length;
    } catch {
      return 0;
    }
  })();

  const avgAccuracy = (() => {
    try {
      const entries: Array<{
        score?: number;
        correct?: number;
        total?: number;
      }> = JSON.parse(localStorage.getItem("medsim_performance") || "[]");
      if (!entries.length) return 0;
      return Math.round(
        entries.reduce(
          (s, e) =>
            s +
            (e.score ??
              (e.total && e.total > 0
                ? ((e.correct ?? 0) / e.total) * 100
                : 0)),
          0,
        ) / Math.max(entries.length, 1),
      );
    } catch {
      return 0;
    }
  })();

  const pendingCerts = (() => {
    try {
      const issued = JSON.parse(
        localStorage.getItem("medsim_issued_certs") || "{}",
      );
      const lb: Array<{ id: string; points: number }> = JSON.parse(
        localStorage.getItem("medsim_leaderboard") || "[]",
      );
      return lb.filter((s) => s.points > 500 && !issued[s.id]).length;
    } catch {
      return 0;
    }
  })();

  // Charts seed data
  const specialtyData = useMemo(() => {
    try {
      const stored = localStorage.getItem("medsim_performance");
      if (!stored) throw new Error("no data");
      const entries: Array<{ subject?: string }> = JSON.parse(stored);
      const counts: Record<string, number> = {};
      for (const e of entries) {
        const s = e.subject || "General";
        counts[s] = (counts[s] || 0) + 1;
      }
      const result = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
      }));
      if (result.length === 0) throw new Error("empty");
      return result;
    } catch {
      return [
        { name: "Medicine", value: 34 },
        { name: "Surgery", value: 22 },
        { name: "Pharmacology", value: 18 },
        { name: "Pathology", value: 14 },
        { name: "Paediatrics", value: 12 },
      ];
    }
  }, []);
  const CHART_COLORS = ["#00d4ff", "#0099cc", "#006699", "#00b4d8", "#90e0ef"];

  const activityData = [
    { day: "Mon", sessions: 12 },
    { day: "Tue", sessions: 19 },
    { day: "Wed", sessions: 8 },
    { day: "Thu", sessions: 25 },
    { day: "Fri", sessions: 31 },
    { day: "Sat", sessions: 17 },
    { day: "Sun", sessions: 9 },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["d1", "d2", "d3", "d4"].map((id) => (
          <Skeleton key={id} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  const execCards = [
    {
      label: "Total Students",
      value: stats ? Number(stats.totalStudents) : students.length,
      icon: Users,
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
    },
    {
      label: "Daily Simulations",
      value: dailySims,
      icon: Activity,
      gradient: "from-green-500/20 to-emerald-500/10",
      border: "border-green-500/30",
      iconColor: "text-green-400",
    },
    {
      label: "Avg. Clinical Accuracy",
      value: `${avgAccuracy}%`,
      icon: Target,
      gradient: "from-purple-500/20 to-violet-500/10",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      label: "Pending Certificates",
      value: pendingCerts,
      icon: Award,
      gradient: "from-yellow-500/20 to-amber-500/10",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {execCards.map(
          ({ label, value, icon: Icon, gradient, border, iconColor }) => (
            <div
              key={label}
              className={`flex items-center gap-4 rounded-2xl border ${border} bg-gradient-to-br ${gradient} p-5 shadow-sm backdrop-blur-sm`}
              style={{ background: "rgba(5, 15, 35, 0.85)" }}
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 ${iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-3xl font-black text-foreground">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Specialty Distribution Pie Chart */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(5, 15, 35, 0.9)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <h3
            className="font-display font-bold mb-4"
            style={{ color: "rgba(180,220,255,0.9)" }}
          >
            Clinical Specialty Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {specialtyData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{
                  background: "rgba(5,15,35,0.95)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: "8px",
                  color: "#e8f4ff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {specialtyData.map((entry, i) => (
              <div
                key={entry.name}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(180,220,255,0.7)" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: CHART_COLORS[i] }}
                />
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Student Activity Line Chart */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(5, 15, 35, 0.9)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <h3
            className="font-display font-bold mb-4"
            style={{ color: "rgba(180,220,255,0.9)" }}
          >
            Student Activity (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={activityData}
              margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
            >
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(150,200,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(150,200,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip
                contentStyle={{
                  background: "rgba(5,15,35,0.95)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: "8px",
                  color: "#e8f4ff",
                }}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#00d4ff"
                strokeWidth={2.5}
                dot={{ fill: "#00d4ff", r: 4 }}
                activeDot={{ r: 6, fill: "#00e5ff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {stats && stats.commonMistakes.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display mb-3 font-bold text-foreground">
            Common Student Mistakes
          </h3>
          <div className="space-y-2">
            {stats.commonMistakes.map((mistake, i) => (
              <div
                key={mistake}
                className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-sm"
              >
                <span className="font-display font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-foreground">{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Students Tab ─────────────────────────────────────────────────

function StudentPerformanceModal({ studentId }: { studentId: string }) {
  const { data: perf } = useStudentPerformanceStats(studentId);

  return (
    <div className="space-y-3">
      {perf ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/40 p-3 text-center">
              <p className="font-display text-2xl font-black text-foreground">
                {Number(perf.totalAttempts)}
              </p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="rounded-xl bg-success/10 p-3 text-center">
              <p className="font-display text-2xl font-black text-success">
                {Number(perf.correctCount)}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3 text-center">
              <p className="font-display text-2xl font-black text-primary">
                {Number(perf.accuracy)}%
              </p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
          <div className="space-y-2">
            {perf.caseHistory.map((h) => (
              <div key={h.subjectName} className="flex items-center gap-3">
                <span className="w-28 text-xs font-medium text-foreground truncate">
                  {h.subjectName}
                </span>
                <div className="flex-1 rounded-full bg-muted h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Number(h.accuracy)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {Number(h.accuracy)}%
                </span>
              </div>
            ))}
          </div>
          {perf.weakSubjects.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-semibold text-destructive">
                Weak Areas:
              </p>
              <div className="flex flex-wrap gap-1">
                {perf.weakSubjects.map((s) => (
                  <Badge key={s} variant="destructive" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">No performance data yet</p>
      )}
    </div>
  );
}

function StudentsTab() {
  const { data: students = [], isLoading } = useAllStudents();
  const updateStatus = useUpdateStudentStatus();
  const [_viewingStudent, setViewingStudent] = useState<UserProfile | null>(
    null,
  );
  const [studentSearch, setStudentSearch] = useState("");
  const [issuedCerts, setIssuedCerts] = useState<Record<string, boolean>>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("medsim_issued_certs") || "{}");
      } catch {
        return {};
      }
    },
  );

  const filteredStudents = students.filter(
    (s) =>
      (s.name?.toLowerCase() || "").includes(studentSearch.toLowerCase()) ||
      (s.mobile || "").includes(studentSearch),
  );

  const approveCert = (studentId: string, studentName: string) => {
    const updated = { ...issuedCerts, [studentId]: true };
    localStorage.setItem("medsim_issued_certs", JSON.stringify(updated));
    setIssuedCerts(updated);
    toast.success(`Certificate approved for ${studentName}`);
  };

  const leaderboardData = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("medsim_leaderboard") || "[]",
      ) as Array<{ id: string; points: number }>;
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
          registered
        </p>
        <div className="relative w-full sm:w-64">
          <Input
            data-ocid="admin.students.search_input"
            placeholder="Search by name or mobile…"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="pl-8 text-sm"
            style={{
              background: "rgba(5,15,35,0.9)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#e8f4ff",
            }}
          />
          <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.students.empty_state"
                  >
                    {studentSearch
                      ? "No students match your search"
                      : "No students registered yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student, idx) => {
                  const certIssued = issuedCerts[student.id] || false;
                  const studentLb = leaderboardData.find(
                    (s) => s.id === student.id,
                  );
                  const highScore = studentLb ? studentLb.points > 500 : false;
                  return (
                    <TableRow
                      key={student.id}
                      data-ocid={`admin.students.item.${idx + 1}`}
                    >
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.mobile}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="capitalize text-xs"
                        >
                          {student.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          data-ocid={`admin.students.switch.${idx + 1}`}
                          checked={student.isActive}
                          onCheckedChange={(checked) => {
                            updateStatus.mutate(
                              { studentId: student.id, isActive: checked },
                              {
                                onSuccess: () =>
                                  toast.success(
                                    `${student.name} ${checked ? "activated" : "blocked"}`,
                                  ),
                              },
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {certIssued ? (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                            Issued
                          </Badge>
                        ) : highScore ? (
                          <Button
                            size="sm"
                            variant="outline"
                            data-ocid={`admin.students.approve_cert_button.${idx + 1}`}
                            onClick={() =>
                              approveCert(student.id, student.name)
                            }
                            className="h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              data-ocid={`admin.students.open_modal_button.${idx + 1}`}
                              onClick={() => setViewingStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {student.name}'s Profile
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <p className="text-muted-foreground">
                                    Mobile
                                  </p>
                                  <p className="font-medium">
                                    {student.mobile}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Role</p>
                                  <p className="font-medium capitalize">
                                    {student.role}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    Status
                                  </p>
                                  <Badge
                                    variant={
                                      student.isActive
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {student.isActive ? "Active" : "Blocked"}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    Joined
                                  </p>
                                  <p className="font-medium">
                                    {new Date(
                                      Number(student.createdAt) / 1_000_000,
                                    ).toLocaleDateString("en-IN")}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="mb-2 font-semibold text-sm">
                                  Performance
                                </p>
                                <StudentPerformanceModal
                                  studentId={student.id}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {/* ── NEET PG Bulk Question Import ── */}
      <div
        className="p-5 space-y-4 rounded-2xl"
        style={{
          background: "rgba(5, 15, 35, 0.9)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" style={{ color: "#00d4ff" }} />
          <h3
            className="font-display font-bold"
            style={{ color: "rgba(180,220,255,0.9)" }}
          >
            Bulk Question Import (NEET PG)
          </h3>
        </div>
        <p className="text-xs" style={{ color: "rgba(150,200,255,0.5)" }}>
          Upload a CSV or Excel file with NEET PG questions. Each row = one
          question.
        </p>
        <NEETPGCSVUpload />
      </div>
    </div>
  );
}

// ─── Improved Disease Form ────────────────────────────────────────

interface SymptomEntry {
  name: string;
  severity: number;
  description: string;
}

const SUBJECT_OPTIONS = [
  "Medicine",
  "Pharmacology",
  "Microbiology",
  "Parasitology",
  "Paediatrics",
  "Surgery",
  "Gynaecology",
  "Pathology",
  "Neurology",
  "Cardiology",
  "Pulmonology",
  "Endocrinology",
  "Public Health",
  "Community Medicine",
  "Infectious Disease",
];

function SectionCard({
  title,
  helpText,
  children,
}: {
  title: string;
  helpText?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{
        background: "rgba(0, 10, 30, 0.5)",
        border: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      <div>
        <h4
          className="font-display text-sm font-bold"
          style={{ color: "rgba(180, 220, 255, 0.9)" }}
        >
          {title}
        </h4>
        {helpText && (
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(150, 200, 255, 0.4)" }}
          >
            {helpText}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function DiseaseForm({
  disease,
  onSave,
  onCancel,
}: {
  disease?: Disease;
  onSave: (d: Disease) => void;
  onCancel: () => void;
}) {
  // Section 1: Basic Info
  const [name, setName] = useState(disease?.name || "");
  const [category, setCategory] = useState(disease?.category || "Communicable");
  const [icd10, setIcd10] = useState(disease?.icd10Code || "");
  const [description, setDescription] = useState(disease?.description || "");

  // Section 2: Clinical Signs
  const [bp, setBp] = useState(disease?.clinicalSigns.bp || "120/80 mmHg");
  const [hr, setHr] = useState(disease?.clinicalSigns.hr || "80 bpm");
  const [temp, setTemp] = useState(disease?.clinicalSigns.temp || "37°C");
  const [rr, setRr] = useState(disease?.clinicalSigns.rr || "16/min");
  const [spo2, setSpo2] = useState(disease?.clinicalSigns.spo2 || "98%");

  // Section 3: Symptoms
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>(
    disease?.symptoms.map((s) => ({
      name: s.name,
      severity: Number(s.severity),
      description: s.description,
    })) || [{ name: "", severity: 5, description: "" }],
  );

  // Section 4: Diagnostic details
  const [diagnosticCriteria, setDiagnosticCriteria] = useState(
    disease?.diagnosticCriteria || "",
  );
  const [associatedDiseasesText, setAssociatedDiseasesText] = useState(
    disease?.associatedDiseases.join(", ") || "",
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    disease?.subjectMapping || ["Medicine"],
  );

  const addSymptom = () => {
    setSymptoms((prev) => [
      ...prev,
      { name: "", severity: 5, description: "" },
    ]);
  };

  const removeSymptom = (idx: number) => {
    setSymptoms((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateSymptom = (
    idx: number,
    field: keyof SymptomEntry,
    value: string | number,
  ) => {
    setSymptoms((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    );
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Disease name required");
      return;
    }
    if (!category) {
      toast.error("Category required");
      return;
    }

    const associatedDiseases = associatedDiseasesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      id: disease?.id || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      category,
      description,
      icd10Code: icd10,
      symptoms: symptoms
        .filter((s) => s.name.trim())
        .map((s) => ({
          name: s.name,
          severity: BigInt(s.severity),
          description: s.description,
        })),
      clinicalSigns: { bp, hr, temp, rr, spo2 },
      diagnosticCriteria,
      associatedDiseases,
      subjectMapping:
        selectedSubjects.length > 0 ? selectedSubjects : ["Medicine"],
      medicines: disease?.medicines || [],
    });
  };

  const fieldStyle: React.CSSProperties = {
    background: "rgba(0, 15, 35, 0.7)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    color: "#e8f4ff",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
  };

  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-4 pr-2">
        {/* Section 1: Basic Information */}
        <SectionCard
          title="1. Basic Information"
          helpText="Fill in disease name, category, and ICD-10 code"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs text-muted-foreground">
                Disease Name *
              </Label>
              <Input
                data-ocid="admin.disease.name_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dengue Fever"
                style={fieldStyle}
                className="h-10 border-0 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Category *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  data-ocid="admin.disease.category_select"
                  className="h-10 border-0 focus-visible:ring-0"
                  style={fieldStyle}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Communicable">Communicable</SelectItem>
                  <SelectItem value="NonCommunicable">
                    Non-Communicable
                  </SelectItem>
                  <SelectItem value="Zoonotic">Zoonotic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                ICD-10 Code
              </Label>
              <Input
                data-ocid="admin.disease.icd10_input"
                value={icd10}
                onChange={(e) => setIcd10(e.target.value)}
                placeholder="e.g. A90"
                style={fieldStyle}
                className="h-10 border-0 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                data-ocid="admin.disease.description_textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief clinical description of the disease..."
                style={{ ...fieldStyle, resize: "none" }}
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </SectionCard>

        {/* Section 2: Clinical Signs */}
        <SectionCard
          title="2. Clinical Signs (Vitals)"
          helpText="Typical patient vitals — BP, HR, Temperature, Respiratory Rate, SpO2"
        >
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {[
              {
                label: "Blood Pressure",
                value: bp,
                onChange: setBp,
                placeholder: "120/80 mmHg",
                hint: "mmHg",
              },
              {
                label: "Heart Rate",
                value: hr,
                onChange: setHr,
                placeholder: "80 bpm",
                hint: "bpm",
              },
              {
                label: "Temperature",
                value: temp,
                onChange: setTemp,
                placeholder: "37°C / 98.6°F",
                hint: "°C or °F",
              },
              {
                label: "Resp. Rate",
                value: rr,
                onChange: setRr,
                placeholder: "16/min",
                hint: "/min",
              },
              {
                label: "SpO2",
                value: spo2,
                onChange: setSpo2,
                placeholder: "98%",
                hint: "%",
              },
            ].map((field) => (
              <div key={field.label} className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  {field.label}{" "}
                  <span className="opacity-50">({field.hint})</span>
                </Label>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  style={fieldStyle}
                  className="h-10 border-0 focus-visible:ring-0 font-mono"
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 3: Symptoms */}
        <SectionCard
          title="3. Symptoms"
          helpText="Common patient symptoms — name, severity (1-10), and description"
        >
          <div className="space-y-3">
            {symptoms.map((sym, idx) => (
              <div
                key={`symptom-${idx}-${sym.name}`}
                className="rounded-xl p-3 space-y-2"
                style={{
                  background: "rgba(0, 212, 255, 0.04)",
                  border: "1px solid rgba(0, 212, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Symptom name"
                      value={sym.name}
                      onChange={(e) =>
                        updateSymptom(idx, "name", e.target.value)
                      }
                      style={fieldStyle}
                      className="h-9 border-0 focus-visible:ring-0 text-sm"
                    />
                    <Input
                      placeholder="Short description"
                      value={sym.description}
                      onChange={(e) =>
                        updateSymptom(idx, "description", e.target.value)
                      }
                      style={fieldStyle}
                      className="h-9 border-0 focus-visible:ring-0 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSymptom(idx)}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all hover:bg-red-500/10"
                    style={{ color: "rgba(255, 51, 85, 0.5)" }}
                    aria-label="Remove symptom"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{ color: "rgba(150, 200, 255, 0.5)" }}
                  >
                    Severity:
                  </span>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[sym.severity]}
                    onValueChange={([v]) => updateSymptom(idx, "severity", v)}
                    className="flex-1"
                  />
                  <span
                    className="font-mono text-xs font-bold w-4"
                    style={{
                      color:
                        sym.severity >= 8
                          ? "#ff3355"
                          : sym.severity >= 5
                            ? "#ffb800"
                            : "#00e676",
                    }}
                  >
                    {sym.severity}
                  </span>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addSymptom}
              className="w-full gap-2 border-dashed"
              style={{
                border: "1px dashed rgba(0, 212, 255, 0.2)",
                color: "rgba(0, 212, 255, 0.6)",
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Symptom
            </Button>
          </div>
        </SectionCard>

        {/* Section 4: Diagnostic Details */}
        <SectionCard
          title="4. Diagnostic Details"
          helpText="Fill diagnostic criteria, associated diseases, and subject mapping"
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Diagnostic Criteria
              </Label>
              <Textarea
                data-ocid="admin.disease.diagnostic_textarea"
                value={diagnosticCriteria}
                onChange={(e) => setDiagnosticCriteria(e.target.value)}
                rows={3}
                placeholder="Gold standard tests, lab values, clinical criteria..."
                style={{ ...fieldStyle, resize: "none" }}
                className="border-0 focus-visible:ring-0 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Associated Diseases{" "}
                <span className="opacity-50">(comma separated)</span>
              </Label>
              <Input
                value={associatedDiseasesText}
                onChange={(e) => setAssociatedDiseasesText(e.target.value)}
                placeholder="Dengue, Typhoid, Malaria"
                style={fieldStyle}
                className="h-10 border-0 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Subject Mapping
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECT_OPTIONS.map((subj) => (
                  <button
                    type="button"
                    key={subj}
                    onClick={() => toggleSubject(subj)}
                    className="rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
                    style={
                      selectedSubjects.includes(subj)
                        ? {
                            background: "rgba(0, 212, 255, 0.2)",
                            border: "1px solid rgba(0, 212, 255, 0.4)",
                            color: "#00d4ff",
                          }
                        : {
                            background: "rgba(0, 10, 25, 0.5)",
                            border: "1px solid rgba(0, 212, 255, 0.1)",
                            color: "rgba(150, 200, 255, 0.5)",
                          }
                    }
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 5: Medicines note */}
        <SectionCard
          title="5. Medicines"
          helpText="Add medicines via ICMR import or edit existing disease"
        >
          <p className="text-sm" style={{ color: "rgba(150, 200, 255, 0.5)" }}>
            {disease?.medicines.length
              ? `${disease.medicines.length} medicines attached. Edit existing disease to modify medicines.`
              : "Medicines will be auto-populated from ICMR seed data. You may add/edit after saving."}
          </p>
        </SectionCard>

        {/* Buttons */}
        <div className="flex gap-3 pb-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            data-ocid="admin.disease.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1"
            data-ocid="admin.disease.save_button"
            style={{
              background: "linear-gradient(135deg, #0099cc, #00d4ff)",
              color: "#000",
              border: "none",
            }}
          >
            Save Disease
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

function DiseasesTab() {
  const { data: diseases = [], isLoading } = useAllDiseases();
  const addDisease = useAddDisease();
  const updateDisease = useUpdateDisease();
  const deleteDisease = useDeleteDisease();
  const [editingDisease, setEditingDisease] = useState<Disease | null | "new">(
    null,
  );

  const handleSave = async (d: Disease) => {
    try {
      if (editingDisease === "new") {
        await addDisease.mutateAsync(d);
        toast.success("Disease added!");
      } else {
        await updateDisease.mutateAsync(d);
        toast.success("Disease updated!");
      }
      setEditingDisease(null);
    } catch {
      toast.error("Failed to save disease");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDisease.mutateAsync(id);
      toast.success("Disease deleted");
    } catch {
      toast.error("Failed to delete disease");
    }
  };

  const categoryColor: Record<string, string> = {
    Communicable: "text-primary border-primary/30",
    NonCommunicable: "text-muted-foreground border-muted-foreground/30",
    Zoonotic: "text-warning border-warning/30",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {diseases.length} diseases in database
        </p>
        <Button
          size="sm"
          className="gap-2"
          data-ocid="admin.diseases.open_modal_button"
          onClick={() => setEditingDisease("new")}
        >
          <Plus className="h-4 w-4" />
          Add Disease
        </Button>
      </div>

      {editingDisease !== null && (
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(5, 15, 35, 0.95)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          <h3 className="font-display mb-4 font-bold text-foreground">
            {editingDisease === "new"
              ? "New Disease"
              : `Edit: ${(editingDisease as Disease).name}`}
          </h3>
          <DiseaseForm
            disease={
              editingDisease === "new" ? undefined : (editingDisease as Disease)
            }
            onSave={handleSave}
            onCancel={() => setEditingDisease(null)}
          />
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ICD-10</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diseases.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.diseases.empty_state"
                  >
                    No diseases. Add some or use ICMR sync!
                  </TableCell>
                </TableRow>
              ) : (
                diseases.map((d, idx) => (
                  <TableRow
                    key={d.id}
                    data-ocid={`admin.diseases.item.${idx + 1}`}
                  >
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${categoryColor[d.category] || ""}`}
                      >
                        {d.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {d.icd10Code}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {d.medicines.length}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`admin.diseases.edit_button.${idx + 1}`}
                          onClick={() => setEditingDisease(d)}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              data-ocid={`admin.diseases.delete_button.${idx + 1}`}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Disease?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                "{d.name}" will be permanently deleted. This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="admin.diseases.delete_cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                data-ocid="admin.diseases.delete_confirm_button"
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDelete(d.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ─── Patient Cases Tab ────────────────────────────────────────────

function CasesTab() {
  const { data: backendCases = [], isLoading } = useAllPatientCases();
  const customCases = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("medsim_custom_cases") || "[]");
    } catch {
      return [];
    }
  }, []);
  const cases = useMemo(
    () => [...backendCases, ...customCases],
    [backendCases, customCases],
  );
  const { data: diseases = [] } = useAllDiseases();
  const addCase = useAddPatientCase();
  const deleteCase = useDeletePatientCase();
  const updateCase = useUpdatePatientCase();
  const [addOpen, setAddOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<PatientCase | null>(null);
  const [caseForm, setCaseForm] = useState({
    title: "",
    diseaseName: "",
    subject: "",
    difficulty: "Medium",
    patientAge: "",
    patientGender: "Male",
    chiefComplaint: "",
    diagnosis: "",
    management: "",
  });

  const getDiagnoseName = (diseaseId: string) =>
    diseases.find((d) => d.id === diseaseId)?.name || diseaseId;

  const handleDelete = async (id: string) => {
    try {
      await deleteCase.mutateAsync(id);
      toast.success("Case deleted");
    } catch {
      toast.error("Failed to delete case");
    }
  };

  const resetForm = () => {
    setCaseForm({
      title: "",
      diseaseName: "",
      subject: "",
      difficulty: "Medium",
      patientAge: "",
      patientGender: "Male",
      chiefComplaint: "",
      diagnosis: "",
      management: "",
    });
    setEditingCase(null);
    setAddOpen(false);
  };

  const handleAddCase = () => {
    if (!caseForm.title || !caseForm.subject || !caseForm.diagnosis) {
      toast.error("Title, Subject, and Diagnosis are required");
      return;
    }
    const casePayload: PatientCase = {
      id: editingCase ? editingCase.id : `custom_${Date.now()}`,
      title: caseForm.title,
      diseaseId: caseForm.diseaseName,
      subject: caseForm.subject,
      difficulty: caseForm.difficulty,
      patientAge: BigInt(Number(caseForm.patientAge) * 12 || 360),
      patientGender: caseForm.patientGender,
      chiefComplaint: caseForm.chiefComplaint,
      correctDiagnosis: caseForm.diagnosis,
      history: caseForm.management,
      examinationFindings: "",
      investigations: "",
      correctMedicines: [],
    };

    if (editingCase) {
      updateCase.mutate(casePayload, {
        onSuccess: () => {
          toast.success("Case updated successfully!");
          resetForm();
        },
        onError: () => toast.error("Failed to update case"),
      });
    } else {
      addCase.mutate(casePayload, {
        onSuccess: () => {
          toast.success("Case added successfully!");
          resetForm();
        },
        onError: () => {
          // Fallback to localStorage for custom cases
          const existing: unknown[] = JSON.parse(
            localStorage.getItem("medsim_custom_cases") || "[]",
          );
          localStorage.setItem(
            "medsim_custom_cases",
            JSON.stringify([
              ...existing,
              { ...casePayload, patientAge: Number(casePayload.patientAge) },
            ]),
          );
          toast.success("Case saved locally!");
          resetForm();
        },
      });
    }
  };

  const handleEditCase = (caseItem: PatientCase) => {
    setEditingCase(caseItem);
    setCaseForm({
      title: caseItem.title,
      diseaseName: caseItem.diseaseId,
      subject: caseItem.subject,
      difficulty: caseItem.difficulty,
      patientAge: String(Math.floor(Number(caseItem.patientAge) / 12)),
      patientGender: caseItem.patientGender,
      chiefComplaint: caseItem.chiefComplaint,
      diagnosis: caseItem.correctDiagnosis,
      management: caseItem.history,
    });
    setAddOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {cases.length} patient cases
        </p>
        <Dialog
          open={addOpen}
          onOpenChange={(open) => {
            if (!open) {
              setEditingCase(null);
              setCaseForm({
                title: "",
                diseaseName: "",
                subject: "",
                difficulty: "Medium",
                patientAge: "",
                patientGender: "Male",
                chiefComplaint: "",
                diagnosis: "",
                management: "",
              });
            }
            setAddOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="sm"
              data-ocid="admin.cases.open_modal_button"
              className="gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> Add Case
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-lg max-h-[90vh] overflow-y-auto"
            data-ocid="admin.cases.dialog"
          >
            <DialogHeader>
              <DialogTitle>
                {editingCase ? "Edit Patient Case" : "Add New Patient Case"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <div>
                <Label className="text-xs mb-1 block">Case Title *</Label>
                <Input
                  data-ocid="admin.cases.input"
                  placeholder="e.g. 45 year old with chest pain"
                  value={caseForm.title}
                  onChange={(e) =>
                    setCaseForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Disease Name</Label>
                <Input
                  placeholder="e.g. Myocardial Infarction"
                  value={caseForm.diseaseName}
                  onChange={(e) =>
                    setCaseForm((p) => ({ ...p, diseaseName: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">Subject *</Label>
                  <Select
                    value={caseForm.subject}
                    onValueChange={(v) =>
                      setCaseForm((p) => ({ ...p, subject: v }))
                    }
                  >
                    <SelectTrigger data-ocid="admin.cases.select">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {MBBS_SUBJECT_NAMES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Difficulty</Label>
                  <Select
                    value={caseForm.difficulty}
                    onValueChange={(v) =>
                      setCaseForm((p) => ({ ...p, difficulty: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">
                    Patient Age (years)
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 45"
                    value={caseForm.patientAge}
                    onChange={(e) =>
                      setCaseForm((p) => ({ ...p, patientAge: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Gender</Label>
                  <Select
                    value={caseForm.patientGender}
                    onValueChange={(v) =>
                      setCaseForm((p) => ({ ...p, patientGender: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Chief Complaint</Label>
                <Input
                  placeholder="e.g. Severe chest pain for 2 hours"
                  value={caseForm.chiefComplaint}
                  onChange={(e) =>
                    setCaseForm((p) => ({
                      ...p,
                      chiefComplaint: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Diagnosis *</Label>
                <Input
                  placeholder="e.g. Acute STEMI"
                  value={caseForm.diagnosis}
                  onChange={(e) =>
                    setCaseForm((p) => ({ ...p, diagnosis: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Management</Label>
                <Textarea
                  placeholder="Treatment plan, medications, interventions..."
                  value={caseForm.management}
                  onChange={(e) =>
                    setCaseForm((p) => ({ ...p, management: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  data-ocid="admin.cases.submit_button"
                  onClick={handleAddCase}
                  className="flex-1"
                >
                  Save Case
                </Button>
                <Button
                  data-ocid="admin.cases.cancel_button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.cases.empty_state"
                  >
                    No cases available
                  </TableCell>
                </TableRow>
              ) : (
                cases.map((c, idx) => (
                  <TableRow
                    key={c.id}
                    data-ocid={`admin.cases.item.${idx + 1}`}
                  >
                    <TableCell className="font-medium text-sm max-w-40 truncate">
                      {c.title}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {getDiagnoseName(c.diseaseId)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {c.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          c.difficulty === "Hard"
                            ? "border-destructive/30 text-destructive"
                            : c.difficulty === "Easy"
                              ? "border-success/30 text-success"
                              : "border-warning/30 text-warning"
                        }`}
                      >
                        {c.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {Math.floor(Number(c.patientAge) / 12)}y {c.patientGender}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`admin.cases.edit_button.${idx + 1}`}
                          onClick={() => handleEditCase(c)}
                          className="text-primary hover:text-primary"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              data-ocid={`admin.cases.delete_button.${idx + 1}`}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Case?</AlertDialogTitle>
                              <AlertDialogDescription>
                                "{c.title}" will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDelete(c.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ─── Alerts Tab ───────────────────────────────────────────────────

function AlertsTab() {
  const { data: alerts = [], isLoading } = useAllAdminAlerts();
  const updateStatus = useUpdateAdminAlertStatus();

  const handleResolve = async (alertId: string) => {
    try {
      await updateStatus.mutateAsync({ alertId, status: "resolved" });
      toast.success("Alert resolved!");
    } catch {
      toast.error("Failed to update alert");
    }
  };

  const unresolved = alerts.filter((a) => a.status === "unresolved");
  const resolved = alerts.filter((a) => a.status !== "unresolved");

  return (
    <div className="space-y-4">
      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <>
          {unresolved.length > 0 && (
            <div>
              <h3 className="font-display mb-3 flex items-center gap-2 font-bold text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Unresolved ({unresolved.length})
              </h3>
              <div className="space-y-2">
                {unresolved.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-xl border border-destructive/30 bg-destructive/5 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-foreground">
                        {alert.title}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-destructive/40 text-destructive text-xs"
                      >
                        Severity {Number(alert.severity)}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          Number(alert.createdAt) / 1_000_000,
                        ).toLocaleString("en-IN")}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 border-success/40 text-success hover:bg-success/10"
                        onClick={() => handleResolve(alert.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resolved.length > 0 && (
            <div>
              <h3 className="font-display mb-3 font-bold text-muted-foreground">
                Resolved ({resolved.length})
              </h3>
              <div className="space-y-2 opacity-60">
                {resolved.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-xl border border-border bg-muted/20 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-muted-foreground text-sm">
                        {alert.title}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Resolved
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alerts.length === 0 && (
            <div
              className="rounded-2xl border border-dashed border-border py-16 text-center"
              data-ocid="admin.alerts.empty_state"
            >
              <Bell className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="font-semibold text-muted-foreground">
                No alerts. All good!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────

function SecurityTab() {
  const { data: events = [], isLoading } = useAllSecurityEvents();
  const updateEvent = useUpdateSecurityEventStatus();

  const activeEvents = events.filter((e) => e.status === "active");

  return (
    <div className="space-y-4">
      {activeEvents.length > 0 && (
        <div className="rounded-xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm">
          <strong className="text-warning">
            {activeEvents.length} active security events
          </strong>
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : events.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed border-border py-16 text-center"
          data-ocid="admin.security.empty_state"
        >
          <Shield className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-semibold text-muted-foreground">
            No security events detected
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.slice(0, 50).map((event, idx) => (
                <TableRow
                  key={event.id}
                  data-ocid={`admin.security.item.${idx + 1}`}
                >
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "active" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {event.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {event.studentId?.slice(0, 12) || "anonymous"}...
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-48 truncate">
                    {event.details}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(
                      Number(event.timestamp) / 1_000_000,
                    ).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={event.status}
                      onValueChange={(v) =>
                        updateEvent.mutate({ eventId: event.id, status: v })
                      }
                    >
                      <SelectTrigger className="h-7 text-xs w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ─── Database Import/Export Tab ───────────────────────────────────

const CSV_SAMPLE = `disease_id,disease_name,category,icd10_code,description,symptoms,diagnostic_criteria,clinical_bp,clinical_hr,clinical_temp,clinical_rr,clinical_spo2,associated_diseases,subject_mapping
malaria-falciparum,Malaria (P. falciparum),Communicable,B50,"Severe malaria caused by Plasmodium falciparum","Fever|Chills|Headache|Nausea","Positive blood smear or RDT","90/60 mmHg","110 bpm","104°F","24/min","94%","Dengue|Typhoid","Medicine|Pharmacology"
dengue-fever,Dengue Fever,Communicable,A90,"Arboviral infection by Dengue virus","High Fever|Retro-orbital Pain|Myalgia|Rash","NS1 antigen positive","100/70 mmHg","105 bpm","103°F","22/min","97%","Dengue Haemorrhagic Fever","Medicine|Microbiology"`;

const JSON_SAMPLE = `[
  {
    "id": "malaria-falciparum",
    "name": "Malaria (P. falciparum)",
    "category": "Communicable",
    "icd10Code": "B50",
    "description": "Severe malaria caused by Plasmodium falciparum",
    "symptoms": [
      { "name": "Fever", "severity": 8, "description": "High-grade fever with rigors" }
    ],
    "clinicalSigns": { "bp": "90/60 mmHg", "hr": "110 bpm", "temp": "104°F", "rr": "24/min", "spo2": "94%" },
    "diagnosticCriteria": "Positive blood smear or RDT",
    "associatedDiseases": ["Dengue", "Typhoid"],
    "subjectMapping": ["Medicine", "Pharmacology"],
    "medicines": []
  }
]`;

function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = "";
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"' && !inQuotes) {
      inQuotes = true;
    } else if (char === '"' && inQuotes) {
      inQuotes = false;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSVDisease(
  row: string,
  headers: string[],
): Partial<Disease> | null {
  const values = parseCSVRow(row);
  if (values.length < headers.length) return null;

  const get = (h: string) => values[headers.indexOf(h)] || "";

  return {
    id: get("disease_id") || crypto.randomUUID(),
    name: get("disease_name"),
    category: get("category") || "Communicable",
    icd10Code: get("icd10_code"),
    description: get("description"),
    symptoms: get("symptoms")
      .split("|")
      .filter(Boolean)
      .map((s) => ({
        name: s.trim(),
        severity: BigInt(5),
        description: "",
      })),
    clinicalSigns: {
      bp: get("clinical_bp") || "120/80 mmHg",
      hr: get("clinical_hr") || "80 bpm",
      temp: get("clinical_temp") || "37°C",
      rr: get("clinical_rr") || "16/min",
      spo2: get("clinical_spo2") || "98%",
    },
    diagnosticCriteria: get("diagnostic_criteria"),
    associatedDiseases: get("associated_diseases")
      .split("|")
      .filter(Boolean)
      .map((s) => s.trim()),
    subjectMapping: get("subject_mapping")
      .split("|")
      .filter(Boolean)
      .map((s) => s.trim()),
    medicines: [],
  };
}

// ─── NEET PG CSV Upload ───────────────────────────────────────────

function NEETPGCSVUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    rowCount: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const parseAndStoreCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        toast.error("CSV must have a header row and at least one question.");
        return;
      }
      // Skip header row
      const dataLines = lines.slice(1);
      const parsed = dataLines
        .map((line, idx) => {
          // Simple CSV parse (handles quoted fields)
          const cols: string[] = [];
          let cur = "";
          let inQuote = false;
          for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
              inQuote = !inQuote;
            } else if (line[i] === "," && !inQuote) {
              cols.push(cur.trim());
              cur = "";
            } else {
              cur += line[i];
            }
          }
          cols.push(cur.trim());
          if (cols.length < 8) return null;
          const [
            subject,
            chapter,
            question,
            optA,
            optB,
            optC,
            optD,
            correct,
            explanation = "",
            reference = "",
          ] = cols;
          const correctMap: Record<string, 0 | 1 | 2 | 3> = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
          };
          const correctIndex = correctMap[(correct || "a").toLowerCase()] ?? 0;
          return {
            id: `custom_${Date.now()}_${idx}`,
            subject: subject || "General",
            chapter: chapter || "Uploaded",
            stem: question || "",
            options: [optA || "", optB || "", optC || "", optD || ""] as [
              string,
              string,
              string,
              string,
            ],
            correctIndex,
            explanation: explanation || "Refer to standard textbooks.",
            reference: reference || "Uploaded content",
            difficulty: "Medium" as const,
          };
        })
        .filter(Boolean);

      if (parsed.length === 0) {
        toast.error("No valid questions found. Check CSV format.");
        return;
      }

      // Merge with existing custom questions
      const existing = JSON.parse(
        localStorage.getItem("medsim_custom_neetpg_questions") || "[]",
      );
      const merged = [...existing, ...parsed];
      localStorage.setItem(
        "medsim_custom_neetpg_questions",
        JSON.stringify(merged),
      );
      toast.success(
        `${parsed.length} questions imported and saved! Reload NEET PG Practice to see them.`,
      );
      setUploadedFile({ name: file.name, rowCount: parsed.length });
      setPendingFile(null);
    };
    reader.readAsText(file);
  };

  const handleFile = (file: File) => {
    if (file.name.endsWith(".csv")) {
      setPendingFile(file);
      // Auto-parse CSV immediately
      const rowEst = Math.max(1, Math.floor(file.size / 120));
      setUploadedFile({ name: file.name, rowCount: rowEst });
    } else {
      toast.error("Only .csv files are supported for NEET PG import.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.name.endsWith(".csv")) {
      handleFile(file);
    } else {
      toast.error("Only .csv files are supported");
    }
  };

  const handleConfirmImport = () => {
    if (pendingFile) {
      parseAndStoreCSV(pendingFile);
    } else {
      toast.info("File already processed.");
      setUploadedFile(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: file input click handled via hidden input */}
      <div
        data-ocid="admin.database.neetpg_dropzone"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl p-8 transition-all"
        style={{
          border: `2px dashed ${dragActive ? "#00d4ff" : "rgba(0,212,255,0.3)"}`,
          background: dragActive ? "rgba(0,212,255,0.07)" : "rgba(0,5,20,0.5)",
        }}
      >
        <Upload
          className="h-10 w-10 mb-3"
          style={{ color: dragActive ? "#00d4ff" : "rgba(0,212,255,0.5)" }}
        />
        <p
          className="font-medium text-sm mb-1"
          style={{ color: "rgba(180,220,255,0.85)" }}
        >
          {uploadedFile
            ? uploadedFile.name
            : "Drag & drop CSV / Excel file here"}
        </p>
        <p className="text-xs" style={{ color: "rgba(150,200,255,0.4)" }}>
          {uploadedFile
            ? `~${uploadedFile.rowCount} questions detected`
            : "or click to browse"}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        className="hidden"
        data-ocid="admin.database.neetpg_upload_button"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Confirm Import */}
      {uploadedFile && (
        <Button
          data-ocid="admin.database.neetpg_confirm_button"
          onClick={handleConfirmImport}
          className="w-full gap-2"
          style={{
            background: "linear-gradient(135deg, #0099cc, #00d4ff)",
            color: "#000",
            border: "none",
          }}
        >
          <Upload className="h-4 w-4" />
          Import {uploadedFile.rowCount} questions
        </Button>
      )}

      {/* Expected Format */}
      <div>
        <p
          className="text-xs mb-2 font-medium"
          style={{ color: "rgba(150,200,255,0.6)" }}
        >
          Expected CSV Format:
        </p>
        <pre
          className="text-xs overflow-x-auto p-3 rounded-lg"
          style={{
            background: "rgba(0,5,20,0.8)",
            border: "1px solid rgba(0,212,255,0.1)",
            color: "rgba(150,210,255,0.7)",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
          }}
        >
          subject,chapter,question,optionA,optionB,optionC,optionD,answer,explanation,reference
        </pre>
      </div>
    </div>
  );
}

function DatabaseTab() {
  const { actor } = useActor();
  const { data: diseases = [] } = useAllDiseases();
  const addDisease = useAddDisease();

  const [importProgress, setImportProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [importPreview, setImportPreview] = useState<Partial<Disease>[] | null>(
    null,
  );
  const [importFormat, setImportFormat] = useState<"csv" | "json">("csv");
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(() =>
    localStorage.getItem("medsim_icmr_last_synced"),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadCSVTemplate = () => {
    const blob = new Blob([CSV_SAMPLE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medsim_disease_template.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV template downloaded!");
  };

  const downloadJSONTemplate = () => {
    const blob = new Blob([JSON_SAMPLE], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medsim_disease_template.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON template downloaded!");
  };

  const handleFileSelect = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        try {
          if (importFormat === "csv") {
            const lines = text.trim().split("\n");
            const headers = parseCSVRow(lines[0]);
            const parsed = lines
              .slice(1)
              .map((row) => parseCSVDisease(row, headers))
              .filter(Boolean) as Partial<Disease>[];
            setImportPreview(parsed);
          } else {
            const parsed = JSON.parse(text);
            const arr = Array.isArray(parsed) ? parsed : [parsed];
            setImportPreview(arr);
          }
        } catch {
          toast.error("Error parsing file. Please check the format.");
        }
      };
      reader.readAsText(file);
    },
    [importFormat],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleImport = async () => {
    if (!importPreview || !actor) return;

    const validDiseases = importPreview.filter(
      (d) => d.name && d.category,
    ) as Disease[];

    setImportProgress({ current: 0, total: validDiseases.length });

    for (let i = 0; i < validDiseases.length; i++) {
      try {
        await addDisease.mutateAsync(validDiseases[i]);
        setImportProgress({ current: i + 1, total: validDiseases.length });
      } catch {
        // Continue on error
      }
    }

    setImportProgress(null);
    setImportPreview(null);
    toast.success(`${validDiseases.length} diseases imported successfully!`);
  };

  const handleICMRSync = async () => {
    if (!actor) return;
    setSyncing(true);

    try {
      const existing = await actor.getAllDiseases();
      const existingIds = new Set(existing.map((d) => d.id));
      const toAdd = icmrDiseaseData.filter((d) => !existingIds.has(d.id));

      if (toAdd.length === 0) {
        toast.success("All ICMR diseases are already synced.");
        setSyncing(false);
        return;
      }

      let added = 0;
      for (const disease of toAdd) {
        try {
          await actor.addDisease(disease);
          added++;
        } catch {
          // Continue
        }
      }

      const timestamp = new Date().toLocaleString("en-IN");
      localStorage.setItem("medsim_icmr_last_synced", timestamp);
      localStorage.setItem("medsim_diseases_seeded", "true");
      setLastSynced(timestamp);
      toast.success(`${added} new ICMR diseases synced!`);
    } catch {
      toast.error("Sync failed. Try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleExport = async () => {
    if (!actor) return;
    try {
      const allDiseases = await actor.getAllDiseases();
      const exportData = JSON.stringify(
        allDiseases,
        (_, value) => (typeof value === "bigint" ? Number(value) : value),
        2,
      );
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `medsim_diseases_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${allDiseases.length} diseases exported!`);
    } catch {
      toast.error("Export failed");
    }
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(5, 15, 35, 0.9)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
    borderRadius: "1rem",
  };

  const codeStyle: React.CSSProperties = {
    background: "rgba(0, 5, 20, 0.8)",
    border: "1px solid rgba(0, 212, 255, 0.1)",
    borderRadius: "0.5rem",
    padding: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "rgba(150, 210, 255, 0.7)",
    overflowX: "auto",
    whiteSpace: "pre",
    lineHeight: 1.6,
  };

  return (
    <div className="space-y-6">
      {/* ── A. Import Section ── */}
      <div style={cardStyle} className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4" style={{ color: "#00d4ff" }} />
          <h3
            className="font-display font-bold"
            style={{ color: "rgba(180, 220, 255, 0.9)" }}
          >
            Disease Database Import
          </h3>
        </div>

        <Tabs
          defaultValue="csv"
          onValueChange={(v) => {
            setImportFormat(v as "csv" | "json");
            setImportPreview(null);
          }}
        >
          <TabsList
            className="mb-4"
            style={{
              background: "rgba(0, 10, 25, 0.5)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
            }}
          >
            <TabsTrigger
              value="csv"
              data-ocid="admin.database.csv_tab"
              className="gap-2 data-[state=active]:bg-primary/20"
            >
              <FileText className="h-3.5 w-3.5" />
              CSV Format
            </TabsTrigger>
            <TabsTrigger
              value="json"
              data-ocid="admin.database.json_tab"
              className="gap-2 data-[state=active]:bg-primary/20"
            >
              <FileJson className="h-3.5 w-3.5" />
              JSON Format
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv" className="space-y-3">
            <p
              className="text-xs"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              Import in CSV format. Each row will be one disease.
            </p>
            <div style={codeStyle}>{CSV_SAMPLE}</div>
            <Button
              size="sm"
              variant="ghost"
              data-ocid="admin.database.download_csv_button"
              onClick={downloadCSVTemplate}
              className="gap-2"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#00d4ff",
              }}
            >
              <Download className="h-3.5 w-3.5" />
              Download CSV Template
            </Button>
          </TabsContent>

          <TabsContent value="json" className="space-y-3">
            <p
              className="text-xs"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              Import in JSON array format.
            </p>
            <div style={codeStyle}>{JSON_SAMPLE}</div>
            <Button
              size="sm"
              variant="ghost"
              data-ocid="admin.database.download_json_button"
              onClick={downloadJSONTemplate}
              className="gap-2"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#00d4ff",
              }}
            >
              <Download className="h-3.5 w-3.5" />
              Download JSON Template
            </Button>
          </TabsContent>
        </Tabs>

        {/* Dropzone */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: file input click handled via keyboard through the hidden input */}
        <div
          data-ocid="admin.database.dropzone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl py-8 transition-all hover:bg-white/5"
          style={{
            border: "2px dashed rgba(0, 212, 255, 0.2)",
            background: "rgba(0, 212, 255, 0.02)",
          }}
        >
          <Upload
            className="h-8 w-8"
            style={{ color: "rgba(0, 212, 255, 0.3)" }}
          />
          <div className="text-center">
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(150, 200, 255, 0.7)" }}
            >
              {importFormat.toUpperCase()} — drag file here or click to upload
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(150, 200, 255, 0.35)" }}
            >
              .{importFormat} files accepted
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={importFormat === "csv" ? ".csv" : ".json"}
            className="hidden"
            data-ocid="admin.database.upload_button"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
        </div>

        {/* Preview */}
        {importPreview && (
          <div className="space-y-3">
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(180, 220, 255, 0.8)" }}
            >
              Preview ({Math.min(importPreview.length, 3)} of{" "}
              {importPreview.length} diseases):
            </p>
            <div className="space-y-2">
              {importPreview.slice(0, 3).map((d, i) => (
                <div
                  key={`preview-${i}-${d.name}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{
                    background: "rgba(0, 212, 255, 0.05)",
                    border: "1px solid rgba(0, 212, 255, 0.1)",
                  }}
                >
                  <span className="text-sm" style={{ color: "#e8f4ff" }}>
                    {d.name || "Unnamed"}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      color: "#00d4ff",
                      borderColor: "rgba(0,212,255,0.3)",
                    }}
                  >
                    {d.category || "Unknown"}
                  </Badge>
                </div>
              ))}
            </div>

            {importProgress ? (
              <div className="space-y-2">
                <div
                  className="flex justify-between text-xs"
                  style={{ color: "rgba(150, 200, 255, 0.6)" }}
                >
                  <span>Importing...</span>
                  <span>
                    {importProgress.current}/{importProgress.total} diseases
                  </span>
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ background: "rgba(0, 212, 255, 0.1)" }}
                >
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(importProgress.current / importProgress.total) * 100}%`,
                      background: "linear-gradient(90deg, #0099cc, #00d4ff)",
                    }}
                  />
                </div>
              </div>
            ) : (
              <Button
                data-ocid="admin.database.import_confirm_button"
                onClick={handleImport}
                className="w-full gap-2"
                style={{
                  background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                  color: "#000",
                  border: "none",
                }}
              >
                <Upload className="h-4 w-4" />
                Import {importPreview.length} Diseases
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ── B. ICMR Auto-Sync ── */}
      <div style={cardStyle} className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cloud className="h-5 w-5 mt-0.5" style={{ color: "#00e676" }} />
            <div>
              <h3
                className="font-display font-bold"
                style={{ color: "rgba(180, 220, 255, 0.9)" }}
              >
                ICMR Data Sync
              </h3>
              <p
                className="text-xs mt-1 leading-relaxed"
                style={{ color: "rgba(150, 200, 255, 0.5)" }}
              >
                ICMR (Indian Council of Medical Research) ke officially sync
                data from published disease guidelines.
              </p>
              <p
                className="mt-2 text-xs"
                style={{ color: "rgba(150, 200, 255, 0.35)" }}
              >
                {lastSynced
                  ? `Last synced: ${lastSynced}`
                  : "Last synced: Never"}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="flex-shrink-0 text-xs"
            style={{
              borderColor: lastSynced
                ? "rgba(0,230,118,0.3)"
                : "rgba(255,184,0,0.3)",
              color: lastSynced ? "#00e676" : "#ffb800",
            }}
          >
            {lastSynced ? "✓ Synced" : "Not synced"}
          </Badge>
        </div>

        <div
          className="rounded-xl p-3 text-xs"
          style={{
            background: "rgba(0, 230, 118, 0.05)",
            border: "1px solid rgba(0, 230, 118, 0.1)",
            color: "rgba(100, 200, 150, 0.7)",
          }}
        >
          ℹ️ This feature uses ICMR publicly available research publications and
          based on guidelines. {icmrDiseaseData.length} diseases available hain
          (Communicable, Non-Communicable, Zoonotic).
        </div>

        <Button
          data-ocid="admin.database.icmr_sync_button"
          onClick={handleICMRSync}
          disabled={syncing}
          className="gap-2"
          style={{
            background: syncing
              ? "rgba(0, 230, 118, 0.2)"
              : "rgba(0, 230, 118, 0.15)",
            border: "1px solid rgba(0, 230, 118, 0.3)",
            color: "#00e676",
          }}
        >
          {syncing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Sync Now ({icmrDiseaseData.length} diseases)
            </>
          )}
        </Button>
      </div>

      {/* ── C. Export ── */}
      <div style={cardStyle} className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4" style={{ color: "#9b59ff" }} />
            <h3
              className="font-display font-bold"
              style={{ color: "rgba(180, 220, 255, 0.9)" }}
            >
              Export Disease Database
            </h3>
          </div>
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "rgba(155, 89, 255, 0.3)",
              color: "#9b59ff",
            }}
          >
            {diseases.length} diseases
          </Badge>
        </div>
        <p className="text-xs" style={{ color: "rgba(150, 200, 255, 0.5)" }}>
          Export all diseases in JSON format (backup or migration ke liye).
        </p>
        <Button
          data-ocid="admin.database.export_button"
          onClick={handleExport}
          disabled={diseases.length === 0}
          className="gap-2"
          style={{
            background: "rgba(155, 89, 255, 0.15)",
            border: "1px solid rgba(155, 89, 255, 0.3)",
            color: "#9b59ff",
          }}
        >
          <Download className="h-4 w-4" />
          Export All Diseases ({diseases.length})
        </Button>
      </div>
    </div>
  );
}

// ─── Exams Admin Tab ─────────────────────────────────────────────

interface AdminExamQuestion {
  id: string;
  type: "mcq" | "descriptive";
  text: string;
  options?: string[];
  correctIndex?: number;
  subject: string;
  marks: number;
}

type ExamRole = "mbbs" | "jr1" | "jr2" | "sr1" | "sr2" | "professor" | "hod";

const EXAM_ROLES: { value: ExamRole; label: string; color: string }[] = [
  { value: "mbbs", label: "MBBS / Intern", color: "#00d4ff" },
  { value: "jr1", label: "Junior 1 (Jr 1)", color: "#00e676" },
  { value: "jr2", label: "Junior 2 (Jr 2)", color: "#00c460" },
  { value: "sr1", label: "Senior 1 (Sr 1)", color: "#ffb800" },
  { value: "sr2", label: "Senior 2 (Sr 2)", color: "#ff9500" },
  { value: "professor", label: "Professor", color: "#9b59ff" },
  { value: "hod", label: "HOD", color: "#ff3355" },
];

interface ExamResultRecord {
  applicationId: string;
  role: string;
  mcqScore: number;
  mcqTotal: number;
  descriptiveAnswers: { questionId: string; answer: string }[];
  status: "pass" | "pending" | "fail";
  submittedAt: string;
  pendingReview: boolean;
  grades?: Record<string, { score: number; feedback: string }>;
}

// Extracted component to avoid hooks-in-loop violation
function DescriptiveAnswerGradeRow({
  da,
  daIdx,
  subIdx,
  existingGrade,
  onGrade,
}: {
  da: { questionId: string; answer: string };
  daIdx: number;
  subIdx: number;
  existingGrade?: { score: number; feedback: string };
  onGrade: (questionId: string, score: number, feedback: string) => void;
}) {
  const fieldStyle: React.CSSProperties = {
    background: "rgba(0, 15, 35, 0.7)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    color: "#e8f4ff",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
  };
  const [localScore, setLocalScore] = useState(existingGrade?.score ?? 0);
  const [localFeedback, setLocalFeedback] = useState(
    existingGrade?.feedback ?? "",
  );

  return (
    <div
      className="rounded-lg p-3 space-y-2"
      style={{
        background: "rgba(155, 89, 255, 0.04)",
        border: "1px solid rgba(155,89,255,0.1)",
      }}
    >
      <p
        className="text-xs font-semibold"
        style={{ color: "rgba(155,89,255,0.7)" }}
      >
        Q{daIdx + 1}: {da.questionId}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(180,210,255,0.6)" }}
      >
        {da.answer || (
          <span style={{ color: "rgba(150,200,255,0.3)" }}>
            No answer provided
          </span>
        )}
      </p>
      {!existingGrade ? (
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            type="number"
            value={localScore}
            onChange={(e) => setLocalScore(Number(e.target.value))}
            placeholder="Score (0-10)"
            min={0}
            max={10}
            className="h-8 w-24 border-0 font-mono"
            style={{ ...fieldStyle, fontSize: "12px" }}
            data-ocid={`admin.exams.grade_score_input.${subIdx + 1}`}
          />
          <Input
            value={localFeedback}
            onChange={(e) => setLocalFeedback(e.target.value)}
            placeholder="Feedback..."
            className="h-8 flex-1 border-0"
            style={{ ...fieldStyle, fontSize: "12px" }}
            data-ocid={`admin.exams.grade_feedback_input.${subIdx + 1}`}
          />
          <Button
            size="sm"
            data-ocid={`admin.exams.grade_save_button.${subIdx + 1}`}
            onClick={() => onGrade(da.questionId, localScore, localFeedback)}
            className="h-8 text-xs rounded-lg border-0"
            style={{
              background: "rgba(0,230,118,0.15)",
              color: "#00e676",
              border: "1px solid rgba(0,230,118,0.2)",
            }}
          >
            <Check className="h-3 w-3 mr-1" />
            Grade & Save
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Badge
            className="text-xs border-0"
            style={{ background: "rgba(0,230,118,0.1)", color: "#00e676" }}
          >
            Score: {existingGrade.score}/10
          </Badge>
          {existingGrade.feedback && (
            <span
              className="text-xs"
              style={{ color: "rgba(150,200,255,0.5)" }}
            >
              {existingGrade.feedback}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ExamsAdminTab() {
  const [activeRole, setActiveRole] = useState<ExamRole>("mbbs");
  const [questions, setQuestions] = useState<
    Record<ExamRole, AdminExamQuestion[]>
  >(() => {
    try {
      return JSON.parse(
        localStorage.getItem("medsim_exam_questions") || "{}",
      ) as Record<ExamRole, AdminExamQuestion[]>;
    } catch {
      return {} as Record<ExamRole, AdminExamQuestion[]>;
    }
  });
  const [submissions, setSubmissions] = useState<
    Record<string, ExamResultRecord>
  >(() => {
    try {
      return JSON.parse(
        localStorage.getItem("medsim_exam_results") || "{}",
      ) as Record<string, ExamResultRecord>;
    } catch {
      return {};
    }
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newQ, setNewQ] = useState<Partial<AdminExamQuestion>>({
    type: "mcq",
    text: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    subject: "Medicine",
    marks: 2,
  });

  const fieldStyle: React.CSSProperties = {
    background: "rgba(0, 15, 35, 0.7)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    color: "#e8f4ff",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
  };

  const saveQuestions = (updated: Record<ExamRole, AdminExamQuestion[]>) => {
    setQuestions(updated);
    localStorage.setItem("medsim_exam_questions", JSON.stringify(updated));
  };

  const handleAddQuestion = () => {
    if (!newQ.text?.trim()) {
      toast.error("Question text is required");
      return;
    }
    if (newQ.type === "mcq" && newQ.options?.some((o) => !o.trim())) {
      toast.error("Please fill all 4 options");
      return;
    }
    const q: AdminExamQuestion = {
      id: `admin_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type: newQ.type || "mcq",
      text: newQ.text || "",
      options: newQ.type === "mcq" ? newQ.options : undefined,
      correctIndex: newQ.type === "mcq" ? (newQ.correctIndex ?? 0) : undefined,
      subject: newQ.subject || "Medicine",
      marks: newQ.marks || 2,
    };
    const current = questions[activeRole] || [];
    saveQuestions({ ...questions, [activeRole]: [...current, q] });
    setNewQ({
      type: "mcq",
      text: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      subject: "Medicine",
      marks: 2,
    });
    setShowAddForm(false);
    toast.success("Question added!");
  };

  const handleDeleteQuestion = (qId: string) => {
    const current = questions[activeRole] || [];
    saveQuestions({
      ...questions,
      [activeRole]: current.filter((q) => q.id !== qId),
    });
    toast.success("Question deleted");
  };

  const handleGradeDescriptive = (
    appId: string,
    questionId: string,
    score: number,
    feedback: string,
  ) => {
    const updated = { ...submissions };
    if (!updated[appId]) return;
    if (!updated[appId].grades) updated[appId].grades = {};
    updated[appId].grades![questionId] = { score, feedback };

    // Check if all descriptive answers graded
    const descAnswers = updated[appId].descriptiveAnswers || [];
    const allGraded = descAnswers.every(
      (a) => updated[appId].grades?.[a.questionId],
    );
    if (allGraded && descAnswers.length > 0) {
      const totalDescScore = Object.values(updated[appId].grades!).reduce(
        (s, g) => s + g.score,
        0,
      );
      const maxDescScore = descAnswers.length * 10;
      const descPct = (totalDescScore / Math.max(1, maxDescScore)) * 100;
      const mcqPct =
        updated[appId].mcqTotal > 0
          ? (updated[appId].mcqScore / updated[appId].mcqTotal) * 100
          : 100;
      updated[appId].status = mcqPct >= 70 && descPct >= 60 ? "pass" : "fail";
      updated[appId].pendingReview = false;
    }
    setSubmissions(updated);
    localStorage.setItem("medsim_exam_results", JSON.stringify(updated));
    toast.success("Grade saved!");
  };

  const handleMarkPassFail = (appId: string, newStatus: "pass" | "fail") => {
    const updated = { ...submissions };
    if (!updated[appId]) return;
    updated[appId].status = newStatus;
    updated[appId].pendingReview = false;
    setSubmissions(updated);
    localStorage.setItem("medsim_exam_results", JSON.stringify(updated));

    // Update application status
    const apps: Array<{ id: string; status: string }> = JSON.parse(
      localStorage.getItem("medsim_applications") || "[]",
    );
    const updatedApps = apps.map((a) =>
      a.id === appId ? { ...a, status: newStatus } : a,
    );
    localStorage.setItem("medsim_applications", JSON.stringify(updatedApps));
    toast.success(`Submission marked as ${newStatus.toUpperCase()}`);
  };

  const currentRoleQuestions = questions[activeRole] || [];
  const roleAliasMap: Record<string, string[]> = {
    mbbs: ["mbbs", "intern"],
    jr1: ["jr1", "junior"],
    jr2: ["jr2"],
    sr1: ["sr1", "senior"],
    sr2: ["sr2"],
    professor: ["professor"],
    hod: ["hod"],
  };
  const currentSubmissions = Object.values(submissions).filter((s) =>
    (roleAliasMap[activeRole] || [activeRole]).includes(s.role),
  );
  const pendingReviewSubmissions = currentSubmissions.filter(
    (s) => s.pendingReview,
  );

  const activeRoleConfig = EXAM_ROLES.find((r) => r.value === activeRole)!;

  return (
    <div className="space-y-6">
      {/* Role tabs */}
      <div className="flex flex-wrap gap-2">
        {EXAM_ROLES.map((r) => (
          <button
            type="button"
            key={r.value}
            data-ocid={`admin.exams.${r.value}_tab`}
            onClick={() => setActiveRole(r.value)}
            className="rounded-xl px-4 py-2 text-sm font-semibold transition-all"
            style={
              activeRole === r.value
                ? {
                    background: `${r.color}20`,
                    border: `1px solid ${r.color}40`,
                    color: r.color,
                  }
                : {
                    background: "rgba(0,10,25,0.4)",
                    border: "1px solid rgba(0,212,255,0.1)",
                    color: "rgba(150,200,255,0.5)",
                  }
            }
          >
            {r.label}
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              ({(questions[r.value] || []).length} Qs)
            </span>
          </button>
        ))}
      </div>

      {/* Questions section */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{
          background: "rgba(5, 15, 35, 0.9)",
          border: `1px solid ${activeRoleConfig.color}20`,
        }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="font-display font-bold"
            style={{ color: "rgba(180, 220, 255, 0.9)" }}
          >
            {activeRoleConfig.label} — Questions ({currentRoleQuestions.length})
          </h3>
          <Button
            size="sm"
            data-ocid="admin.exams.add_question_button"
            onClick={() => setShowAddForm((v) => !v)}
            className="gap-2"
            style={{
              background: `${activeRoleConfig.color}18`,
              border: `1px solid ${activeRoleConfig.color}30`,
              color: activeRoleConfig.color,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </div>

        {/* Add question form */}
        {showAddForm && (
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "rgba(0, 10, 30, 0.6)",
              border: "1px solid rgba(0, 212, 255, 0.12)",
            }}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Select
                  value={newQ.type}
                  onValueChange={(v) =>
                    setNewQ((p) => ({ ...p, type: v as "mcq" | "descriptive" }))
                  }
                >
                  <SelectTrigger
                    className="h-9 border-0"
                    style={fieldStyle}
                    data-ocid="admin.exams.question_type_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "rgba(5,15,35,0.98)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#e8f4ff",
                    }}
                  >
                    <SelectItem value="mcq">MCQ</SelectItem>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Subject</Label>
                <Input
                  value={newQ.subject || ""}
                  onChange={(e) =>
                    setNewQ((p) => ({ ...p, subject: e.target.value }))
                  }
                  placeholder="Medicine, Surgery..."
                  style={fieldStyle}
                  className="h-9 border-0"
                  data-ocid="admin.exams.question_subject_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Marks</Label>
                <Input
                  type="number"
                  value={newQ.marks || 2}
                  onChange={(e) =>
                    setNewQ((p) => ({ ...p, marks: Number(e.target.value) }))
                  }
                  style={fieldStyle}
                  className="h-9 border-0 font-mono"
                  data-ocid="admin.exams.question_marks_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Question Text *
              </Label>
              <Textarea
                value={newQ.text || ""}
                onChange={(e) =>
                  setNewQ((p) => ({ ...p, text: e.target.value }))
                }
                placeholder="Question likhein..."
                rows={3}
                style={{ ...fieldStyle, resize: "none" }}
                className="border-0"
                data-ocid="admin.exams.question_text_textarea"
              />
            </div>
            {newQ.type === "mcq" && (
              <div className="grid gap-2 sm:grid-cols-2">
                {(newQ.options || ["", "", "", ""]).map((opt, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: options are positional by design
                  <div key={`opt-${i}`} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Option {String.fromCharCode(65 + i)}{" "}
                      {newQ.correctIndex === i && (
                        <span style={{ color: "#00e676" }}>(Correct)</span>
                      )}
                    </Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setNewQ((p) => ({ ...p, correctIndex: i }))
                        }
                        className="h-9 w-9 flex-shrink-0 rounded-lg text-xs font-bold transition-all"
                        style={
                          newQ.correctIndex === i
                            ? {
                                background: "rgba(0,230,118,0.2)",
                                border: "1px solid rgba(0,230,118,0.4)",
                                color: "#00e676",
                              }
                            : {
                                background: "rgba(0,10,25,0.4)",
                                border: "1px solid rgba(0,212,255,0.1)",
                                color: "rgba(150,200,255,0.4)",
                              }
                        }
                        aria-label={`Mark as correct answer ${String.fromCharCode(65 + i)}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <Input
                        value={opt}
                        onChange={(e) => {
                          const opts = [...(newQ.options || ["", "", "", ""])];
                          opts[i] = e.target.value;
                          setNewQ((p) => ({ ...p, options: opts }));
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        style={fieldStyle}
                        className="h-9 flex-1 border-0"
                        data-ocid={`admin.exams.option_input.${i + 1}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                data-ocid="admin.exams.add_question_cancel_button"
                onClick={() => setShowAddForm(false)}
                style={{ color: "rgba(150,200,255,0.5)" }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                data-ocid="admin.exams.save_question_button"
                onClick={handleAddQuestion}
                style={{
                  background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                  color: "#000",
                  border: "none",
                }}
              >
                Save Question
              </Button>
            </div>
          </div>
        )}

        {/* Questions list */}
        {currentRoleQuestions.length === 0 ? (
          <div
            className="py-10 text-center rounded-xl"
            data-ocid="admin.exams.questions_empty_state"
            style={{ border: "1px dashed rgba(0,212,255,0.12)" }}
          >
            <FileQuestion
              className="mx-auto h-10 w-10 mb-2"
              style={{ color: "rgba(0,212,255,0.2)" }}
            />
            <p className="text-sm" style={{ color: "rgba(150,200,255,0.4)" }}>
              No questions found. Add some or seed data will be used.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {currentRoleQuestions.map((q, idx) => (
              <div
                key={q.id}
                data-ocid={`admin.exams.question.item.${idx + 1}`}
                className="flex items-start justify-between gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(0, 10, 30, 0.5)",
                  border: "1px solid rgba(0, 212, 255, 0.08)",
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span
                    className="flex-shrink-0 font-mono text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        q.type === "mcq"
                          ? "rgba(0,212,255,0.1)"
                          : "rgba(155,89,255,0.1)",
                      color: q.type === "mcq" ? "#00d4ff" : "#9b59ff",
                      border: `1px solid ${q.type === "mcq" ? "rgba(0,212,255,0.2)" : "rgba(155,89,255,0.2)"}`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className="text-[9px] border-0 px-1.5"
                        style={{
                          background:
                            q.type === "mcq"
                              ? "rgba(0,212,255,0.08)"
                              : "rgba(155,89,255,0.08)",
                          color: q.type === "mcq" ? "#00d4ff" : "#9b59ff",
                        }}
                      >
                        {q.type.toUpperCase()}
                      </Badge>
                      <span
                        className="text-[10px]"
                        style={{ color: "rgba(150,200,255,0.4)" }}
                      >
                        {q.subject}
                      </span>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "#ffb800" }}
                      >
                        {q.marks}m
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: "rgba(180,210,255,0.7)" }}
                    >
                      {q.text}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid={`admin.exams.delete_question_button.${idx + 1}`}
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                  style={{ color: "rgba(255,51,85,0.4)" }}
                  aria-label="Delete question"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submissions section */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{
          background: "rgba(5, 15, 35, 0.9)",
          border: "1px solid rgba(255, 184, 0, 0.15)",
        }}
      >
        <h3
          className="font-display font-bold"
          style={{ color: "rgba(180, 220, 255, 0.9)" }}
        >
          Exam Submissions — {activeRoleConfig.label} (
          {currentSubmissions.length})
          {pendingReviewSubmissions.length > 0 && (
            <Badge
              className="ml-2 text-xs"
              style={{ background: "rgba(255,184,0,0.15)", color: "#ffb800" }}
            >
              {pendingReviewSubmissions.length} pending review
            </Badge>
          )}
        </h3>

        {currentSubmissions.length === 0 ? (
          <div
            className="py-8 text-center rounded-xl"
            data-ocid="admin.exams.submissions_empty_state"
            style={{ border: "1px dashed rgba(255,184,0,0.12)" }}
          >
            <p className="text-sm" style={{ color: "rgba(150,200,255,0.4)" }}>
              No submissions yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentSubmissions.map((sub, idx) => {
              const mcqPct =
                sub.mcqTotal > 0
                  ? Math.round((sub.mcqScore / sub.mcqTotal) * 100)
                  : 100;
              return (
                <div
                  key={sub.applicationId}
                  data-ocid={`admin.exams.submission.item.${idx + 1}`}
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    background: "rgba(0, 10, 30, 0.5)",
                    border: `1px solid ${sub.status === "pass" ? "rgba(0,230,118,0.15)" : sub.status === "fail" ? "rgba(255,51,85,0.15)" : "rgba(255,184,0,0.15)"}`,
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p
                        className="font-mono text-xs font-semibold"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        App ID: {sub.applicationId.slice(-12)}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(100,150,200,0.5)" }}
                      >
                        Submitted:{" "}
                        {new Date(sub.submittedAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {sub.mcqTotal > 0 && (
                        <Badge
                          className="text-xs border-0"
                          style={{
                            background:
                              mcqPct >= 70
                                ? "rgba(0,230,118,0.1)"
                                : "rgba(255,51,85,0.1)",
                            color: mcqPct >= 70 ? "#00e676" : "#ff3355",
                          }}
                        >
                          MCQ: {sub.mcqScore}/{sub.mcqTotal} ({mcqPct}%)
                        </Badge>
                      )}
                      <Badge
                        className="text-xs border-0"
                        style={{
                          background:
                            sub.status === "pass"
                              ? "rgba(0,230,118,0.1)"
                              : sub.status === "fail"
                                ? "rgba(255,51,85,0.1)"
                                : "rgba(255,184,0,0.1)",
                          color:
                            sub.status === "pass"
                              ? "#00e676"
                              : sub.status === "fail"
                                ? "#ff3355"
                                : "#ffb800",
                        }}
                      >
                        {sub.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Descriptive answers */}
                  {sub.descriptiveAnswers &&
                    sub.descriptiveAnswers.length > 0 && (
                      <div className="space-y-3">
                        <p
                          className="font-mono text-xs font-semibold"
                          style={{ color: "rgba(155,89,255,0.6)" }}
                        >
                          Descriptive Answers ({sub.descriptiveAnswers.length})
                        </p>
                        {sub.descriptiveAnswers.map((da, daIdx) => (
                          <DescriptiveAnswerGradeRow
                            key={da.questionId}
                            da={da}
                            daIdx={daIdx}
                            subIdx={idx}
                            existingGrade={sub.grades?.[da.questionId]}
                            onGrade={(questionId, score, feedback) =>
                              handleGradeDescriptive(
                                sub.applicationId,
                                questionId,
                                score,
                                feedback,
                              )
                            }
                          />
                        ))}
                      </div>
                    )}

                  {/* Mark pass/fail */}
                  <div
                    className="flex items-center gap-2 pt-2"
                    style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
                  >
                    <span
                      className="text-xs mr-2"
                      style={{ color: "rgba(150,200,255,0.4)" }}
                    >
                      Override:
                    </span>
                    <Button
                      size="sm"
                      data-ocid={`admin.exams.mark_pass_button.${idx + 1}`}
                      onClick={() =>
                        handleMarkPassFail(sub.applicationId, "pass")
                      }
                      className="h-7 text-xs rounded-lg border-0"
                      style={
                        sub.status === "pass"
                          ? {
                              background: "rgba(0,230,118,0.2)",
                              border: "1px solid rgba(0,230,118,0.3)",
                              color: "#00e676",
                            }
                          : {
                              background: "rgba(0,10,25,0.4)",
                              border: "1px solid rgba(0,212,255,0.1)",
                              color: "rgba(0,230,118,0.4)",
                            }
                      }
                    >
                      Mark Pass
                    </Button>
                    <Button
                      size="sm"
                      data-ocid={`admin.exams.mark_fail_button.${idx + 1}`}
                      onClick={() =>
                        handleMarkPassFail(sub.applicationId, "fail")
                      }
                      className="h-7 text-xs rounded-lg border-0"
                      style={
                        sub.status === "fail"
                          ? {
                              background: "rgba(255,51,85,0.2)",
                              border: "1px solid rgba(255,51,85,0.3)",
                              color: "#ff3355",
                            }
                          : {
                              background: "rgba(0,10,25,0.4)",
                              border: "1px solid rgba(0,212,255,0.1)",
                              color: "rgba(255,51,85,0.4)",
                            }
                      }
                    >
                      Mark Fail
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Applications Tab ─────────────────────────────────────────────

interface AdminApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  hospital: string;
  status: string;
  submittedAt: string;
  formData?: {
    name?: string;
    role?: string;
    mobile?: string;
    college?: string;
  };
}

interface AdminNotification {
  id: number;
  type: string;
  appId: string;
  jobTitle: string;
  hospital: string;
  studentName: string;
  submittedAt: string;
  read: boolean;
}

function ApplicationsTab() {
  const [applications, setApplications] = useState<AdminApplication[]>(() =>
    JSON.parse(localStorage.getItem("medsim_applications") || "[]"),
  );
  const [notifications, setNotifications] = useState<AdminNotification[]>(() =>
    JSON.parse(localStorage.getItem("medsim_admin_notifications") || "[]"),
  );
  const [examResults] = useState<
    Record<string, { mcqScore: number; mcqTotal: number; status: string }>
  >(() => JSON.parse(localStorage.getItem("medsim_exam_results") || "{}"));

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark all notifications as read when tab mounts (run once on mount)
  useEffect(() => {
    const stored: AdminNotification[] = JSON.parse(
      localStorage.getItem("medsim_admin_notifications") || "[]",
    );
    const hasUnread = stored.some((n) => !n.read);
    if (hasUnread) {
      const updated = stored.map((n) => ({ ...n, read: true as const }));
      setNotifications(updated);
      localStorage.setItem(
        "medsim_admin_notifications",
        JSON.stringify(updated),
      );
    }
  }, []);

  const handleApproveExam = (appId: string) => {
    // Update application status
    const updatedApps = applications.map((a) =>
      a.id === appId ? { ...a, status: "exam_unlocked" } : a,
    );
    setApplications(updatedApps);
    localStorage.setItem("medsim_applications", JSON.stringify(updatedApps));

    // Mark related notifications as read
    const updatedNotifs = notifications.map((n) =>
      n.appId === appId ? { ...n, read: true } : n,
    );
    setNotifications(updatedNotifs);
    localStorage.setItem(
      "medsim_admin_notifications",
      JSON.stringify(updatedNotifs),
    );

    toast.success("Exam unlocked. Student will be notified.");
  };

  const handleRejectApplication = (appId: string) => {
    const updatedApps = applications.map((a) =>
      a.id === appId ? { ...a, status: "rejected" } : a,
    );
    setApplications(updatedApps);
    localStorage.setItem("medsim_applications", JSON.stringify(updatedApps));
    toast.success("Application reject kar di.");
  };

  const STATUS_COLORS: Record<
    string,
    { color: string; bg: string; border: string; label: string }
  > = {
    pending_admin_approval: {
      color: "#ffb800",
      bg: "rgba(255,184,0,0.08)",
      border: "rgba(255,184,0,0.2)",
      label: "Awaiting Approval",
    },
    exam_unlocked: {
      color: "#00e676",
      bg: "rgba(0,230,118,0.08)",
      border: "rgba(0,230,118,0.2)",
      label: "Exam Unlocked",
    },
    pending_exam: {
      color: "#ffb800",
      bg: "rgba(255,184,0,0.08)",
      border: "rgba(255,184,0,0.2)",
      label: "Exam Pending",
    },
    under_review: {
      color: "#00d4ff",
      bg: "rgba(0,212,255,0.08)",
      border: "rgba(0,212,255,0.2)",
      label: "Under Review",
    },
    pass: {
      color: "#00e676",
      bg: "rgba(0,230,118,0.08)",
      border: "rgba(0,230,118,0.2)",
      label: "Pass ✓",
    },
    fail: {
      color: "#ff3355",
      bg: "rgba(255,51,85,0.08)",
      border: "rgba(255,51,85,0.2)",
      label: "Fail",
    },
    rejected: {
      color: "#ff3355",
      bg: "rgba(255,51,85,0.08)",
      border: "rgba(255,51,85,0.2)",
      label: "Rejected",
    },
    exam_submitted: {
      color: "#9b59ff",
      bg: "rgba(155,89,255,0.08)",
      border: "rgba(155,89,255,0.2)",
      label: "Exam Submitted",
    },
  };

  const sortedApps = [...applications].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  const pendingApps = sortedApps.filter(
    (a) => a.status === "pending_admin_approval",
  );
  const otherApps = sortedApps.filter(
    (a) => a.status !== "pending_admin_approval",
  );

  const cardStyle: React.CSSProperties = {
    background: "rgba(5, 15, 35, 0.9)",
    border: "1px solid rgba(0, 212, 255, 0.12)",
    borderRadius: "1rem",
  };

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Total Applications",
            value: applications.length,
            color: "#00d4ff",
            icon: ClipboardList,
          },
          {
            label: "Pending Approval",
            value: pendingApps.length,
            color: "#ffb800",
            icon: Bell,
          },
          {
            label: "Exam Unlocked",
            value: applications.filter((a) => a.status === "exam_unlocked")
              .length,
            color: "#00e676",
            icon: FileQuestion,
          },
          {
            label: "Pass",
            value: applications.filter((a) => a.status === "pass").length,
            color: "#9b59ff",
            icon: CheckCircle2,
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
              <p className="text-xs" style={{ color: "rgba(150,200,255,0.4)" }}>
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Unread notifications banner */}
      {unreadCount > 0 && (
        <div
          className="rounded-xl p-3 flex items-center gap-3"
          style={{
            background: "rgba(255, 184, 0, 0.08)",
            border: "1px solid rgba(255, 184, 0, 0.25)",
          }}
        >
          <Bell
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "#ffb800" }}
          />
          <p className="text-sm font-semibold" style={{ color: "#ffb800" }}>
            {unreadCount} nayi application notification
            {unreadCount !== 1 ? "s" : ""} hain
          </p>
        </div>
      )}

      {/* Pending Approval section */}
      {pendingApps.length > 0 && (
        <div>
          <h3
            className="font-display font-bold mb-3 flex items-center gap-2"
            style={{ color: "#ffb800" }}
          >
            <Bell className="h-4 w-4" />
            Pending Approval ({pendingApps.length})
          </h3>
          <div className="space-y-3">
            {pendingApps.map((app, idx) => {
              const result = examResults[app.id];
              return (
                <motion.div
                  key={app.id}
                  data-ocid={`admin.applications.pending.item.${idx + 1}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(5, 15, 35, 0.95)",
                    border: "1.5px solid rgba(255, 184, 0, 0.3)",
                    boxShadow: "0 0 20px rgba(255, 184, 0, 0.06)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2
                          className="h-4 w-4 flex-shrink-0"
                          style={{ color: "#00d4ff" }}
                        />
                        <h4
                          className="font-display font-bold text-sm"
                          style={{ color: "#e8f4ff" }}
                        >
                          {app.hospital}
                        </h4>
                      </div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "rgba(100, 180, 255, 0.8)" }}
                      >
                        {app.jobTitle}
                      </p>
                      {app.formData?.name && (
                        <p
                          className="text-xs mb-1"
                          style={{ color: "rgba(150, 200, 255, 0.6)" }}
                        >
                          Student:{" "}
                          <span
                            className="font-semibold"
                            style={{ color: "#e8f4ff" }}
                          >
                            {app.formData.name}
                          </span>
                          {app.formData.role && ` · ${app.formData.role}`}
                        </p>
                      )}
                      <div
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "rgba(150, 200, 255, 0.4)" }}
                      >
                        <CalendarDays className="h-3 w-3" />
                        <span>
                          Applied:{" "}
                          {new Date(app.submittedAt).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {/* Approve Exam button */}
                      <Button
                        size="sm"
                        data-ocid={`admin.applications.approve_button.${idx + 1}`}
                        onClick={() => handleApproveExam(app.id)}
                        className="gap-2 rounded-xl border-0 h-9 text-xs font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #006633, #00e676)",
                          color: "#000",
                          boxShadow: "0 4px 12px rgba(0, 230, 118, 0.3)",
                        }}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve Exam
                      </Button>
                      {/* Reject button */}
                      <Button
                        size="sm"
                        data-ocid={`admin.applications.reject_button.${idx + 1}`}
                        onClick={() => handleRejectApplication(app.id)}
                        className="gap-2 rounded-xl border-0 h-9 text-xs font-semibold"
                        style={{
                          background: "rgba(255, 51, 85, 0.12)",
                          border: "1px solid rgba(255,51,85,0.25)",
                          color: "#ff3355",
                        }}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </div>

                  {/* Exam result if available */}
                  {result && (
                    <div
                      className="mt-3 rounded-xl p-3 flex items-center gap-3"
                      style={{
                        background:
                          result.status === "pass"
                            ? "rgba(0,230,118,0.06)"
                            : "rgba(255,51,85,0.06)",
                        border: `1px solid ${result.status === "pass" ? "rgba(0,230,118,0.15)" : "rgba(255,51,85,0.15)"}`,
                      }}
                    >
                      <p
                        className="text-xs font-semibold"
                        style={{
                          color:
                            result.status === "pass" ? "#00e676" : "#ff3355",
                        }}
                      >
                        Exam: {result.mcqScore}/{result.mcqTotal} MCQ ·{" "}
                        {result.status.toUpperCase()}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* All other applications */}
      {otherApps.length > 0 && (
        <div>
          <h3
            className="font-display font-bold mb-3"
            style={{ color: "rgba(180, 220, 255, 0.8)" }}
          >
            All Applications ({otherApps.length})
          </h3>
          <div className="space-y-3">
            {otherApps.map((app, idx) => {
              const statusCfg =
                STATUS_COLORS[app.status] || STATUS_COLORS.pending_exam;
              const result = examResults[app.id];

              return (
                <div
                  key={app.id}
                  data-ocid={`admin.applications.item.${idx + 1}`}
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(5, 15, 35, 0.95)",
                    border: `1px solid ${statusCfg.border}`,
                  }}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: statusCfg.bg,
                            color: statusCfg.color,
                            border: `1px solid ${statusCfg.border}`,
                          }}
                        >
                          {statusCfg.label}
                        </span>
                      </div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#e8f4ff" }}
                      >
                        {app.hospital} — {app.jobTitle}
                      </p>
                      {app.formData?.name && (
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "rgba(150,200,255,0.5)" }}
                        >
                          {app.formData.name}
                          {app.formData.role && ` · ${app.formData.role}`}
                        </p>
                      )}
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(100, 150, 200, 0.4)" }}
                      >
                        {new Date(app.submittedAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {result && (
                        <span
                          className="text-xs font-mono px-2 py-1 rounded-lg"
                          style={{
                            background:
                              result.status === "pass"
                                ? "rgba(0,230,118,0.08)"
                                : "rgba(255,51,85,0.08)",
                            color:
                              result.status === "pass" ? "#00e676" : "#ff3355",
                          }}
                        >
                          MCQ: {result.mcqScore}/{result.mcqTotal}
                        </span>
                      )}
                      {app.status === "exam_unlocked" && (
                        <Button
                          size="sm"
                          data-ocid={`admin.applications.revoke_button.${idx + 1}`}
                          variant="ghost"
                          onClick={() => handleRejectApplication(app.id)}
                          className="h-7 text-xs rounded-lg"
                          style={{
                            color: "rgba(255,51,85,0.6)",
                            border: "1px solid rgba(255,51,85,0.1)",
                          }}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {applications.length === 0 && (
        <div
          className="rounded-2xl py-16 text-center"
          data-ocid="admin.applications.empty_state"
          style={{ border: "2px dashed rgba(0, 212, 255, 0.1)" }}
        >
          <ClipboardList
            className="mx-auto mb-3 h-10 w-10"
            style={{ color: "rgba(0,212,255,0.2)" }}
          />
          <p
            className="font-semibold"
            style={{ color: "rgba(150, 200, 255, 0.5)" }}
          >
            No applications yet
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(100, 150, 200, 0.3)" }}
          >
            Students career page se apply karenge, woh yahaan dikhenge
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Career Jobs Tab ─────────────────────────────────────────────

const DEFAULT_CAREER_JOB_IDS = [
  "phc-intern",
  "chc-medical-officer-jr",
  "ngo-asha",
  "district-hospital-mo",
  "nhm-block-mo",
  "apollo-jr-resident",
  "fortis-jr-resident",
  "care-hospital-jr",
  "aiims-sr-resident",
  "pgimer-sr-resident",
  "safdarjung-sr-resident",
  "aiims-faculty-asst-prof",
  "pgi-faculty",
  "mamc-faculty",
  "aiims-professor",
  "tata-memorial-professor",
  "aiims-hod",
  "jipmer-hod",
];

function CareerJobsAdminTab() {
  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("medsim_deleted_jobs") || "[]");
    } catch {
      return [];
    }
  });

  const activeIds = DEFAULT_CAREER_JOB_IDS.filter(
    (id) => !deletedIds.includes(id),
  );
  const deletedList = DEFAULT_CAREER_JOB_IDS.filter((id) =>
    deletedIds.includes(id),
  );

  const handleDelete = (id: string) => {
    const updated = [...deletedIds, id];
    setDeletedIds(updated);
    localStorage.setItem("medsim_deleted_jobs", JSON.stringify(updated));
    toast.success("Job listing hidden from students");
  };

  const handleRestore = (id: string) => {
    const updated = deletedIds.filter((d) => d !== id);
    setDeletedIds(updated);
    localStorage.setItem("medsim_deleted_jobs", JSON.stringify(updated));
    toast.success("Job listing restored");
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(5, 15, 35, 0.9)",
    border: "1px solid rgba(0, 212, 255, 0.12)",
    borderRadius: "1rem",
    padding: "1rem",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Career Job Listings
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeIds.length} active / {deletedList.length} hidden
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          Active Listings
        </h3>
        {activeIds.map((id) => (
          <div
            key={id}
            style={cardStyle}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-cyan-400 truncate">{id}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Visible to students
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              data-ocid={"admin.career.delete_button"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {activeIds.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            All job listings have been hidden. Restore them below.
          </div>
        )}
      </div>

      {deletedList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
            Hidden Listings (Restore)
          </h3>
          {deletedList.map((id) => (
            <div
              key={id}
              style={{ ...cardStyle, border: "1px solid rgba(255,184,0,0.2)" }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-amber-400 truncate">
                  {id}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hidden from students
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRestore(id)}
                className="text-success hover:text-success hover:bg-success/10 flex-shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Certificates Tab ─────────────────────────────────────────────────────────
function CertificatesAdminTab() {
  const leaderboardRaw = localStorage.getItem("medsim_leaderboard") || "[]";
  let allStudents: Array<{
    id: string;
    name: string;
    points: number;
    role: string;
    isDemo?: boolean;
  }> = [];
  try {
    allStudents = JSON.parse(leaderboardRaw);
  } catch {
    /* ignore */
  }

  // Include current user if has points
  const mobile = localStorage.getItem("medsim_login_mobile") || "";
  const savedName = localStorage.getItem("medsim_saved_name") || "";
  const pts = Number(localStorage.getItem("medsim_leaderboard_points") || "0");
  const currentUserId = `user_${mobile}`;
  const currentUserInList = allStudents.some((s) => s.id === currentUserId);
  if (!currentUserInList && pts > 0 && savedName) {
    allStudents.push({
      id: currentUserId,
      name: savedName,
      points: pts,
      role: "Student (MBBS)",
    });
  }

  const eligible = allStudents
    .filter((s) => s.points > 500)
    .sort((a, b) => b.points - a.points);

  function getTitleForPoints(points: number) {
    if (points > 5000) return "Senior Consultant";
    if (points > 3000) return "Consultant";
    if (points > 1500) return "Senior Resident";
    if (points > 500) return "Junior Resident";
    return "Medical Intern";
  }

  function generateCertificate(student: (typeof allStudents)[0]) {
    const W = 1122;
    const H = 794;
    const SCALE = 2; // 2x resolution for crisp PDF-quality output
    const canvas = document.createElement("canvas");
    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(SCALE, SCALE);

    // ── Background: deep navy ─────────────────────────────────────
    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, W, H);

    // ── Subtle grid pattern ───────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = "rgba(0,229,255,0.04)";
    ctx.lineWidth = 0.5;
    const GRID = 36;
    for (let x = 0; x <= W; x += GRID) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += GRID) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    // ── Double gold border ────────────────────────────────────────
    // outer
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, W - 36, H - 36);
    // inner
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, W - 52, H - 52);

    // ── Corner ornaments (diamond shapes) ────────────────────────
    const drawOrnament = (cx: number, cy: number) => {
      const s = 10;
      ctx.save();
      ctx.fillStyle = "#c9a227";
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-s, -s, s * 2, s * 2);
      ctx.restore();
    };
    drawOrnament(22, 22);
    drawOrnament(W - 22, 22);
    drawOrnament(22, H - 22);
    drawOrnament(W - 22, H - 22);

    // ── MS Monogram circle (left side) ───────────────────────────
    const circleX = 100;
    const circleY = H / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(circleX, circleY, 42, 0, Math.PI * 2);
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 2;
    ctx.stroke();
    const grad = ctx.createRadialGradient(
      circleX,
      circleY,
      0,
      circleX,
      circleY,
      42,
    );
    grad.addColorStop(0, "rgba(0,229,255,0.15)");
    grad.addColorStop(1, "rgba(0,229,255,0)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 28px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MS", circleX, circleY);
    ctx.restore();

    // ── Header: MedSim title ──────────────────────────────────────
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 36px Georgia, serif";
    ctx.fillText("MedSim", W / 2, 82);

    ctx.fillStyle = "#5a7a9a";
    ctx.font = "14px Georgia, serif";
    ctx.fillText("Advanced Medical Simulation Platform", W / 2, 105);

    // ── Top separator ─────────────────────────────────────────────
    const lineGrad = ctx.createLinearGradient(60, 0, W - 60, 0);
    lineGrad.addColorStop(0, "rgba(201,162,39,0)");
    lineGrad.addColorStop(0.3, "#c9a227");
    lineGrad.addColorStop(0.7, "#c9a227");
    lineGrad.addColorStop(1, "rgba(201,162,39,0)");
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 118);
    ctx.lineTo(W - 60, 118);
    ctx.stroke();

    // ── Certificate Title ─────────────────────────────────────────
    ctx.fillStyle = "#c9a227";
    ctx.font = "bold 28px Georgia, serif";
    ctx.fillText("Certificate of Clinical Excellence", W / 2, 168);

    // ── Body copy ─────────────────────────────────────────────────
    ctx.fillStyle = "#7a94ad";
    ctx.font = "italic 18px Georgia, serif";
    ctx.fillText("This certifies that", W / 2, 220);

    // ── Student Name ──────────────────────────────────────────────
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillText(student.name, W / 2, 278);

    // Name underline
    const nw = ctx.measureText(student.name).width;
    const nx = W / 2;
    ctx.strokeStyle = "#c9a22788";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nx - nw / 2, 288);
    ctx.lineTo(nx + nw / 2, 288);
    ctx.stroke();

    // ── Achievement sentences ─────────────────────────────────────
    ctx.fillStyle = "#8dafc8";
    ctx.font = "16px Georgia, serif";
    ctx.fillText(
      "has successfully demonstrated clinical competency in medical simulation",
      W / 2,
      330,
    );

    const scoreTitle = getTitleForPoints(student.points);
    ctx.font = "16px Georgia, serif";
    ctx.fillText(
      `with a Clinical Performance Score of ${student.points.toLocaleString()} points`,
      W / 2,
      358,
    );
    ctx.fillStyle = "#c9a227";
    ctx.font = "bold 18px Georgia, serif";
    ctx.fillText(`and has been assessed as: ${scoreTitle}`, W / 2, 390);

    // ── Middle separator ──────────────────────────────────────────
    ctx.strokeStyle = "rgba(201,162,39,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 415);
    ctx.lineTo(W - 200, 415);
    ctx.stroke();

    // ── Date ──────────────────────────────────────────────────────
    const dateStr = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillStyle = "#6b8a9c";
    ctx.font = "14px Georgia, serif";
    ctx.fillText(`Issued on: ${dateStr}`, W / 2, 450);

    // ── Verification ID ───────────────────────────────────────────
    const year = new Date().getFullYear();
    const rand6 = Math.floor(100000 + Math.random() * 900000);
    const verifyId = `MED-${year}-${rand6}`;
    ctx.fillStyle = "#00e5ff";
    ctx.font = "12px monospace";
    ctx.fillText(`Verification ID: ${verifyId}`, W / 2, 478);

    // ── Signature section ─────────────────────────────────────────
    const sigY = 600;
    const sig1X = W / 2 - 180;
    const sig2X = W / 2 + 180;

    // Signature lines
    ctx.strokeStyle = "#c9a22799";
    ctx.lineWidth = 1;
    for (const sx of [sig1X, sig2X]) {
      ctx.beginPath();
      ctx.moveTo(sx - 90, sigY);
      ctx.lineTo(sx + 90, sigY);
      ctx.stroke();
    }

    // Signature labels
    ctx.fillStyle = "#5a7a9a";
    ctx.font = "12px Georgia, serif";
    ctx.fillText("Programme Director", sig1X, sigY + 20);
    ctx.fillText("Chief Medical Officer", sig2X, sigY + 20);

    // ── Bottom separator ──────────────────────────────────────────
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, H - 80);
    ctx.lineTo(W - 60, H - 80);
    ctx.stroke();

    // ── Footer ────────────────────────────────────────────────────
    ctx.fillStyle = "#3a5a6c";
    ctx.font = "11px monospace";
    ctx.fillText(
      `Scan QR or visit medsim.app/verify/${verifyId} to verify authenticity`,
      W / 2,
      H - 52,
    );
    ctx.fillStyle = "#2a4050";
    ctx.font = "11px Georgia, serif";
    ctx.fillText(
      "MedSim India — Advanced Medical Simulation Platform",
      W / 2,
      H - 34,
    );

    // ── Download ──────────────────────────────────────────────────
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MedSim_Certificate_${student.name.replace(/\s+/g, "_")}_${new Date().getFullYear()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Certificates
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generate clinical excellence certificates for top performers (score
          &gt; 500 points)
        </p>
      </div>

      {eligible.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-border p-12 text-center"
          data-ocid="certificates.empty_state"
        >
          <p className="text-muted-foreground">
            No students with score above 500 yet.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Students must complete ER Simulations to earn points.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {eligible.map((student, idx) => (
            <div
              key={student.id}
              data-ocid={`certificates.item.${idx + 1}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card/50 px-4 py-3 gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <Award className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {student.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student.role} • {student.points.toLocaleString()} pts •{" "}
                    {getTitleForPoints(student.points)}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                data-ocid={`certificates.generate_button.${idx + 1}`}
                onClick={() => generateCertificate(student)}
                className="flex-shrink-0 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
              >
                <Award className="h-3.5 w-3.5 mr-1.5" />
                Generate
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────

// ─── Admin PIN Modal ─────────────────────────────────────────────

function AdminPINModal({ onVerified }: { onVerified: () => void }) {
  const storedPin = localStorage.getItem("medsim_admin_pin");
  const isSetup = !storedPin;
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const locked = localStorage.getItem("medsim_admin_locked") === "true";

  if (locked) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,10,0.97)" }}
      >
        <div
          className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center max-w-sm"
          style={{
            border: "1px solid rgba(255,50,50,0.3)",
            background: "rgba(20,0,0,0.9)",
          }}
        >
          <Lock className="h-14 w-14 text-red-500" />
          <h2 className="text-xl font-bold text-red-400">Admin Panel Locked</h2>
          <p className="text-sm text-muted-foreground">
            Too many incorrect PIN attempts. Contact System Administrator to
            unlock.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (isSetup) {
      if (pin.length !== 6) {
        setError("PIN must be exactly 6 digits");
        return;
      }
      if (pin !== confirmPin) {
        setError("PINs do not match");
        return;
      }
      localStorage.setItem("medsim_admin_pin", btoa(pin));
      sessionStorage.setItem("medsim_admin_pin_verified", "true");
      toast.success("Admin PIN set successfully");
      onVerified();
    } else {
      const correct = atob(storedPin!) === pin;
      if (correct) {
        sessionStorage.setItem("medsim_admin_pin_verified", "true");
        onVerified();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          localStorage.setItem("medsim_admin_locked", "true");
          setError("3 wrong attempts. Admin Panel is now locked.");
        } else {
          setError(`Incorrect PIN. ${3 - newAttempts} attempt(s) remaining.`);
        }
        setPin("");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,10,0.97)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl p-8 space-y-6"
        style={{
          background: "rgba(5,15,35,0.98)",
          border: "1px solid rgba(0,212,255,0.25)",
        }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            <Shield className="h-8 w-8" style={{ color: "#00d4ff" }} />
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: "rgba(180,220,255,0.95)" }}
          >
            {isSetup ? "Set Admin PIN" : "Enter Admin PIN"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSetup
              ? "Create a 6-digit PIN to secure the Admin Panel"
              : "Enter your 6-digit Admin PIN to continue"}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              {isSetup ? "New PIN" : "Admin PIN"}
            </Label>
            <Input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              placeholder="••••••"
              className="text-center text-lg tracking-widest"
              style={{
                background: "rgba(0,5,20,0.8)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#e8f4ff",
              }}
              data-ocid="admin.pin_input"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          {isSetup && (
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Confirm PIN
              </Label>
              <Input
                type="password"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => {
                  setConfirmPin(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="••••••"
                className="text-center text-lg tracking-widest"
                style={{
                  background: "rgba(0,5,20,0.8)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#e8f4ff",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          )}
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        </div>

        <Button
          onClick={handleSubmit}
          data-ocid="admin.pin_submit_button"
          className="w-full"
          style={{
            background: "linear-gradient(135deg, #0099cc, #00d4ff)",
            color: "#000",
            border: "none",
          }}
        >
          {isSetup ? "Set PIN & Enter" : "Verify PIN"}
        </Button>
      </motion.div>
    </div>
  );
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [pinVerified, setPinVerified] = useState(
    () => sessionStorage.getItem("medsim_admin_pin_verified") === "true",
  );
  const [unreadAppNotifCount, setUnreadAppNotifCount] = useState<number>(() => {
    try {
      const notifs: Array<{ read: boolean }> = JSON.parse(
        localStorage.getItem("medsim_admin_notifications") || "[]",
      );
      return notifs.filter((n) => !n.read).length;
    } catch {
      return 0;
    }
  });

  // Refresh badge count when switching tabs (so it clears after visiting Applications tab)
  const handleTabChange = (tab: AdminTab) => {
    const wasOnApplications = activeTab === "applications";
    setActiveTab(tab);
    if (tab === "applications") {
      // Will be cleared by ApplicationsTab useEffect; reset badge immediately
      setUnreadAppNotifCount(0);
    } else if (!wasOnApplications) {
      // Only re-read if we weren't just on applications (to avoid restoring cleared count)
      try {
        const notifs: Array<{ read: boolean }> = JSON.parse(
          localStorage.getItem("medsim_admin_notifications") || "[]",
        );
        setUnreadAppNotifCount(notifs.filter((n) => !n.read).length);
      } catch {
        /* ignore */
      }
    }
  };

  const tabContent: Record<AdminTab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    students: <StudentsTab />,
    diseases: <DiseasesTab />,
    cases: <CasesTab />,
    alerts: <AlertsTab />,
    security: <SecurityTab />,
    database: <DatabaseTab />,
    exams: <ExamsAdminTab />,
    applications: <ApplicationsTab />,
    careers: <CareerJobsAdminTab />,
    certificates: <CertificatesAdminTab />,
  };

  if (!pinVerified) {
    return <AdminPINModal onVerified={() => setPinVerified(true)} />;
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-black text-foreground">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">MedSim platform management</p>
        </div>

        {/* Tab navigation */}
        <div className="mb-6 flex overflow-x-auto gap-1 rounded-xl border border-border bg-muted/30 p-1">
          {ADMIN_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                type="button"
                key={tab.id}
                data-ocid={`admin.nav.${tab.id}_tab`}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.id === "applications" && unreadAppNotifCount > 0 && (
                  <span
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                    style={{ background: "#ffb800", color: "#000" }}
                  >
                    {unreadAppNotifCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPage;
