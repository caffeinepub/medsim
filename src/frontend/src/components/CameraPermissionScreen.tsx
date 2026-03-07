import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CameraPermissionScreenProps {
  onComplete: () => void;
}

export function CameraPermissionScreen({
  onComplete,
}: CameraPermissionScreenProps) {
  const [status, setStatus] = useState<
    "idle" | "requesting" | "granted" | "denied"
  >("idle");

  const requestCamera = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately — we just needed permission
      for (const track of stream.getTracks()) track.stop();
      localStorage.setItem("medsim_camera_granted", "true");
      localStorage.setItem("medsim_camera_permission_asked", "true");
      setStatus("granted");
      setTimeout(onComplete, 1200);
    } catch {
      localStorage.setItem("medsim_camera_granted", "false");
      localStorage.setItem("medsim_camera_permission_asked", "true");
      setStatus("denied");
      setTimeout(onComplete, 1500);
    }
  };

  const skipForNow = () => {
    localStorage.setItem("medsim_camera_granted", "false");
    localStorage.setItem("medsim_camera_permission_asked", "true");
    onComplete();
  };

  return (
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
          {/* Animated camera icon */}
          <motion.div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "2px solid rgba(0,212,255,0.3)",
            }}
            animate={
              status === "idle"
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(0,212,255,0)",
                      "0 0 0 16px rgba(0,212,255,0.08)",
                      "0 0 0 0 rgba(0,212,255,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {status === "granted" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle
                  className="h-12 w-12"
                  style={{ color: "#00e676" }}
                />
              </motion.div>
            ) : status === "denied" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <XCircle className="h-12 w-12" style={{ color: "#ff3355" }} />
              </motion.div>
            ) : (
              <Camera className="h-12 w-12" style={{ color: "#00d4ff" }} />
            )}
          </motion.div>

          {/* Title */}
          <h1
            className="mb-3 font-display text-2xl font-black"
            style={{ color: "#e8f4ff" }}
          >
            {status === "granted"
              ? "Camera Access Granted!"
              : status === "denied"
                ? "Camera Access Denied"
                : "Camera Access Required"}
          </h1>

          {/* Description */}
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "rgba(150, 200, 255, 0.7)" }}
          >
            {status === "granted" ? (
              "Bahut accha! Aapka profile photo ab live camera se capture hoga."
            ) : status === "denied" ? (
              <span>
                Camera access nahi mili.{" "}
                <span style={{ color: "#ffb800" }}>
                  Profile incomplete rahegi.
                </span>{" "}
                Baad mein Profile page se camera allow kar sakte hain.
              </span>
            ) : (
              "MedSim ko aapki profile photo ke liye camera access chahiye. Apni identity verify karne ke liye camera allow karein."
            )}
          </p>

          {/* Buttons */}
          {status === "idle" && (
            <div className="space-y-3">
              <Button
                data-ocid="camera_permission.allow_button"
                onClick={requestCamera}
                className="h-12 w-full gap-3 rounded-xl border-0 font-bold text-base"
                style={{
                  background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                  color: "#000",
                  boxShadow: "0 4px 24px rgba(0, 212, 255, 0.4)",
                }}
              >
                <Camera className="h-5 w-5" />
                Allow Camera
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

          {status === "requesting" && (
            <div className="flex items-center justify-center gap-3">
              <div
                className="h-5 w-5 animate-spin rounded-full"
                style={{
                  border: "2px solid rgba(0,212,255,0.2)",
                  borderTopColor: "#00d4ff",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "rgba(150, 200, 255, 0.7)" }}
              >
                Camera permission maang rahe hain...
              </span>
            </div>
          )}

          {/* Mandatory notice */}
          {status === "idle" && (
            <p
              className="mt-4 text-center text-xs"
              style={{ color: "rgba(255, 184, 0, 0.5)" }}
            >
              ⚠️ Profile score ke liye camera permission zaroori hai
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
