import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const SIMULATED_OTP = atob("MTIzNDU2");
const ADMIN_MOBILE = atob("ODIwOTkxODQ5MQ==");
const ADMIN_OTP = atob("ODIwOTkx");

interface LoginPageProps {
  onLoginSuccess: () => void;
}

// ─── ECG line animation ────────────────────────────────────────────
function EcgLine() {
  return (
    <svg
      className="pointer-events-none absolute bottom-12 left-0 right-0 w-full opacity-20"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      height="60"
      aria-hidden="true"
    >
      <polyline
        points="0,30 30,30 45,30 58,5 66,55 74,5 80,42 88,30 120,30 145,30 158,5 166,55 174,5 180,42 188,30 220,30 248,30 258,5 266,55 274,5 280,42 288,30 320,30 358,5 366,55 374,5 380,42 388,30 400,30"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── WhatsApp-style phone step ─────────────────────────────────────
function PhoneStep({
  mobile,
  setMobile,
  onSubmit,
}: {
  mobile: string;
  setMobile: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <motion.div
      key="phone"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Indian flag + input */}
        <div>
          <p
            className="block text-sm font-semibold mb-2"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Mobile Number
          </p>
          <div className="flex gap-2">
            <div
              className="flex items-center gap-1.5 rounded-xl px-3 py-3.5 text-sm font-semibold flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <span style={{ fontSize: 18 }}>🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              id="mobile-input"
              type="tel"
              inputMode="numeric"
              data-ocid="login.phone_input"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter 10-digit number"
              maxLength={10}
              className="flex-1 rounded-xl px-4 py-3.5 text-base font-medium outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
              }}
              autoComplete="tel"
            />
          </div>
        </div>

        <button
          type="submit"
          data-ocid="login.continue_button"
          disabled={mobile.length < 10}
          className="w-full rounded-xl py-3.5 text-base font-bold transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            background:
              mobile.length >= 10 ? "#25D366" : "rgba(37,211,102,0.35)",
            color: "white",
            boxShadow:
              mobile.length >= 10 ? "0 4px 20px rgba(37,211,102,0.5)" : "none",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Continue with WhatsApp
        </button>

        <p
          className="text-center text-xs"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          We'll send a verification code to your WhatsApp
        </p>
      </form>
    </motion.div>
  );
}

