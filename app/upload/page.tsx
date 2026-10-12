"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { calculateStudentSuccessScore } from "@/lib/scoring";
import { StudentProfile } from "@/lib/types";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { StudentModal } from "@/components/dashboard/StudentModal";
import {
  TARGET_SCHEMA_FIELDS,
  autoDetectSchemaMapping,
  sanitizeAndNormalizeValue,
  getAdaptiveWeights,
} from "@/lib/schemaMapper";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Eye,
  Info,
  Check,
  HelpCircle,
  Clipboard,
  Copy,
  Sparkles,
  Code2,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { useStudentData } from "@/components/context/StudentDataContext";

type UploadStep = "upload" | "verify" | "dashboard";
type InputMode = "paste" | "file" | "prompt";

const NBKRIST_SAMPLE_CSV = `roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct
NBK001,Likhith kami,Computer Science & Engineering,6,6.2,72.5,2,85,68,74
NBK002,srinivas pulikonda,Information Technology,6,9.1,88.0,0,35,82,96
NBK003,chaitanya karnam,Electronics & Communication,6,7.4,64.2,1,78,71,69
NBK004,Sneha Kapoor,Data Science & AI,6,5.8,70.1,3,92,55,61
NBK005,Vikram Singh,Mechanical Engineering,6,8.9,91.3,0,28,77,93
NBK006,Priya Nair,Computer Science & Engineering,6,7.6,82.4,0,67,80,88
NBK007,Karan Joshi,Information Technology,6,6.5,74.0,2,83,62,72
NBK008,Meera Iyer,Electronics & Communication,6,9.4,95.2,0,22,85,97`;

// 14-student sample WITHOUT headers (tests automatic header injection)
const NBKRIST_14_HEADERLESS_SAMPLE = `NBK012,deepak muppala,Information Technology,6,9.6,92.7,0,31,88,95
NBK013,Aryan Gupta,Electronics & Communication,6,7.0,71.0,2,76,60,73
NBK014,Ishita Malhotra,Data Science & AI,6,6.0,69.8,3,88,57,65
NBK015,Manoj Pillai,Mechanical Engineering,6,8.5,85.6,0,40,79,90
NBK016,Divya Sharma,Computer Science & Engineering,6,9.2,94.1,0,36,83,98
NBK017,Aditya Menon,Information Technology,6,5.5,66.4,2,84,52,63
NBK018,harshanth duvvuru,Electronics & Communication,6,7.8,80.2,0,72,75,87
NBK019,Nikhil Jain,Data Science & AI,6,6.3,74.5,1,86,61,71
NBK020,Kavya Ramesh,Mechanical Engineering,6,9.0,90.8,0,29,81,94
NBK021,Saurabh Mishra,Computer Science & Engineering,6,5.0,67.2,3,91,50,60
NBK022,Pooja Agarwal,Information Technology,6,8.7,89.5,0,38,78,92
NBK023,Harsh Vardhan,Electronics & Communication,6,6.7,72.0,2,82,63,68
NBK024,Tanya Singh,Data Science & AI,6,9.5,96.4,0,25,86,99
NBK025,Rajat Khanna,Mechanical Engineering,6,5.9,70.7,1,87,56,66.`;

/**
 * Intelligent Header Detector
 * Returns false if line 1 contains actual student records (numeric CGPA, attendance, roll IDs, etc.)
 */
function isLikelyHeaderRow(cells: string[]): boolean {
  if (!cells || cells.length === 0) return false;

  const headerKeywords = [
    "roll", "id", "usn", "reg", "sno", "hall",
    "name", "student", "candidate",
    "branch", "dept", "department", "stream", "course",
    "sem", "semester", "year", "class",
    "cgpa", "gpa", "marks", "score", "percent", "grade",
    "attend", "attendance", "absent", "present",
    "backlog", "arrear", "arrears",
    "code", "coding", "aptitude", "assign", "assignment", "lms"
  ];

  let keywordMatches = 0;
  let numericValues = 0;

  for (const raw of cells) {
    const val = raw.trim().toLowerCase();
    // Check if numeric (numbers like 6, 9.6, 92.7 are NOT headers)
    if (!isNaN(Number(val)) && val !== "") {
      numericValues++;
    }
    // Check keyword match
    if (headerKeywords.some((kw) => val.includes(kw))) {
      keywordMatches++;
    }
  }

  // If there are multiple numeric values, it's definitely a student data row!
  if (numericValues >= 2) {
    return false;
  }

  // If at least 2 header keywords matched, it's a genuine header row
  if (keywordMatches >= 2) {
    return true;
  }

  // If 1 keyword matched and 0 numbers, likely header
  if (keywordMatches >= 1 && numericValues === 0) {
    return true;
  }

  return false;
}

