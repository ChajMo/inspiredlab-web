import { ImageResponse } from "next/og";
import { getBadgeTier } from "@/lib/trivia-badges";

export const runtime = "edge";

// Renders a 1200x630 link-preview image for a specific trivia score, e.g.
// /api/og-badge?score=8&total=10 — used as the og:image / twitter:image for
// app/trivia-result, so sharing a result on Facebook/WhatsApp/etc. shows the
// earned badge instead of the site's generic preview image. The visual
// design intentionally mirrors the client-side canvas badge in
// components/TriviaCard.tsx (same tier data, from lib/trivia-badges.ts) so
// both generated images look like the same badge.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const rawScore = Number(searchParams.get("score"));
  const rawTotal = Number(searchParams.get("total"));
  const total =
    Number.isFinite(rawTotal) && rawTotal > 0 ? Math.round(rawTotal) : 10;
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(total, Math.round(rawScore)))
    : 0;

  const tier = getBadgeTier(score, total);
  const logoUrl = `${origin}/InspiredLab.png`;
  const iconUrl = `${origin}/badges/${tier.key}.png`;

  // Bundled locally (public/fonts) rather than fetched from Google Fonts at
  // request time, so this route has no external network dependency.
  const [poppinsRegular, poppinsBold] = await Promise.all([
    fetch(`${origin}/fonts/Poppins-Regular.ttf`).then((r) => r.arrayBuffer()),
    fetch(`${origin}/fonts/Poppins-Bold.ttf`).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${tier.from}, ${tier.to})`,
          fontFamily: "Poppins",
        }}
      >
        {/* Left: identity + result */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "62%",
            height: "100%",
            padding: "0 0 0 76px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt=""
              width={76}
              height={76}
              style={{ borderRadius: "50%" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#14213D" }}>
                InspirED Lab
              </div>
              <div style={{ fontSize: 18, color: "#46546F" }}>
                Trivia Challenge
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 46,
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: tier.accent,
            }}
          >
            Earned the badge
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: tier.accent,
              marginTop: 6,
              lineHeight: 1.1,
              maxWidth: 640,
            }}
          >
            {tier.label}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              color: "#14213D",
              marginTop: 22,
            }}
          >
            {score} / {total} correct
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#46546F",
              marginTop: 30,
            }}
          >
            Think you can beat this? inspiredlabskn.org
          </div>
        </div>

        {/* Right: badge medallion */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "38%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(20,33,61,0.28)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconUrl} alt="" width={190} height={190} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Poppins", data: poppinsRegular, weight: 400, style: "normal" },
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
      ],
    }
  );
}
