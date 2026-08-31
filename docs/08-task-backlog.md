# Task Backlog

Status legend:

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked

Priority:

- P0 = launch blocking
- P1 = important
- P2 = post-launch / enhancement

---

# EPIC 0 — Decisions and access

- [ ] **P0** Confirm final stack.
- [ ] **P0** Confirm Sanity as CMS.
- [ ] **P0** Confirm Vercel team/project.
- [ ] **P0** Confirm primary domain behavior: `jackskeen.com` vs `www`.
- [ ] **P0** Confirm whether jackskeenlive.com content/offers will consolidate.
- [ ] **P0** Confirm primary CTA behavior and destination.
- [ ] **P0** Obtain WordPress admin/export access.
- [ ] **P0** Obtain DNS access.
- [ ] **P0** Obtain GA4 access.
- [ ] **P0** Obtain Google Search Console access.
- [ ] **P0** Obtain current form/Kit/Calendly integration details.
- [ ] **P1** Obtain backlink-analysis export.
- [ ] **P1** Collect approved logos/assets.
- [ ] **P1** Collect approved Jack photography.
- [ ] **P1** Collect approved testimonials.
- [ ] **P1** Collect podcast/video assets.
- [ ] **P1** Confirm legal/privacy copy.

---

# EPIC 1 — Existing-site audit

- [x] **P0** Crawl current jackskeen.com.
- [!] **P0** Export WordPress XML/content. Blocked pending authenticated WordPress export access; public REST data was captured as an interim source.
- [!] **P0** Export media library. Blocked pending authenticated WordPress/media access; rendered media URLs were inventoried and checked.
- [x] **P0** Export current sitemap.
- [x] **P0** Inventory all indexable URLs.
- [x] **P0** Capture title/meta/canonical/status for URLs.
- [~] **P0** Identify redirect rules. Live domain/sitemap behavior is documented; server-side redirect configuration remains unavailable.
- [!] **P0** Export top organic landing pages. Blocked pending GA4/Search Console access.
- [!] **P1** Export top queries. Blocked pending Search Console access.
- [!] **P1** Export backlink targets. Blocked pending backlink-analysis export.
- [x] **P0** Mark each URL KEEP / UPDATE / CONSOLIDATE / REDIRECT / REMOVE / NOINDEX.
- [x] **P0** Build URL migration map.
- [x] **P1** Identify orphaned content.
- [x] **P1** Identify duplicate/tag/category archives.
- [x] **P1** Identify broken media.
- [x] **P1** Identify broken outbound/internal links.

---

# EPIC 2 — Content strategy

- [x] **P0** Approve primary positioning statement. Strategic recommendation approved 2026-08-31.
- [x] **P0** Approve homepage narrative. Narrative architecture approved 2026-08-31.
- [x] **P0** Approve Roadmap positioning. Strategic framing approved 2026-08-31; factual process details remain source-dependent.
- [x] **P0** Approve offer hierarchy. Strategic order approved 2026-08-31; active-offer specifications still require factual confirmation.
- [x] **P0** Approve sitemap. Strategic routes approved 2026-08-31; unsupported offer routes remain noindex until substantive.
- [x] **P0** Approve eight core topics. Topic system approved 2026-08-31.
- [x] **P1** Map legacy categories to core topics.
- [x] **P1** Create content brief for homepage.
- [x] **P1** Create content brief for Roadmap.
- [x] **P1** Create content brief for About.
- [x] **P1** Create content briefs for Work With Jack offers.
- [x] **P1** Create content brief for Success Stories.
- [!] **P1** Create topic-hub introductions. Briefs are complete; substantive Jack-authored perspectives are required before drafting.
- [x] **P1** Identify FAQ questions.
- [x] **P1** Identify missing photography.
- [x] **P1** Identify missing testimonials.
- [x] **P2** Build 3-month editorial calendar.

---

# EPIC 3 — UX

- [x] **P0** Homepage wireframe. Responsive content-order specification complete.
- [x] **P0** Roadmap wireframe. Responsive overview and support-page flow complete.
- [x] **P0** About wireframe. Authority journey and source gates complete.
- [x] **P0** Article wireframe. Legacy metadata, editorial, and conversion flow complete.
- [x] **P0** Insights wireframe. Format, topic, and featured-content hierarchy complete.
- [x] **P0** Topic page wireframe. Indexation and cross-format rules complete.
- [x] **P1** Podcast wireframe. Listing/detail and transcript requirements complete.
- [x] **P1** Video wireframe. Listing/detail and accessibility requirements complete.
- [x] **P1** Success Stories wireframe. Proof and rights gates complete.
- [x] **P0** Start/contact wireframe. Form states, routing, and integration gates complete.
- [x] **P0** Mobile menu/navigation wireframe. Focus, close, scroll, and target rules complete.
- [x] **P0** Validate CTA hierarchy. Global primary, secondary, and contextual CTAs documented.
- [x] **P1** Validate internal-link strategy. Route contract documented; broken topic breadcrumb corrected and remaining link gaps recorded.

