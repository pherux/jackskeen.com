import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/content/article-card";
import { ArticleIndex } from "@/components/content/article-index";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ContactForm } from "@/components/site/contact-form";
import { PageBody, TopicRelatedLinks } from "@/components/site/page-body";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-sections";
import {
  findSitePage,
  sitePages,
  topics,
  type PageSpec,
} from "@/data/site-pages";
import {
  formatArticleDate,
  getArticlesByTopic,
  getLegacyArticle,
  getLegacyArticles,
} from "@/lib/content-catalog";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

function toPath(slug: string[]) {
  return `/${slug.join("/")}`;
}

function titleFromSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isDifferentCalendarDate(first: string, second: string) {
  return first.slice(0, 10) !== second.slice(0, 10);
}

function breadcrumbsFor(path: string, currentTitle: string) {
  const parts = path.split("/").filter(Boolean);

  return parts.map((part, index) => {
    const isLast = index === parts.length - 1;
    const candidateHref = `/${parts.slice(0, index + 1).join("/")}`;
    return {
      label: isLast ? currentTitle : titleFromSegment(part),
      href: isLast
        ? undefined
        : candidateHref === "/insights/topics"
          ? "/insights"
          : candidateHref,
    };
  });
}

function topicPage(path: string): PageSpec | undefined {
  const slug = path.startsWith("/insights/topics/")
    ? path.replace("/insights/topics/", "")
    : "";
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) return undefined;

  return {
    path,
    eyebrow: "Topic",
    title: topic.title,
    description: topic.description,
    kind: "library",
    sections: [
      {
        eyebrow: "Jack’s perspective",
        title: "A perspective for the life and work you are choosing next",
      },
      { eyebrow: "Start here", title: "Featured content" },
      { eyebrow: "Related ideas", title: "Related topics" },
    ],
  };
}

export async function generateStaticParams() {
  const strategic = sitePages.map((page) => ({
    slug: page.path.split("/").filter(Boolean),
  }));
  const topicParams = topics.map((topic) => ({
    slug: ["insights", "topics", topic.slug],
  }));
  const legacy = getLegacyArticles().map((article) => ({
    slug: article.pathname.split("/").filter(Boolean),
  }));

  return [...strategic, ...topicParams, ...legacy];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = toPath(slug);
  const page = findSitePage(path) ?? topicPage(path);
  const article = getLegacyArticle(`${path}/`) ?? getLegacyArticle(path);

  if (page) {
    return {
      title: page.title,
      description: page.description.startsWith("[")
        ? undefined
        : page.description,
      alternates: { canonical: page.path },
      robots: { index: false, follow: true },
      openGraph: {
        title: page.title,
        url: page.path,
        type: "website",
      },
    };
  }

  if (article) {
    return {
      title: article.title,
      alternates: { canonical: article.pathname },
      robots: { index: false, follow: true },
      openGraph: {
        title: article.title,
        url: article.pathname,
        type: "article",
        publishedTime: article.publicationDate || undefined,
        modifiedTime: article.updatedDate || undefined,
        authors: [article.author],
      },
    };
  }

  return {};
}

