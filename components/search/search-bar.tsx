"use client";

import { useEffect, useRef, useState } from "react";

import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useClickOutside } from "@/hooks/use-click-outside";
import { useSearchSuggestions } from "@/hooks/use-search-suggestions";

import { SearchSuggestions } from "@/components/search/search-suggestions";
import { Input } from "@/components/ui/input";
import type { SearchSuggestion } from "@/types/search";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") ?? "";

  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(currentQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const {
    suggestions,
    isLoading,
  } = useSearchSuggestions(query);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  useClickOutside({
    ref: containerRef,
    enabled: isOpen,
    onClickOutside: () => {
      setIsOpen(false);
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      if (pathname === "/search") {
        router.push("/search");
      }

      return;
    }

    setIsOpen(false);

    router.push(
      `/search?q=${encodeURIComponent(trimmed)}`
    );
  };

  const handleSuggestionSelect = (
    suggestion: SearchSuggestion
  ) => {
    setQuery(suggestion.title);
    setIsOpen(false);

    router.push(
      `/search?q=${encodeURIComponent(suggestion.title)}`
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        setHighlightedIndex((current) =>
          current < suggestions.length - 1
            ? current + 1
            : 0
        );
        break;

      case "ArrowUp":
        event.preventDefault();

        setHighlightedIndex((current) =>
          current > 0
            ? current - 1
            : suggestions.length - 1
        );
        break;

      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();

          handleSuggestionSelect(
            suggestions[highlightedIndex]
          );
        }
        break;

      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md"
    >
      <div
        ref={containerRef}
        className="relative"
      >
        {isLoading ? (
          <Loader2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}

        <Input
          value={query}
          onChange={(event) => {
            const value = event.target.value;

            setQuery(value);

            if (value.trim().length > 0) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (
              query.trim().length > 0 &&
              suggestions.length > 0
            ) {
              setIsOpen(true);
            }
          }}
          placeholder="Search inspiration..."
          className="pl-10"
          role="combobox"
          aria-label="Search inspiration"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? "search-suggestions" : undefined}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `search-suggestion-${highlightedIndex}`
              : undefined
          }
        />

        <SearchSuggestions
          suggestions={suggestions}
          open={isOpen}
          highlightedIndex={highlightedIndex}
          isLoading={isLoading}
          queryLength={query.trim().length}
          onHighlight={setHighlightedIndex}
          onSelect={handleSuggestionSelect}
        />
      </div>
    </form>
  );
}