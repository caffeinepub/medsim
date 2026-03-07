import { Button } from "@/components/ui/button";
import { Camera, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ProfileIncompleteBannerProps {
  profileScore: number;
  onNavigateToProfile: () => void;
}

export function ProfileIncompleteBanner({
  profileScore,
  onNavigateToProfile,
}: ProfileIncompleteBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const cameraGranted =
    localStorage.getItem("medsim_camera_granted") === "true";

  // Show only if profile incomplete
  if (profileScore >= 100 || dismissed) return null;

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      for (const track of stream.getTracks()) track.stop();
      localStorage.setItem("medsim_camera_granted", "true");
      window.location.reload();
    } catch {
      localStorage.setItem("medsim_camera_granted", "false");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="banner.incomplete_profile_panel"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-30 flex items-center justify-between gap-3 px-4 py-2.5"
        style={{
          background: "rgba(255, 184, 0, 0.12)",
          borderBottom: "1px solid rgba(255, 184, 0, 0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 184, 0, 0.2)",
              border: "1px solid rgba(255, 184, 0, 0.4)",
            }}
          >
            <span className="text-xs font-bold" style={{ color: "#ffb800" }}>
              {profileScore}%
            </span>
          </div>
          <p
            className="text-xs font-medium truncate"
            style={{ color: "rgba(255, 220, 100, 0.9)" }}
          >
            Aapka profile{" "}
            <strong style={{ color: "#ffb800" }}>
              {profileScore}% complete
            </strong>{" "}
            hai. {!cameraGranted && "Camera allow karein aur "}
            baaki details fill karein.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!cameraGranted && (
            <Button
              data-ocid="banner.allow_camera_button"
              size="sm"
              onClick={requestCamera}
              className="h-7 gap-1.5 rounded-lg border-0 px-2.5 text-xs font-semibold"
              style={{
                background: "rgba(255, 184, 0, 0.2)",
                border: "1px solid rgba(255, 184, 0, 0.4)",
                color: "#ffb800",
              }}
            >
              <Camera className="h-3 w-3" />
              Allow Camera
            </Button>
          )}
          <Button
            data-ocid="banner.complete_profile_button"
            size="sm"
            onClick={onNavigateToProfile}
            className="h-7 gap-1 rounded-lg border-0 px-2.5 text-xs font-semibold"
            style={{
              background: "rgba(0, 212, 255, 0.15)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              color: "#00d4ff",
            }}
          >
            Complete Profile
            <ChevronRight className="h-3 w-3" />
          </Button>
          <button
            type="button"
            data-ocid="banner.dismiss_button"
            onClick={() => setDismissed(true)}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-all hover:bg-white/10"
            style={{ color: "rgba(255, 220, 100, 0.5)" }}
            aria-label="Dismiss banner"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
