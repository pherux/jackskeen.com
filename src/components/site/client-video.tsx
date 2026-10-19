import { getImageProps } from "next/image";
import type { ClientVideo as ClientVideoData } from "@/data/client-stories";

export function ClientVideo({
  story,
  featured = false,
}: {
  story: ClientVideoData;
  featured?: boolean;
}) {
  const { props: poster } = getImageProps({
    src: `/images/clients/${story.slug}.jpg`,
    alt: "",
    width: 640,
    height: 360,
  });
  // Video posters do not support srcset. Use the 640px candidate instead of
  // Image's largest density fallback; the portrait is letterboxed in the player.
  const posterSrc = poster.srcSet?.split(", ")[0].split(" ")[0] ?? poster.src;

  return (
    <figure
      className={featured ? "client-film client-film--featured" : "client-film"}
    >
      <video
        controls
        playsInline
        preload="none"
        poster={posterSrc}
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
        Your browser does not support this video.
      </video>
      <figcaption>
        <div>
          <h3>{story.name}</h3>
          <p>{story.role}</p>
        </div>
        <a
          href={`https://embed-v2.testimonial.to/v/${story.sourceId}/`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Original video ↗ — ${story.name} (opens in a new tab)`}
        >
          Original video ↗
        </a>
      </figcaption>
    </figure>
  );
}
