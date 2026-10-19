# Website newsletter

The homepage newsletter section (`/#newsletter`) uses the published Kit form **JackSkeen.com — A More Meaningful Next Chapter**, created on October 9, 2026. The shared footer links to this section as “Get Jack’s insights”.

- Kit editor: https://app.kit.com/forms/designers/10023858/edit
- Form ID: `10023858`; public UID: `f365217bee`.
- Hosted fallback: https://dr-jack-skeen.kit.com/f365217bee
- Configuration: `src/data/newsletter.ts`. No API keys or new environment variables are required.
- Email is the only required field. Kit handles subscriptions, validation, submission feedback, and invisible reCAPTCHA.
- Double opt-in is enabled; auto-confirm is disabled. The confirmation email uses the existing Dr. Jack Skeen sender and a newsletter-specific subject. After clicking the email confirmation link, subscribers redirect to `https://jackskeen.com/start` (updated in Kit on October 19, 2026).
- The success message directs subscribers to check their inbox and spam/promotions folders. Subscriber details are not appended to the destination URL.
- Native Kit JavaScript loads near the newsletter section. The hosted link remains available if scripts are blocked. The site adds visible labeling, focus styles, live-region feedback, and reduced-motion overrides.

New subscribers can be selected in Kit by this form. This integration does not send a broadcast or enroll existing subscribers in a new sequence. Future newsletter content is published through the account's normal broadcast workflow.

The signup is live in production. Verify real delivery with an approved test address; do not add arbitrary people to the list.

## Verification

- Confirmed the live Kit form renders on the local homepage, with one form after navigating away and returning through the footer link.
- Checked 360, 390, 768, 1024, and 1440px layouts: no horizontal overflow.
- Confirmed the visible email label, email input validation, consent description, preserved homepage canonical, and hosted fallback link.
- Compared the existing WordPress form (`9359620`): it uses the same Dr. Jack Skeen sender (`jskeen@skeenleadership.com`) and double opt-in settings.
- The initial October 9 verification did not include real email delivery because no test recipient was supplied. See the follow-up below.

## October 19, 2026 reliability verification

- Submitted the user-approved temporary test address through the production homepage. Kit accepted the signup, created an unconfirmed subscriber associated with form `10023858`, and recorded the confirmation email. The user confirmed receipt and clicked the confirmation link. Reloading the Kit subscriber profile verified **Confirmed** status and **Subscribed** membership in the website newsletter form on October 19, completing the signup, email delivery, and double-opt-in verification.
- Disabled recommendations for **JackSkeen.com — A More Meaningful Next Chapter** only: Recommendations > Settings > Recommendations > Landing Pages and Forms > Edit > deselect this form > Save. Other forms and the account-wide default were left unchanged. This is a live Kit setting, independent of website deployment.
- Reloaded production and resubmitted the approved test address: the existing check-your-inbox message appeared directly, without the creator recommendation popup.
- The local component now bounds the embed-loading wait to 12 seconds after lazy loading starts. A stalled script shows the existing failure message and hosted fallback; a late-loading form can still recover. Cleanup clears the timer on navigation.
- Lazy loading observes the reserved form slot instead of its empty child. Unique IDs associate each form's visible label and consent text with its email field.
- Targeted React/DOM checks passed for a stalled embed, script error, late recovery, normal loading, labels, consent, live feedback, success-event filtering/deduplication, Strict Mode, and unmount cleanup. These checks used a temporary local harness, not a new project dependency.
- Browser checks covered production submission in the in-app browser, local rendering in Chrome and the in-app browser, native invalid-email validation, keyboard focus, and the hosted fallback destination. Local Chrome also reached the success message, although reCAPTCHA displayed a connectivity warning during the test; Safari and Firefox were not tested.
- Checked 360, 390, 768, 1024, and 1440px widths in Chrome with no horizontal overflow. No metadata, canonical, robots, sitemap, or editorial content changes are involved.
- Formatting, lint, TypeScript, production build, and diff-whitespace checks passed. The component changes require website deployment; no environment variables or new setup are required.
