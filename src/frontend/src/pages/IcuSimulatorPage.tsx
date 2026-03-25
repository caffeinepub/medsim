import { ECGAnalysisPanel } from "@/components/ECGAnalysisPanel";
import { IcuMonitorCanvas } from "@/components/IcuMonitorCanvas";
import { TwelveLeadECGModal } from "@/components/TwelveLeadECGModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  BellOff,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Pause,
  Play,
  Plug,
  RefreshCw,
  Stethoscope,
  Syringe,
  Wind,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SimMode = "icu" | "ot" | "emergency";
type VitalPhase = "initial" | "deteriorating" | "responding" | "stable";
type Pathology = "normal" | "stemi" | "afib";

interface Vitals {
  hr: number;
  spo2: number;
  sbp: number;
  dbp: number;
  temp: number;
  rr: number;
  etco2: number;
}

interface Ventilator {
  tv: number;
  rr: number;
  fio2: number;
  peep: number;
  pip: number;
}

interface DrugInfusion {
  name: string;
  dose: string;
  rate: string;
  status: "running" | "paused" | "completed";
}

interface Scenario {
  id: string;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  diagnosis: string;
  phases: Record<VitalPhase, Vitals>;
  ventilator?: Ventilator;
  drugs: DrugInfusion[];
  idealSteps: string[];
  criticalThresholds: Partial<
    Record<keyof Vitals, { min?: number; max?: number }>
  >;
}

// ─── ICU Scenarios ──────────────────────────────────────────────────────────

const ICU_SCENARIOS: Scenario[] = [
  {
    id: "septic-shock",
    name: "Septic Shock",
    age: 58,
    gender: "Male",
    complaint: "High-grade fever, altered sensorium, hypotension × 6 hours",
    diagnosis: "Septic Shock (Gram-negative bacteremia)",
    phases: {
      initial: {
        hr: 118,
        spo2: 94,
        sbp: 78,
        dbp: 42,
        temp: 39.6,
        rr: 26,
        etco2: 32,
      },
      deteriorating: {
        hr: 138,
        spo2: 89,
        sbp: 64,
        dbp: 34,
        temp: 40.1,
        rr: 34,
        etco2: 28,
      },
      responding: {
        hr: 105,
        spo2: 96,
        sbp: 90,
        dbp: 55,
        temp: 38.8,
        rr: 22,
        etco2: 35,
      },
      stable: {
        hr: 88,
        spo2: 98,
        sbp: 112,
        dbp: 68,
        temp: 37.9,
        rr: 18,
        etco2: 38,
      },
    },
    ventilator: { tv: 420, rr: 14, fio2: 60, peep: 8, pip: 24 },
    drugs: [
      {
        name: "Norepinephrine",
        dose: "0.2 mcg/kg/min",
        rate: "8 mL/h",
        status: "running",
      },
      {
        name: "Piperacillin-Taz",
        dose: "4.5g q6h IV",
        rate: "Bolus",
        status: "running",
      },
      {
        name: "Hydrocortisone",
        dose: "50mg q6h IV",
        rate: "Bolus",
        status: "running",
      },
      {
        name: "Meropenem",
        dose: "1g q8h IV",
        rate: "Bolus",
        status: "running",
      },
    ],
    idealSteps: [
      "Establish IV/IO access — 2 large-bore cannulas. Send blood cultures × 2 before antibiotics.",
      "Fluid resuscitation: crystalloid 30 mL/kg IV over 3 hours. Monitor lactate response.",
      "Start broad-spectrum antibiotics within 1 hour (Pip-Taz + Meropenem for Gram-negative coverage).",
      "Vasopressor (Norepinephrine) if MAP < 65 mmHg after adequate fluid challenge.",
      "Insert urinary catheter — target urine output ≥ 0.5 mL/kg/h.",
      "Consider intubation if GCS ≤ 8 or increasing WOB; use lung-protective ventilation.",
      "Hydrocortisone 200 mg/day if refractory shock (vasopressor-dependent).",
      "Repeat lactate in 2h; target clearance > 10%. SOFA score every 6 hours.",
    ],
    criticalThresholds: {
      hr: { max: 130 },
      spo2: { min: 92 },
      sbp: { min: 90 },
      temp: { max: 39.5 },
    },
  },
  {
    id: "acute-mi",
    name: "Acute STEMI",
    age: 52,
    gender: "Male",
    complaint: "Severe crushing chest pain radiating to left arm × 2 hours",
    diagnosis: "Acute ST-Elevation MI (Anterior STEMI)",
    phases: {
      initial: {
        hr: 95,
        spo2: 95,
        sbp: 100,
        dbp: 65,
        temp: 37.2,
        rr: 22,
        etco2: 36,
      },
      deteriorating: {
        hr: 42,
        spo2: 88,
        sbp: 72,
        dbp: 40,
        temp: 37.4,
        rr: 28,
        etco2: 28,
      },
      responding: {
        hr: 68,
        spo2: 96,
        sbp: 105,
        dbp: 68,
        temp: 37.3,
        rr: 20,
        etco2: 35,
      },
      stable: {
        hr: 78,
        spo2: 99,
        sbp: 125,
        dbp: 78,
        temp: 37.1,
        rr: 16,
        etco2: 40,
      },
    },
    drugs: [
      {
        name: "Aspirin",
        dose: "325mg PO loading",
        rate: "Once",
        status: "completed",
      },
      {
        name: "Clopidogrel",
        dose: "600mg PO loading",
        rate: "Once",
        status: "completed",
      },
      {
        name: "Heparin UFH",
        dose: "60 U/kg IV bolus",
        rate: "Infusion",
        status: "running",
      },
      {
        name: "GTN",
        dose: "5 mcg/min IV",
        rate: "0.5 mL/h",
        status: "running",
      },
    ],
    idealSteps: [
      "12-lead ECG within 10 minutes. Identify STEMI pattern (ST elevation ≥1 mm in ≥2 contiguous leads).",
      "Dual antiplatelet: Aspirin 325 mg + Clopidogrel 600 mg (or Ticagrelor 180 mg) immediately.",
      "Activate catheterisation lab — target door-to-balloon time < 90 minutes (PCI centre).",
      "If PCI unavailable within 120 min, fibrinolysis with Tenecteplase (weight-based dosing).",
      "Anticoagulation: UFH 60 U/kg IV bolus + 12 U/kg/h infusion (max 4000 U bolus).",
      "GTN for ongoing ischaemic pain if SBP > 90 mmHg. Oxygen if SpO2 < 90%.",
      "Treat complete heart block with transcutaneous pacing; avoid atropine in Mobitz II.",
      "Post-PCI: Statin high-intensity, Beta-blocker, ACE inhibitor, DAPT for ≥ 12 months.",
    ],
    criticalThresholds: {
      hr: { min: 50, max: 120 },
      spo2: { min: 92 },
      sbp: { min: 90 },
    },
  },
];

