import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
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
    </Frame>
  );
}

export function StartRoadmapPage({ contact = false }: { contact?: boolean }) {
  return (
    <Frame>
      <section className="rm-container rm-page-intro rm-contact">
        <div>
          <p className="rm-eyebrow">
            {contact ? "Contact Jack" : "Start your Roadmap"}
          </p>
          <h1>
            Begin with
            <br />a conversation.
          </h1>
          <p className="rm-lead">
            You don’t need to have every answer. Bring the questions that matter
            to you, and explore whether The Roadmap is right for your next
            chapter.
          </p>
        </div>
        <div className="rm-contact-panel">
          <p className="rm-eyebrow">A more intentional next chapter</p>
          <h2>Find a time to talk with Jack.</h2>
          <p>Choose a convenient time in Jack’s calendar.</p>
          <a
            href={roadmapContact.scheduler}
            className="rm-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View available times <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <small>Scheduling opens in a new tab.</small>
          <div className="rm-contact-direct">
            <h3>Prefer to reach out directly?</h3>
            <a href={`mailto:${roadmapContact.email}`}>
              {roadmapContact.email}
            </a>
            <a href={`tel:${roadmapContact.phone}`}>
              {roadmapContact.phoneLabel}
            </a>
          </div>
        </div>
      </section>
      <RoadmapFaq />
    </Frame>
  );
}
