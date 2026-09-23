"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { ArchiveVideo, ArticleImage } from "@/lib/content-catalog";
export function ArchiveVideoPlayer({
  video,
  image,
}: {
  video: ArchiveVideo;
  image: ArticleImage | null;
}) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!playing || loaded) return;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [playing, loaded]);
  return (
    <figure className="insight-film">
      <div className="circle-player">
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(max-width: 1000px) 100vw, 1000px"
            priority
          />
        )}
        {playing ? (
          <>
            <iframe
              title={video.title}
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0 }}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            {!loaded && (
              <div className="circle-player-loading">
                <p role="status">
                  {slow
                    ? "The player is taking longer to load."
                    : "Loading the video…"}
                </p>
                <a
                  href={video.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube ↗
                </a>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            style={{ background: "transparent" }}
          >
            <span className="circle-play">
              <span aria-hidden="true">▶</span> Watch Jack’s original video
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <span>
          {video.duration
            ? `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, "0")} · `
            : ""}
          From Jack’s video archive
        </span>
        <a href={video.sourceUrl} target="_blank" rel="noopener noreferrer">
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
