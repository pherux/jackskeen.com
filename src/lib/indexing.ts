import type { Metadata } from "next";

export const canonicalOrigin = "https://jackskeen.com";

// A copied production variable must never open a Vercel preview to crawlers.
export function siteIsIndexable() {
  return (
    process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production")
  );
}

// Other strategic pages still contain editorial/legal placeholders.
export const launchPages = [
  "/",
  "/roadmap",
  "/about",
  "/success-stories",
  "/start",
  "/contact",
  "/insights",
  "/inside-the-circle",
];

export function pageRobots(eligible = true): Metadata["robots"] {
  return { index: siteIsIndexable() && eligible, follow: true };
}
