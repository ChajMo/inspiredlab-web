import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar } from "lucide-react";
import { TopNav, Footer } from "@/components/InspiredLabCommunitySite";
import { NotionRenderer } from "@/components/notion/NotionRenderer";
import { getPostBySlug, getPublishedPosts } from "@/lib/notion";

// Re-checks Notion for edits to this post every 5 minutes, so an update in
// Notion shows up here without a redeploy.
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-renders every published post at build time; a post added after the
// last deploy still works — it's just rendered (and then cached) on its
// first visit instead of ahead of time.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | InspirED Lab Blog`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopNav />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="space-y-3 mb-8">
            {post.date || post.author ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {post.date ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date)}
                  </span>
                ) : null}
                {post.author ? <span>By {post.author}</span> : null}
              </div>
            ) : null}
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{post.title}</h1>
          </div>

          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="w-full rounded-2xl border border-border mb-10"
            />
          ) : null}

          <NotionRenderer blocks={post.blocks} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
