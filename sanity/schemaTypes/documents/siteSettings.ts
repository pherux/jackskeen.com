import { defineArrayMember, defineField, defineType } from "sanity";

import { validAbsoluteUrl } from "../../lib/validation";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteUrl",
      type: "url",
      validation: (r) => r.required().custom(validAbsoluteUrl),
    }),
    defineField({ name: "logo", type: "editorialImage" }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      validation: (r) => r.required(),
    }),
    defineField({ name: "defaultSocialImage", type: "editorialImage" }),
    defineField({
      name: "primaryNavigation",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
    defineField({
      name: "footerNavigation",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
    defineField({ name: "footerContent", type: "richText" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({ name: "contactEmail", type: "email" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({
      name: "socialProfiles",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({ name: "organizationName", type: "string" }),
    defineField({ name: "organizationDescription", type: "text", rows: 3 }),
    defineField({ name: "organizationLogo", type: "editorialImage" }),
    defineField({
      name: "founder",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "footerCopyright",
      type: "string",
      description: "Do not include a year; the frontend supplies it.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
