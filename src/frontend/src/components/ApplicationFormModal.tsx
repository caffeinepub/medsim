import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Loader2,
  MapPin,
  Send,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { JobListing } from "../pages/CareerPage";

interface ApplicationFormModalProps {
  open: boolean;
  onClose: () => void;
  job: JobListing;
  onSubmitSuccess: (applicationId: string) => void;
}

interface AppFormData {
  // Step 0 — Personal (auto-filled)
  name: string;
  mobile: string;
  role: string;
  batch: string;
  email: string;
  college: string;
  aadhaar: string;
  address: string;
  // Step 1 — SOP
  sop: string;
  // Step 2 — Experience
  yearsExperience: string;
  currentPosition: string;
  achievements: string;
  certifications: string;
  // Step 3 — References
  ref1Name: string;
  ref1Designation: string;
  ref1Contact: string;
  ref2Name: string;
  ref2Designation: string;
  ref2Contact: string;
  // Step 4 — Post-specific
  surgicalExperience: string;
  publicationsCount: string;
  researchSummary: string;
  deptManagementExp: string;
  additionalInfo: string;
}

const STEP_LABELS = [
  { icon: User, label: "Personal Details" },
  { icon: FileText, label: "Statement of Purpose" },
  { icon: Award, label: "Experience" },
  { icon: Users, label: "References" },
  { icon: BookOpen, label: "Post-Specific" },
  { icon: ClipboardList, label: "Review & Submit" },
];

function getPostSpecificLabel(job: JobListing): string {
  const id = job.id.toLowerCase();
  const pos = job.position.toLowerCase();
  if (
    id.includes("surgery") ||
    pos.includes("surgery") ||
    pos.includes("ortho")
  )
    return "Surgical Experience";
  if (job.type === "Research") return "Research Details";
  if (job.requiredRoles.includes("hod")) return "Department Management";
  return "Additional Information";
}

