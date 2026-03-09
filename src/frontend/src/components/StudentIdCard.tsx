import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StudentIdCardProps {
  name: string;
  batch: string;
  role: string;
  profilePhoto: string | null;
  systemId: string;
  principalId: string;
  collegeName?: string;
  rollNumber?: string;
}

const ROLE_LABELS: Record<string, string> = {
  student: "MBBS Student",
  intern: "Intern",
  jr1: "Junior Resident 1",
  jr2: "Junior Resident 2",
  sr1: "Senior Resident 1",
  sr2: "Senior Resident 2",
  asst_professor: "Assistant Professor",
  assoc_professor: "Associate Professor",
  hod: "Head of Department",
};

const ROLE_COLORS: Record<string, string> = {
  student: "#4fc3f7",
  intern: "#ffb800",
  jr1: "#00d4ff",
  jr2: "#00b8e0",
  sr1: "#00e676",
  sr2: "#00c460",
  asst_professor: "#b39dff",
  assoc_professor: "#9b59ff",
  hod: "#ff3355",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Simple decorative QR-like matrix (visual only) ──────────────────────────
function QrMatrix({
  data,
  size = 80,
  color = "#00d4ff",
}: { data: string; size?: number; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cells = 21; // 21×21 grid like a QR version 1
    const cellSize = Math.floor(size / cells);
    const totalSize = cellSize * cells;
    canvas.width = totalSize;
    canvas.height = totalSize;

    // Background transparent
    ctx.clearRect(0, 0, totalSize, totalSize);

    // Generate a deterministic bit pattern from data string
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = (hash * 31 + data.charCodeAt(i)) >>> 0;
    }

    const isFilled = (r: number, c: number): boolean => {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinderPattern = (
        row: number,
        col: number,
        or: number,
        oc: number,
      ) => {
        const dr = row - or;
        const dc = col - oc;
        if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return false;
        if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
        if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
        return false;
      };
      if (inFinderPattern(r, c, 0, 0)) return true;
      if (inFinderPattern(r, c, 0, cells - 7)) return true;
      if (inFinderPattern(r, c, cells - 7, 0)) return true;
      // Timing patterns
      if (r === 6 && c >= 8 && c <= cells - 9) return c % 2 === 0;
      if (c === 6 && r >= 8 && r <= cells - 9) return r % 2 === 0;
      // Data bits — pseudo-random from hash + position
      const seed = (hash ^ (r * 137 + c * 29 + r * c * 7)) >>> 0;
      return (seed >> (r % 23)) % 3 !== 0;
    };

    ctx.fillStyle = color;
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if (isFilled(r, c)) {
          const x = c * cellSize;
          const y = r * cellSize;
          const radius = Math.max(0, cellSize * 0.15);
          ctx.beginPath();
          ctx.roundRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1, radius);
          ctx.fill();
        }
      }
    }
  }, [data, size, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: size,
        height: size,
        imageRendering: "pixelated",
      }}
      aria-label="Identity verification QR code"
    />
  );
}

