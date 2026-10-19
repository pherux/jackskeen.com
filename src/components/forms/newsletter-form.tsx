"use client";

import { useEffect, useId, useRef, useState } from "react";
import { newsletter } from "@/data/newsletter";
import { trackConversion } from "@/lib/analytics";

export function NewsletterForm() {
  const host = useRef<HTMLDivElement>(null);
  const id = useId();
  const emailId = `${id}-email`;
  const labelId = `${id}-label`;
  const consentId = `${id}-consent`;
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const container = host.current;
    if (!container) return;

    let loadTimeout: ReturnType<typeof setTimeout> | undefined;
    function failLoading() {
      clearTimeout(loadTimeout);
      setStatus("error");
    }

    let trackedSignup = false;
    function onSignup(event: Event) {
      if (
        trackedSignup ||
        !(event instanceof CustomEvent) ||
        event.detail?.uid !== newsletter.uid ||
        !(event.target instanceof HTMLFormElement) ||
        event.target.dataset.uid !== newsletter.uid
      )
        return;
      trackedSignup = true;
      trackConversion("newsletter_signup");
    }
    // Kit emits this only after a successful response, not validation or submit.
    // Do not forward event.detail: it includes the subscriber's email address.
    container.addEventListener("ckjs:submission:complete", onSignup);

    // Kit inserts the live form beside its script. Keep that DOM isolated from React.
    // Load near the section so the homepage's initial render stays lightweight.
    let script: HTMLScriptElement | undefined;
    const mutations = new MutationObserver(() => {
      const input = container.querySelector<HTMLInputElement>(
        'input[name="email_address"]',
      );
      if (input) {
        clearTimeout(loadTimeout);
        input.id = emailId;
        input.type = "email";
        input.autocomplete = "email";
        input.setAttribute("aria-labelledby", labelId);
        input.setAttribute("aria-describedby", consentId);
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
        script.onerror = failLoading;
        // A blocked or stalled embed may never fire an error. Bound the wait,
        // while still allowing a late form to replace the fallback message.
        loadTimeout = setTimeout(failLoading, 12_000);
        container.appendChild(script);
        visibility.disconnect();
      },
      { rootMargin: "400px" },
    );
    // Observe the reserved slot rather than the initially empty embed host.
    visibility.observe(container.parentElement ?? container);

    return () => {
      visibility.disconnect();
      mutations.disconnect();
      clearTimeout(loadTimeout);
      container.removeEventListener("ckjs:submission:complete", onSignup);
      if (script) script.onerror = null;
      container.replaceChildren();
    };
  }, [emailId, labelId, consentId]);

  return (
    <div className="newsletter-signup">
      <label className="newsletter-label" id={labelId} htmlFor={emailId}>
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
      <p id={consentId} className="newsletter-note">
        By signing up, you agree to receive Jack’s newsletter. Confirm your
        email to join. Unsubscribe anytime.
      </p>
      <p className="newsletter-fallback">
        Form not appearing?{" "}
        <a href={newsletter.signupUrl}>Sign up directly on Kit</a>.
      </p>
    </div>
  );
}
