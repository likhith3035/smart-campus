"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { StudentProfile } from "@/lib/types";

interface DistributionChartProps {
  students: StudentProfile[];
}

export function DistributionChart({ students }: DistributionChartProps) {
  const buckets = [
    { range: "< 50 (High Risk)", min: 0, max: 50, color: "#EF4444", count: 0 },
    { range: "50 - 60", min: 50, max: 60, color: "#F59E0B", count: 0 },
    { range: "60 - 70", min: 60, max: 70, color: "#EAB308", count: 0 },
    { range: "70 - 80", min: 70, max: 80, color: "#3B82F6", count: 0 },
    { range: "80 - 90", min: 80, max: 90, color: "#10B981", count: 0 },
    { range: "90 - 100", min: 90, max: 101, color: "#8B5CF6", count: 0 },
  ];

  students.forEach((s) => {
    for (const b of buckets) {
      if (s.success_score >= b.min && s.success_score < b.max) {
        b.count++;
        break;
      }
    }
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={buckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis 
            dataKey="range" 
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
                const data = payload[0].payload;
                const pct = ((data.count / students.length) * 100).toFixed(1);
                return (
                  <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-xs shadow-xl space-y-1">
                    <div className="font-bold text-white">Score Range: {data.range}</div>
                    <div className="text-slate-300">
                      Students: <span className="font-mono text-blue-400 font-bold">{data.count}</span> ({pct}%)
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {buckets.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
