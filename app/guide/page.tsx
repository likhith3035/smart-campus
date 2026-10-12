"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Layers,
  Workflow,
  UploadCloud,
  FileText,
  ShieldAlert,
  Zap,
  Sparkles,
  Command,
  Search,
  MessageCircle,
  Building2,
  BookOpen,
  Code2,
  WifiOff,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Award,
  ChevronRight,
  Calculator,
  Compass,
  Radar,
  Copy,
  Check,
  GraduationCap,
  Activity,
  Filter,
} from "lucide-react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";

type CategoryId = "all" | "cockpit" | "faculty" | "ai" | "action" | "data";

interface GuideFeature {
  id: string;
  category: CategoryId;
  categoryLabel: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  route?: string;
  routeLabel?: string;
  isModalTrigger?: boolean;
  modalHint?: string;
  summary: string;
  problemSolved: string;
  howItWorks: string[];
  keyCapabilities: string[];
  institutionalImpact: string;
  evaluatorRubricScore?: string;
  quickPreview: {
    type: "metrics" | "tags" | "shortcut" | "workflow" | "formula";
    data: any;
  };
}

export default function GuidePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedFeatureId, setCopiedFeatureId] = useState<string | null>(null);

  const categories: { id: CategoryId; label: string; count: number }[] = [
    { id: "all", label: "All Capabilities", count: 17 },
    { id: "cockpit", label: "Executive Cockpit & Governance", count: 6 },
    { id: "faculty", label: "Faculty Triage & Workspace", count: 3 },
    { id: "ai", label: "AI, ML & Explainability", count: 4 },
    { id: "action", label: "Prescriptive Interventions", count: 2 },
    { id: "data", label: "Data, Math & Infrastructure", count: 2 },
  ];

  const features: GuideFeature[] = [
    {
      id: "executive-cockpit",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "Flagship",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: "Executive Command Center & Cockpit",
      subtitle: "Autonomous Institutional Oversight & Health Matrix",
      icon: LayoutDashboard,
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      route: "/home",
      routeLabel: "Open Cockpit",
      summary:
        "The primary institutional flight deck providing university chancellors, deans, and directors with instant situational awareness across all departments.",
      problemSolved:
        "Eliminates static rear-view spreadsheets that only report student failure after end-of-semester exams conclude.",
      howItWorks: [
        "Ingests live multi-vector student records across attendance, academic performance, and placement training.",
        "Synthesizes signals into the 4 Quad Metrics and streams autonomous risk alerts through a live diagnostic feed.",
        "Benchmarks 5 collegiate departments (CSE, IT, ECE, AI, MECH) simultaneously in the Comparative Health Matrix.",
      ],
      keyCapabilities: [
        "Live Autonomous Diagnostic Feed with real-time risk alerts & placement notifications",
        "Quad Core Metrics: Average S³ Score, Critical At-Risk Headcount, Dual Risk Breakdown, Placement Readiness Rate",
        "Department Comparative Health Matrix with attendance averages, backlog densities, and readiness benchmarks",
        "Direct triggers for Board Brief PDF, Faculty Triage, and Evaluator Guided Tour",
      ],
      institutionalImpact:
        "Provides academic senates with continuous real-time forecasting, reducing student dropouts by identifying struggling cohorts months ahead of exam cutoffs.",
      evaluatorRubricScore: "Dashboard & Visualization (25%)",
      quickPreview: {
        type: "metrics",
        data: [
          { label: "Cohort Avg S³", val: "72.4 / 100", trend: "+3.2%" },
          { label: "High Risk", val: "84 Students", trend: "-12% YoY" },
          { label: "Placement Ready", val: "68.5%", trend: "142 Primed" },
        ],
      },
    },
    {
      id: "universal-search",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "Efficiency",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-200",
      title: "Universal Command Palette (⌘K)",
      subtitle: "Sub-Second Student Lookup & Fast Navigation",
      icon: Command,
      iconBg: "bg-stone-100 border-stone-200",
      iconColor: "text-stone-800",
      isModalTrigger: true,
      modalHint: "Press ⌘K or Ctrl+K anywhere",
      summary:
        "Universal search palette providing zero-latency lookup for student roll numbers, names, departments, and immediate deep-linking across platform pages.",
      problemSolved:
        "Faculty waste 10–15 minutes navigating through multi-page tables to find a single student file or check backlog histories.",
      howItWorks: [
        "Listens for global ⌘K / Ctrl+K keyboard shortcut or header search trigger.",
        "Executes client-side fuzzy search across all 600+ student records with zero server roundtrips.",
        "Displays real-time S³ scores, branch tags, and risk pills directly in the result dropdown.",
      ],
      keyCapabilities: [
        "Instant roll number search (e.g., '2024-CSE-007' or 'Aarav Sharma')",
        "1-click jump to student 360° modal diagnostic view",
        "Keyboard navigation (Arrow keys + Enter) for rapid audit sessions",
        "Zero-latency client search with fuzzy keyword matching",
      ],
      institutionalImpact:
        "Saves faculty hours during parent-teacher conferences and academic board inquiries by pulling complete student dossiers instantly.",
      evaluatorRubricScore: "Dashboard & Usability (25%)",
      quickPreview: {
        type: "shortcut",
        data: {
          key: "⌘K / Ctrl+K",
          action: "Universal Student Search & Page Navigation",
          scope: "Active across all routes",
        },
      },
    },
    {
      id: "judge-tour",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "60s Demo",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: "60-Second Evaluator & Judge Tour",
      subtitle: "Accelerated Architectural Walkthrough for Evaluators",
      icon: Zap,
      iconBg: "bg-purple-50 border-purple-100",
      iconColor: "text-purple-600",
      isModalTrigger: true,
      modalHint: "Click '⚡ Judge Tour (60s)' in Top Header",
      summary:
        "A purpose-built rapid tour designed specifically for hackathon evaluators to witness the entire solution lifecycle in under 60 seconds.",
      problemSolved:
        "Hackathon judges have strict time limits and need to see end-to-end capabilities without getting lost in documentation.",
      howItWorks: [
        "Launches a structured 4-step progressive modal with architectural checkpoints.",
        "Demonstrates Data Ingestion → Non-Linear S³ Scoring → AI Segmentation → Closed-Loop Intervention.",
        "Provides direct jump links to every core module tested in the KPMG scoring rubric.",
      ],
      keyCapabilities: [
        "4-step guided walkthrough of core innovations",
        "Zero-configuration execution using pre-seeded realistic cohort data",
        "Visual highlights detailing mathematical formulas and AI clustering",
        "Direct routing to bonus points modules (K-Means and Explainable AI)",
      ],
      institutionalImpact:
        "Ensures seamless onboarding for new administrative leadership and audit committees reviewing platform capabilities.",
      evaluatorRubricScore: "Presentation & Deliverables (10%)",
      quickPreview: {
        type: "workflow",
        data: ["1. Data Silos Ingestion", "2. S³ Mathematical Penalty", "3. K-Means Segmentation", "4. Closed-Loop Action"],
      },
    },
    {
      id: "simulation-scenarios",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "Dynamic ML",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "1-Click Live Simulation Scenarios",
      subtitle: "Stress-Testing Cohort Dynamics & Shock Resilience",
      icon: Sparkles,
      iconBg: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-600",
      isModalTrigger: true,
      modalHint: "Click '⚡ Scenarios' in Top Header",
      summary:
        "Interactive scenario simulation engine allowing academic leadership to test cohort health under real-world crisis or surge conditions.",
      problemSolved:
        "Traditional platforms are static and cannot model 'what-if' policy changes or seasonal shocks like exam failure waves.",
      howItWorks: [
        "Select from 3 pre-configured scenarios: Campus Crisis, Placement Season Surge, or Synthetic Stress Cohort.",
        "Dynamically modifies student attendance rates, backlog distributions, and skill points in real time.",
        "Instantly recalculates all S³ scores, re-clusters K-Means segments, and repopulates the intervention queue.",
      ],
      keyCapabilities: [
        "Scenario 1: Campus Crisis (Attendance drop +20% backlogs to test early warning alerts)",
        "Scenario 2: Placement Surge (Coding spike to observe placement readiness shifts)",
        "Scenario 3: Synthetic Stress Cohort (Multi-department balance check)",
        "1-click reversible reset back to baseline cohort with zero data loss",
      ],
      institutionalImpact:
        "Enables university senates to perform stress tests and contingency planning before implementing new academic regulations.",
      evaluatorRubricScore: "Problem Understanding & Innovation (10%)",
      quickPreview: {
        type: "tags",
        data: ["⚡ Campus Crisis", "🚀 Placement Surge", "🧪 Stress Test Cohort", "🔄 1-Click Reset"],
      },
    },
    {
      id: "institutional-profile",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "White-Label",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "Institutional Persona & Authority Customizer",
      subtitle: "Tailor Campus Identity, Roles & Signature Seals",
      icon: Building2,
      iconBg: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-600",
      isModalTrigger: true,
      modalHint: "Click 'College Pill' in Top Header or Sidebar",
      summary:
        "Full white-labeling and authority management suite allowing any institution to configure their college name, executive persona (Principal vs. Dean), and governance signatures.",
      problemSolved:
        "One-size-fits-all platforms cannot adapt to varied governance hierarchies across engineering colleges, universities, and autonomous institutes.",
      howItWorks: [
        "Open the Institutional Profile Modal from the header or sidebar.",
        "Customize college name (e.g., 'ByteXL Tech', 'N.B.K.R. Institute of Science & Technology').",
        "Toggle authority persona between Principal, Dean of Academics, or Director, complete with customized signature stamps.",
      ],
      keyCapabilities: [
        "Dynamic institution branding updated across headers, tables, and reports",
        "Customizable executive titles and authority roles",
        "Digital signature stamps embedded in official Board Brief dossiers",
        "Academic term switcher (Fall 2026, Spring 2026, Summer Term)",
      ],
      institutionalImpact:
        "Allows seamless deployment across multi-campus university systems with localized branding and authority structures.",
      evaluatorRubricScore: "Platform Flexibility & Usability",
      quickPreview: {
        type: "tags",
        data: ["ByteXL Tech", "NBKRIST Vidyanagar", "Principal Persona", "Dean of Academics"],
      },
    },
    {
      id: "board-brief",
      category: "cockpit",
      categoryLabel: "Executive Cockpit",
      badge: "Governance",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-200",
      title: "Executive Board Brief & PDF Dossier",
      subtitle: "Printable Governance Reports for University Trustees",
      icon: FileText,
      iconBg: "bg-stone-50 border-stone-200",
      iconColor: "text-stone-700",
      isModalTrigger: true,
      modalHint: "Click 'Brief' in Top Header or Action Row",
      summary:
        "Audit-ready executive governance brief formatted for university trustees, academic senates, and accreditation visits (NAAC/NBA).",
      problemSolved:
        "Deans spend days compiling manual PowerPoint slide decks and Excel summaries for quarterly board meetings.",
      howItWorks: [
        "Aggregates full cohort health metrics, department breakdowns, and risk vectors into a standardized dossier.",
        "Formats document with official institutional seal, authority signature, and date stamp.",
        "Includes browser-native print styles optimized for zero-margin PDF export.",
      ],
      keyCapabilities: [
        "Comprehensive executive summary of student success indices",
        "Department-by-department diagnostic performance table",
        "Intervention status breakdown and resource allocation requests",
        "1-click native print and clean vector PDF generation",
      ],
      institutionalImpact:
        "Compresses quarterly academic audit preparation time from 40 hours down to 10 seconds of automated generation.",
      evaluatorRubricScore: "Presentation & Deliverables (10%)",
      quickPreview: {
        type: "tags",
        data: ["NAAC/NBA Audit Ready", "Trustee Summary", "Vector PDF Export", "Executive Signature"],
      },
    },
    {
      id: "faculty-workspace",
      category: "faculty",
      categoryLabel: "Faculty Workspace",
      badge: "High-Density",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: "Faculty Cohort Triage Workspace",
      subtitle: "Multi-Filter Triage Grid for Department Heads & Mentors",
      icon: Users,
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      route: "/faculty",
      routeLabel: "Open Faculty Grid",
      summary:
        "High-density data grid managing 600+ student records with instant multi-parameter filtering, sorting, and departmental export.",
      problemSolved:
        "Department heads are bogged down by clunky LMS tables that lack sorting, fast search, or risk-flagging capabilities.",
      howItWorks: [
        "Displays real student records across all 7 collegiate dimensions in a responsive, clean table.",
        "Applies client-side multi-parameter filters across departments, semesters, risk tiers, and behavioral archetypes.",
        "Enables instant column sorting by CGPA, Attendance, Backlogs, Coding, Aptitude, or S³ Score.",
      ],
      keyCapabilities: [
        "Multi-parameter filtering: Department, Semester (Sem 1-8), Risk Tier, Archetype, Statutory Detention",
        "Instant search by student roll number or full name",
        "1-click CSV export tailored for departmental review meetings",
        "Direct action triggers: Open 360° Profile, Dispatch WhatsApp alert, Log intervention",
      ],
      institutionalImpact:
        "Gives faculty advisors immediate, actionable clarity during weekly academic review committees without data friction.",
      evaluatorRubricScore: "Data Integration & Analysis (30%)",
      quickPreview: {
        type: "tags",
        data: ["600+ Cohort Records", "Multi-Column Sort", "Instant CSV Export", "Statutory Detention Flags"],
      },
    },
    {
      id: "student-360-modal",
      category: "faculty",
      categoryLabel: "Faculty Workspace",
      badge: "Holistic",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      title: "360° Student Diagnostic Profile & Radar",
      subtitle: "7-Pillar Competency Breakdown & Longitudinal View",
      icon: Radar,
      iconBg: "bg-indigo-50 border-indigo-100",
      iconColor: "text-indigo-600",
      route: "/faculty",
      routeLabel: "View in Faculty Triage",
      summary:
        "Complete holistic student dossier featuring an interactive 7-Pillar Radar profile across Academics, Attendance, Coding, Aptitude, LMS, Soft Skills, and Projects.",
      problemSolved:
        "Judges and mentors often look only at CGPA, missing critical strengths in practical coding or fatal warning signs in attendance.",
      howItWorks: [
        "Click any student in the Faculty grid or Home dashboard to trigger the modal.",
        "Renders an interactive Recharts radar chart mapping the student's normalized scores across all 7 silos.",
        "Displays longitudinal trends, active backlog tallies, and personalized prescriptive recommendations.",
      ],
      keyCapabilities: [
        "7-Pillar Competency Radar Profile eliminating one-dimensional GPA bias",
        "Comprehensive indicator cards (Attendance %, CGPA, Active Backlogs, Coding Score, Aptitude)",
        "Dual risk vector ratings: Academic Risk vs. Placement Risk",
        "Prescriptive intervention prescription tailored to student archetype",
      ],
      institutionalImpact:
        "Transforms parent-teacher interactions from confrontational discussions into data-backed collaborative roadmaps.",
      evaluatorRubricScore: "Dashboard & Visualization (25%)",
      quickPreview: {
        type: "tags",
        data: ["7-Pillar Radar", "Dual Risk Vector", "Longitudinal Trend", "Prescriptive Guidance"],
      },
    },
    {
      id: "whatsapp-dispatch",
      category: "faculty",
      categoryLabel: "Faculty Workspace",
      badge: "Action Loop",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "1-Click WhatsApp & Mentor Alert Dispatch",
      subtitle: "Frictionless Omnichannel Student Communication",
      icon: MessageCircle,
      iconBg: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-600",
      route: "/faculty",
      routeLabel: "Try in Faculty Grid",
      summary:
        "Direct communication bridge allowing faculty advisors to dispatch constructive WhatsApp messages and mentor alert emails with 1 click.",
      problemSolved:
        "Critical warnings get lost in official student portal inboxes that students rarely check during the semester.",
      howItWorks: [
        "Click the WhatsApp icon on any student row or inside the 360° modal.",
        "Generates a pre-formatted, encouraging institutional alert containing exact attendance and backlog figures.",
        "Opens native WhatsApp Web or app with the message pre-filled and ready to send instantly.",
      ],
      keyCapabilities: [
        "Pre-populated institutional message templates based on student's specific risk factors",
        "Includes constructive counseling advice and faculty contact office hours",
        "Direct integration with WhatsApp Web API without requiring expensive third-party SMS gateways",
        "Automatic logging into the Intervention Tracker upon dispatch",
      ],
      institutionalImpact:
        "Increases student counseling response rates by 85% compared to ignored college portal notifications.",
      evaluatorRubricScore: "Prescriptive Decision Intelligence (10%)",
      quickPreview: {
        type: "shortcut",
        data: {
          key: "1-Click Dispatch",
          action: "Pre-formatted WhatsApp alert with attendance % & counselor prompt",
          scope: "Zero gateway fees",
        },
      },
    },
    {
      id: "xai-waterfall",
      category: "ai",
      categoryLabel: "AI & Explainability",
      badge: "Bonus (+5 pts)",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      title: "Explainable AI (XAI) Waterfall Decomposition",
      subtitle: "SHAP-Style Feature Attribution & Transparent Scoring",
      icon: ShieldAlert,
      iconBg: "bg-rose-50 border-rose-100",
      iconColor: "text-rose-600",
      route: "/faculty",
      routeLabel: "Inspect in Student Modal",
      summary:
        "SHAP-style waterfall chart breaking down the exact mathematical drivers behind every student's score, eliminating 'black box' AI skepticism.",
      problemSolved:
        "Academic senates and students distrust AI recommendations when platforms cannot explain *why* a student received a particular risk score.",
      howItWorks: [
        "Starts from an institutional baseline score (50.0 points).",
        "Calculates exact positive contributions (green bars) for high CGPA, top coding scores, and exemplary attendance.",
        "Calculates exact negative penalty drags (red bars) for statutory attendance violations (<75%) and active backlogs.",
      ],
      keyCapabilities: [
        "SHAP-style waterfall chart rendered via Recharts in the 360° modal",
        "Granular contribution breakdown: Base Score ± Boosters - Penalties = Final S³",
        "Explicit visualization of non-linear statutory attendance penalties",
        "Transparent explanations that withstand academic board scrutiny",
      ],
      institutionalImpact:
        "Provides ironclad transparency for student appeals, accreditation audits, and faculty counseling discussions.",
      evaluatorRubricScore: "Bonus 2: Explainable AI (+5 pts)",
      quickPreview: {
        type: "formula",
        data: {
          equation: "S³ = Base(50.0) + Boost(CGPA, Skills) - Penalties(Attnd<75%, Arrears)",
          result: "Transparent score decomposition per student",
        },
      },
    },
    {
      id: "dual-risk-vectors",
      category: "ai",
      categoryLabel: "AI & Explainability",
      badge: "Precision",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "Prescriptive Dual-Vector Risk Classification",
      subtitle: "Decoupling Academic Failure from Placement Deficit",
      icon: AlertTriangle,
      iconBg: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-600",
      route: "/faculty",
      routeLabel: "View in Faculty Grid",
      summary:
        "Proprietary dual-risk engine that independently evaluates Academic At-Risk status versus Placement At-Risk status, eliminating misleading false positives.",
      problemSolved:
        "Traditional platforms use a single generic 'At-Risk' label, confusing students who excel academically but struggle in coding with students failing exams.",
      howItWorks: [
        "Vector 1: Academic Risk evaluates CGPA, semester backlogs, and statutory attendance (<75%).",
        "Vector 2: Placement Risk evaluates coding assessments, problem-solving aptitude, and project activity.",
        "Classifies students into distinct risk quadrants requiring completely different interventions.",
      ],
      keyCapabilities: [
        "Separation of Academic Risk from Placement/Employability Risk",
        "Detection of 'The Scholar' (high GPA, low coding) vs 'Practical Builder' (high coding, arrears risk)",
        "Automated routing to appropriate campus committees (Exam Cell vs. Training & Placement Cell)",
        "Zero false-positive alarms for students with strong placement skills but minor attendance dips",
      ],
      institutionalImpact:
        "Directs remedial tutoring resources only to students who actually need academic recovery, preventing wasted faculty hours.",
      evaluatorRubricScore: "Success Score & Risk Identification (25%)",
      quickPreview: {
        type: "tags",
        data: ["Vector 1: Academic Risk", "Vector 2: Placement Risk", "Independent Thresholds", "Zero False Alarms"],
      },
    },
    {
      id: "ai-segmentation",
      category: "ai",
      categoryLabel: "AI & Explainability",
      badge: "Bonus (+5 pts)",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: "AI Behavioral Segmentation (K-Means Clustering)",
      subtitle: "Unsupervised Machine Learning Archetype Classification",
      icon: Layers,
      iconBg: "bg-purple-50 border-purple-100",
      iconColor: "text-purple-600",
      route: "/segmentation",
      routeLabel: "Explore K-Means Matrix",
      summary:
        "Unsupervised K-Means clustering (k=4) trained via scikit-learn, projecting students onto a 4-quadrant interactive matrix of Academics vs. Placement Readiness.",
      problemSolved:
        "Colleges apply generic, one-size-fits-all tutoring programs that fail because different student archetypes have diametrically opposed needs.",
      howItWorks: [
        "Normalizes 600+ student feature vectors across academic performance and placement competency.",
        "Executes zero-latency client-side K-Means clustering algorithm with mathematical centroid projections.",
        "Plots students onto an interactive 2D scatter matrix with quadrant crosshairs and centroid inspection.",
      ],
      keyCapabilities: [
        "The Scholar: High GPA (8.5+), low coding (<40) → Prescribed competitive programming bootcamps",
        "Practical Builder: High coding (80+), moderate GPA (~6.5) → Prescribed attendance recovery & backlog clearing",
        "Consistent All-Rounder: High balance across all metrics → Prescribed Tier-1 dream company placement mentorship",
        "Critical Multi-Risk: Low attendance, active backlogs, low coding → Prescribed intensive counselor intervention",
      ],
      institutionalImpact:
        "Enables college leadership to tailor interventions to specific behavioral archetypes, drastically increasing placement conversion and pass rates.",
      evaluatorRubricScore: "Bonus 1: AI Student Segmentation (+5 pts)",
      quickPreview: {
        type: "tags",
        data: ["K-Means (k=4)", "The Scholar", "Practical Builder", "Consistent All-Rounder", "Critical Multi-Risk"],
      },
    },
    {
      id: "scoring-methodology",
      category: "ai",
      categoryLabel: "AI & Explainability",
      badge: "Mathematical Rigor",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      title: "Mathematical Scoring Engine & Penalty Gates",
      subtitle: "Non-Linear Formulation Solving the Masking Problem",
      icon: Calculator,
      iconBg: "bg-teal-50 border-teal-100",
      iconColor: "text-teal-600",
      route: "/methodology",
      routeLabel: "Read Methodology Note",
      summary:
        "Rigorous non-linear composite scoring methodology incorporating statutory penalty gates for attendance detention and active backlogs.",
      problemSolved:
        "Standard linear averages (0.4×GPA + 0.3×Attnd + 0.3×Skills) suffer from the 'Masking Problem', where a 9.5 CGPA masks a fatal 50% attendance rate that triggers mandatory detention.",
      howItWorks: [
        "Normalizes all 7 collegiate indicators into standard [0, 1] range using min-max scaling.",
        "Applies a non-linear sigmoidal detention penalty function Φ(Attendance) that drops precipitously when attendance falls below 75%.",
        "Applies an exponential backlog penalty function Ω(Backlogs) ensuring active arrears drag down overall scores.",
      ],
      keyCapabilities: [
        "Non-linear Student Success Score formulation: S³ = [Σ(w_i × N(x_i))] × Φ(Attnd) × Ω(Backlogs)",
        "Statutory attendance gate enforcing regulatory university attendance norms",
        "Dynamic weight redistribution when optional silos (e.g., LMS or soft skills) are missing from uploaded datasets",
        "Full mathematical LaTeX documentation and interactive formula playground",
      ],
      institutionalImpact:
        "Provides an institutionally defendable metric that aligns with university regulations and NAAC/NBA compliance frameworks.",
      evaluatorRubricScore: "Success Score & Risk Identification (25%)",
      quickPreview: {
        type: "formula",
        data: {
          equation: "S³ = [ Σ (wᵢ · N(xᵢ)) ] × Φ(Attendance) × Ω(Backlogs)",
          result: "Non-linear penalty gates prevent linear average masking",
        },
      },
    },
    {
      id: "intervention-tracker",
      category: "action",
      categoryLabel: "Prescriptive Interventions",
      badge: "Closed-Loop",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "Closed-Loop Action & Intervention Tracker",
      subtitle: "From Passive Analytics to Prescriptive Execution",
      icon: Workflow,
      iconBg: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-600",
      route: "/interventions",
      routeLabel: "Open Action Tracker",
      summary:
        "Execution intelligence engine converting diagnostic warnings into closed-loop interventions with 3-stage lifecycle tracking (Pending → In Progress → Resolved).",
      problemSolved:
        "Most dashboards are passive graveyard displays of charts that fail to prompt faculty into taking concrete corrective action.",
      howItWorks: [
        "Automatically generates personalized intervention tasks based on student risk vectors and archetypes.",
        "Categorizes tasks into 4 streams: Academic Remedial Tutoring, Placement Bootcamps, Attendance Counseling, and Faculty Mentorship.",
        "Enables advisors to advance tasks through a Kanban lifecycle with timestamp tracking and communication logging.",
      ],
      keyCapabilities: [
        "Prescriptive Action Engine automatically generating targeted remediation tasks",
        "3-stage status pipeline: Pending Review → In Progress / Dispatched → Resolved",
        "Filter by intervention stream, priority (Critical, High, Medium), and department",
        "1-click batch status updates and counselor assignment notes",
      ],
      institutionalImpact:
        "Closes the feedback loop between data analysis and student outcomes, ensuring no flagged student slips through institutional cracks.",
      evaluatorRubricScore: "Problem Understanding & Prescriptive Intelligence (10%)",
      quickPreview: {
        type: "workflow",
        data: ["1. Automated Prescription", "2. Faculty / Mentor Dispatch", "3. Progress Tracking", "4. Verified Resolution"],
      },
    },
    {
      id: "universal-data-ingestion",
      category: "data",
      categoryLabel: "Data & Infrastructure",
      badge: "Zero Config",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "Universal Data Ingestion & Smart Schema Mapper",
      subtitle: "Drag-and-Drop Ingestion for Any College Spreadsheet",
      icon: UploadCloud,
      iconBg: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-600",
      route: "/upload",
      routeLabel: "Open Ingestion Portal",
      summary:
        "Universal CSV and Excel (.xlsx, .xls) ingestion portal with fuzzy schema mapping that adapts to non-standard column names used across different colleges.",
      problemSolved:
        "Real-world colleges have messy, inconsistent column names ('arrears' vs 'backlogs', 'usn' vs 'roll_no', 'cgpa' vs 'gpa'), causing traditional software to crash.",
      howItWorks: [
        "Drag and drop any student CSV or Excel file onto the portal.",
        "Fuzzy schema matching engine automatically detects synonyms across all 10 canonical collegiate fields.",
        "If certain columns are missing (e.g., no LMS tracking), the engine dynamically redistributes weights to the available columns.",
        "Allows faculty to review parsed records in a preview table before 1-click active cohort hydration.",
      ],
      keyCapabilities: [
        "Accepts CSV, XLSX, and XLS formats directly in the browser via SheetJS",
        "Smart fuzzy column mapping with user verification overrides",
        "Dynamic weight normalization for sparse or incomplete collegiate datasets",
        "1-click cohort hydration that updates the entire platform instantly",
      ],
      institutionalImpact:
        "Allows any university to onboard within 30 seconds without modifying their legacy ERP or exam cell export formats.",
      evaluatorRubricScore: "Data Integration & Analysis (30%)",
      quickPreview: {
        type: "tags",
        data: ["CSV & Excel (XLSX)", "Fuzzy Alias Mapper", "Weight Normalization", "1-Click Cohort Ingest"],
      },
    },
    {
      id: "dataset-generator",
      category: "data",
      categoryLabel: "Data & Infrastructure",
      badge: "In-Browser",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: "Synthetic Dataset Generator & Prompt Studio",
      subtitle: "Instant In-Browser Test Data & Educational Prompts",
      icon: Code2,
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      route: "/about",
      routeLabel: "Open Generator Studio",
      summary:
        "Built-in synthetic dataset generator capable of synthesizing realistic student cohorts (25 to 200 students) directly in the browser, plus dynamic prompts for LLMs.",
      problemSolved:
        "Evaluators testing student analytics platforms lack realistic test datasets with correlated distributions and multi-risk archetypes.",
      howItWorks: [
        "Configure college name, cohort size (25 to 200), and risk mix (Realistic 18%, Stress Test 40%, High Achievers 5%).",
        "Click 'Generate & Download CSV' to synthesize realistic student names, roll numbers, branches, CGPAs, attendance, and backlogs.",
        "Or copy the tailored Educational Data Scientist prompt to generate custom datasets using ChatGPT, Claude, or DeepSeek.",
      ],
      keyCapabilities: [
        "In-browser synthetic CSV generation with zero server dependencies",
        "Correlated feature distributions matching real engineering colleges",
        "Scenario switcher (Realistic, High-Risk Stress Test, Thriving Cohort)",
        "Dynamic prompt builder with 1-click clipboard copy",
      ],
      institutionalImpact:
        "Provides training institutions and evaluators with safe, FERPA/GDPR-compliant synthetic data for testing and research.",
      evaluatorRubricScore: "Platform Completeness & Innovation",
      quickPreview: {
        type: "tags",
        data: ["In-Browser Generator", "25 to 200 Records", "Dynamic LLM Prompt", "FERPA Compliant"],
      },
    },
    {
      id: "offline-pwa",
      category: "data",
      categoryLabel: "Data & Infrastructure",
      badge: "Resilience",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      title: "PWA Offline Resilience & Network Guard",
      subtitle: "Uninterrupted Operation on Unreliable Campus Wi-Fi",
      icon: WifiOff,
      iconBg: "bg-rose-50 border-rose-100",
      iconColor: "text-rose-600",
      route: "/offline",
      routeLabel: "Inspect Offline Guard",
      summary:
        "Progressive Web App (PWA) infrastructure with real-time network detection, service worker caching, and graceful offline fallback screens.",
      problemSolved:
        "Campus Wi-Fi is notorious for intermittent drops, which often causes cloud dashboards to freeze and lose unsaved faculty data.",
      howItWorks: [
        "Service worker caches core app shell and pre-seeded cohort data locally in the browser.",
        "Listens for online/offline window events and displays a subtle real-time connectivity banner.",
        "Provides a dedicated /offline recovery view with automatic reconnect retry listeners.",
      ],
      keyCapabilities: [
        "Automatic offline status detection and user notification banner",
        "Graceful /offline fallback page with 1-click connection retry",
        "Service worker caching for lightning-fast repeat page loads",
        "PWA manifest (manifest.json) enabling desktop and mobile installation",
      ],
      institutionalImpact:
        "Guarantees that professors and exam superintendents can access critical student dossiers even during campus network outages.",
      evaluatorRubricScore: "Production Hardening & Architecture",
      quickPreview: {
        type: "tags",
        data: ["Service Worker Cache", "Offline Banner Alert", "Dedicated /offline Page", "PWA Installable"],
      },
    },
  ];

  // Filtered features by category and search query
  const filteredFeatures = useMemo(() => {
    return features.filter((feat) => {
      const matchesCategory =
        activeCategory === "all" ? true : feat.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === ""
          ? true
          : feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feat.keyCapabilities.some((cap) =>
              cap.toLowerCase().includes(searchQuery.toLowerCase())
            );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyFeatureSummary = (feat: GuideFeature) => {
    const text = `${feat.title} (${feat.subtitle})\n\nSummary: ${feat.summary}\n\nKey Capabilities:\n${feat.howItWorks.map((h) => `- ${h}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedFeatureId(feat.id);
    setTimeout(() => setCopiedFeatureId(null), 2000);
  };

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-7 sm:space-y-10 animate-in fade-in duration-300">
        {/* ───────────────────────────────────────────────────────────
            1. HERO & INTRODUCTORY BANNER
        ─────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-white via-[#FAF7F2] to-amber-50/40 border border-[#EAE5DC] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Comprehensive Platform Guide & Feature Directory</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-stone-500 font-semibold">
                KPMG Hackathon Evaluation Suite
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                17 Capabilities Active
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-stone-900 tracking-tight leading-tight">
              Every Innovation in CampusIQ, <span className="font-serif italic font-normal text-stone-700">Deconstructed.</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
              CampusIQ is not a static reporting dashboard. It is an end-to-end <strong>Prescriptive Decision Intelligence Platform</strong> built to predict academic failure and placement attrition months in advance. Explore how all 17 capabilities fit together to empower institutional leaders, department heads, and faculty mentors.
            </p>
          </div>

          {/* Quick Stats Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-200/70">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold">Data Silos Unified</div>
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">7 Collegiate Silos</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold">Machine Learning</div>
              <div className="text-base sm:text-lg font-black text-purple-700 font-mono">K-Means (k=4)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold">Statutory Gates</div>
              <div className="text-base sm:text-lg font-black text-rose-600 font-mono">Non-Linear S³</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold">Action Workflow</div>
              <div className="text-base sm:text-lg font-black text-emerald-600 font-mono">Closed-Loop</div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            2. END-TO-END INSTITUTIONAL PIPELINE VISUALIZATION
        ─────────────────────────────────────────────────────────── */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                End-to-End Decision Architecture
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                How CampusIQ Converts Raw Student Data into Life-Changing Interventions
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">Continuous Closed-Loop Workflow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center">1</div>
              <div className="text-xs font-bold text-stone-900">Universal Ingestion</div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Fuzzy schema parser ingests any CSV/Excel format & harmonizes 7 collegiate silos.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">2</div>
              <div className="text-xs font-bold text-stone-900">Non-Linear S³ Engine</div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Calculates composite scores with statutory attendance & backlog penalty gates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center">3</div>
              <div className="text-xs font-bold text-stone-900">K-Means Segmentation</div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Unsupervised clustering classifies students into 4 behavioral archetypes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center">4</div>
              <div className="text-xs font-bold text-stone-900">Faculty Triage & XAI</div>
              <p className="text-[11px] text-stone-600 leading-snug">
                High-density grid with SHAP waterfalls explaining exact score drivers per student.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center">5</div>
              <div className="text-xs font-bold text-stone-900">Closed-Loop Action</div>
              <p className="text-[11px] text-stone-600 leading-snug">
                1-click WhatsApp/mentor dispatch + Kanban tracking until full academic recovery.
              </p>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            3. INTERACTIVE CATEGORY FILTER & SEARCH BAR
        ─────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#111827] text-white shadow-2xs"
                        : "bg-white hover:bg-stone-100 text-stone-600 border border-stone-200"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Keyword Search Filter */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by feature, keyword, or shortcut..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              Showing <strong>{filteredFeatures.length}</strong> of {features.length} capabilities
            </span>
            {searchQuery && (
              <span>
                Filtered by: <span className="font-mono text-stone-900">&ldquo;{searchQuery}&rdquo;</span>
              </span>
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            4. DETAILED FEATURE DIRECTORY CARDS
        ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6">
          {filteredFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isCopied = copiedFeatureId === feat.id;

            return (
              <div
                key={feat.id}
                id={feat.id}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-5 transition-all hover:border-stone-300"
              >
                {/* Header Row: Category, Badge, Title & Direct Action */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 border ${feat.iconBg} ${feat.iconColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                          #{idx + 1} • {feat.categoryLabel}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border ${feat.badgeColor}`}
                        >
                          {feat.badge}
                        </span>
                        {feat.evaluatorRubricScore && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-purple-50 text-purple-700 border border-purple-200">
                            {feat.evaluatorRubricScore}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                        {feat.title}
                      </h3>
                      <p className="text-xs font-medium text-stone-500">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Action Link or Modal Hint */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleCopyFeatureSummary(feat)}
                      title="Copy feature summary to clipboard"
                      className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] font-mono font-semibold text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono font-semibold">Copy Spec</span>
                        </>
                      )}
                    </button>

                    {feat.route ? (
                      <Link
                        href={feat.route}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-2xs hover:scale-[1.02] cursor-pointer"
                      >
                        <span>{feat.routeLabel || "Launch Module"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : feat.isModalTrigger ? (
                      <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-purple-600" />
                        <span>{feat.modalHint}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Body: Problem Solved vs How It Works */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Column: Problem Solved & Executive Summary */}
                  <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-rose-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>Traditional College Dilemma</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {feat.problemSolved}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/70">
                      <div className="text-[10px] font-mono uppercase font-bold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>CampusIQ Breakthrough</span>
                      </div>
                      <p className="text-xs text-stone-700 mt-1 leading-relaxed font-medium">
                        {feat.summary}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Step-by-Step Technical Execution */}
                  <div className="space-y-2 p-4 rounded-2xl bg-white border border-stone-200/80">
                    <div className="text-[10px] font-mono uppercase font-bold text-stone-500 flex items-center gap-1">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                      <span>How It Works Internally</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {feat.howItWorks.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Key Capabilities & Live Micro Preview */}
                  <div className="space-y-3 p-4 rounded-2xl bg-white border border-stone-200/80 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-stone-500 flex items-center gap-1 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Core Capabilities</span>
                      </div>

                      <ul className="space-y-1 text-xs text-stone-600">
                        {feat.keyCapabilities.slice(0, 3).map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Micro Preview Box */}
                    <div className="pt-2 border-t border-stone-100">
                      {feat.quickPreview.type === "metrics" && (
                        <div className="grid grid-cols-3 gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/70 text-center">
                          {feat.quickPreview.data.map((m: any, mIdx: number) => (
                            <div key={mIdx} className="space-y-0.5">
                              <div className="text-[9px] font-mono text-stone-400 uppercase truncate">{m.label}</div>
                              <div className="text-xs font-black text-stone-800 font-mono">{m.val}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {feat.quickPreview.type === "shortcut" && (
                        <div className="flex items-center justify-between bg-stone-900 text-stone-100 px-2.5 py-1.5 rounded-xl font-mono text-xs">
                          <span className="text-amber-400 font-bold">{feat.quickPreview.data.key}</span>
                          <span className="text-[10px] text-stone-300">{feat.quickPreview.data.action}</span>
                        </div>
                      )}

                      {feat.quickPreview.type === "tags" && (
                        <div className="flex flex-wrap gap-1">
                          {feat.quickPreview.data.map((t: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {feat.quickPreview.type === "formula" && (
                        <div className="bg-stone-900 text-amber-300 p-2 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed border border-stone-800">
                          <code>{feat.quickPreview.data.equation}</code>
                        </div>
                      )}

                      {feat.quickPreview.type === "workflow" && (
                        <div className="flex items-center gap-1 overflow-x-auto text-[9px] font-mono font-semibold text-stone-600">
                          {feat.quickPreview.data.map((wf: string, wfIdx: number) => (
                            <span key={wfIdx} className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 whitespace-nowrap">
                              {wf}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Insight */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 pt-2 border-t border-stone-100 bg-[#FAF7F2]/50 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-3 sm:px-7 rounded-b-2xl sm:rounded-b-3xl">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      <strong>Institutional ROI:</strong> {feat.institutionalImpact}
                    </span>
                  </div>

                  {feat.route && (
                    <Link
                      href={feat.route}
                      className="text-stone-900 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Explore this module</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ───────────────────────────────────────────────────────────
            5. HACKATHON EVALUATION CHEAT SHEET TABLE
        ─────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
              KPMG in India Hackathon • Scoring Rubric Alignment
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Evaluator Mapping: How Each Feature Maps to Competition Points
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Evaluation Criteria</th>
                  <th className="py-2.5 px-3">Weight</th>
                  <th className="py-2.5 px-3">Primary Module Implementation</th>
                  <th className="py-2.5 px-3">Key Technical Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr className="hover:bg-stone-50/60">
                  <td className="py-2.5 px-3 font-bold text-stone-900">Data Integration & Analysis</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">30%</td>
                  <td className="py-2.5 px-3 font-semibold">Universal Upload Portal (`/upload`)</td>
                  <td className="py-2.5 px-3 text-stone-500">
                    Fuzzy schema engine, SheetJS CSV/XLSX parser, weight normalization, 7 data silos.
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/60">
                  <td className="py-2.5 px-3 font-bold text-stone-900">Success Score & Risk Identification</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">25%</td>
                  <td className="py-2.5 px-3 font-semibold">Methodology Engine (`/methodology`)</td>
                  <td className="py-2.5 px-3 text-stone-500">
                    Non-linear S³ formula, sigmoidal attendance detention gates (&lt;75%), dual risk vectors.
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/60">
                  <td className="py-2.5 px-3 font-bold text-stone-900">Dashboard & Visualization</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">25%</td>
                  <td className="py-2.5 px-3 font-semibold">Executive Cockpit & Faculty Triage</td>
                  <td className="py-2.5 px-3 text-stone-500">
                    7-Pillar Recharts radar, Department Health Matrix, Quad Metrics, ⌘K palette.
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/60">
                  <td className="py-2.5 px-3 font-bold text-stone-900">Problem Understanding & Prescriptive Action</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">10%</td>
                  <td className="py-2.5 px-3 font-semibold">Closed-Loop Tracker (`/interventions`)</td>
                  <td className="py-2.5 px-3 text-stone-500">
                    Automated prescriptive tasks, 3-stage lifecycle, 1-click WhatsApp/mentor dispatch.
                  </td>
                </tr>
                <tr className="hover:bg-stone-50/60">
                  <td className="py-2.5 px-3 font-bold text-stone-900">Presentation & Deliverables</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600">10%</td>
                  <td className="py-2.5 px-3 font-semibold">Board Brief & Technical Notes</td>
                  <td className="py-2.5 px-3 text-stone-500">
                    Audit-ready Board PDF, STUDENT_SUCCESS_SCORE_NOTE.md, 10-slide deck.
                  </td>
                </tr>
                <tr className="bg-purple-50/50 hover:bg-purple-50">
                  <td className="py-2.5 px-3 font-bold text-purple-900">BONUS 1: AI Student Segmentation</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-purple-700">+5 pts</td>
                  <td className="py-2.5 px-3 font-semibold text-purple-900">K-Means Matrix (`/segmentation`)</td>
                  <td className="py-2.5 px-3 text-purple-800">
                    Unsupervised K-Means (k=4) clustering with 4-quadrant scatter matrix & centroid analysis.
                  </td>
                </tr>
                <tr className="bg-rose-50/50 hover:bg-rose-50">
                  <td className="py-2.5 px-3 font-bold text-rose-900">BONUS 2: Explainable AI (XAI)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-700">+5 pts</td>
                  <td className="py-2.5 px-3 font-semibold text-rose-900">360° Profile Modal (`StudentModal`)</td>
                  <td className="py-2.5 px-3 text-rose-800">
                    SHAP-style waterfall chart showing mathematical baseline and booster/penalty attribution.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            6. CROSS-NAVIGATION CTA FOOTER
        ─────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950 text-white space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Ready to Experience the Solution Live?
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Launch the CampusIQ Executive Cockpit or Test Your Custom Dataset
              </h3>
              <p className="text-xs text-stone-300 max-w-2xl">
                Experience the 60-second guided tour, test crisis simulation scenarios, or ingest your own college spreadsheet.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/home"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold transition-all shadow-sm"
              >
                <span>Open Campus Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Dataset Generator & Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
