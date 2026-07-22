"use client";

import { Search } from "lucide-react";

import type { SearchSuggestion } from "@/types/search";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  open: boolean;
  highlightedIndex: number;
  isLoading: boolean;
  queryLength: number;
  onSelect: (suggestion: SearchSuggestion) => void;
  onHighlight: (index: number) => void;
}

export function SearchSuggestions({
  suggestions,
  open,
  highlightedIndex,
  isLoading,
  queryLength,
  onSelect,
  onHighlight,
}: SearchSuggestionsProps) {
  if (!open) {
    return null;
  }

  const showEmptyState =
    !isLoading &&
    suggestions.length === 0 &&
    queryLength >= 2;

  return (
    <div 
      id="search-suggestions" 
      role="listbox"
      className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl"
      onMouseLeave={() => onHighlight(-1)}
    >
      {showEmptyState ? (
        <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
          <Search className="h-5 w-5 text-muted-foreground" />

          <p className="text-sm font-medium">
            No suggestions found
          </p>

          <p className="text-xs text-muted-foreground">
            Try a different keyword.
          </p>
        </div>
      ) : (
        suggestions.map((suggestion, index) => (
          <button
              key={suggestion.id}
              id={`search-suggestion-${index}`}
              type="button"
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseEnter={() => onHighlight(index)}
              onClick={() => onSelect(suggestion)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                highlightedIndex === index
                  ? "bg-muted"
                  : "hover:bg-muted"
              }`}
            >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {suggestion.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {suggestion.category}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
}