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
    return decodeURIComponent(hash.slice("#verify/".length));
  }
  return null;
}

function isLoginWithin30Days(): boolean {
  const ts = localStorage.getItem("medsim_login_timestamp");
  if (!ts) return false;
  return Date.now() - Number.parseInt(ts, 10) < THIRTY_DAYS_MS;
}

function calcProfileScore(): number {
  const photo = localStorage.getItem("medsim_profile_photo");
  const cameraGranted =
    localStorage.getItem("medsim_camera_granted") === "true";
  return cameraGranted && photo ? 50 : 20;
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
  isAdmin,
  children,
}: {
  currentPage: AppPage;
  handleNavigate: (page: string) => void;
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

  useEffect(() => {
    if (isInitializing || profileLoading) {
      setAppState("loading");
      return;
    }

    if (!identity) {
      // Persistent login check: if user logged in within 30 days, don't show login screen.
      // The identity should still be in IndexedDB — if identity is null here, the
      // auth-client is still initializing. But if isInitializing=false and identity=null
      // we truly need to log in again unless within-30-days flag exists.
      if (isLoginWithin30Days()) {
        // Give a brief grace period — auth client may still be loading from IDB
        // We stay in loading state; if identity doesn't appear, fall through to login
        setAppState("loading");
        return;
      }
      setAppState("login");
      return;
    }

    // Check if camera permission screen should be shown
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
    setCurrentPage(page as AppPage);
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
