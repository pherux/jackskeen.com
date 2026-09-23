import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PodcastGuestPage } from "@/components/podcast/podcast-pages";
import { podcastEpisodes, episodePath } from "@/data/podcast";
export const dynamicParams = false;
export function generateStaticParams() {
  return podcastEpisodes.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = podcastEpisodes.find((item) => item.slug === slug);
  if (!episode) return {};
  return {
    title: `${episode.name} | Roadmap Graduate Story`,
    description: episode.summary,
    alternates: { canonical: episodePath(episode) },
    robots: {
      index: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
      follow: true,
    },
    openGraph: {
      title: `${episode.name}: ${episode.headline}`,
      description: episode.summary,
      url: episodePath(episode),
      type: "article",
      publishedTime: episode.publishedAt,
      images: [
        {
          url: episode.thumbnail,
          width: 1280,
          height: 720,
          alt: `${episode.name} in conversation with Dr. Jack Skeen`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${episode.name} | Inside the Circle`,
      description: episode.summary,
      images: [episode.thumbnail],
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const episode = podcastEpisodes.find((item) => item.slug === slug);
  if (!episode) notFound();
  return <PodcastGuestPage episode={episode} />;
}
