"use client";

import { useEffect, useRef, useState } from "react";

const wallUrl =
  "https://embed-v2.testimonial.to/w/the-roadmap?id=86530d4a-bb19-4704-966f-eafe8ca1b8fb";

export function TestimonialWall() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    // The vendor scans once per script execution, so initialize on every route mount.
    const observer = new MutationObserver(() => {
      const frame = host.querySelector("iframe");
      if (frame) frame.title = "Client testimonials about The Roadmap";
    });
    observer.observe(host, { childList: true });
    const script = document.createElement("script");
    script.src = "https://testimonial.to/js/widget-embed.js";
    script.async = true;
    script.type = "text/javascript";
    script.onerror = () => setFailed(true);
    document.body.appendChild(script);
    return () => {
      observer.disconnect();
      script.remove();
      host.replaceChildren();
    };
  }, []);

  return (
    <>
      {failed && (
        <p role="status">
          The testimonial wall couldn’t load. You can read the collection using
          the link below.
        </p>
      )}
      <div
        ref={container}
        className="testimonial-to-embed stories-wall"
        data-url={wallUrl}
        data-resize="true"
      />
      <p className="stories-wall-fallback">
        <a
          className="rm-text-link"
          href={wallUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the full testimonial collection
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </>
  );
}
