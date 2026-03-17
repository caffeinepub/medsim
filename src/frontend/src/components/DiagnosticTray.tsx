import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Microscope, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export interface DiagnosticData {
  /** Scenario type affects which findings appear */
  scenarioType:
    | "cardiac"
    | "respiratory"
    | "hepatic"
    | "renal"
    | "trauma"
    | "sepsis"
    | "normal";
  hr?: number;
  rhythm?: "normal" | "sinus-tachy" | "sinus-brady" | "afib" | "vt";
  spo2?: number;
}

// ─── 12-Lead ECG Canvas ───────────────────────────────────────────
function ECGCanvas({ data }: { data: DiagnosticData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = "#040c14";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(0,229,255,0.07)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const isCardiac = data.scenarioType === "cardiac";
    const isVT = data.rhythm === "vt";
    const isAfib = data.rhythm === "afib";
    const isBrady = data.rhythm === "sinus-brady";

    // Lead labels and positions (3 rows x 4 cols)
    const leadLabels = [
      ["I", "II", "III", "aVR"],
      ["aVL", "aVF", "V1", "V2"],
      ["V3", "V4", "V5", "V6"],
    ];
    // Which leads show ST elevation for inferior STEMI (II, III, aVF)
    const stElevLeads: [number, number][] = isCardiac
      ? [
          [0, 1],
          [0, 2],
          [1, 1],
        ]
      : [];

    const colW = W / 4;
    const rowH = H / 3;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const x0 = col * colW;
        const y0 = row * rowH;
        const midY = y0 + rowH / 2;
        const label = leadLabels[row][col];
        const hasST = stElevLeads.some(([r, c]) => r === row && c === col);

        // Label
        ctx.fillStyle = "rgba(0,229,255,0.7)";
        ctx.font = "8px monospace";
        ctx.fillText(label, x0 + 4, y0 + 12);

        // Divider
        ctx.strokeStyle = "rgba(0,229,255,0.12)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0, y0 + rowH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + colW, y0);
        ctx.stroke();

        // Waveform
        ctx.strokeStyle = hasST ? "#ff6b6b" : "#00e5ff";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = hasST ? "#ff6b6b" : "#00e5ff";
        ctx.shadowBlur = 3;
        ctx.beginPath();

        const steps = Math.floor(colW) - 8;
        const margin = 4;

        for (let i = 0; i <= steps; i++) {
          const px = x0 + margin + i;
          const t = i / steps;
          let py = midY;

          if (isVT) {
            py = midY - Math.sin(t * Math.PI * 4) * (rowH * 0.35);
          } else if (isAfib) {
            const base = Math.sin(t * 80) * 2;
            if (t > 0.3 && t < 0.37) py = midY - rowH * 0.38;
            else if (t > 0.37 && t < 0.43) py = midY + rowH * 0.18;
            else if (t > 0.43 && t < 0.47) py = midY - rowH * 0.07;
            else py = midY + base;
          } else if (isBrady) {
            if (t > 0.15 && t < 0.22)
              py = midY - rowH * 0.07 * Math.sin(((t - 0.15) / 0.07) * Math.PI);
            else if (t > 0.42 && t < 0.45) py = midY - rowH * 0.42;
            else if (t > 0.45 && t < 0.48) py = midY + rowH * 0.2;
            else if (t > 0.48 && t < 0.52) py = midY - rowH * 0.07;
            else if (t > 0.58 && t < 0.7)
              py = midY + rowH * 0.1 * Math.sin(((t - 0.58) / 0.12) * Math.PI);
          } else {
            // Normal sinus / sinus tachy
            if (t > 0.1 && t < 0.17)
              py = midY - rowH * 0.06 * Math.sin(((t - 0.1) / 0.07) * Math.PI);
            else if (t > 0.3 && t < 0.33) py = midY - rowH * 0.42;
            else if (t > 0.33 && t < 0.36) py = midY + rowH * 0.22;
            else if (t > 0.36 && t < 0.4) py = midY - rowH * 0.07;
            else if (hasST && t > 0.37 && t < 0.55) {
              // ST elevation
              py = midY - rowH * 0.15;
            } else if (t > 0.48 && t < 0.62)
              py = midY + rowH * 0.1 * Math.sin(((t - 0.48) / 0.14) * Math.PI);
          }

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={240}
      className="w-full rounded-lg"
      style={{ background: "#040c14" }}
    />
  );
}

// ─── Chest X-Ray SVG ──────────────────────────────────────────────
function ChestXRay({ data }: { data: DiagnosticData }) {
  const hasOpacity =
    data.scenarioType === "respiratory" || data.scenarioType === "sepsis";
  const hasCardioMegaly = data.scenarioType === "cardiac";
  const hasFreeAir = data.scenarioType === "trauma";

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ background: "#020508", minHeight: 240 }}
    >
      <svg
        viewBox="0 0 320 260"
        width="100%"
        role="img"
        aria-label="Chest X-Ray"
        className="block"
      >
        {/* X-ray dark background */}
        <rect width="320" height="260" fill="#020508" />
        {/* Label */}
        <text
          x="8"
          y="16"
          fill="rgba(200,230,255,0.6)"
          fontSize="9"
          fontFamily="monospace"
        >
          CHEST PA
        </text>
        <text
          x="280"
          y="16"
          fill="rgba(200,230,255,0.4)"
          fontSize="7"
          fontFamily="monospace"
        >
          R
        </text>
        <text
          x="8"
          y="26"
          fill="rgba(200,230,255,0.4)"
          fontSize="7"
          fontFamily="monospace"
        >
          L
        </text>

        {/* Spine */}
        <rect
          x="154"
          y="20"
          width="12"
          height="220"
          rx="4"
          fill="none"
          stroke="rgba(200,230,255,0.25)"
          strokeWidth="1"
        />
        <line
          x1="160"
          y1="20"
          x2="160"
          y2="240"
          stroke="rgba(200,230,255,0.15)"
          strokeWidth="0.5"
        />

        {/* Ribs */}
        {[40, 60, 80, 100, 120, 140].map((y, i) => (
          <g key={y}>
            <path
              d={`M 160 ${y} Q 110 ${y + 8} 70 ${y + 20 + i * 2}`}
              fill="none"
              stroke="rgba(200,230,255,0.2)"
              strokeWidth="1.2"
            />
            <path
              d={`M 160 ${y} Q 210 ${y + 8} 250 ${y + 20 + i * 2}`}
              fill="none"
              stroke="rgba(200,230,255,0.2)"
              strokeWidth="1.2"
            />
          </g>
        ))}

        {/* Trachea */}
        <rect
          x="154"
          y="18"
          width="12"
          height="40"
          rx="3"
          fill="none"
          stroke="rgba(200,230,255,0.35)"
          strokeWidth="1"
        />

        {/* Carina */}
        <line
          x1="155"
          y1="58"
          x2="115"
          y2="75"
          stroke="rgba(200,230,255,0.3)"
          strokeWidth="1"
        />
        <line
          x1="165"
          y1="58"
          x2="205"
          y2="75"
          stroke="rgba(200,230,255,0.3)"
          strokeWidth="1"
        />

        {/* Left Lung field */}
        <ellipse
          cx="110"
          cy="140"
          rx="55"
          ry="90"
          fill={
            hasOpacity ? "rgba(180,200,255,0.08)" : "rgba(180,200,255,0.04)"
          }
          stroke="rgba(200,230,255,0.2)"
          strokeWidth="1"
        />
        {/* Left lung opacity overlay for respiratory */}
        {hasOpacity && (
          <ellipse
            cx="110"
            cy="165"
            rx="40"
            ry="50"
            fill="rgba(180,200,255,0.18)"
            opacity="0.7"
          />
        )}

        {/* Right Lung field */}
        <ellipse
          cx="210"
          cy="140"
          rx="55"
          ry="90"
          fill={
            hasOpacity ? "rgba(180,200,255,0.08)" : "rgba(180,200,255,0.04)"
          }
          stroke="rgba(200,230,255,0.2)"
          strokeWidth="1"
        />
        {hasOpacity && (
          <ellipse
            cx="210"
            cy="150"
            rx="45"
            ry="55"
            fill="rgba(180,200,255,0.2)"
            opacity="0.6"
          />
        )}

        {/* Heart silhouette */}
        <ellipse
          cx="148"
          cy="155"
          rx={hasCardioMegaly ? 52 : 40}
          ry={hasCardioMegaly ? 56 : 45}
          fill="rgba(200,230,255,0.18)"
          stroke="rgba(200,230,255,0.3)"
          strokeWidth="1.5"
        />
        {hasCardioMegaly && (
          <text
            x="120"
            y="195"
            fill="rgba(255,160,100,0.7)"
            fontSize="7"
            fontFamily="monospace"
          >
            Cardiomegaly
          </text>
        )}

        {/* Diaphragm */}
        <path
          d="M 50 225 Q 160 235 270 225"
          fill="none"
          stroke="rgba(200,230,255,0.35)"
          strokeWidth="1.5"
        />

        {/* Gastric bubble */}
        <ellipse
          cx="125"
          cy="232"
          rx="18"
          ry="8"
          fill="none"
          stroke="rgba(200,230,255,0.2)"
          strokeWidth="1"
        />

        {/* Free air for trauma */}
        {hasFreeAir && (
          <>
            <ellipse
              cx="110"
              cy="50"
              rx="20"
              ry="12"
              fill="rgba(200,230,255,0.12)"
              stroke="rgba(255,200,100,0.4)"
              strokeWidth="1"
            />
            <text
              x="92"
              y="45"
              fill="rgba(255,200,100,0.7)"
              fontSize="6"
              fontFamily="monospace"
            >
              Pneumothorax?
            </text>
          </>
        )}

        {/* Annotations */}
        {hasOpacity && (
          <>
            <text
              x="68"
              y="175"
              fill="rgba(255,200,100,0.7)"
              fontSize="6"
              fontFamily="monospace"
            >
              Bilateral
            </text>
            <text
              x="68"
              y="182"
              fill="rgba(255,200,100,0.7)"
              fontSize="6"
              fontFamily="monospace"
            >
              Infiltrates
            </text>
          </>
        )}

        {/* Anatomical labels */}
        <text
          x="88"
          y="80"
          fill="rgba(200,230,255,0.3)"
          fontSize="7"
          fontFamily="monospace"
        >
          L Lung
        </text>
        <text
          x="195"
          y="80"
          fill="rgba(200,230,255,0.3)"
          fontSize="7"
          fontFamily="monospace"
        >
          R Lung
        </text>
        <text
          x="132"
          y="160"
          fill="rgba(200,230,255,0.25)"
          fontSize="7"
          fontFamily="monospace"
        >
          Heart
        </text>
        <text
          x="130"
          y="245"
          fill="rgba(200,230,255,0.25)"
          fontSize="7"
          fontFamily="monospace"
        >
          Diaphragm
        </text>
      </svg>
    </div>
  );
}

