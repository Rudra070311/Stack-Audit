import { NextRequest, NextResponse } from "next/server";
import { generateId } from "../../../lib/utils/ids";
import { storeAudit, supabase } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shareId = body.audit?.auditId || generateId();
    const origin = request.nextUrl?.origin ?? "";
    const base = process.env.NEXT_PUBLIC_APP_URL || origin || "https://stack_audit.vercel.app";

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

    // Build a payload URL (base64url encoded) so shares work even if DB storage fails.
    let payloadUrl: string | undefined;
    try {
      if (body.audit) {
        const encoded = Buffer.from(JSON.stringify(body.audit)).toString("base64url");
        payloadUrl = `${base}/results/${shareId}?payload=${encoded}`;
      }
    } catch (e) {
      // ignore encoding errors
    }

    return NextResponse.json({
      success: true,
      id: shareId,
      shareUrl: `${base}/results/${shareId}`,
      payloadUrl,
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