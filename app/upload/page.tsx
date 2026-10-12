"use client";

import { useState } from "react";
import { calculateStudentSuccessScore } from "@/lib/scoring";
import { StudentProfile } from "@/lib/types";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  FileText,
  Database
} from "lucide-react";

export default function DataIntegrationPage() {
  const [uploadedStudents, setUploadedStudents] = useState<StudentProfile[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
        if (lines.length < 2) {
          setUploadStatus("error");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim().toLowerCase());
        const parsed: StudentProfile[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(",").map((val) => val.replace(/"/g, "").trim());
          if (row.length < headers.length) continue;

          const rowData: Record<string, string> = {};
          headers.forEach((h, idx) => {
            rowData[h] = row[idx];
          });

          const student_id = rowData["student_id"] || rowData["id"] || `STU-UP-${i}`;
          const name = rowData["name"] || `Student ${i}`;
          const department = rowData["department"] || "Computer Science & Engineering";
          const semester = Number(rowData["semester"]) || 6;
          const cgpa = parseFloat(rowData["cgpa"]) || 7.0;
          const active_backlogs = parseInt(rowData["active_backlogs"] || rowData["backlogs"]) || 0;
          const attendance_pct = parseFloat(rowData["attendance_pct"] || rowData["attendance"]) || 75.0;
          const lms_logins_per_week = parseInt(rowData["lms_logins_per_week"] || rowData["lms_logins"]) || 5;
          const assignment_completion_pct = parseFloat(rowData["assignment_completion_pct"] || rowData["assignments"]) || 70.0;
          const coding_score = parseFloat(rowData["coding_score"] || rowData["coding"]) || 50.0;
          const aptitude_score = parseFloat(rowData["aptitude_score"] || rowData["aptitude"]) || 50.0;
          const mock_interview_rating = parseFloat(rowData["mock_interview_rating"] || rowData["mock_interview"]) || 3.0;
          const soft_skills_rating = parseFloat(rowData["soft_skills_rating"]) || 6.0;
          const certifications_count = parseInt(rowData["certifications_count"] || rowData["certifications"]) || 1;
          const hackathons_participated = parseInt(rowData["hackathons_participated"] || rowData["hackathons"]) || 0;
          const clubs_count = parseInt(rowData["clubs_count"] || rowData["clubs"]) || 1;
          const faculty_sentiment = parseFloat(rowData["faculty_sentiment"] || rowData["feedback"]) || 0.65;
          const sgpa_trend = parseFloat(rowData["sgpa_trend"]) || 0.0;

          const computed = calculateStudentSuccessScore({
            student_id,
            name,
            department,
            semester,
            cgpa,
            active_backlogs,
            attendance_pct,
            lms_logins_per_week,
            assignment_completion_pct,
            coding_score,
            aptitude_score,
            mock_interview_rating,
            soft_skills_rating,
            certifications_count,
            hackathons_participated,
            clubs_count,
            faculty_sentiment,
            sgpa_trend,
          });

          parsed.push({
            student_id,
            name,
            department,
            semester,
            cgpa,
            active_backlogs,
            sgpa_trend,
            attendance_pct,
            lms_logins_per_week,
            assignment_completion_pct,
            coding_score,
            aptitude_score,
            mock_interview_rating,
            soft_skills_rating,
            certifications_count,
            hackathons_participated,
            clubs_count,
            faculty_sentiment,
            ...computed,
          });
        }

        setUploadedStudents(parsed);
        setUploadStatus("success");
      } catch (err) {
        console.error(err);
        setUploadStatus("error");
      }
    };

    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "student_id,name,department,semester,cgpa,active_backlogs,attendance_pct,lms_logins_per_week,assignment_completion_pct,coding_score,aptitude_score,mock_interview_rating,soft_skills_rating,certifications_count,hackathons_participated,clubs_count,faculty_sentiment\n" +
      "STU-SAMPLE-01,Aryan Malhotra,Computer Science & Engineering,6,8.7,0,88.5,12,94.0,38.0,62.0,2.6,5.2,1,0,1,0.82\n" +
      "STU-SAMPLE-02,Tanvi Saxena,Information Technology,6,6.2,1,71.2,4,62.0,88.0,84.0,4.2,8.4,3,2,1,0.65\n" +
      "STU-SAMPLE-03,Karan Deshmukh,Electronics & Communication,6,5.1,3,63.0,2,42.0,32.0,38.0,2.1,4.2,0,0,0,0.35\n" +
      "STU-SAMPLE-04,Sneha Nair,Data Science & AI,6,9.2,0,94.0,16,98.0,92.0,90.0,4.6,9.2,3,2,2,0.95";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "kpmg_student_data_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold mb-1">
            [ MULTI-SOURCE HARMONIZATION ]
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">
            Student Data Integration Portal
          </h1>
          <p className="text-xs text-[#57534E] mt-1">
            Ingest and harmonize disconnected campus records from ERP, Biometric RFID, LMS, and Placement Cells into a unified student record.
          </p>
        </div>
        <button
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-xs font-semibold text-[#111827] border border-[#E5E0D8] shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-stone-500" />
          <span>Download Sample CSV Template</span>
        </button>
      </div>

      {/* 7 Data Silos Verification Matrix */}
      <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            Integrated Telemetry Schema (7 Mandatory Silos)
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
            KPMG Criterion: 30% Weight
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">01. Academic</span>
            <p className="text-stone-900 font-bold mt-0.5">CGPA & Backlogs</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">02. Attendance</span>
            <p className="text-stone-900 font-bold mt-0.5">Physical / Lab %</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">03. LMS</span>
            <p className="text-stone-900 font-bold mt-0.5">Logins & Tasks</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">04. Placement</span>
            <p className="text-stone-900 font-bold mt-0.5">Coding & Aptitude</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">05. Skills</span>
            <p className="text-stone-900 font-bold mt-0.5">Certs & Soft Skills</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">06. Extracurricular</span>
            <p className="text-stone-900 font-bold mt-0.5">Hackathons & Clubs</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <span className="text-[10px] text-stone-400 uppercase font-bold">07. Feedback</span>
            <p className="text-stone-900 font-bold mt-0.5">Faculty Sentiment</p>
          </div>
        </div>
      </div>

      {/* Upload Drop Zone */}
      <div className="p-12 rounded-3xl bg-white border-2 border-dashed border-[#D6D0C5] hover:border-stone-900 transition-colors flex flex-col items-center justify-center text-center space-y-4 relative card-shadow">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 pointer-events-none">
          <FileSpreadsheet className="w-8 h-8" />
        </div>

        <div className="space-y-1 pointer-events-none">
          <h3 className="text-base font-bold text-[#111827]">
            Drag & drop raw campus CSV here, or <span className="text-blue-600 underline">browse computer</span>
          </h3>
          <p className="text-xs text-[#78716C]">
            Supports batch files from college ERP, Moodle, Biometric logs, or placement assessment portals.
          </p>
        </div>

        {fileName && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-stone-700">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Selected File: <strong className="text-stone-900">{fileName}</strong></span>
          </div>
        )}
      </div>

      {/* Upload Feedback */}
      {uploadStatus === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>
              Successfully ingested and scored <strong className="text-stone-900 font-mono font-bold">{uploadedStudents.length}</strong> student records! Real-time $S^3$ scores and risk flags have been calculated.
            </span>
          </div>
          <span className="font-mono text-emerald-700 text-[11px] font-bold">100% Ingestion Complete</span>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>Error parsing CSV file. Please ensure columns match the provided sample template.</span>
        </div>
      )}

      {/* Uploaded Students Table */}
      {uploadedStudents.length > 0 && (
        <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#111827]">Ingested Batch Telemetry Results</h2>
              <p className="text-xs text-[#78716C]">
                Live calculated Success Scores, Dual Risk Flags, and AI Segment assignments
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 font-mono font-bold">
              {uploadedStudents.length} Students
            </span>
          </div>

          <StudentTable
            students={uploadedStudents}
            onSelectStudent={(s) => setSelectedStudent(s)}
          />
        </div>
      )}

      {/* Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
