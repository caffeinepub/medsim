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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  Database,
  Edit2,
  Eye,
  EyeOff,
  Plus,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import type { Disease, PatientCase, UserProfile } from "../backend.d";
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

type AdminTab =
  | "dashboard"
  | "students"
  | "diseases"
  | "cases"
  | "alerts"
  | "security";

const ADMIN_TABS = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: BarChart3 },
  { id: "students" as AdminTab, label: "Students", icon: Users },
  { id: "diseases" as AdminTab, label: "Diseases", icon: Database },
  { id: "cases" as AdminTab, label: "Patient Cases", icon: BookOpen },
  { id: "alerts" as AdminTab, label: "AI Alerts", icon: Bell },
  { id: "security" as AdminTab, label: "Security", icon: Shield },
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
                  >
                    No students registered yet
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
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

// ─── Diseases Tab ─────────────────────────────────────────────────

function DiseaseForm({
  disease,
  onSave,
  onCancel,
}: {
  disease?: Disease;
  onSave: (d: Disease) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(disease?.name || "");
  const [category, setCategory] = useState(disease?.category || "Communicable");
  const [description, setDescription] = useState(disease?.description || "");
  const [icd10, setIcd10] = useState(disease?.icd10Code || "");

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Disease name required");
      return;
    }
    onSave({
      id: disease?.id || crypto.randomUUID(),
      name,
      category,
      description,
      icd10Code: icd10,
      symptoms: disease?.symptoms || [],
      clinicalSigns: disease?.clinicalSigns || {
        bp: "120/80",
        hr: "80/min",
        temp: "37°C",
        rr: "16/min",
        spo2: "98%",
      },
      diagnosticCriteria: disease?.diagnosticCriteria || "",
      associatedDiseases: disease?.associatedDiseases || [],
      subjectMapping: disease?.subjectMapping || ["Medicine"],
      medicines: disease?.medicines || [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Disease Name *</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dengue Fever"
          />
        </div>
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Communicable">Communicable</SelectItem>
              <SelectItem value="NonCommunicable">Non-Communicable</SelectItem>
              <SelectItem value="Zoonotic">Zoonotic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>ICD-10 Code</Label>
          <Input
            value={icd10}
            onChange={(e) => setIcd10(e.target.value)}
            placeholder="A90"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Disease description..."
        />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Disease
        </Button>
      </div>
    </div>
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
          onClick={() => setEditingDisease("new")}
        >
          <Plus className="h-4 w-4" />
          Add Disease
        </Button>
      </div>

      {editingDisease !== null && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
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
                  >
                    No diseases. Add some!
                  </TableCell>
                </TableRow>
              ) : (
                diseases.map((d) => (
                  <TableRow key={d.id}>
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
                          onClick={() => setEditingDisease(d)}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
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
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
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
  useAddPatientCase(); // available for future use
  const deleteCase = useDeletePatientCase();

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
                  >
                    No cases available
                  </TableCell>
                </TableRow>
              ) : (
                cases.map((c) => (
                  <TableRow key={c.id}>
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
            <div className="rounded-2xl border border-dashed border-border py-16 text-center">
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
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
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
              {events.slice(0, 50).map((event) => (
                <TableRow key={event.id}>
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
