# Insights browser review

Reviewed against the production build at localhost:3000 on September 23, 2026.

- Archive: desktop 1440px, laptop 1024px, phone 390px. Editorial layout, image loading, responsive grids, filters, and search form inspected.
- Long illustrated article: 1440px and 360px. No horizontal overflow or broken images; original text remains readable.
- Text-only article: 768px tablet. Heading, byline, and reading column inspected.
- Search submitted through the form; empty results displayed with a working Clear search link.
- Purpose topic navigation and Page 2 pagination exercised through visible links.
- Keyboard Tab from the search field reaches Search with a visible solid focus outline.
- Unknown topic and out-of-range pagination show the branded Page not found screen. These use Next.js streamed not-found boundaries and noindex, not a guaranteed HTTP 404 after streaming begins.
- Story of Ghandi video activation creates the correct privacy-enhanced YouTube iframe and offers the original YouTube link while loading. Actual streaming is not claimed because the in-app browser restricts external embedded playback.

Temporary viewport overrides were reset after review. Full content/metadata/media/redirect verification is recorded separately in verification.json.