---

# EPIC 4 — Visual design

- [x] **P0** Select typography direction. Cormorant Garamond and Manrope are specified and loaded through `next/font`.
- [x] **P0** Define colors. Deep Atlantic blue, warm paper, ink, clay action accent, and semantic mappings documented.
- [x] **P0** Define spacing scale. Eight-step editorial spacing sequence documented.
- [x] **P0** Define grid/container rules. 1440px canvas, reading measure, responsive columns, and mobile padding documented.
- [x] **P0** Define buttons/links. Primary, inverse, light-surface, editorial, focus, and touch rules documented.
- [x] **P0** Design header/navigation. Desktop and mobile compositions and behavior documented and implemented.
- [x] **P0** Design footer. Deep-blue editorial footer system documented and implemented.
- [x] **P0** Design form controls. Label, focus, error, disabled, success, and submission-gate rules documented.
- [x] **P0** Design article typography. Title, metadata, reading measure, and related-content treatment documented and implemented.
- [x] **P1** Design media embeds. Poster, play, autoplay, transcript, and loading rules documented.
- [x] **P1** Design testimonial treatment. Single-story and verified-attribution rules documented; content remains blocked.
- [x] **P1** Design topic cards/content teasers. Ruled editorial matrix and teaser treatment documented and implemented.
- [x] **P1** Define Circle-inspired geometry. Supplied raster asset rules documented and implemented.
- [x] **P1** Define motion rules. Restrained transition and reduced-motion rules documented and implemented.
- [x] **P0** High-fidelity homepage. Selected reference direction implemented with approved photography and revised deep-blue palette.
- [x] **P0** High-fidelity Roadmap page. Responsive high-fidelity shell implemented; approved content remains pending.
- [x] **P0** High-fidelity article. Responsive high-fidelity shell implemented; migrated body remains pending.
- [x] **P1** High-fidelity About. Responsive high-fidelity shell implemented; verified biography remains pending.
- [x] **P0** Mobile designs. Homepage and shared templates are specified and implemented through 320px.

---

# EPIC 5 — Repository and application foundation

- [x] **P0** Initialize Next.js project.
- [x] **P0** Enable strict TypeScript.
- [x] **P0** Configure Tailwind.
- [x] **P0** Configure shadcn/ui.
- [x] **P0** Configure linting.
- [x] **P0** Configure formatting.
- [x] **P0** Add `.env.example`.
- [ ] **P0** Configure Vercel preview deployment.
- [ ] **P0** Configure CI build/type/lint checks.
- [x] **P0** Add base layout.
- [~] **P0** Add global styles/tokens.
- [ ] **P0** Configure fonts.
- [x] **P0** Add `not-found`.
- [x] **P0** Add global error handling.
- [ ] **P1** Add automated smoke testing.

---

# EPIC 6 — Sanity CMS

- [!] **P0** Create Sanity project/dataset. Blocked pending Sanity CLI authentication and account/project access; repository integration is ready for the real project ID and dataset.
- [x] **P0** Configure Studio.
- [x] **P0** Create site settings schema.
- [x] **P0** Create person schema.
- [x] **P0** Create article schema.
- [x] **P0** Create topic schema.
- [x] **P0** Create podcast schema.
- [x] **P0** Create video schema.
- [x] **P0** Create testimonial schema.
- [x] **P1** Create book schema.
- [x] **P0** Create FAQ schema.
- [x] **P1** Create redirect schema if managed in CMS.
- [x] **P0** Add schema validation.
- [x] **P0** Add typed queries.
- [x] **P0** Implement preview/draft mode.
- [x] **P1** Customize Studio navigation.
- [x] **P1** Add editorial helper text.
- [ ] **P1** Add scheduled publishing if required.

---

# EPIC 7 — Global UI

- [~] **P0** Header. Implemented; final content and navigation approval pending.
- [~] **P0** Desktop navigation. Functional; final sitemap approval pending.
- [~] **P0** Mobile navigation. Functional; final sitemap approval pending.
- [~] **P0** Footer. Implemented; approved copy and social links pending.
- [~] **P0** Buttons. Core variants implemented; final design-system review pending.
- [ ] **P0** Rich-text renderer.
- [~] **P0** Responsive image component/pattern. Next Image patterns implemented; CMS image path pending.
- [~] **P0** Breadcrumbs. Implemented for strategic, topic, and legacy article routes.
- [~] **P0** CTA section. Implemented with visibly marked approval placeholders.
- [ ] **P1** Quote component.
- [ ] **P1** Testimonial component.
- [~] **P1** Article teaser. Implemented from migration inventory metadata; CMS excerpts pending.
- [!] **P1** Podcast teaser. Visual empty state implemented; blocked pending approved episode records.
- [!] **P1** Video teaser. Visual empty state implemented; blocked pending approved video records.
- [~] **P1** FAQ. Accessible Roadmap FAQ treatment implemented; approved answers and CMS records pending.
- [ ] **P1** Newsletter block.
- [~] **P0** Form system. Accessible visual foundation implemented; submission intentionally blocked pending integration decisions.
- [ ] **P1** Loading/skeleton behavior where useful.

