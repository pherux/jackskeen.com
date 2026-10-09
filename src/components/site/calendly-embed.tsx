"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { roadmapContact } from "@/data/roadmap";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
    }) => void;
  };
};

export function CalendlyEmbed() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

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
      className="rm-container rm-scheduling"
      aria-labelledby="scheduling-title"
    >
      <div className="rm-scheduling-heading">
        <p className="rm-eyebrow">Start your Roadmap</p>
        <h1 id="scheduling-title">Find a time to talk with Jack.</h1>
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
