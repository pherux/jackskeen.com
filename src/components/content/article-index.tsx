import { ArticleCard } from "@/components/content/article-card";
import type { LegacyArticle } from "@/lib/content-catalog";

export function ArticleIndex({
  articles,
  title = "Legacy articles prepared for migration",
}: {
  articles: LegacyArticle[];
  title?: string;
}) {
  return (
    <section
      className="article-index section-shell"
      aria-labelledby="article-index-heading"
    >
      <div className="article-index__heading">
        <p className="page-eyebrow">Article inventory</p>
        <h2 id="article-index-heading">{title}</h2>
        <p>
          Titles, authorship, publication dates, topics, and URLs come from the
          migration audit. Article excerpts and bodies remain pending CMS
          migration.
        </p>
      </div>
      {articles.length > 0 ? (
        <div className="article-index__grid">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.pathname} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          Published content will appear here as its source records are migrated.
        </p>
      )}
    </section>
  );
}
