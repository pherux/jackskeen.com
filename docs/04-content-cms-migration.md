# Content, CMS, and Migration Plan

## 1. Migration objective

Preserve valuable legacy content and search equity while reorganizing the website around a cleaner content architecture.

Do not treat migration as a copy/paste operation.

## 2. Required content inventory

Before implementation freeze, crawl the existing site and create a migration inventory with:

- Current URL
- Page title
- Content type
- WordPress ID if available
- Status
- Publication date
- Updated date
- Author
- Current category
- Current tags
- Featured image
- Body media
- Canonical
- Meta title
- Meta description
- Existing redirects
- Approximate organic traffic
- Backlinks/referring domains when available
- New content type
- Primary new topic
- New URL
- Migration action
- Notes

## 3. Migration actions

Every indexed/known URL must receive one action:

### KEEP

Preserve the URL and content.

### UPDATE

Preserve URL, migrate, then improve content after launch.

### CONSOLIDATE

Combine overlapping content into a stronger destination and redirect originals.

### REDIRECT

Content has moved to an equivalent destination.

### REMOVE

No useful destination; respond with 404 or 410.

### NOINDEX

Keep accessible but intentionally exclude from search where justified.

## 4. URL preservation

Preserve old article URLs wherever practical.

Do not change URLs simply to match the new folder hierarchy.

If URL changes are required:

- Use HTTP 301.
- Redirect source to the closest equivalent destination.
- Avoid redirect chains.
- Update internal links to the final URL.
- Update sitemap to the final URL.
- Use final URL as canonical.

## 5. WordPress export

Potential sources:

- WordPress XML export
- WordPress REST API
- Direct database export if available
- Media library export
- Existing sitemap

Preferred workflow:

1. Export structured content.
2. Convert HTML into Sanity Portable Text or a validated compatible representation.
3. Upload images and preserve metadata.
4. Preserve publication dates.
5. Preserve author attribution.
6. Preserve old slug.
7. Assign new primary topic.
8. Validate content output.
9. Generate a migration report.

## 6. HTML cleanup

Legacy WordPress content may contain:

- Inline styles
- Shortcodes
- WordPress blocks
- Broken embeds
- Empty paragraphs
- Old tracking markup
- Nonsemantic headings
- Absolute URLs
- Image captions
- Legacy forms
- Plugin HTML

Build a transformation pipeline instead of manually cleaning hundreds of pages.

Transformation rules must be documented and tested against representative old posts.

## 7. Images

For each legacy image:

- Verify file exists.
- Import into the approved media system where practical.
- Preserve caption.
- Preserve useful alt text.
- Flag missing or meaningless alt text.
- Avoid hotlinking the old WordPress install after cutover.

## 8. Content taxonomy migration

Do not reproduce current WordPress categories/tags automatically.

Map useful content to the new core topics:

- Purpose
- Success & Fulfillment
- Leadership
- Personal Growth
- Relationships
- Your Genius
- Circle Blueprint
- Reflections

Keep old taxonomy only as non-public migration metadata if useful.

## 9. Content QA

Programmatically validate:

- Empty titles
- Duplicate slugs
- Duplicate canonicals
- Missing publication dates
- Missing author
- Broken images
- Broken links
- Heading hierarchy
- Unsupported embeds
- Missing topic
- Suspiciously empty body
- Invalid external URL
- Redirect conflicts

Then manually inspect a representative sample from:

- Oldest posts
- Newest posts
- Long posts
- Posts with many images
- Posts with embedded media
- High-traffic posts
- High-backlink posts

## 10. Launch migration

### Before DNS/cutover

- Final crawl old site.
- Freeze content changes or document delta procedure.
- Export final data.
- Apply migration.
- Generate redirect map.
- Validate top URLs manually.
- Compare old/new URL counts.
- Compare status codes.
- Generate XML sitemap.
- Confirm canonicals.
- Confirm robots.

### After launch

- Crawl production.
- Check 404 reports.
- Check redirect chains.
- Check Search Console coverage.
- Check sitemap processing.
- Check important legacy URLs.
- Monitor organic landing pages.
- Fix accidental regressions quickly.

## 11. Post-launch content refresh

Do not block launch by rewriting the entire archive.

After stable migration:

Priority 1:
- Pages with traffic/backlinks.
- Content directly related to Roadmap positioning.
- Content with outdated facts.
- Posts ranking positions 4–20.

Priority 2:
- Consolidation opportunities.
- Strong ideas with weak titles.
- Content without clear search intent.

Priority 3:
- Low-value archive cleanup.
