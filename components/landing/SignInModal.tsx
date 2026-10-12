"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Briefcase, 
  Check, 
  Sparkles,
  KeyRound,
  GraduationCap
} from "lucide-react";
import { useStudentData, ActivePersona } from "@/components/context/StudentDataContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const router = useRouter();
  const { activePersona, setActivePersona, institutionProfile } = useStudentData();
  const [activeTab, setActiveTab] = useState<"instant" | "credentials">("instant");
  const [selectedDemoRole, setSelectedDemoRole] = useState<ActivePersona>("dean");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSelectRole = (role: ActivePersona, path: string) => {
    setActivePersona(role);
    onClose();
    router.push(path);
  };

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setActivePersona(selectedDemoRole);
      onClose();
      if (selectedDemoRole === "dean") router.push("/home");
      else if (selectedDemoRole === "faculty") router.push("/faculty");
      else router.push("/interventions");
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Institutional RBAC Gateway</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              NBKRIST Secure Portal
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Institutional Access &amp; Persona Gateway
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Experience role-tailored workflows. Select an institutional persona for 1-click access without password friction.
          </p>
        </div>

        {/* Tab Toggle: Instant 1-Click vs Simulated Credentials */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("instant")}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "instant"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>1-Click Persona Access (Fastest)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("credentials")}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "credentials"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-stone-600" />
            <span>Simulated Login</span>
          </button>
        </div>

        {/* ─── TAB 1: INSTANT 1-CLICK PERSONA CARDS ─── */}
        {activeTab === "instant" ? (
          <div className="space-y-2.5">
            {/* 1. Dean / Principal Persona */}
            <button
              type="button"
              onClick={() => handleSelectRole("dean", "/home")}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 group cursor-pointer ${
                activePersona === "dean"
                  ? "bg-stone-900 text-white border-stone-900 shadow-md"
                  : "bg-[#FBF9F5] hover:bg-stone-100/80 border-stone-200 hover:border-stone-400"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  activePersona === "dean" ? "bg-white/10 text-white" : "bg-stone-900 text-white"
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">
                      {institutionProfile.executiveRole || "Dean"} / Principal Office
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      activePersona === "dean" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                    }`}>
                      EXECUTIVE
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    activePersona === "dean" ? "text-stone-300" : "text-stone-500"
                  }`}>
                    Command center, statutory 0.85× exam debarment gate, and print-ready Executive Governance PDF.
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className={`text-[9px] font-mono ${
                      activePersona === "dean" ? "text-amber-300" : "text-stone-400"
                    }`}>
                      Route: /home (Command Center)
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                activePersona === "dean" ? "text-white" : "text-stone-400 group-hover:text-stone-900"
              }`} />
            </button>

            {/* 2. Faculty Mentor / HOD Persona */}
            <button
              type="button"
              onClick={() => handleSelectRole("faculty", "/faculty")}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 group cursor-pointer ${
                activePersona === "faculty"
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-[#FBF9F5] hover:bg-blue-50/60 border-stone-200 hover:border-blue-400"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  activePersona === "faculty" ? "bg-white/20 text-white" : "bg-blue-600 text-white"
                }`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">
                      Faculty Mentor / HOD
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      activePersona === "faculty" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                    }`}>
                      MENTOR
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    activePersona === "faculty" ? "text-blue-100" : "text-stone-500"
                  }`}>
                    Student triage directory (600 profiles), SHAP Explainability waterfall, and What-If Simulator.
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className={`text-[9px] font-mono ${
                      activePersona === "faculty" ? "text-blue-200" : "text-stone-400"
                    }`}>
                      Route: /faculty (Student Triage)
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                activePersona === "faculty" ? "text-white" : "text-stone-400 group-hover:text-blue-600"
              }`} />
            </button>

            {/* 3. Training & Placement Officer (TPO) Persona */}
            <button
              type="button"
              onClick={() => handleSelectRole("tpo", "/interventions")}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 group cursor-pointer ${
                activePersona === "tpo"
                  ? "bg-purple-700 text-white border-purple-700 shadow-md"
                  : "bg-[#FBF9F5] hover:bg-purple-50/60 border-stone-200 hover:border-purple-400"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  activePersona === "tpo" ? "bg-white/20 text-white" : "bg-purple-700 text-white"
                }`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">
                      Training &amp; Placement Officer (TPO)
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      activePersona === "tpo" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"
                    }`}>
                      CAREER
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    activePersona === "tpo" ? "text-purple-100" : "text-stone-500"
                  }`}>
                    Placement readiness queue, coding threshold filter, and closed-loop corrective action plans.
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className={`text-[9px] font-mono ${
                      activePersona === "tpo" ? "text-purple-200" : "text-stone-400"
                    }`}>
                      Route: /interventions (Prescriptive Actions)
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                activePersona === "tpo" ? "text-white" : "text-stone-400 group-hover:text-purple-700"
              }`} />
            </button>
          </div>
        ) : (
          /* ─── TAB 2: SIMULATED INSTITUTIONAL CREDENTIALS ─── */
          <form onSubmit={handleSimulatedSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-700">Select Demo Account</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "dean" as ActivePersona, label: "Dean", email: "dean@nbkrist.org" },
                  { id: "faculty" as ActivePersona, label: "Faculty", email: "faculty@nbkrist.org" },
                  { id: "tpo" as ActivePersona, label: "Placement", email: "tpo@nbkrist.org" },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setSelectedDemoRole(acc.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDemoRole === acc.id
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-2xs"
                        : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <div className="text-xs font-bold">{acc.label}</div>
                    <div className="text-[9px] text-stone-400 truncate font-mono">{acc.email}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-700">Institutional Email</label>
              <input
                type="text"
                readOnly
                value={
                  selectedDemoRole === "dean"
                    ? "dean.office@nbkrist.org"
                    : selectedDemoRole === "faculty"
                    ? "faculty.mentor@nbkrist.org"
                    : "placement.lead@nbkrist.org"
                }
                className="w-full px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 font-mono text-xs text-stone-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-700">Password / SSO Token</label>
              <input
                type="password"
                readOnly
                value="••••••••••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 font-mono text-xs text-stone-800"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 rounded-xl bg-[#111827] hover:bg-black text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying SSO Authority...</span>
                </>
              ) : (
                <>
                  <span>✓ Authenticate &amp; Launch {selectedDemoRole.toUpperCase()} Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Modal Footer: Attribution & Security Info */}
        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-400 font-mono">
          <div className="flex items-center gap-1.5 text-stone-600">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Team LEARNOVA (Lead: Pulikonda Srinivas) • NBKRIST</span>
          </div>
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <Lock className="w-2.5 h-2.5" />
            RBAC Enabled • 0-Friction Mode
          </span>
        </div>
      </div>
    </div>
  );
}
