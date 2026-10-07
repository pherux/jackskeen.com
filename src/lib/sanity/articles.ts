import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import type { PortableTextBlock } from "next-sanity";
import { ARCHIVE_QUERY } from "../../../sanity/queries/archive";
import { client } from "./client";
import { isSanityConfigured } from "../../../sanity/lib/env";
import snapshot from "@/data/insights/articles.json";
import { topics, sitePages } from "@/data/site-pages";
import { canonicalOrigin } from "@/lib/indexing";
import archiveRedirects from "@/data/insights/redirects.json";
import migrationRedirects from "@/data/migration-redirects.json";
import legacyPages from "@/data/legacy-pages.json";
import type { LegacyArticle } from "@/lib/content-catalog";

type ArticleRecord = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: PortableTextBlock[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  topic: string;
  wordpressId?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  image?: {
    src?: string;
    width?: number;
    height?: number;
    alt?: string;
    caption?: string;
  };
};

// Sanity becomes authoritative only after an explicit cutover. Never resurrect
// unpublished records by merging the local snapshot into a successful CMS result.
export const getSanityArticles = cache(async (): Promise<LegacyArticle[]> => {
  if (!isSanityConfigured)
    throw new Error("ARTICLE_SOURCE=sanity requires Sanity configuration.");
  const { isEnabled } = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;
  if (isEnabled && !token)
    throw new Error("Draft preview requires a Sanity read token.");
  const documents = await client
    .withConfig({ useCdn: false, token })
    .fetch<ArticleRecord[]>(
      ARCHIVE_QUERY,
      {},
      {
        perspective: isEnabled ? "drafts" : "published",
        cache: "no-store",
        stega: false,
      },
    );
  const paths = new Set<string>();
  return documents.map((doc) => {
    const original = (snapshot as LegacyArticle[]).find(
      (entry) => entry.originalPostId === doc.wordpressId,
    );
    const pathname = `/${doc.slug}`;
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug) ||
      paths.has(pathname) ||
      sitePages.some((page) => page.path === pathname) ||
      ["/studio", "/api", "/inside-the-circle", "/roadmap-vault"].includes(
        pathname,
      )
    ) {
      throw new Error(`Conflicting or invalid article route: ${pathname}`);
    }
    paths.add(pathname);
    if (
      [...archiveRedirects, ...migrationRedirects].some(
        (redirect) => redirect.source === pathname,
      ) ||
      legacyPages.some((page) => page.pathname === pathname)
    )
      throw new Error(`Reserved article route: ${pathname}`);
    if (original && pathname !== original.pathname)
      throw new Error(`Migrated article URL changed: ${original.pathname}`);
    if (
      !doc.title ||
      !doc.author ||
      !doc.excerpt ||
      !topics.some((topic) => topic.title === doc.topic) ||
      !Number.isFinite(Date.parse(doc.publishedAt)) ||
      (!original && !doc.body?.length)
    ) {
      throw new Error(`Incomplete article: ${doc._id}`);
    }
    const image =
      doc.image?.src && doc.image.width && doc.image.height
        ? {
            src: doc.image.src,
            width: doc.image.width,
            height: doc.image.height,
            alt: doc.image.alt || "",
            caption: doc.image.caption || "",
          }
        : original?.image || null;
    const canonicalUrl =
      doc.seo?.canonicalUrl || `${canonicalOrigin}${pathname}`;
    const canonical = new URL(canonicalUrl);
    if (canonical.protocol !== "https:")
      throw new Error(`Invalid canonical: ${doc._id}`);
    return {
      id: original?.id ?? 0,
      originalPostId: doc.wordpressId ?? 0,
      pathname,
      title: doc.title,
      author: doc.author,
      topic: doc.topic,
      publicationDate: original?.publicationDate || doc.publishedAt,
      publicationDateGmt: original?.publicationDateGmt || doc.publishedAt,
      updatedDate: doc.updatedAt || original?.updatedDate || doc.publishedAt,
      updatedDateGmt:
        doc.updatedAt || original?.updatedDateGmt || doc.publishedAt,
      kind: original?.kind || "article",
      canonicalUrl,
      originalCanonicalUrl: original?.originalCanonicalUrl || canonicalUrl,
      excerpt: doc.excerpt,
      description: doc.seo?.metaDescription || doc.excerpt,
      seoTitle: doc.seo?.metaTitle || doc.title,
      body: doc.body?.length ? doc.body : undefined,
      bodyHtml: original?.bodyHtml || "",
      image,
      video: original?.video || null,
      readMinutes: original?.readMinutes || 1,
      sourceHash: original?.sourceHash || "",
      noIndex:
        isEnabled ||
        doc.seo?.noIndex ||
        canonicalUrl !== `${canonicalOrigin}${pathname}`,
      migrated: Boolean(original),
    };
  });
});
