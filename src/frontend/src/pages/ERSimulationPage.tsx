import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  Eye,
  Mic,
  MicOff,
  Send,
  Stethoscope,
  Zap,
} from "lucide-react";
import { Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { DiagnosticTray } from "../components/DiagnosticTray";
import { PatientDistressAvatar } from "../components/PatientDistressAvatar";
import { VirtualStethoscope } from "../components/VirtualStethoscope";
import { useICUAmbientSound } from "../hooks/useICUAmbientSound";

// ─── Scenario data ────────────────────────────────────────────────
interface Scenario {
  id: string;
  title: string;
  shortTitle: string;
  age: number;
  gender: string;
  chief: string;
  vitals: {
    hr: number;
    spo2: number;
    sbp: number;
    dbp: number;
    temp: number;
    rr: number;
    etco2: number;
  };
  criticals: string[];
  rhythm: "sinus-tachy" | "sinus-brady" | "afib" | "vt" | "normal";
  patientOpener: string;
  patientResponses: string[];
  actions: Array<{ label: string; correct: boolean; feedback: string }>;
  observerSteps: string[];
  points: number;
  diagnosis: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "acs",
    title: "Chest Pain / ACS",
    shortTitle: "ACS",
    age: 55,
    gender: "Male",
    chief: "Crushing chest pain, diaphoresis",
    vitals: {
      hr: 110,
      spo2: 94,
      sbp: 90,
      dbp: 60,
      temp: 37.2,
      rr: 22,
      etco2: 38,
    },
    criticals: ["HR", "SpO2", "BP"],
    rhythm: "sinus-tachy",
    patientOpener:
      "Doctor... my chest is crushing... like an elephant sitting on it. I'm sweating so much. Please help me!",
    patientResponses: [
      "It started about 30 minutes ago. I've never felt this before.",
      "The pain goes to my left arm and jaw. I feel dizzy.",
      "I'm scared doctor... am I having a heart attack?",
      "I have diabetes and high BP for 10 years. I take metformin.",
      "My father died of a heart attack at 60.",
    ],
    actions: [
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ Correct — O2 via mask to maintain SpO2 > 94%",
      },
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ Correct — Establish two large-bore IV lines",
      },
      {
        label: "12-Lead ECG",
        correct: true,
        feedback:
          "✅ Correct — ST elevation in leads II, III, aVF — Inferior STEMI!",
      },
      {
        label: "Aspirin 325mg",
        correct: true,
        feedback: "✅ Correct — Chew 325mg aspirin immediately (MONA protocol)",
      },
      {
        label: "Call Code",
        correct: true,
        feedback: "✅ Correct — Activate cath lab and cardiology team",
      },
      {
        label: "Give Adrenaline",
        correct: false,
        feedback:
          "❌ Incorrect — Adrenaline not indicated for STEMI without arrest",
      },
      {
        label: "Fluid Bolus",
        correct: true,
        feedback: "✅ Correct — 250ml NS bolus for hypotension",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ Not yet — Patient has pulse, defib not indicated",
      },
    ],
    observerSteps: [
      "1. Immediate assessment — ABC: Airway clear, Breathing tachypneic, Circulation: hypotension",
      "2. Apply high-flow O₂ via non-rebreather mask, target SpO₂ > 94%",
      "3. Establish two large-bore IV access (16G or larger)",
      "4. 12-Lead ECG within 10 minutes — Look for ST changes",
      "5. MONA: Morphine 2-4mg IV, O₂, Nitrates (if SBP > 90), Aspirin 325mg chewed",
      "6. Draw blood: CBC, BMP, troponin, PT/INR, type & screen",
      "7. Activate STEMI protocol — Call cardiologist, prep cath lab",
      "8. IV fluid bolus 250ml NS for SBP < 90",
      "9. Continuous monitoring: ECG, pulse oximetry, BP every 5 min",
      "10. Target door-to-balloon time < 90 minutes",
    ],
    points: 85,
    diagnosis: "ST-Elevation Myocardial Infarction (STEMI) — Inferior wall",
  },
  {
    id: "anaphylaxis",
    title: "Anaphylaxis",
    shortTitle: "Anaphylaxis",
    age: 28,
    gender: "Female",
    chief: "Bee sting, urticaria, stridor",
    vitals: {
      hr: 130,
      spo2: 88,
      sbp: 70,
      dbp: 40,
      temp: 37.5,
      rr: 28,
      etco2: 30,
    },
    criticals: ["HR", "SpO2", "BP", "RR"],
    rhythm: "sinus-tachy",
    patientOpener:
      "I can't breathe... I got stung by a bee 10 minutes ago. My throat is closing up... please!",
    patientResponses: [
      "I have hives all over my body — it's spreading fast.",
      "I've had a reaction before but never this bad.",
      "My tongue feels thick and my throat is so tight.",
      "I don't have my epi-pen... I left it at home.",
      "Please... I really can't breathe properly.",
    ],
    actions: [
      {
        label: "Give Adrenaline",
        correct: true,
        feedback:
          "✅ CRITICAL — Epinephrine 0.3mg IM (vastus lateralis) immediately!",
      },
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ Correct — High-flow O₂, prepare for airway management",
      },
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ Correct — Large-bore IV for fluid resuscitation",
      },
      {
        label: "Fluid Bolus",
        correct: true,
        feedback: "✅ Correct — 1L NS bolus for anaphylactic shock",
      },
      {
        label: "Intubate",
        correct: true,
        feedback: "✅ Correct — Stridor + SpO2 88% — RSI intubation needed",
      },
      {
        label: "12-Lead ECG",
        correct: false,
        feedback: "⚠️ Not priority — Treat anaphylaxis first",
      },
      {
        label: "Call Code",
        correct: true,
        feedback:
          "✅ Correct — Anaphylaxis is life-threatening, full team needed",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ No VF/VT — Defib not indicated",
      },
    ],
    observerSteps: [
      "1. Recognize anaphylaxis: urticaria + stridor + hypotension after allergen exposure",
      "2. IMMEDIATELY: Epinephrine 0.3mg IM into lateral thigh (no delay)",
      "3. Place patient supine with legs elevated (if hypotensive)",
      "4. High-flow O₂ via non-rebreather mask",
      "5. Establish IV access — bolus 1-2L normal saline",
      "6. Diphenhydramine 50mg IV (H1 blocker)",
      "7. Methylprednisolone 125mg IV (prevent biphasic reaction)",
      "8. Ranitidine/famotidine IV (H2 blocker)",
      "9. Monitor airway — if stridor worsens, RSI intubation",
      "10. Observe 4-6 hours for biphasic anaphylaxis",
    ],
    points: 90,
    diagnosis: "Anaphylactic shock secondary to Hymenoptera sting",
  },
  {
    id: "stroke",
    title: "Stroke / CVA",
    shortTitle: "CVA",
    age: 68,
    gender: "Male",
    chief: "Right-sided weakness, slurred speech",
    vitals: {
      hr: 58,
      spo2: 96,
      sbp: 180,
      dbp: 100,
      temp: 37.0,
      rr: 14,
      etco2: 42,
    },
    criticals: ["BP"],
    rhythm: "sinus-brady",
    patientOpener:
      "I... can't... move my right arm. My speech... is not... working right.",
    patientResponses: [
      "It started suddenly... about 1 hour ago.",
      "I have high blood pressure. I take amlodipine.",
      "My face feels... drooping on the right side.",
      "I had a small stroke... 2 years ago.",
      "Please... I want to... go home.",
    ],
    actions: [
      {
        label: "12-Lead ECG",
        correct: true,
        feedback: "✅ Correct — Check for AF as stroke cause",
      },
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ Correct — IV access for potential thrombolysis",
      },
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ Correct — Supplemental O₂ if SpO₂ < 94%",
      },
      {
        label: "Call Code",
        correct: true,
        feedback: "✅ CRITICAL — Activate stroke protocol, CT brain stat!",
      },
      {
        label: "Fluid Bolus",
        correct: false,
        feedback: "⚠️ Caution — Avoid aggressive fluids in stroke",
      },
      {
        label: "Give Adrenaline",
        correct: false,
        feedback: "❌ Contraindicated — Do not raise BP aggressively in stroke",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ Sinus bradycardia — No VF, defib not needed",
      },
      {
        label: "Intubate",
        correct: false,
        feedback: "⚠️ Not indicated yet — Patient protecting airway",
      },
    ],
    observerSteps: [
      "1. Recognize stroke with FAST: Face droop, Arm weakness, Speech slurring, Time",
      "2. Stroke onset time: 1 hour ago — within thrombolysis window (< 4.5 hrs)",
      "3. Activate stroke protocol — urgent CT brain without contrast",
      "4. Establish IV access, draw stat labs (CBC, coags, glucose)",
      "5. Check blood glucose (exclude hypoglycemia mimic)",
      "6. ECG for AF detection",
      "7. Do NOT lower BP unless > 220/120 or thrombolysis planned",
      "8. NIH Stroke Scale assessment",
      "9. If CT clear of hemorrhage + eligible: tPA 0.9mg/kg IV (max 90mg)",
      "10. Transfer to stroke unit for monitoring",
    ],
    points: 80,
    diagnosis: "Acute Ischemic Stroke — Left MCA territory",
  },
  {
    id: "trauma",
    title: "Polytrauma",
    shortTitle: "Trauma",
    age: 32,
    gender: "Male",
    chief: "RTA, multiple injuries, hypotensive",
    vitals: {
      hr: 135,
      spo2: 90,
      sbp: 75,
      dbp: 45,
      temp: 35.8,
      rr: 30,
      etco2: 28,
    },
    criticals: ["HR", "SpO2", "BP", "RR", "Temp"],
    rhythm: "sinus-tachy",
    patientOpener:
      "Help me... I was in a crash. My chest... I can't breathe. Everything hurts.",
    patientResponses: [
      "The car hit me at high speed... I was thrown.",
      "My belly really hurts... left side.",
      "I can't feel my right leg properly.",
      "I'm so cold... I'm shaking.",
      "Am I going to die doctor?",
    ],
    actions: [
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ Correct — High-flow O₂ with cervical spine precautions",
      },
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ CRITICAL — Two large-bore IVs, draw trauma labs",
      },
      {
        label: "Fluid Bolus",
        correct: true,
        feedback: "✅ Correct — Controlled resuscitation, 1L NS then reassess",
      },
      {
        label: "Call Code",
        correct: true,
        feedback: "✅ Correct — Trauma team activation, OR on standby",
      },
      {
        label: "12-Lead ECG",
        correct: true,
        feedback: "✅ Correct — Traumatic cardiac contusion possible",
      },
      {
        label: "Intubate",
        correct: true,
        feedback: "✅ Correct — SpO2 90% + RR 30 — RSI intubation needed",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ Sinus tachycardia — No VF/VT",
      },
      {
        label: "Give Adrenaline",
        correct: false,
        feedback: "❌ Not indicated for traumatic shock",
      },
    ],
    observerSteps: [
      "1. Primary survey ABCDE with C-spine immobilization",
      "2. Airway: Jaw thrust, C-spine collar, prepare RSI if needed",
      "3. Breathing: Check bilateral air entry — rule out pneumothorax",
      "4. Circulation: Two large-bore IVs, start resuscitation",
      "5. Disability: GCS, pupils, spinal exam",
      "6. Exposure: Full exposure + keep warm (hypothermia prevention)",
      "7. Permissive hypotension SBP 80-90 until surgical control",
      "8. Activate massive transfusion protocol (pRBC:FFP:Plt = 1:1:1)",
      "9. FAST ultrasound — Free fluid in abdomen → emergency laparotomy",
      "10. Trauma CT (pan-scan) if hemodynamically stable",
    ],
    points: 95,
    diagnosis: "Hemorrhagic shock due to blunt abdominal trauma",
  },
  {
    id: "sepsis",
    title: "Septic Shock",
    shortTitle: "Sepsis",
    age: 72,
    gender: "Female",
    chief: "Fever, hypotension, altered consciousness",
    vitals: {
      hr: 118,
      spo2: 92,
      sbp: 82,
      dbp: 50,
      temp: 39.8,
      rr: 24,
      etco2: 34,
    },
    criticals: ["HR", "SpO2", "BP", "Temp"],
    rhythm: "sinus-tachy",
    patientOpener:
      "I feel very weak... and confused. My family says I had high fever since yesterday.",
    patientResponses: [
      "I have diabetes... and kidney problems.",
      "I had a urinary catheter placed last week at the other hospital.",
      "I feel very cold even though I have fever.",
      "My urine has been dark and smelly.",
      "I'm... not sure where I am.",
    ],
    actions: [
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ Correct — Start Sepsis 6 bundle: IV access, cultures",
      },
      {
        label: "Fluid Bolus",
        correct: true,
        feedback: "✅ Correct — 30ml/kg crystalloid within 3 hours",
      },
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ Correct — O₂ to maintain SpO₂ > 94%",
      },
      {
        label: "Call Code",
        correct: true,
        feedback: "✅ Correct — ICU team, septic shock requires critical care",
      },
      {
        label: "12-Lead ECG",
        correct: true,
        feedback: "✅ Correct — Sepsis-induced myocardial dysfunction check",
      },
      {
        label: "Give Adrenaline",
        correct: true,
        feedback: "✅ Correct — Noradrenaline as vasopressor for MAP < 65",
      },
      {
        label: "Intubate",
        correct: false,
        feedback: "⚠️ Not yet — Patient protecting airway, work up first",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ Sinus tachycardia — No VF/VT",
      },
    ],
    observerSteps: [
      "1. Recognize Septic Shock: Infection + Hypotension + Vasopressors + Lactate > 2",
      "2. Start Sepsis 6 Bundle within 1 hour:",
      "3. Blood cultures x2 (before antibiotics)",
      "4. Serum lactate level",
      "5. IV crystalloid 30ml/kg for hypoperfusion",
      "6. Broad-spectrum IV antibiotics (Pip-Tazo + Vancomycin)",
      "7. Vasopressor (norepinephrine) if MAP < 65 despite fluids",
      "8. Foley catheter for urine output monitoring (target > 0.5ml/kg/hr)",
      "9. ICU admission, central line, arterial line",
      "10. Source control: identify and treat infection source (likely UTI/urosepsis)",
    ],
    points: 85,
    diagnosis: "Septic Shock — Probable urosepsis",
  },
  {
    id: "respiratory",
    title: "Respiratory Failure",
    shortTitle: "Resp. Failure",
    age: 45,
    gender: "Male",
    chief: "Severe dyspnea, SpO₂ dropping",
    vitals: {
      hr: 125,
      spo2: 78,
      sbp: 140,
      dbp: 90,
      temp: 38.5,
      rr: 35,
      etco2: 22,
    },
    criticals: ["HR", "SpO2", "RR"],
    rhythm: "sinus-tachy",
    patientOpener:
      "I can't breathe at all! It's been getting worse all day. I feel like I'm drowning!",
    patientResponses: [
      "I tested positive for COVID 5 days ago.",
      "The shortness of breath started yesterday but got much worse today.",
      "I feel chest tightness... and my lips feel blue? Are they blue?",
      "I have asthma but this is completely different.",
      "Please... I'm so scared. Just help me breathe.",
    ],
    actions: [
      {
        label: "Administer O₂",
        correct: true,
        feedback: "✅ CRITICAL — High-flow O₂ immediately, target SpO₂ > 92%",
      },
      {
        label: "Intubate",
        correct: true,
        feedback:
          "✅ Correct — SpO₂ 78% + RR 35 — RSI intubation, ARDS protocol",
      },
      {
        label: "IV Access",
        correct: true,
        feedback: "✅ Correct — IV access for medications",
      },
      {
        label: "Call Code",
        correct: true,
        feedback: "✅ Correct — ICU/Critical care team needed",
      },
      {
        label: "Fluid Bolus",
        correct: false,
        feedback:
          "⚠️ Caution — Aggressive fluids worsen pulmonary edema in ARDS",
      },
      {
        label: "12-Lead ECG",
        correct: true,
        feedback: "✅ Correct — Rule out PE as cause",
      },
      {
        label: "Give Adrenaline",
        correct: false,
        feedback: "⚠️ Not indicated — No bronchospasm evidence",
      },
      {
        label: "Defib",
        correct: false,
        feedback: "❌ Sinus tachycardia — No shockable rhythm",
      },
    ],
    observerSteps: [
      "1. Immediate: Non-rebreather mask 15L/min O₂ — SpO₂ 78% is critical",
      "2. If no improvement in 5 min: High-Flow Nasal Cannula (HFNC) 60L/min",
      "3. Prepare for RSI intubation: Ketamine + Succinylcholine",
      "4. Post-intubation: ARDSnet ventilation: TV 6ml/kg, PEEP 8-12",
      "5. Position: Prone positioning for P/F ratio < 150",
      "6. CT chest: Bilateral infiltrates = ARDS",
      "7. Labs: ABG, BNP, D-dimer, COVID RT-PCR",
      "8. Consider dexamethasone 6mg daily (COVID-ARDS evidence)",
      "9. Avoid fluid overload — use conservative fluid strategy",
      "10. ICU admission, continuous monitoring",
    ],
    points: 90,
    diagnosis: "Type 1 Respiratory Failure (ARDS) — COVID-19",
  },
];

