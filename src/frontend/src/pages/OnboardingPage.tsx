import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  Heart,
  Monitor,
  Stethoscope,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface OnboardingPageProps {
  onComplete: () => void;
}

const ROLES = [
  "Student (MBBS)",
  "Intern",
  "Junior Resident 1",
  "Junior Resident 2",
  "Senior Resident 1",
  "Senior Resident 2",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "HOD",
];

const TIPS = [
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Clinical Case Practice",
    desc: "Simulate real patient encounters across 19 MBBS subjects with performance tracking.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "NEET PG Question Bank",
    desc: "2015-2024 previous year questions with ICMR protocol-based MCQs and detailed explanations.",
  },
  {
    icon: <Monitor className="h-5 w-5" />,
    title: "ICU Simulator",
    desc: "High-fidelity ICU monitoring with real-time ECG, ventilator readings, and drug panels.",
  },
];

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [batch, setBatch] = useState("");

  const handleStep2Next = () => {
    if (role) localStorage.setItem("medsim_saved_role", role);
    if (college) localStorage.setItem("medsim_saved_college", college);
    if (batch) localStorage.setItem("medsim_saved_batch", batch);
    setStep(3);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "oklch(0.10 0.04 235)" }}
    >
      {/* Background pulse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.18 0.08 200 / 0.4), transparent)",
        }}
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full"
          >
            {/* Logo */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl mb-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.15 200), oklch(0.35 0.12 230))",
                boxShadow: "0 0 40px oklch(0.55 0.18 196 / 0.4)",
              }}
            >
              <Heart className="h-9 w-9 text-white" />
            </div>
            <h1
              className="text-3xl font-black mb-2"
              style={{ color: "oklch(0.95 0.015 215)" }}
            >
              MedSim
            </h1>
            <p
              className="text-sm mb-2 font-medium"
              style={{ color: "oklch(0.65 0.16 196)" }}
            >
              India's Premier Clinical Simulation Platform
            </p>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: "oklch(0.60 0.04 220)" }}
            >
              Designed for MBBS students and medical professionals — practice
              clinical cases, NEET PG questions, and ICU simulations.
            </p>
            {/* Step dots */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: s === step ? 24 : 8,
                    background:
                      s === step
                        ? "oklch(0.65 0.16 196)"
                        : "oklch(0.30 0.04 220)",
                  }}
                />
              ))}
            </div>
            <Button
              data-ocid="onboarding.next_button"
              onClick={() => setStep(2)}
              className="w-full gap-2 h-12 text-base font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.48 0.15 196), oklch(0.38 0.12 230))",
                border: "none",
                color: "white",
              }}
            >
              Get Started
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full max-w-sm px-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "oklch(0.25 0.08 200 / 0.6)",
                  border: "1px solid oklch(0.45 0.12 200 / 0.5)",
                }}
              >
                <Brain
                  className="h-5 w-5"
                  style={{ color: "oklch(0.65 0.16 196)" }}
                />
              </div>
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: "oklch(0.92 0.015 215)" }}
                >
                  Quick Profile Setup
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 220)" }}
                >
                  Personalise your learning experience
                </p>
              </div>
            </div>

            {/* Step dots */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: s === step ? 24 : 8,
                    background:
                      s === step
                        ? "oklch(0.65 0.16 196)"
                        : "oklch(0.30 0.04 220)",
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.70 0.06 220)" }}
                >
                  Your Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    data-ocid="onboarding.role_select"
                    className="border-0 h-11"
                    style={{
                      background: "oklch(0.18 0.06 230 / 0.8)",
                      border: "1px solid oklch(0.30 0.06 230 / 0.6)",
                      color: "oklch(0.88 0.015 215)",
                    }}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.70 0.06 220)" }}
                >
                  College / Institution
                </Label>
                <Input
                  data-ocid="onboarding.college_input"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. AIIMS New Delhi"
                  className="h-11 border-0"
                  style={{
                    background: "oklch(0.18 0.06 230 / 0.8)",
                    border: "1px solid oklch(0.30 0.06 230 / 0.6)",
                    color: "oklch(0.88 0.015 215)",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.70 0.06 220)" }}
                >
                  Batch Year
                </Label>
                <Input
                  data-ocid="onboarding.batch_input"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="e.g. 2022-2028"
                  className="h-11 border-0"
                  style={{
                    background: "oklch(0.18 0.06 230 / 0.8)",
                    border: "1px solid oklch(0.30 0.06 230 / 0.6)",
                    color: "oklch(0.88 0.015 215)",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                data-ocid="onboarding.back_button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-11 border-0"
                style={{
                  background: "oklch(0.20 0.04 230 / 0.5)",
                  border: "1px solid oklch(0.30 0.04 230)",
                  color: "oklch(0.65 0.04 220)",
                }}
              >
                Back
              </Button>
              <Button
                data-ocid="onboarding.next_button"
                onClick={handleStep2Next}
                className="flex-[2] gap-2 h-11 font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.48 0.15 196), oklch(0.38 0.12 230))",
                  border: "none",
                  color: "white",
                }}
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <button
              type="button"
              data-ocid="onboarding.skip_button"
              onClick={handleStep2Next}
              className="w-full mt-3 text-xs text-center py-2"
              style={{ color: "oklch(0.45 0.04 220)" }}
            >
              Skip for now
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full max-w-sm px-6"
          >
            <div className="text-center mb-8">
              <div
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.15 152), oklch(0.35 0.12 180))",
                  boxShadow: "0 0 32px oklch(0.55 0.16 152 / 0.4)",
                }}
              >
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h2
                className="text-2xl font-black mb-2"
                style={{ color: "oklch(0.92 0.015 215)" }}
              >
                You're All Set!
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.60 0.04 220)" }}>
                Here's what you can do in MedSim:
              </p>
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: s === step ? 24 : 8,
                    background:
                      s === step
                        ? "oklch(0.65 0.16 152)"
                        : "oklch(0.30 0.04 220)",
                  }}
                />
              ))}
            </div>

            <div className="space-y-3 mb-8">
              {TIPS.map((tip) => (
                <div
                  key={tip.title}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{
                    background: "oklch(0.16 0.05 230 / 0.7)",
                    border: "1px solid oklch(0.28 0.06 230 / 0.5)",
                  }}
                >
                  <div
                    className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: "oklch(0.22 0.08 200 / 0.6)",
                      color: "oklch(0.65 0.16 196)",
                    }}
                  >
                    {tip.icon}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "oklch(0.88 0.015 215)" }}
                    >
                      {tip.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.55 0.04 220)" }}
                    >
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              data-ocid="onboarding.start_button"
              onClick={onComplete}
              className="w-full gap-2 h-12 text-base font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.48 0.15 152), oklch(0.38 0.12 180))",
                border: "none",
                color: "white",
                boxShadow: "0 4px 24px oklch(0.55 0.16 152 / 0.35)",
              }}
            >
              Start Learning
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
