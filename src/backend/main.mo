import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Nat32 "mo:core/Nat32";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // ==== Custom Types ====

  public type LoginType = {
    #mobile;
    #admin;
  };

  public type Session = {
    id : Text;
    userId : Text;
    role : AccessControl.UserRole;
    createdAt : Time.Time;
    expiresAt : Time.Time;
    loginType : LoginType;
  };

  public type Medicine = {
    id : Text;
    name : Text;
    dosage : Text;
    route : Text;
    duration : Text;
    goodEffects : [GoodEffect];
    sideEffects : [SideEffect];
    contraindications : [Text];
    drugInteractions : [Text];
  };

  public type GoodEffect = {
    timeMinutes : Nat;
    description : Text;
  };

  public type SideEffect = {
    timeMinutes : Nat;
    description : Text;
  };

  public type Symptom = {
    name : Text;
    severity : Nat;
    description : Text;
  };

  public type SymptomSet = Set.Set<Text>;
  public type MedicineStore = Map.Map<Text, Medicine>;

  public type ClinicalSigns = {
    bp : Text;
    hr : Text;
    temp : Text;
    rr : Text;
    spo2 : Text;
  };

  public type Disease = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    icd10Code : Text;
    symptoms : [Symptom];
    clinicalSigns : ClinicalSigns;
    diagnosticCriteria : Text;
    associatedDiseases : [Text];
    subjectMapping : [Text];
    medicines : [Medicine];
  };

  public type PatientCase = {
    id : Text;
    diseaseId : Text;
    title : Text;
    patientAge : Nat;
    patientGender : Text;
    patientDisability : ?Text;
    chiefComplaint : Text;
    history : Text;
    examinationFindings : Text;
    investigations : Text;
    correctDiagnosis : Text;
    correctMedicines : [Text];
    difficulty : Text;
    subject : Text;
  };

  public type CustomPatientSession = {
    id : Text;
    studentId : Text;
    timestamp : Time.Time;
    patientData : PatientData;
    diagnosisAttempt : Text;
    medicinesChosen : [Text];
    outcome : Outcome;
  };

  public type SubjectStats = [Text];
  public type Subject = {
    name : Text;
    attempts : Nat;
    correct : Nat;
    accuracy : Nat;
  };

  public type PerformanceStats = {
    studentId : Text;
    totalAttempts : Nat;
    correctCount : Nat;
    accuracy : Nat;
    subjectStats : SubjectStats;
    weakSubjects : [Text];
    caseHistory : [{ subjectName : Text; attempts : Nat; correct : Nat; accuracy : Nat }];
    recommendations : [Text];
  };

  public type PatientData = {
    id : Text;
    age : Nat;
    gender : Text;
    hasDisability : Bool;
    symptoms : [Text];
    vitals : VitalSigns;
    history : Text;
    allergies : [Text];
    diagnosisAttempt : Text;
    medicinesChosen : [Text];
    outcome : Outcome;
  };

  public type VitalSigns = {
    bp : Text;
    hr : Nat;
    temp : Nat;
    rr : Nat;
    spo2 : Nat;
  };

  public type AIResult = {
    diagnosis : [Diagnosis];
    probability : Nat;
    reasoning : Text;
  };

  public type CaseAttempt = {
    caseId : Text;
    studentId : Text;
    timestamp : Time.Time;
    diagnosisChosen : Text;
    medicinesChosen : [Text];
    outcome : Outcome;
    subject : Text;
    isCorrect : Bool;
    wrongDiagnosis : ?WrongDiagnosis;
    wrongMedicines : [WrongMedicine];
  };

  public type WrongDiagnosis = {
    explanation : Text;
    correctDiagnosis : Text;
  };

  public type WrongMedicine = {
    medicineId : Text;
    reason : Text;
    sideEffect : Text;
    correctAlternative : Text;
  };

  public type Outcome = {
    isCorrect : Bool;
    details : Text;
    responseTime : Time.Time;
    effectsTimeline : [Effect];
    _diagnosis : ?Diagnosis;
  };

  public type Diagnosis = {
    diseaseId : Text;
    name : Text;
    category : Text;
    description : Text;
    icd10Code : Text;
    symptoms : [Symptom];
  };

  public type AdminAlert = {
    id : Text;
    title : Text;
    message : Text;
    severity : Nat;
    status : Text;
    createdAt : Time.Time;
  };

  public type SecurityEvent = {
    id : Text;
    eventType : Text;
    studentId : ?Text;
    timestamp : Time.Time;
    details : Text;
    status : Text;
  };

  public type UserProfile = {
    id : Text;
    name : Text;
    mobile : Text;
    role : Text;
    isActive : Bool;
    createdAt : Time.Time;
  };

  public type Effect = {
    timeMinutes : Nat;
    description : Text;
  };


  public type LeaderboardEntry = {
    id : Text;
    name : Text;
    role : Text;
    points : Nat;
    updatedAt : Time.Time;
  };

  module PerformanceStats {
    public func compareByStudent(a : PerformanceStats, b : PerformanceStats) : Order.Order {
      Text.compare(a.studentId, b.studentId);
    };
  };

  // ==== State ====

  let users = Map.empty<Text, UserProfile>();
  let principalToUserId = Map.empty<Principal, Text>();
  let sessions = Map.empty<Principal, Session>();
  let diseases = Map.empty<Text, Disease>();
  let patientCases = Map.empty<Text, PatientCase>();
  let customPatientSessions = Map.empty<Text, CustomPatientSession>();
  let caseAttempts = Map.empty<Text, CaseAttempt>();
  let adminAlerts = Map.empty<Text, AdminAlert>();
  let securityEvents = Map.empty<Text, SecurityEvent>();
  let medicines = Map.empty<Text, Medicine>();
  let performanceStatsMap = Map.empty<Text, PerformanceStats>();
  let leaderboardEntries = Map.empty<Text, LeaderboardEntry>();

  // ==== Actor & Authorization ====

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ==== Helper Functions ====

  func getUserIdFromPrincipal(p : Principal) : ?Text {
    principalToUserId.get(p);
  };

  func textToLower(t : Text) : Text {
    t.map(func(c : Char) : Char {
      if (c >= 'A' and c <= 'Z') {
        Char.fromNat32(Char.toNat32(c) + 32);
      } else {
        c;
      };
    });
  };

  func textContains(haystack : Text, needle : Text) : Bool {
    let haystackLower = textToLower(haystack);
    let needleLower = textToLower(needle);
    haystackLower.contains(#text needleLower);
  };

  // ==== Required User Profile Functions ====

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { null };
      case (?userId) { users.get(userId) };
    };
  };

  public query ({ caller }) func getUserProfile(userId : Text) : async ?UserProfile {
    if (caller != Principal.fromText(userId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or be an admin");
    };
    users.get(userId);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) {
        principalToUserId.add(caller, profile.id);
        users.add(profile.id, profile);
      };
      case (?userId) {
        users.add(userId, profile);
      };
    };
  };

  // ==== Public Functions: Diseases (Read - All users, Write - Admin only) ====

  public query ({ caller }) func getAllDiseases() : async [Disease] {
    // All authenticated users can view diseases
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view diseases");
    };
    diseases.values().toArray();
  };

  public query ({ caller }) func getDisease(diseaseId : Text) : async ?Disease {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view diseases");
    };
    diseases.get(diseaseId);
  };

  public shared ({ caller }) func addDisease(disease : Disease) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add diseases");
    };
    diseases.add(disease.id, disease);
  };

  public shared ({ caller }) func updateDisease(disease : Disease) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update diseases");
    };
    diseases.add(disease.id, disease);
  };

  public shared ({ caller }) func deleteDisease(diseaseId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete diseases");
    };
    diseases.remove(diseaseId);
  };

  // ==== Public Functions: Patient Cases (Read - All users, Write - Admin only) ====

  public query ({ caller }) func getAllPatientCases() : async [PatientCase] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view patient cases");
    };
    patientCases.values().toArray();
  };

  public query ({ caller }) func getPatientCase(caseId : Text) : async ?PatientCase {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view patient cases");
    };
    patientCases.get(caseId);
  };

  public shared ({ caller }) func addPatientCase(patientCase : PatientCase) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add patient cases");
    };
    patientCases.add(patientCase.id, patientCase);
  };

  public shared ({ caller }) func updatePatientCase(patientCase : PatientCase) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update patient cases");
    };
    patientCases.add(patientCase.id, patientCase);
  };

  public shared ({ caller }) func deletePatientCase(caseId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete patient cases");
    };
    patientCases.remove(caseId);
  };

  // ==== Custom Patient Sessions (Students only) ====

  public shared ({ caller }) func createCustomPatientSession(session : CustomPatientSession) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can create custom patient sessions");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?userId) {
        if (session.studentId != userId) {
          Runtime.trap("Unauthorized: Can only create sessions for yourself");
        };
        customPatientSessions.add(session.id, session);
      };
    };
  };

  public query ({ caller }) func getCustomPatientSession(sessionId : Text) : async ?CustomPatientSession {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view sessions");
    };
    switch (customPatientSessions.get(sessionId)) {
      case (null) { null };
      case (?session) {
        switch (getUserIdFromPrincipal(caller)) {
          case (null) { Runtime.trap("User profile not found") };
          case (?userId) {
            if (session.studentId != userId and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Can only view your own sessions");
            };
            ?session;
          };
        };
      };
    };
  };

  public query ({ caller }) func getMyCustomPatientSessions() : async [CustomPatientSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can view their sessions");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { [] };
      case (?userId) {
        customPatientSessions.values().toArray().filter(func(s) { s.studentId == userId });
      };
    };
  };

  // ==== Case Attempts (Students create, Students/Admins view) ====

  public shared ({ caller }) func submitCaseAttempt(attempt : CaseAttempt) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can submit case attempts");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?userId) {
        if (attempt.studentId != userId) {
          Runtime.trap("Unauthorized: Can only submit attempts for yourself");
        };
        caseAttempts.add(attempt.caseId # "-" # attempt.studentId # "-" # Nat32.fromNat(Int.abs(attempt.timestamp)).toText(), attempt);
      };
    };
  };

  public query ({ caller }) func getMyCaseAttempts() : async [CaseAttempt] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can view their attempts");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { [] };
      case (?userId) {
        caseAttempts.values().toArray().filter(func(a) { a.studentId == userId });
      };
    };
  };

  public query ({ caller }) func getCaseAttemptsByStudent(studentId : Text) : async [CaseAttempt] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other students' attempts");
    };
    caseAttempts.values().toArray().filter(func(a) { a.studentId == studentId });
  };

  // ==== Performance Stats (Students view own, Admins view all) ====

  public query ({ caller }) func getMyPerformanceStats() : async ?PerformanceStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can view performance stats");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { null };
      case (?userId) { performanceStatsMap.get(userId) };
    };
  };

  public query ({ caller }) func getPerformanceStats() : async [PerformanceStats] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all performance stats");
    };
    performanceStatsMap.values().toArray().sort(PerformanceStats.compareByStudent);
  };

  public query ({ caller }) func getStudentPerformanceStats(studentId : Text) : async ?PerformanceStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other students' stats");
    };
    performanceStatsMap.get(studentId);
  };

  // ==== Security Events (Students log, Admins view all) ====

  public shared ({ caller }) func logSecurityEvent(event : SecurityEvent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can log security events");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?userId) {
        switch (event.studentId) {
          case (null) { Runtime.trap("Student ID required for security events") };
          case (?sid) {
            if (sid != userId and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Can only log events for yourself");
            };
            securityEvents.add(event.id, event);
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllSecurityEvents() : async [SecurityEvent] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view security events");
    };
    securityEvents.values().toArray();
  };

  public query ({ caller }) func getSecurityEventsByStudent(studentId : Text) : async [SecurityEvent] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view security events");
    };
    securityEvents.values().toArray().filter(func(e) {
      switch (e.studentId) {
        case (null) { false };
        case (?sid) { sid == studentId };
      };
    });
  };

  public shared ({ caller }) func updateSecurityEventStatus(eventId : Text, status : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update security event status");
    };
    switch (securityEvents.get(eventId)) {
      case (null) { Runtime.trap("Security event not found") };
      case (?event) {
        let updatedEvent = {
          id = event.id;
          eventType = event.eventType;
          studentId = event.studentId;
          timestamp = event.timestamp;
          details = event.details;
          status = status;
        };
        securityEvents.add(eventId, updatedEvent);
      };
    };
  };

  // ==== Admin Alerts (Admin creates/views, Users can create escalation alerts) ====

  public shared ({ caller }) func createAdminAlert(alert : AdminAlert) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create alerts");
    };
    adminAlerts.add(alert.id, alert);
  };

  public shared ({ caller }) func createAIEscalationAlert(alert : AdminAlert) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create escalation alerts");
    };
    adminAlerts.add(alert.id, alert);
  };

  public query ({ caller }) func getAllAdminAlerts() : async [AdminAlert] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view alerts");
    };
    adminAlerts.values().toArray();
  };

  public query ({ caller }) func getUnresolvedAdminAlerts() : async [AdminAlert] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view alerts");
    };
    adminAlerts.values().toArray().filter(func(a) { a.status == "unresolved" });
  };

  public shared ({ caller }) func updateAdminAlertStatus(alertId : Text, status : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update alert status");
    };
    switch (adminAlerts.get(alertId)) {
      case (null) { Runtime.trap("Alert not found") };
      case (?alert) {
        let updatedAlert = {
          id = alert.id;
          title = alert.title;
          message = alert.message;
          severity = alert.severity;
          status = status;
          createdAt = alert.createdAt;
        };
        adminAlerts.add(alertId, updatedAlert);
      };
    };
  };

  // ==== Student Management (Admin only) ====

  public query ({ caller }) func getAllStudents() : async [UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all students");
    };
    users.values().toArray();
  };

  public shared ({ caller }) func updateStudentStatus(studentId : Text, isActive : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update student status");
    };
    switch (users.get(studentId)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let updatedStudent = {
          id = student.id;
          name = student.name;
          mobile = student.mobile;
          role = student.role;
          isActive = isActive;
          createdAt = student.createdAt;
        };
        users.add(studentId, updatedStudent);
      };
    };
  };

  public query ({ caller }) func getUserProfileMobile(_mobile : Text) : async ?UserProfile {
    // Public function for login flow - no auth required
    users.values().toArray().find(func(user) { user.mobile == _mobile });
  };

  public query ({ caller }) func isUserProfileVerify(_id : Text) : async Bool {
    // Public function for verification - no auth required
    switch (users.get(_id)) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // ==== AI Assistant (Students use, creates alerts for admins) ====

  public shared ({ caller }) func getAIDiagnosis(patientData : PatientData) : async AIResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only students can use AI diagnosis");
    };

    let patientSymptoms = patientData.symptoms;

    if (diseases.size() == 0) {
      return {
        diagnosis = [];
        probability = 0;
        reasoning = "डेटाबेस खाली है। कृपया व्यवस्थापक से संपर्क करें। / Database is empty. Please contact administrator.";
      };
    };

    type ScoredDisease = {
      disease : Disease;
      score : Nat;
      matchedSymptoms : [Text];
    };

    var scoredDiseases : [ScoredDisease] = [];

    for ((diseaseId, disease) in diseases.entries()) {
      var score : Nat = 0;
      var matchedSymptoms : [Text] = [];

      for (patientSymptom in patientSymptoms.vals()) {
        let patientSymptomLower = textToLower(patientSymptom);

        if (textContains(disease.name, patientSymptom) or textContains(disease.description, patientSymptom)) {
          score += 3;
          matchedSymptoms := matchedSymptoms.concat([patientSymptom # " (disease name/description match)"]);
        };

        for (diseaseSymptom in disease.symptoms.vals()) {
          if (textContains(diseaseSymptom.name, patientSymptom) or textContains(diseaseSymptom.description, patientSymptom) or textContains(patientSymptom, diseaseSymptom.name)) {
            score += 1;
            matchedSymptoms := matchedSymptoms.concat([patientSymptom # " → " # diseaseSymptom.name]);
          };
        };
      };

      if (score > 0) {
        scoredDiseases := scoredDiseases.concat(
          [{
            disease = disease;
            score = score;
            matchedSymptoms = matchedSymptoms;
          }],
        );
      };
    };

    if (scoredDiseases.size() == 0) {
      return {
        diagnosis = [];
        probability = 15;
        reasoning = "कोई मिलान नहीं मिला। कृपया अधिक विस्तृत लक्षण प्रदान करें। / No matches found. Please provide more detailed symptoms.";
      };
    };

    let sortedDiseases = scoredDiseases.sort(
      func(a : ScoredDisease, b : ScoredDisease) : Order.Order {
        if (a.score > b.score) { #less } else if (a.score < b.score) { #greater } else { #equal };
      },
    );

    let topDiseases = if (sortedDiseases.size() > 3) {
      Array.tabulate(3, func(i) { sortedDiseases[i] });
    } else {
      sortedDiseases;
    };

    let bestScore = topDiseases[0].score;
    let maxPossibleScore = patientSymptoms.size() * 3;
    var probability = (bestScore * 100) / (if (maxPossibleScore > 0) { maxPossibleScore } else { 1 });

    if (probability < 15) { probability := 15 };
    if (probability > 95) { probability := 95 };

    var reasoning = "निदान विश्लेषण / Diagnosis Analysis:\n\n";

    for (i in topDiseases.keys()) {
      let sd = topDiseases[i];
      reasoning #= Nat.toText(i + 1) # ". " # sd.disease.name # " (स्कोर/Score: " # Nat.toText(sd.score) # ")\n";
      reasoning #= "   मिलान लक्षण / Matched Symptoms:\n";
      for (symptom in sd.matchedSymptoms.vals()) {
        reasoning #= "   - " # symptom # "\n";
      };
      reasoning #= "   निदान मानदंड / Diagnostic Criteria: " # sd.disease.diagnosticCriteria # "\n\n";
    };

    let diagnosisArray = topDiseases.map(
      func(sd) {
        {
          diseaseId = sd.disease.id;
          name = sd.disease.name;
          category = sd.disease.category;
          description = sd.disease.description;
          icd10Code = sd.disease.icd10Code;
          symptoms = sd.disease.symptoms;
        };
      },
    );

    {
      diagnosis = diagnosisArray;
      probability = probability;
      reasoning = reasoning;
    };
  };

  // ==== Dashboard Stats (Admin only) ====

  public query ({ caller }) func getDashboardStats() : async {
    totalStudents : Nat;
    activeToday : Nat;
    mostAttemptedCases : [(Text, Nat)];
    commonMistakes : [Text];
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view dashboard stats");
    };
    {
      totalStudents = users.size();
      activeToday = 0;
      mostAttemptedCases = [];
      commonMistakes = [];
    };
  };

  // ==== Leaderboard ====

  public shared ({ caller }) func submitLeaderboardScore(points : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit scores");
    };
    switch (getUserIdFromPrincipal(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?userId) {
        let existing = leaderboardEntries.get(userId);
        let name = switch (users.get(userId)) {
          case (null) { "Unknown" };
          case (?u) { u.name };
        };
        let role = switch (users.get(userId)) {
          case (null) { "Student (MBBS)" };
          case (?u) { u.role };
        };
        let currentPoints = switch (existing) {
          case (null) { 0 };
          case (?e) { e.points };
        };
        let newPoints = if (points > currentPoints) { points } else { currentPoints };
        let entry : LeaderboardEntry = {
          id = userId;
          name = name;
          role = role;
          points = newPoints;
          updatedAt = Time.now();
        };
        leaderboardEntries.add(userId, entry);
      };
    };
  };

  public query func getLeaderboard() : async [LeaderboardEntry] {
    leaderboardEntries.values().toArray().sort(
      func(a : LeaderboardEntry, b : LeaderboardEntry) : Order.Order {
        if (a.points > b.points) { #less } else if (a.points < b.points) { #greater } else { #equal };
      }
    );
  };
};