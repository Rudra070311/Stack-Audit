import { NextRequest, NextResponse } from "next/server";

import { runAuditEngine } from "../../../lib/audit-engine/engine";

export async function POST(
  	request: NextRequest
) {
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

		const {
			tool,
			monthlySpend,
			teamSize,
			useCase,
		} = body;

		if (
			!tool ||
			!monthlySpend ||
			!teamSize ||
			!useCase
		) {
		return NextResponse.json(
			{
			success: false,
			error: "Missing required audit fields",
			},
			{
			    status: 400,
			}
		);
		}

		const audit =
		await runAuditEngine({
			tool,
			monthlySpend:
			Number(monthlySpend),
			teamSize:
			Number(teamSize),
			useCase,
		});

		return NextResponse.json({
			success: true,
			audit,
		});
	} catch (error) {
		console.error(
			"Audit API Error:",
			error
		);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to generate audit",
			},
			{
				status: 500,
			}
		);
	}
}