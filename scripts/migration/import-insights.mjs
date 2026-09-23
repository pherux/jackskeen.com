import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import sharp from "sharp";

// Run from the repository root. Network is needed only when importing, never at runtime.
const cache = ".migration-cache/insights";
const origin = "https://jackskeen.com";
const refresh = process.argv.includes("--refresh");
await Promise.all(
  [
    cache,
    "src/data/insights",
    "public/images/insights",
    "docs/migration/insights",
  ].map((path) => mkdir(path, { recursive: true })),
);
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const saveJson = async (path, data) =>
  writeFile(path, JSON.stringify(data, null, 2) + "\n");
async function request(url, binary = false) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return binary
        ? Buffer.from(await response.arrayBuffer())
        : await response.text();
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}
async function mapLimit(items, callback, limit = 3) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await callback(items[index], index);
      }
    }),
  );
  return results;
}
const text = (html) => {
  const $ = cheerio.load(html || "");
  $("br").replaceWith(" ");
  $("p,li,div,h1,h2,h3,h4").append(" ");
  return $.text().replace(/\s+/g, " ").trim();
};
const shorten = (value, length) =>
  value.length <= length
    ? value
    : value.slice(0, length - 1).replace(/\s+\S*$/, "") + "…";
let posts;
if (!refresh && existsSync(`${cache}/posts.json`))
  posts = await readJson(`${cache}/posts.json`);
else {
  const response = await fetch(
    `${origin}/wp-json/wp/v2/posts?per_page=100&_embed=1`,
  );
  if (!response.ok) throw Error("WordPress export failed");
  posts = await response.json();
  for (
    let page = 2;
    page <= Number(response.headers.get("x-wp-totalpages"));
    page++
  )
    posts.push(
      ...JSON.parse(
        await request(
          `${origin}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`,
        ),
      ),
    );
  await saveJson(`${cache}/posts.json`, posts);
}
let independence;
if (!refresh && existsSync(`${cache}/independence.json`))
  independence = await readJson(`${cache}/independence.json`);
else {
  independence = JSON.parse(
    await request(`${origin}/wp-json/wp/v2/pages/7233?_embed=1`),
  );
  await saveJson(`${cache}/independence.json`, independence);
}
const inventory = await readJson("docs/migration/migration-inventory.json");
const imageAlt = existsSync("src/data/insights/image-alt.json")
  ? await readJson("src/data/insights/image-alt.json")
  : {};
