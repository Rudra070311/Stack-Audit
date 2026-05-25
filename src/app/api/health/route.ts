import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		success: true,
		status: "ok",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
}