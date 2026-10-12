"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sliders, 
  Building2, 
  Users, 
  UploadCloud, 
  FileText,
  Zap,
  Target
} from "lucide-react";

interface JudgeTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExecutiveBrief?: () => void;
}

export function JudgeTourModal({
  isOpen,
  onClose,
  onOpenExecutiveBrief,
}: JudgeTourModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      badge: "Command Center Pulse",
      title: "Real-Time Campus Telemetry & Debarment Monitoring",
      description:
        "Unlike generic student portals, CampusIQ implements a non-linear statutory debarment cutoff at 75% attendance. Any student dipping below this threshold triggers an automated institutional penalty and dean notification.",
      highlights: [
        "Dynamic multi-department health breakdown (CSE, IT, ECE, Mech)",
        "Zero-delay telemetry calculated directly from active enrolled cohort",
        "Dual-risk identification distinguishing academic risk from placement failure",
      ],
      icon: Building2,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      targetUrl: "/home",
      targetLabel: "View Live Command Center",
    },
    {
      step: 2,
      badge: "Deep Student 360",
      title: "Explainable AI (XAI) & 7-Pillar Competency Radar",
      description:
        "Every student receives an S³ (Student Success Score) built on 7 academic and engagement pillars. Mentors get waterfall explainability showing the exact positive and negative drivers behind each risk prediction.",
      highlights: [
        "7-Pillar Spider Radar matching individual vs campus benchmark",
        "Waterfall explainability chart explaining every point contribution",
        "4 Behavioral Cohort Archetypes with tailored institutional intervention strategies",
      ],
      icon: Users,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      targetUrl: "/faculty",
      targetLabel: "Open Faculty Triage",
    },
    {
      step: 3,
      badge: "Prescriptive Modeling",
      title: "Interactive 'What-If' Counterfactual Recovery Simulator",
      description:
        "Most hackathon tools stop at descriptive analytics (what happened). CampusIQ introduces prescriptive simulation: faculty mentors adjust attendance, backlogs, and coding practice to preview the exact projected recovery before intervening.",
      highlights: [
        "Real-time slider simulation powered by client-side scoring logic",
        "Instant visual score delta (+15 to +35 pts recovery)",
        "1-Click 'Commit Target as Action Plan' for assigned counselors",
      ],
      icon: Sliders,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200",
      targetUrl: "/faculty",
      targetLabel: "Test What-If Simulator in Student 360",
    },
    {
      step: 4,
      badge: "Enterprise Scalability",
      title: "Bring-Your-Own-Data Ingestion & Executive Dean's Brief",
      description:
        "Campuses aren't locked to our demo templates. Upload ANY college CSV or Excel file, and CampusIQ automatically maps columns, detects missing data, rebalances weights, and adapts all 7 platform dashboards instantly.",
      highlights: [
        "Adaptive schema mapper supporting any column naming convention",
        "One-click 'Executive Dean's Dossier' for board presentation & PDF export",
        "Session-persistent cohort storage with instant 'Reset to Demo' safety switch",
      ],
      icon: UploadCloud,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      targetUrl: "/upload",
      targetLabel: "Try Custom Data Ingestion",
    },
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col text-[#111827]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-purple-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Evaluation Rubric Walkthrough
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                60-Second Judge Tour • Step {current.step} of {steps.length}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 border-b border-stone-100 bg-stone-50">
          {steps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              className={`py-2.5 px-2 text-center text-xs font-mono font-bold transition-all border-b-2 ${
                currentStep === idx
                  ? "border-purple-600 text-purple-700 bg-white"
                  : currentStep > idx
                  ? "border-emerald-500 text-emerald-700 bg-emerald-50/40"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${current.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                {current.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                {current.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {current.description}
          </p>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider">
              Key Evaluation Criteria Demonstrated:
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {current.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation & Action Footer */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep((prev) => prev + 1);
                } else {
                  onClose();
                }
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>{currentStep === steps.length - 1 ? "Finish Tour" : "Next Criterion"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              href={current.targetUrl}
              onClick={onClose}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>{current.targetLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
