# MedSim

## Current State
Exercise Mode has patient-case-based MCQ flow (diagnose → medicines → results). Questions in seed-cases.ts are clinical case scenarios, NOT NEET PG style standalone MCQs. No chapter-wise question bank exists. No standalone NEET PG practice mode exists.

## Requested Changes (Diff)

### Add
- `neet-pg-questions.ts` — large chapter-wise question bank covering all 19 MBBS subjects with NEET PG previous year + NEET PG-style questions. Each question has: stem, 4 options (A/B/C/D), correct answer index, detailed explanation (why correct + why each wrong option is wrong), textbook reference (latest edition), subject, chapter, difficulty (Easy/Medium/Hard).
- `NEETPGQuizPage.tsx` — new dedicated NEET PG Practice mode with: subject/chapter filter, difficulty filter, question display (NEET PG style 4-option MCQ), answer reveal with full explanation + reference, subject-wise + chapter-wise progress tracking, score summary.
- Navigation entry in sidebar + App.tsx routing for NEET PG Practice page.

### Modify
- `ExercisePage.tsx` — add a prominent banner/button linking to the new NEET PG Practice mode so users can switch between Clinical Cases and NEET PG MCQs.
- `mbbs-subjects.ts` — add chapter definitions for each subject (used by NEET PG question bank and filter UI).

### Remove
- Nothing removed; existing clinical case exercise mode stays intact.

## Implementation Plan
1. Add chapter data to mbbs-subjects.ts for all 19 subjects.
2. Create neet-pg-questions.ts with 20-30 NEET PG quality questions per subject (across chapters), with full explanation + reference.
3. Build NEETPGQuizPage.tsx with subject/chapter/difficulty filters, NEET PG MCQ UI, answer reveal with explanation panel, and score tracker.
4. Add routing in App.tsx and nav link in sidebar/hamburger menu.
5. Add banner in ExercisePage linking to NEET PG mode.
6. Validate and deploy.
