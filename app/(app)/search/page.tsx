import { SearchForm } from "@/features/search/components/search-form";
import { SearchResults } from "@/features/search/components/search-results";

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  const normalizedQuery = query?.trim() ?? "";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>

          <p className="text-muted-foreground mt-2">
            Discover inspiration from across InspireStack.
          </p>
        </div>

        <SearchForm />
      </div>

      {normalizedQuery && (
        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Results for &quot;{normalizedQuery}&quot;
            </h2>
          </div>

          <SearchResults query={normalizedQuery} />
        </section>
      )}
    </main>
  );
}
