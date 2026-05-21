import { ImageResponse } from "next/og";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				background: "#0f172a",
				color: "#ffffff",
				fontSize: 64,
				fontWeight: 700,
			}}
		>
			Stack Audit
		</div>,
		{
			width: 1200,
			height: 630,
		}
	);
}
