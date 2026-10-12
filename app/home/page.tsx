"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { initialStudents, getCampusStats } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { useStudentData } from "@/components/context/StudentDataContext";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  BarChart3,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function CampusHomePage() {
  const { students } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Diagnostic filter: "all" | "attendance" | "backlogs" | "placement"
  const [diagnosticFilter, setDiagnosticFilter] = useState<
    "all" | "attendance" | "backlogs" | "placement"
  >("all");

  // Selected Department Filter
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string | null>(null);

  // Campus Aggregate Telemetry
  const stats = useMemo(() => {
    return getCampusStats(students);
  }, [students]);

  // Students with Attendance < 75% (Statutory Debarment Cutoff)
  const debarmentStudents = useMemo(() => {
    return students
      .filter((s) => s.attendance_pct < 75)
      .sort((a, b) => a.attendance_pct - b.attendance_pct);
  }, [students]);

  // Filtered Watchlist based on active trigger card
  const filteredWatchlist = useMemo(() => {
    let list = students;
    if (selectedDeptFilter) {
      list = list.filter((s) => s.department === selectedDeptFilter);
    }
    if (diagnosticFilter === "attendance") {
      return list.filter((s) => s.attendance_pct < 75);
    }
    if (diagnosticFilter === "backlogs") {
      return list.filter((s) => (s.active_backlogs || 0) >= 2);
    }
    if (diagnosticFilter === "placement") {
      return list.filter((s) => s.coding_score >= 70);
    }
    return list.filter((s) => s.attendance_pct < 75);
  }, [students, diagnosticFilter, selectedDeptFilter]);

  // Department-by-Department Comparative Health Matrix (Dynamically computed from active cohort)
  const departmentBreakdown = useMemo(() => {
    const deptMap: Record<string, { total: number; sumScore: number }> = {};
    students.forEach((s) => {
      const d = s.department || "General";
      if (!deptMap[d]) {
        deptMap[d] = { total: 0, sumScore: 0 };
      }
      deptMap[d].total += 1;
      deptMap[d].sumScore += s.success_score || 0;
    });

    return Object.entries(deptMap)
      .map(([dept, data]) => {
        const avg = data.total > 0 ? Number((data.sumScore / data.total).toFixed(1)) : 0;
        const code = dept.slice(0, 3).charAt(0).toUpperCase() + dept.slice(1, 3);
        const status = avg < 65 ? "Critical Triage" : avg < 75 ? "Active Watch" : "Optimal";
        return {
          dept,
          total: data.total,
          avgScore: avg,
          code,
          status,
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 3); // Top 3 departments
  }, [students]);

  return (
    <WorkspaceShell>
      <div className="p-4 sm:p-8 space-y-7 max-w-7xl mx-auto w-full">
        {/* Top Breadcrumb & Action Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Blue Live Badge + Institutional ID */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Live Campus Pulse • Fall 2026 Academic Term
              </span>
              <span className="hidden sm:inline-flex items-center text-xs text-[#78716C] font-mono">
                Institutional ID: UNIV-HQ-8492
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#111827]">
              Institutional Command Center
            </h1>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-2xl leading-relaxed">
              Campus-wide academic trajectory, statutory non-linear debarment monitoring, and proactive cohort success indicators.
            </p>
          </div>

          {/* Fast Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/faculty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-sm hover:gap-2.5"
            >
              <Users className="w-4 h-4" />
              <span>Faculty Triage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E5DFD4] text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#111827] hover:bg-[#F2EDE4] transition-all shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Product Showcase</span>
            </Link>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            QUAD ACCREDITATION KPI CARDS ROW (Exact Mockup Match)
        ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Institutional Health Index */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                INSTITUTIONAL HEALTH INDEX
              </span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2.5 flex items-baseline justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                  64.6
                </span>
                <span className="text-xs font-semibold text-stone-500 ml-1">/ 100</span>
              </div>
              {/* Rising blue sparkline SVG curve */}
              <svg className="w-16 h-7 text-blue-500" viewBox="0 0 70 24" fill="none">
                <path
                  d="M2 18 C 18 20, 26 12, 38 10 C 48 8, 56 3, 68 2"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-stone-100">
              <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                <span>Target: 75.0+</span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  +3.2% vs midterm
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[64.6%]" />
              </div>
            </div>
          </div>

          {/* Card 2: Monitored Cohort */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                MONITORED COHORT
              </span>
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2.5 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                600
              </span>
              <span className="text-xs text-stone-500">Active Profiles</span>
            </div>
            <div className="flex items-center gap-2 text-xs pt-1 border-t border-stone-100">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                181 Thriving
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-200 text-[11px]">
                137 Moderate
              </span>
            </div>
          </div>

          {/* Card 3: Debarment Risk (<75% ATT.) */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200/90 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                DEBARMENT RISK (&lt;75% ATT.)
              </span>
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2.5 flex items-baseline justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-mono">
                  176
                </span>
                <span className="text-xs text-stone-500 ml-1.5 font-medium">
                  (29% of cohort)
                </span>
              </div>
              {/* Wavy red sparkline SVG */}
              <svg className="w-16 h-7 text-rose-500" viewBox="0 0 70 24" fill="none">
                <path
                  d="M2 18 C 16 22, 28 8, 42 16 C 52 22, 60 4, 68 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="pt-1 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Subject to statutory exam disbarment</span>
            </div>
          </div>

          {/* Card 4: Multi-Vector Risk Flags */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                MULTI-VECTOR RISK FLAGS
              </span>
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2.5 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                282
              </span>
              <span className="text-xs text-stone-500">Priority Cases</span>
            </div>
            <div className="pt-1 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
              <span>Placement Risk: <strong>231</strong></span>
              <span>Disengaged: <strong>103</strong></span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            CAMPUSIQ AUTONOMOUS DIAGNOSTIC FEED • ACTIVE ACTION TRIGGERS
        ─────────────────────────────────────────────────────────── */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider font-mono uppercase">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>CAMPUSIQ AUTONOMOUS DIAGNOSTIC FEED • ACTIVE ACTION TRIGGERS</span>
            </div>
            <span className="text-stone-400 text-xs font-mono">•••</span>
          </div>

          {/* 3 Clickable Action Trigger Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Trigger 1: Attendance Boundary */}
            <div
              onClick={() =>
                setDiagnosticFilter(
                  diagnosticFilter === "attendance" ? "all" : "attendance"
                )
              }
              className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                diagnosticFilter === "attendance"
                  ? "bg-rose-50/80 border-rose-400 shadow-xs ring-2 ring-rose-300"
                  : "bg-[#FAF8F5] border-stone-200/90 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>Statutory Attendance Boundary</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                176 students have breached the 75% statutory threshold, triggering the 0.85× multiplier penalty. Priority mentors auto-assigned.
              </p>
              {diagnosticFilter === "attendance" && (
                <div className="mt-2 text-[10px] font-bold text-rose-700">
                  ✓ Watchlist filtered to attendance breaches
                </div>
              )}
            </div>

            {/* Trigger 2: Compound Backlog Multiplier */}
            <div
              onClick={() =>
                setDiagnosticFilter(
                  diagnosticFilter === "backlogs" ? "all" : "backlogs"
                )
              }
              className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                diagnosticFilter === "backlogs"
                  ? "bg-amber-50/80 border-amber-400 shadow-xs ring-2 ring-amber-300"
                  : "bg-[#FAF8F5] border-stone-200/90 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Compound Backlog Multiplier</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Students with &ge;2 active backlogs are experiencing exponential score dampening (0.90^k). Remedial bootcamps recommended for 12 students.
              </p>
              {diagnosticFilter === "backlogs" && (
                <div className="mt-2 text-[10px] font-bold text-amber-700">
                  ✓ Watchlist filtered to active backlog cases
                </div>
              )}
            </div>

            {/* Trigger 3: Placement Benchmark Surge */}
            <div
              onClick={() =>
                setDiagnosticFilter(
                  diagnosticFilter === "placement" ? "all" : "placement"
                )
              }
              className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                diagnosticFilter === "placement"
                  ? "bg-emerald-50/80 border-emerald-400 shadow-xs ring-2 ring-emerald-300"
                  : "bg-[#FAF8F5] border-stone-200/90 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Placement Benchmark Surge</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Coding assessment completion in 6th semester cohorts improved placement tier readiness by 14.8% following recent campus hackathons.
              </p>
              {diagnosticFilter === "placement" && (
                <div className="mt-2 text-[10px] font-bold text-emerald-700">
                  ✓ Watchlist filtered to high coding aptitude
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            DEPARTMENT COMPARATIVE HEALTH MATRIX
        ─────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#111827]">
                Department Comparative Health Matrix
              </h2>
              <p className="text-xs text-[#57534E]">
                Cross-department benchmarking across academic grades, attendance compliance, and placement tier readiness.
              </p>
            </div>
            <Link
              href="/faculty"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline"
            >
              <span>Explore all departments in Faculty Triage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Department Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentBreakdown.map((d) => {
              const isSelected = selectedDeptFilter === d.dept;
              return (
                <div
                  key={d.dept}
                  onClick={() =>
                    setSelectedDeptFilter(isSelected ? null : d.dept)
                  }
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? "bg-stone-50 border-stone-800 shadow-md ring-2 ring-stone-900"
                      : "bg-white border-stone-200/90 hover:border-stone-400 shadow-2xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-800 font-mono">
                          {d.code}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-[#111827] group-hover:text-blue-600 transition-colors">
                            {d.dept}
                          </h3>
                          <span className="text-[11px] text-[#78716C]">
                            {d.total} Enrolled Students
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-rose-50 text-rose-600 border-rose-200">
                          {d.status}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Score row */}
                    <div className="pt-2 flex items-baseline justify-between">
                      <span className="text-xs text-stone-600 font-medium">
                        Avg Success Score
                      </span>
                      <div className="font-mono text-sm font-extrabold text-[#111827]">
                        {d.avgScore} <span className="text-[10px] text-stone-500 font-normal">/ 100</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden mt-2">
                      <div
                        className="h-full bg-rose-400 rounded-full"
                        style={{ width: `${d.avgScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 text-[10px] text-stone-500 flex items-center justify-between">
                    <span>Click to filter roster</span>
                    {isSelected ? (
                      <span className="text-blue-600 font-bold">● Active Filter</span>
                    ) : (
                      <span className="text-stone-400">View Cohort →</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            STATUTORY DEBARMENT WATCHLIST TABLE
        ─────────────────────────────────────────────────────────── */}
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg sm:text-xl font-extrabold text-[#111827]">
                  Live Statutory Watchlist (Attendance &lt; 75%)
                </h2>
              </div>
              <p className="text-xs text-[#57534E]">
                Active student profiles currently subject to the 0.85× non-linear statutory exam debarment gate.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedDeptFilter && (
                <button
                  onClick={() => setSelectedDeptFilter(null)}
                  className="text-xs text-blue-600 hover:underline px-2"
                >
                  Clear Dept ({selectedDeptFilter})
                </button>
              )}
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {filteredWatchlist.length} Students Flagged
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-[#78716C] font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Student Name &amp; ID</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Attendance</th>
                    <th className="px-4 py-3">CGPA</th>
                    <th className="px-4 py-3">Active Backlogs</th>
                    <th className="px-4 py-3">Composite S³</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredWatchlist.slice(0, 8).map((student) => (
                    <tr
                      key={student.student_id}
                      onClick={() => setSelectedStudent(student)}
                      className="hover:bg-rose-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-[#111827] group-hover:text-blue-600 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-[10px] text-[#78716C] font-mono">
                          {student.student_id}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium text-[11px]">
                          {student.department} • Sem {student.semester}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-rose-600 font-bold font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          {student.attendance_pct}%
                        </div>
                        <div className="text-[9px] text-rose-500 font-medium">
                          Statutory Breach
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-[#111827]">
                        {student.cgpa}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (student.active_backlogs || 0) > 0
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {student.active_backlogs || 0} Backlogs
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono font-black text-rose-600 text-sm">
                          {student.success_score}
                        </div>
                        <div className="text-[9px] text-stone-400">
                          Penalty: 0.85× applied
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(student);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-semibold transition-all shadow-2xs"
                        >
                          <span>Profile</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </WorkspaceShell>
  );
}
