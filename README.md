# 🎓 CampusIQ — AI-Powered Student Analytics & Success Platform
### *Prescriptive Decision Intelligence, Non-Linear Risk Modeling & Closed-Loop Interventions*

[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-Data%20Viz-22c55e?style=flat)](https://recharts.org/)
[![Machine Learning](https://img.shields.io/badge/ML-scikit--learn%20K--Means%20(k=4)-orange?style=flat&logo=scikitlearn)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat)](./LICENSE)
[![Hackathon](https://img.shields.io/badge/KPMG%20in%20India-Hackathon%20Submission-00338D?style=flat)](https://github.com/likhith3035/smart-campus)

> **Challenge Statement:** Move beyond simply building a rear-view dashboard. Use analytics and AI to convert multi-silo student data into actionable, prescriptive decision intelligence that predicts academic failure and placement attrition months before exams conclude.

---

## 🧭 Live Demo & Quick Navigation

- 🌐 **Live Public Application:** **[http://localhost:3001](http://localhost:3001)** (or your Vercel deployment URL)
- 📖 **Interactive Platform Guide:** **[`/guide`](http://localhost:3001/guide)** — Complete visual feature directory with live micro-previews
- 🏛️ **Executive Campus Cockpit:** **[`/home`](http://localhost:3001/home)** — Quad KPIs, autonomous diagnostic ticker & department matrix
- 👥 **Faculty Cohort Triage:** **[`/faculty`](http://localhost:3001/faculty)** — High-density 600+ student grid with multi-parameter filtering
- 🔮 **AI Behavioral Segmentation:** **[`/segmentation`](http://localhost:3001/segmentation)** — Unsupervised K-Means clustering ($k=4$) 4-quadrant matrix
- ⚡ **Closed-Loop Interventions:** **[`/interventions`](http://localhost:3001/interventions)** — 3-stage action tracker & 1-click WhatsApp dispatch
- 📤 **Universal Data Ingestion:** **[`/upload`](http://localhost:3001/upload)** — Fuzzy column schema mapper for any college CSV/Excel
- 📐 **Scoring Methodology Note:** **[`/methodology`](http://localhost:3001/methodology)** — Mathematical formulation & penalty gates
- 🧪 **Dataset Generator & Team:** **[`/about`](http://localhost:3001/about)** — In-browser synthetic CSV builder & team roster

---

## 🏆 KPMG in India Hackathon — Evaluation Alignment Matrix

| Evaluation Criteria | Weight | CampusIQ Implementation Highlights | Primary Module |
| :--- | :---: | :--- | :---: |
| **1. Data Integration & Analysis** | **30%** | Unifies **7 collegiate silos** (Academic, Attendance, LMS, Placement, Skills, Extracurricular, Feedback). Features a **universal drag-and-drop CSV/Excel portal** with fuzzy column alias matching and dynamic weight redistribution for sparse datasets. | [`/upload`](./app/upload/page.tsx) |
| **2. Success Score & Risk Identification** | **25%** | Mathematically derived **Student Success Score ($S^3$)** solving the "Masking Problem" via non-linear sigmoidal detention penalties (Attendance $< 75\%$) and exponential backlog damping. Includes **Prescriptive Dual-Vector Risk Classification** (Academic vs. Placement). | [`/methodology`](./app/methodology/page.tsx) |
| **3. Dashboard & Visualization** | **25%** | Executive editorial UI with **7-Pillar Competency Radar**, **Cross-Department Comparative Health Matrix**, **Autonomous Diagnostic Ticker**, and **Universal `⌘K` Command Palette**. | [`/home`](./app/home/page.tsx) & [`/faculty`](./app/faculty/page.tsx) |
| **4. Problem Understanding & Action** | **10%** | Moves from passive metrics to **Closed-Loop Prescriptive Action** with an automated 3-stage status tracker (*Pending* $\to$ *In Progress* $\to$ *Resolved*) and **1-click WhatsApp/Mentor alert dispatching**. | [`/interventions`](./app/interventions/page.tsx) |
| **5. Presentation & Deliverables** | **10%** | Comprehensive open-source repository including official [`STUDENT_SUCCESS_SCORE_NOTE.md`](./STUDENT_SUCCESS_SCORE_NOTE.md), 10-slide [`PRESENTATION_DECK.md`](./PRESENTATION_DECK.md), and automated printable **Executive Board Brief PDF**. | [`ExecutiveBriefModal`](./components/dashboard/ExecutiveBriefModal.tsx) |
| **⭐ BONUS 1: AI Student Segmentation** | **+5 pts** | **Unsupervised K-Means ($k=4$)** clustering projecting students onto an interactive **4-Quadrant Scatter Matrix** (*The Scholar, Practical Builder, Consistent All-Rounder, Critical Multi-Risk*). | [`/segmentation`](./app/segmentation/page.tsx) |
| **⭐ BONUS 2: Explainable AI (XAI)** | **+5 pts** | **SHAP-Style Feature Contribution Waterfall** breaking down every student's score into baseline (50.0), positive boosters, and negative penalty drags to eliminate black-box AI skepticism. | [`StudentModal`](./components/StudentModal.tsx) |

---

## ⚡ Architecture & End-to-End Decision Pipeline

```
                                  CAMPUS DATA SILOS
       [ Exam Cell (CGPA) ] [ RFID Attendance ] [ LMS Engagement ] [ Placement / Coding ]
                                          │
                                          ▼
                         [ 1. Universal Ingestion & Fuzzy Schema ]
                         - SheetJS parser (CSV, XLSX, XLS)
                         - Dynamic weight normalizer for sparse fields
                                          │
                                          ▼
                      [ 2. Non-Linear Mathematical Scoring (S³) ]
                      - Sigmoidal detention gate: Φ(Attnd < 75%)
                      - Exponential backlog penalty: Ω(Backlogs)
                                          │
                                          ▼
                      [ 3. Unsupervised K-Means Clustering (k=4) ]
                      - Vector projection: Academic Index vs Placement Readiness
                      - Archetypes: Scholar, Builder, All-Rounder, Multi-Risk
                                          │
                      ┌───────────────────┴───────────────────┐
                      ▼                                       ▼
         [ 4. Executive Oversight ]             [ 5. Faculty Triage & XAI ]
         - Quad Core KPIs                       - High-density multi-filter grid
         - Department Comparative Matrix        - 7-Pillar Competency Radar
         - Autonomous Diagnostic Feed           - SHAP Feature Contribution Waterfall
                      │                                       │
                      └───────────────────┬───────────────────┘
                                          ▼
                        [ 6. Prescriptive Closed-Loop Action ]
                        - 3-Stage Lifecycle (Pending → In Progress → Resolved)
                        - 1-Click WhatsApp & Mentor Alert Dispatch
                        - Official Executive Board Brief (PDF / Print)
```

---

## 🚀 Exhaustive Feature Directory (All 17 Capabilities)

### 1. Executive Command Center & Cockpit (`/home`)
- **Autonomous Diagnostic Ticker:** Live stream highlighting critical multi-risk alerts, statutory attendance violations, and placement surges.
- **Quad Core Metric Cards:** Instant executive visibility into Average $S^3$ Score, Critical High-Risk Headcount, Dual Risk Breakdown, and Predicted Placement Readiness.
- **Department Comparative Health Matrix:** Cross-departmental benchmarking across CSE, IT, ECE, AI, and MECH with average attendance, backlog density, and placement readiness.
- **Executive Actions:** Instant access to Board Brief generation, Faculty Triage, and the 60-Second Evaluator Tour.

### 2. Universal Command Palette (`⌘K` / `Ctrl+K`)
- **Zero-Latency Search:** Instant keyboard-driven lookup across all 600+ student records by roll number (e.g., `2024-CSE-007`) or name.
- **Deep Navigation:** Jump between pages, launch simulation scenarios, or open student diagnostic dossiers without touching the mouse.

### 3. 60-Second Evaluator & Judge Tour
- **Accelerated Audit:** 4-step progressive modal built specifically for hackathon evaluators to witness the entire solution lifecycle from data ingestion to closed-loop interventions in under 60 seconds.

### 4. 1-Click Live Simulation Scenarios
- **Campus Crisis:** Models an attendance drop and backlog spike to observe dynamic early-warning flag triggers.
- **Placement Season Surge:** Models intensive skill and coding gains to track placement readiness velocity.
- **Synthetic Stress Cohort:** Multi-department stress testing with 1-click reversible reset back to baseline.

### 5. Institutional Authority & Role Customizer
- **Custom Branding:** Customize university/college name (e.g., *ByteXL Tech*, *N.B.K.R. Institute of Science & Technology*).
- **Executive Personas:** Toggle authority titles between Principal, Dean of Academics, or Director.
- **Digital Signatures:** Automatically applies customized authority signatures onto official governance dossiers.

### 6. Executive Board Brief & Printable PDF Dossier
- **Audit-Ready Reports:** Generates standardized executive governance briefs formatted for university trustees, academic senates, and NAAC/NBA accreditation visits.
- **Vector Print Layout:** Optimized CSS print formatting for clean zero-margin PDF downloads.

### 7. Faculty Cohort Triage Workspace (`/faculty`)
- **High-Density Grid:** Responsive 600+ record data table with multi-parameter filtering across Department, Semester (Sem 1–8), Risk Tier, Archetype, and Statutory Violations.
- **Multi-Column Sorting:** Sort by CGPA, Attendance %, Backlogs, Coding Score, Aptitude, or $S^3$.
- **Collegiate CSV Export:** 1-click export of filtered student subsets for departmental committee reviews.

### 8. 360° Student Diagnostic Profile & 7-Pillar Radar
- **7-Pillar Competency Radar:** Interactive Recharts radar mapping Academics, Attendance, Coding, Aptitude, LMS Engagement, Soft Skills, and Projects.
- **Holistic Diagnostics:** Eliminates one-dimensional GPA reliance by providing longitudinal indicators and personalized remediation roadmaps.

### 9. 1-Click WhatsApp & Mentor Alert Dispatcher
- **Omnichannel Communication:** Bridges data directly to mobile devices by generating pre-formatted, encouraging WhatsApp messages containing attendance %, backlog tallies, and faculty counseling hours.
- **Zero Gateway Costs:** Works natively via WhatsApp Web API without requiring expensive SMS aggregators.

### 10. Explainable AI (XAI) Waterfall Decomposition (Bonus +5 pts)
- **SHAP-Style Feature Attribution:** Transparent waterfall chart showing exact positive boosters (+CGPA, +Coding prowess) and negative penalty drags (-Attendance violation, -Arrears) relative to a 50.0 baseline.
- **Black-Box Elimination:** Guarantees transparency for student appeals and academic senate audits.

### 11. Prescriptive Dual-Vector Risk Classification
- **Academic At-Risk Vector:** Detects exam failure and mandatory detention risks (CGPA, backlogs, attendance $< 75\%$).
- **Placement At-Risk Vector:** Detects employability deficits (coding assessments, aptitude, projects).
- **Zero False Positives:** Distinguishes high-coding builders with moderate GPAs from scholars who require competitive programming bootcamps.

### 12. AI Behavioral Segmentation (Unsupervised K-Means $k=4$) (Bonus +5 pts)
- **The Scholar:** High CGPA ($8.5+$), low coding ($<40$) $\to$ Prescribed competitive programming bootcamps.
- **The Practical Builder:** Elite coding ($80+$), moderate CGPA ($\sim 6.5$) $\to$ Prescribed backlog clearing & attendance management.
- **Consistent All-Rounder:** High balance across all dimensions $\to$ Primed for Tier-1 dream company placements.
- **Critical Multi-Risk:** Low attendance, arrears, depressed skills $\to$ Prescribed intensive multi-departmental recovery.
- **Interactive Scatter Matrix:** 2D scatter matrix with quadrant crosshairs, centroid coordinates, and density distributions.

### 13. Mathematical Scoring Engine & Statutory Penalty Gates (`/methodology`)
- **The Masking Problem Solved:** Standard linear averages allow a 9.5 CGPA to mask a 50% attendance rate. CampusIQ applies non-linear sigmoidal detention penalties and exponential backlog damping.
- **Formula Formulation:** Full LaTeX equations and an interactive parameter sandbox.

### 14. Closed-Loop Action & Intervention Tracker (`/interventions`)
- **Prescriptive Intelligence:** Automatically generates targeted remediation tasks based on student risk vectors and archetypes.
- **3-Stage Workflow:** Kanban lifecycle (*Pending Review* $\to$ *In Progress / Dispatched* $\to$ *Resolved*).
- **Categorized Streams:** Academic Tutoring, Placement Bootcamps, Attendance Counseling, and Faculty Mentorship.

### 15. Universal Data Ingestion & Direct Raw CSV Paste (`/upload`)
- **Direct Raw Text Paste Mode:** Paste raw comma-separated or tab-delimited text directly into the web console. Automatic sanitization strips trailing punctuation (e.g., `97 .`), handles commas/tabs, and removes empty rows.
- **1-Click Sample Pre-Fill:** Built-in `⚡ Pre-fill NBKRIST Sample (8 Students)` button for instantaneous evaluator testing.
- **Format Agnostic File Upload:** Drag-and-drop CSV, XLSX, and XLS file ingestion powered by SheetJS.
- **Fuzzy Alias Recognition:** Maps non-standard aliases (e.g., `usn`, `arrears`, `rollno`, `marks`) to canonical headers.
- **Dynamic Weight Normalization:** Re-balances scoring weights to 100% if datasets lack specific columns (e.g., LMS tracking).

### 16. Integrated AI Dataset Prompt Studio & Generator (`/upload` & `/about`)
- **3-in-1 Ingestion Switcher:** Available directly on the Ingestion Portal (`/upload`) and About page (`/about`).
- **1-Click Direct In-Memory Ingest:** Click `⚡ Ingest Directly in Memory` to synthesize and hydrate 25 to 200 student records instantly with zero file download friction.
- **In-Browser CSV Synthesis:** Generates realistic collegiate distributions (Realistic 18% at-risk, Stress Test 40%, Thriving Cohort 5%).
- **LLM Prompt Studio:** Tailored, copy-ready prompt generator for ChatGPT, Claude, and DeepSeek.

### 17. PWA Offline Resilience & Network Guard (`/offline`)
- **Service Worker Caching:** Caches the core app shell and sample cohort data locally in browser storage.
- **Network Listeners:** Real-time online/offline status bar with a dedicated `/offline` fallback interface.
- **Installable PWA:** Desktop and mobile home-screen installability via `manifest.json`.

---

## 📐 Mathematical Formulation of the Student Success Score ($S^3$)

### 1. Base Linear Weighted Sum
Let $x_i$ represent the $i$-th indicator, normalized to the range $[0, 1]$ via min-max scaling $N(x_i)$:

$$S_{\text{base}} = \sum_{i=1}^{n} w_i \cdot N(x_i), \quad \text{where } \sum_{i=1}^{n} w_i = 1.0$$

| Indicator ($x_i$) | Canonical Weight ($w_i$) | Normalization Formula |
| :--- | :---: | :--- |
| **Cumulative GPA (CGPA)** | $0.25$ | $N(\text{CGPA}) = \frac{\text{CGPA} - 4.0}{10.0 - 4.0}$ |
| **Attendance Percentage** | $0.20$ | $N(\text{Attnd}) = \frac{\text{Attnd} - 50.0}{100.0 - 50.0}$ |
| **Coding Assessment Score** | $0.20$ | $N(\text{Code}) = \frac{\text{Code}}{100.0}$ |
| **Aptitude & Reasoning** | $0.15$ | $N(\text{Apt}) = \frac{\text{Apt}}{100.0}$ |
| **LMS Assignment Completion** | $0.10$ | $N(\text{LMS}) = \frac{\text{LMS}}{100.0}$ |
| **Active Backlogs (Penalty)** | $0.10$ | $N(\text{Backlogs}) = 1.0 - \min\left(1.0, \frac{\text{Backlogs}}{4.0}\right)$ |

### 2. Statutory Non-Linear Attendance Detention Gate
Under university regulations, attendance below $75\%$ triggers mandatory exam detention regardless of academic excellence. We model this via a continuous sigmoidal penalty function:

$$\Phi(\text{Attnd}) = \begin{cases} 
1.0 & \text{if } \text{Attnd} \ge 75.0\% \\ 
\frac{1}{1 + e^{-k \cdot (\text{Attnd} - 65.0)}} \times 0.60 & \text{if } \text{Attnd} < 75.0\% 
\end{cases}$$

### 3. Exponential Backlog Compounding Penalty
Each additional backlog compounds the probability of semester dropouts:

$$\Omega(\text{Backlogs}) = e^{-\lambda \cdot \text{Backlogs}}, \quad \text{where } \lambda = 0.12$$

### 4. Final Composite Equation
$$S^3 = \left[ S_{\text{base}} \times \Phi(\text{Attnd}) \times \Omega(\text{Backlogs}) \right] \times 100$$

---

## 🛠️ Tech Stack & Zero-Cost Architecture

- **Core Framework:** Next.js 14.2 (App Router) + React 18 + TypeScript 5
- **Styling & Design System:** Tailwind CSS 3.4 with CampusIQ editorial palette (`#FAF7F2`, `#111827`, `#4A154B`)
- **Data Visualizations:** Recharts (Radar, 2D Scatter Matrix, Bar, SHAP Waterfall, Histogram)
- **Client-Side Ingestion:** SheetJS (`xlsx`) for zero-server CSV/Excel parsing
- **Machine Learning Inference:** Embedded Python `scikit-learn` trained K-Means ($k=4$) running zero-latency client inference
- **Icons & Visuals:** Lucide React
- **Zero Cost Execution:** $0.00 required. No paid database, no external API keys, 100% free serverless hosting.

---

## 💻 Local Setup & Quick Start

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or pnpm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/likhith3035/smart-campus.git
cd smart-campus
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** (or the port indicated in your terminal) in your browser.

### 3. Build for Production Validation
```bash
npm run build
npm run start
```

### 4. 1-Click Vercel Deployment
Deploy to Vercel for free to provide evaluators with an instant live demo link:
```bash
npx vercel
```

---

## 📊 Canonical Dataset Schema

CampusIQ operates on standard collegiate records. Sample dataset available at [`lib/data/sample_campus_dataset.csv`](./lib/data/sample_campus_dataset.csv):

| Column Name | Type | Valid Range | Description |
| :--- | :---: | :---: | :--- |
| `roll_no` | `string` | e.g. `2024-CSE-001` | Unique student roll / USN number |
| `student_name` | `string` | Full Name | Student's full registered name |
| `branch` | `string` | CSE, IT, ECE, AI, MECH | Collegiate department |
| `semester` | `number` | `1` to `8` | Current enrolled semester |
| `cgpa` | `number` | `0.0` to `10.0` | Cumulative Grade Point Average |
| `attendance_pct` | `number` | `0.0` to `100.0` | RFID attendance rate percentage |
| `active_backlogs` | `number` | `0` to `10` | Number of uncleared academic arrears |
| `coding_score` | `number` | `0` to `100` | Placement portal coding score |
| `aptitude_score` | `number` | `0` to `100` | Quantitative & logical reasoning score |
| `assignment_completion_pct` | `number` | `0` to `100` | LMS assignment completion percentage |

---

## 👥 Hackathon Team: Team LEARNOVA

**N.B.K.R. Institute of Science & Technology (NBKRIST)** • Vidyanagar, Andhra Pradesh

| Team Member | Role & Architectural Responsibilities | Institutional Email |
| :--- | :--- | :--- |
| **Pulikonda Srinivas** | **Team Lead** & ML Decision Analytics | `23kb1a3080@nbkrist.org` |
| **Kami Likith** | System Architecture & Full-Stack Engine | `23kb1a3035@nbkrist.org` |
| **Rudrakota Suchirmai** | Interventions & Behavioral Modeling | `24kb1a3091@nbkrist.org` |
| **Bandi Mounika** | UI/UX & Responsive Engineering | `24kb1a3008@nbkrist.org` |
| **Pallumallu Charishma** | Dataset Validation & QA Testing | `24kb1a3076@nbkrist.org` |

- 🌐 **Lead Developer Portfolio:** [https://devlikhith.vercel.app/](https://devlikhith.vercel.app/)
- 🐙 **GitHub Repository:** [https://github.com/likhith3035/smart-campus](https://github.com/likhith3035/smart-campus)
- 🏆 **Submission Track:** KPMG in India Hackathon — AI-Powered Student Analytics, Decision Intelligence & Success Platform

---

## 📄 License
This project is licensed under the [MIT License](./LICENSE). Designed and engineered with precision by Team LEARNOVA.
