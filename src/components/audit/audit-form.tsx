"use client";

import { useState } from "react";

import { SpendInput } from "./spend-input";
import { ToolSelector } from "./tool-selector";

export function AuditForm() {
  const [tool, setTool] = useState("cursor");
  const [monthlySpend, setMonthlySpend] = useState(50);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Audit your AI stack
        </h2>

        <p className="mt-2 text-zinc-400">
          Analyze your tooling spend in under 60 seconds.
        </p>
      </div>

      <div className="space-y-6">
        <ToolSelector
          value={tool as any}
          onChange={setTool as any}
        />

        <SpendInput
          value={monthlySpend}
          onChange={setMonthlySpend}
        />

        <button
          className="w-full rounded-xl bg-white p-3 font-medium text-black transition hover:opacity-90"
        >
          Generate Audit
        </button>
      </div>
    </div>
  );
}