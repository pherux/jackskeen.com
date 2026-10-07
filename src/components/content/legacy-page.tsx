import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/site/roadmap-pages";
import pages from "@/data/legacy-pages.json";

export function LegacyPage({ page }: { page: (typeof pages)[number] }) {
  return (
    <Frame>
      <article className="rm-container insight-article">
        <header className="insight-article-header">
          <Link href="/">Home</Link>
          <h1>{page.title}</h1>
        </header>
        <div className="insight-reading">
          {page.deferredSignup && (
            <p>
              Online signup is temporarily unavailable.{" "}
              <Link href="/contact">Contact Jack</Link> for information about
              this resource.
            </p>
          )}
          <div
            className="insight-prose"
            dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
          />
          {page.images.map((image, index) => (
            <figure key={`${image.src}-${index}`}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(max-width: 800px) 100vw, 740px"
              />
            </figure>
          ))}
        </div>
      </article>
    </Frame>
  );
}
