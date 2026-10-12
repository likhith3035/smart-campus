import json
import random
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Set deterministic seed for reproducibility
random.seed(42)
np.random.seed(42)

DEPARTMENTS = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Data Science & AI",
    "Mechanical Engineering"
]

FIRST_NAMES = [
    "Aarav", "Aditi", "Rohan", "Ananya", "Vikram", "Pooja", "Rahul", "Sneha",
    "Kavya", "Siddharth", "Neha", "Arjun", "Divya", "Ishaan", "Meera", "Varun",
    "Rhea", "Manish", "Tanvi", "Karan", "Priyanka", "Naveen", "Shreya", "Aditya",
    "Deepika", "Harsh", "Simran", "Gaurav", "Swati", "Nikhil", "Akanksha", "Sameer",
    "Rishabh", "Preeti", "Suresh", "Komal", "Amit", "Bhavna", "Mohit", "Zoya",
    "Tariq", "Fatima", "Ayush", "Sonal", "Pranav", "Lavanya", "Tarun", "Aarti"
]

LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Reddy", "Iyer", "Nair", "Gupta", "Malhotra",
    "Chopra", "Deshmukh", "Joshi", "Kulkarni", "Mehta", "Bhat", "Rao", "Saxena",
    "Singhania", "Mukherjee", "Banerjee", "Chatterjee", "Aggarwal", "Chawla", "Kapoor",
    "Mishra", "Trivedi", "Sengupta", "Pillai", "Nambiar", "Pandey", "Choudhury"
]

