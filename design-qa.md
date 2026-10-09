# Roadmap build design QA — 2026-09-23

Final result: passed for the responsive design implementation. This is not production-launch acceptance; editorial and migration blockers remain below.

## Target and evidence

- Source: `docs/visual-design/implementation/selected-option-3.png`, 750 × 2098. User-selected original-brand option 3.
- Implementation: http://localhost:3000, production Next.js build.
- Desktop: 1440 × 1000 CSS viewport, DPR 1; full capture 1425 × 4150 (scrollbar excluded).
- Tablet: 834 × 1112 CSS viewport; capture 819 × 3549.
- Mobile: 390 × 844 CSS viewport; capture 375 × 5344. Additional 320px viewport checked.
- Evidence in `docs/visual-design/implementation`: desktop-final.png, tablet-final.png, mobile-final.png, hero-reference.png, hero-final.png, proof-reference.png, mobile-proof-detail.png.
- Source and rendered images were reviewed together in the same comparison inputs, at normalized widths, both full-page and focused hero/testimonial crops. The source is an illustrative desktop mockup, not a CSS viewport specification; mobile is an adaptation.

## Findings and iterations

1. [P1, fixed] Featured testimonial lost its modifier class after formatting. Its panel was too short and caption typography fell back. Replaced interpolated class concatenation with complete conditional class strings. Recapture confirms large featured panel aligned with two supporting stories.
2. [P2, fixed] Tablet supporting videos imposed an intrinsic minimum width that reversed the intended grid proportions. Used minmax(0, ...) grid tracks and explicit minimum/percentage widths. At 834px the featured column is 466px and supporting column 278px.
3. [P2, fixed] Hiding line breaks on mobile joined a few labels. Added explicit spaces and separators. Final DOM and focused mobile capture confirm readable testimonial status and closing label.
4. [P2, fixed] Early desktop hierarchy was too restrained relative to the reference. Increased display heading scale and logo width; full-page and hero comparison repeated after the change.

No open P0/P1/P2 design implementation findings in the reviewed states.

## Required fidelity surfaces

- Typography: Libre Caslon Display and Inter through next/font. Serif hierarchy retained; body and controls consistently use Inter. Source mockup typography is not a precise type specification. Responsive wrapping verified; no clipped headings. Body is 15–18px, with smaller captions/status labels.
- Spacing/layout: retained section order, paired hero, featured-plus-two video composition, three benefit columns, document split, three written testimonials, Meet Jack, FAQ, closing CTA. Mobile stacks major columns, keeps two supporting videos at 390px, stacks them at 320px. Moderate section spacing and 44px+ primary targets.
- Colors: original-site #0058A0 blue, white, pale blue, dark ink; no gold or unrelated palette. White/blue buttons and dark body text maintain readable contrast. Source thumbnail gradients replaced with solid pending states intentionally.
- Images: original compass logo and original diamond montage reused; original coaching photograph preserved. The report is a generated illustrative asset, visibly labeled. Original photography has limited source sharpness; no invented client faces. No custom SVG/CSS reconstruction of branded images.
- Content: selected results/value emphasis retained, no process section. All proof remains explicitly pending. Nonfunctional transcript/play links removed because no approved videos or transcripts exist. This is an intentional usability correction, not missing functionality.

## Intentional differences

- Standard video icons identify pending media without implying playback is available.
- New report still-life follows the reference direction, with abstract page contents and visible concept caption.
- The subtle closing decorative compass was omitted; the actual compass brand remains in header/footer and report. This minor decorative difference does not change hierarchy.
- Added legal/navigation links, direct contact routes, a functional scheduling destination, and mobile menu.
- Original logo proportions and photography are authoritative; mockup-generated versions were not recreated.

## Functional / accessibility / SEO checks

