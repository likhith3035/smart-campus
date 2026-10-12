"use client";

import { 
  BookOpen, 
  Sparkles, 
  Cpu, 
  AlertTriangle,
  Scale,
  ShieldAlert,
  Layers
} from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
          [ KPMG DELIVERABLE 2: EXPLANATORY METHODOLOGY NOTE ]
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Student Success Score (S³) Formulation & AI Architecture
        </h1>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Comprehensive documentation of mathematical indicator normalization, non-linear statutory penalties, dual risk classification vectors, and unsupervised persona segmentation.
        </p>
      </div>

      {/* 1. Mathematical Formulation */}
      <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-200">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#111827]">1. Mathematical Score Formulation</h2>
            <p className="text-xs text-[#78716C]">Composite calculation formula with non-linear statutory penalty gates</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] font-mono text-xs text-stone-900 space-y-2 overflow-x-auto">
          <div className="text-stone-400 font-bold">// Composite Student Success Score (0 to 100)</div>
          <div className="text-sm font-bold">
            Success Score (S³) = <span className="text-emerald-700">[ ∑ (w_i × I_i) ]</span> × <span className="text-rose-600">Penalty_Attendance</span> × <span className="text-amber-600">Penalty_Backlogs</span>
          </div>
          <div className="text-[#78716C] pt-1">
            Where I_i are normalized indicator vectors (0 - 100) and w_i are calibrated pillar weights.
          </div>
        </div>

        {/* Weights Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#EAE5DC]">
          <table className="w-full text-left text-xs text-[#57534E]">
            <thead className="bg-[#FAF8F5] uppercase font-semibold text-[#78716C] border-b border-[#EAE5DC]">
              <tr>
                <th className="p-3.5">Data Silo</th>
                <th className="p-3.5">Weight (w_i)</th>
                <th className="p-3.5">Underlying Indicators</th>
                <th className="p-3.5">Normalization Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Academic Performance</td>
                <td className="p-3.5 font-mono text-blue-600 font-bold">30%</td>
                <td className="p-3.5 text-stone-700">CGPA, SGPA Delta, Core Subject Marks</td>
                <td className="p-3.5 font-mono text-stone-500">(CGPA / 10.0) × 100</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Placement Readiness</td>
                <td className="p-3.5 font-mono text-purple-600 font-bold">20%</td>
                <td className="p-3.5 text-stone-700">Coding Score, Aptitude Percentile, Mock Interview</td>
                <td className="p-3.5 font-mono text-stone-500">(Coding × 0.45) + (Apt × 0.35) + (Mock/5 × 20)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Classroom Attendance</td>
                <td className="p-3.5 font-mono text-emerald-600 font-bold">15%</td>
                <td className="p-3.5 text-stone-700">Biometric lecture & laboratory presence %</td>
                <td className="p-3.5 font-mono text-stone-500">Min(100, Attendance %)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">LMS Coursework</td>
                <td className="p-3.5 font-mono text-teal-600 font-bold">15%</td>
                <td className="p-3.5 text-stone-700">Assignment completion rate, Weekly logins</td>
                <td className="p-3.5 font-mono text-stone-500">(Tasks % × 0.7) + (Min(20, Logins)/20 × 30)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Industry Skills</td>
                <td className="p-3.5 font-mono text-amber-600 font-bold">10%</td>
                <td className="p-3.5 text-stone-700">Verified Technical Certifications, Soft Skills</td>
                <td className="p-3.5 font-mono text-stone-500">Min(100, (Certs × 25) + (SoftSkills × 5))</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Extracurricular</td>
                <td className="p-3.5 font-mono text-pink-600 font-bold">5%</td>
                <td className="p-3.5 text-stone-700">Hackathon participations, Clubs, Campus societies</td>
                <td className="p-3.5 font-mono text-stone-500">Min(100, (Hackathons × 30) + (Clubs × 20) + 20)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#111827]">Faculty Feedback</td>
                <td className="p-3.5 font-mono text-indigo-600 font-bold">5%</td>
                <td className="p-3.5 text-stone-700">Mentor remarks & faculty sentiment rating</td>
                <td className="p-3.5 font-mono text-stone-500">Faculty Sentiment Score × 100</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Non-Linear Penalties Explanation */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Why Non-Linear Compounding Penalties are Critical</span>
          </h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            In standard linear models, a student with a 9.0 CGPA can completely mask 50% attendance or multiple pending backlogs. In Indian universities, attendance below 75% results in statutory examination debarment regardless of test marks. Our model enforces non-linear penalty multipliers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-rose-200 text-xs space-y-1">
              <span className="font-bold text-rose-700">1. Attendance Statutory Gate (&lt; 75%)</span>
              <p className="text-stone-900 font-mono font-bold">
                Penalty_Attendance = Max(0.68, Attendance % / 75.0)
              </p>
              <p className="text-[11px] text-[#78716C]">
                Immediately applies up to a 32% score penalty if student falls below statutory university norms.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-800">2. Active Backlog Drag</span>
              <p className="text-stone-900 font-mono font-bold">
                Penalty_Backlogs = Max(0.60, 1.0 - (Active Backlogs × 0.12))
              </p>
              <p className="text-[11px] text-[#78716C]">
                Each active backlog incurs a direct 12% compounding penalty due to recruitment debarment risks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dual Risk Triggers */}
      <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#111827]">2. Dual Risk Identification Vectors</h2>
            <p className="text-xs text-[#78716C]">Explicit triggers for Academic Failure vs Placement Disqualification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
            <h3 className="font-bold text-rose-700 text-sm">Academic Risk Vector</h3>
            <ul className="text-stone-700 space-y-1 list-disc list-inside">
              <li>CGPA &lt; 6.5 (University progression benchmark)</li>
              <li>Attendance &lt; 75.0% (Statutory debarment limit)</li>
              <li>Active Backlogs ≥ 1</li>
              <li>LMS assignment completion rate &lt; 60%</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
            <h3 className="font-bold text-purple-700 text-sm">Placement Risk Vector</h3>
            <ul className="text-stone-700 space-y-1 list-disc list-inside">
              <li>Coding portal benchmark score &lt; 45 / 100</li>
              <li>Aptitude percentile test &lt; 50 / 100</li>
              <li>Mock interview rating &lt; 3.0 / 5.0</li>
              <li>Zero verified technical certifications</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bonus Features Methodology */}
      <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#111827]">3. Bonus Features: AI Segmentation & Explainable AI (XAI)</h2>
            <p className="text-xs text-[#78716C]">Unsupervised K-Means persona clustering and feature-level contribution waterfalls</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#57534E]">
          <div className="space-y-3">
            <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Unsupervised K-Means Segmentation</span>
            </h3>
            <p className="leading-relaxed text-stone-600">
              Rather than grouping students by department alone, our ML pipeline applies <strong>K-Means Clustering (k=4)</strong> on standardized feature vectors [CGPA, Attendance %, Coding Score, Aptitude, Mock Rating, LMS, Certifications].
            </p>
            <p className="leading-relaxed text-stone-600">
              This isolates counter-intuitive student personas like <em>&ldquo;The Scholar&rdquo;</em> (high CGPA but low coding readiness) and <em>&ldquo;Practical Builder&rdquo;</em> (expert coding/hackathons but borderline CGPA), enabling administrators to dispatch surgical, differentiated action plans.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Explainable AI (XAI) Driver Engine</span>
            </h3>
            <p className="leading-relaxed text-stone-600">
              To satisfy institutional trust, every student score is completely decomposed using <strong>SHAP-style Feature Contribution Waterfalls</strong> relative to a campus baseline (70.0).
            </p>
            <p className="leading-relaxed text-stone-600">
              Administrators can see the exact positive point boosters (e.g. +14.2 from CGPA) and negative penalty drags (e.g. -11.5 from backlogs), eliminating black-box bias and explaining exactly <em>why</em> a student was flagged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
