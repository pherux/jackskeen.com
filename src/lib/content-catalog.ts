import records from "@/data/insights/articles.json";
import { topics } from "@/data/site-pages";
import type { PortableTextBlock } from "next-sanity";
export type ArticleImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
export type ArchiveVideo = {
  id: string;
  title: string;
  description: string;
  duration: number;
  publishedAt: string;
  available: boolean;
  sourceUrl: string;
};
export type LegacyArticle = {
  noIndex?: boolean;
  body?: PortableTextBlock[];
  migrated?: boolean;
  id: number;
  originalPostId: number;
  pathname: string;
  title: string;
  author: string;
  publicationDate: string;
  publicationDateGmt: string;
  updatedDate: string;
  updatedDateGmt: string;
  topic: string;
  kind: "article" | "video";
  canonicalUrl: string;
  originalCanonicalUrl: string;
  excerpt: string;
  description: string;
  seoTitle: string;
  bodyHtml: string;
  image: ArticleImage | null;
  video: ArchiveVideo | null;
  readMinutes: number;
  sourceHash: string;
};
const articles = records as LegacyArticle[];
export async function getLegacyArticles(): Promise<LegacyArticle[]> {
  if (process.env.ARTICLE_SOURCE !== "sanity") return articles;
  const { getSanityArticles } = await import("./sanity/articles");
  return getSanityArticles();
}
export async function getLegacyArticle(pathname: string) {
  return (await getLegacyArticles()).find(
    (article) => article.pathname === pathname.replace(/\/$/, ""),
  );
}
export async function getArticlesByTopic(topic: string) {
  return (await getLegacyArticles()).filter(
    (article) => article.topic === topic,
  );
}
export function getArticleTopic(article: LegacyArticle) {
  return topics.find((topic) => topic.title === article.topic)!;
}
export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value.slice(0, 10)}T12:00:00Z`));
}
export async function getRelatedArticles(article: LegacyArticle) {
  return (await getLegacyArticles())
    .filter((other) => other.pathname !== article.pathname)
    .sort(
      (a, b) =>
        Number(b.topic === article.topic) - Number(a.topic === article.topic),
    )
    .slice(0, 3);
}
