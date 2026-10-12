"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  GitFork,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Upload,
  Sparkles,
  ShieldAlert,
  Play,
  Pause,
  Check,
  Info,
  Smartphone,
  Zap,
} from "lucide-react";

export function RichHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Step 3 interactive attendance slider
  const [demoAttendance, setDemoAttendance] = useState<number>(71);
  const isDebarred = demoAttendance < 75;

  // Step 4 interactive recovery toggle
  const [recoveryApplied, setRecoveryApplied] = useState<boolean>(false);

  // 4 Workflow Steps matching the exact inspiration architecture
  const steps = [
    {
      id: "import",
      number: 1,
      tabTitle: "1. Import & Validate",
      icon: Database,
      stepBadge: "STEP 1",
      title: "Import & Validate Your Student Data",
      description:
        "Upload institutional data files (CSV or Excel), and let CampusIQ validate, clean, and prepare records for analysis.",
      bullets: [
        "Support for CSV, XLS, and XLSX formats with universal fallback",
        "Automatic validation, missing value detection, and type inference",
        "Secure client-side processing with zero external data exposure",
      ],
      primaryCta: { label: "Upload Data File", href: "/upload" },
      secondaryCta: { label: "Try a Sample CSV →", href: "/home" },
    },
    {
      id: "map",
      number: 2,
      tabTitle: "2. Map Data Fields",
      icon: GitFork,
      stepBadge: "STEP 2",
      title: "Universal Schema & Fuzzy Auto-Mapping",
      description:
        "Every college formats headers differently. Our fuzzy Levenshtein engine maps disparate columns to canonical pillars.",
      bullets: [
        "Fuzzy string distance & synonym detection across 7 collegiate silos",
        "Dynamic weight re-normalization when optional columns are absent",
        "Zero schema-break crashes with statistically consistent scores",
      ],
      primaryCta: { label: "View Schema Mapper", href: "/methodology" },
      secondaryCta: { label: "Review Specs →", href: "/methodology" },
    },
    {
      id: "risks",
      number: 3,
      tabTitle: "3. Understand Risks",
      icon: ShieldCheck,
      stepBadge: "STEP 3",
      title: "Statutory Debarment & Multi-Silo Scoring",
      description:
        "Averages fail because a 9.2 CGPA student below 75% attendance is debarred. CampusIQ enforces statutory multiplier gates.",
      bullets: [
        "Non-linear 0.85× multiplier gate enforced below 75% attendance",
        "Exponential backlog dampening for active theory arrears",
        "Explainable SHAP driver attribution: transparent risk factors",
      ],
      primaryCta: { label: "Explore Risk Directory", href: "/faculty" },
      secondaryCta: { label: "Academic Statutes →", href: "/methodology" },
    },
    {
      id: "support",
      number: 4,
      tabTitle: "4. Plan & Track Support",
      icon: CheckCircle2,
      stepBadge: "STEP 4",
      title: "Closed-Loop Dispatch & What-If Recovery",
      description:
        "Move from diagnostic insight to prescriptive action. Mentors simulate projected recovery before dispatching interventions.",
      bullets: [
        "What-If Simulator: preview attendance make-up & DSA training",
        "1-Click Automated Mentor Assignment with HOD escalations",
        "Export prescriptive intervention logs directly into college ERPs",
      ],
      primaryCta: { label: "Faculty Workspace", href: "/faculty" },
      secondaryCta: { label: "Executive Brief →", href: "/home" },
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <section
      id="how-it-works"
      className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-4 sm:scroll-mt-6"
    >
      <div className="rounded-3xl bg-white border border-[#EAE5DC] p-5 sm:p-7 lg:p-9 shadow-lg space-y-6 sm:space-y-7 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100/25 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ── Section Header matching the reference design ── */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-stone-200/80">
          <div className="space-y-2 max-w-xl">
            {/* Blue pill badge: ● OUR WORKFLOW */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-[10px] font-mono font-bold text-blue-700 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>OUR WORKFLOW</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#111827] leading-tight">
              From Campus Data to Meaningful Action
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
              A transparent and intelligent workflow to understand student success and plan timely interventions.
            </p>
          </div>

          {/* Controls: Auto-tour & Workspace shortcut */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-all cursor-pointer shadow-2xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-blue-600" />
                  <span className="font-mono text-[11px]">Auto-Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-stone-600 fill-current" />
                  <span className="font-mono text-[11px]">Auto Tour</span>
                </>
              )}
            </button>
            <Link
              href="/home"
              className="px-3.5 py-1.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>Live Platform</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ── 4 Connected Workflow Pill Tabs (Exact Reference Style) ── */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[#0B1528] text-white shadow-sm shadow-black/15"
                    : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-sky-300" : "text-stone-500"
                  }`}
                />
                <span>{st.tabTitle}</span>
                {isActive && <ArrowRight className="w-3 h-3 ml-0.5 text-sky-400" />}
              </button>
            );
          })}
        </div>

        {/* ── Main Dual Showcase: Compact Web Screen (Left) + Phone Mockup (Right) ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ── LEFT: The Web Screen Desktop Mockup ── */}
          <div className="lg:col-span-7 xl:col-span-7 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs">
            
            {/* Desktop Web Window Title Bar Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[10px] text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                  campusiq.internal/workflow
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                Web Cockpit
              </span>
            </div>

            {/* Step Top Heading & Bullets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] font-mono font-bold tracking-wider uppercase">
                  {steps[activeStep].stepBadge}
                </span>
                <span className="font-mono text-[11px] text-stone-400 font-semibold">
                  Phase 0{steps[activeStep].number} of 04
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#111827] tracking-tight">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* 3 Checkmark Bullet Points */}
              <div className="space-y-1.5 pt-0.5">
                {steps[activeStep].bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-stone-700 leading-snug">
                    <div className="p-0.5 rounded-full bg-blue-600 text-white shrink-0 mt-0.5">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Step-Specific Interactive Previews ── */}

            {/* STEP 1: Validation Preview Table (Exact from reference) */}
            {activeStep === 0 && (
              <div className="rounded-xl bg-white border border-stone-200/90 p-3 sm:p-4 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-[#111827]">
                      Validation Preview
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold font-mono inline-flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>File Validated</span>
                  </span>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-stone-100 text-[9px] font-mono uppercase text-stone-400">
                        <th className="pb-1.5 font-bold">Column Name</th>
                        <th className="pb-1.5 font-bold">Mapped To</th>
                        <th className="pb-1.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100/80 font-mono text-[10px] sm:text-[11px]">
                      {[
                        { col: "Roll_No", mapped: "Student ID", status: "Mapped" },
                        { col: "Name", mapped: "Student Name", status: "Mapped" },
                        { col: "Attendance_Percent", mapped: "Attendance %", status: "Mapped" },
                        { col: "CGPA", mapped: "CGPA", status: "Mapped" },
                        { col: "Placement_Status", mapped: "Placement Status", status: "Mapped" },
                      ].map((r, i) => (
                        <tr key={i} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-1 font-medium text-stone-700">{r.col}</td>
                          <td className="py-1 text-blue-700 font-bold">{r.mapped}</td>
                          <td className="py-1 text-right">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/60">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Footer Note + Next Step Button */}
                <div className="pt-1.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1 text-stone-500">
                    <Info className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>Data ready. Proceed to mapping.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] inline-flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Fuzzy Schema Mapping Preview */}
            {activeStep === 1 && (
              <div className="rounded-xl bg-white border border-stone-200/90 p-3 sm:p-4 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-bold text-[#111827]">
                      Fuzzy Confidence Matrix
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] font-bold font-mono">
                    99.4% Match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[9px] text-stone-400 font-bold uppercase">Raw Column</div>
                    <div className="text-stone-900 font-bold">&quot;Biometric_Attnd_Hrs&quot;</div>
                    <div className="text-emerald-700 font-bold">→ attendance_pct (99.4%)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[9px] text-stone-400 font-bold uppercase">Arrears Column</div>
                    <div className="text-stone-900 font-bold">&quot;Active_Backlog_Ct&quot;</div>
                    <div className="text-emerald-700 font-bold">→ backlogs (99.1%)</div>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
                  <span className="text-stone-500">
                    Adaptive weights normalized to 1.00.
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next: Risk Engine</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Statutory Multiplier Sandbox */}
            {activeStep === 2 && (
              <div className="rounded-xl bg-white border border-stone-200/90 p-3 sm:p-4 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-bold text-[#111827]">
                      Statutory Penalty Gate
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                      isDebarred
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {isDebarred ? "0.85× Penalty" : "1.00× Eligible"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800">Biometric Attendance:</span>
                    <span className={`font-mono text-base font-black ${isDebarred ? "text-rose-600" : "text-emerald-700"}`}>
                      {demoAttendance}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="95"
                    value={demoAttendance}
                    onChange={(e) => setDemoAttendance(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-stone-400">
                    <span>55%</span>
                    <span className="text-amber-700 font-bold">75% Cutoff</span>
                    <span>95%</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
                  <span className="text-stone-500 font-mono">
                    Score: {isDebarred ? "84.0 × 0.85 = 71.4" : "84.0 × 1.00 = 84.0"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next: Intervention</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Closed-Loop Recovery Simulation */}
            {activeStep === 3 && (
              <div className="rounded-xl bg-white border border-stone-200/90 p-3 sm:p-4 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-[#111827]">
                      What-If Recovery Simulator
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRecoveryApplied(!recoveryApplied)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      recoveryApplied
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-200 hover:bg-stone-300 text-stone-800"
                    }`}
                  >
                    {recoveryApplied ? "✓ Active" : "Simulate Plan"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 space-y-0.5">
                    <div className="font-mono text-[9px] text-stone-400 font-bold uppercase">Before</div>
                    <div className="text-rose-600 font-mono font-black text-base">42.8 / 100</div>
                    <div className="text-stone-500 text-[10px]">Debarment Alert</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-0.5">
                    <div className="font-mono text-[9px] text-emerald-700 font-bold uppercase">Simulated Result</div>
                    <div className="text-emerald-700 font-mono font-black text-base">
                      {recoveryApplied ? "78.5 (+35.7)" : "Click Simulate"}
                    </div>
                    <div className="text-emerald-800 text-[10px] font-medium">
                      {recoveryApplied ? "✓ Cleared" : "Remedial Plan"}
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
                  <span className="text-stone-500">Auto-sent to Mentor.</span>
                  <Link
                    href="/faculty"
                    className="px-3 py-1 rounded-lg bg-[#111827] hover:bg-black text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-xs"
                  >
                    <span>Faculty Roster</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* Step Action Buttons on Bottom of Card */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <Link
                href={steps[activeStep].primaryCta.href}
                className="px-4 py-2 rounded-lg bg-[#0B1528] hover:bg-black text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <Upload className="w-3 h-3" />
                <span>{steps[activeStep].primaryCta.label}</span>
              </Link>
              <Link
                href={steps[activeStep].secondaryCta.href}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                {steps[activeStep].secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Realistic Smartphone Device Mockup with User's Live Mobile Screen ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center">
            
            {/* Phone Container Card */}
            <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
              {/* Outer Phone Frame (Matte Titanium Chassis with Apple-Grade Elevation) */}
              <div className="relative rounded-[42px] p-3 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-[3px] border-stone-800 shadow-xl shadow-stone-900/30">
                
                {/* Subtle side button accents on chassis */}
                <div className="absolute -left-[4px] top-20 w-[2.5px] h-8 bg-stone-700 rounded-l-xs" />
                <div className="absolute -left-[4px] top-32 w-[2.5px] h-8 bg-stone-700 rounded-l-xs" />
                <div className="absolute -right-[4px] top-24 w-[2.5px] h-12 bg-stone-700 rounded-r-xs" />

                {/* Inner Screen Bezel with curved corners */}
                <div className="relative rounded-[34px] overflow-hidden bg-black aspect-[462/1000] shadow-inner select-none">
                  
                  {/* Real Mobile Screenshot of CampusIQ */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mobile_screen_user.png"
                    alt="CampusIQ Mobile Experience on learnonva.vercel.app"
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                  />

                  {/* Soft diagonal glossy glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Dynamic Island pill floating at top */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full flex items-center justify-end pr-1.5 pointer-events-none z-30 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                  </div>

                  {/* Bottom iOS Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/70 rounded-full pointer-events-none z-30" />
                </div>
              </div>

              {/* Bottom Attribution Badge under phone */}
              <div className="mt-3 text-center space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200 shadow-2xs text-[10px] font-mono font-bold text-stone-800">
                  <Smartphone className="w-3 h-3 text-blue-600" />
                  <span>learnonva.vercel.app</span>
                </div>
                <div className="text-[9px] text-stone-500 font-medium">
                  Verified responsive mobile web cockpit
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
