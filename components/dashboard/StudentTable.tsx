"use client";

import { useState } from "react";
import { StudentProfile } from "@/lib/types";
import { Eye, ArrowUpDown, ChevronRight } from "lucide-react";

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

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-[#EAE5DC] bg-white">
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
                    {s.department.replace("Computer Science & Engineering", "CSE")
                      .replace("Information Technology", "IT")
                      .replace("Electronics & Communication", "ECE")
                      .replace("Data Science & AI", "AI & DS")
                      .replace("Mechanical Engineering", "MECH")}
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

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-[#78716C] px-2">
        <div>
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
          <span className="font-mono text-[#111827] font-bold">
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