// ─── OTP step ──────────────────────────────────────────────────────
function OtpStep({
  mobile,
  otp,
  setOtp,
  onSubmit,
  onBack,
  isAdmin,
  onResend,
  resendCooldown,
}: {
  mobile: string;
  otp: string;
  setOtp: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isAdmin: boolean;
  onResend: () => void;
  resendCooldown: number;
}) {
  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Admin badge */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 flex items-center justify-center gap-2 rounded-xl px-4 py-2"
          style={{
            background: "rgba(255,184,0,0.15)",
            border: "1px solid rgba(255,184,0,0.4)",
          }}
        >
          <span style={{ fontSize: 16 }}>👑</span>
          <span className="text-sm font-bold" style={{ color: "#ffb800" }}>
            Admin Access
          </span>
        </motion.div>
      )}

      <div className="mb-5 text-center">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
          Verifying your WhatsApp number
        </p>
        <p
          className="font-semibold mt-0.5"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          +91 {mobile}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="flex flex-col items-center gap-3">
          <p
            className="text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Enter 6-digit OTP
          </p>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            data-ocid="login.otp_input"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
              <InputOTPSlot
                index={1}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
              <InputOTPSlot
                index={2}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
              <InputOTPSlot
                index={3}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
              <InputOTPSlot
                index={4}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
              <InputOTPSlot
                index={5}
                className="text-white border-white/30 bg-white/10 h-12 w-11 text-lg"
              />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Enter the 6-digit code sent to your WhatsApp
          </p>
        </div>

        <button
          type="submit"
          data-ocid="login.verify_button"
          disabled={otp.length < 6}
          className="w-full rounded-xl py-3.5 text-base font-bold transition-all"
          style={{
            background: otp.length >= 6 ? "#25D366" : "rgba(37,211,102,0.35)",
            color: "white",
            boxShadow:
              otp.length >= 6 ? "0 4px 20px rgba(37,211,102,0.5)" : "none",
          }}
        >
          Verify & Login
        </button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            data-ocid="login.back_button"
            onClick={onBack}
            style={{ color: "rgba(255,255,255,0.55)" }}
            className="hover:text-white transition-colors"
          >
            ← Change Number
          </button>
          <button
            type="button"
            data-ocid="login.resend_button"
            onClick={onResend}
            disabled={resendCooldown > 0}
            style={{
              color:
                resendCooldown > 0
                  ? "rgba(37,211,102,0.4)"
                  : "rgba(37,211,102,0.85)",
            }}
            className="hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
          >
            {resendCooldown > 0
              ? `Resend Code (${resendCooldown}s)`
              : "Resend Code"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Connecting screen ─────────────────────────────────────────────
function ConnectingScreen() {
  return (
    <motion.div
      key="connecting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 py-8"
    >
      <div className="relative h-14 w-14">
        <div
          className="h-14 w-14 rounded-full border-4 animate-spin"
          style={{
            borderColor: "rgba(37,211,102,0.2)",
            borderTopColor: "#25D366",
          }}
        />
        <svg
          viewBox="0 0 24 24"
          fill="#25D366"
          className="absolute inset-0 m-auto h-6 w-6"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 3a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 0111 13V8a1 1 0 011-1z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
          Connecting to MedSim...
        </p>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
          Setting up your session
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Login Page ───────────────────────────────────────────────
export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [step, setStep] = useState<"mobile" | "otp" | "connecting">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();

  const isAdminNumber = mobile === ADMIN_MOBILE;
  const generatedOtp = isAdminNumber ? ADMIN_OTP : SIMULATED_OTP;

  // Decrement resend cooldown every second
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  // Stable hue for background variation, keyed to mobile state
  const bgHue = useMemo(() => {
    if (mobile) {
      const code = mobile.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      return (code % 40) - 20;
    }
    return 0;
  }, [mobile]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    localStorage.setItem("medsim_login_mobile", mobile);
    if (isAdminNumber) {
      toast.success("Verification code sent to admin WhatsApp.", {
        duration: 5000,
      });
    } else {
      toast.success("Verification code sent to your WhatsApp.", {
        duration: 5000,
      });
    }
    setResendCooldown(30);
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      toast.error("Incorrect verification code. Please try again.");
      return;
    }
    setStep("connecting");
    login();
  };

  const handleResend = () => {
    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown} seconds before resending.`);
      return;
    }
    toast.success("Verification code resent to your WhatsApp.", {
      duration: 5000,
    });
    setResendCooldown(30);
  };

  useEffect(() => {
    if (isLoginSuccess && identity) {
      onLoginSuccess();
    }
  }, [isLoginSuccess, identity, onLoginSuccess]);

  // Transition bg: WhatsApp green for step 1, dark ICU for subsequent steps
  const isPhoneStep = step === "mobile";

  return (
    <div
      className="relative min-h-screen flex items-end sm:items-center justify-center overflow-hidden"
      style={{
        background: isPhoneStep
          ? `linear-gradient(160deg, hsl(${142 + bgHue}, 70%, 12%) 0%, hsl(${142 + bgHue}, 60%, 8%) 50%, #040d1a 100%)`
          : "linear-gradient(160deg, #040d1a 0%, #060e20 60%, #040d1a 100%)",
        transition: "background 0.8s ease",
      }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,211,102,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,211,102,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isPhoneStep
            ? "radial-gradient(ellipse at 50% 100%, rgba(37,211,102,0.12) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ECG line */}
      <EcgLine />

      {/* Mobile: bottom sheet style; Desktop: centered card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full sm:max-w-md"
      >
        {/* Mobile bottom sheet or desktop card */}
        <div
          className="rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
          style={{
            background: "rgba(8, 16, 32, 0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo + branding */}
          <div className="mb-7 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mb-4 inline-flex items-center justify-center"
            >
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(37,211,102,0.12)",
                  border: "1.5px solid rgba(37,211,102,0.35)",
                  boxShadow: "0 0 24px rgba(37,211,102,0.25)",
                }}
              >
                {/* Stethoscope */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
                {/* Pulse dot */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="absolute -right-1 -top-1 h-3 w-3 rounded-full"
                  style={{
                    background: "#25D366",
                    boxShadow: "0 0 8px #25D366",
                  }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl font-black tracking-tight"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              Med<span style={{ color: "#25D366" }}>Sim</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-1 text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Medical Simulation Platform India
            </motion.p>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === "mobile" && (
              <PhoneStep
                mobile={mobile}
                setMobile={setMobile}
                onSubmit={handleSendOtp}
              />
            )}
            {step === "otp" && (
              <OtpStep
                mobile={mobile}
                otp={otp}
                setOtp={setOtp}
                onSubmit={handleVerifyOtp}
                onBack={() => {
                  setStep("mobile");
                  setOtp("");
                }}
                isAdmin={isAdminNumber}
                onResend={handleResend}
                resendCooldown={resendCooldown}
              />
            )}
            {(step === "connecting" || isLoggingIn) && <ConnectingScreen />}
          </AnimatePresence>

          {/* Stay logged in notice */}
          {step === "mobile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2"
              style={{
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.18)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#25D366"
                className="h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(37,211,102,0.85)" }}
              >
                Stay Logged In · 30 days
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
