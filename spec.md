# MedSim

## Current State
AI Assistant has Batch 1 diseases (Anatomy + Physiology, ~20 entries) in `disease-db-anatomy-physiology.ts`. The `searchExtendedDB` function in `AIAssistantPage.tsx` queries only `allBatch1Diseases`.

## Requested Changes (Diff)

### Add
- New file `disease-db-biochemistry-pathology.ts` with 10 Biochemistry diseases (PKU, Homocystinuria, Galactosemia, Von Gierke, MSUD, Alkaptonuria, Wilson Disease, Gaucher, Tay-Sachs, Niemann-Pick A) and 10 Pathology diseases (Amyloidosis, SLE, RA, Atherosclerosis, TB Pathology, Carcinoma Cervix, Colorectal Carcinoma, HCC, Nephrotic Syndrome, AML) -- all conforming to the `DiseaseEntry` type from `disease-db-anatomy-physiology.ts`
- Combined export `allBatch2Diseases` from new file
- `ALL_DISEASES_DB` constant in AIAssistantPage combining Batch 1 + Batch 2

### Modify
- `AIAssistantPage.tsx`: import `allBatch2Diseases`, create `ALL_DISEASES_DB`, update `searchExtendedDB` to query `ALL_DISEASES_DB` instead of `allBatch1Diseases`

### Remove
- Nothing

## Implementation Plan
1. Create `disease-db-biochemistry-pathology.ts` with 20 clinical entries using `DiseaseEntry` type
2. Update `AIAssistantPage.tsx` imports and searchExtendedDB function
3. Validate build
