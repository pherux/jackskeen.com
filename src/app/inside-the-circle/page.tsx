import type { Metadata } from "next";
import { PodcastHub } from "@/components/podcast/podcast-pages";
export const metadata: Metadata = {
  title: "Inside the Circle | Roadmap Graduate Stories",
  description:
    "Meet 16 Roadmap graduates in conversation with Dr. Jack Skeen. Explore their perspectives on purpose, natural strengths, leadership, and life after achievement.",
  alternates: { canonical: "/inside-the-circle" },
  robots: {
    index: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
    follow: true,
  },
  openGraph: {
    title: "Inside the Circle — A fuller picture of success",
    description:
      "16 candid conversations with Roadmap graduates and Dr. Jack Skeen.",
    url: "/inside-the-circle",
    images: [
      { url: "/images/podcast/A6cs8lO1tSg.jpg", width: 1280, height: 720 },
    ],
  },
};
export default function Page() {
  return <PodcastHub />;
}
