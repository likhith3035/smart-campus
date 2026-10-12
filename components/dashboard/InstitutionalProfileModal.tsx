"use client";

import { useState, useEffect } from "react";
import { useStudentData } from "@/components/context/StudentDataContext";
import { InstitutionProfile, ExecutiveRoleType, DEFAULT_INSTITUTION_PROFILE } from "@/lib/types";
import {
  X,
  Building2,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  FileText,
  UserCheck,
  ChevronRight,
} from "lucide-react";

interface InstitutionalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSTITUTION_PRESETS: {
  id: string;
  label: string;
  badge: string;
  profile: InstitutionProfile;
}[] = [
  {
    id: "nbkrist",
    label: "NBKR Institute of Science & Tech",
    badge: "Team Campus",
    profile: {
      institutionName: "N.B.K.R. Institute of Science & Technology (Autonomous)",
      institutionShortName: "NBKRIST",
      executiveRole: "Principal",
      executiveTitle: "Principal & Head of Institution",
      executiveName: "Dr. V. Vijaya Kumar Reddy, Ph.D.",
      signatoryCommittee: "Institutional Academic Council & Senate",
      secondSignatoryName: "Prof. K. Viswanath",
      secondSignatoryTitle: "Dean, Academic Affairs & IQAC Head",
      accreditationNorm: "NBA Tier-1 • NAAC A Grade Autonomous • Vidyanagar",
      iqacUnit: "Internal Quality Assurance Cell (IQAC)",
    },
  },
  {
    id: "bytexl",
    label: "ByteXL Institute of Technology",
    badge: "Hackathon Ready",
    profile: {
      institutionName: "ByteXL Institute of Engineering & Technology",
      institutionShortName: "ByteXL Tech",
      executiveRole: "Principal",
      executiveTitle: "Principal & Head of Institution",
      executiveName: "Dr. Rajesh Sharma, Ph.D.",
      signatoryCommittee: "Institutional Academic Council",
      secondSignatoryName: "Prof. S. R. Varma",
      secondSignatoryTitle: "Dean, Career Development & Placements",
      accreditationNorm: "NBA Tier-1 / NAAC A++ Autonomous",
      iqacUnit: "Central Academic Risk & Analytics Cell (IQAC)",
    },
  },
  {
    id: "apex",
    label: "Apex Institute of Advanced Tech",
    badge: "Default Benchmark",
    profile: DEFAULT_INSTITUTION_PROFILE,
  },
  {
    id: "nit",
    label: "National Institute of Technology",
    badge: "Central University",
    profile: {
      institutionName: "National Institute of Technology, Southern Campus",
      institutionShortName: "NIT South",
      executiveRole: "Director",
      executiveTitle: "Director & Senate Chairman",
      executiveName: "Prof. K. R. Narayanan, Ph.D.",
      signatoryCommittee: "Academic Senate Board of Governors",
      secondSignatoryName: "Dr. Meenakshi Sundaram",
      secondSignatoryTitle: "Dean (Academic Programs)",
      accreditationNorm: "Institute of National Importance • NIRF Top 20",
      iqacUnit: "Internal Quality Assurance Cell (IQAC)",
    },
  },
  {
    id: "university",
    label: "Premier Deemed University",
    badge: "Multi-Disciplinary",
    profile: {
      institutionName: "Apex Global Metropolitan University",
      institutionShortName: "AGMU",
      executiveRole: "Vice Chancellor",
      executiveTitle: "Vice Chancellor & Executive President",
      executiveName: "Dr. Sarah Jenkins, Ed.D.",
      signatoryCommittee: "University Governing Syndicate",
      secondSignatoryName: "Prof. Ananth Iyer, Ph.D.",
      secondSignatoryTitle: "Dean of Student Affairs & Registrar",
      accreditationNorm: "UGC Category-1 Graded Autonomy • NAAC A+",
      iqacUnit: "Center for Institutional Excellence (CIE)",
    },
  },
];

const ROLE_OPTIONS: ExecutiveRoleType[] = [
  "Dean",
  "Principal",
  "Director",
  "Vice Chancellor",
  "Head of Department",
];

