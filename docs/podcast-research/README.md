# Inside the Circle — source and implementation notes

Created September 23, 2026. The collection contains the 16 episodes present in Jack Skeen’s official podcast playlist on this date.

## Primary sources

- [Official podcast channel](https://www.youtube.com/@JackSkeen/podcasts)
- [Inside the Circle playlist](https://www.youtube.com/playlist?list=PLLo13VP-wIOJTMpdZ5q0GwrVz5YENfA1B)
- `episodes.json`: original episode titles, published descriptions, publication timestamps, durations, video URLs, and local artwork references. Each entry links directly to its source interview.
- `playlist.json`: the playlist’s 16 video IDs and titles in newest-first order.
- `transcripts/`: YouTube’s exported automatic transcripts for Reshma Nichani, David Riggs, and Jeff Durkee, used only for research. These files are not exposed as site downloads or published as transcripts.

YouTube transcript export was unavailable for the other 13 episodes. Those profiles draw on their published descriptions. No invented quotations, financial results, company affiliations, graduation dates, or causal claims were added. The collection’s Roadmap-graduate classification follows the site owner’s instruction; the episode descriptions do not independently establish a graduation date for every participant.

Editorial summaries distinguish direct Roadmap/coaching experiences explicitly supported by the sources from broader themes of a conversation. Takeaways are editorial paraphrases. Reflection questions are original site content, visibly labeled as such. Guest roles are presented in their episode context rather than as independently verified current appointments.

### Identity and numbering decisions

- Episode 3’s title spells the first name “Coner”; its description identifies **Conor Kearney**, used on the page.
- **Rodrigo Herrera Aspra** (episode 15) and **Rodrigo Herrera** (episode 8) have separate source videos and separate pages. No assumption that they are the same person was made.
- Episodes 4–6 omit episode numbers in their titles. Their numbers follow their position between the explicitly numbered episodes 3 and 7 in the official playlist.
- Reshma’s craft-related idea is described as an emerging possibility, not a launched business.
- Displayed publication dates preserve the calendar date in the original publication timestamp. JSON-LD retains the full source timestamp.

## Structure and editing

- Hub: `/inside-the-circle`.
- Sixteen statically generated guest routes: `/inside-the-circle/[slug]`.
- `src/data/podcast.ts` contains typed editorial content and joins it to the source metadata in newest-first playlist order. When adding an episode, add matching entries in both lists; keep their order synchronized.
- Images are original episode artwork, served locally through `next/image`.
- Each page contains a full video, profile, supported perspective, three takeaways, three original reflection prompts, related interviews, source attribution, and Roadmap links.
- Search supports accented names without requiring accent entry. Topic filters update an announced result count and provide a clear empty state.
- The YouTube iframe loads only after the visitor activates the player. A loading state and persistent direct YouTube link provide an alternative when an embedded player is unavailable.
- Unique metadata, canonical URLs, social previews, VideoObject/PodcastEpisode/BreadcrumbList data, and sitemap entries are included. The hub includes CollectionPage/ItemList and PodcastSeries data.
- `/insights/podcast` redirects to the new collection with an exact 301 and is excluded from the sitemap.
- Header, footer, and Client Stories link into the new hub.
- No new dependency or environment variable is required. The existing `NEXT_PUBLIC_SITE_INDEXABLE=true` launch setting controls indexing on the new routes. Staging remains noindex; this change does not publish the site.

## Verification

The visitor journey is collection → filtered guest list → guest page → interview / related stories → Roadmap.

- Production build, ESLint, and TypeScript checks pass.
- All 17 routes return 200; all 16 profiles have distinct titles, descriptions, canonical URLs, one H1, valid JSON serialization of supported structured data, and matching video IDs.
- Each profile has three takeaways, three reflection prompts, and three related stories.
- Sitemap inclusion, podcast 301 redirect, and unknown guest 404 are verified. See `route-verification.json`.
- Browser checks cover desktop, tablet, phone, search by “Aviles,” topic filtering, empty results/reset, mobile navigation, and player activation.
- The in-app browser left both standard and privacy-enhanced YouTube iframes at `about:blank`, including in an isolated plain HTML diagnostic. Direct embed navigation returned YouTube error 153 (no referring page). The embed endpoints return HTTP 200. Actual streaming playback could not be confirmed in this preview environment; this remains a launch-environment verification item. Every profile includes a direct original-video link and a loading fallback.

No Lighthouse score or rich-result eligibility is claimed. No deployment or public indexing was performed.