def generate_student(student_id_num):
    student_id = f"STU-2024-{student_id_num:04d}"
    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)
    name = f"{first_name} {last_name}"
    department = random.choice(DEPARTMENTS)
    semester = random.choice([4, 6, 8]) # Placement-critical semesters
    
    # Archetype distribution
    # 0: Scholar (High Acad, Low Placement)
    # 1: Builder (Low Acad, High Placement)
    # 2: Leader (High All-Rounder)
    # 3: At-Risk (Low All-Round)
    # 4: General/Average
    archetype_roll = random.random()
    
    if archetype_roll < 0.20:
        # Scholar: High Theory, Low Placement/Coding
        cgpa = round(random.uniform(8.1, 9.6), 2)
        active_backlogs = 0
        attendance_pct = round(random.uniform(84.0, 96.0), 1)
        lms_logins_per_week = random.randint(8, 16)
        assignment_completion_pct = round(random.uniform(88.0, 99.0), 1)
        coding_score = round(random.uniform(22.0, 48.0), 1)
        aptitude_score = round(random.uniform(55.0, 75.0), 1)
        mock_interview_rating = round(random.uniform(2.0, 3.2), 1)
        certifications_count = random.choice([0, 1])
        hackathons_participated = 0
        faculty_sentiment = round(random.uniform(0.70, 0.95), 2)
        archetype_hint = "The Scholar"

    elif archetype_roll < 0.40:
        # Practical Builder: Lower CGPA, Stellar Coding/Projects
        cgpa = round(random.uniform(5.9, 6.8), 2)
        active_backlogs = random.choice([0, 1])
        attendance_pct = round(random.uniform(72.0, 80.0), 1)
        lms_logins_per_week = random.randint(4, 9)
        assignment_completion_pct = round(random.uniform(65.0, 80.0), 1)
        coding_score = round(random.uniform(82.0, 98.0), 1)
        aptitude_score = round(random.uniform(70.0, 92.0), 1)
        mock_interview_rating = round(random.uniform(3.8, 4.9), 1)
        certifications_count = random.randint(2, 5)
        hackathons_participated = random.randint(2, 6)
        faculty_sentiment = round(random.uniform(0.50, 0.75), 2)
        archetype_hint = "Practical Builder"

    elif archetype_roll < 0.60:
        # Consistent Leader: High Academics, High Placement
        cgpa = round(random.uniform(8.4, 9.8), 2)
        active_backlogs = 0
        attendance_pct = round(random.uniform(86.0, 98.0), 1)
        lms_logins_per_week = random.randint(10, 20)
        assignment_completion_pct = round(random.uniform(90.0, 100.0), 1)
        coding_score = round(random.uniform(78.0, 96.0), 1)
        aptitude_score = round(random.uniform(80.0, 96.0), 1)
        mock_interview_rating = round(random.uniform(4.0, 5.0), 1)
        certifications_count = random.randint(2, 4)
        hackathons_participated = random.randint(1, 4)
        faculty_sentiment = round(random.uniform(0.85, 0.99), 2)
        archetype_hint = "Consistent All-Rounder"

    elif archetype_roll < 0.80:
        # Multi-Risk: Low academics, low attendance, low placement
        cgpa = round(random.uniform(4.5, 6.2), 2)
        active_backlogs = random.choice([1, 2, 3])
        attendance_pct = round(random.uniform(52.0, 73.5), 1) # Below 75%
        lms_logins_per_week = random.randint(1, 5)
        assignment_completion_pct = round(random.uniform(35.0, 62.0), 1)
        coding_score = round(random.uniform(15.0, 42.0), 1)
        aptitude_score = round(random.uniform(25.0, 50.0), 1)
        mock_interview_rating = round(random.uniform(1.2, 2.7), 1)
        certifications_count = 0
        hackathons_participated = 0
        faculty_sentiment = round(random.uniform(0.20, 0.48), 2)
        archetype_hint = "Critical Multi-Risk"

    else:
        # Moderate / Steady Cohort
        cgpa = round(random.uniform(6.8, 7.9), 2)
        active_backlogs = random.choice([0, 0, 1])
        attendance_pct = round(random.uniform(75.5, 87.0), 1)
        lms_logins_per_week = random.randint(5, 11)
        assignment_completion_pct = round(random.uniform(70.0, 85.0), 1)
        coding_score = round(random.uniform(50.0, 72.0), 1)
        aptitude_score = round(random.uniform(55.0, 74.0), 1)
        mock_interview_rating = round(random.uniform(2.8, 3.8), 1)
        certifications_count = random.choice([1, 2])
        hackathons_participated = random.choice([0, 1])
        faculty_sentiment = round(random.uniform(0.60, 0.80), 2)
        archetype_hint = "Steady Performer"

    sgpa_trend = round(random.uniform(-0.6, 0.8), 2)
    soft_skills_rating = round(mock_interview_rating * 2.0, 1) # Scale 1-10
    clubs_count = 1 if hackathons_participated > 0 else random.choice([0, 1])

    return {
        "student_id": student_id,
        "name": name,
        "department": department,
        "semester": semester,
        "cgpa": cgpa,
        "active_backlogs": active_backlogs,
        "sgpa_trend": sgpa_trend,
        "attendance_pct": attendance_pct,
        "lms_logins_per_week": lms_logins_per_week,
        "assignment_completion_pct": assignment_completion_pct,
        "coding_score": coding_score,
        "aptitude_score": aptitude_score,
        "mock_interview_rating": mock_interview_rating,
        "soft_skills_rating": soft_skills_rating,
        "certifications_count": certifications_count,
        "hackathons_participated": hackathons_participated,
        "clubs_count": clubs_count,
        "faculty_sentiment": faculty_sentiment,
        "archetype_hint": archetype_hint
    }

