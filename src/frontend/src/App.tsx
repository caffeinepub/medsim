import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AIAssistantFloat } from "./components/AIAssistantFloat";
import { AppLayout } from "./components/AppLayout";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { MedicalSpinner } from "./components/MedicalSpinner";
import { ProfileIncompleteBanner } from "./components/ProfileIncompleteBanner";
import { SecuritySystem } from "./components/SecuritySystem";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useCallerUserProfile, useIsAdmin } from "./hooks/useQueries";
import { useSeedDiseases } from "./hooks/useSeedDiseases";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { AdminPage } from "./pages/AdminPage";
import { CareerPage } from "./pages/CareerPage";
import { CustomPatientPage } from "./pages/CustomPatientPage";
import { ERSimulationPage } from "./pages/ERSimulationPage";
import { ExamPage } from "./pages/ExamPage";
import { ExercisePage } from "./pages/ExercisePage";
import { HomePage } from "./pages/HomePage";
import { IcuSimulatorPage } from "./pages/IcuSimulatorPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
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
  | "er-simulation"
  | "leaderboard"
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
    const lsKeys = [
      "medsim_profile_photo",
      "medsim_batch",
      "medsim_college",
      "medsim_rollNumber",
      "medsim_aadhaar",
      "medsim_address",
      "medsim_zohoMail",
      "medsim_gmail",
      "medsim_blood_group",
    ];
    const filledLS = lsKeys.filter((k) => {
      const val = localStorage.getItem(k);
      return val && val.trim() !== "" && val !== "null";
    }).length;
    const loginMobile = localStorage.getItem("medsim_login_mobile");
    const hasName = !!localStorage.getItem("medsim_saved_name");
    const hasMobile = !!(loginMobile && loginMobile.trim() !== "");
    const bonusFields = [hasName, hasMobile].filter(Boolean).length;
    const total = lsKeys.length + 2;
    return Math.round(((filledLS + bonusFields) / total) * 100);
  } catch {
    return 0;
  }
}

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

  const profileScore = calcProfileScore();
  const showBanner = profileScore < 100;

  React.useEffect(() => {
    const ts = localStorage.getItem("medsim_login_timestamp");
    if (!ts) return;
    const loginTime = Number.parseInt(ts, 10);
    if (Number.isNaN(loginTime)) return;
    const daysLeft = Math.ceil(
      (loginTime + 30 * 24 * 60 * 60 * 1000 - Date.now()) /
        (24 * 60 * 60 * 1000),
    );
    if (daysLeft <= 5 && daysLeft > 0) {
      const reminderKey = `medsim_expiry_reminder_${daysLeft}`;
      if (!localStorage.getItem(reminderKey)) {
        localStorage.setItem(reminderKey, "1");
        setTimeout(() => {
          toast.warning(
            `Session expiry reminder: Your login expires in ${daysLeft} day(s). Please login again.`,
            { duration: 8000 },
          );
        }, 2000);
      }
    }
  }, []);

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
    </>
  );
}

function AppMain() {
  const ADMIN_MOBILE = atob("ODIwOTkxODQ5MQ==");

  const { identity, isInitializing } = useInternetIdentity();
  const { isLoading: profileLoading } = useCallerUserProfile();
  const { data: isAdminBackend = false } = useIsAdmin();

  const storedMobile = localStorage.getItem("medsim_login_mobile") ?? "";
  const isAdmin = isAdminBackend || storedMobile === ADMIN_MOBILE;

  const [appState, setAppState] = useState<AppState>("loading");
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
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
    "er-simulation": <ERSimulationPage />,
    leaderboard: <LeaderboardPage onNavigate={handleNavigate} />,
    verify: <VerifyPage principalId="" />,
    "share-app": <ShareAppPage />,
  };

  if (appState === "loading") {
    return <MedicalSpinner />;
  }

  if (appState === "login") {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    );
  }

  if (appState === "camera-permission") {
    return (
      <>
        <CameraPermissionScreen onComplete={handleCameraPermissionComplete} />
        <Toaster />
      </>
    );
  }

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
