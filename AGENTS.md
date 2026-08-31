# Codex Project Instructions

## Objective

Build the new `jackskeen.com` from the requirements in `/docs`.

This is not a generic executive-coach template. The website must feel premium, editorial, thoughtful, modern, restrained, and distinct.

## Read order

Before implementation, read:

1. `README.md`
2. `docs/01-product-requirements.md`
3. `docs/02-information-architecture.md`
4. `docs/03-technical-architecture.md`
5. `docs/04-content-cms-migration.md`
6. `docs/05-seo-ai-search.md`
7. `docs/06-design-system.md`
8. `docs/07-execution-plan.md`
9. `docs/08-task-backlog.md`
10. `docs/09-acceptance-criteria.md`

## Engineering rules

- Use Next.js App Router.
- Use TypeScript with strict mode.
- Prefer React Server Components.
- Add `"use client"` only where browser interactivity requires it.
- Use Node.js runtime unless a requirement specifically benefits from Edge runtime.
- Use `next/image` for site images.
- Use `next/font` for typography.
- Use Next.js metadata APIs for metadata and canonical handling.
- Use semantic HTML.
- Avoid unnecessary client-side JavaScript.
- Avoid large animation libraries unless clearly justified.
- All reusable content sections should be components.
- CMS content must be typed.
- Keep CMS schemas separate from presentation logic.
- Never hard-code production secrets.
- Ensure the project passes lint, type-check, and build.
- Add useful error, loading, and not-found states.

## Design rules

- Do not create a common SaaS landing-page aesthetic.
- Do not create a generic navy-and-gold executive coaching website.
- Prefer editorial composition, whitespace, photography, typography, and subtle branded geometry.
- Avoid excessive cards.
- Avoid gradients unless used sparingly and intentionally.
- Avoid icon overload.
- Avoid excessive border radii.
- Avoid decorative motion that interferes with reading.
- Keep page structure visually calm.
- Typography should create most of the hierarchy.
- The Circle Blueprint may influence geometry using arcs, intersections, pathways, points, and circles without becoming a visual gimmick.

## Content rules

- Do not invent claims, credentials, client names, testimonials, prices, statistics, or quotes.
- Content marked as placeholder must stay visibly marked until approved.
- Preserve publication dates for migrated articles.
- Preserve existing URLs where practical.
- Do not publish rewritten legacy articles automatically.
- Migrated content must retain authorship and canonical information.

## SEO rules

- Every indexable page must have a unique title and description.
- Generate canonical URLs.
- Implement sitemap and robots rules.
- Implement structured data only when supported by visible page content.
- All article, podcast, video, person, book, breadcrumb, and organization schema must be valid.
- Avoid duplicate indexable archive pages.
- Do not generate thin tag pages.
- Preserve legacy URL equity using exact 301 redirects when a URL changes.
- Never mass-redirect unrelated deleted content to the homepage.

## Performance targets

Aim for, on representative production pages:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- LCP: <= 2.5s at p75
- CLS: <= 0.1
- INP: <= 200ms at p75

These are targets, not reasons to compromise correctness.

## Accessibility

- Keyboard navigable.
- Visible focus states.
- Correct heading order.
- Correct labels for forms.
- Sufficient contrast.
- Meaningful image alt text.
- Decorative imagery uses empty alt attributes.
- Motion respects reduced-motion preferences.

## Definition of done for each task

A task is not complete until:

1. Implementation is finished.
2. Types pass.
3. Lint passes.
4. Build passes.
5. Responsive behavior is verified.
6. Accessibility basics are verified.
7. SEO implications are checked.
8. Acceptance criteria are satisfied.
9. Any new environment variable or setup step is documented.
