"use client";

import { ToolName } from "../../types/audit";

interface ToolSelectorProps {
  value: ToolName;
  onChange: (value: ToolName) => void;
}

const tools: ToolName[] = [
  "Cursor",
  "Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic",
  "OpenAI",
  "Gemini",
  "Windsurf",
];

export function ToolSelector({
  value,
  onChange,
}: ToolSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value as ToolName)
      }
      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
    >
      {tools.map((tool) => (
        <option key={tool} value={tool}>
          {tool}
        </option>
      ))}
    </select>
  );
}