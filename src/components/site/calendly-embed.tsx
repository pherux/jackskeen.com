"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { roadmapContact } from "@/data/roadmap";
import { trackConversion } from "@/lib/analytics";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
    }) => void;
  };
};

export function CalendlyEmbed({ contact = false }: { contact?: boolean }) {
  const Heading = contact ? "h2" : "h1";
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const bookings = new Set<string>();
    function onScheduled(event: MessageEvent) {
      const frame = container.current?.querySelector("iframe");
      if (
        event.origin !== "https://calendly.com" ||
        !frame ||
        event.source !== frame.contentWindow ||
        event.data?.event !== "calendly.event_scheduled"
      )
        return;
      // Used locally for deduplication only; booking/invitee details never go to GA.
      const uri = event.data?.payload?.invitee?.uri;
      if (typeof uri !== "string" || !uri || bookings.has(uri)) return;
      bookings.add(uri);
      trackConversion("calendly_booking_completed");
    }
    window.addEventListener("message", onScheduled);
    return () => window.removeEventListener("message", onScheduled);
  }, []);

  function initialize() {
    const parentElement = container.current;
    const calendly = (window as CalendlyWindow).Calendly;
    if (!parentElement || !calendly || parentElement.querySelector("iframe"))
      return;

    calendly.initInlineWidget({
      url: `${roadmapContact.scheduler}?primary_color=0058a0&text_color=172c42`,
      parentElement,
    });
    const frame = parentElement.querySelector("iframe");
    if (frame)
      frame.title = "Schedule a Roadmap discovery call with Jack Skeen";
  }

  return (
    <section
      className={
        contact
          ? "rm-container rm-scheduling rm-scheduling--contact"
          : "rm-container rm-scheduling"
      }
      aria-labelledby="scheduling-title"
    >
      <div className={contact ? "sr-only" : "rm-scheduling-heading"}>
        <p className="rm-eyebrow">
          {contact ? "Jack’s calendar" : "Start your Roadmap"}
        </p>
        <Heading id="scheduling-title">
          {contact
            ? "Choose a time that works for you."
            : "Find a time to talk with Jack."}
        </Heading>
        <p>Choose an available time below to schedule a call with Jack.</p>
      </div>
      {failed ? (
        <p role="status">
          The calendar couldn’t load. Please use the Calendly link below.
        </p>
      ) : (
        <div
          ref={container}
          className="calendly-inline-widget rm-calendar"
          data-url={roadmapContact.scheduler}
          data-auto-load="false"
        />
      )}
      <p className="rm-scheduling-fallback">
        Prefer a separate window?{" "}
        <a
          href={roadmapContact.scheduler}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Jack’s calendar on Calendly
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={initialize}
        onError={() => setFailed(true)}
      />
    </section>
  );
}
