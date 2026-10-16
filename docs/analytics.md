# Google Analytics

Production uses the existing Jack Skeen GA4 property (407625432), web stream
`jackskeen.com` (6118505833), measurement ID `G-6NVGCYYSFY`.

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Vercel project's Production environment
and rebuild after changing it. The public measurement ID is not a credential.
The integration requires `VERCEL_ENV=production` and a valid `G-` ID. Local and
preview builds do not load Google Analytics. Direct Studio visits are excluded.

The Google tag loads after hydration using `next/script`. Enhanced measurement
in this existing stream has page loads and browser-history page changes enabled;
keep both enabled to measure Next.js navigation. Do not add a second router
pageview listener, a duplicate Google tag, or a duplicate Tag Manager integration.
Existing enhanced measurements include scrolls, outbound clicks, search, form
interactions, video engagement, and downloads. Form interactions do not establish
a confirmed booking or newsletter subscription; no custom conversions are added.

Google signals and advertising personalization signals are disabled by this
integration. It does not send custom form values or user identifiers. The existing
stream has email redaction enabled. This change does not introduce a consent
manager or finalize the site's existing draft privacy policy.

Verify deployment by visiting the public site, navigating to another page, and
checking GA Realtime. Confirm one initial pageview and one per navigation; normal
reports can take longer to update. Disable collection by removing the production
measurement ID and redeploying, or revert the integration commit.

Reference: [Google pageview measurement](https://developers.google.com/analytics/devguides/collection/ga4/views).
