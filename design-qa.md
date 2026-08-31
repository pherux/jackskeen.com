# Design QA — Hero Color, Brand Assets, and Accent Spacing

## Evidence

- Source visual truth: the homepage reference supplied during the design review.
- Reported defect: coral accent rules overlapping the following serif headings.
- Browser-rendered desktop and mobile captures were reviewed locally and are excluded
  from source control as temporary QA artifacts.
- Brand asset preview:
  `C:/dev/jackskeen.com/docs/visual-design/assets/brand-assets-preview.png`

## Normalization

- Source hero: 882 × 576 pixels.
- Implementation: 867 × 559 pixels from an 882 × 576 CSS viewport at DPR 1;
  browser scrollbar space accounts for the pixel difference.
- Mobile: 375 × 812 pixels from a 390 × 844 CSS viewport at DPR 1.
- State: homepage with the navigation closed.
- Side-by-side comparison: source and implementation top-aligned at native density.

## Findings

No actionable P0, P1, or P2 mismatch remains.

- Fonts and typography: the Libre Caslon Display/Inter pairing remains unchanged.
  The new wordmark uses deterministic, tracked sans-serif lettering and remains
  readable at 140 pixels on desktop and 124 pixels on mobile.
- Spacing and layout rhythm: the accent rules now remain in normal flow below their
  labels. The About and Insights headings have a measured 20-pixel separation from
  their labels, and the tension introduction is visibly clear of its accent line.
- Colors and visual tokens: both `.site-header` and `.hero__content` compute to
  `rgb(20, 35, 38)`. A low-opacity screen-blended Circle texture preserves the base
  color instead of darkening the left hero panel.
- Image quality and asset fidelity: the transparent wordmarks are rendered through
  `next/image`. The compact compass mark is rendered deterministically in light/dark
  vector and raster variants. The app icon uses the same mark and dark brand surface.
- Copy and content: no page copy changed in this iteration.
- Responsiveness: no horizontal overflow was found at 882-pixel desktop or 390-pixel
  mobile viewports. Header, wordmark, menu, hero copy, CTAs, and photography remain
  legible and correctly stacked.

## Focused review

The hero comparison shows the requested continuous dark surface across the header and
left panel. The two focused body captures verify the exact defect from the supplied
screenshot: coral rules no longer cross the following serif headings.

The brand preview evaluates the light and dark wordmarks and marks together, so text
accuracy, transparency, line quality, and palette behavior are visible in one review
surface.

## Interaction and browser checks

- Homepage loaded with the generated wordmark and application icon.
- Desktop and mobile hero colors matched exactly in computed styles.
- Browser warning/error log count: zero.
- Production build generated 145 pages, including `/icon.png`.

## Comparison history

1. Initial code blended the dark Circle raster directly into the hero background,
   making the left panel visibly darker than the header. It also used negative margins
   that pulled headings through coral accent rules.
2. The hero was changed to a solid brand background with a screen-blended texture;
   heading margins were restored to positive spacing.
3. The first generated wordmark had unreliable letterforms, so it was not shipped.
   The final exact-text wordmarks were rendered deterministically, while the generated
   Circle mark was cleaned and retained as the icon direction.
4. Post-fix desktop/mobile captures found no remaining actionable P0/P1/P2 issue.

## Follow-up polish

- P3: if a licensed corporate typeface becomes available, regenerate the wordmark
  through the included asset script using that approved font file.

final result: passed
