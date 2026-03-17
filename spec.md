# MedSim — ICU Simulator & ECG Panel Re-Engineering

## Current State
IcuSimulatorPage.tsx exists with a canvas-based ECG waveform, basic vitals display, ventilator panel, drug panel, practice/observer modes, and scenario selection. The ECG is functional but not clinically realistic — background is not pitch black, waveforms lack fading tails, there is no 12-lead view, no NIBP logic with sound, no freeze-frame, and no ECG interpretation panel.

## Requested Changes (Diff)

### Add
- Pitch black (#000000) background for the entire ICU monitor display
- Neon Green ECG (Lead II), Neon Yellow SpO2 pleth wave, White respiration — all drawn procedurally with Canvas API, sweeping left-to-right with fading phosphor tail effect
- Dynamic R-R interval physics: intervals shorten/lengthen in real-time as HR slider changes
- Audio beep at every R-wave peak (Web Audio API sharp electronic tone)
- SpO2 < 90% red flashing alarm with critical alarm tone
- "View 12-Lead" button opening a modal with 3×4 grid of all 12 leads (I, II, III, aVR, aVL, aVF, V1–V6)
- Correct anatomical lead morphology per lead (inverted P/QRS in aVR, R-wave progression V1–V6, etc.)
- Pink-tinted 1mm/5mm medical ECG grid background in 12-lead view
- Pathology toggles: Normal Sinus, STEMI (ST elevation), AFib (irregularly irregular R-R)
- Freeze Frame button to pause all waveforms for detailed analysis
- "Start BP" button with cuff inflation sound (Web Audio), 5-second delay before updating BP digital display
- ECG Interpretation/Analysis panel showing AI-driven explanation based on current pathology (ACLS/NEET PG guidelines)

### Modify
- Replace existing ECG canvas rendering with new high-fidelity multi-channel canvas renderer
- Update vitals display panel to match ICU monitor aesthetic (dark background, neon digit colors)
- Integrate pathology state (Normal/STEMI/AFib) into existing scenario/phase system

### Remove
- Old basic ECG drawing logic (replaced by new procedural multi-channel renderer)

## Implementation Plan
1. Create `IcuMonitorCanvas.tsx` component — multi-channel canvas renderer with phosphor tail effect, dynamic physics for R-R interval, beep audio, alarm logic
2. Create `TwelveLeadECGModal.tsx` — full 12-lead view with pink grid, anatomically correct morphology per lead, pathology-aware rendering
3. Create `ECGAnalysisPanel.tsx` — static AI-driven interpretation text based on current pathology state (Normal/STEMI/AFib)
4. Update `IcuSimulatorPage.tsx` to:
   - Use new IcuMonitorCanvas for main display
   - Add pathology toggle buttons (Normal Sinus / STEMI / AFib)
   - Add Freeze Frame button
   - Add NIBP "Start BP" button with cuff sound + 5s delay
   - Add "View 12-Lead" button
   - Add ECGAnalysisPanel
   - Apply pitch black monitor background
