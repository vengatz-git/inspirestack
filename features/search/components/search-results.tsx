import { searchAll } from "../services/search-all";

import { FeedGrid } from "@/features/feed/components/feed-grid";

import { SearchUserResult } from "./search-user-result";

interface SearchResultsProps {
  query: string;
}

export async function SearchResults({
  query,
}: SearchResultsProps) {
  if (!query) {
    return null;
  }

  const { users, pins } = await searchAll({
    query,
  });

  if (users.length === 0 && pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium">
          No results found
        </p>

        <p className="text-muted-foreground text-sm">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {users.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold">
            People
          </h2>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <SearchUserResult
                key={user.id}
                user={user}
              />
            ))}
          </div>
        </section>
      )}

      {pins.length > 0 && (
        <section>
          {users.length > 0 && (
            <h2 className="mb-4 text-sm font-semibold">
              Pins
            </h2>
          )}

          <FeedGrid pins={pins} />
        </section>
      )}
    </div>
  );
}