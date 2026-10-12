import { StudentProfile, ExplainabilityDriver, PrescriptiveAction, StudentSegment } from "./types";

export function calculateStudentSuccessScore(
  s: Partial<StudentProfile>,
  adaptiveWeights?: {
    academic: number;
    placement: number;
    attendance: number;
    lms: number;
    skills: number;
    extracurricular: number;
    feedback: number;
  }
): {
  success_score: number;
  overall_tier: "Thriving" | "Moderate Risk" | "High Risk";
  risk_flags: StudentProfile["risk_flags"];
  explainability_drivers: ExplainabilityDriver[];
  prescriptive_actions: PrescriptiveAction[];
  radar_metrics: StudentProfile["radar_metrics"];
  segment: StudentSegment;
} {
  const cgpa = s.cgpa ?? 7.0;
  const attendance_pct = s.attendance_pct ?? 75.0;
  const active_backlogs = s.active_backlogs ?? 0;
  const assignment_completion_pct = s.assignment_completion_pct ?? 70.0;
  const lms_logins_per_week = s.lms_logins_per_week ?? 5;
  const coding_score = s.coding_score ?? 50.0;
  const aptitude_score = s.aptitude_score ?? 50.0;
  const mock_interview_rating = s.mock_interview_rating ?? 3.0;
  const soft_skills_rating = s.soft_skills_rating ?? mock_interview_rating * 2.0;
  const certifications_count = s.certifications_count ?? 1;
  const hackathons_participated = s.hackathons_participated ?? 0;
  const clubs_count = s.clubs_count ?? 1;
  const faculty_sentiment = s.faculty_sentiment ?? 0.65;
  const student_id = s.student_id ?? "STU-NEW";

  // 1. Normalized Components (0 - 100)
  const c_acad = (cgpa / 10.0) * 100;
  const c_attd = Math.min(100.0, attendance_pct);
  const c_lms = (assignment_completion_pct * 0.7) + (Math.min(20, lms_logins_per_week) / 20.0 * 30);
  const c_place = (coding_score * 0.45) + (aptitude_score * 0.35) + ((mock_interview_rating / 5.0) * 100 * 0.20);
  const c_skills = Math.min(100.0, (certifications_count * 25.0) + (soft_skills_rating * 5.0));
  const c_eng = Math.min(100.0, (hackathons_participated * 30.0) + (clubs_count * 20.0) + 20.0);
  const c_feed = faculty_sentiment * 100.0;

  // 2. Linear Weighted Composite (Default or Adaptive)
  const w = adaptiveWeights ?? {
    academic: 0.30,
    placement: 0.20,
    attendance: 0.15,
    lms: 0.15,
    skills: 0.10,
    extracurricular: 0.05,
    feedback: 0.05,
  };

  const raw_weighted = (
    w.academic * c_acad +
    w.placement * c_place +
    w.attendance * c_attd +
    w.lms * c_lms +
    w.skills * c_skills +
    w.extracurricular * c_eng +
    w.feedback * c_feed
  );

  // 3. Statutory Non-Linear Penalties
  let attd_penalty = 1.0;
  if (attendance_pct < 75.0) {
    attd_penalty = Math.max(0.68, attendance_pct / 75.0);
  }

  const backlog_penalty = Math.max(0.60, 1.0 - (active_backlogs * 0.12));

  let final_score = Math.round(raw_weighted * attd_penalty * backlog_penalty * 10) / 10;
  final_score = Math.max(5.0, Math.min(99.5, final_score));

  // 4. Risk Triggers
  const acad_triggers: string[] = [];
  if (cgpa < 6.5) acad_triggers.push(`CGPA is ${cgpa.toFixed(2)} (below 6.5 minimum target)`);
  if (active_backlogs > 0) acad_triggers.push(`${active_backlogs} active backlogs pending`);
  if (attendance_pct < 75.0) acad_triggers.push(`Attendance ${attendance_pct.toFixed(1)}% is below 75% statutory norm`);
  if (assignment_completion_pct < 60.0) acad_triggers.push(`Only ${assignment_completion_pct.toFixed(1)}% LMS coursework completed`);

  const place_triggers: string[] = [];
  if (coding_score < 45.0) place_triggers.push(`Coding assessment score ${coding_score.toFixed(1)} is below 45 benchmark`);
  if (aptitude_score < 50.0) place_triggers.push(`Aptitude percentile ${aptitude_score.toFixed(1)} is below 50`);
  if (mock_interview_rating < 3.0) place_triggers.push(`Mock interview score ${mock_interview_rating.toFixed(1)}/5.0 indicates weak verbal/tech presentation`);
  if (certifications_count === 0) place_triggers.push("Zero verified industry certifications");

  const disengage_triggers: string[] = [];
  if (lms_logins_per_week < 3) disengage_triggers.push(`Low LMS engagement (${lms_logins_per_week} logins/week)`);
  if (faculty_sentiment < 0.45) disengage_triggers.push("Faculty report indicates disinterest or unresponsiveness");

  const acad_risk: "LOW" | "MEDIUM" | "HIGH" =
    attendance_pct < 75.0 || active_backlogs >= 2 || cgpa < 6.0
      ? "HIGH"
      : acad_triggers.length > 0
      ? "MEDIUM"
      : "LOW";

  const place_risk: "LOW" | "MEDIUM" | "HIGH" =
    coding_score < 40.0 || aptitude_score < 45.0 || mock_interview_rating < 2.5
      ? "HIGH"
      : place_triggers.length > 0
      ? "MEDIUM"
      : "LOW";

  const disengage_risk: "LOW" | "MEDIUM" | "HIGH" =
    disengage_triggers.length >= 2 || attendance_pct < 65.0
      ? "HIGH"
      : disengage_triggers.length > 0
      ? "MEDIUM"
      : "LOW";

  const overall_tier: "Thriving" | "Moderate Risk" | "High Risk" =
    final_score < 50.0 || acad_risk === "HIGH" || place_risk === "HIGH"
      ? "High Risk"
      : final_score < 72.0
      ? "Moderate Risk"
      : "Thriving";

  // 5. Explainability Waterfall Drivers (vs typical 70 baseline)
  const explainability_drivers: ExplainabilityDriver[] = [
    {
      factor: "Academic Mastery (CGPA)",
      weight: 0.30,
      value: `${cgpa.toFixed(2)}/10`,
      contribution: Math.round((c_acad - 70) * 0.30 * 10) / 10,
    },
    {
      factor: "Placement & Coding Aptitude",
      weight: 0.20,
      value: `Score: ${coding_score.toFixed(0)}`,
      contribution: Math.round((c_place - 65) * 0.20 * 10) / 10,
    },
    {
      factor: "Class Attendance Presence",
      weight: 0.15,
      value: `${attendance_pct.toFixed(1)}%`,
      contribution:
        attendance_pct >= 75.0
          ? Math.round((c_attd - 75) * 0.15 * 10) / 10
          : Math.round(-((75 - attendance_pct) * 0.6) * 10) / 10,
    },
    {
      factor: "LMS Coursework Execution",
      weight: 0.15,
      value: `${assignment_completion_pct.toFixed(0)}%`,
      contribution: Math.round((c_lms - 70) * 0.15 * 10) / 10,
    },
    {
      factor: "Backlog Penalty Impact",
      weight: 0.10,
      value: `${active_backlogs} Backlog(s)`,
      contribution: Math.round(- (active_backlogs * 11.5) * 10) / 10,
    },
    {
      factor: "Industry Skills & Certifications",
      weight: 0.10,
      value: `${certifications_count} verified`,
      contribution: Math.round((c_skills - 40) * 0.10 * 10) / 10,
    },
  ];

  // 6. Prescriptive Actions
  const prescriptive_actions: PrescriptiveAction[] = [];
  if (attendance_pct < 75.0) {
    prescriptive_actions.push({
      id: `ACT-${student_id}-1`,
      type: "ATTENDANCE_WARNING",
      title: "Mandatory Attendance Recovery & Counselor Sync",
      priority: "URGENT",
      assigned_to: "HOD / Academic Counselor",
      details: `Attendance is ${attendance_pct.toFixed(1)}% (below statutory 75%). Risk of exam debarment. Schedule 1-on-1 counseling session.`,
      status: "Pending",
      created_at: "Today",
    });
  }

  if (coding_score < 50.0 || mock_interview_rating < 3.0) {
    prescriptive_actions.push({
      id: `ACT-${student_id}-2`,
      type: "PLACEMENT_BOOTCAMP",
      title: "Enroll in Fast-Track DSA Bootcamp & Mock Drill",
      priority: "HIGH",
      assigned_to: "Training & Placement Cell",
      details: `Coding score is ${coding_score.toFixed(0)}/100 and mock interview rating is ${mock_interview_rating.toFixed(1)}/5.0. Immediate training required for placement cutoff.`,
      status: "Pending",
      created_at: "Today",
    });
  }

  if (active_backlogs > 0) {
    prescriptive_actions.push({
      id: `ACT-${student_id}-3`,
      type: "REMEDIAL_ACADEMIC",
      title: "Subject Remedial Clinic & Senior Peer Tutor Allocation",
      priority: "HIGH",
      assigned_to: "Department Faculty Coordinator",
      details: `${active_backlogs} active backlog(s) registered. Assign student to weekly doubt clearing batches.`,
      status: "In Progress",
      created_at: "2 days ago",
    });
  }

  if (assignment_completion_pct < 65.0) {
    prescriptive_actions.push({
      id: `ACT-${student_id}-4`,
      type: "LMS_NUDGE",
      title: "Automated LMS Nudge & Submission Extension",
      priority: "MEDIUM",
      assigned_to: "Course Coordinator",
      details: `Only ${assignment_completion_pct.toFixed(0)}% assignments submitted. Trigger SMS alert and offer 48-hr penalty-free extension.`,
      status: "Completed",
      created_at: "5 days ago",
    });
  }

  // 7. Dynamic Archetype Assignment (Bonus Feature 1)
  let segment: StudentSegment;
  if (cgpa >= 8.0 && coding_score < 55.0) {
    segment = {
      cluster_id: 1,
      name: "The Scholar",
      tagline: "High Academics, Low Placement/Coding Readiness",
      color: "#3B82F6",
      strategy: "Provide intensive coding bootcamps, mock interviews, and resume building workshops.",
    };
  } else if (cgpa < 7.0 && coding_score >= 70.0) {
    segment = {
      cluster_id: 2,
      name: "Practical Builder",
      tagline: "Strong Projects & Coding, Fragile Academic Base",
      color: "#10B981",
      strategy: "Fast-track academic tutoring to clear backlogs and maintain minimum recruitment CGPA cutoffs.",
    };
  } else if (cgpa >= 8.0 && coding_score >= 70.0) {
    segment = {
      cluster_id: 0,
      name: "Consistent All-Rounder",
      tagline: "High Academics, Strong Placement Readiness, Active Leader",
      color: "#8B5CF6",
      strategy: "Fast-track for Tier-1 dream company recruitment and peer mentoring leadership roles.",
    };
  } else {
    segment = {
      cluster_id: 3,
      name: "Critical Multi-Risk",
      tagline: "Low Academic Foundation, Attendance Breach & Placement Deficits",
      color: "#EF4444",
      strategy: "Immediate Dean/HOD intervention, 1-on-1 faculty mentor assignment, attendance recovery plan.",
    };
  }

  return {
    success_score: final_score,
    overall_tier,
    risk_flags: {
      academic: { status: acad_risk, triggers: acad_triggers },
      placement: { status: place_risk, triggers: place_triggers },
      disengagement: { status: disengage_risk, triggers: disengage_triggers },
    },
    explainability_drivers,
    prescriptive_actions,
    radar_metrics: {
      academic: Math.round(c_acad * 10) / 10,
      attendance: Math.round(c_attd * 10) / 10,
      lms: Math.round(c_lms * 10) / 10,
      placement: Math.round(c_place * 10) / 10,
      skills: Math.round(c_skills * 10) / 10,
      engagement: Math.round(c_eng * 10) / 10,
      feedback: Math.round(c_feed * 10) / 10,
    },
    segment,
  };
}