export function InstitutionalProfileModal({
  isOpen,
  onClose,
}: InstitutionalProfileModalProps) {
  const { institutionProfile, updateInstitutionProfile, resetInstitutionProfile } =
    useStudentData();

  const [form, setForm] = useState<InstitutionProfile>(institutionProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state whenever modal opens or context updates
  useEffect(() => {
    if (isOpen) {
      setForm(institutionProfile);
      setSaveSuccess(false);
    }
  }, [isOpen, institutionProfile]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: InstitutionProfile) => {
    setForm(preset);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstitutionProfile(form);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    resetInstitutionProfile();
    setForm(DEFAULT_INSTITUTION_PROFILE);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-stone-300 shadow-2xl flex flex-col text-[#111827] cursor-default"
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                <span>College & Authority Profile</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-medium">
                  White-Label
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Customize institution name, executive authority role, and signatures
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* 1. Quick Presets Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                1-Click Institutional Presets
              </span>
              <span className="text-[11px] text-stone-400">Click to instantly populate</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INSTITUTION_PRESETS.map((p) => {
                const isActive =
                  form.institutionName === p.profile.institutionName &&
                  form.executiveRole === p.profile.executiveRole;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApplyPreset(p.profile)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isActive
                        ? "border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500/30"
                        : "border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {p.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono truncate">
                        {p.profile.executiveRole}: {p.profile.executiveName.split(",")[0]}
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Input Form */}
          <form onSubmit={handleSave} className="space-y-5 pt-2 border-t border-stone-200">
            <div className="space-y-4">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                Institutional Details & Governance
              </span>

              {/* College Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  Full Institution / College Name
                </label>
                <input
                  type="text"
                  required
                  value={form.institutionName}
                  onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
                  placeholder="e.g. ByteXL Institute of Engineering & Technology"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Short Name & Accreditation Norm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Short Brand / Acronym
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institutionShortName}
                    onChange={(e) =>
                      setForm({ ...form, institutionShortName: e.target.value })
                    }
                    placeholder="e.g. ByteXL Tech"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Accreditation Norm
                  </label>
                  <input
                    type="text"
                    value={form.accreditationNorm}
                    onChange={(e) =>
                      setForm({ ...form, accreditationNorm: e.target.value })
                    }
                    placeholder="e.g. UGC / NBA Tier-1 Compliance"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Executive Role & Title */}
              <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Executive Authority Role
                  </label>
                  <select
                    value={form.executiveRole}
                    onChange={(e) => {
                      const newRole = e.target.value as ExecutiveRoleType;
                      let defaultTitle = form.executiveTitle;
                      if (newRole === "Principal") defaultTitle = "Principal & Head of Institution";
                      else if (newRole === "Director") defaultTitle = "Director & Senate Chairman";
                      else if (newRole === "Vice Chancellor") defaultTitle = "Vice Chancellor";
                      else if (newRole === "Dean") defaultTitle = "Dean of Academic Affairs";
                      else if (newRole === "Head of Department") defaultTitle = "Head of Department (HOD)";
                      setForm({ ...form, executiveRole: newRole, executiveTitle: defaultTitle });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Official Signatory Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.executiveTitle}
                    onChange={(e) => setForm({ ...form, executiveTitle: e.target.value })}
                    placeholder="e.g. Principal & Head of Institution"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Executive Name & Committee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Executive Authority Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.executiveName}
                    onChange={(e) => setForm({ ...form, executiveName: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma, Ph.D."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Signatory Committee / Council
                  </label>
                  <input
                    type="text"
                    value={form.signatoryCommittee}
                    onChange={(e) =>
                      setForm({ ...form, signatoryCommittee: e.target.value })
                    }
                    placeholder="e.g. Academic Senate Review Committee"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Second Signatory (IQAC / Quality Cell) */}
              <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Secondary Signatory Name
                  </label>
                  <input
                    type="text"
                    value={form.secondSignatoryName}
                    onChange={(e) =>
                      setForm({ ...form, secondSignatoryName: e.target.value })
                    }
                    placeholder="e.g. Prof. M. K. Sundaram"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Secondary Title & Unit
                  </label>
                  <input
                    type="text"
                    value={form.secondSignatoryTitle}
                    onChange={(e) =>
                      setForm({ ...form, secondSignatoryTitle: e.target.value })
                    }
                    placeholder="e.g. Director, Quality Assurance (IQAC)"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 3. Live Signatory Preview Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-900 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Live Preview: Dossier & PDF Sign-Off Block
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Automatic</span>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="h-6 border-b border-amber-300 font-serif italic text-stone-800 text-xs truncate">
                    {form.executiveName || "Dr. Signatory Name"}
                  </div>
                  <div className="font-bold text-stone-900 truncate">
                    {form.executiveTitle || "Executive Role"}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">
                    {form.signatoryCommittee || "Academic Council"}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="h-6 border-b border-amber-300 font-serif italic text-stone-800 text-xs truncate">
                    {form.secondSignatoryName || "Prof. Co-Signatory"}
                  </div>
                  <div className="font-bold text-stone-900 truncate">
                    {form.secondSignatoryTitle || "Quality Assurance"}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">
                    {form.institutionShortName || "College"}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Controls */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset to Factory</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saveSuccess}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:bg-emerald-600"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Save & Apply Across Platform</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
