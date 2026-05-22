interface BuildPromptParams {
  tool: string;
  monthlySpend: string;
  teamSize: string;
  useCase: string;
  monthlySavings?: number;
  annualSavings?: number;
  recommendation?: string;
}

export default function buildAuditPrompt({
    tool,
    monthlySpend,
    teamSize,
    useCase,
    monthlySavings,
    annualSavings,
    recommendation,
}: BuildPromptParams) {
    return `
You are generating a premium SaaS audit summary for a startup's AI tooling spend report.

Write exactly ONE concise paragraph.
Maximum 100 words.
No markdown.
No bullet points.
No intro phrases.
No hype.
No emojis.
No AI disclaimers.

Tone:
- sharp
- calm
- analytical
- founder-friendly
- credible finance/product language

Focus:
- optimization
- efficiency
- unnecessary spend
- practical recommendations
- realistic savings

Input:
Tool=${tool}
Spend=${monthlySpend}
TeamSize=${teamSize}
UseCase=${useCase}
MonthlySavings=${monthlySavings}
AnnualSavings=${annualSavings}
Recommendation=${recommendation}

Requirements:
- Mention whether current setup is efficient or overprovisioned.
- Mention likely optimization path.
- Mention realistic savings impact.
- Sound like a real SaaS audit product.
- Avoid repeating numbers excessively.
`;
}