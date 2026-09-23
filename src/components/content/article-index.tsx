import { ArticleCard } from "./article-card";
import type { LegacyArticle } from "@/lib/content-catalog";
export function ArticleIndex({
  articles,
  title = "Explore the archive",
}: {
  articles: LegacyArticle[];
  title?: string;
}) {
  return (
    <section className="rm-container insight-related">
      <h2>{title}</h2>
      <div className="insight-grid">
        {articles.map((article) => (
          <ArticleCard key={article.pathname} article={article} />
        ))}
      </div>
    </section>
  );
}
