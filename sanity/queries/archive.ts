import { defineQuery } from "next-sanity";

export const ARCHIVE_QUERY =
  defineQuery(`*[_type == "article"] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, body[]{...,
    markDefs[]{..., "href": select(
      _type != "internalLink" => href,
      reference->_type == "topic" => "/insights/topics/" + reference->slug.current,
      reference->_type == "book" => "/books/" + reference->slug.current,
      reference->_type == "podcastEpisode" => "/inside-the-circle/" + reference->slug.current,
      reference->_type in ["article", "page"] => "/" + reference->slug.current
    )}
  }, publishedAt, updatedAt,
  "author": author->name, "topic": primaryTopic->title, seo,
  "wordpressId": migration.wordpressId,
  "image": featuredImage {alt, caption, "src": asset->url,
    "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}
}`);
