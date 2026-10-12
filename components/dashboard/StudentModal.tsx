"use client";

import { useState } from "react";
import { StudentProfile, PrescriptiveAction } from "@/lib/types";
import { RadarProfile } from "@/components/charts/RadarProfile";
import { WaterfallExplainability } from "@/components/charts/WaterfallExplainability";
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
  BookOpen
} from "lucide-react";

interface StudentModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onUpdateAction?: (studentId: string, actionId: string, newStatus: PrescriptiveAction["status"]) => void;
}

export function StudentModal({ student, onClose, onUpdateAction }: StudentModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "radar" | "explainability" | "actions">("overview");
  const [actions, setActions] = useState<PrescriptiveAction[]>(student?.prescriptive_actions || []);
  const [alertSent, setAlertSent] = useState(false);

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

  const scoreColor =
    student.overall_tier === "High Risk"
      ? "text-rose-600 border-rose-200 bg-rose-50"
      : student.overall_tier === "Moderate Risk"
      ? "text-amber-600 border-amber-200 bg-amber-50"
      : "text-emerald-600 border-emerald-200 bg-emerald-50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E5E0D8] shadow-2xl text-[#121826] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DC] flex items-start justify-between bg-[#FAF8F5]/60">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-mono font-extrabold shadow-sm ${scoreColor}`}>
              <span className="text-2xl leading-none">{student.success_score}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-1">S³ Score</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#111827]">{student.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                  {student.student_id}
                </span>
                <span
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${student.segment.color}10`,
                    color: student.segment.color,
                    borderColor: `${student.segment.color}30`,
                  }}
                >
                  {student.segment.name}
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-1">
                {student.department} • Semester {student.semester}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
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
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 border-b border-[#EAE5DC] flex gap-2 overflow-x-auto bg-[#FAF8F5]/30">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Activity className="w-4 h-4" /> Dual Risk Flags
          </button>
          <button
            onClick={() => setActiveTab("radar")}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "radar"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Layers className="w-4 h-4" /> 7-Pillar Radar Profile
          </button>
          <button
            onClick={() => setActiveTab("explainability")}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "explainability"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <Award className="w-4 h-4" /> XAI Waterfall Drivers (Bonus)
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "actions"
                ? "border-[#111827] text-[#111827]"
                : "border-transparent text-[#78716C] hover:text-[#111827]"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Prescriptive Actions ({actions.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Dual Risk Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Academic Risk */}
                <div className={`p-5 rounded-2xl border ${
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
