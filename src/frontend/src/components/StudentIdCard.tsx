import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

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

export function StudentIdCard({
  name,
  batch,
  role,
  profilePhoto,
  systemId,
  principalId: _principalId,
  collegeName,
  rollNumber,
}: StudentIdCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const roleLabel = ROLE_LABELS[role] || role || "MBBS Student";
  const roleColor = ROLE_COLORS[role] || "#00d4ff";

  // Embed all data directly in the verify URL so QR works on any device
  const verifyUrl = (() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "";
    const params = new URLSearchParams({
      name: name || "",
      batch: batch || "",
      systemId: systemId || "",
      role: roleLabel,
      college: collegeName || "",
      roll: rollNumber || "",
    });
    return `${base}#verify/?${params.toString()}`;
  })();

  const qrData = verifyUrl;

  // Download card as canvas-based image
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const W = 800;
      const H = 480;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No canvas context");

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#030a1c");
      bg.addColorStop(0.5, "#050f2a");
      bg.addColorStop(1, "#030c20");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Grid pattern
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Border
      ctx.strokeStyle = "rgba(0,212,255,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(4, 4, W - 8, H - 8, 16);
      ctx.stroke();

      // Header bar
      ctx.fillStyle = "rgba(0,212,255,0.08)";
      ctx.fillRect(4, 4, W - 8, 52);
      ctx.fillStyle = "#00d4ff";
      ctx.font = "bold 20px monospace";
      ctx.fillText("MedSim", 24, 36);
      ctx.fillStyle = "rgba(0,212,255,0.5)";
      ctx.font = "11px monospace";
      ctx.fillText("STUDENT IDENTITY CARD", 24, 52);
      ctx.fillStyle = "rgba(0,212,255,0.2)";
      ctx.font = "bold 12px monospace";
      ctx.fillText("OFFICIAL", W - 100, 36);

      // Divider
      ctx.strokeStyle = "rgba(0,212,255,0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, 64);
      ctx.lineTo(W - 24, 64);
      ctx.stroke();

      // Photo area (left)
      const photoSize = 100;
      const photoX = 24;
      const photoY = 80;
      ctx.strokeStyle = `${roleColor}80`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, 10);
      ctx.stroke();

      // Try to draw profile photo
      if (profilePhoto) {
        try {
          await new Promise<void>((resolve) => {
            const pImg = new Image();
            pImg.crossOrigin = "anonymous";
            pImg.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(photoX, photoY, photoSize, photoSize, 10);
              ctx.clip();
              ctx.drawImage(pImg, photoX, photoY, photoSize, photoSize);
              ctx.restore();
              resolve();
            };
            pImg.onerror = () => resolve();
            pImg.src = profilePhoto;
            setTimeout(() => resolve(), 3000);
          });
        } catch {
          /* skip */
        }
      } else {
        // Initials fallback
        ctx.fillStyle = `${roleColor}20`;
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoSize, photoSize, 10);
        ctx.fill();
        ctx.fillStyle = roleColor;
        ctx.font = "bold 36px monospace";
        ctx.textAlign = "center";
        ctx.fillText(getInitials(name), photoX + photoSize / 2, photoY + 62);
        ctx.textAlign = "left";
      }

      // Role badge under photo
      ctx.fillStyle = `${roleColor}25`;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY + photoSize + 8, photoSize, 20, 4);
      ctx.fill();
      ctx.fillStyle = roleColor;
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        (role || "STUDENT").toUpperCase().slice(0, 12),
        photoX + photoSize / 2,
        photoY + photoSize + 22,
      );
      ctx.textAlign = "left";

      // Info text (right of photo)
      const infoX = photoX + photoSize + 20;
      const infoW = W - infoX - 160; // leave space for QR on right

      // Name
      ctx.fillStyle = "#e8f4ff";
      ctx.font = "bold 22px sans-serif";
      const displayName = name || "—";
      ctx.fillText(
        displayName.length > 22 ? `${displayName.slice(0, 22)}…` : displayName,
        infoX,
        104,
      );

      // Role label
      ctx.fillStyle = "rgba(150,200,255,0.65)";
      ctx.font = "13px monospace";
      ctx.fillText(roleLabel, infoX, 124);

      // System ID box
      ctx.fillStyle = "rgba(0,212,255,0.07)";
      ctx.beginPath();
      ctx.roundRect(infoX, 134, Math.min(infoW, 200), 28, 6);
      ctx.fill();
      ctx.fillStyle = "rgba(0,212,255,0.45)";
      ctx.font = "10px monospace";
      ctx.fillText("ID:", infoX + 8, 152);
      ctx.fillStyle = "#00d4ff";
      ctx.font = "bold 13px monospace";
      ctx.fillText(systemId, infoX + 30, 152);

      // College
      ctx.fillStyle = "rgba(0,212,255,0.08)";
      ctx.beginPath();
      ctx.roundRect(infoX, 174, infoW, 44, 8);
      ctx.fill();
      ctx.fillStyle = "rgba(0,212,255,0.45)";
      ctx.font = "9px monospace";
      ctx.fillText("COLLEGE / UNIVERSITY", infoX + 10, 190);
      ctx.fillStyle = "#e8f4ff";
      ctx.font = "bold 13px sans-serif";
      const cName = collegeName || "—";
      ctx.fillText(
        cName.length > 38 ? `${cName.slice(0, 38)}…` : cName,
        infoX + 10,
        208,
      );

      // Batch + Roll
      const halfW = (infoW - 8) / 2;
      ctx.fillStyle = "rgba(0,212,255,0.06)";
      ctx.beginPath();
      ctx.roundRect(infoX, 228, halfW, 44, 8);
      ctx.fill();
      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.font = "9px monospace";
      ctx.fillText("BATCH", infoX + 10, 244);
      ctx.fillStyle = "#e8f4ff";
      ctx.font = "bold 13px monospace";
      ctx.fillText(batch || "—", infoX + 10, 262);

      ctx.fillStyle = "rgba(0,212,255,0.06)";
      ctx.beginPath();
      ctx.roundRect(infoX + halfW + 8, 228, halfW, 44, 8);
      ctx.fill();
      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.font = "9px monospace";
      ctx.fillText("ROLL NO.", infoX + halfW + 18, 244);
      ctx.fillStyle = "#e8f4ff";
      ctx.font = "bold 13px monospace";
      ctx.fillText((rollNumber || "—").slice(0, 12), infoX + halfW + 18, 262);

      // QR Code (right side)
      const qrX = W - 150;
      const qrY = 80;
      const qrSize = 120;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=000000&color=00d4ff&format=png`;
      try {
        await new Promise<void>((resolve) => {
          const qImg = new Image();
          qImg.crossOrigin = "anonymous";
          qImg.onload = () => {
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.roundRect(qrX, qrY, qrSize, qrSize, 8);
            ctx.fill();
            ctx.drawImage(qImg, qrX, qrY, qrSize, qrSize);
            resolve();
          };
          qImg.onerror = () => {
            // Skip QR gracefully
            ctx.fillStyle = "rgba(0,212,255,0.1)";
            ctx.beginPath();
            ctx.roundRect(qrX, qrY, qrSize, qrSize, 8);
            ctx.fill();
            ctx.fillStyle = "rgba(0,212,255,0.4)";
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("QR Code", qrX + qrSize / 2, qrY + qrSize / 2 - 6);
            ctx.fillText(
              "Unavailable",
              qrX + qrSize / 2,
              qrY + qrSize / 2 + 10,
            );
            ctx.textAlign = "left";
            resolve();
          };
          qImg.src = qrUrl;
          setTimeout(() => resolve(), 5000);
        });
      } catch {
        /* skip QR */
      }

      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 16);
      ctx.textAlign = "left";

      // Bottom bar
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, H - 36);
      ctx.lineTo(W - 24, H - 36);
      ctx.stroke();
      const issuedDateStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      ctx.fillStyle = "rgba(0,212,255,0.3)";
      ctx.font = "9px monospace";
      ctx.fillText(`ISSUED: ${issuedDateStr}`, 24, H - 18);
      ctx.textAlign = "right";
      ctx.fillText("medsim.caffeine.ai", W - 24, H - 18);
      ctx.textAlign = "left";

      // Digitally Verified badge
      ctx.fillStyle = "rgba(0,230,118,0.1)";
      ctx.beginPath();
      ctx.roundRect(W - 210, H - 32, 185, 20, 4);
      ctx.fill();
      ctx.fillStyle = "#00e676";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("✓ DIGITALLY VERIFIED BY MEDSIM SYSTEM", W - 117, H - 18);
      ctx.textAlign = "left";

      // Download
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloading(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `MedSim-ID-${systemId}.png`;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setIsDownloading(false);
      }, "image/png");
    } catch (_err) {
      toast.error("Download failed. Please try again.");
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
                    crossOrigin="anonymous"
                    style={{ transform: "scaleX(-1)" }}
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
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&bgcolor=000000&color=00d4ff&format=png`}
                  alt="Scan to verify student"
                  width={80}
                  height={80}
                  style={{ display: "block", borderRadius: 4 }}
                  aria-label="Identity verification QR code"
                />
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