// ─── Canvas ECG component ─────────────────────────────────────────
function EcgCanvas({
  hr,
  rhythm,
  critical,
}: { hr: number; rhythm: Scenario["rhythm"]; critical: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const xRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = canvas.width;
    const H = canvas.height;
    const midY = H / 2;
    const speed = (hr / 60) * 2.5;
    const color = critical ? "#ff3355" : "#00e5ff";
    const trail: number[] = new Array(W).fill(midY);

    function getWaveY(x: number): number {
      const cycle = W / (hr / 60) / (1 / speed);
      const pos = ((x % cycle) + cycle) % cycle;
      const t = pos / cycle;

      if (rhythm === "vt") {
        const vtCycle = cycle / 3;
        const p = ((x % vtCycle) + vtCycle) % vtCycle;
        const pt = p / vtCycle;
        if (pt < 0.5) return midY - Math.sin(pt * Math.PI) * (H * 0.38);
        return midY + Math.sin((pt - 0.5) * Math.PI) * (H * 0.15);
      }
      if (rhythm === "afib") {
        const base = Math.sin(x * 0.3) * 3;
        if (t > 0.35 && t < 0.42) return midY - H * 0.45;
        if (t > 0.42 && t < 0.48) return midY + H * 0.18;
        if (t > 0.48 && t < 0.53) return midY - H * 0.08;
        return midY + base;
      }
      if (rhythm === "sinus-brady") {
        if (t > 0.1 && t < 0.18)
          return midY - H * 0.08 * Math.sin(((t - 0.1) / 0.08) * Math.PI);
        if (t > 0.38 && t < 0.41) return midY - H * 0.45;
        if (t > 0.41 && t < 0.44) return midY + H * 0.2;
        if (t > 0.44 && t < 0.48) return midY - H * 0.1;
        if (t > 0.55 && t < 0.7)
          return midY + H * 0.12 * Math.sin(((t - 0.55) / 0.15) * Math.PI);
        return midY;
      }
      // sinus-tachy and normal
      if (t > 0.1 && t < 0.18)
        return midY - H * 0.07 * Math.sin(((t - 0.1) / 0.08) * Math.PI);
      if (t > 0.32 && t < 0.35) return midY - H * 0.42;
      if (t > 0.35 && t < 0.38) return midY + H * 0.22;
      if (t > 0.38 && t < 0.42) return midY - H * 0.08;
      if (t > 0.5 && t < 0.65)
        return midY + H * 0.1 * Math.sin(((t - 0.5) / 0.15) * Math.PI);
      return midY;
    }

    let lastX = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Dark grid
      ctx.strokeStyle = "rgba(0,229,255,0.06)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // Advance waveform
      const step = speed * 0.8;
      for (let s = 0; s < Math.ceil(step); s++) {
        const nx = (lastX + 1) % W;
        trail[nx] = getWaveY(xRef.current + nx);
        lastX = nx;
      }
      xRef.current = (xRef.current + step) % (W * 10);

      // Draw trail with gradient fade
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      const startX = (lastX + 1) % W;
      ctx.moveTo(0, trail[startX]);
      for (let i = 1; i < W; i++) {
        const xi = (startX + i) % W;
        ctx.globalAlpha = i / W;
        ctx.lineTo(i, trail[xi]);
      }
      ctx.globalAlpha = 1;
      ctx.stroke();

      // Scan line
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(lastX, 0, 12, H);

      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [hr, rhythm, critical]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={80}
      className="w-full h-20 rounded-lg"
      data-ocid="er.canvas_target"
      style={{ background: "#040c14" }}
    />
  );
}

