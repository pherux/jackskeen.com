import Image from "next/image";
import Link from "next/link";
import { formatArticleDate, type LegacyArticle } from "@/lib/content-catalog";
export function ArticleCard({ article }: { article: LegacyArticle }) {
  return (
    <article
      className={`insight-card${article.image ? "" : "insight-card--text"}`}
    >
      <Link href={article.pathname} className="insight-card-link">
        {article.image && (
          <div className="insight-card-image">
            <Image
              src={article.image.src}
              alt=""
              width={article.image.width}
              height={article.image.height}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            {article.kind === "video" && (
              <span className="insight-video-label">▶ Video</span>
            )}
          </div>
        )}
        <p className="insight-meta">
          {article.topic} <span aria-hidden="true">·</span>{" "}
          {article.kind === "video"
            ? "Video"
            : `${article.readMinutes} min read`}
        </p>
        <h3>{article.title}</h3>
        <p className="insight-excerpt">{article.excerpt}</p>
        <div className="insight-card-bottom">
          <time dateTime={article.publicationDateGmt}>
            {formatArticleDate(article.publicationDate)}
          </time>
          <span aria-hidden="true">↗</span>
        </div>
      </Link>
    </article>
  );
}
