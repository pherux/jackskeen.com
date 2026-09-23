import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsightArticlePage } from "@/components/content/insight-article";
import { articleMetadata } from "@/lib/insights-metadata";
import { ArticleIndex } from "@/components/content/article-index";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "@/components/site/contact-form";
import { PageBody, TopicRelatedLinks } from "@/components/site/page-body";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-sections";
import {
  RoadmapPage,
  ClientStoriesPage,
  AboutJackPage,
} from "@/components/site/editorial-pages";
import { StartRoadmapPage } from "@/components/site/roadmap-pages";
import {
  findSitePage,
  sitePages,
  topics,
  type PageSpec,
} from "@/data/site-pages";
import {
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
  const strategic = sitePages
    .filter((page) => !page.path.startsWith("/insights"))
    .map((page) => ({
      slug: page.path.split("/").filter(Boolean),
    }));
  const legacy = getLegacyArticles().map((article) => ({
    slug: article.pathname.split("/").filter(Boolean),
  }));

  return [...strategic, ...legacy];
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

  if (article) return articleMetadata(article);

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
    <main id="main-content" tabIndex={-1}>
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
  const article = getLegacyArticle(path);
  if (!article) notFound();
  return <InsightArticlePage article={article} />;
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = toPath(slug);
  if (path === "/roadmap") return <RoadmapPage />;
  if (path === "/success-stories") return <ClientStoriesPage />;
  if (path === "/about") return <AboutJackPage />;
  if (path === "/start") return <StartRoadmapPage />;
  if (path === "/contact") return <StartRoadmapPage contact />;
  const page = findSitePage(path) ?? topicPage(path);

  if (page) return <StandardPage page={page} />;
  return <LegacyArticlePage path={path} />;
}
