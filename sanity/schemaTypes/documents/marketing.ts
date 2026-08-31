import { defineArrayMember, defineField, defineType } from "sanity";

import { noDuplicateReferences, validAbsoluteUrl } from "../../lib/validation";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  description:
    "Content foundation only. Page presentation is implemented separately.",
  fields: [
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
      name: "pageKind",
      type: "string",
      options: { list: ["standard", "offer", "roadmap", "contact", "legal"] },
      initialValue: "standard",
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "richText" }),
    defineField({ name: "heroImage", type: "editorialImage" }),
    defineField({ name: "primaryCta", type: "ctaLink" }),
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
            { type: "topic" },
          ],
        }),
      ],
      validation: (r) => r.custom(noDuplicateReferences),
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "migration", type: "migrationMetadata" }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 5,
      description:
        "Use only client-approved wording; do not paraphrase claims.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "story", title: "Long-form story", type: "richText" }),
    defineField({
      name: "attributionName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "attributionTitle", type: "string" }),
    defineField({ name: "attributionOrganization", type: "string" }),
    defineField({ name: "portrait", type: "editorialImage" }),
    defineField({
      name: "videoUrl",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({
      name: "program",
      type: "reference",
      to: [{ type: "page" }],
      options: { filter: "pageKind in ['offer', 'roadmap']" },
    }),
    defineField({
      name: "approvalStatus",
      type: "string",
      description:
        "Only approved testimonials are returned by production queries.",
      options: { list: ["pending", "approved", "revoked"], layout: "radio" },
      initialValue: "pending",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "approvedAt",
      type: "datetime",
      hidden: ({ parent }) => parent?.approvalStatus !== "approved",
      validation: (r) =>
        r.custom(
          (value, context) =>
            (context.parent as { approvalStatus?: string })?.approvalStatus !==
              "approved" ||
            Boolean(value) ||
            "Record the approval date.",
        ),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      validation: (r) =>
        r.custom(
          (value, context) =>
            !value ||
            (context.parent as { approvalStatus?: string })?.approvalStatus ===
              "approved" ||
            "A featured testimonial must be approved.",
        ),
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 100,
      validation: (r) => r.integer().min(0),
    }),
    defineField({
      name: "sourceNotes",
      type: "text",
      rows: 3,
      description:
        "Internal provenance/consent notes; never rendered publicly.",
    }),
    defineField({ name: "migration", type: "migrationMetadata" }),
  ],
  preview: {
    select: {
      title: "attributionName",
      subtitle: "approvalStatus",
      media: "portrait",
    },
  },
});

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "richText" }),
    defineField({
      name: "cover",
      type: "editorialImage",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      validation: (r) => r.required().min(1).custom(noDuplicateReferences),
    }),
    defineField({ name: "publicationDate", type: "date" }),
    defineField({ name: "isbn", title: "ISBN", type: "string" }),
    defineField({
      name: "purchaseLinks",
      type: "array",
      description: "Approved retailer/publisher links only.",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({
      name: "primaryTopic",
      type: "reference",
      to: [{ type: "topic" }],
    }),
    defineField({
      name: "relatedTopics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
      validation: (r) => r.custom(noDuplicateReferences),
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
            { type: "page" },
          ],
        }),
      ],
      validation: (r) => r.custom(noDuplicateReferences),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "richText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contexts",
      type: "array",
      description:
        "Stable editorial keys such as roadmap or executive-coaching.",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "relatedPages",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "page" }] })],
      validation: (r) => r.custom(noDuplicateReferences),
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 100,
      validation: (r) => r.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Editorial order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
