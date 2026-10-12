"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Cpu,
  Zap,
  Play,
  Pause,
  SlidersHorizontal,
  ChevronRight,
  BarChart3,
  Users,
  AlertTriangle,
  RotateCcw,
  Check,
} from "lucide-react";

export function RichHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Step 2 interactive sandbox attendance inside preview
  const [demoAttendance, setDemoAttendance] = useState<number>(72);
  const isDebarred = demoAttendance < 75;

  // Step 4 interactive recovery simulation
  const [recoverySimulated, setRecoverySimulated] = useState<boolean>(false);

  const steps = [
    {
      stepNumber: "01",
      badge: "DATA INGESTION",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      title: "Universal Ingestion & Fuzzy Schema Mapping",
      subtitle:
        "Upload any college spreadsheet without reformatting. The engine matches non-standard column headers automatically.",
      metric: "99.4% Auto-Map Accuracy",
      icon: FileSpreadsheet,
    },
    {
      stepNumber: "02",
      badge: "MATHEMATICAL ENGINE",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "Non-Linear Statutory Scoring & Penalty Gates",
      subtitle:
        "Standard averages fail because a 9.5 CGPA student with 60% attendance is legally debarred. CampusIQ enforces statutory multipliers.",
      metric: "0.85× Statutory Multiplier",
      icon: Cpu,
    },
    {
      stepNumber: "03",
      badge: "EXPLAINABLE TRIAGE",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
      title: "360° Student Diagnostics & SHAP Risk Drivers",
      subtitle:
        "Mentors don't just see a score; they see why. Positive and negative driving signals identify the exact bottleneck.",
      metric: "7 Unified Collegiate Silos",
      icon: Sparkles,
    },
    {
      stepNumber: "04",
      badge: "PRESCRIPTIVE ACTION",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "Closed-Loop Dispatch & What-If Recovery",
      subtitle:
        "Simulate counterfactual recovery before intervening. Preview score uplift from attendance remedies and DSA bootcamps.",
      metric: "+24.5% Placement Uplift",
      icon: Zap,
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-4 sm:scroll-mt-6">
      <div className="rounded-3xl sm:rounded-[36px] bg-white border border-[#EAE5DC] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 sm:space-y-10 relative overflow-hidden">
        {/* Ambient decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-blue-700 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Real-Time Engine Walkthrough</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#111827] leading-tight">
              How CampusIQ Works in 4 Steps
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Explore how raw institutional spreadsheets are transformed into early debarment alerts and measurable student success.
            </p>
          </div>

          {/* Auto-Play Toggle & Step Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-all cursor-pointer shadow-2xs"
              title={isPlaying ? "Pause auto-walkthrough" : "Play auto-walkthrough"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono text-[11px]">Auto-Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-stone-600 fill-current" />
                  <span className="font-mono text-[11px]">Resume Tour</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Interactive Step Navigation Cards (Horizontal Grid) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            const Icon = st.icon;
            return (
              <button
                key={st.stepNumber}
                type="button"
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                  isActive
                    ? "bg-[#111827] text-white border-[#111827] shadow-lg shadow-black/10 scale-[1.01]"
                    : "bg-[#FAF8F5] text-stone-700 border-[#EAE5DC] hover:border-stone-400 hover:bg-stone-50"
                }`}
              >
                {/* Active Step Top Progress Bar Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-black tracking-wider ${
                      isActive ? "text-sky-300" : "text-stone-400"
                    }`}
                  >
                    STEP {st.stepNumber}
                  </span>
                  <div
                    className={`p-2 rounded-xl border ${
                      isActive
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white border-stone-200 text-stone-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-bold text-sm leading-snug line-clamp-2 ${
                      isActive ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {st.title}
                  </h3>
                  <div
                    className={`text-[11px] font-mono mt-1 ${
                      isActive ? "text-stone-300" : "text-blue-600 font-semibold"
                    }`}
                  >
                    {st.metric}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Step Rich Interactive Showcase Stage ── */}
        <div className="relative z-10 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] p-5 sm:p-8 lg:p-10 transition-all">
          {/* STEP 1: Universal Ingestion & Fuzzy Schema Mapping */}
          {activeStep === 0 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200/80">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage 01 • Ingestion Intelligence
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] mt-1">
                    Universal Schema Engine with Fuzzy Levenshtein Auto-Mapping
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                    Every college uses different spreadsheets: one says &quot;Attnd_Pct&quot;, another &quot;Biometric_Hrs&quot;. CampusIQ matches them instantly without forcing data cleaning.
                  </p>
                </div>
                <Link
                  href="/upload"
                  className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Test with Custom CSV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Interactive Visual Mapping Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800 pb-2 border-b border-stone-100">
                    <span className="font-mono text-stone-500">Raw College Header</span>
                    <span className="text-emerald-700">Auto-Mapped Canonical Pillar</span>
                  </div>

                  {[
                    { raw: "Roll_No / StudentID", canon: "student_id", conf: "100%", status: "Exact Key" },
                    { raw: "Biometric_Attnd_%", canon: "attendance_pct", conf: "99.4%", status: "Fuzzy Match" },
                    { raw: "Curr_CGPA_Score", canon: "cgpa", conf: "98.9%", status: "Fuzzy Match" },
                    { raw: "Active_Arrears_Count", canon: "backlogs", conf: "99.1%", status: "Synonym Match" },
                    { raw: "Hackathon_Contests", canon: "coding_score", conf: "96.5%", status: "Levenshtein" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-stone-50 border border-stone-200/60 font-mono"
                    >
                      <span className="text-stone-700 font-medium truncate max-w-[150px]">{row.raw}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-700 font-bold">→ {row.canon}</span>
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded font-bold">
                          {row.conf}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adaptive Rebalancing Callout */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wider font-mono">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Adaptive Weight Normalization</span>
                    </div>
                    <p className="text-xs text-blue-950 leading-relaxed">
                      If an uploaded college dataset does not include LMS or psychometric columns, CampusIQ dynamically re-balances the remaining weights to strictly sum to <strong>1.00</strong>.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/80 border border-blue-200/80 text-[11px] font-mono text-stone-700 space-y-1">
                    <div className="flex justify-between">
                      <span>∑ w_active = 0.85</span>
                      <span className="font-bold text-blue-700">w_norm = w_i / ∑ w_active</span>
                    </div>
                    <div className="text-stone-500 text-[10px]">Zero crashes • Always statistically valid</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Non-Linear Statutory Scoring & Penalty Gates */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200/80">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage 02 • Mathematical Modeling
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] mt-1">
                    Statutory Attendance Multipliers &amp; Compound Dampening
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                    Universities enforce hard legal attendance floors. Drag the slider below to test the instant non-linear multiplier effect on student scores.
                  </p>
                </div>
                <Link
                  href="/methodology"
                  className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Read Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Interactive Sandbox Slider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800">Adjust Attendance:</span>
                    <span
                      className={`font-mono text-xl font-black ${
                        isDebarred ? "text-rose-600" : "text-emerald-700"
                      }`}
                    >
                      {demoAttendance}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="55"
                    max="95"
                    value={demoAttendance}
                    onChange={(e) => setDemoAttendance(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>55%</span>
                    <span className="text-rose-600 font-bold">75% Statutory Cutoff</span>
                    <span>95%</span>
                  </div>

                  {isDebarred ? (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                      <div>
                        <strong>Statutory Debarment Gate Active:</strong> Score multiplied by <strong>0.85×</strong>. Student flagged for HOD review.
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <strong>Statutory Compliant:</strong> Full 1.00× multiplier applied. Student eligible for semester examinations.
                      </div>
                    </div>
                  )}
                </div>

                {/* Score Impact Display */}
                <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-3 font-mono text-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      CALCULATED SCORE IMPACT ($S^3$)
                    </span>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-stone-600">Base Weighted Score:</span>
                      <span className="text-base font-bold text-stone-850">84.0 / 100</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-stone-600">Statutory Multiplier:</span>
                      <span className={`font-bold ${isDebarred ? "text-rose-600" : "text-emerald-700"}`}>
                        {isDebarred ? "× 0.85 (Debarred)" : "× 1.00 (Eligible)"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between text-sm">
                      <span className="font-bold text-stone-900">Final Composite S³:</span>
                      <span
                        className={`text-2xl font-black ${
                          isDebarred ? "text-rose-600" : "text-emerald-700"
                        }`}
                      >
                        {isDebarred ? "71.4 / 100" : "84.0 / 100"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 font-sans">
                    CampusIQ catches students before semester exams, allowing timely attendance make-up before debarment is finalized.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: 360° Student Diagnostics & SHAP Risk Drivers */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200/80">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage 03 • Explainable AI
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] mt-1">
                    Explainable SHAP Waterfall: Understanding the &quot;Why&quot;
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                    Faculty mentors cannot act on opaque risk labels. CampusIQ details the precise positive and negative drivers contributing to the risk score.
                  </p>
                </div>
                <Link
                  href="/faculty"
                  className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Faculty Roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sample Profile Triage Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-stone-500">STU-0431</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Critical Triage
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-[#111827]">Divya Bhat</h4>
                    <p className="text-xs text-stone-500">CSE • Sem 6 • Section B</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                    <span className="text-xs text-stone-600">Composite S³:</span>
                    <span className="text-xl font-mono font-black text-rose-600">42.8 / 100</span>
                  </div>
                </div>

                {/* Top Negative Risk Factors */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                    Top Negative Drag Factors
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-50 border border-rose-100">
                      <span className="text-rose-950 font-medium">Attendance 68.4% &lt; 75%</span>
                      <span className="font-mono font-bold text-rose-700">-14.2 pts</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-50 border border-rose-100">
                      <span className="text-rose-950 font-medium">2 Active Theory Backlogs</span>
                      <span className="font-mono font-bold text-rose-700">-8.5 pts</span>
                    </div>
                  </div>
                </div>

                {/* Top Positive Factors */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    Top Positive Buffer Factors
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-emerald-950 font-medium">Hackathon &amp; Coding Aptitude</span>
                      <span className="font-mono font-bold text-emerald-700">+12.1 pts</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-emerald-950 font-medium">CGPA (7.8 SGPA Baseline)</span>
                      <span className="font-mono font-bold text-emerald-700">+6.4 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Closed-Loop Dispatch & What-If Recovery */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200/80">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage 04 • Actionable Prescriptions
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] mt-1">
                    Closed-Loop Recovery Simulation
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                    Faculty mentors simulate recovery outcomes before reaching out. See how timely interventions lift the student out of statutory danger.
                  </p>
                </div>
                <Link
                  href="/interventions"
                  className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Placement Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Before vs After Simulation Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-800">Interactive Intervention Simulation:</span>
                    <button
                      type="button"
                      onClick={() => setRecoverySimulated(!recoverySimulated)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        recoverySimulated
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 hover:bg-stone-300 text-stone-800"
                      }`}
                    >
                      {recoverySimulated ? "✓ Interventions Applied" : "Click to Apply Recovery"}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-stone-700">
                      <span className={`w-2 h-2 rounded-full ${recoverySimulated ? "bg-emerald-500" : "bg-stone-300"}`} />
                      <span>4-Week Remedial Lab Hours (+8% Attendance)</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <span className={`w-2 h-2 rounded-full ${recoverySimulated ? "bg-emerald-500" : "bg-stone-300"}`} />
                      <span>DSA LeetCode Placement Bootcamp Enrollment</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <span className={`w-2 h-2 rounded-full ${recoverySimulated ? "bg-emerald-500" : "bg-stone-300"}`} />
                      <span>1-on-1 Faculty Mentorship Scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Projected Outcome Card */}
                <div
                  className={`p-5 rounded-xl border transition-all ${
                    recoverySimulated
                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                      : "bg-white border-stone-200 text-stone-700"
                  }`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {recoverySimulated ? "Projected Post-Intervention" : "Current Baseline Status"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        recoverySimulated
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {recoverySimulated ? "Debarment Cleared" : "Statutory Risk"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs">Projected Score ($S^3$):</span>
                    <span
                      className={`text-2xl font-mono font-black ${
                        recoverySimulated ? "text-emerald-700" : "text-rose-600"
                      }`}
                    >
                      {recoverySimulated ? "78.5 / 100 (+35.7 pts)" : "42.8 / 100"}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-stone-500">
                    {recoverySimulated
                      ? "Student elevated from high debarment alert to Tier-1 placement drive eligibility."
                      : "Student currently at risk of missing campus recruitment drives due to attendance cutoff."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
