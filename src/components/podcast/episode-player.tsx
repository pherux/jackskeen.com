"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { PodcastEpisode } from "@/data/podcast";

export function EpisodePlayer({ episode }: { episode: PodcastEpisode }) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!playing || loaded) return;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [playing, loaded]);
  return (
    <div className="circle-player">
      {playing ? (
        <>
          {!loaded && (
            <>
              <Image
                src={episode.thumbnail}
                alt=""
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="circle-player-loading">
                <p role="status">
                  {slow
                    ? "The player is taking longer to load."
                    : "Loading your conversation…"}
                </p>
                <a
                  href={episode.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube ↗
                </a>
              </div>
            </>
          )}
          <iframe
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            title={`Inside the Circle: ${episode.name}`}
            src={`https://www.youtube-nocookie.com/embed/${episode.id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play the full interview with ${episode.name}`}
        >
          <Image
            src={episode.thumbnail}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <span className="circle-play">
            <span aria-hidden="true">▶</span> Watch the conversation
          </span>
        </button>
      )}
    </div>
  );
}
