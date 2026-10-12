import { StudentProfile } from "./types";
import { initialStudents } from "./studentsData";
import { calculateStudentSuccessScore } from "./scoring";

export interface ScenarioInfo {
  id: "baseline" | "crisis" | "placement" | "recovery";
  label: string;
  badge: string;
  tagline: string;
  description: string;
  expectedAtRisk: string;
  expectedAvgScore: string;
}

export const SCENARIO_PRESETS: ScenarioInfo[] = [
  {
    id: "baseline",
    label: "Balanced Baseline",
    badge: "Default Cohort",
    tagline: "Representative multi-department campus distribution",
    description: "600 students across 6 departments with standard normal distribution of scores (14% at-risk, 62% thriving).",
    expectedAtRisk: "14%",
    expectedAvgScore: "73.4",
  },
  {
    id: "crisis",
    label: "Mid-Term Crisis",
    badge: "High Risk Surge",
    tagline: "Post-midterm attendance dip and sudden backlog accumulation",
    description: "Simulates mid-semester fatigue: 38% students drop below 75% attendance statutory penalty gate, triggering urgent remedial alerts.",
    expectedAtRisk: "38%",
    expectedAvgScore: "58.2",
  },
  {
    id: "placement",
    label: "Placement Surge",
    badge: "Career Ready",
    tagline: "Pre-placement drive with peak coding and mock scores",
    description: "Final-year placement focus: coding assessment scores > 85, active mock interview prep, and zero backlogs for top 65%.",
    expectedAtRisk: "6%",
    expectedAvgScore: "84.1",
  },
  {
    id: "recovery",
    label: "Remedial Recovery",
    badge: "Intervention ROI",
    tagline: "Post-tutoring evaluation showing cleared backlogs",
    description: "Demonstrates CampusIQ ROI: students placed in remedial intervention plans improve attendance to >82% and clear backlogs.",
    expectedAtRisk: "7%",
    expectedAvgScore: "79.8",
  },
];

export function generateScenarioCohort(scenarioId: ScenarioInfo["id"]): {
  students: StudentProfile[];
  scenarioName: string;
} {
  if (scenarioId === "baseline") {
    return {
      students: initialStudents,
      scenarioName: "Balanced Campus Baseline (600 Students)",
    };
  }

  const modified: StudentProfile[] = initialStudents.map((orig, idx) => {
    // Clone original
    const s: StudentProfile = { ...orig };

    if (scenarioId === "crisis") {
      // Create crisis condition: lower attendance and higher backlogs in 40% of cohort
      if (idx % 3 === 0 || idx % 5 === 0) {
        s.attendance_pct = Math.max(52.0, Math.round((s.attendance_pct - 22.0) * 10) / 10);
        s.active_backlogs = Math.min(5, (s.active_backlogs || 0) + (idx % 2 === 0 ? 2 : 1));
        s.cgpa = Math.max(4.2, Math.round((s.cgpa - 1.1) * 100) / 100);
        s.assignment_completion_pct = Math.max(45, s.assignment_completion_pct - 25);
        s.lms_logins_per_week = Math.max(1, s.lms_logins_per_week - 4);
      } else {
        s.attendance_pct = Math.max(68.0, s.attendance_pct - 5);
      }
    } else if (scenarioId === "placement") {
      // Boost placement metrics for final-year / senior students
      if (s.semester >= 5 || idx % 2 === 0) {
        s.coding_score = Math.min(98.0, Math.round((s.coding_score + 26.0) * 10) / 10);
        s.aptitude_score = Math.min(95.0, Math.round((s.aptitude_score + 22.0) * 10) / 10);
        s.mock_interview_rating = Math.min(5.0, Math.round((s.mock_interview_rating + 1.2) * 10) / 10);
        s.certifications_count = Math.min(6, (s.certifications_count || 1) + 2);
        s.active_backlogs = 0; // cleared for placement drive
      }
    } else if (scenarioId === "recovery") {
      // At-risk students recovered after faculty intervention
      if (s.success_score < 60 || (s.active_backlogs && s.active_backlogs > 0)) {
        s.attendance_pct = Math.min(94.0, Math.round((s.attendance_pct + 18.0) * 10) / 10);
        s.active_backlogs = 0;
        s.assignment_completion_pct = Math.min(92.0, s.assignment_completion_pct + 25);
        s.lms_logins_per_week = Math.min(18, s.lms_logins_per_week + 6);
        s.faculty_sentiment = 0.85;
      }
    }

    // Recompute Success Score and Risk Classification with deterministic formula
    const calculated = calculateStudentSuccessScore(s);
    return {
      ...s,
      success_score: calculated.success_score,
      overall_tier: calculated.overall_tier,
      risk_flags: calculated.risk_flags,
      explainability_drivers: calculated.explainability_drivers,
      prescriptive_actions: calculated.prescriptive_actions,
      radar_metrics: calculated.radar_metrics,
      segment: calculated.segment,
    };
  });

  const scenarioMeta = SCENARIO_PRESETS.find((p) => p.id === scenarioId);
  const scenarioName = scenarioMeta
    ? `${scenarioMeta.label} (${scenarioMeta.badge})`
    : "Custom Scenario Cohort";

  return {
    students: modified,
    scenarioName,
  };
}
