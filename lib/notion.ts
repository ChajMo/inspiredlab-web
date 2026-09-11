import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// If the Notion env vars aren't set (e.g. a local build without them, or
// before Vercel is configured), every function below returns an empty
// result instead of throwing — the rest of the site keeps working and the
// blog just shows "no posts yet" until the vars are added.
const notion = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string | null;
  excerpt: string;
  author: string;
  coverImage: string | null;
};

export type NotionBlock = BlockObjectResponse & {
  children?: NotionBlock[];
};

export type BlogPostWithBody = BlogPost & {
  blocks: NotionBlock[];
};

export function plainText(richText: RichTextItemResponse[] | undefined): string {
  return (richText ?? []).map((t) => t.plain_text).join("");
}

function pageToPost(page: PageObjectResponse): BlogPost | null {
  const props = page.properties;

  const titleProp = props["Name"];
  const title = titleProp?.type === "title" ? plainText(titleProp.title) : "";

  const slugProp = props["Slug"];
  const slug =
    slugProp?.type === "rich_text" ? plainText(slugProp.rich_text) : "";

  // A post without a title or slug is an incomplete draft — skip it rather
  // than let it break the listing or produce an unreachable blank page.
  if (!title || !slug) return null;

  const dateProp = props["Date"];
  const date = dateProp?.type === "date" ? dateProp.date?.start ?? null : null;

  const excerptProp = props["Excerpt"];
  const excerpt =
    excerptProp?.type === "rich_text" ? plainText(excerptProp.rich_text) : "";

  const authorProp = props["Author"];
  const author = authorProp?.type === "select" ? authorProp.select?.name ?? "" : "";

  const coverImage =
    page.cover?.type === "external"
      ? page.cover.external.url
      : page.cover?.type === "file"
        ? page.cover.file.url
        : null;

  return { id: page.id, slug, title, date, excerpt, author, coverImage };
}

// A database created in the Notion UI has exactly one data source, but the
// 2025-09-03 API queries that data source directly rather than the database
// itself, so every query needs its id first. Cached per server instance —
// it's effectively permanent for a given database.
let cachedDataSourceId: string | null | undefined;

async function getDataSourceId(): Promise<string | null> {
  if (!notion || !NOTION_DATABASE_ID) return null;
  if (cachedDataSourceId !== undefined) return cachedDataSourceId;

  const database = await notion.databases.retrieve({
    database_id: NOTION_DATABASE_ID,
  });
  cachedDataSourceId =
    "data_sources" in database ? database.data_sources[0]?.id ?? null : null;
  return cachedDataSourceId;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!notion) return [];
  const dataSourceId = await getDataSourceId();
  if (!dataSourceId) return [];

  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
      start_cursor: cursor,
    });
    pages.push(...response.results.filter(isFullPage));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages.map(pageToPost).filter((p): p is BlogPost => p !== null);
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithBody | null> {
  if (!notion) return null;
  const dataSourceId = await getDataSourceId();
  if (!dataSourceId) return null;

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
    page_size: 1,
  });

  const page = response.results.find(isFullPage);
  if (!page) return null;

  const post = pageToPost(page);
  if (!post) return null;

  const blocks = await getBlockChildren(page.id);
  return { ...post, blocks };
}

// Notion's blocks API returns one level at a time, so nested content (a
// bullet inside a bullet, a paragraph inside a toggle) needs a follow-up
// fetch per block that has children. Blog posts are simple, so this rarely
// recurses more than a level or two deep.
async function getBlockChildren(blockId: string): Promise<NotionBlock[]> {
  if (!notion) return [];

  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    for (const block of response.results) {
      if (!isFullBlock(block)) continue;
      const withChildren: NotionBlock = { ...block };
      if (block.has_children) {
        withChildren.children = await getBlockChildren(block.id);
      }
      blocks.push(withChildren);
    }
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}
