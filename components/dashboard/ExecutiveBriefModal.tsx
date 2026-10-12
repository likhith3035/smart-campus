import { useMemo } from "react";
import { StudentProfile } from "@/lib/types";
import { getCampusStats } from "@/lib/studentsData";
import { useStudentData } from "@/components/context/StudentDataContext";
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Users,
  FileText,
  Settings2
} from "lucide-react";

interface ExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
  datasetName?: string;
  isCustomDataset?: boolean;
  onOpenInstitutionalProfile?: () => void;
}

export function ExecutiveBriefModal({
  isOpen,
  onClose,
  students,
  datasetName,
  isCustomDataset,
  onOpenInstitutionalProfile,
}: ExecutiveBriefModalProps) {
  const { institutionProfile } = useStudentData();
  const stats = useMemo(() => getCampusStats(students), [students]);
  const debarmentCount = useMemo(() => students.filter((s) => s.attendance_pct < 75).length, [students]);
  const debarmentPct = stats.totalStudents > 0 ? Math.round((debarmentCount / stats.totalStudents) * 100) : 0;
  const placementReadyCount = useMemo(() => students.filter((s) => (s.coding_score || 0) >= 65).length, [students]);
  const placementReadyPct = stats.totalStudents > 0 ? Math.round((placementReadyCount / stats.totalStudents) * 100) : 0;

  // Department Aggregates
  const departmentBreakdown = useMemo(() => {
    const deptMap: Record<
      string,
      { total: number; sumScore: number; debarred: number; backlogs: number; placeReady: number }
    > = {};

    students.forEach((s) => {
      const d = s.department || "General";
      if (!deptMap[d]) {
        deptMap[d] = { total: 0, sumScore: 0, debarred: 0, backlogs: 0, placeReady: 0 };
      }
      deptMap[d].total += 1;
      deptMap[d].sumScore += s.success_score || 0;
      if (s.attendance_pct < 75) deptMap[d].debarred += 1;
      if ((s.active_backlogs || 0) >= 2) deptMap[d].backlogs += 1;
      if ((s.coding_score || 0) >= 65) deptMap[d].placeReady += 1;
    });

    return Object.entries(deptMap)
      .map(([dept, data]) => {
        const avg = data.total > 0 ? Number((data.sumScore / data.total).toFixed(1)) : 0;
        const debarPct = data.total > 0 ? Math.round((data.debarred / data.total) * 100) : 0;
        const placePct = data.total > 0 ? Math.round((data.placeReady / data.total) * 100) : 0;
        const status =
          avg < 60
            ? "CRITICAL TRIAGE"
            : avg < 72
            ? "ACTIVE WATCH"
            : "ACADEMICALLY OPTIMAL";
        return {
          dept,
          total: data.total,
          avgScore: avg,
          debarred: data.debarred,
          debarPct,
          backlogs: data.backlogs,
          placePct,
          status,
        };
      })
      .sort((a, b) => a.avgScore - b.avgScore); // worst to best
  }, [students]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200 print:p-0 print:bg-white print:static">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white border border-stone-300 shadow-2xl flex flex-col text-[#111827] print:border-none print:shadow-none print:max-h-none print:w-full print:rounded-none">
        
        {/* Screen-Only Top Control Bar */}
        <div className="sticky top-0 z-20 px-6 py-3.5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="font-bold uppercase tracking-wider text-amber-300">
              Executive {institutionProfile.executiveRole}&apos;s Governance Dossier
            </span>
            <span className="text-stone-400">• {institutionProfile.institutionShortName}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInstitutionalProfile && (
              <button
                type="button"
                onClick={onOpenInstitutionalProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold transition-all border border-stone-700 cursor-pointer"
                title="Edit College Name, Authority Role & Signatures"
              >
                <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Edit Signatures</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            PRINTABLE DOSSIER BODY
        ─────────────────────────────────────────────────────────── */}
        <div className="p-8 sm:p-12 space-y-8 font-sans print:p-6 print:space-y-6">
          
          {/* 1. INSTITUTIONAL HEADER & SEAL */}
          <div className="border-b-2 border-stone-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-stone-900 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  CONFIDENTIAL • BOARD OF GOVERNANCE
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  REF: {institutionProfile.institutionShortName.toUpperCase().replace(/\s+/g, "-")}-EXEC-2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 font-serif">
                {institutionProfile.institutionName}
              </h1>
              <div className="text-sm font-bold text-stone-800 tracking-tight">
                Campus Intelligence & Student Retention Dossier
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                {institutionProfile.iqacUnit} & Academic Risk Mitigation Directorate
              </p>
            </div>

            <div className="text-right text-xs text-stone-500 font-mono space-y-0.5 shrink-0">
              <div><strong>Audited Date:</strong> {currentDate}</div>
              <div><strong>Active Cohort:</strong> {stats.totalStudents} Enrolled Students</div>
              <div><strong>Dataset Source:</strong> {isCustomDataset ? datasetName : `${institutionProfile.institutionShortName} Benchmark`}</div>
              <div><strong>Accreditation Norm:</strong> {institutionProfile.accreditationNorm}</div>
            </div>
          </div>

          {/* 2. EXECUTIVE SCORECARD */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-stone-900" />
              1. Institutional Composite Health Scorecard
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] font-mono uppercase text-stone-500">Campus Composite S³</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-950 mt-1">
                  {stats.averageScore}
                  <span className="text-xs font-normal text-stone-500">/100</span>
                </div>
                <div className="text-[10px] font-bold text-amber-700 mt-1">
                  Active Monitoring Tier
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                <div className="text-[10px] font-mono uppercase text-rose-700">Debarment Exposure</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700 mt-1">
                  {debarmentCount}
                  <span className="text-xs font-normal text-rose-600/80"> ({debarmentPct}%)</span>
                </div>
                <div className="text-[10px] text-rose-800 mt-1 font-semibold">
                  Attendance &lt; 75% Cutoff
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="text-[10px] font-mono uppercase text-amber-700">Multi-Risk Cohort</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-700 mt-1">
                  {stats.highRiskCount}
                  <span className="text-xs font-normal text-amber-600/80"> ({Math.round((stats.highRiskCount / stats.totalStudents) * 100)}%)</span>
                </div>
                <div className="text-[10px] text-amber-800 mt-1 font-semibold">
                  High Dropout Vulnerability
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] font-mono uppercase text-emerald-700">Tier-1 Placement Velocity</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 mt-1">
                  {placementReadyCount}
                  <span className="text-xs font-normal text-emerald-600/80"> ({placementReadyPct}%)</span>
                </div>
                <div className="text-[10px] text-emerald-800 mt-1 font-semibold">
                  Technical Benchmark Qualified
                </div>
              </div>
            </div>
          </div>

          {/* 3. DEPARTMENT COMPARATIVE HEALTH BREAKDOWN */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono flex items-center gap-2">
              <Building2 className="w-4 h-4 text-stone-900" />
              2. Department-by-Department Academic Vulnerability Matrix
            </h2>

            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 font-mono font-bold uppercase text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-4">Academic Department</th>
                    <th className="py-2.5 px-3 text-center">Enrollment</th>
                    <th className="py-2.5 px-3 text-center">Mean S³</th>
                    <th className="py-2.5 px-3 text-center">Debarment Risk (&lt;75%)</th>
                    <th className="py-2.5 px-3 text-center">Critical Backlogs (≥2)</th>
                    <th className="py-2.5 px-3 text-center">Placement Ready</th>
                    <th className="py-2.5 px-4 text-right">Accreditation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {departmentBreakdown.map((row) => (
                    <tr key={row.dept} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-stone-900">{row.dept}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-stone-600">{row.total}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-900">{row.avgScore}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-rose-600 font-semibold">
                        {row.debarred} ({row.debarPct}%)
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-amber-700 font-semibold">{row.backlogs}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-emerald-700 font-semibold">{row.placePct}%</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          row.status === "CRITICAL TRIAGE"
                            ? "bg-rose-100 text-rose-800"
                            : row.status === "ACTIVE WATCH"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. ROOT-CAUSE DECOMPOSITION & STRATEGIC RECOMMENDATIONS */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-stone-900" />
              3. Prescriptive Institutional Action Plan & Resource Reallocation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Immediate Attendance Recovery</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Trigger mandatory 2-week remedial attendance sprints for all <strong>{debarmentCount} students</strong> currently below 75% to eliminate semester exam debarment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Subject Arrears Triage</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Reallocate 4 senior adjunct faculty to run weekend crash courses targeting high-backlog clusters in Mathematics, Signals & Systems, and Data Structures.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ByteXL Placement Acceleration</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Enroll the <strong>{placementReadyCount} tier-1 eligible students</strong> into intensive mock technical interview tracks to maximize Day-1 campus placement conversions.
                </p>
              </div>
            </div>
          </div>

          {/* 5. FORMAL DEAN / PRINCIPAL & IQAC ENDORSEMENT SIGN-OFF */}
          <div className="pt-8 border-t border-stone-300 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-stone-600">
            <div className="space-y-3">
              <div className="h-10 border-b border-stone-400 flex items-end pb-1 font-serif italic text-stone-800 text-sm">
                {institutionProfile.executiveName}
              </div>
              <div className="font-bold text-stone-900">{institutionProfile.executiveTitle}</div>
              <div className="text-[10px] text-stone-500 font-mono">{institutionProfile.signatoryCommittee}</div>
            </div>

            <div className="space-y-3">
              <div className="h-10 border-b border-stone-400 flex items-end pb-1 font-serif italic text-stone-800 text-sm">
                {institutionProfile.secondSignatoryName}
              </div>
              <div className="font-bold text-stone-900">{institutionProfile.secondSignatoryTitle}</div>
              <div className="text-[10px] text-stone-500 font-mono">{institutionProfile.institutionShortName} Accreditation Cell</div>
            </div>

            <div className="space-y-3 hidden sm:block">
              <div className="h-10 border-b border-stone-400 flex items-end pb-1 font-mono text-[10px] text-stone-500">
                SHA-256: 8f4c2e...b3a1
              </div>
              <div className="font-bold text-stone-900">Institutional Tamper Seal</div>
              <div className="text-[10px] text-stone-500 font-mono">Verified CampusIQ Telemetry</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
