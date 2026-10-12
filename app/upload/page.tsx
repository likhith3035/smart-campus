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
} from "lucide-react";
import Link from "next/link";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { useStudentData } from "@/components/context/StudentDataContext";

type UploadStep = "upload" | "verify" | "dashboard";

export default function DataIntegrationPage() {
  const { setUploadedCohort, isCustomDataset, resetToDemoData } = useStudentData();
  const [currentStep, setCurrentStep] = useState<UploadStep>("upload");
  const [fileName, setFileName] = useState<string>("");
  const [fileSizeStr, setFileSizeStr] = useState<string>("");

  // Raw file parsed data
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, any>[]>([]);
  const [previewLimit, setPreviewLimit] = useState<number | "all">(5);

  // Schema Mapping State: targetKey -> userColumnName (or null)
  const [columnMapping, setColumnMapping] = useState<Record<string, string | null>>({});

  // Processed Students
  const [processedStudents, setProcessedStudents] = useState<StudentProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Error/Status message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      // Convert sheet to JSON array of objects
      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        defval: "",
        raw: false,
      });

      if (!jsonData || jsonData.length === 0) {
        setErrorMessage("The uploaded file appears to be empty. Please upload a file with headers and student records.");
        return;
      }

      // Extract unique headers
      const headers = Object.keys(jsonData[0] || {});
      if (headers.length === 0) {
        setErrorMessage("Could not detect any column headers in the uploaded file.");
        return;
      }

      setRawHeaders(headers);
      setRawRows(jsonData);

      // Auto-detect schema mapping
      const detected = autoDetectSchemaMapping(headers);
      setColumnMapping(detected);

      // Move to verification step
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
      setUploadedCohort(parsed, fileName || "Custom Uploaded Dataset");
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

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* ───────────────────────────────────────────────────────────
          HEADER
      ─────────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
          [ UNIVERSAL INSTITUTIONAL DATA INGESTION ]
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
          Flexible Multi-Format Data Ingestion & Schema Mapper
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] max-w-3xl leading-relaxed">
          Upload any student spreadsheet (CSV or Excel) regardless of column names or missing fields. CampusIQ auto-detects headers, lets you review your data, dynamically adapts weights, and generates full decision intelligence.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#EAE5DC] card-shadow text-xs overflow-x-auto scrollbar-none">
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
          currentStep === "upload" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
        }`}>
          <span>1. Upload File</span>
        </div>
        <span className="text-stone-300 shrink-0">→</span>
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
          currentStep === "verify" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
        }`}>
          <span>2. Verify Data</span>
        </div>
        <span className="text-stone-300 shrink-0">→</span>
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] sm:text-xs ${
          currentStep === "dashboard" ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700"
        }`}>
          <span>3. AI Dashboard</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          STEP 1: UPLOAD DROPZONE
      ─────────────────────────────────────────────────────────── */}
      {currentStep === "upload" && (
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
                Drag and drop your Student Dataset here
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
                  <button
                    onClick={async () => {
                      const sample = `roll_no,student_name,branch,class_year,percentage_marks,attendance_pct,arrears,coding_score\n2024-CSE-001,Aarav Patel,Computer Science,4,88.5,92.0,0,85\n2024-CSE-002,Bhavna Rao,Computer Science,4,62.0,68.5,2,35\n2024-ECE-105,Chirag Reddy,Electronics & Comm,3,74.5,81.0,0,45\n2024-IT-044,Divya Sharma,Information Tech,3,56.0,62.0,3,25\n2024-MECH-012,Farhan Khan,Mechanical Eng,4,69.0,79.0,1,30\n2024-AI-088,Ishita Nair,AI & Data Science,3,91.0,94.5,0,92\n2024-CSE-077,Karan Joshi,Computer Science,4,58.0,59.0,2,20\n2024-IT-102,Meera Iyer,Information Tech,3,84.0,88.0,0,78\n2024-CIVIL-015,Rohan Varma,Civil Engineering,3,71.0,76.0,1,40\n2024-BIOTECH-009,Ananya Sen,Biotechnology,4,86.0,91.0,0,65`;
                      const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", "sample_alternative_college_format.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              onClick={() => setCurrentStep("upload")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 border border-[#E5E0D8] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another File</span>
            </button>
          </div>

          {/* Verification Banner */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900">
                Kindly verify your uploaded data & column mappings below
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                CampusIQ automatically matched your columns. If your file uses different names (like <em>arrears</em> for backlogs, or <em>percentage</em> for marks), confirm or adjust the dropdowns. Missing columns will have their weights automatically redistributed so your score remains balanced and accurate!
              </p>
            </div>
          </div>

          {/* Interactive Column Mapping Accordion / Grid */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-[#111827]">Auto-Detected Column Mappings</h3>
                <p className="text-xs text-[#78716C]">
                  Match your uploaded spreadsheet headers to the CampusIQ analytics attributes.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#EAE5DC] font-bold">
                {Object.values(columnMapping).filter(Boolean).length} / {TARGET_SCHEMA_FIELDS.length} Mapped
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {TARGET_SCHEMA_FIELDS.map((field) => {
                const mappedUserCol = columnMapping[field.key];
                const isMapped = Boolean(mappedUserCol);

                return (
                  <div
                    key={field.key}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isMapped
                        ? "bg-[#FAF8F5]/80 border-[#EAE5DC]"
                        : "bg-stone-50/50 border-dashed border-stone-200 opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <div>
                        <div className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                          <span>{field.label}</span>
                          {field.required && (
                            <span className="text-[10px] text-rose-500 font-extrabold">*Req</span>
                          )}
                        </div>
                        <div className="text-[10px] text-stone-500">{field.description}</div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-700 font-mono">
                        {field.category}
                      </span>
                    </div>

                    <div className="mt-2">
                      <CustomSelect
                        value={mappedUserCol || "__unmapped__"}
                        onChange={(val) => handleMappingChange(field.key, val)}
                        options={[
                          { value: "__unmapped__", label: "-- Not in File (Use Safe Default) --" },
                          ...rawHeaders.map((h) => ({
                            value: h,
                            label: `Column: ${h}`,
                          })),
                        ]}
                        buttonClassName={`py-1.5 px-2.5 rounded-xl text-xs ${
                          isMapped
                            ? "bg-white text-stone-900 border-stone-300 font-semibold"
                            : "bg-white text-stone-400 border-dashed border-stone-200"
                        }`}
                      />
                    </div>

                    {isMapped && (
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Mapped to &ldquo;{mappedUserCol}&rdquo;</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Raw Data Preview Table: "This is your data what you've uploaded" */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  Raw File Data Preview {previewLimit === "all" ? `(All ${rawRows.length} Rows)` : `(First ${previewLimit} Rows)`}
                </h3>
                <p className="text-xs text-[#78716C]">
                  Direct preview of the actual records from your uploaded spreadsheet.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-stone-500 font-semibold">
                  Showing {previewLimit === "all" ? rawRows.length : Math.min(previewLimit, rawRows.length)} of {rawRows.length} rows
                </span>
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
                  {[5, 15, 50].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPreviewLimit(num)}
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold transition-all ${
                        previewLimit === num ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500 hover:text-stone-900"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPreviewLimit(previewLimit === "all" ? 5 : "all")}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                      previewLimit === "all" ? "bg-blue-600 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#EAE5DC] max-h-96">
              <table className="w-full text-left text-xs text-[#57534E]">
                <thead className="bg-[#FAF8F5] uppercase font-bold text-[#78716C] border-b border-[#EAE5DC] sticky top-0 z-10">
                  <tr>
                    <th className="p-3 w-14 text-center font-mono">S.No</th>
                    {rawHeaders.map((h) => (
                      <th key={h} className="p-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium font-mono">
                  {(previewLimit === "all" ? rawRows : rawRows.slice(0, previewLimit)).map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="p-3 text-center text-stone-500 font-mono font-bold text-[11px]">{idx + 1}</td>
                      {rawHeaders.map((h) => (
                        <td key={h} className="p-3 whitespace-nowrap text-[#111827]">
                          {String(row[h] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confirmation CTA Row */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-[#111827]">Data verified and ready to compute?</div>
              <div className="text-xs text-[#78716C]">
                Our AI will normalize values, re-balance weights, compute S³ scores, and segment all {rawRows.length} students.
              </div>
            </div>

            <button
              onClick={handleConfirmAndProcess}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
            >
              <span>✓ Confirm & Generate AI Insights</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          STEP 3: PROCESSED ANALYTICS DASHBOARD & ENRICHED EXPORT
      ─────────────────────────────────────────────────────────── */}
      {currentStep === "dashboard" && (
        <div className="space-y-6">
          {/* Top Banner with File Details & Export CTA */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-[#111827]">
                  Cohort Analysis Complete ({totalCount} Students)
                </h3>
              </div>
              <p className="text-xs text-[#78716C] mt-1">
                Processed from <strong>{fileName}</strong> using dynamic adaptive weights & S³ formulation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportEnrichedData}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Enriched Dataset (.xlsx)</span>
              </button>

              <button
                onClick={() => setCurrentStep("verify")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 border border-[#E5E0D8] transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Adjust Mappings</span>
              </button>
            </div>
          </div>

          {/* Global Platform Activation Alert */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-emerald-900 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-emerald-950">
                  Custom Dataset Activated Across All Pages!
                </div>
                <div className="text-[11px] text-emerald-700">
                  CampusIQ is now operating on these {totalCount} students across Faculty Triage, Institutional Home, AI Segmentation, and the Prescriptive Action Tracker.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link
                href="/faculty"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>View in Faculty Triage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/home"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
              >
                <span>View Campus Home</span>
              </Link>
            </div>
          </div>

          {/* 4 Summary Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
              <div className="text-[10px] text-[#78716C] font-semibold uppercase">Total Students</div>
              <div className="text-2xl font-extrabold text-[#111827]">{totalCount}</div>
              <div className="text-[11px] text-stone-500">100% Normalized</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
              <div className="text-[10px] text-rose-600 font-semibold uppercase">High Risk Flagged</div>
              <div className="text-2xl font-extrabold text-rose-600">{highRiskCount}</div>
              <div className="text-[11px] text-rose-500 font-medium">
                {totalCount > 0 ? ((highRiskCount / totalCount) * 100).toFixed(0) : 0}% of cohort
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
              <div className="text-[10px] text-blue-600 font-semibold uppercase">Average S³ Score</div>
              <div className="text-2xl font-extrabold text-blue-600">{avgScore}</div>
              <div className="text-[11px] text-stone-500">Out of 100.0</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
              <div className="text-[10px] text-emerald-600 font-semibold uppercase">Placement Ready</div>
              <div className="text-2xl font-extrabold text-emerald-600">{placementReadyCount}</div>
              <div className="text-[11px] text-emerald-600 font-medium">
                {totalCount > 0 ? ((placementReadyCount / totalCount) * 100).toFixed(0) : 0}% eligible
              </div>
            </div>
          </div>

          {/* Full Interactive Student Triage Table */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111827]">Computed Cohort Decision Queue</h3>
                <p className="text-xs text-[#78716C]">
                  Click &ldquo;Profile&rdquo; on any student to open their 360° radar and Explainable AI waterfall.
                </p>
              </div>
            </div>

            <StudentTable
              students={processedStudents}
              onSelectStudent={(s) => setSelectedStudent(s)}
            />
          </div>

          {/* Student 360 Modal */}
          {selectedStudent && (
            <StudentModal
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </div>
      )}
      </div>
    </WorkspaceShell>
  );
}
