import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Heart,
  MapPin,
  Search,
  Stethoscope,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ApplicationFormModal } from "../components/ApplicationFormModal";
import {
  useCallerUserProfile,
  useMyPerformanceStats,
} from "../hooks/useQueries";

export interface JobListing {
  id: string;
  hospital: string;
  position: string;
  location: string;
  salaryRange: string;
  type: "Government" | "Private" | "Premier" | "Research" | "NGO";
  tier: 1 | 2 | 3 | 4 | 5;
  requiredRoles: string[];
  minProfileScore: number;
  minPerformanceScore: number;
  minKnowledgeScore: number;
  mbbsRequired: boolean;
  specialization?: string;
  description: string;
  vacancies: number;
}

const JOB_LISTINGS: JobListing[] = [
  // Tier 1 — Entry level
  {
    id: "phc-intern",
    hospital: "Primary Health Centre (PHC)",
    position: "Intern Doctor",
    location: "Pan India (Rural)",
    salaryRange: "₹17,000–₹25,000/month",
    type: "Government",
    tier: 1,
    requiredRoles: ["intern", "mbbs", "junior"],
    minProfileScore: 20,
    minPerformanceScore: 20,
    minKnowledgeScore: 20,
    mbbsRequired: false,
    description:
      "MBBS internship program in government primary health centres. Community exposure, basic clinical skills.",
    vacancies: 50,
  },
  {
    id: "chc-medical-officer-jr",
    hospital: "Community Health Centre",
    position: "Junior Medical Officer",
    location: "Maharashtra / UP / Bihar",
    salaryRange: "₹35,000–₹50,000/month",
    type: "Government",
    tier: 1,
    requiredRoles: ["intern", "junior"],
    minProfileScore: 30,
    minPerformanceScore: 25,
    minKnowledgeScore: 30,
    mbbsRequired: true,
    description:
      "Government CHC posting. OPD, emergency duties, basic surgical procedures under supervision.",
    vacancies: 30,
  },
  {
    id: "ngo-asha",
    hospital: "National Rural Health Mission (NHM)",
    position: "MBBS Medical Officer (AYUSH integration)",
    location: "Rajasthan / MP / Jharkhand",
    salaryRange: "₹30,000–₹45,000/month",
    type: "NGO",
    tier: 1,
    requiredRoles: ["intern", "junior"],
    minProfileScore: 25,
    minPerformanceScore: 20,
    minKnowledgeScore: 25,
    mbbsRequired: true,
    description:
      "NHM rural posting focused on maternal and child health, immunization programs.",
    vacancies: 100,
  },
  // Tier 2 — Junior clinician
  {
    id: "district-hospital-jr",
    hospital: "District Government Hospital",
    position: "Junior Resident Doctor",
    location: "All India (State Cadre)",
    salaryRange: "₹50,000–₹75,000/month",
    type: "Government",
    tier: 2,
    requiredRoles: ["junior", "senior"],
    minProfileScore: 40,
    minPerformanceScore: 40,
    minKnowledgeScore: 35,
    mbbsRequired: true,
    description:
      "State government junior residency. Clinical rotations in Medicine, Surgery, OBG, Paeds.",
    vacancies: 200,
  },
  {
    id: "apollo-gp",
    hospital: "Apollo Clinic Network",
    position: "General Practitioner",
    location: "Delhi / Mumbai / Bangalore",
    salaryRange: "₹60,000–₹90,000/month",
    type: "Private",
    tier: 2,
    requiredRoles: ["junior", "senior"],
    minProfileScore: 45,
    minPerformanceScore: 50,
    minKnowledgeScore: 45,
    mbbsRequired: true,
    specialization: "General Medicine",
    description:
      "Apollo outpatient clinic GP role. High patient volume, good training environment.",
    vacancies: 15,
  },
  {
    id: "esi-hospital-jmo",
    hospital: "ESI (Employees' State Insurance) Hospital",
    position: "Junior Medical Officer",
    location: "Delhi / Noida / Gurgaon",
    salaryRange: "₹55,000–₹80,000/month",
    type: "Government",
    tier: 2,
    requiredRoles: ["junior", "senior"],
    minProfileScore: 40,
    minPerformanceScore: 45,
    minKnowledgeScore: 40,
    mbbsRequired: true,
    description:
      "ESIC hospital clinical posting for urban industrial worker healthcare.",
    vacancies: 40,
  },
  // Tier 3 — Clinical resident
  {
    id: "pgimer-sr-md",
    hospital: "PGIMER Chandigarh",
    position: "Senior Resident (Post-MD)",
    location: "Chandigarh",
    salaryRange: "₹80,000–₹1,10,000/month",
    type: "Premier",
    tier: 3,
    requiredRoles: ["senior", "professor"],
    minProfileScore: 55,
    minPerformanceScore: 65,
    minKnowledgeScore: 60,
    mbbsRequired: true,
    specialization: "Internal Medicine / Surgery",
    description:
      "PGIMER senior residency post MD/MS. Tertiary care exposure, academic environment.",
    vacancies: 8,
  },
  {
    id: "gmch-pg-resident",
    hospital: "Government Medical College (State)",
    position: "PG Resident (NEET-PG)",
    location: "Pan India (State Medical Colleges)",
    salaryRange: "₹60,000–₹85,000/month",
    type: "Government",
    tier: 3,
    requiredRoles: ["junior", "senior"],
    minProfileScore: 50,
    minPerformanceScore: 60,
    minKnowledgeScore: 55,
    mbbsRequired: true,
    description:
      "NEET-PG merit-based PG residency. 3-year MD/MS program at government medical colleges.",
    vacancies: 500,
  },
  {
    id: "fortis-sho",
    hospital: "Fortis Healthcare",
    position: "Senior House Officer",
    location: "Mumbai / Delhi / Kolkata",
    salaryRange: "₹85,000–₹1,20,000/month",
    type: "Private",
    tier: 3,
    requiredRoles: ["senior", "professor"],
    minProfileScore: 55,
    minPerformanceScore: 65,
    minKnowledgeScore: 55,
    mbbsRequired: true,
    specialization: "Multiple specialities",
    description:
      "Fortis multispeciality hospital. Tertiary care clinical experience with good remuneration.",
    vacancies: 12,
  },
  // Tier 4 — Senior specialist
  {
    id: "aiims-sr",
    hospital: "AIIMS New Delhi",
    position: "Senior Resident",
    location: "New Delhi",
    salaryRange: "₹1,00,000–₹1,50,000/month",
    type: "Premier",
    tier: 4,
    requiredRoles: ["senior", "professor"],
    minProfileScore: 70,
    minPerformanceScore: 75,
    minKnowledgeScore: 72,
    mbbsRequired: true,
    specialization: "MD/MS + AIIMS entrance",
    description:
      "AIIMS senior residency — the gold standard. Cutting-edge clinical training and research.",
    vacancies: 5,
  },
  {
    id: "medanta-assoc-consultant",
    hospital: "Medanta — The Medicity",
    position: "Associate Consultant",
    location: "Gurugram, Haryana",
    salaryRange: "₹1,40,000–₹2,20,000/month",
    type: "Private",
    tier: 4,
    requiredRoles: ["professor", "hod"],
    minProfileScore: 72,
    minPerformanceScore: 78,
    minKnowledgeScore: 75,
    mbbsRequired: true,
    specialization: "DM/MCh/MD with superspeciality",
    description:
      "Medanta Associate Consultant. High-level clinical work with academic activity.",
    vacancies: 3,
  },
  {
    id: "rml-specialist",
    hospital: "RML Hospital Delhi",
    position: "Specialist Medical Officer",
    location: "New Delhi",
    salaryRange: "₹1,10,000–₹1,60,000/month",
    type: "Government",
    tier: 4,
    requiredRoles: ["senior", "professor"],
    minProfileScore: 68,
    minPerformanceScore: 72,
    minKnowledgeScore: 70,
    mbbsRequired: true,
    specialization: "PG Degree in specialty",
    description:
      "RML Delhi Specialist MO. Government tier-3 hospital with good job security.",
    vacancies: 6,
  },
  {
    id: "tata-memorial-fellow",
    hospital: "Tata Memorial Centre Mumbai",
    position: "Fellow (Oncology / Hematology)",
    location: "Mumbai, Maharashtra",
    salaryRange: "₹95,000–₹1,30,000/month",
    type: "Research",
    tier: 4,
    requiredRoles: ["senior", "professor"],
    minProfileScore: 70,
    minPerformanceScore: 75,
    minKnowledgeScore: 75,
    mbbsRequired: true,
    specialization: "MD Medicine + Oncology interest",
    description:
      "Tata Memorial fellowship in cancer care. India's premier cancer institute.",
    vacancies: 4,
  },
  // Tier 5 — Top tier
  {
    id: "aiims-asst-prof",
    hospital: "AIIMS New Delhi",
    position: "Assistant Professor / Faculty",
    location: "New Delhi",
    salaryRange: "₹2,00,000–₹2,80,000/month",
    type: "Premier",
    tier: 5,
    requiredRoles: ["professor", "hod"],
    minProfileScore: 85,
    minPerformanceScore: 88,
    minKnowledgeScore: 85,
    mbbsRequired: true,
    specialization: "MD + 3yr Senior Residency + publications",
    description:
      "AIIMS faculty position. Teaching, research, and patient care at the highest level.",
    vacancies: 2,
  },
  {
    id: "pgimer-faculty",
    hospital: "PGIMER Chandigarh",
    position: "Faculty / Associate Professor",
    location: "Chandigarh",
    salaryRange: "₹1,80,000–₹2,50,000/month",
    type: "Premier",
    tier: 5,
    requiredRoles: ["professor", "hod"],
    minProfileScore: 82,
    minPerformanceScore: 85,
    minKnowledgeScore: 83,
    mbbsRequired: true,
    specialization: "DM/MCh + academic record",
    description:
      "PGIMER faculty. Premier institute with excellent academic and research environment.",
    vacancies: 2,
  },
  {
    id: "icmr-research-scientist",
    hospital: "ICMR Research Centre",
    position: "Research Scientist B (Medical)",
    location: "New Delhi / Regional Centres",
    salaryRange: "₹1,60,000–₹2,20,000/month",
    type: "Research",
    tier: 5,
    requiredRoles: ["professor", "hod"],
    minProfileScore: 80,
    minPerformanceScore: 82,
    minKnowledgeScore: 85,
    mbbsRequired: true,
    specialization: "MD/PhD + publications",
    description:
      "ICMR research scientist. Full-time biomedical research, clinical trials, public health.",
    vacancies: 3,
  },
];

