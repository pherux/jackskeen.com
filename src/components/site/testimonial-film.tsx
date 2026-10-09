"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

export function TestimonialFilm() {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="testimonial-film">
      <div className="testimonial-film__media">
        {playing ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/HWSykOKNGog?autoplay=1&rel=0"
            title="The Roadmap Changed How They See Their Lives"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play The Roadmap Changed How They See Their Lives, 1 minute 23 seconds"
          >
            <Image
              src="/images/roadmap-testimonials.jpg"
              alt=""
              fill
              sizes="(max-width: 760px) calc(100vw - 48px), 560px"
            />
            <span className="testimonial-film__play">
              <Play aria-hidden="true" fill="currentColor" size={32} />
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <p className="rm-eyebrow">FEATURED FILM</p>
        <h3>The Roadmap Changed How They See Their Lives</h3>
        <a
          href="https://www.youtube.com/watch?v=HWSykOKNGog"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch the film on YouTube, 1 minute 23 seconds (opens in a new tab)"
        >
          Watch the film · 1:23
        </a>
      </figcaption>
    </figure>
  );
}
