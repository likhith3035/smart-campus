/**
 * Smart Schema Mapping & Fuzzy Header Detection Engine
 * Adapts to ANY collegiate CSV or Excel format (Roll No, USN, Marks %, Arrears, etc.)
 */

export interface SchemaFieldDef {
  key: string;
  label: string;
  description: string;
  required: boolean;
  aliases: string[];
  defaultValue: any;
  category: "Identity" | "Academics" | "Attendance" | "Placement" | "LMS" | "Holistic";
}

export const TARGET_SCHEMA_FIELDS: SchemaFieldDef[] = [
  {
    key: "student_id",
    label: "Student ID / Roll No",
    description: "Unique institutional identifier (USN, Roll No, Reg No, Sno)",
    required: true,
    aliases: ["student_id", "id", "rollno", "roll_no", "roll number", "roll", "reg_no", "regno", "registration_no", "registration", "usn", "sno", "s_no", "sr_no", "hallticket", "hall_ticket", "admission_no", "enrollment_no", "enrollment", "stud_id"],
    defaultValue: (idx: number) => `STU-${String(idx + 1).padStart(4, "0")}`,
    category: "Identity",
  },
  {
    key: "name",
    label: "Student Name",
    description: "Full student or candidate name",
    required: true,
    aliases: ["name", "student_name", "studentname", "full_name", "fullname", "candidate", "candidate_name", "student", "first_name", "name of student", "stud_name"],
    defaultValue: (idx: number) => `Student ${idx + 1}`,
    category: "Identity",
  },
  {
    key: "department",
    label: "Department / Branch",
    description: "Academic discipline (CSE, IT, ECE, MECH, etc.)",
    required: false,
    aliases: ["department", "dept", "branch", "stream", "course", "program", "specialization", "field", "degree", "discipline"],
    defaultValue: () => "Computer Science & Engineering",
    category: "Identity",
  },
  {
    key: "semester",
    label: "Semester / Year",
    description: "Current academic progression (Semester 1 to 8 or Year 1 to 4)",
    required: false,
    aliases: ["semester", "sem", "class", "year", "standard", "term", "academic_year", "curr_sem"],
    defaultValue: () => 6,
    category: "Identity",
  },
  {
    key: "cgpa",
    label: "Academic Marks / CGPA / %",
    description: "GPA on 10-point scale or percentage marks on 100-point scale",
    required: true,
    aliases: ["cgpa", "gpa", "percentage", "percent", "marks", "score", "total_marks", "aggregate", "sgpa", "avg_marks", "academic_score", "academic_marks", "grade", "aggregate_percentage"],
    defaultValue: () => 7.0,
    category: "Academics",
  },
  {
    key: "active_backlogs",
    label: "Active Backlogs / Arrears",
    description: "Current failed subjects requiring clearance",
    required: false,
    aliases: ["active_backlogs", "backlogs", "backlog", "arrears", "arrear", "fails", "bl", "supply", "supplies", "pending_backlogs", "arrear_count", "failed_subjects", "standing_arrears"],
    defaultValue: () => 0,
    category: "Academics",
  },
  {
    key: "attendance_pct",
    label: "Attendance %",
    description: "Classroom / lecture presence percentage (0-100%)",
    required: true,
    aliases: ["attendance_pct", "attendance", "attd", "attd_pct", "present_pct", "presence", "attendance_percentage", "pct_attendance", "total_attendance", "attendance%"],
    defaultValue: () => 78.0,
    category: "Attendance",
  },
  {
    key: "coding_score",
    label: "Coding / Technical Score",
    description: "Benchmark test, LeetCode percentile, or lab coding score (0-100)",
    required: false,
    aliases: ["coding_score", "coding", "leetcode", "hackerrank", "dsa", "programming", "technical_score", "code_score", "tech_score", "lab_marks", "practical_score", "coding_marks"],
    defaultValue: () => 50.0,
    category: "Placement",
  },
  {
    key: "aptitude_score",
    label: "Placement Aptitude Score",
    description: "Quantitative, logical, and verbal assessment percentile (0-100)",
    required: false,
    aliases: ["aptitude_score", "aptitude", "apt", "reasoning", "gate_score", "placement_test", "quant", "verbal", "apt_score", "test_score"],
    defaultValue: () => 55.0,
    category: "Placement",
  },
  {
    key: "mock_interview_rating",
    label: "Mock Interview Rating",
    description: "Interview performance rating (1 to 5 scale)",
    required: false,
    aliases: ["mock_interview_rating", "mock_interview", "interview", "interview_rating", "interview_score", "hr_score", "mock_score", "viva_score", "mock_rating"],
    defaultValue: () => 3.2,
    category: "Placement",
  },
  {
    key: "soft_skills_rating",
    label: "Soft Skills Rating",
    description: "Communication and interpersonal skills rating (1 to 10 scale)",
    required: false,
    aliases: ["soft_skills_rating", "soft_skills", "communication", "softskills", "personality", "speaking_score", "comm_skills", "soft_skill_score"],
    defaultValue: () => 6.5,
    category: "Placement",
  },
  {
    key: "certifications_count",
    label: "Certifications Count",
    description: "Verified NPTEL, Coursera, AWS, or cloud credentials completed",
    required: false,
    aliases: ["certifications_count", "certifications", "certs", "certificates", "courses_completed", "nptel", "coursera", "certification_count", "certs_count"],
    defaultValue: () => 1,
    category: "Placement",
  },
  {
    key: "hackathons_participated",
    label: "Hackathons / Projects",
    description: "Major hackathons, competitions, or capstone projects completed",
    required: false,
    aliases: ["hackathons_participated", "hackathons", "hackathon", "projects", "competitions", "events", "hackathon_count", "project_count"],
    defaultValue: () => 0,
    category: "Holistic",
  },
  {
    key: "clubs_count",
    label: "Clubs & Extracurriculars",
    description: "Active technical society, cultural club, or sports memberships",
    required: false,
    aliases: ["clubs_count", "clubs", "club", "societies", "extracurricular", "activities", "sports", "club_memberships"],
    defaultValue: () => 1,
    category: "Holistic",
  },
  {
    key: "faculty_sentiment",
    label: "Faculty Remarks / Sentiment",
    description: "Mentor assessment score (0.0 to 1.0 scale)",
    required: false,
    aliases: ["faculty_sentiment", "faculty_feedback", "feedback", "sentiment", "remarks", "behavior", "conduct", "mentor_rating", "faculty_score"],
    defaultValue: () => 0.7,
    category: "Holistic",
  },
  {
    key: "lms_logins_per_week",
    label: "LMS Weekly Logins",
    description: "Average weekly LMS / Moodle portal logins",
    required: false,
    aliases: ["lms_logins_per_week", "lms_logins", "lms_activity", "logins", "portal_logins", "portal_visits", "lms_access", "weekly_logins"],
    defaultValue: () => 6,
    category: "LMS",
  },
  {
    key: "assignment_completion_pct",
    label: "Assignment Completion %",
    description: "Percentage of LMS assignments submitted on time (0-100%)",
    required: false,
    aliases: ["assignment_completion_pct", "assignment_completion", "assignments", "tasks_completed", "homework", "submission_rate", "assignment_pct"],
    defaultValue: () => 75.0,
    category: "LMS",
  },
];

