import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";

const ORIGIN = "https://jackskeen.com";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CACHE_DIR = resolve(ROOT, ".migration-cache");
const OUTPUT_DIR = resolve(ROOT, "docs/migration");
const FIRECRAWL_MAP = resolve(ROOT, ".firecrawl/map.json");
const USER_AGENT =
  "Mozilla/5.0 (compatible; JackSkeenMigrationAudit/1.0; +https://jackskeen.com)";

const TOPICS = [
  "Purpose",
  "Success & Fulfillment",
  "Leadership",
  "Personal Growth",
  "Relationships",
  "Your Genius",
  "Circle Blueprint",
  "Reflections",
];

const RESERVED_PATH_REDIRECTS = new Map([
  ["/the-roadmap/", "/roadmap"],
  ["/about-jack-skeen/", "/about"],
  ["/executive-coaching/", "/work-with-jack/executive-coaching"],
  ["/corporate-solutions/", "/work-with-jack/corporate"],
  ["/roadmap-essentials/", "/work-with-jack/roadmap-essentials"],
  ["/all-testimonials/", "/success-stories"],
  ["/blog/", "/insights/articles"],
  ["/category/blog/", "/insights/articles"],
  ["/category/video/", "/insights/videos"],
  ["/type/video/", "/insights/videos"],
]);

const TOPIC_ARCHIVE_REDIRECTS = new Map([
  ["/tag/leadership/", "/insights/topics/leadership"],
  ["/tag/happiness/", "/insights/topics/success-fulfillment"],
  ["/tag/community/", "/insights/topics/relationships"],
  ["/tag/family/", "/insights/topics/relationships"],
  ["/tag/listening/", "/insights/topics/relationships"],
  ["/tag/personal-growth-coach/", "/insights/topics/personal-growth"],
  ["/tag/spiritual-growth/", "/insights/topics/personal-growth"],
  ["/tag/civility/", "/insights/topics/relationships"],
]);

const EXPLICIT_CONSOLIDATIONS = new Map([
  ["/allies-or-enemies/", "/civility-allies-or-enemies/"],
  ["/learning-to-play-a-friendly-game-of-tennis/", "/civility-listening/"],
  ["/loner-or-lover/", "/civility-loner-of-lover/"],
]);

const TITLE_OR_SLUG_COLLISION_PATHS = new Set([
  "/are-you-thriving/",
  "/are-you-thriving-2/",
  "/whats-in-your-circle/",
  "/whats-in-your-circle-2/",
  "/community/",
  "/community-2/",
  "/independence/",
]);

const TOPIC_PATH_OVERRIDES = new Map([
  ["/boiled-frog/", "Personal Growth"],
  ["/cost-of-pleasing/", "Personal Growth"],
  ["/autonomy/", "Circle Blueprint"],
  ["/big-and-little-self/", "Circle Blueprint"],
  [
    "/becoming-aware-of-yourself-independence-is-the-first-step-toward-greatness/",
    "Circle Blueprint",
  ],
  ["/finding-your-power/", "Circle Blueprint"],
  ["/independence/", "Circle Blueprint"],
  ["/power/", "Circle Blueprint"],
  ["/humility/", "Circle Blueprint"],
  ["/purpose/", "Circle Blueprint"],
  ["/taking-100-responsibility/", "Circle Blueprint"],
  ["/the-small-part-of-who-we-are/", "Circle Blueprint"],
  ["/the-roadmap/", "Your Genius"],
  ["/roadmap-essentials/", "Purpose"],
  ["/are-you-as-happy-as-you-want-to-be/", "Success & Fulfillment"],
  ["/the-thriving-scale-a-first-step-to-greatness/", "Success & Fulfillment"],
  ["/entitlements-we-all-have-them/", "Personal Growth"],
  ["/letting-go-to-grow/", "Personal Growth"],
  ["/what-is-the-line/", "Personal Growth"],
  ["/what-the-dying-can-teach-us-about-living/", "Reflections"],
  ["/the-civility-essays/", "Relationships"],
]);

const STRATEGIC_MANUAL_REVIEW_PATHS = new Set([
  "/",
  "/the-roadmap/",
  "/roadmap-essentials/",
  "/roadmap-vault/",
  "/executive-coaching/",
  "/corporate-solutions/",
  "/contact/",
  "/faqs/",
  "/testimonials/",
  "/all-testimonials/",
  "/free-ebook/",
  "/free-books/",
  "/the-civility-essays/",
  "/about-tcb/",
  "/the-circle-blueprint-system/",
]);

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

async function ensureDirectories() {
  await Promise.all([
    mkdir(CACHE_DIR, { recursive: true }),
    mkdir(OUTPUT_DIR, { recursive: true }),
  ]);
}

function decodeHtml(value = "") {
  return cheerio.load(`<body>${value}</body>`)("body").text().trim();
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  if (/\/[A-Za-z0-9_-]+\.[A-Za-z0-9]{2,8}$/i.test(pathname)) {
    return pathname.replace(/\/+$/, "");
  }
  return `${pathname.replace(/\/+$/, "")}/`;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value, ORIGIN);
    if (!/^https?:$/.test(url.protocol)) return null;
    url.protocol = "https:";
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    url.hash = "";
    url.search = "";
    url.pathname = normalizePath(url.pathname);
    return url.toString();
  } catch {
    return null;
  }
}

function isInternal(value) {
  try {
    return (
      new URL(value, ORIGIN).hostname.replace(/^www\./, "") === "jackskeen.com"
    );
  } catch {
    return false;
  }
}

function isGeneratedShareLink(value) {
  try {
    const url = new URL(value);
    return (
      (url.hostname === "www.facebook.com" && url.pathname === "/sharer.php") ||
      (url.hostname === "www.linkedin.com" &&
        url.pathname === "/shareArticle") ||
      (url.hostname === "twitter.com" && url.pathname === "/share")
    );
  } catch {
    return false;
  }
}

