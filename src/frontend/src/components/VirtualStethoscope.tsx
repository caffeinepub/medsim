import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

interface Zone {
  id: string;
  label: string;
  cx: number;
  cy: number;
  soundType: "normal" | "murmur" | "crackles" | "wheeze";
}

const ZONES: Zone[] = [
  {
    id: "aortic",
    label: "Aortic Area (2nd R ICS)",
    cx: 115,
    cy: 82,
    soundType: "normal",
  },
  {
    id: "pulmonic",
    label: "Pulmonic Area (2nd L ICS)",
    cx: 85,
    cy: 82,
    soundType: "normal",
  },
  {
    id: "tricuspid",
    label: "Tricuspid Area (4th L ICS)",
    cx: 90,
    cy: 112,
    soundType: "normal",
  },
  {
    id: "mitral",
    label: "Mitral / Apex (5th L ICS MCL)",
    cx: 80,
    cy: 128,
    soundType: "normal",
  },
  {
    id: "lung-r",
    label: "Right Lung Base",
    cx: 130,
    cy: 140,
    soundType: "normal",
  },
  {
    id: "lung-l",
    label: "Left Lung Base",
    cx: 70,
    cy: 140,
    soundType: "normal",
  },
];

function getSoundLabel(type: string) {
  switch (type) {
    case "murmur":
      return "S1-S2 + Systolic Murmur";
    case "crackles":
      return "Fine Crackles (End-Inspiratory)";
    case "wheeze":
      return "Expiratory Wheeze";
    default:
      return "S1-S2 Normal (Lub-Dub)";
  }
}

function playAuscultationSound(
  type: "normal" | "murmur" | "crackles" | "wheeze",
) {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const playBeep = (freq: number, start: number, dur: number, vol = 0.3) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      g.gain.setValueAtTime(0.0001, start);
      g.gain.linearRampToValueAtTime(vol, start + 0.02);
      g.gain.linearRampToValueAtTime(0.0001, start + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.05);
    };

    // S1 (lub) and S2 (dub) repeated 3 times
    for (let i = 0; i < 3; i++) {
      const cycle = now + i * 0.7;
      playBeep(100, cycle, 0.12, 0.25); // S1
      playBeep(80, cycle + 0.18, 0.09, 0.2); // S2
    }

    if (type === "murmur") {
      // Systolic murmur: noise between S1 and S2
      for (let i = 0; i < 3; i++) {
        const cycle = now + i * 0.7;
        const bufSize = ctx.sampleRate * 0.12;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let j = 0; j < bufSize; j++) {
          data[j] = (Math.random() * 2 - 1) * 0.08;
        }
        const source = ctx.createBufferSource();
        const g = ctx.createGain();
        source.buffer = buf;
        g.gain.setValueAtTime(0.0001, cycle + 0.08);
        g.gain.linearRampToValueAtTime(0.12, cycle + 0.1);
        g.gain.linearRampToValueAtTime(0.0001, cycle + 0.22);
        source.connect(g);
        g.connect(ctx.destination);
        source.start(cycle + 0.08);
      }
    }

    if (type === "crackles") {
      // Fine crackles: rapid short bursts during each cycle
      for (let i = 0; i < 3; i++) {
        for (let c = 0; c < 6; c++) {
          const t = now + i * 0.7 + 0.3 + c * 0.04;
          const bufSize = ctx.sampleRate * 0.015;
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let j = 0; j < bufSize; j++) {
            d[j] = (Math.random() * 2 - 1) * 0.15;
          }
          const src = ctx.createBufferSource();
          const g = ctx.createGain();
          src.buffer = buf;
          g.gain.value = 0.12;
          src.connect(g);
          g.connect(ctx.destination);
          src.start(t);
        }
      }
    }

    if (type === "wheeze") {
      // Expiratory wheeze: high freq oscillating
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(600, now + i * 0.7 + 0.25);
        osc.frequency.linearRampToValueAtTime(500, now + i * 0.7 + 0.55);
        g.gain.setValueAtTime(0.0001, now + i * 0.7 + 0.25);
        g.gain.linearRampToValueAtTime(0.1, now + i * 0.7 + 0.27);
        g.gain.linearRampToValueAtTime(0.0001, now + i * 0.7 + 0.55);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + i * 0.7 + 0.25);
        osc.stop(now + i * 0.7 + 0.6);
      }
    }

    // Close context after sounds finish
    setTimeout(() => ctx.close(), 3000);
  } catch {
    // silent fail
  }
}

