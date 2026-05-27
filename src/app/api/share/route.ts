import { NextRequest, NextResponse } from "next/server";
import { generateId } from "../../../lib/utils/ids";
import { storeAudit, supabase } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shareId = generateId();

    // Store the audit in Supabase for the share page
    if (body.audit) {
      try {
        await storeAudit(
          {
            auditId: shareId,
            totalCurrentSpend: body.audit.totalCurrentSpend,
            totalOptimizedSpend: body.audit.totalOptimizedSpend,
            totalMonthlySavings: body.audit.totalMonthlySavings,
            totalAnnualSavings: body.audit.totalAnnualSavings,
            savingsPercentage: body.audit.savingsPercentage,
            useCase: body.audit.useCase,
            teamSize: body.audit.teamSize,
            tools: body.audit.tools,
          },
          undefined, // No lead linked yet
          true // Make it public for sharing
        );
      } catch (storeError) {
        console.error("Failed to store audit for sharing:", storeError);
        // Continue even if storage fails
      }
    }

    return NextResponse.json({
      success: true,
      id: shareId,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/results/${shareId}`,
      data: body,
    });
  } catch (error) {
    console.error("Share API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate share URL.",
      },
      { status: 500 }
    );
  }
}