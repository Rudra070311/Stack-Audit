import { ImageResponse } from "next/og";

export default function TwitterImage() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				background: "#111827",
				color: "#ffffff",
				fontSize: 56,
				fontWeight: 700,
			}}
		>
			Stack Audit
		</div>,
		{
			width: 1200,
			height: 600,
		}
	);
}