interface VirtualStethoscopeProps {
  /** Override sound types for zones based on patient condition */
  conditionOverrides?: {
    hasCardiac?: boolean;
    hasRespiratory?: boolean;
    hasWheeze?: boolean;
  };
}

export function VirtualStethoscope({
  conditionOverrides,
}: VirtualStethoscopeProps) {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getZoneSound = useCallback(
    (zone: Zone): "normal" | "murmur" | "crackles" | "wheeze" => {
      if (zone.id === "lung-l" || zone.id === "lung-r") {
        if (conditionOverrides?.hasWheeze) return "wheeze";
        if (conditionOverrides?.hasRespiratory) return "crackles";
        return "normal";
      }
      // cardiac zones
      if (conditionOverrides?.hasCardiac) return "murmur";
      return "normal";
    },
    [conditionOverrides],
  );

  function handleZoneClick(zone: Zone) {
    if (playing) return;
    const sound = getZoneSound(zone);
    setActiveZone({ ...zone, soundType: sound });
    setPlaying(true);
    playAuscultationSound(sound);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPlaying(false), 2400);
  }

  return (
    <div
      className="rounded-2xl border p-4 space-y-3"
      style={{
        background: "oklch(0.1 0.03 235 / 0.85)",
        borderColor: "oklch(0.4 0.15 196 / 0.4)",
        boxShadow: "0 0 20px oklch(0.4 0.15 196 / 0.1)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-bold"
          style={{ color: "oklch(0.7 0.15 196)" }}
        >
          🩺 Virtual Stethoscope
        </h3>
        <span className="text-[10px] text-slate-500">
          Tap a zone to auscultate
        </span>
      </div>

      {/* SVG Torso */}
      <div className="flex justify-center">
        <svg
          viewBox="0 0 200 200"
          width="200"
          height="200"
          role="img"
          aria-label="Anatomical chest diagram for auscultation"
          className="select-none"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.4 0.15 196 / 0.3))" }}
        >
          {/* Torso outline */}
          <ellipse
            cx="100"
            cy="100"
            rx="52"
            ry="70"
            fill="oklch(0.18 0.04 235)"
            stroke="oklch(0.4 0.1 235)"
            strokeWidth="1.5"
          />
          {/* Neck */}
          <rect
            x="88"
            y="28"
            width="24"
            height="20"
            rx="4"
            fill="oklch(0.18 0.04 235)"
            stroke="oklch(0.4 0.1 235)"
            strokeWidth="1.5"
          />
          {/* Clavicle lines */}
          <line
            x1="60"
            y1="60"
            x2="100"
            y2="55"
            stroke="oklch(0.35 0.06 235)"
            strokeWidth="1"
          />
          <line
            x1="140"
            y1="60"
            x2="100"
            y2="55"
            stroke="oklch(0.35 0.06 235)"
            strokeWidth="1"
          />
          {/* Sternum */}
          <line
            x1="100"
            y1="55"
            x2="100"
            y2="155"
            stroke="oklch(0.35 0.06 235)"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          {/* Ribs - simple curved lines */}
          {[75, 90, 105, 120, 135].map((y) => (
            <g key={y}>
              <path
                d={`M 100 ${y} Q 75 ${y + 4} 58 ${y + 2}`}
                fill="none"
                stroke="oklch(0.3 0.05 235)"
                strokeWidth="0.8"
              />
              <path
                d={`M 100 ${y} Q 125 ${y + 4} 142 ${y + 2}`}
                fill="none"
                stroke="oklch(0.3 0.05 235)"
                strokeWidth="0.8"
              />
            </g>
          ))}
          {/* Heart silhouette */}
          <path
            d="M 96 103 C 92 97 84 97 84 105 C 84 113 96 120 96 120 C 96 120 108 113 108 105 C 108 97 100 97 96 103 Z"
            fill="oklch(0.35 0.18 25 / 0.25)"
            stroke="oklch(0.5 0.18 25 / 0.4)"
            strokeWidth="1"
          />
          {/* Lung areas */}
          <ellipse
            cx="78"
            cy="115"
            rx="16"
            ry="28"
            fill="oklch(0.3 0.08 196 / 0.12)"
            stroke="oklch(0.4 0.1 196 / 0.3)"
            strokeWidth="1"
          />
          <ellipse
            cx="122"
            cy="115"
            rx="16"
            ry="28"
            fill="oklch(0.3 0.08 196 / 0.12)"
            stroke="oklch(0.4 0.1 196 / 0.3)"
            strokeWidth="1"
          />

          {/* Auscultation zones */}
          {ZONES.map((zone) => {
            const sound = getZoneSound(zone);
            const isActive = activeZone?.id === zone.id;
            const color =
              sound === "murmur"
                ? "oklch(0.65 0.2 25)"
                : sound === "crackles"
                  ? "oklch(0.65 0.18 60)"
                  : sound === "wheeze"
                    ? "oklch(0.65 0.18 130)"
                    : "oklch(0.65 0.18 196)";
            return (
              <g key={zone.id}>
                {isActive && (
                  <circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r="14"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    style={{ animation: "ping 0.8s ease-out infinite" }}
                    opacity="0.5"
                  />
                )}
                <circle
                  cx={zone.cx}
                  cy={zone.cy}
                  r="9"
                  fill={
                    isActive
                      ? `${color.replace(")", " / 0.3)")}`
                      : "oklch(0.15 0.05 235 / 0.6)"
                  }
                  stroke={color}
                  strokeWidth={isActive ? "2" : "1.5"}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onClick={() => handleZoneClick(zone)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    handleZoneClick(zone)
                  }
                />
                <text
                  x={zone.cx}
                  y={zone.cy + 4}
                  textAnchor="middle"
                  fontSize="7"
                  fill={color}
                  style={{ pointerEvents: "none" }}
                >
                  ♥
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Auscultation status */}
      <div
        className="rounded-xl border p-3 text-center min-h-[52px] flex flex-col items-center justify-center"
        style={{
          background: "oklch(0.12 0.04 235)",
          borderColor: activeZone
            ? "oklch(0.5 0.18 196 / 0.4)"
            : "oklch(0.25 0.05 235)",
        }}
      >
        {activeZone ? (
          <>
            <p
              className="text-xs font-bold"
              style={{ color: "oklch(0.8 0.1 196)" }}
            >
              Auscultating: {activeZone.label}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mt-1"
            >
              {playing && (
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
              <Badge
                className="text-[10px]"
                style={{
                  background:
                    activeZone.soundType === "murmur"
                      ? "oklch(0.25 0.15 25 / 0.3)"
                      : activeZone.soundType === "crackles"
                        ? "oklch(0.25 0.15 60 / 0.3)"
                        : activeZone.soundType === "wheeze"
                          ? "oklch(0.25 0.15 130 / 0.3)"
                          : "oklch(0.2 0.1 196 / 0.3)",
                  color:
                    activeZone.soundType === "murmur"
                      ? "oklch(0.7 0.18 25)"
                      : activeZone.soundType === "crackles"
                        ? "oklch(0.7 0.18 60)"
                        : activeZone.soundType === "wheeze"
                          ? "oklch(0.7 0.18 130)"
                          : "oklch(0.7 0.18 196)",
                  border: "1px solid currentColor",
                }}
              >
                Sound: {getSoundLabel(activeZone.soundType)}
              </Badge>
            </motion.div>
          </>
        ) : (
          <p className="text-xs text-slate-500">
            Select a zone on the diagram to auscultate
          </p>
        )}
      </div>
    </div>
  );
}
