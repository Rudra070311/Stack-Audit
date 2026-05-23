export interface AuditInput {
    tool: string;
    monthlySpend: number;
    teamSize: number;
    useCase: string;
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