- Production build succeeds: 145 generated pages. Lint and TypeScript pass.
- Primary, contact, library and legal route smoke checks return 200; missing route returns 404.
- Main routes have unique titles, canonical URLs and one h1.
- Mobile menu opens by keyboard, closes on Escape, closes on selection. FAQ toggles with keyboard. Skip link focuses main-content.
- No horizontal overflow at 320, 390, 834, or 1440px. All homepage images load after entering viewport.
- No browser warning/error logs during inspected flows. External calendar has an explicit new-tab notice; email/phone use native links. No booking submitted.
- Motion is minimal and respects reduced-motion preferences. Meaningful image alt text supplied; icons hidden from assistive technology.
- Existing staging noindex retained. No unsupported testimonial/review schema added. No Lighthouse or field performance score claimed.

## Before public launch

- Replace six pending testimonial slots with approved client media, names, roles and exact quotes; add captions/transcripts for actual videos.
- Approve final offer copy and report format.
- Complete the existing CMS/content migration and legal-page editorial review. Existing legacy routes were preserved, not republished with invented article bodies.
- Run production-domain performance and launch checks, including indexing configuration.

## Implementation checklist

- [x] Selected option implemented with responsive components and original assets.
- [x] Visual comparison and fixes completed.
- [x] Navigation, FAQ, scheduling path, keyboard basics verified.
- [x] Typecheck, lint, production build pass.
- [x] Preview available locally; no deployment performed.
- [ ] Editorial/migration and final launch approval.

## Homepage hero option 1 — 2026-10-09

final result: passed

- Applied the selected split portrait concept: blue italic closing headline, quiet pale-blue photo backing, primary button and understated secondary link.
- Compared the selected image and desktop capture together. Existing brand fonts, header, and authentic office photograph are retained; the mockup's generated likeness is not used.
- Checked 1487px desktop, 834px tablet, 390px mobile, and 320px mobile. Headline and controls fit; portrait stacks below the copy on mobile.
- One semantic h1, descriptive image alt, existing focus styles, and unchanged CTA destinations. Homepage canonical remains https://jackskeen.com. No metadata or schema changes.
- Lint and production build (including TypeScript) pass. No new dependencies or environment variables.
- Local evidence: design-qa-hero-applied.png. Changes are not deployed.

## Featured testimonials — 2026-10-09

final result: passed

- Implemented selected option 1: white editorial section, large featured YouTube film, See more testimonials link, and pale-blue Andrew Wilkinson quote strip.
- Compared selected mockup and rendered desktop capture together. Uses the original YouTube poster rather than generated faces; source thumbnail resolution limits sharpness.
- Verified playback with captions in browser and followed the link to /success-stories, which contains three individual videos, published quotes and additional client perspectives.
- Verified mobile 390px layout, keyboard control access, descriptive player label, and no horizontal overflow. Existing page metadata/canonical routes preserved; no new schema claims.
- Lint, typecheck and build pass. No new environment variables. Not deployed.

## Compact testimonials, selected option 2 — 2026-10-09

final result: passed

- Featured film capped at 560px beside compact Mohnish Pabrai and Rob Fraser video rows on pale blue, with the centered quote below and existing testimonials link preserved.
- Compared selected mockup with rendered section. Original source thumbnails retained. Verified mobile stacking at 390px without horizontal overflow and visible keyboard focus.
- Both individual videos verified playing with readyState 4 and advancing time; caption tracks included. Featured YouTube player remains unchanged.
- Lint, TypeScript and production build pass. Metadata and canonical routes unchanged; no setup changes. Not deployed.

## Client Stories page refresh — 2026-10-09

- Added the shared compact YouTube film in a pale-blue introduction, followed by a three-column individual-video gallery.
- Replaced excerpt repetition with the requested Testimonial.to widget and exact wall URL. Script initializes on each route mount, gives the generated iframe an accessible title, and includes a direct collection fallback.
- Verified live feedback rendered on desktop and mobile, automatic iframe heights (2708px desktop / 7368px mobile), and one iframe after navigating away and returning via the homepage link.
- Mobile 390px has no horizontal overflow. One h1 and canonical https://jackskeen.com/success-stories retained. Lint, typecheck and build pass; no new configuration. Not deployed.
