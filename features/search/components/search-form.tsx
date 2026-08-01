"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebouncedSearch } from "../hooks/use-debounced-search";
import { SearchInput } from "./search-input";
import { SearchSuggestions } from "./search-suggestions";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

  const [value, setValue] = useState(currentQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Stay in sync if the URL changes externally (e.g. browser
  // back/forward). Does not itself trigger navigation.
  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  useDebouncedSearch(value, (debouncedValue) => {
    const trimmed = debouncedValue.trim();

    if (trimmed === currentQuery) {
      return;
    }

    router.push(
      trimmed ? `/search?query=${encodeURIComponent(trimmed)}` : "/search",
    );
  });

  function handleChange(newValue: string) {
    setValue(newValue);
    setShowSuggestions(true);
  }

  function handleSelect(suggestion: string) {
    setValue(suggestion);
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(suggestion)}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowSuggestions(false);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative">
      <SearchInput value={value} onChange={handleChange} />

      {showSuggestions && (
        <SearchSuggestions query={value} onSelect={handleSelect} />
      )}
    </form>
  );
}