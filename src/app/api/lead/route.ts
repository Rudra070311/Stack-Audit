import { NextRequest, NextResponse} from "next/server";
import { leadSchema } from "../../../lib/validations/lead-schema";
import { sendAuditEmail } from "../../../lib/email/send-audit";
import { createLead } from "../../../lib/db/mutations";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();
    const validated = leadSchema.parse(body);
    await sendAuditEmail({
		email: validated.email,
		companyName: validated.companyName,
		role: validated.role,
    });
	await createLead({
		email: validated.email,
		companyName: validated.companyName,
		role: validated.role,
	});

		return NextResponse.json({
			success: true,
			message: "Lead captured successfully.",
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
		{
			success: false,
			error: "Failed to capture lead.",
		},
		{ status: 500 }
		);
  	}
}