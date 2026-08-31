import { defineArrayMember, defineField, defineType } from "sanity";

import {
  excludesPrimaryReference,
  noDuplicateReferences,
} from "../../lib/validation";

export const article = defineType({
  name: "article",
  title: "Article",
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
      description: "Preserve the legacy slug whenever practical.",
      options: { source: "title", maxLength: 120 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "richText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "person" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      description: "Migration must retain the original publication date.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({ name: "featuredImage", type: "editorialImage" }),
    defineField({
      name: "primaryTopic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "secondaryTopics",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "topic" }],
          options: { disableNew: true },
        }),
      ],
      validation: (r) =>
        r.custom(noDuplicateReferences).custom(excludesPrimaryReference),
    }),
    defineField({
      name: "relatedContent",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "article" },
            { type: "podcastEpisode" },
            { type: "video" },
            { type: "book" },
            { type: "page" },
          ],
        }),
      ],
      validation: (r) => r.max(8).custom(noDuplicateReferences),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "migration", type: "migrationMetadata" }),
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});
