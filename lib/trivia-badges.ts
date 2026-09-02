// Shared badge-tier data for the trivia game. Used by both the client-side
// canvas badge (components/TriviaCard.tsx, for the Download/Share-image
// buttons) and the server-rendered OG image (app/api/og-badge/route.tsx, for
// link previews on Facebook/WhatsApp/etc). Keeping the thresholds, colors,
// copy, and emoji in one place keeps the two generated images in sync.

export type BadgeTier = {
  key: string;
  min: number; // minimum fraction correct (0-1) to earn this tier
  label: string;
  blurb: string;
  emoji: string;
  from: string; // gradient/accent-background start
  to: string; // gradient/accent-background end
  accent: string; // text/icon accent color
};

export const BADGE_TIERS: BadgeTier[] = [
  {
    key: "learner",
    min: 0,
    label: "Curious Learner",
    blurb: "You're just getting started — try again to level up!",
    emoji: "\u{1F331}", // 🌱
    from: "#DCEEFC",
    to: "#BFE0FA",
    accent: "#1D4E89",
  },
  {
    key: "explorer",
    min: 0.4,
    label: "Culture Explorer",
    blurb: "Solid instincts for Caribbean culture and history!",
    emoji: "\u{1F9ED}", // 🧭
    from: "#D6F5EA",
    to: "#AEE9CF",
    accent: "#0F7A55",
  },
  {
    key: "scholar",
    min: 0.7,
    label: "Island Scholar",
    blurb: "Impressive knowledge of the region!",
    emoji: "\u{1F4DA}", // 📚
    from: "#FFE8D2",
    to: "#FFD1A6",
    accent: "#B45B18",
  },
  {
    key: "master",
    min: 0.9,
    label: "Caribbean Trivia Master",
    blurb: "Outstanding! You really know your stuff.",
    emoji: "\u{1F3C6}", // 🏆
    from: "#FFF3C4",
    to: "#FFE28A",
    accent: "#8A6300",
  },
];

export function getBadgeTier(score: number, total: number): BadgeTier {
  const pct = total > 0 ? score / total : 0;
  let result = BADGE_TIERS[0];
  for (const tier of BADGE_TIERS) {
    if (pct >= tier.min) result = tier;
  }
  return result;
}