const TYPE_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Government: {
    bg: "rgba(0, 212, 255, 0.08)",
    text: "#00d4ff",
    border: "rgba(0, 212, 255, 0.25)",
  },
  Private: {
    bg: "rgba(0, 230, 118, 0.08)",
    text: "#00e676",
    border: "rgba(0, 230, 118, 0.25)",
  },
  Premier: {
    bg: "rgba(155, 89, 255, 0.1)",
    text: "#9b59ff",
    border: "rgba(155, 89, 255, 0.3)",
  },
  Research: {
    bg: "rgba(255, 184, 0, 0.08)",
    text: "#ffb800",
    border: "rgba(255, 184, 0, 0.25)",
  },
  NGO: {
    bg: "rgba(255, 51, 85, 0.08)",
    text: "#ff8fa3",
    border: "rgba(255, 51, 85, 0.2)",
  },
};

const TIER_COLORS = [
  "#9b59ff",
  "#00d4ff",
  "#ffb800",
  "#00e676",
  "#ff3355",
].reverse();

interface CareerPageProps {
  onNavigate?: (page: string) => void;
}

function calcCareerScore(
  profileScore: number,
  performanceScore: number,
): number {
  return Math.round(profileScore * 0.4 + performanceScore * 0.6);
}

function calcProfileCompletionFromLS(): number {
  const lsFields = [
    localStorage.getItem("medsim_aadhaar"),
    localStorage.getItem("medsim_address"),
    localStorage.getItem("medsim_zohoMail"),
    localStorage.getItem("medsim_gmail"),
    localStorage.getItem("medsim_batch"),
    localStorage.getItem("medsim_profile_photo"),
    localStorage.getItem("medsim_college"),
    localStorage.getItem("medsim_rollNumber"),
  ];
  const filledLS = lsFields.filter(
    (f) => f && f.trim() !== "" && f !== "null",
  ).length;
  const hasName = !!(localStorage.getItem("medsim_saved_name") || "").trim();
  const hasMobile = !!(
    localStorage.getItem("medsim_login_mobile") || ""
  ).trim();
  const hasRole = !!(localStorage.getItem("medsim_role") || "").trim();
  const bonusCount = [hasName, hasMobile, hasRole].filter(Boolean).length;
  const total = lsFields.length + 3; // 11 total
  return Math.round(((filledLS + bonusCount) / total) * 100);
}

