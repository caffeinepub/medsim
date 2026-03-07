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
import { CustomPatientPage } from "./pages/CustomPatientPage";
import { ExercisePage } from "./pages/ExercisePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProfilePage } from "./pages/ProfilePage";

type AppPage =
  | "home"
  | "exercise"
  | "custom-patient"
  | "performance"
  | "admin"
  | "profile"
  | "ai-assistant";

type AppState = "loading" | "login" | "camera-permission" | "app";

function calcProfileScore(): number {
  // We can't get the profile from backend here directly, but we can read localStorage
  // This is used for the banner only — full score computed in ProfilePage
  const photo = localStorage.getItem("medsim_profile_photo");
  const cameraGranted =
    localStorage.getItem("medsim_camera_granted") === "true";
  // Return something low if camera not granted
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

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { isLoading: profileLoading } = useCallerUserProfile();
  const { data: isAdmin = false } = useIsAdmin();

  const [appState, setAppState] = useState<AppState>("loading");
  const [currentPage, setCurrentPage] = useState<AppPage>("home");

  useEffect(() => {
    if (isInitializing || profileLoading) {
      setAppState("loading");
      return;
    }

    if (!identity) {
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

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
  };

  const handleCameraPermissionComplete = () => {
    setAppState("app");
  };

  const pageContent: Record<AppPage, React.ReactNode> = {
    home: <HomePage onNavigate={handleNavigate} />,
    exercise: <ExercisePage onNavigate={handleNavigate} />,
    "custom-patient": <CustomPatientPage />,
    performance: <PerformancePage />,
    admin: isAdmin ? <AdminPage /> : <HomePage onNavigate={handleNavigate} />,
    profile: <ProfilePage />,
    "ai-assistant": <AIAssistantPage />,
  };

  // Loading
  if (appState === "loading") {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (appState === "login") {
    return (
      <>
        <LoginPage onLoginSuccess={() => setAppState("loading")} />
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
