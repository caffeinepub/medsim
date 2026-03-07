import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  Stethoscope,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveProfile } from "../hooks/useQueries";

interface ProfileSetupPageProps {
  onComplete: () => void;
  prefillMobile?: string;
}

const ROLES = [
  { value: "student", label: "Student (MBBS)" },
  { value: "intern", label: "Intern" },
  { value: "jr1", label: "Junior Resident 1 (Jr 1)" },
  { value: "jr2", label: "Junior Resident 2 (Jr 2)" },
  { value: "sr1", label: "Senior Resident 1 (Sr 1)" },
  { value: "sr2", label: "Senior Resident 2 (Sr 2)" },
  { value: "asst_professor", label: "Assistant Professor" },
  { value: "assoc_professor", label: "Associate Professor" },
  { value: "hod", label: "Head of Department (HOD)" },
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

export function ProfileSetupPage({
  onComplete,
  prefillMobile = "",
}: ProfileSetupPageProps) {
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveProfile();

  const [form, setForm] = useState({
    name: "",
    mobile: prefillMobile,
    aadhaar: "",
    address: "",
    zohoMail: "",
    gmail: "",
    batch: "",
    role: "",
    collegeName: localStorage.getItem("medsim_college") || "",
    rollNumber: localStorage.getItem("medsim_rollNumber") || "",
  });

  const updateField = (field: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "collegeName") localStorage.setItem("medsim_college", value);
    if (field === "rollNumber")
      localStorage.setItem("medsim_rollNumber", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.role) {
      toast.error("Name, mobile, aur role zaroori hai");
      return;
    }

    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      toast.error("Aadhaar number 12 digits ka hona chahiye");
      return;
    }

    const studentId =
      identity?.getPrincipal().toString() || crypto.randomUUID();

    const profile: UserProfile = {
      id: studentId,
      name: form.name,
      mobile: form.mobile,
      role: form.role,
      isActive: true,
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    };

    try {
      await saveProfile.mutateAsync(profile);
      toast.success("Profile save ho gayi! Welcome to MedSim 🎉");
      onComplete();
    } catch {
      toast.error("Profile save nahi ho saki. Dobara try karein.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Stethoscope className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black text-foreground">
                Apna Profile Banayein
              </h1>
              <p className="text-muted-foreground">
                Pehli baar hai — kuch zaroori jaankari bharein
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="mb-5 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Personal Information
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">
                      Poora Naam <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Dr. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">
                      Mobile Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <span className="flex h-10 items-center rounded-lg border border-border bg-muted/50 px-3 text-sm font-medium">
                        +91
                      </span>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="9876543210"
                        value={form.mobile}
                        onChange={(e) =>
                          updateField("mobile")(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={form.aadhaar}
                      onChange={(e) =>
                        updateField("aadhaar")(
                          e.target.value.replace(/\D/g, "").slice(0, 12),
                        )
                      }
                      maxLength={12}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Ghar ka pata, Sheher, State — 400001"
                      value={form.address}
                      onChange={(e) => updateField("address")(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Academic */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="mb-5 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Academic Details
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="collegeName">
                      <Building2 className="inline h-3.5 w-3.5 mr-1 mb-0.5" />
                      College / University Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="collegeName"
                      placeholder="AIIMS New Delhi, GMC Mumbai..."
                      value={form.collegeName}
                      onChange={(e) =>
                        updateField("collegeName")(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">
                      <BookOpen className="inline h-3.5 w-3.5 mr-1 mb-0.5" />
                      University / College Roll No.{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="rollNumber"
                      placeholder="2024MBBS0123"
                      value={form.rollNumber}
                      onChange={(e) =>
                        updateField("rollNumber")(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">
                      Role <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.role}
                      onValueChange={updateField("role")}
                      required
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Apna role chunein" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch">MBBS Batch</Label>
                    <Select
                      value={form.batch}
                      onValueChange={updateField("batch")}
                    >
                      <SelectTrigger id="batch">
                        <SelectValue placeholder="Batch select karein" />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCHES.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zohoMail">Zoho Mail ID</Label>
                    <Input
                      id="zohoMail"
                      type="email"
                      placeholder="student@hospital.ac.in"
                      value={form.zohoMail}
                      onChange={(e) => updateField("zohoMail")(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gmail">Gmail ID</Label>
                    <Input
                      id="gmail"
                      type="email"
                      placeholder="rahul.sharma@gmail.com"
                      value={form.gmail}
                      onChange={(e) => updateField("gmail")(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={saveProfile.isPending}
              >
                {saveProfile.isPending ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Save Ho Raha Hai...
                  </>
                ) : (
                  "Profile Save Karein & Shuru Karein →"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfileSetupPage;
