# CMS and Content-Model Foundation

## Status

The repository contains the complete Sanity Studio and application integration. Creating the hosted Sanity project and `production` dataset remains blocked because the local CLI is not authenticated. No project ID, token, or CORS setting has been invented.

## Model

The document types are site settings, person, page, article, topic, podcast episode, video, testimonial, book, FAQ, and redirect. `page` is intentionally a restrained content record, not a generic page builder; it provides a future home for approved marketing copy without defining or designing marketing sections.

Shared objects cover SEO/social metadata, accessible editorial images, links and CTAs, Portable Text, supported video embeds, callouts, pull quotes, and private migration metadata. Portable Text does not permit arbitrary HTML. External links require complete HTTP(S) URLs, images require alt text unless explicitly decorative, redirect sources must be unique root-relative paths, and production testimonial queries return approved records only.

The eight topic documents in `sanity/seed/structural-content.ndjson` match the information architecture. They are drafts with visibly marked descriptions and are not imported automatically. Site settings are also a noindex draft placeholder. Import only after creating the real project:

```powershell
npx sanity dataset import sanity/seed/structural-content.ndjson production --missing
```

## Studio and editorial workflow

Studio is embedded at `/studio` and grouped into Content, Marketing content, People, and Configuration. Site settings is a singleton and cannot be duplicated from the normal Studio actions. Editors retain Sanity's draft, publish, revision, and media workflows. Presentation/preview locations are declared for every routable content type.

Draft mode uses server-only `SANITY_API_READ_TOKEN`. `SANITY_API_BROWSER_TOKEN` is optional and should be a least-privilege Viewer token; it is used only for browser-side live preview. The public environment variables contain identifiers, never secrets. The enable endpoint returns `503` until a valid project and server token are configured.

## Migration compatibility

Article, page, podcast, and video records preserve WordPress ID, legacy and canonical URLs, author text, categories/tags, featured-image URL, migration action, manual-review flag, and notes. Original publication dates and mapped primary topics are required on articles. This supports the inventory under `docs/migration` without recreating public WordPress taxonomy.

The model deliberately does not migrate or publish:

- WordPress tag/category archives as new taxonomy documents;
- raw HTML, inline styles, page-builder markup, or unknown shortcodes;
- unapproved testimonials or rewritten claims;
- suspicious external URLs or unsupported embeds;
- duplicate-slug records without manual resolution;
- legacy media by hotlinking it as the final production source.

The importer in EPIC 10 must transform supported markup to Portable Text, upload verified media, repair approved internal links, and send collisions or unsupported blocks to manual review. CMS redirects are editorial records only; production redirects are not active until the redirect implementation and migration map are approved.

## Data access and rendering

All application queries use static `defineQuery` declarations so Sanity TypeGen can generate result types in `src/types/sanity.generated.ts`. Published reads use the CDN-capable client. Draft mode uses live content and Visual Editing on the Node.js runtime. Future pages should remain React Server Components and call `sanityFetch`; client components are reserved for actual browser interaction.

## Setup and verification

1. Authenticate with `npx sanity login`, create or select the Sanity project, and create the `production` dataset.
2. Copy `.env.example` to `.env.local` and provide the real public identifiers, preview origin, and server-only Viewer token.
3. Add `http://localhost:3000` and the approved preview/production origins to Sanity CORS with credentials enabled for Studio preview.
4. Run `npm run sanity:validate`, `npm run sanity:build`, and `npm run check`.
5. Optionally import the draft-only structural seed after reviewing every placeholder.

Generated `sanity/schema.json` and `src/types/sanity.generated.ts` are committed so schema/query drift is reviewable.
