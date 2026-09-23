"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  durationLabel,
  episodePath,
  type PodcastEpisode,
} from "@/data/podcast";

export function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  return (
    <article className="circle-card">
      <Link href={episodePath(episode)} className="circle-card-link">
        <div className="circle-art">
          <Image
            src={episode.thumbnail}
            alt=""
            width={1280}
            height={720}
            sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
          />
          <span className="circle-duration">
            {durationLabel(episode.duration)}
          </span>
        </div>
        <p className="circle-meta">
          Episode {String(episode.episode).padStart(2, "0")} ·{" "}
          {episode.topics[0]}
        </p>
        <h3>
          {episode.name}
          <span aria-hidden="true">↗</span>
        </h3>
        <p className="circle-card-headline">{episode.headline}</p>
        <p>{episode.summary}</p>
      </Link>
    </article>
  );
}

export function EpisodeDirectory({
  episodes,
  topics,
}: {
  episodes: PodcastEpisode[];
  topics: string[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All conversations");
  const normalized = query
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const results = episodes.filter(
    (episode) =>
      (topic === "All conversations" || episode.topics.includes(topic)) &&
      `${episode.name} ${episode.role} ${episode.headline} ${episode.summary} ${episode.topics.join(" ")}`
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalized),
  );
  return (
    <section id="conversations" className="rm-container circle-directory">
      <div className="circle-section-heading">
        <div>
          <p className="rm-eyebrow">The conversations</p>
          <h2>Find a story that speaks to you.</h2>
        </div>
        <div className="circle-search">
          <label htmlFor="guest-search">Search guests or themes</label>
          <input
            id="guest-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="A name, a question, a next chapter…"
          />
        </div>
      </div>
      <div
        className="circle-filters"
        aria-label="Filter conversations by theme"
      >
        {["All conversations", ...topics].map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="circle-count" role="status">
        {results.length}{" "}
        {results.length === 1 ? "conversation" : "conversations"}
        {topic !== "All conversations"
          ? ` about ${topic.toLowerCase()}`
          : " to explore"}
      </p>
      {results.length ? (
        <div className="circle-grid">
          {results.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="circle-empty">
          <h3>No conversations found.</h3>
          <p>Try another name or explore all the stories.</p>
          <button
            className="rm-button"
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("All conversations");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
