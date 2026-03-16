import { AlertTriangle, Eye, Shield } from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLogSecurityEvent } from "../hooks/useQueries";

interface SecuritySystemProps {
  enabled?: boolean;
}

export function SecuritySystem({ enabled = true }: SecuritySystemProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [showPrintWarning, setShowPrintWarning] = useState(false);
  const { identity } = useInternetIdentity();
  const logEvent = useLogSecurityEvent();

  const logEventRef = useRef(logEvent);
  useEffect(() => {
    logEventRef.current = logEvent;
  });
  const logSecurityEvent = useCallback(
    (eventType: string, details: string) => {
      const studentId = identity?.getPrincipal().toString();
      logEventRef.current.mutate({
        id: crypto.randomUUID(),
        eventType,
        details,
        studentId,
        status: "active",
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
    },
    [identity],
  );

  useEffect(() => {
    if (!enabled) return;

    // Context menu block
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      logSecurityEvent("context_menu", "Right-click attempt detected");
    };

    // Visibility change (tab switch / minimize)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsHidden(true);
        logSecurityEvent("tab_hidden", "Student switched away from app");
      } else {
        setIsHidden(false);
      }
    };

    // Print screen detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setShowPrintWarning(true);
        logSecurityEvent("screenshot_attempt", "PrintScreen key detected");
        setTimeout(() => setShowPrintWarning(false), 3000);
        e.preventDefault();
      }

      // Block common screenshot combos
      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "p" || e.key === "s" || e.key === "u")
      ) {
        e.preventDefault();
        logSecurityEvent(
          "keyboard_shortcut",
          `Blocked shortcut: ${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key}`,
        );
      }
    };

    // Developer tools detection via window resize
    const handleResize = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        logSecurityEvent("devtools_open", "Possible developer tools detected");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, logSecurityEvent]);

  if (!enabled) return null;

  return (
    <>
      {/* Tab hidden overlay */}
      {isHidden && (
        <div className="security-blur-overlay">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-white/10 p-6">
              <Eye className="h-12 w-12 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              App Chhod Diya?
            </h2>
            <p className="max-w-xs text-white/80">
              Exam continue karne ke liye app par wapas aaen.
              <br />
              Tab switching noted kar di gayi hai.
            </p>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              <Shield className="h-4 w-4" />
              Security System Active
            </div>
          </div>
        </div>
      )}

      {/* Print screen warning */}
      {showPrintWarning && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/90 px-5 py-3 text-white shadow-lg animate-slide-up">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Screenshot Attempt Detected!</p>
            <p className="text-sm text-white/80">
              Yeh action recorded ho gaya hai.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SecuritySystem;
