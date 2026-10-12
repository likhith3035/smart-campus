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
  ChevronRight,
  Smartphone,
  Cpu,
  Zap,
} from "lucide-react";

export function RichHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Step 2 interactive fuzzy mapping simulation
  const [step2Filter, setStep2Filter] = useState<string>("all");

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
        "Upload your institutional data files (CSV or Excel), and let CampusIQ validate, clean, and prepare the records for analysis.",
      bullets: [
        "Support for CSV, XLS, and XLSX formats with universal fallback",
        "Automatic data validation, missing value detection, and type inference",
        "Encrypted local processing with zero external data leakage",
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
        "Every college formats column names differently. Our fuzzy Levenshtein engine auto-maps disparate headers to canonical pillars.",
      bullets: [
        "Fuzzy string distance & synonym detection across 7 collegiate silos",
        "Dynamic weight re-normalization when optional columns are absent",
        "Zero schema-break crashes — statistically consistent composite scoring",
      ],
      primaryCta: { label: "View Schema Mapper", href: "/methodology" },
      secondaryCta: { label: "Review Canonical Specs →", href: "/methodology" },
    },
    {
      id: "risks",
      number: 3,
      tabTitle: "3. Understand Risks",
      icon: ShieldCheck,
      stepBadge: "STEP 3",
      title: "Statutory Debarment & Multi-Silo Scoring",
      description:
        "Traditional averages fail because a 9.2 CGPA student below 75% attendance is legally debarred. CampusIQ enforces statutory multiplier gates.",
      bullets: [
        "Non-linear 0.85× multiplier gate triggered immediately below 75% attendance",
        "Exponential backlog dampening: compound penalty for active theory arrears",
        "Explainable SHAP driver attribution: transparent positive and negative factors",
      ],
      primaryCta: { label: "Explore Risk Directory", href: "/faculty" },
      secondaryCta: { label: "Read Academic Statutes →", href: "/methodology" },
    },
    {
      id: "support",
      number: 4,
      tabTitle: "4. Plan & Track Support",
      icon: CheckCircle2,
      stepBadge: "STEP 4",
      title: "Closed-Loop Dispatch & What-If Recovery",
      description:
        "Move from diagnostic insight to prescriptive recovery. Mentors simulate projected score recovery before dispatching interventions.",
      bullets: [
        "Counterfactual What-If Simulator: preview attendance make-up & DSA training",
        "1-Click Automated Mentor Assignment with HOD and Dean escalations",
        "Export prescriptive intervention logs directly into university ERP portals",
      ],
      primaryCta: { label: "Open Faculty Workspace", href: "/faculty" },
      secondaryCta: { label: "Launch Executive Brief →", href: "/home" },
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-4 sm:scroll-mt-6"
    >
      <div className="rounded-3xl sm:rounded-[36px] bg-white border border-[#EAE5DC] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 sm:space-y-10 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ── Section Header matching the reference design ── */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80">
          <div className="space-y-3 max-w-2xl">
            {/* Blue pill badge: ● OUR WORKFLOW */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-[11px] font-mono font-bold text-blue-700 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>OUR WORKFLOW</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111827] leading-tight">
              From Campus Data <br className="hidden sm:inline" />
              to Meaningful Action
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              A transparent and intelligent workflow to understand student success and plan timely interventions.
            </p>
          </div>

          {/* Controls: Auto-tour & Workspace shortcut */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-all cursor-pointer shadow-2xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono text-[11px]">Auto-Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-stone-600 fill-current" />
                  <span className="font-mono text-[11px]">Auto Tour</span>
                </>
              )}
            </button>
            <Link
              href="/home"
              className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>Try Live Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── 4 Connected Workflow Pill Tabs (Exact Reference Style) ── */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
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
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[#0B1528] text-white shadow-md shadow-black/15"
                    : "bg-white text-stone-700 border border-stone-200/90 hover:border-stone-400 hover:bg-stone-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-sky-300" : "text-stone-500"
                  }`}
                />
                <span>{st.tabTitle}</span>
                {isActive && <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-sky-400" />}
              </button>
            );
          })}
        </div>

        {/* ── Main Dual Showcase: Interactive Step Card (Left) + Phone Mockup (Right) ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ── LEFT: The Interactive Step Container (7 or 8 columns on desktop) ── */}
          <div className="lg:col-span-7 xl:col-span-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] p-5 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Step Top Heading & Bullets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold tracking-wider uppercase">
                  {steps[activeStep].stepBadge}
                </span>
                <span className="font-mono text-xs text-stone-400 font-semibold">
                  Phase 0{steps[activeStep].number} of 04
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* 3 Checkmark Bullet Points */}
              <div className="space-y-2 pt-1">
                {steps[activeStep].bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700 leading-snug">
                    <div className="p-0.5 rounded-full bg-blue-600 text-white shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Step-Specific Interactive Previews ── */}

            {/* STEP 1: Validation Preview Table (Exact from reference) */}
            {activeStep === 0 && (
              <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-extrabold text-[#111827]">
                      Validation Preview
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>File Validated</span>
                  </span>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-100 text-[10px] font-mono uppercase text-stone-400">
                        <th className="pb-2 font-bold">Column Name</th>
                        <th className="pb-2 font-bold">Mapped To</th>
                        <th className="pb-2 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100/80 font-mono text-[11px]">
                      {[
                        { col: "Roll_No", mapped: "Student ID", status: "Mapped" },
                        { col: "Name", mapped: "Student Name", status: "Mapped" },
                        { col: "Attendance_Percent", mapped: "Attendance %", status: "Mapped" },
                        { col: "CGPA", mapped: "CGPA", status: "Mapped" },
                        { col: "Placement_Status", mapped: "Placement Status", status: "Mapped" },
                      ].map((r, i) => (
                        <tr key={i} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-1.5 font-medium text-stone-700">{r.col}</td>
                          <td className="py-1.5 text-blue-700 font-bold">{r.mapped}</td>
                          <td className="py-1.5 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Footer Note + Next Step Button */}
                <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 text-[11px]">
                    <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Your data is ready. Click next to continue with mapping.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Fuzzy Schema Mapping Preview */}
            {activeStep === 1 && (
              <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-purple-600" />
                    <span className="text-xs sm:text-sm font-extrabold text-[#111827]">
                      Fuzzy Levenshtein Confidence Matrix
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                    99.4% Mean Confidence
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Non-Standard Raw</div>
                    <div className="text-stone-900 font-bold">&quot;Biometric_Attnd_Hrs&quot;</div>
                    <div className="text-emerald-700 text-[11px] font-bold">→ attendance_pct (99.4% Match)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Arrears Header</div>
                    <div className="text-stone-900 font-bold">&quot;Active_Backlog_Ct&quot;</div>
                    <div className="text-emerald-700 text-[11px] font-bold">→ backlogs (99.1% Synonym)</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-stone-500">
                    Adaptive weights automatically re-balanced to 1.00.
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next: Risk Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Statutory Multiplier Sandbox */}
            {activeStep === 2 && (
              <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span className="text-xs sm:text-sm font-extrabold text-[#111827]">
                      Statutory Penalty Gate Simulator
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      isDebarred
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {isDebarred ? "0.85× Penalty Enforced" : "1.00× Eligible"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800">Biometric Attendance:</span>
                    <span className={`font-mono text-lg font-black ${isDebarred ? "text-rose-600" : "text-emerald-700"}`}>
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
                  <div className="flex justify-between text-[10px] font-mono text-stone-400">
                    <span>55%</span>
                    <span className="text-amber-700 font-bold">75% Statutory Floor</span>
                    <span>95%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-stone-500 font-mono">
                    Score: {isDebarred ? "84.0 × 0.85 = 71.4 (Flagged)" : "84.0 × 1.00 = 84.0 (Normal)"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next: Intervention</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Closed-Loop Recovery Simulation */}
            {activeStep === 3 && (
              <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-extrabold text-[#111827]">
                      What-If Counterfactual Recovery
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRecoveryApplied(!recoveryApplied)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      recoveryApplied
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-200 hover:bg-stone-300 text-stone-800"
                    }`}
                  >
                    {recoveryApplied ? "✓ Interventions Active" : "Click to Apply Plan"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <div className="font-mono text-[10px] text-stone-400 font-bold uppercase">Before Intervention</div>
                    <div className="text-rose-600 font-mono font-black text-lg">42.8 / 100</div>
                    <div className="text-stone-500 text-[11px]">Debarment Risk • Low Coding</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="font-mono text-[10px] text-emerald-700 font-bold uppercase">Simulated Recovery</div>
                    <div className="text-emerald-700 font-mono font-black text-lg">
                      {recoveryApplied ? "78.5 / 100 (+35.7 pts)" : "Waiting for activation..."}
                    </div>
                    <div className="text-emerald-800 text-[11px] font-semibold">
                      {recoveryApplied ? "✓ Debarment Cleared • Tier-1 Ready" : "Simulate 4-week remedial plan"}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500">Auto-dispatched to Mentor &amp; HOD.</span>
                  <Link
                    href="/faculty"
                    className="px-4 py-1.5 rounded-xl bg-[#111827] hover:bg-black text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Open Faculty Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Step Action Buttons on Bottom of Card */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={steps[activeStep].primaryCta.href}
                className="px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-black text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Upload className="w-3.5 h-3.5" />
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
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
            
            {/* Phone Container Card */}
            <div className="relative w-full max-w-[310px] sm:max-w-[330px]">
              {/* Outer Phone Frame (Matte Titanium Chassis with Apple-Grade Elevation) */}
              <div className="relative rounded-[48px] p-3.5 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-[3.5px] border-stone-800/90 shadow-2xl shadow-stone-900/40">
                
                {/* Subtle side button accents on chassis */}
                <div className="absolute -left-[5px] top-24 w-[3px] h-10 bg-stone-700 rounded-l-xs" />
                <div className="absolute -left-[5px] top-38 w-[3px] h-10 bg-stone-700 rounded-l-xs" />
                <div className="absolute -right-[5px] top-28 w-[3px] h-14 bg-stone-700 rounded-r-xs" />

                {/* Inner Screen Bezel with curved corners */}
                <div className="relative rounded-[38px] overflow-hidden bg-black aspect-[462/1000] shadow-inner select-none">
                  
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
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full flex items-center justify-end pr-2 pointer-events-none z-30 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                  </div>

                  {/* Bottom iOS Home Indicator Bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/70 rounded-full pointer-events-none z-30" />
                </div>
              </div>

              {/* Bottom Attribution Badge under phone */}
              <div className="mt-4 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs text-[11px] font-mono font-bold text-stone-800">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  <span>learnonva.vercel.app</span>
                </div>
                <div className="text-[10px] text-stone-500 font-medium">
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
