export interface StudentProfile {
  student_id: string;
  name: string;
  department: string;
  semester: number;
  
  // 1. Academic
  cgpa: number;
  active_backlogs: number;
  sgpa_trend: number;
  
  // 2. Attendance
  attendance_pct: number;
  
  // 3. LMS
  lms_logins_per_week: number;
  assignment_completion_pct: number;
  
  // 4. Placement
  coding_score: number;
  aptitude_score: number;
  mock_interview_rating: number;
  
  // 5. Skills
  soft_skills_rating: number;
  certifications_count: number;
  
  // 6. Extracurricular
  hackathons_participated: number;
  clubs_count: number;
  
  // 7. Feedback
  faculty_sentiment: number;
  archetype_hint?: string;
  
  // Computed Properties
  success_score: number;
  overall_tier: "Thriving" | "Moderate Risk" | "High Risk";
  risk_flags: {
    academic: {
      status: "LOW" | "MEDIUM" | "HIGH";
      triggers: string[];
    };
    placement: {
      status: "LOW" | "MEDIUM" | "HIGH";
      triggers: string[];
    };
    disengagement: {
      status: "LOW" | "MEDIUM" | "HIGH";
      triggers: string[];
    };
  };
  explainability_drivers: ExplainabilityDriver[];
  prescriptive_actions: PrescriptiveAction[];
  radar_metrics: {
    academic: number;
    attendance: number;
    lms: number;
    placement: number;
    skills: number;
    engagement: number;
    feedback: number;
  };
  segment: StudentSegment;
}

export interface ExplainabilityDriver {
  factor: string;
  weight: number;
  value: string;
  contribution: number; // positive or negative points
}

export interface PrescriptiveAction {
  id: string;
  type: "ATTENDANCE_WARNING" | "PLACEMENT_BOOTCAMP" | "REMEDIAL_ACADEMIC" | "LMS_NUDGE" | "COUNSELOR_MEETING";
  title: string;
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  assigned_to: string;
  details: string;
  status: "Pending" | "In Progress" | "Completed";
  created_at?: string;
}

export interface StudentSegment {
  cluster_id: number;
  name: string;
  tagline: string;
  color: string;
  strategy: string;
}

export interface CampusStats {
  totalStudents: number;
  averageScore: number;
  highRiskCount: number;
  moderateRiskCount: number;
  thrivingCount: number;
  academicRiskCount: number;
  placementRiskCount: number;
  disengagementRiskCount: number;
  averageAttendance: number;
  averageCgpa: number;
  averagePlacementReadiness: number;
}

export type ExecutiveRoleType = "Dean" | "Principal" | "Director" | "Vice Chancellor" | "Head of Department";

export interface InstitutionProfile {
  institutionName: string;
  institutionShortName: string;
  executiveRole: ExecutiveRoleType;
  executiveTitle: string;
  executiveName: string;
  signatoryCommittee: string;
  secondSignatoryName: string;
  secondSignatoryTitle: string;
  accreditationNorm: string;
  iqacUnit: string;
}

export const DEFAULT_INSTITUTION_PROFILE: InstitutionProfile = {
  institutionName: "Apex Institute of Advanced Technology",
  institutionShortName: "Apex Tech",
  executiveRole: "Dean",
  executiveTitle: "Dean of Academic Affairs",
  executiveName: "Dr. Arthur Vance, Ph.D.",
  signatoryCommittee: "Academic Senate Review Committee",
  secondSignatoryName: "Prof. M. K. Sundaram",
  secondSignatoryTitle: "Director, Quality Assurance (IQAC)",
  accreditationNorm: "UGC / NBA Tier-1 Compliance",
  iqacUnit: "Institutional Quality Assurance Cell (IQAC)",
};