const decisions = [];
const transformations = [];
const mediaManifest = [];
const redirects = [
  {
    source: "/loner-or-lover",
    destination: "/civility-loner-of-lover",
    statusCode: 301,
  },
  {
    source: "/learning-to-play-a-friendly-game-of-tennis",
    destination: "/civility-listening",
    statusCode: 301,
  },
  { source: "/blog", destination: "/insights", statusCode: 301 },
  { source: "/category/blog", destination: "/insights", statusCode: 301 },
  { source: "/author/jack", destination: "/insights", statusCode: 301 },
  { source: "/insights/articles", destination: "/insights", statusCode: 301 },
  {
    source: "/insights/videos",
    destination: "/insights?format=video",
    statusCode: 301,
  },
  {
    source: "/category/video",
    destination: "/insights?format=video",
    statusCode: 301,
  },
  {
    source: "/type/video",
    destination: "/insights?format=video",
    statusCode: 301,
  },
];
const consolidated = new Map(
  redirects.slice(0, 2).map((r) => [r.source.slice(1), r.destination.slice(1)]),
);
const replacements = new Map(redirects.map((r) => [r.source, r.destination]));
replacements.set("/about-jack-skeen", "/about");
replacements.set("/the-roadmap", "/roadmap");
const extraTopics = {
  "creating-community-fun": "Relationships",
  community: "Relationships",
  independence: "Circle Blueprint",
};
function cleanBody(html, slug) {
  const $ = cheerio.load(html, null, false);
  $("script,style,form,button,input,object,embed,iframe,link,meta,svg").each(
    (i, element) => {
      transformations.push({
        slug,
        change: "Removed executable/embedded markup",
        tag: element.tagName,
      });
      $(element).remove();
    },
  );
  const allowed = new Set([
    "p",
    "br",
    "em",
    "strong",
    "ul",
    "ol",
    "li",
    "a",
    "h2",
    "h3",
    "h4",
    "blockquote",
    "u",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "sup",
    "sub",
    "hr",
  ]);
  $("*")
    .toArray()
    .reverse()
    .forEach((element) => {
      const node = $(element);
      if (!allowed.has(element.tagName)) {
        node.replaceWith(node.contents());
        return;
      }
      const href = node.attr("href");
      for (const attr of Object.keys(element.attribs || {}))
        node.removeAttr(attr);
      if (element.tagName === "a" && href) {
        try {
          const url = new URL(href, origin);
          if (
            !["http:", "https:", "mailto:"].includes(url.protocol) ||
            /affiliatelabz|israelnightclub|filmmodu|\.local$/.test(url.hostname)
          ) {
            node.replaceWith(node.contents());
            transformations.push({ slug, change: "Removed unsafe link", href });
            return;
          }
          const path = url.pathname.replace(/\/$/, "") || "/";
          if (["jackskeen.com", "www.jackskeen.com"].includes(url.hostname))
            node.attr(
              "href",
              (replacements.get(path) || path) + url.search + url.hash,
            );
          else if (
            url.hostname === "calendly.com" &&
            url.pathname === "/jackskeen/roadmap-discovery"
          )
            node.attr("href", "/start");
          else {
            node.attr("href", href);
            if (url.protocol !== "mailto:")
              node.attr("rel", "noopener noreferrer");
          }
        } catch {
          node.replaceWith(node.contents());
        }
      }
    });
  $("p").each((i, element) => {
    const node = $(element);
    if (!text(node.html())) {
      node.remove();
      return;
    }
    if (
      /^schedule a free call[.!]?\s*(with me)?$/i.test(node.text().trim()) &&
      !node.find("a").length
    )
      node.wrapInner('<a href="/start"></a>');
  });
  let previousHeading = 1;
  $("h2,h3,h4").each((i, element) => {
    const level = Math.min(
      Number(element.tagName.slice(1)),
      previousHeading + 1,
    );
    if (element.tagName !== `h${level}`) {
      transformations.push({
        slug,
        change: "Normalized heading level without changing text",
        from: element.tagName,
        to: `h${level}`,
      });
      element.tagName = `h${level}`;
    }
    previousHeading = level;
  });
  // Comments can contain tracking markup; they are not editorial content.
  return $.html()
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}
async function imageAsset(url, key, alt = "", caption = "") {
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 10);
  const path = `/images/insights/${key}-${hash}.webp`;
  if (!existsSync(`public${path}`)) {
    const bytes = await request(url, true);
    await sharp(bytes)
      .rotate()
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(`public${path}`);
  }
  const metadata = await sharp(`public${path}`).metadata();
  mediaManifest.push({
    sourceUrl: url,
    localPath: path,
    width: metadata.width,
    height: metadata.height,
    originalAlt: alt,
    caption,
  });
  return {
    src: path,
    width: metadata.width,
    height: metadata.height,
    alt,
    caption,
  };
}
async function getVideo(post, html) {
  const $ = cheerio.load(html);
  // Only the primary post-format video; related-post and sidebar embeds are excluded.
  const src =
    $(
      `#post-${post.id} > .post-formats-wrapper iframe, #post-${post.id} .post-formats-wrapper iframe`,
    )
      .first()
      .attr("src") || $(".entry-content iframe").first().attr("src");
  const id = src?.match(
    /(?:youtube(?:-nocookie)?\.com\/embed\/)([\w-]{11})/,
  )?.[1];
  if (!id) return null;
  const file = `${cache}/video-${id}.json`;
  let video;
  if (!refresh && existsSync(file)) video = await readJson(file);
  else {
    const watch = await request(`https://www.youtube.com/watch?v=${id}`);
    const raw = watch.match(
      /var ytInitialPlayerResponse\s*=\s*(\{[\s\S]*?\});/,
    );
    const player = raw ? JSON.parse(raw[1]) : null;
    const details = player?.videoDetails;
    const micro = player?.microformat?.playerMicroformatRenderer;
    video = {
      id,
      title: details?.title || text(post.title.rendered),
      description: details?.shortDescription || "",
      duration: Number(details?.lengthSeconds) || 0,
      publishedAt: micro?.publishDate || "",
      available: Boolean(details),
      sourceUrl: `https://www.youtube.com/watch?v=${id}`,
    };
    await saveJson(file, video);
  }
  return video;
}
const articles = await mapLimit(posts, async (original) => {
  const slug = original.slug;
  if (consolidated.has(slug)) {
    decisions.push({
      wordpressId: original.id,
      source: original.link,
      action: "301",
      destination: `/${consolidated.get(slug)}`,
      reason:
        "Near-identical republication (98%+ in the original audit). Retain the older established URL and original publication date; reuse the newer featured artwork where the original has none.",
    });
    return null;
  }
  const post = slug === "independence" ? independence : original;
  const pathname =
    slug === "community" ? "/creating-community-fun" : `/${slug}`;
  const title = text(post.title.rendered);
  const rawBody = post.content.rendered || "";
  if (/<img\b/i.test(rawBody))
    throw Error(`Inline images need mapping before publication: ${slug}`);
  let video = null;
  if (!text(rawBody) || /<iframe\b/i.test(rawBody)) {
    const htmlFile = `${cache}/page-${slug}.html`;
    const html =
      !refresh && existsSync(htmlFile)
        ? await readFile(htmlFile, "utf8")
        : await request(post.link);
    await writeFile(htmlFile, html);
    video = await getVideo(post, html);
    if (!text(rawBody) && !video)
      throw Error(`No recoverable content: ${slug}`);
  }
  const bodyHtml = cleanBody(rawBody, slug);
  const contentText = text(bodyHtml);
  const kind = contentText ? "article" : "video";
  const row = inventory.find((r) => r.pathname === `/${slug}/`);
  const topic = extraTopics[slug] || row?.proposedPrimaryTopic || "Reflections";
  let media = post._embedded?.["wp:featuredmedia"]?.[0];
  let mediaSource = "original";
  if (!media?.source_url) {
    const newerSlug = [...consolidated.entries()].find(
      ([, target]) => target === slug,
    )?.[0];
    media = posts.find((p) => p.slug === newerSlug)?._embedded?.[
      "wp:featuredmedia"
    ]?.[0];
    if (media?.source_url) mediaSource = "same-article republication";
  }
  let image = null;
  if (media?.source_url)
    image = await imageAsset(
      media.source_url,
      String(media.id),
      text(media.alt_text),
      text(media.caption?.rendered),
    );
  else if (video?.available)
    image = await imageAsset(
      `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      video.id,
    );
  if (image && !image.alt) image.alt = imageAlt[pathname] || "";
  const firstParagraph =
    cheerio
      .load(bodyHtml)("p")
      .map((i, el) => text(cheerio.load(bodyHtml)(el).html()))
      .get()
      .find((p) => p.length > 80 && !/^[“"‘]|^Civility is defined/i.test(p)) ||
    contentText;
  const excerpt =
    kind === "video"
      ? `Watch Jack Skeen’s original video, “${title},” from his ${topic === "Circle Blueprint" ? "Circle Blueprint" : topic.toLowerCase()} archive.`
      : shorten(firstParagraph, 220);
  const seoTitle = `${title}${slug.startsWith("are-you-thriving") ? ` (${post.date.slice(0, 4)})` : kind === "video" ? " — Video" : ""}`;
  const description = shorten(
    `${title} — ${kind === "video" ? excerpt : `A reflection by Jack Skeen. ${firstParagraph}`}`,
    158,
  );
  const reason =
    slug === "community"
      ? "The WordPress post was shadowed by a separate community landing page. Recover its full article at a distinct descriptive URL without redirecting the unrelated landing page."
      : slug === "independence"
        ? "The published WordPress page owns this URL. Preserve that page’s substantive body, video, authorship, and publication date rather than the shadowed empty post."
        : kind === "video"
          ? "Recovered the original primary video from the rendered post format; no replacement article or transcript invented."
          : slug === "allies-or-enemies" ||
              slug === "civility-allies-or-enemies"
            ? "Retained both editions: the later article has substantial distinct introductory material; no traffic evidence justifies discarding either."
            : "Preserved original editorial text, author, publication date, and URL. Removed presentation/tracking code only.";
  decisions.push({
    wordpressId: original.id,
    source: original.link,
    action: slug === "community" ? "RECOVER_AT_NEW_URL" : "KEEP",
    destination: pathname,
    kind,
    reason,
    sourceRecordId: post.id,
    mediaSource,
    hasImage: Boolean(image),
  });
  console.log(
    `${slug}: ${kind}${image ? " + image" : ""}${video ? " + video" : ""}`,
  );
  return {
    id: post.id,
    originalPostId: original.id,
    pathname,
    title,
    author: post._embedded?.author?.[0]?.name || "Jack Skeen",
    publicationDate: post.date,
    publicationDateGmt: post.date_gmt + "Z",
    updatedDate: post.modified,
    updatedDateGmt: post.modified_gmt + "Z",
    topic,
    kind,
    canonicalUrl: origin + pathname,
    originalCanonicalUrl: post.link,
    excerpt,
    description,
    seoTitle,
    bodyHtml,
    image,
    video,
    readMinutes: Math.max(1, Math.ceil(contentText.split(/\s+/).length / 220)),
    sourceHash: createHash("sha256").update(rawBody).digest("hex"),
  };
});
const published = articles
  .filter(Boolean)
  .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
if (new Set(published.map((p) => p.pathname)).size !== published.length)
  throw Error("Duplicate canonical routes");
if (new Set(published.map((p) => p.seoTitle)).size !== published.length)
  throw Error("Duplicate SEO titles");
await saveJson("src/data/insights/articles.json", published);
await saveJson("src/data/insights/redirects.json", redirects);
await saveJson(
  "docs/migration/insights/decisions.json",
  decisions.sort((a, b) => a.source.localeCompare(b.source)),
);
await saveJson("docs/migration/insights/media-manifest.json", mediaManifest);
await saveJson("docs/migration/insights/transformations.json", transformations);
await saveJson("docs/migration/insights/summary.json", {
  importedAt: new Date().toISOString(),
  sourceRecords: posts.length,
  publishedPages: published.length,
  articles: published.filter((p) => p.kind === "article").length,
  videos: published.filter((p) => p.kind === "video").length,
  images: published.filter((p) => p.image).length,
  redirects: redirects.length,
  decisions: decisions.length,
  unavailableVideos: published
    .filter((p) => p.video && !p.video.available)
    .map((p) => p.pathname),
});
console.log(
  `Imported ${published.length} pages; accounted for ${decisions.length} original posts.`,
);
