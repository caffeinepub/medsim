import { Toaster } from "@/components/ui/sonner";
import { Stethoscope } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { AIAssistantFloat } from "./components/AIAssistantFloat";
import { AppLayout } from "./components/AppLayout";
import { SecuritySystem } from "./components/SecuritySystem";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useCallerUserProfile, useIsAdmin } from "./hooks/useQueries";
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

type AppState = "loading" | "login" | "app";

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

    // Authenticated — go directly to app (profile is optional)
    if (identity) {
      setAppState("app");
      return;
    }
  }, [isInitializing, identity, profileLoading]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
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

  // Full app
  return (
    <>
      <SecuritySystem enabled={true} />
      <AppLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
      >
        {pageContent[currentPage]}
      </AppLayout>
      <AIAssistantFloat onNavigate={handleNavigate} />
      <Toaster richColors position="top-right" />
    </>
  );
}
