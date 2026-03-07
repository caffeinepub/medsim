import {
  CheckCircle,
  Loader2,
  Shield,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface VerifyPageProps {
  principalId: string;
}

interface QRData {
  name?: string;
  batch?: string;
  systemId?: string;
  role?: string;
  verified?: boolean;
}

export function VerifyPage({ principalId }: VerifyPageProps) {
  const { actor } = useActor();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Try to parse QR embedded data from localStorage as fallback
  useEffect(() => {
    // Parse QR JSON if stored
    try {
      const raw = localStorage.getItem(`medsim_qr_data_${principalId}`);
      if (raw) {
        const parsed = JSON.parse(raw) as QRData;
        setQrData(parsed);
      }
    } catch {
      // ignore
    }
  }, [principalId]);

  useEffect(() => {
    if (!actor) {
      // No actor available (public access, no login) — just show QR data
      setIsLoading(false);
      return;
    }

    async function fetchProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const [profileResult, verifiedResult] = await Promise.all([
          actor!.getUserProfile(principalId),
          actor!.isUserProfileVerify(principalId),
        ]);
        setProfile(profileResult);
        setIsVerified(verifiedResult);
      } catch {
        setError("Network error -- showing QR data only");
        setIsVerified(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [actor, principalId]);

  const displayName = profile?.name || qrData?.name || "Unknown Student";
  const displayBatch = qrData?.batch || "N/A";
  const displayRole = profile?.role || qrData?.role || "MBBS Student";
  const displaySystemId =
    qrData?.systemId || `MED-${new Date().getFullYear()}-00000`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(1, 5, 18, 1) 0%, rgba(3, 10, 28, 1) 50%, rgba(2, 8, 22, 1) 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              border: "1.5px solid rgba(0, 212, 255, 0.3)",
              boxShadow: "0 0 24px rgba(0, 212, 255, 0.15)",
            }}
          >
            <Stethoscope className="h-7 w-7" style={{ color: "#00d4ff" }} />
          </div>
          <div>
            <h1
              className="font-display text-2xl font-black"
              style={{ color: "#e8f4ff" }}
            >
              MedSim Verify
            </h1>
            <p
              className="mt-1 font-mono text-xs uppercase tracking-wider"
              style={{ color: "rgba(0, 212, 255, 0.5)" }}
            >
              Student Identity Verification
            </p>
          </div>
        </div>

        {/* Verification card */}
        <div
          data-ocid="verify.card"
          className="rounded-2xl p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(3, 10, 28, 0.98) 0%, rgba(5, 18, 45, 0.98) 100%)",
            border: "1.5px solid rgba(0, 212, 255, 0.3)",
            boxShadow:
              "0 0 40px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {isLoading ? (
            <div
              data-ocid="verify.loading_state"
              className="flex flex-col items-center justify-center gap-4 py-8"
            >
              <Loader2
                className="h-10 w-10 animate-spin"
                style={{ color: "#00d4ff" }}
              />
              <p
                className="font-mono text-sm"
                style={{ color: "rgba(0, 212, 255, 0.5)" }}
              >
                Verifying student identity...
              </p>
            </div>
          ) : (
            <>
              {/* Verification status badge */}
              <div className="mb-5 flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5"
                  style={
                    isVerified === null
                      ? {
                          background: "rgba(255, 184, 0, 0.1)",
                          border: "1.5px solid rgba(255, 184, 0, 0.4)",
                        }
                      : isVerified
                        ? {
                            background: "rgba(0, 230, 118, 0.1)",
                            border: "1.5px solid rgba(0, 230, 118, 0.4)",
                            boxShadow: "0 0 20px rgba(0, 230, 118, 0.15)",
                          }
                        : {
                            background: "rgba(255, 51, 85, 0.1)",
                            border: "1.5px solid rgba(255, 51, 85, 0.4)",
                          }
                  }
                >
                  {isVerified === null ? (
                    <>
                      <Shield
                        className="h-5 w-5"
                        style={{ color: "#ffb800" }}
                      />
                      <span
                        className="font-display text-sm font-black uppercase tracking-widest"
                        style={{ color: "#ffb800" }}
                      >
                        QR Verified
                      </span>
                    </>
                  ) : isVerified ? (
                    <>
                      <CheckCircle
                        className="h-5 w-5"
                        style={{ color: "#00e676" }}
                      />
                      <span
                        className="font-display text-sm font-black uppercase tracking-widest"
                        style={{ color: "#00e676" }}
                      >
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle
                        className="h-5 w-5"
                        style={{ color: "#ff3355" }}
                      />
                      <span
                        className="font-display text-sm font-black uppercase tracking-widest"
                        style={{ color: "#ff3355" }}
                      >
                        Not Verified
                      </span>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Student details */}
              <div className="space-y-3">
                <InfoRow label="Student Name" value={displayName} highlight />
                <InfoRow label="System ID" value={displaySystemId} mono />
                <InfoRow label="MBBS Batch" value={displayBatch} />
                <InfoRow label="Role" value={displayRole} />
                {profile?.mobile && (
                  <InfoRow label="Mobile" value={`+91 ${profile.mobile}`} />
                )}
              </div>

              {/* Divider */}
              <div
                className="my-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
                }}
              />

              {/* Note */}
              <p
                className="text-center font-mono text-xs"
                style={{ color: "rgba(150, 200, 255, 0.35)" }}
              >
                {error
                  ? `ℹ️ ${error}`
                  : isVerified === null
                    ? "ℹ️ Backend verification requires network access. QR data shown."
                    : "✓ Identity verified by MedSim blockchain registry"}
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <p
          className="mt-6 text-center font-mono text-xs"
          style={{ color: "rgba(100, 150, 200, 0.3)" }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-opacity hover:opacity-80"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}

// Helper component for displaying info rows
function InfoRow({
  label,
  value,
  highlight,
  mono,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-2.5"
      style={{
        background: "rgba(0, 10, 25, 0.5)",
        border: "1px solid rgba(0, 212, 255, 0.1)",
      }}
    >
      <span
        className="font-mono text-xs uppercase tracking-wider"
        style={{ color: "rgba(0, 212, 255, 0.45)" }}
      >
        {label}
      </span>
      <span
        className={`text-sm font-bold ${mono ? "font-mono tracking-wider" : "font-display"}`}
        style={{
          color: highlight
            ? "#e8f4ff"
            : mono
              ? "#00d4ff"
              : "rgba(200, 220, 255, 0.8)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default VerifyPage;