/**
 * Normalizes a raw column header string for robust fuzzy comparison
 */
export function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * Calculates string similarity score between two strings (0.0 to 1.0)
 */
function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1.0;
  if (str1.includes(str2) || str2.includes(str1)) return 0.85;
  return 0.0;
}

export interface DetectedMapping {
  targetKey: string;
  detectedUserColumn: string | null;
  confidence: "EXACT" | "HIGH" | "MEDIUM" | "UNMAPPED";
  matchedAlias?: string;
}

/**
 * Automatically maps user columns to target schema using fuzzy alias matching
 */
export function autoDetectSchemaMapping(userHeaders: string[]): Record<string, string | null> {
  const normalizedUserHeaders = userHeaders.map((h) => ({
    original: h,
    normalized: normalizeHeader(h),
  }));

  const mapping: Record<string, string | null> = {};
  const usedUserColumns = new Set<string>();

  // Pass 1: Exact alias matches
  TARGET_SCHEMA_FIELDS.forEach((field) => {
    let bestMatch: string | null = null;

    for (const userHeader of normalizedUserHeaders) {
      if (usedUserColumns.has(userHeader.original)) continue;

      if (field.aliases.includes(userHeader.normalized)) {
        bestMatch = userHeader.original;
        break;
      }
    }

    if (bestMatch) {
      mapping[field.key] = bestMatch;
      usedUserColumns.add(bestMatch);
    }
  });

  // Pass 2: Substring & Partial matches for unmapped fields
  TARGET_SCHEMA_FIELDS.forEach((field) => {
    if (mapping[field.key]) return;

    let bestMatch: string | null = null;
    let highestScore = 0;

    for (const userHeader of normalizedUserHeaders) {
      if (usedUserColumns.has(userHeader.original)) continue;

      for (const alias of field.aliases) {
        const score = calculateSimilarity(userHeader.normalized, alias);
        if (score > highestScore && score >= 0.7) {
          highestScore = score;
          bestMatch = userHeader.original;
        }
      }
    }

    if (bestMatch) {
      mapping[field.key] = bestMatch;
      usedUserColumns.add(bestMatch);
    } else {
      mapping[field.key] = null;
    }
  });

  return mapping;
}

/**
 * Normalizes numerical values from raw user formats
 */
