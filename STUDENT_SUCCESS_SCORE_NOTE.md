# KPMG in India Hackathon — Deliverable Note
## Formulation and Rationale of the Student Success Score ($S^3$)

---

### 1. Executive Summary
Colleges generate large amounts of data through disparate systems: ERP exam cells, biometric turnstiles, LMS portals (Moodle/Canvas), coding platforms (LeetCode/HackerRank), and faculty mentor logs. When evaluated in isolation, colleges fail to detect at-risk students until either semester examinations or campus recruitment cycles have passed.

The **Student Success Score ($S^3$)** is an integrated index scaled from **0 to 100** designed to quantify a student’s multidimensional institutional health, predict academic and placement failure, and trigger prescriptive interventions before crises emerge.

---

### 2. Multi-Pillar Indicator Architecture

The score synthesizes indicators across **seven core data categories**:

| Silo Category | Weight ($w_i$) | Raw Indicators Measured | Normalization & Scaling ($I_i$) | Rationale & Academic Significance |
| :--- | :---: | :--- | :--- | :--- |
| **Academic Performance** | **30%** | Cumulative CGPA (0–10), SGPA semester delta, active backlogs count | $I_{\text{acad}} = \min\left(100, \frac{\text{CGPA}}{10.0} \times 100\right)$ | Foundation for academic standing and basic recruitment eligibility. |
| **Placement Readiness** | **20%** | Coding test score (0–100), Aptitude percentile (0–100), Mock interview rating (1–5) | $I_{\text{place}} = 0.45(\text{Coding}) + 0.35(\text{Aptitude}) + 0.20\left(\frac{\text{Mock}}{5.0} \times 100\right)$ | Industry hiring criteria prioritize algorithmic problem solving and interview confidence. |
| **Classroom Attendance** | **15%** | Lecture attendance %, laboratory practical attendance % | $I_{\text{attd}} = \min(100, \text{Attendance } \%)$ | Strongest behavioral predictor of student engagement and disciplinary continuity. |
| **LMS Coursework** | **15%** | Assignment submission %, weekly login frequency | $I_{\text{lms}} = 0.70(\text{Task Completion } \%) + 0.30\left(\frac{\min(20, \text{Logins})}{20} \times 100\right)$ | Leading indicator of coursework diligence before mid-semester examinations. |
| **Industry Skills & Certs** | **10%** | Verified technical certifications (AWS, NPTEL, Coursera), Soft skill index (1–10) | $I_{\text{skills}} = \min(100, \text{Certs} \times 25 + \text{SoftSkills} \times 5)$ | Bridges the delta between textbook syllabus and recruiter requirements. |
| **Campus Engagement** | **5%** | Hackathons participated, technical clubs, leadership roles | $I_{\text{eng}} = \min(100, \text{Hackathons} \times 30 + \text{Clubs} \times 20 + 20)$ | Reflects peer collaboration, initiative, and institutional belonging. |
| **Feedback & Sentiment** | **5%** | Faculty remarks sentiment, student satisfaction score | $I_{\text{feed}} = \text{Faculty Sentiment Score} \times 100$ | Captures subjective behavioral nuances, unresponsiveness, or emotional distress. |

$$\sum_{i=1}^{7} w_i = 0.30 + 0.20 + 0.15 + 0.15 + 0.10 + 0.05 + 0.05 = 1.00 \quad (100\%)$$

---

### 3. Non-Linear Statutory Penalty Multipliers

Standard weighted averages suffer from the **"Masking Flaw"**: a student with high academic marks (e.g., 9.2 CGPA) can easily mask critical behavioral failure, such as 50% attendance or multiple pending backlogs.

In collegiate systems (especially AICTE/UGC universities in India):
1. **Attendance Statutory Gate:** Under university bylaws, attendance below 75% mandates examination debarment, irrespective of marks.
2. **Active Backlogs:** Backlogs immediately disqualify candidates from Day-1 corporate placement drives.

To model this reality, the composite score applies **non-linear penalty multipliers**:

$$S^3 = \left( \sum_{i=1}^{7} w_i \cdot I_i \right) \times \text{Penalty}_{\text{attendance}} \times \text{Penalty}_{\text{backlogs}}$$

Where:
$$\text{Penalty}_{\text{attendance}} = \begin{cases} 1.0 & \text{if } \text{Attendance} \ge 75\% \\ \max\left(0.68, \frac{\text{Attendance}}{75.0}\right) & \text{if } \text{Attendance} < 75\% \end{cases}$$

$$\text{Penalty}_{\text{backlogs}} = \max\left(0.60, 1.0 - (\text{Active Backlogs} \times 0.12)\right)$$

*Example Impact:* A student with a base weighted score of 82.0 who drops to 65% attendance and incurs 1 backlog has their score reduced to $82.0 \times \left(\frac{65}{75}\right) \times (1.0 - 0.12) = 82.0 \times 0.867 \times 0.88 = 62.5$ (*Moderate Risk*), triggering immediate administrative triage.

---

### 4. Dual Risk Classification Architecture

Rather than a generic binary "Risk" label, the platform implements a **Dual Risk Vector**:

#### 4.1 Academic Risk Flag
- **HIGH RISK Triggers:**
  - Attendance $< 75.0\%$ (Debarment threat)
  - Active Backlogs $\ge 2$
  - Cumulative CGPA $< 6.0$
- **MEDIUM RISK Triggers:**
  - CGPA between $6.0$ and $6.5$
  - Active Backlogs $= 1$
  - LMS assignment completion $< 60\%$

#### 4.2 Placement Risk Flag
- **HIGH RISK Triggers:**
  - Coding assessment score $< 40.0 / 100$
  - Aptitude percentile $< 45.0 / 100$
  - Mock interview rating $< 2.5 / 5.0$
- **MEDIUM RISK Triggers:**
  - Coding score between $40.0$ and $50.0$
  - Zero verified industry certifications

---

### 5. Bonus Feature 1: AI Student Segmentation (Unsupervised K-Means)

Students are mapped across a 7-dimensional normalized feature space using **K-Means Clustering ($k=4$)**:
1. **"The Scholar" (High Theory, Low Placement):** High CGPA ($\ge 8.0$), $>85\%$ attendance, but coding scores $< 50$. *Action:* Mandatory coding bootcamps and mock interview drills.
2. **"Practical Builder" (Low CGPA, High Technical):** Stellar GitHub/hackathon scores, but CGPA $< 6.8$ and pending backlogs. *Action:* Remedial academic support to clear backlogs before placement cutoffs.
3. **"Consistent All-Rounder" (High-Flyer):** Balanced high scores across all pillars. *Action:* Dream recruiter nominations, peer mentoring.
4. **"Critical Multi-Risk" (Compound Disengagement):** Low attendance, low CGPA, low coding readiness. *Action:* Dean escalation, parental alert, 1-on-1 counseling.

---

### 6. Bonus Feature 2: Explainable AI (XAI) Waterfall Drivers

For institutional trust, the platform computes **SHAP-style Feature Contribution Waterfalls** per student relative to the campus baseline ($70.0$):
$$\Delta_i = (I_i - \text{Baseline}_i) \times w_i$$
This surfaces the exact positive booster points (e.g., $+16.2$ from CGPA) and negative penalty drags (e.g., $-12.0$ from Attendance Breach), providing complete transparency to faculty and administrators.
