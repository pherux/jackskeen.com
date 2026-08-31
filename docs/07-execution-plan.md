# Execution Plan

## Phase 0 — Project setup and decision freeze

### Objective

Make all high-impact decisions before visual development.

### Work

1. Create repository.
2. Add project documentation.
3. Define package manager.
4. Confirm Next.js + TypeScript + Tailwind + shadcn/ui + Sanity.
5. Create Vercel project.
6. Create development/staging/production strategy.
7. Confirm analytics/search accounts.
8. Confirm form/CRM integrations.
9. Confirm whether jackskeenlive.com offers move into jackskeen.com.
10. Confirm primary CTA destination.
11. Confirm legal/privacy requirements.

### Exit criteria

- Architecture approved.
- Sitemap approved.
- CMS selected.
- CTA journey approved.
- No unresolved decision blocks the data model.

---

## Phase 1 — Existing-site audit

### Objective

Understand exactly what must be preserved, migrated, improved, redirected, or removed.

### Work

1. Crawl existing site.
2. Export WordPress content.
3. Export media.
4. Export sitemap.
5. Capture existing metadata.
6. Capture current redirects.
7. Export Google Search Console landing page/query data.
8. Export GA4 landing page data.
9. Obtain backlink report if available.
10. Classify all URLs.
11. Identify duplicate/thin taxonomy pages.
12. Identify high-value posts.
13. Identify broken media/links.
14. Create baseline metrics.

### Deliverable

`migration-inventory.csv` or spreadsheet.

### Exit criteria

Every known public URL has a planned action.

---

## Phase 2 — Content strategy and copy architecture

### Objective

Define what every important new page needs to communicate.

### Work

1. Finalize positioning.
2. Finalize homepage narrative.
3. Finalize Roadmap narrative.
4. Finalize About narrative.
5. Finalize offer hierarchy.
6. Finalize core topic taxonomy.
7. Identify proof/testimonials.
8. Inventory usable video/podcast assets.
9. Identify missing copy.
10. Create page-level content briefs.

### Exit criteria

No major page depends on undefined positioning.

---

## Phase 3 — UX and wireframes

### Objective

Resolve hierarchy and interaction before polishing visuals.

### Wireframe:

- Homepage
- Roadmap
- Work With Jack
- About
- Insights
- Topic
- Article
- Podcast episode
- Video
- Success Stories
- Start/contact
- Mobile navigation

### Validate

- CTA hierarchy
- Page length
- Content order
- Mobile readability
- Internal links
- Social proof placement
- Reusable sections

### Exit criteria

Responsive wireframes approved.

---

## Phase 4 — Design system and high-fidelity design

### Objective

Define the premium visual language and reusable UI patterns.

### Work

1. Typography.
2. Color.
3. Grid.
4. Spacing.
5. Buttons.
6. Form fields.
7. Navigation.
8. Editorial typography.
9. Media treatments.
10. Quote/testimonial treatment.
11. Topic/content cards.
12. Footer.
13. Responsive behavior.
14. Motion rules.
15. Photography selection.

### Recommended high-fidelity pages

Design these first:

1. Homepage.
2. Roadmap.
3. Article.
4. About.
5. Mobile homepage/menu.

Other pages should derive from the established system.

### Exit criteria

Core components and patterns are visually approved.

---

## Phase 5 — Technical foundation

### Objective

Create the production application and reusable system.

### Work

1. Initialize Next.js.
2. Configure TypeScript strict.
3. Configure Tailwind.
4. Configure shadcn/ui.
5. Configure fonts.
6. Configure ESLint.
7. Configure environment.
8. Add CI.
9. Add Vercel preview deployments.
10. Configure Sanity.
11. Create schemas.
12. Add typed queries.
13. Add preview/draft mode.
14. Build base layout.
15. Build metadata utilities.
16. Build schema/JSON-LD utilities.
17. Add analytics framework.
18. Add error/404 pages.

### Exit criteria

Application shell and CMS are stable.

---

## Phase 6 — Component and page implementation

### Suggested order

1. Global layout/navigation/footer
2. Typography/rich text
3. Homepage
4. Roadmap
5. About
6. Work With Jack
7. Success Stories
8. Insights landing
9. Article
10. Topic
11. Podcast
12. Video
13. Book
14. Contact/start
15. Legal

### Exit criteria

All pages meet design and functional requirements using test content.

---

## Phase 7 — Content migration

### Objective

Move the old content safely.

### Work

1. Build import transformer.
2. Import authors.
3. Import media.
4. Import articles.
5. Map topics.
6. Preserve publication dates.
7. Preserve slugs.
8. Resolve embedded media.
9. Run automated QA.
10. Run manual sample QA.
11. Generate redirect map.
12. Resolve migration errors.
13. Freeze/sync final WordPress delta.

### Exit criteria

All launch content exists in Sanity and renders correctly.

---

## Phase 8 — SEO and AI-discovery implementation

### Work

1. Metadata.
2. Canonicals.
3. Sitemap.
4. Robots.
5. Structured data.
6. Breadcrumbs.
7. Author/entity links.
8. Open Graph.
9. Social images.
10. Internal linking.
11. Redirects.
12. Content indexation rules.
13. Search crawler policy.
14. Analytics/Search Console verification.

### Exit criteria

A technical SEO crawl returns no critical errors.

---

## Phase 9 — QA and launch readiness

### Test categories

#### Functional
- Navigation
- Links
- Forms
- Video
- CMS preview
- CTAs
- Redirects

#### Responsive
- Small mobile
- Large mobile
- Tablet
- Laptop
- Desktop

#### Browsers
- Chrome
- Safari
- Firefox
- Edge

#### SEO
- Metadata
- Schema
- Canonical
- Sitemap
- robots
- 404
- redirects

#### Accessibility
- Keyboard
- Focus
- Heading structure
- Contrast
- Forms
- Alt text
- Reduced motion

#### Performance
- Home
- Roadmap
- Article
- Podcast

### Exit criteria

All launch-blocking acceptance criteria pass.

---

## Phase 10 — Cutover

### Work

1. Final WordPress content freeze.
2. Final content delta migration.
3. Final DB/media backup.
4. Final redirect map.
5. Production build.
6. Configure production domain.
7. Verify HTTPS.
8. Verify www/non-www behavior.
9. Verify canonical origin.
10. Verify robots.
11. Submit sitemap.
12. Verify analytics.
13. Verify top 50 legacy URLs.
14. Verify forms.
15. Monitor production logs.

### Rollback

Before cutover define:

- Previous DNS configuration.
- WordPress backup.
- Restore plan.
- Person responsible for rollback decision.

---

## Phase 11 — 30-day post-launch stabilization

### Day 1

- Crawl site.
- Review 404s.
- Check forms.
- Check redirects.
- Check Search Console.

### Week 1

- Fix unexpected crawl/indexation problems.
- Review Core Web Vitals.
- Review analytics.
- Review conversion events.

### Weeks 2–4

- Monitor ranking/traffic shifts.
- Refresh priority legacy content.
- Add internal links.
- Improve high-impression/low-CTR metadata.
- Start publishing against topic strategy.

---

## Phase 12 — Ongoing growth

### Monthly

- Publish original Jack content.
- Refresh strategic older articles.
- Review top queries.
- Review AI/search referral traffic where measurable.
- Expand topic hubs.
- Convert podcast/video into searchable pages.
- Improve testimonial library.
- Test CTA messaging.

### Quarterly

- Technical crawl.
- Broken link audit.
- Structured-data audit.
- Content pruning/consolidation review.
- Conversion analysis.
- Core Web Vitals review.
