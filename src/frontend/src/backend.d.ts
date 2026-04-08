import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AIResult {
    probability: bigint;
    diagnosis: Array<Diagnosis>;
    reasoning: string;
}
export interface LeaderboardEntry {
    id: string;
    name: string;
    role: string;
    updatedAt: Time;
    points: bigint;
}
export type Time = bigint;
export interface SecurityEvent {
    id: string;
    status: string;
    studentId?: string;
    timestamp: Time;
    details: string;
    eventType: string;
}
export interface WrongDiagnosis {
    explanation: string;
    correctDiagnosis: string;
}
export interface SideEffect {
    description: string;
    timeMinutes: bigint;
}
export interface PatientCase {
    id: string;
    patientAge: bigint;
    title: string;
    diseaseId: string;
    subject: string;
    patientGender: string;
    patientDisability?: string;
    difficulty: string;
    correctDiagnosis: string;
    history: string;
    examinationFindings: string;
    correctMedicines: Array<string>;
    investigations: string;
    chiefComplaint: string;
}
export interface CaseAttempt {
    medicinesChosen: Array<string>;
    studentId: string;
    subject: string;
    wrongMedicines: Array<WrongMedicine>;
    isCorrect: boolean;
    diagnosisChosen: string;
    timestamp: Time;
    caseId: string;
    outcome: Outcome;
    wrongDiagnosis?: WrongDiagnosis;
}
export interface AdminAlert {
    id: string;
    status: string;
    title: string;
    createdAt: Time;
    message: string;
    severity: bigint;
}
export interface GoodEffect {
    description: string;
    timeMinutes: bigint;
}
export interface WrongMedicine {
    correctAlternative: string;
    sideEffect: string;
    medicineId: string;
    reason: string;
}
export type SubjectStats = Array<string>;
export interface PerformanceStats {
    studentId: string;
    caseHistory: Array<{
        subjectName: string;
        attempts: bigint;
        correct: bigint;
        accuracy: bigint;
    }>;
    recommendations: Array<string>;
    weakSubjects: Array<string>;
    subjectStats: SubjectStats;
    totalAttempts: bigint;
    correctCount: bigint;
    accuracy: bigint;
}
export interface PatientData {
    id: string;
    age: bigint;
    medicinesChosen: Array<string>;
    hasDisability: boolean;
    history: string;
    diagnosisAttempt: string;
    gender: string;
    symptoms: Array<string>;
    outcome: Outcome;
    allergies: Array<string>;
    vitals: VitalSigns;
}
export interface Outcome {
    isCorrect: boolean;
    effectsTimeline: Array<Effect>;
    details: string;
    _diagnosis?: Diagnosis;
    responseTime: Time;
}
export interface Effect {
    description: string;
    timeMinutes: bigint;
}
export interface Medicine {
    id: string;
    goodEffects: Array<GoodEffect>;
    duration: string;
    dosage: string;
    name: string;
    contraindications: Array<string>;
    drugInteractions: Array<string>;
    sideEffects: Array<SideEffect>;
    route: string;
}
export interface Disease {
    id: string;
    diagnosticCriteria: string;
    name: string;
    icd10Code: string;
    subjectMapping: Array<string>;
    description: string;
    category: string;
    symptoms: Array<Symptom>;
    clinicalSigns: ClinicalSigns;
    medicines: Array<Medicine>;
    associatedDiseases: Array<string>;
}
export interface ClinicalSigns {
    bp: string;
    hr: string;
    rr: string;
    spo2: string;
    temp: string;
}
export interface VitalSigns {
    bp: string;
    hr: bigint;
    rr: bigint;
    spo2: bigint;
    temp: bigint;
}
export interface CustomPatientSession {
    id: string;
    medicinesChosen: Array<string>;
    studentId: string;
    diagnosisAttempt: string;
    patientData: PatientData;
    timestamp: Time;
    outcome: Outcome;
}
export interface Symptom {
    name: string;
    description: string;
    severity: bigint;
}
export interface UserProfile {
    id: string;
    name: string;
    createdAt: Time;
    role: string;
    isActive: boolean;
    mobile: string;
}
export interface Diagnosis {
    diseaseId: string;
    name: string;
    icd10Code: string;
    description: string;
    category: string;
    symptoms: Array<Symptom>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDisease(disease: Disease): Promise<void>;
    addPatientCase(patientCase: PatientCase): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAIEscalationAlert(alert: AdminAlert): Promise<void>;
    createAdminAlert(alert: AdminAlert): Promise<void>;
    createCustomPatientSession(session: CustomPatientSession): Promise<void>;
    deleteDisease(diseaseId: string): Promise<void>;
    deletePatientCase(caseId: string): Promise<void>;
    getAIDiagnosis(patientData: PatientData): Promise<AIResult>;
    getAllAdminAlerts(): Promise<Array<AdminAlert>>;
    getAllDiseases(): Promise<Array<Disease>>;
    getAllPatientCases(): Promise<Array<PatientCase>>;
    getAllSecurityEvents(): Promise<Array<SecurityEvent>>;
    getAllStudents(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCaseAttemptsByStudent(studentId: string): Promise<Array<CaseAttempt>>;
    getCustomPatientSession(sessionId: string): Promise<CustomPatientSession | null>;
    getDashboardStats(): Promise<{
        totalStudents: bigint;
        activeToday: bigint;
        mostAttemptedCases: Array<[string, bigint]>;
        commonMistakes: Array<string>;
    }>;
    getDisease(diseaseId: string): Promise<Disease | null>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getMyCaseAttempts(): Promise<Array<CaseAttempt>>;
    getMyCustomPatientSessions(): Promise<Array<CustomPatientSession>>;
    getMyPerformanceStats(): Promise<PerformanceStats | null>;
    getPatientCase(caseId: string): Promise<PatientCase | null>;
    getPerformanceStats(): Promise<Array<PerformanceStats>>;
    getSecurityEventsByStudent(studentId: string): Promise<Array<SecurityEvent>>;
    getStudentPerformanceStats(studentId: string): Promise<PerformanceStats | null>;
    getUnresolvedAdminAlerts(): Promise<Array<AdminAlert>>;
    getUserProfile(userId: string): Promise<UserProfile | null>;
    getUserProfileMobile(_mobile: string): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isUserProfileVerify(_id: string): Promise<boolean>;
    logSecurityEvent(event: SecurityEvent): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCaseAttempt(attempt: CaseAttempt): Promise<void>;
    submitLeaderboardScore(points: bigint): Promise<void>;
    updateAdminAlertStatus(alertId: string, status: string): Promise<void>;
    updateDisease(disease: Disease): Promise<void>;
    updatePatientCase(patientCase: PatientCase): Promise<void>;
    updateSecurityEventStatus(eventId: string, status: string): Promise<void>;
    updateStudentStatus(studentId: string, isActive: boolean): Promise<void>;
}
