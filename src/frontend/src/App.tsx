import { Toaster } from "@/components/ui/sonner";
import { Stethoscope } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { AIAssistantFloat } from "./components/AIAssistantFloat";
import { AppLayout } from "./components/AppLayout";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { ProfileIncompleteBanner } from "./components/ProfileIncompleteBanner";
import { SecuritySystem } from "./components/SecuritySystem";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import {
  useCallerUserProfile,
  useIsAdmin,
  useMyPerformanceStats,
} from "./hooks/useQueries";
import { useSeedDiseases } from "./hooks/useSeedDiseases";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { AdminPage } from "./pages/AdminPage";
import { CareerPage } from "./pages/CareerPage";
import { CustomPatientPage } from "./pages/CustomPatientPage";
import { ExamPage } from "./pages/ExamPage";
import { ExercisePage } from "./pages/ExercisePage";
import { HomePage } from "./pages/HomePage";
import { IcuSimulatorPage } from "./pages/IcuSimulatorPage";
import { LoginPage } from "./pages/LoginPage";
import { MyApplicationsPage } from "./pages/MyApplicationsPage";
import { NEETPGQuizPage } from "./pages/NEETPGQuizPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ShareAppPage } from "./pages/ShareAppPage";
import { VerifyPage } from "./pages/VerifyPage";

type AppPage =
  | "home"
  | "exercise"
  | "neet-pg"
  | "custom-patient"
  | "performance"
  | "admin"
  | "profile"
  | "ai-assistant"
  | "career"
  | "exam"
  | "my-applications"
  | "icu-simulator"
  | "verify"
  | "share-app";

type AppState = "loading" | "login" | "camera-permission" | "app";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// Check if this is a verification URL (publicly accessible)
function getVerifyPrincipalFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (hash.startsWith("#verify/")) {
    const rest = hash.slice("#verify/".length);
    // New format: #verify/?name=...&systemId=... (data embedded in URL)
    if (rest.startsWith("?")) {
      return `embedded:${rest}`;
    }
    return decodeURIComponent(rest);
  }
  return null;
}

function isLoginWithin30Days(): boolean {
  try {
    const ts = localStorage.getItem("medsim_login_timestamp");
    if (!ts) return false;
    const parsed = Number.parseInt(ts, 10);
    if (Number.isNaN(parsed)) return false;
    return Date.now() - parsed < THIRTY_DAYS_MS;
  } catch {
    return false;
  }
}

function calcProfileScore(): number {
  try {
    const keys = [
      "medsim_profile_photo",
      "medsim_profile_name",
      "medsim_profile_mobile",
      "medsim_profile_batch",
      "medsim_profile_role",
      "medsim_profile_college",
      "medsim_profile_rollnumber",
      "medsim_profile_aadhaar",
      "medsim_profile_address",
    ];
    const filled = keys.filter((k) => {
      const val = localStorage.getItem(k);
      return val && val.trim() !== "" && val !== "null";
    }).length;
    return Math.round((filled / keys.length) * 100);
  } catch {
    return 0;
  }
}

function LoadingScreen() {
  return (
    <div className="medical-gradient flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
        <Stethoscope className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
      <div className="text-center">
        <h1 className="font-display text-2xl font-black text-white">MedSim</h1>
        <p className="mt-1 text-sm text-white/70">Loading...</p>
      </div>
    </div>
  );
}

