import { ImageResponse } from "next/og";

import { HERO, SITE } from "@/content/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#fff",
          backgroundColor: "#030014",
          backgroundImage: "radial-gradient(circle at 75% 30%, #2A0E61 0%, #030014 60%)",
        }}
      >
        <div style={{ fontSize: 28, color: "#b49bff", letterSpacing: 4, textTransform: "uppercase" }}>
          {HERO.badge}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>{SITE.name}</div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#c7d2fe" }}>{HERO.headline}</div>
      </div>
    ),
    size,
  );
}
