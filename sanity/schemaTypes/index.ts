import { article } from "./documents/article";
import { book, faq, page, testimonial } from "./documents/marketing";
import { podcastEpisode, video } from "./documents/media";
import { person } from "./documents/person";
import { redirect } from "./documents/redirect";
import { siteSettings } from "./documents/siteSettings";
import { topic } from "./documents/topic";
import {
  ctaLink,
  editorialImage,
  externalLink,
  migrationMetadata,
  seo,
} from "./objects/common";
import { callout, pullQuote, richText, videoEmbed } from "./objects/richText";

export const schemaTypes = [
  siteSettings,
  person,
  topic,
  article,
  podcastEpisode,
  video,
  testimonial,
  book,
  faq,
  redirect,
  page,
  seo,
  editorialImage,
  externalLink,
  ctaLink,
  migrationMetadata,
  richText,
  videoEmbed,
  pullQuote,
  callout,
];