export function CareerPage({ onNavigate }: CareerPageProps) {
  const { data: profile } = useCallerUserProfile();
  const { data: performanceStats } = useMyPerformanceStats();
  // Filter out admin-deleted jobs
  const deletedJobIds = useMemo<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("medsim_deleted_jobs") || "[]");
    } catch {
      return [];
    }
  }, []);
  const ACTIVE_JOB_LISTINGS = JOB_LISTINGS.filter(
    (j) => !deletedJobIds.includes(j.id),
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Government" | "Private" | "Premier" | "Research"
  >("All");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  const mbbsComplete = localStorage.getItem("medsim_mbbs_complete") === "true";
  const profileLSScore = calcProfileCompletionFromLS();
  const performanceScore = (() => {
    if (performanceStats && Number(performanceStats.accuracy) > 0) {
      return Number(performanceStats.accuracy);
    }
    // Fallback: compute from localStorage performance history
    try {
      const stored = localStorage.getItem("medsim_performance");
      if (stored) {
        const entries: Array<{ score: number; total: number }> =
          JSON.parse(stored);
        if (entries.length > 0) {
          const totalScore = entries.reduce(
            (sum, e) => sum + (e.score || 0),
            0,
          );
          const totalQuestions = entries.reduce(
            (sum, e) => sum + (e.total || 1),
            0,
          );
          return Math.round((totalScore / totalQuestions) * 100);
        }
      }
    } catch {
      // ignore
    }
    return 0;
  })();
  const careerScore = calcCareerScore(profileLSScore, performanceScore);
  const studentRole =
    profile?.role || localStorage.getItem("medsim_profile_role") || "intern";

  // Normalize granular roles for job matching
  function normalizeRole(role: string): string {
    if (role === "student") return "student";
    if (role === "intern") return "intern";
    if (role === "jr1" || role === "jr2") return "junior";
    if (role === "sr1" || role === "sr2") return "senior";
    if (role === "asst_professor" || role === "assoc_professor")
      return "professor";
    return role;
  }
  const normalizedStudentRole = normalizeRole(studentRole);

  function isEligible(job: JobListing): boolean {
    if (job.mbbsRequired && !mbbsComplete) return false;
    if (
      !job.requiredRoles.includes(studentRole) &&
      !job.requiredRoles.includes(normalizedStudentRole) &&
      !job.requiredRoles.includes("all")
    )
      return false;
    if (profileLSScore < job.minProfileScore) return false;
    if (performanceScore < job.minPerformanceScore) return false;
    if (careerScore < job.minKnowledgeScore) return false;
    return true;
  }

  function getMatchPercent(job: JobListing): number {
    const profileMatch = Math.min(
      100,
      (profileLSScore / Math.max(1, job.minProfileScore)) * 100,
    );
    const perfMatch = Math.min(
      100,
      (performanceScore / Math.max(1, job.minPerformanceScore)) * 100,
    );
    const roleMatch =
      job.requiredRoles.includes(studentRole) ||
      job.requiredRoles.includes(normalizedStudentRole)
        ? 100
        : 0;
    const mbbsMatch = job.mbbsRequired ? (mbbsComplete ? 100 : 0) : 100;
    return Math.round((profileMatch + perfMatch + roleMatch + mbbsMatch) / 4);
  }

  const filtered = ACTIVE_JOB_LISTINGS.filter((job) => {
    const matchesFilter = activeFilter === "All" || job.type === activeFilter;
    const matchesSearch =
      !searchQuery ||
      job.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const eligibleCount = ACTIVE_JOB_LISTINGS.filter(isEligible).length;

  const handleApply = (job: JobListing) => {
    setSelectedJob(job);
    setApplicationModalOpen(true);
  };

  const handleApplicationSuccess = (_applicationId: string) => {
    setApplicationModalOpen(false);
    setSelectedJob(null);
    // Navigate to my-applications (exam unlocks after admin approval / 24 hours)
    if (onNavigate) onNavigate("my-applications");
  };

  const cardStyle = {
    background: "rgba(5, 15, 35, 0.95)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
  };

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1
              className="font-display text-3xl font-black"
              style={{ color: "#e8f4ff" }}
            >
              Career Opportunities
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              Apne scores ke hisab se eligible positions dekho — {eligibleCount}{" "}
              jobs eligible
            </p>
          </div>
          {/* Career score pill */}
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-3 flex-shrink-0"
            style={{
              background: "rgba(5, 15, 35, 0.95)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.06)",
            }}
          >
            <TrendingUp className="h-5 w-5" style={{ color: "#00d4ff" }} />
            <div>
              <p
                className="font-display text-2xl font-black"
                style={{
                  color:
                    careerScore >= 70
                      ? "#00e676"
                      : careerScore >= 50
                        ? "#ffb800"
                        : "#00d4ff",
                }}
              >
                {careerScore}%
              </p>
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "rgba(150, 200, 255, 0.4)" }}
              >
                Career Score
              </p>
            </div>
            <div
              className="flex flex-col gap-1 ml-2 text-xs"
              style={{ color: "rgba(150, 200, 255, 0.5)" }}
            >
              <span>Profile {profileLSScore}% × 0.4</span>
              <span>Perf. {Math.round(performanceScore)}% × 0.6</span>
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            {
              label: "Total Jobs",
              value: ACTIVE_JOB_LISTINGS.length,
              color: "#00d4ff",
              icon: Briefcase,
            },
            {
              label: "Eligible Now",
              value: eligibleCount,
              color: "#00e676",
              icon: CheckCircle2,
            },
            {
              label: "MBBS Status",
              value: mbbsComplete ? "Complete" : "Pending",
              color: mbbsComplete ? "#00e676" : "#ffb800",
              icon: GraduationCap,
            },
            {
              label: "Your Role",
              value: studentRole || "Not set",
              color: "#9b59ff",
              icon: Stethoscope,
            },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl p-4"
              style={cardStyle}
            >
              <Icon className="h-5 w-5 flex-shrink-0" style={{ color }} />
              <div className="min-w-0">
                <p
                  className="font-display font-bold truncate"
                  style={{ color }}
                >
                  {typeof value === "number" ? value : value}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(150, 200, 255, 0.4)" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters and search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "rgba(0, 212, 255, 0.4)" }}
            />
            <Input
              data-ocid="career.search_input"
              placeholder="Search hospital, position, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 border-0 pl-9 focus-visible:ring-0"
              style={{
                background: "rgba(5, 15, 35, 0.9)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#e8f4ff",
              }}
            />
          </div>
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as typeof activeFilter)}
          >
            <TabsList
              className="h-10"
              style={{
                background: "rgba(5, 15, 35, 0.9)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
              }}
            >
              {(
                ["All", "Government", "Private", "Premier", "Research"] as const
              ).map((f) => (
                <TabsTrigger
                  key={f}
                  value={f}
                  data-ocid={"career.filter.tab"}
                  className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* My Applications shortcut */}
        {onNavigate && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => onNavigate("my-applications")}
            data-ocid="career.my_applications_link"
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all hover:opacity-90"
            style={{
              background: "rgba(155, 89, 255, 0.08)",
              border: "1px solid rgba(155, 89, 255, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <FlaskConical className="h-4 w-4" style={{ color: "#9b59ff" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(180, 150, 255, 0.9)" }}
              >
                Meri Applications & Exams dekho
              </span>
            </div>
            <ChevronRight
              className="h-4 w-4"
              style={{ color: "rgba(155, 89, 255, 0.4)" }}
            />
          </motion.button>
        )}

        {/* Job listings */}
        <div>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 py-16 text-center"
                data-ocid="career.empty_state"
              >
                <Briefcase
                  className="h-12 w-12 opacity-20"
                  style={{ color: "#00d4ff" }}
                />
                <p style={{ color: "rgba(150, 200, 255, 0.5)" }}>
                  No jobs found for this filter. Try a different search.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3 pb-8">
                {filtered.map((job, idx) => {
                  const eligible = isEligible(job);
                  const matchPct = getMatchPercent(job);
                  const typeColor = TYPE_COLORS[job.type];
                  const tierColor = TIER_COLORS[job.tier - 1] || "#00d4ff";
                  const matchColor =
                    matchPct >= 80
                      ? "#00e676"
                      : matchPct >= 55
                        ? "#ffb800"
                        : "#ff3355";

                  return (
                    <motion.div
                      key={job.id}
                      data-ocid={`career.job.item.${idx + 1}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ delay: idx * 0.04 }}
                      className="rounded-2xl p-5"
                      style={{
                        background: "rgba(5, 15, 35, 0.95)",
                        border: `1px solid ${eligible ? `${tierColor}30` : "rgba(0, 212, 255, 0.1)"}`,
                        borderLeft: `3px solid ${eligible ? tierColor : "rgba(100,120,160,0.3)"}`,
                        boxShadow: eligible
                          ? `0 0 16px ${tierColor}08`
                          : "none",
                      }}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        {/* Left content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Building2
                              className="h-4 w-4 flex-shrink-0"
                              style={{ color: tierColor }}
                            />
                            <h3
                              className="font-display font-bold text-base"
                              style={{ color: "#e8f4ff" }}
                            >
                              {job.hospital}
                            </h3>
                            <Badge
                              className="text-[10px] border px-1.5 py-0"
                              style={{
                                background: typeColor.bg,
                                color: typeColor.text,
                                borderColor: typeColor.border,
                              }}
                            >
                              {job.type}
                            </Badge>
                          </div>
                          <p
                            className="font-semibold text-sm mb-1"
                            style={{ color: tierColor }}
                          >
                            {job.position}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin
                                className="h-3 w-3"
                                style={{ color: "rgba(150, 200, 255, 0.4)" }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "rgba(150, 200, 255, 0.5)" }}
                              >
                                {job.location}
                              </span>
                            </div>
                            <span
                              className="text-xs font-mono font-semibold"
                              style={{ color: "#00e676" }}
                            >
                              {job.salaryRange}
                            </span>
                            {job.vacancies && (
                              <span
                                className="text-xs"
                                style={{ color: "rgba(150, 200, 255, 0.35)" }}
                              >
                                {job.vacancies} vacancies
                              </span>
                            )}
                          </div>
                          <p
                            className="text-xs leading-relaxed mb-3"
                            style={{ color: "rgba(150, 200, 255, 0.5)" }}
                          >
                            {job.description}
                          </p>

                          {/* Requirements */}
                          <div
                            className="rounded-xl p-3 space-y-2"
                            style={{
                              background: "rgba(0, 10, 30, 0.6)",
                              border: "1px solid rgba(0, 212, 255, 0.08)",
                            }}
                          >
                            <p
                              className="font-mono text-[10px] uppercase tracking-wider mb-2"
                              style={{ color: "rgba(100, 160, 220, 0.5)" }}
                            >
                              Requirements
                            </p>
                            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                              {[
                                {
                                  label: "Profile Score",
                                  req: `≥ ${job.minProfileScore}%`,
                                  current: profileLSScore,
                                  pass: profileLSScore >= job.minProfileScore,
                                },
                                {
                                  label: "Performance",
                                  req: `≥ ${job.minPerformanceScore}%`,
                                  current: Math.round(performanceScore),
                                  pass:
                                    performanceScore >= job.minPerformanceScore,
                                },
                                {
                                  label: "Knowledge",
                                  req: `≥ ${job.minKnowledgeScore}%`,
                                  current: careerScore,
                                  pass: careerScore >= job.minKnowledgeScore,
                                },
                              ].map(({ label, req, current, pass }) => (
                                <div
                                  key={label}
                                  className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                                  style={{
                                    background: pass
                                      ? "rgba(0, 230, 118, 0.05)"
                                      : "rgba(255, 51, 85, 0.05)",
                                    border: `1px solid ${pass ? "rgba(0, 230, 118, 0.15)" : "rgba(255, 51, 85, 0.15)"}`,
                                  }}
                                >
                                  {pass ? (
                                    <CheckCircle2
                                      className="h-3 w-3 flex-shrink-0"
                                      style={{ color: "#00e676" }}
                                    />
                                  ) : (
                                    <XCircle
                                      className="h-3 w-3 flex-shrink-0"
                                      style={{ color: "#ff3355" }}
                                    />
                                  )}
                                  <div>
                                    <p
                                      className="font-mono text-[9px]"
                                      style={{
                                        color: "rgba(150, 200, 255, 0.4)",
                                      }}
                                    >
                                      {label}
                                    </p>
                                    <p
                                      className="font-mono text-[10px] font-bold"
                                      style={{
                                        color: pass ? "#00e676" : "#ff3355",
                                      }}
                                    >
                                      {current}% / {req}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <span
                                className="rounded-lg px-2 py-1 text-[10px] font-medium"
                                style={{
                                  background: job.requiredRoles.includes(
                                    studentRole,
                                  )
                                    ? "rgba(0, 212, 255, 0.08)"
                                    : "rgba(255, 51, 85, 0.06)",
                                  color: job.requiredRoles.includes(studentRole)
                                    ? "#00d4ff"
                                    : "#ff3355",
                                }}
                              >
                                Role: {job.requiredRoles.join(" / ")}
                              </span>
                              <span
                                className="rounded-lg px-2 py-1 text-[10px] font-medium"
                                style={{
                                  background:
                                    !job.mbbsRequired || mbbsComplete
                                      ? "rgba(0, 230, 118, 0.06)"
                                      : "rgba(255, 51, 85, 0.06)",
                                  color:
                                    !job.mbbsRequired || mbbsComplete
                                      ? "#00e676"
                                      : "#ff3355",
                                }}
                              >
                                MBBS:{" "}
                                {job.mbbsRequired ? "Required" : "Not required"}
                              </span>
                              {job.specialization && (
                                <span
                                  className="rounded-lg px-2 py-1 text-[10px]"
                                  style={{
                                    background: "rgba(255, 184, 0, 0.06)",
                                    color: "#ffb800",
                                  }}
                                >
                                  {job.specialization}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: match % + apply */}
                        <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end sm:justify-between flex-shrink-0">
                          {/* Match indicator */}
                          <div className="flex flex-col items-center">
                            <div
                              className="rounded-xl px-3 py-2 text-center"
                              style={{
                                background: `${matchColor}10`,
                                border: `1px solid ${matchColor}30`,
                              }}
                            >
                              <p
                                className="font-display text-xl font-black"
                                style={{ color: matchColor }}
                              >
                                {matchPct}%
                              </p>
                              <p
                                className="font-mono text-[10px]"
                                style={{ color: `${matchColor}70` }}
                              >
                                Match
                              </p>
                            </div>
                            {eligible ? (
                              <Badge
                                className="mt-1.5 text-[10px] border-0 gap-1"
                                style={{
                                  background: "rgba(0,230,118,0.12)",
                                  color: "#00e676",
                                }}
                              >
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                Eligible
                              </Badge>
                            ) : (
                              <Badge
                                className="mt-1.5 text-[10px] border-0 gap-1"
                                style={{
                                  background: "rgba(255,51,85,0.1)",
                                  color: "#ff8fa3",
                                }}
                              >
                                <XCircle className="h-2.5 w-2.5" />
                                Not Yet
                              </Badge>
                            )}
                          </div>

                          {/* Apply button */}
                          <Button
                            size="sm"
                            data-ocid={`career.apply_button.${idx + 1}`}
                            onClick={() => eligible && handleApply(job)}
                            disabled={!eligible}
                            className="gap-2 h-9 text-xs font-semibold rounded-xl border-0"
                            style={
                              eligible
                                ? {
                                    background: `linear-gradient(135deg, ${tierColor}cc, ${tierColor})`,
                                    color: "#000",
                                    boxShadow: `0 4px 12px ${tierColor}30`,
                                  }
                                : {
                                    background: "rgba(30, 50, 80, 0.5)",
                                    color: "rgba(150, 200, 255, 0.3)",
                                  }
                            }
                          >
                            <Heart className="h-3.5 w-3.5" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Application form modal */}
      {selectedJob && (
        <ApplicationFormModal
          open={applicationModalOpen}
          onClose={() => {
            setApplicationModalOpen(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
          onSubmitSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
}

export default CareerPage;
