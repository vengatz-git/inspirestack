"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebouncedSearch } from "../hooks/use-debounced-search";
import { getSearchSuggestions } from "../services/get-search-suggestions";
import { SearchInput } from "./search-input";
import { SearchSuggestions } from "./search-suggestions";

const RECENT_SEARCHES_KEY = "inspirestack:recent-searches";
const MAX_RECENT_SEARCHES = 20;

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
  const listboxId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  const [value, setValue] = useState(currentQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(
    [],
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        RECENT_SEARCHES_KEY,
      );

      if (!stored) {
        return;
      }

      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setRecentSearches(
          parsed
            .filter(
              (item): item is string =>
                typeof item === "string" &&
                item.trim() !== "",
            )
            .slice(0, MAX_RECENT_SEARCHES),
        );
      }
    } catch {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
        setActiveIndex(-1);
        setHoveredIndex(-1);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, []);

  const fetchSuggestions = useCallback((query: string) => {
    const trimmed = query.trim();
    const requestId = ++requestIdRef.current;

    if (!trimmed) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    getSearchSuggestions({ query: trimmed }).then(
      (results) => {
        if (requestId !== requestIdRef.current) {
          return;
        }

        setSuggestions(results);
        setActiveIndex(-1);
      },
    );
  }, []);

  useDebouncedSearch(value, fetchSuggestions);

  function saveRecentSearch(query: string) {
    const normalized = query.trim();

    if (!normalized) {
      return;
    }

    const nextSearches = [
      normalized,
      ...recentSearches.filter(
        (search) =>
          search.toLowerCase() !==
          normalized.toLowerCase(),
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(nextSearches);

    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(nextSearches),
    );
  }

  function removeRecentSearch(query: string) {
    const nextSearches = recentSearches.filter(
      (search) =>
        search.toLowerCase() !==
        query.toLowerCase(),
    );

    setRecentSearches(nextSearches);

    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(nextSearches),
    );

    if (
      currentQuery.trim().toLowerCase() ===
      query.trim().toLowerCase()
    ) {
      router.replace("/search");
    }
  }

  function performSearch(query: string) {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    saveRecentSearch(trimmed);

    setOpen(false);
    setActiveIndex(-1);
    setHoveredIndex(-1);
    setSuggestions([]);

    router.push(
      `/search?query=${encodeURIComponent(trimmed)}`,
    );
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    setOpen(true);
    setActiveIndex(-1);
    setHoveredIndex(-1);

    if (!newValue.trim()) {
      setSuggestions([]);
    }
  }

  function handleFocus() {
    setOpen(true);
    setActiveIndex(-1);
    setHoveredIndex(-1);

    if (value.trim()) {
      fetchSuggestions(value);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    const items = value.trim()
      ? suggestions
      : recentSearches;

    if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        setHoveredIndex(-1);
      }

      return;
    }

    if (!open || items.length === 0) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        setActiveIndex((current) =>
          current < items.length - 1
            ? current + 1
            : 0,
        );
        break;

      case "ArrowUp":
        event.preventDefault();

        setActiveIndex((current) =>
          current > 0
            ? current - 1
            : items.length - 1,
        );
        break;

      case "Enter":
        if (activeIndex >= 0 && items[activeIndex]) {
          event.preventDefault();
          performSearch(items[activeIndex]);
        }
        break;
    }
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const items = value.trim()
      ? suggestions
      : recentSearches;

    if (activeIndex >= 0 && items[activeIndex]) {
      performSearch(items[activeIndex]);
      return;
    }

    performSearch(value);
  }

  function handleSelect(query: string) {
    setValue(query);
    performSearch(query);
  }

  const items = value.trim()
    ? suggestions
    : recentSearches;

  const activeDescendant =
    activeIndex >= 0 && items[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <form
        role="search"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <SearchInput
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          expanded={open}
          listboxId={listboxId}
          activeDescendant={activeDescendant}
        />
      </form>

      {open && (
        <SearchSuggestions
          suggestions={items}
          recent={value.trim() === ""}
          listboxId={listboxId}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          onSelect={handleSelect}
          onActiveIndexChange={setActiveIndex}
          onHoverIndexChange={setHoveredIndex}
          onRemoveRecentSearch={
            value.trim() === ""
              ? removeRecentSearch
              : undefined
          }
        />
      )}
    </div>
  );
}