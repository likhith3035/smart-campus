"use client";

import React from "react";
import { X, Sparkles, Check, AlertTriangle, Briefcase, TrendingUp, BarChart3 } from "lucide-react";
import { useStudentData } from "@/components/context/StudentDataContext";
import { SCENARIO_PRESETS, ScenarioInfo } from "@/lib/scenarioGenerator";

interface ScenarioSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScenarioSelectorModal({ isOpen, onClose }: ScenarioSelectorModalProps) {
  const { activeScenario, applyScenario } = useStudentData();

  if (!isOpen) return null;

  const getIcon = (id: ScenarioInfo["id"]) => {
    switch (id) {
      case "baseline":
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case "crisis":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "placement":
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      case "recovery":
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getBadgeColor = (id: ScenarioInfo["id"]) => {
    switch (id) {
      case "baseline":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "crisis":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "placement":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "recovery":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#FAF7F2] border border-[#EAE5DC] shadow-2xl overflow-hidden text-[#121826]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#EAE5DC] bg-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Judge &amp; Evaluator Simulation Mode</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              1-Click Academic Scenarios
            </h2>
            <p className="text-xs text-stone-500 max-w-lg">
              Test dynamic S³ score recomputation, non-linear risk gates, and AI K-Means cluster shifting across simulated collegiate states in real-time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {SCENARIO_PRESETS.map((scenario) => {
            const isSelected = activeScenario === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  applyScenario(scenario.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? "bg-white border-stone-900 shadow-md ring-2 ring-stone-900/10"
                    : "bg-white/80 hover:bg-white border-[#EAE5DC] hover:border-stone-400 shadow-2xs"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 shrink-0 mt-0.5">
                      {getIcon(scenario.id)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0F172A]">
                          {scenario.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${getBadgeColor(
                            scenario.id
                          )}`}
                        >
                          {scenario.badge}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 font-medium">
                        {scenario.tagline}
                      </p>
                      <p className="text-[11px] text-stone-500 leading-relaxed pt-0.5">
                        {scenario.description}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Stat Box */}
                  <div className="shrink-0 text-right bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl min-w-[90px]">
                    <div className="text-[10px] text-stone-500 font-mono">At-Risk:</div>
                    <div className="text-xs font-extrabold text-[#0F172A]">{scenario.expectedAtRisk}</div>
                    <div className="text-[10px] text-stone-500 font-mono pt-1">Avg S³:</div>
                    <div className="text-xs font-extrabold text-[#0F172A]">{scenario.expectedAvgScore}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#EAE5DC] flex items-center justify-between text-xs text-stone-500">
          <span>Applying a scenario updates all charts, radars, and filters instantly.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
