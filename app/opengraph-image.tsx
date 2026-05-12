import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "付加価値、一緒に上げませんか。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0E0A1F 0%, #1A1233 50%, #4B2E83 100%)",
          color: "#F4F0E0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#F4A26B",
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          syam
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          付加価値、
          <br />
          一緒に上げませんか。
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#9C8FB8",
          }}
        >
          月給13万から、毎年100万ずつ。たぶん、再現できます。
        </div>
      </div>
    ),
    { ...size },
  );
}
