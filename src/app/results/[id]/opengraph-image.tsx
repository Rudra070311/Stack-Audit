import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          color: "white",

          width: "100%",
          height: "100%",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 32,

            opacity: 0.6,
          }}
        >
          StackAudit
        </div>

        <div
          style={{
            fontSize: 80,

            fontWeight: 700,

            marginTop: 20,
          }}
        >
          Save $1,440/yr
        </div>

        <div
          style={{
            fontSize: 36,

            marginTop: 20,

            opacity: 0.8,
          }}
        >
          AI Spend Optimization Report
        </div>
      </div>
    ),

    size
  );
}