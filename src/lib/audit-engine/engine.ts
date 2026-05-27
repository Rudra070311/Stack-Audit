import {
  calculateAnnualSavings,
  calculateMonthlySavings,
} from "./calculators/savings";

import {
  estimateOptimizedSpend,
  normalizeMonthlySpend,
} from "./calculators/pricing";

import { calculateSpendPerDeveloper } from "./calculators/benchmarks";

import { evaluateSpendBenchmark } from "./benchmarks/spend-per-dev";

import { shouldRecommendCredex } from "./recommendations/credits";

import { getAlternativeSuggestion } from "./recommendations/alternatives";

import {
  AuditInput,
  AuditResult,
} from "./types";

import { evaluateCursorRules } from "./rules/cursor-rules";

import { evaluateClaudeRules } from "./rules/claude-rules";

import { evaluateOpenAIRules } from "./rules/openai-rules";

import { evaluateCopilotRules } from "./rules/copilot-rules";

import { evaluateGeminiRules } from "./rules/gemini-rules";

import { evaluateWindsurfRules } from "./rules/windsurf-rules";

export async function runAuditEngine({
  tool,
  monthlySpend,
  teamSize,
  useCase,
}: AuditInput): Promise<AuditResult> {
  const normalizedSpend =
    normalizeMonthlySpend(
      monthlySpend
    );

  let result;

  switch (tool.toLowerCase()) {
    case "cursor":
      result =
        evaluateCursorRules(
          normalizedSpend,
          teamSize
        );
      break;

    case "claude":
      result =
        evaluateClaudeRules(
          normalizedSpend,
          useCase
        );
      break;

    case "openai":
    case "chatgpt":
      result =
        evaluateOpenAIRules(
          normalizedSpend,
          teamSize
        );
      break;

    case "copilot":
      result =
        evaluateCopilotRules(
          normalizedSpend,
          teamSize
        );
      break;

    case "gemini":
      result =
        evaluateGeminiRules(
          normalizedSpend
        );
      break;

    case "windsurf":
      result =
        evaluateWindsurfRules(
          normalizedSpend,
          teamSize
        );
      break;

    default:
      result = {
        reductionPercent: 0,

        recommendation:
          "Current setup appears efficient.",

        reasoning:
          "No optimization rules matched.",
      };
  }

  const optimizedSpend =
    estimateOptimizedSpend(
      normalizedSpend,
      result.reductionPercent
    );

  const monthlySavings =
    calculateMonthlySavings(
      normalizedSpend,
      optimizedSpend
    );

  const annualSavings =
    calculateAnnualSavings(
      monthlySavings
    );

  const spendPerDev =
    calculateSpendPerDeveloper(
      normalizedSpend,
      teamSize
    );

  const benchmark =
    evaluateSpendBenchmark(
      spendPerDev
    );

  const alternativeText =
    getAlternativeSuggestion(
      tool
    );

  // Build alternatives array for the result
  const alternatives = [];
  if (tool.toLowerCase() === "cursor") {
    alternatives.push({
      tool: "Copilot",
      plan: "Individual",
      monthlySpend: 10,
      reason: "Lighter coding workflows at half the cost",
    });
  } else if (tool.toLowerCase() === "chatgpt" || tool.toLowerCase() === "openai") {
    alternatives.push({
      tool: "Claude",
      plan: "Pro",
      monthlySpend: 20,
      reason: "Better pricing for similar capability",
    });
  }

  const credexEligible =
    shouldRecommendCredex(
      monthlySavings
    );

  return {
    tool,

    currentSpend:
      normalizedSpend,

    optimizedSpend,

    monthlySavings,

    annualSavings,

    recommendation:
      result.recommendation,

    reasoning: `
${result.reasoning}

${benchmark.message}

${alternativeText}

${
  credexEligible
    ? "Your savings profile may qualify for discounted AI infrastructure credits through Credex."
    : ""
}
    `,
    alternatives: alternatives.length > 0 ? alternatives : undefined,

    useCase,

    teamSize,
  };
}