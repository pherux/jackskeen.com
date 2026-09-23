import type { Metadata } from "next";
import { RoadmapHome } from "@/components/site/roadmap-pages";

export const metadata: Metadata = {
  title: "The Roadmap | Clarity for Your Next Chapter | Jack Skeen",
  description:
    "Discover The Roadmap with Jack Skeen. A clearer understanding of your strengths, priorities, and next chapter—for accomplished leaders choosing what comes next.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <RoadmapHome />;
}
