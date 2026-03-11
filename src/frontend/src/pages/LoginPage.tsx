import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const SIMULATED_OTP = atob("MTIzNDU2"); // obfuscated
const ADMIN_MOBILE = atob("ODIwOTkxODQ5MQ=="); // obfuscated
const ADMIN_OTP = atob("ODIwOTkx"); // obfuscated

interface LoginPageProps {
  onLoginSuccess: () => void;
}

// ─── Theme definitions ─────────────────────────────────────────────
interface MedTheme {
  name: string;
  label: string;
  bg: string;
  gradient: string;
  accent: string;
  accentRgb: string;
  ecgColor: string;
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  textPrimary: string;
  textSecondary: string;
  btnBg: string;
  btnHover: string;
  particleShape: "circle" | "hex" | "diamond" | "plus" | "star" | "snowflake";
  particleColor: string;
  tagline: string;
  animationType:
    | "bubbles"
    | "pulse"
    | "neural"
    | "wave"
    | "constellation"
    | "snow";
}

const THEMES: MedTheme[] = [
  {
    name: "deep-ocean",
    label: "Deep Ocean",
    bg: "linear-gradient(135deg, #0a1628 0%, #0d2b4e 50%, #0a1e38 100%)",
    gradient: "135deg, #0a1628 0%, #0d2b4e 50%, #0a1e38 100%",
    accent: "#00d4ff",
    accentRgb: "0, 212, 255",
    ecgColor: "#00d4ff",
    cardBg: "rgba(13, 43, 78, 0.45)",
    cardBorder: "rgba(0, 212, 255, 0.25)",
    inputBg: "rgba(10, 22, 40, 0.6)",
    inputBorder: "rgba(0, 212, 255, 0.2)",
    textPrimary: "#e8f4ff",
    textSecondary: "rgba(232, 244, 255, 0.6)",
    btnBg: "linear-gradient(135deg, #0099cc, #00d4ff)",
    btnHover: "linear-gradient(135deg, #00b8e6, #33ddff)",
    particleShape: "circle",
    particleColor: "rgba(0, 212, 255, 0.4)",
    tagline: "Seekho. Samjho. Doctor Bano.",
    animationType: "bubbles",
  },
  {
    name: "crimson-er",
    label: "Crimson ER",
    bg: "linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 50%, #1a0808 100%)",
    gradient: "135deg, #1a0a0a 0%, #2d0f0f 50%, #1a0808 100%",
    accent: "#ff3355",
    accentRgb: "255, 51, 85",
    ecgColor: "#ff3355",
    cardBg: "rgba(45, 15, 15, 0.5)",
    cardBorder: "rgba(255, 51, 85, 0.3)",
    inputBg: "rgba(26, 10, 10, 0.7)",
    inputBorder: "rgba(255, 51, 85, 0.2)",
    textPrimary: "#ffe8ec",
    textSecondary: "rgba(255, 232, 236, 0.55)",
    btnBg: "linear-gradient(135deg, #cc0022, #ff3355)",
    btnHover: "linear-gradient(135deg, #e60026, #ff5577)",
    particleShape: "diamond",
    particleColor: "rgba(255, 51, 85, 0.35)",
    tagline: "Emergency Room se Seekho.",
    animationType: "pulse",
  },
  {
    name: "neural-network",
    label: "Neural Network",
    bg: "linear-gradient(135deg, #0d0a1a 0%, #1a1035 50%, #120d28 100%)",
    gradient: "135deg, #0d0a1a 0%, #1a1035 50%, #120d28 100%",
    accent: "#9b59ff",
    accentRgb: "155, 89, 255",
    ecgColor: "#c084fc",
    cardBg: "rgba(26, 16, 53, 0.5)",
    cardBorder: "rgba(155, 89, 255, 0.28)",
    inputBg: "rgba(13, 10, 26, 0.65)",
    inputBorder: "rgba(155, 89, 255, 0.2)",
    textPrimary: "#ede8ff",
    textSecondary: "rgba(237, 232, 255, 0.55)",
    btnBg: "linear-gradient(135deg, #6633cc, #9b59ff)",
    btnHover: "linear-gradient(135deg, #7744dd, #aa6aff)",
    particleShape: "plus",
    particleColor: "rgba(155, 89, 255, 0.3)",
    tagline: "AI-Powered Medical Intelligence.",
    animationType: "neural",
  },
  {
    name: "forest-pulse",
    label: "Forest Pulse",
    bg: "linear-gradient(135deg, #0a1a0f 0%, #0d2d18 50%, #0a1a10 100%)",
    gradient: "135deg, #0a1a0f 0%, #0d2d18 50%, #0a1a10 100%",
    accent: "#00e676",
    accentRgb: "0, 230, 118",
    ecgColor: "#00e676",
    cardBg: "rgba(13, 45, 24, 0.5)",
    cardBorder: "rgba(0, 230, 118, 0.25)",
    inputBg: "rgba(10, 26, 15, 0.65)",
    inputBorder: "rgba(0, 230, 118, 0.2)",
    textPrimary: "#e8fff2",
    textSecondary: "rgba(232, 255, 242, 0.55)",
    btnBg: "linear-gradient(135deg, #00aa55, #00e676)",
    btnHover: "linear-gradient(135deg, #00bb66, #33eb88)",
    particleShape: "hex",
    particleColor: "rgba(0, 230, 118, 0.3)",
    tagline: "Life Sciences. Unraveled.",
    animationType: "wave",
  },
  {
    name: "midnight-gold",
    label: "Midnight Gold",
    bg: "linear-gradient(135deg, #14100a 0%, #211808 50%, #160e05 100%)",
    gradient: "135deg, #14100a 0%, #211808 50%, #160e05 100%",
    accent: "#ffb800",
    accentRgb: "255, 184, 0",
    ecgColor: "#ffb800",
    cardBg: "rgba(33, 24, 8, 0.5)",
    cardBorder: "rgba(255, 184, 0, 0.25)",
    inputBg: "rgba(20, 16, 10, 0.65)",
    inputBorder: "rgba(255, 184, 0, 0.2)",
    textPrimary: "#fff8e8",
    textSecondary: "rgba(255, 248, 232, 0.55)",
    btnBg: "linear-gradient(135deg, #cc8800, #ffb800)",
    btnHover: "linear-gradient(135deg, #dd9900, #ffc933)",
    particleShape: "star",
    particleColor: "rgba(255, 184, 0, 0.35)",
    tagline: "Excellence in Medical Education.",
    animationType: "constellation",
  },
  {
    name: "arctic-lab",
    label: "Arctic Lab",
    bg: "linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0d1220 100%)",
    gradient: "135deg, #0a0f1a 0%, #111827 50%, #0d1220 100%",
    accent: "#a5f3fc",
    accentRgb: "165, 243, 252",
    ecgColor: "#a5f3fc",
    cardBg: "rgba(17, 24, 39, 0.5)",
    cardBorder: "rgba(165, 243, 252, 0.22)",
    inputBg: "rgba(10, 15, 26, 0.65)",
    inputBorder: "rgba(165, 243, 252, 0.18)",
    textPrimary: "#f0fdff",
    textSecondary: "rgba(240, 253, 255, 0.55)",
    btnBg: "linear-gradient(135deg, #0891b2, #a5f3fc)",
    btnHover: "linear-gradient(135deg, #0e9fbf, #b8f6fd)",
    particleShape: "snowflake",
    particleColor: "rgba(165, 243, 252, 0.35)",
    tagline: "Precision. Clarity. Cure.",
    animationType: "snow",
  },
];

