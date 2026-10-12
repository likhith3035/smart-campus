"use client";

import { useState } from "react";
import { initialStudents } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { ScatterQuadrants } from "@/components/charts/ScatterQuadrants";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { 
  Layers, 
  Sparkles, 
  BookOpen, 
  Code, 
  Award, 
  AlertOctagon, 
  Target
} from "lucide-react";

export default function SegmentationPage() {
  const [students] = useState<StudentProfile[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeSegmentFilter, setActiveSegmentFilter] = useState<string>("all");

  const archetypes = [
    {
      name: "The Scholar",
      tagline: "High Academics, Low Placement & Coding Readiness",
      icon: BookOpen,
      color: "#3B82F6",
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      count: students.filter((s) => s.segment.name === "The Scholar").length,
      traits: "High CGPA (8.2-9.6), >85% attendance, top LMS marks, but low LeetCode/coding test scores (<45) and timid mock interviews.",
      strategy: "Mandatory placement bootcamps in Data Structures & Algorithms, mock interview clinics, and resume review sessions.",
    },
    {
      name: "Practical Builder",
      tagline: "Exceptional Coding & Projects, Fragile Academic Base",
      icon: Code,
      color: "#10B981",
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      count: students.filter((s) => s.segment.name === "Practical Builder").length,
      traits: "Top coding scores (80-98), hackathon achievements, verified certs, but low CGPA (<6.8) and risk of exam debarment.",
      strategy: "Targeted academic remedial tutoring to clear backlogs and preserve minimum company recruitment cutoffs (e.g. 6.5 CGPA).",
    },
    {
      name: "Consistent All-Rounder",
      tagline: "High Academics, Strong Placement Readiness, Active Leader",
      icon: Award,
      color: "#8B5CF6",
      border: "border-purple-200",
      bg: "bg-purple-50/70",
      count: students.filter((s) => s.segment.name === "Consistent All-Rounder").length,
      traits: "High CGPA (>8.5), top coding score (>80), active in technical clubs, zero backlogs, high faculty praise.",
      strategy: "Nominate for Tier-1 Super Dream recruiter drives, executive leadership roles, and undergraduate research fellowships.",
    },
    {
      name: "Critical Multi-Risk",
      tagline: "Low Academic Foundation, Attendance Breach & Placement Deficit",
      icon: AlertOctagon,
      color: "#EF4444",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      count: students.filter((s) => s.segment.name === "Critical Multi-Risk").length,
      traits: "Compound deficits: Attendance < 75%, 1-3 active backlogs, low LMS login frequency, bottom quartile placement score.",
      strategy: "Immediate Dean/HOD intervention, 1-on-1 Faculty Mentor assignment, parental alert, and structured attendance recovery plan.",
    },
  ];

  const filteredStudents =
    activeSegmentFilter === "all"
      ? students
      : students.filter((s) => s.segment.name === activeSegmentFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold">
          [ KPMG BONUS CREDIT: AI SEGMENTATION ]
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
          Unsupervised Clustering & Student Archetype Matrix
        </h1>
        <p className="text-xs text-[#57534E] max-w-3xl">
          Segment students using K-Means clustering across academic, coding, attendance, and skill dimensions to dispatch targeted cohort interventions.
        </p>
      </div>

      {/* 4-Quadrant Scatter Plot */}
      <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#111827]">4-Quadrant Student Segmentation Matrix</h2>
            <p className="text-xs text-[#78716C]">
              Y-Axis: Academic CGPA (0-10) vs X-Axis: Placement Readiness (0-100). Click any node to inspect profile.
            </p>
          </div>
          <button
            onClick={() => setActiveSegmentFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSegmentFilter === "all"
                ? "bg-[#111827] text-white"
                : "bg-white text-stone-700 border border-[#E5E0D8] hover:bg-stone-50"
            }`}
          >
            Show All ({students.length})
          </button>
        </div>

        <ScatterQuadrants
          students={filteredStudents}
          onSelectStudent={(s) => setSelectedStudent(s)}
        />
      </div>

      {/* Archetype Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {archetypes.map((arch) => {
          const Icon = arch.icon;
          const isSelected = activeSegmentFilter === arch.name;
          return (
            <div
              key={arch.name}
              onClick={() => setActiveSegmentFilter(isSelected ? "all" : arch.name)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `ring-2 ring-stone-900 bg-white shadow-md border-stone-900`
                  : `bg-white border-[#EAE5DC] hover:border-stone-400 card-shadow`
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${arch.color}15`,
                      color: arch.color,
                      borderColor: `${arch.color}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#E5E0D8] font-bold">
                    {arch.count} ({((arch.count / students.length) * 100).toFixed(0)}%)
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{arch.name}</h3>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: arch.color }}>
                    {arch.tagline}
                  </p>
                </div>

                <div className="text-xs text-[#57534E]">
                  <p className="text-[11px] text-[#57534E]">
                    <strong className="text-stone-900">Profile:</strong> {arch.traits}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="text-[11px] text-[#57534E] bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE5DC]">
                  <div className="font-bold text-[#111827] flex items-center gap-1 mb-1">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>Targeted Intervention:</span>
                  </div>
                  <span>{arch.strategy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cohort Student Table */}
      <div className="p-7 rounded-3xl bg-white border border-[#EAE5DC] card-shadow space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">
            Students in Segment:{" "}
            <span className="text-blue-600 font-bold">{activeSegmentFilter === "all" ? "All Cohorts" : activeSegmentFilter}</span>
          </h2>
          <p className="text-xs text-[#78716C]">
            Showing {filteredStudents.length} students classified into this strategic persona
          </p>
        </div>

        <StudentTable
          students={filteredStudents}
          onSelectStudent={(s) => setSelectedStudent(s)}
        />
      </div>

      {/* Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
