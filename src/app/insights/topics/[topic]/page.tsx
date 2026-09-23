import { notFound } from "next/navigation";
import { topics } from "@/data/site-pages";
import {
  InsightsPage,
  pageSize,
  selectInsights,
} from "@/components/content/insights-pages";
import {
  archiveMetadata,
  archiveQuery,
  type ArchiveSearch,
} from "@/lib/insights-metadata";
type Props = {
  params: Promise<{ topic: string }>;
  searchParams: Promise<ArchiveSearch>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}
export async function generateMetadata({ params, searchParams }: Props) {
  return archiveMetadata(await searchParams, (await params).topic);
}
export default async function Page({ params, searchParams }: Props) {
  const { topic: slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const query = archiveQuery(await searchParams);
  if (
    (Number.parseInt(query.page, 10) || 1) >
    Math.max(1, Math.ceil(selectInsights(query, topic.title).length / pageSize))
  )
    notFound();
  return <InsightsPage query={query} topicSlug={slug} />;
}
