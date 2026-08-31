import type { StructureResolver } from "sanity/structure";

const singletonId = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("JackSkeen.com")
    .items([
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("article").title("Articles"),
              S.documentTypeListItem("podcastEpisode").title(
                "Podcast episodes",
              ),
              S.documentTypeListItem("video").title("Videos"),
              S.documentTypeListItem("topic").title("Topics"),
            ]),
        ),
      S.listItem()
        .title("Marketing content")
        .child(
          S.list()
            .title("Marketing content")
            .items([
              S.documentTypeListItem("page").title("Pages"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("book").title("Books"),
              S.documentTypeListItem("faq").title("FAQs"),
            ]),
        ),
      S.documentTypeListItem("person").title("People"),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .id(singletonId)
        .child(S.document().schemaType("siteSettings").documentId(singletonId)),
      S.documentTypeListItem("redirect").title("Redirects"),
    ]);
