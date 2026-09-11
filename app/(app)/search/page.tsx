import { SearchResults } from "@/features/search/components/search-results";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { query } = await searchParams;
  const normalizedQuery = query?.trim() ?? "";

  return <SearchResults query={normalizedQuery} />;
}