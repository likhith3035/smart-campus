# 📊 KPMG in India Hackathon — Final Presentation Deck
## Smart Campus Analytics: Predict, Optimize & Improve Student Success

---

### Slide 1: Title & Executive Vision
- **Platform Name:** CampusIQ — Analytics & Decision Intelligence Platform
- **Lead Developer & System Architect:** **Kami Likhith** ([Portfolio](https://devlikhith.vercel.app/) | [GitHub](https://github.com/likhith3035))
- **Challenge Statement:** Move beyond simply building a dashboard. Use analytics and AI to convert student data into actionable insights and decision intelligence.
- **Client/Sponsor Focus:** KPMG in India Education & Public Sector Advisory Practice
- **Core Value Proposition:** Transitioning colleges from *descriptive rear-view reporting* to *prescriptive, closed-loop student interventions*.

---

### Slide 2: The Core Problem in Higher Education
- **Disconnected Data Silos:** Colleges generate massive data in fragmented systems:
  - Examination Cells (CGPA, marks, backlogs)
  - Biometric RFID Turnstiles (Class & lab attendance)
  - LMS (Moodle/Canvas activity, logins, assignments)
  - Training & Placement Cells (Coding tests, mock interview ratings)
  - Student Affairs (Clubs, hackathons, mentor feedback)
- **The Dashboard Failure:** Traditional dashboards show *what already happened* (e.g., student failed after exams ended, or student was unplaced after campus drives).
- **The Solution:** A unified decision intelligence system that predicts risk early and generates targeted actions.

---

### Slide 3: 7-Pillar Multi-Source Data Integration
- **Harmonized Unified Schema (30% Evaluation Weight):**
  1. **Academic (30%):** CGPA, semester SGPA trajectory, active backlogs count.
  2. **Placement Readiness (20%):** Coding assessment score, aptitude test percentile, mock interview score.
  3. **Classroom Attendance (15%):** Physical & lab attendance % with 75% statutory boundary.
  4. **LMS Coursework (15%):** Assignment submission %, weekly login frequency.
  5. **Industry Skills (10%):** Verified technical certifications, soft-skill rating.
  6. **Campus Engagement (5%):** Hackathon wins, club participation.
  7. **Feedback & Sentiment (5%):** Faculty remarks, mentor sentiment index.
- **Live Ingestion Engine:** Drag-and-drop CSV/Excel parser that validates schemas and recalculates scores on the fly.

---

### Slide 4: Mathematical Student Success Score ($S^3$)
- **Formula:**
  $$\text{Success Score } (S^3) = \left[ \sum_{i=1}^{7} w_i \cdot I_i \right] \times \text{Penalty}_{\text{attendance}} \times \text{Penalty}_{\text{backlogs}}$$
- **The "Masking Problem" Solved:**
  - High marks (9.0 CGPA) cannot hide a statutory attendance violation (e.g., 62% attendance).
  - Attendance $< 75\%$ triggers an immediate penalty factor: $\max(0.68, \frac{\text{Attendance}}{75.0})$.
  - Active backlogs apply an immediate compounding penalty: $\max(0.60, 1.0 - (\text{Backlogs} \times 0.12))$.

---

### Slide 5: Dual Risk Identification Architecture
- Rather than an ambiguous single "At-Risk" label, the engine isolates specific failure modes:
  - **Academic Risk Vector:** Triggers on CGPA $< 6.5$, attendance $< 75\%$, backlogs $\ge 1$, or assignment completion $< 60\%$.
  - **Placement Risk Vector:** Triggers on coding test score $< 45$, aptitude $< 50$, mock interview rating $< 3.0 / 5.0$, or zero certifications.
  - **Disengagement Risk Vector:** Triggers on low LMS activity ($< 3$ logins/week) and negative faculty feedback.
- Allows administrators to assign the right department (Academic Council vs Placement Cell).

---

### Slide 6: Bonus Feature 1 — AI Student Segmentation (Unsupervised K-Means)
- Unsupervised clustering ($k=4$) across 7 normalized dimensions creates actionable archetypes:
  1. **"The Scholar" (18% of cohort):** High CGPA ($\ge 8.5$), $>90\%$ attendance, but low coding test score ($<45$). *Action:* Fast-track DSA bootcamp & mock interviews.
  2. **"Practical Builder" (20% of cohort):** Exceptional coding (90/100) and hackathons, but low CGPA ($<6.8$) and backlogs. *Action:* Academic remedial tutoring to ensure recruiter CGPA cutoffs.
  3. **"Consistent All-Rounder" (21% of cohort):** High CGPA, top coding score, active leader. *Action:* Tier-1 Dream placement drive nominations.
  4. **"Critical Multi-Risk" (22% of cohort):** Attendance breach, backlogs, low placement score. *Action:* Immediate Dean intervention & 1-on-1 counseling.

---

### Slide 7: Bonus Feature 2 — Explainable AI (XAI) Waterfall Drivers
- **Institutional Trust & Transparency:**
  - Every score calculation is fully explainable relative to the campus benchmark ($70.0$).
  - **Waterfall Breakdown:** Visualizes positive boosters (Green bars, e.g. $+17.8$ from CGPA) and negative drags (Red bars, e.g. $-11.2$ from Attendance Penalty, $-12.0$ from Backlogs).
  - **AI Diagnostic Summary:** Plain-language synthesis explaining the primary drivers of student risk.

---

### Slide 8: Prescriptive Decision Intelligence & Action Workflows
- **Moving Beyond Dashboards:**
  - Automatic generation of prioritized action items:
    - *Attendance Warning & Parent Counseling Slot*
    - *Enrollment in 3-week Fast-Track DSA Bootcamp*
    - *Remedial Course & Senior Peer Tutor Allocation*
    - *LMS Coursework Nudge & 48-Hour Extension*
  - **Closed-Loop Status Tracking:** Faculty and HODs update status (*Pending $\rightarrow$ In Progress $\rightarrow$ Completed*).
  - One-click CSV export of action plans for Academic Committee review.

---

### Slide 9: Technical Architecture & Zero-Cost Reliability
- **Enterprise-Grade Stack:**
  - **Frontend:** Next.js 14 App Router + TypeScript
  - **Styling & Design System:** Tailwind CSS + dark glassmorphic corporate aesthetic
  - **Visualizations:** Recharts (Radar, 4-Quadrant Scatter, Waterfall, Histogram, Bar charts)
  - **Data Processing:** Client & Server CSV parser (`papaparse`, `xlsx`)
  - **ML Pipeline:** Python `scikit-learn` for K-Means clustering and dataset synthesis
  - **Hosting:** 100% Free on Vercel with zero external API key dependencies
  - **Sub-5ms Latency:** Embedded inference engine ensures zero downtime during judging.

---

### Slide 10: Institutional Impact & Hackathon Summary
- **Evaluation Criteria Alignment:**
  - ✅ **Data Integration (30%):** 7 silos harmonized with live CSV & Excel ingestion.
  - ✅ **Success Score & Risk Identification (25%):** Non-linear $S^3$ score + dual risk triggers.
  - ✅ **Dashboard & Visualization (25%):** Modern, interactive, responsive CampusIQ UI.
  - ✅ **Problem Understanding (10%):** Prescriptive interventions over static charts.
  - ✅ **Bonus Credits (+10 pts):** AI Segmentation & Explainable AI drivers.
- **Demonstration:** Live working prototype ready for judge evaluation.
- **Lead Developer & Contact:**
  - **Kami Likhith**
  - **Portfolio:** [https://devlikhith.vercel.app/](https://devlikhith.vercel.app/)
  - **GitHub:** [https://github.com/likhith3035](https://github.com/likhith3035)
  - **Repository:** [https://github.com/likhith3035/smart-campus](https://github.com/likhith3035/smart-campus)
