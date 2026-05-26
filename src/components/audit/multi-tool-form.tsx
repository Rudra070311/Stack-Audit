"use client";

import { useState, useEffect } from "react";
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
  const [tools, setTools] = useState<ToolConfig[]>([
    { name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 },
  ]);

  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState<UseCase>("mixed");
  const [showSaved, setShowSaved] = useState(false);

  // Load persisted form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("stackaudit_form_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tools && parsed.tools.length > 0) {
          setTools(parsed.tools);
          setTeamSize(parsed.teamSize || 5);
          setUseCase(parsed.useCase || "mixed");
        }
      } catch (error) {
        console.error("Failed to load saved form state:", error);
      }
    }
  }, []);

  // Save form state to localStorage whenever it changes
  const saveFormState = () => {
    const formState = { tools, teamSize, useCase };
    localStorage.setItem("stackaudit_form_state", JSON.stringify(formState));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  useEffect(() => {
    // Auto-save every 5 seconds
    const interval = setInterval(saveFormState, 5000);
    return () => clearInterval(interval);
  }, [tools, teamSize, useCase]);

  const addTool = () => {
    const newTool: ToolConfig = {
      name: "Claude",
      plan: "Pro",
      monthlySpend: 20,
      seats: 1,
    };
    setTools([...tools, newTool]);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const updateTool = <K extends keyof ToolConfig>(
    index: number,
    field: K,
    value: ToolConfig[K]
  ) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    setTools(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveFormState();
    onSubmit(tools, teamSize, useCase);
  };

  const totalSpend = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
  const costPerDev = teamSize > 0 ? totalSpend / teamSize : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Info Section */}
      <div className="space-y-4 rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-6">
        <h3 className="text-lg font-semibold text-white">Team & Use Case</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Team Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Team Size
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
            <p className="text-xs text-zinc-400">Number of team members</p>
          </div>

          {/* Use Case */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Primary Use Case
            </label>
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value as UseCase)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
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
        <div className="flex justify-between rounded-lg bg-zinc-800/40 px-4 py-3">
          <div>
            <p className="text-xs text-zinc-400">Total Monthly Spend</p>
            <p className="text-2xl font-bold text-cyan-400">
              ${totalSpend.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Per Developer/Month</p>
            <p className="text-2xl font-bold text-blue-400">
              ${costPerDev.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">AI Tools & Spend</h3>
          <button
            type="button"
            onClick={addTool}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
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
          className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 font-medium text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
        >
          <Save size={18} />
          Save Form
        </button>

        <button
          type="submit"
          disabled={isLoading || tools.length === 0}
          className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Auditing..." : "Run Audit"}
        </button>
      </div>

      {showSaved && (
        <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          ✓ Form saved to local storage
        </div>
      )}
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
    <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {/* Tool Selector */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-zinc-400">Tool</label>
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
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
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
          <label className="block text-xs font-medium text-zinc-400">Plan</label>
          <select
            value={tool.plan}
            onChange={(e) => onUpdate("plan", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
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
          <label className="block text-xs font-medium text-zinc-400">
            Monthly Spend ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={tool.monthlySpend}
            onChange={(e) => onUpdate("monthlySpend", Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Number of Seats */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-zinc-400">
            Number of Seats
          </label>
          <input
            type="number"
            min={1}
            value={tool.seats}
            onChange={(e) => onUpdate("seats", Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Remove Button */}
        <div className="flex items-end justify-end">
          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="rounded-lg border border-red-500/30 bg-red-950/20 px-3 py-2 text-red-400 hover:border-red-500 hover:bg-red-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title={canRemove ? "Remove tool" : "Must keep at least one tool"}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
