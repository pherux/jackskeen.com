# Responsive Wireframes

These are content-order wireframes, not final visual designs. Desktop uses the
approved editorial grid and restrained geometry. Mobile preserves the same
information hierarchy in one column rather than merely shrinking the desktop
composition.

## Global frame

Desktop order: skip link, brand, primary navigation, persistent primary CTA,
page content, contextual CTA, footer. Mobile order: brand, menu control, contained
navigation panel, page content, contextual CTA, footer.

The header contains The Roadmap, Work With Jack, Insights, and About. The primary
CTA is always `Start Your Roadmap`. Footer utility links include Contact, Privacy,
Terms, and content-format destinations when those routes are substantive.

## Homepage

Desktop:

1. Split hero: approved problem/solution statement, supporting line, primary
   `Start Your Roadmap`, secondary `Meet Jack`, and approved hero photography.
2. Problem section: the fulfillment/next-chapter tension.
3. Solution section: what the Roadmap clarifies, before process details.
4. Roadmap overview: five concise stages with a link to `/roadmap/how-it-works`.
5. Approved proof module or visibly withheld state.
6. About Jack summary with verified biography link.
7. Featured insight and two recent items.
8. Final Roadmap CTA.

Mobile: hero copy precedes the image; CTAs stack with the primary first; the
problem/solution comparison becomes sequential; Roadmap stages use a vertical
progression; editorial cards remain full-width and no horizontal carousel is
required.

## The Roadmap

Desktop:

1. Hero with definition, fit statement, and primary CTA.
2. Sticky in-page navigation on wide screens: Fit, Problem, Genius, Perspective,
   Process, Outcomes, Questions.
3. Problem and fit.
4. Unique contribution and perspective.
5. Process summary linking to How It Works.
6. Approved outcomes linking to Results.
7. Approved story or withheld proof state.
8. FAQ preview linking to the full FAQ.
9. Primary CTA with commitment expectations.

Mobile: replace sticky navigation with a compact jump control; each section is a
single reading column; process steps are vertical; CTA follows the FAQ preview.

## About Jack

Desktop:

1. Portrait hero with verified one-sentence introduction.
2. Biography.
3. Verified background and credentials.
4. Origin of the Roadmap with a contextual Roadmap link.
5. Circle Blueprint framework and book link.
6. Books, podcast, videos, and writing.
7. Approved personal/professional photography.
8. Primary CTA.

Mobile: portrait follows the title and introduction; credentials use a readable
definition list; media links become a vertical list. No credential is shown until
it has a source.

## Article detail

Desktop:

1. Breadcrumbs: Insights, primary topic, current article.
2. Topic, title, deck, author, publication date, and updated date when material.
3. Featured image when available and approved.
4. Reading column with optional anchored contents for long articles.
5. Contextual media and pull quotes only when present in the source.
6. Author block.
7. Related content across formats.
8. Contextual Roadmap module and final CTA.

Mobile: metadata wraps below the title; body measure remains narrow; tables and
embeds scroll within their own region; related items stack. Preserve the audited
root-level URL.

## Insights landing

Desktop:

1. Editorial introduction.
2. Featured/latest content.
3. Direct links to Articles, Podcast, and Videos.
4. Topic directory with all eight approved topics.
5. Recent content stream.
6. Newsletter block only after CS-20 is resolved.

Mobile: content-format links appear immediately after the introduction; featured
content stacks before topics; the topic directory is a simple list or two-column
grid, not a horizontal scroller.

## Topic hub

Desktop:

1. Breadcrumbs: Insights, topic.
2. Original Jack-authored introduction.
3. Start-here item.
4. Featured articles, podcast episodes, and videos.
5. Chronological related content.
6. Two or three related topics.
7. Contextual Roadmap module where genuinely relevant.

Mobile: start-here content comes before filters or related topics; content-format
groups stack; related topics appear last. Keep the route noindex until the original
introduction and useful content threshold are met.

## Podcast listing and detail

Listing order: series introduction and platform links; featured/latest episode;
chronological episode list; topics; optional newsletter. Detail order: title,
episode number/date/duration; accessible player; summary; transcript; key topics;
guest details when verified; related content; series navigation.

Mobile: player controls remain at least 44px high; transcript follows the summary;
long platform lists collapse behind a clearly labelled disclosure. Do not publish
episode pages until the canonical feed and source records are confirmed.

## Video listing and detail

Listing order: video introduction; featured video; chronological collection;
topic navigation. Detail order: title/date; responsive accessible embed or local
player; summary; transcript/captions; topics; related content.

Mobile: preserve a 16:9 player without overflow; place title and metadata before the
player if it improves source order; never autoplay.

## Success Stories

Desktop order: purpose and proof standard; one approved featured story; story
collection grouped by relevant engagement only when volume supports it; proof
methodology/disclosure; primary CTA. Mobile stacks all stories and keeps attribution
adjacent to the statement it supports.

No filter, logo, outcome, quotation, or client identity is displayed until usage
rights and exact attribution are approved.

## Start Your Roadmap and Contact

Desktop: expectation panel and form share a two-column layout. Start includes fit,
what happens next, minimal qualified-inquiry fields, consent, submit, success, and
optional scheduler. Contact includes routing context, organization/individual
selection only if needed, message, consent, and success.

Mobile: expectation content precedes the form; labels remain visible; controls are
full-width; the submit control is not sticky; error summary precedes field errors;
the scheduler appears only after a successful submit.

## Mobile navigation

Closed state: brand, `Menu` control, and optional compact primary CTA only when it
does not crowd the header. Open state: contained panel with all primary links,
primary CTA, close control, current-page indication, and no background scroll.

Required behavior: correct `aria-expanded`/labelling, focus enters the panel, Escape
closes it, focus returns to the trigger, route selection closes it, and all targets
meet the 44px minimum touch size.
