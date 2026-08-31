import Image from "next/image";

import type { PageSpec } from "@/data/site-pages";

import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

export function PageHero({
  page,
  breadcrumbs,
}: {
  page: PageSpec;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <Breadcrumbs items={breadcrumbs} />
        <p className="page-eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span className="accent-rule" aria-hidden="true" />
        <p className="page-hero__description">{page.description}</p>
      </div>
      {page.image ? (
        <div className="page-hero__media">
          <Image
            src={page.image}
            alt={
              page.kind === "about"
                ? "Jack Skeen"
                : "Jack Skeen in conversation"
            }
            fill
            priority
            sizes="(max-width: 767px) 100vw, 48vw"
          />
        </div>
      ) : (
        <div className="page-hero__geometry" aria-hidden="true" />
      )}
    </section>
  );
}