function TopicDirectory() {
  return (
    <section
      className="topic-directory section-shell"
      aria-labelledby="topics-heading"
    >
      <div>
        <p className="page-eyebrow">Topics</p>
        <h2 id="topics-heading">Explore the core ideas</h2>
      </div>
      <div className="topic-directory__grid">
        {topics.map((topic, index) => (
          <Link href={`/insights/topics/${topic.slug}`} key={topic.slug}>
            <span>0{index + 1}</span>
            <strong>{topic.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StandardPage({ page }: { page: PageSpec }) {
  const topic = topics.find(
    (item) => page.path === `/insights/topics/${item.slug}`,
  );
  const articleListing = page.path === "/insights/articles";
  const showDirectory = page.path === "/insights";
  const isForm = page.kind === "form";
  const isLegal = page.kind === "legal";

  return (
    <main id="top">
      <SiteHeader />
      <PageHero
        page={page}
        breadcrumbs={breadcrumbsFor(page.path, page.title)}
      />
      <PageBody page={page} />
      {articleListing ? <ArticleIndex articles={getLegacyArticles()} /> : null}
      {topic ? (
        <>
          <ArticleIndex
            articles={getArticlesByTopic(topic.title)}
            title={`Articles mapped to ${topic.title}`}
          />
          <TopicRelatedLinks title={topic.title} />
        </>
      ) : null}
      {showDirectory ? <TopicDirectory /> : null}
      {isForm ? (
        <ContactForm kind={page.path === "/start" ? "start" : "contact"} />
      ) : null}
      {!isLegal && !isForm ? <PageCta /> : null}
      <SiteFooter />
    </main>
  );
}

function LegacyArticlePage({ path }: { path: string }) {
  const article = getLegacyArticle(`${path}/`) ?? getLegacyArticle(path);
  if (!article) notFound();
  const relatedArticles = getArticlesByTopic(article.topic)
    .filter((item) => item.pathname !== article.pathname)
    .slice(0, 3);

  return (
    <main id="top">
      <SiteHeader />
      <article className="legacy-article">
        <header className="legacy-article__header section-shell">
          <Breadcrumbs
            items={[
              { label: "Insights", href: "/insights" },
              {
                label: article.topic,
                href: `/insights/topics/${topics.find((topic) => topic.title === article.topic)?.slug ?? "reflections"}`,
              },
              { label: article.title },
            ]}
          />
          <p className="page-eyebrow">{article.topic}</p>
          <h1>{article.title}</h1>
          <p className="legacy-article__deck">
            [Legacy article deck pending approved CMS migration]
          </p>
          <div className="legacy-article__byline">
            <span>By {article.author}</span>
            <time dateTime={article.publicationDate}>
              {formatArticleDate(article.publicationDate)}
            </time>
            {article.updatedDate &&
            isDifferentCalendarDate(
              article.updatedDate,
              article.publicationDate,
            ) ? (
              <span>Updated {formatArticleDate(article.updatedDate)}</span>
            ) : null}
          </div>
        </header>
        <div className="legacy-article__body section-shell">
          <aside>
            <p className="page-eyebrow">Migration status</p>
            <strong>{article.action}</strong>
            <p>Existing URL preserved.</p>
          </aside>
          <div className="rich-text-placeholder">
            <p>[Legacy article body pending approved CMS migration]</p>
            <p>
              The migration audit preserves this article’s title, author,
              publication date, canonical URL, topic mapping, and root-level
              URL. The body will not be republished until the WordPress export
              has been transformed and reviewed.
            </p>
          </div>
        </div>
        <section className="author-block section-shell">
          <div>
            <p className="page-eyebrow">About the author</p>
            <h2>{article.author}</h2>
          </div>
          <div>
            <p>[Verified author biography and credentials required]</p>
            <Link href="/about">About Jack</Link>
          </div>
        </section>
        <section
          className="article-related section-shell"
          aria-labelledby="related-articles-heading"
        >
          <div className="article-related__heading">
            <p className="page-eyebrow">Continue exploring</p>
            <h2 id="related-articles-heading">Related articles</h2>
          </div>
          {relatedArticles.length > 0 ? (
            <div className="article-index__grid">
              {relatedArticles.map((item) => (
                <ArticleCard article={item} key={item.pathname} />
              ))}
            </div>
          ) : (
            <p className="empty-state">
              Related reading will appear here after editorial review.
            </p>
          )}
        </section>
      </article>
      <PageCta />
      <SiteFooter />
    </main>
  );
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = toPath(slug);
  const page = findSitePage(path) ?? topicPage(path);

  if (page) return <StandardPage page={page} />;
  return <LegacyArticlePage path={path} />;
}
