# Insights migration — September 23, 2026

## Result

The new Insights section publishes **113 canonical entries: 103 articles and 10 original video posts**. All **115 WordPress post records** are accounted for in `decisions.json`; two near-identical republications redirect to older editions.

The archive supports full-text search, eight topic pages, article/video filters, and crawlable pagination. Article pages preserve the original editorial text, visible author and publication date, supported formatting, related reading, and contextual Roadmap links. Images are served locally through `next/image`; normal site operation does not need WordPress.

## Sources and provenance

- WordPress public REST API: `https://jackskeen.com/wp-json/wp/v2/posts?per_page=100&page=1&_embed=1` and page 2.
- The published Independence page: `https://jackskeen.com/wp-json/wp/v2/pages/7233?_embed=1`.
- Rendered original pages supply the primary post-format videos, which are absent from the REST article bodies. Sidebar and related-post videos are excluded.
- YouTube watch metadata supplies each recovered video's ID, original title, duration, and upload timestamp. All 11 embedded videos (including the substantive Independence article) were available in the source metadata.
- The existing migration inventory supplies topic mappings. The recovered Creating Community Fun article is assigned to Relationships.
- Raw inputs are cached in `.migration-cache/insights/` (gitignored). The typed, sanitized publication snapshot is `src/data/insights/articles.json`; original source URLs, WordPress IDs, source timestamps, and raw-body hashes are retained there.

## Editorial decisions

| Source | Decision |
| --- | --- |
| `/loner-or-lover/` | Exact 301 to `/civility-loner-of-lover`. Preserve the older original text and publication date; retain the newer edition's available artwork. |
| `/learning-to-play-a-friendly-game-of-tennis/` | Exact 301 to `/civility-listening`, with the same preservation approach. |
| `/allies-or-enemies/` and `/civility-allies-or-enemies/` | Keep both. The later edition has materially different introductory content; there is no traffic/backlink evidence warranting its removal. |
| WordPress post 7649 at `/community/` | Recover its full article as `/creating-community-fun`. The original URL is occupied by a separate community signup page, so it is not redirected to unrelated article content. That signup page is outside this blog migration. |
| WordPress post 6986 at `/independence/` | The empty post is shadowed by substantive page 7233. Preserve the currently published page's body, video, original date, and author at `/independence`. Do not substitute the shadowed post's date. |
| Ten remaining empty REST bodies | Recover their original primary videos at the same routes. Identify them as videos, not invented written articles. No transcripts or claims about their contents were fabricated. |
| Older posts with missing media records | Keep the full article as text. Fourteen deleted WordPress attachment IDs affect 15 source posts; all returned 404. See `unavailable-media.json`. No replacement photography is invented. |

The final `decisions.json` supersedes the older blog-specific proposals in `docs/migration/migration-inventory.json`. Decisions for unrelated marketing, taxonomy, and custom WordPress content remain outside this task.

## Content and media handling

- Original article wording is unchanged, including historical references and original quotations. No automatic article rewrite or new publication date is applied.
- HTML is transformed through an explicit tag/attribute allowlist. Script, tracking, form, inline style, and executable embed markup is removed. Original video embeds are reconstructed as typed components.
- Old embedded Calendly widgets are removed. Existing call-to-action text links to `/start`. Internal article links point to their final local routes.
- Skipped heading levels are normalized without changing heading text. Lists, emphasis, tables, and links remain readable.
- All 53 available article images/video posters are copied to the new site, resized without upscaling, and converted to WebP. Source URLs and original dimensions after optimization are recorded in `media-manifest.json`.
- The source featured images had no alt text. `src/data/insights/image-alt.json` contains descriptions written after visual inspection of every imported image. Article images use these descriptions; redundant linked-card imagery and video posters use empty alt attributes.
- Captions are preserved when present. No inline body images occurred in this source export. The importer deliberately fails if future input contains inline images so they cannot be silently lost.
- Original upload timestamps are used for VideoObject schema; original WordPress publication dates are used for the archive entries. Migration time is never presented as the article's publication date.

## SEO and URL handling

- Original root-level article routes remain accessible, with the two editorial redirects and one recovered article route described above.
- Trailing-slash aliases remain accessible and share one canonical without a trailing slash. Redirect sources work with or without the trailing slash and use a single exact 301.
- `/blog`, `/category/blog`, `/author/jack`, and `/insights/articles` redirect to `/insights`. Video archive aliases redirect to the filtered video view.
- Metadata includes unique titles and descriptions, author information, canonical URLs, Open Graph/Twitter fields, and available social images. Descriptions are new snippets based on the original text because the public source did not expose meta descriptions.
- Article/WebPage, VideoObject, CollectionPage/ItemList, and breadcrumb structured data reflect visible content. Search and format-filter views are noindex with the base archive canonical; unfiltered pagination has its own canonical page URL.
- Redirect sources are excluded from the sitemap; all published entries and topic hubs are included.
- Indexing continues to use the existing `NEXT_PUBLIC_SITE_INDEXABLE` switch. No DNS, Search Console, crawler-policy, or launch-indexing change is made by this migration.

## Running and maintaining the import

```text
npm run migrate:insights
npm run migrate:insights -- --refresh
npm run build
npm run start
npm run verify:insights
```

The first import uses cached sources if present; `--refresh` refreshes the structured WordPress and video/page sources. Review the generated decision and transformation reports before committing a refreshed import. The importer aborts on missing bodies/videos, unsupported inline images, failed downloads, duplicate routes, and duplicate SEO titles.

The `sharp` development dependency supports media optimization. No new production environment variables or service credentials are required. Sanity was not configured in this workspace; this migration uses the version-controlled typed content snapshot rather than claiming to publish into an unconfigured CMS. The existing separate Sanity schemas remain available for a future editor integration.

## Verification

`npm run verify:insights` checks every published page, original text/date preservation against cached sources, local image dimensions, unique metadata/canonicals, author attribution, structured data, all internal body links, both forms of every redirect, complete discovery through all archive pages, filtering, empty results, and unknown-topic handling. See `verification.json` for the final run.

Next.js can stream a loading shell before detecting an out-of-range query page or unknown topic. These requests render the not-found view with explicit noindex, verified in the browser; the HTTP stream may already have status 200. The automated check verifies the 404 boundary payload and noindex rather than claiming a hard HTTP 404.

Browser review covers the archive and representative long, image-led, and text-only articles at phone, tablet, and desktop widths, plus search, format filters, and topic navigation. The YouTube playback limitation of the in-app browser remains: embedded player activation has a loading fallback and a direct original-video link. No unsupported claim of verified video streaming, Lighthouse score, or guaranteed search rankings is made.
