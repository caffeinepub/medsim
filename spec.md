# MedSim

## Current State
MedSim v64 is live. Most critical and high-priority bugs have been fixed in previous batches. The app has backend-persisted leaderboard scores, profile sync (name/role/mobile), lazy permissions, professional Medical English, and ICMR AI protocols. Remaining weaknesses identified below.

## Requested Changes (Diff)

### Add
- **Onboarding flow**: New users (first login, no saved name) should see a 3-step welcome wizard before ProfileSetupPage. Steps: (1) Welcome to MedSim + role selection, (2) College + batch details, (3) "You're ready" with tips. Store `medsim_onboarding_done` in localStorage to skip on repeat visits.
- **localStorage corruption recovery**: Wrap all localStorage reads in try-catch in App.tsx. If `medsim_login_timestamp` or `medsim_user` is corrupt/unparseable, show a recovery toast with a "Reset Session" button instead of silent failure or hang.
- **NEET PG question management in Admin**: In the Admin Panel's NEET PG/Database tab, after CSV upload, show the uploaded questions in a table with Edit and Delete buttons. Store in `medsim_custom_neetpg_questions` localStorage array. Allow admin to click Edit to modify question text, options, correct answer, explanation. Allow Delete to remove a question.
- **Session bypass protection**: In App.tsx login validation, add a check: if `medsim_login_mobile` is present but `medsim_login_timestamp` is missing or expired, force re-login. This prevents trivial localStorage injection bypasses.
- **iOS Safari camera permission guide**: In CameraPermissionScreen and PermissionGuideModal, detect iOS Safari specifically and show a step-by-step iOS guide (Settings > Safari > Camera > Allow) with a screenshot-style diagram.

### Modify
- **Certificate download**: Change certificate download format from `.png` to `.pdf` using a simple approach -- create a hidden iframe with the canvas content, print to PDF. If not possible, keep PNG but label the button "Download as Image (PNG)" to be honest about format.
- **Profile completion banner**: Fix the dismissal logic so that once dismissed (user clicks X), it never shows again for that device (store `medsim_banner_dismissed_v2` key, not just `medsim_profile_banner_dismissed`).
- **AI Assistant congestion**: The AI Assistant page is congested. Reduce padding on message bubbles, make the search bar smaller, use a cleaner single-column layout. Remove duplicate UI elements.

### Remove
- Remove any remaining hardcoded OTP hints or comments referencing `123456` or `820991` in visible UI text.

## Implementation Plan
1. App.tsx: Add localStorage corruption guard + session bypass protection
2. Create OnboardingPage.tsx: 3-step wizard for new users
3. App.tsx: Add onboarding flow check after login
4. AdminPage.tsx: Add NEET PG question table with edit/delete
5. CameraPermissionScreen.tsx + PermissionGuideModal.tsx: iOS-specific guide
6. AdminPage.tsx: Certificate download label fix
7. ProfileIncompleteBanner.tsx: Fix dismissal key to be permanent
8. AIAssistantPage.tsx: Reduce visual congestion
9. Remove any remaining OTP hint text from UI
