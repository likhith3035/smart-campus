"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  ShieldAlert,
  SlidersHorizontal,
  Workflow,
  CheckCircle2,
  ExternalLink,
  Github,
  Globe,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Code2,
} from "lucide-react";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";

export default function AboutPage() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [collegeName, setCollegeName] = useState("National Institute of Technology");
  const [studentCount, setStudentCount] = useState(50);
  const [riskMix, setRiskMix] = useState<"realistic" | "high" | "thriving">("realistic");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Dynamic Prompt for LLMs
  const customPromptText = `Act as an Educational Data Scientist. Generate a realistic student cohort dataset in CSV format for "${collegeName}" containing exactly ${studentCount} students.

Format the output strictly as raw CSV text with the following headers:
roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct

Guidelines for realistic collegiate data:
1. Branches: Computer Science & Engineering, Information Technology, Electronics & Communication, Data Science & AI, Mechanical Engineering.
2. Semester: 6 (Pre-final year).
3. Realistic correlated distribution:
   - Roughly ${riskMix === "high" ? "40%" : riskMix === "thriving" ? "5%" : "18%"} of students should have attendance < 75% or active backlogs (1 to 3) to test early risk flags.
   - High coders (>80) can occasionally have lower CGPA (<6.5) to test the "Practical Builder" persona.
   - High CGPA students (>8.8) with low coding scores (<40) to test "The Scholar" persona.
   - CGPA should be between 4.5 and 9.8.
   - Attendance should be between 48.0% and 98.0%.
   - Active backlogs should be 0, 1, 2, or 3.
   - Coding score should be between 15 and 98.

Return ONLY the CSV text starting with the header line, no conversational text or markdown formatting so I can save directly to a file.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(customPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  /**
   * Generates a custom CSV directly in the browser with realistic correlated data
   */
  const handleGenerateAndDownloadCSV = () => {
    const firstNames = [
      "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
      "Diya", "Saanvi", "Aanya", "Aadhya", "Pari", "Ananya", "Riya", "Kiara", "Ira", "Myra",
      "Rohan", "Rahul", "Varun", "Karan", "Kavya", "Pooja", "Neha", "Sneha", "Tanvi", "Nikhil",
      "Meera", "Farhan", "Bhavna", "Chirag", "Divya", "Gaurav", "Harsh", "Jaya", "Komal", "Lalit"
    ];
    const lastNames = [
      "Sharma", "Verma", "Patel", "Reddy", "Rao", "Nair", "Iyer", "Joshi", "Khan", "Singh",
      "Kumar", "Gupta", "Bhat", "Hegde", "Malhotra", "Singhania", "Chopra", "Deshmukh", "Menon", "Pillai"
    ];
    const branches = [
      "Computer Science & Engineering",
      "Information Technology",
      "Electronics & Communication",
      "Data Science & AI",
      "Mechanical Engineering",
    ];

    const rows: string[] = [];
    rows.push("roll_no,student_name,branch,semester,cgpa,attendance_pct,active_backlogs,coding_score,aptitude_score,assignment_completion_pct");

    const highRiskRatio = riskMix === "high" ? 0.40 : riskMix === "thriving" ? 0.05 : 0.18;

    for (let i = 1; i <= studentCount; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${fName} ${lName}`;
      const branch = branches[Math.floor(Math.random() * branches.length)];
      const roll = `2024-${branch.slice(0, 3).toUpperCase()}-${String(i).padStart(3, "0")}`;

      const isRisk = Math.random() < highRiskRatio;

      let cgpa: number;
      let attendance: number;
      let backlogs: number;
      let coding: number;
      let aptitude: number;
      let assignments: number;

      if (isRisk) {
        cgpa = +(4.8 + Math.random() * 1.8).toFixed(2);
        attendance = +(52.0 + Math.random() * 21.0).toFixed(1);
        backlogs = Math.floor(Math.random() * 3) + 1;
        coding = +(20.0 + Math.random() * 25.0).toFixed(0);
        aptitude = +(25.0 + Math.random() * 30.0).toFixed(0);
        assignments = +(40.0 + Math.random() * 25.0).toFixed(0);
      } else {
        const archetypeRoll = Math.random();
        if (archetypeRoll < 0.25) {
          // The Scholar: High GPA, low coding
          cgpa = +(8.5 + Math.random() * 1.2).toFixed(2);
          attendance = +(85.0 + Math.random() * 12.0).toFixed(1);
          backlogs = 0;
          coding = +(25.0 + Math.random() * 20.0).toFixed(0);
          aptitude = +(60.0 + Math.random() * 30.0).toFixed(0);
          assignments = +(85.0 + Math.random() * 14.0).toFixed(0);
        } else if (archetypeRoll < 0.50) {
          // Practical Builder: High coding, moderate GPA
          cgpa = +(6.2 + Math.random() * 1.2).toFixed(2);
          attendance = +(74.0 + Math.random() * 15.0).toFixed(1);
          backlogs = Math.random() < 0.3 ? 1 : 0;
          coding = +(82.0 + Math.random() * 16.0).toFixed(0);
          aptitude = +(70.0 + Math.random() * 25.0).toFixed(0);
          assignments = +(65.0 + Math.random() * 20.0).toFixed(0);
        } else {
          // Consistent All-Rounder
          cgpa = +(7.8 + Math.random() * 1.8).toFixed(2);
          attendance = +(82.0 + Math.random() * 15.0).toFixed(1);
          backlogs = 0;
          coding = +(65.0 + Math.random() * 30.0).toFixed(0);
          aptitude = +(65.0 + Math.random() * 30.0).toFixed(0);
          assignments = +(75.0 + Math.random() * 22.0).toFixed(0);
        }
      }

      rows.push(`"${roll}","${name}","${branch}",6,${cgpa},${attendance},${backlogs},${coding},${aptitude},${assignments}`);
    }

    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `custom_${collegeName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${studentCount}_students.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      {/* ───────────────────────────────────────────────────────────
          1. HEADER & MISSION STATEMENT
      ─────────────────────────────────────────────────────────── */}
      <div className="space-y-3 sm:space-y-4 max-w-4xl">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
          [ ABOUT CAMPUSTIQ & PLATFORM GUIDE ]
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Turning Student Data into <span className="font-serif italic text-stone-900 font-normal">Brighter Futures.</span>
        </h1>
        <p className="text-xs sm:text-base text-[#57534E] leading-relaxed">
          CampusIQ is an AI-powered student success & prescriptive decision intelligence platform built for the <strong>KPMG in India Hackathon</strong>. It solves the fundamental limitation of traditional college dashboards by predicting at-risk students months before exams and generating automated, closed-loop interventions.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────
          2. THE PROBLEM VS THE SOLUTION
      ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>The Traditional College Problem</span>
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Disconnected Silos & Rear-View Dashboards</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Colleges store attendance in RFID databases, marks in exam cells, LMS activity in Moodle, and coding scores in placement portals. Most dashboards only report failures <em>after</em> exams end or placement drives conclude—when it is already too late to intervene.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>The CampusIQ Breakthrough</span>
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Prescriptive Decision Intelligence</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            CampusIQ harmonizes all 7 collegiate data silos into a single normalized Student Success Score ($S^3$) with statutory penalty gates, dual-risk vectors, and automated faculty intervention plans tailored to each student&apos;s behavioral archetype.
          </p>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          3. FEATURE-BY-FEATURE GUIDE
      ─────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#111827]">Platform Capabilities & Feature Guide</h2>
          <p className="text-xs text-[#78716C]">
            Explore how each module works together to provide institutional oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Faculty Cohort Workspace</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Filter 600+ students across departments (CSE, IT, ECE, AI, MECH), semesters, risk tiers, and archetypes. Instant search and 1-click collegiate CSV export for departmental committee reviews.
              </p>
            </div>
            <Link href="/faculty" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>Explore Faculty Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">AI Behavioral Segmentation</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Unsupervised K-Means clustering ($k=4$) projects students onto a 4-quadrant matrix (Academics vs. Placement): <em>The Scholar</em>, <em>Practical Builder</em>, <em>Consistent All-Rounder</em>, and <em>Critical Multi-Risk</em>.
              </p>
            </div>
            <Link href="/segmentation" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>View AI Segmentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Closed-Loop Action Tracker</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Moves beyond passive analytics. Automatically prescribes targeted actions (remedial tutoring, mentor dispatch, attendance recovery) with interactive status tracking (<em>Pending $\to$ In Progress $\to$ Completed</em>).
              </p>
            </div>
            <Link href="/interventions" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>Track Interventions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Universal Data Ingestion</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Upload ANY spreadsheet format (CSV or Excel). Our smart fuzzy schema engine maps varying column names (e.g. <em>arrears</em>, <em>percentage</em>, <em>usn</em>), lets you verify records, and redistributes weights if fields are missing.
              </p>
            </div>
            <Link href="/upload" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>Try Ingestion Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Explainable AI (XAI) Waterfall</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                No &ldquo;black box&rdquo; decisions. Every student has a SHAP-style waterfall chart showing exact positive boosters (e.g. high coding, top attendance) and negative penalty drags (e.g. active backlogs).
              </p>
            </div>
            <Link href="/" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>Open 360° Profile Modal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">Methodology & Scoring Math</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Full documentation of the non-linear $S^3$ formula with statutory penalty gates for attendance violations (&lt;75%) and active backlogs. Solves the &ldquo;Masking Problem&rdquo; of linear averages.
              </p>
            </div>
            <Link href="/methodology" className="text-xs font-bold text-[#111827] flex items-center gap-1 hover:underline">
              <span>Read Methodology Note</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          4. AI PROMPT GENERATOR FOR CUSTOM DATASETS
      ─────────────────────────────────────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-widest font-mono">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Prompt for AI Dataset Generation</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#111827] mt-1">
              Want to Test CampusIQ with Your Own Custom College Data?
            </h2>
            <p className="text-xs text-[#57534E] mt-1 max-w-2xl">
              Use this prompt with ChatGPT, Claude, or DeepSeek to instantly generate a realistic collegiate dataset tailored to your institution.
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all ${
              copiedPrompt
                ? "bg-emerald-600 text-white"
                : "bg-[#111827] hover:bg-black text-white"
            }`}
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy AI Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Customization controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#EAE5DC]">
          <div>
            <label className="text-[11px] font-bold text-[#78716C] uppercase">College / Institution Name</label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-[#111827] focus:outline-none focus:border-stone-900 font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#78716C] uppercase mb-1 block">Student Count</label>
            <CustomSelect
              value={String(studentCount)}
              onChange={(val) => setStudentCount(Number(val))}
              options={[
                { value: "25", label: "25 Students (Quick Test)" },
                { value: "50", label: "50 Students (Standard Cohort)" },
                { value: "100", label: "100 Students (Full Department)" },
                { value: "200", label: "200 Students (Multi-Department)" },
              ]}
              buttonClassName="py-2 rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#78716C] uppercase mb-1 block">Risk Ratio Scenario</label>
            <CustomSelect
              value={riskMix}
              onChange={(val) => setRiskMix(val as "realistic" | "high" | "thriving")}
              options={[
                { value: "realistic", label: "Realistic Mix (~18% At-Risk)", dotColor: "bg-blue-500" },
                { value: "high", label: "Stress Test (~40% High Risk)", dotColor: "bg-rose-500" },
                { value: "thriving", label: "High Achievers (~5% At-Risk)", dotColor: "bg-emerald-500" },
              ]}
              buttonClassName="py-2 rounded-xl"
            />
          </div>
        </div>

        {/* Prompt Output Box */}
        <div className="relative p-5 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
          <pre className="whitespace-pre-wrap">{customPromptText}</pre>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          5. IN-BROWSER INSTANT DATASET BUILDER
      ─────────────────────────────────────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">
              <Code2 className="w-4 h-4" />
              <span>Instant In-Browser Dataset Generator</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#111827] mt-1">
              Generate & Download a Custom Dataset Right Now
            </h2>
            <p className="text-xs text-[#57534E] mt-1">
              No need to open ChatGPT. Click below to immediately generate a customized {studentCount}-student synthetic dataset with correlated attributes for <strong>{collegeName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateAndDownloadCSV}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all ${
                downloadSuccess
                  ? "bg-emerald-600 text-white"
                  : "bg-[#111827] hover:bg-black text-white hover:scale-[1.02]"
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Downloaded Successfully!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate & Download CSV</span>
                </>
              )}
            </button>

            <Link
              href="/upload"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
            >
              <span>Test on Upload Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          6. DEVELOPER ATTRIBUTION & CREDITS
      ─────────────────────────────────────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400 font-semibold">
              [ SYSTEM ARCHITECT & DEVELOPER ]
            </div>
            <h2 className="text-2xl font-extrabold mt-1">Kami Likhith</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Lead Developer & Analytics Architect • Built for KPMG in India Hackathon
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://devlikhith.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="https://github.com/likhith3035"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-colors shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
          <div>
            <strong className="text-white block mb-1">Challenge Statement</strong>
            Move beyond simply building a dashboard. Use analytics and AI to convert student data into actionable insights and decision intelligence.
          </div>
          <div>
            <strong className="text-white block mb-1">Architecture & Stack</strong>
            Next.js 14, TypeScript, Tailwind CSS, Recharts, scikit-learn K-Means clustering, and zero-latency client inference.
          </div>
          <div>
            <strong className="text-white block mb-1">Live Repository</strong>
            Open source and publicly accessible at <a href="https://github.com/likhith3035/smart-campus" className="text-blue-400 hover:underline">github.com/likhith3035/smart-campus</a>.
          </div>
        </div>
      </div>
      </div>
    </WorkspaceShell>
  );
}
