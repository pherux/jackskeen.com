# About, Client Stories, and Roadmap — content sources

Reviewed 2026-09-23. User requested substantive dedicated pages using valuable information from the original website. This work continues the selected blue editorial design rather than cloning the original layouts.

## Sources and use

| Source | Information retained | New destination |
| --- | --- | --- |
| https://jackskeen.com/about-jack-skeen/ | Skeen Leadership, 25+ years of work, executive-coaching context, psychology/theology degrees, previous psychologist and minister roles, Circle Blueprint background, portrait | `/about` |
| https://jackskeen.com/ | Founder identification; Roadmap context and featured client video | Shared page content |
| https://jackskeen.com/the-roadmap/ | Unique strengths/genius, personal direction, written report, direct work with Jack, published $15,000 price and payment flexibility | `/roadmap` |
| https://jackskeen.com/faqs/ | Intended audiences, life/work relevance, worldwide English-speaking availability, consultation and payment-option questions | Roadmap FAQs |
| https://jackskeen.com/all-testimonials/ | Original testimonial collection and its embedded provider | `/success-stories` |
| https://embed-v2.testimonial.to/w/the-roadmap/?theme=light&card=large&loadMore=on&initialCount=20&tag=all | Published names, short exact quote excerpts, dates, client-story summaries, video playback IDs and original caption tracks | Client Stories and shared homepage proof |

All descriptive page copy is newly composed from the above facts. Brief written quotes preserve the source wording and are explicitly identified as excerpts. Summaries of Clint Salter, Vin, and Rich Myerson are presented as summaries, not quotations or guaranteed results. Roles are kept modest; no assets-under-management numbers, star ratings, invented clients, or claimed financial returns were added.

The user explicitly requested results/value rather than process. Assessments, interview counts, stages, and timelines from the original marketing pages are intentionally omitted from our marketing copy. Original client videos remain unedited; their spoken content is their own.

The source site lists $15,000 in both Roadmap and FAQ pages. The new page displays that published price, identifies USD, and invites confirmation of current terms directly with Jack. No limited-spots or artificial urgency claims were migrated.

## Media provenance

- `public/images/jack-skeen-about.jpg`: original About portrait, https://jackskeen.com/wp-content/uploads/2023/08/5x7-final-skeen-DSC_2543-003-731x1024.jpg
- Existing original coaching photograph retained.
- `public/images/clients/*.jpg`: original Mux video posters, saved locally for dependable first rendering.
- Mohnish Pabrai: original Testimonial.to ID `4e0bb33d-ccbf-4f51-9844-8ca2701ebf85`; Mux `ayxc202Y008Tz00wiJ01qC1aMOypaE7s1QkTfNAkLnWdQYA`.
- Rob Fraser: original ID `ec67c7c0-5b17-4857-927d-c58226002ca6`; Mux `j7QW2Mb1VicFCpserFkjLOmjgfGkZ4102GNxJwFzGsBM`.
- Matt Clark: original ID `916d820d-fa74-4212-8137-8392c2467103`; Mux `bT5Bk1pppyWmPmTLv6BIhp8sC00ycEdKn3DLncQN6w01M`.
- `public/media/captions/*.vtt`: original provider caption files copied locally. These retain the original automated transcription; they have not been professionally proofread.
- Native HTML video controls, `preload="none"`, and captions use existing public Mux MP4 renditions. Actual playback was verified for all three. Videos intentionally depend on the existing media host, but photos, posters, and captions do not depend on WordPress at runtime. Original-video links provide an alternate player.
- The blue Roadmap report remains labeled illustrative concept art; it is not a claimed sample client report.

## Routing and SEO

- `/about-jack-skeen` → `/about`, `/all-testimonials` → `/success-stories`, `/the-roadmap` → `/roadmap`: exact 301 redirects.
- Unique metadata descriptions updated for all three routes. Canonicals remain production-domain URLs; existing staging noindex preserved.
- About includes ProfilePage/Person JSON-LD only for visible sourced biographical facts. No unsupported testimonial rating markup.
- Original-feedback links point directly to the testimonial provider so they remain useful after the old same-domain paths redirect.

## Verification

- Lint, TypeScript and production build checked.
- Desktop and mobile screenshots: `docs/visual-design/editorial-pages/`.
- Checked native video playback, caption-track availability, FAQ keyboard expansion, page-section links, mobile overflow, canonical/metadata output and redirect status.
- This supersedes the previous report's note that the homepage and Client Stories proof slots are awaiting content: those slots now use published source material.
- Unrelated article/CMS migration and legal-content work remain separate launch tasks. No public deployment performed.
