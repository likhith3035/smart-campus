"use client";

import { useState, useMemo } from "react";
import { initialStudents, filterStudents, getCampusStats } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { StudentModal } from "@/components/dashboard/StudentModal";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Download, 
  RotateCcw,
  UploadCloud,
  CheckCircle2
} from "lucide-react";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { useStudentData } from "@/components/context/StudentDataContext";

const departmentOptions: SelectOption[] = [
  { value: "all", label: "All Departments" },
  { value: "Computer Science & Engineering", label: "Computer Science (CSE)" },
  { value: "Information Technology", label: "Information Tech (IT)" },
  { value: "Electronics & Communication", label: "Electronics (ECE)" },
  { value: "Data Science & AI", label: "Data Science & AI" },
  { value: "Mechanical Engineering", label: "Mechanical Eng" },
];

const semesterOptions: SelectOption[] = [
  { value: "all", label: "All Semesters" },
  { value: "4", label: "Semester 4" },
  { value: "6", label: "Semester 6 (Pre-Placement)" },
  { value: "8", label: "Semester 8 (Final Year)" },
];

const riskOptions: SelectOption[] = [
  { value: "all", label: "All Risk Tiers" },
  { value: "High Risk", label: "High Risk", dotColor: "bg-rose-500", badge: "Critical", badgeColor: "bg-rose-100 text-rose-700" },
  { value: "Moderate Risk", label: "Moderate Risk", dotColor: "bg-amber-500", badge: "Watch", badgeColor: "bg-amber-100 text-amber-700" },
  { value: "Thriving", label: "Thriving", dotColor: "bg-emerald-500", badge: "Optimal", badgeColor: "bg-emerald-100 text-emerald-700" },
];

const segmentOptions: SelectOption[] = [
  { value: "all", label: "All AI Segments" },
  { value: "The Scholar", label: "The Scholar", badge: "Research", badgeColor: "bg-blue-100 text-blue-700" },
  { value: "Practical Builder", label: "Practical Builder", badge: "Coding", badgeColor: "bg-purple-100 text-purple-700" },
  { value: "Consistent All-Rounder", label: "Consistent All-Rounder", badge: "Balanced", badgeColor: "bg-emerald-100 text-emerald-700" },
  { value: "Critical Multi-Risk", label: "Critical Multi-Risk", badge: "Triage", badgeColor: "bg-rose-100 text-rose-700" },
];

export default function FacultyWorkspacePage() {
  const {
    students,
    isCustomDataset,
    datasetName,
    resetToDemoData,
    availableDepartments,
    availableSemesters,
  } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Dynamic Department & Semester Options derived from active students
  const dynamicDepartmentOptions: SelectOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Departments" },
      ...availableDepartments.map((dept) => ({
        value: dept,
        label: dept,
      })),
    ];
  }, [availableDepartments]);

  const dynamicSemesterOptions: SelectOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Semesters" },
      ...availableSemesters.map((sem) => ({
        value: String(sem),
        label: `Semester ${sem}`,
      })),
    ];
  }, [availableSemesters]);

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

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const activeFiltersCount = (selectedDept !== "all" ? 1 : 0) +
    (selectedSem !== "all" ? 1 : 0) +
    (selectedRisk !== "all" ? 1 : 0) +
    (selectedSegment !== "all" ? 1 : 0);

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
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold mb-1">
            [ INSTITUTIONAL COHORT TRIAGE ]
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] flex items-center gap-2">
            <span>Faculty & Department Workspace</span>
          </h1>
          <p className="text-xs text-[#57534E] mt-1 max-w-2xl">
            Filter, triage, and inspect individual student trajectories across integrated academic, attendance, LMS, and placement parameters.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Custom Data</span>
          </Link>
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-xs font-semibold text-[#111827] border border-[#E5E0D8] shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Active Custom Dataset Banner (shows when user uploaded their own data) */}
      {isCustomDataset && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <span className="font-bold">Active Custom Dataset:</span>{" "}
              <span className="font-mono text-emerald-800 font-semibold">{datasetName}</span>{" "}
              <span>({students.length} students loaded across {availableDepartments.length} departments)</span>
            </div>
          </div>
          <button
            onClick={resetToDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revert to Demo Data</span>
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-3 sm:space-y-4">
        {/* Top Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#111827] placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`sm:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold border transition-colors ${
              activeFiltersCount > 0 || showMobileFilters
                ? "bg-[#111827] text-white border-[#111827]"
                : "bg-[#FAF8F5] text-stone-700 border-[#EAE5DC]"
            }`}
          >
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Custom Dropdown Filters Grid */}
        <div className={`${showMobileFilters ? "grid" : "hidden sm:grid"} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1 relative z-30`}>
          {/* Department Filter (Dynamically adapts to uploaded file) */}
          <div>
            <CustomSelect
              value={selectedDept}
              onChange={setSelectedDept}
              options={dynamicDepartmentOptions}
              placeholder="Department"
            />
          </div>

          {/* Semester Filter (Dynamically adapts to uploaded file) */}
          <div>
            <CustomSelect
              value={selectedSem}
              onChange={setSelectedSem}
              options={dynamicSemesterOptions}
              placeholder="Semester"
            />
          </div>

          {/* Risk Tier Filter */}
          <div>
            <CustomSelect
              value={selectedRisk}
              onChange={setSelectedRisk}
              options={riskOptions}
              placeholder="Risk Tier"
            />
          </div>

          {/* Segment Filter */}
          <div>
            <CustomSelect
              value={selectedSegment}
              onChange={setSelectedSegment}
              options={segmentOptions}
              placeholder="AI Segment"
            />
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 sm:pt-3 border-t border-stone-100 text-xs text-[#78716C]">
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
    </WorkspaceShell>
  );
}
