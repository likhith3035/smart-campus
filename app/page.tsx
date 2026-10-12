"use client";

import { useState } from "react";
import Link from "next/link";
import { initialStudents } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { 
  ArrowRight, 
  Play, 
  Search, 
  Bell, 
  Sparkles,
  TrendingUp, 
  Users, 
  AlertTriangle, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Building2, 
  BookOpen, 
  Award, 
  ChevronRight,
  ShieldAlert,
  Sliders,
  FileSpreadsheet,
  Activity,
  Zap,
  UserCheck,
  BarChart3
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from "recharts";

export default function CampusIQHomePage() {
  const [students] = useState<StudentProfile[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeWindowTab, setActiveWindowTab] = useState<string>("dashboard");

  // Filter urgent students for quick triage table
  const urgentStudents = students
    .filter((s) => s.overall_tier === "High Risk")
    .sort((a, b) => a.success_score - b.success_score)
    .slice(0, 6);

  // Mini Chart 1: Trend line data
  const trendData = [
    { month: "Jan", gpa: 7.1, attendance: 75, passRate: 82 },
    { month: "Feb", gpa: 7.2, attendance: 77, passRate: 84 },
    { month: "Mar", gpa: 7.0, attendance: 74, passRate: 80 },
    { month: "Apr", gpa: 7.4, attendance: 79, passRate: 86 },
    { month: "May", gpa: 7.3, attendance: 78, passRate: 85 },
    { month: "Jun", gpa: 7.5, attendance: 81, passRate: 89 },
  ];

  // Mini Chart 2: Donut risk distribution
  const riskDonutData = [
    { name: "Low Risk", value: 68, color: "#3B82F6" },
    { name: "Moderate Risk", value: 18, color: "#F59E0B" },
    { name: "High Risk", value: 14, color: "#EF4444" },
  ];

  // Mini Chart 3: Department bar comparison
  const deptBarData = [
    { dept: "CSE", gpa: 7.8 },
    { dept: "ECE", gpa: 7.2 },
    { dept: "ME", gpa: 6.9 },
    { dept: "CE", gpa: 6.5 },
    { dept: "IT", gpa: 7.4 },
    { dept: "BT", gpa: 7.1 },
  ];

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-300">
      {/* ───────────────────────────────────────────────────────────
          1. HERO SECTION (Exact CampusIQ Style)
      ─────────────────────────────────────────────────────────── */}
      <section className="pt-8 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Headline, Copy, CTA, Stats */}
          <div className="lg:col-span-5 space-y-7">
            {/* Kicker */}
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ AI-POWERED STUDENT ANALYTICS ]
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[62px] font-extrabold tracking-tight text-[#111827] leading-[1.08]">
              Turn Student Data <br />
              into <span className="font-serif-italic font-normal text-[#111827]">Brighter Futures.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-[#57534E] leading-relaxed max-w-lg">
              CampusIQ helps educational institutions identify at-risk students, provide personalized support, and improve academic and placement outcomes using data-driven insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-sm transition-all hover:gap-3"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-[#111827] text-sm font-semibold border border-[#E5E0D8] shadow-sm transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current text-[#111827] ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </Link>
            </div>

            {/* Metrics Row (4 Columns) */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#EAE5DC]">
              <div>
                <h3 className="text-3xl font-extrabold text-[#111827] font-sans">95%</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-snug">Early Risk Detection</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#111827] font-sans">3x</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-snug">Higher Engagement</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#111827] font-sans">60%</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-snug">Improved Retention</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#111827] font-sans">100+</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-snug">Institutions Can Use</p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Dashboard Window */}
          <div className="lg:col-span-7 relative">
            
            {/* The Dashboard Card Container */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5E0D8] card-shadow-lg relative z-20 space-y-5">
              
              {/* Window Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-[#111827]">CampusIQ</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    Live Telemetry
                  </span>
                </div>

                {/* Search Bar */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-stone-400 flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-stone-400" />
                  <span>Search students, departments...</span>
                </div>

                {/* User Pill & Bell */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 relative">
                    <Bell className="w-4 h-4" />
                    <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
                  </div>
                  <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold">
                      PS
                    </div>
                    <div className="hidden md:block text-left text-xs">
                      <div className="font-bold text-stone-900 leading-none">Dr. Priya Sharma</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">Administrator</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">Good morning, Dr. Priya. 👋</h3>
                  <p className="text-xs text-[#78716C]">Here&apos;s what&apos;s happening with your students today.</p>
                </div>
                <div className="text-right text-xs text-[#78716C] italic font-serif">
                  &ldquo;Data today, better students tomorrow.&rdquo;
                </div>
              </div>

              {/* 5 Mini KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#78716C] font-medium">
                    <span>Total Students</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#111827] font-sans">1,284</div>
                  <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                    ↑ 5.2%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#78716C] font-medium">
                    <span>At Risk Students</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#111827] font-sans">186</div>
                  <div className="text-[10px] font-semibold text-rose-500 flex items-center gap-0.5">
                    ↑ 14.5%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#78716C] font-medium">
                    <span>Average Attendance</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#111827] font-sans">78.6%</div>
                  <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                    ↑ 3.1%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#78716C] font-medium">
                    <span>Average GPA</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#111827] font-sans">7.4 <span className="text-xs text-stone-400">/10</span></div>
                  <div className="text-[10px] font-semibold text-blue-600 flex items-center gap-0.5">
                    ↑ 0.5
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#78716C] font-medium">
                    <span>Placement Ready</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#111827] font-sans">62%</div>
                  <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                    ↑ 8.3%
                  </div>
                </div>
              </div>

              {/* 3 Mini Charts Grid inside window */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                {/* Chart 1: Performance Trend (6 cols) */}
                <div className="md:col-span-5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827]">Academic Performance Trend</span>
                    <span className="text-[10px] text-[#78716C] bg-white px-1.5 py-0.5 rounded border border-stone-200">Last 6 Months</span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D8" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#78716C" }} stroke="#D6D3D1" />
                        <YAxis tick={{ fontSize: 9, fill: "#78716C" }} stroke="#D6D3D1" domain={[65, 95]} />
                        <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                        <Line type="monotone" dataKey="passRate" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2.5 }} />
                        <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} dot={{ r: 2.5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[10px] text-[#78716C]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Pass Rate</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Attendance</span>
                  </div>
                </div>

                {/* Chart 2: Donut Risk Distribution (3 cols) */}
                <div className="md:col-span-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2 flex flex-col justify-between">
                  <div className="text-xs font-bold text-[#111827]">Student Risk Distribution</div>
                  <div className="h-28 w-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDonutData}
                          innerRadius={28}
                          outerRadius={45}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {riskDonutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xs font-bold text-stone-900 leading-none">1,284</span>
                      <span className="text-[8px] text-stone-400">Students</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[9px] text-stone-600">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Low Risk</span>
                      <strong className="text-stone-900">68%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Moderate Risk</span>
                      <strong className="text-stone-900">18%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> High Risk</span>
                      <strong className="text-rose-600">14%</strong>
                    </div>
                  </div>
                </div>

                {/* Chart 3: Department Comparison Bar Chart (4 cols) */}
                <div className="md:col-span-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827]">Department Comparison</span>
                    <span className="text-[10px] text-[#78716C] bg-white px-1.5 py-0.5 rounded border border-stone-200">GPA</span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deptBarData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D8" vertical={false} />
                        <XAxis dataKey="dept" tick={{ fontSize: 9, fill: "#78716C" }} stroke="#D6D3D1" />
                        <YAxis tick={{ fontSize: 9, fill: "#78716C" }} stroke="#D6D3D1" domain={[5, 9]} />
                        <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                        <Bar dataKey="gpa" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center text-[10px] text-stone-400">
                    CSE • ECE • ME • CE • IT • BT
                  </div>
                </div>
              </div>

              {/* Bottom Quick Launch row inside Window */}
              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Real-time KPMG Decision Intelligence Engine Active</span>
                </span>
                <Link
                  href="/faculty"
                  className="font-bold text-stone-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <span>Open Full Faculty Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Architecture Campus Photography & Handwritten Note Backdrop */}
            <div className="mt-6 rounded-3xl overflow-hidden border border-[#E5E0D8] relative h-48 bg-stone-200 shadow-sm hidden sm:block">
              {/* Modern collegiate architectural backdrop */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1600&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-stone-900/10 backdrop-brightness-95" />

              {/* Handwritten Doodle Arrow & Text */}
              <div className="absolute top-4 right-8 z-10 flex flex-col items-end">
                <div className="font-handwriting text-2xl text-stone-800 rotate-[-4deg] tracking-wide font-bold drop-shadow-sm">
                  Better Students, <br />
                  <span className="text-stone-900">Brighter Futures</span>
                </div>
                {/* Curved Arrow SVG */}
                <svg className="w-16 h-12 text-stone-800 rotate-[-15deg] mt-1" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M10 50 Q 50 10 90 25" />
                  <polyline points="75,20 90,25 80,40" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          2. TRUSTED BY EDUCATIONAL INSTITUTIONS STRIP
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
            TRUSTED BY EDUCATIONAL INSTITUTIONS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center justify-center max-w-4xl mx-auto text-stone-600 font-medium text-sm">
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#EAE5DC] shadow-sm">
              <Building2 className="w-4 h-4 text-stone-500" />
              <span>Universities</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#EAE5DC] shadow-sm">
              <GraduationCap className="w-4 h-4 text-stone-500" />
              <span>Engineering Colleges</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#EAE5DC] shadow-sm">
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>Autonomous Institutions</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#EAE5DC] shadow-sm">
              <Users className="w-4 h-4 text-stone-500" />
              <span>Higher Education Networks</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3. KEY FEATURES (Bento Cards Section)
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-10">
          
          {/* Header Row */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ KEY FEATURES ]
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
                Everything you need <br />
                for student success.
              </h2>
              <div className="max-w-md space-y-4">
                <p className="text-sm text-[#57534E] leading-relaxed">
                  From academic performance to placement readiness, CampusIQ provides a complete view of each student&apos;s journey.
                </p>
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#111827] text-xs font-semibold border border-[#E5E0D8] shadow-sm transition-all"
                >
                  <span>Explore All Features</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Feature Cards (01, 02, 03, 04) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 01: Predict & Prevent */}
            <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-hover flex flex-col justify-between space-y-8">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-bold">01</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111827]">Predict & Prevent</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Identify at-risk students early using dual risk classification (Academic & Placement) and take timely action.
                </p>
              </div>
            </div>

            {/* 02: Personalized Support */}
            <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-hover flex flex-col justify-between space-y-8">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-bold">02</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111827]">Personalized Support</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Recommend prescriptive interventions based on individual needs, from mentor alerts to attendance recovery.
                </p>
              </div>
            </div>

            {/* 03: Placement Insights */}
            <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-hover flex flex-col justify-between space-y-8">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-bold">03</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111827]">Placement Insights</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Track coding test benchmarks, aptitude percentiles, mock interview performance, and verified industry skills.
                </p>
              </div>
            </div>

            {/* 04: Data-Driven Decisions */}
            <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-hover flex flex-col justify-between space-y-8">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-bold">04</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111827]">Data-Driven Decisions</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Give faculty and administrators the decision intelligence they need with SHAP-style explainable AI drivers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          4. LIVE TRIAGE WORKSPACE & ACTION PREVIEW
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h2 className="text-xl font-bold text-[#111827]">Immediate Intervention Triage Queue</h2>
              </div>
              <p className="text-xs text-[#57534E] mt-1">
                Live collegiate cohort records flagged by the AI engine. Click any student to open the 360° Profile & Explainable AI Waterfall.
              </p>
            </div>
            <Link
              href="/faculty"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] text-white hover:bg-black text-xs font-semibold shadow-sm transition-all"
            >
              <span>Explore All 600 Students</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StudentTable
            students={urgentStudents}
            onSelectStudent={(s) => setSelectedStudent(s)}
          />
        </div>
      </section>

      {/* Student 360 Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
