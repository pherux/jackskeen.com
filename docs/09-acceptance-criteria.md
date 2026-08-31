# Acceptance Criteria

## 1. Global

- Site renders without runtime errors.
- Production build passes.
- TypeScript passes.
- Lint passes.
- No production secrets exist in repository.
- No dependency on WordPress is required for normal site operation.
- CMS editors can publish supported content types without code changes.

## 2. Homepage

- Within the initial viewport users can identify Jack, the target audience/problem, and the primary CTA.
- The Roadmap is visually and conceptually the primary offer.
- Social proof appears before the final CTA.
- Jack's authority is clearly established.
- Featured Insights are CMS-driven.
- Mobile layout preserves hierarchy.

## 3. Roadmap

- Explains who the Roadmap is for.
- Explains Jack's meaning of "genius."
- Explains the process.
- Describes the final deliverable.
- Includes proof/testimonials.
- Includes qualification/FAQ information where approved.
- Provides clear conversion CTA.
- Claims are traceable to approved content.

## 4. About Jack

- Jack's complete approved name/credentials are present.
- Biography is substantive.
- Psychology/coaching/book/podcast context is represented accurately.
- Relevant sameAs profiles are linked.
- Person/ProfilePage structured data is present and valid.

## 5. Articles

- Old publication date is preserved.
- Author is visible.
- Primary topic is visible/linkable.
- Rich text renders correctly.
- Images render responsively.
- Internal links work.
- Canonical is correct.
- Metadata is unique.
- Article schema is valid.
- Related content is available where configured.

## 6. Topic pages

- Topic page contains original editorial copy.
- Topic page is not merely an auto-generated list.
- Content belongs to the topic.
- Page has unique metadata.
- Page links to related concepts.
- Page has a contextual CTA.

## 7. Podcast pages

- Player/media works.
- Episode summary exists.
- Publish date is present.
- Guest attribution is accurate.
- Transcript renders when available.
- Podcast structured data is valid.
- Page has related topic/content links.

## 8. Migration

- 100% of URLs in migration inventory have a documented action.
- Preserved URLs return 200.
- Redirect URLs use the intended permanent redirect.
- No critical redirect chains exist.
- Removed URLs are not redirected to unrelated destinations.
- Top traffic/backlink URLs are manually verified.
- Legacy articles preserve dates/authorship.
- Migrated media does not depend on the old WordPress server unless intentionally documented.

## 9. SEO

- All indexable pages have canonical URLs.
- Sitemap contains only intended canonical indexable URLs.
- robots.txt is deliberate and valid.
- No preview URLs are indexable.
- No accidental staging domain is canonical.
- Structured data validates without critical errors.
- Breadcrumbs are visible where expected.
- Main pages have unique title/description.
- Old redirect sources do not appear in sitemap.

## 10. AI-search/discovery

- About page clearly identifies Jack and his work.
- Important content includes direct definitions/explanations rather than vague marketing copy.
- Author identity is visible.
- Topic relationships are represented in links/content.
- Podcast/video transcripts are indexable HTML when available.
- Search crawler policy is explicitly configured.
- No invented schema claims exist.

## 11. Accessibility

- All interactive controls can be used by keyboard.
- Focus is visible.
- Navigation works without pointer input.
- Form controls have labels.
- Heading structure is logical.
- Images have appropriate alt behavior.
- Text meets contrast targets.
- Reduced-motion setting is respected.

## 12. Performance

Representative templates should aim to achieve:

- Lighthouse Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

Production should target:

- LCP <= 2.5s p75
- CLS <= 0.1
- INP <= 200ms p75

The project should not inflate the client bundle with libraries that can be avoided.

## 13. Forms

- Required fields validate.
- Invalid submissions are rejected.
- Spam protection works.
- Success message is clear.
- Integration receives the expected data.
- Failed integrations return a usable error state.
- Conversion event is emitted once on successful submission.

## 14. Responsive behavior

Test at minimum:

- 360px width
- 390px width
- 768px width
- 1024px width
- 1440px width

No horizontal scrolling should occur from layout errors.

## 15. Launch

Before DNS cutover:

- Backups exist.
- Redirects are loaded.
- Rollback procedure exists.
- Analytics is ready.
- Search Console access exists.
- Forms have been tested in production-like environment.

After cutover:

- HTTPS works.
- Canonical host works.
- www/non-www behavior is correct.
- Top 50 legacy URLs are verified.
- Sitemap is accessible.
- robots is accessible.
- Production crawl has no critical errors.
- Main conversion flow works.