---

# EPIC 8 — Core pages

- [~] **P0** Homepage. Visual implementation complete; approved copy/content and CMS wiring pending.
- [~] **P0** Roadmap. Responsive page structure implemented; approved copy/proof pending.
- [~] **P1** Roadmap How It Works. Responsive page structure implemented; approved copy pending.
- [~] **P1** Roadmap Results. Responsive page structure implemented; approved outcomes/proof pending.
- [~] **P1** Roadmap FAQ. Responsive page structure implemented; approved FAQs pending.
- [~] **P0** Work With Jack. Responsive page structure implemented; approved offer copy pending.
- [~] **P1** Executive Coaching. Responsive page structure implemented; approved offer copy pending.
- [~] **P1** Roadmap Essentials. Responsive page structure implemented; approved offer copy pending.
- [~] **P1** Roadmap Discovery Group. Responsive page structure implemented; approved offer copy pending.
- [~] **P1** Corporate. Responsive page structure implemented; approved offer copy pending.
- [~] **P0** About Jack. Responsive page structure implemented; verified biography and credentials pending.
- [~] **P1** Books landing. Responsive page structure implemented; approved book records pending.
- [~] **P1** Circle Blueprint page. Responsive page structure implemented; approved book copy/assets pending.
- [~] **P0** Success Stories. Responsive page structure implemented; approved testimonials pending.
- [~] **P0** Contact. Accessible disabled form foundation implemented; integration and legal copy pending.
- [~] **P0** Start Your Roadmap. Accessible disabled form foundation implemented; CTA workflow/integration pending.
- [~] **P0** Privacy. Route and legal-content shell implemented; approved legal copy pending.
- [~] **P0** Terms. Route and legal-content shell implemented; approved legal copy pending.

---

# EPIC 9 — Insights

- [~] **P0** Insights landing. Responsive page and topic directory implemented; CMS content pending.
- [~] **P0** Article listing. Renders retained migration-inventory records; CMS excerpts/media pending.
- [~] **P0** Article detail. Preserves audited metadata and URLs; transformed article bodies pending.
- [~] **P0** Topic detail. Eight topic routes and mapped article listings implemented; approved introductions pending.
- [~] **P1** Podcast listing. Route and content shell implemented; approved episode records pending.
- [!] **P1** Podcast detail. Detail template specification exists; blocked because no canonical episode records or slugs are available.
- [~] **P1** Video listing. Route and content shell implemented; approved video records pending.
- [!] **P1** Video detail. Detail template specification exists; blocked because no canonical video records or slugs are available.
- [~] **P1** Related-content engine. Topic-related legacy article treatment implemented; editorial CMS relationships pending.
- [~] **P1** Author block. Responsive treatment implemented; verified biography and credentials pending.
- [x] **P1** Topic navigation. Eight-topic directory and related-topic navigation implemented.
- [ ] **P2** Site/content search.
- [ ] **P2** Filter UI if content volume justifies it.

---

# EPIC 10 — Migration tooling

- [ ] **P0** Create WordPress parser/importer.
- [ ] **P0** Transform HTML/blocks.
- [ ] **P0** Handle legacy shortcodes.
- [ ] **P0** Handle internal links.
- [ ] **P0** Handle embedded YouTube.
- [ ] **P0** Import images.
- [ ] **P0** Import article records.
- [ ] **P0** Preserve publication dates.
- [ ] **P0** Preserve author.
- [ ] **P0** Preserve old slugs.
- [ ] **P0** Map topics.
- [ ] **P0** Log import errors.
- [ ] **P0** Detect duplicate slugs.
- [ ] **P0** Detect missing assets.
- [ ] **P0** Run sample import.
- [ ] **P0** Run full import.
- [ ] **P0** QA migrated posts.
- [ ] **P0** Perform final delta migration.

---

# EPIC 11 — Technical SEO

