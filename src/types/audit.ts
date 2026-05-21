export type ToolName = "Cursor" | "Copilot" | "Claude" | "ChatGPT" | "Anthropic" | "OpenAI" | "Gemini" | "WindSurf";

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export interface ToolEntry {
  id: string;
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormValues {
  tools: ToolEntry[];
  teamSize: number;
  primaryUseCase: UseCase;
}