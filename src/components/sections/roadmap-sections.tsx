import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Quote } from "lucide-react";
import {
  clientVideos,
  clientQuotes,
  testimonialSource,
} from "@/data/client-stories";
import { ClientVideo } from "@/components/site/client-video";
import { roadmapBenefits, roadmapQuestions } from "@/data/roadmap";

export function RoadmapHero({ detail = false }: { detail?: boolean }) {
  return (
    <section className="rm-container rm-hero" aria-labelledby="roadmap-title">
      <div className="rm-hero__copy">
        <p className="rm-eyebrow">The Roadmap with Jack Skeen</p>
        <h1 id="roadmap-title">
          {detail ? (
            <>
              A clearer picture.
              <br />A direction of
              <br />
              your own.
            </>
          ) : (
            <>
              Success
              <br />
              brought you here.
              <br />
              What comes next?
            </>
          )}
        </h1>
        <p className="rm-lead">
          For accomplished leaders seeking a clearer understanding of their
          strengths, priorities, and next chapter.
        </p>
        <div className="rm-actions">
          <Link className="rm-button" href="/start">
            Start Your Roadmap <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <a className="rm-button rm-button--outline" href="#value">
            Explore the value
          </a>
        </div>
      </div>
      <div className="rm-hero__image">
        <Image
          src="/images/jack-skeen-diamonds.webp"
          alt="Jack Skeen speaking, coaching, and in conversation"
          fill
          sizes="(max-width: 760px) 100vw, 52vw"
          priority
        />
      </div>
    </section>
  );
}

export function VideoTestimonials() {
  return (
    <section className="rm-proof" id="stories" aria-labelledby="stories-title">
      <div className="rm-container rm-section">
        <div className="rm-section-heading">
          <h2 id="stories-title">Hear it in their own words.</h2>
          <Link className="proof-link" href="/success-stories">
            Explore client stories <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="client-film-grid">
          <ClientVideo story={clientVideos[0]} featured />
          <div className="client-film-support">
            {clientVideos.slice(1).map((story) => (
              <ClientVideo key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RoadmapValue() {
  return (
    <section
      className="rm-container rm-section rm-value"
      id="value"
      aria-labelledby="value-title"
    >
      <div className="rm-section-heading">
        <h2 id="value-title">
          Know what matters.
          <br />
          Choose with intention.
        </h2>
        <p>
          Greater self-awareness can lead to clearer decisions and a more
          fulfilling next chapter.
        </p>
      </div>
      <div className="rm-benefits">
        {roadmapBenefits.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RoadmapDocument() {
  return (
    <section className="rm-document" aria-labelledby="document-title">
      <div className="rm-container rm-section rm-document__inner">
        <div>
          <p className="rm-eyebrow">Something to return to</p>
          <h2 id="document-title">
            A personal reference for your next chapter.
          </h2>
          <p>
            Your personalized written Roadmap brings your strengths and
            priorities into focus—a reference for the decisions ahead.
          </p>
        </div>
        <figure>
          <Image
            src="/images/roadmap-report-concept.png"
            alt="Illustrative concept for The Roadmap report, showing a blue and white cover and open pages"
            width={1200}
            height={900}
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <figcaption>
            Illustrative document concept · Format to be confirmed
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function TextTestimonials() {
  return (
    <section
      className="rm-container rm-section rm-quotes"
      aria-labelledby="quotes-title"
    >
      <div className="rm-section-heading">
        <h2 id="quotes-title">Client perspectives</h2>
        <p className="rm-status">Excerpts from published client feedback</p>
      </div>
      <div className="rm-quote-grid">
        {clientQuotes.map((item) => (
          <figure key={item.name}>
            <Quote size={35} strokeWidth={1.2} aria-hidden="true" />
            <div>
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <figcaption>
                {item.name}
                <br />
                <a href={testimonialSource}>Read the original</a>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function MeetJack() {
  return (
    <section
      className="rm-container rm-section rm-jack"
      id="jack"
      aria-labelledby="jack-title"
    >
      <div className="rm-jack__photo">
        <Image
          src="/images/jack-skeen-coaching.jpg"
          alt="Jack Skeen in a coaching conversation"
          width={667}
          height={667}
          sizes="(max-width: 760px) 100vw, 28vw"
        />
      </div>
      <div>
        <p className="rm-eyebrow">Meet Jack Skeen</p>
        <h2 id="jack-title">A steady guide for what’s next.</h2>
        <p>
          Jack works with accomplished people at consequential moments in their
          lives, helping them gain clarity, see what matters now, and move
          toward a more fulfilling next chapter.
        </p>
        <Link className="rm-text-link" href="/about">
          More about Jack <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <aside>
        For those who have achieved a great deal—and are asking what matters
        now.
      </aside>
    </section>
  );
}

export function RoadmapFaq() {
  return (
    <section
      className="rm-container rm-section rm-faq"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title">
        Straightforward <br />
        answers.
      </h2>
      <div>
        {roadmapQuestions.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={21} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RoadmapCta() {
  return (
    <section className="rm-cta" aria-labelledby="next-title">
      <div className="rm-container">
        <h2 id="next-title">
          Your next chapter
          <br />
          deserves intention.
        </h2>
        <Link className="rm-button rm-button--white" href="/start">
          Start Your Roadmap <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <p>
          Clarity{" · "}
          <br />
          Purpose{" · "}
          <br />
          What’s next
        </p>
      </div>
    </section>
  );
}
