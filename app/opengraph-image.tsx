import { ImageResponse } from "next/og";

export const alt = "InspireStack";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 32,
            backgroundColor: "#18181b",
            border: "2px solid #27272a",
            marginBottom: 32,
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          <svg
            width="76"
            height="76"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect width="32" height="32" rx="9" fill="#18181b" />
            <path
              d="M8.5 20.5L16 24.5L23.5 20.5"
              stroke="#ffffff"
              strokeOpacity="0.45"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 15.75L16 19.75L23.5 15.75"
              stroke="#ffffff"
              strokeOpacity="0.75"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6.5L23.5 11L16 15.5L8.5 11L16 6.5Z"
              fill="#ffffff"
            />
            <path
              d="M16 8.5V13.5M13.5 11H18.5"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="16" cy="11" r="0.75" fill="#18181b" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          InspireStack
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          Visual discovery platform — Save, organize, and share your inspiration
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
