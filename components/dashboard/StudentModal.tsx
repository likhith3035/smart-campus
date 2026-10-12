"use client";

import { useState, useMemo } from "react";
import { StudentProfile, PrescriptiveAction } from "@/lib/types";
import { RadarProfile } from "@/components/charts/RadarProfile";
import { WaterfallExplainability } from "@/components/charts/WaterfallExplainability";
import { calculateStudentSuccessScore } from "@/lib/scoring";
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Send, 
  Layers, 
  Activity,
  Award,
  BookOpen,
  Sliders,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  RotateCcw,
  Target,
  ShieldCheck,
  Check,
  ArrowRight
} from "lucide-react";

interface StudentModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onUpdateAction?: (studentId: string, actionId: string, newStatus: PrescriptiveAction["status"]) => void;
}

export function StudentModal({ student, onClose, onUpdateAction }: StudentModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "radar" | "explainability" | "simulator" | "actions">("overview");
  const [actions, setActions] = useState<PrescriptiveAction[]>(student?.prescriptive_actions || []);
  const [alertSent, setAlertSent] = useState(false);
  const [targetSaved, setTargetSaved] = useState(false);

  // Counterfactual Simulator State (initialized to student's current baseline)
  const [simAttendance, setSimAttendance] = useState<number>(student?.attendance_pct ?? 75);
  const [simBacklogs, setSimBacklogs] = useState<number>(student?.active_backlogs ?? 0);
  const [simCoding, setSimCoding] = useState<number>(student?.coding_score ?? 50);
  const [simLms, setSimLms] = useState<number>(student?.assignment_completion_pct ?? 70);
  const [simMock, setSimMock] = useState<number>(student?.mock_interview_rating ?? 3);
  const [simCerts, setSimCerts] = useState<number>(student?.certifications_count ?? 1);

  // Synchronize when student changes
  useMemo(() => {
    if (student) {
      setSimAttendance(student.attendance_pct);
      setSimBacklogs(student.active_backlogs);
      setSimCoding(student.coding_score);
      setSimLms(student.assignment_completion_pct);
      setSimMock(student.mock_interview_rating);
      setSimCerts(student.certifications_count);
      setTargetSaved(false);
    }
  }, [student?.student_id]);

  // Real-time counterfactual simulation calculation
  const simResult = useMemo(() => {
    if (!student) return null;
    return calculateStudentSuccessScore({
      ...student,
      attendance_pct: simAttendance,
      active_backlogs: simBacklogs,
      coding_score: simCoding,
      assignment_completion_pct: simLms,
      mock_interview_rating: simMock,
      certifications_count: simCerts,
    });
  }, [student, simAttendance, simBacklogs, simCoding, simLms, simMock, simCerts]);

  if (!student) return null;

  const handleActionToggle = (actionId: string) => {
    setActions((prev) =>
      prev.map((a) => {
        if (a.id === actionId) {
          const nextStatus: PrescriptiveAction["status"] =
            a.status === "Pending" ? "In Progress" : a.status === "In Progress" ? "Completed" : "Pending";
          if (onUpdateAction) onUpdateAction(student.student_id, actionId, nextStatus);
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleSendDispatch = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 3000);
  };

  const handleSaveSimulatedTarget = () => {
    if (!simResult) return;
    const delta = Number((simResult.success_score - student.success_score).toFixed(1));
    const newAction: PrescriptiveAction = {
      id: `sim-plan-${Date.now()}`,
      type: "REMEDIAL_ACADEMIC",
      title: `Simulated Recovery Target: Projected S³ ${simResult.success_score}`,
      priority: "HIGH",
      status: "In Progress",
      assigned_to: "Academic Counselor & HOD",
      details: `Targeting Attendance ≥ ${simAttendance}% (Baseline: ${student.attendance_pct}%), Backlogs ≤ ${simBacklogs} (Baseline: ${student.active_backlogs}), Coding ≥ ${simCoding} pts. Predicted recovery: +${delta} pts.`,
    };
    setActions([newAction, ...actions]);
    setTargetSaved(true);
    setTimeout(() => setTargetSaved(false), 3500);
  };

  const scoreColor =
    student.overall_tier === "High Risk"
      ? "text-rose-600 border-rose-200 bg-rose-50"
      : student.overall_tier === "Moderate Risk"
      ? "text-amber-600 border-amber-200 bg-amber-50"
      : "text-emerald-600 border-emerald-200 bg-emerald-50";

  const deltaScore = simResult ? Number((simResult.success_score - student.success_score).toFixed(1)) : 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-[#E5E0D8] shadow-2xl text-[#121826] flex flex-col cursor-default"
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#FAF8F5]/90">
          <div className="w-10 h-1 rounded-full bg-stone-300"></div>
        </div>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EAE5DC] flex items-start justify-between bg-[#FAF8F5]/60 gap-3">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Score Box */}
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border font-mono font-extrabold shadow-sm shrink-0 ${scoreColor}`}>
              <span className="text-lg sm:text-2xl leading-none">{student.success_score}</span>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider opacity-80 mt-0.5 sm:mt-1">S³</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-xl font-bold text-[#111827] truncate">{student.name}</h2>
                <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                  {student.student_id}
                </span>
                <span
                  className="text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${student.segment.color}10`,
                    color: student.segment.color,
                    borderColor: `${student.segment.color}30`,
                  }}
                >
                  {student.segment.name}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#78716C] mt-0.5">
                {student.department} • Semester {student.semester}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-[10px] sm:text-[11px] bg-white sm:bg-transparent p-1.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-stone-100">
                <span className="text-[#57534E]">CGPA: <strong className="text-[#111827] font-mono">{student.cgpa}</strong></span>
                <span className="text-stone-300">•</span>
                <span className="text-[#57534E]">Attendance: <strong className={`font-mono ${student.attendance_pct < 75 ? "text-rose-600 font-bold" : "text-emerald-600"}`}>{student.attendance_pct}%</strong></span>
                <span className="text-stone-300">•</span>
                <span className="text-[#57534E]">Coding: <strong className="text-[#111827] font-mono">{student.coding_score}/100</strong></span>
                <span className="text-stone-300">•</span>
                <span className="text-[#57534E]">Backlogs: <strong className={`font-mono ${student.active_backlogs > 0 ? "text-rose-600 font-bold" : "text-emerald-600"}`}>{student.active_backlogs}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-4 sm:px-6 border-b border-[#EAE5DC] flex gap-2 overflow-x-auto bg-[#FAF8F5]/30 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Dual Risk Flags
          </button>
          <button
            onClick={() => setActiveTab("radar")}
            className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "radar"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 7-Pillar Radar
          </button>
          <button
            onClick={() => setActiveTab("explainability")}
            className={`py-3.5 px-2.5 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "explainability"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> XAI Drivers
          </button>
          <button
            onClick={() => setActiveTab("simulator")}
            className={`py-3.5 px-2.5 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "simulator"
                ? "border-purple-600 text-purple-700 bg-purple-50/50"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            <span>What-If Simulator</span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
              AI
            </span>
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`py-3.5 px-2.5 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "actions"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Actions ({actions.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Dual Risk Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Academic Risk */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  student.risk_flags.academic.status === "HIGH"
                    ? "bg-rose-50/60 border-rose-200"
                    : student.risk_flags.academic.status === "MEDIUM"
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-emerald-50/60 border-emerald-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-600" /> Academic Risk
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      student.risk_flags.academic.status === "HIGH"
                        ? "bg-rose-100 text-rose-700"
                        : student.risk_flags.academic.status === "MEDIUM"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {student.risk_flags.academic.status}
                    </span>
                  </div>
                  {student.risk_flags.academic.triggers.length > 0 ? (
                    <ul className="text-xs text-stone-700 space-y-1.5 mt-2">
                      {student.risk_flags.academic.triggers.map((trig, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-rose-700">
                          <span className="font-bold">•</span>
                          <span>{trig}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 mt-2">Consistent CGPA and coursework with no academic flags.</p>
                  )}
                </div>

                {/* Placement Risk */}
                <div className={`p-5 rounded-2xl border ${
                  student.risk_flags.placement.status === "HIGH"
                    ? "bg-rose-50/60 border-rose-200"
                    : student.risk_flags.placement.status === "MEDIUM"
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-emerald-50/60 border-emerald-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-purple-600" /> Placement Risk
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      student.risk_flags.placement.status === "HIGH"
                        ? "bg-rose-100 text-rose-700"
                        : student.risk_flags.placement.status === "MEDIUM"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {student.risk_flags.placement.status}
                    </span>
                  </div>
                  {student.risk_flags.placement.triggers.length > 0 ? (
                    <ul className="text-xs text-stone-700 space-y-1.5 mt-2">
                      {student.risk_flags.placement.triggers.map((trig, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-amber-800">
                          <span className="font-bold">•</span>
                          <span>{trig}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 mt-2">High coding score and mock interview readiness verified.</p>
                  )}
                </div>

                {/* Disengagement Risk */}
                <div className={`p-5 rounded-2xl border ${
                  student.risk_flags.disengagement.status === "HIGH"
                    ? "bg-rose-50/60 border-rose-200"
                    : student.risk_flags.disengagement.status === "MEDIUM"
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-emerald-50/60 border-emerald-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-600" /> Disengagement Risk
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      student.risk_flags.disengagement.status === "HIGH"
                        ? "bg-rose-100 text-rose-700"
                        : student.risk_flags.disengagement.status === "MEDIUM"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {student.risk_flags.disengagement.status}
                    </span>
                  </div>
                  {student.risk_flags.disengagement.triggers.length > 0 ? (
                    <ul className="text-xs text-stone-700 space-y-1.5 mt-2">
                      {student.risk_flags.disengagement.triggers.map((trig, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-stone-600">
                          <span className="font-bold">•</span>
                          <span>{trig}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 mt-2">Active weekly LMS logins and positive mentor remarks.</p>
                  )}
                </div>
              </div>

              {/* Archetype Persona Strategy */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: student.segment.color }} />
                  <h3 className="text-sm font-bold text-[#111827]">
                    Assigned Cohort Segment: {student.segment.name}
                  </h3>
                </div>
                <p className="text-xs text-[#57534E] mb-3">{student.segment.tagline}</p>
                <div className="p-3.5 rounded-xl bg-white border border-[#E5E0D8] text-xs text-stone-800">
                  <strong className="text-stone-900">Institutional Strategy:</strong> {student.segment.strategy}
                </div>
              </div>
            </div>
          )}

          {activeTab === "radar" && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 text-center">
                Comparing individual student scores against campus benchmark across all 7 integrated data silos.
              </div>
              <RadarProfile studentMetrics={student.radar_metrics} />
            </div>
          )}

          {activeTab === "explainability" && (
            <div className="space-y-4">
              <WaterfallExplainability drivers={student.explainability_drivers} score={student.success_score} />
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              NEW: WHAT-IF COUNTERFACTUAL INTERVENTION SIMULATOR
          ─────────────────────────────────────────────────────────── */}
          {activeTab === "simulator" && simResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Top Dynamic Score Comparison Header */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#111827] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#311042] text-white shadow-xl border border-purple-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Current Baseline */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center font-mono font-bold shrink-0 shadow-inner">
                      <span className="text-2xl text-white font-black">{student.success_score}</span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-300 font-bold">Baseline</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-stone-300 font-bold">Current Status</div>
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>{student.overall_tier}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          student.overall_tier === "High Risk" ? "bg-rose-500" : student.overall_tier === "Moderate Risk" ? "bg-amber-500" : "bg-emerald-500"
                        }`} />
                      </div>
                      <div className="text-xs text-stone-300 mt-0.5 font-medium">
                        {student.attendance_pct}% Attd • {student.active_backlogs} Backlogs
                      </div>
                    </div>
                  </div>

                  {/* Middle Transition Indicator */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600/40 border border-purple-400 text-purple-100 text-xs font-bold font-mono shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                      <span>{deltaScore >= 0 ? `+${deltaScore}` : deltaScore} pts Recovery</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-300 hidden md:block mt-1 animate-pulse" />
                  </div>

                  {/* Right: Simulated Target */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold shrink-0 shadow-lg ${
                      simResult.overall_tier === "Thriving"
                        ? "bg-emerald-500/30 border-emerald-400 text-emerald-200"
                        : simResult.overall_tier === "Moderate Risk"
                        ? "bg-amber-500/30 border-amber-400 text-amber-200"
                        : "bg-rose-500/30 border-rose-400 text-rose-200"
                    }`}>
                      <span className="text-2xl font-black">{simResult.success_score}</span>
                      <span className="text-[9px] uppercase tracking-wider font-bold opacity-90">Projected</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-purple-200 font-bold">Projected Outcome</div>
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>{simResult.overall_tier}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          simResult.overall_tier === "Thriving" ? "bg-emerald-400" : simResult.overall_tier === "Moderate Risk" ? "bg-amber-400" : "bg-rose-400"
                        }`} />
                      </div>
                      <div className="text-xs text-purple-200 mt-0.5 font-medium">
                        {simAttendance}% Attd • {simBacklogs} Backlogs • {simCoding} Coding
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar of Lift */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="flex-1 bg-white/15 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-300 shadow-sm"
                      style={{ width: `${Math.min(100, Math.max(5, simResult.success_score))}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-200 shrink-0">
                    {simResult.success_score} / 100
                  </span>
                </div>
              </div>

              {/* Instant Remediation Scenario Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Quick Intervention Scenarios
                  </span>
                  <button
                    onClick={() => {
                      setSimAttendance(student.attendance_pct);
                      setSimBacklogs(student.active_backlogs);
                      setSimCoding(student.coding_score);
                      setSimLms(student.assignment_completion_pct);
                      setSimMock(student.mock_interview_rating);
                      setSimCerts(student.certifications_count);
                    }}
                    className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Sliders</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setSimAttendance(76);
                    }}
                    className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all text-stone-900 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>🎯 75% Debarment Rescue</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-amber-800/80 mt-1 leading-snug">
                      Boost attendance to statutory 76% to remove non-linear debarment penalty.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setSimBacklogs(0);
                    }}
                    className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all text-stone-900 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                      <span>⚡ Clear All Backlogs</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-rose-800/80 mt-1 leading-snug">
                      Clear pending subjects to lift the -12% per-backlog statutory deduction.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setSimCoding(78);
                      setSimMock(4.2);
                      setSimCerts(Math.max(2, student.certifications_count));
                    }}
                    className="p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 text-left transition-all text-stone-900 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                      <span>💼 Tier-1 Placement Sprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-purple-800/80 mt-1 leading-snug">
                      Raise coding to 78, interview to 4.2/5, and earn 2 industry certifications.
                    </p>
                  </button>
                </div>
              </div>

              {/* Counterfactual Sliders Grid */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-5">
                <div className="flex items-center justify-between border-b border-[#ECE7DF] pb-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-stone-600" />
                    Intervention Variables
                  </h4>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Real-time S³ Weight Adaptation Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* Variable 1: Attendance */}
                  <div className="space-y-2 p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${simAttendance < 75 ? "bg-rose-500" : "bg-emerald-500"}`} />
                        Attendance Rate
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${simAttendance < 75 ? "text-rose-600" : "text-emerald-700"}`}>
                          {simAttendance}%
                        </span>
                        {simAttendance >= 75 && student.attendance_pct < 75 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Rescued!
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      step={1}
                      value={simAttendance}
                      onChange={(e) => setSimAttendance(Number(e.target.value))}
                      className="w-full accent-purple-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>40%</span>
                      <span className="text-rose-600 font-bold">75% (Cutoff)</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Variable 2: Active Backlogs */}
                  <div className="space-y-2 p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${simBacklogs > 0 ? "bg-rose-500" : "bg-emerald-500"}`} />
                        Active Backlogs
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${simBacklogs > 0 ? "text-rose-600" : "text-emerald-700"}`}>
                          {simBacklogs} {simBacklogs === 1 ? "subject" : "subjects"}
                        </span>
                        {simBacklogs === 0 && student.active_backlogs > 0 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            All Clear!
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      step={1}
                      value={simBacklogs}
                      onChange={(e) => setSimBacklogs(Number(e.target.value))}
                      className="w-full accent-purple-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span className="text-emerald-600 font-bold">0 (Clean)</span>
                      <span>3</span>
                      <span>6+</span>
                    </div>
                  </div>

                  {/* Variable 3: Coding Score */}
                  <div className="space-y-2 p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${simCoding < 50 ? "bg-amber-500" : "bg-purple-500"}`} />
                        Coding & Technical Score
                      </span>
                      <span className="font-mono font-bold text-sm text-purple-700">
                        {simCoding}/100
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={1}
                      value={simCoding}
                      onChange={(e) => setSimCoding(Number(e.target.value))}
                      className="w-full accent-purple-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>20</span>
                      <span>60 (Benchmark)</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Variable 4: LMS Coursework Completion */}
                  <div className="space-y-2 p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${simLms < 60 ? "bg-amber-500" : "bg-blue-500"}`} />
                        LMS Coursework Completion
                      </span>
                      <span className="font-mono font-bold text-sm text-blue-700">
                        {simLms}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={simLms}
                      onChange={(e) => setSimLms(Number(e.target.value))}
                      className="w-full accent-purple-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>20%</span>
                      <span>70%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Impact & Clearance Breakdown */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5E0D8] space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Prescriptive Institutional Clearance
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    simAttendance >= 75
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                      : "bg-rose-50/60 border-rose-200 text-rose-900"
                  }`}>
                    {simAttendance >= 75 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">
                        {simAttendance >= 75 ? "Debarment Threat Cleared" : "Debarment Risk Active"}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {simAttendance >= 75
                          ? "Statutory 75% attendance attained. Full examination eligibility restored."
                          : "Attendance below 75% triggers mandatory examination debarment penalty."}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    simBacklogs === 0
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                      : "bg-amber-50/60 border-amber-200 text-amber-900"
                  }`}>
                    {simBacklogs === 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">
                        {simBacklogs === 0 ? "Academic Probation Lifted" : `${simBacklogs} Arrears Penalty`}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {simBacklogs === 0
                          ? "Zero backlogs enables qualification for top-tier campus placement drives."
                          : `Each active backlog applies a 12% non-linear drag to the institutional composite.`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commit Action Plan Button */}
                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-stone-500">
                    Lock in this counterfactual simulation as the assigned faculty mentor&apos;s active intervention milestone.
                  </div>
                  <button
                    onClick={handleSaveSimulatedTarget}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    {targetSaved ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Target Milestone Added!</span>
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        <span>Commit Target as Action Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "actions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">
                  Click on an action card to cycle through: <span className="text-amber-600 font-bold">Pending</span> → <span className="text-blue-600 font-bold">In Progress</span> → <span className="text-emerald-600 font-bold">Completed</span>
                </p>
                <button
                  onClick={handleSendDispatch}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{alertSent ? "Dispatched!" : "Dispatch Mentor Alert"}</span>
                </button>
              </div>

              {alertSent && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Automated notifications sent to Department HOD, Assigned Faculty Mentor, and Student Portal!</span>
                </div>
              )}

              <div className="space-y-3">
                {actions.length === 0 ? (
                  <p className="text-xs text-stone-400 text-center py-8">No urgent interventions required for this student.</p>
                ) : (
                  actions.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => handleActionToggle(act.id)}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] hover:border-stone-400 cursor-pointer transition-all flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            act.priority === "URGENT"
                              ? "bg-rose-100 text-rose-700"
                              : act.priority === "HIGH"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {act.priority}
                          </span>
                          <h4 className="text-xs font-bold text-[#111827]">{act.title}</h4>
                        </div>
                        <p className="text-xs text-[#57534E]">{act.details}</p>
                        <div className="text-[11px] text-stone-400 flex items-center gap-3 pt-1">
                          <span>Owner: <strong className="text-stone-700">{act.assigned_to}</strong></span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          act.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : act.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {act.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
