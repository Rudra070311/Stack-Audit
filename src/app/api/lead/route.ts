import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "../../../lib/validations/lead-schema";
import { sendAuditEmail } from "../../../lib/email/send-audit";
import { saveLead, storeAudit, supabase } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = leadSchema.parse(body);

    // Save lead to Supabase
    const lead = await saveLead(validated.email, {
      company_name: validated.companyName,
      role: validated.role,
    });

    // If auditId is provided, store the audit
    if (body.auditId) {
      // Get the audit data from the request or fetch from somewhere
      // For now, we'll just store a reference
      try {
        await storeAudit(
          {
            auditId: body.auditId,
            totalCurrentSpend: body.totalCurrentSpend || 0,
            totalOptimizedSpend: body.totalOptimizedSpend || 0,
            totalMonthlySavings: body.totalMonthlySavings || 0,
            totalAnnualSavings: body.totalAnnualSavings || 0,
            savingsPercentage: body.savingsPercentage || 0,
            useCase: body.useCase || "mixed",
            teamSize: body.teamSize || 1,
            tools: body.tools || [],
          },
          lead.id,
          true // Make it public for sharing
        );
      } catch (auditError) {
        console.error("Failed to store audit:", auditError);
        // Continue even if audit storage fails
      }
    }

    // Send confirmation email
    try {
      await sendAuditEmail({
        email: validated.email,
        companyName: validated.companyName,
        role: validated.role,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully.",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Lead capture error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to capture lead.",
      },
      { status: 500 }
    );
  }
}