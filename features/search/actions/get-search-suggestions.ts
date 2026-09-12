"use server";

import { getSearchSuggestions as getSuggestions } from "../services/get-search-suggestions";

export async function getSearchSuggestions(query: string) {
  return getSuggestions({ query });
}