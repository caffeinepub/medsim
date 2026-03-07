import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Shield,
  Stethoscope,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerUserProfile,
  useUnresolvedAdminAlerts,
} from "../hooks/useQueries";

type Page =
  | "home"
  | "exercise"
  | "custom-patient"
  | "performance"
  | "admin"
  | "profile"
  | "ai-assistant"
  | "career"
  | "exam"
  | "my-applications"
  | "icu-simulator"
  | "verify";

interface AppLayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isAdmin: boolean;
  children: React.ReactNode;
  banner?: React.ReactNode;
}

interface NavItem {
  id: Page;
  label: string;
  hinglish: string;
  icon: React.FC<{ className?: string }>;
  adminOnly?: boolean;
}

// Back button: top-right fixed, shown on non-home pages
function BackButton({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}) {
  if (currentPage === "home") return null;

  return (
    <button
      type="button"
      data-ocid="nav.back_button"
      onClick={() => onNavigate("home")}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: "oklch(0.22 0.06 235 / 0.85)",
        border: "1px solid oklch(0.65 0.16 196 / 0.4)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 16px oklch(0.65 0.16 196 / 0.2), 0 2px 8px oklch(0.1 0.03 235 / 0.6)",
        color: "oklch(0.65 0.16 196)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "oklch(0.65 0.16 196 / 0.2)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 24px oklch(0.65 0.16 196 / 0.4), 0 2px 12px oklch(0.1 0.03 235 / 0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "oklch(0.22 0.06 235 / 0.85)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 16px oklch(0.65 0.16 196 / 0.2), 0 2px 8px oklch(0.1 0.03 235 / 0.6)";
      }}
      title="Back to Home"
      aria-label="Go back to home"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}

const navItems: NavItem[] = [
  {
    id: "profile",
    label: "My Profile",
    hinglish: "Mera Profile",
    icon: User,
  },
  { id: "home", label: "Home", hinglish: "Ghar", icon: Home },
  {
    id: "exercise",
    label: "Exercise Mode",
    hinglish: "Practice Karo",
    icon: BookOpen,
  },
  {
    id: "icu-simulator" as Page,
    label: "ICU Simulator",
    hinglish: "ICU Practice",
    icon: Activity,
  },
  {
    id: "custom-patient",
    label: "Custom Patient",
    hinglish: "Apna Patient",
    icon: Users,
  },
  {
    id: "performance",
    label: "Performance",
    hinglish: "Results Dekho",
    icon: BarChart3,
  },
  {
    id: "career",
    label: "Career",
    hinglish: "Naukri Dekho",
    icon: Briefcase,
  },
  {
    id: "my-applications",
    label: "My Applications",
    hinglish: "Meri Apply",
    icon: ClipboardList,
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    hinglish: "AI Sahayta",
    icon: Brain,
  },
  {
    id: "admin",
    label: "Admin Panel",
    hinglish: "Admin",
    icon: Shield,
    adminOnly: true,
  },
];

