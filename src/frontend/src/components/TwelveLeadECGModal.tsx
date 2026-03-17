import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface TwelveLeadECGModalProps {
  open: boolean;
  onClose: () => void;
  pathology: "normal" | "stemi" | "afib";
  heartRate: number;
}

const LEAD_LAYOUT = [
  ["I", "II", "III", "aVR"],
  ["aVL", "aVF", "V1", "V2"],
  ["V3", "V4", "V5", "V6"],
];

const LEAD_COEFF: Record<
  string,
  [number, number, number, number, number, number]
> = {
  I: [0.8, 0.1, 0.75, 0.1, 0.7, 1],
  II: [1.0, 0.1, 1.0, 0.1, 1.0, 1],
  III: [0.6, 0.1, 0.55, 0.2, 0.8, 1],
  aVR: [-1.0, -0.1, -0.9, -0.1, -0.9, -1],
  aVL: [0.3, 0.1, 0.35, 0.2, 0.4, 1],
  aVF: [0.7, 0.1, 0.65, 0.15, 0.75, 1],
  V1: [-0.2, 0.0, 0.15, 0.9, 0.3, 1],
  V2: [0.1, 0.0, 0.25, 0.8, 0.4, 1],
  V3: [0.3, 0.0, 0.5, 0.5, 0.55, 1],
  V4: [0.5, 0.1, 0.75, 0.25, 0.7, 1],
  V5: [0.6, 0.2, 0.85, 0.1, 0.8, 1],
  V6: [0.5, 0.2, 0.75, 0.1, 0.75, 1],
};

function drawLeadCanvas(
  canvas: HTMLCanvasElement,
  lead: string,
  pathology: "normal" | "stemi" | "afib",
  heartRate: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  const c = LEAD_COEFF[lead] ?? [1, 0.1, 1, 0.1, 1, 1];
  const [pC, qC, rC, sC, tC, stSign] = c;

  ctx.fillStyle = "#fff0f0";
  ctx.fillRect(0, 0, W, H);

  const GRID_MM = 4;
  ctx.strokeStyle = "rgba(255,100,100,0.22)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += GRID_MM) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += GRID_MM) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(220,60,60,0.35)";
  ctx.lineWidth = 0.8;
  for (let x = 0; x < W; x += GRID_MM * 5) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += GRID_MM * 5) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const mid = H / 2;
  const amp = H * 0.32;
  const isAnteriorSTEMI =
    pathology === "stemi" && ["V1", "V2", "V3", "V4"].includes(lead);
  const isReciprocal =
    pathology === "stemi" && ["II", "III", "aVF"].includes(lead);
  const isAFib = pathology === "afib";

  const beats = Math.max(2, Math.floor(W / ((60 / heartRate) * 250)));
  const beatW = W / beats;

  ctx.strokeStyle = "#cc2222";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, mid);
  ctx.lineTo(4, mid);
  ctx.lineTo(4, mid - amp * 0.4);
  ctx.lineTo(24, mid - amp * 0.4);
  ctx.lineTo(24, mid);
  ctx.lineTo(W, mid);
  ctx.stroke();

  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 1.2;
  ctx.shadowColor = "transparent";
  ctx.beginPath();

  const afibSeed = lead.charCodeAt(0) * 0.37;

  for (let b = 0; b < beats; b++) {
    const bx = b * beatW + 28;
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      const x = bx + p * beatW;
      let y = mid;
      const hasP = !isAFib;
      const rrMod = isAFib ? 1 + 0.18 * Math.sin(b * 2.3 + afibSeed) : 1;
      const bxMod = bx + (1 - rrMod) * beatW * 0.3;
      const xMod = bxMod + p * beatW * rrMod;
      const baselineNoise = isAFib
        ? Math.sin(p * 43.7 + b * 7.3 + afibSeed) * amp * 0.025
        : 0;

      if (hasP && p < 0.08) {
        y = mid;
      } else if (hasP && p < 0.14) {
        const tp = (p - 0.08) / 0.06;
        y = mid - pC * Math.sin(Math.PI * tp) * amp * 0.14;
      } else if (p < 0.22) {
        y = mid;
      } else if (p < 0.25) {
        const tp = (p - 0.22) / 0.03;
        y = mid + qC * Math.sin(Math.PI * tp) * amp * 0.11;
      } else if (p < 0.3) {
        const tp = (p - 0.25) / 0.05;
        y = mid - rC * Math.sin(Math.PI * tp) * amp * 0.88;
      } else if (p < 0.33) {
        const tp = (p - 0.3) / 0.03;
        y = mid + sC * Math.sin(Math.PI * tp) * amp * 0.14;
      } else if (p < 0.44) {
        const stElev = isAnteriorSTEMI
          ? -amp * 0.2 * Math.abs(rC)
          : isReciprocal
            ? amp * 0.12
            : 0;
        y = mid + stElev * stSign;
      } else if (p < 0.64) {
        const tp = (p - 0.44) / 0.2;
        const tH = isAnteriorSTEMI
          ? amp * 0.45 * Math.abs(tC)
          : amp * 0.2 * Math.abs(tC);
        const dir = tC >= 0 ? -1 : 1;
        y = mid + dir * Math.sin(Math.PI * tp) * tH;
      } else {
        y = mid;
      }

      y += baselineNoise;
      const drawX = isAFib ? xMod : x;
      if (i === 0 && b === 0) ctx.moveTo(drawX, y);
      else ctx.lineTo(drawX, y);
    }
  }
  ctx.stroke();

  ctx.fillStyle = "rgba(150,30,30,0.8)";
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillText(lead, 4, 12);
}

