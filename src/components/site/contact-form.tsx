export function ContactForm({ kind }: { kind: "contact" | "start" }) {
  return (
    <section
      className="form-section section-shell"
      aria-labelledby="form-heading"
    >
      <div className="form-section__intro">
        <p className="page-eyebrow">
          {kind === "start" ? "Your inquiry" : "Send a note"}
        </p>
        <h2 id="form-heading">
          {kind === "start"
            ? "Tell us what you want to understand more clearly."
            : "Share the context for your inquiry."}
        </h2>
        <p>
          Online inquiries are not open yet. This form will be enabled after the
          contact, privacy, consent, and spam-protection workflow is approved.
        </p>
      </div>
      <form className="inquiry-form">
        <label>
          Name
          <input name="name" autoComplete="name" disabled />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" disabled />
        </label>
        <label>
          {kind === "start" ? "What would you like clarity about?" : "Message"}
          <textarea name="message" rows={6} disabled />
        </label>
        <button className="button button--primary" type="submit" disabled>
          Online inquiries opening soon
        </button>
      </form>
    </section>
  );
}
