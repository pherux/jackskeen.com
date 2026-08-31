# Information Architecture

## 1. Sitemap

```text
/
├── roadmap
│   ├── how-it-works
│   ├── results
│   └── faq
├── work-with-jack
│   ├── executive-coaching
│   ├── roadmap-essentials
│   ├── roadmap-discovery-group
│   └── corporate
├── about
├── insights
│   ├── articles
│   ├── podcast
│   ├── videos
│   └── topics
│       └── [topic]
├── books
│   └── circle-blueprint
├── success-stories
├── contact
├── start
├── privacy
├── terms
└── [legacy-article-slug]
```

## 2. Navigation hierarchy

### Header

Left: Jack Skeen brand

Primary:
- The Roadmap
- Work With Jack
- Insights
- About

Right:
- Start Your Roadmap

### Footer

#### Explore
- The Roadmap
- Work With Jack
- Success Stories
- About Jack

#### Ideas
- Articles
- Inside the Circle
- Videos
- Circle Blueprint

#### Connect
- Contact
- LinkedIn
- YouTube
- X or other approved profiles

#### Legal
- Privacy
- Terms

## 3. Content relationships

The website should model relationships rather than isolated posts.

```text
Jack Skeen
├─ authors -> Articles
├─ hosts -> Podcast episodes
├─ appears in -> Videos
├─ authored/co-authored -> Books
├─ created -> The Roadmap
└─ associated with -> Topics

Topic
├─ contains -> Articles
├─ contains -> Podcast episodes
├─ contains -> Videos
└─ links contextually -> Roadmap

Roadmap
├─ supported by -> Client stories
├─ explained by -> FAQ
├─ related to -> Topic pages
└─ CTA -> Start
```

## 4. Core topic hubs

### Purpose

Focus:
- Meaning
- Calling
- Direction
- Next chapter
- Fulfillment
- Life design

### Success & Fulfillment

Focus:
- Achievement
- Wealth
- Identity
- Ambition
- Why success can feel empty
- Defining enough

### Leadership

Focus:
- Executive leadership
- Decision-making
- Teams
- Culture
- Responsibility
- Organizational behavior

### Personal Growth

Focus:
- Self-awareness
- Habits
- Change
- Psychology
- Emotional maturity
- Growth

### Relationships

Focus:
- Marriage
- Friendship
- Connection
- Feedback
- Interpersonal dynamics

### Your Genius

Focus:
- Strengths
- Unique contribution
- Energy
- Patterns
- Talent
- Roadmap concepts

### Circle Blueprint

Focus:
- Independence
- Power
- Humility
- Purpose

### Reflections

Focus:
- Jack's personal essays
- Stories
- Observations
- Lessons
- Experiences

## 5. Topic-hub template

Each topic page should contain:

1. H1
2. 150–400 word original editorial introduction
3. Jack's perspective
4. "Start here" content
5. Featured article
6. Related articles
7. Related podcast episodes
8. Related videos
9. Related concepts/topics
10. Contextual Roadmap CTA

The page must have enough original editorial value to exist as an indexable destination.

## 6. Article page structure

1. Breadcrumb
2. Primary topic
3. H1
4. Deck/excerpt
5. Author
6. Original publication date
7. Updated date when applicable
8. Hero media
9. Article
10. Optional pull quote
11. Author bio
12. Related content
13. Contextual CTA
14. Newsletter/signup area

## 7. Podcast page structure

1. Breadcrumb
2. Episode title
3. Guest
4. Description
5. Embedded player/video
6. Key ideas
7. Edited transcript
8. Guest bio
9. Related topics
10. Related content
11. Roadmap/contextual CTA

## 8. Video page structure

1. Breadcrumb
2. Video title
3. Summary
4. Video
5. Key takeaways
6. Transcript when available
7. Related content
8. CTA

## 9. Internal linking principles

Each content page should link naturally to:

- Its primary topic.
- 2–5 relevant pieces of content.
- One relevant commercial page where appropriate.
- Jack's About page when author/entity context matters.

Avoid automated links that create repetitive or unnatural anchor text.

## 10. URL strategy

### New strategic pages

Use descriptive nested routes.

Examples:

- `/roadmap`
- `/roadmap/how-it-works`
- `/insights/podcast`
- `/insights/topics/purpose`

### Legacy articles

Prefer retaining existing root-level article URLs when they have existing SEO value.

Example:

- Existing `/what-do-you-want/`
- New implementation should continue serving `/what-do-you-want/`

The user-facing breadcrumb may still show:

`Insights > Purpose > What Do You Want?`

Do not force legacy articles into `/insights/articles/` solely for architectural cleanliness.
