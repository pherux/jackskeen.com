import type { MetadataRoute } from "next";

import { sitePages, topics } from "@/data/site-pages";
import { getLegacyArticles } from "@/lib/content-catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jackskeen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const strategic = ["/", ...sitePages.map((page) => page.path)];
  const topicPaths = topics.map((topic) => `/insights/topics/${topic.slug}`);
  const legacy = getLegacyArticles().map((article) => ({
    url: new URL(article.pathname, siteUrl).toString(),
    lastModified: article.updatedDate || article.publicationDate || undefined,
  }));

  return [
    ...[...strategic, ...topicPaths].map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...legacy,
  ];
}
