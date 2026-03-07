import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

interface VirtualPatientProps {
  ageMonths: number;
  gender: "male" | "female";
  disability?: string;
  symptoms?: string[];
  className?: string;
  animating?: boolean;
  outcome?: "improving" | "worsening" | "neutral";
  bp?: string;
  hr?: number;
  temp?: number;
  spo2?: number;
  rr?: number;
  diseaseName?: string;
}

type AgeGroup = "infant" | "toddler" | "child" | "teen" | "adult" | "elderly";

function getAgeGroup(ageMonths: number): AgeGroup {
  if (ageMonths <= 12) return "infant";
  if (ageMonths <= 36) return "toddler";
  if (ageMonths <= 144) return "child";
  if (ageMonths <= 204) return "teen";
  if (ageMonths <= 720) return "adult";
  return "elderly";
}

function getSkinColor(outcome?: string): string {
  if (outcome === "improving") return "oklch(0.78 0.07 65)";
  if (outcome === "worsening") return "oklch(0.72 0.06 40)";
  return "oklch(0.82 0.06 65)";
}

interface PatientSVGProps {
  ageGroup: AgeGroup;
  gender: "male" | "female";
  skinColor: string;
  hasFever: boolean;
  hasChestPain: boolean;
  hasDisability: boolean;
  disabilityType: string;
  animating: boolean;
}

