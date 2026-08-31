import { defineArrayMember, defineField, defineType } from "sanity";

import {
  excludesPrimaryReference,
  noDuplicateReferences,
  validAbsoluteUrl,
  validVideoUrl,
} from "../../lib/validation";

const editorialFields = [
  defineField({
    name: "title",
    type: "string",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "slug",
    type: "slug",
    options: { source: "title", maxLength: 120 },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "summary",
    type: "text",
    rows: 3,
    validation: (r) => r.required(),
  }),
  defineField({
    name: "publishedAt",
    type: "datetime",
    validation: (r) => r.required(),
  }),
  defineField({ name: "author", type: "reference", to: [{ type: "person" }] }),
  defineField({
    name: "primaryTopic",
    type: "reference",
    to: [{ type: "topic" }],
    validation: (r) => r.required(),
  }),
  defineField({
    name: "secondaryTopics",
    type: "array",
    of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    validation: (r) =>
      r.custom(noDuplicateReferences).custom(excludesPrimaryReference),
  }),
  defineField({ name: "featuredImage", type: "editorialImage" }),
  defineField({ name: "featured", type: "boolean", initialValue: false }),
  defineField({ name: "seo", type: "seo" }),
  defineField({ name: "migration", type: "migrationMetadata" }),
];

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Podcast episode",
  type: "document",
  fields: [
    ...editorialFields,
    defineField({
      name: "episodeNumber",
      type: "number",
      validation: (r) => r.integer().positive(),
    }),
    defineField({
      name: "duration",
      type: "string",
      description: "Human-readable duration, for example 42:15.",
    }),
    defineField({
      name: "guests",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      validation: (r) => r.custom(noDuplicateReferences),
    }),
    defineField({
      name: "guestNotes",
      type: "text",
      description: "For guests who do not need a reusable person record.",
    }),
    defineField({
      name: "audioUrl",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({
      name: "platformLinks",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      validation: (r) => r.custom(validVideoUrl),
    }),
    defineField({
      name: "keyIdeas",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "transcript", type: "richText" }),
    defineField({ name: "showNotes", type: "richText" }),
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
      validation: (r) => r.custom(noDuplicateReferences),
    }),
  ],
});

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    ...editorialFields,
    defineField({
      name: "provider",
      type: "string",
      options: { list: ["youtube", "vimeo", "other"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      validation: (r) => r.required().custom(validVideoUrl),
    }),
    defineField({ name: "providerVideoId", type: "string" }),
    defineField({ name: "duration", type: "string" }),
    defineField({
      name: "keyTakeaways",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "transcript", type: "richText" }),
    defineField({ name: "notes", type: "richText" }),
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
      validation: (r) => r.custom(noDuplicateReferences),
    }),
  ],
});
