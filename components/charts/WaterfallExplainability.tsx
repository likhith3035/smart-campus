"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell } from "recharts";
import { ExplainabilityDriver } from "@/lib/types";
import { TrendingUp, TrendingDown, HelpCircle } from "lucide-react";

interface WaterfallExplainabilityProps {
  drivers: ExplainabilityDriver[];
  score: number;
}

export function WaterfallExplainability({ drivers, score }: WaterfallExplainabilityProps) {
  const chartData = drivers.map((d) => ({
    factor: d.factor,
    contribution: d.contribution,
    value: d.value,
    isPositive: d.contribution >= 0,
  }));

  const positiveTotal = drivers
    .filter((d) => d.contribution > 0)
    .reduce((sum, d) => sum + d.contribution, 0);

  const negativeTotal = drivers
    .filter((d) => d.contribution < 0)
    .reduce((sum, d) => sum + d.contribution, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-xs">
        <div className="flex items-center gap-1.5 text-[#57534E]">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Explainability Baseline: 70.0 (Average Campus Standard)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-700 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> Boost: +{positiveTotal.toFixed(1)} pts
          </span>
          <span className="flex items-center gap-1 text-rose-600 font-mono font-bold">
            <TrendingDown className="w-3.5 h-3.5" /> Drag: {negativeTotal.toFixed(1)} pts
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 30, left: 140, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE5DC" horizontal={false} />
            <XAxis
              type="number"
              domain={[-25, 25]}
              stroke="#78716C"
              tick={{ fill: "#78716C", fontSize: 11 }}
              label={{ value: "Points Impact on Success Score", position: "insideBottom", offset: -5, fill: "#57534E", fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              type="category"
              dataKey="factor"
              stroke="#78716C"
              tick={{ fill: "#111827", fontSize: 11, fontWeight: 500 }}
              width={130}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-[#E5E0D8] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-[#111827]">
                      <div className="font-bold text-[#111827]">{data.factor}</div>
                      <div className="text-stone-600">Observed Value: <span className="font-mono text-blue-600 font-bold">{data.value}</span></div>
                      <div className="text-stone-600">
                        Impact:{" "}
                        <span className={`font-mono font-bold ${data.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                          {data.contribution > 0 ? `+${data.contribution}` : data.contribution} pts
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#A8A29E" strokeWidth={1.5} />
            <Bar dataKey="contribution" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isPositive ? "#10B981" : "#EF4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-[#57534E] space-y-1 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EAE5DC]">
        <span className="font-bold text-[#111827]">AI Diagnostic Summary:</span>{" "}
        {negativeTotal < -15
          ? `Primary score degradation is heavily driven by critical penalties in ${drivers.filter(d => d.contribution < -5).map(d => d.factor).join(" & ")}. Immediate intervention is needed to reverse downward trajectory.`
          : positiveTotal > 15
          ? `Strong performance anchor in ${drivers.filter(d => d.contribution > 5).map(d => d.factor).join(" & ")} offsets smaller deficiencies, sustaining an above-average standing.`
          : `Balanced performance metrics with minor deviations from benchmark standards.`}
      </div>
    </div>
  );
}
