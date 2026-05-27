import { NextRequest, NextResponse } from "next/server";
import { runAuditEngine } from "../../../lib/audit-engine/engine";
import { generateId } from "../../../lib/utils/ids";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      try {
        const text = await request.clone().text();
        console.error("Audit API: failed to parse JSON body. Raw body:", text);
      } catch (e) {
        console.error("Audit API: failed to read raw body to log parse error.", e);
      }
      throw parseErr;
    }

    const { tools, teamSize, useCase } = body;

    // Support both single tool (legacy) and multiple tools
    const toolList = Array.isArray(tools) ? tools : [body];

    if (!toolList || toolList.length === 0 || !teamSize || !useCase) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required audit fields: tools, teamSize, useCase",
        },
        { status: 400 }
      );
    }

    // Process each tool through the audit engine
    const perToolAudits = await Promise.all(
      toolList.map(async (toolData: any) => {
        const tool = toolData.name || toolData.tool;
        const monthlySpend = Number(toolData.monthlySpend || toolData.spend || 0);
        const seats = Number(toolData.seats || 1);

        const result = await runAuditEngine({
          tool,
          monthlySpend,
          teamSize: Math.max(teamSize, seats),
          useCase,
          seats,
        });

        return {
          tool: result.tool as any,
          plan: toolData.plan || "Standard",
          currentSpend: result.currentSpend,
          currentPlan: toolData.plan || "Standard",
          optimizedPlan: result.recommendation.split("\n")[0] || "Optimized",
          optimizedSpend: result.optimizedSpend,
          monthlySavings: result.monthlySavings,
          annualSavings: result.annualSavings,
          recommendation: result.recommendation,
          reasoning: result.reasoning,
          alternatives: result.alternatives,
        };
      })
    );

    // Calculate totals
    const totalCurrentSpend = perToolAudits.reduce(
      (sum: number, tool: any) => sum + tool.currentSpend,
      0
    );
    const totalOptimizedSpend = perToolAudits.reduce(
      (sum: number, tool: any) => sum + tool.optimizedSpend,
      0
    );
    const totalMonthlySavings = perToolAudits.reduce(
      (sum: number, tool: any) => sum + tool.monthlySavings,
      0
    );
    const totalAnnualSavings = totalMonthlySavings * 12;
    const savingsPercentage =
      totalCurrentSpend > 0 ? (totalMonthlySavings / totalCurrentSpend) * 100 : 0;

    const auditId = generateId();

    return NextResponse.json({
      success: true,
      auditId,
      audit: {
        auditId,
        timestamp: new Date().toISOString(),
        tools: perToolAudits,
        teamSize,
        useCase,
        totalCurrentSpend,
        totalOptimizedSpend,
        totalMonthlySavings,
        totalAnnualSavings,
        savingsPercentage,
      },
    });
  } catch (error) {
    console.error("Audit API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate audit",
      },
      { status: 500 }
    );
  }
}