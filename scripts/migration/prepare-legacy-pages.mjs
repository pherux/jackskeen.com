import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import sharp from "sharp";

// Public export already captured by audit:migration. No account writes.
const source = JSON.parse(
  await readFile(".migration-cache/wordpress-public-export.json", "utf8"),
);
const pages = source.types.find((type) => type.type === "page").records;
const crawl = JSON.parse(
  await readFile(".migration-cache/page-fetch-results.json", "utf8"),
);
const inventory = JSON.parse(
  await readFile("docs/migration/migration-inventory.json", "utf8"),
);
const testimonialPaths = crawl
  .filter((entry) =>
    new URL(entry.candidate.url).pathname.startsWith("/testimonials/"),
  )
  .map((entry) =>
    new URL(entry.candidate.url).pathname.replace(/^\/|\/$/g, ""),
  );
const slugs = [
  "community",
  "purpose",
  "power",
  "humility",
  "gladys-turtle",
  "about-tcb",
  "free-books",
  "free-ebook",
  "faqs",
  "executive-coaching",
  "roadmap-essentials",
  "the-civility-essays",
  ...testimonialPaths,
];
await mkdir("public/images/legacy", { recursive: true });
const output = [];
for (const slug of slugs) {
  let record = pages.find((page) => page.slug === slug);
  if (slug.startsWith("testimonials")) {
    const entry = crawl.find(
      (entry) => new URL(entry.candidate.url).pathname === `/${slug}/`,
    );
    const doc = cheerio.load(entry.fetchResult.body);
    doc(".thim-social-share, .social-share").remove();
    const title =
      inventory
        .find((item) => item.pathname === `/${slug}/`)
        ?.title?.replace(/\s*[–—-]\s*Jack Skeen$/, "") || entry.pageData.title;
    record = {
      id: null,
      title: { rendered: title },
      content: { rendered: doc("main").html() },
      date_gmt: null,
      modified_gmt: null,
      link: entry.candidate.url,
    };
  }
  if (!record || record.content.protected)
    throw Error(`Missing public source: ${slug}`);
  const $ = cheerio.load(record.content.rendered, null, false);
  $("iframe").each((i, node) => {
    const src = $(node).attr("src") || "";
    const id = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/)?.[1];
    $(node).replaceWith(
      id
        ? `<p><a href="https://www.youtube.com/watch?v=${id}">Watch the original video</a></p>`
        : "",
    );
  });
  $(
    "script,style,form,button,input,textarea,select,object,embed,link,meta,svg,noscript",
  ).remove();
  const images = [];
  for (const node of $("img").toArray()) {
    const src = $(node).attr("src");
    if (!src) continue;
    const url = new URL(src, "https://jackskeen.com");
    if (
      url.hostname !== "jackskeen.com" ||
      !url.pathname.startsWith("/wp-content/uploads/")
    )
      continue;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw Error(`Image ${url}: ${response.status}`);
    const file = `/images/legacy/${createHash("sha256").update(url.href).digest("hex").slice(0, 16)}.webp`;
    const info = await sharp(Buffer.from(await response.arrayBuffer()))
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(`public${file}`);
    images.push({
      src: file,
      width: info.width,
      height: info.height,
      alt: $(node).attr("alt") || "",
      source: url.href,
    });
  }
  $("img").remove();
  const allowed = new Set([
    "p",
    "br",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "a",
    "h2",
    "h3",
    "h4",
    "blockquote",
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
  for (const node of $("*").toArray().reverse()) {
    const element = $(node);
    if (node.tagName === "h1") node.tagName = "h2";
    if (!allowed.has(node.tagName)) {
      element.replaceWith(element.html() || "");
      continue;
    }
    const href = element.attr("href");
    for (const name of Object.keys(node.attribs || {}))
      element.removeAttr(name);
    if (node.tagName === "a" && href) {
      if (href.includes("#collapse_accordion")) continue;
      const url = new URL(href, "https://jackskeen.com");
      if (
        ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) &&
        !url.hostname.endsWith(".local")
      )
        element.attr(
          "href",
          url.hostname === "jackskeen.com"
            ? `${url.pathname}${url.search}${url.hash}`
            : url.href,
        );
    }
  }
  let previousHeading = 1;
  $("h2,h3,h4").each((i, node) => {
    const level = Math.min(Number(node.tagName.slice(1)), previousHeading + 1);
    node.tagName = `h${level}`;
    previousHeading = level;
  });
  $("a").each((i, node) => {
    if (!$(node).attr("href") || !$(node).text().trim())
      $(node).replaceWith($(node).html() || "");
  });
  const html = $.html().replace(/\[optin-monster-inline[^\]]*\]/g, "");
  const text = $.text().replace(/\s+/g, " ").trim();
  const pathname = ["executive-coaching", "roadmap-essentials"].includes(slug)
    ? `/work-with-jack/${slug}`
    : `/${slug}`;
  output.push({
    pathname,
    title: cheerio.load(record.title.rendered).text(),
    bodyHtml: html,
    images,
    description: text.slice(0, 155),
    publishedAt: record.date_gmt ? record.date_gmt + "Z" : null,
    updatedAt: record.modified_gmt ? record.modified_gmt + "Z" : null,
    sourceUrl: record.link,
    wordpressId: record.id,
    sourceHash: createHash("sha256")
      .update(record.content.rendered)
      .digest("hex"),
    deferredSignup: ["community", "free-ebook"].includes(slug),
  });
}
// The old testimonial archive paginated the same 13 preserved public records.
// Collect them at one equivalent archive without dropping the second page.
const testimonialArchive = output.find(
  (page) => page.pathname === "/testimonials",
);
const testimonials = output.filter((page) =>
  page.pathname.startsWith("/testimonials/"),
);
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
if (testimonialArchive) {
  testimonialArchive.bodyHtml = testimonials
    .map(
      (page) =>
        `<section><h2><a href="${page.pathname}">${escapeHtml(page.title)}</a></h2>${page.bodyHtml}</section>`,
    )
    .join("\n");
  testimonialArchive.description =
    "Read the original reader testimonials for The Circle Blueprint, preserved from Jack Skeen’s website.";
}
await writeFile(
  "src/data/legacy-pages.json",
  JSON.stringify(output, null, 2) + "\n",
);
const pdfPath =
  "public/wp-content/uploads/2024/02/JSkeen-Speaker-One-Sheet.pdf";
