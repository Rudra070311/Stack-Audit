import generateFallbackSummary from "./fallback-summary";
import { generateWithGithubModels, generateWithOpenRouter } from "./provider";
import buildAuditPrompt from "./prompts";

interface ToolAudit {
  tool: string;
  plan?: string;
  currentSpend?: number;
  optimizedSpend?: number;
  monthlySavings?: number;
  annualSavings?: number;
  recommendation?: string;
}

interface GenerateSummaryParams {
  // Single tool (legacy)
  tool?: string;
  monthlySpend?: string;
  teamSize: string;
  useCase: string;
  monthlySavings?: number;
  annualSavings?: number;
  recommendation?: string;
  
  // Multiple tools (new)
  tools?: ToolAudit[];
  totalCurrentSpend?: number;
  totalOptimizedSpend?: number;
  totalMonthlySavings?: number;
  totalAnnualSavings?: number;
  savingsPercentage?: number;
}

export async function generateSummary({
  tool,
  monthlySpend,
  teamSize,
  useCase,
  monthlySavings,
  annualSavings,
  recommendation,
  tools,
  totalCurrentSpend,
  totalOptimizedSpend,
  totalMonthlySavings,
  totalAnnualSavings,
  savingsPercentage,
}: GenerateSummaryParams): Promise<string> {
  // If we have multiple tools, build a multi-tool prompt
  if (tools && tools.length > 0) {
    const prompt = buildMultiToolPrompt({
      tools,
      totalCurrentSpend: totalCurrentSpend || 0,
      totalOptimizedSpend: totalOptimizedSpend || 0,
      totalMonthlySavings: totalMonthlySavings || 0,
      totalAnnualSavings: totalAnnualSavings || 0,
      teamSize: Number(teamSize),
      useCase,
      savingsPercentage: savingsPercentage || 0,
    });

    if (process.env.OPENROUTER_API_KEY) {
      try {
        return await generateWithOpenRouter(prompt);
      } catch (error) {
        console.error("OpenRouter failed:", error);
      }
    }

    if (process.env.GITHUB_MODELS_TOKEN) {
      try {
        return await generateWithGithubModels(prompt);
      } catch (error) {
        console.error("GitHub Models failed:", error);
      }
    }

    return generateFallbackSummary({
      tool: tools.map(t => t.tool).join(", "),
      monthlySavings: totalMonthlySavings,
      annualSavings: totalAnnualSavings,
    });
  }

  // Legacy single-tool path
  if (!tool) {
    return generateFallbackSummary({
      tool: "AI tools",
      monthlySavings,
      annualSavings,
    });
  }

  const prompt: string = buildAuditPrompt({
    tool,
    monthlySpend: monthlySpend || "0",
    teamSize,
    useCase,
    monthlySavings,
    annualSavings,
    recommendation,
  });

  if (process.env.OPENROUTER_API_KEY) {
    try {
      return await generateWithOpenRouter(prompt);
    } catch (error) {
      console.error("OpenRouter failed:", error);
    }
  } else {
    console.warn("OPENROUTER_API_KEY not set, skipping OpenRouter provider");
  }

  if (process.env.GITHUB_MODELS_TOKEN) {
    try {
      return await generateWithGithubModels(prompt);
    } catch (error) {
      console.error("GitHub Models failed:", error);
    }
  } else {
    console.warn("GITHUB_MODELS_TOKEN not set, skipping GitHub models provider");
  }

  return generateFallbackSummary({
    tool,
    monthlySavings,
    annualSavings,
  });
}

function buildMultiToolPrompt(data: {
  tools: ToolAudit[];
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  teamSize: number;
  useCase: string;
  savingsPercentage: number;
}): string {
  const toolList = data.tools
    .map(t => {
      const savings = t.monthlySavings || 0;
      const status = savings > 0 ? `⚠️ Can save $${savings.toFixed(0)}/mo` : "✅ Optimized";
      return `- **${t.tool}** (${t.plan || "Standard"}): $${(t.currentSpend || 0).toFixed(0)}/mo → $${(t.optimizedSpend || 0).toFixed(0)}/mo - ${status}`;
    })
    .join("\n");

  return `You are a financial analyst specializing in AI tool optimization. Write a concise, professional ~100-word summary for an engineering team based on their AI spend audit.

AUDIT DATA:
- Team Size: ${data.teamSize} developers
- Primary Use Case: ${data.useCase}
- Current Monthly Spend: $${data.totalCurrentSpend.toFixed(0)}
- Optimized Monthly Spend: $${data.totalOptimizedSpend.toFixed(0)}
- Monthly Savings: $${data.totalMonthlySavings.toFixed(0)} (${data.savingsPercentage.toFixed(1)}%)
- Annual Savings: $${data.totalAnnualSavings.toFixed(0)}

Per-Tool Analysis:
${toolList}

Write a summary that:
1. States the total savings opportunity clearly
2. Highlights the top 1-2 optimization opportunities
3. Provides actionable next steps
4. Is honest - if savings are minimal, acknowledge the stack is well-optimized
5. Mentions Credex only if annual savings exceed $6,000 ($500/mo)

Keep it professional, data-driven, and concise.`;
}