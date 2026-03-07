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
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  Cloud,
  CloudDownload,
  Database,
  Download,
  Edit2,
  Eye,
  FileJson,
  FileText,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
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
import { icmrDiseaseData } from "../utils/icmrSeedData";

type AdminTab =
  | "dashboard"
  | "students"
  | "diseases"
  | "cases"
  | "alerts"
  | "security"
  | "database";

const ADMIN_TABS = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: BarChart3 },
  { id: "students" as AdminTab, label: "Students", icon: Users },
  { id: "diseases" as AdminTab, label: "Diseases", icon: Database },
  { id: "cases" as AdminTab, label: "Patient Cases", icon: BookOpen },
  { id: "alerts" as AdminTab, label: "AI Alerts", icon: Bell },
  { id: "security" as AdminTab, label: "Security", icon: Shield },
  { id: "database" as AdminTab, label: "DB Import", icon: CloudDownload },
];

// ─── Dashboard Tab ────────────────────────────────────────────────

function DashboardTab() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: alerts = [] } = useAllAdminAlerts();
  const unresolved = alerts.filter((a) => a.status === "unresolved");

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["d1", "d2", "d3", "d4"].map((id) => (
          <Skeleton key={id} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Students",
            value: stats ? Number(stats.totalStudents) : 0,
            icon: Users,
            color: "text-primary bg-primary/10",
          },
          {
            label: "Active Today",
            value: stats ? Number(stats.activeToday) : 0,
            icon: CheckCircle2,
            color: "text-success bg-success/10",
          },
          {
            label: "Unresolved Alerts",
            value: unresolved.length,
            icon: Bell,
            color:
              unresolved.length > 0
                ? "text-destructive bg-destructive/10"
                : "text-muted-foreground bg-muted",
          },
          {
            label: "Total Alerts",
            value: alerts.length,
            icon: AlertTriangle,
            color: "text-warning bg-warning/10",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
          >
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}
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
        ))}
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {students.length} students registered
        </p>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.students.empty_state"
                  >
                    No students registered yet
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student, idx) => (
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
                      <Badge variant="secondary" className="capitalize text-xs">
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
                            <DialogTitle>{student.name}'s Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground">Mobile</p>
                                <p className="font-medium">{student.mobile}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Role</p>
                                <p className="font-medium capitalize">
                                  {student.role}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Status</p>
                                <Badge
                                  variant={
                                    student.isActive ? "default" : "destructive"
                                  }
                                >
                                  {student.isActive ? "Active" : "Blocked"}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Joined</p>
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
                              <StudentPerformanceModal studentId={student.id} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
          helpText="Disease ka naam, category aur ICD-10 code fill karein"
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
                placeholder="Disease ka brief description..."
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
          helpText="Patient mein commonly seen symptoms — naam, severity (1-10) aur description"
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
          helpText="Diagnostic criteria, associated diseases aur subject mapping fill karein"
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
          helpText="Medicines ko ICMR import se add karein ya existing disease edit karein"
        >
          <p className="text-sm" style={{ color: "rgba(150, 200, 255, 0.5)" }}>
            {disease?.medicines.length
              ? `${disease.medicines.length} medicines attached. Edit existing disease to modify medicines.`
              : "Medicines ICMR seed data se automatically populate hongi. Save karne ke baad add/edit kar sakte hain."}
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
                                "{d.name}" permanent delete ho jaayega. Undo
                                nahi ho sakta.
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
  const { data: cases = [], isLoading } = useAllPatientCases();
  const { data: diseases = [] } = useAllDiseases();
  useAddPatientCase();
  const deleteCase = useDeletePatientCase();
  useUpdatePatientCase();

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {cases.length} patient cases
        </p>
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
                              "{c.title}" permanent delete hoga.
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
                No alerts. Sab theek hai!
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
          toast.error("File parse karne mein error. Format check karein.");
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
        toast.success("Sab ICMR diseases already synced hain!");
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
              CSV format mein import karein. Har row ek disease hogi.
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
              JSON array format mein import karein.
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
              {importFormat.toUpperCase()} file drag karein ya click karein
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(150, 200, 255, 0.35)" }}
            >
              .{importFormat} file accept hogi
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
                ICMR (Indian Council of Medical Research) ke officially
                published disease guidelines se data sync karein.
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
          ℹ️ Ye feature ICMR ke publicly available research publications aur
          guidelines ke basis par kaam karta hai. {icmrDiseaseData.length}{" "}
          diseases available hain (Communicable, Non-Communicable, Zoonotic).
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
          Saare diseases ko JSON format mein export karein (backup ya migration
          ke liye).
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

// ─── Main Admin Page ──────────────────────────────────────────────

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabContent: Record<AdminTab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    students: <StudentsTab />,
    diseases: <DiseasesTab />,
    cases: <CasesTab />,
    alerts: <AlertsTab />,
    security: <SecurityTab />,
    database: <DatabaseTab />,
  };

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
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
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
