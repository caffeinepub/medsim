interface ECGAnalysisPanelProps {
  pathology: "normal" | "stemi" | "afib";
  heartRate: number;
  spo2: number;
  nibpSystolic: number;
  nibpDiastolic: number;
}

function hrLabel(hr: number): string {
  if (hr < 60) return "Bradycardia";
  if (hr > 100) return "Tachycardia";
  return "Normal Rate";
}

function afibResponse(hr: number): string {
  return hr > 110
    ? "Rapid ventricular response"
    : "Controlled ventricular response";
}

const SEVERITY_BADGE = {
  normal: {
    text: "Normal",
    bg: "rgba(0,255,65,0.12)",
    color: "#00ff41",
    border: "rgba(0,255,65,0.3)",
  },
  stemi: {
    text: "CRITICAL",
    bg: "rgba(255,0,0,0.15)",
    color: "#ff4040",
    border: "rgba(255,0,0,0.4)",
  },
  afib: {
    text: "ALERT",
    bg: "rgba(255,180,0,0.15)",
    color: "#ffaa00",
    border: "rgba(255,180,0,0.4)",
  },
};

export function ECGAnalysisPanel({
  pathology,
  heartRate,
  spo2,
  nibpSystolic,
  nibpDiastolic,
}: ECGAnalysisPanelProps) {
  const badge = SEVERITY_BADGE[pathology];
  const hr = Math.round(heartRate);

  const lines: Array<{ label: string; value: string; alert?: boolean }> = [];

  if (pathology === "normal") {
    lines.push(
      { label: "Rhythm", value: "Normal Sinus Rhythm" },
      { label: "Rate", value: `${hr} bpm \u2014 ${hrLabel(hr)}` },
      { label: "P waves", value: "Present, upright in II, inverted in aVR" },
      { label: "PR interval", value: "120\u2013200 ms (Normal)" },
      { label: "QRS duration", value: "<120 ms (Narrow)" },
      { label: "ST segment", value: "Isoelectric \u2014 No acute changes" },
      { label: "QT interval", value: "Normal for rate" },
      { label: "Axis", value: "Normal (0\u00b0 to +90\u00b0)" },
    );
  } else if (pathology === "stemi") {
    lines.push(
      { label: "Rhythm", value: "Sinus Tachycardia with ST Changes" },
      { label: "Rate", value: `${hr} bpm`, alert: true },
      { label: "P waves", value: "Present" },
      { label: "PR interval", value: "Normal" },
      { label: "QRS", value: "Normal duration" },
      {
        label: "ST segment",
        value: "\u26a0 ELEVATED \u22652 mm in V1\u2013V4 (Anterior territory)",
        alert: true,
      },
      {
        label: "Reciprocal",
        value: "ST depression in II, III, aVF",
        alert: true,
      },
    );
  } else {
    lines.push(
      {
        label: "Rhythm",
        value: `Atrial Fibrillation \u2014 ${afibResponse(hr)}`,
      },
      { label: "Rate", value: `${hr} bpm` },
      {
        label: "P waves",
        value: "Absent \u2014 fibrillatory baseline (f-waves)",
        alert: true,
      },
      {
        label: "PR interval",
        value: "Unmeasurable \u2014 irregular R-R",
        alert: true,
      },
      { label: "QRS", value: "Usually narrow (<120 ms)" },
      { label: "ST segment", value: "No acute ST changes" },
    );
  }

  const impression =
    pathology === "normal"
      ? "No acute cardiopulmonary emergency. Continue monitoring."
      : pathology === "stemi"
        ? "ACUTE ANTERIOR STEMI \u2014 Time-sensitive emergency. Activate Cath Lab immediately."
        : "Atrial Fibrillation \u2014 Assess haemodynamic stability. Rate/rhythm control required.";

  const acls: string[] =
    pathology === "normal"
      ? [
          "No immediate intervention required.",
          "Continue cardiac monitoring.",
          `SpO\u2082: ${spo2}% \u2014 ${spo2 < 94 ? "Supplement O\u2082 required" : "Adequate"}`,
          `NIBP: ${nibpSystolic}/${nibpDiastolic} mmHg \u2014 ${nibpSystolic < 90 ? "Hypotension \u2014 fluid challenge" : "Acceptable"}`,
        ]
      : pathology === "stemi"
        ? [
            "\u2022 Activate Cath Lab \u2014 Door-to-Balloon <90 min",
            "\u2022 Aspirin 325 mg + Ticagrelor 180 mg immediately",
            "\u2022 IV access \u00d7 2, O\u2082 if SpO\u2082 <94%",
            "\u2022 Morphine 2\u20134 mg IV for pain (BP stable)",
            "\u2022 Continuous monitoring, defibrillator standby",
            "NEET PG: Wellens pattern, de Winter T-waves \u2014 rule out LBBB (Sgarbossa criteria)",
          ]
        : [
            hr > 110
              ? "\u2022 UNSTABLE: Synchronised cardioversion 120\u2013200 J (biphasic)"
              : "\u2022 Stable: Rate control \u2014 Metoprolol 5 mg IV or Diltiazem 0.25 mg/kg IV",
            "\u2022 Anticoagulation: CHA\u2082DS\u2082-VASc score assessment",
            "\u2022 Thyroid function, electrolytes \u2014 exclude reversible causes",
            "NEET PG: Irregularly irregular rhythm, absent P waves \u2014 hallmark of AFib",
          ];

  return (
    <div
      data-ocid="icu.analysis_panel"
      style={{
        background: "rgba(0,0,0,0.7)",
        border: `1px solid ${badge.border}`,
        borderRadius: "12px",
        padding: "14px 16px",
        fontFamily: '"Courier New", monospace',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3
            style={{
              color: "#e0e8ff",
              fontSize: "13px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Clinical ECG Interpretation
          </h3>
          <p
            style={{
              color: "rgba(180,200,255,0.5)",
              fontSize: "10px",
              marginTop: 2,
            }}
          >
            Based on ACLS / NEET PG Guidelines
          </p>
        </div>
        <span
          style={{
            background: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
            borderRadius: "6px",
            padding: "2px 10px",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          {badge.text}
        </span>
      </div>

      {/* Measurement grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "2px 12px",
          marginBottom: 12,
        }}
      >
        {lines.map((l) => (
          <>
            <span
              key={`l-${l.label}`}
              style={{
                color: "rgba(150,180,255,0.55)",
                fontSize: "11px",
                whiteSpace: "nowrap",
              }}
            >
              {l.label}:
            </span>
            <span
              key={`v-${l.label}`}
              style={{
                color: l.alert ? badge.color : "rgba(220,235,255,0.85)",
                fontSize: "11px",
              }}
            >
              {l.value}
            </span>
          </>
        ))}
      </div>

      {/* Clinical impression */}
      <div
        style={{
          background:
            pathology === "stemi"
              ? "rgba(255,0,0,0.08)"
              : pathology === "afib"
                ? "rgba(255,180,0,0.08)"
                : "rgba(0,255,65,0.06)",
          borderRadius: 6,
          padding: "8px 10px",
          marginBottom: 10,
          borderLeft: `3px solid ${badge.color}`,
        }}
      >
        <p
          style={{
            color: badge.color,
            fontSize: "11px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Clinical Impression:
        </p>
        <p
          style={{
            color: "rgba(220,235,255,0.8)",
            fontSize: "11px",
            margin: "2px 0 0",
          }}
        >
          {impression}
        </p>
      </div>

      {/* ACLS protocol */}
      <div>
        <p
          style={{
            color: "rgba(150,180,255,0.55)",
            fontSize: "10px",
            marginBottom: 4,
          }}
        >
          ACLS PROTOCOL:
        </p>
        {acls.map((line) => (
          <p
            key={line.slice(0, 30)}
            style={{
              color: line.startsWith("NEET PG")
                ? "rgba(255,220,100,0.8)"
                : "rgba(200,220,255,0.75)",
              fontSize: "11px",
              margin: "2px 0",
              fontStyle: line.startsWith("NEET PG") ? "italic" : "normal",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
