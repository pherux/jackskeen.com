import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="newsletter-section"
      aria-labelledby="newsletter-title"
    >
      <div className="rm-container newsletter-layout">
        <div className="newsletter-copy">
          <p className="rm-eyebrow">A letter from Jack</p>
          <h2 id="newsletter-title">
            A more meaningful
            <br />
            next chapter.
          </h2>
          <p className="newsletter-deck">
            You’ve made room for success.
            <br />
            Make room for what matters.
          </p>
          <p>
            Join Jack Skeen’s newsletter for reflections on purpose, leadership,
            and life beyond achievement—ideas to help you pause, see things
            differently, and choose what comes next.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
