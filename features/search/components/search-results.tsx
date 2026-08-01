import { FeedGrid } from "@/features/feed/components/feed-grid";

import { searchPins } from "../services/search-pins";

interface SearchResultsProps {
  query: string;
}

export async function SearchResults({ query }: SearchResultsProps) {
  if (!query) {
    return null;
  }

  const pins = await searchPins({ query });

  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm text-muted-foreground">
          Try a different search term.
        </p>
      </div>
    );
  }

  return <FeedGrid pins={pins} />;
}