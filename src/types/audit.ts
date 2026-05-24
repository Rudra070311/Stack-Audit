export type ToolName =
  | "Cursor"
  | "Claude"
  | "ChatGPT"
  | "OpenAI"
  | "Copilot"
  | "Anthropic"
  | "Gemini"
  | "Windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export interface AuditFormData {
  tool: ToolName;
  monthlySpend: number;
  teamSize: number;
  useCase: UseCase;
}

export interface AuditResult {
  tool: string;
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  recommendation: string;
  reasoning: string;
  useCase: string;
  teamSize: number;
}