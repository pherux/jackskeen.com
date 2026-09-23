import assert from "node:assert/strict";
import { readFile, writeFile, access } from "node:fs/promises";
import * as cheerio from "cheerio";
import sharp from "sharp";
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const articles = await readJson("src/data/insights/articles.json");
const redirects = await readJson("src/data/insights/redirects.json");
const decisions = await readJson("docs/migration/insights/decisions.json");
const base = process.env.VERIFY_BASE_URL || "http://localhost:3000";
const sourceAvailable = await access(
  ".migration-cache/insights/posts.json",
).then(
  () => true,
  () => false,
);
const source = sourceAvailable
  ? await readJson(".migration-cache/insights/posts.json")
  : [];
if (sourceAvailable)
  source.push(await readJson(".migration-cache/insights/independence.json"));
assert.equal(decisions.length, 115);
assert.equal(new Set(decisions.map((item) => item.wordpressId)).size, 115);
assert.equal(articles.length, 113);
assert.equal(
  new Set(articles.map((item) => item.pathname)).size,
  articles.length,
);
assert.equal(
  new Set(articles.map((item) => item.description)).size,
  articles.length,
);
const titles = new Set();
const links = new Set();
const reports = [];
function originalText(html) {
  const $ = cheerio.load(html);
  $(
    "script,style,form,button,input,object,embed,iframe,link,meta,svg",
  ).remove();
  return $.text().replace(/\s+/g, "");
}
for (const article of articles) {
  assert(
    !/<(?:script|style|iframe|form|input|object|embed)\b|\son\w+\s*=|javascript:/i.test(
      article.bodyHtml,
    ),
    `Unsafe HTML: ${article.pathname}`,
  );
  if (sourceAvailable) {
    const original = source.find((post) => post.id === article.id);
    assert(original, `Missing original ${article.id}`);
    assert.equal(
      originalText(article.bodyHtml),
      originalText(original.content.rendered),
      `Editorial text changed: ${article.pathname}`,
    );
    assert.equal(article.publicationDate, original.date);
  }
  if (article.image) {
    const info = await sharp(`public${article.image.src}`).metadata();
    assert.equal(info.width, article.image.width);
    assert.equal(info.height, article.image.height);
  }
  const response = await fetch(base + article.pathname);
  assert.equal(response.status, 200, article.pathname);
  const $ = cheerio.load(await response.text());
  assert.equal($("h1").length, 1);
  assert.equal($("h1").text(), article.title);
  assert.equal($("link[rel=canonical]").attr("href"), article.canonicalUrl);
  assert.equal(
    $("meta[name=description]").attr("content"),
    article.description,
  );
  assert(
    !titles.has($("title").text()),
    `Duplicate title: ${article.pathname}`,
  );
  titles.add($("title").text());
  assert.equal(
    $(".insight-byline time").attr("datetime"),
    article.publicationDateGmt,
  );
  assert.equal($(".insight-byline a").text(), `By ${article.author}`);
  assert(
    !/awaiting reviewed CMS migration|Article body awaiting/.test(
      $("main").text(),
    ),
  );
  if (article.kind === "article")
    assert.equal(
      originalText($(".insight-prose").html()),
      originalText(article.bodyHtml),
    );
  if (article.video) assert.equal($(".circle-player button").length, 1);
  const schema = JSON.parse(
    $("script[type='application/ld+json']").first().text(),
  )["@graph"];
  assert(schema.some((item) => item["@type"] === "BreadcrumbList"));
  const data = schema.find(
    (item) => item["@id"] === article.canonicalUrl + "#article",
  );
  assert.equal(data.datePublished, article.publicationDateGmt);
  if (article.video)
    assert(
      schema.some(
        (item) =>
          item["@type"] === "VideoObject" &&
          item.embedUrl.endsWith(article.video.id),
      ),
    );
  $(".insight-prose a[href^='/']").each((i, element) =>
    links.add($(element).attr("href")),
  );
  let heading = 1;
  $(".insight-prose h2,.insight-prose h3,.insight-prose h4").each(
    (i, element) => {
      const level = Number(element.tagName.slice(1));
      assert(
        level <= heading + 1,
        `Heading jump: ${article.pathname} h${heading} to h${level}`,
      );
      heading = level;
    },
  );
  reports.push({
    path: article.pathname,
    status: response.status,
    kind: article.kind,
    image: Boolean(article.image),
  });
}
for (const link of links) {
  const response = await fetch(base + link);
  assert.equal(response.status, 200, `Broken internal article link: ${link}`);
}
for (const redirect of redirects)
  for (const slash of ["", "/"]) {
    const response = await fetch(base + redirect.source + slash, {
      redirect: "manual",
    });
    assert.equal(response.status, 301, redirect.source + slash);
    assert.equal(
      new URL(response.headers.get("location"), base).pathname,
      new URL(redirect.destination, base).pathname,
    );
    const target = await fetch(new URL(redirect.destination, base));
    assert.equal(target.status, 200);
  }
const discovered = new Set();
for (let page = 1; page <= 8; page++) {
  const response = await fetch(base + `/insights?page=${page}`);
  assert.equal(response.status, 200);
  const $ = cheerio.load(await response.text());
  $("#archive .insight-card-link").each((i, element) =>
    discovered.add($(element).attr("href")),
  );
}
assert.equal(
  discovered.size,
  articles.length,
  "Every migrated page must be reachable through pagination",
);
const videos = cheerio.load(
  await (await fetch(base + "/insights?format=video")).text(),
);
assert.equal(videos("#archive .insight-card").length, 10);
assert(videos("meta[name=robots]").attr("content").includes("noindex"));
const empty = cheerio.load(
  await (await fetch(base + "/insights?q=zzzznomatch123")).text(),
);
assert.equal(empty(".insight-empty").length, 1);
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const article of articles)
  assert(
    sitemap.includes(`<loc>${article.canonicalUrl}</loc>`),
    `Sitemap: ${article.pathname}`,
  );
for (const redirect of redirects)
  assert(
    !sitemap.includes(`<loc>https://jackskeen.com${redirect.source}</loc>`),
    `Redirect in sitemap: ${redirect.source}`,
  );
// Next.js may already have streamed the loading shell before a query-dependent
// notFound(). Require the actual not-found content and noindex, not a guessed status.
const invalidHtml = await (await fetch(base + "/insights?page=9999")).text();
const invalidPage = cheerio.load(invalidHtml);
assert(invalidHtml.includes("NEXT_HTTP_ERROR_FALLBACK;404"));
assert(invalidHtml.includes("Page not found"));
assert(
  invalidPage("meta[name=robots]")
    .toArray()
    .some((element) =>
      invalidPage(element).attr("content").includes("noindex"),
    ),
);
const unknownTopic = await (await fetch(base + "/insights/topics/not-a-topic")).text();
assert(unknownTopic.includes("NEXT_HTTP_ERROR_FALLBACK;404"));
assert(unknownTopic.includes("Page not found"));
assert(cheerio.load(unknownTopic)("meta[name=robots]").attr("content").includes("noindex"));
await writeFile(
  "docs/migration/insights/verification.json",
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      base,
      pages: articles.length,
      sourceTextCompared: sourceAvailable,
      internalLinks: links.size,
      redirectVariants: redirects.length * 2,
      paginatedDiscovery: discovered.size,
      results: reports,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `PASS: ${articles.length} pages; original text/dates; local images; metadata/schema; ${links.size} body links; ${redirects.length * 2} exact redirect variants; complete paginated discovery; filters; 404s.`,
);
