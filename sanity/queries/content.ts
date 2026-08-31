import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY =
  defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  ..., founder->{name, "slug": slug.current, professionalTitle, portrait, sameAs}
}`);

export const PERSON_BY_SLUG_QUERY =
  defineQuery(`*[_type == "person" && slug.current == $slug][0]{
  ..., "slug": slug.current
}`);

export const JACK_PROFILE_QUERY =
  defineQuery(`*[_type == "person" && slug.current == "jack-skeen"][0]{
  ..., "slug": slug.current
}`);

export const ARTICLE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  ..., "slug": slug.current, author->{name, "slug": slug.current, professionalTitle, portrait},
  primaryTopic->{title, "slug": slug.current}, secondaryTopics[]->{title, "slug": slug.current},
  relatedContent[]->{_type, _id, title, "slug": slug.current, summary, excerpt, featuredImage}
}`);

export const ARTICLES_QUERY =
  defineQuery(`*[_type == "article"] | order(publishedAt desc)[$offset...$limit]{
  _id, title, "slug": slug.current, excerpt, publishedAt, updatedAt, featuredImage,
  author->{name, "slug": slug.current}, primaryTopic->{title, "slug": slug.current}
}`);

export const ARTICLES_BY_TOPIC_QUERY =
  defineQuery(`*[_type == "article" && (primaryTopic->slug.current == $slug || $slug in secondaryTopics[]->slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, featuredImage,
  author->{name, "slug": slug.current}, primaryTopic->{title, "slug": slug.current}
}`);

export const FEATURED_ARTICLES_QUERY =
  defineQuery(`*[_type == "article" && featured == true] | order(publishedAt desc)[0...$limit]{
  _id, title, "slug": slug.current, excerpt, publishedAt, featuredImage,
  author->{name, "slug": slug.current}, primaryTopic->{title, "slug": slug.current}
}`);

export const TOPIC_BY_SLUG_QUERY =
  defineQuery(`*[_type == "topic" && slug.current == $slug][0]{
  ..., "slug": slug.current, relatedTopics[]->{title, "slug": slug.current},
  featuredContent[]->{_type, _id, title, "slug": slug.current, summary, excerpt, featuredImage}
}`);

export const TOPICS_QUERY = defineQuery(`*[_type == "topic"] | order(title asc){
  _id, title, "slug": slug.current, shortDescription, heroImage
}`);

export const PODCAST_EPISODE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "podcastEpisode" && slug.current == $slug][0]{
  ..., "slug": slug.current, author->{name, "slug": slug.current}, guests[]->{name, "slug": slug.current, professionalTitle, portrait},
  primaryTopic->{title, "slug": slug.current}, secondaryTopics[]->{title, "slug": slug.current}
}`);

export const PODCAST_EPISODES_QUERY =
  defineQuery(`*[_type == "podcastEpisode"] | order(publishedAt desc)[$offset...$limit]{
  _id, title, "slug": slug.current, summary, publishedAt, episodeNumber, duration, featuredImage,
  guests[]->{name, "slug": slug.current}, primaryTopic->{title, "slug": slug.current}
}`);

export const VIDEO_BY_SLUG_QUERY =
  defineQuery(`*[_type == "video" && slug.current == $slug][0]{
  ..., "slug": slug.current, author->{name, "slug": slug.current},
  primaryTopic->{title, "slug": slug.current}, secondaryTopics[]->{title, "slug": slug.current}
}`);

export const VIDEOS_QUERY =
  defineQuery(`*[_type == "video"] | order(publishedAt desc)[$offset...$limit]{
  _id, title, "slug": slug.current, summary, publishedAt, provider, duration, featuredImage,
  primaryTopic->{title, "slug": slug.current}
}`);

export const APPROVED_TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && approvalStatus == "approved"] | order(approvedAt desc){
  _id, quote, attributionName, attributionTitle, attributionOrganization, portrait, videoUrl,
  program->{title, "slug": slug.current, pageKind}
}`);

export const FEATURED_TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && approvalStatus == "approved" && featured == true] | order(approvedAt desc)[0...$limit]{
  _id, quote, attributionName, attributionTitle, attributionOrganization, portrait, videoUrl,
  program->{title, "slug": slug.current, pageKind}
}`);

export const BOOK_BY_SLUG_QUERY =
  defineQuery(`*[_type == "book" && slug.current == $slug][0]{
  ..., "slug": slug.current, authors[]->{name, "slug": slug.current, professionalTitle}, primaryTopic->{title, "slug": slug.current}
}`);

export const FAQS_BY_CONTEXT_QUERY =
  defineQuery(`*[_type == "faq" && $context in contexts] | order(order asc){
  _id, question, answer, contexts, relatedPages[]->{title, "slug": slug.current}
}`);

export const ACTIVE_REDIRECTS_QUERY = defineQuery(
  `*[_type == "redirect" && active == true]{source, destination, statusCode}`,
);

export const PAGE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ..., "slug": slug.current, relatedContent[]->{_type, _id, title, "slug": slug.current, summary, excerpt, featuredImage}
}`);