def compute_success_score(s):
    # Normalized 0-100 components
    c_acad = (s["cgpa"] / 10.0) * 100
    c_attd = min(100.0, (s["attendance_pct"] / 100.0) * 100)
    c_lms = (s["assignment_completion_pct"] * 0.7) + (min(20, s["lms_logins_per_week"]) / 20.0 * 30)
    c_place = (s["coding_score"] * 0.45) + (s["aptitude_score"] * 0.35) + ((s["mock_interview_rating"] / 5.0) * 100 * 0.20)
    c_skills = min(100.0, (s["certifications_count"] * 25.0) + (s["soft_skills_rating"] * 5.0))
    c_eng = min(100.0, (s["hackathons_participated"] * 30.0) + (s["clubs_count"] * 20.0) + 20.0)
    c_feed = s["faculty_sentiment"] * 100.0

    raw_weighted = (
        0.30 * c_acad +
        0.20 * c_place +
        0.15 * c_attd +
        0.15 * c_lms +
        0.10 * c_skills +
        0.05 * c_eng +
        0.05 * c_feed
    )

    # Non-linear statutory penalties
    attd_penalty = 1.0
    if s["attendance_pct"] < 75.0:
        attd_penalty = max(0.68, s["attendance_pct"] / 75.0)

    backlog_penalty = max(0.60, 1.0 - (s["active_backlogs"] * 0.12))

    score = round(raw_weighted * attd_penalty * backlog_penalty, 1)
    score = max(5.0, min(99.5, score))

    # Risk Triggers
    acad_triggers = []
    if s["cgpa"] < 6.5:
        acad_triggers.append(f"CGPA below 6.5 ({s['cgpa']})")
    if s["active_backlogs"] > 0:
        acad_triggers.append(f"Active backlogs ({s['active_backlogs']})")
    if s["attendance_pct"] < 75.0:
        acad_triggers.append(f"Attendance below 75% statutory limit ({s['attendance_pct']}%)")
    if s["assignment_completion_pct"] < 60.0:
        acad_triggers.append(f"Low LMS assignment completion ({s['assignment_completion_pct']}%)")

    place_triggers = []
    if s["coding_score"] < 45.0:
        place_triggers.append(f"Coding test score below 45 ({s['coding_score']})")
    if s["aptitude_score"] < 50.0:
        place_triggers.append(f"Aptitude test score below 50 ({s['aptitude_score']})")
    if s["mock_interview_rating"] < 3.0:
        place_triggers.append(f"Mock interview rating below 3.0/5.0 ({s['mock_interview_rating']})")
    if s["certifications_count"] == 0:
        place_triggers.append("Zero industry certifications verified")

    disengage_triggers = []
    if s["lms_logins_per_week"] < 3:
        disengage_triggers.append("LMS activity severely low (< 3 logins/wk)")
    if s["faculty_sentiment"] < 0.45:
        disengage_triggers.append("Negative faculty feedback sentiment")

    # Risk classifications
    acad_risk = "HIGH" if (s["attendance_pct"] < 75.0 or s["active_backlogs"] >= 2 or s["cgpa"] < 6.0) else ("MEDIUM" if len(acad_triggers) > 0 else "LOW")
    place_risk = "HIGH" if (s["coding_score"] < 40.0 or s["aptitude_score"] < 45.0 or s["mock_interview_rating"] < 2.5) else ("MEDIUM" if len(place_triggers) > 0 else "LOW")
    disengage_risk = "HIGH" if (len(disengage_triggers) >= 2 or s["attendance_pct"] < 65.0) else ("MEDIUM" if len(disengage_triggers) > 0 else "LOW")

    overall_tier = "High Risk" if (score < 50.0 or acad_risk == "HIGH" or place_risk == "HIGH") else ("Moderate Risk" if score < 72.0 else "Thriving")

    # Explainability Drivers (Waterfall calculation vs batch average)
    drivers = [
        {"factor": "Academic Mastery (CGPA)", "weight": 0.30, "value": f"{s['cgpa']}/10", "contribution": round((c_acad - 70) * 0.30, 1)},
        {"factor": "Placement & Coding Aptitude", "weight": 0.20, "value": f"Code: {s['coding_score']}", "contribution": round((c_place - 65) * 0.20, 1)},
        {"factor": "Class Attendance Presence", "weight": 0.15, "value": f"{s['attendance_pct']}%", "contribution": round((c_attd - 75) * 0.15 if s["attendance_pct"] >= 75 else -((75 - s["attendance_pct"]) * 0.6), 1)},
        {"factor": "LMS Coursework Execution", "weight": 0.15, "value": f"{s['assignment_completion_pct']}%", "contribution": round((c_lms - 70) * 0.15, 1)},
        {"factor": "Backlog Penalty Impact", "weight": 0.10, "value": f"{s['active_backlogs']} Backlog(s)", "contribution": round(- (s["active_backlogs"] * 11.5), 1)},
        {"factor": "Industry Skills & Certifications", "weight": 0.10, "value": f"{s['certifications_count']} certs", "contribution": round((c_skills - 40) * 0.10, 1)}
    ]

    # Prescriptive Interventions
    interventions = []
    if s["attendance_pct"] < 75.0:
        interventions.append({
            "id": f"ACT-{s['student_id']}-1",
            "type": "ATTENDANCE_WARNING",
            "title": "Mandatory Attendance Recovery & Parent Alert",
            "priority": "URGENT",
            "assigned_to": "HOD / Academic Counselor",
            "details": f"Attendance is {s['attendance_pct']}% (below 75% statutory norm). Student is at risk of exam debarment.",
            "status": "Pending"
        })
    if s["coding_score"] < 50.0 or s["mock_interview_rating"] < 3.0:
        interventions.append({
            "id": f"ACT-{s['student_id']}-2",
            "type": "PLACEMENT_BOOTCAMP",
            "title": "Enroll in DSA & Mock Interview Fast-Track",
            "priority": "HIGH",
            "assigned_to": "Training & Placement Cell",
            "details": f"Coding score is {s['coding_score']}/100 and mock interview rating is {s['mock_interview_rating']}/5.0.",
            "status": "Pending"
        })
    if s["active_backlogs"] > 0:
        interventions.append({
            "id": f"ACT-{s['student_id']}-3",
            "type": "REMEDIAL_ACADEMIC",
            "title": "Special Subject Remedial & Peer Tutor Allocation",
            "priority": "HIGH",
            "assigned_to": "Subject Faculty Lead",
            "details": f"Student has {s['active_backlogs']} active backlog(s). Schedule remedial doubt-clearing sessions.",
            "status": "In Progress"
        })
    if s["assignment_completion_pct"] < 65.0:
        interventions.append({
            "id": f"ACT-{s['student_id']}-4",
            "type": "LMS_NUDGE",
            "title": "Automated LMS Re-engagement & Assignment Extension",
            "priority": "MEDIUM",
            "assigned_to": "Course Coordinator",
            "details": f"Only {s['assignment_completion_pct']}% assignments submitted.",
            "status": "Completed"
        })

    return {
        "success_score": score,
        "overall_tier": overall_tier,
        "risk_flags": {
            "academic": {"status": acad_risk, "triggers": acad_triggers},
            "placement": {"status": place_risk, "triggers": place_triggers},
            "disengagement": {"status": disengage_risk, "triggers": disengage_triggers}
        },
        "explainability_drivers": drivers,
        "prescriptive_actions": interventions,
        "radar_metrics": {
            "academic": round(c_acad, 1),
            "attendance": round(c_attd, 1),
            "lms": round(c_lms, 1),
            "placement": round(c_place, 1),
            "skills": round(c_skills, 1),
            "engagement": round(c_eng, 1),
            "feedback": round(c_feed, 1)
        }
    }

