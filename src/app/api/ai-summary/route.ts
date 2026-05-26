import { NextRequest, NextResponse } from "next/server";
import type { PerToolAudit } from "@/types/audit";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/**
 * POST /api/ai-summary
 * Generate a personalized AI summary of the audit using Claude
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      totalCurrentSpend,
      totalOptimizedSpend,
      totalAnnualSavings,
      teamSize,
      useCase,
      tools,
      companyName,
    } = body as {
      totalCurrentSpend: number;
      totalOptimizedSpend: number;
      totalAnnualSavings: number;
      teamSize: number;
      useCase: string;
      tools: PerToolAudit[];
      companyName?: string;
    };

    // Build the prompt for Claude
    const toolsList = tools
      .map(
        (t) =>
          `- ${t.tool} (${t.currentPlan}): $${t.currentSpend.toFixed(2)}/month → $${t.optimizedSpend.toFixed(2)}/month (save $${t.monthlySavings.toFixed(2)})`
      )
      .join("\n");

    const prompt = `You are a helpful financial advisor analyzing AI tool spending for a team. Generate a brief, personalized 100-word summary of an audit result. Be specific with numbers, focus on actionable insights.

Company: ${companyName || "Unknown"}
Team Size: ${teamSize} developers
Primary Use: ${useCase}
Current Monthly Spend: $${totalCurrentSpend.toFixed(2)}
Optimized Spend: $${totalOptimizedSpend.toFixed(2)}
Potential Monthly Savings: $${(totalCurrentSpend - totalOptimizedSpend).toFixed(2)} ($${totalAnnualSavings.toFixed(2)}/year)

Current tools and costs:
${toolsList}

Write a personalized summary highlighting:
1. The biggest cost opportunity
2. A specific recommendation
3. Impact on their budget

Keep it conversational and encouraging. Avoid generic advice.`;

    // If no API key, return a templated fallback
    if (!ANTHROPIC_API_KEY) {
      const fallbackSummary = generateFallbackSummary({
        totalCurrentSpend,
        totalOptimizedSpend,
        totalAnnualSavings,
        teamSize,
        tools,
      });

      return NextResponse.json({
        success: true,
        summary: fallbackSummary,
        isTemplate: true,
      });
    }

    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", await response.text());
      // Fall back to template on error
      const fallbackSummary = generateFallbackSummary({
        totalCurrentSpend,
        totalOptimizedSpend,
        totalAnnualSavings,
        teamSize,
        tools,
      });

      return NextResponse.json({
        success: true,
        summary: fallbackSummary,
        isTemplate: true,
      });
    }

    const data = await response.json();
    const summary = data.content[0]?.text || "";

    return NextResponse.json({
      success: true,
      summary,
      isTemplate: false,
    });
  } catch (error) {
    console.error("Summary generation error:", error);

    // Return a basic fallback
    return NextResponse.json({
      success: true,
      summary:
        "Your audit revealed optimization opportunities. Review the detailed recommendations below to reduce your AI tool spending.",
      isTemplate: true,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Generate a fallback summary when AI is not available
 */
function generateFallbackSummary({
  totalCurrentSpend,
  totalOptimizedSpend,
  totalAnnualSavings,
  teamSize,
  tools,
}: {
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalAnnualSavings: number;
  teamSize: number;
  tools: PerToolAudit[];
}): string {
  const savingsPercent = ((totalAnnualSavings / (totalCurrentSpend * 12)) * 100).toFixed(0);
  const costPerDev = totalCurrentSpend / teamSize;

  let summary = `Your team is currently spending $${totalCurrentSpend.toFixed(2)}/month on AI tools, or $${costPerDev.toFixed(2)} per developer. `;

  if (totalAnnualSavings > 0) {
    summary += `By optimizing your current stack, you could save $${totalAnnualSavings.toFixed(2)}/year (${savingsPercent}% reduction). `;
  } else {
    summary += `Your current plan mix appears well-optimized for your team size and use case. `;
  }

  const largestOpportunity = tools.reduce((max, tool) =>
    tool.monthlySavings > max.monthlySavings ? tool : max
  );

  if (largestOpportunity.monthlySavings > 0) {
    summary += `Your biggest opportunity is optimizing ${largestOpportunity.tool}, which could save $${largestOpportunity.monthlySavings.toFixed(2)}/month. Review the detailed breakdown below for specific recommendations.`;
  } else {
    summary += `Review the detailed breakdown below for recommendations specific to each tool.`;
  }

  return summary;
}
