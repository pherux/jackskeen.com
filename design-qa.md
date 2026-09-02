# Design QA

**Source visual truth**

- `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-1ca2bbc8-7462-46ec-acb9-445d2a479a8f.png` — Roadmap hero issue reference, 567 × 416 px.
- `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-34b8b143-1fe8-4b15-8254-2702a6e05ece.png` — fulfillment statement issue reference, 504 × 360 px.
- Existing approved visual language and photography in `docs/visual-design/assets/` and `public/images/`.

**Implementation evidence**

- `C:\dev\jackskeen.com\design-qa-home-desktop-final.png` — homepage full page, browser-rendered at a 1440 × 1000 CSS viewport; 1425 × 5660 px capture at device scale factor 1.
- `C:\dev\jackskeen.com\design-qa-home-mobile-final.png` — homepage full page, browser-rendered at a 390 × 844 CSS viewport; 375 × 7245 px capture at device scale factor 1.
- `C:\dev\jackskeen.com\design-qa-roadmap-desktop-final.png` — Roadmap above the fold, browser-rendered at a 1440 × 1000 CSS viewport; 1425 × 1000 px capture at device scale factor 1.
- `C:\dev\jackskeen.com\design-qa-roadmap-mobile-final.png` — Roadmap above the fold, browser-rendered at a 390 × 844 CSS viewport; 375 × 844 px capture at device scale factor 1.
- `C:\dev\jackskeen.com\design-qa-user-request-comparison.png` — combined focused comparison of both issue references and the revised implementation.

**State and normalization**

- State: public, unauthenticated, default theme.
- Desktop and mobile captures use the same content and route state.
- Reference screenshots are issue-focused crops rather than complete viewport specifications. They were compared as focused regions for hierarchy, typography, contrast, and repetition; the approved existing site system remains the source for full-page composition.
- Source and implementation captures use normal-density raster evidence; comparison crops were proportionally contained without stretching.

**Full-view comparison evidence**

- Homepage: the editorial light/dark rhythm remains intact while the proof, About, Insights, and closing CTA sequence gains imagery and clearer conversion paths.
- Roadmap: the hero retains the established split-photo composition and now exposes only one visible page title. The current breadcrumb is no longer repeated as a second title and the duplicate eyebrow is suppressed.
- Mobile: content order, image crops, CTA hierarchy, and readable spacing remain intact at 390 px. The document client width and scroll width both measured 375 px, confirming no horizontal overflow.

**Focused-region comparison evidence**

- Roadmap hero: the reference showed “The Roadmap” in the breadcrumb, eyebrow, and H1. The revised hero shows it once as the H1, with “Home” retained as a lightweight orientation link.
- Fulfillment statement: line height increased, the pale middle lines use a darker warm neutral, and the supporting copy at right increased from 11.2 px equivalent to 14.4 px equivalent with more leading.
- Header and CTA: desktop navigation increased in size and weight. Primary CTAs now use a larger hit target, clearer padding, restrained lift, and a consistent directional icon.
- Proof/About: the former compact placeholder treatment is now a large editorial proof panel followed by a photographic About and Insights composition.

**Findings**

- No actionable P0, P1, or P2 visual differences remain for the requested changes.
- P3: the embedded YouTube poster can appear blank in an automated full-page mobile capture before the lazy iframe enters the viewport. It loads normally when scrolled into view and is intentionally lazy for performance.

**Required fidelity surfaces**

- Fonts and typography: Cormorant Garamond and Manrope remain consistent. Navigation, supporting copy, testimonial text, and CTA labels now have appropriate optical size and line height.
- Spacing and layout rhythm: fulfillment lines have clearer separation; proof and lower editorial sections use larger intervals and deliberate column proportions; mobile collapses cleanly.
- Colors and visual tokens: the existing night, paper, ink, faded neutral, and coral tokens are preserved. The light fulfillment lines were darkened enough to be visible without competing with the final word.
- Image quality and asset fidelity: only approved local Jack photography and branded Circle Blueprint raster assets are used. Crops are responsive, preserve aspect ratio, and use `next/image`.
- Copy and content: no claims, credentials, testimonials, prices, or outcomes were invented. Placeholder/permission language remains explicit.
- Icons and interaction states: directional icons use the installed icon library and align consistently. Hover, focus, menu open, CTA navigation, and responsive states were checked.
- Accessibility: semantic headings remain ordered, focus treatment is preserved, image alt behavior is meaningful or empty when decorative, the mobile menu is keyboard-operable, and primary controls exceed practical touch sizes.

**Comparison history**

1. Earlier P1: page hero repeated the current page name up to three times. Fix: current breadcrumb items are removed from visual output and duplicate eyebrows are suppressed. Post-fix evidence: Roadmap desktop/mobile captures show one H1 and one visible “The Roadmap” title.
2. Earlier P2: header navigation and right-side tension copy were undersized. Fix: increased navigation size/weight, tension copy size/leading, and related spacing. Post-fix evidence: homepage desktop/mobile captures.
3. Earlier P2: fulfillment middle lines were too faint and vertically cramped. Fix: increased line height and raised the warm-neutral contrast. Post-fix evidence: focused comparison sheet.
4. Earlier P2: proof and lower homepage sections lacked hierarchy and assets. Fix: introduced a larger photographic proof panel, editorial About image, real insight thumbnails, additional contextual CTAs, and a closing conversion section. Post-fix evidence: homepage full-page captures.
5. Earlier P2: interior pages relied too heavily on text-only sections. Fix: added route-aware hero photography and reusable editorial media blocks to offer, About, Insights, and service-detail pages. Post-fix evidence: Roadmap desktop/mobile captures and browser inspection.

