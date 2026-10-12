"use client";

import { useState } from "react";
import { StudentProfile } from "@/lib/types";
import { Eye, ArrowUpDown, ChevronRight, SlidersHorizontal, AlertTriangle, CheckCircle2 } from "lucide-react";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";

const mobileSortOptions: SelectOption[] = [
  { value: "success_score", label: "S³ Score" },
  { value: "name", label: "Name" },
  { value: "cgpa", label: "CGPA" },
  { value: "attendance_pct", label: "Attendance" },
  { value: "coding_score", label: "Coding Score" },
];

interface StudentTableProps {
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
}

export function StudentTable({ students, onSelectStudent }: StudentTableProps) {
  const [sortField, setSortField] = useState<keyof StudentProfile>("success_score");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const handleSort = (field: keyof StudentProfile) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortAsc ? valA - valB : valB - valA;
    }
    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedStudents.length / pageSize) || 1;
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getDepartmentShort = (dept: string) => {
    return dept
      .replace("Computer Science & Engineering", "CSE")
      .replace("Information Technology", "IT")
      .replace("Electronics & Communication", "ECE")
      .replace("Data Science & AI", "AI & DS")
      .replace("Mechanical Engineering", "MECH");
  };

  const getTierStyles = (tier: string) => {
    if (tier === "High Risk") {
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        scoreText: "text-rose-600",
        indicator: "bg-rose-500",
      };
    }
    if (tier === "Moderate Risk") {
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        scoreText: "text-amber-600",
        indicator: "bg-amber-500",
      };
    }
    return {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      scoreText: "text-emerald-600",
      indicator: "bg-emerald-500",
    };
  };

  return (
    <div className="space-y-4">
      {/* ───────────────────────────────────────────────────────────
          MOBILE SORT & COUNT CONTROLS (Visible on < md)
      ─────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DC] text-xs">
        <div className="flex items-center gap-1.5 text-[#57534E] font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
          <span>Sort by:</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-36">
            <CustomSelect
              value={sortField}
              onChange={(val) => setSortField(val as keyof StudentProfile)}
              options={mobileSortOptions}
              buttonClassName="py-1.5 px-3 bg-white text-xs font-semibold"
            />
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="p-1.5 rounded-full bg-white border border-[#EAE5DC] text-stone-700 hover:bg-stone-100"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          MOBILE CARDS VIEW (Visible only on < md screens)
      ─────────────────────────────────────────────────────────── */}
      <div className="md:hidden space-y-3">
        {paginatedStudents.length === 0 ? (
          <div className="p-8 text-center text-stone-400 bg-white rounded-2xl border border-[#EAE5DC] text-xs">
            No students match the selected filter criteria.
          </div>
        ) : (
          paginatedStudents.map((s) => {
            const styles = getTierStyles(s.overall_tier);
            return (
              <div
                key={s.student_id}
                onClick={() => onSelectStudent(s)}
                className="p-4 rounded-2xl bg-white border border-[#EAE5DC] hover:border-stone-400 card-shadow transition-all space-y-3 cursor-pointer active:scale-[0.99]"
              >
                {/* Header: Student info & S3 score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#111827]">{s.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                        {getDepartmentShort(s.department)}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#78716C]">
                      {s.student_id} • Semester {s.semester}
                    </div>
                  </div>

                  {/* S3 Score Pill */}
                  <div className={`px-2.5 py-1.5 rounded-xl border flex flex-col items-center justify-center font-mono shrink-0 ${styles.badge}`}>
                    <span className="text-base font-extrabold leading-tight">{s.success_score.toFixed(1)}</span>
                    <span className="text-[8px] font-bold tracking-wider uppercase opacity-80">S³ Score</span>
                  </div>
                </div>

                {/* 4-Metric Grid */}
                <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DF] text-center text-[10px]">
                  <div>
                    <span className="text-stone-400 block font-medium">CGPA</span>
                    <span className="font-mono font-bold text-stone-900 text-xs">{s.cgpa.toFixed(2)}</span>
                    {s.active_backlogs > 0 && (
                      <span className="block text-[8px] text-rose-600 font-bold">{s.active_backlogs} BL</span>
                    )}
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Attendance</span>
                    <span className={`font-mono font-bold text-xs ${s.attendance_pct < 75 ? "text-rose-600" : "text-emerald-600"}`}>
                      {s.attendance_pct.toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Coding</span>
                    <span className={`font-mono font-bold text-xs ${s.coding_score < 45 ? "text-amber-600" : "text-stone-900"}`}>
                      {s.coding_score.toFixed(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Tier</span>
                    <span className={`font-bold text-[9px] block truncate ${styles.scoreText}`}>
                      {s.overall_tier.replace(" Risk", "")}
                    </span>
                  </div>
                </div>

                {/* Badges row & Action */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium border"
                      style={{
                        backgroundColor: `${s.segment.color}15`,
                        color: s.segment.color,
                        borderColor: `${s.segment.color}35`,
                      }}
                    >
                      {s.segment.name}
                    </span>
                    {s.risk_flags.academic.status === "HIGH" && (
                      <span className="px-1.5 py-0.2 text-[8px] font-bold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                        ACAD
                      </span>
                    )}
                    {s.risk_flags.placement.status === "HIGH" && (
                      <span className="px-1.5 py-0.2 text-[8px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        PLACE
                      </span>
                    )}
                    {s.risk_flags.disengagement.status === "HIGH" && (
                      <span className="px-1.5 py-0.2 text-[8px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        LMS
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStudent(s);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors p-1"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────
          DESKTOP TABLE VIEW (Visible on md+ screens)
      ─────────────────────────────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#EAE5DC] bg-white">
        <table className="w-full text-left text-xs text-[#57534E]">
          <thead className="bg-[#FAF8F5] uppercase font-semibold text-[#78716C] border-b border-[#EAE5DC]">
            <tr>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1.5">
                  <span>Student</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("department")}>
                <div className="flex items-center gap-1.5">
                  <span>Department</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("cgpa")}>
                <div className="flex items-center gap-1.5">
                  <span>CGPA</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("attendance_pct")}>
                <div className="flex items-center gap-1.5">
                  <span>Attendance</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("coding_score")}>
                <div className="flex items-center gap-1.5">
                  <span>Coding</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4 cursor-pointer hover:text-stone-900" onClick={() => handleSort("success_score")}>
                <div className="flex items-center gap-1.5">
                  <span>S³ Score</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="p-4">Risk Flags</th>
              <th className="p-4">AI Segment</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-medium">
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-stone-400">
                  No students match the selected filter criteria.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((s) => (
                <tr
                  key={s.student_id}
                  onClick={() => onSelectStudent(s)}
                  className="hover:bg-[#FAF8F5]/80 cursor-pointer transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-bold text-[#111827] group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#78716C]">
                      {s.student_id} • Sem {s.semester}
                    </div>
                  </td>
                  <td className="p-4 text-[#57534E]">
                    {getDepartmentShort(s.department)}
                  </td>
                  <td className="p-4 font-mono font-bold text-[#111827]">
                    {s.cgpa.toFixed(2)}
                    {s.active_backlogs > 0 && (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100 font-sans">
                        {s.active_backlogs} BL
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold">
                    <span className={s.attendance_pct < 75.0 ? "text-rose-600" : "text-emerald-600"}>
                      {s.attendance_pct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#57534E]">
                    <span className={s.coding_score < 45.0 ? "text-amber-600 font-bold" : "text-[#111827]"}>
                      {s.coding_score.toFixed(0)}/100
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-extrabold text-sm ${
                        s.overall_tier === "High Risk"
                          ? "text-rose-600"
                          : s.overall_tier === "Moderate Risk"
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}>
                        {s.success_score.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {s.risk_flags.academic.status === "HIGH" && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                          ACAD
                        </span>
                      )}
                      {s.risk_flags.placement.status === "HIGH" && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          PLACE
                        </span>
                      )}
                      {s.risk_flags.disengagement.status === "HIGH" && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          LMS
                        </span>
                      )}
                      {s.risk_flags.academic.status !== "HIGH" &&
                        s.risk_flags.placement.status !== "HIGH" &&
                        s.risk_flags.disengagement.status !== "HIGH" && (
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            STABLE
                          </span>
                        )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border"
                      style={{
                        backgroundColor: `${s.segment.color}10`,
                        color: s.segment.color,
                        borderColor: `${s.segment.color}30`,
                      }}
                    >
                      {s.segment.name}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(s);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-stone-100 text-[#111827] border border-[#E5E0D8] transition-colors text-[11px] font-semibold shadow-xs"
                    >
                      <Eye className="w-3 h-3 text-stone-500" />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PAGINATION
      ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C] px-1 sm:px-2">
        <div className="text-center sm:text-left">
          Showing <span className="text-[#111827] font-mono font-bold">{paginatedStudents.length}</span> of{" "}
          <span className="text-[#111827] font-mono font-bold">{sortedStudents.length}</span> students
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs font-medium"
          >
            Previous
          </button>
          <span className="font-mono text-[#111827] font-bold px-1">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
