"use client";

import { Search } from "lucide-react";

import type { SearchSuggestion } from "@/types/search";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  open: boolean;
  onSelect: (suggestion: SearchSuggestion) => void;
}

export function SearchSuggestions({
  suggestions,
  open,
  onSelect,
}: SearchSuggestionsProps) {
  if (!open || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
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
      ))}
    </div>
  );
}