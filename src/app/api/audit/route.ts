import { NextRequest, NextResponse } from "next/server";
import { runAudit, classifySavingsLevel } from "@/lib/audit-engine";
import { storeAudit, saveLead } from "@/lib/supabase";
import type { AuditFormData } from "@/types/audit";

/**
 * POST /api/audit
 * Run an audit on the provided tools and return recommendations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tools, teamSize, useCase, email, company_name, role } = body as AuditFormData & {
      email?: string;
      company_name?: string;
      role?: string;
    };

    // Validate input
    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one tool is required" },
        { status: 400 }
      );
    }

    if (!teamSize || teamSize < 1) {
      return NextResponse.json(
        { success: false, error: "Valid team size is required" },
        { status: 400 }
      );
    }

    // Run the audit
    const audit = runAudit({ tools, teamSize, useCase });

    // Save lead if email provided
    let leadId: string | undefined;
    if (email) {
      try {
        const lead = await saveLead(email, {
          company_name,
          role,
          team_size: teamSize,
        });
        leadId = lead.id;

        // Store the audit in the database
        await storeAudit(audit, leadId, true);
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue even if database save fails - return the audit result
      }
    }

    // Classify savings level for UI messaging
    const savingsLevel = classifySavingsLevel(audit.totalAnnualSavings);

    return NextResponse.json({
      success: true,
      audit,
      savingsLevel,
      auditId: audit.auditId,
      leadId,
    });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to run audit",
      },
      { status: 500 }
    );
  }
}