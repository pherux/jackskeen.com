import { notFound } from "next/navigation";
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
type Props = { searchParams: Promise<ArchiveSearch> };
export async function generateMetadata({ searchParams }: Props) {
  return archiveMetadata(await searchParams);
}
export default async function Page({ searchParams }: Props) {
  const query = archiveQuery(await searchParams);
  if (
    (Number.parseInt(query.page, 10) || 1) >
    Math.max(1, Math.ceil(selectInsights(query).length / pageSize))
  )
    notFound();
  return <InsightsPage query={query} />;
}
