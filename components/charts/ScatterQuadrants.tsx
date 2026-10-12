"use client";

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from "recharts";
import { StudentProfile } from "@/lib/types";

interface ScatterQuadrantsProps {
  students: StudentProfile[];
  onSelectStudent?: (student: StudentProfile) => void;
}

export function ScatterQuadrants({ students, onSelectStudent }: ScatterQuadrantsProps) {
  const data = students.map((s) => ({
    x: s.coding_score,
    y: s.cgpa,
    z: s.success_score,
    name: s.name,
    id: s.student_id,
    segment: s.segment.name,
    color: s.segment.color,
    risk: s.overall_tier,
    raw: s,
  }));

  return (
    <div className="w-full h-[460px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAE5DC" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Placement & Coding" 
            domain={[10, 100]} 
            stroke="#78716C"
            tick={{ fill: "#78716C", fontSize: 11 }}
            label={{ value: "Placement & Coding Readiness (0-100)", position: "insideBottom", offset: -10, fill: "#57534E", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Academic CGPA" 
            domain={[4.0, 10.0]} 
            stroke="#78716C"
            tick={{ fill: "#78716C", fontSize: 11 }}
            label={{ value: "Academic CGPA (0-10)", angle: -90, position: "insideLeft", fill: "#57534E", fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: "3 3" }} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white border border-[#E5E0D8] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-[#111827]">
                    <div className="font-bold text-[#111827] flex items-center justify-between gap-4">
                      <span>{item.name}</span>
                      <span className="font-mono text-stone-400">{item.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-stone-700 font-semibold">{item.segment}</span>
                    </div>
                    <div className="text-stone-500 pt-1 border-t border-stone-100 grid grid-cols-2 gap-2">
                      <div>CGPA: <span className="font-mono text-stone-900 font-bold">{item.y}</span></div>
                      <div>Coding: <span className="font-mono text-stone-900 font-bold">{item.x}</span></div>
                      <div>Success: <span className="font-mono text-stone-900 font-bold">{item.z}</span></div>
                      <div>Status: <span className="font-mono font-bold" style={{ color: item.risk === "High Risk" ? "#EF4444" : item.risk === "Moderate Risk" ? "#F59E0B" : "#10B981" }}>{item.risk}</span></div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Quadrant Benchmark Dividers */}
          <ReferenceLine x={60} stroke="#A8A29E" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "Placement Cutoff (60)", fill: "#78716C", fontSize: 10, position: "top" }} />
          <ReferenceLine y={7.0} stroke="#A8A29E" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "Academic Target (7.0)", fill: "#78716C", fontSize: 10, position: "right" }} />
          
          <Scatter 
            name="Students" 
            data={data} 
            onClick={(node) => {
              if (onSelectStudent && node && node.raw) {
                onSelectStudent(node.raw);
              }
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} className="cursor-pointer hover:opacity-100 transition-opacity" />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Quadrant Labels Overlay */}
      <div className="absolute top-5 left-16 text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50/90 px-2.5 py-1 rounded-full border border-blue-200 pointer-events-none">
        The Scholars (High CGPA, Low Coding)
      </div>
      <div className="absolute top-5 right-8 text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50/90 px-2.5 py-1 rounded-full border border-purple-200 pointer-events-none">
        Consistent Leaders (High CGPA & High Coding)
      </div>
      <div className="absolute bottom-12 left-16 text-[10px] uppercase font-bold tracking-wider text-red-700 bg-red-50/90 px-2.5 py-1 rounded-full border border-red-200 pointer-events-none">
        Critical Multi-Risk (Low CGPA & Low Coding)
      </div>
      <div className="absolute bottom-12 right-8 text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-200 pointer-events-none">
        Practical Builders (Low CGPA, High Coding)
      </div>
    </div>
  );
}
