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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
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
  // Step 1 — Personal
  name: string;
  mobile: string;
  role: string;
  batch: string;
  email: string;
  // Step 2 — SOP
  sop: string;
  // Step 3 — Preferences
  specialization: string;
  availabilityDate: string;
}

const SPECIALIZATIONS = [
  "General Medicine",
  "Surgery",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Cardiology",
  "Pulmonology",
  "Neurology",
  "Nephrology",
  "Gastroenterology",
  "Endocrinology",
  "Infectious Disease",
  "Oncology",
  "Orthopaedics",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "Pathology",
  "Microbiology",
  "Community Medicine",
  "Emergency Medicine",
];

const STEP_LABELS = [
  { icon: User, label: "Personal Details" },
  { icon: FileText, label: "Statement of Purpose" },
  { icon: ClipboardList, label: "Preferences" },
  { icon: Check, label: "Review & Submit" },
];

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
    sop: "",
    specialization: "",
    availabilityDate: "",
  });
  const [errors, setErrors] = useState<Partial<AppFormData>>({});

  const update = (field: keyof AppFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Partial<AppFormData> = {};
    if (s === 0) {
      if (!form.name.trim()) newErrors.name = "Naam zaroori hai";
      if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
        newErrors.mobile = "Valid 10-digit number";
      if (!form.role.trim()) newErrors.role = "Role zaroori hai";
    }
    if (s === 1) {
      if (form.sop.trim().length < 100)
        newErrors.sop =
          "Statement of Purpose minimum 100 characters ka hona chahiye";
    }
    if (s === 2) {
      if (!form.specialization)
        newErrors.specialization = "Specialization choose karein";
      if (!form.availabilityDate)
        newErrors.availabilityDate = "Availability date choose karein";
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

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate

    const applicationId = `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const application = {
      id: applicationId,
      jobId: job.id,
      jobTitle: job.position,
      hospital: job.hospital,
      status: "pending_exam",
      submittedAt: new Date().toISOString(),
      formData: { ...form },
    };

    const existing = JSON.parse(
      localStorage.getItem("medsim_applications") || "[]",
    );
    existing.push(application);
    localStorage.setItem("medsim_applications", JSON.stringify(existing));

    setSubmitting(false);
    toast.success("Application submit ho gayi! Ab exam dein.");
    onSubmitSuccess(applicationId);
  };

  const fieldStyle = {
    background: "rgba(0, 15, 35, 0.7)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    color: "#e8f4ff",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
  };

  const progress = (step / 4) * 100;

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

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {STEP_LABELS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-1"
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
                      className="hidden sm:block font-mono text-[8px] text-center"
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
              value={progress + 25}
              className="h-1"
              style={
                { background: "rgba(0,212,255,0.1)" } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="wait">
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
                      Role *
                    </Label>
                    <Input
                      data-ocid="career.application.role_input"
                      value={form.role}
                      onChange={(e) => update("role")(e.target.value)}
                      placeholder="Junior / Senior / Professor"
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
                      MBBS Batch
                    </Label>
                    <Input
                      value={form.batch}
                      onChange={(e) => update("batch")(e.target.value)}
                      placeholder="2019-2025"
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0 font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}

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
                    placeholder="Main is position ke liye apply kar raha/rahi hun kyunki..."
                    rows={8}
                    style={{ ...fieldStyle, resize: "none" }}
                    className="border-0 focus-visible:ring-0"
                  />
                  <div className="flex justify-between">
                    {errors.sop && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.sop}
                      </p>
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
                  Preferences
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Specialization Preference *
                    </Label>
                    <Select
                      value={form.specialization}
                      onValueChange={update("specialization")}
                    >
                      <SelectTrigger
                        data-ocid="career.application.specialization_select"
                        className="h-10 border-0 focus-visible:ring-0"
                        style={fieldStyle}
                      >
                        <SelectValue placeholder="Specialization choose karein" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "rgba(5, 15, 35, 0.98)",
                          border: "1px solid rgba(0,212,255,0.2)",
                          color: "#e8f4ff",
                        }}
                      >
                        {SPECIALIZATIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialization && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.specialization}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Available From (Date) *
                    </Label>
                    <Input
                      data-ocid="career.application.availability_input"
                      type="date"
                      value={form.availabilityDate}
                      onChange={(e) =>
                        update("availabilityDate")(e.target.value)
                      }
                      style={fieldStyle}
                      className="h-10 border-0 focus-visible:ring-0"
                    />
                    {errors.availabilityDate && (
                      <p className="text-xs" style={{ color: "#ff3355" }}>
                        {errors.availabilityDate}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
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
                <div className="space-y-3">
                  {[
                    { label: "Position", value: job.position },
                    { label: "Hospital", value: job.hospital },
                    { label: "Name", value: form.name },
                    { label: "Mobile", value: form.mobile },
                    { label: "Role", value: form.role },
                    { label: "Batch", value: form.batch || "—" },
                    { label: "Email", value: form.email || "—" },
                    { label: "Specialization", value: form.specialization },
                    { label: "Available From", value: form.availabilityDate },
                    {
                      label: "SOP Length",
                      value: `${form.sop.length} characters`,
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-3 rounded-lg px-3 py-2"
                      style={{
                        background: "rgba(0, 10, 30, 0.5)",
                        border: "1px solid rgba(0, 212, 255, 0.08)",
                      }}
                    >
                      <span
                        className="text-xs"
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
                    background: "rgba(0, 212, 255, 0.05)",
                    border: "1px solid rgba(0, 212, 255, 0.12)",
                    color: "rgba(150, 200, 255, 0.6)",
                  }}
                >
                  ℹ️ Submit karne ke baad aapko online exam dena hoga. Exam abhi
                  start ho jayega.
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

          {step < 3 ? (
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
              {submitting ? "Submitting..." : "Submit & Start Exam"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationFormModal;
