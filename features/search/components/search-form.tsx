"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebouncedSearch } from "../hooks/use-debounced-search";
import { SearchInput } from "./search-input";
import { SearchSuggestions } from "./search-suggestions";

export function SearchForm() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

  return (
    <SearchFormContent
      key={currentQuery}
      currentQuery={currentQuery}
    />
  );
}

interface SearchFormContentProps {
  currentQuery: string;
}

function SearchFormContent({
  currentQuery,
}: SearchFormContentProps) {
  const router = useRouter();

  const [value, setValue] = useState(currentQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useDebouncedSearch(value, (debouncedValue) => {
    const trimmed = debouncedValue.trim();

    if (trimmed === currentQuery) {
      return;
    }

    router.push(
      trimmed
        ? `/search?query=${encodeURIComponent(trimmed)}`
        : "/search",
    );
  });

  function handleChange(newValue: string) {
    setValue(newValue);
    setShowSuggestions(true);
  }

  function handleSelect(suggestion: string) {
    setValue(suggestion);
    setShowSuggestions(false);

    router.push(
      `/search?query=${encodeURIComponent(suggestion)}`,
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmed = value.trim();

    setShowSuggestions(false);

    if (trimmed === currentQuery) {
      return;
    }

    router.push(
      trimmed
        ? `/search?query=${encodeURIComponent(trimmed)}`
        : "/search",
    );
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative"
    >
      <SearchInput
        value={value}
        onChange={handleChange}
      />

      {showSuggestions && (
        <SearchSuggestions
          query={value}
          onSelect={handleSelect}
        />
      )}
    </form>
  );
}