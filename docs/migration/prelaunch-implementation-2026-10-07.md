# Prelaunch implementation — October 7, 2026

The application preparation from the readiness review is implemented locally. This report supersedes its application findings; its account, backup, email, and cutover checklist still applies. No deployment, DNS record, mailbox, or external account was changed.

## Implemented

- Unified robots metadata, robots.txt, and sitemap policy. Indexing requires `NEXT_PUBLIC_SITE_INDEXABLE=true` and, on Vercel, `VERCEL_ENV=production`. Preview deployments remain noindex even if the flag is copied accidentally. Production canonicals use `https://jackskeen.com`.
- Approved launch routes and substantive preserved content enter the sitemap. Placeholder pages, thin topic archives, filtered archives, the private vault holding page, and the two deferred signup pages remain noindex. Production-mode verification contains 161 sitemap URLs, each returning 200 with a matching canonical, title, description, and one H1.
- Restored 26 public legacy pages from the cached WordPress export/crawl, including service pages, book-related pages, testimonials, FAQs, community, and downloads. Original body content is sanitized, headings normalized, unsupported embeds removed, and original images copied locally. No testimonial or credential was invented. Provenance is recorded in `src/data/legacy-pages.json`.
- Restored three original PDFs at their existing `/wp-content/uploads/` paths, including the speaker one-sheet, people-pleasing ebook, and Civility Essays.
- Added exact 301 mappings for moved services, old topic tags, and testimonial pagination. Converted the existing roadmap redirect to 301. There are 25 rules with 50 tested slash/non-slash variants. Redirect targets return 200 without another redirect; unrelated removed content is not sent to the homepage.
- Fixed unknown dynamic routes and out-of-range archive pagination to return actual HTTP 404 with noindex. Scoped the loading boundary to Studio to avoid streaming a 200 before a missing public page is resolved. The local route sweep has clean server logs without the earlier `NoFallbackError`.
- Preserved all 113 existing archive entries, their original text, dates, authorship, canonical handling, and local media. Launch continues to read the version-controlled snapshot.
- Prepared a server-side Sanity adapter, Portable Text renderer, draft-aware reads, and an offline draft import package. CMS mode uses Sanity as the authoritative catalog: unpublishing removes an entry, and a CMS outage does not silently resurrect snapshot content. Migrated slugs and dates are protected; unsafe or conflicting routes are rejected.

The 218-URL inventory and observed response/action mapping are recorded in `prelaunch-production-verification.json`. This checks the known public inventory, not private WordPress content or URLs only discoverable through Search Console. The cached source export predates cutover; a final content delta is still required.

## Launch configuration