// Inner component that has access to actor (for seeding)
function AppWithSeed({
  currentPage,
  handleNavigate,
  handleGoBack,
  canGoBack,
  isAdmin,
  children,
}: {
  currentPage: AppPage;
  handleNavigate: (page: string) => void;
  handleGoBack: () => void;
  canGoBack: boolean;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  useSeedDiseases();
  const { data: performanceStats } = useMyPerformanceStats();

  const profileScore = calcProfileScore();
  const showBanner = profileScore < 100;

  return (
    <>
      <SecuritySystem enabled={true} />
      <AppLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        canGoBack={canGoBack}
        isAdmin={isAdmin}
        banner={
          showBanner ? (
            <ProfileIncompleteBanner
              profileScore={profileScore}
              onNavigateToProfile={() => handleNavigate("profile")}
            />
          ) : undefined
        }
      >
        {children}
      </AppLayout>
      <AIAssistantFloat onNavigate={handleNavigate} />
      <Toaster richColors position="top-right" />
      {/* Suppress unused variable warning */}
      {performanceStats && null}
    </>
  );
}

function AppMain() {
  const ADMIN_MOBILE = "8209918491";

  const { identity, isInitializing } = useInternetIdentity();
  const { isLoading: profileLoading } = useCallerUserProfile();
  const { data: isAdminBackend = false } = useIsAdmin();

  // Admin access is granted if the stored login mobile matches the admin number
  const storedMobile = localStorage.getItem("medsim_login_mobile") ?? "";
  const isAdmin = isAdminBackend || storedMobile === ADMIN_MOBILE;

  const [appState, setAppState] = useState<AppState>("loading");
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  // Navigation history stack for Back button
  const [pageHistory, setPageHistory] = useState<AppPage[]>([]);

  useEffect(() => {
    if (isInitializing || profileLoading) {
      setAppState("loading");
      return;
    }

    if (!identity) {
      if (isLoginWithin30Days()) {
        setAppState("loading");
        return;
      }
      setAppState("login");
      return;
    }

    const permissionAsked = localStorage.getItem(
      "medsim_camera_permission_asked",
    );
    if (!permissionAsked) {
      setAppState("camera-permission");
      return;
    }

    setAppState("app");
  }, [isInitializing, identity, profileLoading]);

  // If within-30-days but identity still null after 3 seconds, show login
  useEffect(() => {
    if (!isInitializing && !identity && isLoginWithin30Days()) {
      const timer = setTimeout(() => {
        if (!identity) {
          setAppState("login");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInitializing, identity]);

  const handleNavigate = (page: string) => {
    // Push current page to history before switching
    setPageHistory((prev) => [...prev, currentPage]);
    setCurrentPage(page as AppPage);
  };

  const handleGoBack = () => {
    if (pageHistory.length > 0) {
      const newHistory = [...pageHistory];
      const prevPage = newHistory.pop()!;
      setPageHistory(newHistory);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage("home");
    }
  };

  const handleCameraPermissionComplete = () => {
    setAppState("app");
  };

  const handleLoginSuccess = () => {
    // Save persistent login timestamp (30 days)
    localStorage.setItem("medsim_login_timestamp", Date.now().toString());
    setAppState("loading");
  };

  const pageContent: Record<AppPage, React.ReactNode> = {
    home: <HomePage onNavigate={handleNavigate} />,
    exercise: <ExercisePage onNavigate={handleNavigate} />,
    "neet-pg": <NEETPGQuizPage onNavigate={handleNavigate} />,
    "custom-patient": <CustomPatientPage />,
    performance: <PerformancePage />,
    admin: isAdmin ? <AdminPage /> : <HomePage onNavigate={handleNavigate} />,
    profile: <ProfilePage onNavigate={handleNavigate} />,
    "ai-assistant": <AIAssistantPage />,
    career: <CareerPage onNavigate={handleNavigate} />,
    exam: <ExamPage onNavigate={handleNavigate} />,
    "my-applications": <MyApplicationsPage onNavigate={handleNavigate} />,
    "icu-simulator": <IcuSimulatorPage />,
    verify: <VerifyPage principalId="" />,
    "share-app": <ShareAppPage />,
  };

  // Loading
  if (appState === "loading") {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (appState === "login") {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    );
  }

  // Camera permission screen (first time only)
  if (appState === "camera-permission") {
    return (
      <>
        <CameraPermissionScreen onComplete={handleCameraPermissionComplete} />
        <Toaster />
      </>
    );
  }

  // Full app
  return (
    <AppWithSeed
      currentPage={currentPage}
      handleNavigate={handleNavigate}
      handleGoBack={handleGoBack}
      canGoBack={pageHistory.length > 0}
      isAdmin={isAdmin}
    >
      {pageContent[currentPage]}
    </AppWithSeed>
  );
}

export default function App() {
  // Check for verify hash before rendering the main app (public page, no login needed)
  const verifyPrincipalId = getVerifyPrincipalFromHash();
  if (verifyPrincipalId) {
    return (
      <>
        <VerifyPage principalId={verifyPrincipalId} />
        <Toaster />
      </>
    );
  }
  return <AppMain />;
}
