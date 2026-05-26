import type { ToolName, PerToolAudit, AuditFormData, AuditResult } from "@/types/audit";
import { PRICING_CONFIG, getCostPerDeveloper, getRecommendedPlan } from "./pricing-config";
import { v4 as uuidv4 } from "uuid";

/**
 * Audit a single tool configuration
 */
export function auditTool(
  toolName: ToolName,
  currentPlan: string,
  monthlySpend: number,
  teamSize: number,
  seats: number,
  useCase: string
): PerToolAudit {
  const toolConfig = PRICING_CONFIG[toolName];
  if (!toolConfig) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  const currentPlanPrice = toolConfig.plans[currentPlan];
  if (!currentPlanPrice) {
    throw new Error(`Unknown plan: ${currentPlan} for ${toolName}`);
  }

  // Get recommended plan for this team size and use case
  const recommendedPlan = getRecommendedPlan(toolName, teamSize, useCase);
  const recommendedPlanPrice = toolConfig.plans[recommendedPlan];

  // Calculate actual vs recommended spend
  const recommendedSpend = recommendedPlanPrice.pricePerSeat
    ? recommendedPlanPrice.pricePerSeat * seats
    : recommendedPlanPrice.monthlyPrice;

  const monthlySavings = Math.max(0, monthlySpend - recommendedSpend);
  const annualSavings = monthlySavings * 12;

  // Generate reasoning for the recommendation
  const reasoning = generateReasoning(
    toolName,
    currentPlan,
    recommendedPlan,
    monthlySpend,
    recommendedSpend,
    teamSize,
    useCase
  );

  return {
    tool: toolName,
    plan: currentPlan,
    currentSpend: monthlySpend,
    currentPlan,
    optimizedPlan: recommendedPlan,
    optimizedSpend: recommendedSpend,
    monthlySavings,
    annualSavings,
    recommendation: `Switch from ${currentPlan} to ${recommendedPlan}`,
    reasoning,
    alternatives: findAlternativeTools(
      toolName,
      monthlySpend,
      teamSize,
      useCase,
      currentPlan
    ),
  };
}

/**
 * Generate defensible reasoning for audit recommendations
 */
function generateReasoning(
  tool: ToolName,
  currentPlan: string,
  recommendedPlan: string,
  currentSpend: number,
  recommendedSpend: number,
  teamSize: number,
  useCase: string
): string {
  const toolConfig = PRICING_CONFIG[tool];

  // Cost per developer analysis
  const currentCostPerDev = currentSpend / teamSize;
  const recommendedCostPerDev = recommendedSpend / teamSize;

  let reasoning = `Your team of ${teamSize} is spending $${currentCostPerDev.toFixed(2)}/developer/month on ${currentPlan}. `;

  if (currentPlan === recommendedPlan) {
    reasoning += `Your current plan is optimal for your team size and ${useCase} use case.`;
    return reasoning;
  }

  const currentPlanConfig = toolConfig.plans[currentPlan];
  const recommendedPlanConfig = toolConfig.plans[recommendedPlan];

  // Check if current plan is oversized
  if (currentPlanConfig.pricePerSeat && !recommendedPlanConfig.pricePerSeat) {
    reasoning += `Since your team is small (${teamSize} developers), a fixed monthly plan is more economical than per-seat pricing. `;
  } else if (!currentPlanConfig.pricePerSeat && recommendedPlanConfig.pricePerSeat && teamSize > 3) {
    reasoning += `With ${teamSize} developers, switching to per-seat pricing becomes cost-effective. `;
  }

  reasoning += `The ${recommendedPlan} plan ($${recommendedSpend.toFixed(2)}/month) would cost $${recommendedCostPerDev.toFixed(2)}/developer/month. `;
  reasoning += `This saves ${(((currentSpend - recommendedSpend) / currentSpend) * 100).toFixed(0)}% annually.`;

  return reasoning;
}

/**
 * Find alternative tools that might be cheaper for the same use case
 */
function findAlternativeTools(
  currentTool: ToolName,
  monthlySpend: number,
  teamSize: number,
  useCase: string,
  currentPlan: string
): PerToolAudit["alternatives"] {
  const alternatives: PerToolAudit["alternatives"] = [];

  // Define tool categories by primary use case capability
  const toolsByUseCase: Record<string, ToolName[]> = {
    coding: ["Cursor", "Copilot", "Claude", "ChatGPT", "Windsurf"],
    writing: ["Claude", "ChatGPT", "Gemini"],
    data: ["Claude", "ChatGPT", "Gemini"],
    research: ["Claude", "ChatGPT", "Gemini"],
    mixed: ["Claude", "ChatGPT", "OpenAI"],
  };

  const relevantTools = toolsByUseCase[useCase] || [];

  for (const toolName of relevantTools) {
    if (toolName === currentTool) continue;

    const toolConfig = PRICING_CONFIG[toolName];
    const recommendedPlan = getRecommendedPlan(toolName, teamSize, useCase);
    const planPrice = toolConfig.plans[recommendedPlan];

    const alternativeSpend = planPrice.pricePerSeat
      ? planPrice.pricePerSeat * teamSize
      : planPrice.monthlyPrice;

    // Only suggest alternatives that are significantly cheaper (>15% savings)
    if (alternativeSpend < monthlySpend * 0.85) {
      alternatives.push({
        tool: toolName,
        plan: recommendedPlan,
        monthlySpend: alternativeSpend,
        reason: `${toolName} ${recommendedPlan} offers similar ${useCase} capabilities at $${alternativeSpend.toFixed(2)}/month`,
      });
    }
  }

  // Sort by price (cheapest first)
  return alternatives.sort((a, b) => a.monthlySpend - b.monthlySpend).slice(0, 3);
}

/**
 * Run a complete audit on multiple tools
 */
export function runAudit(formData: AuditFormData): AuditResult {
  const toolAudits: PerToolAudit[] = [];
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;

  for (const toolConfig of formData.tools) {
    const audit = auditTool(
      toolConfig.name,
      toolConfig.plan,
      toolConfig.monthlySpend,
      formData.teamSize,
      toolConfig.seats,
      formData.useCase
    );

    toolAudits.push(audit);
    totalCurrentSpend += audit.currentSpend;
    totalOptimizedSpend += audit.optimizedSpend;
  }

  const totalMonthlySavings = totalCurrentSpend - totalOptimizedSpend;
  const totalAnnualSavings = totalMonthlySavings * 12;
  const savingsPercentage =
    totalCurrentSpend > 0 ? (totalMonthlySavings / totalCurrentSpend) * 100 : 0;

  return {
    auditId: uuidv4(),
    timestamp: new Date().toISOString(),
    tools: toolAudits,
    teamSize: formData.teamSize,
    useCase: formData.useCase,
    totalCurrentSpend,
    totalOptimizedSpend,
    totalMonthlySavings,
    totalAnnualSavings,
    savingsPercentage,
  };
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Classify savings level for UI/messaging
 */
export function classifySavingsLevel(annualSavings: number): "low" | "medium" | "high" {
  if (annualSavings < 100) return "low";
  if (annualSavings < 500) return "medium";
  return "high";
}