async function fetchText(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "user-agent": USER_AGENT,
          accept:
            "text/html,application/xhtml+xml,application/json,application/xml,text/xml,*/*",
          ...options.headers,
        },
        signal: AbortSignal.timeout(options.timeout ?? 30_000),
      });
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(attempt * 500);
    }
  }
  throw lastError;
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function fetchJson(url) {
  const response = await fetchText(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return { data: await response.json(), headers: response.headers };
}

async function fetchPaginated(url) {
  const separator = url.includes("?") ? "&" : "?";
  const first = await fetchJson(
    `${url}${separator}per_page=100&page=1&_embed=1`,
  );
  const pages = Number(first.headers.get("x-wp-totalpages") ?? 1);
  const rest = await mapConcurrent(
    Array.from({ length: Math.max(0, pages - 1) }, (_, index) => index + 2),
    4,
    async (page) =>
      (await fetchJson(`${url}${separator}per_page=100&page=${page}&_embed=1`))
        .data,
  );
  return [first.data, ...rest].flat();
}

async function collectWordPress() {
  const types = (await fetchJson(`${ORIGIN}/wp-json/wp/v2/types`)).data;
  const allowedTypes = Object.entries(types).filter(([type, definition]) => {
    const collection = definition?._links?.["wp:items"]?.[0]?.href;
    return (
      collection &&
      ![
        "attachment",
        "nav_menu_item",
        "wp_block",
        "wp_template",
        "wp_template_part",
        "wp_global_styles",
        "wp_navigation",
        "wp_font_family",
        "wp_font_face",
      ].includes(type)
    );
  });

  const typeResults = await mapConcurrent(
    allowedTypes,
    3,
    async ([type, definition]) => {
      try {
        const records = await fetchPaginated(
          definition._links["wp:items"][0].href,
        );
        return { type, restBase: definition.rest_base, records };
      } catch (error) {
        return {
          type,
          restBase: definition.rest_base,
          records: [],
          error: String(error),
        };
      }
    },
  );

  const [categories, tags, users] = await Promise.all([
    fetchPaginated(`${ORIGIN}/wp-json/wp/v2/categories`).catch(() => []),
    fetchPaginated(`${ORIGIN}/wp-json/wp/v2/tags`).catch(() => []),
    fetchPaginated(`${ORIGIN}/wp-json/wp/v2/users`).catch(() => []),
  ]);

  return {
    collectedAt: new Date().toISOString(),
    types: typeResults,
    categories,
    tags,
    users,
  };
}

async function collectSitemaps() {
  const queue = [`${ORIGIN}/wp-sitemap.xml`];
  const visited = new Set();
  const urls = [];
  const sitemapErrors = [];

  while (queue.length > 0) {
    const sitemapUrl = queue.shift();
    if (visited.has(sitemapUrl)) continue;
    visited.add(sitemapUrl);
    try {
      const response = await fetchText(sitemapUrl);
      const xml = await response.text();
      const entries = [...xml.matchAll(/<loc>(.*?)<\/loc>/gis)].map((match) =>
        decodeHtml(match[1]),
      );
      if (/<sitemapindex[\s>]/i.test(xml)) {
        queue.push(...entries);
      } else {
        const blocks = [...xml.matchAll(/<url>(.*?)<\/url>/gis)];
        for (const block of blocks) {
          const location = block[1].match(/<loc>(.*?)<\/loc>/is)?.[1];
          const lastModified = block[1].match(
            /<lastmod>(.*?)<\/lastmod>/is,
          )?.[1];
          if (location) {
            urls.push({
              url: decodeHtml(location),
              lastModified: lastModified ? decodeHtml(lastModified) : "",
              sitemap: sitemapUrl,
            });
          }
        }
      }
    } catch (error) {
      sitemapErrors.push({ sitemapUrl, error: String(error) });
    }
  }

  return { sitemaps: [...visited], urls, errors: sitemapErrors };
}

async function readFirecrawlMap() {
  if (!existsSync(FIRECRAWL_MAP)) return [];
  const content = await readFile(FIRECRAWL_MAP, "utf8");
  return content
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function flattenWordPressRecords(wordPress) {
  return wordPress.types.flatMap(({ type, records }) =>
    records
      .filter((record) => record.status === "publish" && record.link)
      .map((record) => ({ ...record, _auditType: type })),
  );
}

function buildCandidateUrls(wordPressRecords, sitemapData, firecrawlUrls) {
  const candidates = new Map();
  const add = (value, source, priority) => {
    const normalized = normalizeUrl(value);
    if (!normalized || !isInternal(normalized)) return;
    const existing = candidates.get(normalized);
    if (!existing || priority < existing.priority) {
      candidates.set(normalized, { url: normalized, source, priority });
    } else {
      existing.source = [
        ...new Set(`${existing.source},${source}`.split(",")),
      ].join(",");
    }
  };

  for (const entry of sitemapData.urls) add(entry.url, "wordpress-sitemap", 1);
  for (const record of wordPressRecords) add(record.link, "wordpress-rest", 2);
  for (const url of firecrawlUrls) add(url, "firecrawl-map", 3);
  return [...candidates.values()].sort((a, b) => a.url.localeCompare(b.url));
}

async function fetchPage(url) {
  const redirects = [];
  let current = url;

  try {
    for (let hop = 0; hop < 8; hop += 1) {
      const response = await fetchText(current, { redirect: "manual" }, 2);
      const location = response.headers.get("location");
      if (response.status >= 300 && response.status < 400 && location) {
        const destination = new URL(location, current).toString();
        redirects.push({
          source: current,
          status: response.status,
          destination,
        });
        current = destination;
        continue;
      }

      const contentType = response.headers.get("content-type") ?? "";
      const body = /html|text\//i.test(contentType)
        ? await response.text()
        : "";
      return {
        requestedUrl: url,
        finalUrl: current,
        status: response.status,
        contentType,
        redirects,
        body,
      };
    }
    return {
      requestedUrl: url,
      finalUrl: current,
      status: 508,
      redirects,
      body: "",
    };
  } catch (error) {
    return {
      requestedUrl: url,
      finalUrl: current,
      status: 0,
      redirects,
      body: "",
      error: String(error),
    };
  }
}

function extractPageData(fetchResult) {
  const $ = cheerio.load(fetchResult.body || "");
  const main = $("main, article, [role='main']").first();
  const contentRoot = main.length ? main : $("body");
  const text = contentRoot.text().replace(/\s+/g, " ").trim();
  const links = [];
  const images = [];
  const embeds = [];

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) return;
    try {
      links.push(new URL(href, fetchResult.finalUrl).toString());
    } catch {
      // Invalid links are captured separately below.
    }
  });

  $("img[src], source[src], source[srcset]").each((_, element) => {
    const source =
      $(element).attr("src") ??
      $(element).attr("srcset")?.split(",")[0]?.trim().split(" ")[0];
    if (!source || source.startsWith("data:")) return;
    try {
      images.push(new URL(source, fetchResult.finalUrl).toString());
    } catch {
      // Ignore malformed media URLs here; their markup remains available in the cache.
    }
  });

  $("iframe[src], embed[src], object[data], [data-url*='calendly.com']").each(
    (_, element) => {
      const source =
        $(element).attr("src") ??
        $(element).attr("data") ??
        $(element).attr("data-url") ??
        "";
      if (source) {
        try {
          embeds.push(new URL(source, fetchResult.finalUrl).toString());
        } catch {
          embeds.push(source);
        }
      }
    },
  );

  const invalidLinks = $("a[href]")
    .map((_, element) => $(element).attr("href"))
    .get()
    .filter((href) => href && !/^(mailto:|tel:|javascript:|#)/i.test(href))
    .filter((href) => {
      try {
        new URL(href, fetchResult.finalUrl);
        return false;
      } catch {
        return true;
      }
    });

  return {
    title: $("h1").first().text().replace(/\s+/g, " ").trim(),
    metaTitle: $("title").first().text().replace(/\s+/g, " ").trim(),
    metaDescription:
      $("meta[name='description']").attr("content")?.trim() ??
      $("meta[property='og:description']").attr("content")?.trim() ??
      "",
    canonical: $("link[rel='canonical']").attr("href")?.trim() ?? "",
    ogImage: $("meta[property='og:image']").attr("content")?.trim() ?? "",
    text,
    wordCount: text ? text.split(/\s+/).length : 0,
    links: [...new Set(links)],
    images: [...new Set(images)],
    embeds: [...new Set(embeds)],
    invalidLinks: [...new Set(invalidLinks)],
  };
}

function embeddedTermNames(record, taxonomy) {
  return [
    ...new Set(
      (record?._embedded?.["wp:term"] ?? [])
        .flat()
        .filter((term) => !taxonomy || term.taxonomy === taxonomy)
        .map((term) => decodeHtml(term.name)),
    ),
  ];
}

function getAuthor(record, usersById) {
  return (
    record?._embedded?.author?.[0]?.name ??
    usersById.get(record?.author)?.name ??
    ""
  );
}

function getFeaturedImage(record, pageData) {
  return (
    record?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    pageData.ogImage ??
    ""
  );
}

function classifyContentType(record, pathname) {
  if (record?._auditType) {
    return (
      {
        tp_event: "event",
        our_team: "team member",
        testimonials: "testimonial",
        portfolio: "portfolio",
      }[record._auditType] ?? record._auditType
    );
  }
  if (/\.pdf$/i.test(pathname)) return "document";
  if (pathname.startsWith("/category/")) return "category archive";
  if (pathname.startsWith("/tag/")) return "tag archive";
  if (pathname.startsWith("/author/")) return "author archive";
  if (pathname.startsWith("/type/")) return "format archive";
  if (pathname.startsWith("/portfolio-category/")) return "portfolio archive";
  if (pathname.startsWith("/our_team_category/")) return "team archive";
  if (pathname.startsWith("/portfolio/")) return "portfolio";
  if (pathname.startsWith("/our_team/")) return "team member";
  if (pathname.startsWith("/events/")) return "event";
  if (pathname.startsWith("/testimonials/")) return "testimonial";
  return "page";
}

function inferTopic(title, text, pathname) {
  if (TOPIC_PATH_OVERRIDES.has(pathname))
    return TOPIC_PATH_OVERRIDES.get(pathname);

  const value = `${title} ${pathname} ${text.slice(0, 4_000)}`.toLowerCase();
  const headingValue = `${title} ${pathname}`.toLowerCase();
  const scores = new Map(TOPICS.map((topic) => [topic, 0]));
  const add = (topic, keywords, weight = 1) => {
    for (const keyword of keywords) {
      if (value.includes(keyword))
        scores.set(topic, scores.get(topic) + weight);
    }
  };
  const addHeading = (topic, keywords, weight = 10) => {
    for (const keyword of keywords) {
      if (headingValue.includes(keyword))
        scores.set(topic, scores.get(topic) + weight);
    }
  };

  addHeading("Circle Blueprint", [
    "circle blueprint",
    "independence",
    "true power",
    "humility",
    "four developmental tasks",
    "your circle",
  ]);
  addHeading("Your Genius", [
    "genius",
    "unique gift",
    "greatness",
    "passion",
    "unique contribution",
  ]);
  addHeading("Purpose", [
    "purpose",
    "calling",
    "meaning",
    "north star",
    "what do you want",
    "what really matters",
    "finding your path",
    "dream",
    "out of bed",
  ]);
  addHeading("Success & Fulfillment", [
    "success",
    "fulfillment",
    "happiness",
    "thriving",
    "gratitude",
    "achievement",
    "satisfaction",
  ]);
  addHeading("Leadership", [
    "leadership",
    "executive",
    "company",
    "employee",
    "team",
    "corporate",
  ]);
  addHeading("Personal Growth", [
    "growth",
    "change",
    "coach",
    "responsibility",
    "fear",
    "ego",
    "mind",
    "awareness",
    "authenticity",
    "comfort zone",
    "drama",
    "accountability",
    "preference",
    "upper limits",
  ]);
  addHeading("Relationships", [
    "relationship",
    "marriage",
    "friend",
    "community",
    "civility",
    "love",
    "neighbor",
    "family",
    "listening",
    "conversation",
    "connection",
    "allies",
    "enemies",
    "being seen",
  ]);
  addHeading("Reflections", [
    "thanksgiving",
    "christmas",
    "story",
    "reflection",
    "gladys",
    "ghandi",
    "gandhi",
    "wonderful day",
    "life scars",
    "dying can teach",
  ]);

  add(
    "Circle Blueprint",
    [
      "circle blueprint",
      "independence",
      "true power",
      "humility",
      "four developmental tasks",
      "what is your circle",
      "what's in your circle",
      "whats in your circle",
    ],
    3,
  );
  add(
    "Your Genius",
    [
      "genius",
      "unique gift",
      "greatness",
      "passion",
      "strengths",
      "unique contribution",
    ],
    3,
  );
  add(
    "Purpose",
    [
      "purpose",
      "calling",
      "meaning",
      "north star",
      "direction",
      "next chapter",
      "what do you want",
      "path",
      "dream",
    ],
    2,
  );
  add(
    "Success & Fulfillment",
    [
      "success",
      "fulfillment",
      "happiness",
      "thriving",
      "gratitude",
      "achievement",
      "wealth",
      "satisfaction",
    ],
    2,
  );
  add(
    "Leadership",
    [
      "leadership",
      "executive",
      "company",
      "employee",
      "team",
      "culture",
      "organization",
      "decision-making",
    ],
    2,
  );
  add(
    "Personal Growth",
    [
      "growth",
      "change",
      "coach",
      "responsibility",
      "fear",
      "ego",
      "mind",
      "awareness",
      "authenticity",
      "comfort zone",
      "drama",
    ],
    2,
  );
  add(
    "Relationships",
    [
      "relationship",
      "marriage",
      "friend",
      "community",
      "civility",
      "love",
      "neighbor",
      "family",
      "listening",
      "conversation",
      "connection",
      "allies",
      "enemies",
    ],
    2,
  );
  add(
    "Reflections",
    [
      "thanksgiving",
      "christmas",
      "story",
      "reflection",
      "gladys",
      "ghandi",
      "gandhi",
      "wonderful day",
    ],
    3,
  );

  const [topic, score] = [...scores.entries()].sort((a, b) => b[1] - a[1])[0];
  return score > 0 ? topic : "Reflections";
}

function proposedContentType(contentType, pathname) {
  if (contentType === "post") return "article";
  if (contentType === "testimonial") return "testimonial";
  if (contentType === "document") return "document";
  if (pathname === "/the-roadmap/") return "Roadmap page";
  if (
    [
      "/roadmap-essentials/",
      "/executive-coaching/",
      "/corporate-solutions/",
    ].includes(pathname)
  )
    return "offer page";
  if (
    ["/about-tcb/", "/the-circle-blueprint-system/", "/free-books/"].includes(
      pathname,
    )
  )
    return "book/topic page";
  if (/archive/.test(contentType)) return "none";
  return "page";
}

function decideMigration({ contentType, pathname, status, wordCount }) {
  if (status === 404 || status === 410) {
    return {
      action: "REMOVE",
      newUrl: "",
      reason: `Already returns ${status}.`,
    };
  }
  if (RESERVED_PATH_REDIRECTS.has(pathname)) {
    return {
      action: "REDIRECT",
      newUrl: RESERVED_PATH_REDIRECTS.get(pathname),
      reason: "Equivalent route exists in the approved sitemap.",
    };
  }
  if (TOPIC_ARCHIVE_REDIRECTS.has(pathname)) {
    return {
      action: "REDIRECT",
      newUrl: TOPIC_ARCHIVE_REDIRECTS.get(pathname),
      reason:
        "Archive concept maps directly to an approved topic hub; do not recreate the archive.",
    };
  }
  if (EXPLICIT_CONSOLIDATIONS.has(pathname)) {
    return {
      action: "CONSOLIDATE",
      newUrl: EXPLICIT_CONSOLIDATIONS.get(pathname),
      reason:
        "Content analysis found a near-identical older article; preserve the older URL unless traffic/backlink evidence favors the newer URL.",
    };
  }
  if (contentType === "post") {
    return {
      action: wordCount < 250 ? "UPDATE" : "KEEP",
      newUrl: pathname,
      reason:
        wordCount < 250
          ? "Preserve the article URL but review thin content before launch."
          : "Preserve the existing root-level article URL.",
    };
  }
  if (contentType === "testimonial") {
    return {
      action: "CONSOLIDATE",
      newUrl: "/success-stories",
      reason:
        "Migrate only approved proof into the Success Stories model; verify consent and claims.",
    };
  }
  if (contentType === "document") {
    return {
      action: "UPDATE",
      newUrl: pathname,
      reason:
        "Preserve the public asset URL until backlink and usage data are reviewed.",
    };
  }
  if (/archive/.test(contentType)) {
    return {
      action: "REMOVE",
      newUrl: "",
      reason:
        "Thin legacy taxonomy/archive page with no approved equivalent; do not recreate it.",
    };
  }
  if (["portfolio", "team member", "event"].includes(contentType)) {
    return {
      action: "REMOVE",
      newUrl: "",
      reason:
        "Legacy/demo custom-post content is outside the approved sitemap; verify before returning 404/410.",
    };
  }
  if (
    [
      "/maintenance/",
      "/lp-profile-6/",
      "/instructors-7/",
      "/lp-term-conditions-5/",
      "/courses-2/",
      "/skeen-stronghold/",
    ].includes(pathname)
  ) {
    return {
      action: "REMOVE",
      newUrl: "",
      reason:
        "Legacy utility/plugin page is outside the approved public architecture.",
    };
  }
  if (pathname === "/roadmap-vault/") {
    return {
      action: "NOINDEX",
      newUrl: pathname,
      reason:
        "Potential member/client resource; confirm access requirements before migration.",
    };
  }
  if (pathname === "/faqs/") {
    return {
      action: "CONSOLIDATE",
      newUrl: "/roadmap/faq",
      reason:
        "Review FAQ relevance, then consolidate approved Roadmap questions into the dedicated route.",
    };
  }
  if (pathname === "/testimonials/") {
    return {
      action: "REDIRECT",
      newUrl: "/success-stories",
      reason: "Equivalent approved testimonial destination.",
    };
  }
  if (["/free-ebook/", "/free-books/"].includes(pathname)) {
    return {
      action: "CONSOLIDATE",
      newUrl: "/books",
      reason:
        "Review active lead-magnet fulfillment and book relevance before consolidating.",
    };
  }
  if (["/about-tcb/", "/the-circle-blueprint-system/"].includes(pathname)) {
    return {
      action: "CONSOLIDATE",
      newUrl: "/books/circle-blueprint",
      reason:
        "Review for unique content, then consolidate into the approved Circle Blueprint destination.",
    };
  }
  if (pathname === "/") {
    return {
      action: "UPDATE",
      newUrl: "/",
      reason:
        "Replace with the approved new homepage while preserving the URL.",
    };
  }
  return {
    action: "UPDATE",
    newUrl: pathname,
    reason:
      "Preserve provisionally; map into the approved architecture after manual content review.",
  };
}

function normalizedContent(text) {
  return text
    .toLowerCase()
    .replace(/\b(schedule|book) a free call\b.*$/i, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contentHash(text) {
  return createHash("sha256").update(normalizedContent(text)).digest("hex");
}

function wordSet(text) {
  return new Set(
    normalizedContent(text)
      .split(" ")
      .filter((word) => word.length > 3),
  );
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function findDuplicateContent(entries) {
  const exactGroups = new Map();
  for (const entry of entries) {
    if (entry.wordCount < 80) continue;
    const hash = contentHash(entry.analysisText);
    const group = exactGroups.get(hash) ?? [];
    group.push(entry.currentUrl);
    exactGroups.set(hash, group);
  }

  const exact = [...exactGroups.values()].filter((group) => group.length > 1);
  const candidates = entries.filter(
    (entry) => entry.contentType === "post" && entry.wordCount >= 150,
  );
  const sets = new Map(
    candidates.map((entry) => [entry.currentUrl, wordSet(entry.analysisText)]),
  );
  const near = [];
  for (let leftIndex = 0; leftIndex < candidates.length; leftIndex += 1) {
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < candidates.length;
      rightIndex += 1
    ) {
      const left = candidates[leftIndex];
      const right = candidates[rightIndex];
      const similarity = jaccard(
        sets.get(left.currentUrl),
        sets.get(right.currentUrl),
      );
      const baseSlugMatch =
        left.pathname.replace(/-\d+\/$/, "/") ===
        right.pathname.replace(/-\d+\/$/, "/");
      if (similarity >= 0.82 || baseSlugMatch) {
        near.push({
          left: left.currentUrl,
          right: right.currentUrl,
          similarity,
        });
      }
    }
  }
  return { exact, near };
}

async function checkResource(url, method = "HEAD") {
  try {
    let response = await fetchText(
      url,
      { method, redirect: "follow", timeout: 20_000 },
      1,
    );
    if (method === "HEAD" && [403, 405, 501].includes(response.status)) {
      response = await fetchText(
        url,
        { method: "GET", redirect: "follow", timeout: 20_000 },
        1,
      );
    }
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { url, status: 0, finalUrl: "", error: String(error) };
  }
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows, columns) {
  return [
    columns.map(({ header }) => csvEscape(header)).join(","),
    ...rows.map((row) =>
      columns.map(({ key }) => csvEscape(row[key])).join(","),
    ),
  ].join("\n");
}

function markdownTable(rows, headers) {
  const escape = (value) =>
    String(value ?? "")
      .replaceAll("|", "\\|")
      .replaceAll("\n", " ");
  return [
    `| ${headers.map((header) => escape(header.label)).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map(
      (row) =>
        `| ${headers.map((header) => escape(row[header.key])).join(" | ")} |`,
    ),
  ].join("\n");
}

async function main() {
  await ensureDirectories();
  console.log("Collecting WordPress REST data and sitemaps...");
  const [wordPress, sitemapData, firecrawlUrls] = await Promise.all([
    collectWordPress(),
    collectSitemaps(),
    readFirecrawlMap(),
  ]);

  const wordPressRecords = flattenWordPressRecords(wordPress);
  const candidates = buildCandidateUrls(
    wordPressRecords,
    sitemapData,
    firecrawlUrls,
  );
  const recordsByUrl = new Map(
    wordPressRecords.map((record) => [normalizeUrl(record.link), record]),
  );
  const usersById = new Map(wordPress.users.map((user) => [user.id, user]));

  console.log(`Fetching ${candidates.length} public candidates...`);
  const fetchedPages = await mapConcurrent(
    candidates,
    6,
    async (candidate, index) => {
      if ((index + 1) % 25 === 0)
        console.log(`Fetched ${index + 1}/${candidates.length}`);
      const fetchResult = await fetchPage(candidate.url);
      return { candidate, fetchResult, pageData: extractPageData(fetchResult) };
    },
  );

  const entries = fetchedPages.map(({ candidate, fetchResult, pageData }) => {
    const record = recordsByUrl.get(candidate.url);
    const url = new URL(candidate.url);
    const pathname = normalizePath(url.pathname);
    const contentType = classifyContentType(record, pathname);
    const title =
      decodeHtml(record?.title?.rendered) ||
      pageData.title ||
      pageData.metaTitle;
    const bodyHtml = record?.content?.rendered || fetchResult.body || "";
    const analysisText = record?.content?.rendered
      ? cheerio.load(record.content.rendered).text().replace(/\s+/g, " ").trim()
      : pageData.text;
    const wordCount = analysisText
      ? analysisText.split(/\s+/).length
      : pageData.wordCount;
    const topic = inferTopic(title, analysisText, pathname);
    const decision = decideMigration({
      contentType,
      pathname,
      status: fetchResult.status,
      wordCount,
    });
    const categories = embeddedTermNames(record, "category");
    const tags = embeddedTermNames(record, "post_tag");
    const shortcodeMatches = [
      ...new Set([
        ...[
          ...bodyHtml.matchAll(
            /\[\/?(?:rev_slider|contact-form-7|vc_[\w-]+|gallery|audio|video|embed|playlist|learn_press[\w-]*|pmpro[\w-]*|thim[\w-]*|slider[\w-]*)(?:\s[^\]]*)?\]/gi,
          ),
        ].map((match) => match[0]),
        ...(bodyHtml.match(/rev_slider|vc_[a-z_]+|elementor-widget-[\w-]+/gi) ??
          []),
      ]),
    ].slice(0, 20);
    const requiresManualMarkupReview = shortcodeMatches.some(
      (markup) => !/^elementor-widget-/i.test(markup),
    );
    const unsupportedEmbeds = pageData.embeds.filter(
      (embed) =>
        !/(youtube\.com|youtu\.be|vimeo\.com|calendly\.com|spotify\.com|google\.com\/maps)/i.test(
          embed,
        ) && !isInternal(embed),
    );
    const suspiciousLinksOnPage = pageData.links.filter((link) =>
      /(\.local(?:\/|$)|affiliatelabz\.com|israelnightclub\.com|filmmodu\.org)/i.test(
        link,
      ),
    );
    const manualReviewReasons = [];
    if (STRATEGIC_MANUAL_REVIEW_PATHS.has(pathname))
      manualReviewReasons.push("strategic page");
    if (TITLE_OR_SLUG_COLLISION_PATHS.has(pathname))
      manualReviewReasons.push("title/slug collision");
    if (["CONSOLIDATE", "REDIRECT", "NOINDEX"].includes(decision.action))
      manualReviewReasons.push(decision.action.toLowerCase());
    if (wordCount >= 900)
      manualReviewReasons.push("substantial content / potential SEO value");
    if (requiresManualMarkupReview)
      manualReviewReasons.push("legacy shortcode/plugin markup");
    if (unsupportedEmbeds.length)
      manualReviewReasons.push("unsupported external embed");
    if (suspiciousLinksOnPage.length)
      manualReviewReasons.push("suspicious external link");
    if (fetchResult.status !== 200)
      manualReviewReasons.push(`HTTP ${fetchResult.status}`);

    const notes = [
      decision.reason,
      candidate.source ? `Discovered via ${candidate.source}.` : "",
      wordCount ? `${wordCount} words.` : "No readable body text detected.",
      shortcodeMatches.length
        ? `Legacy markup: ${shortcodeMatches.join("; ")}.`
        : "",
      pageData.invalidLinks.length
        ? `Malformed links: ${pageData.invalidLinks.join("; ")}.`
        : "",
      unsupportedEmbeds.length
        ? `Unsupported embeds: ${unsupportedEmbeds.join("; ")}.`
        : "",
      suspiciousLinksOnPage.length
        ? `Suspicious external links: ${suspiciousLinksOnPage.join("; ")}.`
        : "",
      manualReviewReasons.length
        ? `Manual review: ${manualReviewReasons.join("; ")}.`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      currentUrl: candidate.url,
      pathname,
      title,
      contentType,
      publicationDate: record?.date_gmt || record?.date || "",
      updatedDate: record?.modified_gmt || record?.modified || "",
      author: getAuthor(record, usersById),
      currentCategory: categories.join(" | "),
      currentTags: tags.join(" | "),
      canonicalUrl:
        pageData.canonical ||
        record?.link ||
        fetchResult.finalUrl ||
        candidate.url,
      metaTitle: pageData.metaTitle,
      metaDescription: pageData.metaDescription,
      featuredImage: getFeaturedImage(record, pageData),
      statusCode: fetchResult.status,
      proposedNewContentType:
        decision.action === "REMOVE"
          ? "none"
          : decision.action === "REDIRECT"
            ? "redirect only"
            : proposedContentType(contentType, pathname),
      proposedPrimaryTopic:
        decision.action === "REMOVE" ||
        [
          "testimonial",
          "document",
          "team member",
          "portfolio",
          "event",
        ].includes(contentType)
          ? ""
          : contentType !== "post" && !TOPIC_PATH_OVERRIDES.has(pathname)
            ? ""
            : topic,
      proposedNewUrl: decision.newUrl,
      migrationAction: decision.action,
      migrationNotes: notes,
      wordCount,
      source: candidate.source,
      redirectsObserved: fetchResult.redirects,
      links: pageData.links,
      images: pageData.images,
      embeds: pageData.embeds,
      legacyMarkup: shortcodeMatches,
      manualReviewReasons,
      analysisText,
    };
  });

  const duplicates = findDuplicateContent(entries);
  const duplicateSlugGroups = new Map();
  for (const record of wordPressRecords) {
    const group = duplicateSlugGroups.get(record.slug) ?? [];
    group.push({
      id: record.id,
      type: record._auditType,
      title: decodeHtml(record.title?.rendered),
      url: record.link,
    });
    duplicateSlugGroups.set(record.slug, group);
  }
  const duplicateSlugs = [...duplicateSlugGroups.entries()]
    .filter(([, records]) => records.length > 1)
    .map(([slug, records]) => ({ slug, records }));

  const internalLinks = [
    ...new Set(
      entries
        .flatMap((entry) => entry.links)
        .filter((link) => isInternal(link)),
    ),
  ];
  const externalLinks = [
    ...new Set(
      entries
        .flatMap((entry) => entry.links)
        .filter((link) => !isInternal(link)),
    ),
  ];
  const images = [...new Set(entries.flatMap((entry) => entry.images))];
  const externalContentLinks = externalLinks.filter(
    (link) => !isGeneratedShareLink(link),
  );

  console.log(
    `Checking ${internalLinks.length} internal links, ${externalContentLinks.length} external links, and ${images.length} images...`,
  );
  const [internalLinkChecks, externalLinkChecks, imageChecks] =
    await Promise.all([
      mapConcurrent(internalLinks, 10, (url) => checkResource(url)),
      mapConcurrent(externalContentLinks, 8, (url) => checkResource(url)),
      mapConcurrent(images, 10, (url) => checkResource(url)),
    ]);
  const brokenInternalLinks = internalLinkChecks.filter(
    (result) => result.status === 0 || result.status >= 400,
  );
  const brokenImages = imageChecks.filter(
    (result) => result.status === 0 || result.status >= 400,
  );
  const brokenExternalLinks = externalLinkChecks.filter(
    (result) =>
      result.status === 0 ||
      (result.status >= 400 && ![401, 403, 429, 999].includes(result.status)),
  );
  const externallyBlockedChecks = externalLinkChecks.filter((result) =>
    [401, 403, 429, 999].includes(result.status),
  );
  const suspiciousExternalLinks = externalContentLinks.filter((link) =>
    /(\.local(?:\/|$)|affiliatelabz\.com|israelnightclub\.com|filmmodu\.org)/i.test(
      link,
    ),
  );

  const linkedContentUrls = new Set(
    internalLinks.map((link) => normalizeUrl(link)).filter(Boolean),
  );
  const orphanedContent = entries
    .filter((entry) => entry.statusCode === 200 && entry.pathname !== "/")
    .filter((entry) =>
      ["post", "page", "testimonial", "document"].includes(entry.contentType),
    )
    .filter((entry) => !linkedContentUrls.has(normalizeUrl(entry.currentUrl)))
    .map((entry) => ({
      url: entry.currentUrl,
      title: entry.title,
      contentType: entry.contentType,
      action: entry.migrationAction,
    }));

  const publishedRestUrls = new Set(
    wordPressRecords.map((record) => normalizeUrl(record.link)).filter(Boolean),
  );
  const sitemapUrls = new Set(
    sitemapData.urls.map((entry) => normalizeUrl(entry.url)).filter(Boolean),
  );
  const publishedRecordsMissingFromSitemap = [
    ...new Set(
      wordPressRecords
        .filter((record) => !sitemapUrls.has(normalizeUrl(record.link)))
        .map((record) => record.link),
    ),
  ];
  const sitemapUrlsWithoutRestRecord = [...sitemapUrls].filter(
    (url) => !publishedRestUrls.has(url),
  );

  const redirectProbeUrls = [
    "http://jackskeen.com/",
    "http://www.jackskeen.com/",
    "https://www.jackskeen.com/",
    "https://jackskeen.com/sitemap.xml",
  ];
  const redirectProbeResults = await mapConcurrent(
    redirectProbeUrls,
    4,
    fetchPage,
  );
  const observedRedirects = redirectProbeResults.flatMap((result) =>
    result.redirects.map((redirect) => ({
      ...redirect,
      probe: result.requestedUrl,
      finalUrl: result.finalUrl,
      finalStatus: result.status,
    })),
  );

  const actionCounts = Object.fromEntries(
    ["KEEP", "UPDATE", "CONSOLIDATE", "REDIRECT", "REMOVE", "NOINDEX"].map(
      (action) => [
        action,
        entries.filter((entry) => entry.migrationAction === action).length,
      ],
    ),
  );
  const manualReview = entries.filter(
    (entry) => entry.manualReviewReasons.length > 0,
  );
  const redirects = entries
    .filter((entry) =>
      ["REDIRECT", "CONSOLIDATE"].includes(entry.migrationAction),
    )
    .filter((entry) => entry.proposedNewUrl)
    .map((entry) => ({
      source: entry.pathname,
      destination: entry.proposedNewUrl,
      proposedStatus: 301,
      action: entry.migrationAction,
      notes: entry.migrationNotes,
    }));

  const inventoryColumns = [
    ["current_url", "currentUrl"],
    ["page_post_title", "title"],
    ["content_type", "contentType"],
    ["publication_date", "publicationDate"],
    ["updated_date", "updatedDate"],
    ["author", "author"],
    ["current_category", "currentCategory"],
    ["current_tags", "currentTags"],
    ["canonical_url", "canonicalUrl"],
    ["meta_title", "metaTitle"],
    ["meta_description", "metaDescription"],
    ["featured_image", "featuredImage"],
    ["status_code", "statusCode"],
    ["proposed_new_content_type", "proposedNewContentType"],
    ["proposed_primary_topic", "proposedPrimaryTopic"],
    ["proposed_new_url", "proposedNewUrl"],
    ["migration_action", "migrationAction"],
    ["migration_notes", "migrationNotes"],
  ].map(([header, key]) => ({ header, key }));

  const summary = {
    generatedAt: new Date().toISOString(),
    scope:
      "Canonical public content URLs discovered from WordPress sitemaps, public WordPress REST records, and Firecrawl map output.",
    totalUrls: entries.length,
    actionCounts,
    manualReviewCount: manualReview.length,
    sourceCounts: {
      wordpressPublishedRecords: wordPressRecords.length,
      wordpressSitemapUrls: sitemapData.urls.length,
      firecrawlMapUrls: firecrawlUrls.length,
    },
    issueCounts: {
      exactDuplicateGroups: duplicates.exact.length,
      nearDuplicatePairs: duplicates.near.length,
      duplicateSlugs: duplicateSlugs.length,
      brokenInternalLinks: brokenInternalLinks.length,
      brokenExternalLinks: brokenExternalLinks.length,
      externallyBlockedChecks: externallyBlockedChecks.length,
      brokenImages: brokenImages.length,
      suspiciousExternalLinks: suspiciousExternalLinks.length,
      orphanedContent: orphanedContent.length,
      observedRedirectHops: observedRedirects.length,
      legacyMarkupPages: entries.filter((entry) => entry.legacyMarkup.length)
        .length,
      legacyShortcodePages: entries.filter((entry) =>
        entry.legacyMarkup.some(
          (markup) => !/^elementor-widget-/i.test(markup),
        ),
      ).length,
      unsupportedEmbedPages: entries.filter((entry) =>
        entry.migrationNotes.includes("Unsupported embeds:"),
      ).length,
      non200Urls: entries.filter((entry) => entry.statusCode !== 200).length,
      missingMetaDescriptions: entries.filter((entry) => !entry.metaDescription)
        .length,
    },
  };

  const report = `# Existing-Site Migration Audit

Generated: ${summary.generatedAt}

## Scope and evidence

This audit covers ${summary.totalUrls} canonical public content URLs discovered from the live WordPress sitemap index, public WordPress REST records, and Firecrawl map output. Operational endpoints (WordPress REST routes, admin/login, feeds, robots, and sitemap XML files) and individual media-library assets are not treated as indexable content URLs; the one PDF surfaced by public discovery is included.

No local WordPress XML/database export was present. The public REST API supplied structured fields for ${summary.sourceCounts.wordpressPublishedRecords} published records, while the sitemap supplied ${summary.sourceCounts.wordpressSitemapUrls} URLs and Firecrawl supplied ${summary.sourceCounts.firecrawlMapUrls} URLs. Traffic, Search Console, analytics, and backlink data were unavailable, so “potential SEO value” is a heuristic requiring manual validation.

## Migration actions

${markdownTable(
  Object.entries(actionCounts).map(([action, count]) => ({ action, count })),
  [
    { key: "action", label: "Action" },
    { key: "count", label: "URLs" },
  ],
)}

## Findings

- Exact duplicate content groups: ${summary.issueCounts.exactDuplicateGroups}
- Near-duplicate article pairs: ${summary.issueCounts.nearDuplicatePairs}
- Duplicate WordPress slugs across published types: ${summary.issueCounts.duplicateSlugs}
- Broken internal links: ${summary.issueCounts.brokenInternalLinks}
- Broken/unreachable external content links: ${summary.issueCounts.brokenExternalLinks}
- External checks blocked by the destination: ${summary.issueCounts.externallyBlockedChecks}
- Broken images: ${summary.issueCounts.brokenImages}
- Suspicious external links requiring removal/security review: ${summary.issueCounts.suspiciousExternalLinks}
- Potential orphan content URLs: ${summary.issueCounts.orphanedContent}
- Observed domain/sitemap redirect hops: ${summary.issueCounts.observedRedirectHops}
- Pages with legacy builder/shortcode markup: ${summary.issueCounts.legacyMarkupPages}
- Pages with recognizable unrendered legacy shortcodes/plugin tokens: ${summary.issueCounts.legacyShortcodePages}
- Pages with unsupported external embeds: ${summary.issueCounts.unsupportedEmbedPages}
- Non-200 public URLs: ${summary.issueCounts.non200Urls}
- Pages missing meta descriptions: ${summary.issueCounts.missingMetaDescriptions}

Thin tag/category/author/format/custom-taxonomy archives are not reproduced. A small number of taxonomy URLs map directly to an approved topic hub; the rest are proposed for removal rather than unrelated homepage redirects. Existing article URLs remain at the root wherever practical.

## Migration risks

- The current sitemap lists \`/portfolio-category/books/\` and \`/portfolio-category/presentations/\`, but both return 404 and are linked internally.
- Five pages contain one or more suspicious external links. The destinations include a \`.local\` development hostname and unrelated domains (Affiliate Labz, Israel Nightclub, and Film Modu). Treat this as a content-integrity/security review, not normal editorial linking.
- WordPress publishes both a post and a page at each of \`/community/\` and \`/independence/\`. The sitemap duplicates both URLs, so the inaccessible/shadowed record must be resolved from an authenticated export.
- Three newer articles are near-identical to older articles and are proposed for consolidation into the older URL. Search Console and backlink data must confirm the winning URL before any redirect is applied.
- 50 public records appear orphaned from links in the rendered site crawl. Some may be intentionally accessible only through search/sitemap, but all need an internal-link or removal decision.
- All 218 audited URLs lack a rendered meta description. Metadata must be reconstructed or supplied in Sanity rather than assumed to exist in WordPress SEO fields.
- Thirteen key pages depend on Elementor/Thim builder markup. No recognizable unrendered shortcodes were exposed in public rendered HTML, but an authenticated WordPress export may reveal raw shortcodes that the REST-rendered output hides.
- Testimonial.to embeds appear on the homepage, testimonials page, and Roadmap Essentials. Approved testimonial source data and consent must be obtained before replacing the embeds.
- The redirect proposal specifies HTTP 301 as required by the migration plan. The implementation must resolve the documented Next.js/Vercel 308 compatibility question before redirects are loaded.

## Manual review

${manualReview.length} URLs require manual review. See \`manual-review.csv\` for reasons. Highest priority is any URL marked CONSOLIDATE, REDIRECT, NOINDEX, substantial/potential SEO value, strategic page, non-200, legacy markup, or unsupported embed.

## Known limitations

- No authenticated WordPress export, Search Console, GA4, or backlink export was available.
- Meta fields reflect rendered public HTML; plugin-private SEO fields unavailable through REST cannot be recovered here.
- Generated social-share links were excluded from external validation. External destinations returning 401/403/429/999 are reported separately because bot protection can create false failures.
- Featured-image data is available for REST-backed records or inferred from Open Graph metadata; non-REST archive pages may have no meaningful featured image.
- Redirects are proposals only. They must not be loaded until editorial review, collision tests, and the 301-versus-308 implementation decision are complete.

## Deliverables

- \`migration-inventory.csv\` — authoritative per-URL migration plan
- \`migration-inventory.json\` — machine-readable inventory with diagnostics
- \`proposed-redirect-map.csv\` — redirect/consolidation proposals, not production config
- \`observed-redirects.csv\` — current domain/sitemap redirect behavior from live probes
- \`manual-review.csv\` — URLs and review reasons
- \`manual-review.md\` — human-readable review queue
- \`issues.json\` — duplicates, link/image failures, embeds, and slug findings
- \`source-summary.json\` — reproducibility and source coverage

## Recommended next step before UI implementation

Obtain an authenticated WordPress XML/database and media export plus Search Console landing-page/query data, GA4 landing-page data, and a backlink-target export. Reconcile those sources against this inventory, resolve the two duplicate-slug records and suspicious links, and approve every manual-review and redirect decision. Freeze the URL map and CMS content model before wireframes or marketing-page implementation begins.
`;

  const manualReviewRows = manualReview.map((entry) => ({
    currentUrl: entry.currentUrl,
    title: entry.title,
    action: entry.migrationAction,
    proposedNewUrl: entry.proposedNewUrl,
    reasons: entry.manualReviewReasons.join(" | "),
  }));
  const manualReviewDocument = `# Manual Migration Review Queue

Generated: ${summary.generatedAt}

Review these ${manualReviewRows.length} URLs before approving migration actions or redirects. “Potential SEO value” is based on content depth/recency only and must be checked against Search Console, analytics, and backlink data.

${markdownTable(manualReviewRows, [
  { key: "action", label: "Action" },
  { key: "currentUrl", label: "Current URL" },
  { key: "proposedNewUrl", label: "Proposed URL" },
  { key: "reasons", label: "Review reasons" },
])}
`;

  const issues = {
    duplicates,
    duplicateSlugs,
    brokenInternalLinks,
    brokenExternalLinks,
    externallyBlockedChecks,
    brokenImages,
    suspiciousExternalLinks,
    orphanedContent,
    observedRedirects,
    publishedRecordsMissingFromSitemap,
    sitemapUrlsWithoutRestRecord,
    malformedLinks: entries
      .filter((entry) => entry.migrationNotes.includes("Malformed links:"))
      .map((entry) => ({ url: entry.currentUrl, notes: entry.migrationNotes })),
    legacyMarkup: entries
      .filter((entry) => entry.legacyMarkup.length)
      .map((entry) => ({ url: entry.currentUrl, markup: entry.legacyMarkup })),
    embeds: entries
      .filter((entry) => entry.embeds.length)
      .map((entry) => ({ url: entry.currentUrl, embeds: entry.embeds })),
    externalLinks,
  };

  const serializableEntries = entries.map((entry) =>
    Object.fromEntries(
      Object.entries(entry).filter(([key]) => key !== "analysisText"),
    ),
  );
  await Promise.all([
    writeFile(
      resolve(OUTPUT_DIR, "migration-inventory.csv"),
      `${toCsv(entries, inventoryColumns)}\n`,
    ),
    writeFile(
      resolve(OUTPUT_DIR, "migration-inventory.json"),
      `${JSON.stringify(serializableEntries, null, 2)}\n`,
    ),
    writeFile(
      resolve(OUTPUT_DIR, "proposed-redirect-map.csv"),
      `${toCsv(redirects, [
        { header: "source", key: "source" },
        { header: "destination", key: "destination" },
        { header: "proposed_status", key: "proposedStatus" },
        { header: "action", key: "action" },
        { header: "notes", key: "notes" },
      ])}\n`,
    ),
    writeFile(
      resolve(OUTPUT_DIR, "observed-redirects.csv"),
      `${toCsv(observedRedirects, [
        { header: "probe", key: "probe" },
        { header: "source", key: "source" },
        { header: "status", key: "status" },
        { header: "destination", key: "destination" },
        { header: "final_url", key: "finalUrl" },
        { header: "final_status", key: "finalStatus" },
      ])}\n`,
    ),
    writeFile(
      resolve(OUTPUT_DIR, "manual-review.csv"),
      `${toCsv(manualReviewRows, [
        { header: "current_url", key: "currentUrl" },
        { header: "title", key: "title" },
        { header: "action", key: "action" },
        { header: "proposed_new_url", key: "proposedNewUrl" },
        { header: "review_reasons", key: "reasons" },
      ])}\n`,
    ),
    writeFile(resolve(OUTPUT_DIR, "manual-review.md"), manualReviewDocument),
    writeFile(
      resolve(OUTPUT_DIR, "issues.json"),
      `${JSON.stringify(issues, null, 2)}\n`,
    ),
    writeFile(
      resolve(OUTPUT_DIR, "source-summary.json"),
      `${JSON.stringify(
        {
          summary,
          sitemapData,
          wordPressTypes: wordPress.types.map(({ records, ...type }) => ({
            ...type,
            recordCount: records.length,
          })),
        },
        null,
        2,
      )}\n`,
    ),
    writeFile(resolve(OUTPUT_DIR, "README.md"), report),
    writeFile(
      resolve(CACHE_DIR, "wordpress-public-export.json"),
      `${JSON.stringify(wordPress, null, 2)}\n`,
    ),
    writeFile(
      resolve(CACHE_DIR, "page-fetch-results.json"),
      `${JSON.stringify(fetchedPages, null, 2)}\n`,
    ),
  ]);

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
