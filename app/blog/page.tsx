import Link from "next/link";
import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { TopNav, Footer } from "@/components/InspiredLabCommunitySite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPublishedPosts } from "@/lib/notion";

// Re-checks Notion for new or edited posts every 5 minutes, so publishing
// or editing a post in Notion shows up here without a redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | InspirED Lab",
  description:
    "Stories, updates and hands-on science from InspirED Lab's classrooms and community programs in Saint Kitts & Nevis.",
};

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopNav />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 space-y-10">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Badge className="rounded-full bg-white text-black border border-border">Blog</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Stories from InspirED Lab
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Updates, reflections and hands-on science from our classrooms and community programs.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-2xl">
              New posts are on the way — check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden rounded-2xl py-0 transition hover:shadow-md hover:-translate-y-0.5">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt="" className="h-44 w-full object-cover" />
                    ) : null}
                    <CardHeader className="pt-6">
                      {post.date ? (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.date)}
                        </div>
                      ) : null}
                      <CardTitle className="text-lg group-hover:text-[oklch(var(--brand-orange))] transition">
                        {post.title}
                      </CardTitle>
                      {post.excerpt ? <CardDescription>{post.excerpt}</CardDescription> : null}
                    </CardHeader>
                    {post.author ? (
                      <CardContent className="pb-6 text-sm text-muted-foreground">
                        By {post.author}
                      </CardContent>
                    ) : null}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
