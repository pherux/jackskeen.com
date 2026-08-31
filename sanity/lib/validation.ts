import type { ValidationContext } from "sanity";

const absoluteUrl = /^https?:\/\/[^\s]+$/i;
const internalPath = /^\/(?!\/)[^\s]*$/;

export const validAbsoluteUrl = (value?: string) =>
  !value || absoluteUrl.test(value) || "Enter a complete http(s) URL.";

export const validInternalOrAbsoluteUrl = (value?: string) =>
  !value ||
  absoluteUrl.test(value) ||
  internalPath.test(value) ||
  "Enter a root-relative path or complete http(s) URL.";

export const validRedirectPath = (value?: string) =>
  !value ||
  internalPath.test(value) ||
  "Use a root-relative path beginning with /.";

export const uniqueRedirectSource = async (
  source: string | undefined,
  context: ValidationContext,
) => {
  if (!source) return true;
  const document = context.document;
  const id = document?._id?.replace(/^drafts\./, "");
  const client = context.getClient({ apiVersion: "2026-08-31" });
  const count = (await client.fetch(
    "count(*[_type == 'redirect' && source == $source && !(_id in [$draftId, $publishedId])])",
    { source, draftId: `drafts.${id}`, publishedId: id },
  )) as number;
  return count === 0 || "Another redirect already uses this source path.";
};

export const noDuplicateReferences = (
  references?: Array<{ _ref?: string }>,
) => {
  if (!references) return true;
  const ids = references.map((item) => item._ref).filter(Boolean);
  return new Set(ids).size === ids.length || "Remove duplicate references.";
};

export const excludesPrimaryReference = (
  references: Array<{ _ref?: string }> | undefined,
  context: ValidationContext,
) => {
  const primaryId = (
    context.document?.primaryTopic as { _ref?: string } | undefined
  )?._ref;
  return (
    !primaryId ||
    !references?.some(({ _ref }) => _ref === primaryId) ||
    "The primary topic cannot also be a secondary topic."
  );
};

export const redirectDestinationDiffers = (
  destination: string | undefined,
  context: ValidationContext,
) =>
  !destination ||
  destination !== context.document?.source ||
  "Source and destination must be different.";

export const validVideoUrl = (value?: string) =>
  !value ||
  /^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)\//i.test(
    value,
  ) ||
  "Use a complete YouTube or Vimeo URL.";
