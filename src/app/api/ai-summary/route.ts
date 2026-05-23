import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "../../../lib/ai/generate-summary";

export async function POST(
    request: NextRequest
) {
	try {
		const body =
		await request.json();

		const {
			tool,
			monthlySpend,
			teamSize,
			useCase,
			monthlySavings,
			annualSavings,
			recommendation,
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
				error: "Missing required fields",
			},
			{
				status: 400,
			}
		);
		}

		const summary =
		await generateSummary({
			tool,
			monthlySpend: String(monthlySpend),
			teamSize: String(teamSize),
			useCase,
			monthlySavings: Number(monthlySavings),
			annualSavings: Number(annualSavings),
			recommendation,
		});

		return NextResponse.json({
			success: true,
			summary,
		});
	} catch (error) {
		console.error(
			"AI Summary API Error:",
			error
		);

		return NextResponse.json(
			{
				success: false,

				error:
				"Failed to generate AI summary",
			},

			{
				status: 500,
			}
		);
	}
}
