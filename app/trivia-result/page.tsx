import type { Metadata } from "next";
import Link from "next/link";
import { getBadgeTier } from "@/lib/trivia-badges";

type SearchParams = { score?: string; total?: string };

function parseScore({ score, total }: SearchParams) {
  const rawTotal = Number(total);
  const parsedTotal =
    Number.isFinite(rawTotal) && rawTotal > 0 ? Math.round(rawTotal) : 10;
  const rawScore = Number(score);
  const parsedScore = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(parsedTotal, Math.round(rawScore)))
    : 0;
  return { score: parsedScore, total: parsedTotal };
}

// This page exists so a shared trivia result has its own URL — Facebook,
// WhatsApp, iMessage, etc. read the og:image below when someone shares this
// link, showing the earned badge instead of the site's general preview.
// Visiting humans get a simple result page with a link back to the quiz.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { score, total } = parseScore(await searchParams);
  const tier = getBadgeTier(score, total);

  const title = `I'm a ${tier.label}! | InspirED Lab Trivia`;
  const description = `I scored ${score}/${total} on the InspirED Lab Caribbean trivia challenge and earned the "${tier.label}" badge. Think you can beat it?`;
  const ogImage = `/api/og-badge?score=${score}&total=${total}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `${tier.label} badge` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function TriviaResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { score, total } = parseScore(await searchParams);
  const tier = getBadgeTier(score, total);
  const ogImage = `/api/og-badge?score=${score}&total=${total}`;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/InspiredLab.png"
            alt="InspirED Lab Logo"
            className="h-11 w-11 rounded-full"
          />
          <span className="font-semibold text-lg">InspirED Lab</span>
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogImage}
          alt={`${tier.label} badge — ${score} out of ${total} correct`}
          className="w-full rounded-3xl shadow-lg border"
        />

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-primary">{tier.label}</h1>
          <p className="text-muted-foreground">
            Scored {score} out of {total} on the InspirED Lab Caribbean trivia
            challenge.
          </p>
        </div>

        <Link
          href="/#resources"
          className="inline-flex items-center justify-center rounded-2xl bg-[oklch(var(--brand-orange))] text-white px-6 py-3 font-medium hover:bg-[oklch(var(--brand-orange)/0.85)] transition"
        >
          Take the trivia challenge yourself
        </Link>
      </div>
    </main>
  );
}