**Primary interactions tested**

- Desktop primary navigation visible and correctly sized.
- Mobile menu opens and exposes navigation.
- Mobile Roadmap navigation completes successfully.
- Homepage “Start Your Roadmap” CTA navigates to `/start`.
- Console checked after homepage, Roadmap, mobile-menu, and CTA-path tests: no errors.

**Implementation checklist**

- [x] Consolidate repeated page titles.
- [x] Increase navigation and supporting-copy legibility.
- [x] Improve fulfillment statement rhythm and contrast.
- [x] Strengthen primary CTA styling and interaction.
- [x] Add imagery and contextual CTAs to the homepage.
- [x] Add imagery to key interior templates.
- [x] Redesign proof, About, and Insights sequence.
- [x] Verify desktop and mobile behavior.
- [x] Pass lint, type-check, and production build.

**About and video refinement — 2026-09-01**

- Source references: `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-3ac07f42-280f-4926-9935-dd70300683df.png` (1121 × 847 px) and `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-299bf785-733a-49d5-9f64-ff1777530a0b.png` (1094 × 855 px).
- Browser-rendered implementation evidence: `C:\dev\jackskeen.com\design-qa-refined-about-section.png`, `C:\dev\jackskeen.com\design-qa-refined-video-section.png`, `C:\dev\jackskeen.com\design-qa-refined-about-mobile.png`, `C:\dev\jackskeen.com\design-qa-refined-video-mobile.png`, and `C:\dev\jackskeen.com\design-qa-refined-video-frame-mobile.png`.
- Combined focused comparison: `C:\dev\jackskeen.com\design-qa-refined-sections-comparison.png`.
- Desktop CSS viewport requested at 1440 × 1000; browser content capture measured 1199 px wide at device scale factor 1 because of the visible Codex browser panel. Mobile CSS viewport requested at 390 × 844; rendered client width measured 375 px at device scale factor 1.
- State: public, unauthenticated, default theme, YouTube poster loaded.
- Earlier P2: the vertical office portrait was forced into a landscape crop, clipping Jack’s face and weakening the relationship between image and caption. Fix: created a portrait-specific two-column editorial treatment that preserves the complete seated portrait and moves the statement onto a dark companion panel. Post-fix evidence: refined About desktop/mobile captures.
- Earlier P2: the video label, title, player, and outbound link occupied disconnected vertical zones with excessive whitespace. Fix: combined them into one dark editorial feature card with the title and action beside the 16:9 player, then stacked the same hierarchy on mobile. Post-fix evidence: refined video desktop/mobile captures.
- Typography: display scale remains editorial and now wraps within intentional measures; small labels and viewing action maintain the established Manrope treatment.
- Spacing/layout: both blocks now have a single visual container and clear internal alignment. No horizontal overflow at the mobile breakpoint.
- Colors/tokens: existing paper, night, ivory, and coral tokens are preserved; the real Circle Blueprint raster supplies the restrained dark texture.
- Image quality: the original 701 × 1024 office photograph is shown at its natural portrait proportion without facial cropping or stretching. The YouTube media remains the canonical embedded asset.
- Copy/content: existing approved wording and video title are unchanged; no claims were added.
- Interaction/accessibility: the iframe remains keyboard-accessible and titled; the external YouTube action has a visible focus treatment and consistent directional icon. Browser console checked after both routes: no errors.
- No actionable P0, P1, or P2 differences remain in the refined blocks.

**Container and spacing correction — 2026-09-01**

- Source references: `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-29fdb324-1361-48c0-a3c8-c57edda33989.png` and `C:\Users\ferna\AppData\Local\Temp\codex-clipboard-7f4c3c45-f311-4e79-87f2-52cf9f8e8c2e.png`.
- Implementation evidence: `C:\dev\jackskeen.com\design-qa-final-video-section.png` and `C:\dev\jackskeen.com\design-qa-final-about-spacing.png`.
- Combined comparison evidence: `C:\dev\jackskeen.com\design-qa-final-layout-comparison.png`.
- Earlier P2: the iframe inherited the taller text-column row height, distorting its presentation and making the YouTube poster appear cropped at the container edge. Fix: added an inset media stage and forced the player frame to a measured 16:9 aspect ratio. Browser measurement after the fix: 279 × 156.9375 CSS px, ratio 1.7777777778.
- Earlier P2: the portrait feature’s bottom margin and the following section’s top padding created a large empty band. Fix: removed the portrait block’s bottom margin and reduced the following section’s opening padding to one intentional interval. Browser measurement confirms the adjacent layout boxes now have a 0 px structural gap; visible separation comes only from the section’s 48–72 px responsive internal padding.
- Mobile viewport check: client width 375 px and scroll width 375 px; no horizontal overflow.
- Fonts, colors, image fidelity, and copy remain unchanged from the passed refinement. The canonical YouTube iframe and approved portrait asset are preserved.
- Browser console checked after desktop and mobile route verification: no errors.
- No actionable P0, P1, or P2 findings remain.

final result: passed
