# Design QA — Wide-screen hero alignment

## Evidence

- Source visual truth: `docs/visual-design/assets/wide-roadmap-user-report.png`
- Reproduced pre-fix view: `docs/visual-design/assets/wide-roadmap-before.png`
- Browser-rendered implementation: `docs/visual-design/assets/wide-roadmap-after.png`
- Full-view comparison: `docs/visual-design/assets/wide-roadmap-comparison.png`
- Homepage wide-screen check: `docs/visual-design/assets/wide-homepage-after.png`
- Mobile regression check: `docs/visual-design/assets/wide-fix-roadmap-mobile.png`

## Normalization

- User source: 2505 × 1020 pixels at DPR 1, including approximately 120 pixels of
  browser chrome.
- Reproduced and corrected implementation: 2505 × 900 CSS pixels at DPR 1 with
  browser chrome excluded.
- Comparison images: equal 2505 × 900 application viewports, scaled equally to
  1252 × 450 panels in the side-by-side review.
- State: `/roadmap`, navigation closed, page at the top.

## Findings

No actionable P0, P1, or P2 issue remains.

- Fonts and typography: the approved Libre Caslon Display and Inter hierarchy is
  unchanged. The wide hero heading retains its intended size and wrapping.
- Spacing and layout rhythm: the pre-fix hero heading began at 112px while the body
  grid began at 629px. The corrected hero begins at 637px, an 8px optical difference
  from the body grid rather than a 517px alignment break.
- Colors and visual tokens: the dark hero, ivory copy, paper body, and coral accent
  tokens are unchanged.
- Image quality and asset fidelity: the supplied Jack Skeen photograph remains the
  source asset. Above 1600px, its focal position changes from center to 18% vertical,
  keeping Jack's full face visible without stretching or replacing the image.
- Copy and content: no copy changed.
- Responsiveness: no horizontal overflow was found at 2505px, 1440px, or 390px.
  Standard desktop and mobile retain their previous center crop and padding.

## Focused review

A separate cropped comparison was not needed because the full native-width captures
make both affected surfaces legible: hero/body alignment and the portrait crop. DOM
measurements verified the exact alignment values and computed image position.

## Interaction and browser checks

- Homepage and Roadmap rendered at 2505px without overflow.
- Roadmap navigation worked from the homepage at 1440px.
- Mobile navigation remained present at 390px.
- Browser console error count: zero.

## Comparison history

1. The user capture showed the hero copy anchored to the viewport edge while the
   header and body used the centered 90rem site grid. The square portrait was also
   vertically centered inside an ultra-wide media slot, cropping Jack's forehead.
2. The issue was reproduced locally at 2505 × 900: hero text 112px, body text 629px,
   image position 50% 50%.
3. A wide-screen breakpoint aligned homepage and internal-page hero copy to the
   centered grid and moved the portrait focal point upward. Post-fix measurements:
   hero text 637px, body text 629px, image position 50% 18%.
4. Standard desktop and mobile regression checks found no new layout, crop, overflow,
   navigation, or console issues.

## Follow-up polish

- P3: a purpose-cropped landscape photograph could replace the square source in a
  future photography pass, but the current focal-point correction is production-safe.

final result: passed

## Full strategic-page audit — 2026-08-31

A subsequent UI/UX and copy audit reviewed twelve strategic routes at 1440 × 900
and five representative routes at 390 × 844. Visitor-facing placeholders, link
labels, supporting-text legibility, form availability language, legal pending states,
and image-less hero branding were improved. No broken images, horizontal overflow,
or browser console errors remained.

Full report: `docs/visual-design/ui-ux-copy-audit.md`

final result: passed with documented content dependencies

## Wide homepage portrait correction — 2026-08-31

### Evidence

- Source visual truth: user-supplied wide homepage capture
  `C:/Users/ferna/AppData/Local/Temp/codex-clipboard-556a6fe2-7591-4c01-b796-444c080ffd2b.png`
- Pre-fix implementation: `docs/visual-design/assets/wide-home-portrait-before.png`
- Post-fix implementation: `docs/visual-design/assets/wide-home-portrait-after.png`

### Normalization

- Source: 2461 × 947 pixels including browser chrome.
- Implementation: the homepage rendered inside a 2461 × 947 CSS-pixel QA frame,
  scaled to the available browser surface for full-composition comparison.
- State: homepage at the top, navigation closed.

### Findings and resolution

- P1 image crop: a 50/50 grid made the square source photograph 1223 pixels wide
  against a 618-pixel hero height. `object-fit: cover` therefore enlarged Jack and
  removed too much of the source composition.
- Fix: above 1600 pixels, the image track now caps at 960 pixels while the dark copy
  track absorbs the additional width. The photograph retains `cover`, the established
  dark-edge blend, and an upward focal point.
- Post-fix evidence: the wide grid measures 1486px / 960px. Jack's face and torso are
  better balanced, the image remains full bleed, and the left-side content alignment
  is unchanged.

### Required fidelity surfaces

- Typography: unchanged.
- Spacing/layout: image width is constrained only at the wide breakpoint.
- Colors/tokens: unchanged.
- Image quality: the supplied source asset remains sharp and unstretched.
- Copy/content: unchanged.

No actionable P0, P1, or P2 mismatch remains. A purpose-shot landscape image would
be a P3 future enhancement, not a requirement for this correction.

final result: passed
