import { Button } from "@/components/ui/button";
import {
  Camera,
  CheckCircle,
  MapPin,
  RefreshCw,
  Settings,
  Shield,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

interface PermissionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  permissionType: "camera" | "location" | "both";
}

type BrowserType = "chrome" | "safari" | "firefox" | "edge" | "other";

function detectBrowser(): BrowserType {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("edg/")) return "edge";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("chrome")) return "chrome";
  return "other";
}

interface BrowserGuide {
  name: string;
  steps: string[];
  icon: string;
}

function getGuide(
  browser: BrowserType,
  permission: "camera" | "location" | "both",
): BrowserGuide {
  const permLabel =
    permission === "both"
      ? "Camera aur Location"
      : permission === "camera"
        ? "Camera"
        : "Location";

  const guides: Record<BrowserType, BrowserGuide> = {
    chrome: {
      name: "Google Chrome",
      icon: "🌐",
      steps: [
        "Address bar mein 🔒 (lock icon) par click karein",
        `"Site Settings" ya "${permLabel}" option dhundein`,
        "'Allow' select karein",
        "Page ko refresh karein (F5 ya reload button)",
      ],
    },
    safari: {
      name: "Safari",
      icon: "🧭",
      steps: [
        `iPhone: Settings → Safari → ${permLabel} → Allow`,
        `Ya phir address bar ke baaye side "AA" icon tap karein`,
        `"Website Settings" select karein`,
        `${permLabel} ko "Allow" par set karein`,
      ],
    },
    firefox: {
      name: "Mozilla Firefox",
      icon: "🦊",
      steps: [
        "Address bar mein shield / lock icon par click karein",
        `"Permissions" ya "${permLabel}" section dhundein`,
        "'Allow' ya '+' par click karein",
        "Page reload karein",
      ],
    },
    edge: {
      name: "Microsoft Edge",
      icon: "🌊",
      steps: [
        "Address bar mein lock icon par click karein",
        "'Permissions for this site' select karein",
        `${permLabel} ko "Allow" par toggle karein`,
        "Page refresh karein",
      ],
    },
    other: {
      name: "Aapka Browser",
      icon: "🖥️",
      steps: [
        "Browser ke address bar mein lock ya settings icon dhundein",
        "'Site permissions' ya 'Site settings' open karein",
        `${permLabel} ko "Allow" karein`,
        "Page reload karein aur dobara try karein",
      ],
    },
  };
  return guides[browser];
}

