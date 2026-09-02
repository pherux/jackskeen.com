import Image from "next/image";
import Link from "next/link";

import { topics, type PageSpec } from "@/data/site-pages";

import { PageSections } from "./page-sections";
import { RoadmapVideo } from "./roadmap-video";

type LinkItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      <p className="page-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

function LinkGrid({ items, label }: { items: LinkItem[]; label: string }) {
  return (
    <nav className="route-link-grid" aria-label={label}>
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          aria-label={`Explore ${item.title}`}
        >
          <span className="page-eyebrow">{item.eyebrow}</span>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
          <span className="route-link-grid__action">Explore</span>
        </Link>
      ))}
    </nav>
  );
}

function PlaceholderPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="placeholder-panel section-shell">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="placeholder-panel__content">
        <p>This section is awaiting editorial approval.</p>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EditorialMedia({
  src,
  alt,
  eyebrow,
  caption,
  variant = "wide",
}: {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
  variant?: "wide" | "portrait";
}) {
  return (
    <figure
      className={`editorial-media editorial-media--${variant} section-shell`}
    >
      <div className="editorial-media__image">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 100vw, 86vw"
        />
      </div>
      <figcaption>
        <span className="page-eyebrow">{eyebrow}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

function RoadmapOverview({ page }: { page: PageSpec }) {
  const supportPages: LinkItem[] = [
    {
      eyebrow: "01",
      title: "Results",
      description:
        "Understand the intended value of the work and the standard for client evidence.",
      href: "/roadmap/results",
    },
    {
      eyebrow: "02",
      title: "Questions",
      description:
        "Review the purpose, fit, privacy, commitment, and next step.",
      href: "/roadmap/faq",
    },
  ];

  return (
    <>
      <section className="editorial-statement section-shell">
        <SectionHeading
          eyebrow="The problem"
          title="You can build a successful life and still lose sight of what should come next."
          description="Achievement creates options, responsibility, and momentum. It does not automatically reveal which strengths matter most now, what deserves your energy, or how the next chapter should be shaped."
        />
        <div className="editorial-statement__aside">
          <p className="page-eyebrow">The solution</p>
          <p>
            The Roadmap helps you understand what matters now, where your
            strengths belong, and what a more fulfilling next chapter could look
            like.
          </p>
        </div>
      </section>
      <RoadmapVideo />
      <PageSections sections={page.sections.slice(0, 5)} />
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow="Explore The Roadmap"
          title="Understand the promise before taking the next step."
        />
        <LinkGrid items={supportPages} label="Roadmap information" />
      </section>
      <PlaceholderPanel
        eyebrow="Evidence"
        title="Proof will appear only after approval."
        items={[
          "Approved client stories and attribution",
          "Verified credentials and offer details",
          "Confirmed outcomes, timing, investment, and availability",
        ]}
      />
    </>
  );
}

function RoadmapResults() {
  return (
    <>
      <section className="editorial-statement section-shell">
        <SectionHeading
          eyebrow="What can be said"
          title="Client experience must remain distinct from promised results."
          description="The Roadmap is designed to bring greater understanding to strengths, priorities, recurring tensions, and possible directions. What each person does with that clarity remains their own work and choice."
        />
        <div className="editorial-statement__aside">
          <p className="page-eyebrow">Evidence standard</p>
          <p>
            No quote, identity, organization, outcome, or media appears until
            exact attribution and usage rights are approved.
          </p>
        </div>
      </section>
      <PlaceholderPanel
        eyebrow="Featured story"
        title="A client story will appear here when its exact words and context are approved."
        items={[
          "Exact quote or transcript",
          "Approved name, role, and organization",
          "Relevant engagement and context",
          "Image or video usage permission",
        ]}
      />
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow="More perspectives"
          title="More client perspectives will follow."
        />
        <p className="empty-state">
          Client records are awaiting attribution and publication permission.
        </p>
      </section>
    </>
  );
}

const faqQuestions = [
  {
    question: "What is The Roadmap?",
    answer:
      "The Roadmap is for accomplished people who want greater clarity about who they are now, what matters most, and the next chapter they want to choose.",
  },
  {
    question: "What problem does The Roadmap address?",
    answer:
      "Success can create opportunity, momentum, and responsibility without resolving the deeper questions of fulfillment, purpose, and direction. The Roadmap is designed for that gap.",
  },
  {
    question: "Who is it designed for?",
    answer:
      "It is designed for accomplished people who want a clearer view of themselves and the next chapter they are choosing—especially when conventional success no longer answers the most important questions.",
  },
  {
    question: "How long does it take?",
    answer:
      "The current timeline and scheduling sequence are confirmed during the initial conversation so expectations are clear before the work begins.",
  },
  {
    question: "What is The Roadmap intended to clarify?",
    answer:
      "It is intended to clarify the strengths, priorities, tensions, and possibilities that matter most to your next chapter. It does not prescribe one answer or guarantee a particular outcome.",
  },
  {
    question: "How is participant information protected?",
    answer:
      "The final privacy and data-handling terms are being completed alongside the form, scheduling, and CRM architecture. They will be published before production inquiries are enabled.",
  },
  {
    question: "What is the current investment?",
    answer:
      "Current investment, payment terms, and what is included will be stated here after they are reconfirmed. No price is being inferred from legacy pages.",
  },
  {
    question: "What happens after an inquiry?",
    answer:
      "The inquiry begins a conversation about the question you want to examine and whether The Roadmap is the right fit. Final response and scheduling details will be published when the workflow is connected.",
  },
] as const;

function RoadmapFaq() {
  return (
    <section className="faq-layout section-shell">
      <SectionHeading
        eyebrow="Questions"
        title="What to understand before you begin."
        description="These answers explain the Roadmap at a useful level without inferring prices, legal terms, or operational details that have not been reconfirmed."
      />
      <div className="faq-list">
        {faqQuestions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const offerPages: LinkItem[] = [
  {
    eyebrow: "Primary",
    title: "The Roadmap",
    description:
      "A one-to-one engagement for seeing the gap between the life you have built and the life you want to choose next.",
    href: "/roadmap",
  },
  {
    eyebrow: "One-to-one",
    title: "Executive coaching",
    description:
      "Ongoing outside perspective for leaders examining how they decide, communicate, delegate, and lead.",
    href: "/work-with-jack/executive-coaching",
  },
  {
    eyebrow: "Focused",
    title: "Roadmap Essentials",
    description:
      "A focused option for bringing greater clarity to one important question or transition.",
    href: "/work-with-jack/roadmap-essentials",
  },
  {
    eyebrow: "Group",
    title: "Roadmap Discovery Group",
    description:
      "A possible group-based format that remains unavailable until the program is fully defined.",
    href: "/work-with-jack/roadmap-discovery-group",
  },
  {
    eyebrow: "Organizations",
    title: "Corporate advisory",
    description:
      "Leadership, team, and culture work shaped around the organization and the question it needs to examine.",
    href: "/work-with-jack/corporate",
  },
];

function OfferHub() {
  return (
    <>
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow="Choose a path"
          title="The Roadmap remains the primary starting point."
          description="Audience, problem, format, depth, availability, and next action require final confirmation for every offer."
        />
        <LinkGrid items={offerPages} label="Ways to work with Jack" />
      </section>
      <EditorialMedia
        src="/images/jack-skeen-office.jpg"
        alt="Jack Skeen seated in his office"
        eyebrow="Outside perspective"
        caption="The work begins with the real question in front of you—not a predetermined program or generic answer."
      />
      <PlaceholderPanel
        eyebrow="Decision guide"
        title="Choose the depth and context that match the question."
        items={[
          "Confirmed active offers and boundaries",
          "Audience and qualification criteria",
          "Format, timing, deliverables, and availability",
          "Approved inquiry destination for each offer",
        ]}
      />
    </>
  );
}

const offerRequirements: Record<string, string[]> = {
  "/work-with-jack/executive-coaching": [
    "Ideal client and engagement objective",
    "Cadence, working relationship, confidentiality, and scope",
    "Approved examples and inquiry process",
  ],
  "/work-with-jack/roadmap-essentials": [
    "Confirmed scope and intended audience",
    "Timing, inclusions, exclusions, and current investment",
    "Approved proof and next step",
  ],
  "/work-with-jack/roadmap-discovery-group": [
    "Audience, cohort size, facilitator, and curriculum",
    "Live or asynchronous format, schedule, and deliverable",
    "Availability, investment, and CTA",
  ],
  "/work-with-jack/corporate": [
    "Buyer and organizational problem",
    "Engagement types, diagnostic approach, and delivery format",
    "Approved cases, client references, and inquiry routing",
  ],
};

function OfferDetail({ page }: { page: PageSpec }) {
  return (
    <>
      <section className="editorial-statement section-shell">
        <SectionHeading
          eyebrow="The engagement"
          title={page.title}
          description={page.description}
        />
        <div className="editorial-statement__aside">
          <p className="page-eyebrow">Best fit</p>
          <p>
            Begin with the question you need to examine. A first conversation
            can clarify whether this format, The Roadmap, or another path is the
            better fit.
          </p>
        </div>
      </section>
      <PageSections sections={page.sections} />
      <EditorialMedia
        src="/images/jack-skeen-coaching.jpg"
        alt="Jack Skeen in conversation with a group"
        eyebrow="In conversation"
        caption="The right starting point depends on the question, the context, and the depth of perspective that would be useful now."
      />
      <PlaceholderPanel
        eyebrow="Content dependency"
        title="Details required to complete this page"
        items={
          offerRequirements[page.path] ?? ["Approved offer source required"]
        }
      />
    </>
  );
}

function AboutBody({ page }: { page: PageSpec }) {
  return (
    <>
      <section className="editorial-statement section-shell">
        <SectionHeading
          eyebrow="Biography"
          title="Helping accomplished people see the patterns behind their choices."
          description="Jack's work begins with careful attention: to the evidence, to the perspective of other people, and to the questions a person may have been too busy or too close to examine fully."
        />
        <div className="editorial-statement__aside">
          <p className="page-eyebrow">Point of view</p>
          <p>
            Clearer choices begin with a more honest view of your strengths,
            motivations, relationships, and recurring patterns.
          </p>
        </div>
      </section>
      <EditorialMedia
        src="/images/jack-skeen-office.jpg"
        alt="Jack Skeen seated in his office"
        eyebrow="The work"
        caption="Careful attention, honest conversation, and evidence from beyond your own point of view."
        variant="portrait"
      />
      <PageSections sections={page.sections.slice(1, 5)} />
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow="Ideas and work"
          title="Explore the body of work."
        />
        <LinkGrid
          label="Jack Skeen's work"
          items={[
            {
              eyebrow: "Method",
              title: "The Roadmap",
              description:
                "Explore the problem The Roadmap addresses and the clarity it is designed to create.",
              href: "/roadmap",
            },
            {
              eyebrow: "Writing and media",
              title: "Insights",
              description: "Browse retained articles and future media records.",
              href: "/insights",
            },
            {
              eyebrow: "Books",
              title: "The Circle Blueprint",
              description:
                "Explore a framework organized around Independence, Power, Humility, and Purpose.",
              href: "/books/circle-blueprint",
            },
          ]}
        />
      </section>
      <PlaceholderPanel
        eyebrow="Authority"
        title="Verified sources required"
        items={[
          "Full professional name, current role, and chronological biography",
          "Degrees, credentials, affiliations, and dates",
          "Psychology, theology, ministry, and coaching history",
          "Approved social profiles, photography rights, and media contact",
        ]}
      />
    </>
  );
}

function InsightsLanding() {
  const formats: LinkItem[] = [
    {
      eyebrow: "Read",
      title: "Articles",
      description:
        "Essays and observations about leadership, purpose, growth, relationships, and the choices that shape a life.",
      href: "/insights/articles",
    },
    {
      eyebrow: "Listen",
      title: "Inside the Circle",
      description:
        "Long-form conversations will appear here when the canonical episode records and transcripts are ready.",
      href: "/insights/podcast",
    },
    {
      eyebrow: "Watch",
      title: "Videos",
      description:
        "A future library of conversations and teaching organized around the site's core ideas.",
      href: "/insights/videos",
    },
  ];

  return (
    <>
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow="Browse by format"
          title="Writing, conversations, and ideas."
          description="Start with the question that matters to you, then move between articles, conversations, videos, and the topic that connects them."
        />
        <LinkGrid items={formats} label="Insight formats" />
      </section>
      <EditorialMedia
        src="/images/circle-blueprint-background.png"
        alt="Circle Blueprint lines and intersecting points"
        eyebrow="A connected body of work"
        caption="Each idea belongs to a larger conversation about purpose, growth, relationships, leadership, and the life you are choosing."
      />
    </>
  );
}

function TopicContext({ page }: { page: PageSpec }) {
  return (
    <section className="editorial-statement section-shell">
      <SectionHeading
        eyebrow="The idea"
        title={page.description}
        description="The articles below explore this idea from different moments and angles. As podcast and video records are added, the hub will bring those perspectives together as well."
      />
      <div className="editorial-statement__aside">
        <p className="page-eyebrow">Start here</p>
        <p>
          Begin with the retained articles, then follow the related topics to
          see how this question connects to the larger work.
        </p>
      </div>
    </section>
  );
}

export function TopicRelatedLinks({ title }: { title: string }) {
  const related = topics.filter((topic) => topic.title !== title).slice(0, 3);

  return (
    <nav className="related-topics section-shell" aria-label="Related topics">
      <p className="page-eyebrow">Related topics</p>
      <div>
        {related.map((topic) => (
          <Link href={`/insights/topics/${topic.slug}`} key={topic.slug}>
            {topic.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MediaLibrary({ kind }: { kind: "podcast" | "video" }) {
  const podcast = kind === "podcast";
  return (
    <>
      <section className="media-feature section-shell">
        <SectionHeading
          eyebrow={podcast ? "Inside the Circle" : "Video library"}
          title={
            podcast
              ? "Conversations about the choices behind a meaningful life."
              : "Ideas become clearer when you can hear the conversation."
          }
          description={
            podcast
              ? "The canonical series description, feed, platforms, episode metadata, players, and transcripts are not yet available."
              : "The canonical channel, video metadata, accessible embeds, summaries, and transcripts are not yet available."
          }
        />
        <div className="media-feature__frame">
          <p className="page-eyebrow">Media unavailable</p>
          <p>
            {podcast
              ? "The first approved episode and transcript will appear here."
              : "The first approved video, poster, and transcript will appear here."}
          </p>
        </div>
      </section>
      <section className="route-directory section-shell">
        <SectionHeading
          eyebrow={podcast ? "Episodes" : "Videos"}
          title="A structured library will appear here."
        />
        <p className="empty-state">
          {podcast
            ? "Episode records are awaiting a confirmed canonical source."
            : "Video records are awaiting a confirmed canonical source."}
        </p>
      </section>
      <PlaceholderPanel
        eyebrow="Source dependency"
        title="Information required to create detail pages"
        items={
          podcast
            ? [
                "Canonical feed and platform URLs",
                "Episode title, guest, date, summary, and player source",
                "Edited transcript, guest bio, topics, and related content",
              ]
            : [
                "Approved channel and canonical source",
                "Video title, date, summary, embed, and poster",
                "Takeaways, transcript or captions, topics, and related content",
              ]
        }
      />
    </>
  );
}

function BooksBody({ circle }: { circle: boolean }) {
  if (circle) {
    return (
      <>
        <section className="editorial-statement section-shell">
          <SectionHeading
            eyebrow="The framework"
            title="Independence, Power, Humility, and Purpose"
            description="These framework labels are source-backed. Their definitions and relationship require approved book or author source material."
          />
          <div className="editorial-statement__aside">
            <p className="page-eyebrow">About the book</p>
            <p>
              The book examines how conscious and unconscious patterns shape the
              way people understand themselves and choose to live.
            </p>
          </div>
        </section>
        <PlaceholderPanel
          eyebrow="Publication data"
          title="Verified book record required"
          items={[
            "Exact title, subtitle, authors, publisher, date, and ISBN",
            "Approved cover image and source rights",
            "Approved description, framework definitions, and excerpts",
            "Canonical purchase links and related content",
          ]}
        />
      </>
    );
  }

  return (
    <section className="route-directory section-shell">
      <SectionHeading
        eyebrow="Featured book"
        title="The Circle Blueprint"
        description="A framework for examining the patterns that shape a life through Independence, Power, Humility, and Purpose."
      />
      <LinkGrid
        label="Books"
        items={[
          {
            eyebrow: "Book",
            title: "The Circle Blueprint",
            description:
              "Explore the framework now; verified edition details and purchase links will be added from the approved bibliography.",
            href: "/books/circle-blueprint",
          },
        ]}
      />
    </section>
  );
}

function SuccessStoriesBody() {
  return (
    <>
      <section className="editorial-statement section-shell">
        <SectionHeading
          eyebrow="Proof standard"
          title="Client experiences, presented with context and permission."
          description="A useful client story is not a slogan. It explains the question a person brought to the work, what they experienced, and how they describe its value in their own words."
        />
        <div className="editorial-statement__aside">
          <p className="page-eyebrow">Featured story</p>
          <p>
            The first story will appear here when its wording, attribution,
            context, and media rights are approved.
          </p>
        </div>
      </section>
      <PlaceholderPanel
        eyebrow="Story collection"
        title="Client stories pending publication approval"
        items={[
          "Exact quote or video and publication permission",
          "Approved name, role, organization, portrait, and attribution",
          "Relevant program, context, date, and transcript",
          "Clear distinction between experience and promised outcome",
        ]}
      />
    </>
  );
}

function FormContext({ start }: { start: boolean }) {
  return (
    <section className="form-expectations section-shell">
      <SectionHeading
        eyebrow={start ? "Before you begin" : "Routing"}
        title={
          start
            ? "Begin with the question you want to understand more clearly."
            : "Share the context so your message can reach the right place."
        }
      />
      <div>
        <p className="page-eyebrow">What happens next</p>
        <p>
          {start
            ? "Your note should explain what feels unresolved, why this moment matters, and what you hope a clearer perspective might make possible. The final routing and scheduling steps will appear when the form integration is connected."
            : "Use this path for general, organizational, media, or non-Roadmap inquiries. Final response expectations and routing details will appear when the contact workflow is connected."}
        </p>
      </div>
    </section>
  );
}

function LegalBody({ title }: { title: string }) {
  return (
    <section className="legal-document section-shell">
      <SectionHeading
        eyebrow="Legal review required"
        title={`${title} policy pending legal approval`}
        description="This page will be completed after the site's production data practices and integrations receive qualified legal review."
      />
      <div>
        <p>
          No provisional terms are being published in place of reviewed legal
          text.
        </p>
      </div>
    </section>
  );
}

export function PageBody({ page }: { page: PageSpec }) {
  switch (page.path) {
    case "/roadmap":
      return <RoadmapOverview page={page} />;
    case "/roadmap/results":
      return <RoadmapResults />;
    case "/roadmap/faq":
      return <RoadmapFaq />;
    case "/work-with-jack":
      return <OfferHub />;
    case "/about":
      return <AboutBody page={page} />;
    case "/insights":
      return <InsightsLanding />;
    case "/insights/podcast":
      return <MediaLibrary kind="podcast" />;
    case "/insights/videos":
      return <MediaLibrary kind="video" />;
    case "/books":
      return <BooksBody circle={false} />;
    case "/books/circle-blueprint":
      return <BooksBody circle />;
    case "/success-stories":
      return <SuccessStoriesBody />;
    case "/start":
      return <FormContext start />;
    case "/contact":
      return <FormContext start={false} />;
    case "/privacy":
    case "/terms":
      return <LegalBody title={page.title} />;
    default:
      if (page.path.startsWith("/work-with-jack/")) {
        return <OfferDetail page={page} />;
      }
      if (page.path.startsWith("/insights/topics/")) {
        return <TopicContext page={page} />;
      }
      if (page.path === "/insights/articles") return null;
      return <PageSections sections={page.sections} />;
  }
}
