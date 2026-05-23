interface FallbackSummaryParams {
  tool: string;
  monthlySavings?: number;
  annualSavings?: number;
}

export default function generateFallbackSummary({
  tool,
  monthlySavings,
  annualSavings,
}: FallbackSummaryParams) {
  return `
Your current ${tool} setup shows potential opportunities for optimization based on your reported usage and team structure. The audit estimates approximately $${monthlySavings} in monthly savings and around $${annualSavings} annually through plan adjustments and tooling optimization. Your stack appears functional overall, but certain areas may benefit from better pricing alignment and reduced overlap across AI tooling subscriptions.
`;
}