# Technical Architecture

## 1. Stack

### Frontend

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui

### CMS

- Sanity

### Hosting

- Vercel

### Analytics / search

- Google Analytics 4
- Google Search Console
- Bing Webmaster Tools
- Optional Vercel Analytics

## 2. Rendering strategy

Prefer static generation and cached Server Components for public editorial pages.

Use dynamic rendering only when necessary.

Recommended:

- Marketing pages: static/cached.
- Articles: static/cached and revalidated from CMS updates.
- Topic pages: static/cached.
- Podcast/video pages: static/cached.
- Forms: Server Actions or appropriate form integration.
- Preview: draft mode.

## 3. Project structure

Suggested structure:

```text
src/
├── app/
│   ├── (marketing)/
│   ├── insights/
│   ├── roadmap/
│   ├── work-with-jack/
│   ├── books/
│   ├── success-stories/
│   ├── api/
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── global-error.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── content/
│   ├── forms/
│   ├── seo/
│   └── ui/
├── lib/
│   ├── sanity/
│   ├── seo/
│   ├── analytics/
│   ├── redirects/
│   └── utils/
├── types/
└── styles/

sanity/
├── schemaTypes/
├── structure/
└── sanity.config.ts
```

The exact layout may change, but responsibility boundaries must remain clear.

## 4. Server/client boundary

Default to Server Components.

Client Components are appropriate for:

- Mobile menu interaction
- Accordions
- Form interaction
- Carousels when necessary
- Media controls
- User-triggered filtering
- Analytics listeners
- Small motion effects

Do not convert whole pages to Client Components for convenience.

## 5. CMS integration

Create typed queries for:

- Site settings
- Pages
- Articles
- Topics
- Podcast episodes
- Videos
- Testimonials
- Books
- FAQs
- People
- Redirect records if redirects are managed through Sanity

## 6. Sanity content models

### Site settings

Fields:
- Site title
- Site description
- Canonical origin
- Logo
- Default social image
- Social profiles
- Primary CTA
- Footer content
- Contact details
- Organization structured-data fields

### Person

Fields:
- Name
- Slug
- Credentials
- Role
- Short bio
- Full bio
- Portrait
- Social links
- SameAs URLs
- Schema fields

### Article

Fields:
- Title
- Slug
- Excerpt
- Hero image
- Portable Text body
- Author
- Original published date
- Updated date
- Primary topic
- Secondary topics
- Related content
- Featured
- SEO title
- Meta description
- Social image
- Canonical override
- Index/noindex override
- Legacy URL if applicable

### Topic

Fields:
- Name
- Slug
- Description
- Long-form introduction
- Hero
- Featured content
- Related topics
- SEO fields

### Podcast episode

Fields:
- Title
- Slug
- Episode number
- Guest
- Description
- Publish date
- Hero art
- YouTube URL
- Audio URLs
- Key ideas
- Transcript
- Topics
- Related content
- SEO fields

### Video

Fields:
- Title
- Slug
- Description
- YouTube/Vimeo URL
- Publish date
- Transcript
- Topics
- Related content
- SEO fields

### Testimonial

Fields:
- Person
- Role
- Company
- Quote
- Long-form story
- Video
- Photo
- Program
- Approval status
- Featured
- Sort order

### Book

Fields:
- Title
- Slug
- Subtitle
- Authors
- Description
- Cover
- Purchase URLs
- ISBN when available
- Publish data
- Related topics
- SEO fields

### FAQ

Fields:
- Question
- Answer
- Context/category
- Sort order

### Redirect

Fields:
- Source path
- Destination path
- Status
- Migration note

## 7. CMS editorial workflow

Minimum:

- Draft
- Preview
- Publish
- Revision history
- Media library
- Validation
- Scheduled publishing if enabled

Editors must be able to publish content without changing code.

## 8. Forms

Primary forms:

- Start Your Roadmap
- Contact
- Newsletter

Requirements:

- Accessible labels
- Validation
- Loading state
- Success state
- Error state
- Spam protection
- CRM/email integration
- Analytics events
- Privacy/consent text where required

Exact integrations should be documented after existing Kit/Calendly workflow review.

## 9. Environment variables

At minimum anticipate:

- Sanity project ID
- Sanity dataset
- Sanity API version
- Sanity read token if required
- Sanity preview token
- Analytics IDs
- Form/CRM integration secrets

Provide `.env.example` without production secrets.

## 10. Images

- Use `next/image`.
- Store editorial media in Sanity or approved external host.
- Always provide dimensions.
- Provide meaningful alt text.
- Use responsive `sizes`.
- Avoid oversized original assets.
- Preserve high-quality photography.

## 11. Fonts

Use `next/font`.

Select:

- One expressive editorial display family.
- One highly readable text/UI family.

Avoid excessive font variants.

## 12. Error handling

Required:

- `not-found.tsx`
- Global error boundary
- Error states for CMS/API failure
- Graceful handling of missing external video
- Form error handling

## 13. Redirect implementation

Redirect map must be production-safe.

Sources:

1. Static migration redirect file.
2. CMS-managed redirects if editorial control is needed.

For thousands of redirects, choose a scalable lookup mechanism rather than a massive middleware bundle.

## 14. Testing

Minimum automated checks:

- TypeScript
- ESLint
- Production build
- Unit tests for important utilities
- Schema/metadata tests where useful
- Link/route smoke checks
- Redirect tests for migration-critical URLs

Add E2E tests for:

- Homepage
- Roadmap CTA
- Article page
- Insights browsing
- Main form
- 404
- Critical redirect