function LeadCanvas({
  lead,
  pathology,
  heartRate,
}: {
  lead: string;
  pathology: "normal" | "stemi" | "afib";
  heartRate: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawLeadCanvas(canvas, lead, pathology, heartRate);
  }, [lead, pathology, heartRate]);
  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={80}
      style={{ width: "100%", height: "80px", display: "block" }}
    />
  );
}

function RhythmStrip({
  pathology,
  heartRate,
}: { pathology: "normal" | "stemi" | "afib"; heartRate: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawLeadCanvas(canvas, "II", pathology, heartRate);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(150,30,30,0.7)";
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText(
      "RHYTHM STRIP \u2014 Lead II \u2014 25mm/s \u2014 10mm/mV",
      30,
      12,
    );
  }, [pathology, heartRate]);
  return (
    <canvas
      ref={canvasRef}
      width={880}
      height={80}
      style={{ width: "100%", height: "80px", display: "block" }}
    />
  );
}

const PATHOLOGY_LABELS = {
  normal: "Normal Sinus Rhythm",
  stemi: "Acute Anterior STEMI",
  afib: "Atrial Fibrillation",
};

export function TwelveLeadECGModal({
  open,
  onClose,
  pathology,
  heartRate,
}: TwelveLeadECGModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      data-ocid="ecg12.modal"
    >
      <div
        className="relative w-full max-w-4xl mx-2 my-4 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#1a0a0a",
          border: "1px solid rgba(220,60,60,0.3)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: "rgba(220,60,60,0.08)",
            borderBottom: "1px solid rgba(220,60,60,0.25)",
          }}
        >
          <div>
            <h2
              className="font-mono text-base font-bold"
              style={{ color: "#ff6060" }}
            >
              12-Lead ECG
            </h2>
            <p
              className="font-mono text-xs"
              style={{ color: "rgba(255,150,150,0.7)" }}
            >
              {PATHOLOGY_LABELS[pathology]} \u00b7 HR {Math.round(heartRate)}{" "}
              bpm \u00b7 25mm/s \u00b7 10mm/mV
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {pathology === "stemi" && (
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                  style={{
                    background: "rgba(255,0,0,0.2)",
                    color: "#ff4040",
                    border: "1px solid #ff404066",
                  }}
                >
                  \u26a0 STEMI
                </span>
              )}
              {pathology === "afib" && (
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                  style={{
                    background: "rgba(255,165,0,0.2)",
                    color: "#ffaa00",
                    border: "1px solid #ffaa0066",
                  }}
                >
                  AFib
                </span>
              )}
            </div>
            <button
              type="button"
              data-ocid="ecg12.close_button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-red-900/30"
              style={{ color: "#ff6060" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-1">
          {LEAD_LAYOUT.map((row, _ri) => (
            <div key={row.join("-")} className="grid grid-cols-4 gap-1">
              {row.map((lead) => (
                <div
                  key={lead}
                  className="rounded overflow-hidden"
                  style={{ border: "1px solid rgba(220,60,60,0.2)" }}
                >
                  <LeadCanvas
                    lead={lead}
                    pathology={pathology}
                    heartRate={heartRate}
                  />
                </div>
              ))}
            </div>
          ))}
          <div
            className="mt-2 rounded overflow-hidden"
            style={{ border: "1px solid rgba(220,60,60,0.3)" }}
          >
            <RhythmStrip pathology={pathology} heartRate={heartRate} />
          </div>
        </div>

        <div
          className="px-5 py-3 flex flex-wrap gap-x-6 gap-y-1"
          style={{
            background: "rgba(220,60,60,0.05)",
            borderTop: "1px solid rgba(220,60,60,0.15)",
          }}
        >
          {(
            [
              ["PR Interval", pathology === "afib" ? "N/A" : "160 ms"],
              ["QRS Duration", "88 ms"],
              ["QT Interval", "380 ms"],
              ["QTc", "410 ms"],
              ["P-axis", pathology === "afib" ? "Absent" : "+65\u00b0"],
              ["QRS Axis", "+60\u00b0"],
            ] as [string, string][]
          ).map(([label, val]) => (
            <div key={label} className="text-center">
              <p
                className="font-mono text-xs"
                style={{ color: "rgba(255,150,150,0.5)" }}
              >
                {label}
              </p>
              <p
                className="font-mono text-sm font-bold"
                style={{ color: "#ff9090" }}
              >
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
