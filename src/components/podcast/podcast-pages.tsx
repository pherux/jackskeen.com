import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/site/roadmap-pages";
import { RoadmapCta } from "@/components/sections/roadmap-sections";
import { EpisodeCard, EpisodeDirectory } from "./episode-directory";
import { EpisodePlayer } from "./episode-player";
import {
  durationLabel,
  episodePath,
  podcastEpisodes,
  podcastTopics,
  publishedLabel,
  type PodcastEpisode,
} from "@/data/podcast";

const origin = "https://jackskeen.com";
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PodcastHub() {
  const latest = podcastEpisodes[0];
  return (
    <Frame>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${origin}/inside-the-circle`,
              name: "Inside the Circle",
              description:
                "Roadmap graduate conversations with Dr. Jack Skeen about purpose, leadership, and life beyond achievement.",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: podcastEpisodes.length,
                itemListElement: podcastEpisodes.map((episode, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: origin + episodePath(episode),
                  name: `${episode.name}: ${episode.headline}`,
                })),
              },
            },
            {
              "@type": "PodcastSeries",
              "@id": `${origin}/inside-the-circle#series`,
              name: "Inside the Circle",
              url: `${origin}/inside-the-circle`,
              author: { "@type": "Person", name: "Dr. Jack Skeen" },
            },
          ],
        }}
      />
      <section className="rm-container circle-hero">
        <div>
          <p className="rm-eyebrow">The Roadmap · Graduate conversations</p>
          <h1>
            Inside the Circle
            <span>
              A fuller picture
              <br />
              of success.
            </span>
          </h1>
        </div>
        <div className="circle-hero-intro">
          <p className="rm-lead">
            What changes when your life starts to feel more like your own?
          </p>
          <p>
            Meet Roadmap graduates in conversation with Jack. Candid stories
            about natural gifts, meaningful work, and the possibilities that
            open up beyond achievement.
          </p>
          <a className="circle-text-link" href="#conversations">
            Explore all 16 conversations <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        className="rm-container circle-feature"
        aria-labelledby="featured-title"
      >
        <Link
          className="circle-feature-art"
          href={episodePath(latest)}
          aria-label={`Explore ${latest.name}’s story`}
        >
          <Image
            src={latest.thumbnail}
            alt="Reshma Nichani in conversation with Dr. Jack Skeen"
            width={1280}
            height={720}
            priority
            sizes="(max-width: 800px) 100vw, 60vw"
          />
          <span className="circle-feature-play" aria-hidden="true">
            ▶
          </span>
        </Link>
        <div className="circle-feature-copy">
          <p className="rm-eyebrow">Latest conversation · Episode 16</p>
          <h2 id="featured-title">{latest.headline}</h2>
          <p className="circle-feature-name">{latest.name}</p>
          <p>{latest.summary}</p>
          <Link className="circle-text-link" href={episodePath(latest)}>
            Discover Reshma’s story <span aria-hidden="true">↗</span>
          </Link>
          <span className="circle-meta">
            {durationLabel(latest.duration)} · With Dr. Jack Skeen
          </span>
        </div>
      </section>
      <EpisodeDirectory episodes={podcastEpisodes} topics={podcastTopics} />
      <section className="circle-note rm-container">
        <p className="rm-eyebrow">Real people. Individual experiences.</p>
        <p>
          Each conversation reflects one person’s perspective. Explore the
          stories for insight and possibility; your own next chapter will be
          distinctly yours.
        </p>
        <a
          className="circle-text-link"
          href="https://www.youtube.com/playlist?list=PLLo13VP-wIOJTMpdZ5q0GwrVz5YENfA1B"
          target="_blank"
          rel="noopener noreferrer"
        >
          The complete series on YouTube ↗
        </a>
      </section>
      <RoadmapCta />
    </Frame>
  );
}

