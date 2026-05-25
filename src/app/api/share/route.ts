import { NextRequest, NextResponse } from "next/server";
import { generateId } from "../../../lib/utils/ids";

export async function POST(
  	request: NextRequest
) {
    try {
    	const body = await request.json();
		const shareId = generateId();

		return NextResponse.json({
		success: true,

		id: shareId,

		shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/results/${shareId}`,

		data: body,
		});
  	} catch (error) {
    	console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate share URL.",
      },
      { status: 500 }
    );
  }
}