// ─── Lab Reports Table ────────────────────────────────────────────
function LabReports({ data }: { data: DiagnosticData }) {
  const isHepatik = data.scenarioType === "hepatic";
  const isAnemia =
    data.scenarioType === "trauma" || data.scenarioType === "sepsis";
  const isRenal = data.scenarioType === "renal";
  const isSepsis = data.scenarioType === "sepsis";

  const cbcRows = [
    {
      name: "Hemoglobin",
      value: isAnemia ? "7.2" : "13.8",
      unit: "g/dL",
      ref: "12–16",
      abnormal: isAnemia,
    },
    {
      name: "WBC",
      value: isSepsis ? "18,400" : "8,200",
      unit: "/μL",
      ref: "4,000–11,000",
      abnormal: isSepsis,
    },
    {
      name: "Platelets",
      value: isSepsis ? "88,000" : "2,10,000",
      unit: "/μL",
      ref: "1,50,000–4,00,000",
      abnormal: isSepsis,
    },
    {
      name: "PCV/HCT",
      value: isAnemia ? "22" : "41",
      unit: "%",
      ref: "35–47",
      abnormal: isAnemia,
    },
  ];

  const lftRows = [
    {
      name: "ALT (SGPT)",
      value: isHepatik ? "285" : "32",
      unit: "U/L",
      ref: "7–56",
      abnormal: isHepatik,
    },
    {
      name: "AST (SGOT)",
      value: isHepatik ? "310" : "28",
      unit: "U/L",
      ref: "10–40",
      abnormal: isHepatik,
    },
    {
      name: "Bilirubin (Total)",
      value: isHepatik ? "8.4" : "0.8",
      unit: "mg/dL",
      ref: "0.2–1.2",
      abnormal: isHepatik,
    },
    {
      name: "Albumin",
      value: isHepatik ? "2.1" : "4.0",
      unit: "g/dL",
      ref: "3.5–5.0",
      abnormal: isHepatik,
    },
  ];

  const kftRows = [
    {
      name: "Creatinine",
      value: isRenal || isSepsis ? "3.8" : "0.9",
      unit: "mg/dL",
      ref: "0.6–1.2",
      abnormal: isRenal || isSepsis,
    },
    {
      name: "BUN",
      value: isRenal ? "68" : "14",
      unit: "mg/dL",
      ref: "7–25",
      abnormal: isRenal,
    },
    {
      name: "eGFR",
      value: isRenal ? "18" : "92",
      unit: "mL/min",
      ref: ">60",
      abnormal: isRenal,
    },
    {
      name: "Na / K",
      value: isSepsis ? "128 / 5.8" : "138 / 4.2",
      unit: "mEq/L",
      ref: "136–145 / 3.5–5.0",
      abnormal: isSepsis,
    },
  ];

  const LabTable = ({
    rows,
    title,
  }: { rows: typeof cbcRows; title: string }) => (
    <div className="mb-4">
      <p
        className="text-xs font-bold mb-2"
        style={{ color: "oklch(0.7 0.15 196)" }}
      >
        {title}
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ borderBottom: "1px solid oklch(0.25 0.05 235)" }}>
            {["Parameter", "Value", "Unit", "Reference"].map((h) => (
              <th
                key={h}
                className="text-left pb-1 pr-2"
                style={{ color: "oklch(0.55 0.06 235)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.name}
              style={{ borderBottom: "1px solid oklch(0.2 0.04 235)" }}
            >
              <td
                className="py-1 pr-2"
                style={{ color: "oklch(0.75 0.04 235)" }}
              >
                {r.name}
              </td>
              <td
                className="py-1 pr-2 font-bold"
                style={{
                  color: r.abnormal
                    ? "oklch(0.7 0.2 25)"
                    : "oklch(0.8 0.1 196)",
                }}
              >
                {r.abnormal && <span className="mr-1">⚠</span>}
                {r.value}
              </td>
              <td
                className="py-1 pr-2"
                style={{ color: "oklch(0.5 0.05 235)" }}
              >
                {r.unit}
              </td>
              <td className="py-1" style={{ color: "oklch(0.45 0.05 235)" }}>
                {r.ref}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-2 p-1">
      <LabTable rows={cbcRows} title="CBC — Complete Blood Count" />
      <LabTable rows={lftRows} title="LFT — Liver Function Tests" />
      <LabTable rows={kftRows} title="KFT — Kidney Function Tests" />
    </div>
  );
}

// ─── Diagnostic Tray Dialog ───────────────────────────────────────
interface DiagnosticTrayProps {
  data: DiagnosticData;
  triggerClassName?: string;
}

export function DiagnosticTray({
  data,
  triggerClassName,
}: DiagnosticTrayProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          data-ocid="er.diagnostics_button"
          className={triggerClassName}
          style={{
            borderColor: "oklch(0.4 0.15 196 / 0.5)",
            color: "oklch(0.7 0.15 196)",
            background: "oklch(0.15 0.05 196 / 0.3)",
          }}
        >
          <FlaskConical className="h-3.5 w-3.5 mr-1.5" />
          View Diagnostics
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl w-full overflow-hidden"
        style={{
          background: "oklch(0.1 0.025 235)",
          borderColor: "oklch(0.3 0.08 235)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            style={{ color: "oklch(0.85 0.06 235)" }}
          >
            <Microscope
              className="h-4 w-4"
              style={{ color: "oklch(0.65 0.18 196)" }}
            />
            Diagnostic Reports
            {data.scenarioType !== "normal" && (
              <Badge
                className="text-[10px] ml-1"
                style={{
                  background: "oklch(0.25 0.15 25 / 0.3)",
                  color: "oklch(0.7 0.18 25)",
                  border: "1px solid oklch(0.5 0.15 25 / 0.4)",
                }}
              >
                Abnormal Findings
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="ecg" className="mt-2">
          <TabsList
            className="w-full"
            style={{ background: "oklch(0.13 0.03 235)" }}
          >
            <TabsTrigger
              value="ecg"
              className="flex-1 data-[state=active]:text-cyan-300"
              style={{ fontSize: "12px" }}
            >
              <Zap className="h-3 w-3 mr-1" />
              12-Lead ECG
            </TabsTrigger>
            <TabsTrigger
              value="xray"
              className="flex-1 data-[state=active]:text-cyan-300"
              style={{ fontSize: "12px" }}
            >
              Chest X-Ray
            </TabsTrigger>
            <TabsTrigger
              value="labs"
              className="flex-1 data-[state=active]:text-cyan-300"
              style={{ fontSize: "12px" }}
            >
              <FlaskConical className="h-3 w-3 mr-1" />
              Lab Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ecg" className="mt-3">
            <p
              className="text-xs mb-2"
              style={{ color: "oklch(0.5 0.05 235)" }}
            >
              12-lead ECG • 25mm/s • 10mm/mV
              {data.scenarioType === "cardiac" && (
                <span className="ml-2 text-red-400 font-bold">
                  ⚠ ST Elevation — Inferior Leads
                </span>
              )}
            </p>
            <ECGCanvas data={data} />
          </TabsContent>

          <TabsContent value="xray" className="mt-3">
            <p
              className="text-xs mb-2"
              style={{ color: "oklch(0.5 0.05 235)" }}
            >
              PA Chest Radiograph
              {data.scenarioType === "respiratory" && (
                <span className="ml-2 text-yellow-400 font-bold">
                  ⚠ Bilateral Infiltrates
                </span>
              )}
            </p>
            <ChestXRay data={data} />
          </TabsContent>

          <TabsContent value="labs" className="mt-3">
            <div
              className="rounded-xl border p-3"
              style={{
                background: "oklch(0.11 0.03 235)",
                borderColor: "oklch(0.25 0.05 235)",
              }}
            >
              <LabReports data={data} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
