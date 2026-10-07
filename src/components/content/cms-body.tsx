import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";

function safeLink(href: string | undefined) {
  return href && (/^https?:\/\//i.test(href) || /^\/(?!\/)/.test(href))
    ? href
    : undefined;
}

export function CmsBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <PortableText
      value={body}
      components={{
        marks: {
          externalLink: ({ value, children }) => (
            <a href={safeLink(value?.href)}>{children}</a>
          ),
          internalLink: ({ value, children }) => (
            <a href={safeLink(value?.href)}>{children}</a>
          ),
        },
        types: {
          editorialImage: ({ value }) => (
            <figure>
              <Image
                src={urlForImage(value).width(1200).height(800).url()}
                width={1200}
                height={800}
                sizes="(max-width: 800px) 100vw, 740px"
                alt={value.decorative ? "" : value.alt || ""}
              />
              {value.caption && <figcaption>{value.caption}</figcaption>}
            </figure>
          ),
          pullQuote: ({ value }) => (
            <blockquote>
              <p>{value.quote}</p>
              {value.attribution && <cite>{value.attribution}</cite>}
            </blockquote>
          ),
          callout: ({ value }) => (
            <aside>
              <CmsBody body={value.content || []} />
            </aside>
          ),
          videoEmbed: ({ value }) => (
            <p>
              <a href={safeLink(value.url)}>{value.title}</a>
            </p>
          ),
        },
      }}
    />
  );
}