export function ApplicationFormModal({
  open,
  onClose,
  job,
  onSubmitSuccess,
}: ApplicationFormModalProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<AppFormData>({
    name: localStorage.getItem("medsim_profile_name") || "",
    mobile: localStorage.getItem("medsim_profile_mobile") || "",
    role: localStorage.getItem("medsim_profile_role") || "",
    batch: localStorage.getItem("medsim_batch") || "",
    email:
      localStorage.getItem("medsim_gmail") ||
      localStorage.getItem("medsim_zohoMail") ||
      "",
    college: localStorage.getItem("medsim_college") || "",
    aadhaar: localStorage.getItem("medsim_aadhaar") || "",
    address: localStorage.getItem("medsim_address") || "",
    sop: "",
    yearsExperience: "",
    currentPosition: "",
    achievements: "",
    certifications: "",
    ref1Name: "",
    ref1Designation: "",
    ref1Contact: "",
    ref2Name: "",
    ref2Designation: "",
    ref2Contact: "",
    surgicalExperience: "",
    publicationsCount: "",
    researchSummary: "",
    deptManagementExp: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AppFormData, string>>
  >({});

  const update = (field: keyof AppFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Partial<Record<keyof AppFormData, string>> = {};
    if (s === 0) {
      if (!form.name.trim()) newErrors.name = "Naam zaroori hai";
      if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
        newErrors.mobile = "Valid 10-digit number chahiye";
      if (!form.role.trim()) newErrors.role = "Role zaroori hai";
    }
    if (s === 1) {
      if (form.sop.trim().length < 100)
        newErrors.sop =
          "Statement of Purpose minimum 100 characters ka hona chahiye";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const TOTAL_STEPS = STEP_LABELS.length;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const applicationId = `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const submittedAt = new Date().toISOString();
    const application = {
      id: applicationId,
      jobId: job.id,
      jobTitle: job.position,
      hospital: job.hospital,
      status: "pending_admin_approval",
      submittedAt,
      formData: { ...form },
    };

    // Save application
    const existing = JSON.parse(
      localStorage.getItem("medsim_applications") || "[]",
    );
    existing.push(application);
    localStorage.setItem("medsim_applications", JSON.stringify(existing));

    // Save admin notification
    const notifications = JSON.parse(
      localStorage.getItem("medsim_admin_notifications") || "[]",
    );
    notifications.push({
      id: Date.now(),
      type: "new_application",
      appId: applicationId,
      jobTitle: job.position,
      hospital: job.hospital,
      studentName: form.name,
      submittedAt,
      read: false,
    });
    localStorage.setItem(
      "medsim_admin_notifications",
      JSON.stringify(notifications),
    );

    setSubmitting(false);
    toast.success(
      "Application submit ho gayi! Admin approval ke baad exam unlock hoga (24 ghante mein).",
      { duration: 5000 },
    );
    onSubmitSuccess(applicationId);
  };

  const fieldStyle: React.CSSProperties = {
    background: "rgba(0, 15, 35, 0.7)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    color: "#e8f4ff",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  // Detect post-specific fields needed
  const jobId = job.id.toLowerCase();
  const jobPos = job.position.toLowerCase();
  const needsSurgical =
    jobId.includes("surgery") ||
    jobPos.includes("surgery") ||
    jobPos.includes("ortho");
  const needsResearch = job.type === "Research";
  const needsHOD = job.requiredRoles.includes("hod");

  const reviewRows = [
    { label: "Position", value: job.position },
    { label: "Hospital", value: job.hospital },
    { label: "Name", value: form.name },
    { label: "Mobile", value: form.mobile },
    { label: "Role", value: form.role },
    { label: "MBBS Batch", value: form.batch || "—" },
    { label: "Email", value: form.email || "—" },
    { label: "College", value: form.college || "—" },
    { label: "SOP Length", value: `${form.sop.length} characters` },
    {
      label: "Experience",
      value: form.yearsExperience ? `${form.yearsExperience} years` : "—",
    },
    { label: "Reference 1", value: form.ref1Name || "—" },
    { label: "Reference 2", value: form.ref2Name || "—" },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="career.application.dialog"
        className="border-0 p-0 sm:max-w-lg"
        style={{
          background: "rgba(3, 10, 28, 0.98)",
          border: "1.5px solid rgba(0, 212, 255, 0.3)",
          boxShadow:
            "0 0 48px rgba(0, 212, 255, 0.12), 0 0 100px rgba(0, 212, 255, 0.04)",
          borderRadius: "1.25rem",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-0">
          <DialogHeader>
            <DialogTitle
              className="font-display text-lg font-bold"
              style={{ color: "#e8f4ff" }}
            >
              Job Application
            </DialogTitle>
          </DialogHeader>

          {/* Job summary */}
          <div
            className="mt-3 rounded-xl p-3 flex items-start gap-3"
            style={{
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.12)",
            }}
          >
            <Building2
              className="h-4 w-4 mt-0.5 flex-shrink-0"
              style={{ color: "#00d4ff" }}
            />
            <div>
              <p className="font-semibold text-sm" style={{ color: "#e8f4ff" }}>
                {job.position}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p
                  className="text-xs"
                  style={{ color: "rgba(150, 200, 255, 0.5)" }}
                >
                  {job.hospital}
                </p>
                <span style={{ color: "rgba(100, 150, 200, 0.3)" }}>•</span>
                <div className="flex items-center gap-1">
                  <MapPin
                    className="h-3 w-3"
                    style={{ color: "rgba(150, 200, 255, 0.3)" }}
                  />
                  <p
                    className="text-xs"
                    style={{ color: "rgba(150, 200, 255, 0.4)" }}
                  >
                    {job.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2 overflow-x-auto gap-1">
              {STEP_LABELS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-1 flex-shrink-0"
                    style={{ opacity: i <= step ? 1 : 0.35 }}
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        background:
                          i < step
                            ? "#00d4ff"
                            : i === step
                              ? "rgba(0,212,255,0.2)"
                              : "rgba(0,10,25,0.5)",
                        border: `1px solid ${i <= step ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                      }}
                    >
                      {i < step ? (
                        <Check className="h-3 w-3 text-black" />
                      ) : (
                        <Icon
                          className="h-3 w-3"
                          style={{
                            color:
                              i === step ? "#00d4ff" : "rgba(150,200,255,0.4)",
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="hidden sm:block font-mono text-[7px] text-center"
                      style={{
                        color:
                          i <= step
                            ? "rgba(0,212,255,0.6)"
                            : "rgba(100,150,200,0.3)",
                      }}
                    >
                      {s.label.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
            <Progress
              value={progress}
              className="h-1"
              style={
                { background: "rgba(0,212,255,0.1)" } as React.CSSProperties
              }
            />
            <p
              className="text-right font-mono text-[10px] mt-1"
              style={{ color: "rgba(0,212,255,0.4)" }}
            >
              Step {step + 1} of {TOTAL_STEPS}
            </p>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="wait">
            {/* ── Step 0: Personal Details ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "rgba(180, 220, 255, 0.8)" }}
                >
                  Personal Details
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "rgba(150,200,255,0.4)" }}
                >
                  Profile se auto-filled — zaroori ho toh edit karein
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Full Name *
                    </Label>
                    <Input
                      data-ocid="career.application.name_input"
                      value={form.name}
                      onChange={(e) => update("name")(e.target.value)}
                      placeholder="Dr. Priya Sharma"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                    {errors.name && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Mobile *
                    </Label>
                    <Input
                      data-ocid="career.application.mobile_input"
                      value={form.mobile}
                      onChange={(e) =>
                        update("mobile")(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="9876543210"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0 font-mono"
                    />
                    {errors.mobile && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Role *
                    </Label>
                    <Input
                      data-ocid="career.application.role_input"
                      value={form.role}
                      onChange={(e) => update("role")(e.target.value)}
                      placeholder="Junior Resident / Senior / Professor"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                    {errors.role && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.role}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Email
                    </Label>
                    <Input
                      data-ocid="career.application.email_input"
                      value={form.email}
                      onChange={(e) => update("email")(e.target.value)}
                      placeholder="doctor@gmail.com"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      MBBS Batch
                    </Label>
                    <Input
                      value={form.batch}
                      onChange={(e) => update("batch")(e.target.value)}
                      placeholder="2019–2025"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0 font-mono"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      College / University
                    </Label>
                    <Input
                      value={form.college}
                      onChange={(e) => update("college")(e.target.value)}
                      placeholder="AIIMS New Delhi"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 1: Statement of Purpose ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3
                    className="font-display font-bold text-sm"
                    style={{ color: "rgba(180, 220, 255, 0.8)" }}
                  >
                    Statement of Purpose
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    Apne career goals, skills, aur {job.hospital} join karne ki
                    wajah likhein (minimum 100 characters)
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Textarea
                    data-ocid="career.application.sop_textarea"
                    value={form.sop}
                    onChange={(e) => update("sop")(e.target.value)}
                    placeholder="Main is position ke liye apply kar raha/rahi hun kyunki... Meri skills mein... Mera career goal hai..."
                    rows={9}
                    style={{ ...fieldStyle, resize: "none" }}
                    className="border-0 focus-visible:ring-0"
                  />
                  <div className="flex justify-between items-center">
                    {errors.sop ? (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.sop}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p
                      className="ml-auto text-xs font-mono"
                      style={{
                        color:
                          form.sop.length >= 100
                            ? "#00e676"
                            : "rgba(150,200,255,0.4)",
                      }}
                    >
                      {form.sop.length}/100+
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Experience & Achievements ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "rgba(180, 220, 255, 0.8)" }}
                >
                  Experience &amp; Achievements
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Years of Experience
                    </Label>
                    <Input
                      data-ocid="career.application.experience_input"
                      type="number"
                      min={0}
                      max={50}
                      value={form.yearsExperience}
                      onChange={(e) =>
                        update("yearsExperience")(e.target.value)
                      }
                      placeholder="e.g. 3"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0 font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Current Position
                    </Label>
                    <Input
                      data-ocid="career.application.current_position_input"
                      value={form.currentPosition}
                      onChange={(e) =>
                        update("currentPosition")(e.target.value)
                      }
                      placeholder="Junior Resident, District Hospital"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Key Achievements
                    </Label>
                    <Textarea
                      data-ocid="career.application.achievements_textarea"
                      value={form.achievements}
                      onChange={(e) => update("achievements")(e.target.value)}
                      placeholder="Awards, publications, notable cases handled, CME attended..."
                      rows={4}
                      style={{ ...fieldStyle, resize: "none" }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Certifications &amp; Courses
                    </Label>
                    <Textarea
                      data-ocid="career.application.certifications_textarea"
                      value={form.certifications}
                      onChange={(e) => update("certifications")(e.target.value)}
                      placeholder="BLS, ACLS, NLS, fellowship courses..."
                      rows={3}
                      style={{ ...fieldStyle, resize: "none" }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: References ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3
                    className="font-display font-bold text-sm"
                    style={{ color: "rgba(180, 220, 255, 0.8)" }}
                  >
                    References
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    Professional references — at least ek recommend kiya gaya
                    hai
                  </p>
                </div>

                {/* Reference 1 */}
                <div
                  className="rounded-xl p-3 space-y-2"
                  style={{
                    background: "rgba(0, 212, 255, 0.04)",
                    border: "1px solid rgba(0, 212, 255, 0.12)",
                  }}
                >
                  <p
                    className="font-mono text-xs"
                    style={{ color: "rgba(0,212,255,0.6)" }}
                  >
                    Reference 1 (Recommended)
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Name
                      </Label>
                      <Input
                        data-ocid="career.application.ref1_name_input"
                        value={form.ref1Name}
                        onChange={(e) => update("ref1Name")(e.target.value)}
                        placeholder="Dr. A.K. Sharma"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Designation
                      </Label>
                      <Input
                        data-ocid="career.application.ref1_designation_input"
                        value={form.ref1Designation}
                        onChange={(e) =>
                          update("ref1Designation")(e.target.value)
                        }
                        placeholder="HOD, Medicine Dept"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Contact (Email / Phone)
                      </Label>
                      <Input
                        data-ocid="career.application.ref1_contact_input"
                        value={form.ref1Contact}
                        onChange={(e) => update("ref1Contact")(e.target.value)}
                        placeholder="sharma@hospital.in / 98765xxxxx"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reference 2 */}
                <div
                  className="rounded-xl p-3 space-y-2"
                  style={{
                    background: "rgba(0, 212, 255, 0.04)",
                    border: "1px solid rgba(0, 212, 255, 0.08)",
                  }}
                >
                  <p
                    className="font-mono text-xs"
                    style={{ color: "rgba(0,212,255,0.4)" }}
                  >
                    Reference 2 (Optional)
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Name
                      </Label>
                      <Input
                        data-ocid="career.application.ref2_name_input"
                        value={form.ref2Name}
                        onChange={(e) => update("ref2Name")(e.target.value)}
                        placeholder="Dr. B. Mehta"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Designation
                      </Label>
                      <Input
                        data-ocid="career.application.ref2_designation_input"
                        value={form.ref2Designation}
                        onChange={(e) =>
                          update("ref2Designation")(e.target.value)
                        }
                        placeholder="Professor, Surgery Dept"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Contact
                      </Label>
                      <Input
                        data-ocid="career.application.ref2_contact_input"
                        value={form.ref2Contact}
                        onChange={(e) => update("ref2Contact")(e.target.value)}
                        placeholder="mehta@pgimer.in"
                        style={fieldStyle}
                        className="h-9 border-0 focus-visible:ring-0 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Post-Specific Fields ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3
                    className="font-display font-bold text-sm"
                    style={{ color: "rgba(180, 220, 255, 0.8)" }}
                  >
                    {getPostSpecificLabel(job)}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(150,200,255,0.4)" }}
                  >
                    Is position ke liye specific information
                  </p>
                </div>

                {needsSurgical && (
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Surgical Experience
                    </Label>
                    <Textarea
                      data-ocid="career.application.surgical_exp_textarea"
                      value={form.surgicalExperience}
                      onChange={(e) =>
                        update("surgicalExperience")(e.target.value)
                      }
                      placeholder="Procedures performed, number of surgeries assisted, OT exposure..."
                      rows={5}
                      style={{ ...fieldStyle, resize: "none" }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                )}

                {needsResearch && (
                  <>
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Publications Count
                      </Label>
                      <Input
                        data-ocid="career.application.publications_input"
                        type="number"
                        min={0}
                        value={form.publicationsCount}
                        onChange={(e) =>
                          update("publicationsCount")(e.target.value)
                        }
                        placeholder="e.g. 5"
                        style={fieldStyle}
                        className="h-10 border-0 focus-visible:ring-0 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="text-xs"
                        style={{ color: "rgba(150,200,255,0.5)" }}
                      >
                        Research Summary
                      </Label>
                      <Textarea
                        data-ocid="career.application.research_summary_textarea"
                        value={form.researchSummary}
                        onChange={(e) =>
                          update("researchSummary")(e.target.value)
                        }
                        placeholder="Research areas, key publications, ongoing projects..."
                        rows={5}
                        style={{ ...fieldStyle, resize: "none" }}
                        className="border-0 focus-visible:ring-0"
                      />
                    </div>
                  </>
                )}

                {needsHOD && !needsSurgical && !needsResearch && (
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Department Management Experience
                    </Label>
                    <Textarea
                      data-ocid="career.application.dept_mgmt_textarea"
                      value={form.deptManagementExp}
                      onChange={(e) =>
                        update("deptManagementExp")(e.target.value)
                      }
                      placeholder="Departments managed, team size, administrative experience..."
                      rows={5}
                      style={{ ...fieldStyle, resize: "none" }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                )}

                {!needsSurgical && !needsResearch && !needsHOD && (
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Additional Information
                    </Label>
                    <Textarea
                      data-ocid="career.application.additional_info_textarea"
                      value={form.additionalInfo}
                      onChange={(e) => update("additionalInfo")(e.target.value)}
                      placeholder="Koi aur relevant information jo aap share karna chahein..."
                      rows={6}
                      style={{ ...fieldStyle, resize: "none" }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Step 5: Review & Submit ── */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "rgba(180, 220, 255, 0.8)" }}
                >
                  Review Your Application
                </h3>
                <div className="space-y-2">
                  {reviewRows.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-3 rounded-lg px-3 py-2"
                      style={{
                        background: "rgba(0, 10, 30, 0.5)",
                        border: "1px solid rgba(0, 212, 255, 0.08)",
                      }}
                    >
                      <span
                        className="text-xs flex-shrink-0"
                        style={{ color: "rgba(150, 200, 255, 0.45)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-xs font-semibold text-right"
                        style={{ color: "#e8f4ff" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-xl p-3 text-xs"
                  style={{
                    background: "rgba(255, 184, 0, 0.06)",
                    border: "1px solid rgba(255, 184, 0, 0.2)",
                    color: "#ffb800",
                  }}
                >
                  ⏳ Submit karne ke baad Admin approve karega — 24 ghante ke
                  andar exam unlock hoga. Notification aayegi jab ready ho.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          <Button
            variant="ghost"
            data-ocid="career.application.back_button"
            onClick={step === 0 ? onClose : handleBack}
            disabled={submitting}
            style={{ color: "rgba(150, 200, 255, 0.5)" }}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {step === 0 ? "Cancel" : "Back"}
          </Button>

          {step < TOTAL_STEPS - 1 ? (
            <Button
              data-ocid="career.application.next_button"
              onClick={handleNext}
              className="gap-2 rounded-xl border-0"
              style={{
                background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                color: "#000",
              }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              data-ocid="career.application.submit_button"
              onClick={handleSubmit}
              disabled={submitting}
              className="gap-2 rounded-xl border-0"
              style={{
                background: "linear-gradient(135deg, #006633, #00e676)",
                color: "#000",
              }}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationFormModal;
