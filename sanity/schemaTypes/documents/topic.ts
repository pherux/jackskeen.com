import { defineArrayMember, defineField, defineType } from "sanity";

import { noDuplicateReferences } from "../../lib/validation";

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "introduction", type: "richText" }),
    defineField({ name: "heroImage", type: "editorialImage" }),
    defineField({
      name: "featuredContent",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "article" },
            { type: "podcastEpisode" },
            { type: "video" },
            { type: "book" },
          ],
        }),
      ],
      validation: (r) => r.max(8).custom(noDuplicateReferences),
    }),
    defineField({
      name: "relatedTopics",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "topic" }],
          options: { disableNew: true },
        }),
      ],
      validation: (r) => r.custom(noDuplicateReferences),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