const OT_SCENARIOS: Scenario[] = [
  {
    id: "difficult-airway",
    name: "Difficult Airway",
    age: 44,
    gender: "Female",
    complaint: "Emergency laparotomy — perforated peptic ulcer",
    diagnosis: "Difficult Airway + Full Stomach (RSI Required)",
    phases: {
      initial: {
        hr: 102,
        spo2: 99,
        sbp: 125,
        dbp: 78,
        temp: 37.8,
        rr: 16,
        etco2: 38,
      },
      deteriorating: {
        hr: 125,
        spo2: 82,
        sbp: 90,
        dbp: 55,
        temp: 37.9,
        rr: 34,
        etco2: 22,
      },
      responding: {
        hr: 98,
        spo2: 97,
        sbp: 118,
        dbp: 72,
        temp: 37.8,
        rr: 12,
        etco2: 38,
      },
      stable: {
        hr: 76,
        spo2: 99,
        sbp: 120,
        dbp: 76,
        temp: 37.5,
        rr: 12,
        etco2: 40,
      },
    },
    ventilator: { tv: 400, rr: 12, fio2: 50, peep: 5, pip: 18 },
    drugs: [
      {
        name: "Propofol",
        dose: "2 mg/kg IV",
        rate: "Bolus",
        status: "completed",
      },
      {
        name: "Suxamethonium",
        dose: "1.5 mg/kg IV",
        rate: "Bolus",
        status: "completed",
      },
      {
        name: "Vecuronium",
        dose: "0.1 mg/kg IV",
        rate: "PRN",
        status: "running",
      },
      {
        name: "Fentanyl",
        dose: "2 mcg/kg IV",
        rate: "Bolus",
        status: "completed",
      },
      {
        name: "Sevoflurane",
        dose: "2% end-tidal",
        rate: "Via circuit",
        status: "running",
      },
    ],
    idealSteps: [
      "Mallampati class III/IV + receding chin — anticipate difficult intubation. Call for senior help.",
      "Pre-oxygenate 3 min with 100% O2, 15 L/min. Nil position (modified ramped).",
      "RSI: Propofol 2 mg/kg + Suxamethonium 1.5 mg/kg — apply cricoid pressure throughout.",
      "Plan A: Direct laryngoscopy with Macintosh blade + BURP manoeuvre.",
      "Plan B: Video laryngoscope (Glidescope/McGrath). Have bougie ready.",
      "Plan C: Second-generation supraglottic airway (i-gel) as bridge if both fail.",
      "Plan D: Surgical airway (cricothyroidotomy) if CICO situation.",
      "Declare CICO early — do not delay surgical airway. Oxygenation is priority over intubation.",
    ],
    criticalThresholds: {
      spo2: { min: 92 },
      hr: { max: 130 },
      sbp: { min: 90 },
    },
  },
  {
    id: "malignant-hyperthermia",
    name: "Malignant Hyperthermia",
    age: 31,
    gender: "Male",
    complaint: "Generalised muscle rigidity, rising temperature during GA",
    diagnosis: "Malignant Hyperthermia (Halothane-Triggered)",
    phases: {
      initial: {
        hr: 118,
        spo2: 96,
        sbp: 145,
        dbp: 88,
        temp: 38.8,
        rr: 20,
        etco2: 55,
      },
      deteriorating: {
        hr: 152,
        spo2: 88,
        sbp: 168,
        dbp: 95,
        temp: 41.2,
        rr: 28,
        etco2: 72,
      },
      responding: {
        hr: 105,
        spo2: 95,
        sbp: 135,
        dbp: 82,
        temp: 39.5,
        rr: 18,
        etco2: 48,
      },
      stable: {
        hr: 88,
        spo2: 99,
        sbp: 118,
        dbp: 72,
        temp: 37.8,
        rr: 14,
        etco2: 38,
      },
    },
    ventilator: { tv: 550, rr: 20, fio2: 100, peep: 5, pip: 26 },
    drugs: [
      {
        name: "Dantrolene",
        dose: "2.5 mg/kg IV bolus",
        rate: "Repeat PRN",
        status: "running",
      },
      {
        name: "Sodium Bicarb",
        dose: "1 mEq/kg IV",
        rate: "Bolus",
        status: "running",
      },
      {
        name: "Insulin/Dextrose",
        dose: "10 U + 50 mL 50% Dex",
        rate: "IV",
        status: "running",
      },
    ],
    idealSteps: [
      "STOP all triggering agents (volatile anaesthetics, suxamethonium) immediately.",
      "Call for help. Switch to TIVA (Propofol infusion). Hyperventilate with 100% O2 — 3× minute volume.",
      "Dantrolene 2.5 mg/kg IV STAT. Repeat every 5 min until symptoms resolve (max 10 mg/kg).",
      "Active cooling — ice packs to axilla/groin, cold IV saline, bladder irrigation.",
      "Treat hyperkalaemia: Calcium gluconate 10 mL 10% IV + Insulin/Dextrose.",
      "Sodium bicarbonate 1–2 mEq/kg for severe metabolic acidosis (pH < 7.1).",
      "Send ABG, CK, electrolytes, coagulation every 30 min. Target temp < 38°C.",
      "Admit to ICU post-op. MH hotline (UK: 07947 609 601). Genetic counselling for family.",
    ],
    criticalThresholds: {
      temp: { max: 39 },
      hr: { max: 140 },
      spo2: { min: 92 },
    },
  },
];

