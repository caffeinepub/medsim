import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

interface VirtualPatientProps {
  ageMonths: number;
  gender: "male" | "female" | "other";
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
        style={{ animation: "ecg-scroll 2.5s linear infinite" }}
      />
    </svg>
  );
}

interface VitalBoxProps {
  label: string;
  value: string;
  unit: string;
  color: string;
  pulsing?: boolean;
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

// ─── Realistic Human Patient SVG ──────────────────────────────────────────────
interface RealisticPatientSVGProps {
  ageGroup: AgeGroup;
  gender: "male" | "female" | "other";
  hasCyanosis: boolean;
  hasJaundice: boolean;
  hasPallor: boolean;
  hasRespiratoryDistress: boolean;
  hasFever: boolean;
  hasChestPain: boolean;
  hasDisability: boolean;
  disabilityType: string;
  animating: boolean;
  outcome: "improving" | "worsening" | "neutral";
}

function RealisticPatientSVG({
  ageGroup,
  gender,
  hasCyanosis,
  hasJaundice,
  hasPallor,
  hasFever,
  hasChestPain,
  hasDisability,
  disabilityType,
  animating,
  outcome,
}: RealisticPatientSVGProps) {
  // Skin tone based on clinical condition
  let skinBase = { l: 0.72, c: 0.06, h: 55 }; // warm medium brown
  if (ageGroup === "infant") skinBase = { l: 0.85, c: 0.04, h: 60 };
  if (ageGroup === "elderly") skinBase = { l: 0.78, c: 0.04, h: 50 };
  if (hasPallor) skinBase = { l: 0.88, c: 0.02, h: 40 };
  if (hasJaundice) skinBase = { l: 0.82, c: 0.14, h: 75 };
  if (outcome === "worsening")
    skinBase = { l: skinBase.l - 0.05, c: skinBase.c, h: skinBase.h };

  const skinColor = `oklch(${skinBase.l} ${skinBase.c} ${skinBase.h})`;
  const skinDark = `oklch(${skinBase.l - 0.1} ${skinBase.c + 0.02} ${skinBase.h})`;
  const skinLight = `oklch(${Math.min(0.97, skinBase.l + 0.08)} ${Math.max(0, skinBase.c - 0.01)} ${skinBase.h})`;

  // Lip color
  const lipColor = hasCyanosis
    ? "oklch(0.45 0.18 260)"
    : hasJaundice
      ? "oklch(0.55 0.12 70)"
      : hasPallor
        ? "oklch(0.72 0.06 15)"
        : "oklch(0.55 0.18 18)";

  // Sclera / eye white color for jaundice
  const scleraColor = hasJaundice ? "oklch(0.92 0.08 80)" : "white";

  // Hair color based on age/gender
  const hairColor =
    ageGroup === "elderly"
      ? "oklch(0.85 0.0 0)"
      : gender === "female"
        ? "oklch(0.35 0.07 55)"
        : "oklch(0.22 0.05 55)";

  // Gown color
  const gownColor = "oklch(0.88 0.06 220)";
  const gownDark = "oklch(0.78 0.07 215)";

  const isChild =
    ageGroup === "infant" || ageGroup === "toddler" || ageGroup === "child";
  const headScale = isChild ? 1.15 : 1.0;

  const breathAnimation = animating
    ? { animation: "breathe 3.5s ease-in-out infinite" }
    : {};

  return (
    <svg
      viewBox="0 0 200 380"
      width="180"
      height="340"
      aria-label="Realistic patient illustration"
      role="img"
      style={{
        filter: animating
          ? `drop-shadow(0 6px 24px rgba(0, 180, 255, 0.35))${
              hasCyanosis ? " hue-rotate(-15deg) saturate(1.2)" : ""
            }${
              hasJaundice ? " sepia(0.3) saturate(1.5) hue-rotate(20deg)" : ""
            }`
          : "none",
        transition: "filter 0.5s ease",
      }}
    >
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={skinLight} />
          <stop offset="100%" stopColor={skinDark} />
        </radialGradient>
        <radialGradient id="cheekGlow" cx="50%" cy="60%" r="50%">
          <stop
            offset="0%"
            stopColor={
              hasFever
                ? "oklch(0.62 0.18 20 / 50%)"
                : "oklch(0.65 0.12 20 / 20%)"
            }
          />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="headGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={skinLight} />
          <stop offset="70%" stopColor={skinColor} />
          <stop offset="100%" stopColor={skinDark} />
        </radialGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="rgba(0,0,0,0.3)"
          />
        </filter>
        <clipPath id="headClip">
          <ellipse cx="100" cy="72" rx={28 * headScale} ry={34 * headScale} />
        </clipPath>
      </defs>

      {/* ─── BODY / GOWN ─── */}
      <g style={{ ...breathAnimation, transformOrigin: "100px 200px" }}>
        {/* Gown body */}
        <path
          d="M 70 145 C 55 150 42 160 38 190 L 32 320 L 168 320 L 162 190 C 158 160 145 150 130 145 Z"
          fill={gownColor}
          filter="url(#softShadow)"
        />
        {/* Gown chest folds */}
        <path
          d="M 100 148 L 95 200 L 100 220 L 105 200 Z"
          fill={gownDark}
          opacity="0.4"
        />
        <path
          d="M 75 155 L 68 240"
          stroke={gownDark}
          strokeWidth="1"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M 125 155 L 132 240"
          stroke={gownDark}
          strokeWidth="1"
          opacity="0.5"
          fill="none"
        />
        {/* Gown tie straps */}
        <path
          d="M 88 148 L 82 135 M 112 148 L 118 135"
          stroke={gownDark}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Gown lower folds */}
        <path
          d="M 55 280 Q 100 290 145 280"
          stroke={gownDark}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 45 300 Q 100 312 155 300"
          stroke={gownDark}
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* ─── NECK ─── */}
      <path
        d="M 90 115 C 88 128 88 138 87 145 L 113 145 C 112 138 112 128 110 115 Z"
        fill={skinColor}
      />
      {/* Neck shadow */}
      <path
        d="M 93 130 C 92 138 91 143 90 145 L 110 145 C 109 143 108 138 107 130 Z"
        fill={skinDark}
        opacity="0.3"
      />