def main():
    print("Generating 600 collegiate student records...")
    students = [generate_student(i + 1) for i in range(600)]
    
    # Run K-Means Clustering on features to assign formal cluster IDs
    feature_matrix = []
    for s in students:
        feature_matrix.append([
            s["cgpa"],
            s["attendance_pct"],
            s["coding_score"],
            s["aptitude_score"],
            s["mock_interview_rating"],
            s["assignment_completion_pct"],
            s["certifications_count"]
        ])
    
    X = np.array(feature_matrix)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(X_scaled)
    
    # Map cluster indices to human-friendly segment names based on centroids
    # Identify which cluster has highest CGPA and lowest coding, etc.
    centroids = kmeans.cluster_centers_
    # Inverse transform to understand original scales
    orig_centroids = scaler.inverse_transform(centroids)
    
    cluster_mapping = {}
    for idx, cent in enumerate(orig_centroids):
        c_cgpa, c_attd, c_code, c_apt, c_mock, c_assign, c_cert = cent
        if c_cgpa > 8.0 and c_code < 55.0:
            cluster_mapping[idx] = {
                "name": "The Scholar",
                "tagline": "High Academics, Low Placement/Coding Readiness",
                "color": "#3B82F6", # Blue
                "strategy": "Enroll in DSA bootcamps, mock interview workshops, and coding challenges"
            }
        elif c_cgpa < 7.0 and c_code > 75.0:
            cluster_mapping[idx] = {
                "name": "Practical Builder",
                "tagline": "Exceptional Coding & Projects, Fragile Academic Base",
                "color": "#10B981", # Green
                "strategy": "Provide fast-track academic tutoring to clear backlogs and maintain minimum recruitment CGPA cutoffs"
            }
        elif c_cgpa > 8.0 and c_code > 75.0:
            cluster_mapping[idx] = {
                "name": "Consistent All-Rounder",
                "tagline": "High Academics, Strong Placement Readiness, Active Leader",
                "color": "#8B5CF6", # Purple
                "strategy": "Fast-track for Tier-1 dream company recruitment, peer mentoring leadership roles"
            }
        else:
            cluster_mapping[idx] = {
                "name": "Critical Multi-Risk",
                "tagline": "Low Academic Foundation, Attendance Breach & Placement Deficits",
                "color": "#EF4444", # Red
                "strategy": "Immediate Dean/HOD intervention, 1-on-1 faculty mentor assignment, attendance remediation plan"
            }

    # Ensure all 4 archetype names are unique
    used_names = set()
    for idx in range(4):
        if idx not in cluster_mapping or cluster_mapping[idx]["name"] in used_names:
            fallbacks = ["Consistent All-Rounder", "The Scholar", "Practical Builder", "Critical Multi-Risk"]
            for fb in fallbacks:
                if fb not in used_names:
                    cluster_mapping[idx] = {
                        "name": fb,
                        "tagline": f"Segment archetype {fb}",
                        "color": "#6366F1",
                        "strategy": "Targeted cohort intervention"
                    }
                    used_names.add(fb)
                    break
        else:
            used_names.add(cluster_mapping[idx]["name"])

    # Combine student data with computed scores and cluster info
    full_dataset = []
    csv_rows = []
    for idx, s in enumerate(students):
        c_id = int(clusters[idx])
        c_info = cluster_mapping[c_id]
        computed = compute_success_score(s)
        
        merged = {
            **s,
            **computed,
            "segment": {
                "cluster_id": c_id,
                "name": c_info["name"],
                "tagline": c_info["tagline"],
                "color": c_info["color"],
                "strategy": c_info["strategy"]
            }
        }
        full_dataset.append(merged)
        
        csv_rows.append({
            "student_id": s["student_id"],
            "name": s["name"],
            "department": s["department"],
            "semester": s["semester"],
            "cgpa": s["cgpa"],
            "active_backlogs": s["active_backlogs"],
            "sgpa_trend": s["sgpa_trend"],
            "attendance_pct": s["attendance_pct"],
            "lms_logins_per_week": s["lms_logins_per_week"],
            "assignment_completion_pct": s["assignment_completion_pct"],
            "coding_score": s["coding_score"],
            "aptitude_score": s["aptitude_score"],
            "mock_interview_rating": s["mock_interview_rating"],
            "soft_skills_rating": s["soft_skills_rating"],
            "certifications_count": s["certifications_count"],
            "hackathons_participated": s["hackathons_participated"],
            "clubs_count": s["clubs_count"],
            "faculty_sentiment": s["faculty_sentiment"],
            "success_score": computed["success_score"],
            "overall_tier": computed["overall_tier"],
            "academic_risk": computed["risk_flags"]["academic"]["status"],
            "placement_risk": computed["risk_flags"]["placement"]["status"],
            "segment_name": c_info["name"]
        })

    # Export to JSON
    import os
    os.makedirs("lib/data", exist_ok=True)
    with open("lib/data/students-dataset.json", "w") as f:
        json.dump(full_dataset, f, indent=2)
    print("Wrote lib/data/students-dataset.json successfully.")

    # Export to CSV for upload testing and judges
    df = pd.DataFrame(csv_rows)
    df.to_csv("lib/data/sample_campus_dataset.csv", index=False)
    print("Wrote lib/data/sample_campus_dataset.csv successfully.")

    # Export segmentation summary
    seg_summary = {
        "cluster_info": cluster_mapping,
        "total_students": len(full_dataset),
        "cluster_counts": {
            cluster_mapping[c]["name"]: int(np.sum(clusters == c)) for c in range(4)
        }
    }
    with open("lib/data/segmentation-summary.json", "w") as f:
        json.dump(seg_summary, f, indent=2)
    print("Segmentation Summary:", seg_summary["cluster_counts"])

if __name__ == "__main__":
    main()
