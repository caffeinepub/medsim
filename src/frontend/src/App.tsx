import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AIAssistantFloat } from "./components/AIAssistantFloat";
import { AppLayout } from "./components/AppLayout";
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
import { DrugReferencePage } from "./pages/DrugReferencePage";
import { ERSimulationPage } from "./pages/ERSimulationPage";
import { ExamPage } from "./pages/ExamPage";
import { ExercisePage } from "./pages/ExercisePage";
import { HomePage } from "./pages/HomePage";
import { IcuSimulatorPage } from "./pages/IcuSimulatorPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LoginPage } from "./pages/LoginPage";
import { MyApplicationsPage } from "./pages/MyApplicationsPage";
import { NEETPGQuizPage } from "./pages/NEETPGQuizPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ShareAppPage } from "./pages/ShareAppPage";
import { VerifyPage } from "./pages/VerifyPage";
import { secureGet } from "./utils/secureStorage";

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
  | "share-app"
  | "drug-reference";

type AppState = "loading" | "login" | "app";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const pageToPath: Record<string, string> = {
  home: "/",
  exercise: "/exercise",
  "neet-pg": "/neet-pg",
  "custom-patient": "/custom-patient",
  performance: "/performance",
  admin: "/admin",
  profile: "/profile",
  "ai-assistant": "/ai-assistant",
  career: "/career",
  exam: "/exam",
  "my-applications": "/my-applications",
  "icu-simulator": "/icu-simulator",
  "er-simulation": "/er-simulation",
  leaderboard: "/leaderboard",
  verify: "/verify",
  "share-app": "/share-app",
  "drug-reference": "/drug-reference",
};

const pathToPage: Record<string, AppPage> = {
  "/": "home",
  "/exercise": "exercise",
  "/neet-pg": "neet-pg",
  "/custom-patient": "custom-patient",
  "/performance": "performance",
  "/admin": "admin",
  "/profile": "profile",
  "/ai-assistant": "ai-assistant",
  "/career": "career",
  "/exam": "exam",
  "/my-applications": "my-applications",
  "/icu-simulator": "icu-simulator",
  "/er-simulation": "er-simulation",
  "/leaderboard": "leaderboard",
  "/verify": "verify",
  "/share-app": "share-app",
  "/drug-reference": "drug-reference",
};

function getVerifyPrincipalFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (hash.startsWith("#verify/")) {
    const rest = hash.slice("#verify/".length);
    if (rest.startsWith("?")) return `embedded:${rest}`;
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
    const regularKeys = [
      "medsim_profile_photo",
      "medsim_batch",
      "medsim_college",
      "medsim_rollNumber",
      "medsim_zohoMail",
      "medsim_gmail",
      "medsim_blood_group",
    ];
    const secureKeys = ["medsim_aadhaar", "medsim_address"];
    const filledRegular = regularKeys.filter((k) => {
      const val = localStorage.getItem(k);
      return val && val.trim() !== "" && val !== "null";
    }).length;
    const filledSecure = secureKeys.filter((k) => {
      const val = secureGet(k);
      return val && val.trim() !== "" && val !== "null";
    }).length;
    const filledLS = filledRegular + filledSecure;
    const loginMobile = localStorage.getItem("medsim_login_mobile");
    const hasName = !!localStorage.getItem("medsim_saved_name");
    const hasMobile = !!(loginMobile && loginMobile.trim() !== "");
    const bonusFields = [hasName, hasMobile].filter(Boolean).length;
    const total = regularKeys.length + secureKeys.length + 2;
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

  const [profileScore, setProfileScore] = useState(calcProfileScore);
  const [showBanner, setShowBanner] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: recalculate banner on every page change
  useEffect(() => {
    const score = calcProfileScore();
    setProfileScore(score);
    const dismissed = !!localStorage.getItem("medsim_banner_dismissed");
    setShowBanner(!dismissed && score < 100);
  }, [currentPage]);

  useEffect(() => {
    const loginTs = Number.parseInt(
      localStorage.getItem("medsim_login_timestamp") ?? "0",
      10,
    );
    if (loginTs) {
      const daysLeft = Math.floor(
        (loginTs + THIRTY_DAYS_MS - Date.now()) / (1000 * 60 * 60 * 24),
      );
      if (daysLeft <= 5 && daysLeft >= 0) {
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

// ─── Main app component (inside RouterProvider) ─────────────────────────────

function AppMain() {
  const ADMIN_MOBILE = atob("ODIwOTkxODQ5MQ==");

  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const { identity, isInitializing } = useInternetIdentity();
  const { isLoading: profileLoading } = useCallerUserProfile();
  const { data: isAdminBackend = false } = useIsAdmin();

  let storedMobile = "";
  try {
    const rawMobile = localStorage.getItem("medsim_login_mobile");
    const rawTimestamp = localStorage.getItem("medsim_login_timestamp");
    if (rawMobile && !rawTimestamp) {
      localStorage.removeItem("medsim_login_mobile");
    } else {
      storedMobile = rawMobile ?? "";
    }
  } catch {
    localStorage.removeItem("medsim_login_mobile");
    localStorage.removeItem("medsim_login_timestamp");
  }
  const isAdmin = isAdminBackend || storedMobile === ADMIN_MOBILE;

  const currentPage: AppPage = pathToPage[currentPath] ?? "home";

  const [appState, setAppState] = useState<AppState>("loading");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const lastPageRestoredRef = useRef(false);

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
    setAppState("app");
  }, [isInitializing, identity, profileLoading]);

  useEffect(() => {
    if (!isInitializing && !identity && isLoginWithin30Days()) {
      const timer = setTimeout(() => {
        if (!identity) setAppState("login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isInitializing, identity]);

  // Restore last visited page on app load
  useEffect(() => {
    if (appState === "app" && !lastPageRestoredRef.current) {
      lastPageRestoredRef.current = true;
      const lastPage = localStorage.getItem("medsim_last_page");
      if (lastPage && lastPage !== "/" && lastPage !== currentPath) {
        navigate({ to: lastPage as string, replace: true });
      }
    }
  }, [appState, navigate, currentPath]);

  const handleNavigate = (page: string) => {
    if (page === "admin" && !isAdmin) {
      toast.error("Access denied. Admin credentials required.");
      return;
    }
    const path = pageToPath[page] ?? "/";
    navigate({ to: path as string });
    if (path !== "/") {
      localStorage.setItem("medsim_last_page", path);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("medsim_login_timestamp", Date.now().toString());
    setTimeout(() => {
      setAppState("app");
      const hasName = !!localStorage.getItem("medsim_saved_name");
      const onboardingDone = localStorage.getItem("medsim_onboarding_done");
      if (!hasName && !onboardingDone) {
        setShowOnboarding(true);
      }
    }, 800);
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
    "drug-reference": <DrugReferencePage />,
  };

  if (appState === "loading") return <MedicalSpinner />;

  if (appState === "login") {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    );
  }

  if (showOnboarding) {
    return (
      <>
        <OnboardingPage
          onComplete={() => {
            localStorage.setItem("medsim_onboarding_done", "1");
            setShowOnboarding(false);
            navigate({ to: "/profile" as string });
          }}
        />
        <Toaster />
      </>
    );
  }

  return (
    <AppWithSeed
      currentPage={currentPage}
      handleNavigate={handleNavigate}
      handleGoBack={handleGoBack}
      canGoBack={currentPage !== "home"}
      isAdmin={isAdmin}
    >
      {pageContent[currentPage]}
    </AppWithSeed>
  );
}

// ─── Router setup ────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: AppMain });

const makeRoute = (path: string) =>
  createRoute({ getParentRoute: () => rootRoute, path });

const routeTree = rootRoute.addChildren([
  makeRoute("/"),
  makeRoute("/exercise"),
  makeRoute("/neet-pg"),
  makeRoute("/custom-patient"),
  makeRoute("/performance"),
  makeRoute("/admin"),
  makeRoute("/profile"),
  makeRoute("/ai-assistant"),
  makeRoute("/career"),
  makeRoute("/exam"),
  makeRoute("/my-applications"),
  makeRoute("/icu-simulator"),
  makeRoute("/er-simulation"),
  makeRoute("/leaderboard"),
  makeRoute("/verify"),
  makeRoute("/share-app"),
  makeRoute("/drug-reference"),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
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
  return <RouterProvider router={router} />;
}
