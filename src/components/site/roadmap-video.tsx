import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const VIDEO_URL = "https://www.youtube.com/watch?v=HWSykOKNGog";
const VIDEO_TITLE = "The Roadmap Changed How They See Their Lives";

export function RoadmapVideo() {
  return (
    <section className="roadmap-video" aria-labelledby="roadmap-video-heading">
      <div className="roadmap-video__inner section-shell">
        <div className="roadmap-video__card">
          <header className="roadmap-video__heading">
            <p className="page-eyebrow">Watch</p>
            <h2 id="roadmap-video-heading">{VIDEO_TITLE}</h2>
            <Link className="roadmap-video__link" href={VIDEO_URL}>
              Watch on YouTube <ArrowUpRight aria-hidden="true" />
            </Link>
          </header>
          <div className="roadmap-video__media">
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
          </div>
        </div>
      </div>
    </section>
  );
}
