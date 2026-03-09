import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, MapPin, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PermissionGuideModal } from "./PermissionGuideModal";

interface CameraPermissionScreenProps {
  onComplete: () => void;
}

type PermStatus = "idle" | "requesting" | "granted" | "denied";

export function CameraPermissionScreen({
  onComplete,
}: CameraPermissionScreenProps) {
  const [cameraStatus, setCameraStatus] = useState<PermStatus>("idle");
  const [locationStatus, setLocationStatus] = useState<PermStatus>("idle");
  const [showGuide, setShowGuide] = useState(false);
  const [deniedType, setDeniedType] = useState<"camera" | "location" | "both">(
    "both",
  );

  const requestPermissions = async () => {
    setCameraStatus("requesting");
    setLocationStatus("requesting");

    let camGranted = false;
    let locGranted = false;

    // Request camera
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      for (const track of stream.getTracks()) track.stop();
      localStorage.setItem("medsim_camera_granted", "true");
      camGranted = true;
      setCameraStatus("granted");
    } catch {
      localStorage.setItem("medsim_camera_granted", "false");
      setCameraStatus("denied");
    }

    // Request location
    try {
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 8000,
        });
      });
      localStorage.setItem("medsim_location_granted", "true");
      locGranted = true;
      setLocationStatus("granted");
    } catch {
      localStorage.setItem("medsim_location_granted", "false");
      setLocationStatus("denied");
    }

    localStorage.setItem("medsim_camera_permission_asked", "true");

    if (!camGranted || !locGranted) {
      // Show self-healing guide
      const denied =
        !camGranted && !locGranted
          ? "both"
          : !camGranted
            ? "camera"
            : "location";
      setDeniedType(denied);
      setShowGuide(true);
    } else {
      // Both granted — proceed after short delay
      setTimeout(onComplete, 1000);
    }
  };

  const skipForNow = () => {
    localStorage.setItem("medsim_camera_granted", "false");
    localStorage.setItem("medsim_location_granted", "false");
    localStorage.setItem("medsim_camera_permission_asked", "true");
    onComplete();
  };

  const handleRetry = () => {
    setCameraStatus("idle");
    setLocationStatus("idle");
    requestPermissions();
  };

  const handleContinueAnyway = () => {
    localStorage.setItem("medsim_camera_permission_asked", "true");
    onComplete();
  };

  const overallStatus =
    cameraStatus === "granted" && locationStatus === "granted"
      ? "granted"
      : cameraStatus === "denied" || locationStatus === "denied"
        ? "denied"
        : cameraStatus === "requesting" || locationStatus === "requesting"
          ? "requesting"
          : "idle";

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,40,80,0.9) 0%, #030a1c 70%)",
        }}
      >
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-md"
          style={{
            background: "rgba(5, 15, 40, 0.95)",
            border: "1.5px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "1.5rem",
            boxShadow:
              "0 0 60px rgba(0, 212, 255, 0.15), 0 0 120px rgba(0, 212, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top glow bar */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
            }}
          />

          <div className="p-8 text-center">
            {/* Animated icons */}
            <div className="mx-auto mb-6 flex items-center justify-center gap-4">
              {/* Camera icon */}
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    cameraStatus === "granted"
                      ? "rgba(0,230,118,0.12)"
                      : cameraStatus === "denied"
                        ? "rgba(255,51,85,0.12)"
                        : "rgba(0,212,255,0.08)",
                  border:
                    cameraStatus === "granted"
                      ? "2px solid rgba(0,230,118,0.4)"
                      : cameraStatus === "denied"
                        ? "2px solid rgba(255,51,85,0.4)"
                        : "2px solid rgba(0,212,255,0.3)",
                }}
                animate={
                  overallStatus === "idle"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(0,212,255,0)",
                          "0 0 0 12px rgba(0,212,255,0.07)",
                          "0 0 0 0 rgba(0,212,255,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {cameraStatus === "granted" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle
                      className="h-10 w-10"
                      style={{ color: "#00e676" }}
                    />
                  </motion.div>
                ) : cameraStatus === "denied" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <XCircle
                      className="h-10 w-10"
                      style={{ color: "#ff3355" }}
                    />
                  </motion.div>
                ) : (
                  <Camera className="h-10 w-10" style={{ color: "#00d4ff" }} />
                )}
              </motion.div>

              {/* Location icon */}
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    locationStatus === "granted"
                      ? "rgba(0,230,118,0.12)"
                      : locationStatus === "denied"
                        ? "rgba(255,51,85,0.12)"
                        : "rgba(0,212,255,0.08)",
                  border:
                    locationStatus === "granted"
                      ? "2px solid rgba(0,230,118,0.4)"
                      : locationStatus === "denied"
                        ? "2px solid rgba(255,51,85,0.4)"
                        : "2px solid rgba(0,212,255,0.3)",
                }}
                animate={
                  overallStatus === "idle"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(0,212,255,0)",
                          "0 0 0 12px rgba(0,212,255,0.07)",
                          "0 0 0 0 rgba(0,212,255,0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.3,
                }}
              >
                {locationStatus === "granted" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle
                      className="h-10 w-10"
                      style={{ color: "#00e676" }}
                    />
                  </motion.div>
                ) : locationStatus === "denied" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <XCircle
                      className="h-10 w-10"
                      style={{ color: "#ff3355" }}
                    />
                  </motion.div>
                ) : (
                  <MapPin className="h-10 w-10" style={{ color: "#00d4ff" }} />
                )}
              </motion.div>
            </div>

            {/* Labels row */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <span
                className="text-xs font-semibold"
                style={{
                  color:
                    cameraStatus === "granted"
                      ? "#00e676"
                      : cameraStatus === "denied"
                        ? "#ff3355"
                        : "rgba(150,200,255,0.7)",
                }}
              >
                📷 Camera
              </span>
              <span
                className="text-xs font-semibold"
                style={{
                  color:
                    locationStatus === "granted"
                      ? "#00e676"
                      : locationStatus === "denied"
                        ? "#ff3355"
                        : "rgba(150,200,255,0.7)",
                }}
              >
                📍 Location
              </span>
            </div>

            {/* Title */}
            <h1
              className="mb-3 font-display text-2xl font-black"
              style={{ color: "#e8f4ff" }}
            >
              {overallStatus === "granted"
                ? "Permissions Granted! ✅"
                : overallStatus === "denied"
                  ? "Permission Denied"
                  : "Hardware Access Required"}
            </h1>

            {/* Description */}
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: "rgba(150, 200, 255, 0.7)" }}
            >
              {overallStatus === "granted" ? (
                "Bahut accha! Camera aur Location access mil gayi. MedSim ab poori tarah kaam karega."
              ) : overallStatus === "denied" ? (
                <span>
                  Kuch permissions nahi mili.{" "}
                  <span style={{ color: "#ffb800" }}>
                    Neeche ka guide follow karein.
                  </span>
                </span>
              ) : (
                "MedSim ko profile photo (Camera) aur hospital location tracking (Location) ke liye permissions chahiye."
              )}
            </p>

            {/* Buttons */}
            {overallStatus === "idle" && (
              <div className="space-y-3">
                <Button
                  data-ocid="camera_permission.allow_button"
                  onClick={requestPermissions}
                  className="h-12 w-full gap-3 rounded-xl border-0 font-bold text-base"
                  style={{
                    background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                    color: "#000",
                    boxShadow: "0 4px 24px rgba(0, 212, 255, 0.4)",
                  }}
                >
                  <Camera className="h-5 w-5" />
                  Allow Camera & Location
                </Button>

                <Button
                  data-ocid="camera_permission.skip_button"
                  variant="ghost"
                  onClick={skipForNow}
                  className="h-10 w-full rounded-xl text-sm font-medium"
                  style={{
                    color: "rgba(150, 200, 255, 0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Skip for Now
                </Button>
              </div>
            )}

            {overallStatus === "requesting" && (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="h-6 w-6 animate-spin rounded-full"
                  style={{
                    border: "2px solid rgba(0,212,255,0.2)",
                    borderTopColor: "#00d4ff",
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: "rgba(150, 200, 255, 0.7)" }}
                >
                  Permissions maang rahe hain...
                </span>
              </div>
            )}

            {overallStatus === "denied" && (
              <div className="space-y-3">
                <Button
                  data-ocid="camera_permission.retry_button"
                  onClick={() => setShowGuide(true)}
                  className="h-12 w-full gap-2 rounded-xl border-0 font-bold"
                  style={{
                    background: "linear-gradient(135deg, #cc0022, #ff3355)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(255,51,85,0.3)",
                  }}
                >
                  How to Enable? (Guide)
                </Button>
                <Button
                  data-ocid="camera_permission.continue_button"
                  variant="ghost"
                  onClick={handleContinueAnyway}
                  className="h-10 w-full rounded-xl text-sm"
                  style={{
                    color: "rgba(150, 200, 255, 0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Continue Anyway
                </Button>
              </div>
            )}

            {/* Mandatory notice */}
            {overallStatus === "idle" && (
              <p
                className="mt-4 text-center text-xs"
                style={{ color: "rgba(255, 184, 0, 0.5)" }}
              >
                ⚠️ Profile score ke liye permissions zaroori hain
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Self-healing guide modal */}
      <PermissionGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        onRetry={handleRetry}
        permissionType={deniedType}
      />
    </>
  );
}

export default CameraPermissionScreen;
