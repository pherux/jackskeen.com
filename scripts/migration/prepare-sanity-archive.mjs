import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

// Offline, repeatable export. Import/review/publish in Sanity is deferred.
const articles = JSON.parse(
  await readFile("src/data/insights/articles.json", "utf8"),
);
const documents = [];
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
for (const author of new Set(articles.map((article) => article.author))) {
  documents.push({
    _id: `drafts.archive-author-${slugify(author)}`,
    _type: "person",
    name: author,
    slug: { _type: "slug", current: slugify(author) },
    shortBio: `Author of the original articles in this archive.`,
  });
}
for (const topic of new Set(articles.map((article) => article.topic))) {
  documents.push({
    _id: `drafts.archive-topic-${slugify(topic)}`,
    _type: "topic",
    title: topic,
    slug: { _type: "slug", current: slugify(topic) },
    shortDescription: `Original articles and videos on ${topic.toLowerCase()}.`,
  });
}
for (const article of articles) {
  documents.push({
    _id: `drafts.archive-article-${article.originalPostId}`,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.pathname.slice(1) },
    excerpt: article.excerpt,
    author: {
      _type: "reference",
      _ref: `archive-author-${slugify(article.author)}`,
    },
    primaryTopic: {
      _type: "reference",
      _ref: `archive-topic-${slugify(article.topic)}`,
    },
    publishedAt: article.publicationDateGmt,
    updatedAt: article.updatedDateGmt,
    seo: {
      _type: "seo",
      metaTitle: article.seoTitle,
      metaDescription: article.description,
      noIndex: false,
    },
    migration: {
      _type: "migrationMetadata",
      wordpressId: article.originalPostId,
      legacyUrl: `https://jackskeen.com${article.pathname}`,
      legacyCanonicalUrl: article.originalCanonicalUrl,
      legacyAuthor: article.author,
      migrationAction: "KEEP",
      manualReviewRequired: false,
      notes: `Original body/media retained in the version-controlled archive. SHA256: ${article.sourceHash}. Leave body empty to preserve it. Do not change this migrated slug.`,
    },
  });
}
assert.equal(
  new Set(documents.map((doc) => doc._id)).size,
  documents.length,
  "Duplicate document IDs",
);
assert.equal(documents.filter((doc) => doc._type === "article").length, 113);
await mkdir("sanity/seed", { recursive: true });
await writeFile(
  "sanity/seed/archive.ndjson",
  documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
);
console.log(
  `Prepared ${documents.length} draft documents (${articles.length} archive entries). No remote changes.`,
);
