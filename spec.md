# MedSim — Major Feature Upgrade Batch

## Current State
- Custom Patient page exists with AI diagnosis button, but AI returns empty or Hinglish results that aren't actionable; treatment section shows only after selecting diagnosis; no treatment protocol/recommendation is shown with the diagnosis; UI still has Hinglish text
- Virtual Patient is an SVG-based animated stick figure; user wants it replaced with a realistic-looking human illustration (like a real person, not a cartoon)
- Exercise Mode has a timer bug (timer doesn't reset when switching cases), AI help sheet works but diagnosis/medicine submission flow has minor state issues, VirtualPatient inside it uses SVG figure
- NEET PG Practice has ~100 questions across subjects; needs significant expansion with actual past PG exam questions and improved self-assessment (per-question analytics, subject-wise accuracy, time tracking)
- ICU Simulator is functional but lacks organization: no clear case list panel, ventilator/drug panels are basic, scenario selection is not well organized
- Backend getAIDiagnosis works by symptom matching against disease DB; returns top 3 diagnoses; reasoning is in Hindi/mixed language

## Requested Changes (Diff)

### Add
- **Custom Patient AI Diagnosis fix**: Make AI diagnosis fully functional — show detailed diagnosis with confidence, reasoning in English, and immediately show treatment protocol (medicines with dosage + ICMR/standard reference) for the top diagnosis automatically; sync diagnosis results with disease database for medicine selection
- **Treatment section in Custom Patient**: After AI diagnosis, show comprehensive treatment plan: First-line treatment, medicines with Indian brand names + dosage + route + duration, ICMR/Harrison's reference, monitoring parameters, red flags to watch
- **Realistic Virtual Patient 3D model**: Replace SVG cartoon with a photorealistic-style human figure using detailed SVG/Canvas rendering — realistic face, body proportions, skin tone variation by age/gender, clinical signs rendered as overlays (cyanosis = blue lips/fingertips, jaundice = yellow sclera/skin tint, pallor = pale face). Should look like an actual human, not a cartoon
- **NEET PG Questions expansion**: Add 30-50 high-quality past PG questions per subject for all 19 subjects (total ~400-500 more questions). Each question must have year tag (NEET PG 2015-2024), detailed explanation, and standard book reference
- **Improved NEET PG self-assessment**: After quiz, show detailed analytics — time per question, accuracy by difficulty, subject-wise performance chart, improvement suggestions, weak chapter identification
- **ICU Simulator organized case list**: Dedicated case-list panel showing ICU cases by type (Cardiac, Respiratory, Neurological, Renal, Sepsis, Metabolic, Surgical, Toxicology, Multi-organ) — each with difficulty and key teaching points
- **ICU Simulator organized panels**: Separate collapsible panels for Ventilator Settings, Drug Infusion Panel, Fluid Balance, Nursing Actions, Investigations; all clearly labeled and organized

### Modify
- **Custom Patient**: Fix AI button text to English ("Get AI Diagnosis"); fix reasoning text to be in Professional Medical English; fix layout to show diagnosis + treatment in a clean stepped flow (Step 1: Diagnosis → Step 2: Treatment Plan → Step 3: Medicine Administration)
- **Exercise Mode**: Fix timer reset bug (timer must restart cleanly when a new case is loaded); fix state reset when navigating between cases; ensure VirtualPatient shows updated vitals from the case
- **All pages**: Remove any remaining Hinglish text; fix any broken/missing imports
- **VirtualPatient component**: Replace SVG stick figure with realistic human rendering (detailed face, proper body, clinical overlays)

### Remove
- Hinglish text in CustomPatientPage ("AI Diagnosis Dekh Raha Hai", "Medicine Select Karo", "Treatment Submit Karo", "5 din se bukhaar hai" placeholder, etc.)
- Hinglish in ExercisePage and other remaining pages

## Implementation Plan
1. **VirtualPatient.tsx** — Replace SVG with detailed realistic human illustration using SVG with proper facial features, realistic proportions, skin shading; add clinical overlays for cyanosis (blue lips/fingernails), jaundice (yellow tint), pallor (pale skin), respiratory distress (labored breathing animation). Gender and age variants. Hospital gown for patient context.
2. **CustomPatientPage.tsx** — Fix AI diagnosis: convert reasoning to English, auto-show treatment after diagnosis, add comprehensive treatment panel with ICMR-referenced first-line treatment, medicines, monitoring. Fix all Hinglish text.
3. **ExercisePage.tsx** — Fix timer reset bug (add case ID to useEffect deps), fix state reset between cases, fix any remaining Hinglish text
4. **neet-pg-questions.ts** — Add 400+ past NEET PG questions (30-50 per subject across all 19 subjects) with year tags, detailed explanations, standard book references
5. **NEETPGQuizPage.tsx** — Improve self-assessment: detailed post-quiz analytics with accuracy charts, time analysis, weak chapter identification, improvement suggestions
6. **IcuSimulatorPage.tsx** — Reorganize into collapsible panels (Case List, Vitals Monitor, Ventilator, Drug Panel, Fluid Balance, Investigations), add comprehensive ICU case list organized by specialty