Keep `ARTICLE_SOURCE=snapshot` through migration. No Sanity account setup is needed to serve the preserved archive.

Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` for local/staging work. In the existing Vercel project's **Production** environment, set it to `true` only when the public launch is ready, then rebuild/redeploy. This is a build-time setting; changing a dashboard variable does not modify an already-built deployment. Vercel supplies `VERCEL_ENV`; do not override it there. Verify rendered metadata, response headers, robots.txt, and sitemap on the actual production deployment.

The canonical domain is the non-www hostname. Configure www to redirect to it during domain setup. Use the exact website DNS records supplied by the existing Vercel project. Keep GoDaddy nameservers and registration, and preserve the full email/DNS zone.

## Reproducible local verification

Completed results: lint, TypeScript, production build, preview build, Sanity schema validation (zero errors), generated query types, CMS adapter tests, and original-archive verification all passed. Both modes passed the 218-URL/50-redirect sweep. Machine-readable evidence is in `prelaunch-production-verification.json`, `prelaunch-staging-verification.json`, and `insights/verification.json`.

Run from the repository root. The prelaunch verifier starts and stops its own localhost server on port 3108 and expects an already-built app.

```powershell
npm run lint
npm run sanity:validate
npm run test:cms-adapter
$env:ARTICLE_SOURCE='snapshot'
$env:NEXT_PUBLIC_SITE_INDEXABLE='true'
$env:VERCEL_ENV='production'
npm run build
npm run typecheck
npm run verify:prelaunch -- --indexable
```

For the preview safeguard, build with `VERCEL_ENV=preview` while keeping the indexing flag true, then run `npm run verify:prelaunch` without `--indexable`. This must produce an empty sitemap and noindex on public pages. Reset shell-only test variables afterward. `.env.example` remains safe by default.

For the full original archive comparison, start that build on a separate port, set `VERIFY_BASE_URL` to its localhost URL, and run `npm run verify:insights`. This checks 113 entries, original source text where cached, dates, images, metadata/schema, internal body links, pagination, filters, redirects, and hard 404s.

Manual browser checks covered the restored executive-coaching page at widths 360, 390, 768, 1024, and 1440; mobile community/navigation; heading structure, image alt attributes, no horizontal overflow, and keyboard skip-to-content. These are accessibility basics, not a WCAG audit or Lighthouse score. Production performance and Core Web Vitals remain unmeasured.

## Deferred platform work

As requested, Calendly, Kit, and other platform setup comes after migration. Existing scheduling, phone, and email links remain. No booking, signup, email-delivery, analytics, or CRM transaction was sent or claimed verified. Community and free-ebook signup pages visibly explain that online signup is temporarily unavailable and offer a contact link; they remain noindex. The vault serves a noindex contact/holding page; private content and authentication were not migrated.

Sanity activation is also deferred. The adapter and offline import are prepared, not live-validated against an account:

1. Run `npm run prepare:sanity-archive` to regenerate `sanity/seed/archive.ndjson`: 122 draft documents comprising 113 articles, eight topics, and one author. This command does not contact Sanity.
2. After provisioning the intended project/dataset, configure the variables in `.env.example` and import the draft package through the approved Sanity workflow. Back up the dataset first; do not overwrite later editorial changes by repeatedly importing the seed.
3. Review and publish the referenced author and topics, then the article documents. Empty imported body fields intentionally retain each article's original version-controlled body/media; edited Portable Text bodies replace that body only after editorial approval. New articles require an authored body.
4. Test authenticated draft preview, publish, update, unpublish, images, and internal links against the real dataset. Confirm all expected articles are published before switching `ARTICLE_SOURCE=sanity`; CMS mode does not merge in missing snapshot documents.
5. Switch that variable and redeploy only after the live workflow is verified. Keep the snapshot available as an explicit rollback option.

`npm run prepare:legacy-pages` rebuilds preserved pages from `.migration-cache/wordpress-public-export.json` and `.migration-cache/page-fetch-results.json` plus the inventory; original media downloads require the old host to remain reachable. Those caches are not a WordPress database/files backup. The generated JSON and local media are committed-source deliverables and serve without WordPress.

## Still required for cutover

- Export the complete DNS zone and establish a restorable WordPress database/files/uploads backup plus a final content delta.
- Confirm email products, mailboxes, aliases, forwarding, billing dependencies, and any mail/SPF dependency on the website A record. Include the linked `skeengroup.net` mailbox in the service inventory. Preserve MX, SPF, DKIM, DMARC, autodiscover, verification records, and nameservers.
- Verify the actual Vercel project, production deployment, environment, custom domains, HTTPS, canonical redirects, and rollback deployment. Local tests do not establish that project's state.
- Capture Search Console/analytics baselines and reconcile important landing pages/backlinks absent from the public crawl. Review intentional removals before changing DNS.
- Change only the website DNS records needed for Vercel. Test external inbound mail, outbound mail, and replies before and after cutover. Do not cancel a GoDaddy product until its email/registration dependencies are confirmed.
- Retain the old WordPress host temporarily. Roll back by restoring the saved website DNS or the known-good Vercel deployment, depending on the failure. DNS rollback is not instantaneous.

Application checks pass locally; this is not a claim that account-level migration, email continuity, live CMS publishing, or production SEO cutover has been completed.
