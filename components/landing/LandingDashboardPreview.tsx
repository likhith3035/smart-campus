"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  Calendar,
  Database,
  FileText,
  Settings,
  Upload,
  AlertTriangle,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

export function LandingDashboardPreview() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "students" | "analytics" | "ai" | "interventions"
  >("dashboard");

  const [scoreFilter, setScoreFilter] = useState<string>("All Cohorts");
  const [deptFilter, setDeptFilter] = useState<string>("All Departments");

  // Interactive Score Range Bins
  const scoreBins = [
    { range: "0–20", count: 42, pct: 10.5, height: 26 },
    { range: "21–40", count: 98, pct: 24.5, height: 42 },
    { range: "41–60", count: 245, pct: 61.2, height: 72 },
    { range: "61–80", count: 490, pct: 100, height: 95 },
    { range: "81–100", count: 375, pct: 76.5, height: 60 },
  ];

  // Interactive Department Academic vs Placement Readiness
  const deptData = [
    { code: "CSE", name: "Computer Science", academic: 84, placement: 72 },
    { code: "IT", name: "Information Tech", academic: 78, placement: 68 },
    { code: "ECE", name: "Electronics & Comm", academic: 76, placement: 64 },
    { code: "MECH", name: "Mechanical Engg", academic: 72, placement: 60 },
    { code: "AI & DS", name: "AI & Data Science", academic: 88, placement: 75 },
  ];

  return (
    <div
      id="platform"
      className="max-w-6xl mx-auto bg-white rounded-3xl sm:rounded-[32px] border border-stone-200/90 shadow-2xl overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        {/* ───────────────────────────────────────────────────────────
            LEFT PREVIEW SIDEBAR
        ─────────────────────────────────────────────────────────── */}
        <aside className="w-full lg:w-52 bg-[#FBF9F5] border-b lg:border-b-0 lg:border-r border-stone-200/80 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold px-3 py-1">
              Workspace
            </div>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#111827] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <Link
              href="/faculty"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                <span>Students</span>
              </div>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>

            <Link
              href="/home"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-3.5 h-3.5 text-stone-500" />
                <span>Analytics</span>
              </div>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>

            <Link
              href="/segmentation"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>AI Insights</span>
              </div>
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[9px] font-bold rounded-full">
                ML
              </span>
            </Link>

            <Link
              href="/interventions"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>Interventions</span>
              </div>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>

            <Link
              href="/upload"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Data Upload</span>
              </div>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>

            <Link
              href="/methodology"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Reports</span>
              </div>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>
          </div>

          <div className="pt-4 mt-2 border-t border-stone-200/80">
            <Link
              href="/about"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </Link>
          </div>
        </aside>

        {/* ───────────────────────────────────────────────────────────
            MAIN WORKSPACE CONTENT AREA
        ─────────────────────────────────────────────────────────── */}
        <main className="flex-1 p-5 sm:p-7 space-y-6 bg-white overflow-hidden">
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-stone-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight">
                Student Success Overview
              </h2>
              <p className="text-xs text-stone-500">
                Illustrative preview · updates from uploaded datasets
              </p>
            </div>

            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200/90 hover:border-stone-300 bg-stone-50/70 hover:bg-stone-100/80 text-xs font-semibold text-stone-700 transition-all shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-stone-600" />
              <span>Upload CSV / XLSX</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>
          </div>

          {/* 4 Metric KPI Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Students analyzed */}
            <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200/70 hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Students analyzed</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-[#111827] font-mono">
                  1,250
                </span>
                {/* Mini vertical bar sparkline */}
                <div className="flex items-end gap-0.5 h-5">
                  <span className="w-1 bg-blue-200 rounded-t-xs h-2" />
                  <span className="w-1 bg-blue-300 rounded-t-xs h-3.5" />
                  <span className="w-1 bg-blue-400 rounded-t-xs h-2.5" />
                  <span className="w-1 bg-blue-500 rounded-t-xs h-5" />
                  <span className="w-1 bg-blue-600 rounded-t-xs h-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Academic risk */}
            <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200/70 hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Academic risk</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-rose-600 font-mono">
                  14.2%
                </span>
                {/* Red wavy sparkline SVG */}
                <svg className="w-14 h-5 text-rose-400" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M2 14 C 15 16, 25 6, 38 12 C 48 16, 54 4, 58 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3: Attendance trend */}
            <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200/70 hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Attendance trend</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 font-mono">
                  84.8%
                </span>
                {/* Green wavy sparkline SVG */}
                <svg className="w-14 h-5 text-emerald-400" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M2 16 C 14 14, 24 16, 36 8 C 46 2, 54 6, 58 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 4: Placement readiness */}
            <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200/70 hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Placement readiness</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-purple-600 font-mono">
                  72.6%
                </span>
                {/* Purple wavy sparkline SVG */}
                <svg className="w-14 h-5 text-purple-400" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M2 14 C 12 18, 22 10, 34 12 C 44 14, 52 4, 58 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Lower Grid: 2 Analytical Charts + 1 Priority Insight Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Chart 1: Success score distribution (5 cols on lg) */}
            <div className="lg:col-span-4 p-4 rounded-2xl border border-stone-200/80 bg-white space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-[#111827]">
                    Success score distribution
                  </h3>
                  <p className="text-[10px] text-stone-500">
                    Distribution of students across score ranges
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-stone-200 bg-stone-50 text-stone-600">
                  Range ▾
                </span>
              </div>

              {/* Bar Chart Graphic */}
              <div className="pt-3">
                <div className="h-32 flex items-end justify-between gap-2 px-1 pb-2 border-b border-stone-200">
                  {scoreBins.map((bin) => (
                    <div
                      key={bin.range}
                      className="flex-1 flex flex-col items-center gap-1 group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {bin.count} students
                      </div>
                      <div
                        style={{ height: `${bin.height}%` }}
                        className="w-full max-w-[28px] bg-blue-400 hover:bg-blue-500 transition-colors rounded-t-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="flex items-center justify-between text-[9px] font-mono text-stone-500 pt-1.5 px-0.5">
                  {scoreBins.map((b) => (
                    <span key={b.range} className="text-center flex-1">
                      {b.range}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart 2: Academic vs placement readiness (5 cols on lg) */}
            <div className="lg:col-span-5 p-4 rounded-2xl border border-stone-200/80 bg-white space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-[#111827]">
                    Academic vs placement readiness
                  </h3>
                  <p className="text-[10px] text-stone-500">
                    Compare overall readiness across departments
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-stone-200 bg-stone-50 text-stone-600">
                  Dept ▾
                </span>
              </div>

              {/* Dual Grouped Bar Chart Graphic */}
              <div className="pt-3">
                <div className="h-32 flex items-end justify-between gap-2 px-1 pb-2 border-b border-stone-200">
                  {deptData.map((d) => (
                    <div
                      key={d.code}
                      className="flex-1 flex items-end justify-center gap-1 group relative"
                    >
                      {/* Dual bars */}
                      <div
                        style={{ height: `${d.academic}%` }}
                        className="w-2.5 sm:w-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-t-xs"
                        title={`${d.code} Academic: ${d.academic}%`}
                      />
                      <div
                        style={{ height: `${d.placement}%` }}
                        className="w-2.5 sm:w-3 bg-rose-400 hover:bg-rose-500 transition-colors rounded-t-xs"
                        title={`${d.code} Placement: ${d.placement}%`}
                      />
                    </div>
                  ))}
                </div>

                {/* X-axis department labels */}
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-stone-600 pt-1.5 px-0.5">
                  {deptData.map((d) => (
                    <span key={d.code} className="text-center flex-1">
                      {d.code}
                    </span>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-stone-600 pt-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Academic Readiness</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Placement Readiness</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Priority insight Box (3 cols on lg) */}
            <div className="lg:col-span-3 p-4 rounded-2xl border border-amber-200/90 bg-[#FFFDF7] flex flex-col justify-between space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/90 text-amber-900 text-[10px] font-bold">
                  <Lightbulb className="w-3 h-3 text-amber-600" />
                  <span>Priority insight</span>
                </div>

                <p className="mt-2 text-xs text-stone-700 leading-snug font-medium">
                  Upload student records to uncover patterns and recommended support.
                </p>

                <ul className="mt-3 space-y-1.5 text-[11px] text-stone-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Identify at-risk students</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Understand key factors</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Get AI-driven recommendations</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/faculty"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all"
              >
                <span>Launch Faculty View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
