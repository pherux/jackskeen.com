# Working-Route UX Audit

Audit date: 2026-08-31. Evidence was captured from the local Next.js application at
1280×900 and 390×844. `Healthy` means the current skeleton supports the intended
journey; it does not mean missing copy or integrations are approved.

## Flow evidence

### 1. Homepage entry — Healthy with content dependencies

The hero establishes a clear problem/solution direction and exposes the two correct
next actions. Proof and substantive supporting copy are still withheld.

![Homepage entry](./evidence/01-home-entry.png)

### 2. Roadmap overview — Needs work

The hierarchy is clear, but process, results, and FAQ summaries are not linked to
their substantive child routes. Wide-screen in-page navigation is also absent.

![Roadmap overview](./evidence/02-roadmap-overview.png)

### 3. Start form — Blocked

The form has visible labels and expectation context, but submission is intentionally
disabled. This is the primary P0 conversion blocker until CRM/scheduling, consent,
spam protection, legal copy, validation, and success/error behavior are confirmed.

![Start form](./evidence/03-start-form.png)

### 4. About authority — Needs content

Portrait and editorial hierarchy are strong. Verified biography, credentials, and
an early contextual Roadmap link are required for the referred-prospect journey.

![About authority](./evidence/04-about-authority.png)

### 5. Insights entry — Needs work

Topic links work, but Articles, Podcast, and Videos are presented as static sections.
Returning readers need direct format links and featured/latest content before the
full topic directory.

![Insights entry](./evidence/05-insights-entry.png)

### 6. Topic hub — Needs work

Mapped articles are available. The original perspective, start-here hierarchy,
cross-format content, and related topics are not yet present. The breadcrumb's
synthetic `/insights/topics` destination was corrected during this phase.

![Topic hub](./evidence/06-topic-hub.png)

### 7. Article detail — Healthy skeleton

Title, author, date, topic, and preserved URL are clear. The migrated body, updated
date treatment, author block, related content, and contextual Roadmap module remain
pending.

![Article detail](./evidence/07-article-detail.png)

### 8. Work With Jack — Needs work

The five-offer hierarchy is legible, but the rows do not link to their detail pages.
Only confirmed active offers should become destinations.

![Work With Jack](./evidence/08-work-with-jack.png)

### 9. Success Stories — Blocked by proof

The route has an appropriate placeholder structure. It cannot support a trust
journey until exact stories, attribution, media, and usage rights are approved.

![Success Stories](./evidence/09-success-stories.png)

### 10. Podcast listing — Blocked by source records

The route exists but has no episode collection or detail journey. Canonical feed,
platforms, episode metadata, transcripts, and media sources must be supplied.

![Podcast listing](./evidence/10-podcast-listing.png)

### 11. Video listing — Blocked by source records

The route exists but has no playable or linked records. Source media, titles, dates,
captions/transcripts, and canonical handling are required.

![Video listing](./evidence/11-video-listing.png)

### 12. Mobile menu — Healthy skeleton with interaction follow-up

All primary routes and the CTA are exposed at 390px. Build work must add/verify
current-page indication, background-scroll lock, Escape close, focus return, route
close behavior, and 44px targets.

![Mobile menu](./evidence/12-mobile-menu.png)

## Prioritized findings

| Priority | Finding | Required response |
| --- | --- | --- |
| P0 | `/start` cannot complete a submission | Resolve CS-12/CS-13, then implement and test the full form journey |
| P0 | Proof and credentials are unavailable | Keep withheld/noindex; obtain exact approved sources |
| P1 | Offer and content-format rows are not links | Make confirmed destinations semantic links in build work |
| P1 | Roadmap child routes are not linked from the overview | Add contextual links to How It Works, Results, and FAQ |
| P1 | Topic and article discovery is incomplete | Add original intros, start-here, author, related-content, and cross-format modules |
| P1 | Podcast/video detail journeys do not exist | Build only after canonical records and media are confirmed |
| P2 | Mobile disclosure needs robust behavior | Verify focus, Escape, scroll lock, target size, and active state |
| P2 | Long editorial titles need boundary testing | Test 320–1440px, zoom, and long unbroken content |

## Accessibility review

Positive signals: semantic navigation, visible focus styling, one clear page heading,
labelled form controls, descriptive CTA labels, and a native mobile disclosure.

Required before release: keyboard-only traversal, screen-reader menu/form checks,
automated and manual contrast testing, 200% zoom/reflow, reduced-motion review,
embed captions/transcripts, meaningful image alt review, error-summary behavior, and
successful form completion. Screenshots alone do not validate these behaviors.

## Conversion conclusion

The page hierarchy supports the approved strategy, but the current build is not yet
a complete conversion system. The decisive pre-UI dependency is to resolve the
form/legal architecture and provide verified authority/proof sources. The decisive
build change is to connect visually implied destinations with semantic links.
