# Product Requirements

## 1. Product summary

The new JackSkeen.com will replace the existing WordPress/PHP site with a high-performance Next.js website focused on three outcomes:

1. Establish Jack Skeen as a trusted authority.
2. Convert qualified visitors into Roadmap conversations/applications.
3. Build a structured, durable content library that compounds in search engines and AI-assisted discovery.

## 2. Target audiences

### Primary

#### Accomplished executives and founders
People who have achieved material or professional success but want greater clarity, alignment, purpose, or confidence about their next chapter.

#### High-performing professionals in transition
People considering a career change, leadership transition, entrepreneurship, retirement, sale of a business, or major life redesign.

### Secondary

- Organizations seeking executive/corporate advisory.
- Existing followers of Jack's books, articles, podcast, or videos.
- Search visitors researching executive coaching, personal purpose, fulfillment, strengths, leadership, and life transitions.
- Referrals evaluating Jack before booking a conversation.

## 3. Primary user journeys

### Journey A: Roadmap prospect

1. Lands on homepage or Roadmap page.
2. Understands Jack's positioning within 10 seconds.
3. Understands the problem The Roadmap solves.
4. Learns how the process works.
5. Sees evidence and client stories.
6. Validates Jack's credibility.
7. Reads FAQ and qualification information.
8. Starts a conversation / application.

### Journey B: Referred prospect

1. Searches Jack's name.
2. Lands on homepage/about page.
3. Verifies identity, credentials, philosophy, and client work.
4. Explores The Roadmap.
5. Watches testimonials.
6. Converts.

### Journey C: Organic content visitor

1. Finds an article, podcast episode, video, or topic page.
2. Gets a complete answer to the original query.
3. Learns Jack's point of view.
4. Discovers related ideas.
5. Encounters a contextual Roadmap CTA.
6. Subscribes, explores, or books.

### Journey D: Returning reader

1. Visits Insights.
2. Filters/browses by core topic.
3. Finds new material.
4. Subscribes or continues into an offer.

## 4. Site goals

### Commercial goals

- Increase qualified Roadmap inquiries.
- Improve perceived authority and premium positioning.
- Make offer selection clearer.
- Reduce confusion between Jack's multiple websites/offers.
- Improve testimonial discoverability.

### Content goals

- Preserve valuable legacy articles.
- Create intentional content taxonomy.
- Support articles, podcast episodes, video, topic pages, books, testimonials, and FAQs.
- Enable future publishing without code changes.

### Search goals

- Preserve existing ranking equity where practical.
- Improve author/entity signals for Jack.
- Improve structured-data coverage.
- Build topical authority around Jack's core ideas.
- Make content easy for search engines and AI systems to parse, attribute, and cite.

## 5. Primary navigation

Desktop:

- The Roadmap
- Work With Jack
- Insights
- About
- Primary CTA: Start Your Roadmap

Mobile navigation should preserve the same hierarchy.

## 6. Required pages

### Core pages

- `/`
- `/roadmap`
- `/roadmap/how-it-works`
- `/roadmap/results`
- `/roadmap/faq`
- `/work-with-jack`
- `/work-with-jack/executive-coaching`
- `/work-with-jack/roadmap-essentials`
- `/work-with-jack/roadmap-discovery-group`
- `/work-with-jack/corporate`
- `/about`
- `/insights`
- `/insights/articles`
- `/insights/podcast`
- `/insights/videos`
- `/insights/topics/[slug]`
- `/books`
- `/books/circle-blueprint`
- `/success-stories`
- `/contact`
- `/start`
- Legal pages
- Legacy article routes

Pages may be consolidated before development if content strategy proves that a separate route would be thin.

## 7. Homepage requirements

Sections:

1. Hero
2. Problem / tension
3. Roadmap introduction
4. Roadmap process visualization
5. Outcomes
6. Featured client story
7. Jack authority/bio section
8. Featured insights
9. Podcast
10. Final CTA
11. Footer

### Hero objective

Answer immediately:

- Who is this for?
- What does Jack help them do?
- What should they do next?

### Recommended direction

Headline concept:

> You've built a successful life. Make sure it's the right one.

Support copy should introduce Jack and the core transformation.

## 8. Roadmap page requirements

The Roadmap page is the most important commercial page.

Required sections:

1. Hero
2. Who it is for
3. Core problem
4. Definition of "your genius"
5. Why outside perspective matters
6. Process overview
7. Assessments
8. Stakeholder perspective
9. Conversations with Jack
10. Analysis/pattern recognition
11. Final Roadmap deliverable
12. Outcomes
13. Client stories
14. Jack's credibility
15. FAQ
16. Investment/qualification area if approved
17. Final CTA

## 9. About page requirements

Must establish a strong identity/entity page for Jack.

Include:

- Full name and credentials
- Current professional role
- Biography
- Psychology background
- Theology/ministry background
- Coaching history
- Development of The Roadmap
- The Circle Blueprint
- Podcast/media
- Philosophy
- Professional credentials
- Selected client/company references only when verified and approved
- Social/profile links
- Contact/media CTA

## 10. Insights requirements

"Insights" replaces "Blog" as the public content library.

Content types:

- Articles
- Podcast episodes
- Videos
- Topic hubs

Core topic taxonomy:

1. Purpose
2. Success & Fulfillment
3. Leadership
4. Personal Growth
5. Relationships
6. Your Genius
7. Circle Blueprint
8. Reflections

Avoid dozens of public tag archives.

## 11. Success stories requirements

Support:

- Video testimonials
- Written testimonials
- Client name
- Role
- Organization where approved
- Thumbnail/photo
- Program
- Featured status
- Sort order

Avoid publishing claims that are not backed by an approved testimonial.

## 12. Global components

- Header
- Mobile navigation
- Footer
- CTA section
- Article card
- Podcast card
- Video card
- Testimonial
- Quote
- Breadcrumbs
- Newsletter signup
- Author block
- Related-content section
- Share tools
- FAQ accordion
- Rich text renderer
- Responsive media
- Form states
- Consent/privacy components where required

## 13. Nonfunctional requirements

- Responsive at common mobile/tablet/desktop breakpoints.
- Strong accessibility.
- Minimal client-side JavaScript.
- Progressive enhancement.
- Fast page rendering.
- Safe external embeds.
- Strong CMS editorial workflow.
- Preview mode for draft content.
- Robust 404 behavior.
- Analytics event tracking.
- Production-safe redirects.
- No dependency on WordPress after migration.
