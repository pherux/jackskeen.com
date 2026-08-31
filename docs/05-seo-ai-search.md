# SEO and AI-Search Requirements

## 1. Objective

Create a site that is:

- Easy to crawl.
- Easy to understand semantically.
- Strongly associated with Jack Skeen as a real expert/entity.
- Structured around durable topics.
- Built from original expert content.
- Technically clean.
- Easy for search systems and AI assistants to quote and attribute.

Do not treat "AI SEO" as keyword stuffing or a separate content-spam discipline.

## 2. On-page metadata

Every indexable page needs:

- Unique `<title>`
- Unique meta description
- Canonical URL
- Open Graph metadata
- Social image
- Correct robots directive
- Descriptive H1
- Logical headings

CMS fields may override generated defaults.

## 3. Canonicals

Rules:

- Self-canonical by default.
- Legacy preserved URL canonicalizes to itself.
- Redirected old URL is not included in sitemap.
- Do not canonicalize unrelated content to a generic hub.
- Query/filter states must be handled intentionally.

## 4. Sitemap

Generate sitemap(s) for indexable:

- Core pages
- Articles
- Podcast episodes
- Videos
- Topic hubs
- Books
- Success stories when indexable

Exclude:

- Preview URLs
- Search/filter state URLs
- Noindex pages
- Redirect sources
- Private CMS routes

## 5. Robots

Create a deliberate robots policy.

Allow relevant public search crawlers.

Review and decide separately on:

- Search/discovery crawlers
- Training crawlers

Search visibility and training permissions are not the same policy decision.

## 6. Structured data

Implement JSON-LD using valid Schema.org types.

### Global

- `WebSite`
- `Organization`

### About Jack

- `ProfilePage`
- `Person`

### Articles

- `Article`
- `Person`
- `BreadcrumbList`

### Podcast

- `PodcastSeries`
- `PodcastEpisode`

### Video

- `VideoObject`

### Books

- `Book`

### Commercial pages

- `Service` when appropriate

### Navigation

- `BreadcrumbList`

### FAQ

Use FAQ structured data only when appropriate and supported by visible content. Do not assume it will generate a rich result.

## 7. Jack Skeen entity model

The website should consistently identify:

```text
Jack Skeen
- executive coach
- psychologist
- author
- podcast host
- creator of The Roadmap
- associated with The Circle Blueprint
```

Use verified `sameAs` links to authoritative public profiles.

The same basic name, credentials, role, image, and short description should be consistent across:

- Home
- About
- Article author blocks
- Podcast
- Schema
- Social profiles where controllable

## 8. Author transparency

Articles should visibly show:

- Author
- Author link
- Publication date
- Updated date when materially updated
- Author bio

Avoid generic "Admin" or "Team" authorship for Jack's personal intellectual content.

## 9. AI-search content patterns

Important evergreen pages should make the answer clear early.

Recommended format:

1. Direct definition/answer.
2. Jack's perspective.
3. Explanation.
4. Example or story.
5. Nuance.
6. Related concepts.
7. References/links if used.
8. Relevant next step.

Avoid filler introductions written solely to make a page longer.

## 10. Question-led content opportunities

Examples:

- What is a personal Roadmap?
- What does Jack Skeen mean by "genius"?
- Why can successful people still feel unfulfilled?
- How do you know what you are uniquely good at?
- How do successful executives decide what comes next?
- What is the difference between achievement and fulfillment?
- What makes executive coaching useful?
- What is The Circle Blueprint?
- What are Independence, Power, Humility, and Purpose?
- How does outside feedback reveal strengths you cannot see yourself?

These should only be created when Jack can provide distinct, substantive answers.

## 11. Internal linking

Use editorial internal links based on conceptual relationships.

Priority:

- Topic hub
- Related content
- Roadmap where contextually relevant
- About Jack

Anchor text should describe the linked content naturally.

## 12. Content quality

Prefer:

- Original experience
- Original frameworks
- Specific examples
- Named concepts
- Transcripts
- Edited interviews
- Jack's actual arguments and observations

Avoid:

- Commodity AI-generated summaries
- Generic listicles
- Thin location pages
- Duplicate topic pages
- Hundreds of shallow FAQ pages
- Programmatic pages without user value

## 13. Podcast/video search strategy

Every important episode/video should have an HTML page containing:

- Descriptive title
- Summary
- Key ideas
- Player
- Transcript
- Guest information if relevant
- Topic relationships
- Related content

Do not rely solely on YouTube descriptions for discoverability.

## 14. Performance SEO

- Avoid rendering key article content only after client JavaScript.
- Optimize LCP image.
- Minimize third-party scripts.
- Lazy-load below-the-fold embeds.
- Reserve media dimensions to prevent CLS.
- Use fonts efficiently.
- Avoid autoplay video in ways that damage performance or accessibility.

## 15. Search migration monitoring

Before and after launch track:

- Indexed page count
- Organic clicks
- Organic impressions
- Top landing pages
- Top queries
- Crawl errors
- 404s
- Redirect chains
- Canonical issues
- Sitemap status
- Core Web Vitals

Create a baseline before cutover.
