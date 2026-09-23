import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/site/roadmap-pages";
import { RoadmapCta } from "@/components/sections/roadmap-sections";
import { topics } from "@/data/site-pages";
import { ArticleCard } from "./article-card";
import { getLegacyArticles } from "@/lib/content-catalog";

export function InsightSchema({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export const pageSize = 15;
export type InsightQuery = { q?: string; format?: string; page?: string };
export function selectInsights(query: InsightQuery, topic?: string) {
  const normalized = (query.q || "")
    .trim()
    .slice(0, 200)
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return getLegacyArticles().filter(
    (article) =>
      (!topic || topic === article.topic) &&
      (!["article", "video"].includes(query.format || "") ||
        query.format === article.kind) &&
      (!normalized ||
        `${article.title} ${article.excerpt} ${article.topic} ${article.bodyHtml.replace(/<[^>]*>/g, " ")}`
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(normalized)),
  );
}
function queryUrl(
  base: string,
  query: InsightQuery,
  page: number,
  format = query.format,
) {
  const params = new URLSearchParams();
  if (query.q?.trim()) params.set("q", query.q.trim());
  if (format && ["video", "article"].includes(format))
    params.set("format", format);
  if (page > 1) params.set("page", String(page));
  return base + (params.size ? `?${params}` : "") + "#archive";
}
export function InsightsPage({
  query = {},
  topicSlug,
}: {
  query?: InsightQuery;
  topicSlug?: string;
}) {
  const topic = topics.find((item) => item.slug === topicSlug);
  const base = topic ? `/insights/topics/${topic.slug}` : "/insights";
  const all = selectInsights(query, topic?.title);
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const page = Math.max(
    1,
    Math.min(totalPages, Number.parseInt(query.page || "1", 10) || 1),
  );
  const visible = all.slice((page - 1) * pageSize, page * pageSize);
  const featured =
    !topic && !query.q && !query.format && page === 1
      ? getLegacyArticles().find(
          (article) =>
            article.pathname === "/discovering-your-unique-gift-to-the-world",
        )!
      : null;
  return (
    <Frame>
      <InsightSchema
        value={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: topic
            ? `${topic.title} — Insights`
            : "Insights from Jack Skeen",
          url: `https://jackskeen.com${base}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: visible.map((article, index) => ({
              "@type": "ListItem",
              position: (page - 1) * pageSize + index + 1,
              name: article.title,
              url: article.canonicalUrl,
            })),
          },
        }}
      />
      <section className="rm-container insights-hero">
        <div>
          {topic && (
            <Link className="insight-back" href="/insights">
              ← All Insights
            </Link>
          )}
          <p className="rm-eyebrow">
            {topic
              ? "Explore a perspective"
              : "Ideas for a more intentional life"}
          </p>
          <h1>
            {topic ? (
              topic.title
            ) : (
              <>
                Insights
                <span>
                  Think deeply.
                  <br />
                  Live more fully.
                </span>
              </>
            )}
          </h1>
        </div>
        <div>
          <p className="rm-lead">
            {topic
              ? topic.description
              : "A collection of perspectives on purpose, leadership, relationships, and the life you choose to create."}
          </p>
          <p>
            {topic
              ? `Explore Jack’s writing and original videos on ${topic.title.toLowerCase()}. Each piece offers a different starting point for reflection, from everyday choices to the direction of a life.`
              : "Explore Jack’s original writing and short films. Find a question worth sitting with, a familiar pattern seen differently, or a useful idea for what comes next."}
          </p>
          <a href="#archive" className="circle-text-link">
            {topic ? "Explore this topic" : "Explore the archive"} ↓
          </a>
        </div>
      </section>
      {featured && (
        <section className="rm-container insights-feature">
          <div>
            <p className="rm-eyebrow">
              A good place to begin · {featured.topic}
            </p>
            <h2>
              <Link href={featured.pathname}>{featured.title}</Link>
            </h2>
            <p>{featured.excerpt}</p>
            <Link className="circle-text-link" href={featured.pathname}>
              Read Jack’s perspective ↗
            </Link>
          </div>
          {featured.image && (
            <Link
              href={featured.pathname}
              aria-label={`Read ${featured.title}`}
            >
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                sizes="(max-width: 800px) 100vw, 50vw"
                priority
              />
            </Link>
          )}
        </section>
      )}
      <section id="archive" className="rm-container insights-archive">
        <div className="insights-archive-heading">
          <div>
            <p className="rm-eyebrow">The archive</p>
            <h2>{topic ? "More ways to see it." : "Follow your curiosity."}</h2>
          </div>
          <form
            action={`${base}#archive`}
            method="get"
            className="insight-search"
          >
            <label htmlFor="insight-search">Search the archive</label>
            <div>
              <input
                id="insight-search"
                type="search"
                name="q"
                defaultValue={query.q || ""}
                placeholder="A topic, a question, an idea…"
                maxLength={200}
              />
              {query.format && (
                <input type="hidden" name="format" value={query.format} />
              )}
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
        <nav className="insight-topics" aria-label="Browse Insights by topic">
          <Link
            href="/insights#archive"
            aria-current={!topic ? "page" : undefined}
          >
            All topics
          </Link>
          {topics.map((item) => (
            <Link
              href={`/insights/topics/${item.slug}#archive`}
              key={item.slug}
              aria-current={item.slug === topic?.slug ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="insight-results-bar">
          <p>
            {all.length} {all.length === 1 ? "piece" : "pieces"}
            {query.q ? ` matching “${query.q}”` : " to explore"}
            {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ""}
          </p>
          <nav aria-label="Filter by format">
            {[
              ["All", ""],
              ["Articles", "article"],
              ["Videos", "video"],
            ].map(([label, value]) => (
              <Link
                key={label}
                href={queryUrl(base, query, 1, value)}
                aria-current={
                  (query.format || "") === value ? "page" : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        {visible.length ? (
          <div className="insight-grid">
            {visible.map((article) => (
              <ArticleCard key={article.pathname} article={article} />
            ))}
          </div>
        ) : (
          <div className="insight-empty">
            <h3>No matching stories yet.</h3>
            <p>Try a broader phrase, or return to the complete archive.</p>
            <Link className="rm-button" href={`${base}#archive`}>
              Clear search
            </Link>
          </div>
        )}
        {totalPages > 1 && (
          <nav className="insight-pagination" aria-label="Archive pages">
            {page > 1 && (
              <Link rel="prev" href={queryUrl(base, query, page - 1)}>
                ← Previous
              </Link>
            )}
            <div>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <Link
                    key={number}
                    href={queryUrl(base, query, number)}
                    aria-label={`Page ${number}`}
                    aria-current={page === number ? "page" : undefined}
                  >
                    {number}
                  </Link>
                ),
              )}
            </div>
            {page < totalPages && (
              <Link rel="next" href={queryUrl(base, query, page + 1)}>
                Next →
              </Link>
            )}
          </nav>
        )}
      </section>
      <section className="insight-podcast-band">
        <div className="rm-container">
          <div>
            <p className="rm-eyebrow">Another way into the conversation</p>
            <h2>
              Ideas become personal
              <br />
              Inside the Circle.
            </h2>
          </div>
          <div>
            <p>
              Hear Roadmap graduates talk with Jack about the questions,
              choices, and new perspectives that have shaped their lives.
            </p>
            <Link className="circle-text-link" href="/inside-the-circle">
              Meet the guests ↗
            </Link>
          </div>
        </div>
      </section>
      <RoadmapCta />
    </Frame>
  );
}
