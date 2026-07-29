import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${profile.title}`;

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "radial-gradient(1200px 700px at 15% -5%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(1000px 600px at 92% 8%, rgba(139,92,246,0.24), transparent 60%), #09090B",
          color: "#F5F5F7",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#04121a",
              background:
                "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 60%, #C026D3 100%)",
              boxShadow: "0 20px 60px -20px rgba(34,211,238,0.6)",
            }}
          >
            FS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#A1A1AA",
              }}
            >
              Portfolio
            </span>
            <span style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>
              {SITE.name}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#22D3EE",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            {profile.title}
          </span>
          <span
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Cloud, DevOps, and the software that ships it.
          </span>
          <span style={{ fontSize: 24, color: "#D4D4D8", maxWidth: 860 }}>
            AWS · Terraform · Docker · GitHub Actions · Serverless · Kubernetes
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#A1A1AA",
          }}
        >
          <span>{profile.location}</span>
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
