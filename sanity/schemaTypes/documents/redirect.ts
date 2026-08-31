import { defineField, defineType } from "sanity";

import {
  redirectDestinationDiffers,
  uniqueRedirectSource,
  validInternalOrAbsoluteUrl,
  validRedirectPath,
} from "../../lib/validation";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      type: "string",
      description: "Exact legacy path, including any trailing slash policy.",
      validation: (r) =>
        r.required().custom(validRedirectPath).custom(uniqueRedirectSource),
    }),
    defineField({
      name: "destination",
      type: "string",
      description: "Never point unrelated removed content at the homepage.",
      validation: (r) =>
        r
          .required()
          .custom(validInternalOrAbsoluteUrl)
          .custom(redirectDestinationDiffers),
    }),
    defineField({
      name: "statusCode",
      type: "number",
      options: {
        list: [
          { title: "301 Permanent", value: 301 },
          { title: "302 Temporary", value: 302 },
          { title: "307 Temporary", value: 307 },
          { title: "308 Permanent", value: 308 },
        ],
      },
      initialValue: 301,
      validation: (r) => r.required(),
    }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({
      name: "migrationReason",
      type: "string",
      options: {
        list: ["URL changed", "Consolidated", "Legacy alias", "Temporary"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "notes", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "source", subtitle: "destination" } },
});
