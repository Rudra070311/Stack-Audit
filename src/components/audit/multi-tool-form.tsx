"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import type { ToolConfig, ToolName, UseCase } from "@/types/audit";
import { PRICING_CONFIG } from "@/lib/pricing-config";

interface MultiToolFormProps {
  onSubmit: (tools: ToolConfig[], teamSize: number, useCase: UseCase) => void;
  isLoading?: boolean;
}

const TOOLS: ToolName[] = [
  "Cursor",
  "Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic",
  "OpenAI",
  "Gemini",
  "Windsurf",
];

const USE_CASES: UseCase[] = ["coding", "writing", "data", "research", "mixed"];

export function MultiToolForm({ onSubmit, isLoading = false }: MultiToolFormProps) {
  const [tools, setTools] = useState<ToolConfig[]>(() => {
    if (typeof window === "undefined") {
      return [{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }];
    }

    const saved = localStorage.getItem("stackaudit_form_state");
    if (!saved) {
      return [{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }];
    }

    try {
      const parsed = JSON.parse(saved) as { tools?: ToolConfig[] };
      return parsed.tools && parsed.tools.length > 0
        ? parsed.tools
        : [{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }];
    } catch (error) {
      console.error("Failed to load saved form state:", error);
      return [{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }];
    }
  });

  const [teamSize, setTeamSize] = useState(() => {
    if (typeof window === "undefined") {
      return 5;
    }

    const saved = localStorage.getItem("stackaudit_form_state");
    if (!saved) {
      return 5;
    }

    try {
      const parsed = JSON.parse(saved) as { teamSize?: number };
      return parsed.teamSize || 5;
    } catch {
      return 5;
    }
  });

  const [useCase, setUseCase] = useState<UseCase>(() => {
    if (typeof window === "undefined") {
      return "mixed";
    }

    const saved = localStorage.getItem("stackaudit_form_state");
    if (!saved) {
      return "mixed";
    }

    try {
      const parsed = JSON.parse(saved) as { useCase?: UseCase };
      return parsed.useCase || "mixed";
    } catch {
      return "mixed";
    }
  });

  // Save form state to localStorage whenever it changes
  const saveFormState = useCallback(() => {
    const formState = { tools, teamSize, useCase };
    localStorage.setItem("stackaudit_form_state", JSON.stringify(formState));
  }, [tools, teamSize, useCase]);

  useEffect(() => {
    // Auto-save every 5 seconds
    const interval = setInterval(() => {
      saveFormState();
    }, 5000);
    return () => clearInterval(interval);
  }, [saveFormState]);

  const addTool = () => {
    const newTool: ToolConfig = {
      name: "Claude",
      plan: "Pro",
      monthlySpend: 20,
      seats: 1,
    };
    setTools((currentTools) => [...currentTools, newTool]);
  };

  const removeTool = (index: number) => {
    setTools((currentTools) => currentTools.filter((_, i) => i !== index));
  };

  const updateTool = <K extends keyof ToolConfig>(
    index: number,
    field: K,
    value: ToolConfig[K]
  ) => {
    setTools((currentTools) => {
      const updated = [...currentTools];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveFormState();
    onSubmit(tools, teamSize, useCase);
  };

  const totalSpend = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
  const costPerDev = teamSize > 0 ? totalSpend / teamSize : 0;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      {/* Team Info Section */}
      <div className="space-y-6 rounded-[2rem] border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-8">
        <h3 className="text-center text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Team & Use Case
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Team Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300 sm:text-[0.95rem]">
              Team Size
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
            />
            <p className="text-sm text-zinc-400">Number of team members</p>
          </div>

          {/* Use Case */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300 sm:text-[0.95rem]">
              Primary Use Case
            </label>
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value as UseCase)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
            >
              {USE_CASES.map((uc) => (
                <option key={uc} value={uc}>
                  {uc.charAt(0).toUpperCase() + uc.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="grid gap-4 rounded-2xl bg-zinc-800/40 px-5 py-5 text-center sm:grid-cols-2 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Total Monthly Spend</p>
            <p className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl">
              ${totalSpend.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Per Developer/Month</p>
            <p className="text-3xl font-bold tracking-tight text-blue-400 sm:text-4xl">
              ${costPerDev.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            AI Tools & Spend
          </h3>
          <button
            type="button"
            onClick={addTool}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 sm:px-5 sm:py-3 sm:text-base"
          >
            <Plus size={16} />
            Add Tool
          </button>
        </div>

        {tools.map((tool, index) => (
          <ToolRow
            key={index}
            tool={tool}
            onUpdate={(field, value) => updateTool(index, field, value)}
            onRemove={() => removeTool(index)}
            canRemove={tools.length > 1}
          />
        ))}
      </div>

      {/* Save & Submit Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveFormState}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3.5 font-medium text-zinc-300 transition-all hover:border-cyan-500/50 hover:text-cyan-300"
        >
          <Save size={18} />
          Save Form
        </button>

        <button
          type="submit"
          disabled={isLoading || tools.length === 0}
          className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-medium text-white transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Auditing..." : "Run Audit"}
        </button>
      </div>

    </form>
  );
}

interface ToolRowProps {
  tool: ToolConfig;
  onUpdate: <K extends keyof ToolConfig>(field: K, value: ToolConfig[K]) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function ToolRow({ tool, onUpdate, onRemove, canRemove }: ToolRowProps) {
  const toolConfig = PRICING_CONFIG[tool.name];
  const plans = toolConfig ? Object.keys(toolConfig.plans) : [];

  return (
    <div className="rounded-[1.75rem] border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-4">
        {/* Tool Selector */}
        <div className="space-y-1">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Tool</label>
          <select
            value={tool.name}
            onChange={(e) => {
              const newTool = e.target.value as ToolName;
              onUpdate("name", newTool);
              // Reset plan to default when tool changes
              const newConfig = PRICING_CONFIG[newTool];
              if (newConfig) {
                onUpdate("plan", newConfig.defaultPlan);
              }
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
          >
            {TOOLS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Selector */}
        <div className="space-y-1">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Plan</label>
          <select
            value={tool.plan}
            onChange={(e) => onUpdate("plan", e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
          >
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly Spend */}
        <div className="space-y-1">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
            Monthly Spend ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={tool.monthlySpend}
            onChange={(e) => onUpdate("monthlySpend", Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Number of Seats */}
        <div className="space-y-1">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
            Number of Seats
          </label>
          <input
            type="number"
            min={1}
            value={tool.seats}
            onChange={(e) => onUpdate("seats", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-base text-white transition-colors focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Remove Button */}
        <div className="flex items-end justify-start md:justify-end">
          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="rounded-xl border border-red-500/30 bg-red-950/20 px-3 py-3 text-red-400 transition-all hover:border-red-500 hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
            title={canRemove ? "Remove tool" : "Must keep at least one tool"}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