- [ ] **P0** Global metadata defaults.
- [ ] **P0** Per-page metadata.
- [ ] **P0** Canonical generation.
- [ ] **P0** robots.txt.
- [ ] **P0** XML sitemap.
- [ ] **P0** Open Graph.
- [ ] **P0** Social metadata.
- [ ] **P0** WebSite schema.
- [ ] **P0** Organization schema.
- [ ] **P0** Person/ProfilePage schema.
- [ ] **P0** Article schema.
- [ ] **P1** Podcast schema.
- [ ] **P1** Video schema.
- [ ] **P1** Book schema.
- [ ] **P0** Breadcrumb schema.
- [ ] **P0** Redirect implementation.
- [ ] **P0** Noindex logic.
- [ ] **P0** Validate structured data.
- [ ] **P0** Validate top legacy URLs.
- [ ] **P1** Implement search-crawler policy.
- [ ] **P1** Verify author/sameAs links.

---

# EPIC 12 — Analytics and conversion

- [ ] **P0** Install GA4.
- [ ] **P0** Define conversion events.
- [ ] **P0** Track Start Your Roadmap CTA.
- [ ] **P0** Track completed Roadmap form.
- [ ] **P1** Track newsletter signup.
- [ ] **P1** Track testimonial video interaction.
- [ ] **P1** Track outbound scheduling clicks.
- [ ] **P1** Configure Search Console.
- [ ] **P1** Configure Bing Webmaster Tools.
- [ ] **P2** Add Vercel Analytics if desired.

---

# EPIC 13 — Forms and integrations

- [ ] **P0** Confirm Kit/CRM architecture.
- [ ] **P0** Confirm Calendly use.
- [ ] **P0** Build Roadmap lead form.
- [ ] **P0** Build contact form.
- [ ] **P1** Build newsletter form.
- [ ] **P0** Add server validation.
- [ ] **P0** Add spam protection.
- [ ] **P0** Add success/error states.
- [ ] **P0** Add conversion tracking.
- [ ] **P0** End-to-end test CRM delivery.
- [ ] **P0** End-to-end test scheduling journey.

---

# EPIC 14 — Accessibility and performance

- [ ] **P0** Keyboard audit.
- [ ] **P0** Focus-state audit.
- [ ] **P0** Contrast audit.
- [ ] **P0** Heading-order audit.
- [ ] **P0** Form-label audit.
- [ ] **P0** Image alt audit.
- [ ] **P1** Reduced-motion audit.
- [ ] **P0** Optimize homepage LCP.
- [ ] **P0** Optimize images.
- [ ] **P0** Lazy-load embeds.
- [ ] **P0** Review third-party scripts.
- [ ] **P0** Check CLS.
- [ ] **P0** Check mobile performance.

---

# EPIC 15 — QA

- [ ] **P0** Chrome desktop.
- [ ] **P0** Chrome Android.
- [ ] **P0** Safari desktop.
- [ ] **P0** Safari iPhone.
- [ ] **P1** Firefox.
- [ ] **P1** Edge.
- [ ] **P0** 404 behavior.
- [ ] **P0** Redirect tests.
- [ ] **P0** Broken-link crawl.
- [ ] **P0** Metadata crawl.
- [ ] **P0** Canonical crawl.
- [ ] **P0** Structured-data validation.
- [ ] **P0** Form tests.
- [ ] **P0** CMS preview tests.
- [ ] **P0** Production build.
- [ ] **P0** Lighthouse key templates.

---

# EPIC 16 — Launch

- [ ] **P0** Freeze WordPress publishing.
- [ ] **P0** Final export/delta.
- [ ] **P0** Backup old WordPress site.
- [ ] **P0** Backup media/database.
- [ ] **P0** Confirm redirect map.
- [ ] **P0** Confirm rollback plan.
- [ ] **P0** Deploy production.
- [ ] **P0** Point domain.
- [ ] **P0** Verify HTTPS.
- [ ] **P0** Verify canonical domain.
- [ ] **P0** Verify robots.
- [ ] **P0** Verify sitemap.
- [ ] **P0** Submit sitemap.
- [ ] **P0** Verify analytics.
- [ ] **P0** Test forms.
- [ ] **P0** Test top legacy URLs.
- [ ] **P0** Crawl production.
- [ ] **P0** Resolve launch-blocking errors.

---

# EPIC 17 — Post-launch

- [ ] **P0** Review 404s daily first week.
- [ ] **P0** Review Search Console first week.
- [ ] **P1** Review Core Web Vitals.
- [ ] **P1** Review conversions.
- [ ] **P1** Fix high-impact metadata issues.
- [ ] **P1** Refresh top legacy articles.
- [ ] **P1** Strengthen internal links.
- [ ] **P1** Publish first new topic-led article.
- [ ] **P1** Add first transcript-rich podcast page.
- [ ] **P2** Consolidate weak archive content.
- [ ] **P2** Expand topic hubs.
- [ ] **P2** Review CTA tests after enough traffic.
