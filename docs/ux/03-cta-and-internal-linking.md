# CTA Hierarchy and Internal Linking

## CTA hierarchy

| Level | Label | Destination | Use |
| --- | --- | --- | --- |
| Primary | Start Your Roadmap | `/start` | Header, Roadmap pages, Home, About, relevant editorial end states |
| Secondary | Discover The Roadmap | `/roadmap` | Home, About, editorial context modules |
| Secondary | Meet Jack | `/about` | Home and referred-prospect journeys |
| Contextual | Contact Jack | `/contact` | Corporate and general inquiries |
| Contextual | Read / Listen / Watch | Content detail route | Content discovery only |

Rules:

- One primary CTA per viewport section; do not repeat it after every block.
- Buttons represent navigation or submission. Editorial references remain text
  links.
- CTA labels describe the destination. Do not use generic `Learn more`.
- A disabled form is not a conversion path. Keep it clearly unavailable until its
  complete success and error journey works.
- Do not route removed or unrelated content to the homepage.

## Route-link contract

| Source | Required outgoing links |
| --- | --- |
| Home | `/roadmap`, `/start`, `/about`, featured content detail |
| `/roadmap` | `/roadmap/how-it-works`, `/roadmap/results`, `/roadmap/faq`, `/start` |
| Roadmap support pages | `/roadmap`, sibling support page when relevant, `/start` |
| `/work-with-jack` | `/roadmap`, each confirmed offer detail, `/contact` where appropriate |
| Offer detail | parent hub, related Roadmap page, `/start` or `/contact` according to intent |
| `/about` | `/roadmap`, `/books`, `/insights`, `/start` |
| `/insights` | `/insights/articles`, `/insights/podcast`, `/insights/videos`, every topic route |
| Article detail | `/insights`, primary topic, author/About, two to five related items, contextual `/roadmap` |
| Topic hub | `/insights`, content details across available formats, two or three related topics |
| Podcast/video detail | parent listing, topics, two to five related items |
| Success Stories | relevant offer/Roadmap context and `/start` |
| `/start` | Privacy, Terms, success state, optional scheduler after success |
| `/contact` | Privacy, Terms, success state |

## Breadcrumb contract

- Strategic child: Home (implicit) → parent hub → current page.
- Topic: Insights → current topic. There is no `/insights/topics` index route.
- Article: Insights → primary topic → current article.
- Podcast/video detail: Insights → format listing → current item.
- Breadcrumb labels and destinations must match canonical routes and must never
  introduce a synthetic archive.

## Related-content logic

1. Editorially selected relationships override automation.
2. Otherwise match the primary approved topic.
3. Prefer a mix of formats where source records exist.
4. Exclude the current item, noindex placeholders, duplicates, removed content, and
   anything lacking a resolvable canonical route.
5. Cap the visible set at five and provide a single route back to the topic hub.

## Validation outcome

The working-route audit found three implementation gaps to carry into build work:

- Work With Jack offer rows and Insights format rows are visually presented as
  destinations but are not links.
- Roadmap summary sections do not yet link to How It Works, Results, and FAQ.
- Topic breadcrumbs previously created a nonexistent `/insights/topics` route; the
  route helper was corrected in this phase.
