import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "../../../lib/ai/generate-summary";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      try {
        const text = await request.clone().text();
        console.error("AI Summary API: failed to parse JSON body. Raw body:", text);
      } catch (e) {
        console.error("AI Summary API: failed to read raw body to log parse error.", e);
      }
      throw parseErr;
    }

    const {
      tools,
      totalCurrentSpend,
      totalOptimizedSpend,
      totalAnnualSavings,
      totalMonthlySavings,
      teamSize,
      useCase,
      savingsPercentage,
    } = body;

    // Support both single tool (legacy) and multiple tools
    const toolList = Array.isArray(tools) ? tools : [body];

    if (!toolList || toolList.length === 0 || !teamSize || !useCase) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: tools, teamSize, useCase",
        },
        { status: 400 }
      );
    }

    // Generate summary for the entire audit
    const summary = await generateSummary({
      tools: toolList,
      totalCurrentSpend: Number(totalCurrentSpend || 0),
      totalOptimizedSpend: Number(totalOptimizedSpend || 0),
      totalMonthlySavings: Number(totalMonthlySavings || 0),
      totalAnnualSavings: Number(totalAnnualSavings || 0),
      teamSize: String(teamSize),
      useCase,
      savingsPercentage: Number(savingsPercentage || 0),
    });

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("AI Summary API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI summary",
      },
      { status: 500 }
    );
  }
}