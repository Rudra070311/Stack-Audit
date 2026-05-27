export interface AuditInput {
    tool: string;
    monthlySpend: number;
    teamSize: number;
    useCase: string;
    seats?: number;
}

export interface AlternativeSuggestion {
    tool: string;
    plan: string;
    monthlySpend: number;
    reason: string;
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
    alternatives?: AlternativeSuggestion[];
}