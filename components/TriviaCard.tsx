"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Copy, Share2, Download, Sprout, Compass, BookOpen, Trophy } from "lucide-react";

type TriviaQ = {
  category: "Culture" | "History" | "Science";
  question: string;
  choices: string[];
  answerIndex: number;
  explain?: string;
};

const QUESTION_BANK: TriviaQ[] = [
  {
    category: "Culture",
    question: "Which event is widely recognized as Saint Kitts & Nevis’s annual Carnival celebration?",
    choices: ["Culturama", "Sugar Mas", "Jounen Kwéyòl", "Crop Over"],
    answerIndex: 1,
    explain: "Sugar Mas is the national carnival celebration commonly associated with late Dec–early Jan.",
  },
{
  question: "The Buckley’s Uprising (1935) in Saint Kitts was sparked by what major issue?",
  choices: [
    "A dispute over fishing rights",
    "Unfair wages and harsh working conditions on sugar plantations",
    "A disagreement between political parties",
    "A hurricane recovery effort"
  ],
  answerIndex: 1,
  category: "History",
  explain: "The Buckley’s Uprising was a labor revolt driven by poor wages and harsh conditions on sugar plantations. It became a turning point in the push for workers’ rights and political change in Saint Kitts and Nevis."
},
  {
    category: "Science",
    question: "In island ecosystems, mangroves are especially important because they…",
    choices: [
      "Increase ocean salinity",
      "Protect shorelines and support nurseries for marine life",
      "Reduce biodiversity",
      "Only grow in deep water",
    ],
    answerIndex: 1,
    explain: "Mangroves reduce erosion, buffer storms, and provide habitat for many species.",
  },
  {
    category: "History",
    question: "The Caribbean Sea is part of which ocean?",
    choices: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    answerIndex: 0,
  },
  // Add more below...
  {
  category: "History",
  question: "Which Caribbean nation became the first free Black republic in 1804 after a successful revolution?",
  choices: ["Jamaica", "Barbados", "Haiti", "Trinidad and Tobago"],
  answerIndex: 2,
  explain: "Haiti became independent in 1804 after the Haitian Revolution."
},
{
  category: "History",
  question: "Who was one of the best-known leaders of the Haitian independence movement during the revolution?",
  choices: ["Marcus Garvey", "Toussaint Louverture", "Eric Williams", "Sam Sharpe"],
  answerIndex: 1,
  explain: "Toussaint Louverture was a major leader of the Haitian Revolution, though Haiti declared independence after his death."
},
{
  category: "History",
  question: "The Garifuna people trace their origins to the intermingling of Africans and Indigenous Caribbean peoples on which island?",
  choices: ["Saint Vincent", "Cuba", "Puerto Rico", "Jamaica"],
  answerIndex: 0,
  explain: "Garifuna culture emerged on Saint Vincent before forced deportation to Central America."
},
{
  category: "History",
  question: "Marcus Garvey founded the Universal Negro Improvement Association (UNIA) in which Caribbean country?",
  choices: ["Trinidad and Tobago", "Barbados", "Jamaica", "Haiti"],
  answerIndex: 2,
  explain: "Garvey founded the UNIA in Jamaica in 1914."
},
{
  category: "Culture",
  question: "Which Caribbean poet won the Nobel Prize in Literature in 1992 for work that reflects the region’s history and identity?",
  choices: ["Derek Walcott", "Aimé Césaire", "Kamau Brathwaite", "George Lamming"],
  answerIndex: 0,
  explain: "Derek Walcott of Saint Lucia won the Nobel Prize in Literature in 1992. His poetry explores Caribbean identity, history, language, and the legacy of colonialism."
},
{
  category: "History",
  question: "Which Caribbean historian and writer wrote 'The Black Jacobins,' a landmark history of the Haitian Revolution?",
  choices: ["Aimé Césaire", "Frantz Fanon", "C.L.R. James", "George Lamming"],
  answerIndex: 2,
  explain: "C.L.R. James of Trinidad wrote The Black Jacobins."
},
{
  category: "History",
  question: "What were Maroon communities in the Caribbean best known for?",
  choices: [
    "Running colonial schools",
    "Escaping their oppressors and building independent communities",
    "Importing plantation goods",
    "Serving as European naval bases"
  ],
  answerIndex: 1,
  explain: "Maroon communities were founded by people who escaped slavery and defended their freedom."
},
{
  category: "History",
  question: "St.Kitts and Nevis became independent in what year?",
  choices: ["1990", "1975", "1983", "1966"],
  answerIndex: 2,
  explain: "St.Kitts and Nevis became independent on September 19, 1983."
},
{
  category: "History",
  question: "Which Indigenous people are most closely associated with the Lesser Antilles at the time of European conquest?",
  choices: ["Taíno", "Carib/Kalinago", "Inca", "Maya"],
  answerIndex: 1,
  explain: "The Carib, also known today as Kalinago, were associated with the Lesser Antilles."
},
{
  category: "History",
  question: "Why is the Haitian Revolution so important in world history?",
  choices: [
    "It created the first railway in the Caribbean",
    "It led to the first free Black republic and challenged slavery worldwide",
    "It introduced sugar cultivation to the region",
    "It unified all Caribbean islands into one country"
  ],
  answerIndex: 1,
  explain: "The Haitian Revolution was a major anti-slavery and anti-colonial turning point in global history."
},
{
  category: "History",
  question: "Which statement best reflects a decolonized view of Caribbean history?",
  choices: [
    "Caribbean history began with European arrival",
    "The Caribbean’s most important contributions were plantation exports",
    "Caribbean people have long shaped the world through resistance, creativity, and knowledge",
    "The Caribbean has little connection to global history"
  ],
  answerIndex: 2,
  explain: "A decolonized approach centers Caribbean agency, knowledge, resistance, and global influence."
},
{
  category: "Culture",
  question: "Jamaica Kincaid, an influential Caribbean writer, was born in which country?",
  choices: ["Jamaica", "Antigua and Barbuda", "Barbados", "Trinidad and Tobago"],
  answerIndex: 1,
  explain: "Jamaica Kincaid was born in Antigua (now Antigua and Barbuda). Her writing explores identity, memory, and the lasting impacts of colonialism."
},
{
  question: "Which musical instrument was invented in Trinidad and Tobago and is now recognized worldwide?",
  choices: ["Steelpan", "Violin", "Guitar", "Saxophone"],
  answerIndex: 0,
  category: "Culture",
  explain: "The steelpan (steel drum) was invented in Trinidad and Tobago and is the only acoustic instrument created in the 20th century."
},
{
  question: "Callaloo, a popular Caribbean dish, is primarily made from what type of ingredient?",
  choices: [
    "Seafood",
    "Leafy greens",
    "Rice",
    "Breadfruit"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Callaloo is made from leafy greens such as dasheen bush or amaranth and varies across the Caribbean."
},
{
  question: "Breadfruit, now a Caribbean staple, originally came from which region?",
  choices: [
    "West Africa",
    "Southeast Asia and the Pacific",
    "Europe",
    "South America"
  ],
  answerIndex: 1,
  category: "History",
  explain: "Breadfruit was originally introduced from the Pacific as a cheap food source by the oppressors of enslaved people but became an important Caribbean food due to its versatility and nutritional value."
},
{
  question: "The Caribbean has given rise to many globally influential music genres. Which of the following is NOT a genre that originated in the Caribbean?",
  choices: ["Reggae", "Soca", "Hip-hop", "Calypso"],
  answerIndex: 2,
  category: "Culture",
  explain: "Reggae (Jamaica), soca (Trinidad and Tobago), and calypso (Trinidad and Tobago) all originated in the Caribbean. Hip-hop developed in the United States, though it was heavily influenced by Caribbean culture."
},
{
  question: "What is the national dish of Saint Kitts and Nevis?",
  choices: [
    "Goat water",
    "Stewed saltfish with spicy plantains, breadfruit, and coconut dumplings",
    "Pelau",
    "Callaloo"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "The national dish of Saint Kitts and Nevis is stewed saltfish served with spicy plantains, seasoned breadfruit, and coconut dumplings."
},
{
  question: "Caribbean Carnival is best understood as a celebration of what?",
  choices: [
    "Only European traditions",
    "Freedom, cultural expression, and community identity",
    "Military victories",
    "Agricultural exports"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival reflects freedom, creativity, and the blending of cultural traditions shaped by Caribbean history."
},
{
  question: "In Caribbean Carnival, what does “playing mas” mean?",
  choices: [
    "Watching performances from the audience",
    "Participating in costume and street celebrations",
    "Cooking traditional foods",
    "Performing only on stage"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "“Mas” comes from “masquerade” and refers to actively participating in Carnival festivities."
},
{
  question: "Calypso music, is known for doing what?",
  choices: [
    "Only instrumental performances",
    "Telling stories and commenting on society",
    "Being used only in religious ceremonies",
    "Focusing on classical music traditions"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Calypso music often uses humor and storytelling to comment on social and political issues."
},
{
  question: "Carnival costumes are best known for being:",
  choices: [
    "Simple and uniform",
    "Bright, creative, and expressive",
    "Only black and white",
    "Made only from natural fibers"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival costumes showcase creativity, color, and storytelling through design."
},
{
  question: "What role does Carnival play in Caribbean communities?",
  choices: [
    "It is only for tourists",
    "It is a major space for cultural expression, community, and creativity",
    "It is limited to schools only",
    "It replaces traditional culture"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival is deeply rooted in community life and cultural expression across the Caribbean."
}
];

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---- Score badges ----
// Tier thresholds are checked from the bottom up: the highest-min tier the
// score qualifies for wins. Colors are separate for on-page (Tailwind-ish
// hex) and canvas (drawn into the downloadable/shareable badge image).
type Tier = {
  key: string;
  min: number; // minimum fraction correct (0-1) to earn this tier
  label: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  emoji: string; // used inside the generated canvas image (icons aren't drawable there)
  from: string; // gradient start (on-page + canvas)
  to: string; // gradient end
  accent: string; // text/icon accent color
};

const TIERS: Tier[] = [
  {
    key: "learner",
    min: 0,
    label: "Curious Learner",
    blurb: "You're just getting started — try again to level up!",
    icon: Sprout,
    emoji: "🌱",
    from: "#DCEEFC",
    to: "#BFE0FA",
    accent: "#1D4E89",
  },
  {
    key: "explorer",
    min: 0.4,
    label: "Culture Explorer",
    blurb: "Solid instincts for Caribbean culture and history!",
    icon: Compass,
    emoji: "🧭",
    from: "#D6F5EA",
    to: "#AEE9CF",
    accent: "#0F7A55",
  },
  {
    key: "scholar",
    min: 0.7,
    label: "Island Scholar",
    blurb: "Impressive knowledge of the region!",
    icon: BookOpen,
    emoji: "📚",
    from: "#FFE8D2",
    to: "#FFD1A6",
    accent: "#B45B18",
  },
  {
    key: "master",
    min: 0.9,
    label: "Caribbean Trivia Master",
    blurb: "Outstanding! You really know your stuff.",
    icon: Trophy,
    emoji: "🏆",
    from: "#FFF3C4",
    to: "#FFE28A",
    accent: "#8A6300",
  },
];

function getTier(score: number, total: number): Tier {
  const pct = total > 0 ? score / total : 0;
  let result = TIERS[0];
  for (const tier of TIERS) {
    if (pct >= tier.min) result = tier;
  }
  return result;
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Draws a 1080x1080 shareable badge image and returns it as a PNG Blob.
async function buildBadgeImage(
  tier: Tier,
  score: number,
  total: number
): Promise<Blob | null> {
  const size = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background gradient in the tier's color
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, tier.from);
  bgGrad.addColorStop(1, tier.to);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // White "certificate" panel
  const pad = 64;
  ctx.save();
  ctx.shadowColor = "rgba(20,33,61,0.18)";
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 22;
  roundRectPath(ctx, pad, pad, size - pad * 2, size - pad * 2, 56);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  // Logo
  try {
    const logo = await loadImage("/InspiredLab.png");
    const logoSize = 92;
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, pad + 118, logoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      logo,
      size / 2 - logoSize / 2,
      pad + 118 - logoSize / 2,
      logoSize,
      logoSize
    );
    ctx.restore();
  } catch {
    // logo failed to load — continue without it
  }

  ctx.textAlign = "center";

  ctx.fillStyle = "#14213D";
  ctx.font = "600 30px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("InspirED Lab Trivia Challenge", size / 2, pad + 118 + 46 + 34);

  // Big emoji "icon" badge circle
  const iconCenterY = pad + 118 + 46 + 34 + 150;
  const iconRadius = 112;
  ctx.beginPath();
  ctx.arc(size / 2, iconCenterY, iconRadius, 0, Math.PI * 2);
  ctx.fillStyle = tier.from;
  ctx.fill();
  ctx.font = "120px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(tier.emoji, size / 2, iconCenterY + 8);
  ctx.textBaseline = "alphabetic";

  // Tier label
  ctx.fillStyle = tier.accent;
  ctx.font = "700 66px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(tier.label, size / 2, iconCenterY + iconRadius + 90);

  // Score
  ctx.fillStyle = "#14213D";
  ctx.font = "700 48px system-ui, -apple-system, Segoe UI, sans-serif";
  const scoreY = iconCenterY + iconRadius + 168;
  ctx.fillText(`${score} / ${total} correct`, size / 2, scoreY);

  // Decorative divider
  const dividerY = scoreY + 64;
  ctx.strokeStyle = tier.from;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(size / 2 - 90, dividerY);
  ctx.lineTo(size / 2 + 90, dividerY);
  ctx.stroke();

  // Footer
  ctx.fillStyle = "#46546F";
  ctx.font = "500 30px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("Think you can beat this?", size / 2, dividerY + 66);
  ctx.fillStyle = tier.accent;
  ctx.font = "700 32px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("inspiredlabskn.org", size / 2, dividerY + 112);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}

export function TriviaCard({ maxQuestions = 8 }: { maxQuestions?: number }) {
  const [round, setRound] = useState<TriviaQ[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const [badgeBlob, setBadgeBlob] = useState<Blob | null>(null);
  const [generatingBadge, setGeneratingBadge] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  useEffect(() => {
    setRound(shuffle(QUESTION_BANK).slice(0, maxQuestions));
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }, [maxQuestions]);

  // Feature-detect whether this browser can share image files (mobile Safari/
  // Chrome mostly) vs. only text/links (most desktop browsers).
  useEffect(() => {
    try {
      const probe = new File([""], "probe.png", { type: "image/png" });
      setCanShareFiles(
        typeof navigator !== "undefined" &&
          !!navigator.canShare &&
          navigator.canShare({ files: [probe] })
      );
    } catch {
      setCanShareFiles(false);
    }
  }, []);

  // Generate the shareable badge image once the round finishes.
  useEffect(() => {
    if (!done || round.length === 0) return;
    let cancelled = false;
    setGeneratingBadge(true);
    const tier = getTier(score, round.length);
    buildBadgeImage(tier, score, round.length).then((blob) => {
      if (cancelled) return;
      setGeneratingBadge(false);
      if (!blob) return;
      setBadgeBlob(blob);
      setBadgeUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Clean up the generated image URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (badgeUrl) URL.revokeObjectURL(badgeUrl);
    };
  }, [badgeUrl]);

  if (round.length === 0) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="p-6 sm:p-8">
          <div className="text-sm text-muted-foreground">Loading trivia...</div>
        </CardContent>
      </Card>
    );
  }

  const q = round[i];

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= round.length) {
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  }

  function restart() {
    setRound(shuffle(QUESTION_BANK).slice(0, maxQuestions));
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setBadgeBlob(null);
    setBadgeUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/#resources`
      : "#resources";

  const shareText = `I scored ${score}/${round.length} on the InspirED Lab trivia challenge! Test your knowledge of Caribbean culture, history, and science.`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    } catch {
      console.log("Copy failed");
    }
  }

  async function getOrBuildBadgeBlob(): Promise<Blob | null> {
    if (badgeBlob) return badgeBlob;
    const tier = getTier(score, round.length);
    return buildBadgeImage(tier, score, round.length);
  }

  async function downloadBadge() {
    const blob = await getOrBuildBadgeBlob();
    if (!blob) return;
    const tier = getTier(score, round.length);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inspired-lab-trivia-${tier.key}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function shareBadge() {
    const blob = await getOrBuildBadgeBlob();
    if (!blob) return;
    const file = new File([blob], "inspired-lab-trivia-badge.png", {
      type: "image/png",
    });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "InspirED Lab Trivia",
          text: shareText,
        });
        return;
      }
    } catch {
      // user cancelled, or the platform rejected it — fall back to a download
    }
    await downloadBadge();
  }

  return (
    <Card className="rounded-3xl bg-white">
      <CardHeader>
        <div className="text-xs text-muted-foreground">Trivia game</div>
        <CardTitle className="text-xl text-[oklch(var(--brand-navy))]">
          Test your knowledge!
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Score: {score}/{round.length}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {done ? (
          (() => {
            const tier = getTier(score, round.length);
            const TierIcon = tier.icon;
            return (
              <div className="space-y-4">
                <div className="text-base">
                  You finished the round! Final score:{" "}
                  <span className="font-semibold">{score}</span>/{round.length}
                </div>

                {/* Earned badge preview */}
                <div
                  className="rounded-3xl border p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5"
                  style={{
                    background: `linear-gradient(135deg, ${tier.from}, ${tier.to})`,
                    borderColor: `${tier.accent}33`,
                  }}
                >
                  {badgeUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={badgeUrl}
                      alt={`${tier.label} badge`}
                      className="h-28 w-28 rounded-2xl shadow-sm bg-white object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-white/70 flex items-center justify-center flex-shrink-0">
                      <TierIcon className="h-10 w-10" style={{ color: tier.accent }} />
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    <div
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: tier.accent }}
                    >
                      Your badge
                    </div>
                    <div className="text-xl font-semibold" style={{ color: tier.accent }}>
                      {tier.label}
                    </div>
                    <div className="text-sm text-foreground/80 mt-1">{tier.blurb}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {canShareFiles ? (
                    <Button
                      className="rounded-2xl"
                      onClick={shareBadge}
                      disabled={generatingBadge}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share badge image
                    </Button>
                  ) : null}

                  <Button
                    variant={canShareFiles ? "outline" : "default"}
                    className="rounded-2xl"
                    onClick={downloadBadge}
                    disabled={generatingBadge}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download badge
                  </Button>

                  <Button asChild variant="outline" className="rounded-2xl">
                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Share on Facebook
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={copyResult}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy result
                  </Button>

                  <Button onClick={restart} className="rounded-2xl">
                    Play again
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  For Instagram, TikTok, or texting a friend, use &ldquo;Share badge
                  image&rdquo; (or download it and attach it yourself) — Facebook&rsquo;s
                  button shares a link rather than the image itself.
                </div>
              </div>
            );
          })()
        ) : (
          <>
            <div className="text-xs text-muted-foreground">{q.category}</div>
            <div className="text-base font-medium">{q.question}</div>

            <div className="grid gap-2">
              {q.choices.map((c, idx) => {
                const isCorrect = picked !== null && idx === q.answerIndex;
                const isWrong = picked !== null && idx === picked && picked !== q.answerIndex;

                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => choose(idx)}
                    className={[
                      "w-full rounded-2xl border px-3 py-2 text-left text-sm transition",
                      picked === null ? "hover:bg-muted" : "",
                      isCorrect ? "border-emerald-400 bg-emerald-50" : "",
                      isWrong ? "border-rose-400 bg-rose-50" : "",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="rounded-2xl bg-[oklch(var(--brand-sky)/0.10)] p-3 text-sm">
                {picked === q.answerIndex ? "✅ Correct!" : "❌ Not quite."}
                {q.explain ? <div className="mt-1 text-muted-foreground">{q.explain}</div> : null}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground">
                Question {i + 1} of {round.length}
              </div>
              <Button
                onClick={next}
                className="rounded-2xl"
                disabled={picked === null}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