// ─── Vital card ───────────────────────────────────────────────────
function VitalCard({
  label,
  value,
  unit,
  critical,
}: { label: string; value: string | number; unit: string; critical: boolean }) {
  return (
    <motion.div
      animate={{ scale: critical ? [1, 1.02, 1] : 1 }}
      transition={{
        duration: 0.6,
        repeat: critical ? Number.POSITIVE_INFINITY : 0,
      }}
      className={`rounded-xl border p-2 text-center ${
        critical
          ? "border-red-500/60 bg-red-950/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
          : "border-cyan-500/20 bg-slate-900/60"
      }`}
    >
      <p
        className={`font-black text-lg leading-none ${critical ? "text-red-400" : "text-cyan-300"}`}
      >
        {value}
      </p>
      <p className="text-[10px] text-slate-400 mt-0.5">{unit}</p>
      <p
        className={`text-[9px] font-semibold uppercase tracking-wide ${critical ? "text-red-500" : "text-slate-500"}`}
      >
        {label}
      </p>
    </motion.div>
  );
}

// ─── Main ER Simulation Page ──────────────────────────────────────
export function ERSimulationPage() {
  const [scenarioId, setScenarioId] = useState("acs");
  const [mode, setMode] = useState<"practice" | "observer">("practice");
  const [started, setStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; role: "patient" | "doctor"; text: string }>
  >([]);
  const [input, setInput] = useState("");
  const [actionsUsed, setActionsUsed] = useState<string[]>([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [empathyRating, setEmpathyRating] = useState(3);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [observerStep, setObserverStep] = useState(0);
  const [listening, setListening] = useState(false);
  const [showStethoscope, setShowStethoscope] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const observerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const responseIdxRef = useRef(0);
  // biome-ignore lint/suspicious/noExplicitAny: SpeechRecognition not in all TS libs
  const recognitionRef = useRef<any>(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];

  const isCritical = (label: string) => scenario.criticals.includes(label);

  // Determine patient condition for ambient sounds and avatar
  const hasRespiratory =
    ["ards", "anaphylaxis"].includes(scenario.id) || scenario.vitals.spo2 < 92;
  const hasCardiac = ["acs", "stroke"].includes(scenario.id);
  const hasPain = ["trauma", "acs"].includes(scenario.id);
  const hasCough = hasRespiratory;
  const hasMoan = hasPain;

  const {
    muted,
    toggleMute,
    start: startSound,
    stop: stopSound,
  } = useICUAmbientSound({
    hasCough,
    hasMoan,
    autoStart: false,
  });

  // Get diagnostic tray scenario type
  function getDiagScenarioType():
    | "cardiac"
    | "respiratory"
    | "hepatic"
    | "renal"
    | "trauma"
    | "sepsis"
    | "normal" {
    if (hasCardiac) return "cardiac";
    if (hasRespiratory) return "respiratory";
    if (scenario.id === "sepsis") return "sepsis";
    if (scenario.id === "trauma") return "trauma";
    return "normal";
  }

  // Stop ambient sound on unmount
  useEffect(() => {
    return () => stopSound();
  }, [stopSound]);

  // Auto-advance observer steps
  useEffect(() => {
    if (!started || mode !== "observer") return;
    observerTimerRef.current = setInterval(() => {
      setObserverStep((s) =>
        Math.min(s + 1, scenario.observerSteps.length - 1),
      );
    }, 8000);
    return () => {
      if (observerTimerRef.current) clearInterval(observerTimerRef.current);
    };
  }, [started, mode, scenario]);

  // Scroll chat to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: chatEndRef is stable
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function startSimulation() {
    setStarted(true);
    setActionsUsed([]);
    setShowDiagnosis(false);
    setSessionComplete(false);
    setObserverStep(0);
    responseIdxRef.current = 0;
    setChatMessages([
      { id: "p-0", role: "patient", text: scenario.patientOpener },
    ]);
    startSound();

    // Request permissions
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .catch(() => {});
    navigator.geolocation?.getCurrentPosition(
      () => {},
      () => {},
    );
  }

  function handleSend() {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setChatMessages((prev) => [
      ...prev,
      { id: `d-${Date.now()}`, role: "doctor", text: msg },
    ]);
    // Patient response
    const idx = responseIdxRef.current % scenario.patientResponses.length;
    responseIdxRef.current++;
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `p-${Date.now()}`,
          role: "patient",
          text: scenario.patientResponses[idx],
        },
      ]);
    }, 1200);
  }

  function handleAction(action: Scenario["actions"][0]) {
    if (actionsUsed.includes(action.label)) {
      toast.info("Already performed this action");
      return;
    }
    setActionsUsed((prev) => [...prev, action.label]);
    if (action.correct) {
      toast.success(action.feedback, { duration: 3000 });
    } else {
      toast.error(action.feedback, { duration: 3000 });
    }
    if (actionsUsed.length + 1 >= 5) setShowDiagnosis(true);
  }

  function handleSubmitDiagnosis() {
    const correctActions = actionsUsed.filter(
      (a) => scenario.actions.find((sa) => sa.label === a)?.correct,
    ).length;
    const totalCorrect = scenario.actions.filter((a) => a.correct).length;
    const actionScore = Math.round(
      (correctActions / Math.max(totalCorrect, 1)) * 60,
    );
    const empathyScore = Math.round((empathyRating / 5) * 20);
    const diagnosisScore = diagnosisInput.length > 10 ? 20 : 5;
    const total = actionScore + empathyScore + diagnosisScore;

    // Save to leaderboard
    const prev = Number(
      localStorage.getItem("medsim_leaderboard_points") || "0",
    );
    localStorage.setItem("medsim_leaderboard_points", String(prev + total));

    const sessions = JSON.parse(
      localStorage.getItem("medsim_er_sessions") || "[]",
    );
    sessions.push({
      scenarioId,
      score: total,
      date: Date.now(),
      diagnosis: diagnosisInput,
    });
    localStorage.setItem("medsim_er_sessions", JSON.stringify(sessions));

    setSessionComplete(true);
    toast.success(`Simulation complete! +${total} points earned!`, {
      duration: 4000,
    });
  }

  function startVoice() {
    // biome-ignore lint/suspicious/noExplicitAny: cross-browser speech API
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      toast.error("Voice input not supported in this browser");
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      setInput((prev) => `${prev} ${e.results[0][0].transcript}`);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  return (
    <div
      className="p-3 sm:p-4 lg:p-6"
      style={{ minHeight: "100vh", background: "oklch(0.1 0.02 235)" }}
    >
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: "oklch(0.3 0.15 25 / 0.3)",
                border: "1px solid oklch(0.6 0.2 25 / 0.5)",
              }}
            >
              <Zap className="h-5 w-5" style={{ color: "oklch(0.7 0.2 25)" }} />
            </div>
            <div>
              <h1
                className="font-display text-xl sm:text-2xl font-black"
                style={{ color: "oklch(0.95 0.02 235)" }}
              >
                ER Simulation
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.55 0.06 235)" }}>
                Emergency Room Clinical Practice
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:ml-auto flex-wrap">
            <Select
              value={scenarioId}
              onValueChange={(v) => {
                setScenarioId(v);
                setStarted(false);
                setSessionComplete(false);
              }}
            >
              <SelectTrigger
                className="w-44 text-sm border-slate-700 bg-slate-900"
                data-ocid="er.scenario_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                {SCENARIOS.map((s) => (
                  <SelectItem
                    key={s.id}
                    value={s.id}
                    className="text-slate-200"
                  >
                    {s.shortTitle} — {s.age}
                    {s.gender[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mode toggle */}
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              <button
                type="button"
                data-ocid="er.practice_toggle"
                className={`px-3 py-2 text-xs font-semibold transition-colors ${mode === "practice" ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
                onClick={() => setMode("practice")}
              >
                <Stethoscope className="inline h-3 w-3 mr-1" />
                Practice
              </button>
              <button
                type="button"
                data-ocid="er.observer_toggle"
                className={`px-3 py-2 text-xs font-semibold transition-colors ${mode === "observer" ? "bg-violet-500/20 text-violet-300" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
                onClick={() => setMode("observer")}
              >
                <Eye className="inline h-3 w-3 mr-1" />
                Observer
              </button>
            </div>

            {/* Mute button */}
            {started && (
              <button
                type="button"
                data-ocid="er.mute_toggle"
                onClick={toggleMute}
                title={muted ? "Unmute ambient sounds" : "Mute ambient sounds"}
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs transition-colors"
                style={{
                  borderColor: muted
                    ? "oklch(0.4 0.05 235)"
                    : "oklch(0.4 0.15 196 / 0.5)",
                  background: muted
                    ? "oklch(0.13 0.03 235)"
                    : "oklch(0.15 0.05 196 / 0.2)",
                  color: muted
                    ? "oklch(0.45 0.05 235)"
                    : "oklch(0.65 0.15 196)",
                }}
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">
                  {muted ? "Muted" : "Sound On"}
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Scenario info card */}
        <div
          className="rounded-xl border p-3 flex items-center gap-3"
          style={{
            background: "oklch(0.13 0.03 235 / 0.8)",
            borderColor: "oklch(0.3 0.06 235)",
          }}
        >
          <div className="flex-shrink-0">
            <PatientDistressAvatar
              spo2={scenario.vitals.spo2}
              hasRespiratoryDistress={hasRespiratory}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.9 0.02 235)" }}
            >
              {scenario.title} — {scenario.age}
              {scenario.gender[0]}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: "oklch(0.55 0.06 235)" }}
            >
              {scenario.chief}
            </p>
          </div>
          <Badge
            className="flex-shrink-0 text-xs"
            style={{
              background: "oklch(0.25 0.12 25 / 0.4)",
              color: "oklch(0.7 0.18 25)",
              border: "1px solid oklch(0.5 0.15 25 / 0.4)",
            }}
          >
            Critical
          </Badge>
          {!started && (
            <Button
              size="sm"
              data-ocid="er.start_button"
              onClick={startSimulation}
              style={{ background: "oklch(0.45 0.18 196)", color: "white" }}
            >
              Start
            </Button>
          )}
        </div>

        {started && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Vitals monitor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              {/* ECG strip */}
              <div
                className="rounded-xl border p-3"
                style={{
                  background: "#040c14",
                  borderColor: "oklch(0.3 0.1 196 / 0.4)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity
                      className="h-4 w-4"
                      style={{ color: "oklch(0.65 0.18 196)" }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: "oklch(0.65 0.18 196)" }}
                    >
                      ECG — Lead II
                    </span>
                  </div>
                  <span
                    className={`text-sm font-black ${isCritical("HR") ? "text-red-400 animate-pulse" : "text-cyan-300"}`}
                  >
                    {scenario.vitals.hr} bpm
                  </span>
                </div>
                <EcgCanvas
                  hr={scenario.vitals.hr}
                  rhythm={scenario.rhythm}
                  critical={isCritical("HR")}
                />
              </div>

              {/* Diagnostic tools row */}
              <div className="flex gap-2 flex-wrap">
                <DiagnosticTray
                  data={{
                    scenarioType: getDiagScenarioType(),
                    hr: scenario.vitals.hr,
                    rhythm: scenario.rhythm,
                    spo2: scenario.vitals.spo2,
                  }}
                />
                <button
                  type="button"
                  data-ocid="er.stethoscope_toggle"
                  onClick={() => setShowStethoscope((v) => !v)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: showStethoscope
                      ? "oklch(0.5 0.18 196 / 0.5)"
                      : "oklch(0.3 0.06 235)",
                    background: showStethoscope
                      ? "oklch(0.2 0.08 196 / 0.3)"
                      : "oklch(0.13 0.03 235)",
                    color: showStethoscope
                      ? "oklch(0.7 0.15 196)"
                      : "oklch(0.5 0.05 235)",
                  }}
                >
                  <Stethoscope className="h-3.5 w-3.5" />
                  Stethoscope
                </button>
              </div>

              {/* Stethoscope panel */}
              <AnimatePresence>
                {showStethoscope && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <VirtualStethoscope
                      conditionOverrides={{
                        hasCardiac,
                        hasRespiratory,
                        hasWheeze:
                          scenario.id === "anaphylaxis" ||
                          scenario.id === "ards",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vitals grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                <VitalCard
                  label="HR"
                  value={scenario.vitals.hr}
                  unit="bpm"
                  critical={isCritical("HR")}
                />
                <VitalCard
                  label="SpO₂"
                  value={`${scenario.vitals.spo2}%`}
                  unit="%"
                  critical={isCritical("SpO2")}
                />
                <VitalCard
                  label="BP"
                  value={`${scenario.vitals.sbp}/${scenario.vitals.dbp}`}
                  unit="mmHg"
                  critical={isCritical("BP")}
                />
                <VitalCard
                  label="Temp"
                  value={scenario.vitals.temp}
                  unit="°C"
                  critical={isCritical("Temp")}
                />
                <VitalCard
                  label="RR"
                  value={scenario.vitals.rr}
                  unit="/min"
                  critical={isCritical("RR")}
                />
                <VitalCard
                  label="EtCO₂"
                  value={scenario.vitals.etco2}
                  unit="mmHg"
                  critical={false}
                />
              </div>

              {/* Critical alert */}
              {scenario.criticals.length > 0 && (
                <motion.div
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-xs text-red-300 font-semibold">
                    CRITICAL: {scenario.criticals.join(", ")} out of range!
                  </span>
                </motion.div>
              )}

              {/* Practice actions */}
              {mode === "practice" && (
                <div className="space-y-2">
                  <p
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "oklch(0.55 0.06 235)" }}
                  >
                    Interventions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {scenario.actions.map((action) => (
                      <button
                        type="button"
                        key={action.label}
                        data-ocid="er.action_button"
                        onClick={() => handleAction(action)}
                        disabled={actionsUsed.includes(action.label)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition-all ${
                          actionsUsed.includes(action.label)
                            ? "border-slate-700 bg-slate-800/30 text-slate-600 cursor-not-allowed"
                            : "border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-950/40"
                        }`}
                      >
                        {actionsUsed.includes(action.label) ? "✓ " : ""}
                        {action.label}
                      </button>
                    ))}
                  </div>

                  {showDiagnosis && !sessionComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 space-y-3"
                    >
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                        Submit Diagnosis
                      </p>
                      <Textarea
                        data-ocid="er.diagnosis_textarea"
                        placeholder="Enter your diagnosis..."
                        value={diagnosisInput}
                        onChange={(e) => setDiagnosisInput(e.target.value)}
                        className="text-sm bg-slate-900 border-slate-700 text-slate-200 min-h-[60px]"
                      />
                      <div>
                        <p className="text-xs text-slate-400 mb-2">
                          Patient Communication Rating
                        </p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              data-ocid={`er.empathy_star.${star}`}
                              onClick={() => setEmpathyRating(star)}
                              className={`text-xl transition-transform hover:scale-110 ${star <= empathyRating ? "text-yellow-400" : "text-slate-600"}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        data-ocid="er.submit_diagnosis_button"
                        onClick={handleSubmitDiagnosis}
                        className="w-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                      >
                        Submit Diagnosis
                      </Button>
                    </motion.div>
                  )}

                  {sessionComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-green-500/30 bg-green-950/20 p-4 text-center"
                    >
                      <p className="text-2xl mb-1">🎉</p>
                      <p className="font-bold text-green-400">
                        Simulation Complete!
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Correct diagnosis: {scenario.diagnosis}
                      </p>
                      <Button
                        size="sm"
                        data-ocid="er.restart_button"
                        className="mt-3 border-green-500/30 text-green-300"
                        variant="outline"
                        onClick={() => {
                          setStarted(false);
                          setSessionComplete(false);
                        }}
                      >
                        Try Another Scenario
                      </Button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Observer steps */}
              {mode === "observer" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">
                      ACLS/BLS Protocol
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid="er.next_step_button"
                      className="text-xs border-violet-500/30 text-violet-300"
                      onClick={() =>
                        setObserverStep((s) =>
                          Math.min(s + 1, scenario.observerSteps.length - 1),
                        )
                      }
                    >
                      Next Step
                    </Button>
                  </div>
                  <div className="space-y-1.5">
                    {scenario.observerSteps
                      .slice(0, observerStep + 1)
                      .map((step, i) => (
                        <motion.div
                          key={step.slice(0, 20)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`rounded-lg border px-3 py-2 text-xs ${
                            i === observerStep
                              ? "border-violet-500/40 bg-violet-950/30 text-violet-200"
                              : "border-slate-700 bg-slate-900/40 text-slate-400"
                          }`}
                        >
                          {step}
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right: Patient chat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col rounded-xl border overflow-hidden"
              style={{
                background: "oklch(0.11 0.025 235)",
                borderColor: "oklch(0.25 0.06 235)",
                minHeight: 480,
              }}
            >
              {/* Chat header */}
              <div
                className="px-4 py-3 border-b flex items-center gap-3"
                style={{ borderColor: "oklch(0.25 0.06 235)" }}
              >
                <PatientDistressAvatar
                  spo2={scenario.vitals.spo2}
                  hasRespiratoryDistress={hasRespiratory}
                  hasAnemia={
                    scenario.id === "trauma" || scenario.id === "sepsis"
                  }
                  label={`${scenario.age}y ${scenario.gender}`}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.9 0.02 235)" }}
                  >
                    Patient
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "oklch(0.55 0.06 235)" }}
                  >
                    {scenario.chief}
                  </p>
                </div>
                <Badge
                  className="flex-shrink-0 text-[10px]"
                  style={{
                    background: "oklch(0.25 0.15 25 / 0.3)",
                    color: "oklch(0.7 0.18 25)",
                  }}
                >
                  Distressed
                </Badge>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "doctor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                          msg.role === "doctor"
                            ? "bg-cyan-600/20 text-cyan-100 border border-cyan-600/20"
                            : "bg-slate-800 text-slate-200 border border-slate-700"
                        }`}
                      >
                        {msg.role === "patient" && (
                          <span className="text-xs text-slate-400 block mb-0.5">
                            Patient
                          </span>
                        )}
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div
                className="p-3 border-t flex gap-2"
                style={{ borderColor: "oklch(0.25 0.06 235)" }}
              >
                <input
                  type="text"
                  data-ocid="er.chat_input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Talk to patient..."
                  className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{
                    background: "oklch(0.15 0.03 235)",
                    borderColor: "oklch(0.3 0.06 235)",
                    color: "oklch(0.9 0.02 235)",
                  }}
                />
                <button
                  type="button"
                  data-ocid="er.voice_button"
                  onClick={listening ? stopVoice : startVoice}
                  className={`rounded-lg border px-3 py-2 transition-colors ${
                    listening
                      ? "border-red-500/50 bg-red-500/20 text-red-300"
                      : "border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {listening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="er.send_button"
                  onClick={handleSend}
                  className="rounded-lg px-3 py-2 transition-colors"
                  style={{ background: "oklch(0.45 0.18 196)", color: "white" }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
