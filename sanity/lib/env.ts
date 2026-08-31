export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-31";
export const previewOrigin =
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN || "http://localhost:3000";

export const isSanityConfigured = projectId !== "missing-project-id";
