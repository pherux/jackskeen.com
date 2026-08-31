import { defineArrayMember, defineField, defineType } from "sanity";

import {
  validAbsoluteUrl,
  validInternalOrAbsoluteUrl,
} from "../../lib/validation";

export const seo = defineType({
  name: "seo",
  title: "Search and social metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (r) => r.max(60).warning("Aim for 60 characters or fewer."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160).warning("Aim for 160 characters or fewer."),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Leave empty for the site's generated canonical URL.",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({
      name: "noIndex",
      title: "Exclude from search indexing",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "Do not follow links",
      type: "boolean",
      description:
        "Rarely needed. Use only for a documented search-policy reason.",
      initialValue: false,
    }),
    defineField({ name: "socialTitle", title: "Social title", type: "string" }),
    defineField({
      name: "socialDescription",
      title: "Social description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialImage",
      title: "Social image",
      type: "editorialImage",
    }),
  ],
});

export const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "decorative",
      title: "Decorative only",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the image's purpose. Leave blank only when marked decorative.",
      validation: (rule) =>
        rule.custom(
          (value, context) =>
            (context.parent as { decorative?: boolean })?.decorative ||
            Boolean(value?.trim()) ||
            "Alternative text is required unless the image is decorative.",
        ),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Credit", type: "string" }),
  ],
  validation: (rule) => rule.required(),
});

export const externalLink = defineType({
  name: "externalLink",
  title: "External link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (r) => r.required().custom(validAbsoluteUrl),
    }),
  ],
});

export const ctaLink = defineType({
  name: "ctaLink",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Destination",
      type: "string",
      validation: (r) => r.required().custom(validInternalOrAbsoluteUrl),
    }),
  ],
});

export const migrationMetadata = defineType({
  name: "migrationMetadata",
  title: "Legacy migration record",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "wordpressId", title: "WordPress ID", type: "number" }),
    defineField({
      name: "legacyUrl",
      title: "Legacy URL",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({
      name: "legacyCanonicalUrl",
      title: "Legacy canonical URL",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({ name: "legacyAuthor", type: "string" }),
    defineField({
      name: "legacyCategories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "legacyTags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "legacyFeaturedImageUrl",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({
      name: "migrationAction",
      type: "string",
      options: {
        list: [
          "KEEP",
          "UPDATE",
          "CONSOLIDATE",
          "REDIRECT",
          "REMOVE",
          "NOINDEX",
        ],
      },
    }),
    defineField({
      name: "manualReviewRequired",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "notes", type: "text", rows: 4 }),
  ],
});
