import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Activity,
  BookOpen,
  Edit3,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCallerUserProfile, useSaveProfile } from "../hooks/useQueries";

const ROLES = [
  { value: "junior", label: "Junior (1st-2nd Year)", color: "#00d4ff" },
  { value: "senior", label: "Senior (3rd-4th Year)", color: "#00e676" },
  { value: "intern", label: "Intern / House Officer", color: "#ffb800" },
  { value: "professor", label: "Professor / Faculty", color: "#9b59ff" },
  { value: "hod", label: "Head of Department (HOD)", color: "#ff3355" },
];

const BATCHES = [
  "2018-2024",
  "2019-2025",
  "2020-2026",
  "2021-2027",
  "2022-2028",
  "2023-2029",
  "2024-2030",
  "2025-2031",
];

interface ExtendedProfile {
  name: string;
  mobile: string;
  role: string;
  aadhaar: string;
  address: string;
  zohoMail: string;
  gmail: string;
  batch: string;
}

function calcCompletion(form: ExtendedProfile): number {
  const fields = [
    form.name,
    form.mobile,
    form.role,
    form.aadhaar,
    form.address,
    form.zohoMail,
    form.gmail,
    form.batch,
  ];
  const filled = fields.filter((f) => f && f.trim() !== "").length;
  return Math.round((filled / fields.length) * 100);
}

function getRoleInfo(role: string) {
  return (
    ROLES.find((r) => r.value === role) || {
      value: role,
      label: role || "Student",
      color: "#00d4ff",
    }
  );
}

// ─── Field wrapper for monitor-style cards ─────────────────────────
function MonitorField({
  label,
  icon: Icon,
  children,
  required,
}: {
  label: string;
  icon: React.FC<{ className?: string }>;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
        style={{ color: "rgba(150, 200, 255, 0.6)" }}
      >
        <Icon className="h-3 w-3" />
        {label}
        {required && <span style={{ color: "#ff3355" }}>*</span>}
      </Label>
      {children}
    </div>
  );
}