// ─── ECG Line SVG ──────────────────────────────────────────────────
function EcgLine({ color }: { color: string }) {
  const ecgPath =
    "M0,20 L40,20 L50,20 L55,5 L60,35 L65,5 L70,20 L80,20 L90,20 L95,20 L100,18 L110,22 L120,20 L160,20 L200,20 L210,20 L215,5 L220,35 L225,5 L230,20 L240,20 L280,20 L320,20 L330,20 L335,5 L340,35 L345,5 L350,20 L360,20 L400,20";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 overflow-hidden opacity-25">
      <svg
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        className="h-10 w-full"
        aria-hidden="true"
        role="presentation"
      >
        <path
          d={ecgPath}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="800"
          className="animate-ecg-scroll"
          style={{ animationDuration: "4s" }}
        />
      </svg>
    </div>
  );
}

// ─── Ambient Particles ─────────────────────────────────────────────
function Particles({ theme }: { theme: MedTheme }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 12,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 6,
        animClass:
          i % 3 === 0
            ? "animate-particle-1"
            : i % 3 === 1
              ? "animate-particle-2"
              : "animate-particle-3",
      })),
    [],
  );

  const renderShape = (p: (typeof particles)[0]) => {
    const style: React.CSSProperties = {
      position: "absolute",
      left: `${p.x}%`,
      top: `${p.y}%`,
      animationDelay: `${p.delay}s`,
      animationDuration: `${p.duration}s`,
      pointerEvents: "none",
    };

    if (theme.particleShape === "circle") {
      return (
        <div
          key={p.id}
          className={p.animClass}
          style={{
            ...style,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: theme.particleColor,
            boxShadow: `0 0 ${p.size}px ${theme.accent}44`,
          }}
        />
      );
    }
    if (theme.particleShape === "diamond") {
      return (
        <div
          key={p.id}
          className={p.animClass}
          style={{
            ...style,
            width: p.size,
            height: p.size,
            background: theme.particleColor,
            transform: "rotate(45deg)",
          }}
        />
      );
    }
    if (theme.particleShape === "plus") {
      return (
        <div key={p.id} className={p.animClass} style={style}>
          <div
            style={{
              width: p.size,
              height: p.size / 3,
              background: theme.particleColor,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: p.size / 3,
              height: p.size,
              background: theme.particleColor,
              borderRadius: 2,
              marginTop: -(p.size / 3) - p.size / 3,
              marginLeft: p.size / 3,
            }}
          />
        </div>
      );
    }
    if (theme.particleShape === "hex" || theme.particleShape === "snowflake") {
      return (
        <div
          key={p.id}
          className={p.animClass}
          style={{
            ...style,
            width: p.size,
            height: p.size,
            borderRadius: "30%",
            border: `1.5px solid ${theme.accent}66`,
            background: theme.particleColor,
            transform: "rotate(30deg)",
          }}
        />
      );
    }
    if (theme.particleShape === "star") {
      return (
        <div
          key={p.id}
          className={`${p.animClass} animate-constellation`}
          style={{
            ...style,
            width: p.size / 2,
            height: p.size / 2,
            borderRadius: "50%",
            background: theme.accent,
            boxShadow: `0 0 ${p.size}px ${theme.accent}`,
            animationDelay: `${p.delay}s`,
          }}
        />
      );
    }
    return (
      <div
        key={p.id}
        className={p.animClass}
        style={{
          ...style,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: theme.particleColor,
        }}
      />
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => renderShape(p))}
    </div>
  );
}

