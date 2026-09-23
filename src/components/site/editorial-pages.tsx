import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Frame } from "@/components/site/roadmap-pages";
import { ClientVideo } from "@/components/site/client-video";
import {
  RoadmapCta,
  RoadmapDocument,
} from "@/components/sections/roadmap-sections";
import {
  clientVideos,
  clientQuotes,
  storyPerspectives,
  testimonialSource,
} from "@/data/client-stories";

function PageLinks({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  return (
    <nav className="editorial-jumps rm-container" aria-label="On this page">
      <span>Explore</span>
      {items.map(([label, href]) => (
        <a key={href} href={href}>
          {label}
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}

export function AboutJackPage() {
  const person = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://jackskeen.com/about#profile",
    url: "https://jackskeen.com/about",
    mainEntity: {
      "@type": "Person",
      "@id": "https://jackskeen.com/about#jack-skeen",
      name: "Jack Skeen",
      honorificPrefix: "Dr.",
      jobTitle: "Executive coach",
      image: "https://jackskeen.com/images/jack-skeen-about.jpg",
      description:
        "Founder of Skeen Leadership, with a Ph.D. in psychology and a Master of Divinity in theology.",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Ph.D. in psychology",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Master of Divinity in theology",
        },
      ],
      worksFor: { "@type": "Organization", name: "Skeen Leadership" },
    },
  };
  return (
    <Frame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <section className="rm-container editorial-hero about-hero">
        <div>
          <p className="rm-eyebrow">Meet Dr. Jack Skeen</p>
          <h1>
            The person behind
            <br />
            your next chapter.
          </h1>
          <p className="rm-lead">
            A psychologist’s understanding. A coach’s perspective. A lifelong
            interest in what makes people come alive.
          </p>
          <div className="rm-actions">
            <Link className="rm-button" href="/start">
              Talk with Jack <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a className="rm-text-link" href="#perspective">
              His perspective <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="editorial-byline">Founder, Skeen Leadership</p>
        </div>
        <figure className="about-portrait">
          <Image
            src="/images/jack-skeen-about.jpg"
            alt="Dr. Jack Skeen, founder of Skeen Leadership"
            width={731}
            height={1024}
            priority
            sizes="(max-width:760px) 100vw, 42vw"
          />
          <figcaption>Dr. Jack Skeen · Executive coach</figcaption>
        </figure>
      </section>
      <div className="credential-band">
        <div className="rm-container">
          <div>
            <strong>25+</strong>
            <span>
              years guiding personal
              <br />
              and corporate growth
            </span>
          </div>
          <div>
            <strong>Ph.D.</strong>
            <span>Psychology</span>
          </div>
          <div>
            <strong>M.Div.</strong>
            <span>Theology</span>
          </div>
        </div>
      </div>
      <PageLinks
        items={[
          ["Perspective", "#perspective"],
          ["Background", "#background"],
          ["The Roadmap", "#jacks-roadmap"],
        ]}
      />
      <section
        className="rm-container rm-section editorial-split"
        id="perspective"
      >
        <div>
          <p className="rm-eyebrow">The whole person</p>
          <h2>
            Life is bigger
            <br />
            than a job title.
          </h2>
        </div>
        <div className="editorial-prose">
          <p className="editorial-large">
            Leadership, work, and personal fulfillment belong in the same
            conversation.
          </p>
          <p>
            Jack founded Skeen Leadership to help people and teams grow. His
            work connects professional effectiveness with a deeper understanding
            of the person behind the role.
          </p>
          <p>
            He has coached hundreds of executives, including leaders at Verizon,
            ServiceMaster, Motorola, and RR Donnelley. Across that work, his
            interest remains personal: helping people recognize what they can
            contribute and live more fully.
          </p>
        </div>
      </section>
      <section className="editorial-tint" id="background">
        <div className="rm-container rm-section about-background">
          <div className="about-context-photo">
            <Image
              src="/images/jack-skeen-coaching.jpg"
              alt="Jack speaking with a group in an informal setting"
              width={667}
              height={667}
              sizes="(max-width:760px) 100vw, 40vw"
            />
          </div>
          <div>
            <p className="rm-eyebrow">A broader perspective</p>
            <h2>
              Understanding people.
              <br />
              Exploring purpose.
            </h2>
            <div className="editorial-prose">
              <p>
                Before Skeen Leadership, Jack spent ten years working as a
                licensed psychologist and served as a Presbyterian minister. His
                doctoral work in psychology and graduate studies in theology
                inform his perspective on human behavior and meaning.
              </p>
              <p>
                He later developed the Circle Blueprint System with two
                colleagues, extending ideas from his corporate work into a wider
                framework for personal growth.
              </p>
            </div>
            <Link href="/books/circle-blueprint" className="rm-text-link">
              Explore the Circle Blueprint{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="rm-container rm-section editorial-split"
        id="jacks-roadmap"
      >
        <div>
          <p className="rm-eyebrow">His work, made personal</p>
          <h2>
            A clearer understanding
            <br />
            of what is yours to do.
          </h2>
        </div>
        <div className="editorial-prose">
          <p>
            The Roadmap brings Jack’s attention to your distinctive strengths
            and the choices ahead. It is a personal reference for people seeking
            a more intentional relationship with their work and life.
          </p>
          <div className="rm-actions">
            <Link className="rm-button" href="/roadmap">
              Discover The Roadmap <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="rm-text-link" href="/success-stories">
              Read client stories
            </Link>
          </div>
        </div>
      </section>
      <RoadmapCta />
    </Frame>
  );
}

export function ClientStoriesPage() {
  return (
    <Frame>
      <section className="rm-container editorial-hero stories-hero">
        <div>
          <p className="rm-eyebrow">The Roadmap · Client stories</p>
          <h1>
            Different lives.
            <br />A clearer way forward.
          </h1>
        </div>
        <div>
          <p className="rm-lead">
            The value of knowing yourself is personal. Hear from people who have
            made The Roadmap part of their own next chapter.
          </p>
          <div className="rm-actions">
            <a className="rm-button" href="#client-films">
              Watch their stories <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a href="#written-stories" className="rm-text-link">
              Read their reflections
            </a>
          </div>
        </div>
      </section>
      <section className="stories-feature" id="client-films">
        <div className="rm-container rm-section">
          <div className="stories-feature__intro">
            <div>
              <p className="rm-eyebrow">In their own words</p>
              <h2>
                A personal perspective
                <br />
                from Mohnish Pabrai.
              </h2>
            </div>
            <p>
              Investor. Philanthropist.
              <br />
              Roadmap client.
            </p>
          </div>
          <ClientVideo story={clientVideos[0]} featured />
          <div className="stories-support">
            {clientVideos.slice(1).map((story) => (
              <ClientVideo key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="rm-container rm-section stories-written"
        id="written-stories"
      >
        <div className="rm-section-heading">
          <div>
            <p className="rm-eyebrow">Written reflections</p>
            <h2>What stayed with them.</h2>
          </div>
          <p>
            Short excerpts from published client feedback. Each experience is
            individual.
          </p>
        </div>
        <div className="editorial-quotes">
          {clientQuotes.map((story, index) => (
            <figure key={story.name}>
              <span className="editorial-index">0{index + 1}</span>
              <div>
                <p className="rm-eyebrow">{story.theme}</p>
                <blockquote>“{story.quote}”</blockquote>
                <figcaption>
                  <strong>{story.name}</strong>
                  <span>
                    Excerpt ·{" "}
                    <time dateTime={story.date}>
                      {new Date(`${story.date}T12:00:00Z`).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric", timeZone: "UTC" },
                      )}
                    </time>
                  </span>
                  <a href={testimonialSource}>
                    Read the original{" "}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>
      <section className="editorial-tint">
        <div className="rm-container rm-section">
          <div className="rm-section-heading">
            <div>
              <p className="rm-eyebrow">Different starting points</p>
              <h2>
                Recognize a little
                <br />
                of your own story?
              </h2>
            </div>
            <p>These brief summaries draw on clients’ published reflections.</p>
          </div>
          <div className="story-perspectives">
            {storyPerspectives.map((story) => (
              <article key={story.name}>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <span>{story.name}</span>
              </article>
            ))}
          </div>
          <a className="rm-text-link" href={testimonialSource}>
            Browse the original testimonial collection{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="rm-container rm-section editorial-split">
        <h2>
          Go deeper with
          <br />
          Inside the Circle.
        </h2>
        <div className="editorial-prose">
          <p>
            Meet 16 Roadmap graduates in conversation with Jack. Explore the
            choices, natural gifts, and new perspectives behind their stories.
          </p>
          <Link className="rm-button" href="/inside-the-circle">
            Explore the conversations{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <RoadmapCta />
    </Frame>
  );
}

const roadmapFaqs = [
  [
    "What does Jack mean by ‘unique genius’?",
    "The distinctive combination of strengths, interests, and natural inclinations that shapes your contribution. The Roadmap helps you see that combination more clearly and consider where it belongs in your life.",
  ],
  [
    "Is this only about my career?",
    "No. The Roadmap connects personal understanding with both life and work. It is relevant to professional direction, but also to questions of purpose, priorities, and fulfillment.",
  ],
  [
    "What will I have to return to?",
    "A comprehensive, personalized written report that brings together insights about your strengths and direction. The report illustration on this site is a design concept, not a sample client report.",
  ],
  [
    "Can I take part from outside the United States?",
    "Yes. The Roadmap is available to English-speaking clients worldwide, with the flexibility to work remotely.",
  ],
  [
    "Can I discuss fit and payment options first?",
    "Yes. Start with a conversation with Jack about your questions and goals. Flexible payment options and installments can be discussed on request.",
  ],
] as const;

export function RoadmapPage() {
  return (
    <Frame>
      <section className="rm-container editorial-hero roadmap-detail-hero">
        <div>
          <p className="rm-eyebrow">The Roadmap with Dr. Jack Skeen</p>
          <h1>
            Know yourself.
            <br />
            Choose what’s next.
          </h1>
          <p className="rm-lead">
            A deeper understanding of your unique strengths. A more intentional
            direction for your life and work.
          </p>
          <div className="rm-actions">
            <Link className="rm-button" href="/start">
              Start Your Roadmap <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href="#roadmap-value" className="rm-text-link">
              Discover the value <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="roadmap-cover">
          <Image
            src="/images/roadmap-report-concept.png"
            alt="Illustrative blue and white Roadmap report concept"
            width={1200}
            height={900}
            priority
            sizes="(max-width:760px) 100vw, 55vw"
          />
          <p>
            A personal reference for the decisions ahead.
            <span>Illustrative concept · Format to be confirmed</span>
          </p>
        </div>
      </section>
      <PageLinks
        items={[
          ["The value", "#roadmap-value"],
          ["Who it’s for", "#roadmap-fit"],
          ["Investment", "#investment"],
          ["Questions", "#roadmap-questions"],
        ]}
      />
      <section
        className="rm-container rm-section editorial-split"
        id="roadmap-value"
      >
        <div>
          <p className="rm-eyebrow">Success, with a sense of direction</p>
          <h2>
            More achievement
            <br />
            isn’t always the answer.
          </h2>
        </div>
        <div className="editorial-prose">
          <p className="editorial-large">
            You can be accomplished and still be uncertain about where your
            energy belongs.
          </p>
          <p>
            The Roadmap helps you recognize your unique genius—the combination
            of strengths and qualities that makes your contribution distinctly
            yours. Its value is in connecting that understanding to the choices
            you want to make.
          </p>
        </div>
      </section>
      <section className="roadmap-outcomes">
        <div className="rm-container rm-section">
          <p className="rm-eyebrow">What becomes clearer</p>
          <div className="outcome-list">
            {[
              [
                "01",
                "Your natural strengths",
                "Recognize the abilities and inclinations you may take for granted—and see their place in the work and life you choose.",
              ],
              [
                "02",
                "What matters to you",
                "Bring your interests, values, and ambitions into sharper focus, beyond the expectations that have shaped your decisions.",
              ],
              [
                "03",
                "A direction that feels your own",
                "Consider the next chapter with a clearer understanding of yourself, rather than relying on achievement alone to point the way.",
              ],
            ].map(([n, title, body]) => (
              <article key={n}>
                <span>{n}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rm-container rm-section roadmap-fit" id="roadmap-fit">
        <div>
          <p className="rm-eyebrow">For the moment you’re in</p>
          <h2>
            You’ve built a life. <br />
            Now you’re asking <br />
            what belongs in it.
          </h2>
          <p>
            The Roadmap is for people ready to invest in a better understanding
            of themselves.
          </p>
        </div>
        <div>
          {[
            [
              "Accomplished, but unfulfilled",
              "When success looks right from the outside, but something important still feels unresolved.",
            ],
            [
              "At a professional turning point",
              "When a new role, a business exit, or a change of direction raises a more personal question.",
            ],
            [
              "Ready to use your strengths differently",
              "When you want your next commitment to reflect who you are and what you value.",
            ],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <RoadmapDocument />
      <section className="rm-container rm-section roadmap-proof">
        <div>
          <p className="rm-eyebrow">A client’s perspective</p>
          <h2>
            Hear what it meant
            <br />
            to someone else.
          </h2>
          <p>Mohnish Pabrai shares his experience with The Roadmap.</p>
          <Link className="rm-text-link" href="/success-stories">
            Explore all client stories{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ClientVideo story={clientVideos[0]} />
      </section>
      <section className="investment-band" id="investment">
        <div className="rm-container rm-section editorial-split">
          <div>
            <p className="rm-eyebrow">An investment in your next chapter</p>
            <h2>
              Personal understanding.
              <br />
              Lasting reference.
            </h2>
            <p>
              Work directly with Jack toward a clearer understanding of your
              strengths and direction, with a personalized written Roadmap to
              return to.
            </p>
          </div>
          <div className="investment-details">
            <p className="investment-price">
              $15,000 <span>USD</span>
            </p>
            <p>Personalized Roadmap with Dr. Jack Skeen.</p>
            <p className="investment-note">
              Flexible payment options available on request. Discuss fit and
              current terms with Jack before committing.
            </p>
            <Link href="/start" className="rm-button rm-button--white">
              Let’s talk about your next chapter{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="rm-container rm-section rm-faq"
        id="roadmap-questions"
      >
        <div>
          <p className="rm-eyebrow">Before you decide</p>
          <h2>
            A few good
            <br />
            questions.
          </h2>
        </div>
        <div>
          {roadmapFaqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <RoadmapCta />
    </Frame>
  );
}
