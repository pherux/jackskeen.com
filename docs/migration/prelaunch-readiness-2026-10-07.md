# Vercel pre-migration readiness review

Date: October 7, 2026

Update: the local application fixes described below have since been implemented. See [the implementation and verification report](prelaunch-implementation-2026-10-07.md) for current status. This document retains the original audit findings and account-level cutover checklist.

Decision: keep the existing Vercel project; retain GoDaddy registration, DNS, and existing email services during launch. Do not switch website DNS until the launch blockers below are resolved.

## Scope and evidence

Read-only application review and local production-build testing. No application configuration, live deployment, DNS, mail service, or external account was changed. Generated audit reports are saved alongside this document.

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; 163 generated pages reported by Next.js.
- `npm run verify:insights`: passed for all 113 published entries, original text/date comparison where cached sources are available, local images, metadata/schema assertions, 4 internal body links, 18 redirect variants, pagination discovery, filters, and not-found rendering.
- Additional local HTTP audit: 375 distinct paths from the historical migration inventory, current sitemap, and targeted checks. Results: 269 HTTP 200, 10 HTTP 301, 1 HTTP 308, 95 HTTP 404. These include slash variants, proposed removals, and a deliberately unknown test route; 95 does not mean 95 unintended losses.
- Sitemap: 156 entries, no duplicate URLs, and no redirect destinations served at sitemap URLs in this run.
- All 156 sitemap pages were noindex in the current local staging configuration, and robots.txt disallowed crawling. This is appropriate for staging but must not carry over unintentionally to launch.
- Machine-readable observations: `prelaunch-audit-2026-10-07.json`.
- Refreshed existing archive report: `insights/verification.json`.

Local results do not establish the state of the deployed Vercel project. Historical migration actions are proposals except where superseded by later approved work; the crawl is evidence, not approval to delete content or introduce redirects.

## Launch blockers and required preparation

### 1. Production indexing policy

The root layout hard-codes `noindex, nofollow`; catch-all strategic-page metadata hard-codes `noindex, follow`. Article and podcast metadata use `NEXT_PUBLIC_SITE_INDEXABLE`, while robots.txt independently uses that switch. Setting the environment variable alone cannot enable all approved marketing pages.

Prepare a consistent production indexing policy with explicit per-page approval and keep staging protected/noindex. Verify rendered HTML and response headers, not only source code. Do not enable indexing globally while placeholder/unapproved pages remain. The sitemap must exclude unapproved/noindex destinations when launching.

### 2. Remaining legacy URL coverage

Observed local 404 examples:

- `/executive-coaching/`
- `/community/`
- `/wp-content/uploads/2024/02/JSkeen-Speaker-One-Sheet.pdf`

Reconcile the full historical inventory with `insights/decisions.json`, authenticated WordPress exports, Search Console landing pages, and available backlink data. Restore valuable downloads at their original paths where possible. Establish the appropriate equivalent destination for moved services. Do not redirect the community signup page to the unrelated recovered community article.

`/roadmap/how-it-works` currently responds with HTTP 308. It is a permanent redirect, but differs from the project's exact-301 requirement. Address this in the redirect implementation review. Existing archive redirect checks pass.

### 3. Editor publishing

The article catalog reads `src/data/insights/articles.json`. Sanity schemas and preview infrastructure exist, but the archive is not loaded from Sanity. Connect and verify editor draft, preview, publish, update, and unpublish behavior before claiming the CMS publishing acceptance criterion is met. Preserve migrated dates, authorship, URLs, and text during import.

### 4. Conversion workflow: corrected assessment

The active `/start` and `/contact` routes render `StartRoadmapPage`, with these destinations:

- `https://calendly.com/jackskeen/roadmap-discovery`
- `mailto:jskeen@skeengroup.net`
- `tel:+14436108772`

The disabled `ContactForm` component is not rendered on those two routes. Its presence does not demonstrate that the current inquiry journey is broken. Rendered links were verified locally; booking availability, completion, confirmation messages, calendar routing, email delivery, CRM handling, and conversion analytics were not tested. Decide whether the linked workflow is the approved launch experience or whether an integrated form remains required by the product specification.

## Email preservation and cutover checklist

Additional runtime finding: when stopping the local server after the broad route crawl, its collected output contained repeated `Internal: NoFallbackError` messages. The HTTP audit recorded no 500 responses, but the server-log errors require reproduction and diagnosis before declaring runtime behavior clean. This audit has not established the precise triggering routes.

- [ ] Export the complete GoDaddy DNS zone and save the original website A/AAAA/CNAME records and TTLs.
- [ ] Identify active email products, mailboxes, aliases, forwarding, and billing dependencies. Include the publicly linked `skeengroup.net` email domain in the service inventory without changing its DNS.
- [ ] Preserve MX, SPF, DKIM, DMARC, autodiscover, and verification records. Check mail aliases or SPF rules that depend on the root A record before changing it.
- [ ] Confirm GoDaddy WordPress cancellation will not cancel email, DNS, or domain registration.
- [ ] Test external inbound mail, outgoing mail, and replies before and after launch. No messages were sent in this audit.
- [ ] Obtain a restorable WordPress database/files/uploads backup and a final content export.
- [ ] Verify the intended Vercel project, production commit, environment variables, domains, and rollback target.
- [ ] Add root and www domains to that existing project; use the exact DNS values Vercel supplies and keep existing nameservers.
- [ ] Complete application and SEO blockers; test approved public pages, retained legacy URLs, downloads, and redirects on staging.
- [ ] Record Search Console/analytics baselines and keep existing verification records.
- [ ] Lower website record TTL in advance where supported; freeze publishing briefly and import final changes.
- [ ] Change only the website records needed for Vercel; inspect conflicting website AAAA records/forwarding.
- [ ] Verify HTTPS, root/www canonical behavior, rendered indexing policy, sitemap, critical URLs, booking flow, and email.
- [ ] Monitor crawl errors, inquiries, indexing, and organic landing pages; retain WordPress temporarily for rollback.

Rollback: restore a known-good Vercel deployment for application regressions, or restore saved website DNS to return to WordPress. DNS reversal is not instantaneous. Neither procedure should change email records.

## Not established by this audit

No authenticated GoDaddy, email-provider, Vercel, Sanity, Search Console, or analytics state was inspected. No mailbox or booking transaction was performed. Responsive visuals, keyboard behavior, accessibility scores, Lighthouse, live-host redirects, and production performance were not re-tested. Public inventory coverage is not a substitute for an authenticated export. No migration or production readiness sign-off is implied by passing the build and archive checks.

## Reference guidance

- [Vercel custom-domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel deployment rollback](https://vercel.com/docs/instant-rollback)
- [Google hosting migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes)
- [Google URL migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [GoDaddy A-record editing](https://www.godaddy.com/help/edit-an-a-record-19239)
