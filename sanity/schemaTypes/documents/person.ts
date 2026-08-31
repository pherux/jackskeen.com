import { defineArrayMember, defineField, defineType } from "sanity";

import { validAbsoluteUrl } from "../../lib/validation";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "professionalTitle", type: "string" }),
    defineField({
      name: "credentials",
      type: "array",
      description: "Use approved, verifiable credentials only.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "bio", type: "richText" }),
    defineField({ name: "portrait", type: "editorialImage" }),
    defineField({
      name: "alternativeImages",
      type: "array",
      of: [defineArrayMember({ type: "editorialImage" })],
    }),
    defineField({
      name: "socialProfiles",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({
      name: "sameAs",
      type: "array",
      description:
        "Authoritative identity/profile URLs used by structured data.",
      of: [
        defineArrayMember({
          type: "url",
          validation: (r) => r.custom(validAbsoluteUrl),
        }),
      ],
    }),
    defineField({
      name: "website",
      type: "url",
      validation: (r) => r.custom(validAbsoluteUrl),
    }),
    defineField({ name: "identityDescription", type: "text", rows: 3 }),
    defineField({
      name: "knowsAbout",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "professionalTitle", media: "portrait" },
  },
});
