# 🎓 SmartCampus AI — KPMG in India Hackathon
## *AI-Powered Student Analytics, Decision Intelligence & Success Platform*

> **Challenge:** Move beyond simply building a dashboard. Use analytics and AI to convert student data into actionable insights and decision intelligence.

---

## 🏆 Project Overview & KPMG Evaluation Alignment

| Evaluation Criteria | Weight | Implementation Details in this Solution |
| :--- | :---: | :--- |
| **Data Integration & Analysis** | **30%** | Ingests **7 core collegiate silos** (Academic, Attendance, LMS, Placement, Skills, Extracurricular, Feedback). Includes a live **drag-and-drop CSV/Excel portal** with schema validation. |
| **Success Score & Risk Identification** | **25%** | Mathematically rigorous **Student Success Score ($S^3$)** with non-linear statutory penalties (Attendance $< 75\%$ & Backlogs). **Dual Risk Classification** (Academic vs Placement). |
| **Dashboard & Visualization** | **25%** | Enterprise dark-mode UI with **7-Pillar Radar Profile**, **Campus Score Distribution**, and **Cross-Department Health Matrices**. |
| **Problem Understanding** | **10%** | Built around campus administrator workflows with an automated **Prescriptive Action Engine** (counselor alerts, bootcamps, mentor dispatch). |
| **Presentation & Deliverables** | **10%** | Includes official [`STUDENT_SUCCESS_SCORE_NOTE.md`](./STUDENT_SUCCESS_SCORE_NOTE.md) and [`PRESENTATION_DECK.md`](./PRESENTATION_DECK.md) slide deck. |
| **BONUS 1: AI Student Segmentation** | **+5 pts** | **Unsupervised K-Means ($k=4$)** clustering with an interactive **4-Quadrant Scatter Matrix** (*The Scholar, Practical Builder, Consistent All-Rounder, Critical Multi-Risk*). |
| **BONUS 2: Explainable AI (XAI)** | **+5 pts** | **SHAP-style Feature Contribution Waterfall** showing exact positive boosters and negative penalty drags per student. |

---

## 🚀 Live Demo & Quick Start

The platform is running locally and ready for immediate testing:

### 1. Run Locally
```bash
# Clone the repository
git clone <repo-url>
cd bytexl-hackathon

# Run local development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Deploy Live to Vercel (100% Free Public Demo Link)
To generate a live public URL for hackathon judges:
```bash
# Login to Vercel and deploy in 60 seconds
npx vercel
```
Or push this repository to GitHub and import it into **[vercel.com](https://vercel.com)** with zero configuration required.

---

## 📂 Key Deliverables in this Repository

1. **Working Prototype:** Complete Next.js + TypeScript + Tailwind CSS application with interactive Recharts data visualizations.
2. **Deliverable 2:** [`STUDENT_SUCCESS_SCORE_NOTE.md`](./STUDENT_SUCCESS_SCORE_NOTE.md) — Comprehensive technical note explaining mathematical formulation, normalized indicators, and non-linear penalty gates.
3. **Deliverable 3:** [`PRESENTATION_DECK.md`](./PRESENTATION_DECK.md) — 10-slide pitch presentation for hackathon judges.
4. **Sample Dataset:** [`lib/data/sample_campus_dataset.csv`](./lib/data/sample_campus_dataset.csv) — 600 realistic collegiate student records across all 7 data silos.

---

## 🛠️ Architecture & Tech Stack

- **Frontend & App Framework:** Next.js 14 (App Router) + TypeScript
- **Design System:** Tailwind CSS + dark glassmorphic corporate aesthetic
- **Visualization:** Recharts (Radar, 4-Quadrant Scatter, Waterfall, Histogram, Bar)
- **Data Ingestion:** Client-side CSV/Excel parsing (`lib/scoring.ts`)
- **Machine Learning & Pipeline:** Python `scikit-learn` K-Means clustering + embedded zero-latency TypeScript inference engine
- **Zero Cost:** $0.00 required, no API keys, no paid dependencies.
