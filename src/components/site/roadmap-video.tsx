import Link from "next/link";

const VIDEO_URL = "https://www.youtube.com/watch?v=HWSykOKNGog";
const VIDEO_TITLE = "The Roadmap Changed How They See Their Lives";

export function RoadmapVideo() {
  return (
    <section className="roadmap-video" aria-labelledby="roadmap-video-heading">
      <div className="roadmap-video__inner section-shell">
        <header className="roadmap-video__heading">
          <p className="page-eyebrow">Watch</p>
          <h2 id="roadmap-video-heading">{VIDEO_TITLE}</h2>
        </header>
        <div className="roadmap-video__frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/HWSykOKNGog?rel=0"
            title={VIDEO_TITLE}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <Link className="roadmap-video__link" href={VIDEO_URL}>
          Watch on YouTube <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
