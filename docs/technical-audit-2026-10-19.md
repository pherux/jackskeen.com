# Technical audit — October 19, 2026

Scope: technical fixes only. Preserve the current design, visible copy, imagery,
and content approval status. This work follows the deployed newsletter fixes.

## Implemented

- Match header/footer image `sizes` to their CSS widths so browsers request
  appropriately sized logos instead of the oversized fallback.
- Add explicit high fetch priority to existing priority hero images on the
  homepage, Roadmap, About, podcast hub, and episode detail templates.
- Serve client video posters through Next.js image optimization. Because video
  posters cannot use responsive `srcset`, select the 640px candidate rather than
  the largest density fallback. The Roadmap poster transferred 46,726 bytes as
  WebP versus 284,275 bytes for the original JPEG (about 84% less).
- Make accessible names include the visible labels for client-story buttons,
  the featured film link, episode play buttons, and original-video links.
  This preserves visible text while supporting voice navigation.

## Verification

- Lint, TypeScript, production build, formatting of changed components, and
  `git diff --check` passed. Build generated 188 static pages.
- Production sitemap crawl: all 161 listed URLs returned 200; no duplicate URLs
  or titles, missing descriptions, unexpected noindex, canonical mismatches, or
  pages without exactly one H1.
- Production responsive checks: homepage, Roadmap, Start, Insights, and podcast
  hub at 360, 390, 768, 1024, and 1440px had no horizontal overflow.
- Updated local production build: homepage, Roadmap, and episode detail passed
  the same five width checks. Mobile homepage was visually inspected; logo
  loaded correctly with a smaller image candidate.
- Mobile menu Escape handling and focus return worked. Podcast search handled
  no matches and filter reset. Updated episode player activated with Enter and
  loaded the correctly titled YouTube privacy-enhanced iframe.
- Final poster endpoint returned 200 and image/webp. Sample old URLs
  `/the-roadmap` and `/insights/podcast` returned 301 to their intended pages;
  an unknown URL returned 404; robots.txt returned 200.
- Lighthouse follow-up checks passed label-content-name matching and LCP image
  discovery on homepage and Roadmap. Accessibility and Best Practices were 100
  on both local runs. Homepage local performance was 95; Roadmap was 89 before
  the final additional poster-size reduction.

## Measurement limits and follow-up

Production mobile Lighthouse baseline scores (Performance / Accessibility /
Best Practices / SEO): homepage 76/100/100/100, Roadmap 72/100/100/100,
Start 77/100/77/100, Insights 71/100/100/100.

Local results are not directly comparable to production: network, third-party
scripts, and preview indexing settings differ. Local SEO scored 69 because the
local environment intentionally blocks indexing. Production sitemap and SEO
checks were clean. Re-measure production after deploying these fixes; no field
Core Web Vitals improvement is claimed from these laboratory checks.

Calendly contributes substantial transfer size and third-party cookie warnings
on Start. Analytics also contributes unused JavaScript in Lighthouse. Neither
integration was removed or behaviorally changed. Further performance work must
preserve booking and conversion tracking. Content, legal copy, claims, and
editorial metadata changes remain deferred for Jack's approval.

Release verification is performed separately when these changes are deployed.