const EMERGENCY_SCENARIOS: Scenario[] = [
  {
    id: "anaphylaxis",
    name: "Anaphylaxis",
    age: 28,
    gender: "Female",
    complaint:
      "Sudden collapse, urticaria, wheeze after IV contrast administration",
    diagnosis: "Grade III Anaphylaxis (Cardiovascular Involvement)",
    phases: {
      initial: {
        hr: 142,
        spo2: 88,
        sbp: 68,
        dbp: 35,
        temp: 37.2,
        rr: 32,
        etco2: 26,
      },
      deteriorating: {
        hr: 158,
        spo2: 82,
        sbp: 52,
        dbp: 24,
        temp: 37.1,
        rr: 38,
        etco2: 20,
      },
      responding: {
        hr: 105,
        spo2: 95,
        sbp: 95,
        dbp: 62,
        temp: 37.2,
        rr: 22,
        etco2: 34,
      },
      stable: {
        hr: 85,
        spo2: 99,
        sbp: 120,
        dbp: 75,
        temp: 37.0,
        rr: 16,
        etco2: 39,
      },
    },
    drugs: [
      {
        name: "Adrenaline (IM)",
        dose: "0.5 mg IM (1:1000)",
        rate: "Thigh",
        status: "completed",
      },
      {
        name: "Chlorphenamine",
        dose: "10 mg IV",
        rate: "Bolus",
        status: "running",
      },
      {
        name: "Hydrocortisone",
        dose: "200 mg IV",
        rate: "Bolus",
        status: "running",
      },
      {
        name: "Salbutamol neb",
        dose: "5 mg/2.5 mL",
        rate: "Neb",
        status: "running",
      },
    ],
    idealSteps: [
      "ABCDE assessment. Remove/stop trigger (IV contrast, drug, food). Call crash team.",
      "Adrenaline 0.5 mg (0.5 mL 1:1000) IM — outer mid-thigh. Repeat every 5 min if no improvement.",
      "High-flow O2 15 L/min via non-rebreather mask. Early intubation if stridor/angioedema.",
      "IV crystalloid 500–1000 mL bolus if hypotensive. Trendelenburg if BP < 90 mmHg.",
      "IV antihistamine (Chlorphenamine 10 mg) — adjunct only, NOT first-line treatment.",
      "IV Hydrocortisone 200 mg (prevents biphasic reaction). Does not help acute phase.",
      "Nebulised Salbutamol if persistent bronchospasm after adrenaline.",
      "Observe ≥ 6–12 hours for biphasic anaphylaxis. Prescribe Adrenaline auto-injector on discharge.",
    ],
    criticalThresholds: {
      hr: { max: 140 },
      spo2: { min: 92 },
      sbp: { min: 90 },
      rr: { max: 28 },
    },
  },
  {
    id: "status-epilepticus",
    name: "Status Epilepticus",
    age: 19,
    gender: "Male",
    complaint: "Continuous tonic-clonic seizure for > 30 minutes, unresponsive",
    diagnosis: "Refractory Generalised Convulsive Status Epilepticus",
    phases: {
      initial: {
        hr: 135,
        spo2: 91,
        sbp: 162,
        dbp: 98,
        temp: 38.5,
        rr: 28,
        etco2: 30,
      },
      deteriorating: {
        hr: 148,
        spo2: 85,
        sbp: 172,
        dbp: 102,
        temp: 39.2,
        rr: 34,
        etco2: 24,
      },
      responding: {
        hr: 98,
        spo2: 96,
        sbp: 138,
        dbp: 85,
        temp: 38.1,
        rr: 20,
        etco2: 36,
      },
      stable: {
        hr: 82,
        spo2: 99,
        sbp: 122,
        dbp: 74,
        temp: 37.5,
        rr: 16,
        etco2: 40,
      },
    },
    ventilator: { tv: 450, rr: 14, fio2: 40, peep: 5, pip: 20 },
    drugs: [
      {
        name: "Lorazepam IV",
        dose: "4 mg IV over 2 min",
        rate: "Bolus",
        status: "completed",
      },
      {
        name: "Phenytoin",
        dose: "20 mg/kg IV infusion",
        rate: "50 mg/min max",
        status: "running",
      },
      {
        name: "Levetiracetam",
        dose: "60 mg/kg IV",
        rate: "500 mg/min",
        status: "running",
      },
      {
        name: "Propofol (RSI)",
        dose: "1.5 mg/kg IV",
        rate: "Infusion TCI",
        status: "running",
      },
    ],
    idealSteps: [
      "Timed seizure onset. Place in recovery position. O2 via NRB 15 L/min, suction secretions.",
      "IV access × 2. Check glucose stat — correct hypoglycaemia (50 mL 50% dextrose IV) immediately.",
      "First-line (0–5 min): Lorazepam 0.1 mg/kg IV (max 4 mg). Repeat × 1 after 5 min if no response.",
      "Second-line (10–20 min): IV Phenytoin 20 mg/kg (max 50 mg/min) OR Levetiracetam 60 mg/kg.",
      "Third-line (20–30 min): Phenobarbitone 20 mg/kg IV; secure airway proactively.",
      "Refractory status (>30 min): ICU admission, RSI + general anaesthesia (Propofol/Thiopental).",
      "Continuous EEG monitoring post-intubation. Treat underlying cause (CT head, LP, metabolics).",
      "Avoid hyperthermia, hypoglycaemia, hyponatraemia — all perpetuate status. Target SpO2 ≥ 95%.",
    ],
    criticalThresholds: {
      spo2: { min: 92 },
      hr: { max: 140 },
      temp: { max: 39.0 },
    },
  },
];

const SCENARIOS_BY_MODE: Record<SimMode, Scenario[]> = {
  icu: ICU_SCENARIOS,
  ot: OT_SCENARIOS,
  emergency: EMERGENCY_SCENARIOS,
};

// ─── Status colours ────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  normal: "oklch(0.65 0.18 155)",
  warning: "oklch(0.75 0.18 70)",
  critical: "oklch(0.55 0.22 27)",
};

// ─── VitalCard ────────────────────────────────────────────────────────────────

interface VitalCardProps {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  sublabel?: string;
}

