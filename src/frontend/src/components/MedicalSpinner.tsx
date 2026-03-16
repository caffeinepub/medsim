import { motion } from "motion/react";
import React from "react";

export function MedicalSpinner() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "oklch(0.08 0.02 235)" }}
    >
      {/* ECG line animation */}
      <div className="relative mb-8 w-64 h-16 overflow-hidden">
        <svg
          viewBox="0 0 256 64"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <title>ECG heartbeat animation</title>
          <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="oklch(0.65 0.18 196)"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="oklch(0.65 0.18 196)"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="oklch(0.65 0.18 196)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <motion.polyline
            points="0,32 20,32 30,32 38,8 46,56 54,8 60,44 66,32 80,32 100,32 108,32 116,8 124,56 132,8 138,44 144,32 160,32 180,32 188,8 196,56 204,8 210,44 216,32 230,32 256,32"
            fill="none"
            stroke="url(#ecgGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              opacity: { duration: 0.3 },
            }}
          />
        </svg>
        {/* Glow pulse dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full"
          style={{
            background: "oklch(0.65 0.18 196)",
            boxShadow:
              "0 0 12px oklch(0.65 0.18 196), 0 0 24px oklch(0.65 0.18 196 / 0.5)",
            left: "50%",
            translateX: "-50%",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-3"
      >
        {/* Pulsing heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="oklch(0.65 0.18 196)"
            aria-hidden="true"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </motion.div>
        <h1
          className="text-4xl font-black tracking-tight"
          style={{
            color: "oklch(0.95 0.02 235)",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          Med<span style={{ color: "oklch(0.65 0.18 196)" }}>Sim</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm tracking-widest uppercase"
        style={{ color: "oklch(0.55 0.06 235)" }}
      >
        Medical Simulation Platform
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full"
            style={{ background: "oklch(0.65 0.18 196)" }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
