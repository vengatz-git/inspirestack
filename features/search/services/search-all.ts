import { searchPins } from "./search-pins";
import { searchUsers } from "./search-users";

import type { SearchResultsData } from "../types/search";

interface SearchAllOptions {
  query: string;
}

export async function searchAll({
  query,
}: SearchAllOptions): Promise<SearchResultsData> {
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      users: [],
      pins: [],
    };
  }

  const [users, pins] = await Promise.all([
    searchUsers({ query: trimmed }),
    searchPins({ query: trimmed }),
  ]);

  return {
    users,
    pins,
  };
}