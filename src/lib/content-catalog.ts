import inventory from "../../docs/migration/migration-inventory.json";

export type LegacyArticle = {
  pathname: string;
  title: string;
  author: string;
  publicationDate: string;
  updatedDate: string;
  topic: string;
  action: "KEEP" | "UPDATE";
  canonicalUrl: string;
  featuredImage: string;
  migrationNotes: string;
};

type InventoryRow = {
  pathname?: string;
  title?: string;
  author?: string;
  publicationDate?: string;
  updatedDate?: string;
  proposedPrimaryTopic?: string;
  migrationAction?: string;
  canonicalUrl?: string;
  featuredImage?: string;
  migrationNotes?: string;
  contentType?: string;
  proposedNewContentType?: string;
};

const articles = (inventory as InventoryRow[])
  .filter(
    (item) =>
      item.contentType === "post" &&
      item.proposedNewContentType === "article" &&
      (item.migrationAction === "KEEP" || item.migrationAction === "UPDATE") &&
      item.pathname &&
      item.title,
  )
  .map((item): LegacyArticle => ({
    pathname: item.pathname!,
    title: item.title!,
    author: item.author || "[Author confirmation required]",
    publicationDate: item.publicationDate || "",
    updatedDate: item.updatedDate || "",
    topic: item.proposedPrimaryTopic || "[Topic review required]",
    action: item.migrationAction as "KEEP" | "UPDATE",
    canonicalUrl: item.canonicalUrl || `https://jackskeen.com${item.pathname}`,
    featuredImage: item.featuredImage || "",
    migrationNotes: item.migrationNotes || "",
  }))
  .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));

export function getLegacyArticles() {
  return articles;
}

export function getLegacyArticle(pathname: string) {
  return articles.find((article) => article.pathname === pathname);
}

export function getArticlesByTopic(topic: string) {
  return articles.filter((article) => article.topic === topic);
}

export function formatArticleDate(value: string) {
  if (!value) return "[Publication date required]";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
