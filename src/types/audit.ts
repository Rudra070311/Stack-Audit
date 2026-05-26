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

export type CursorPlan = "Hobby" | "Pro" | "Business" | "Enterprise";
export type CopilotPlan = "Individual" | "Business" | "Enterprise";
export type ClaudePlan = "Free" | "Pro" | "Max" | "Team" | "Enterprise" | "API";
export type ChatGPTPlan = "Free" | "Plus" | "Team" | "Enterprise" | "API";
export type AnthropicPlan = "Free" | "Pro" | "Team" | "Enterprise" | "API";
export type OpenAIPlan = "Free" | "Pay-as-you-go" | "Plus" | "Team" | "Enterprise";
export type GeminiPlan = "Free" | "Pro" | "Ultra" | "API";
export type WindsurfPlan = "Free" | "Pro" | "Team" | "Enterprise";

export interface ToolConfig {
  name: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
  icon?: string;
}

export interface AuditFormData {
  tools: ToolConfig[];
  teamSize: number;
  useCase: UseCase;
  companyName?: string;
}

export interface PerToolAudit {
  tool: ToolName;
  plan: string;
  currentSpend: number;
  currentPlan: string;
  optimizedPlan: string;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  recommendation: string;
  reasoning: string;
  alternatives?: {
    tool: ToolName;
    plan: string;
    monthlySpend: number;
    reason: string;
  }[];
}

export interface AuditResult {
  auditId: string;
  timestamp: string;
  tools: PerToolAudit[];
  teamSize: number;
  useCase: UseCase;
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsPercentage: number;
  summary?: string;
}