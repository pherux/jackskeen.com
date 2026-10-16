import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  RoadmapHero,
  VideoTestimonials,
  RoadmapValue,
  RoadmapDocument,
  TextTestimonials,
  MeetJack,
  RoadmapFaq,
  RoadmapCta,
} from "@/components/sections/roadmap-sections";
import { roadmapContact } from "@/data/roadmap";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="roadmap-site">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function RoadmapHome({ detail = false }: { detail?: boolean }) {
  return (
    <Frame>
      <RoadmapHero detail={detail} />
      <VideoTestimonials />
      <RoadmapValue />
      <RoadmapDocument />
      <TextTestimonials />
      <MeetJack />
      <RoadmapFaq />
      <RoadmapCta />
      <NewsletterSection />
    </Frame>
  );
}

export function StartRoadmapPage({ contact = false }: { contact?: boolean }) {
  if (!contact) {
    return (
      <Frame>
        <CalendlyEmbed />
        <section
          className="rm-container rm-start-contact"
          aria-labelledby="direct-contact-title"
        >
          <div>
            <p className="rm-eyebrow">Another way to connect</p>
            <h2 id="direct-contact-title">Prefer to reach out directly?</h2>
            <p>
              You don’t need to have every answer. Bring the questions that
              matter to you.
            </p>
          </div>
          <div className="rm-contact-direct">
            <a href={`mailto:${roadmapContact.email}`}>
              {roadmapContact.email}
            </a>
            <a href={`tel:${roadmapContact.phone}`}>
              {roadmapContact.phoneLabel}
            </a>
          </div>
        </section>
        <RoadmapFaq />
      </Frame>
    );
  }

  return (
    <Frame>
      <section className="rm-container rm-contact-intro">
        <div>
          <p className="rm-eyebrow">Contact Jack</p>
          <h1>Begin with a conversation.</h1>
        </div>
        <p className="rm-lead">
          You don’t need to have every answer. Bring the questions that matter
          to you, and explore whether The Roadmap is right for your next
          chapter.
        </p>
      </section>
      <CalendlyEmbed contact />
      <section
        className="rm-container rm-start-contact"
        aria-labelledby="direct-contact-title"
      >
        <div>
          <p className="rm-eyebrow">Another way to connect</p>
          <h2 id="direct-contact-title">Prefer to reach out directly?</h2>
        </div>
        <div className="rm-contact-direct">
          <a href={`mailto:${roadmapContact.email}`}>{roadmapContact.email}</a>
          <a href={`tel:${roadmapContact.phone}`}>
            {roadmapContact.phoneLabel}
          </a>
        </div>
      </section>
      <RoadmapFaq />
    </Frame>
  );
}
