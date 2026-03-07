import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Activity,
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  ChevronRight,
  Edit3,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  Shield,
  Star,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend.d";
import { StudentIdCard } from "../components/StudentIdCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerUserProfile,
  useMyPerformanceStats,
  useSaveProfile,
} from "../hooks/useQueries";
import { generateSystemId } from "../utils/systemId";

const PHOTO_STORAGE_KEY = "medsim_profile_photo";

// ─── Circular Progress Ring ─────────────────────────────────────────
function CircularProgressRing({
  score,
  filledCount,
  totalCount,
}: {
  score: number;
  filledCount: number;
  totalCount: number;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const ringColor =
    score >= 80 ? "#00e676" : score >= 50 ? "#ffb800" : "#ff3355";
  const glowColor =
    score >= 80
      ? "rgba(0,230,118,0.3)"
      : score >= 50
        ? "rgba(255,184,0,0.3)"
        : "rgba(255,51,85,0.3)";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 140, height: 140 }}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(0,212,255,0.1)"
          strokeWidth="10"
        />
        {/* Progress arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s ease, stroke 0.5s ease",
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-3xl font-black leading-none"
          style={{ color: ringColor }}
        >
          {score}%
        </span>
        <span
          className="mt-1 font-mono text-[10px] uppercase tracking-wider"
          style={{ color: "rgba(150, 200, 255, 0.5)" }}
        >
          Profile
        </span>
        <span
          className="font-mono text-[9px]"
          style={{ color: "rgba(150, 200, 255, 0.35)" }}
        >
          {filledCount}/{totalCount} fields
        </span>
      </div>
    </div>
  );
}

// ─── Job Cards ──────────────────────────────────────────────────────
interface JobCardData {
  hospital: string;
  position: string;
  requirements: string;
  match: number;
  type: string;
}

const JOB_TIERS: {
  minScore: number;
  maxScore: number;
  tier: string;
  description: string;
  color: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  jobs: JobCardData[];
}[] = [
  {
    minScore: 0,
    maxScore: 30,
    tier: "Building Foundation",
    description:
      "Aapko aur practice ki zarurat hai. Daily exercise mode try karein.",
    color: "#ff3355",
    icon: BookOpen,
    jobs: [
      {
        hospital: "Primary Health Centre",
        position: "Intern Doctor",
        requirements: "MBBS completion, registration",
        match: 45,
        type: "Government",
      },
      {
        hospital: "Community Health Centre",
        position: "Medical Officer (Junior)",
        requirements: "MBBS, basic clinical skills",
        match: 40,
        type: "Government",
      },
      {
        hospital: "Rural Health Mission",
        position: "ASHA Coordinator",
        requirements: "MBBS, community orientation",
        match: 35,
        type: "NGO",
      },
    ],
  },
  {
    minScore: 30,
    maxScore: 50,
    tier: "Junior Clinician Track",
    description: "Junior roles ke liye ready ho rahe hain. Keep improving!",
    color: "#ffb800",
    icon: Briefcase,
    jobs: [
      {
        hospital: "District Hospital",
        position: "Junior Resident Doctor",
        requirements: "MBBS, 1-year internship",
        match: 60,
        type: "Government",
      },
      {
        hospital: "Apollo Clinic",
        position: "General Practitioner",
        requirements: "MBBS, 2+ years experience",
        match: 55,
        type: "Private",
      },
      {
        hospital: "ESI Hospital",
        position: "Junior Medical Officer",
        requirements: "MBBS + relevant clinical skills",
        match: 58,
        type: "Government",
      },
      {
        hospital: "Max Healthcare",
        position: "House Officer",
        requirements: "MBBS internship complete",
        match: 52,
        type: "Private",
      },
    ],
  },
  {
    minScore: 50,
    maxScore: 70,
    tier: "Clinical Resident Track",
    description: "Residency ke liye strong candidate. Specialty choose karein!",
    color: "#00d4ff",
    icon: Activity,
    jobs: [
      {
        hospital: "PGIMER Chandigarh",
        position: "Senior Resident (MD)",
        requirements: "MBBS + PG entrance rank",
        match: 70,
        type: "Premier Institute",
      },
      {
        hospital: "GMCH Chandigarh",
        position: "PG Resident",
        requirements: "NEET-PG rank, MBBS",
        match: 68,
        type: "Government Medical College",
      },
      {
        hospital: "Fortis Healthcare",
        position: "Senior House Officer",
        requirements: "MBBS + 2 years clinical",
        match: 72,
        type: "Private",
      },
      {
        hospital: "NIMHANS Bangalore",
        position: "Junior Resident (Psychiatry)",
        requirements: "MBBS, NEET-PG",
        match: 65,
        type: "Autonomous",
      },
    ],
  },
  {
    minScore: 70,
    maxScore: 85,
    tier: "Senior Specialist Track",
    description: "Senior positions eligible! Fellowship apply kar sakte hain.",
    color: "#9b59ff",
    icon: Star,
    jobs: [
      {
        hospital: "AIIMS New Delhi",
        position: "Senior Resident",
        requirements: "MBBS + MD/MS, AIIMS entrance",
        match: 80,
        type: "Premier Institute",
      },
      {
        hospital: "Medanta Hospital",
        position: "Associate Consultant",
        requirements: "MBBS + DM/MCh/MD",
        match: 78,
        type: "Private",
      },
      {
        hospital: "RML Hospital Delhi",
        position: "Specialist MO",
        requirements: "MBBS + PG degree",
        match: 82,
        type: "Government",
      },
      {
        hospital: "Tata Memorial Centre",
        position: "Fellow (Oncology)",
        requirements: "MD + Fellowship application",
        match: 75,
        type: "Research",
      },
    ],
  },
  {
    minScore: 85,
    maxScore: 101,
    tier: "Top Tier Excellence",
    description:
      "Outstanding performance! Top hospital positions & research awaits.",
    color: "#00e676",
    icon: TrendingUp,
    jobs: [
      {
        hospital: "AIIMS New Delhi",
        position: "Assistant Professor / HOD",
        requirements: "MD + 3yr Senior Residency + publications",
        match: 92,
        type: "Premier Institute",
      },
      {
        hospital: "PGIMER Chandigarh",
        position: "Faculty Position",
        requirements: "DM/MCh + academic record",
        match: 90,
        type: "Premier Institute",
      },
      {
        hospital: "CMC Vellore",
        position: "Consultant Specialist",
        requirements: "MBBS + DM/MCh, CMC ethos fit",
        match: 88,
        type: "Premier Private",
      },
      {
        hospital: "ICMR Research Centre",
        position: "Research Scientist",
        requirements: "MD + PhD/publications",
        match: 85,
        type: "Research",
      },
    ],
  },
];

function JobCard({
  job,
  tierColor,
  index,
}: {
  job: JobCardData;
  tierColor: string;
  index: number;
}) {
  const matchColor =
    job.match >= 80 ? "#00e676" : job.match >= 60 ? "#ffb800" : "#00d4ff";
  return (
    <motion.div
      data-ocid={`career.job.item.${index + 1}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl p-4 flex items-start justify-between gap-3"
      style={{
        background: "rgba(5, 15, 40, 0.7)",
        border: `1px solid ${tierColor}20`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Building2
            className="h-3.5 w-3.5 flex-shrink-0"
            style={{ color: tierColor }}
          />
          <p
            className="text-sm font-bold truncate"
            style={{ color: "#e8f4ff" }}
          >
            {job.hospital}
          </p>
        </div>
        <p className="text-xs font-semibold mb-1" style={{ color: tierColor }}>
          {job.position}
        </p>
        <p className="text-xs" style={{ color: "rgba(150, 200, 255, 0.5)" }}>
          {job.requirements}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div
          className="rounded-lg px-2 py-1 font-mono text-xs font-bold"
          style={{
            background: `${matchColor}15`,
            border: `1px solid ${matchColor}40`,
            color: matchColor,
          }}
        >
          {job.match}% match
        </div>
        <Badge
          className="text-[10px] border-0 px-1.5"
          style={{
            background: "rgba(0,212,255,0.08)",
            color: "rgba(100, 180, 255, 0.6)",
          }}
        >
          {job.type}
        </Badge>
      </div>
    </motion.div>
  );
}

// ─── Camera Modal Component ─────────────────────────────────────────
function CameraModal({
  open,
  onClose,
  onPhotoSaved,
}: {
  open: boolean;
  onClose: () => void;
  onPhotoSaved: (photoDataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [phase, setPhase] = useState<"live" | "preview">("live");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(true);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setIsCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 640 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsCameraLoading(false);
        };
      }
    } catch {
      setCameraError(
        "Camera ka access nahi mila. Browser settings mein allow karein.",
      );
      setIsCameraLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setPhase("live");
      setCapturedImage(null);
      setCameraError(null);
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [open, startCamera, stopCamera]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const offsetX = (video.videoWidth - size) / 2;
    const offsetY = (video.videoHeight - size) / 2;
    ctx.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedImage(dataUrl);
    setPhase("preview");
    stopCamera();
  };

  const retake = () => {
    setCapturedImage(null);
    setPhase("live");
    startCamera();
  };

  const usePhoto = () => {
    if (!capturedImage) return;
    localStorage.setItem(PHOTO_STORAGE_KEY, capturedImage);
    onPhotoSaved(capturedImage);
    toast.success("Photo save ho gayi!");
    onClose();
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="profile.camera_modal"
        className="border-0 p-0 sm:max-w-md"
        style={{
          background: "rgba(3, 10, 28, 0.98)",
          border: "1.5px solid rgba(0, 212, 255, 0.35)",
          boxShadow:
            "0 0 48px rgba(0, 212, 255, 0.15), 0 0 100px rgba(0, 212, 255, 0.05)",
          borderRadius: "1.25rem",
        }}
      >
        <DialogHeader className="px-6 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle
              className="flex items-center gap-2 font-display text-lg font-bold"
              style={{ color: "#e8f4ff" }}
            >
              <Camera className="h-5 w-5" style={{ color: "#00d4ff" }} />
              Live Photo
            </DialogTitle>
            <button
              type="button"
              data-ocid="profile.camera_cancel_button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-white/10"
              style={{ color: "rgba(180, 210, 255, 0.5)" }}
              aria-label="Close camera"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4 space-y-5">
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              maxWidth: "320px",
              borderRadius: "50%",
              border: "2.5px solid rgba(0, 212, 255, 0.4)",
              boxShadow:
                "0 0 24px rgba(0, 212, 255, 0.2), inset 0 0 24px rgba(0, 0, 0, 0.5)",
              background: "rgba(0, 10, 25, 0.8)",
            }}
          >
            <AnimatePresence mode="wait">
              {phase === "live" && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {cameraError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
                      <Camera
                        className="h-10 w-10"
                        style={{ color: "rgba(0, 212, 255, 0.3)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "rgba(255, 100, 100, 0.9)" }}
                      >
                        {cameraError}
                      </p>
                    </div>
                  ) : isCameraLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <div
                        className="h-10 w-10 animate-spin rounded-full"
                        style={{
                          border: "2px solid rgba(0, 212, 255, 0.15)",
                          borderTopColor: "#00d4ff",
                        }}
                      />
                    </div>
                  ) : null}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </motion.div>
              )}

              {phase === "preview" && capturedImage && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <img
                    src={capturedImage}
                    alt="Captured frame"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute inset-0 flex items-end justify-center pb-3"
                  >
                    <div
                      className="rounded-full px-3 py-1 font-mono text-xs font-bold"
                      style={{
                        background: "rgba(0, 230, 118, 0.25)",
                        border: "1px solid rgba(0, 230, 118, 0.5)",
                        color: "#00e676",
                      }}
                    >
                      ✓ Photo Ready
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {phase === "live" && !cameraError && !isCameraLoading && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.02) 2px, rgba(0,212,255,0.02) 4px)",
                }}
              />
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex items-center justify-center gap-4">
            {phase === "live" ? (
              <>
                <Button
                  data-ocid="profile.camera_cancel_button"
                  variant="ghost"
                  onClick={handleClose}
                  className="h-10 w-10 rounded-full p-0"
                  style={{
                    background: "rgba(255, 51, 85, 0.1)",
                    border: "1px solid rgba(255, 51, 85, 0.3)",
                    color: "#ff3355",
                  }}
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" />
                </Button>

                <button
                  type="button"
                  data-ocid="profile.camera_capture_button"
                  onClick={capturePhoto}
                  disabled={!!cameraError || isCameraLoading}
                  className="group relative flex h-16 w-16 items-center justify-center rounded-full transition-all disabled:opacity-40"
                  style={{
                    background: "rgba(255, 255, 255, 0.92)",
                    boxShadow:
                      "0 0 0 3px rgba(0, 212, 255, 0.5), 0 0 24px rgba(0, 212, 255, 0.3)",
                  }}
                  aria-label="Capture photo"
                >
                  <div
                    className="h-12 w-12 rounded-full transition-transform group-active:scale-90"
                    style={{ background: "rgba(255, 255, 255, 0.95)" }}
                  />
                </button>

                <div className="h-10 w-10" />
              </>
            ) : (
              <>
                <Button
                  data-ocid="profile.camera_retake_button"
                  onClick={retake}
                  className="h-11 gap-2 rounded-xl border-0 font-semibold"
                  style={{
                    background: "rgba(255, 184, 0, 0.12)",
                    border: "1px solid rgba(255, 184, 0, 0.3)",
                    color: "#ffb800",
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Retake
                </Button>

                <Button
                  data-ocid="profile.camera_use_photo_button"
                  onClick={usePhoto}
                  className="h-11 gap-2 rounded-xl border-0 font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #009966, #00e676)",
                    color: "#000",
                    boxShadow: "0 4px 16px rgba(0, 230, 118, 0.3)",
                  }}
                >
                  <Camera className="h-4 w-4" />
                  Use This Photo
                </Button>
              </>
            )}
          </div>

          {phase === "live" && !cameraError && (
            <p
              className="text-center font-mono text-xs"
              style={{ color: "rgba(150, 200, 255, 0.4)" }}
            >
              Camera ke saamne dekho aur shutter dabao
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ROLES = [
  { value: "student", label: "Student (MBBS)", color: "#4fc3f7" },
  { value: "intern", label: "Intern", color: "#ffb800" },
  { value: "jr1", label: "Junior Resident 1 (Jr 1)", color: "#00d4ff" },
  { value: "jr2", label: "Junior Resident 2 (Jr 2)", color: "#00b8e0" },
  { value: "sr1", label: "Senior Resident 1 (Sr 1)", color: "#00e676" },
  { value: "sr2", label: "Senior Resident 2 (Sr 2)", color: "#00c460" },
  { value: "asst_professor", label: "Assistant Professor", color: "#b39dff" },
  { value: "assoc_professor", label: "Associate Professor", color: "#9b59ff" },
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
  collegeName: string;
  rollNumber: string;
}

// Score includes photo as a field (11 total)
function calcCompletion(
  form: ExtendedProfile,
  hasPhoto: boolean,
): { score: number; filled: number; total: number } {
  const fields = [
    form.name,
    form.mobile,
    form.role,
    form.aadhaar,
    form.address,
    form.zohoMail,
    form.gmail,
    form.batch,
    form.collegeName,
    form.rollNumber,
    hasPhoto ? "photo" : null,
  ];
  const filled = fields.filter((f) => f && f.toString().trim() !== "").length;
  const total = fields.length;
  return { score: Math.round((filled / total) * 100), filled, total };
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

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps = {}) {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useCallerUserProfile();
  const { data: performanceStats } = useMyPerformanceStats();
  const saveProfile = useSaveProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() =>
    localStorage.getItem(PHOTO_STORAGE_KEY),
  );
  const [mbbsComplete, setMbbsComplete] = useState<boolean>(
    () => localStorage.getItem("medsim_mbbs_complete") === "true",
  );

  const [form, setForm] = useState<ExtendedProfile>({
    name: "",
    mobile: "",
    role: "",
    aadhaar: localStorage.getItem("medsim_aadhaar") || "",
    address: localStorage.getItem("medsim_address") || "",
    zohoMail: localStorage.getItem("medsim_zohoMail") || "",
    gmail: localStorage.getItem("medsim_gmail") || "",
    batch: localStorage.getItem("medsim_batch") || "",
    collegeName: localStorage.getItem("medsim_college") || "",
    rollNumber: localStorage.getItem("medsim_rollNumber") || "",
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        name: profile.name || "",
        mobile: profile.mobile || "",
        role: profile.role || "",
      }));
    }
  }, [profile]);

  const updateField = (field: keyof ExtendedProfile) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Persist extended fields to localStorage
    const lsFields: Record<string, string> = {
      aadhaar: "medsim_aadhaar",
      address: "medsim_address",
      zohoMail: "medsim_zohoMail",
      gmail: "medsim_gmail",
      batch: "medsim_batch",
      collegeName: "medsim_college",
      rollNumber: "medsim_rollNumber",
    };
    if (lsFields[field]) {
      localStorage.setItem(lsFields[field], value);
    }
  };

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

  const {
    score: completion,
    filled: filledCount,
    total: totalFields,
  } = calcCompletion(form, !!profilePhoto);
  const roleInfo = getRoleInfo(form.role);

  // Combined career score
  const performanceAccuracy = performanceStats
    ? Number(performanceStats.accuracy)
    : 0;
  const careerScore = Math.round(completion * 0.4 + performanceAccuracy * 0.6);
  const careerTier =
    JOB_TIERS.find(
      (t) => careerScore >= t.minScore && careerScore < t.maxScore,
    ) || JOB_TIERS[0];

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
    <div className="min-h-full p-3 sm:p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* ── Header card with circular ring ── */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(5, 15, 35, 0.95)",
              border: "1.5px solid rgba(0, 212, 255, 0.25)",
              boxShadow:
                "0 0 24px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Top row: avatar + name + circular ring */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              {/* Left: Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full font-display text-2xl font-black"
                    style={{
                      background: profilePhoto
                        ? "transparent"
                        : "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.05))",
                      border: "2px solid rgba(0, 212, 255, 0.4)",
                      color: "#00d4ff",
                      boxShadow: "0 0 16px rgba(0, 212, 255, 0.2)",
                    }}
                  >
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    ) : form.name ? (
                      form.name.charAt(0).toUpperCase()
                    ) : (
                      "?"
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid="profile.photo_camera_button"
                    onClick={() => setCameraOpen(true)}
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                      border: "2px solid rgba(3, 10, 28, 0.9)",
                      boxShadow: "0 0 10px rgba(0, 212, 255, 0.4)",
                    }}
                    aria-label="Take live photo"
                    title="Live photo lein"
                  >
                    <Camera className="h-3.5 w-3.5 text-black" />
                  </button>
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

              {/* Right: Circular progress ring */}
              <div className="flex flex-col items-center gap-2">
                <CircularProgressRing
                  score={completion}
                  filledCount={filledCount}
                  totalCount={totalFields}
                />
                <p
                  className="font-mono text-[10px] uppercase tracking-wider text-center"
                  style={{
                    color:
                      completion >= 80
                        ? "rgba(0,230,118,0.6)"
                        : completion >= 50
                          ? "rgba(255,184,0,0.6)"
                          : "rgba(255,51,85,0.6)",
                  }}
                >
                  {completion >= 80
                    ? "✓ Excellent"
                    : completion >= 50
                      ? "○ In Progress"
                      : "! Incomplete"}
                </p>
              </div>
            </div>

            {/* Linear progress bar (secondary) */}
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

            {/* Edit / Save buttons */}
            <div className="mt-4 flex justify-end gap-2">
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
                        setForm((prev) => ({
                          ...prev,
                          name: profile.name || "",
                          mobile: profile.mobile || "",
                          role: profile.role || "",
                        }));
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
                <div className="sm:col-span-2">
                  <MonitorField
                    label="College / University Name"
                    icon={Building2}
                    required
                  >
                    <Input
                      data-ocid="profile.college_name_input"
                      placeholder="AIIMS New Delhi, GMC Mumbai..."
                      value={form.collegeName}
                      onChange={(e) =>
                        updateField("collegeName")(e.target.value)
                      }
                      disabled={!isEditing}
                      style={isEditing ? inputStyle : readonlyStyle}
                      className="h-11 border-0 focus-visible:ring-0"
                    />
                  </MonitorField>
                </div>

                <MonitorField label="Roll Number" icon={BookOpen} required>
                  <Input
                    data-ocid="profile.roll_number_input"
                    placeholder="2024MBBS0123"
                    value={form.rollNumber}
                    onChange={(e) => updateField("rollNumber")(e.target.value)}
                    disabled={!isEditing}
                    style={isEditing ? inputStyle : readonlyStyle}
                    className="h-11 border-0 font-mono focus-visible:ring-0"
                  />
                </MonitorField>

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

                {/* MBBS Completion checkbox */}
                <div className="sm:col-span-2">
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: wrapper click delegates to checkbox */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all"
                    style={{
                      background: mbbsComplete
                        ? "rgba(0, 230, 118, 0.06)"
                        : "rgba(0, 10, 25, 0.4)",
                      border: `1px solid ${mbbsComplete ? "rgba(0,230,118,0.2)" : "rgba(0,212,255,0.12)"}`,
                    }}
                    onClick={() => {
                      const next = !mbbsComplete;
                      setMbbsComplete(next);
                      localStorage.setItem(
                        "medsim_mbbs_complete",
                        next ? "true" : "false",
                      );
                    }}
                  >
                    <Checkbox
                      data-ocid="profile.mbbs_complete_checkbox"
                      id="mbbs-complete"
                      checked={mbbsComplete}
                      onCheckedChange={(checked) => {
                        const next = !!checked;
                        setMbbsComplete(next);
                        localStorage.setItem(
                          "medsim_mbbs_complete",
                          next ? "true" : "false",
                        );
                      }}
                      className="border-0"
                      style={{
                        background: mbbsComplete
                          ? "#00e676"
                          : "rgba(0,10,25,0.6)",
                        border: `1px solid ${mbbsComplete ? "rgba(0,230,118,0.4)" : "rgba(0,212,255,0.2)"}`,
                      }}
                    />
                    <div>
                      <Label
                        htmlFor="mbbs-complete"
                        className="font-semibold text-sm cursor-pointer"
                        style={{
                          color: mbbsComplete
                            ? "#00e676"
                            : "rgba(180, 210, 255, 0.7)",
                        }}
                      >
                        MBBS Degree Complete
                      </Label>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(100, 150, 200, 0.45)" }}
                      >
                        {mbbsComplete
                          ? "✓ MBBS complete hai — senior job positions ke liye eligible"
                          : "MBBS degree complete hone par tick karein (career opportunities unlock hongi)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  type="submit"
                  data-ocid="profile.submit_button"
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

          {/* ── Career Opportunities Section ── */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(5, 15, 35, 0.9)",
              border: `1px solid ${careerTier.color}25`,
              boxShadow: `0 0 20px ${careerTier.color}08`,
            }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp
                    className="h-4 w-4"
                    style={{ color: careerTier.color }}
                  />
                  <h2
                    className="font-display text-base font-bold"
                    style={{ color: "rgba(180, 220, 255, 0.9)" }}
                  >
                    Career Opportunities
                  </h2>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(150, 200, 255, 0.5)" }}
                >
                  {careerTier.description}
                </p>
              </div>
              <div
                className="flex-shrink-0 rounded-xl px-3 py-2 text-center"
                style={{
                  background: `${careerTier.color}12`,
                  border: `1px solid ${careerTier.color}30`,
                }}
              >
                <p
                  className="font-display text-xl font-black"
                  style={{ color: careerTier.color }}
                >
                  {careerScore}%
                </p>
                <p
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: `${careerTier.color}80` }}
                >
                  Career Score
                </p>
              </div>
            </div>

            {/* Tier badge */}
            <div
              className="mb-4 flex items-center gap-2 rounded-xl px-4 py-3"
              style={{
                background: `${careerTier.color}10`,
                border: `1px solid ${careerTier.color}25`,
              }}
            >
              <careerTier.icon
                className="h-5 w-5 flex-shrink-0"
                style={{ color: careerTier.color }}
              />
              <div>
                <p
                  className="font-display font-bold text-sm"
                  style={{ color: careerTier.color }}
                >
                  {careerTier.tier}
                </p>
                <p
                  className="font-mono text-[10px] mt-0.5"
                  style={{ color: "rgba(150, 200, 255, 0.4)" }}
                >
                  Profile: {completion}% × 0.4 + Performance:{" "}
                  {performanceAccuracy}% × 0.6
                </p>
              </div>
            </div>

            {/* Job cards */}
            <div className="space-y-2.5">
              {careerTier.jobs.map((job, i) => (
                <JobCard
                  key={job.hospital + job.position}
                  job={job}
                  tierColor={careerTier.color}
                  index={i}
                />
              ))}
            </div>

            {/* View All button */}
            {onNavigate && (
              <button
                type="button"
                data-ocid="profile.career_view_all_button"
                onClick={() => onNavigate("career")}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: `${careerTier.color}10`,
                  border: `1px solid ${careerTier.color}25`,
                  color: careerTier.color,
                }}
              >
                View All Opportunities
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            <p
              className="mt-4 text-center font-mono text-xs"
              style={{ color: "rgba(100, 150, 200, 0.35)" }}
            >
              ℹ️ Career recommendations profile + performance score pe based hain
            </p>
          </div>

          {/* ── Student ID Card Section ── */}
          {form.name &&
            form.batch &&
            (() => {
              const principalId =
                identity?.getPrincipal().toString() ||
                profile?.id ||
                "anonymous";
              const systemId = generateSystemId(principalId);
              return (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(5, 15, 35, 0.9)",
                    border: "1px solid rgba(0, 212, 255, 0.15)",
                  }}
                >
                  <StudentIdCard
                    name={form.name}
                    batch={form.batch}
                    role={form.role}
                    profilePhoto={profilePhoto}
                    systemId={systemId}
                    principalId={principalId}
                    collegeName={form.collegeName}
                    rollNumber={form.rollNumber}
                  />
                </div>
              );
            })()}

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

      {/* Camera Modal */}
      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onPhotoSaved={(photoDataUrl) => setProfilePhoto(photoDataUrl)}
      />
    </div>
  );
}

export default ProfilePage;