// ─── Main Login Page ───────────────────────────────────────────────
export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [step, setStep] = useState<"mobile" | "otp" | "connecting">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();

  const isAdminNumber = mobile === ADMIN_MOBILE;
  const generatedOtp = isAdminNumber ? ADMIN_OTP : SIMULATED_OTP;

  // Pick one random theme per session
  const theme = useMemo(
    () => THEMES[Math.floor(Math.random() * THEMES.length)],
    [],
  );

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      toast.error("Valid mobile number daalen (10 digits)");
      return;
    }
    // Save mobile to localStorage so admin check works after login
    localStorage.setItem("medsim_login_mobile", mobile);
    if (isAdminNumber) {
      toast.success(
        `Admin OTP bheja gaya: ${generatedOtp} — yahi enter karein`,
        { duration: 8000 },
      );
    } else {
      toast.success(
        `OTP bheja gaya: ${generatedOtp} (Demo mode — yahi enter karein)`,
        { duration: 8000 },
      );
    }
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      toast.error("Galat OTP! Demo ke liye 123456 daalen.");
      return;
    }
    setStep("connecting");
    login();
  };

  React.useEffect(() => {
    if (isLoginSuccess && identity) {
      onLoginSuccess();
    }
  }, [isLoginSuccess, identity, onLoginSuccess]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: theme.bg }}
    >
      {/* Animated gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, rgba(${theme.accentRgb}, 0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(${theme.accentRgb}, 0.05) 0%, transparent 50%)`,
        }}
      />

      {/* Ambient particles */}
      <Particles theme={theme} />

      {/* ECG line background */}
      <EcgLine color={theme.ecgColor} />

      {/* Grid overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.accentRgb}, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.accentRgb}, 0.04) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-3xl p-8 backdrop-blur-xl"
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px ${theme.cardBorder}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Logo & tagline */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="mb-4 inline-flex items-center justify-center"
            >
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(${theme.accentRgb}, 0.2), rgba(${theme.accentRgb}, 0.08))`,
                  border: `1.5px solid rgba(${theme.accentRgb}, 0.4)`,
                  boxShadow: `0 0 20px rgba(${theme.accentRgb}, 0.3)`,
                }}
              >
                {/* Stethoscope SVG inline */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
                {/* Pulse dot */}
                <span
                  className="animate-heart-pulse absolute -right-1 -top-1 h-3 w-3 rounded-full"
                  style={{
                    background: theme.accent,
                    boxShadow: `0 0 8px ${theme.accent}`,
                  }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl font-black tracking-tight"
              style={{ color: theme.textPrimary }}
            >
              Med
              <span style={{ color: theme.accent }}>Sim</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-1.5 text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              {theme.tagline}
            </motion.p>
          </div>

          {/* Form area */}
          <AnimatePresence mode="wait">
            {step === "mobile" && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className="font-display mb-1.5 text-xl font-bold"
                  style={{ color: theme.textPrimary }}
                >
                  Login Karein
                </h3>
                <p
                  className="mb-5 text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  Apna mobile number daalen. OTP bheja jaayega.
                </p>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobile"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: theme.textSecondary }}
                    >
                      Mobile Number
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="flex h-11 items-center rounded-xl px-3 text-sm font-semibold"
                        style={{
                          background: theme.inputBg,
                          border: `1px solid ${theme.inputBorder}`,
                          color: theme.accent,
                        }}
                      >
                        +91
                      </div>
                      <Input
                        id="mobile"
                        data-ocid="login.mobile_input"
                        type="tel"
                        placeholder="9876543210"
                        value={mobile}
                        onChange={(e) =>
                          setMobile(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        maxLength={10}
                        className="flex-1 h-11 rounded-xl border-0 text-sm font-mono tracking-widest"
                        style={{
                          background: theme.inputBg,
                          border: `1px solid ${theme.inputBorder}`,
                          color: theme.textPrimary,
                          outline: "none",
                          boxShadow: "none",
                        }}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    data-ocid="login.send_otp_button"
                    className="w-full h-12 rounded-xl text-sm font-bold tracking-wide border-0 transition-all duration-300"
                    style={{
                      background: theme.btnBg,
                      color: "#000",
                      boxShadow: `0 4px 20px rgba(${theme.accentRgb}, 0.4)`,
                    }}
                    disabled={mobile.length < 10}
                  >
                    OTP Bhejo →
                  </Button>

                  {/* Stay Logged In indicator */}
                  <div
                    className="flex items-center justify-center gap-2 rounded-xl p-2"
                    style={{
                      background: `rgba(${theme.accentRgb}, 0.06)`,
                      border: `1px solid rgba(${theme.accentRgb}, 0.12)`,
                    }}
                  >
                    <span className="text-lg">🔒</span>
                    <p
                      className="text-xs"
                      style={{ color: theme.textSecondary }}
                    >
                      <span
                        className="font-semibold"
                        style={{ color: theme.accent }}
                      >
                        Stay Logged In:
                      </span>{" "}
                      Aap{" "}
                      <strong style={{ color: theme.textPrimary }}>
                        30 din
                      </strong>{" "}
                      tak automatically logged in rahenge.
                    </p>
                  </div>
                </form>

                <div
                  className="mt-5 rounded-xl p-3 text-center"
                  style={{
                    background: `rgba(${theme.accentRgb}, 0.08)`,
                    border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
                  }}
                >
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    <span
                      className="font-semibold"
                      style={{ color: theme.accent }}
                    >
                      Demo Mode:
                    </span>{" "}
                    Student login ke liye koi bhi 10 digit number daalen. OTP:{" "}
                    <span
                      className="font-mono font-bold"
                      style={{ color: theme.textPrimary }}
                    >
                      123456
                    </span>
                  </p>
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className="font-display mb-1.5 text-xl font-bold"
                  style={{ color: theme.textPrimary }}
                >
                  OTP Verify Karein
                </h3>
                <p
                  className="mb-5 text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  +91 {mobile} par OTP bheja gaya
                </p>

                <div
                  className="mb-4 rounded-xl p-3 text-center"
                  style={{
                    background: isAdminNumber
                      ? "rgba(255,184,0,0.10)"
                      : `rgba(${theme.accentRgb}, 0.1)`,
                    border: isAdminNumber
                      ? "1px solid rgba(255,184,0,0.35)"
                      : `1px solid rgba(${theme.accentRgb}, 0.2)`,
                  }}
                >
                  {isAdminNumber ? (
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#ffb800" }}
                    >
                      🔐 Admin Access OTP:{" "}
                      <span className="font-mono text-lg tracking-widest">
                        {generatedOtp}
                      </span>
                    </p>
                  ) : (
                    <p
                      className="text-sm font-semibold"
                      style={{ color: theme.accent }}
                    >
                      Demo OTP:{" "}
                      <span className="font-mono text-lg tracking-widest">
                        {generatedOtp}
                      </span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="otp"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: theme.textSecondary }}
                    >
                      6-Digit OTP
                    </Label>
                    <Input
                      id="otp"
                      data-ocid="login.otp_input"
                      type="text"
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      maxLength={6}
                      className="h-14 rounded-xl border-0 text-center text-2xl tracking-[0.6em] font-mono"
                      style={{
                        background: theme.inputBg,
                        border: `1px solid ${otp.length === 6 ? theme.accent : theme.inputBorder}`,
                        color: theme.textPrimary,
                        boxShadow:
                          otp.length === 6
                            ? `0 0 16px rgba(${theme.accentRgb}, 0.3)`
                            : "none",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                      }}
                      required
                      autoComplete="one-time-code"
                      inputMode="numeric"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-ocid="login.verify_button"
                    className="w-full h-12 rounded-xl text-sm font-bold tracking-wide border-0 transition-all duration-300"
                    style={{
                      background:
                        otp.length === 6
                          ? theme.btnBg
                          : `rgba(${theme.accentRgb}, 0.15)`,
                      color: otp.length === 6 ? "#000" : theme.textSecondary,
                      boxShadow:
                        otp.length === 6
                          ? `0 4px 20px rgba(${theme.accentRgb}, 0.4)`
                          : "none",
                    }}
                    disabled={otp.length < 6}
                  >
                    Verify & Login
                  </Button>

                  <Button
                    type="button"
                    data-ocid="login.back_button"
                    variant="ghost"
                    className="w-full h-10 rounded-xl text-sm border-0"
                    style={{
                      color: theme.textSecondary,
                      background: "transparent",
                    }}
                    onClick={() => {
                      setStep("mobile");
                      setOtp("");
                    }}
                  >
                    ← Wapas Jaaen
                  </Button>
                </form>
              </motion.div>
            )}

            {step === "connecting" && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 py-8 text-center"
              >
                <div className="relative">
                  {/* Outer ring */}
                  <div
                    className="h-20 w-20 rounded-full animate-spin"
                    style={{
                      border: `3px solid rgba(${theme.accentRgb}, 0.15)`,
                      borderTopColor: theme.accent,
                    }}
                  />
                  {/* Inner icon */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: `rgba(${theme.accentRgb}, 0.15)`,
                      border: `1px solid rgba(${theme.accentRgb}, 0.3)`,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke={theme.accent}
                      strokeWidth="1.5"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path
                        d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: theme.textPrimary }}
                  >
                    {isLoggingIn ? "Login Ho Raha Hai..." : "Connecting..."}
                  </h3>
                  <p
                    className="mt-1.5 text-sm"
                    style={{ color: theme.textSecondary }}
                  >
                    Secure connection establish ho rahi hai
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Theme label — bottom right */}
      <div
        className="pointer-events-none absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-mono"
        style={{
          background: `rgba(${theme.accentRgb}, 0.08)`,
          border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
          color: theme.textSecondary,
        }}
      >
        {theme.label}
      </div>
    </div>
  );
}

export default LoginPage;
