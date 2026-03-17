import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  AlertCircle,
  ArrowLeft,
  Brain,
  CheckCircle,
  Plus,
  Send,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { AIResult, Diagnosis } from "../backend.d";
import { DiagnosticTray } from "../components/DiagnosticTray";
import { EffectsTimeline } from "../components/EffectsTimeline";
import { PatientDistressAvatar } from "../components/PatientDistressAvatar";
import { VirtualPatient } from "../components/VirtualPatient";
import { VirtualStethoscope } from "../components/VirtualStethoscope";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllDiseases,
  useCreateAdminAlert,
  useCreateCustomPatientSession,
  useGetAIDiagnosis,
} from "../hooks/useQueries";

const COMMON_SYMPTOMS = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Body ache",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Chest pain",
  "Shortness of breath",
  "Abdominal pain",
  "Loss of appetite",
  "Chills",
  "Night sweats",
  "Skin rash",
  "Joint pain",
  "Jaundice",
  "Confusion",
  "Dizziness",
  "Swelling",
];

const DISABILITIES = [
  "None",
  "Wheelchair",
  "Visual Impairment",
  "Hearing Impairment",
  "Physical Disability",
  "Cognitive Disability",
];

export function CustomPatientPage() {
  const { identity } = useInternetIdentity();
  const { data: diseases = [] } = useAllDiseases();
  const aiDiagnosis = useGetAIDiagnosis();
  const createSession = useCreateCustomPatientSession();
  const createAlert = useCreateAdminAlert();

  const [ageYears, setAgeYears] = useState(30);
  const [ageMonths, setAgeMonths] = useState(0);
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [disability, setDisability] = useState("None");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [vitals, setVitals] = useState({
    bp: "120/80",
    hr: "82",
    temp: "37",
    spo2: "98",
    rr: "16",
  });
  const [history, setHistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const [currentMeds, setCurrentMeds] = useState("");

  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(
    null,
  );
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [aiAlertSent, setAiAlertSent] = useState(false);
  const [showStethoscope, setShowStethoscope] = useState(false);

  const totalAgeMonths = ageYears * 12 + ageMonths;

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom.trim())) {
      setSymptoms((prev) => [...prev, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const handleAIDiagnosis = async () => {
    if (symptoms.length === 0) {
      toast.error("Please add at least one symptom");
      return;
    }

    const patientData = {
      id: crypto.randomUUID(),
      age: BigInt(totalAgeMonths),
      gender,
      symptoms,
      vitals: {
        bp: vitals.bp,
        hr: BigInt(Number.parseInt(vitals.hr) || 82),
        temp: BigInt(Math.round(Number.parseFloat(vitals.temp) * 10) || 370),
        spo2: BigInt(Number.parseInt(vitals.spo2) || 98),
        rr: BigInt(Number.parseInt(vitals.rr) || 16),
      },
      history:
        history +
        (currentMeds.trim() ? `\nCurrent Medications: ${currentMeds}` : ""),
      allergies: allergies
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      medicinesChosen: [],
      diagnosisAttempt: "",
      hasDisability: disability !== "None",
      outcome: {
        isCorrect: false,
        effectsTimeline: [],
        details: "",
        responseTime: BigInt(0),
      },
    };

    try {
      const result = await aiDiagnosis.mutateAsync(patientData);
      setAiResult(result);
      toast.success("AI diagnosis ready!");
    } catch {
      // AI failed — alert admin
      toast.error(
        "AI diagnosis nahi kar paya. Admin ko alert bheja ja raha hai...",
      );
      if (!aiAlertSent) {
        try {
          await createAlert.mutateAsync({
            id: crypto.randomUUID(),
            title: "AI Diagnosis Failed",
            message: `Student ne custom patient case submit kiya lekin AI solve nahi kar paya. Symptoms: ${symptoms.join(", ")}. Age: ${ageYears}y, Gender: ${gender}`,
            severity: BigInt(2),
            status: "unresolved",
            createdAt: BigInt(Date.now()) * BigInt(1_000_000),
          });
          setAiAlertSent(true);
          toast.info("Admin ko alert bhej diya gaya hai ✓");
        } catch {
          // silent
        }
      }
    }
  };

  const handleProceedWithDiagnosis = (diag: Diagnosis) => {
    setSelectedDiagnosis(diag);
  };

  const diseaseForDiagnosis = selectedDiagnosis
    ? diseases.find((d) => d.id === selectedDiagnosis.diseaseId)
    : null;

  const handleSubmitTreatment = async () => {
    if (!selectedDiagnosis) return;

    const sessionId = crypto.randomUUID();
    const studentId = identity?.getPrincipal().toString() || "anonymous";
    const isCorrect =
      selectedDiagnosis?.diseaseId === aiResult?.diagnosis[0]?.diseaseId;

    try {
      await createSession.mutateAsync({
        id: sessionId,
        studentId,
        patientData: {
          id: crypto.randomUUID(),
          age: BigInt(totalAgeMonths),
          gender,
          symptoms,
          vitals: {
            bp: vitals.bp,
            hr: BigInt(Number.parseInt(vitals.hr) || 82),
            temp: BigInt(
              Math.round(Number.parseFloat(vitals.temp) * 10) || 370,
            ),
            spo2: BigInt(Number.parseInt(vitals.spo2) || 98),
            rr: BigInt(Number.parseInt(vitals.rr) || 16),
          },
          history:
            history +
            (currentMeds.trim() ? `\nCurrent Medications: ${currentMeds}` : ""),
          allergies: allergies
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          medicinesChosen: selectedMedicines,
          diagnosisAttempt: selectedDiagnosis.name,
          hasDisability: disability !== "None",
          outcome: {
            isCorrect,
            effectsTimeline: [],
            details: "AI-assisted diagnosis and treatment",
            responseTime: BigInt(Date.now()) * BigInt(1_000_000),
          },
        },
        diagnosisAttempt: selectedDiagnosis.name,
        medicinesChosen: selectedMedicines,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        outcome: {
          isCorrect,
          effectsTimeline: [],
          details: "AI-assisted custom patient session",
          responseTime: BigInt(Date.now()) * BigInt(1_000_000),
        },
      });
      setShowTimeline(true);
      toast.success("Treatment session save ho gayi!");
    } catch {
      toast.error("Session save nahi hua.");
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-black text-foreground">
            Custom Patient Banao
          </h1>
          <p className="text-muted-foreground">
            Create your patient and get AI diagnosis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            {/* Patient basics */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <h2 className="font-display mb-4 text-base font-bold text-foreground">
                Patient Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Age (Years)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={ageYears}
                    onChange={(e) =>
                      setAgeYears(
                        Math.min(100, Number.parseInt(e.target.value) || 0),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Age (Months)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={11}
                    value={ageMonths}
                    onChange={(e) =>
                      setAgeMonths(
                        Math.min(11, Number.parseInt(e.target.value) || 0),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={gender}
                    onValueChange={(v) =>
                      setGender(v as "male" | "female" | "other")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-3">
                  <Label>Disability</Label>
                  <Select value={disability} onValueChange={setDisability}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DISABILITIES.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <h2 className="font-display mb-4 text-base font-bold text-foreground">
                Symptoms
              </h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {COMMON_SYMPTOMS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                      symptoms.includes(s)
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom symptom..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomSymptom()}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addCustomSymptom}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {symptoms.filter((s) => !COMMON_SYMPTOMS.includes(s)).length >
                0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {symptoms
                    .filter((s) => !COMMON_SYMPTOMS.includes(s))
                    .map((s) => (
                      <Badge key={s} variant="secondary" className="gap-1">
                        {s}
                        <button type="button" onClick={() => toggleSymptom(s)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                </div>
              )}
            </div>

            {/* Vitals */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <h2 className="font-display mb-4 text-base font-bold text-foreground">
                Vitals
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  { key: "bp", label: "BP (mmHg)", placeholder: "120/80" },
                  { key: "hr", label: "HR (/min)", placeholder: "82" },
                  { key: "temp", label: "Temp (°C)", placeholder: "37.2" },
                  { key: "spo2", label: "SpO2 (%)", placeholder: "98" },
                  { key: "rr", label: "RR (/min)", placeholder: "16" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs">{label}</Label>
                    <Input
                      placeholder={placeholder}
                      value={vitals[key as keyof typeof vitals]}
                      onChange={(e) =>
                        setVitals((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <h2 className="font-display mb-4 text-base font-bold text-foreground">
                History & Allergies
              </h2>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Patient History</Label>
                  <Textarea
                    placeholder="5 din se bukhaar hai, kandhe mein dard, weak feel kar raha hai..."
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Allergies (comma separated)</Label>
                    <Input
                      placeholder="Penicillin, Aspirin..."
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Medications</Label>
                    <Input
                      placeholder="Metformin, Amlodipine..."
                      value={currentMeds}
                      onChange={(e) => setCurrentMeds(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Button */}
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleAIDiagnosis}
              disabled={aiDiagnosis.isPending || symptoms.length === 0}
            >
              {aiDiagnosis.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  AI Diagnosis Dekh Raha Hai...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  AI Diagnosis Lein
                </>
              )}
            </Button>

            {/* AI Alert sent */}
            {aiAlertSent && (
              <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/5 p-3 text-sm text-warning">
                <AlertCircle className="h-4 w-4" />
                Admin ko alert bhej diya gaya hai. Jaldi review hoga.
              </div>
            )}

            {/* AI Results */}
            <AnimatePresence>
              {aiResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-primary/30 bg-primary/5 p-5"
                >
                  {/* Patient distress avatar + diagnostic tools */}
                  <div
                    className="mb-4 flex items-start gap-4 p-3 rounded-xl border"
                    style={{
                      background: "oklch(0.1 0.03 235 / 0.5)",
                      borderColor: "oklch(0.3 0.08 235)",
                    }}
                  >
                    <PatientDistressAvatar
                      spo2={Number(vitals.spo2)}
                      hasAnemia={symptoms.some(
                        (s) =>
                          s.toLowerCase().includes("anemia") ||
                          s.toLowerCase().includes("pallor"),
                      )}
                      hasJaundice={symptoms.some(
                        (s) =>
                          s.toLowerCase().includes("jaundice") ||
                          s.toLowerCase().includes("yellow"),
                      )}
                      hasRespiratoryDistress={symptoms.some(
                        (s) =>
                          s.toLowerCase().includes("shortness") ||
                          s.toLowerCase().includes("breath"),
                      )}
                      label={`${ageYears}y ${gender}`}
                    />
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-semibold text-foreground">
                        Patient Condition Indicators
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <DiagnosticTray
                          data={{
                            scenarioType: symptoms.some((s) =>
                              s.toLowerCase().includes("chest"),
                            )
                              ? "cardiac"
                              : symptoms.some(
                                    (s) =>
                                      s.toLowerCase().includes("breath") ||
                                      s.toLowerCase().includes("cough"),
                                  )
                                ? "respiratory"
                                : symptoms.some((s) =>
                                      s.toLowerCase().includes("jaundice"),
                                    )
                                  ? "hepatic"
                                  : "normal",
                            spo2: Number(vitals.spo2),
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowStethoscope((v) => !v)}
                          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                          style={{
                            borderColor: showStethoscope
                              ? "oklch(0.5 0.18 196 / 0.5)"
                              : "oklch(0.3 0.06 235)",
                            background: showStethoscope
                              ? "oklch(0.2 0.08 196 / 0.3)"
                              : "transparent",
                            color: showStethoscope
                              ? "oklch(0.7 0.15 196)"
                              : "oklch(0.5 0.05 235)",
                          }}
                        >
                          🩺 Stethoscope
                        </button>
                      </div>
                    </div>
                  </div>

                  {showStethoscope && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <VirtualStethoscope
                        conditionOverrides={{
                          hasCardiac: symptoms.some((s) =>
                            s.toLowerCase().includes("chest"),
                          ),
                          hasRespiratory: symptoms.some(
                            (s) =>
                              s.toLowerCase().includes("breath") ||
                              s.toLowerCase().includes("cough"),
                          ),
                          hasWheeze: symptoms.some(
                            (s) =>
                              s.toLowerCase().includes("wheeze") ||
                              s.toLowerCase().includes("asthma"),
                          ),
                        }}
                      />
                    </motion.div>
                  )}

                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-foreground">
                      AI Diagnosis Results
                    </h3>
                    <Badge variant="secondary">
                      Confidence: {Number(aiResult.probability)}%
                    </Badge>
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">
                    {aiResult.reasoning}
                  </p>

                  <div className="space-y-2">
                    {aiResult.diagnosis.map((diag, i) => (
                      <button
                        type="button"
                        key={diag.diseaseId}
                        onClick={() => handleProceedWithDiagnosis(diag)}
                        className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                          selectedDiagnosis?.diseaseId === diag.diseaseId
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {diag.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {diag.category} • {diag.icd10Code}
                          </p>
                        </div>
                        {selectedDiagnosis?.diseaseId === diag.diseaseId && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Treatment for selected diagnosis */}
                  {selectedDiagnosis && diseaseForDiagnosis && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 rounded-xl border border-border bg-card p-4"
                    >
                      <h4 className="font-display mb-3 font-bold text-foreground">
                        Medicine Select Karo
                      </h4>
                      <ScrollArea className="max-h-48">
                        <div className="space-y-2 pr-2">
                          {diseaseForDiagnosis.medicines.map((med) => (
                            <div
                              key={med.id}
                              className={`flex items-center gap-3 rounded-lg border p-3 ${
                                selectedMedicines.includes(med.id)
                                  ? "border-primary bg-primary/5"
                                  : "border-border"
                              }`}
                            >
                              <Checkbox
                                id={`custom-${med.id}`}
                                checked={selectedMedicines.includes(med.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedMedicines((p) => [...p, med.id]);
                                  } else {
                                    setSelectedMedicines((p) =>
                                      p.filter((id) => id !== med.id),
                                    );
                                  }
                                }}
                              />
                              <Label
                                htmlFor={`custom-${med.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <span className="font-medium">{med.name}</span>
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {med.dosage}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <Button
                        className="mt-3 w-full gap-2"
                        onClick={handleSubmitTreatment}
                        disabled={
                          selectedMedicines.length === 0 ||
                          createSession.isPending
                        }
                      >
                        <Send className="h-4 w-4" />
                        Treatment Submit Karo
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timeline after treatment */}
            {showTimeline &&
              selectedDiagnosis &&
              diseaseForDiagnosis &&
              selectedMedicines.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {selectedMedicines.slice(0, 1).map((medId) => {
                    const med = diseaseForDiagnosis.medicines.find(
                      (m) => m.id === medId,
                    );
                    if (!med) return null;
                    return (
                      <EffectsTimeline
                        key={medId}
                        medicineName={med.name}
                        goodEffects={med.goodEffects}
                        sideEffects={med.sideEffects}
                        autoPlay
                      />
                    );
                  })}
                </motion.div>
              )}
          </div>

          {/* Virtual patient */}
          <div className="sticky top-4 space-y-4 self-start">
            <VirtualPatient
              ageMonths={totalAgeMonths}
              gender={gender}
              disability={disability !== "None" ? disability : undefined}
              symptoms={symptoms}
              outcome={showTimeline ? "improving" : "neutral"}
              animating
            />
            <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">
                Patient Summary
              </p>
              <p>
                Age: {ageYears}y {ageMonths}m • {gender}
              </p>
              <p>Symptoms: {symptoms.length}</p>
              <p>
                BP: {vitals.bp} | SpO2: {vitals.spo2}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomPatientPage;