export function sanitizeAndNormalizeValue(
  targetKey: string,
  rawValue: any,
  rowIndex: number
): any {
  if (rawValue === undefined || rawValue === null || String(rawValue).trim() === "") {
    const fieldDef = TARGET_SCHEMA_FIELDS.find((f) => f.key === targetKey);
    return fieldDef ? fieldDef.defaultValue(rowIndex) : 0;
  }

  const str = String(rawValue).trim().replace(/[%/]/g, "");
  const num = parseFloat(str);

  switch (targetKey) {
    case "student_id":
      return String(rawValue).trim() || `STU-${String(rowIndex + 1).padStart(4, "0")}`;

    case "name":
      return String(rawValue).trim() || `Student ${rowIndex + 1}`;

    case "department": {
      const dept = String(rawValue).trim();
      const lower = dept.toLowerCase();
      if (lower.includes("cse") || lower.includes("computer")) return "Computer Science & Engineering";
      if (lower.includes("it") || lower.includes("information")) return "Information Technology";
      if (lower.includes("ece") || lower.includes("electronics") || lower.includes("comm")) return "Electronics & Communication";
      if (lower.includes("ai") || lower.includes("data science") || lower.includes("ds")) return "Data Science & AI";
      if (lower.includes("mech") || lower.includes("mechanical")) return "Mechanical Engineering";
      return dept || "Computer Science & Engineering";
    }

    case "semester": {
      const val = parseInt(str, 10);
      if (isNaN(val)) return 6;
      // If year is provided (1, 2, 3, 4), convert to approximate semester (2, 4, 6, 8)
      if (val >= 1 && val <= 4) return val * 2;
      return Math.min(8, Math.max(1, val));
    }

    case "cgpa": {
      if (isNaN(num)) return 7.0;
      // If marks or percentage (e.g. 75, 88.5), scale to 10-point CGPA
      if (num > 10.0 && num <= 100.0) {
        return Math.min(10.0, Math.max(0.0, +(num / 10.0).toFixed(2)));
      }
      return Math.min(10.0, Math.max(0.0, +num.toFixed(2)));
    }

    case "attendance_pct": {
      if (isNaN(num)) return 78.0;
      // If given as fraction 0.0 - 1.0 (e.g. 0.85)
      if (num >= 0.0 && num <= 1.0 && str.includes(".")) {
        return +(num * 100).toFixed(1);
      }
      return Math.min(100.0, Math.max(0.0, +num.toFixed(1)));
    }

    case "active_backlogs":
      return isNaN(parseInt(str, 10)) ? 0 : Math.max(0, parseInt(str, 10));

    case "coding_score":
    case "aptitude_score":
    case "assignment_completion_pct":
      return isNaN(num) ? 50.0 : Math.min(100.0, Math.max(0.0, +num.toFixed(1)));

    case "mock_interview_rating": {
      if (isNaN(num)) return 3.2;
      // If on 10-point scale, divide by 2
      if (num > 5.0 && num <= 10.0) return +(num / 2.0).toFixed(1);
      return Math.min(5.0, Math.max(1.0, +num.toFixed(1)));
    }

    case "soft_skills_rating":
      return isNaN(num) ? 6.5 : Math.min(10.0, Math.max(1.0, +num.toFixed(1)));

    case "certifications_count":
    case "hackathons_participated":
    case "clubs_count":
    case "lms_logins_per_week":
      return isNaN(parseInt(str, 10)) ? 0 : Math.max(0, parseInt(str, 10));

    case "faculty_sentiment": {
      if (isNaN(num)) return 0.7;
      if (num > 1.0 && num <= 5.0) return +(num / 5.0).toFixed(2);
      if (num > 5.0 && num <= 100.0) return +(num / 100.0).toFixed(2);
      return Math.min(1.0, Math.max(0.0, +num.toFixed(2)));
    }

    default:
      return rawValue;
  }
}

/**
 * Calculates adaptive dynamic pillar weights based on which fields the user mapped
 */
export function getAdaptiveWeights(mappedKeys: string[]): {
  academic: number;
  placement: number;
  attendance: number;
  lms: number;
  skills: number;
  extracurricular: number;
  feedback: number;
} {
  const baseWeights: Record<string, number> = {
    academic: 0.30,
    placement: 0.20,
    attendance: 0.15,
    lms: mappedKeys.includes("lms_logins_per_week") || mappedKeys.includes("assignment_completion_pct") ? 0.15 : 0.0,
    skills: mappedKeys.includes("certifications_count") || mappedKeys.includes("soft_skills_rating") ? 0.10 : 0.0,
    extracurricular: mappedKeys.includes("hackathons_participated") || mappedKeys.includes("clubs_count") ? 0.05 : 0.0,
    feedback: mappedKeys.includes("faculty_sentiment") ? 0.05 : 0.0,
  };

  const total = Object.values(baseWeights).reduce((a, b) => a + b, 0);

  return {
    academic: +(baseWeights.academic / total).toFixed(3),
    placement: +(baseWeights.placement / total).toFixed(3),
    attendance: +(baseWeights.attendance / total).toFixed(3),
    lms: +(baseWeights.lms / total).toFixed(3),
    skills: +(baseWeights.skills / total).toFixed(3),
    extracurricular: +(baseWeights.extracurricular / total).toFixed(3),
    feedback: +(baseWeights.feedback / total).toFixed(3),
  };
}
