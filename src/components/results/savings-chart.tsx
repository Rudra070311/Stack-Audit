"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SavingsChartProps {
  currentSpend: number;

  optimizedSpend: number;
}

export function SavingsChart({
  currentSpend,

  optimizedSpend,
}: SavingsChartProps) {
  const data = [
    {
      name: "Current",

      value: currentSpend,
    },

    {
      name: "Optimized",

      value: optimizedSpend,
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900 p-6
      "
    >
      <h3
        className="
          mb-6 text-lg
          font-semibold text-white
        "
      >
        Spend Comparison
      </h3>

      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}