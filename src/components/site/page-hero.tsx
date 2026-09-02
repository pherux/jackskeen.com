import Image from "next/image";

import type { PageSpec } from "@/data/site-pages";

import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

function heroImageFor(page: PageSpec) {
  if (page.image) return page.image;
  if (page.path.startsWith("/roadmap"))
    return "/images/jack-skeen-coaching.jpg";
  if (page.path.startsWith("/work-with-jack"))
    return "/images/jack-skeen-office.jpg";
  if (page.path === "/success-stories")
    return "/images/jack-skeen-coaching.jpg";
  if (page.path === "/contact" || page.path === "/start") {
    return "/images/jack-skeen-office.jpg";
  }
  return undefined;
}

export function PageHero({
  page,
  breadcrumbs,
}: {
  page: PageSpec;
  breadcrumbs: BreadcrumbItem[];
}) {
  const heroImage = heroImageFor(page);
  const breadcrumbLabels = breadcrumbs
    .filter((item) => item.href)
    .map((item) => item.label.toLocaleLowerCase());
  const showEyebrow =
    page.eyebrow.toLocaleLowerCase() !== page.title.toLocaleLowerCase() &&
    !breadcrumbLabels.includes(page.eyebrow.toLocaleLowerCase());

  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <Breadcrumbs items={breadcrumbs.filter((item) => item.href)} />
        {showEyebrow ? <p className="page-eyebrow">{page.eyebrow}</p> : null}
        <h1>{page.title}</h1>
        <span className="accent-rule" aria-hidden="true" />
        <p className="page-hero__description">{page.description}</p>
      </div>
      {heroImage ? (
        <div className="page-hero__media">
          <Image
            src={heroImage}
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
