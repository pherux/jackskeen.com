import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

// Exercise the actual adapter with an in-memory Sanity transport. No accounts,
// credentials, or published documents are changed by these lifecycle tests.
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const snapshot = await readJson("src/data/insights/articles.json");
const code = ts.transpileModule(
  await readFile("src/lib/sanity/articles.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  },
).outputText;
const source = snapshot[0];
const record = {
  _id: "test-article",
  title: source.title,
  slug: source.pathname.slice(1),
  excerpt: source.excerpt,
  author: source.author,
  topic: source.topic,
  publishedAt: source.publicationDateGmt,
  wordpressId: source.originalPostId,
};
let records = [record],
  draft = false,
  options,
  error;
const mockClient = {
  withConfig() {
    return this;
  },
  async fetch(query, params, request) {
    options = request;
    if (error) throw error;
    return records;
  },
};
const dependencies = {
  "server-only": {},
  react: { cache: (fn) => fn },
  "next/headers": { draftMode: async () => ({ isEnabled: draft }) },
  "./client": { client: mockClient },
  "../../../sanity/lib/env": { isSanityConfigured: true },
  "../../../sanity/queries/archive": { ARCHIVE_QUERY: "test-query" },
  "@/data/insights/articles.json": snapshot,
  "@/data/site-pages": {
    topics: [...new Set(snapshot.map((x) => x.topic))].map((title) => ({
      title,
    })),
    sitePages: [{ path: "/roadmap" }],
  },
  "@/lib/indexing": { canonicalOrigin: "https://jackskeen.com" },
  "@/data/insights/redirects.json": await readJson(
    "src/data/insights/redirects.json",
  ),
  "@/data/migration-redirects.json": await readJson(
    "src/data/migration-redirects.json",
  ),
  "@/data/legacy-pages.json": await readJson("src/data/legacy-pages.json"),
};
const exports = {};
vm.runInNewContext(code, {
  exports,
  require(name) {
    assert(name in dependencies, name);
    return dependencies[name];
  },
  process: { env: { SANITY_API_READ_TOKEN: "test-only-token" } },
  URL,
  console,
});
const load = exports.getSanityArticles;
let articles = await load();
assert.equal(articles.length, 1);
assert.equal(articles[0].bodyHtml, source.bodyHtml);
assert.equal(articles[0].publicationDateGmt, source.publicationDateGmt);
assert.equal(options.perspective, "published");
assert.equal(options.cache, "no-store");
records = [
  {
    ...record,
    title: "Edited title",
    body: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Approved editorial update", marks: [] },
        ],
      },
    ],
  },
];
articles = await load();
assert.equal(articles[0].title, "Edited title");
assert.equal(articles[0].body[0].children[0].text, "Approved editorial update");
draft = true;
articles = await load();
assert.equal(options.perspective, "drafts");
assert.equal(articles[0].noIndex, true);
draft = false;
records = [];
assert.equal(
  (await load()).length,
  0,
  "Unpublished records must not return from the local snapshot",
);
records = [{ ...record, slug: "moved-without-redirect" }];
await assert.rejects(load, /Migrated article URL changed/);
records = [{ ...record, wordpressId: undefined, slug: "roadmap" }];
await assert.rejects(load, /Conflicting/);
records = [record, record];
await assert.rejects(load, /Conflicting/);
records = [
  {
    ...record,
    wordpressId: undefined,
    slug: "new-entry",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "New article", marks: [] }],
      },
    ],
  },
];
assert.equal((await load())[0].pathname, "/new-entry");
error = Error("CMS unavailable");
await assert.rejects(load, /CMS unavailable/);
console.log(
  "PASS: archive preservation, editorial update, draft isolation, unpublish, new routes, collision validation, and CMS failure behavior.",
);
