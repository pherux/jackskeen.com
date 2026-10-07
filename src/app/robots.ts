import type { MetadataRoute } from "next";
import { canonicalOrigin, siteIsIndexable } from "@/lib/indexing";

const siteUrl = canonicalOrigin;

export default function robots(): MetadataRoute.Robots {
  if (!siteIsIndexable()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
