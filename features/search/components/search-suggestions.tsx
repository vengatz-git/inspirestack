"use client";

import { useRef, useState } from "react";

import { useDebouncedSearch } from "../hooks/use-debounced-search";
import { getSearchSuggestions } from "../services/get-search-suggestions";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export function SearchSuggestions({
  query,
  onSelect,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const latestQueryRef = useRef("");

  useDebouncedSearch(query, (debouncedQuery) => {
    const trimmed = debouncedQuery.trim();

    latestQueryRef.current = trimmed;

    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    getSearchSuggestions({ query: trimmed }).then((results) => {
      // Ignore stale responses if a newer query has since been debounced.
      if (latestQueryRef.current === trimmed) {
        setSuggestions(results);
      }
    });
  });

  if (query.trim() === "" || suggestions.length === 0) {
    return null;
  }

  return (
    <ul
      role="listbox"
      aria-label="Search suggestions"
      className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border bg-popover shadow-md"
    >
      {suggestions.map((suggestion) => (
        <li key={suggestion} role="option">
          <button
            type="button"
            onClick={() => onSelect(suggestion)}
            className="w-full px-4 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
          >
            {suggestion}
          </button>
        </li>
      ))}
    </ul>
  );
}