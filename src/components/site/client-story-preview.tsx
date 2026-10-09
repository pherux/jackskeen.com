"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { ClientVideo } from "@/data/client-stories";

export function ClientStoryPreview({ story }: { story: ClientVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="testimonial-preview">
      <div className="testimonial-preview__media">
        {playing ? (
          <video
            controls
            autoPlay
            playsInline
            aria-label={`${story.name} on The Roadmap`}
          >
            <source
              src={`https://stream.mux.com/${story.playbackId}/medium.mp4`}
              type="video/mp4"
            />
            <track
              kind="captions"
              src={`/media/captions/${story.slug}.vtt`}
              srcLang="en"
              label="English"
            />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${story.name}’s story`}
          >
            <Image
              src={`/images/clients/${story.slug}.jpg`}
              alt=""
              fill
              sizes="(max-width: 760px) 40vw, 240px"
            />
            <span className="testimonial-preview__play">
              <Play size={20} fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <div>
        <h3>{story.name}</h3>
        <p>{story.role}</p>
        <button
          className="rm-text-link"
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Watch ${story.name}’s story`}
        >
          Watch his story <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