await mkdir("public/wp-content/uploads/2024/02", { recursive: true });
const pdfResponse = await fetch(
  "https://jackskeen.com/wp-content/uploads/2024/02/JSkeen-Speaker-One-Sheet.pdf",
);
if (!pdfResponse.ok) throw Error(`Speaker PDF: ${pdfResponse.status}`);
const pdf = Buffer.from(await pdfResponse.arrayBuffer());
if (pdf.subarray(0, 5).toString() !== "%PDF-")
  throw Error("Speaker download is not a PDF");
await writeFile(pdfPath, pdf);
const downloads = new Set();
for (const page of output) {
  const $ = cheerio.load(page.bodyHtml);
  $("a[href]").each((i, node) => {
    const href = $(node).attr("href");
    if (/^\/wp-content\/uploads\/.*\.pdf$/i.test(href)) downloads.add(href);
  });
}
for (const href of downloads) {
  const file = resolve("public", `.${href}`);
  if (
    !file.startsWith(resolve("public") + "\\") &&
    !file.startsWith(resolve("public") + "/")
  )
    throw Error("Invalid download path");
  const response = await fetch(`https://jackskeen.com${href}`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw Error(`Download ${href}: ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.subarray(0, 5).toString() !== "%PDF-")
    throw Error(`Invalid PDF: ${href}`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, data);
}
console.log(
  `Prepared ${output.length} legacy pages and ${downloads.size + 1} original PDFs.`,
);
