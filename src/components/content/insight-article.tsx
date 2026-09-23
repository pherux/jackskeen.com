import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/site/roadmap-pages";
import {
  formatArticleDate,
  getArticleTopic,
  getRelatedArticles,
  type LegacyArticle,
} from "@/lib/content-catalog";
import { ArticleCard } from "./article-card";
import { ArchiveVideoPlayer } from "./archive-video";
import { InsightSchema } from "./insights-pages";
const origin = "https://jackskeen.com";

export function InsightArticlePage({ article }: { article: LegacyArticle }) {
  const topic = getArticleTopic(article);
  const video = article.video;
  const schema: Record<string, unknown>[] = [
    {
      "@type": article.kind === "article" ? "Article" : "WebPage",
      "@id": `${article.canonicalUrl}#article`,
      url: article.canonicalUrl,
      headline: article.title,
      name: article.title,
      description: article.description,
      datePublished: article.publicationDateGmt,
      dateModified: article.updatedDateGmt,
      author: {
        "@type": "Person",
        "@id": `${origin}/about#jack-skeen`,
        name: article.author,
        url: `${origin}/about`,
      },
      publisher: { "@type": "Organization", name: "Jack Skeen", url: origin },
      mainEntityOfPage: article.canonicalUrl,
      articleSection: article.kind === "article" ? article.topic : undefined,
      image: article.image ? origin + article.image.src : undefined,
      video: video ? { "@id": `${article.canonicalUrl}#video` } : undefined,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        {
          "@type": "ListItem",
          position: 2,
          name: "Insights",
          item: `${origin}/insights`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: topic.title,
          item: `${origin}/insights/topics/${topic.slug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: article.title,
          item: article.canonicalUrl,
        },
      ],
    },
  ];
  if (video?.publishedAt && article.image)
    schema.push({
      "@type": "VideoObject",
      "@id": `${article.canonicalUrl}#video`,
      name: video.title,
      description: article.excerpt,
      thumbnailUrl: origin + article.image.src,
      uploadDate: video.publishedAt,
      duration: `PT${video.duration}S`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
      url: video.sourceUrl,
    });
  return (
    <Frame>
      <InsightSchema
        value={{ "@context": "https://schema.org", "@graph": schema }}
      />
      <article className="insight-article">
        <header className="rm-container insight-article-header">
          <nav className="circle-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights">Insights</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>
          <Link
            className="rm-eyebrow insight-topic-link"
            href={`/insights/topics/${topic.slug}`}
          >
            {article.topic}
          </Link>
          <h1>{article.title}</h1>
          <div className="insight-byline">
            <Link href="/about">By {article.author}</Link>
            <time dateTime={article.publicationDateGmt}>
              {formatArticleDate(article.publicationDate)}
            </time>
            <span>
              {article.kind === "video"
                ? "From the video archive"
                : `${article.readMinutes} min read`}
            </span>
          </div>
        </header>
        {video ? (
          <div className="rm-container insight-hero-media">
            <ArchiveVideoPlayer video={video} image={article.image} />
          </div>
        ) : (
          article.image && (
            <figure className="rm-container insight-hero-media">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                width={article.image.width}
                height={article.image.height}
                sizes="(max-width: 1100px) 100vw, 1000px"
                priority
              />
              {article.image.caption && (
                <figcaption>{article.image.caption}</figcaption>
              )}
            </figure>
          )
        )}
        <div className="rm-container insight-reading-layout">
          <aside>
            <p className="rm-eyebrow">From Jack’s archive</p>
            <p>
              Original perspectives.
              <br />
              Questions that stay with you.
            </p>
            <Link href={`/insights/topics/${topic.slug}`}>
              Explore {article.topic.toLowerCase()} ↗
            </Link>
          </aside>
          <div className="insight-reading">
            <div
              className="insight-prose"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
            {article.kind === "video" && (
              <p className="insight-video-intro">{article.excerpt}</p>
            )}
            <div className="insight-publication-note">
              <p>
                Originally published{" "}
                {formatArticleDate(article.publicationDate)}.
                {article.updatedDate.slice(0, 10) !==
                article.publicationDate.slice(0, 10)
                  ? ` Source last updated ${formatArticleDate(article.updatedDate)}.`
                  : ""}{" "}
                Preserved from Jack’s original archive.
              </p>
            </div>
            <section className="insight-author">
              <Image
                src="/images/jack-skeen-about.jpg"
                alt="Jack Skeen"
                width={100}
                height={120}
              />
              <div>
                <p className="rm-eyebrow">About the author</p>
                <h2>{article.author}</h2>
                <p>
                  Jack is an executive coach, author, and creator of The
                  Roadmap. His work helps people explore their natural gifts,
                  purpose, and next chapter.
                </p>
                <Link className="circle-text-link" href="/about">
                  Meet Jack ↗
                </Link>
              </div>
            </section>
            <section className="insight-context-cta">
              <p className="rm-eyebrow">Bring it into your own life</p>
              <h2>A clearer sense of what comes next.</h2>
              <p>
                The Roadmap is an invitation to understand your natural gifts
                and shape a life that feels more like your own.
              </p>
              <Link className="rm-button" href="/roadmap">
                Explore The Roadmap ↗
              </Link>
            </section>
          </div>
        </div>
      </article>
      <section className="rm-container insight-related">
        <div className="insights-archive-heading">
          <div>
            <p className="rm-eyebrow">Continue exploring</p>
            <h2>Another perspective.</h2>
          </div>
          <Link className="circle-text-link" href="/insights">
            All Insights ↗
          </Link>
        </div>
        <div className="insight-grid">
          {getRelatedArticles(article).map((other) => (
            <ArticleCard key={other.pathname} article={other} />
          ))}
        </div>
      </section>
    </Frame>
  );
}