export function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useCallerUserProfile();
  const saveProfile = useSaveProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<ExtendedProfile>({
    name: "",
    mobile: "",
    role: "",
    aadhaar: "",
    address: "",
    zohoMail: "",
    gmail: "",
    batch: "",
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        mobile: profile.mobile || "",
        role: profile.role || "",
        aadhaar: "",
        address: "",
        zohoMail: "",
        gmail: "",
        batch: "",
      });
    }
  }, [profile]);

  const updateField = (field: keyof ExtendedProfile) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.role) {
      toast.error("Name, mobile aur role zaroori hai");
      return;
    }
    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      toast.error("Aadhaar 12 digits ka hona chahiye");
      return;
    }

    const studentId =
      identity?.getPrincipal().toString() || profile?.id || crypto.randomUUID();

    const updatedProfile: UserProfile = {
      id: studentId,
      name: form.name,
      mobile: form.mobile,
      role: form.role,
      isActive: profile?.isActive ?? true,
      createdAt: profile?.createdAt ?? BigInt(Date.now()) * BigInt(1_000_000),
    };

    try {
      await saveProfile.mutateAsync(updatedProfile);
      toast.success("Profile update ho gayi!");
      setIsEditing(false);
    } catch {
      toast.error("Profile save nahi ho saki. Dobara try karein.");
    }
  };

  const completion = calcCompletion(form);
  const roleInfo = getRoleInfo(form.role);

  const inputStyle: React.CSSProperties = {
    background: isEditing ? "rgba(0, 15, 35, 0.7)" : "rgba(0, 10, 25, 0.5)",
    border: `1px solid ${isEditing ? "rgba(0, 212, 255, 0.3)" : "rgba(0, 212, 255, 0.12)"}`,
    color: isEditing ? "#e8f4ff" : "rgba(180, 210, 255, 0.7)",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    fontFamily: "'Sora', system-ui, sans-serif",
    transition: "all 0.2s",
  };

  const readonlyStyle: React.CSSProperties = {
    ...inputStyle,
    background: "rgba(0, 10, 25, 0.3)",
    border: "1px solid rgba(0, 212, 255, 0.08)",
    color: "rgba(180, 210, 255, 0.5)",
    cursor: "default",
    userSelect: "none" as const,
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className="flex flex-col items-center gap-4"
          data-ocid="profile.loading_state"
        >
          <div
            className="h-12 w-12 animate-spin rounded-full"
            style={{
              border: "2px solid rgba(0, 212, 255, 0.15)",
              borderTopColor: "#00d4ff",
            }}
          />
          <p
            className="font-mono text-sm"
            style={{ color: "rgba(0, 212, 255, 0.5)" }}
          >
            Profile load ho rahi hai...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* ── Header card ── */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(5, 15, 35, 0.95)",
              border: "1.5px solid rgba(0, 212, 255, 0.25)",
              boxShadow:
                "0 0 24px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-black"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.05))",
                    border: "1.5px solid rgba(0, 212, 255, 0.4)",
                    color: "#00d4ff",
                    boxShadow: "0 0 16px rgba(0, 212, 255, 0.2)",
                  }}
                >
                  {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                </div>

                <div>
                  <h1
                    className="font-display text-2xl font-black"
                    style={{ color: "#e8f4ff" }}
                  >
                    {form.name || "Student"}
                  </h1>
                  {form.role && (
                    <Badge
                      className="mt-1 border-0 font-mono text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: `${roleInfo.color}18`,
                        color: roleInfo.color,
                        boxShadow: `0 0 8px ${roleInfo.color}22`,
                        border: `1px solid ${roleInfo.color}33`,
                      }}
                    >
                      {roleInfo.label}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Edit / Save buttons */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    data-ocid="profile.edit_button"
                    onClick={() => setIsEditing(true)}
                    className="h-10 gap-2 rounded-xl border-0 font-semibold"
                    style={{
                      background: "rgba(0, 212, 255, 0.15)",
                      border: "1px solid rgba(0, 212, 255, 0.3)",
                      color: "#00d4ff",
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditing(false);
                        if (profile) {
                          setForm({
                            name: profile.name || "",
                            mobile: profile.mobile || "",
                            role: profile.role || "",
                            aadhaar: "",
                            address: "",
                            zohoMail: "",
                            gmail: "",
                            batch: "",
                          });
                        }
                      }}
                      className="h-10 gap-2 rounded-xl border-0 font-semibold"
                      style={{ color: "rgba(180, 210, 255, 0.5)" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      data-ocid="profile.save_button"
                      onClick={handleSave}
                      disabled={saveProfile.isPending}
                      className="h-10 gap-2 rounded-xl border-0 font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                        color: "#000",
                        boxShadow: "0 4px 16px rgba(0, 212, 255, 0.4)",
                      }}
                    >
                      {saveProfile.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saveProfile.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Profile completion */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between">
                <span
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "rgba(150, 200, 255, 0.5)" }}
                >
                  Profile Completion
                </span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: completion >= 80 ? "#00e676" : "#ffb800" }}
                >
                  {completion}%
                </span>
              </div>
              <Progress
                value={completion}
                className="h-1.5 rounded-full"
                style={
                  {
                    background: "rgba(0, 212, 255, 0.1)",
                    "--progress-foreground":
                      completion >= 80 ? "#00e676" : "#ffb800",
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Principal ID (read-only) */}
            {identity && (
              <div className="mt-4 flex items-center gap-2">
                <Lock
                  className="h-3 w-3 flex-shrink-0"
                  style={{ color: "rgba(100, 150, 200, 0.4)" }}
                />
                <p
                  className="truncate font-mono text-[10px]"
                  style={{ color: "rgba(100, 150, 200, 0.35)" }}
                >
                  {identity.getPrincipal().toString()}
                </p>
              </div>
            )}
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSave} className="space-y-5">
            {/* Personal Info section */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(5, 15, 35, 0.9)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <User className="h-4 w-4" style={{ color: "#00d4ff" }} />
                <h2
                  className="font-display text-base font-bold"
                  style={{ color: "rgba(180, 220, 255, 0.9)" }}
                >
                  Personal Information
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <MonitorField label="Full Name" icon={User} required>
                    <Input
                      data-ocid="profile.name_input"
                      placeholder="Dr. Priya Sharma"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      disabled={!isEditing}
                      style={isEditing ? inputStyle : readonlyStyle}
                      className="h-11 border-0 focus-visible:ring-0"
                    />
                  </MonitorField>
                </div>

                <MonitorField label="Mobile Number" icon={Phone} required>
                  <div className="flex gap-2">
                    <div
                      className="flex h-11 items-center rounded-xl px-3 text-sm font-mono font-semibold"
                      style={{
                        background: "rgba(0, 10, 25, 0.5)",
                        border: "1px solid rgba(0, 212, 255, 0.12)",
                        color: "#00d4ff",
                      }}
                    >
                      +91
                    </div>
                    <Input
                      data-ocid="profile.mobile_input"
                      type="tel"
                      placeholder="9876543210"
                      value={form.mobile}
                      onChange={(e) =>
                        updateField("mobile")(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      disabled={!isEditing}
                      style={isEditing ? inputStyle : readonlyStyle}
                      className="h-11 flex-1 border-0 font-mono tracking-widest focus-visible:ring-0"
                    />
                  </div>
                </MonitorField>

                <MonitorField label="Aadhaar Number" icon={Shield}>
                  <Input
                    data-ocid="profile.aadhaar_input"
                    placeholder="XXXX XXXX XXXX"
                    value={form.aadhaar}
                    onChange={(e) =>
                      updateField("aadhaar")(
                        e.target.value.replace(/\D/g, "").slice(0, 12),
                      )
                    }
                    disabled={!isEditing}
                    maxLength={12}
                    style={isEditing ? inputStyle : readonlyStyle}
                    className="h-11 border-0 font-mono tracking-widest focus-visible:ring-0"
                  />
                </MonitorField>

                <div className="sm:col-span-2">
                  <MonitorField label="Address" icon={MapPin}>
                    <Textarea
                      data-ocid="profile.address_textarea"
                      placeholder="Ghar ka pata, Sheher, State — 400001"
                      value={form.address}
                      onChange={(e) => updateField("address")(e.target.value)}
                      disabled={!isEditing}
                      rows={2}
                      style={{
                        ...(isEditing ? inputStyle : readonlyStyle),
                        resize: "none",
                      }}
                      className="border-0 focus-visible:ring-0"
                    />
                  </MonitorField>
                </div>
              </div>
            </div>

            {/* Academic & Contact section */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(5, 15, 35, 0.9)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4" style={{ color: "#00e676" }} />
                <h2
                  className="font-display text-base font-bold"
                  style={{ color: "rgba(180, 220, 255, 0.9)" }}
                >
                  Academic Details
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <MonitorField label="Role" icon={User} required>
                  <Select
                    value={form.role}
                    onValueChange={updateField("role")}
                    disabled={!isEditing}
                  >
                    <SelectTrigger
                      data-ocid="profile.role_select"
                      className="h-11 rounded-xl border-0 focus-visible:ring-0"
                      style={isEditing ? inputStyle : readonlyStyle}
                    >
                      <SelectValue placeholder="Apna role chunein" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "rgba(5, 15, 35, 0.98)",
                        border: "1px solid rgba(0, 212, 255, 0.2)",
                        color: "#e8f4ff",
                      }}
                    >
                      {ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </MonitorField>

                <MonitorField label="MBBS Batch" icon={BookOpen}>
                  <Select
                    value={form.batch}
                    onValueChange={updateField("batch")}
                    disabled={!isEditing}
                  >
                    <SelectTrigger
                      data-ocid="profile.batch_select"
                      className="h-11 rounded-xl border-0 focus-visible:ring-0"
                      style={isEditing ? inputStyle : readonlyStyle}
                    >
                      <SelectValue placeholder="Batch select karein" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "rgba(5, 15, 35, 0.98)",
                        border: "1px solid rgba(0, 212, 255, 0.2)",
                        color: "#e8f4ff",
                      }}
                    >
                      {BATCHES.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </MonitorField>

                <MonitorField label="Zoho Mail ID" icon={Mail}>
                  <Input
                    data-ocid="profile.zoho_mail_input"
                    type="email"
                    placeholder="student@hospital.ac.in"
                    value={form.zohoMail}
                    onChange={(e) => updateField("zohoMail")(e.target.value)}
                    disabled={!isEditing}
                    style={isEditing ? inputStyle : readonlyStyle}
                    className="h-11 border-0 focus-visible:ring-0"
                  />
                </MonitorField>

                <MonitorField label="Gmail ID" icon={Mail}>
                  <Input
                    data-ocid="profile.gmail_input"
                    type="email"
                    placeholder="priya.sharma@gmail.com"
                    value={form.gmail}
                    onChange={(e) => updateField("gmail")(e.target.value)}
                    disabled={!isEditing}
                    style={isEditing ? inputStyle : readonlyStyle}
                    className="h-11 border-0 focus-visible:ring-0"
                  />
                </MonitorField>
              </div>
            </div>

            {/* Save button (visible only when editing, at bottom of form) */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  type="submit"
                  data-ocid="profile.save_button"
                  size="lg"
                  className="w-full h-12 rounded-xl border-0 font-bold text-base"
                  style={{
                    background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                    color: "#000",
                    boxShadow: "0 4px 24px rgba(0, 212, 255, 0.4)",
                  }}
                  disabled={saveProfile.isPending}
                >
                  {saveProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </form>

          {/* Footer */}
          <p
            className="pb-4 text-center font-mono text-xs"
            style={{ color: "rgba(100, 150, 200, 0.35)" }}
          >
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-80"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
