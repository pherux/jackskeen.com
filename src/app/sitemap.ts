import type { MetadataRoute } from "next";
import { getLegacyArticles } from "@/lib/content-catalog";
import { podcastEpisodes, episodePath } from "@/data/podcast";
import { canonicalOrigin, launchPages, siteIsIndexable } from "@/lib/indexing";
import legacyPages from "@/data/legacy-pages.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteIsIndexable()) return [];
  const strategic = [
    ...launchPages,
    ...podcastEpisodes.map(episodePath),
    ...legacyPages
      .filter((page) => !page.deferredSignup)
      .map((page) => page.pathname),
  ];
  const articles = (await getLegacyArticles()).filter(
    (article) => !article.noIndex,
  );
  return [
    ...strategic.map((path) => ({
      url: new URL(path, canonicalOrigin).toString(),
    })),
    ...articles.map((article) => ({
      url: article.canonicalUrl,
      lastModified: article.updatedDateGmt || article.publicationDateGmt,
    })),
  ];
}
