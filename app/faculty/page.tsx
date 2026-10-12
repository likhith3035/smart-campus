"use client";

import { useState, useMemo } from "react";
import { initialStudents, filterStudents, getCampusStats } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { 
  Users, 
  Search, 
  Download, 
  RotateCcw
} from "lucide-react";

export default function FacultyWorkspacePage() {
  const [students] = useState<StudentProfile[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Filters
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedSem, setSelectedSem] = useState<string>("all");
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = useMemo(() => {
    return filterStudents(students, {
      department: selectedDept,
      semester: selectedSem === "all" ? "all" : Number(selectedSem),
      riskTier: selectedRisk,
      segmentName: selectedSegment,
      searchQuery: searchQuery,
    });
  }, [students, selectedDept, selectedSem, selectedRisk, selectedSegment, searchQuery]);

  const stats = useMemo(() => {
    return getCampusStats(filteredStudents);
  }, [filteredStudents]);

  const handleResetFilters = () => {
    setSelectedDept("all");
    setSelectedSem("all");
    setSelectedRisk("all");
    setSelectedSegment("all");
    setSearchQuery("");
  };

  const handleExportCSV = () => {
    const headers = "Student ID,Name,Department,Semester,CGPA,Backlogs,Attendance %,Coding Score,S3 Score,Risk Tier,AI Segment\n";
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.student_id}","${s.name}","${s.department}",${s.semester},${s.cgpa},${s.active_backlogs},${s.attendance_pct},${s.coding_score},${s.success_score},"${s.overall_tier}","${s.segment.name}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `filtered_students_triage_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold mb-1">
            [ INSTITUTIONAL COHORT TRIAGE ]
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827] flex items-center gap-2">
            <span>Faculty & Department Workspace</span>
          </h1>
          <p className="text-xs text-[#57534E] mt-1">
            Filter, triage, and inspect individual student trajectories across integrated academic, attendance, LMS, and placement parameters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-xs font-semibold text-[#111827] border border-[#E5E0D8] shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] focus:outline-none focus:border-stone-900"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science (CSE)</option>
              <option value="Information Technology">Information Tech (IT)</option>
              <option value="Electronics & Communication">Electronics (ECE)</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Mechanical Engineering">Mechanical Eng</option>
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] focus:outline-none focus:border-stone-900"
            >
              <option value="all">All Semesters</option>
              <option value="4">Semester 4</option>
              <option value="6">Semester 6 (Pre-Placement)</option>
              <option value="8">Semester 8 (Final Year)</option>
            </select>
          </div>

          {/* Risk Tier Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] focus:outline-none focus:border-stone-900"
            >
              <option value="all">All Risk Tiers</option>
              <option value="High Risk">🔴 High Risk</option>
              <option value="Moderate Risk">🟡 Moderate Risk</option>
              <option value="Thriving">🟢 Thriving</option>
            </select>
          </div>

          {/* Segment Filter */}
          <div>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] focus:outline-none focus:border-stone-900"
            >
              <option value="all">All AI Segments</option>
              <option value="The Scholar">The Scholar</option>
              <option value="Practical Builder">Practical Builder</option>
              <option value="Consistent All-Rounder">Consistent All-Rounder</option>
              <option value="Critical Multi-Risk">Critical Multi-Risk</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 text-xs text-[#78716C]">
          <div className="flex items-center gap-3">
            <span>
              Matching: <strong className="text-[#111827] font-mono">{filteredStudents.length}</strong> students
            </span>
            <span>•</span>
            <span>
              Average S³: <strong className="text-blue-600 font-mono">{stats.averageScore}</strong>
            </span>
            <span>•</span>
            <span className="text-rose-600 font-semibold">
              High Risk: <strong className="font-mono">{stats.highRiskCount}</strong>
            </span>
          </div>
          {(selectedDept !== "all" || selectedSem !== "all" || selectedRisk !== "all" || selectedSegment !== "all" || searchQuery !== "") && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-stone-900 hover:underline font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Student Triage Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <StudentTable
          students={filteredStudents}
          onSelectStudent={(s) => setSelectedStudent(s)}
        />
      </div>

      {/* Student 360 Deep-Dive Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