      {/* ─── HEAD ─── */}
      <g filter="url(#softShadow)">
        {/* Main head shape */}
        <ellipse
          cx="100"
          cy="72"
          rx={27 * headScale}
          ry={33 * headScale}
          fill="url(#headGrad)"
        />
        {/* Subtle face shading */}
        <ellipse
          cx="100"
          cy="78"
          rx={20 * headScale}
          ry={18 * headScale}
          fill="url(#cheekGlow)"
          opacity="0.6"
        />
        {/* Jaw line refinement */}
        <path
          d={`M ${100 - 18 * headScale} ${72 + 20 * headScale} Q 100 ${72 + 38 * headScale} ${100 + 18 * headScale} ${72 + 20 * headScale}`}
          fill={skinDark}
          opacity="0.15"
        />
      </g>

      {/* ─── EARS ─── */}
      <g>
        {/* Left ear */}
        <ellipse
          cx={100 - 27 * headScale}
          cy="72"
          rx={5 * headScale}
          ry={8 * headScale}
          fill={skinColor}
        />
        <ellipse
          cx={100 - 27 * headScale}
          cy="72"
          rx={3 * headScale}
          ry={5 * headScale}
          fill={skinDark}
          opacity="0.35"
        />
        {/* Right ear */}
        <ellipse
          cx={100 + 27 * headScale}
          cy="72"
          rx={5 * headScale}
          ry={8 * headScale}
          fill={skinColor}
        />
        <ellipse
          cx={100 + 27 * headScale}
          cy="72"
          rx={3 * headScale}
          ry={5 * headScale}
          fill={skinDark}
          opacity="0.35"
        />
      </g>

