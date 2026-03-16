# MedSim Professional Overhaul v50

## Current State
- Full-stack medical simulation platform with 18 pages
- App has Hinglish labels in navigation and home page (e.g., "Kya Karna Hai Aaj?", "Practice Karo", "Ghar", "Naukri Dekho")
- HomePage lacks a Hero section with a prominent CTA
- Service worker only caches index/manifest, no offline indicator
- No sound effects or visual cues for correct/incorrect decisions
- Mobile layout has potential header overlap issues
- Sidebar does not have explicit min-touch-target sizing
- No pulse-line loading animation component

## Requested Changes (Diff)

### Add
- Hero Section on HomePage with large "Start Clinical Practice" button and animated ECG pulse line
- Offline Mode indicator badge (shown when navigator.onLine is false)
- Background sync logic: queue offline scores in localStorage and flush to leaderboard on reconnect
- Web Audio API sound effects: positive beep for correct decisions, negative tone for incorrect
- Visual cues: green checkmark overlay and red X overlay on MCQ/case correct/incorrect answers
- Pulse-line (ECG) CSS loading animation component

### Modify
- AppLayout: replace all Hinglish sub-labels with Professional Medical English. Increase nav item padding for finger-friendly touch targets (min 44px). Add offline indicator in header.
- HomePage: Replace all Hinglish section headings and quick action labels with Professional Medical English. Add Hero section at top. Update terminology: "Kya Karna Hai Aaj?" → "Quick Access", "Practice Karo" → "Clinical Cases", "Apna Patient" → "Custom Patient Simulator", "Results Dekho" → "Clinical Proficiency", "Sab Dekho" → "View All", "Inhe Improve Karo" → "Areas Requiring Attention", "Subject-wise Performance" → "Clinical Performance by Specialty"
- Service Worker (sw.js): Add cache-first strategy for static assets, cache JS/CSS bundles, add offline fallback page
- LoginPage: Keep existing demo OTP with WhatsApp-style UI (already good), no change needed

### Remove
- All Hinglish text from navigation labels (hinglish sub-labels) and page content
- Casual terminology throughout the app

## Implementation Plan
1. Update AppLayout.tsx: replace hinglish labels with English medical terms, increase touch targets to 48px, add offline indicator in mobile header
2. Update HomePage.tsx: add Hero section, replace all Hinglish with Professional Medical English
3. Update sw.js: enhance caching strategy for offline use
4. Create useSoundFeedback.ts hook: Web Audio API beep sounds for correct/incorrect
5. Create OfflineIndicator.tsx component
6. Apply sound/visual cues in ExercisePage and NEETPGQuizPage answer feedback
