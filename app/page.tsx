"use client";

import { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { ThreeConstellationBackground } from "@/components/canvas/ThreeConstellationBackground";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  BarChart3,
  Users,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  Award,
  ChevronRight,
  ChevronDown,
  AlertOctagon,
  Check,
  Send,
  HelpCircle,
  Play,
  SlidersHorizontal,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  FileCheck,
  Scale,
} from "lucide-react";

export default function CampusIQLandingPage() {
  // ─── Interactive Feature 1: "How CampusIQ Thinks" 3-Stage Pipeline State
  const [activeStage, setActiveStage] = useState<number>(1);

  // ─── Interactive Feature 2: Institutional Impact Calculator State
  const [cohortSize, setCohortSize] = useState<number>(2400);

  // Calculations for impact
  const atRiskDetected = Math.round(cohortSize * 0.155);
  const debarmentPrevented = Math.round(cohortSize * 0.082);
  const advisingHoursSaved = Math.round(cohortSize * 2.4);
  const additionalPlacements = Math.round(cohortSize * 0.164);

  // ─── Interactive Feature 3: Archetype Explorer State
  const [selectedArchetype, setSelectedArchetype] = useState<number>(0);

  const archetypes = [
    {
      name: "The Scholar",
      subtitle: "High Academics, Low Placement & Coding Readiness",
      badge: "Placement Risk",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      accentColor: "#F59E0B",
      cgpa: "9.2 / 10",
      attendance: "94.5%",
      coding: "42 / 100",
      risk: "Placement Vulnerable",
      diagnosis: "Excels in university exams but lacks hands-on DSA problem-solving and mock interview exposure. At risk of missing Tier-1 placement drives.",
      prescription: "Auto-enroll in 4-week LeetCode Medium bootcamp, assign Industry Alumni Mentor, schedule mandatory weekly mock interviews.",
    },
    {
      name: "The Practical Builder",
      subtitle: "Strong Hackathon & Coding, Borderline Attendance/CGPA",
      badge: "Academic Risk",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      accentColor: "#3B82F6",
      cgpa: "6.4 / 10",
      attendance: "74.2%",
      coding: "91 / 100",
      risk: "Debarment Boundary",
      diagnosis: "High technical aptitude with multiple hackathon wins, but attends classes inconsistently. At immediate risk of statutory 75% exam debarment.",
      prescription: "Faculty advisor intervention to arrange flexible lab credits, remedial SGPA tutoring for theoretical courses, and placement fast-tracking.",
    },
    {
      name: "Consistent All-Rounder",
      subtitle: "Balanced Across Academics, Attendance, and Placement",
      badge: "Optimal / Benchmark",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      accentColor: "#10B981",
      cgpa: "8.9 / 10",
      attendance: "89.0%",
      coding: "86 / 100",
      risk: "Low / Thriving",
      diagnosis: "Consistent high performance across all 7 collegiate parameters with zero backlogs and top placement aptitude scores.",
      prescription: "Nominate for Tier-1 Super Dream recruiter drives, undergraduate research fellowships, and student mentor leadership roles.",
    },
    {
      name: "Critical Multi-Risk",
      subtitle: "Attendance Breach, Active Backlogs & Placement Deficit",
      badge: "Immediate Triage",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      accentColor: "#EF4444",
      cgpa: "5.4 / 10",
      attendance: "58.0%",
      coding: "28 / 100",
      risk: "Critical Multi-Risk",
      diagnosis: "Compound crisis across multiple silos: biometric attendance debarment, 2+ backlogs, and non-existent LMS activity.",
      prescription: "Immediate automated alert dispatched to HOD, 1-on-1 Faculty Mentor intervention, parental notification, and structured recovery track.",
    },
  ];

  // ─── Interactive Feature 4: Simulated Live Telemetry HUD state
  const [hudSimulatedMode, setHudSimulatedMode] = useState<"before" | "after">("before");

  // ─── Interactive Feature 5: Mathematical Penalty Sandbox State
  const [sandboxAttendance, setSandboxAttendance] = useState<number>(71);
  const [sandboxBacklogs, setSandboxBacklogs] = useState<number>(2);

  const isDebarred = sandboxAttendance < 75;
  const attendanceMultiplier = isDebarred ? 0.85 : 1.0;
  const backlogDampener = Math.round(Math.pow(0.9, sandboxBacklogs) * 100) / 100;
  const compositePenalty = Math.round(attendanceMultiplier * backlogDampener * 100) / 100;
  const baseScoreSample = 82;
  const penalizedScoreSample = Math.round(baseScoreSample * compositePenalty * 10) / 10;

  // ─── Interactive Feature 6: Siloed vs CampusIQ Paradigm Split State
  const [paradigmView, setParadigmView] = useState<"siloed" | "campusiq">("campusiq");

  // ─── Interactive Feature 7: FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does CampusIQ handle missing fields or non-standard college column headers?",
      answer: "CampusIQ features a Universal Schema Mapper with Fuzzy Levenshtein Distance and Synonyms matching. When a college uploads spreadsheets with headers like 'Attnd_Pct' or 'RollNo', CampusIQ automatically maps them to canonical schemas. Missing optional columns trigger adaptive normalized weighting, ensuring the model never crashes.",
    },
    {
      question: "Why does CampusIQ use non-linear statutory multiplier gates instead of simple weighted averages?",
      answer: "Linear weighted scoring fails because a student with a 9.8 CGPA who only attends 50% of classes will still pass with an average score, yet is legally debarred from sitting exams under university statutes. CampusIQ applies strict non-linear penalty gates: falling below 75% attendance triggers an immediate 0.85× multiplier penalty, and active backlogs apply exponential dampening (0.90^k).",
    },
    {
      question: "How is student data privacy and institutional compliance preserved?",
      answer: "CampusIQ performs client-side data parsing and local storage operations without transmitting sensitive PII (Personally Identifiable Information) to external servers. Column headers and scores can be pseudonymized with student IDs to ensure strict compliance with institutional guidelines and data protection regulations.",
    },
    {
      question: "Can prescriptive recovery plans be exported directly into college ERP / LMS systems?",
      answer: "Yes. All prescriptive actions, risk tags, and explainable SHAP driver logs can be exported as structured CSV files with a single click, ready for seamless import into university enterprise resource planning (ERP) or mentor management portals.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111827] overflow-x-hidden animate-in fade-in duration-300">
      {/* ───────────────────────────────────────────────────────────
          TOP DEDICATED LANDING NAVIGATION BAR
      ─────────────────────────────────────────────────────────── */}
      <LandingNavbar />

      <div className="space-y-24 sm:space-y-32 pb-24">
        {/* ───────────────────────────────────────────────────────────
            1. HERO SECTION WITH EXACT ARCHITECTURAL FRAMING & MOCKUP
        ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
          {/* Three.js Interactive Ambient Constellation Canvas Background */}
          <ThreeConstellationBackground
            particleCount={70}
            maxDistance={110}
            className="absolute inset-0 pointer-events-none opacity-35 z-0"
          />

          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-linear-to-tr from-blue-100/25 via-amber-100/20 to-emerald-100/15 blur-3xl rounded-full pointer-events-none -z-10" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
            
            {/* Main Hero Header Area */}
            <div className="text-center space-y-6 max-w-4xl mx-auto relative">
              
              {/* Handwritten Annotation 1 (Left): "From data to brighter futures." */}
              <div className="hidden xl:block absolute -left-20 top-16 max-w-[130px] text-left select-none pointer-events-none z-20">
                <p className="font-handwriting text-stone-600 text-xl leading-tight">
                  From<br />data to<br />brighter<br />futures.
                </p>
                {/* Hand-drawn SVG curled arrow */}
                <svg
                  className="w-14 h-14 text-stone-400 mt-1 ml-4"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M10 10 C 35 15, 45 35, 40 52" strokeLinecap="round" />
                  <path d="M33 46 L 40 52 L 46 44" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Handwritten Annotation 2 (Right): "Empowering educators. Advancing students." */}
              <div className="hidden xl:block absolute -right-20 top-12 max-w-[150px] text-left select-none pointer-events-none z-20">
                <p className="font-handwriting text-stone-600 text-xl leading-tight">
                  Empowering<br />educators.<br />Advancing<br />students.
                </p>
                {/* Hand-drawn SVG curled arrow pointing inward */}
                <svg
                  className="w-14 h-14 text-stone-400 mt-1 ml-6 -scale-x-100"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M10 10 C 35 15, 45 35, 40 52" strokeLinecap="round" />
                  <path d="M33 46 L 40 52 L 46 44" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Top Pill Badge: ● KPMG IN INDIA HACKATHON · DECISION INTELLIGENCE */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/95 border border-stone-200/90 shadow-2xs text-[10px] sm:text-[11px] font-mono tracking-wider text-stone-700 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span className="uppercase font-bold text-stone-900">
                  KPMG IN INDIA HACKATHON
                </span>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <span className="uppercase font-semibold text-purple-700 hidden sm:inline">
                  DECISION INTELLIGENCE
                </span>
              </div>

              {/* Hero Headline: Exact typography with Italic Serif & Warm Highlight */}
              <h1 className="text-[34px] sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#111827] leading-[1.12] sm:leading-[1.08] max-w-4xl mx-auto">
                Turn student data <br />
                into earlier, smarter <br />
                <span className="font-serif-italic font-normal tracking-normal text-[#111827] relative inline-block">
                  student success.
                  <span className="absolute -bottom-1 left-0 w-full h-1.5 sm:h-2 bg-amber-300/60 -z-10 rounded-full"></span>
                </span>
              </h1>

              {/* Hero Subtitle */}
              <p className="text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                Unify academic, attendance, LMS, engagement and placement signals to identify students who may need support — and help faculty take informed action.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <Link
                  href="/home"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:gap-2.5 active:scale-95"
                >
                  <span>Explore the platform</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-[#111827] text-sm font-semibold border border-stone-200/90 shadow-2xs hover:border-stone-400 transition-all active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full border border-stone-400 flex items-center justify-center text-stone-700">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>See how it works</span>
                </a>
              </div>

              {/* Quick Mobile Feature Launchers (Instant 1-Click Access) */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 px-1">
                <Link
                  href="/faculty"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold shadow-2xs transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>🎯 What-If Simulator</span>
                </Link>
                <Link
                  href="/home"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs transition-all active:scale-95"
                >
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>📄 Dean&apos;s Governance Brief</span>
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs transition-all active:scale-95"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>⚡ Upload Custom Data</span>
                </Link>
              </div>

              {/* 3 Feature Micro-Cards (Horizontal Touch Carousel on Mobile) */}
              <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-4 pt-4 sm:pt-6 max-w-4xl mx-auto overflow-x-auto pb-2 px-2 sm:px-0 scrollbar-none snap-x">
                {/* Card 1 */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-2xs hover:border-blue-200 transition-all shrink-0 snap-center min-w-[240px] sm:min-w-0">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-stone-900">Unified student profiles</div>
                    <div className="text-[11px] text-stone-500">Integrate data from multiple sources</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-2xs hover:border-emerald-200 transition-all shrink-0 snap-center min-w-[240px] sm:min-w-0">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-stone-900">Explainable success scores</div>
                    <div className="text-[11px] text-stone-500">Understand key contributing factors</div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-2xs hover:border-amber-200 transition-all shrink-0 snap-center min-w-[240px] sm:min-w-0">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-stone-900">Actionable interventions</div>
                    <div className="text-[11px] text-stone-500">Enable timely, targeted support</div>
                  </div>
                </div>
              </div>

            </div>

            {/* ───────────────────────────────────────────────────────────
                THE EXACT EMBEDDED DASHBOARD PREVIEW COMPONENT
            ─────────────────────────────────────────────────────────── */}
            <div className="pt-4">
              <LandingDashboardPreview />
            </div>

            {/* Streaming Telemetry Activity Marquee */}
            <div className="max-w-4xl mx-auto p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-[#EAE5DC] shadow-xs flex items-center gap-3 overflow-hidden text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111827] text-white font-mono text-[10px] font-bold uppercase shrink-0">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Live Telemetry</span>
              </div>
              <div className="text-[11px] text-[#57534E] truncate flex items-center gap-4">
                <span>🔴 <strong>STU-0431 (Divya Bhat):</strong> Attendance 68.4% &lt; 75% → Non-linear gate engaged &amp; mentor notified.</span>
                <span className="text-stone-300">•</span>
                <span>🟢 <strong>STU-0892 (Rahul Verma):</strong> Coding assessment +22 pts → Placement tier elevated.</span>
                <span className="text-stone-300">•</span>
                <span>🟡 <strong>STU-0114 (Ananya Rao):</strong> LMS submission velocity drop flagged for early outreach.</span>
              </div>
            </div>

            {/* Simulated Live Decision Engine Simulation */}
            <div id="telemetry" className="max-w-4xl mx-auto rounded-3xl bg-white/90 backdrop-blur-md border border-[#E5E0D8] p-5 sm:p-7 card-shadow-lg space-y-6">
            
            {/* HUD Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-[#111827] font-mono uppercase tracking-wider">
                    Live Telemetry HUD — Real-Time Persona Analysis
                  </span>
                  <div className="text-[11px] text-[#78716C]">
                    Simulating student trajectory before & after closed-loop algorithmic intervention
                  </div>
                </div>
              </div>

              {/* Simulation Toggle Switch */}
              <div className="flex items-center p-1 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs font-semibold self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={() => setHudSimulatedMode("before")}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all ${
                    hudSimulatedMode === "before"
                      ? "bg-[#111827] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  🔴 At-Risk Detection
                </button>
                <button
                  type="button"
                  onClick={() => setHudSimulatedMode("after")}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all ${
                    hudSimulatedMode === "after"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  🟢 Prescriptive Recovery
                </button>
              </div>
            </div>

            {/* Student Profile Simulation Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left Column: Student Header & S3 Score Dial */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-3 text-center md:text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-stone-500">STU-2024-0431</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      hudSimulatedMode === "before"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {hudSimulatedMode === "before" ? "High Risk" : "Intervention Active"}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#111827]">Divya Bhat</h3>
                  <p className="text-xs text-[#78716C]">Computer Science • Semester 6</p>
                </div>

                <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                  <span className="text-xs text-stone-600">Calculated $S^3$:</span>
                  <span
                    className={`font-mono text-2xl font-black ${
                      hudSimulatedMode === "before" ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {hudSimulatedMode === "before" ? "42.8 / 100" : "78.5 / 100"}
                  </span>
                </div>
              </div>

              {/* Middle Column: 4 Core Indicators */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Attendance (Statutory 75% Gate):</span>
                    <span className="font-mono font-bold text-stone-900">
                      {hudSimulatedMode === "before" ? "58.4% (Barred)" : "76.5% (Eligible)"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hudSimulatedMode === "before" ? "bg-rose-500 w-[58%]" : "bg-emerald-500 w-[76%]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Active Backlogs Penalty:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {hudSimulatedMode === "before" ? "2 Backlogs (0.81×)" : "0 Active (1.00×)"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hudSimulatedMode === "before" ? "bg-amber-500 w-[45%]" : "bg-emerald-500 w-[95%]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Coding Assessment Index:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {hudSimulatedMode === "before" ? "32 / 100" : "74 / 100"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hudSimulatedMode === "before" ? "bg-blue-400 w-[32%]" : "bg-blue-600 w-[74%]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Prescriptive Dispatch Action */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-stone-900 font-bold uppercase tracking-wider text-[10px]">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Prescriptive Action Protocol</span>
                </div>
                {hudSimulatedMode === "before" ? (
                  <div className="space-y-1.5 text-[#57534E]">
                    <p className="font-medium text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-100 text-[11px]">
                      ⚠️ <strong>Urgent:</strong> Below 75% attendance cutoff. Statutory disbarment warning dispatched.
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Recommendation: 1-on-1 Faculty Advisor counseling and remedial DSA laboratory enrollment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-[#57534E]">
                    <p className="font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100 text-[11px]">
                      ✅ <strong>Intervention Logged:</strong> Biometric hours restored; remedial exam passed.
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Result: Student cleared for semester examinations and Tier-2 placement campus drive.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          2. INSTITUTIONAL TELEMETRY STRIP (4 Hard Pillars)
      ─────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">94.8%</div>
            <div className="text-xs font-bold text-stone-900">Early Detection</div>
            <p className="text-[11px] text-[#78716C] leading-snug">Pre-exam predictive accuracy before university semester cutoffs.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">7 Silos</div>
            <div className="text-xs font-bold text-stone-900">Unified Ingestion</div>
            <p className="text-[11px] text-[#78716C] leading-snug">Biometric, LMS, coding platforms, grades, and faculty sentiment.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono">&lt; 48 hrs</div>
            <div className="text-xs font-bold text-stone-900">Closed-Loop Action</div>
            <p className="text-[11px] text-[#78716C] leading-snug">Automated mentor assignment, HOD alerts, and remediation playbooks.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">+18.4%</div>
            <div className="text-xs font-bold text-stone-900">Placement Uplift</div>
            <p className="text-[11px] text-[#78716C] leading-snug">Measurable increase in campus placement eligibility and offers.</p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3. PARADIGM SHIFT: SILOED SPREADSHEETS VS. CAMPUSTIQ
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-lg space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ PARADIGM SHIFT ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              Why Traditional College Dashboards Fail
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Universities don&apos;t suffer from a lack of student data; they suffer from fragmented silos and post-mortem reporting.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center">
            <div className="p-1 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs font-semibold inline-flex">
              <button
                type="button"
                onClick={() => setParadigmView("siloed")}
                className={`px-4 py-2 rounded-full transition-all ${
                  paradigmView === "siloed"
                    ? "bg-[#111827] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Fragmented Campus Silos (Traditional)
              </button>
              <button
                type="button"
                onClick={() => setParadigmView("campusiq")}
                className={`px-4 py-2 rounded-full transition-all ${
                  paradigmView === "campusiq"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                CampusIQ Decision Intelligence
              </button>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className={`p-6 rounded-2xl border transition-all ${
              paradigmView === "siloed"
                ? "bg-rose-50/50 border-rose-200 ring-2 ring-rose-300/40"
                : "bg-[#FAF8F5] border-stone-200 opacity-60"
            }`}>
              <div className="text-xs font-mono font-bold text-rose-700 uppercase mb-2">The Traditional Reality</div>
              <h3 className="font-extrabold text-base text-[#111827] mb-3">Isolated Silos &amp; Post-Mortem Reporting</h3>
              <ul className="space-y-2.5 text-xs text-[#57534E]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Biometric RFID Data:</strong> Stored on standalone turnstile hardware, analyzed only at end-semester disbarment meetings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>LMS Activity:</strong> Moodle/Canvas submissions never correlated with academic GPA or dropout danger.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Coding Portals:</strong> LeetCode/HackerRank practice remains hidden from placement cell coordinators.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Action Model:</strong> Faculty learn of student failure <em>after</em> grades are published and credits are lost.</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              paradigmView === "campusiq"
                ? "bg-blue-50/50 border-blue-200 ring-2 ring-blue-300/40 shadow-xs"
                : "bg-[#FAF8F5] border-stone-200 opacity-60"
            }`}>
              <div className="text-xs font-mono font-bold text-blue-700 uppercase mb-2">The CampusIQ Synchrony</div>
              <h3 className="font-extrabold text-base text-[#111827] mb-3">Unified Mathematical Engine &amp; Prescriptive Action</h3>
              <ul className="space-y-2.5 text-xs text-[#57534E]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Normalization:</strong> Heterogeneous spreadsheets unified in &lt;60s via Universal Schema Mapper.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Statutory Multiplier Gates:</strong> 0.85× attendance penalty enforced dynamically before exam registration cutoffs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Explainable AI SHAP Drivers:</strong> Mentors see the exact percentage contribution of every factor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Closed-Loop Remediation:</strong> Auto-assigns mentors, parent alerts, and mock interviews within 48 hours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          4. INTERACTIVE MATHEMATICAL PENALTY SANDBOX
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-stone-900 to-stone-800 text-white card-shadow-lg space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-700">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-stone-400 font-semibold">
                [ LIVE MATHEMATICAL SANDBOX ]
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
                Interactive Non-Linear Penalty Simulator
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Drag the sliders to see how real-world academic statutes damp the composite student score.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-300">
                Formula: S³ = [ ∑ wᵢ · Iᵢ ] × Penalty_Attd × Penalty_Backlogs
              </span>
            </div>
          </div>

          {/* Interactive Controls & Real-Time Output */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Control 1: Attendance Slider */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-200">Biometric Attendance:</span>
                <span className={`font-mono text-base font-extrabold ${isDebarred ? "text-rose-400" : "text-emerald-400"}`}>
                  {sandboxAttendance}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={sandboxAttendance}
                onChange={(e) => setSandboxAttendance(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-stone-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>50%</span>
                <span className="text-amber-400 font-bold">75% Cutoff</span>
                <span>100%</span>
              </div>

              {isDebarred ? (
                <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-semibold flex items-center gap-1.5 animate-pulse">
                  <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                  <span>Statutory Gate: 0.85× Penalty Enforced!</span>
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Exams Eligible (1.00× Multiplier)</span>
                </div>
              )}
            </div>

            {/* Control 2: Backlogs Counter */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-200">Active Course Backlogs:</span>
                <span className="font-mono text-base font-extrabold text-amber-400">
                  {sandboxBacklogs} {sandboxBacklogs === 1 ? "Subject" : "Subjects"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSandboxBacklogs(num)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      sandboxBacklogs === num
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-stone-700 text-stone-300 hover:bg-stone-600"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="p-2 rounded-xl bg-stone-700/60 border border-stone-600 text-stone-300 text-[11px] font-mono flex items-center justify-between">
                <span>Dampening (0.90^{sandboxBacklogs}):</span>
                <strong className="text-white">{backlogDampener}×</strong>
              </div>
            </div>

            {/* Output Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-600 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Composite Multiplier Result
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-400">Total Penalty Multiplier:</span>
                  <span className="font-mono text-2xl font-black text-white">
                    {compositePenalty}×
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-stone-400">Score Impact (82.0 Base):</span>
                  <span className="font-mono text-xl font-bold text-amber-400">
                    {penalizedScoreSample} <span className="text-xs text-stone-500 font-normal">/ 100</span>
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 border-t border-stone-700/80 pt-2 leading-tight">
                {isDebarred || sandboxBacklogs > 0
                  ? `Math protects the institution: score reduced by ${Math.round((1 - compositePenalty) * 100)}% due to active academic risk gates.`
                  : "Zero statutory penalties active. Student operating at 100% potential."}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          5. "HOW CAMPUSTIQ THINKS" — 3-STAGE INTERACTIVE PIPELINE
      ─────────────────────────────────────────────────────────── */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EAE5DC] card-shadow-lg space-y-8">
          
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ SYSTEM ARCHITECTURE ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              How the CampusIQ Engine Thinks
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              From raw fragmented spreadsheets to mathematical composite intelligence and closed-loop faculty dispatches.
            </p>
          </div>

          {/* Step Selector Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveStage(1)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStage === 1
                  ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                  : "bg-[#FAF8F5] text-stone-700 border-[#EAE5DC] hover:border-stone-400"
              }`}
            >
              <div className="text-[10px] font-mono font-bold opacity-75">STAGE 01</div>
              <div className="text-sm font-bold mt-0.5">Multi-Silo Normalization</div>
              <div className="text-[11px] opacity-80 mt-1">Universal schema mapping &amp; min-max adaptive calibration.</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveStage(2)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStage === 2
                  ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                  : "bg-[#FAF8F5] text-stone-700 border-[#EAE5DC] hover:border-stone-400"
              }`}
            >
              <div className="text-[10px] font-mono font-bold opacity-75">STAGE 02</div>
              <div className="text-sm font-bold mt-0.5">Non-Linear Statutory Gates</div>
              <div className="text-[11px] opacity-80 mt-1">Statutory attendance thresholds &amp; compound active backlog penalties.</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveStage(3)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStage === 3
                  ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                  : "bg-[#FAF8F5] text-stone-700 border-[#EAE5DC] hover:border-stone-400"
              }`}
            >
              <div className="text-[10px] font-mono font-bold opacity-75">STAGE 03</div>
              <div className="text-sm font-bold mt-0.5">Closed-Loop Dispatch</div>
              <div className="text-[11px] opacity-80 mt-1">Automated mentor assignment, parent alert &amp; intervention logs.</div>
            </button>
          </div>

          {/* Active Stage Interactive Showcase */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] max-w-3xl mx-auto">
            {activeStage === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider font-mono">
                  <Layers className="w-4 h-4" />
                  <span>Stage 1: Multi-Silo Data Ingestion &amp; Schema Auto-Mapping</span>
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  Heterogeneous Silos Converted into Canonical Signals
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-3xl">
                  Colleges maintain data in disconnected files: biometrics on physical machines, LMS marks in CSV exports, and coding scores in external portals. CampusIQ normalizes all metrics into standardized $I_i \in [0, 100]$ space with adaptive weight fallback.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-mono">Academic (w=0.25)</span>
                    <div className="font-bold text-stone-900 mt-0.5">CGPA &amp; Trend</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-mono">Attendance (w=0.20)</span>
                    <div className="font-bold text-stone-900 mt-0.5">Biometric RFID</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-mono">Placement (w=0.20)</span>
                    <div className="font-bold text-stone-900 mt-0.5">Coding &amp; Mock</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-mono">Engagement (w=0.15)</span>
                    <div className="font-bold text-stone-900 mt-0.5">LMS Submissions</div>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>Stage 2: Mathematical Non-Linear Penalty Gates</span>
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  Real-World Academic Policies Enforced by Math
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-3xl">
                  Linear scoring fails because a student with a 9.5 CGPA who attends 40% of classes is barred from taking final exams by university statutes. CampusIQ enforces non-linear statutory multiplier gates:
                </p>
                <div className="p-4 rounded-xl bg-white border border-stone-200 font-mono text-xs text-[#111827] space-y-2">
                  <div className="font-bold text-sm text-stone-900 overflow-x-auto whitespace-nowrap py-1">
                    {'S³ = [ ∑ (wᵢ · Iᵢ) ] × Penalty_Attendance × Penalty_Backlogs'}
                  </div>
                  <div className="text-[11px] text-[#78716C] grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div>• If Attendance &lt; 75%: 0.85× statutory penalty applied</div>
                    <div>• Compound Backlog Dampening: 0.90^(active_backlogs)</div>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Stage 3: Automated Closed-Loop Action Protocol</span>
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  From Insights to Prescriptive Execution
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-3xl">
                  Traditional dashboards report failure after the semester ends. CampusIQ automatically generates categorized action plans with assigned owners and status tracking:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase">Urgent</span>
                    <div className="font-bold text-stone-900 text-xs">Statutory Counseling</div>
                    <div className="text-[11px] text-stone-500">1-on-1 advisor session before semester cutoff.</div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">Skill Gap</span>
                    <div className="font-bold text-stone-900 text-xs">DSA Coding Cohort</div>
                    <div className="text-[11px] text-stone-500">Auto-assigned LeetCode problem modules.</div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase">Super Dream</span>
                    <div className="font-bold text-stone-900 text-xs">Tier-1 Placement Fast-Track</div>
                    <div className="text-[11px] text-stone-500">Alumni mentorship &amp; premium resume referral.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          6. INSTITUTIONAL COHORT IMPACT CALCULATOR WITH PRESETS
      ─────────────────────────────────────────────────────────── */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-[#FAF7F2] to-white border border-[#EAE5DC] card-shadow-lg space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
                [ INSTITUTIONAL ROI &amp; IMPACT CALCULATOR ]
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-1">
                Calculate Your Campus Impact
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                Select your institution size or slide to see projected retention and placement outcomes.
              </p>
            </div>

            {/* Presets & Slider control */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 min-w-[300px]">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <span>Quick Presets:</span>
                <div className="flex gap-1.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setCohortSize(800)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      cohortSize === 800 ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    800
                  </button>
                  <button
                    type="button"
                    onClick={() => setCohortSize(2400)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      cohortSize === 2400 ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    2.4k
                  </button>
                  <button
                    type="button"
                    onClick={() => setCohortSize(6000)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      cohortSize === 6000 ? "bg-[#111827] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    6.0k
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-700">Student Cohort Size:</span>
                <span className="font-mono font-extrabold text-blue-600 text-base">{cohortSize.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="8000"
                step="100"
                value={cohortSize}
                onChange={(e) => setCohortSize(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>200</span>
                <span>4,000</span>
                <span>8,000</span>
              </div>
            </div>
          </div>

          {/* Projected Metric Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 card-shadow space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-rose-600">
                Debarments Prevented
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                ~{debarmentPrevented}
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Students saved from exam disqualification through 75% early warnings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 card-shadow space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-amber-600">
                At-Risk Early Flags
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                {atRiskDetected}
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Students flagged with explainable drivers for targeted mentorship.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 card-shadow space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-blue-600">
                Advising Hours Reclaimed
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                {advisingHoursSaved.toLocaleString()} hrs
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Faculty advising time saved through automated diagnostic summaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 card-shadow space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-emerald-600">
                Additional Placements
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-mono">
                +{additionalPlacements}
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Extra students placed by closing skill gaps before recruiter drives.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          7. 4 AI STUDENT ARCHETYPES MATRIX (Bonus Feature)
      ─────────────────────────────────────────────────────────── */}
      <section id="archetypes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
                [ KPMG BONUS CREDIT: UNSUPERVISED CLUSTERING ]
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-1">
                4 AI Student Personas Discovered by Clustering
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-2xl">
                Unsupervised K-Means clustering groups students into actionable behavioral archetypes for personalized institutional care.
              </p>
            </div>

            <Link
              href="/segmentation"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-[#111827] shadow-xs"
            >
              <span>Explore Scatter Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Archetype Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {archetypes.map((arch, idx) => (
              <button
                key={arch.name}
                type="button"
                onClick={() => setSelectedArchetype(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedArchetype === idx
                    ? "bg-white border-stone-900 shadow-md ring-2 ring-stone-900/10"
                    : "bg-[#FAF8F5] border-[#EAE5DC] hover:bg-white text-stone-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${arch.badgeColor}`}>
                    {arch.badge}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: arch.accentColor }} />
                </div>
                <div className="font-bold text-sm text-[#111827] mt-2">{arch.name}</div>
                <div className="text-[11px] text-[#78716C] mt-0.5 line-clamp-1">{arch.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Selected Archetype Deep Dive Card */}
          {(() => {
            const arch = archetypes[selectedArchetype];
            return (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-stone-500">Archetype Deep-Dive</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">{arch.name}</h3>
                    <p className="text-xs text-[#78716C]">{arch.subtitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${arch.badgeColor}`}>
                    {arch.risk}
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/80">
                    <span className="text-[10px] text-stone-500 font-mono">Academic CGPA</span>
                    <div className="font-bold text-base text-stone-900 font-mono mt-0.5">{arch.cgpa}</div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/80">
                    <span className="text-[10px] text-stone-500 font-mono">Biometric Attendance</span>
                    <div className="font-bold text-base text-stone-900 font-mono mt-0.5">{arch.attendance}</div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/80">
                    <span className="text-[10px] text-stone-500 font-mono">Coding Benchmark</span>
                    <div className="font-bold text-base text-stone-900 font-mono mt-0.5">{arch.coding}</div>
                  </div>
                </div>

                {/* Diagnosis & Prescription */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <span className="font-bold text-stone-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                      Algorithmic Diagnosis
                    </span>
                    <p className="text-[#57534E] leading-relaxed">{arch.diagnosis}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1.5">
                    <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      Automated Prescriptive Action
                    </span>
                    <p className="text-blue-950 leading-relaxed">{arch.prescription}</p>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          8. INSTITUTIONAL ACCREDITATION & STATUTORY ALIGNMENT
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ ACCREDITATION READINESS ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Engineered for Institutional Accreditation Audits
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Direct metric mapping for NBA, NAAC, NIRF, and ABET accreditation evidence portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                NBA
              </div>
              <h3 className="font-bold text-sm text-[#111827]">Outcome Based Education</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Criterion 4 &amp; 5: Document continuous improvement (CQI) and student performance tracking with verified intervention logs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                NAAC
              </div>
              <h3 className="font-bold text-sm text-[#111827]">Criteria 2.6 &amp; 5.1</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Student Learning Outcomes (SLOs), slow vs. advanced learner segmentation, and evidence-backed faculty mentorship records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                NIRF
              </div>
              <h3 className="font-bold text-sm text-[#111827]">Graduation Outcome (GO)</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Higher median placement packages and reduced academic backlogs directly improve national institutional ranking scores.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EAE5DC] card-shadow space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                ABET
              </div>
              <h3 className="font-bold text-sm text-[#111827]">Student Progression</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Verifiable longitudinal cohort tracking across technical problem-solving and ethical collegiate responsibility indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          9. ARCHITECTURE & 7-PILLAR BENTO GRID
      ─────────────────────────────────────────────────────────── */}
      <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
              [ ENTERPRISE READINESS ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Engineered for Real Institutions
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Built to withstand missing fields, disparate column headers, and diverse accreditation guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento 1: Universal Schema Mapper */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#111827]">Universal Schema Mapper</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Fuzzy Levenshtein Distance &amp; Synonym matcher automatically identifies disparate ERP column names (e.g. &ldquo;Attnd_Pct&rdquo;, &ldquo;SGPA_Sem4&rdquo;).
                </p>
              </div>
              <Link href="/upload" className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
                <span>Test Live Ingestion Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento 2: Dual Risk Vector Engine */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#111827]">Dual Risk Vectors</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Decouples Academic Failure Risk from Placement Deficit Risk. A 9.0 CGPA student can still be flagged as high-risk for campus hiring.
                </p>
              </div>
              <Link href="/faculty" className="text-xs font-bold text-amber-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
                <span>View Risk Matrix in Faculty Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento 3: Explainable AI SHAP Waterfall */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#111827]">Transparent SHAP Explanations</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Zero black-box AI. Every student card presents an audited waterfall chart detailing the positive &amp; negative impact of every single metric.
                </p>
              </div>
              <Link href="/methodology" className="text-xs font-bold text-purple-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
                <span>Read Mathematical Spec</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          10. INTERACTIVE FAQ ACCORDION
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
            [ CLARITY &amp; GOVERNANCE ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E]">
            Common architectural and operational questions from deans and evaluation juries.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-stone-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-stone-50/50 transition-colors"
                >
                  <span className="font-bold text-sm text-[#111827]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#57534E] leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          11. BOTTOM CALL TO ACTION
      ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#111827] text-white card-shadow-lg relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-stone-400 font-bold uppercase tracking-widest">
              [ READY FOR INSTITUTIONAL EVALUATION ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Test CampusIQ with Live Cohort Data
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Explore the 600-student faculty triage workspace, review prescriptive interventions, or upload your own college spreadsheet.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-stone-100 text-xs font-bold shadow-md transition-all"
            >
              <span>Enter Campus Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faculty"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-all"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Faculty Workspace</span>
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Upload Custom Dataset</span>
            </Link>
          </div>
        </div>
      </section>

      </div>

      {/* ───────────────────────────────────────────────────────────
          MOBILE FLOATING ACTION DOCK (Fixed at bottom on phones)
      ─────────────────────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#111827]/95 text-white backdrop-blur-xl rounded-2xl p-2.5 border border-stone-700/80 shadow-2xl flex items-center justify-between gap-2 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold font-mono tracking-tight">CampusIQ</span>
          <span className="text-[9px] text-amber-400 font-mono font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
            HACKATHON
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/faculty"
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>What-If</span>
          </Link>
          <Link
            href="/home"
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-extrabold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <span>Launch</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
          </Link>
        </div>
      </div>
    </div>
  );
}

