import { defineArrayMember, defineField, defineType } from "sanity";

import { validAbsoluteUrl } from "../../lib/validation";

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "externalLink",
            title: "External link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (r) => r.required().custom(validAbsoluteUrl),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
          defineArrayMember({
            name: "internalLink",
            title: "Internal link",
            type: "object",
            fields: [
              defineField({
                name: "reference",
                type: "reference",
                to: [
                  { type: "page" },
                  { type: "article" },
                  { type: "topic" },
                  { type: "podcastEpisode" },
                  { type: "video" },
                  { type: "book" },
                ],
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "editorialImage" }),
    defineArrayMember({ type: "videoEmbed" }),
    defineArrayMember({ type: "pullQuote" }),
    defineArrayMember({ type: "callout" }),
  ],
});

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video embed",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      type: "string",
      options: { list: ["youtube", "vimeo"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      description: "Only approved YouTube or Vimeo URLs are supported.",
      validation: (r) => r.required().custom(validAbsoluteUrl),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "attribution", type: "string" }),
  ],
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      type: "string",
      options: { list: ["note", "important"] },
      initialValue: "note",
    }),
    defineField({
      name: "content",
      type: "richText",
      validation: (r) => r.required(),
    }),
  ],
});
