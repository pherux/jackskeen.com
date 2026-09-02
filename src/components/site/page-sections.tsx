import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PageSection } from "@/data/site-pages";

export function PageSections({ sections }: { sections: PageSection[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="page-sections section-shell" aria-label="Page sections">
      {sections.map((section, index) => (
        <article className="page-section" key={`${section.title}-${index}`}>
          <p className="page-eyebrow">{section.eyebrow ?? `0${index + 1}`}</p>
          <h2>{section.title}</h2>
          <p>
            {section.note ??
              "This section will be completed when its supporting source material is available."}
          </p>
        </article>
      ))}
    </section>
  );
}

export function PageCta() {
  return (
    <section className="page-cta" aria-labelledby="page-cta-heading">
      <div className="page-cta__inner section-shell">
        <p className="page-eyebrow">Start Your Roadmap</p>
        <h2 id="page-cta-heading">See your next chapter more clearly.</h2>
        <p>
          Start with a conversation about what feels unresolved and what you
          want to understand.
        </p>
        <Link className="button button--primary page-cta__link" href="/start">
          <span>Start Your Roadmap</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
