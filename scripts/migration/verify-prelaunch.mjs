import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import * as cheerio from "cheerio";

const indexable = process.argv.includes("--indexable");
const base = "http://127.0.0.1:3108";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3108",
  ],
  { windowsHide: true, env: process.env },
);
let logs = "";
server.stdout.on("data", (data) => (logs += data));
server.stderr.on("data", (data) => (logs += data));
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw Error(logs);
    try {
      await fetch(base + "/robots.txt");
      break;
    } catch {
      if (attempt === 99) throw Error("Local server did not start");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  const inventory = await readJson("docs/migration/migration-inventory.json");
  const archiveRedirects = await readJson("src/data/insights/redirects.json");
  const redirects = [
    ...archiveRedirects,
    ...(await readJson("src/data/migration-redirects.json")),
    { source: "/insights/podcast", destination: "/inside-the-circle" },
    { source: "/about-jack-skeen", destination: "/about" },
    { source: "/all-testimonials", destination: "/success-stories" },
    { source: "/the-roadmap", destination: "/roadmap" },
    { source: "/roadmap/how-it-works", destination: "/roadmap" },
  ];
  const results = [];
  for (const path of ["/", "/roadmap", "/about", "/start"]) {
    const $ = cheerio.load(await (await fetch(base + path)).text());
    assert.equal(
      $("meta[name=robots]").attr("content")?.includes("noindex"),
      !indexable,
      path,
    );
  }
  for (const entry of inventory) {
    const path = entry.pathname;
    const response = await fetch(base + path, { redirect: "manual" });
    const isRedirect = redirects.some(
      (r) => r.source === path.replace(/\/$/, ""),
    );
    const expected = isRedirect
      ? 301
      : entry.migrationAction === "REMOVE"
        ? 404
        : 200;
    assert.equal(response.status, expected, `Legacy URL ${path}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const robots = $("meta[name=robots]")
      .map((i, e) => $(e).attr("content"))
      .get()
      .join(",");
    results.push({
      path,
      status: response.status,
      location: response.headers.get("location"),
      robots,
      action: isRedirect
        ? "REDIRECT"
        : expected === 404
          ? "REMOVE"
          : robots.includes("noindex")
            ? "NOINDEX"
            : "KEEP",
    });
  }
  for (const redirect of redirects)
    for (const suffix of ["", "/"]) {
      const response = await fetch(base + redirect.source + suffix, {
        redirect: "manual",
      });
      assert.equal(response.status, 301, redirect.source + suffix);
      const target = new URL(response.headers.get("location"), base);
      assert.equal(target.pathname + target.search, redirect.destination);
      assert.equal(
        (await fetch(target, { redirect: "manual" })).status,
        200,
        `Redirect chain or broken destination: ${redirect.source}`,
      );
    }
  for (const path of [
    "/not-a-real-launch-audit-page",
    "/inside-the-circle/not-a-person",
    "/insights/topics/not-a-topic",
    "/insights?page=9999",
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 404, `Hard 404 required: ${path}`);
    assert((await response.text()).includes("noindex"));
  }
  const robots = await (await fetch(base + "/robots.txt")).text();
  assert.equal(robots.includes("Disallow: /\n"), !indexable);
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(urls.length > 0, indexable);
  for (const url of urls) {
    assert.equal(new URL(url).origin, "https://jackskeen.com");
    const response = await fetch(base + new URL(url).pathname, {
      redirect: "manual",
    });
    assert.equal(response.status, 200, url);
    const $ = cheerio.load(await response.text());
    assert(!$("meta[name=robots]").attr("content")?.includes("noindex"), url);
    assert.equal($("link[rel=canonical]").attr("href"), url.replace(/\/$/, ""));
    assert(
      $("title").text() && $("meta[name=description]").attr("content"),
      url,
    );
    assert.equal($("h1").length, 1, url);
  }
  for (const path of [
    "/privacy",
    "/terms",
    "/work-with-jack/roadmap-discovery-group",
    "/roadmap-vault",
    "/insights?format=video",
    "/insights/topics/purpose",
  ]) {
    const $ = cheerio.load(await (await fetch(base + path)).text());
    assert($("meta[name=robots]").attr("content")?.includes("noindex"), path);
    assert(!urls.some((url) => new URL(url).pathname === path));
  }
  const pdf = await fetch(
    base + "/wp-content/uploads/2024/02/JSkeen-Speaker-One-Sheet.pdf",
  );
  assert.equal(pdf.status, 200);
  assert(pdf.headers.get("content-type").includes("application/pdf"));
  assert.equal(
    Buffer.from(await pdf.arrayBuffer())
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
  assert(!/NoFallbackError|Error:|\b500\b/.test(logs), logs);
  await writeFile(
    `docs/migration/prelaunch-${indexable ? "production" : "staging"}-verification.json`,
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        scope: "Local production build; no external account validation",
        indexable,
        sitemapEntries: urls.length,
        redirectVariants: redirects.length * 2,
        legacyUrls: results.length,
        runtimeErrors: false,
        results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `PASS: ${results.length} legacy URLs, ${redirects.length * 2} exact redirects, hard 404s, ${urls.length} sitemap entries, indexing policy, speaker PDF, and clean server logs.`,
  );
} finally {
  server.kill();
}
