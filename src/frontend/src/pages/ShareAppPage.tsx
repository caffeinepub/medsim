import { Button } from "@/components/ui/button";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import {
  Check,
  Copy,
  Download,
  Link2,
  QrCode,
  Share2,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export function ShareAppPage() {
  const [copied, setCopied] = useState(false);
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();

  const appUrl = window.location.origin;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&color=00d4ff&bgcolor=030a1c&data=${encodeURIComponent(appUrl)}`;

  const inviteText = `🏥 Join MedSim — India ka best MBBS Medical Simulation App!

📱 Clinical cases, NEET PG practice, ICU simulator aur AI assistant — sab ek jagah.

${appUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      toast.success("Link copy ho gaya! 🔗");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Copy nahi ho saka. Link manually copy karein.");
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(inviteText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (!("share" in navigator)) {
      toast.error("Aapka browser native share support nahi karta.");
      return;
    }
    try {
      await navigator.share({
        title: "MedSim — Medical Simulation App",
        text: "India ka best MBBS Medical Simulation App — clinical cases, NEET PG, ICU simulator!",
        url: appUrl,
      });
      toast.success("Shared successfully!");
    } catch {
      // User cancelled or error
    }
  };

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) {
      toast.success("MedSim install ho gaya! 🎉");
    }
  };

  return (
    <div
      className="min-h-screen p-4 pb-24 sm:p-6"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(0,212,255,0.12)",
            border: "1.5px solid rgba(0,212,255,0.3)",
            boxShadow: "0 0 24px rgba(0,212,255,0.2)",
          }}
        >
          <Share2 className="h-8 w-8" style={{ color: "#00d4ff" }} />
        </div>
        <h1
          className="font-display text-2xl font-black"
          style={{ color: "oklch(var(--foreground))" }}
        >
          Share MedSim
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Apne doston ko MedSim join karaein — ek scan mein!
        </p>
      </motion.div>

      {/* Install banner — only if installable and not yet installed */}
      {canInstall && !isInstalled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-5 overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,153,204,0.18) 0%, rgba(0,212,255,0.1) 100%)",
            border: "1.5px solid rgba(0,212,255,0.3)",
            boxShadow: "0 0 30px rgba(0,212,255,0.1)",
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(0,212,255,0.15)",
                  border: "1px solid rgba(0,212,255,0.25)",
                }}
              >
                <Smartphone className="h-5 w-5" style={{ color: "#00d4ff" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-bold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  Install MedSim as App
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Home screen pe add karein — browser bar nahi aayega
                </p>
              </div>
              <Button
                data-ocid="share.install_button"
                onClick={handleInstall}
                size="sm"
                className="gap-1.5 rounded-xl border-0 font-bold"
                style={{
                  background: "linear-gradient(135deg, #0099cc, #00d4ff)",
                  color: "#000",
                  boxShadow: "0 2px 12px rgba(0,212,255,0.3)",
                }}
              >
                <Download className="h-3.5 w-3.5" />
                Install
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Already installed badge */}
      {isInstalled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 flex items-center justify-center gap-2 rounded-xl p-3"
          style={{
            background: "rgba(0,230,118,0.08)",
            border: "1px solid rgba(0,230,118,0.2)",
          }}
        >
          <Check className="h-4 w-4" style={{ color: "#00e676" }} />
          <span className="text-sm font-medium" style={{ color: "#00e676" }}>
            MedSim already installed hai! ✅
          </span>
        </motion.div>
      )}

      {/* QR Code card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-5 overflow-hidden rounded-2xl"
        style={{
          background: "rgba(5,15,40,0.8)",
          border: "1.5px solid rgba(0,212,255,0.25)",
          boxShadow:
            "0 0 40px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Card header */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.12)" }}
        >
          <QrCode className="h-4 w-4" style={{ color: "#00d4ff" }} />
          <span className="text-sm font-semibold" style={{ color: "#00d4ff" }}>
            Dynamic QR Code
          </span>
          <span
            className="ml-auto text-xs"
            style={{ color: "rgba(150,200,255,0.4)" }}
          >
            Scan to Install MedSim
          </span>
        </div>

        <div className="flex flex-col items-center p-6">
          {/* QR code with white bg for readability */}
          <div
            className="relative mb-4 overflow-hidden rounded-2xl p-3"
            style={{
              background: "#ffffff",
              boxShadow:
                "0 0 0 4px rgba(0,212,255,0.2), 0 0 30px rgba(0,212,255,0.15)",
            }}
          >
            <img
              src={qrApiUrl}
              alt="QR Code to install MedSim"
              width={220}
              height={220}
              className="block"
              style={{ imageRendering: "pixelated" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* MedSim watermark overlay */}
            <div
              className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-1 pt-1"
              style={{
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <span
                className="font-display text-xs font-black tracking-widest"
                style={{ color: "#030a1c" }}
              >
                MEDSIM
              </span>
            </div>
          </div>

          <p
            className="mb-1 text-sm font-semibold"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Scan karein → MedSim khulega
          </p>
          <p
            className="text-center text-xs"
            style={{ color: "rgba(150,200,255,0.5)" }}
          >
            Doosre student ka phone scan karo — seedha app install hoga
          </p>

          {/* URL display */}
          <div
            className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2"
            style={{
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <Link2
              className="h-3.5 w-3.5 flex-shrink-0"
              style={{ color: "#00d4ff" }}
            />
            <span
              className="flex-1 truncate font-mono text-xs"
              style={{ color: "rgba(150,200,255,0.7)" }}
            >
              {appUrl}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Share buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-5 overflow-hidden rounded-2xl"
        style={{
          background: "rgba(5,15,40,0.8)",
          border: "1.5px solid rgba(0,212,255,0.15)",
        }}
      >
        <div
          className="px-5 py-3"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Share Karein
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Apne friends ko invite karein
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
          {/* Copy Invite Link */}
          <Button
            data-ocid="share.copy_link_button"
            onClick={handleCopyLink}
            className="h-14 flex-col gap-1 rounded-xl border-0 text-sm font-bold"
            style={{
              background: copied
                ? "rgba(0,230,118,0.15)"
                : "rgba(0,212,255,0.1)",
              border: copied
                ? "1px solid rgba(0,230,118,0.3)"
                : "1px solid rgba(0,212,255,0.2)",
              color: copied ? "#00e676" : "#00d4ff",
            }}
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
            <span className="text-xs">{copied ? "Copied!" : "Copy Link"}</span>
          </Button>

          {/* WhatsApp */}
          <Button
            data-ocid="share.whatsapp_button"
            onClick={handleWhatsApp}
            className="h-14 flex-col gap-1 rounded-xl border-0 text-sm font-bold"
            style={{
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.25)",
              color: "#25d366",
            }}
          >
            <SiWhatsapp className="h-5 w-5" />
            <span className="text-xs">WhatsApp</span>
          </Button>

          {/* Native Share */}
          {"share" in navigator ? (
            <Button
              data-ocid="share.native_share_button"
              onClick={handleNativeShare}
              className="h-14 flex-col gap-1 rounded-xl border-0 text-sm font-bold"
              style={{
                background: "rgba(155,89,255,0.12)",
                border: "1px solid rgba(155,89,255,0.25)",
                color: "#9b59ff",
              }}
            >
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Share</span>
            </Button>
          ) : (
            <Button
              data-ocid="share.copy_link_button_2"
              onClick={handleCopyLink}
              className="h-14 flex-col gap-1 rounded-xl border-0 text-sm font-bold"
              style={{
                background: "rgba(255,184,0,0.1)",
                border: "1px solid rgba(255,184,0,0.2)",
                color: "#ffb800",
              }}
            >
              <Link2 className="h-5 w-5" />
              <span className="text-xs">Invite Link</span>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Invite message preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="rounded-2xl"
        style={{
          background: "rgba(5,15,40,0.7)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div
          className="px-5 py-3"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.08)" }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Invite Message Preview
          </p>
        </div>
        <div className="p-4">
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(0,212,255,0.04)",
              border: "1px solid rgba(0,212,255,0.08)",
            }}
          >
            <pre
              className="whitespace-pre-wrap text-xs leading-relaxed"
              style={{ color: "rgba(200,230,255,0.7)", fontFamily: "inherit" }}
            >
              {inviteText}
            </pre>
          </div>
          <Button
            data-ocid="share.copy_message_button"
            variant="ghost"
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText(inviteText).catch(() => {});
              toast.success("Message copy ho gaya!");
            }}
            className="mt-2 h-8 gap-1.5 text-xs"
            style={{ color: "rgba(0,212,255,0.6)" }}
          >
            <Copy className="h-3 w-3" />
            Copy Message
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default ShareAppPage;
