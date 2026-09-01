# UI/UX and copy audit

Date: 2026-08-31

## Scope

Reviewed the strategic page system as a UI/UX designer and writer at 1440 × 900,
with representative mobile checks at 390 × 844. The review covered hierarchy,
typography, spacing, navigation, responsive behavior, accessibility basics, copy
clarity, placeholder handling, image integrity, and horizontal overflow.

## Route review

| Step | Route | General health | Result |
| ---: | --- | --- | --- |
| 1 | `/` | Strong | Editorial hero, problem/solution narrative, CTA hierarchy, and mobile flow are clear. |
| 2 | `/roadmap` | Strong | The promise is clear and the page avoids procedural explanation; the page remains intentionally long-form. |
| 3 | `/work-with-jack` | Strong with content dependency | Offer navigation is clear; final boundaries and availability still require approval. |
| 4 | `/about` | Strong with content dependency | Point of view is compelling; credentials and chronology remain unpublished pending verification. |
| 5 | `/insights` | Strong | Format and topic paths are easy to scan and work well at both breakpoints. |
| 6 | Representative article | Structurally strong, content pending | Metadata, related content, and URL preservation work; body and author biography await reviewed migration. |
| 7 | `/books` | Strong with content dependency | The framework is clear without inventing edition or purchase data. |
| 8 | `/success-stories` | Strong with content dependency | Proof standards are transparent; no unapproved client evidence is published. |
| 9 | `/start` | Strong, operationally blocked | The inquiry path is clear; the form remains honestly disabled until privacy and delivery are approved. |
| 10 | `/contact` | Strong, operationally blocked | Routing is understandable; the same form dependency applies. |
| 11 | `/roadmap/results` | Strong with content dependency | Outcome language avoids guarantees and preserves the evidence standard. |
| 12 | `/privacy` and `/terms` | Visually resolved, legally blocked | Raw bracketed copy was replaced with clear pending-review language; qualified legal text is still required. |

## Changes made from the audit

- Replaced internal and bracketed placeholder language with calm, visitor-facing
  statements while keeping every unapproved area visibly pending.
- Replaced repeated “View page” labels with “Explore” and added descriptive accessible
  labels for each destination.
- Added the existing compass brand mark to image-less hero panels so they read as an
  intentional branded state.
- Increased supporting-copy, card, footer, form, and link-label sizes where text was
  below a comfortable reading size.
- Reworded the disabled inquiry state so visitors understand availability without
  seeing implementation jargon.
- Reworded article migration placeholders without publishing unreviewed legacy copy.

## Evidence

- Before: `docs/visual-design/audit/`
- After: `docs/visual-design/audit/after/`
- Desktop screenshots: twelve strategic routes at 1440 × 900.
- Mobile screenshots: homepage, Roadmap, Insights, Start, and a representative article
  at 390 × 844.

All checked pages had one primary heading, no broken images, and no horizontal
overflow. Browser console errors: zero. `npm run check` passed, including formatting,
lint, TypeScript, and the 145-page production build.

## Remaining content and operational blockers

- Approved legacy article bodies, excerpts, and author biography.
- Verified credentials, chronology, offer boundaries, availability, and pricing where
  relevant.
- Approved client stories, attribution, and media rights.
- Production form destination, scheduling, privacy, consent, and spam protection.
- Qualified privacy and terms documents based on the final integration inventory.
- Canonical podcast/video records, transcripts, and publication metadata.

These are not visual defects and were not filled with invented content.

final result: passed with documented content dependencies