function VitalCard({
  label,
  value,
  unit,
  status,
  trend,
  sublabel,
}: VitalCardProps) {
  const color = STATUS_COLORS[status];
  const isCritical = status === "critical";
  return (
    <div
      className="relative flex flex-col items-start rounded-xl p-3 gap-1 overflow-hidden"
      style={{
        background: "oklch(0.18 0.05 235)",
        border: `1px solid ${color}`,
        opacity: isCritical ? 1 : 0.85,
        boxShadow: isCritical ? `0 0 18px ${color}` : `0 0 8px ${color}`,
        animation: isCritical
          ? "alert-blink 1.5s ease-in-out infinite"
          : "none",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider opacity-60"
        style={{ color: "oklch(0.88 0.015 215)" }}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span
          className="font-display text-2xl font-black tabular-nums leading-none"
          style={{
            color,
            textShadow: `0 0 12px ${color}`,
            animation: isCritical
              ? "vital-pulse 2s ease-in-out infinite"
              : "none",
          }}
        >
          {value}
        </span>
        <span
          className="text-xs opacity-50"
          style={{ color: "oklch(0.88 0.015 215)" }}
        >
          {unit}
        </span>
        {trend && trend !== "stable" && (
          <span
            style={{
              color:
                trend === "up" ? STATUS_COLORS.warning : STATUS_COLORS.normal,
            }}
          >
            {trend === "up" ? (
              <ChevronUp className="h-3 w-3 inline" />
            ) : (
              <ChevronDown className="h-3 w-3 inline" />
            )}
          </span>
        )}
      </div>
      {sublabel && (
        <span
          className="text-xs opacity-50"
          style={{ color: "oklch(0.88 0.015 215)" }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getVitalStatus(
  key: keyof Vitals,
  val: number,
  thresholds: Scenario["criticalThresholds"],
): "normal" | "warning" | "critical" {
  const t = thresholds[key];
  if (!t) return "normal";
  if (
    (t.min !== undefined && val < t.min - 5) ||
    (t.max !== undefined && val > t.max + 5)
  )
    return "critical";
  if (
    (t.min !== undefined && val < t.min) ||
    (t.max !== undefined && val > t.max)
  )
    return "warning";
  return "normal";
}

function interpolateVitals(a: Vitals, b: Vitals, t: number): Vitals {
  const lerp = (x: number, y: number) => Math.round(x + (y - x) * t);
  return {
    hr: lerp(a.hr, b.hr),
    spo2: Math.min(100, lerp(a.spo2, b.spo2)),
    sbp: lerp(a.sbp, b.sbp),
    dbp: lerp(a.dbp, b.dbp),
    temp: Math.round((a.temp + (b.temp - a.temp) * t) * 10) / 10,
    rr: lerp(a.rr, b.rr),
    etco2: lerp(a.etco2, b.etco2),
  };
}

function playCuffSound() {
  try {
    const ctx = new AudioContext();
    const duration = 2;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.3;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 200;
    filter.Q.value = 0.5;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
    setTimeout(() => ctx.close(), duration * 1000 + 100);
  } catch (_e) {}
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function IcuSimulatorPage() {
  const [mode, setMode] = useState<SimMode>("icu");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    ICU_SCENARIOS[0].id,
  );
  const [phase, setPhase] = useState<VitalPhase>("initial");
  const phaseRef = useRef<VitalPhase>("initial");
  const [vitals, setVitals] = useState<Vitals>(ICU_SCENARIOS[0].phases.initial);
  const [practiceMode, setPracticeMode] = useState(true);
  const [alarmSilenced, setAlarmSilenced] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [showConnectBadge, setShowConnectBadge] = useState(false);
  const [observerStepIndex, setObserverStepIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [running, setRunning] = useState(true);
  const liveHrRef = useRef<number>(ICU_SCENARIOS[0].phases.initial.hr);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimerRef = useRef(0);

  // ── New: clinical controls ──────────────────────────────────────────────────
  const [pathology, setPathology] = useState<Pathology>("normal");
  const [frozen, setFrozen] = useState(false);
  const frozenRef = useRef(false);
  const [show12Lead, setShow12Lead] = useState(false);
  useEffect(() => {
    frozenRef.current = frozen;
  }, [frozen]);
  const [nibpRunning, setNibpRunning] = useState(false);
  const [nibpSystolic, setNibpSystolic] = useState(120);
  const [nibpDiastolic, setNibpDiastolic] = useState(80);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [alarmActive, setAlarmActive] = useState(false);

  const scenarios = SCENARIOS_BY_MODE[mode];
  const scenario =
    scenarios.find((s) => s.id === selectedScenarioId) ?? scenarios[0];

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    setRunning(practiceMode);
  }, [practiceMode]);

  useEffect(() => {
    const s = SCENARIOS_BY_MODE[mode];
    setSelectedScenarioId(s[0].id);
    setPhase("initial");
    phaseRef.current = "initial";
    setVitals(s[0].phases.initial);
    setPhaseProgress(0);
    phaseTimerRef.current = 0;
    setAlarmSilenced(false);
    setActionFeedback(null);
    setObserverStepIndex(0);
  }, [mode]);

  useEffect(() => {
    const s =
      scenarios.find((sc) => sc.id === selectedScenarioId) ?? scenarios[0];
    setPhase("initial");
    setVitals(s.phases.initial);
    setPhaseProgress(0);
    phaseTimerRef.current = 0;
    setAlarmSilenced(false);
    setActionFeedback(null);
    setObserverStepIndex(0);
  }, [selectedScenarioId, scenarios]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      if (frozenRef.current) return;
      setPhaseProgress((prev) => {
        if (phaseRef.current === "stable") return 100;
        const next = prev + 5;
        if (next >= 100) {
          setPhase((current) => {
            const order: VitalPhase[] = [
              "initial",
              "deteriorating",
              "responding",
              "stable",
            ];
            const idx = order.indexOf(current);
            if (idx >= order.length - 1) return current;
            return order[idx + 1];
          });
          return 0;
        }
        return next;
      });
      setVitals((curr) => {
        const noise = (range: number) => (Math.random() - 0.5) * range;
        const newHr = Math.max(30, Math.min(200, curr.hr + noise(4)));
        liveHrRef.current = newHr;
        return {
          hr: newHr,
          spo2: Math.max(70, Math.min(100, curr.spo2 + noise(1))),
          sbp: Math.max(40, Math.min(220, curr.sbp + noise(3))),
          dbp: Math.max(20, Math.min(140, curr.dbp + noise(2))),
          temp: Math.round((curr.temp + noise(0.1)) * 10) / 10,
          rr: Math.max(8, Math.min(50, curr.rr + noise(2))),
          etco2: Math.max(10, Math.min(60, curr.etco2 + noise(2))),
        };
      });
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    const order: VitalPhase[] = [
      "initial",
      "deteriorating",
      "responding",
      "stable",
    ];
    const idx = order.indexOf(phase);
    const sourcePhase = idx > 0 ? order[idx - 1] : phase;
    const interpolated = interpolateVitals(
      scenario.phases[sourcePhase],
      scenario.phases[phase],
      0.5,
    );
    liveHrRef.current = interpolated.hr;
    setVitals(interpolated);
  }, [phase, scenario]);

  const hasCritical = Object.entries(vitals).some(
    ([key, val]) =>
      getVitalStatus(
        key as keyof Vitals,
        val as number,
        scenario.criticalThresholds,
      ) === "critical",
  );

  const handleAction = useCallback(
    (action: string) => {
      const messages: Record<string, string> = {
        "Adjust Ventilator":
          "✓ Tidal volume adjusted to lung-protective settings (6 mL/kg IBW). PEEP optimised.",
        "Administer Drug":
          "✓ Drug administered as per protocol. Monitor for therapeutic response and adverse effects.",
        Defibrillate:
          phase === "deteriorating"
            ? "✓ 200J biphasic delivered. Check rhythm. Resume CPR immediately after shock."
            : "⚠ Rhythm not shockable currently. Continue monitoring and ABCDE assessment.",
        "Increase O2":
          "✓ FiO2 increased to 100%. Monitor SpO2 and EtCO2. Consider NIV or intubation if not responding.",
        "Fluid Bolus":
          "✓ 500 mL crystalloid bolus initiated. Reassess BP, HR, and urine output at 30 minutes.",
        "Alert Senior":
          "✓ Senior registrar and attending notified. Crash trolley requested. Team assembled.",
      };
      setActionFeedback(
        messages[action] ??
          `✓ Action "${action}" performed. Monitor patient response closely.`,
      );
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = setTimeout(
        () => setActionFeedback(null),
        6000,
      );
      if (action === "Adjust Ventilator" || action === "Administer Drug") {
        setPhase("responding");
        setPhaseProgress(0);
      }
    },
    [phase],
  );

  const resetScenario = () => {
    setPhase("initial");
    phaseRef.current = "initial";
    phaseTimerRef.current = 0;
    liveHrRef.current = scenario.phases.initial.hr;
    setVitals(scenario.phases.initial);
    setPhaseProgress(0);
    setAlarmSilenced(false);
    setActionFeedback(null);
    setObserverStepIndex(0);
  };

  const handleStartBP = () => {
    if (nibpRunning) return;
    setNibpRunning(true);
    playCuffSound();
    setTimeout(() => {
      const newSys =
        pathology === "stemi"
          ? 90 + Math.random() * 20
          : 110 + Math.random() * 30;
      const newDia = newSys * 0.6 + Math.random() * 10;
      setNibpSystolic(Math.round(newSys));
      setNibpDiastolic(Math.round(newDia));
      setNibpRunning(false);
    }, 5000);
  };

  const PRACTICE_ACTIONS = [
    "Adjust Ventilator",
    "Administer Drug",
    "Defibrillate",
    "Increase O2",
    "Fluid Bolus",
    "Alert Senior",
  ];
  const ACTION_ICONS: Record<string, React.ReactNode> = {
    "Adjust Ventilator": <Wind className="h-4 w-4" />,
    "Administer Drug": <Syringe className="h-4 w-4" />,
    Defibrillate: <Zap className="h-4 w-4" />,
    "Increase O2": <Activity className="h-4 w-4" />,
    "Fluid Bolus": <Stethoscope className="h-4 w-4" />,
    "Alert Senior": <AlertTriangle className="h-4 w-4" />,
  };

  const hrVal = Math.round(vitals.hr);
  const spo2Val = Math.round(vitals.spo2);
  const rrVal = Math.round(vitals.rr);

  return (
    <div
      className="min-h-full"
      style={{
        background: "oklch(0.12 0.04 235)",
        color: "oklch(0.92 0.015 215)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 gap-3"
        style={{
          background: "oklch(0.14 0.05 235 / 0.97)",
          borderBottom: "1px solid oklch(0.65 0.16 196 / 0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "oklch(0.65 0.16 196 / 0.15)",
              border: "1px solid oklch(0.65 0.16 196 / 0.3)",
            }}
          >
            <Activity
              className="h-5 w-5"
              style={{ color: "oklch(0.65 0.16 196)" }}
            />
          </div>
          <div>
            <h1
              className="font-display text-base font-black leading-tight"
              style={{ color: "oklch(0.92 0.015 215)" }}
            >
              ICU Simulator
            </h1>
            <p className="text-xs opacity-50">Live Clinical Simulation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
            style={{
              background: running
                ? "oklch(0.65 0.18 155 / 0.15)"
                : "oklch(0.55 0.22 27 / 0.15)",
              border: `1px solid ${running ? "oklch(0.65 0.18 155 / 0.4)" : "oklch(0.55 0.22 27 / 0.4)"}`,
              color: running ? "oklch(0.65 0.18 155)" : "oklch(0.55 0.22 27)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: running
                  ? "oklch(0.65 0.18 155)"
                  : "oklch(0.55 0.22 27)",
                animation: running
                  ? "pulse-glow 1.5s ease-in-out infinite"
                  : "none",
              }}
            />
            {running ? "LIVE" : "PAUSED"}
          </button>
          <div className="relative">
            <Button
              size="sm"
              data-ocid="icu.connect_device_button"
              onClick={() => setShowConnectBadge(true)}
              variant="outline"
              className="gap-2 text-xs border-opacity-30"
              style={{
                borderColor: "oklch(0.65 0.16 196 / 0.3)",
                color: "oklch(0.65 0.16 196)",
                background: "transparent",
              }}
            >
              <Plug className="h-3.5 w-3.5" />
              Connect Device
            </Button>
            <AnimatePresence>
              {showConnectBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 8 }}
                  className="absolute right-0 top-full mt-2 z-50 rounded-xl px-4 py-3 text-center shadow-xl"
                  style={{
                    background: "oklch(0.18 0.05 235)",
                    border: "1px solid oklch(0.65 0.16 196 / 0.3)",
                    minWidth: "200px",
                  }}
                  onClick={() => setShowConnectBadge(false)}
                >
                  <Badge className="mb-2 bg-warning/20 text-warning border-warning/30">
                    Coming Soon
                  </Badge>
                  <p className="text-xs opacity-70">
                    Real ICU device integration via Biomedical Engineering Dept.
                    API coming in next release.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Critical Alarm Banner ── */}
      <AnimatePresence>
        {(hasCritical || alarmActive) && !alarmSilenced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            data-ocid="icu.alarm_banner"
            className="flex items-center justify-between px-4 py-2 gap-3"
            style={{
              background: "oklch(0.55 0.22 27 / 0.2)",
              borderBottom: "1px solid oklch(0.55 0.22 27 / 0.5)",
              animation: "alert-blink 0.5s ease-in-out infinite",
            }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="h-4 w-4 flex-shrink-0"
                style={{ color: "oklch(0.55 0.22 27)" }}
              />
              <span
                className="text-sm font-bold"
                style={{ color: "oklch(0.55 0.22 27)" }}
              >
                {alarmActive
                  ? "⚠ SpO₂ CRITICAL — SpO₂ below 90% — Immediate intervention required"
                  : "CRITICAL VITALS ALERT — Immediate intervention required"}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              data-ocid="icu.alarm_silence_button"
              onClick={() => setAlarmSilenced(true)}
              className="gap-1 text-xs"
              style={{ color: "oklch(0.75 0.18 70)" }}
            >
              <BellOff className="h-3.5 w-3.5" />
              Silence
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto">
        {/* ── Mode Selector ── */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as SimMode)}>
          <TabsList
            className="grid w-full grid-cols-3 p-1"
            style={{
              background: "oklch(0.18 0.05 235)",
              border: "1px solid oklch(0.65 0.16 196 / 0.2)",
            }}
          >
            {(["icu", "ot", "emergency"] as SimMode[]).map((m) => (
              <TabsTrigger
                key={m}
                value={m}
                data-ocid="icu.mode_tab"
                className="font-semibold text-sm uppercase tracking-wide transition-all data-[state=active]:text-white"
                style={
                  mode === m
                    ? {
                        background: "oklch(0.65 0.16 196)",
                        color: "white",
                        boxShadow: "0 0 16px oklch(0.65 0.16 196 / 0.4)",
                      }
                    : { color: "oklch(0.88 0.015 215 / 0.6)" }
                }
              >
                {m === "icu" ? "🏥 ICU" : m === "ot" ? "🔬 OT" : "🚨 Emergency"}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* ── Scenario Selector ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              data-ocid={`icu.scenario.item.${idx + 1}`}
              onClick={() => setSelectedScenarioId(sc.id)}
              className="flex flex-col items-start rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.02] overflow-hidden"
              style={{
                background:
                  selectedScenarioId === sc.id
                    ? "oklch(0.65 0.16 196 / 0.15)"
                    : "oklch(0.18 0.05 235)",
                border:
                  selectedScenarioId === sc.id
                    ? "1px solid oklch(0.65 0.16 196 / 0.6)"
                    : "1px solid oklch(0.65 0.16 196 / 0.15)",
                boxShadow:
                  selectedScenarioId === sc.id
                    ? "0 0 20px oklch(0.65 0.16 196 / 0.2)"
                    : "none",
              }}
            >
              <span
                className="text-sm font-bold truncate w-full"
                style={{
                  color:
                    selectedScenarioId === sc.id
                      ? "oklch(0.65 0.16 196)"
                      : "oklch(0.88 0.015 215)",
                }}
              >
                {sc.name}
              </span>
              <span className="text-xs opacity-50 mt-0.5">
                {sc.age}yr {sc.gender}
              </span>
            </button>
          ))}
        </div>

        {/* ── Patient Info Bar ── */}
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-3 flex flex-wrap gap-4 items-center"
          style={{
            background: "oklch(0.18 0.05 235)",
            border: "1px solid oklch(0.65 0.16 196 / 0.2)",
          }}
        >
          <div>
            <p className="text-xs opacity-50">Patient</p>
            <p className="font-semibold text-sm">
              {scenario.age}yr {scenario.gender}
            </p>
          </div>
          <div>
            <p className="text-xs opacity-50">Complaint</p>
            <p className="font-semibold text-sm">{scenario.complaint}</p>
          </div>
          <div className="flex-1" />
          <Badge
            className="border px-3 py-1"
            style={{
              background: "oklch(0.65 0.16 196 / 0.1)",
              borderColor: "oklch(0.65 0.16 196 / 0.4)",
              color: "oklch(0.65 0.16 196)",
            }}
          >
            {scenario.diagnosis}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge
              className="text-xs px-2 py-0.5 border"
              style={{
                background:
                  phase === "deteriorating"
                    ? "oklch(0.55 0.22 27 / 0.15)"
                    : phase === "stable" || phase === "responding"
                      ? "oklch(0.65 0.18 155 / 0.15)"
                      : "oklch(0.75 0.18 70 / 0.15)",
                borderColor:
                  phase === "deteriorating"
                    ? "oklch(0.55 0.22 27 / 0.4)"
                    : "oklch(0.65 0.18 155 / 0.4)",
                color:
                  phase === "deteriorating"
                    ? "oklch(0.55 0.22 27)"
                    : "oklch(0.65 0.18 155)",
              }}
            >
              Phase: {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </Badge>
            <button
              type="button"
              onClick={resetScenario}
              className="p-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.65 0.16 196)" }}
              title="Reset Scenario"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* ── HIGH-FIDELITY ICU MONITOR ── */}
        <div
          data-ocid="icu.monitor_panel"
          className={`rounded-2xl overflow-hidden ${alarmActive && !alarmSilenced ? "icu-alarm-border" : ""}`}
          style={{
            background: "#000000",
            border:
              alarmActive && !alarmSilenced
                ? "3px solid #ff0000"
                : "2px solid oklch(0.28 0.05 235)",
            boxShadow:
              alarmActive && !alarmSilenced
                ? "0 0 30px #ff0000, 0 0 60px rgba(255,0,0,0.3)"
                : "0 0 40px oklch(0.12 0.04 235 / 0.8)",
            animation:
              alarmActive && !alarmSilenced
                ? "alarmFlash 0.5s infinite"
                : "none",
          }}
        >
          {/* Digital vitals header — neon style */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-2 justify-between"
            style={{
              background: "#000",
              borderBottom: "1px solid rgba(0,255,65,0.1)",
            }}
          >
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(0,255,65,0.5)", fontSize: 9 }}>
                HR
              </span>
              <span
                style={{
                  color:
                    vitals.hr > 100 || vitals.hr < 50 ? "#ff4040" : "#00ff41",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 12px #00ff41",
                  display: "block",
                }}
              >
                {hrVal}
              </span>
              <span style={{ color: "rgba(0,255,65,0.4)", fontSize: 9 }}>
                bpm
              </span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(255,255,0,0.5)", fontSize: 9 }}>
                SpO₂
              </span>
              <span
                style={{
                  color:
                    spo2Val < 90
                      ? "#ff4040"
                      : spo2Val < 94
                        ? "#ffaa00"
                        : "#ffff00",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 12px #ffff00",
                  display: "block",
                }}
              >
                {spo2Val}
              </span>
              <span style={{ color: "rgba(255,255,0,0.4)", fontSize: 9 }}>
                %
              </span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>
                RESP
              </span>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 10px #fff",
                  display: "block",
                }}
              >
                {rrVal}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>
                bpm
              </span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(0,220,255,0.5)", fontSize: 9 }}>
                NIBP
              </span>
              <span
                style={{
                  color: nibpRunning ? "#888888" : "#00dcff",
                  fontSize: 22,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 10px #00dcff",
                  display: "block",
                }}
              >
                {nibpRunning ? "---/---" : `${nibpSystolic}/${nibpDiastolic}`}
              </span>
              <span style={{ color: "rgba(0,220,255,0.4)", fontSize: 9 }}>
                mmHg
              </span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(150,120,255,0.5)", fontSize: 9 }}>
                EtCO₂
              </span>
              <span
                style={{
                  color: "#9966ff",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 10px #9966ff",
                  display: "block",
                }}
              >
                {Math.round(vitals.etco2)}
              </span>
              <span style={{ color: "rgba(150,120,255,0.4)", fontSize: 9 }}>
                mmHg
              </span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "rgba(255,180,0,0.5)", fontSize: 9 }}>
                TEMP
              </span>
              <span
                style={{
                  color: "#ffb400",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 0 10px #ffb400",
                  display: "block",
                }}
              >
                {vitals.temp.toFixed(1)}
              </span>
              <span style={{ color: "rgba(255,180,0,0.4)", fontSize: 9 }}>
                °C
              </span>
            </div>
          </div>

          {/* Canvas waveforms */}
          <div className="relative" style={{ height: 320, background: "#000" }}>
            <IcuMonitorCanvas
              heartRate={vitals.hr}
              spo2={vitals.spo2}
              respirationRate={vitals.rr}
              pathology={pathology}
              frozen={frozen}
              audioEnabled={audioEnabled && !alarmSilenced}
              onAlarmChange={setAlarmActive}
            />
            {/* Frozen overlay */}
            {frozen && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.4)", pointerEvents: "none" }}
              >
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    color: "#00dcff",
                    fontSize: 14,
                    fontWeight: 700,
                    textShadow: "0 0 12px #00dcff",
                    letterSpacing: 4,
                  }}
                >
                  ❄ FREEZE FRAME
                </span>
              </div>
            )}
          </div>

          {/* ── Pathology Toggles ── */}
          <div
            className="flex flex-wrap gap-2 px-4 py-2"
            style={{
              background: "rgba(0,0,0,0.8)",
              borderTop: "1px solid rgba(0,255,65,0.1)",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "monospace",
                alignSelf: "center",
              }}
            >
              RHYTHM:
            </span>
            {(["normal", "stemi", "afib"] as Pathology[]).map((p) => (
              <button
                key={p}
                type="button"
                data-ocid={`icu.pathology.${p}_toggle`}
                onClick={() => setPathology(p)}
                className="rounded-full px-3 py-1 text-xs font-bold transition-all"
                style={{
                  background:
                    pathology === p
                      ? p === "normal"
                        ? "rgba(0,255,65,0.2)"
                        : p === "stemi"
                          ? "rgba(255,0,0,0.2)"
                          : "rgba(255,180,0,0.2)"
                      : "rgba(255,255,255,0.06)",
                  border:
                    pathology === p
                      ? p === "normal"
                        ? "1px solid #00ff41"
                        : p === "stemi"
                          ? "1px solid #ff4040"
                          : "1px solid #ffaa00"
                      : "1px solid rgba(255,255,255,0.15)",
                  color:
                    pathology === p
                      ? p === "normal"
                        ? "#00ff41"
                        : p === "stemi"
                          ? "#ff4040"
                          : "#ffaa00"
                      : "rgba(255,255,255,0.5)",
                  fontFamily: "monospace",
                }}
              >
                {p === "normal"
                  ? "Normal Sinus"
                  : p === "stemi"
                    ? "⚠ STEMI"
                    : "~ AFib"}
              </button>
            ))}
          </div>

          {/* ── Monitor Control Bar ── */}
          <div
            className="flex flex-wrap gap-2 px-4 py-2"
            style={{
              background: "rgba(0,0,0,0.9)",
              borderTop: "1px solid rgba(0,255,65,0.1)",
            }}
          >
            <button
              type="button"
              data-ocid="icu.freeze_button"
              onClick={() => setFrozen((f) => !f)}
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition-all"
              style={{
                background: frozen
                  ? "rgba(0,220,255,0.2)"
                  : "rgba(255,255,255,0.06)",
                border: frozen
                  ? "1px solid #00dcff"
                  : "1px solid rgba(255,255,255,0.15)",
                color: frozen ? "#00dcff" : "rgba(255,255,255,0.6)",
                fontFamily: "monospace",
              }}
            >
              {frozen ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
              {frozen ? "Resume" : "❄ Freeze"}
            </button>

            <button
              type="button"
              data-ocid="icu.start_bp_button"
              onClick={handleStartBP}
              disabled={nibpRunning}
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-50"
              style={{
                background: nibpRunning
                  ? "rgba(0,220,255,0.15)"
                  : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(0,220,255,0.4)",
                color: "#00dcff",
                fontFamily: "monospace",
              }}
            >
              {nibpRunning ? (
                <span style={{ animation: "alert-blink 0.8s infinite" }}>
                  💓 Measuring…
                </span>
              ) : (
                "💓 Start BP"
              )}
            </button>

            <button
              type="button"
              data-ocid="icu.view_12lead_button"
              onClick={() => setShow12Lead(true)}
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition-all"
              style={{
                background: "rgba(255,100,100,0.12)",
                border: "1px solid rgba(255,100,100,0.4)",
                color: "#ff9090",
                fontFamily: "monospace",
              }}
            >
              📊 View 12-Lead
            </button>

            <button
              type="button"
              data-ocid="icu.audio_toggle"
              onClick={() => setAudioEnabled((a) => !a)}
              className="rounded px-3 py-1.5 text-xs font-bold transition-all"
              style={{
                background: audioEnabled
                  ? "rgba(0,255,65,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: audioEnabled
                  ? "1px solid rgba(0,255,65,0.35)"
                  : "1px solid rgba(255,255,255,0.12)",
                color: audioEnabled ? "#00ff41" : "rgba(255,255,255,0.4)",
                fontFamily: "monospace",
              }}
            >
              {audioEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </div>
        </div>

        {/* ── ECG Analysis Panel ── */}
        <ECGAnalysisPanel
          pathology={pathology}
          heartRate={vitals.hr}
          spo2={vitals.spo2}
          nibpSystolic={nibpSystolic}
          nibpDiastolic={nibpDiastolic}
        />

        {/* ── Vitals Grid ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          data-ocid="icu.vitals_panel"
        >
          <VitalCard
            label="Heart Rate"
            value={String(hrVal)}
            unit="bpm"
            status={getVitalStatus(
              "hr",
              vitals.hr,
              scenario.criticalThresholds,
            )}
            trend={vitals.hr > 100 ? "up" : vitals.hr < 60 ? "down" : "stable"}
          />
          <VitalCard
            label="SpO₂"
            value={String(spo2Val)}
            unit="%"
            status={getVitalStatus(
              "spo2",
              vitals.spo2,
              scenario.criticalThresholds,
            )}
            trend={vitals.spo2 < 94 ? "down" : "stable"}
          />
          <VitalCard
            label="Blood Pressure"
            value={`${Math.round(vitals.sbp)}/${Math.round(vitals.dbp)}`}
            unit="mmHg"
            status={getVitalStatus(
              "sbp",
              vitals.sbp,
              scenario.criticalThresholds,
            )}
            sublabel={`MAP: ${Math.round((vitals.sbp + 2 * vitals.dbp) / 3)} mmHg`}
          />
          <VitalCard
            label="Temperature"
            value={String(vitals.temp.toFixed(1))}
            unit="°C"
            status={getVitalStatus(
              "temp",
              vitals.temp,
              scenario.criticalThresholds,
            )}
            trend={vitals.temp > 38 ? "up" : "stable"}
          />
          <VitalCard
            label="Resp. Rate"
            value={String(rrVal)}
            unit="bpm"
            status={getVitalStatus(
              "rr",
              vitals.rr,
              scenario.criticalThresholds,
            )}
            trend={vitals.rr > 25 ? "up" : "stable"}
          />
          <VitalCard
            label="EtCO₂"
            value={String(Math.round(vitals.etco2))}
            unit="mmHg"
            status={getVitalStatus(
              "etco2",
              vitals.etco2,
              scenario.criticalThresholds,
            )}
          />
          <VitalCard
            label="MAP"
            value={String(Math.round((vitals.sbp + 2 * vitals.dbp) / 3))}
            unit="mmHg"
            status={
              (vitals.sbp + 2 * vitals.dbp) / 3 < 65 ? "critical" : "normal"
            }
          />
          <VitalCard
            label="Pulse Pressure"
            value={String(Math.round(vitals.sbp - vitals.dbp))}
            unit="mmHg"
            status={vitals.sbp - vitals.dbp < 20 ? "warning" : "normal"}
          />
        </div>

        {/* ── Phase Progress ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.18 0.05 235)",
            border: "1px solid oklch(0.65 0.16 196 / 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold"
              style={{ color: "oklch(0.88 0.015 215)" }}
            >
              Phase Progression
            </span>
            <span className="text-xs opacity-50">
              {phase} →{" "}
              {phase === "stable"
                ? "—"
                : ["initial", "deteriorating", "responding", "stable"][
                    Math.min(
                      3,
                      [
                        "initial",
                        "deteriorating",
                        "responding",
                        "stable",
                      ].indexOf(phase) + 1,
                    )
                  ]}
            </span>
          </div>
          <div
            className="relative h-2 rounded-full overflow-hidden"
            style={{ background: "oklch(0.22 0.05 235)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              animate={{ width: `${phaseProgress}%` }}
              transition={{ duration: 1.8, ease: "linear" }}
              style={{
                background:
                  phase === "deteriorating"
                    ? "oklch(0.55 0.22 27)"
                    : phase === "stable"
                      ? "oklch(0.65 0.18 155)"
                      : "oklch(0.65 0.16 196)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {["initial", "deteriorating", "responding", "stable"].map(
              (p, i) => (
                <span
                  key={p}
                  className="text-xs font-semibold capitalize"
                  style={{
                    color:
                      phase === p
                        ? "oklch(0.65 0.16 196)"
                        : "oklch(0.88 0.015 215 / 0.35)",
                    fontSize: "0.65rem",
                  }}
                >
                  {i + 1}. {p}
                </span>
              ),
            )}
          </div>
        </div>

        {/* ── Ventilator ── */}
        {scenario.ventilator && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "oklch(0.18 0.05 235)",
              border: "1px solid oklch(0.65 0.16 196 / 0.2)",
            }}
          >
            <h3
              className="text-sm font-bold mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.65 0.16 196)" }}
            >
              <Wind className="h-4 w-4" /> Ventilator Settings
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {(
                [
                  ["TV", `${scenario.ventilator.tv} mL`],
                  ["RR", `${scenario.ventilator.rr} /min`],
                  ["FiO₂", `${scenario.ventilator.fio2}%`],
                  ["PEEP", `${scenario.ventilator.peep} cmH₂O`],
                  ["PIP", `${scenario.ventilator.pip} cmH₂O`],
                ] as [string, string][]
              ).map(([label, val]) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-lg p-2"
                  style={{ background: "oklch(0.15 0.04 235)" }}
                >
                  <span className="text-xs opacity-50">{label}</span>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: "oklch(0.65 0.16 196)" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Drugs ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.18 0.05 235)",
            border: "1px solid oklch(0.65 0.16 196 / 0.2)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3 flex items-center gap-2"
            style={{ color: "oklch(0.65 0.16 196)" }}
          >
            <Syringe className="h-4 w-4" /> Drug Infusion Panel
          </h3>
          <div className="space-y-2">
            {scenario.drugs.map((drug) => (
              <div
                key={drug.name}
                className="flex items-start justify-between rounded-lg px-2 py-1.5 gap-2"
                style={{ background: "oklch(0.15 0.04 235)" }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: "oklch(0.88 0.015 215)" }}
                  >
                    {drug.name}
                  </p>
                  <p className="text-xs opacity-50 truncate">
                    {drug.dose} · {drug.rate}
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
                  style={{
                    background:
                      drug.status === "running"
                        ? "oklch(0.65 0.18 155 / 0.15)"
                        : drug.status === "completed"
                          ? "oklch(0.65 0.16 196 / 0.1)"
                          : "oklch(0.55 0.22 27 / 0.15)",
                    color:
                      drug.status === "running"
                        ? "oklch(0.65 0.18 155)"
                        : drug.status === "completed"
                          ? "oklch(0.65 0.16 196)"
                          : "oklch(0.55 0.22 27)",
                  }}
                >
                  {drug.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Practice / Observer ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.18 0.05 235)",
            border: "1px solid oklch(0.65 0.16 196 / 0.2)",
          }}
        >
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              data-ocid="icu.practice_toggle"
              onClick={() => setPracticeMode(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all"
              style={
                practiceMode
                  ? {
                      background: "oklch(0.65 0.16 196 / 0.2)",
                      border: "1px solid oklch(0.65 0.16 196 / 0.5)",
                      color: "oklch(0.65 0.16 196)",
                    }
                  : {
                      border: "1px solid oklch(0.65 0.16 196 / 0.15)",
                      color: "oklch(0.88 0.015 215 / 0.5)",
                    }
              }
            >
              <Play className="h-3.5 w-3.5" /> Practice
            </button>
            <button
              type="button"
              onClick={() => setPracticeMode(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all"
              style={
                !practiceMode
                  ? {
                      background: "oklch(0.75 0.18 70 / 0.15)",
                      border: "1px solid oklch(0.75 0.18 70 / 0.5)",
                      color: "oklch(0.75 0.18 70)",
                    }
                  : {
                      border: "1px solid oklch(0.75 0.18 70 / 0.15)",
                      color: "oklch(0.88 0.015 215 / 0.5)",
                    }
              }
            >
              <Eye className="h-3.5 w-3.5" /> Observe
            </button>
          </div>

          <AnimatePresence mode="wait">
            {practiceMode ? (
              <motion.div
                key="practice"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="space-y-2"
              >
                <p className="text-xs opacity-50 mb-2">
                  Select an intervention:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRACTICE_ACTIONS.map((action, actionIdx) => (
                    <button
                      key={action}
                      type="button"
                      data-ocid={`icu.action.button.${actionIdx + 1}`}
                      onClick={() => handleAction(action)}
                      className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-left transition-all hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: "oklch(0.22 0.055 235)",
                        border: "1px solid oklch(0.65 0.16 196 / 0.2)",
                        color: "oklch(0.88 0.015 215)",
                      }}
                    >
                      <span style={{ color: "oklch(0.65 0.16 196)" }}>
                        {ACTION_ICONS[action]}
                      </span>
                      {action}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {actionFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2 rounded-lg p-2 text-xs"
                      style={{
                        background: actionFeedback.startsWith("⚠")
                          ? "oklch(0.75 0.18 70 / 0.1)"
                          : "oklch(0.65 0.18 155 / 0.1)",
                        border: `1px solid ${actionFeedback.startsWith("⚠") ? "oklch(0.75 0.18 70 / 0.35)" : "oklch(0.65 0.18 155 / 0.35)"}`,
                        color: actionFeedback.startsWith("⚠")
                          ? "oklch(0.75 0.18 70)"
                          : "oklch(0.65 0.18 155)",
                      }}
                    >
                      {actionFeedback}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="observer"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="space-y-1"
              >
                <p className="text-xs opacity-50 mb-2">
                  Ideal management steps:
                </p>
                <ScrollArea className="h-[210px] pr-2">
                  <div className="space-y-2">
                    {scenario.idealSteps.map((step, i) => (
                      <button
                        key={step.slice(0, 40)}
                        type="button"
                        onClick={() => setObserverStepIndex(i)}
                        className="flex items-start gap-2 w-full text-left rounded-lg p-2 transition-all"
                        style={{
                          background:
                            i === observerStepIndex
                              ? "oklch(0.65 0.16 196 / 0.12)"
                              : i < observerStepIndex
                                ? "oklch(0.65 0.18 155 / 0.08)"
                                : "transparent",
                          border:
                            i === observerStepIndex
                              ? "1px solid oklch(0.65 0.16 196 / 0.35)"
                              : "1px solid transparent",
                        }}
                      >
                        <span
                          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                          style={{
                            background:
                              i < observerStepIndex
                                ? "oklch(0.65 0.18 155)"
                                : i === observerStepIndex
                                  ? "oklch(0.65 0.16 196)"
                                  : "oklch(0.22 0.055 235)",
                            color:
                              i <= observerStepIndex
                                ? "white"
                                : "oklch(0.88 0.015 215 / 0.5)",
                          }}
                        >
                          {i < observerStepIndex ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              i <= observerStepIndex
                                ? "oklch(0.88 0.015 215)"
                                : "oklch(0.88 0.015 215 / 0.5)",
                          }}
                        >
                          {step}
                        </p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Restart button when stable ── */}
        {phase === "stable" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Button
              data-ocid="icu.restart_button"
              onClick={resetScenario}
              className="gap-2 px-8 py-2 font-bold"
              style={{ background: "oklch(0.65 0.16 196)", color: "white" }}
            >
              <RefreshCw className="h-4 w-4" /> Restart Scenario
            </Button>
          </motion.div>
        )}
      </div>

      {/* ── 12-Lead ECG Modal ── */}
      <TwelveLeadECGModal
        open={show12Lead}
        onClose={() => setShow12Lead(false)}
        pathology={pathology}
        heartRate={vitals.hr}
      />
    </div>
  );
}
