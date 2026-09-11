import { Fragment, type ReactNode } from "react";
import type { RichTextItemResponse } from "@notionhq/client";
import type { NotionBlock } from "@/lib/notion";

function RichText({ richText }: { richText: RichTextItemResponse[] }) {
  return (
    <>
      {richText.map((t, i) => {
        let node: ReactNode = t.plain_text;
        if (t.annotations.code) {
          node = (
            <code className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]">
              {node}
            </code>
          );
        }
        if (t.annotations.bold) node = <strong>{node}</strong>;
        if (t.annotations.italic) node = <em>{node}</em>;
        if (t.annotations.strikethrough) node = <span className="line-through">{node}</span>;
        if (t.annotations.underline) node = <span className="underline">{node}</span>;

        const href = t.type === "text" ? t.text.link?.url : undefined;
        if (href) {
          node = (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[oklch(var(--brand-orange))] underline underline-offset-2 hover:opacity-80"
            >
              {node}
            </a>
          );
        }

        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      if (block.paragraph.rich_text.length === 0) return <div className="h-4" aria-hidden="true" />;
      return (
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-10 mb-3">
          <RichText richText={block.heading_1.rich_text} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mt-8 mb-3">
          <RichText richText={block.heading_2.rich_text} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="text-lg sm:text-xl font-semibold tracking-tight mt-6 mb-2">
          <RichText richText={block.heading_3.rich_text} />
        </h4>
      );
    case "bulleted_list_item":
      return (
        <li className="ml-5 list-disc text-base sm:text-lg leading-relaxed text-foreground/90">
          <RichText richText={block.bulleted_list_item.rich_text} />
          {block.children ? <BlockList blocks={block.children} /> : null}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="ml-5 list-decimal text-base sm:text-lg leading-relaxed text-foreground/90">
          <RichText richText={block.numbered_list_item.rich_text} />
          {block.children ? <BlockList blocks={block.children} /> : null}
        </li>
      );
    case "to_do":
      return (
        <li className="ml-5 flex items-start gap-2 list-none text-base sm:text-lg leading-relaxed text-foreground/90">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mt-1.5 h-4 w-4 rounded border-border"
          />
          <span className={block.to_do.checked ? "line-through text-muted-foreground" : undefined}>
            <RichText richText={block.to_do.rich_text} />
          </span>
        </li>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-[oklch(var(--brand-orange))] pl-4 italic text-foreground/80 my-4">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    case "divider":
      return <hr className="my-8 border-border" />;
    case "image": {
      const src = block.image.type === "external" ? block.image.external.url : block.image.file.url;
      const caption = block.image.caption.map((t) => t.plain_text).join("");
      return (
        <figure className="my-6">
          {/* Notion-hosted images live at expiring, arbitrary domains — plain <img> avoids next/image's remote-domain allowlist. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption || ""} className="w-full rounded-xl border border-border" />
          {caption ? (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">{caption}</figcaption>
          ) : null}
        </figure>
      );
    }
    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-xl bg-muted p-4 text-sm">
          <code>
            <RichText richText={block.code.rich_text} />
          </code>
        </pre>
      );
    case "callout":
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-border bg-[oklch(var(--brand-sky)/0.10)] p-4">
          <span aria-hidden="true">
            {block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "💡"}
          </span>
          <div className="text-base leading-relaxed text-foreground/90">
            <RichText richText={block.callout.rich_text} />
          </div>
        </div>
      );
    default:
      // Unsupported block types (embeds, databases, etc.) are skipped
      // rather than breaking the page.
      return null;
  }
}

// Groups consecutive list-item blocks into a single <ul>/<ol> so the
// rendered markup is semantically correct, then renders everything else
// (headings, images, quotes…) as its own block.
function BlockList({ blocks }: { blocks: NotionBlock[] }) {
  const nodes: ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item" || block.type === "to_do") {
      const type = block.type;
      const group: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === type) {
        group.push(blocks[i]);
        i++;
      }
      const Tag = type === "numbered_list_item" ? "ol" : "ul";
      nodes.push(
        <Tag key={block.id} className="my-3 space-y-1">
          {group.map((b) => (
            <Block key={b.id} block={b} />
          ))}
        </Tag>
      );
      continue;
    }

    nodes.push(<Block key={block.id} block={block} />);
    i++;
  }

  return <>{nodes}</>;
}

export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  if (blocks.length === 0) return null;
  return (
    <div className="space-y-1">
      <BlockList blocks={blocks} />
    </div>
  );
}
