import rawStudentsData from "./data/students-dataset.json";
import { StudentProfile, CampusStats } from "./types";

export const initialStudents: StudentProfile[] = rawStudentsData as unknown as StudentProfile[];

export function getCampusStats(students: StudentProfile[]): CampusStats {
  const total = students.length;
  if (total === 0) {
    return {
      totalStudents: 0,
      averageScore: 0,
      highRiskCount: 0,
      moderateRiskCount: 0,
      thrivingCount: 0,
      academicRiskCount: 0,
      placementRiskCount: 0,
      disengagementRiskCount: 0,
      averageAttendance: 0,
      averageCgpa: 0,
      averagePlacementReadiness: 0,
    };
  }

  let totalScore = 0;
  let totalAttd = 0;
  let totalCgpa = 0;
  let totalCoding = 0;
  let highRisk = 0;
  let modRisk = 0;
  let thriving = 0;
  let acadRisk = 0;
  let placeRisk = 0;
  let disengageRisk = 0;

  students.forEach((s) => {
    totalScore += s.success_score;
    totalAttd += s.attendance_pct;
    totalCgpa += s.cgpa;
    totalCoding += s.coding_score;

    if (s.overall_tier === "High Risk") highRisk++;
    else if (s.overall_tier === "Moderate Risk") modRisk++;
    else thriving++;

    if (s.risk_flags.academic.status === "HIGH") acadRisk++;
    if (s.risk_flags.placement.status === "HIGH") placeRisk++;
    if (s.risk_flags.disengagement.status === "HIGH") disengageRisk++;
  });

  return {
    totalStudents: total,
    averageScore: Math.round((totalScore / total) * 10) / 10,
    highRiskCount: highRisk,
    moderateRiskCount: modRisk,
    thrivingCount: thriving,
    academicRiskCount: acadRisk,
    placementRiskCount: placeRisk,
    disengagementRiskCount: disengageRisk,
    averageAttendance: Math.round((totalAttd / total) * 10) / 10,
    averageCgpa: Math.round((totalCgpa / total) * 100) / 100,
    averagePlacementReadiness: Math.round((totalCoding / total) * 10) / 10,
  };
}

export function filterStudents(
  students: StudentProfile[],
  filters: {
    department?: string;
    semester?: number | "all";
    riskTier?: string;
    segmentName?: string;
    searchQuery?: string;
  }
): StudentProfile[] {
  return students.filter((s) => {
    if (filters.department && filters.department !== "all" && s.department !== filters.department) {
      return false;
    }
    if (filters.semester && filters.semester !== "all" && s.semester !== Number(filters.semester)) {
      return false;
    }
    if (filters.riskTier && filters.riskTier !== "all" && s.overall_tier !== filters.riskTier) {
      return false;
    }
    if (filters.segmentName && filters.segmentName !== "all" && s.segment.name !== filters.segmentName) {
      return false;
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchId = s.student_id.toLowerCase().includes(q);
      const matchDept = s.department.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchDept) return false;
    }
    return true;
  });
}
