import { defineDocuments, defineLocations } from "sanity/presentation";

const documentTypes = [
  "article",
  "page",
  "topic",
  "podcastEpisode",
  "video",
  "book",
];

export const resolve = {
  mainDocuments: defineDocuments(
    documentTypes.map((type) => ({
      route: "/:slug",
      filter: `_type == "${type}" && slug.current == $slug`,
    })),
  ),
  locations: {
    article: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Article", href: `/${doc?.slug || ""}` },
        ],
      }),
    }),
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Page", href: `/${doc?.slug || ""}` },
        ],
      }),
    }),
    topic: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Topic",
            href: `/insights/topics/${doc?.slug || ""}`,
          },
        ],
      }),
    }),
    podcastEpisode: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Podcast",
            href: `/insights/podcast/${doc?.slug || ""}`,
          },
        ],
      }),
    }),
    video: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Video",
            href: `/insights/videos/${doc?.slug || ""}`,
          },
        ],
      }),
    }),
    book: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Book", href: `/books/${doc?.slug || ""}` },
        ],
      }),
    }),
  },
};
