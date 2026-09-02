import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EditorialLabel } from "@/components/sections/editorial-label";
import { RoadmapVideo } from "@/components/site/roadmap-video";
import { PageCta } from "@/components/site/page-sections";
import { Button } from "@/components/ui/button";
import { formatArticleDate, getLegacyArticles } from "@/lib/content-catalog";

export default function Home() {
  const featuredInsights = getLegacyArticles().slice(0, 3);

  return (
    <main id="top">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__content">
          <div className="hero__copy">
            <h1 id="hero-heading">
              You&apos;ve built
              <br />a successful life.
              <br />
              Make sure it&apos;s the
              <br />
              right one.
            </h1>
            <span className="accent-rule" aria-hidden="true" />
            <p>
              Jack helps accomplished leaders understand their unique strengths,
              purpose, and next chapter.
            </p>
            <div className="hero__actions">
              <Button asChild className="button button--primary">
                <Link href="/start">
                  <span>Start Your Roadmap</span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="button button--outline-light"
              >
                <Link href="/about">Meet Jack</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="hero__media">
          <Image
            src="/images/jack-skeen-coaching.jpg"
            alt="Jack Skeen speaking with a small group"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="hero__portrait"
          />
        </div>
      </section>

      <section
        className="tension section-shell"
        id="tension"
        aria-labelledby="tension-heading"
      >
        <div className="tension__intro">
          <EditorialLabel>The tension</EditorialLabel>
          <p>Achievement can answer many questions. Not all of them.</p>
        </div>
        <div className="tension__statement">
          <h2 id="tension-heading">
            <span>Success</span>
            <span>isn&apos;t the</span>
            <span>same as</span>
            <strong>fulfillment.</strong>
          </h2>
        </div>
        <div
          className="tension__details"
          aria-label="The tension between success and fulfillment"
        >
          <span className="axis-node" aria-hidden="true" />
          <p>You can be capable, respected, and successful.</p>
          <p>You can have options others would welcome.</p>
          <p>And still be uncertain about what deserves your energy now.</p>
          <p>That is not failure. It is a question worth examining clearly.</p>
          <Link className="tension__link" href="/roadmap">
            Discover The Roadmap <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="roadmap"
        id="roadmap"
        aria-labelledby="roadmap-heading"
      >
        <div className="roadmap__inner section-shell">
          <div className="roadmap__heading">
            <div>
              <EditorialLabel>The Roadmap</EditorialLabel>
              <h2 id="roadmap-heading">
                When the old measures stop being enough.
              </h2>
            </div>
          </div>
          <div className="roadmap__contrast">
            <article>
              <EditorialLabel>The problem</EditorialLabel>
              <p>
                You can know how to succeed and still be unsure what deserves
                the next part of your life.
              </p>
            </article>
            <article>
              <EditorialLabel>The solution</EditorialLabel>
              <p>
                The Roadmap helps you see what matters now, where your strengths
                belong, and what a more fulfilling next chapter could look like.
              </p>
            </article>
          </div>
          <div className="roadmap__actions">
            <Button asChild className="button button--primary">
              <Link href="/roadmap">
                <span>Discover The Roadmap</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Link className="editorial-link" href="/roadmap/faq">
              Read common questions <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <RoadmapVideo />

      <section
        className="story section-shell"
        id="proof"
        aria-label="Client story publication standard"
      >
        <div className="story__content">
          <EditorialLabel>Client perspective</EditorialLabel>
          <h2>Real experiences. Shared with permission.</h2>
          <span className="accent-rule" aria-hidden="true" />
          <p>
            Client stories will appear here only when the exact words, context,
            attribution, and media rights have been approved.
          </p>
          <p>No outcome will be presented as a guarantee.</p>
          <Link className="story__link" href="/success-stories">
            Explore client stories <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="story__portrait" aria-hidden="true">
          <Image
            src="/images/jack-skeen-portrait.jpg"
            alt=""
            fill
            loading="eager"
            sizes="50vw"
            className="story__portrait-image"
          />
        </div>
      </section>

      <section className="lower section-shell" aria-label="About and insights">
        <article className="about" id="about">
          <div className="about__media">
            <Image
              src="/images/jack-skeen-office.jpg"
              alt="Jack Skeen in his office"
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, 34vw"
            />
          </div>
          <div className="about__content">
            <EditorialLabel>About Jack</EditorialLabel>
            <h2>A guide for questions that do not have simple answers.</h2>
            <div className="lower__copy">
              <p>
                Jack works with accomplished people at consequential moments.
              </p>
              <p>
                His work brings evidence and outside perspective into the room,
                then looks for the patterns connecting strengths and purpose.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="button button--outline"
            >
              <Link href="/about">
                Meet Jack <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </article>

        <article className="insights" id="insights">
          <EditorialLabel>Insights</EditorialLabel>
          <h2>Ideas for seeing your life and work more clearly.</h2>
          <ul className="insights__list">
            {featuredInsights.map((article, index) => (
              <li key={article.pathname}>
                <span className="insights__thumb" aria-hidden="true">
                  <Image
                    src={
                      [
                        "/images/circle-blueprint-background.png",
                        "/images/jack-skeen-coaching.jpg",
                        "/images/dark-circle-blueprint-background.png",
                      ][index]
                    }
                    alt=""
                    fill
                    loading="eager"
                    sizes="72px"
                  />
                </span>
                <span>
                  <Link href={article.pathname}>{article.title}</Link>
                  <time dateTime={article.publicationDate}>
                    {formatArticleDate(article.publicationDate)}
                  </time>
                </span>
              </li>
            ))}
          </ul>
          <Link className="insights__link" href="/insights">
            View all insights <ArrowRight aria-hidden="true" />
          </Link>
        </article>
      </section>
      <PageCta />
      <SiteFooter />
    </main>
  );
}
