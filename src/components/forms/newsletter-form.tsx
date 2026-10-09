"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { newsletter } from "@/data/newsletter";

export function NewsletterForm() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const container = host.current;
    if (!container) return;

    // Kit inserts the live form beside its script. Keep that DOM isolated from React.
    // Load near the section so the homepage's initial render stays lightweight.
    let script: HTMLScriptElement | undefined;
    const mutations = new MutationObserver(() => {
      const input = container.querySelector<HTMLInputElement>(
        'input[name="email_address"]',
      );
      if (input) {
        input.id = "newsletter-email";
        input.type = "email";
        input.autocomplete = "email";
        input.setAttribute("aria-describedby", "newsletter-consent");
        setStatus("ready");
      }
      container
        .querySelectorAll('[data-group="alert"], .formkit-alert-success')
        .forEach((alert) => {
          alert.setAttribute("role", "status");
          alert.setAttribute("aria-live", "polite");
        });
    });
    mutations.observe(container, { childList: true, subtree: true });

    const visibility = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || script) return;
        script = document.createElement("script");
        script.src = newsletter.embedUrl;
        script.async = true;
        script.dataset.uid = newsletter.uid;
        script.onerror = () => setStatus("error");
        container.appendChild(script);
        visibility.disconnect();
      },
      { rootMargin: "400px" },
    );
    visibility.observe(container);

    return () => {
      visibility.disconnect();
      mutations.disconnect();
      if (script) script.onerror = null;
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="newsletter-signup">
      <label className="newsletter-label" htmlFor="newsletter-email">
        Your email address
      </label>
      <div className="newsletter-form-slot">
        {status !== "ready" && (
          <p className="newsletter-loading" role="status">
            {status === "error"
              ? "The signup form couldn’t load. Please use the link below."
              : "Loading the signup form…"}
          </p>
        )}
        <div ref={host} className="newsletter-kit" />
      </div>
      <p id="newsletter-consent" className="newsletter-note">
        By signing up, you agree to receive Jack’s newsletter. Confirm your
        email to join. Unsubscribe anytime.{" "}
        <Link href="/privacy">Privacy policy</Link>.
      </p>
      <p className="newsletter-fallback">
        Form not appearing?{" "}
        <a href={newsletter.signupUrl}>Sign up directly on Kit</a>.
      </p>
    </div>
  );
}