export function PodcastGuestPage({ episode }: { episode: PodcastEpisode }) {
  const url = origin + episodePath(episode);
  const related = podcastEpisodes
    .filter((other) => other.id !== episode.id)
    .sort(
      (a, b) =>
        b.topics.filter((topic) => episode.topics.includes(topic)).length -
        a.topics.filter((topic) => episode.topics.includes(topic)).length,
    )
    .slice(0, 3);
  return (
    <Frame>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "PodcastEpisode",
              "@id": `${url}#episode`,
              url,
              name: `${episode.name}: ${episode.headline}`,
              description: episode.summary,
              episodeNumber: episode.episode,
              datePublished: episode.publishedAt,
              timeRequired: `PT${episode.duration}S`,
              isPartOf: {
                "@type": "PodcastSeries",
                "@id": `${origin}/inside-the-circle#series`,
                name: "Inside the Circle",
                url: `${origin}/inside-the-circle`,
              },
              associatedMedia: { "@id": `${url}#video` },
              contributor: { "@type": "Person", name: episode.name },
              author: { "@type": "Person", name: "Dr. Jack Skeen" },
            },
            {
              "@type": "VideoObject",
              "@id": `${url}#video`,
              name: episode.title,
              description: episode.summary,
              thumbnailUrl: origin + episode.thumbnail,
              uploadDate: episode.publishedAt,
              duration: `PT${episode.duration}S`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${episode.id}`,
              url: episode.source,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: origin,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Inside the Circle",
                  item: `${origin}/inside-the-circle`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: episode.name,
                  item: url,
                },
              ],
            },
          ],
        }}
      />
      <article className="circle-profile">
        <header className="rm-container circle-guest-hero">
          <nav className="circle-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/inside-the-circle">Inside the Circle</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{episode.name}</span>
          </nav>
          <p className="rm-eyebrow">
            Inside the Circle · Episode{" "}
            {String(episode.episode).padStart(2, "0")}
          </p>
          <h1>{episode.name}</h1>
          <p className="circle-role">{episode.role}</p>
          <div className="circle-guest-intro">
            <h2>{episode.headline}</h2>
            <p className="rm-lead">{episode.summary}</p>
          </div>
          <div className="circle-episode-info">
            <span>In conversation with Dr. Jack Skeen</span>
            <time dateTime={episode.publishedAt}>
              {publishedLabel(episode.publishedAt)}
            </time>
            <span>{durationLabel(episode.duration)} minutes</span>
          </div>
        </header>
        <section className="rm-container" aria-label="Full video interview">
          <EpisodePlayer episode={episode} />
          <div className="circle-player-caption">
            <span>The full conversation · {episode.name}</span>
            <a href={episode.source} target="_blank" rel="noopener noreferrer">
              Watch on YouTube ↗
            </a>
          </div>
        </section>
        <div className="rm-container circle-story-layout">
          <aside>
            <p className="rm-eyebrow">In this story</p>
            <nav aria-label="On this page">
              <a href="#the-story">Meet {episode.name.split(" ")[0]}</a>
              <a href="#a-new-perspective">A new perspective</a>
              <a href="#takeaways">Ideas to take with you</a>
              <a href="#reflection">Your own reflection</a>
            </nav>
            <div className="circle-topic-list">
              {episode.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </aside>
          <div className="circle-prose">
            <section id="the-story">
              <p className="rm-eyebrow">The person behind the story</p>
              <h2>Meet {episode.name.split(" ")[0]}.</h2>
              <p>{episode.story}</p>
            </section>
            <section id="a-new-perspective">
              <p className="rm-eyebrow">A new perspective</p>
              <h2>What becomes possible.</h2>
              <p>{episode.shift}</p>
              <Link className="circle-text-link" href="/roadmap">
                Explore the value of The Roadmap ↗
              </Link>
            </section>
            <section id="takeaways">
              <p className="rm-eyebrow">Ideas to take with you</p>
              <h2>Let the conversation continue.</h2>
              <ol className="circle-takeaways">
                {episode.takeaways.map((takeaway, index) => (
                  <li key={takeaway}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <p>{takeaway}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
        <section id="reflection" className="circle-reflection">
          <div className="rm-container circle-reflection-inner">
            <div>
              <p className="rm-eyebrow">A moment for you</p>
              <h2>
                What does this
                <br />
                bring up in your life?
              </h2>
              <p>
                Original reflection prompts inspired by the themes of this
                conversation. Take one into your journal, a quiet walk, or a
                conversation of your own.
              </p>
            </div>
            <ol>
              {episode.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </div>
        </section>
        <div className="rm-container circle-source">
          <p>
            Editorial summary based on the published interview and its
            description. Guest roles reflect the context of the episode.
            Reflections are provided by this site, not quotations from the
            guest.
          </p>
          <a href={episode.source} target="_blank" rel="noopener noreferrer">
            View the original episode ↗
          </a>
        </div>
      </article>
      <section className="rm-container circle-related">
        <div className="circle-section-heading">
          <div>
            <p className="rm-eyebrow">More perspectives</p>
            <h2>Keep exploring.</h2>
          </div>
          <Link className="circle-text-link" href="/inside-the-circle">
            All conversations ↗
          </Link>
        </div>
        <div className="circle-grid">
          {related.map((other) => (
            <EpisodeCard key={other.id} episode={other} />
          ))}
        </div>
      </section>
      <RoadmapCta />
    </Frame>
  );
}
