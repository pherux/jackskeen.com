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
a confirmed booking or newsletter subscription. Custom conversions below use
the providers' success notifications instead.

Google signals and advertising personalization signals are disabled by this
integration. It does not send custom form values or user identifiers. The existing
stream has email redaction enabled. This change does not introduce a consent
manager or finalize the site's existing draft privacy policy.

Verify deployment by visiting the public site, navigating to another page, and
checking GA Realtime. Confirm one initial pageview and one per navigation; normal
reports can take longer to update. Disable collection by removing the production
measurement ID and redeploying, or revert the integration commit.

Reference: [Google pageview measurement](https://developers.google.com/analytics/devguides/collection/ga4/views).

## Conversion events

| GA4 key event | Trigger | Meaning |
| --- | --- | --- |
| `start_roadmap_click` | Activation of an internal `/start` link, including header, mobile navigation, hero, and final CTAs | Intent to start; not a booking |
| `calendly_booking_completed` | `calendly.event_scheduled` from the embedded Calendly iframe | Completed booking in the website embed |
| `newsletter_signup` | Kit's `ckjs:submission:complete` for form `f365217bee` | Accepted newsletter signup; email confirmation still required |

All three are registered as key events in property 407625432, counted once per
event, with no default monetary value. No Google Ads conversion import is added.
Use the individual event names to distinguish CTA intent from completed actions.

The Calendly listener checks both the exact origin and iframe source. Repeated
notifications for the same invitee URI are deduplicated in memory during the
embed's lifetime. That URI is never sent to GA. The Kit listener is scoped to
the embedded form and emits once per mounted form. It ignores the email address
contained in Kit's event details. Custom parameters contain only `page_path`
(without query parameters or fragments).

Bookings through the separate Calendly fallback link and signups on the external
Kit fallback page are outside these website listeners. Those require provider-side
tracking. Newsletter double-opt-in confirmation is also outside this integration.
Do not label these signup events as confirmed email subscribers.

Verification on 2026-10-16: lint, TypeScript and build pass. Browser checks with
mocked providers verify CTA navigation, rejection of unrelated window messages,
no conversion on date selection or form submit, success deduplication, no email
leakage, and layout at 360/390/768/1024/1440px. No real appointment or subscription
was created by these tests. Recheck the Kit event contract after provider changes.

Provider references: [Calendly embed notifications](https://developer.calendly.com/api-docs/overview/embedding/notifying-the-parent-window),
[Kit form runtime](https://f.convertkit.com/ckjs/ck.5.js).
