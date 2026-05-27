"use client";

import { useState } from "react";

import { SpendInput } from "./spend-input";
import { ToolSelector } from "./tool-selector";
import type { ToolName } from "@/types/audit";

export function AuditForm() {
  const [tool, setTool] = useState<ToolName>("Cursor");
  const [monthlySpend, setMonthlySpend] = useState(50);

  return (
    <div className="rounded-[2rem] border border-zinc-800/70 bg-gradient-to-br from-zinc-900/80 to-zinc-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Audit your AI stack
        </h2>

        <p className="max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
          Analyze your tooling spend in under 60 seconds.
        </p>
      </div>

      <div className="space-y-5">
        <ToolSelector
          value={tool}
          onChange={setTool}
        />

        <SpendInput
          value={monthlySpend}
          onChange={setMonthlySpend}
        />

        <button
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 font-medium text-white transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/25"
        >
          Generate Audit
        </button>
      </div>
    </div>
  );
}