      {/* ─── HAIR ─── */}
      {ageGroup !== "infant" && (
        <g>
          {gender === "female" ? (
            <>
              {/* Female hair - fuller, longer */}
              <ellipse
                cx="100"
                cy={72 - 30 * headScale}
                rx={28 * headScale}
                ry={16 * headScale}
                fill={hairColor}
              />
              {/* Side hair strands */}
              <path
                d={`M ${100 - 27 * headScale} 55 C ${100 - 38 * headScale} 70 ${100 - 42 * headScale} 90 ${100 - 38 * headScale} 115`}
                stroke={hairColor}
                strokeWidth={9 * headScale}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M ${100 + 27 * headScale} 55 C ${100 + 38 * headScale} 70 ${100 + 42 * headScale} 90 ${100 + 38 * headScale} 115`}
                stroke={hairColor}
                strokeWidth={9 * headScale}
                strokeLinecap="round"
                fill="none"
              />
              {/* Hair highlight */}
              <path
                d={`M ${100 - 8} ${72 - 30 * headScale} Q 100 ${72 - 38 * headScale} ${100 + 8} ${72 - 30 * headScale}`}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : gender === "male" ? (
            <>
              {/* Male hair - shorter, neat */}
              <ellipse
                cx="100"
                cy={72 - 28 * headScale}
                rx={26 * headScale}
                ry={12 * headScale}
                fill={hairColor}
              />
              {/* Sideburns */}
              <rect
                x={100 - 28 * headScale}
                y="55"
                width={7 * headScale}
                height={12 * headScale}
                rx={3}
                fill={hairColor}
              />
              <rect
                x={100 + 21 * headScale}
                y="55"
                width={7 * headScale}
                height={12 * headScale}
                rx={3}
                fill={hairColor}
              />
            </>
          ) : (
            <>
              {/* Other/neutral - medium length */}
              <ellipse
                cx="100"
                cy={72 - 28 * headScale}
                rx={27 * headScale}
                ry={13 * headScale}
                fill={hairColor}
              />
              <path
                d={`M ${100 - 26 * headScale} 58 C ${100 - 34 * headScale} 72 ${100 - 30 * headScale} 95 ${100 - 26 * headScale} 105`}
                stroke={hairColor}
                strokeWidth={7 * headScale}
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          {/* Elderly — grey hair, receding */}
          {ageGroup === "elderly" && (
            <>
              <ellipse
                cx="100"
                cy={72 - 26 * headScale}
                rx={20 * headScale}
                ry={8 * headScale}
                fill={hairColor}
              />
              {/* White streaks */}
              <path
                d={`M ${100 - 5} ${72 - 28 * headScale} Q 100 ${72 - 35 * headScale} ${100 + 5} ${72 - 28 * headScale}`}
                stroke="oklch(0.95 0 0 / 40%)"
                strokeWidth="1.5"
                fill="none"
              />
            </>
          )}
        </g>
      )}

      {/* ─── EYEBROWS ─── */}
      <g>
        {/* Left eyebrow */}
        <path
          d={`M ${100 - 20 * headScale} ${72 - 14 * headScale} Q ${100 - 12 * headScale} ${72 - 18 * headScale} ${100 - 4 * headScale} ${72 - 15 * headScale}`}
          stroke={hairColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Right eyebrow */}
        <path
          d={`M ${100 + 4 * headScale} ${72 - 15 * headScale} Q ${100 + 12 * headScale} ${72 - 18 * headScale} ${100 + 20 * headScale} ${72 - 14 * headScale}`}
          stroke={hairColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* ─── EYES ─── */}
      <g>
        {/* Left eye socket */}
        <ellipse
          cx={100 - 12 * headScale}
          cy={72 - 5 * headScale}
          rx={8 * headScale}
          ry={5.5 * headScale}
          fill={scleraColor}
        />
        {/* Left iris */}
        <circle
          cx={100 - 12 * headScale}
          cy={72 - 5 * headScale}
          r={3.8 * headScale}
          fill={hasCyanosis ? "oklch(0.4 0.2 260)" : "oklch(0.45 0.15 220)"}
        />
        {/* Left pupil */}
        <circle
          cx={100 - 12 * headScale}
          cy={72 - 5 * headScale}
          r={2 * headScale}
          fill="oklch(0.08 0 0)"
        />
        {/* Left eye highlight */}
        <circle
          cx={100 - 12 * headScale + 1.5}
          cy={72 - 5 * headScale - 1.5}
          r={0.8 * headScale}
          fill="white"
          opacity="0.8"
        />
        {/* Left upper eyelid */}
        <path
          d={`M ${100 - 20 * headScale} ${72 - 5 * headScale} Q ${100 - 12 * headScale} ${72 - 11 * headScale} ${100 - 4 * headScale} ${72 - 5 * headScale}`}
          fill={skinDark}
          opacity="0.5"
        />
        {/* Left lower eyelid line */}
        <path
          d={`M ${100 - 20 * headScale} ${72 - 5 * headScale} Q ${100 - 12 * headScale} ${72 - 0 * headScale} ${100 - 4 * headScale} ${72 - 5 * headScale}`}
          stroke={skinDark}
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />

        {/* Right eye socket */}
        <ellipse
          cx={100 + 12 * headScale}
          cy={72 - 5 * headScale}
          rx={8 * headScale}
          ry={5.5 * headScale}
          fill={scleraColor}
        />
        {/* Right iris */}
        <circle
          cx={100 + 12 * headScale}
          cy={72 - 5 * headScale}
          r={3.8 * headScale}
          fill={hasCyanosis ? "oklch(0.4 0.2 260)" : "oklch(0.45 0.15 220)"}
        />
        {/* Right pupil */}
        <circle
          cx={100 + 12 * headScale}
          cy={72 - 5 * headScale}
          r={2 * headScale}
          fill="oklch(0.08 0 0)"
        />
        {/* Right eye highlight */}
        <circle
          cx={100 + 12 * headScale + 1.5}
          cy={72 - 5 * headScale - 1.5}
          r={0.8 * headScale}
          fill="white"
          opacity="0.8"
        />
        {/* Right upper eyelid */}
        <path
          d={`M ${100 + 4 * headScale} ${72 - 5 * headScale} Q ${100 + 12 * headScale} ${72 - 11 * headScale} ${100 + 20 * headScale} ${72 - 5 * headScale}`}
          fill={skinDark}
          opacity="0.5"
        />
        <path
          d={`M ${100 + 4 * headScale} ${72 - 5 * headScale} Q ${100 + 12 * headScale} ${72 - 0 * headScale} ${100 + 20 * headScale} ${72 - 5 * headScale}`}
          stroke={skinDark}
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* Glasses for elderly */}
      {ageGroup === "elderly" && (
        <g opacity="0.7">
          <circle
            cx={100 - 12 * headScale}
            cy={72 - 5 * headScale}
            r={9.5 * headScale}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <circle
            cx={100 + 12 * headScale}
            cy={72 - 5 * headScale}
            r={9.5 * headScale}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <path
            d={`M ${100 - 2.5 * headScale} ${72 - 5 * headScale} L ${100 + 2.5 * headScale} ${72 - 5 * headScale}`}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <path
            d={`M ${100 - 22 * headScale} ${72 - 5 * headScale} L ${100 - 30 * headScale} ${72 - 2 * headScale}`}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <path
            d={`M ${100 + 22 * headScale} ${72 - 5 * headScale} L ${100 + 30 * headScale} ${72 - 2 * headScale}`}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* ─── NOSE ─── */}
      <g>
        {/* Nose bridge */}
        <path
          d={`M ${100 - 2 * headScale} ${72 - 2 * headScale} C ${100 - 4 * headScale} ${72 + 4 * headScale} ${100 - 5 * headScale} ${72 + 10 * headScale} ${100 - 4 * headScale} ${72 + 14 * headScale}`}
          stroke={skinDark}
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        <path
          d={`M ${100 + 2 * headScale} ${72 - 2 * headScale} C ${100 + 4 * headScale} ${72 + 4 * headScale} ${100 + 5 * headScale} ${72 + 10 * headScale} ${100 + 4 * headScale} ${72 + 14 * headScale}`}
          stroke={skinDark}
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        {/* Nostrils */}
        <ellipse
          cx={100 - 5 * headScale}
          cy={72 + 14 * headScale}
          rx={3.5 * headScale}
          ry={2.5 * headScale}
          fill={skinDark}
          opacity="0.4"
        />
        <ellipse
          cx={100 + 5 * headScale}
          cy={72 + 14 * headScale}
          rx={3.5 * headScale}
          ry={2.5 * headScale}
          fill={skinDark}
          opacity="0.4"
        />
        {/* Nose tip */}
        <ellipse
          cx="100"
          cy={72 + 13 * headScale}
          rx={5 * headScale}
          ry={3.5 * headScale}
          fill={skinColor}
          opacity="0.6"
        />
      </g>

      {/* ─── MOUTH / LIPS ─── */}
      <g>
        {/* Philtrum */}
        <path
          d={`M ${100 - 3} ${72 + 17 * headScale} L 100 ${72 + 20 * headScale} L ${100 + 3} ${72 + 17 * headScale}`}
          stroke={skinDark}
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        {/* Upper lip */}
        <path
          d={`M ${100 - 9 * headScale} ${72 + 20 * headScale} C ${100 - 6 * headScale} ${72 + 18 * headScale} ${100 - 2 * headScale} ${72 + 17 * headScale} 100 ${72 + 19 * headScale} C ${100 + 2 * headScale} ${72 + 17 * headScale} ${100 + 6 * headScale} ${72 + 18 * headScale} ${100 + 9 * headScale} ${72 + 20 * headScale}`}
          fill={lipColor}
        />
        {/* Lower lip */}
        <path
          d={`M ${100 - 9 * headScale} ${72 + 20 * headScale} Q 100 ${72 + 27 * headScale} ${100 + 9 * headScale} ${72 + 20 * headScale}`}
          fill={lipColor}
          opacity="0.9"
        />
        {/* Mouth line */}
        <path
          d={
            hasChestPain
              ? `M ${100 - 7 * headScale} ${72 + 21 * headScale} Q 100 ${72 + 19 * headScale} ${100 + 7 * headScale} ${72 + 21 * headScale}`
              : `M ${100 - 7 * headScale} ${72 + 21 * headScale} Q 100 ${72 + 24 * headScale} ${100 + 7 * headScale} ${72 + 21 * headScale}`
          }
          stroke="oklch(0.3 0.06 20 / 60%)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Lip highlight */}
        <path
          d={`M ${100 - 4 * headScale} ${72 + 22 * headScale} Q 100 ${72 + 21 * headScale} ${100 + 4 * headScale} ${72 + 22 * headScale}`}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* ─── ARMS ─── */}
      <g>
        {/* Left arm */}
        <path
          d="M 70 148 C 55 160 48 180 45 210 L 42 255 C 40 260 43 265 48 265 C 53 265 56 260 55 255 L 58 215 C 60 190 65 172 72 155 Z"
          fill={skinColor}
        />
        {/* Left hand */}
        <ellipse cx="50" cy="268" rx="8" ry="10" fill={skinColor} />
        <path
          d="M 44 264 L 42 258 M 47 267 L 45 260 M 50 268 L 49 261 M 53 267 L 53 260 M 56 264 L 57 258"
          stroke={skinDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Right arm */}
        <path
          d="M 130 148 C 145 160 152 180 155 210 L 158 255 C 160 260 157 265 152 265 C 147 265 144 260 145 255 L 142 215 C 140 190 135 172 128 155 Z"
          fill={skinColor}
        />
        {/* Right hand */}
        <ellipse cx="150" cy="268" rx="8" ry="10" fill={skinColor} />
        <path
          d="M 156 264 L 158 258 M 153 267 L 155 260 M 150 268 L 151 261 M 147 267 L 147 260 M 144 264 L 143 258"
          stroke={skinDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* ─── LEGS / LOWER BODY ─── */}
      <g>
        {/* Left leg */}
        <path
          d="M 80 318 L 75 365 L 90 365 L 92 318 Z"
          fill={gownDark}
          opacity="0.6"
        />
        {/* Right leg */}
        <path
          d="M 108 318 L 112 365 L 127 365 L 120 318 Z"
          fill={gownDark}
          opacity="0.6"
        />
        {/* Feet */}
        <ellipse cx="82" cy="368" rx="11" ry="6" fill={skinColor} />
        <ellipse cx="118" cy="368" rx="11" ry="6" fill={skinColor} />
        {/* Toes suggestion */}
        <path
          d="M 74 367 Q 82 373 90 367"
          stroke={skinDark}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 110 367 Q 118 373 126 367"
          stroke={skinDark}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* ─── CYANOSIS OVERLAY (lips/fingertips) ─── */}
      {hasCyanosis && (
        <g opacity="0.7">
          <ellipse
            cx={100 - 12 * headScale}
            cy={72 + 22 * headScale}
            rx={8 * headScale}
            ry={4 * headScale}
            fill="oklch(0.45 0.2 265)"
            opacity="0.5"
          />
          <circle
            cx="50"
            cy="265"
            r="6"
            fill="oklch(0.45 0.2 265)"
            opacity="0.4"
          />
          <circle
            cx="150"
            cy="265"
            r="6"
            fill="oklch(0.45 0.2 265)"
            opacity="0.4"
          />
        </g>
      )}

      {/* ─── FEVER FLUSH ─── */}
      {hasFever && (
        <g>
          <ellipse
            cx={100 - 14 * headScale}
            cy={72 + 4 * headScale}
            rx={9 * headScale}
            ry={7 * headScale}
            fill="oklch(0.62 0.2 20 / 35%)"
          />
          <ellipse
            cx={100 + 14 * headScale}
            cy={72 + 4 * headScale}
            rx={9 * headScale}
            ry={7 * headScale}
            fill="oklch(0.62 0.2 20 / 35%)"
          />
        </g>
      )}

      {/* ─── CHEST PAIN INDICATOR ─── */}
      {hasChestPain && (
        <g style={{ animation: "alert-blink 1.5s ease-in-out infinite" }}>
          <circle
            cx="100"
            cy="185"
            r="12"
            fill="oklch(0.55 0.22 27 / 20%)"
            stroke="oklch(0.55 0.22 27 / 60%)"
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="190"
            textAnchor="middle"
            fontSize="14"
            fill="oklch(0.55 0.22 27)"
          >
            +
          </text>
        </g>
      )}

      {/* ─── WHEELCHAIR OVERLAY ─── */}
      {hasDisability && disabilityType.toLowerCase().includes("wheelchair") && (
        <g transform="translate(22, 230) scale(0.85)">
          <circle
            cx="25"
            cy="60"
            r="20"
            fill="none"
            stroke="oklch(0.45 0.12 240)"
            strokeWidth="3"
          />
          <circle cx="25" cy="60" r="4" fill="oklch(0.45 0.12 240)" />
          <circle
            cx="80"
            cy="60"
            r="20"
            fill="none"
            stroke="oklch(0.45 0.12 240)"
            strokeWidth="3"
          />
          <rect
            x="10"
            y="20"
            width="80"
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

      {/* ─── IV LINE (always shown for clinical context) ─── */}
      {animating && (
        <g opacity="0.6">
          <path
            d="M 42 250 Q 20 230 18 180 Q 16 150 20 120"
            stroke="oklch(0.65 0.15 180)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
          />
          <circle
            cx="18"
            cy="116"
            r="5"
            fill="oklch(0.65 0.15 180 / 50%)"
            stroke="oklch(0.65 0.15 180)"
            strokeWidth="1"
          />
          <rect
            x="12"
            y="100"
            width="12"
            height="18"
            rx="3"
            fill="oklch(0.75 0.08 220 / 80%)"
            stroke="oklch(0.65 0.15 180 / 60%)"
            strokeWidth="0.8"
          />
        </g>
      )}

      {/* ─── SpO2 PROBE (right finger) ─── */}
      {animating && (
        <g opacity="0.7">
          <rect
            x="152"
            y="258"
            width="12"
            height="8"
            rx="3"
            fill="oklch(0.65 0.2 30 / 60%)"
            stroke="oklch(0.65 0.2 30 / 80%)"
            strokeWidth="0.8"
          />
          <path
            d="M 158 258 L 172 240"
            stroke="oklch(0.65 0.2 30 / 50%)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </g>
      )}
    </svg>
  );
}

// ─── Main VirtualPatient ──────────────────────────────────────────────────────
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
  const lowerSymptoms = symptoms.map((s) => s.toLowerCase());
  const hasFever = lowerSymptoms.some(
    (s) =>
      s.includes("fever") || s.includes("temperature") || s.includes("pyrexia"),
  );
  const hasChestPain = lowerSymptoms.some(
    (s) => s.includes("chest") || s.includes("cardiac"),
  );
  const hasCyanosis =
    spo2 < 90 || lowerSymptoms.some((s) => s.includes("cyan"));
  const hasJaundice = lowerSymptoms.some(
    (s) => s.includes("jaundice") || s.includes("yellow"),
  );
  const hasPallor = lowerSymptoms.some(
    (s) =>
      s.includes("anemia") || s.includes("pallor") || s.includes("anaemia"),
  );
  const hasRespiratoryDistress = lowerSymptoms.some(
    (s) =>
      s.includes("shortness") ||
      s.includes("breath") ||
      s.includes("wheeze") ||
      s.includes("dyspnea"),
  );
  const hasDisability = !!disability && disability.trim() !== "";

  const ageLabel =
    ageMonths <= 12
      ? `${ageMonths}m`
      : ageMonths <= 24
        ? `${Math.floor(ageMonths / 12)}y ${ageMonths % 12}m`
        : `${Math.floor(ageMonths / 12)}y`;

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

  const improvingOverlay =
    outcome === "improving"
      ? {
          boxShadow:
            "inset 0 0 40px rgba(0, 230, 118, 0.12), 0 0 30px rgba(0, 230, 118, 0.15)",
        }
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
          style={{ height: 280, width: 200 }}
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
          {/* Ambient glow behind patient */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 180,
              height: 220,
              background:
                outcome === "improving"
                  ? "radial-gradient(ellipse at 50% 80%, rgba(0, 230, 118, 0.12) 0%, transparent 70%)"
                  : outcome === "worsening"
                    ? "radial-gradient(ellipse at 50% 80%, rgba(255, 51, 85, 0.10) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at 50% 80%, rgba(0, 150, 255, 0.10) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <RealisticPatientSVG
            ageGroup={ageGroup}
            gender={gender}
            hasCyanosis={hasCyanosis}
            hasJaundice={hasJaundice}
            hasPallor={hasPallor}
            hasRespiratoryDistress={hasRespiratoryDistress}
            hasFever={hasFever}
            hasChestPain={hasChestPain}
            hasDisability={hasDisability}
            disabilityType={disability || ""}
            animating={animating}
            outcome={outcome}
          />

          {/* Alert badges */}
          {hasFever && (
            <div
              className="absolute right-0 top-8 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: "rgba(255, 100, 50, 0.2)",
                border: "1px solid rgba(255, 100, 50, 0.6)",
                color: "#ff6432",
                boxShadow: "0 0 8px rgba(255, 100, 50, 0.3)",
                animation: "alert-blink 2s ease-in-out infinite",
              }}
            >
              🌡 Fever
            </div>
          )}
          {hasChestPain && (
            <div
              className="absolute left-0 top-12 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: "rgba(255, 51, 85, 0.2)",
                border: "1px solid rgba(255, 51, 85, 0.6)",
                color: "#ff3355",
                boxShadow: "0 0 8px rgba(255, 51, 85, 0.3)",
                animation: "alert-blink 1.5s ease-in-out infinite",
              }}
            >
              💔 Chest Pain
            </div>
          )}
          {hasCyanosis && (
            <div
              className="absolute left-0 top-24 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: "rgba(100, 100, 255, 0.2)",
                border: "1px solid rgba(100, 100, 255, 0.6)",
                color: "#6688ff",
                animation: "alert-blink 1s ease-in-out infinite",
              }}
            >
              🔵 Cyanosis
            </div>
          )}
          {hasJaundice && (
            <div
              className="absolute right-0 top-24 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: "rgba(255, 200, 0, 0.2)",
                border: "1px solid rgba(255, 200, 0, 0.6)",
                color: "#ffcc00",
              }}
            >
              🟡 Jaundice
            </div>
          )}
        </motion.div>

        {/* Patient info */}
        <div
          className="mt-1 text-center"
          style={{ color: "rgba(180, 210, 255, 0.7)" }}
        >
          <p className="font-mono text-sm font-bold tracking-wider">
            {gender === "male"
              ? "♂ MALE"
              : gender === "female"
                ? "♀ FEMALE"
                : "⚥ OTHER"}{" "}
            · {ageLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}
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

        {/* Active symptom badges */}
        {symptoms.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {symptoms.slice(0, 5).map((s, sIdx) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                style={{
                  background: "rgba(255, 51, 85, 0.10)",
                  border: "1px solid rgba(255, 51, 85, 0.35)",
                  color: "#ff7095",
                  animation: `alert-blink ${1.5 + sIdx * 0.2}s ease-in-out infinite`,
                }}
              >
                ⚠ {s}
              </span>
            ))}
            {symptoms.length > 5 && (
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                style={{
                  background: "rgba(100, 150, 200, 0.1)",
                  color: "rgba(150, 200, 255, 0.5)",
                }}
              >
                +{symptoms.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualPatient;
