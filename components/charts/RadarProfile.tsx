"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";

interface RadarProfileProps {
  studentMetrics: {
    academic: number;
    attendance: number;
    lms: number;
    placement: number;
    skills: number;
    engagement: number;
    feedback: number;
  };
  benchmarkMetrics?: {
    academic: number;
    attendance: number;
    lms: number;
    placement: number;
    skills: number;
    engagement: number;
    feedback: number;
  };
}

export function RadarProfile({ studentMetrics, benchmarkMetrics }: RadarProfileProps) {
  const benchmark = benchmarkMetrics || {
    academic: 72,
    attendance: 78,
    lms: 70,
    placement: 64,
    skills: 55,
    engagement: 45,
    feedback: 68,
  };

  const data = [
    { subject: "Academic (CGPA)", student: studentMetrics.academic, benchmark: benchmark.academic },
    { subject: "Attendance %", student: studentMetrics.attendance, benchmark: benchmark.attendance },
    { subject: "LMS Coursework", student: studentMetrics.lms, benchmark: benchmark.lms },
    { subject: "Placement & Coding", student: studentMetrics.placement, benchmark: benchmark.placement },
    { subject: "Industry Skills", student: studentMetrics.skills, benchmark: benchmark.skills },
    { subject: "Extracurricular", student: studentMetrics.engagement, benchmark: benchmark.engagement },
    { subject: "Faculty Sentiment", student: studentMetrics.feedback, benchmark: benchmark.feedback },
  ];

  return (
    <div className="w-full h-72 sm:h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="#EAE5DC" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" stroke="#78716C" tick={{ fill: "#57534E", fontSize: 10, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#D6D3D1" tick={{ fill: "#A8A29E", fontSize: 9 }} />
          <Radar
            name="This Student"
            dataKey="student"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Radar
            name="Campus Benchmark"
            dataKey="benchmark"
            stroke="#A8A29E"
            fill="#D6D3D1"
            fillOpacity={0.2}
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E0D8",
              borderRadius: "0.75rem",
              color: "#111827",
              fontSize: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)",
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px", fontSize: "12px", color: "#57534E" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
