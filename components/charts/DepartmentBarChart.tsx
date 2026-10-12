"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { StudentProfile } from "@/lib/types";

interface DepartmentBarChartProps {
  students: StudentProfile[];
}

export function DepartmentBarChart({ students }: DepartmentBarChartProps) {
  const deptMap: { [key: string]: { total: number; sumScore: number; highRisk: number; placementRisk: number } } = {};

  students.forEach((s) => {
    if (!deptMap[s.department]) {
      deptMap[s.department] = { total: 0, sumScore: 0, highRisk: 0, placementRisk: 0 };
    }
    deptMap[s.department].total++;
    deptMap[s.department].sumScore += s.success_score;
    if (s.overall_tier === "High Risk") deptMap[s.department].highRisk++;
    if (s.risk_flags.placement.status === "HIGH") deptMap[s.department].placementRisk++;
  });

  const data = Object.keys(deptMap).map((dept) => {
    const d = deptMap[dept];
    // Shorten department name for chart display
    const shortName = dept
      .replace("Computer Science & Engineering", "CSE")
      .replace("Information Technology", "IT")
      .replace("Electronics & Communication", "ECE")
      .replace("Data Science & AI", "AI & DS")
      .replace("Mechanical Engineering", "MECH");

    return {
      name: shortName,
      fullName: dept,
      avgScore: Math.round((d.sumScore / d.total) * 10) / 10,
      highRiskCount: d.highRisk,
      placementRiskCount: d.placementRisk,
      totalStudents: d.total,
    };
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94A3B8" 
            tick={{ fill: "#94A3B8", fontSize: 11 }} 
          />
          <YAxis 
            stroke="#94A3B8" 
            tick={{ fill: "#94A3B8", fontSize: 11 }} 
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-xs shadow-xl space-y-1">
                    <div className="font-bold text-white">{item.fullName}</div>
                    <div className="text-slate-300">Avg Success Score: <span className="font-mono text-blue-400 font-bold">{item.avgScore}</span></div>
                    <div className="text-slate-300">High Risk Students: <span className="font-mono text-red-400 font-bold">{item.highRiskCount}</span> / {item.totalStudents}</div>
                    <div className="text-slate-300">Placement Deficit: <span className="font-mono text-amber-400 font-bold">{item.placementRiskCount}</span></div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
          <Bar dataKey="avgScore" name="Avg Success Score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="highRiskCount" name="High Risk Count" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
