import type { Metadata } from "next";
import { topics } from "@/data/site-pages";
import { getLegacyArticles, type LegacyArticle } from "./content-catalog";
export type ArchiveSearch = Record<string, string | string[] | undefined>;
export function archiveQuery(params: ArchiveSearch) {
  return {
    q: typeof params.q === "string" ? params.q.trim().slice(0, 200) : "",
    format:
      typeof params.format === "string" &&
      ["article", "video"].includes(params.format)
        ? params.format
        : "",
    page: typeof params.page === "string" ? params.page : "1",
  };
}
export function archiveMetadata(
  params: ArchiveSearch,
  slug?: string,
): Metadata {
  const query = archiveQuery(params);
  const topic = topics.find((item) => item.slug === slug);
  const base = topic ? `/insights/topics/${topic.slug}` : "/insights";
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const filtered = Boolean(query.q || query.format);
  const canonical = !filtered && page > 1 ? `${base}?page=${page}` : base;
  const title = `${topic ? topic.title : "Insights"}${page > 1 ? ` — Page ${page}` : ""}${query.q ? " — Search" : query.format === "video" ? " — Videos" : query.format === "article" ? " — Articles" : ""}`;
  const description = topic
    ? `${topic.description} Explore Jack Skeen’s original writing and videos.`
    : "Explore Jack Skeen’s articles and original videos on purpose, leadership, relationships, personal growth, and a more fulfilling life.";
  const image = getLegacyArticles().find(
    (article) =>
      article.pathname === "/discovering-your-unique-gift-to-the-world",
  )?.image;
  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !filtered && process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: image
        ? [{ url: image.src, width: image.width, height: image.height }]
        : undefined,
    },
  };
}
export function articleMetadata(article: LegacyArticle): Metadata {
  const images = article.image
    ? [
        {
          url: article.image.src,
          width: article.image.width,
          height: article.image.height,
          alt: article.image.alt,
        },
      ]
    : undefined;
  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: article.canonicalUrl },
    robots: {
      index: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
      follow: true,
    },
    authors: [{ name: article.author, url: "/about" }],
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url: article.canonicalUrl,
      type: "article",
      publishedTime: article.publicationDateGmt,
      modifiedTime: article.updatedDateGmt,
      authors: [article.author],
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: article.seoTitle,
      description: article.description,
      images: images?.map((image) => image.url),
    },
  };
}