function PatientSVG({
  ageGroup,
  gender,
  skinColor,
  hasFever,
  hasChestPain,
  hasDisability,
  disabilityType,
  animating,
}: PatientSVGProps) {
  const scale =
    ageGroup === "infant"
      ? 0.5
      : ageGroup === "toddler"
        ? 0.65
        : ageGroup === "child"
          ? 0.78
          : ageGroup === "teen"
            ? 0.9
            : ageGroup === "elderly"
              ? 0.88
              : 1;

  const hairColor = gender === "female" ? "#5C3A1A" : "#2C1A0A";
  const shirtColor =
    gender === "female" ? "oklch(0.72 0.12 340)" : "oklch(0.42 0.09 230)";
  const pantColor =
    ageGroup === "elderly" ? "oklch(0.55 0.04 260)" : "oklch(0.35 0.06 250)";

  return (
    <svg
      viewBox="0 0 120 220"
      width="120"
      height="220"
      aria-label="Virtual patient figure"
      role="img"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        filter: animating
          ? "drop-shadow(0 4px 20px rgba(0, 180, 255, 0.45))"
          : "none",
        transition: "filter 0.5s ease",
      }}
    >
      {/* Breathing animation container */}
      <g
        style={{
          animation: animating ? "breathe 3s ease-in-out infinite" : "none",
          transformOrigin: "60px 110px",
        }}
      >
        {/* Body / Torso */}
        <rect
          x={gender === "female" ? "32" : "35"}
          y="90"
          width={gender === "female" ? "56" : "50"}
          height="70"
          rx="8"
          fill={shirtColor}
        />

        {/* Neck */}
        <rect x="50" y="80" width="20" height="15" rx="4" fill={skinColor} />

        {/* Head */}
        <ellipse
          cx="60"
          cy={ageGroup === "infant" ? "55" : "65"}
          rx={
            ageGroup === "infant" ? "22" : ageGroup === "elderly" ? "19" : "20"
          }
          ry={
            ageGroup === "infant" ? "20" : ageGroup === "elderly" ? "22" : "22"
          }
          fill={skinColor}
        />

        {/* Hair */}
        {ageGroup !== "infant" && (
          <ellipse
            cx="60"
            cy={ageGroup === "elderly" ? "50" : "48"}
            rx={ageGroup === "elderly" ? "16" : "20"}
            ry={ageGroup === "elderly" ? "10" : "14"}
            fill={ageGroup === "elderly" ? "#CCCCCC" : hairColor}
          />
        )}

        {/* Female long hair */}
        {gender === "female" && ageGroup !== "infant" && (
          <>
            <rect
              x="40"
              y="55"
              width="8"
              height={ageGroup === "child" ? "30" : "40"}
              rx="4"
              fill={hairColor}
            />
            <rect
              x="72"
              y="55"
              width="8"
              height={ageGroup === "child" ? "30" : "40"}
              rx="4"
              fill={hairColor}
            />
          </>
        )}

        {/* Eyes */}
        <circle
          cx="53"
          cy={ageGroup === "elderly" ? "67" : "66"}
          r="2.5"
          fill="#2C1A0A"
        />
        <circle
          cx="67"
          cy={ageGroup === "elderly" ? "67" : "66"}
          r="2.5"
          fill="#2C1A0A"
        />

        {/* Glasses for elderly */}
        {ageGroup === "elderly" && (
          <>
            <circle
              cx="53"
              cy="67"
              r="5"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            />
            <circle
              cx="67"
              cy="67"
              r="5"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            />
            <line
              x1="58"
              y1="67"
              x2="62"
              y2="67"
              stroke="#888"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* Smile / expression */}
        <path
          d={hasChestPain ? "M 53 75 Q 60 73 67 75" : "M 53 75 Q 60 79 67 75"}
          stroke="#2C1A0A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Fever blush */}
        {hasFever && (
          <>
            <circle cx="48" cy="70" r="5" fill="oklch(0.65 0.18 25 / 40%)" />
            <circle cx="72" cy="70" r="5" fill="oklch(0.65 0.18 25 / 40%)" />
          </>
        )}

        {/* Chest pain indication */}
        {hasChestPain && (
          <text
            x="55"
            y="120"
            fontSize="14"
            textAnchor="middle"
            fill="oklch(0.55 0.22 27)"
          >
            ✦
          </text>
        )}

        {/* Arms */}
        <rect
          x={gender === "female" ? "20" : "23"}
          y="92"
          width="14"
          height="55"
          rx="7"
          fill={skinColor}
          style={{
            transform: hasChestPain ? "rotate(15deg)" : "none",
            transformOrigin: "30px 92px",
          }}
        />
        <rect
          x={gender === "female" ? "86" : "83"}
          y="92"
          width="14"
          height="55"
          rx="7"
          fill={skinColor}
          style={{
            transform: hasChestPain ? "rotate(-15deg)" : "none",
            transformOrigin: "90px 92px",
          }}
        />

        {/* Pants / Skirt */}
        {gender === "female" && ageGroup !== "infant" ? (
          <path
            d="M 32 158 Q 60 170 88 158 L 95 210 L 70 210 L 60 185 L 50 210 L 25 210 Z"
            fill={pantColor}
          />
        ) : (
          <>
            <rect
              x="37"
              y="155"
              width="20"
              height="55"
              rx="6"
              fill={pantColor}
            />
            <rect
              x="63"
              y="155"
              width="20"
              height="55"
              rx="6"
              fill={pantColor}
            />
          </>
        )}

        {/* Feet */}
        <ellipse cx="47" cy="212" rx="12" ry="6" fill={skinColor} />
        <ellipse cx="73" cy="212" rx="12" ry="6" fill={skinColor} />

        {/* Cane for elderly */}
        {ageGroup === "elderly" && (
          <line
            x1="90"
            y1="147"
            x2="105"
            y2="212"
            stroke="#8B6914"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </g>

      {/* Wheelchair overlay */}
      {hasDisability && disabilityType.toLowerCase().includes("wheelchair") && (
        <g transform="translate(10, 140)">
          <circle
            cx="25"
            cy="60"
            r="18"
            fill="none"
            stroke="oklch(0.45 0.12 240)"
            strokeWidth="3"
          />
          <circle cx="25" cy="60" r="4" fill="oklch(0.45 0.12 240)" />
          <circle
            cx="75"
            cy="60"
            r="18"
            fill="none"
            stroke="oklch(0.45 0.12 240)"
            strokeWidth="3"
          />
          <rect
            x="10"
            y="20"
            width="75"
            height="20"
            rx="5"
            fill="oklch(0.45 0.12 240)"
          />
          <rect
            x="10"
            y="40"
            width="10"
            height="25"
            rx="3"
            fill="oklch(0.45 0.12 240)"
          />
          <rect
            x="80"
            y="40"
            width="10"
            height="25"
            rx="3"
            fill="oklch(0.45 0.12 240)"
          />
        </g>
      )}

      {/* Hearing aid */}
      {hasDisability && disabilityType.toLowerCase().includes("hearing") && (
        <circle
          cx="79"
          cy="65"
          r="5"
          fill="oklch(0.75 0.08 65)"
          stroke="oklch(0.55 0.1 65)"
          strokeWidth="1"
        />
      )}

      {/* Visual impairment indicator */}
      {hasDisability &&
        (disabilityType.toLowerCase().includes("visual") ||
          disabilityType.toLowerCase().includes("blind")) && (
          <line
            x1="30"
            y1="180"
            x2="50"
            y2="215"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
    </svg>
  );
}

// ─── ECG Strip ─────────────────────────────────────────────────────
function EcgStrip({ color }: { color: string }) {
  const path =
    "M0,12 L30,12 L35,12 L38,3 L41,21 L44,3 L47,12 L55,12 L80,12 L85,12 L88,3 L91,21 L94,3 L97,12 L105,12 L130,12 L135,12 L138,3 L141,21 L144,3 L147,12 L160,12";
  return (
    <svg
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      className="h-6 w-full"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="400"
        style={{
          animation: "ecg-scroll 2.5s linear infinite",
        }}
      />
    </svg>
  );
}

// ─── Vital Box ─────────────────────────────────────────────────────
interface VitalBoxProps {
  label: string;
  value: string;
  unit: string;
  color: string;
  pulsing?: boolean;
  status?: "normal" | "warning" | "critical";
}

function VitalBox({
  label,
  value,
  unit,
  color,
  pulsing = false,
}: VitalBoxProps) {
  return (
    <div
      className="flex flex-col items-center rounded-xl p-2.5"
      style={{
        background: "rgba(0, 10, 25, 0.6)",
        border: `1px solid ${color}33`,
      }}
    >
      <span
        className="font-mono text-xl font-black leading-none"
        style={{
          color,
          textShadow: `0 0 8px ${color}88`,
          animation: pulsing
            ? "vital-pulse 1.2s ease-in-out infinite"
            : undefined,
        }}
      >
        {value}
      </span>
      <span
        className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider"
        style={{ color: `${color}99` }}
      >
        {unit}
      </span>
      <span
        className="mt-1 text-[8px] font-medium uppercase tracking-widest"
        style={{ color: "rgba(150, 200, 255, 0.4)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main VirtualPatient ──────────────────────────────────────────
export function VirtualPatient({
  ageMonths,
  gender,
  disability,
  symptoms = [],
  className,
  animating = true,
  outcome = "neutral",
  bp = "120/80",
  hr = 72,
  temp = 37,
  spo2 = 98,
  rr = 16,
  diseaseName,
}: VirtualPatientProps) {
  const ageGroup = getAgeGroup(ageMonths);
  const skinColor = getSkinColor(outcome);

  const lowerSymptoms = symptoms.map((s) => s.toLowerCase());
  const hasFever = lowerSymptoms.some(
    (s) =>
      s.includes("fever") || s.includes("temperature") || s.includes("pyrexia"),
  );
  const hasChestPain = lowerSymptoms.some(
    (s) => s.includes("chest") || s.includes("cardiac"),
  );
  const hasDisability = !!disability && disability.trim() !== "";

  const ageLabel =
    ageMonths <= 12
      ? `${ageMonths}m`
      : ageMonths <= 24
        ? `${Math.floor(ageMonths / 12)}y ${ageMonths % 12}m`
        : `${Math.floor(ageMonths / 12)}y`;

  const ageGroupLabels: Record<AgeGroup, string> = {
    infant: "Shishu (Infant)",
    toddler: "Toddler",
    child: "Bachha (Child)",
    teen: "Kishor (Teen)",
    adult: "Vyaskh (Adult)",
    elderly: "Buzhurg (Elderly)",
  };

  const outcomeStatus = {
    improving: {
      label: "Condition Improving",
      ecgColor: "#00e676",
      statusColor: "#00e676",
    },
    worsening: {
      label: "Side Effects Active",
      ecgColor: "#ff3355",
      statusColor: "#ff3355",
    },
    neutral: { label: "Stable", ecgColor: "#00d4ff", statusColor: "#00d4ff" },
  }[outcome];

  // Treatment response overlay styles
  const improvingOverlay =
    outcome === "improving"
      ? {
          boxShadow:
            "inset 0 0 40px rgba(0, 230, 118, 0.12), 0 0 30px rgba(0, 230, 118, 0.15)",
          animation: "improving-pulse 2.5s ease-in-out infinite",
        }
      : {};

  const worseningStyle =
    outcome === "worsening"
      ? { animation: "worsening-shake 0.4s ease-in-out infinite" }
      : {};

  return (
    <div
      className={cn("flex flex-col rounded-2xl overflow-hidden", className)}
      style={{
        background: "rgba(5, 15, 35, 0.95)",
        border: "1.5px solid oklch(0.65 0.2 220 / 50%)",
        boxShadow:
          "0 0 0 1px oklch(0.65 0.2 220 / 15%), 0 0 24px oklch(0.65 0.2 220 / 20%), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...improvingOverlay,
      }}
    >
      {/* ── Top ECG bar ── */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          background: "rgba(0, 10, 20, 0.7)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.12)",
        }}
      >
        <span
          className="font-mono text-[9px] font-bold uppercase tracking-widest"
          style={{ color: "rgba(0, 212, 255, 0.5)" }}
        >
          ECG
        </span>
        {diseaseName && (
          <span
            className="font-mono text-[9px] truncate max-w-[100px]"
            style={{ color: "rgba(0, 212, 255, 0.35)" }}
            title={diseaseName}
          >
            · {diseaseName.toUpperCase()}
          </span>
        )}
        <div className="flex-1 overflow-hidden">
          <EcgStrip color={outcomeStatus.ecgColor} />
        </div>
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: outcomeStatus.statusColor,
            boxShadow: `0 0 6px ${outcomeStatus.statusColor}`,
            animation: "pulse-glow 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Vitals grid ── */}
      <div className="grid grid-cols-5 gap-1.5 px-3 pt-2.5 pb-1.5">
        <VitalBox
          label="HR"
          value={String(hr)}
          unit="bpm"
          color="#ff6b6b"
          pulsing={animating}
        />
        <VitalBox label="SpO2" value={`${spo2}%`} unit="%" color="#00d4ff" />
        <VitalBox label="BP" value={bp} unit="mmHg" color="#00e676" />
        <VitalBox
          label="Temp"
          value={`${temp}°`}
          unit="°C"
          color={temp > 38 ? "#ffb800" : "#ffd166"}
        />
        <VitalBox label="RR" value={String(rr)} unit="/min" color="#a5f3fc" />
      </div>

      {/* ── Patient figure area ── */}
      <div className="relative flex flex-col items-center px-4 pb-3 pt-1">
        {/* Status indicator pill */}
        <div
          className="mb-2 flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold"
          style={{
            background: `${outcomeStatus.statusColor}18`,
            border: `1px solid ${outcomeStatus.statusColor}44`,
            color: outcomeStatus.statusColor,
            boxShadow: `0 0 10px ${outcomeStatus.statusColor}22`,
            letterSpacing: "0.05em",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: outcomeStatus.statusColor,
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          {outcomeStatus.label}
        </div>

        {/* Patient + ambient glow */}
        <motion.div
          className="relative flex items-end justify-center"
          style={{ height: 240, width: 160, ...worseningStyle }}
          animate={
            outcome === "worsening"
              ? { x: [0, -3, 3, -2, 2, 0] }
              : outcome === "improving"
                ? { scale: [1, 1.01, 1] }
                : {}
          }
          transition={
            outcome === "worsening"
              ? {
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1.5,
                }
              : outcome === "improving"
                ? {
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
                : {}
          }
        >
          {/* Ambient blue glow behind patient */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 140,
              height: 180,
              background:
                outcome === "improving"
                  ? "radial-gradient(ellipse at 50% 80%, rgba(0, 230, 118, 0.18) 0%, transparent 70%)"
                  : outcome === "worsening"
                    ? "radial-gradient(ellipse at 50% 80%, rgba(255, 51, 85, 0.15) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at 50% 80%, rgba(0, 150, 255, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <PatientSVG
            ageGroup={ageGroup}
            gender={gender}
            skinColor={skinColor}
            hasFever={hasFever}
            hasChestPain={hasChestPain}
            hasDisability={hasDisability}
            disabilityType={disability || ""}
            animating={animating}
          />

          {/* Symptom badges — blinking alert style */}
          {hasFever && (
            <div
              className="absolute right-0 top-8 rounded-full px-2 py-0.5 text-xs font-bold animate-alert-blink"
              style={{
                background: "rgba(255, 100, 50, 0.2)",
                border: "1px solid rgba(255, 100, 50, 0.6)",
                color: "#ff6432",
                boxShadow: "0 0 8px rgba(255, 100, 50, 0.3)",
              }}
            >
              🌡 Fever
            </div>
          )}
          {hasChestPain && (
            <div
              className="absolute left-0 top-12 rounded-full px-2 py-0.5 text-xs font-bold animate-alert-blink"
              style={{
                background: "rgba(255, 51, 85, 0.2)",
                border: "1px solid rgba(255, 51, 85, 0.6)",
                color: "#ff3355",
                boxShadow: "0 0 8px rgba(255, 51, 85, 0.3)",
                animationDelay: "0.5s",
              }}
            >
              💔 Chest Pain
            </div>
          )}
        </motion.div>

        {/* Patient info — monospace style */}
        <div
          className="mt-1 text-center"
          style={{ color: "rgba(180, 210, 255, 0.7)" }}
        >
          <p className="font-mono text-sm font-bold tracking-wider">
            {gender === "male" ? "♂ MALE" : "♀ FEMALE"} · {ageLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            {ageGroupLabels[ageGroup]}
          </p>
          {disability && (
            <p
              className="mt-1 rounded-lg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{
                background: "rgba(255, 184, 0, 0.1)",
                border: "1px solid rgba(255, 184, 0, 0.3)",
                color: "#ffb800",
              }}
            >
              {disability}
            </p>
          )}
        </div>

        {/* Active symptom badges — up to 6 */}
        {symptoms.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {symptoms.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider animate-alert-blink"
                style={{
                  background: "rgba(255, 51, 85, 0.12)",
                  border: "1px solid rgba(255, 51, 85, 0.4)",
                  color: "#ff7095",
                  animationDelay: `${Math.random() * 0.8}s`,
                }}
              >
                ⚠ {s}
              </span>
            ))}
            {symptoms.length > 6 && (
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                style={{
                  background: "rgba(100, 150, 200, 0.1)",
                  color: "rgba(150, 200, 255, 0.5)",
                }}
              >
                +{symptoms.length - 6} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualPatient;