export function StudentIdCard({
  name,
  batch,
  role,
  profilePhoto,
  systemId,
  principalId,
  collegeName,
  rollNumber,
}: StudentIdCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const roleLabel = ROLE_LABELS[role] || role || "MBBS Student";
  const roleColor = ROLE_COLORS[role] || "#00d4ff";

  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}#verify/${principalId}`
      : `#verify/${principalId}`;

  const qrData = JSON.stringify({
    name,
    batch,
    systemId,
    role: roleLabel,
    collegeName: collegeName || "",
    rollNumber: rollNumber || "",
    verified: true,
    verifyUrl,
  });

  // Download card as SVG-based image using canvas drawing
  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // Serialize the card element to SVG via foreignObject
      const cardEl = cardRef.current;
      const width = cardEl.offsetWidth || 420;
      const height = cardEl.offsetHeight || 260;

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width * 2}" height="${height * 2}">
          <defs>
            <style>
              body { margin: 0; padding: 0; background: rgb(3,10,28); }
            </style>
          </defs>
          <rect width="${width * 2}" height="${height * 2}" fill="rgb(3,10,28)"/>
          <foreignObject width="${width}" height="${height}" transform="scale(2)">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;overflow:hidden;">
              ${cardEl.outerHTML}
            </div>
          </foreignObject>
        </svg>`;

      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width * 2;
        canvas.height = height * 2;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "rgb(3,10,28)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
        URL.revokeObjectURL(url);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `MedSim-ID-${systemId}.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      };
      img.onerror = () => {
        // Fallback: direct SVG download
        URL.revokeObjectURL(url);
        const fallbackBlob = new Blob([svg], { type: "image/svg+xml" });
        const fallbackUrl = URL.createObjectURL(fallbackBlob);
        const link = document.createElement("a");
        link.download = `MedSim-ID-${systemId}.svg`;
        link.href = fallbackUrl;
        link.click();
        URL.revokeObjectURL(fallbackUrl);
        setIsDownloading(false);
      };
      img.src = url;
    } catch (err) {
      console.error("Download failed:", err);
      setIsDownloading(false);
    }
  };

  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Shield
          className="h-4 w-4 flex-shrink-0"
          style={{ color: "#00d4ff" }}
        />
        <h2
          className="font-display text-base font-bold"
          style={{ color: "rgba(180, 220, 255, 0.9)" }}
        >
          Student Identity Card
        </h2>
        <div
          className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-0.5 flex-shrink-0"
          style={{
            background: "rgba(0, 230, 118, 0.1)",
            border: "1px solid rgba(0, 230, 118, 0.3)",
          }}
        >
          <CheckCircle
            className="h-3 w-3 flex-shrink-0"
            style={{ color: "#00e676" }}
          />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "#00e676" }}
          >
            Verified
          </span>
        </div>
      </div>

      {/* The actual card */}
      <div
        ref={cardRef}
        data-ocid="profile.id_card"
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(3, 10, 28, 0.98) 0%, rgba(5, 18, 45, 0.98) 50%, rgba(3, 12, 32, 0.98) 100%)",
          border: "1.5px solid rgba(0, 212, 255, 0.35)",
          boxShadow:
            "0 0 40px rgba(0, 212, 255, 0.12), 0 0 80px rgba(0, 212, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Background grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative corner glow */}
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Header bar */}
        <div className="relative mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{
                background: "rgba(0, 212, 255, 0.12)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
              }}
            >
              <Stethoscope className="h-4 w-4" style={{ color: "#00d4ff" }} />
            </div>
            <div className="min-w-0">
              <p
                className="font-display text-sm font-black uppercase tracking-widest"
                style={{ color: "#00d4ff" }}
              >
                MedSim
              </p>
              <p
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "rgba(0, 212, 255, 0.5)" }}
              >
                Student Identity Card
              </p>
            </div>
          </div>
          <div
            className="flex-shrink-0 rounded-lg px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(0, 212, 255, 0.08)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "rgba(0, 212, 255, 0.7)",
            }}
          >
            OFFICIAL
          </div>
        </div>

        {/* Divider line */}
        <div
          className="relative mb-3 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.4) 30%, rgba(0,212,255,0.6) 50%, rgba(0,212,255,0.4) 70%, transparent 100%)",
            boxShadow: "0 0 8px rgba(0,212,255,0.3)",
          }}
        />

        {/* ── Card body — vertical stacked layout, mobile-first ── */}
        <div className="relative space-y-3">
          {/* Row 1: Photo + Name/Role info */}
          <div className="flex items-center gap-3">
            {/* Profile photo — 72×72 */}
            <div className="flex-shrink-0">
              <div
                className="flex items-center justify-center overflow-hidden rounded-xl font-display text-xl font-black"
                style={{
                  width: "72px",
                  height: "72px",
                  background: profilePhoto
                    ? "transparent"
                    : `linear-gradient(135deg, ${roleColor}20, ${roleColor}08)`,
                  border: `2px solid ${roleColor}50`,
                  boxShadow: `0 0 16px ${roleColor}20, inset 0 0 12px rgba(0,0,0,0.3)`,
                  color: roleColor,
                }}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={name}
                    className="h-full w-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <span>{getInitials(name)}</span>
                )}
              </div>
              {/* Role badge below photo */}
              <div className="mt-1.5 text-center">
                <Badge
                  className="border-0 px-1.5 py-0 font-mono text-[8px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${roleColor}15`,
                    color: roleColor,
                    border: `1px solid ${roleColor}30`,
                    maxWidth: "72px",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {role?.toUpperCase() || "STUDENT"}
                </Badge>
              </div>
            </div>

            {/* Name + role info */}
            <div className="min-w-0 flex-1">
              <p
                className="font-display text-lg font-black leading-tight truncate"
                style={{ color: "#e8f4ff" }}
              >
                {name || "—"}
              </p>
              <p
                className="mt-0.5 font-mono text-xs leading-tight"
                style={{ color: "rgba(150, 200, 255, 0.65)" }}
              >
                {roleLabel}
              </p>
              {/* System ID inline */}
              <div className="mt-1.5">
                <div
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1"
                  style={{
                    background: "rgba(0, 212, 255, 0.07)",
                    border: "1px solid rgba(0, 212, 255, 0.18)",
                  }}
                >
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: "rgba(0, 212, 255, 0.45)" }}
                  >
                    ID:
                  </span>
                  <span
                    className="font-mono text-xs font-bold tracking-wider"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 8px rgba(0, 212, 255, 0.35)",
                    }}
                  >
                    {systemId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: College name — full width prominent box */}
          <div
            className="rounded-xl px-3 py-2"
            style={{
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.18)",
            }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-widest mb-0.5"
              style={{ color: "rgba(0, 212, 255, 0.45)" }}
            >
              College / University
            </p>
            <p
              className="font-display text-sm font-bold truncate"
              style={{ color: "#e8f4ff" }}
            >
              {collegeName || "—"}
            </p>
          </div>

          {/* Row 3: Batch + Roll Number — 2-col grid */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-xl px-3 py-2"
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.14)",
              }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-widest mb-0.5"
                style={{ color: "rgba(0, 212, 255, 0.4)" }}
              >
                Batch
              </p>
              <p
                className="font-mono text-xs font-bold"
                style={{ color: "#e8f4ff" }}
              >
                {batch || "—"}
              </p>
            </div>
            <div
              className="rounded-xl px-3 py-2"
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.14)",
              }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-widest mb-0.5"
                style={{ color: "rgba(0, 212, 255, 0.4)" }}
              >
                Roll No.
              </p>
              <p
                className="font-mono text-xs font-bold truncate"
                style={{ color: "#e8f4ff" }}
              >
                {rollNumber || "—"}
              </p>
            </div>
          </div>

          {/* Row 4: QR code centred */}
          <div className="flex items-center justify-center pt-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="rounded-xl p-2"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1.5px solid rgba(0, 212, 255, 0.25)",
                  boxShadow: "0 0 16px rgba(0, 212, 255, 0.1)",
                }}
              >
                <QrMatrix data={qrData} size={80} color="#00d4ff" />
              </div>
              <p
                className="font-mono text-[9px] uppercase tracking-wider text-center"
                style={{ color: "rgba(0, 212, 255, 0.4)" }}
              >
                Scan to Verify
              </p>
            </div>
          </div>
        </div>

        {/* Bottom scan line + issued date */}
        <div className="relative mt-3">
          {/* Animated scan line */}
          <div
            className="relative mb-2.5 h-px w-full overflow-hidden"
            style={{ background: "rgba(0, 212, 255, 0.15)" }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
                boxShadow: "0 0 8px rgba(0, 212, 255, 0.4)",
              }}
              animate={{ x: ["0%", "300%"] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <p
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "rgba(0, 212, 255, 0.3)" }}
            >
              Issued: {issuedDate}
            </p>
            <p
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "rgba(0, 212, 255, 0.3)" }}
            >
              medsim.caffeine.ai
            </p>
          </div>
        </div>
      </div>

      {/* Download button */}
      <Button
        data-ocid="profile.id_card_download_button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full h-11 gap-2 rounded-xl border-0 font-semibold"
        style={{
          background: isDownloading
            ? "rgba(0, 212, 255, 0.08)"
            : "linear-gradient(135deg, rgba(0, 100, 180, 0.8), rgba(0, 180, 255, 0.8))",
          border: "1px solid rgba(0, 212, 255, 0.4)",
          color: isDownloading ? "rgba(0, 212, 255, 0.5)" : "#e8f4ff",
          boxShadow: isDownloading
            ? "none"
            : "0 4px 20px rgba(0, 212, 255, 0.2)",
          transition: "all 0.2s",
        }}
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download ID Card"}
      </Button>
    </motion.div>
  );
}

export default StudentIdCard;
