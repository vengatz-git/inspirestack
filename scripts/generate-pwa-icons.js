const fs = require("fs");
const path = require("path");
const React = require("react");
const { ImageResponse } = require("next/og");

async function generateIcons() {
  const iconsDir = path.join(process.cwd(), "public", "icons");
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // InspireStack Logo Element
  function LogoIcon({ size, isMaskable = false }) {
    const scale = size / 32;
    const padding = isMaskable ? size * 0.15 : 0;
    const innerSize = size - padding * 2;
    const innerScale = innerSize / 32;

    return React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
        },
      },
      React.createElement(
        "svg",
        {
          width: innerSize,
          height: innerSize,
          viewBox: "0 0 32 32",
          fill: "none",
        },
        React.createElement("rect", {
          width: 32,
          height: 32,
          rx: isMaskable ? 0 : 9,
          fill: "#18181b",
        }),
        React.createElement("rect", {
          x: 0.75,
          y: 0.75,
          width: 30.5,
          height: 30.5,
          rx: isMaskable ? 0 : 8.25,
          stroke: "#ffffff",
          strokeOpacity: 0.15,
          strokeWidth: 1.5,
        }),
        React.createElement("path", {
          d: "M8.5 20.5L16 24.5L23.5 20.5",
          stroke: "#ffffff",
          strokeOpacity: 0.45,
          strokeWidth: 2.2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        React.createElement("path", {
          d: "M8.5 15.75L16 19.75L23.5 15.75",
          stroke: "#ffffff",
          strokeOpacity: 0.75,
          strokeWidth: 2.2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        React.createElement("path", {
          d: "M16 6.5L23.5 11L16 15.5L8.5 11L16 6.5Z",
          fill: "#ffffff",
        }),
        React.createElement("path", {
          d: "M16 8.5V13.5M13.5 11H18.5",
          stroke: "#18181b",
          strokeWidth: 1.8,
          strokeLinecap: "round",
        }),
        React.createElement("circle", {
          cx: 16,
          cy: 11,
          r: 0.75,
          fill: "#18181b",
        })
      )
    );
  }

  const targets = [
    { name: "icon-192.png", size: 192, isMaskable: false },
    { name: "icon-512.png", size: 512, isMaskable: false },
    { name: "icon-maskable-192.png", size: 192, isMaskable: true },
    { name: "icon-maskable-512.png", size: 512, isMaskable: true },
    { name: "apple-touch-icon.png", size: 180, isMaskable: false },
  ];

  for (const target of targets) {
    console.log(`Generating ${target.name}...`);
    const res = new ImageResponse(
      LogoIcon({ size: target.size, isMaskable: target.isMaskable }),
      {
        width: target.size,
        height: target.size,
      }
    );
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(iconsDir, target.name), buffer);
    console.log(`Saved ${target.name} (${buffer.length} bytes)`);
  }

  console.log("All icons generated successfully!");
}

generateIcons().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
