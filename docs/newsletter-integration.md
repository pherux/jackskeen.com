# Website newsletter

The homepage newsletter section (`/#newsletter`) uses the published Kit form **JackSkeen.com — A More Meaningful Next Chapter**, created on October 9, 2026. The shared footer links to this section as “Get Jack’s insights”.

- Kit editor: https://app.kit.com/forms/designers/10023858/edit
- Form ID: `10023858`; public UID: `f365217bee`.
- Hosted fallback: https://dr-jack-skeen.kit.com/f365217bee
- Configuration: `src/data/newsletter.ts`. No API keys or new environment variables are required.
- Email is the only required field. Kit handles subscriptions, validation, submission feedback, and invisible reCAPTCHA.
- Double opt-in is enabled; auto-confirm is disabled. The confirmation email uses the existing Dr. Jack Skeen sender and a newsletter-specific subject. Confirmed subscribers return to `https://jackskeen.com/insights`.
- The success message directs subscribers to check their inbox and spam/promotions folders. Subscriber details are not appended to the destination URL.
- Native Kit JavaScript loads near the newsletter section. The hosted link remains available if scripts are blocked. The site adds visible labeling, focus styles, live-region feedback, and reduced-motion overrides.

New subscribers can be selected in Kit by this form. This integration does not send a broadcast or enroll existing subscribers in a new sequence. Future newsletter content is published through the account's normal broadcast workflow.

Deploy the website changes to make the homepage signup visible in production. Verify a real signup, confirmation email, and confirmed subscriber record with an approved test address; do not add arbitrary people to the list.

## Verification

- Confirmed the live Kit form renders on the local homepage, with one form after navigating away and returning through the footer link.
- Checked 360, 390, 768, 1024, and 1440px layouts: no horizontal overflow.
- Confirmed the visible email label, email input validation, consent description, preserved homepage canonical, and hosted fallback link.
- Compared the existing WordPress form (`9359620`): it uses the same Dr. Jack Skeen sender (`jskeen@skeenleadership.com`) and double opt-in settings.
- Real email delivery and confirmation remain untested because no test recipient was supplied. No existing subscribers were enrolled or emailed during verification.