export function AppLayout({
  currentPage,
  onNavigate,
  isAdmin,
  children,
  banner,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear } = useInternetIdentity();
  const { data: profile } = useCallerUserProfile();
  const { data: alerts = [] } = useUnresolvedAdminAlerts();

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);
  const unreadAlerts = alerts.length;

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div
      className="flex h-full flex-col"
      style={{ color: "oklch(0.92 0.015 215)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "oklch(0.65 0.16 196 / 0.2)" }}
        >
          <Stethoscope
            className="h-6 w-6"
            style={{ color: "oklch(0.65 0.16 196)" }}
          />
        </div>
        <div>
          <p
            className="font-display text-lg font-black"
            style={{ color: "oklch(0.92 0.015 215)" }}
          >
            MedSim
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(0.92 0.015 215 / 0.5)" }}
          >
            v2.0 — India
          </p>
        </div>
      </div>

      {/* Student info */}
      {profile && (
        <button
          type="button"
          onClick={() => handleNavigate("profile")}
          className="mx-3 mb-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors"
          style={{ backgroundColor: "oklch(0.25 0.055 230)" }}
        >
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
            style={{
              backgroundColor: "oklch(0.65 0.16 196 / 0.3)",
              color: "oklch(0.65 0.16 196)",
            }}
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold"
              style={{ color: "oklch(0.92 0.015 215)" }}
            >
              {profile.name}
            </p>
            <p
              className="truncate text-xs capitalize"
              style={{ color: "oklch(0.92 0.015 215 / 0.6)" }}
            >
              {profile.role}
            </p>
          </div>
          <ChevronRight
            className="h-4 w-4"
            style={{ color: "oklch(0.92 0.015 215 / 0.4)" }}
          />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const hasAlert = item.id === "admin" && unreadAlerts > 0;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              data-ocid={item.id === "profile" ? "nav.profile_link" : undefined}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: "oklch(0.65 0.16 196)",
                      color: "oklch(0.99 0 0)",
                    }
                  : { color: "oklch(0.92 0.015 215 / 0.85)" }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "oklch(0.25 0.055 230)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "transparent";
                }
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-base">{item.label}</span>
              <span className="text-xs opacity-60">{item.hinglish}</span>
              {hasAlert && (
                <Badge
                  variant="destructive"
                  className="h-5 min-w-5 px-1 text-xs"
                >
                  {unreadAlerts}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI assistant indicator — clickable */}
      <button
        type="button"
        data-ocid="nav.ai_assistant_link"
        onClick={() => handleNavigate("ai-assistant")}
        className="mx-3 mb-3 flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors"
        style={{
          backgroundColor:
            currentPage === "ai-assistant"
              ? "oklch(0.65 0.16 196 / 0.15)"
              : "oklch(0.25 0.055 230 / 0.5)",
          border:
            currentPage === "ai-assistant"
              ? "1px solid oklch(0.65 0.16 196 / 0.4)"
              : "1px solid transparent",
        }}
      >
        <Brain className="h-4 w-4" style={{ color: "oklch(0.65 0.16 196)" }} />
        <span
          className="flex-1 text-xs font-medium"
          style={{ color: "oklch(0.92 0.015 215 / 0.7)" }}
        >
          AI Assistant Ready
        </span>
        <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
      </button>

      {/* Logout */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid oklch(0.28 0.05 235)" }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          className="w-full justify-start gap-2"
          style={{ color: "oklch(0.92 0.015 215 / 0.6)" }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className="hidden w-64 flex-shrink-0 overflow-y-auto border-r border-sidebar-border lg:block"
        style={{ backgroundColor: "oklch(var(--sidebar))" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r lg:hidden"
              style={{
                backgroundColor: "oklch(0.18 0.05 235)",
                borderColor: "oklch(0.28 0.05 235)",
                color: "oklch(0.92 0.015 215)",
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header
          className="flex items-center justify-between border-b px-4 py-3 lg:hidden"
          style={{
            background: "oklch(0.18 0.05 235)",
            borderColor: "oklch(0.28 0.05 235)",
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ color: "oklch(0.88 0.015 215)" }}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <Stethoscope
              className="h-5 w-5"
              style={{ color: "oklch(0.65 0.16 196)" }}
            />
            <span
              className="font-display font-bold"
              style={{ color: "oklch(0.92 0.015 215)" }}
            >
              MedSim
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleNavigate("profile")}
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ color: "oklch(0.88 0.015 215)" }}
          >
            {unreadAlerts > 0 ? (
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-white">
                  {unreadAlerts}
                </span>
              </div>
            ) : (
              <UserCircle className="h-5 w-5" />
            )}
          </button>
        </header>

        {/* Profile incomplete banner */}
        {banner}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Back navigation button — top-right, visible on non-home pages */}
      <BackButton currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

export default AppLayout;
