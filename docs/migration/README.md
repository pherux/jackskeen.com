# Existing-Site Migration Audit

Generated: 2026-08-31T13:30:32.877Z

## Scope and evidence

This audit covers 218 canonical public content URLs discovered from the live WordPress sitemap index, public WordPress REST records, and Firecrawl map output. Operational endpoints (WordPress REST routes, admin/login, feeds, robots, and sitemap XML files) and individual media-library assets are not treated as indexable content URLs; the one PDF surfaced by public discovery is included.

No local WordPress XML/database export was present. The public REST API supplied structured fields for 142 published records, while the sitemap supplied 219 URLs and Firecrawl supplied 218 URLs. Traffic, Search Console, analytics, and backlink data were unavailable, so “potential SEO value” is a heuristic requiring manual validation.

## Migration actions

| Action | URLs |
| --- | --- |
| KEEP | 88 |
| UPDATE | 31 |
| CONSOLIDATE | 20 |
| REDIRECT | 19 |
| REMOVE | 59 |
| NOINDEX | 1 |

## Findings

- Exact duplicate content groups: 3
- Near-duplicate article pairs: 4
- Duplicate WordPress slugs across published types: 2
- Broken internal links: 2
- Broken/unreachable external content links: 2
- External checks blocked by the destination: 2
- Broken images: 0
- Suspicious external links requiring removal/security review: 4
- Potential orphan content URLs: 50
- Observed domain/sitemap redirect hops: 5
- Pages with legacy builder/shortcode markup: 13
- Pages with recognizable unrendered legacy shortcodes/plugin tokens: 0
- Pages with unsupported external embeds: 3
- Non-200 public URLs: 2
- Pages missing meta descriptions: 218

Thin tag/category/author/format/custom-taxonomy archives are not reproduced. A small number of taxonomy URLs map directly to an approved topic hub; the rest are proposed for removal rather than unrelated homepage redirects. Existing article URLs remain at the root wherever practical.

## Migration risks

- The current sitemap lists `/portfolio-category/books/` and `/portfolio-category/presentations/`, but both return 404 and are linked internally.
- Five pages contain one or more suspicious external links. The destinations include a `.local` development hostname and unrelated domains (Affiliate Labz, Israel Nightclub, and Film Modu). Treat this as a content-integrity/security review, not normal editorial linking.
- WordPress publishes both a post and a page at each of `/community/` and `/independence/`. The sitemap duplicates both URLs, so the inaccessible/shadowed record must be resolved from an authenticated export.
- Three newer articles are near-identical to older articles and are proposed for consolidation into the older URL. Search Console and backlink data must confirm the winning URL before any redirect is applied.
- 50 public records appear orphaned from links in the rendered site crawl. Some may be intentionally accessible only through search/sitemap, but all need an internal-link or removal decision.
- All 218 audited URLs lack a rendered meta description. Metadata must be reconstructed or supplied in Sanity rather than assumed to exist in WordPress SEO fields.
- Thirteen key pages depend on Elementor/Thim builder markup. No recognizable unrendered shortcodes were exposed in public rendered HTML, but an authenticated WordPress export may reveal raw shortcodes that the REST-rendered output hides.
- Testimonial.to embeds appear on the homepage, testimonials page, and Roadmap Essentials. Approved testimonial source data and consent must be obtained before replacing the embeds.
- The redirect proposal specifies HTTP 301 as required by the migration plan. The implementation must resolve the documented Next.js/Vercel 308 compatibility question before redirects are loaded.

## Manual review

70 URLs require manual review. See `manual-review.csv` for reasons. Highest priority is any URL marked CONSOLIDATE, REDIRECT, NOINDEX, substantial/potential SEO value, strategic page, non-200, legacy markup, or unsupported embed.

## Known limitations

- No authenticated WordPress export, Search Console, GA4, or backlink export was available.
- Meta fields reflect rendered public HTML; plugin-private SEO fields unavailable through REST cannot be recovered here.
- Generated social-share links were excluded from external validation. External destinations returning 401/403/429/999 are reported separately because bot protection can create false failures.
- Featured-image data is available for REST-backed records or inferred from Open Graph metadata; non-REST archive pages may have no meaningful featured image.
- Redirects are proposals only. They must not be loaded until editorial review, collision tests, and the 301-versus-308 implementation decision are complete.

## Deliverables

- `migration-inventory.csv` — authoritative per-URL migration plan
- `migration-inventory.json` — machine-readable inventory with diagnostics
- `proposed-redirect-map.csv` — redirect/consolidation proposals, not production config
- `observed-redirects.csv` — current domain/sitemap redirect behavior from live probes
- `manual-review.csv` — URLs and review reasons
- `manual-review.md` — human-readable review queue
- `issues.json` — duplicates, link/image failures, embeds, and slug findings
- `source-summary.json` — reproducibility and source coverage

## Recommended next step before UI implementation

Obtain an authenticated WordPress XML/database and media export plus Search Console landing-page/query data, GA4 landing-page data, and a backlink-target export. Reconcile those sources against this inventory, resolve the two duplicate-slug records and suspicious links, and approve every manual-review and redirect decision. Freeze the URL map and CMS content model before wireframes or marketing-page implementation begins.
