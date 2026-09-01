import Link from "next/link";

import { formatArticleDate, type LegacyArticle } from "@/lib/content-catalog";

export function ArticleCard({ article }: { article: LegacyArticle }) {
  return (
    <article className="article-card">
      <p className="article-card__meta">
        {article.topic} <span aria-hidden="true">·</span>{" "}
        <time dateTime={article.publicationDate}>
          {formatArticleDate(article.publicationDate)}
        </time>
      </p>
      <h2>
        <Link href={article.pathname}>{article.title}</Link>
      </h2>
      <p>Excerpt awaiting reviewed CMS migration.</p>
      <Link className="article-card__link" href={article.pathname}>
        Read article
      </Link>
    </article>
  );
}