export default function DataIntegrationPage() {
  const { setUploadedCohort, isCustomDataset, resetToDemoData } = useStudentData();
  const [currentStep, setCurrentStep] = useState<UploadStep>("upload");
  const [inputMode, setInputMode] = useState<InputMode>("paste");

  // File metadata
  const [fileName, setFileName] = useState<string>("");
  const [fileSizeStr, setFileSizeStr] = useState<string>("");

  // Raw file / text parsed data
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, any>[]>([]);
  const [previewLimit, setPreviewLimit] = useState<number | "all">(5);

  // Raw text area state
  const [pastedText, setPastedText] = useState<string>("");

  // AI Prompt Studio & Synthetic Generator state
  const [collegeName, setCollegeName] = useState("National Institute of Technology");
  const [studentCount, setStudentCount] = useState(50);
  const [riskMix, setRiskMix] = useState<"realistic" | "high" | "thriving">("realistic");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Schema Mapping State: targetKey -> userColumnName (or null)
  const [columnMapping, setColumnMapping] = useState<Record<string, string | null>>({});

  // Processed Students
  const [processedStudents, setProcessedStudents] = useState<StudentProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Error/Status message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoInjectedNotice, setAutoInjectedNotice] = useState<string | null>(null);

  /**
   * Universal Sanitizer & Parser for Raw CSV / Text Input
   * Handles trailing periods, spaces, tab/comma delimiters, and headerless student data.
   */
  const handleRawCsvText = (text: string, sourceName: string = "Pasted_Student_Records.csv") => {
    setErrorMessage(null);
    setAutoInjectedNotice(null);

    if (!text || text.trim().length === 0) {
      setErrorMessage("Please paste or enter student data records before parsing.");
      return;
    }

    try {
      // 1. Sanitize lines: trim whitespace, filter empty lines, remove trailing punctuation (e.g. "66.")
      const rawLines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .map((l) => {
          let line = l.replace(/[\s\.;]+$/, ""); // Strip trailing periods, semicolons, extra spaces
          // If tab-delimited (copied from Excel), convert tabs to commas
          if (line.includes("\t") && !line.includes(",")) {
            line = line.replace(/\t+/g, ",");
          } else if (line.includes(";") && !line.includes(",")) {
            line = line.replace(/;+/g, ",");
          } else if (line.includes("|") && !line.includes(",")) {
            line = line.replace(/\|+/g, ",");
          }
          return line;
        });

      if (rawLines.length === 0) {
        setErrorMessage("Please enter at least one student data row.");
        return;
      }

      // 2. Check if Line 1 is a Header Row or a Student Data Row
      const firstLineCells = rawLines[0].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
      const isHeader = isLikelyHeaderRow(firstLineCells);

      let processedLines = [...rawLines];

      if (!isHeader) {
        // Line 1 is actual student data! (e.g., "NBK012,deepak muppala,...")
        // Automatically inject canonical column headers so student #1 is NEVER lost!
        const colCount = firstLineCells.length;
        let generatedHeader = "";

        if (colCount >= 10) {
          generatedHeader = "roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct";
        } else if (colCount === 9) {
          generatedHeader = "roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score";
        } else if (colCount === 8) {
          generatedHeader = "roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score";
        } else if (colCount === 7) {
          generatedHeader = "roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs";
        } else if (colCount === 6) {
          generatedHeader = "roll_no,student_name,branch,cgpa,attendance_pct,active_backlogs";
        } else if (colCount === 5) {
          generatedHeader = "roll_no,student_name,cgpa,attendance_pct,active_backlogs";
        } else {
          generatedHeader = Array.from({ length: colCount }, (_, idx) => `col_${idx + 1}`).join(",");
        }

        processedLines = [generatedHeader, ...rawLines];
        const student1Name = firstLineCells[1] || firstLineCells[0];
        setAutoInjectedNotice(
          `✨ Headerless data detected: CampusIQ automatically injected 10 column headers ("${generatedHeader}") so student #1 (${student1Name}) is preserved as a valid record!`
        );
      }

      const cleanCsvString = processedLines.join("\n");

      // 3. Parse using SheetJS string reader
      const workbook = XLSX.read(cleanCsvString, { type: "string" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        defval: "",
        raw: false,
      });

      if (!jsonData || jsonData.length === 0) {
        setErrorMessage("Could not parse student records. Please ensure lines are separated by commas (CSV) or tabs.");
        return;
      }

      // Extract unique headers
      const headers = Object.keys(jsonData[0] || {});
      if (headers.length === 0) {
        setErrorMessage("Could not detect any column headers in the parsed text.");
        return;
      }

      setFileName(sourceName);
      setFileSizeStr(`${(new Blob([cleanCsvString]).size / 1024).toFixed(1)} KB (${jsonData.length} students)`);
      setRawHeaders(headers);
      setRawRows(jsonData);

      // Auto-detect schema mapping
      const detected = autoDetectSchemaMapping(headers);
      setColumnMapping(detected);

      // Move to verification step
      setCurrentStep("verify");
    } catch (err: any) {
      console.error("Error parsing raw text:", err);
      setErrorMessage("Failed to parse text. Please ensure lines follow standard CSV or TSV format.");
    }
  };

  /**
   * Reads either CSV or Excel file (.xlsx, .xls) using XLSX library
   */
  const handleFile = async (file: File) => {
    setErrorMessage(null);
    setFileName(file.name);
    setFileSizeStr((file.size / 1024).toFixed(1) + " KB");

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        defval: "",
        raw: false,
      });

      if (!jsonData || jsonData.length === 0) {
        setErrorMessage("The uploaded file appears to be empty. Please upload a file with headers and student records.");
        return;
      }

      const headers = Object.keys(jsonData[0] || {});
      if (headers.length === 0) {
        setErrorMessage("Could not detect any column headers in the uploaded file.");
        return;
      }

      setRawHeaders(headers);
      setRawRows(jsonData);

      const detected = autoDetectSchemaMapping(headers);
      setColumnMapping(detected);

      setCurrentStep("verify");
    } catch (err: any) {
      console.error("Error parsing file:", err);
      setErrorMessage("Failed to parse file. Please ensure it is a valid CSV or Excel (.xlsx, .xls) spreadsheet.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  /**
   * Synthetic CSV generator algorithm for in-browser creation
   */
  const generateSyntheticCsv = (name: string, count: number, mix: "realistic" | "high" | "thriving") => {
    const firstNames = [
      "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
      "Diya", "Saanvi", "Aanya", "Aadhya", "Pari", "Ananya", "Riya", "Kiara", "Ira", "Myra",
      "Rohan", "Rahul", "Varun", "Karan", "Kavya", "Pooja", "Neha", "Sneha", "Tanvi", "Nikhil",
      "Meera", "Farhan", "Bhavna", "Chirag", "Divya", "Gaurav", "Harsh", "Jaya", "Komal", "Lalit"
    ];
    const lastNames = [
      "Sharma", "Verma", "Patel", "Reddy", "Rao", "Nair", "Iyer", "Joshi", "Khan", "Singh",
      "Kumar", "Gupta", "Bhat", "Hegde", "Malhotra", "Singhania", "Chopra", "Deshmukh", "Menon", "Pillai"
    ];
    const branches = [
      "Computer Science & Engineering",
      "Information Technology",
      "Electronics & Communication",
      "Data Science & AI",
      "Mechanical Engineering",
    ];

    const rows: string[] = [];
    rows.push("roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct");

    const highRiskRatio = mix === "high" ? 0.40 : mix === "thriving" ? 0.05 : 0.18;

    for (let i = 1; i <= count; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const sName = `${fName} ${lName}`;
      const branch = branches[Math.floor(Math.random() * branches.length)];
      const roll = `2024-${branch.slice(0, 3).toUpperCase()}-${String(i).padStart(3, "0")}`;

      const isRisk = Math.random() < highRiskRatio;

      let cgpa: number;
      let attendance: number;
      let backlogs: number;
      let coding: number;
      let aptitude: number;
      let assignments: number;

      if (isRisk) {
        cgpa = +(4.8 + Math.random() * 1.8).toFixed(2);
        attendance = +(52.0 + Math.random() * 21.0).toFixed(1);
        backlogs = Math.floor(Math.random() * 3) + 1;
        coding = +(20.0 + Math.random() * 25.0).toFixed(0);
        aptitude = +(25.0 + Math.random() * 30.0).toFixed(0);
        assignments = +(40.0 + Math.random() * 25.0).toFixed(0);
      } else {
        const archetypeRoll = Math.random();
        if (archetypeRoll < 0.25) {
          cgpa = +(8.5 + Math.random() * 1.2).toFixed(2);
          attendance = +(85.0 + Math.random() * 12.0).toFixed(1);
          backlogs = 0;
          coding = +(25.0 + Math.random() * 20.0).toFixed(0);
          aptitude = +(60.0 + Math.random() * 30.0).toFixed(0);
          assignments = +(85.0 + Math.random() * 14.0).toFixed(0);
        } else if (archetypeRoll < 0.50) {
          cgpa = +(6.2 + Math.random() * 1.2).toFixed(2);
          attendance = +(74.0 + Math.random() * 15.0).toFixed(1);
          backlogs = Math.random() < 0.3 ? 1 : 0;
          coding = +(82.0 + Math.random() * 16.0).toFixed(0);
          aptitude = +(70.0 + Math.random() * 25.0).toFixed(0);
          assignments = +(65.0 + Math.random() * 20.0).toFixed(0);
        } else {
          cgpa = +(7.8 + Math.random() * 1.8).toFixed(2);
          attendance = +(82.0 + Math.random() * 15.0).toFixed(1);
          backlogs = 0;
          coding = +(65.0 + Math.random() * 30.0).toFixed(0);
          aptitude = +(65.0 + Math.random() * 30.0).toFixed(0);
          assignments = +(75.0 + Math.random() * 22.0).toFixed(0);
        }
      }

      rows.push(`"${roll}","${sName}","${branch}",6,${cgpa},${attendance},${backlogs},${coding},${aptitude},${assignments}`);
    }

    return rows.join("\n");
  };

  /**
   * 1-Click Ingest Synthetic Cohort Directly
   */
  const handleIngestSyntheticCohort = () => {
    const csvContent = generateSyntheticCsv(collegeName, studentCount, riskMix);
    handleRawCsvText(csvContent, `Synthetic_${collegeName.replace(/[^a-zA-Z0-9]/g, "_")}_${studentCount}.csv`);
  };

  /**
   * Download Synthetic CSV
   */
  const handleDownloadSyntheticCsv = () => {
    const csvContent = generateSyntheticCsv(collegeName, studentCount, riskMix);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `synthetic_${collegeName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${studentCount}_students.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Dynamic Prompt for LLMs
  const customPromptText = `Act as an Educational Data Scientist. Generate a realistic student cohort dataset in CSV format for "${collegeName}" containing exactly ${studentCount} students.

Format the output strictly as raw CSV text with the following headers:
roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct

Guidelines for realistic collegiate data:
1. Branches: Computer Science & Engineering, Information Technology, Electronics & Communication, Data Science & AI, Mechanical Engineering.
2. Semester: 6 (Pre-final year).
3. Realistic correlated distribution:
   - Roughly ${riskMix === "high" ? "40%" : riskMix === "thriving" ? "5%" : "18%"} of students should have attendance < 75% or active backlogs (1 to 3) to test early risk flags.
   - High coders (>80) can occasionally have lower CGPA (<6.5) to test the "Practical Builder" persona.
   - High CGPA students (>8.8) with low coding scores (<40) to test "The Scholar" persona.
   - CGPA should be between 4.5 and 9.8.
   - Attendance should be between 48.0% and 98.0%.
   - Active backlogs should be 0, 1, 2, or 3.
   - Coding score should be between 15 and 98.

Return ONLY the CSV text starting with the header line, no conversational text or markdown formatting so I can copy and paste directly into CampusIQ.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(customPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  /**
   * Prepends the standard 10-column header row if omitted
   */
  const handleInsertHeaderRow = () => {
    const standardHeader = "roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct";
    if (!pastedText.trim()) {
      setPastedText(standardHeader + "\n");
      return;
    }
    const firstLine = pastedText.trim().split(/\r?\n/)[0];
    const cells = firstLine.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
    if (isLikelyHeaderRow(cells)) {
      return;
    }
    setPastedText(standardHeader + "\n" + pastedText.trim());
  };

  /**
   * User modifies column mapping for a target field
   */
  const handleMappingChange = (targetKey: string, userCol: string) => {
    setColumnMapping((prev) => ({
      ...prev,
      [targetKey]: userCol === "__unmapped__" ? null : userCol,
    }));
  };

  /**
   * Process all student rows using confirmed column mappings and adaptive dynamic weights
   */
  const handleConfirmAndProcess = () => {
    try {
      const mappedTargetKeys = Object.entries(columnMapping)
        .filter(([_, userCol]) => userCol !== null)
        .map(([targetKey]) => targetKey);

      // Calculate dynamic adaptive weights based on which pillars exist
      const adaptiveWeights = getAdaptiveWeights(mappedTargetKeys);

      const parsed: StudentProfile[] = rawRows.map((row, index) => {
        const studentObj: Partial<StudentProfile> = {};

        // Populate fields from mapped user columns
        TARGET_SCHEMA_FIELDS.forEach((field) => {
          const mappedCol = columnMapping[field.key];
          const rawVal = mappedCol ? row[mappedCol] : undefined;
          const sanitizedVal = sanitizeAndNormalizeValue(field.key, rawVal, index);
          (studentObj as any)[field.key] = sanitizedVal;
        });

        // Compute success score, risk flags, XAI drivers, and prescriptive actions
        const scoreResult = calculateStudentSuccessScore(studentObj, adaptiveWeights);

        return {
          student_id: studentObj.student_id || `STU-${String(index + 1).padStart(4, "0")}`,
          name: studentObj.name || `Student ${index + 1}`,
          department: studentObj.department || "Computer Science & Engineering",
          semester: studentObj.semester || 6,
          cgpa: studentObj.cgpa || 7.0,
          active_backlogs: studentObj.active_backlogs || 0,
          sgpa_trend: 0.1,
          attendance_pct: studentObj.attendance_pct || 78.0,
          lms_logins_per_week: studentObj.lms_logins_per_week || 5,
          assignment_completion_pct: studentObj.assignment_completion_pct || 75.0,
          coding_score: studentObj.coding_score || 50.0,
          aptitude_score: studentObj.aptitude_score || 50.0,
          mock_interview_rating: studentObj.mock_interview_rating || 3.0,
          soft_skills_rating: studentObj.soft_skills_rating || 6.5,
          certifications_count: studentObj.certifications_count || 1,
          hackathons_participated: studentObj.hackathons_participated || 0,
          clubs_count: studentObj.clubs_count || 1,
          faculty_sentiment: studentObj.faculty_sentiment || 0.7,
          success_score: scoreResult.success_score,
          overall_tier: scoreResult.overall_tier,
          risk_flags: scoreResult.risk_flags,
          explainability_drivers: scoreResult.explainability_drivers,
          prescriptive_actions: scoreResult.prescriptive_actions,
          radar_metrics: scoreResult.radar_metrics,
          segment: scoreResult.segment,
        };
      });

      setProcessedStudents(parsed);
      setUploadedCohort(parsed, fileName || "Custom Ingested Dataset");
      setCurrentStep("dashboard");
    } catch (err: any) {
      console.error("Error processing students:", err);
      setErrorMessage("An error occurred during score calculation. Please verify your column mappings.");
    }
  };

  /**
   * Export the user's dataset enriched with S³ scores, risk tiers, and archetypes
   */
  const handleExportEnrichedData = () => {
    if (processedStudents.length === 0) return;

    const exportRows = processedStudents.map((s) => ({
      "Student ID": s.student_id,
      "Name": s.name,
      "Department": s.department,
      "Semester": s.semester,
      "CGPA": s.cgpa,
      "Active Backlogs": s.active_backlogs,
      "Attendance %": s.attendance_pct,
      "Coding Score": s.coding_score,
      "S3 Success Score": s.success_score,
      "Overall Risk Tier": s.overall_tier,
      "Academic Risk": s.risk_flags.academic.status,
      "Placement Risk": s.risk_flags.placement.status,
      "Attendance Risk": s.risk_flags.disengagement.status,
      "AI Archetype": s.segment.name,
      "Top Prescriptive Action": s.prescriptive_actions[0]?.title || "Continue current curriculum",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analyzed_Students");

    XLSX.writeFile(workbook, `campusiq_enriched_analytics_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Quick stats for processed cohort
  const totalCount = processedStudents.length;
  const highRiskCount = processedStudents.filter((s) => s.overall_tier === "High Risk").length;
  const avgScore = totalCount > 0 ? (processedStudents.reduce((a, b) => a + b.success_score, 0) / totalCount).toFixed(1) : "0";
  const placementReadyCount = processedStudents.filter((s) => s.coding_score >= 60 && s.cgpa >= 7.0 && s.active_backlogs === 0).length;

  // Count pasted lines & analyze whether headers are present
  const pastedRawLines = pastedText.trim() ? pastedText.trim().split(/\r?\n/).filter(Boolean) : [];
  const detectedLinesCount = pastedRawLines.length;
  const firstLineCellsPreview = pastedRawLines[0] ? pastedRawLines[0].split(",").map((c) => c.trim().replace(/^["']|["']$/g, "")) : [];
  const hasDetectedHeader = pastedRawLines.length > 0 && isLikelyHeaderRow(firstLineCellsPreview);
  const detectedStudentRecordCount = pastedRawLines.length === 0 ? 0 : hasDetectedHeader ? Math.max(0, pastedRawLines.length - 1) : pastedRawLines.length;

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        {/* ───────────────────────────────────────────────────────────
            HEADER
        ─────────────────────────────────────────────────────────── */}
        <div className="space-y-2">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
            [ UNIVERSAL INSTITUTIONAL DATA INGESTION & PROMPT STUDIO ]
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Flexible Multi-Format Data Ingestion & Schema Mapper
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-3xl leading-relaxed">
            Ingest student records via <strong>direct text paste</strong>, drag-and-drop spreadsheets (CSV / Excel), or generate synthetic cohorts using our integrated AI Prompt Studio. CampusIQ auto-detects headers, adapts weights, and generates full decision intelligence.
          </p>
        </div>

        {/* Progress Steps Header */}
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#EAE5DC] card-shadow text-xs overflow-x-auto scrollbar-none">
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
              currentStep === "upload" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
            }`}
          >
            <span>1. Ingest Data (Paste / Upload / Prompt)</span>
          </div>
          <span className="text-stone-300 shrink-0">→</span>
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
              currentStep === "verify" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
            }`}
          >
            <span>2. Verify Column Mappings</span>
          </div>
          <span className="text-stone-300 shrink-0">→</span>
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
              currentStep === "dashboard" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
            }`}
          >
            <span>3. Active Decision Cockpit</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            STEP 1: INGESTION MODES (PASTE / FILE / PROMPT STUDIO)
        ─────────────────────────────────────────────────────────── */}
        {currentStep === "upload" && (
          <div className="space-y-6">
            {/* 3-Way Mode Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200/80 w-fit">
              <button
                type="button"
                onClick={() => setInputMode("paste")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  inputMode === "paste"
                    ? "bg-white text-stone-900 shadow-2xs border border-stone-200/90"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <Clipboard className="w-3.5 h-3.5 text-blue-600" />
                <span>Paste Raw CSV Text</span>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">
                  Fast
                </span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode("file")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  inputMode === "file"
                    ? "bg-white text-stone-900 shadow-2xs border border-stone-200/90"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5 text-stone-600" />
                <span>Upload File (.csv / .xlsx)</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode("prompt")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  inputMode === "prompt"
                    ? "bg-white text-stone-900 shadow-2xs border border-stone-200/90"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Prompt & Generator Studio</span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-mono font-bold">
                  ChatGPT / Claude
                </span>
              </button>
            </div>

            {/* ─── MODE 1: PASTE RAW CSV TEXT ─── */}
            {inputMode === "paste" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-600" />
                      <span>Direct Raw Text / CSV Ingestion</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Paste comma-separated or tab-separated student records directly from your clipboard.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPastedText(NBKRIST_14_HEADERLESS_SAMPLE)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Load the 14-student cohort (NBK012 to NBK025) without headers to test automatic header injection!"
                    >
                      <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                      <span>⚡ Load 14 Students (Headerless Test)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPastedText(NBKRIST_SAMPLE_CSV)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Load the 8-student NBKRIST cohort with Likhith, Srinivas, etc. (with headers)"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>⚡ Load 8 Students (With Headers)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertHeaderRow}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Insert the standard 10-column header row at the top of your text"
                    >
                      <span>➕ Add Standard Header Row</span>
                    </button>

                    {pastedText && (
                      <button
                        type="button"
                        onClick={() => setPastedText("")}
                        className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium cursor-pointer transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Text Area */}
                <div className="space-y-2">
                  <div className="relative">
                    <textarea
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      placeholder={`roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct\nNBK001,Likhith kami,Computer Science & Engineering,6,6.2,72.5,2,85,68,74\nNBK002,srinivas pulikonda,Information Technology,6,9.1,88.0,0,35,82,96\n...`}
                      className="w-full h-72 sm:h-80 p-4 rounded-2xl bg-stone-900 text-emerald-400 font-mono text-xs leading-relaxed border border-stone-800 focus:outline-none focus:border-stone-700 shadow-inner resize-y placeholder:text-stone-600"
                    />
                  </div>

                  {/* Status Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 px-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span>
                        Detected: <strong>{detectedStudentRecordCount}</strong> student record{detectedStudentRecordCount === 1 ? "" : "s"}
                      </span>
                      {detectedLinesCount > 0 && (
                        <span className="font-mono text-[11px] text-stone-400">
                          ({detectedLinesCount} total lines)
                        </span>
                      )}

                      {pastedText.trim() && (
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          {hasDetectedHeader ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Valid Headers Detected ({firstLineCellsPreview.length} cols)</span>
                            </span>
                          ) : (
                            <span className="text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              <span>Auto-Header Active ({firstLineCellsPreview.length} cols) • Header will be auto-injected so student #1 is kept!</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-400">
                      Auto-sanitizes trailing periods, spaces & tabs
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRawCsvText(pastedText, "Pasted_Student_Cohort.csv")}
                    disabled={detectedStudentRecordCount === 0}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      detectedStudentRecordCount > 0
                        ? "bg-[#111827] hover:bg-black text-white cursor-pointer hover:scale-[1.02]"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    <span>⚡ Parse & Ingest Raw Text (Proceed to Verify)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── MODE 2: FILE UPLOAD DROPZONE ─── */}
            {inputMode === "file" && (
              <div className="space-y-6">
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="p-10 sm:p-14 rounded-3xl bg-white border-2 border-dashed border-[#D6D0C5] hover:border-stone-900 transition-all text-center flex flex-col items-center justify-center space-y-4 card-shadow"
                >
                  <div className="w-16 h-16 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-stone-900 shadow-xs">
                    <UploadCloud className="w-8 h-8 text-stone-700" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-[#111827]">
                      Drag and drop your Student Dataset file here
                    </h3>
                    <p className="text-xs text-[#78716C] max-w-md mx-auto">
                      Supports any <strong>.csv</strong> or Excel (<strong>.xlsx</strong>, <strong>.xls</strong>) file. No strict format required—our AI auto-maps your columns.
                    </p>
                  </div>

                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold cursor-pointer shadow-sm transition-all hover:scale-[1.02]">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Browse Local Files</span>
                      <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleInputChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Sample Templates Download Card */}
                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Don&apos;t have a file ready? Try sample datasets:</h4>
                      <p className="text-xs text-[#78716C]">Test our universal schema mapper with different college formats.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Option A: Standard Full KPMG */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827]">Standard Comprehensive Dataset</div>
                          <div className="text-[11px] text-stone-500">18 attributes • All 7 silos (600 rows)</div>
                        </div>
                      </div>
                      <a
                        href="/sample_campus_dataset.csv"
                        download="sample_campus_dataset.csv"
                        className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>

                    {/* Option B: Simple Alternative Format */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <SlidersHorizontal className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827]">Alternative College Dataset</div>
                          <div className="text-[11px] text-stone-500">Simple headers: roll_no, marks, arrears</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const sample = `roll_no,student_name,branch,class_year,percentage_marks,attendance_pct,arrears,coding_score\n2024-CSE-001,Aarav Patel,Computer Science,4,88.5,92.0,0,85\n2024-CSE-002,Bhavna Rao,Computer Science,4,62.0,68.5,2,35\n2024-ECE-105,Chirag Reddy,Electronics & Comm,3,74.5,81.0,0,45\n2024-IT-044,Divya Sharma,Information Tech,3,56.0,62.0,3,25\n2024-MECH-012,Farhan Khan,Mechanical Eng,4,69.0,79.0,1,30\n2024-AI-088,Ishita Nair,AI & Data Science,3,91.0,94.5,0,92\n2024-CSE-077,Karan Joshi,Computer Science,4,58.0,59.0,2,20\n2024-IT-102,Meera Iyer,Information Tech,3,84.0,88.0,0,78\n2024-CIVIL-015,Rohan Varma,Civil Engineering,3,71.0,76.0,1,40\n2024-BIOTECH-009,Ananya Sen,Biotechnology,4,86.0,91.0,0,65`;
                            const file = new File([sample], "custom_alternative_college.csv", { type: "text/csv" });
                            handleFile(file);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#111827] hover:bg-black text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                        >
                          <span>⚡ Test Load</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── MODE 3: AI PROMPT STUDIO & IN-BROWSER GENERATOR ─── */}
            {inputMode === "prompt" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-widest font-mono">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Dataset Prompt Generator for ChatGPT / Claude</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#111827] mt-1">
                      Generate Tailored Collegiate Test Data Instantly
                    </h3>
                    <p className="text-xs text-[#57534E] mt-0.5 max-w-2xl">
                      Configure your campus parameters below. Copy the prompt to generate CSV text in any LLM, or click <strong>&ldquo;Ingest Directly&rdquo;</strong> to synthesize and load it in 1 second.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer ${
                        copiedPrompt
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-900 hover:bg-black text-white"
                      }`}
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied Prompt!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy AI Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleIngestSyntheticCohort}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>⚡ Ingest Directly in Memory</span>
                    </button>
                  </div>
                </div>

                {/* Customization controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#EAE5DC]">
                  <div>
                    <label className="text-[11px] font-bold text-[#78716C] uppercase">College / Institution Name</label>
                    <input
                      type="text"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-[#111827] focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#78716C] uppercase mb-1 block">Student Count</label>
                    <CustomSelect
                      value={String(studentCount)}
                      onChange={(val) => setStudentCount(Number(val))}
                      options={[
                        { value: "25", label: "25 Students (Quick Test)" },
                        { value: "50", label: "50 Students (Standard Cohort)" },
                        { value: "100", label: "100 Students (Full Department)" },
                        { value: "200", label: "200 Students (Multi-Department)" },
                      ]}
                      buttonClassName="py-1.5 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#78716C] uppercase mb-1 block">Risk Ratio Scenario</label>
                    <CustomSelect
                      value={riskMix}
                      onChange={(val) => setRiskMix(val as "realistic" | "high" | "thriving")}
                      options={[
                        { value: "realistic", label: "Realistic Mix (~18% At-Risk)", dotColor: "bg-blue-500" },
                        { value: "high", label: "Stress Test (~40% High Risk)", dotColor: "bg-rose-500" },
                        { value: "thriving", label: "High Achievers (~5% At-Risk)", dotColor: "bg-emerald-500" },
                      ]}
                      buttonClassName="py-1.5 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Prompt Output Box */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-stone-500 font-bold uppercase">
                    Ready-to-Use LLM Prompt Output:
                  </div>
                  <div className="relative p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
                    <pre className="whitespace-pre-wrap">{customPromptText}</pre>
                  </div>
                </div>

                {/* Download option */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500">
                    Prefer an offline CSV file?
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadSyntheticCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadSuccess ? "Downloaded!" : "Download Synthetic CSV (.csv)"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            STEP 2: VERIFICATION & HUMAN-IN-THE-LOOP MAPPING REVIEW
            "This is your data what you've uploaded, kindly check once"
        ─────────────────────────────────────────────────────────── */}
        {currentStep === "verify" && (
          <div className="space-y-6">
            {/* File summary notification */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE5DC] flex items-center justify-center text-stone-800 shadow-xs">
                  <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#111827]">{fileName}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      Parsed Successfully
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Size: {fileSizeStr} • <strong>{rawRows.length}</strong> student rows detected • <strong>{rawHeaders.length}</strong> raw columns found
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep("upload")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 border border-[#E5E0D8] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change Input / Paste Another</span>
              </button>
            </div>

            {/* Smart Header Recovery Alert Banner */}
            {autoInjectedNotice && (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-purple-900">
                    Smart Header Recovery Applied
                  </h4>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    {autoInjectedNotice}
                  </p>
                </div>
              </div>
            )}

            {/* Verification Banner */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-900">
                  Kindly verify your ingested data & column mappings below
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  CampusIQ automatically matched your columns. If your data uses alternate names (like <em>arrears</em> for backlogs, or <em>percentage</em> for marks), confirm or adjust the dropdowns. Missing columns will have their weights automatically redistributed so your score remains balanced and accurate!
                </p>
              </div>
            </div>

            {/* Interactive Column Mapping Accordion / Grid */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-bold text-[#111827]">Auto-Detected Column Mappings</h3>
                  <p className="text-xs text-[#78716C]">
                    Match your spreadsheet headers to the CampusIQ analytics attributes.
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#EAE5DC] font-bold">
                  {Object.values(columnMapping).filter(Boolean).length} / {TARGET_SCHEMA_FIELDS.length} Mapped
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TARGET_SCHEMA_FIELDS.map((field) => {
                  const currentMapped = columnMapping[field.key] || "";
                  const isMapped = Boolean(currentMapped);

                  // Build CustomSelect options: Unmapped + Raw file headers
                  const selectOptions: SelectOption[] = [
                    { value: "__unmapped__", label: "— Not in dataset (Auto-interpolate) —" },
                    ...rawHeaders.map((header) => ({
                      value: header,
                      label: header,
                    })),
                  ];

                  return (
                    <div
                      key={field.key}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isMapped
                          ? "bg-white border-stone-200 shadow-2xs"
                          : "bg-stone-50/60 border-dashed border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isMapped ? "bg-emerald-500" : "bg-stone-300"}`} />
                          <span className="text-xs font-bold text-stone-900">{field.label}</span>
                        </div>
                        {field.required && (
                          <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100">
                            Core
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-stone-500 mb-2 truncate" title={field.description}>
                        {field.description}
                      </div>

                      <CustomSelect
                        value={currentMapped || "__unmapped__"}
                        onChange={(val) => handleMappingChange(field.key, val)}
                        options={selectOptions}
                        buttonClassName="py-1.5 rounded-xl text-xs"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Data Preview Table (First 5 Rows) */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#111827]">
                    Raw Ingested Records Preview ({rawRows.length} Total Students)
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    Previewing {previewLimit === "all" ? rawRows.length : Math.min(rawRows.length, previewLimit)} records from your ingested data.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">Show:</span>
                  <div className="flex rounded-xl bg-stone-100 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewLimit(5)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        previewLimit === 5 ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-black"
                      }`}
                    >
                      5
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewLimit(10)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        previewLimit === 10 ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-black"
                      }`}
                    >
                      10
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewLimit("all")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        previewLimit === "all" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-black"
                      }`}
                    >
                      All ({rawRows.length})
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-mono text-[11px]">
                      <th className="py-2.5 px-3">#</th>
                      {rawHeaders.map((header) => (
                        <th key={header} className="py-2.5 px-3 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {rawRows
                      .slice(0, previewLimit === "all" ? rawRows.length : previewLimit)
                      .map((row, idx) => (
                        <tr key={idx} className="hover:bg-stone-50/50">
                          <td className="py-2.5 px-3 font-mono text-stone-400 font-bold">{idx + 1}</td>
                          {rawHeaders.map((header) => (
                            <td key={header} className="py-2.5 px-3 whitespace-nowrap">
                              {String(row[header] ?? "—")}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confirm & Process Action Footer */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-bold text-stone-900">
                  Ready to calculate the Student Success Scores ($S^3$)?
                </div>
                <div className="text-[11px] text-stone-500">
                  Will apply non-linear penalty gates, dual-risk vectors, and K-Means segmentation.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep("upload")}
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-stone-100 text-xs font-bold text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                >
                  Back to Upload
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAndProcess}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Hydrate Entire Platform</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            STEP 3: PROCESSED DASHBOARD & RESULTS
        ─────────────────────────────────────────────────────────── */}
        {currentStep === "dashboard" && (
          <div className="space-y-6">
            {/* Top Success Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white border border-emerald-200 card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-800 tracking-wider">
                    Cohort Active Across Platform
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {fileName} Successfully Ingested!
                </h2>
                <p className="text-xs text-stone-600 max-w-2xl">
                  All {totalCount} students have been scored with non-linear statutory penalties and classified into AI archetypes. This dataset is now active across Campus Home, Faculty Triage, Segmentation, and Interventions!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleExportEnrichedData}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Enriched Excel</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetToDemoData();
                    setCurrentStep("upload");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Demo Cohort</span>
                </button>

                <Link
                  href="/home"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Open Executive Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quad Stat Cards for Newly Uploaded Cohort */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Total Analyzed</div>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">{totalCount}</div>
                <div className="text-[11px] text-stone-500">Students in uploaded file</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Average S³ Score</div>
                <div className="text-2xl font-extrabold text-blue-600 font-mono">{avgScore} <span className="text-xs text-stone-400">/ 100</span></div>
                <div className="text-[11px] text-stone-500">Cohort composite index</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">High Risk Count</div>
                <div className="text-2xl font-extrabold text-rose-600 font-mono">{highRiskCount}</div>
                <div className="text-[11px] text-rose-500 font-medium">Require immediate counsel</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Placement Primed</div>
                <div className="text-2xl font-extrabold text-emerald-600 font-mono">{placementReadyCount}</div>
                <div className="text-[11px] text-emerald-600 font-medium">Coding &ge; 60 & 0 backlogs</div>
              </div>
            </div>

            {/* Ingested Cohort Table View */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Ingested Student Cohort Diagnostic Table
                  </h3>
                  <p className="text-xs text-stone-500">
                    Click any student row to inspect their 7-Pillar Radar and Explainable AI (XAI) Waterfall.
                  </p>
                </div>
              </div>

              <StudentTable
                students={processedStudents}
                onSelectStudent={(s) => setSelectedStudent(s)}
              />
            </div>
          </div>
        )}

        {/* 360° Student Modal */}
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </div>
    </WorkspaceShell>
  );
}
