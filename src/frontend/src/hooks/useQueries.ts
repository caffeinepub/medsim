import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AIResult,
  AdminAlert,
  CaseAttempt,
  CustomPatientSession,
  Disease,
  PatientCase,
  PatientData,
  PerformanceStats,
  SecurityEvent,
  UserProfile,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Auth & Profile ───────────────────────────────────────────────

export function useCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserProfile"] });
    },
  });
}

export function useAllStudents() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile[]>({
    queryKey: ["allStudents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateStudentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studentId,
      isActive,
    }: {
      studentId: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateStudentStatus(studentId, isActive);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStudents"] });
    },
  });
}

// ─── Diseases ─────────────────────────────────────────────────────

export function useAllDiseases() {
  const { actor, isFetching } = useActor();
  return useQuery<Disease[]>({
    queryKey: ["allDiseases"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDiseases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDisease(diseaseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Disease | null>({
    queryKey: ["disease", diseaseId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDisease(diseaseId);
    },
    enabled: !!actor && !isFetching && !!diseaseId,
  });
}

export function useAddDisease() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (disease: Disease) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addDisease(disease);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDiseases"] });
    },
  });
}

export function useUpdateDisease() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (disease: Disease) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDisease(disease);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDiseases"] });
    },
  });
}

export function useDeleteDisease() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (diseaseId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteDisease(diseaseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDiseases"] });
    },
  });
}

// ─── Patient Cases ────────────────────────────────────────────────

export function useAllPatientCases() {
  const { actor, isFetching } = useActor();
  return useQuery<PatientCase[]>({
    queryKey: ["allPatientCases"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatientCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePatientCase(caseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<PatientCase | null>({
    queryKey: ["patientCase", caseId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPatientCase(caseId);
    },
    enabled: !!actor && !isFetching && !!caseId,
  });
}

export function useAddPatientCase() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientCase: PatientCase) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPatientCase(patientCase);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPatientCases"] });
    },
  });
}

export function useUpdatePatientCase() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientCase: PatientCase) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePatientCase(patientCase);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPatientCases"] });
    },
  });
}

export function useDeletePatientCase() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (caseId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePatientCase(caseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPatientCases"] });
    },
  });
}

// ─── Case Attempts ────────────────────────────────────────────────

export function useMyCaseAttempts() {
  const { actor, isFetching } = useActor();
  return useQuery<CaseAttempt[]>({
    queryKey: ["myCaseAttempts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyCaseAttempts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCaseAttemptsByStudent(studentId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CaseAttempt[]>({
    queryKey: ["caseAttemptsByStudent", studentId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCaseAttemptsByStudent(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useSubmitCaseAttempt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attempt: CaseAttempt) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitCaseAttempt(attempt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCaseAttempts"] });
      queryClient.invalidateQueries({ queryKey: ["myPerformanceStats"] });
    },
  });
}

// ─── Custom Patient ───────────────────────────────────────────────

export function useMyCustomPatientSessions() {
  const { actor, isFetching } = useActor();
  return useQuery<CustomPatientSession[]>({
    queryKey: ["myCustomPatientSessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyCustomPatientSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCustomPatientSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (session: CustomPatientSession) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCustomPatientSession(session);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCustomPatientSessions"] });
    },
  });
}

// ─── Performance ──────────────────────────────────────────────────

export function useMyPerformanceStats() {
  const { actor, isFetching } = useActor();
  return useQuery<PerformanceStats | null>({
    queryKey: ["myPerformanceStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPerformanceStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudentPerformanceStats(studentId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<PerformanceStats | null>({
    queryKey: ["studentPerformanceStats", studentId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudentPerformanceStats(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

// ─── AI Diagnosis ─────────────────────────────────────────────────

export function useGetAIDiagnosis() {
  const { actor } = useActor();
  return useMutation<AIResult, Error, PatientData>({
    mutationFn: async (patientData: PatientData) => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAIDiagnosis(patientData);
    },
  });
}

// ─── Security ─────────────────────────────────────────────────────

export function useLogSecurityEvent() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (event: SecurityEvent) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logSecurityEvent(event);
    },
  });
}

export function useAllSecurityEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<SecurityEvent[]>({
    queryKey: ["allSecurityEvents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSecurityEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSecurityEventStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      status,
    }: {
      eventId: string;
      status: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSecurityEventStatus(eventId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSecurityEvents"] });
    },
  });
}

// ─── Admin ────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery<{
    totalStudents: bigint;
    activeToday: bigint;
    mostAttemptedCases: Array<[string, bigint]>;
    commonMistakes: Array<string>;
  } | null>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllAdminAlerts() {
  const { actor, isFetching } = useActor();
  return useQuery<AdminAlert[]>({
    queryKey: ["allAdminAlerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdminAlerts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUnresolvedAdminAlerts() {
  const { actor, isFetching } = useActor();
  return useQuery<AdminAlert[]>({
    queryKey: ["unresolvedAdminAlerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUnresolvedAdminAlerts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAdminAlertStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      alertId,
      status,
    }: {
      alertId: string;
      status: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateAdminAlertStatus(alertId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdminAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["unresolvedAdminAlerts"] });
    },
  });
}

export function useCreateAdminAlert() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alert: AdminAlert) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAdminAlert(alert);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdminAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["unresolvedAdminAlerts"] });
    },
  });
}

export function useCreateAIEscalationAlert() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alert: AdminAlert) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAIEscalationAlert(alert);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdminAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["unresolvedAdminAlerts"] });
    },
  });
}

// ─── Leaderboard ──────────────────────────────────────────────────

export interface LeaderboardEntry {
  id: string;
  name: string;
  role: string;
  points: bigint;
  updatedAt: bigint;
}

export function useGetLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLeaderboardScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (points: number) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).submitLeaderboardScore(BigInt(Math.floor(points)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}