export function PermissionGuideModal({
  isOpen,
  onClose,
  onRetry,
  permissionType,
}: PermissionGuideModalProps) {
  const browser = useMemo(() => detectBrowser(), []);
  const guide = useMemo(
    () => getGuide(browser, permissionType),
    [browser, permissionType],
  );

  const permLabel =
    permissionType === "both"
      ? "Camera & Location"
      : permissionType === "camera"
        ? "Camera"
        : "Location";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{
              background: "rgba(3,10,28,0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="permission_guide.dialog"
            className="fixed inset-x-4 top-1/2 z-[70] max-w-md mx-auto -translate-y-1/2"
            style={{
              background:
                "linear-gradient(145deg, rgba(5,15,40,0.98) 0%, rgba(8,20,50,0.98) 100%)",
              border: "1.5px solid rgba(0,212,255,0.3)",
              borderRadius: "1.5rem",
              boxShadow:
                "0 0 60px rgba(0,212,255,0.15), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Top glow bar */}
            <div
              className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,212,255,0.7), transparent)",
              }}
            />

            <div className="p-6">
              {/* Header */}
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(255,51,85,0.15)",
                      border: "1px solid rgba(255,51,85,0.3)",
                    }}
                  >
                    <Shield className="h-5 w-5" style={{ color: "#ff3355" }} />
                  </div>
                  <div>
                    <h2
                      className="font-display text-lg font-black"
                      style={{ color: "#e8f4ff" }}
                    >
                      Permission Denied
                    </h2>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.6)" }}
                    >
                      {permLabel} access nahi mili
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="permission_guide.close_button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: "rgba(150,200,255,0.5)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Permission icons */}
              <div className="mb-5 flex items-center justify-center gap-4">
                {(permissionType === "camera" || permissionType === "both") && (
                  <div
                    className="flex flex-col items-center gap-1.5 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,51,85,0.1)",
                      border: "1px solid rgba(255,51,85,0.2)",
                    }}
                  >
                    <Camera className="h-6 w-6" style={{ color: "#ff3355" }} />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#ff3355" }}
                    >
                      Camera
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Blocked
                    </span>
                  </div>
                )}
                {(permissionType === "location" ||
                  permissionType === "both") && (
                  <div
                    className="flex flex-col items-center gap-1.5 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,51,85,0.1)",
                      border: "1px solid rgba(255,51,85,0.2)",
                    }}
                  >
                    <MapPin className="h-6 w-6" style={{ color: "#ff3355" }} />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#ff3355" }}
                    >
                      Location
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Blocked
                    </span>
                  </div>
                )}
              </div>

              {/* Location reason explanation */}
              {(permissionType === "location" || permissionType === "both") && (
                <div
                  className="mb-4 flex items-start gap-3 rounded-xl p-3"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.18)",
                  }}
                >
                  <MapPin
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: "#00d4ff" }}
                  />
                  <div>
                    <p
                      className="text-xs font-bold mb-0.5"
                      style={{ color: "#00d4ff" }}
                    >
                      Location kyun zaruri hai?
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(200,230,255,0.75)" }}
                    >
                      Location ka use aapke region ke hisab se nearby hospitals,
                      exam centers, aur career opportunities dikhane ke liye
                      hota hai — taaki aapko sabse relevant opportunities
                      milein.
                    </p>
                  </div>
                </div>
              )}

              {/* Browser guide */}
              <div
                className="mb-5 rounded-xl p-4"
                style={{
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.12)",
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">{guide.icon}</span>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#00d4ff" }}
                    >
                      {guide.name} mein enable karein
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(150,200,255,0.5)" }}
                    >
                      Step-by-step guide
                    </p>
                  </div>
                  <Settings
                    className="ml-auto h-4 w-4"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  />
                </div>

                <ol className="space-y-2.5">
                  {guide.steps.map((step, index) => {
                    const stepKey = `step-${index}`;
                    return (
                      <li key={stepKey} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                          style={{
                            background: "rgba(0,212,255,0.15)",
                            border: "1px solid rgba(0,212,255,0.3)",
                            color: "#00d4ff",
                          }}
                        >
                          {index + 1}
                        </span>
                        <span
                          className="text-sm leading-snug"
                          style={{ color: "rgba(220,240,255,0.85)" }}
                        >
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Success tip */}
              <div
                className="mb-5 flex items-start gap-3 rounded-xl p-3"
                style={{
                  background: "rgba(0,230,118,0.06)",
                  border: "1px solid rgba(0,230,118,0.15)",
                }}
              >
                <CheckCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: "#00e676" }}
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(200,255,230,0.75)" }}
                >
                  Steps follow karne ke baad neeche{" "}
                  <strong style={{ color: "#00e676" }}>
                    "Retry Permissions"
                  </strong>{" "}
                  button dabayein — permissions automatically detect ho jayengi.
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <Button
                  data-ocid="permission_guide.confirm_button"
                  onClick={() => {
                    onClose();
                    onRetry();
                  }}
                  className="h-12 w-full gap-2 rounded-xl border-0 font-bold"
                  style={{
                    background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                    color: "#000",
                    boxShadow: "0 4px 20px rgba(0,212,255,0.35)",
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Permissions
                </Button>
                <Button
                  data-ocid="permission_guide.cancel_button"
                  variant="ghost"
                  onClick={onClose}
                  className="h-10 w-full rounded-xl text-sm"
                  style={{
                    color: "rgba(150,200,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Continue Anyway (Profile Incomplete Rahega)
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PermissionGuideModal;
