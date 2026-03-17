import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface PatientDistressAvatarProps {
  spo2?: number;
  hasAnemia?: boolean;
  hasJaundice?: boolean;
  hasRespiratoryDistress?: boolean;
  /** Patient name or brief descriptor */
  label?: string;
}

export function PatientDistressAvatar({
  spo2 = 98,
  hasAnemia = false,
  hasJaundice = false,
  hasRespiratoryDistress = false,
  label,
}: PatientDistressAvatarProps) {
  const hasCyanosis = spo2 < 90;

  // Determine skin tone overlays
  const faceColor = hasJaundice
    ? "oklch(0.72 0.16 90)" // jaundiced yellow
    : hasAnemia
      ? "oklch(0.82 0.03 60)" // pallor
      : "oklch(0.68 0.12 50)"; // normal

  const lipColor = hasCyanosis
    ? "oklch(0.5 0.18 260)" // cyanotic blue-purple
    : "oklch(0.55 0.15 20)"; // normal pink

  const badges = [
    hasCyanosis && {
      label: "Cyanosis",
      color: "oklch(0.5 0.18 260)",
      bg: "oklch(0.2 0.1 260 / 0.3)",
    },
    hasAnemia && {
      label: "Pallor",
      color: "oklch(0.75 0.05 60)",
      bg: "oklch(0.2 0.03 60 / 0.3)",
    },
    hasJaundice && {
      label: "Jaundice",
      color: "oklch(0.72 0.16 90)",
      bg: "oklch(0.25 0.1 90 / 0.3)",
    },
    hasRespiratoryDistress && {
      label: "Resp. Distress",
      color: "oklch(0.7 0.18 25)",
      bg: "oklch(0.25 0.12 25 / 0.3)",
    },
  ].filter(Boolean) as { label: string; color: string; bg: string }[];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* SVG patient figure */}
      <div className="relative">
        <svg
          viewBox="0 0 80 120"
          width="80"
          height="120"
          role="img"
          aria-label="Patient figure"
          className="block"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
        >
          {/* Head */}
          <ellipse cx="40" cy="20" rx="16" ry="18" fill={faceColor} />

          {/* Hair */}
          <ellipse cx="40" cy="6" rx="16" ry="8" fill="oklch(0.25 0.05 60)" />

          {/* Eyes */}
          <ellipse cx="34" cy="18" rx="3" ry="3.5" fill="white" />
          <ellipse cx="46" cy="18" rx="3" ry="3.5" fill="white" />
          <circle cx="34" cy="18" r="1.8" fill="oklch(0.25 0.1 50)" />
          <circle cx="46" cy="18" r="1.8" fill="oklch(0.25 0.1 50)" />
          {/* Pupils */}
          <circle cx="34.5" cy="17.5" r="0.7" fill="white" />
          <circle cx="46.5" cy="17.5" r="0.7" fill="white" />

          {/* Nose */}
          <path
            d="M 38 23 Q 40 26 42 23"
            fill="none"
            stroke="oklch(0.5 0.1 50)"
            strokeWidth="0.8"
          />

          {/* Lips — color changes with cyanosis */}
          <path d="M 35 28 Q 40 32 45 28" fill={lipColor} opacity="0.9" />
          <path
            d="M 35 28 Q 40 30 45 28"
            fill="none"
            stroke={lipColor}
            strokeWidth="1.2"
          />

          {/* Neck */}
          <rect x="35" y="36" width="10" height="8" rx="2" fill={faceColor} />

          {/* Body / Hospital gown */}
          <path
            d="M 20 44 Q 15 55 14 90 L 66 90 Q 65 55 60 44 Q 50 40 40 40 Q 30 40 20 44 Z"
            fill="oklch(0.85 0.02 220)"
          />
          {/* Gown pattern lines */}
          <line
            x1="32"
            y1="45"
            x2="28"
            y2="88"
            stroke="oklch(0.75 0.02 220)"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="44"
            x2="40"
            y2="89"
            stroke="oklch(0.75 0.02 220)"
            strokeWidth="0.7"
          />
          <line
            x1="48"
            y1="45"
            x2="52"
            y2="88"
            stroke="oklch(0.75 0.02 220)"
            strokeWidth="1"
          />

          {/* Arms */}
          <path
            d="M 20 44 Q 8 56 10 76"
            fill="none"
            stroke={faceColor}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 60 44 Q 72 56 70 76"
            fill="none"
            stroke={faceColor}
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Hands */}
          <ellipse cx="10" cy="78" rx="5" ry="4" fill={faceColor} />
          <ellipse cx="70" cy="78" rx="5" ry="4" fill={faceColor} />

          {/* Legs */}
          <rect
            x="28"
            y="88"
            width="10"
            height="26"
            rx="4"
            fill="oklch(0.75 0.02 220)"
          />
          <rect
            x="42"
            y="88"
            width="10"
            height="26"
            rx="4"
            fill="oklch(0.75 0.02 220)"
          />

          {/* IV line if distressed */}
          {(hasCyanosis || hasRespiratoryDistress) && (
            <>
              <line
                x1="70"
                y1="78"
                x2="80"
                y2="55"
                stroke="oklch(0.65 0.1 196)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <rect
                x="78"
                y="45"
                width="2"
                height="14"
                rx="1"
                fill="oklch(0.65 0.15 196)"
              />
            </>
          )}

          {/* Oxygen mask for respiratory distress */}
          {hasRespiratoryDistress && (
            <ellipse
              cx="40"
              cy="26"
              rx="12"
              ry="7"
              fill="oklch(0.7 0.08 196 / 0.35)"
              stroke="oklch(0.7 0.12 196 / 0.6)"
              strokeWidth="1"
            />
          )}

          {/* Chest animation for respiratory distress */}
          {hasRespiratoryDistress && (
            <motion.ellipse
              cx="40"
              cy="62"
              rx="18"
              ry="10"
              fill="oklch(0.7 0.08 25 / 0.12)"
              stroke="none"
              animate={{ ry: [10, 13, 10] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Jaundice yellow tint overlay */}
          {hasJaundice && (
            <ellipse
              cx="40"
              cy="20"
              rx="16"
              ry="18"
              fill="oklch(0.72 0.16 90 / 0.2)"
            />
          )}
        </svg>
      </div>

      {/* Condition badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {badges.map((b) => (
            <Badge
              key={b.label}
              className="text-[10px] px-1.5 py-0.5"
              style={{
                background: b.bg,
                color: b.color,
                border: `1px solid ${b.color}`,
              }}
            >
              {b.label}
            </Badge>
          ))}
        </div>
      )}

      {label && (
        <p
          className="text-[11px] text-center"
          style={{ color: "oklch(0.6 0.05 235)" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
