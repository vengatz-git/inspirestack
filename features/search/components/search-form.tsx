"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebouncedSearch } from "../hooks/use-debounced-search";
import { useSearchRecent } from "../hooks/use-search-recent";
import { getSearchSuggestions } from "../actions/get-search-suggestions";

import { SearchInput } from "./search-input";
import { SearchSuggestions } from "./search-suggestions";

export function SearchForm() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

  return <SearchFormContent key={currentQuery} currentQuery={currentQuery} />;
}

interface SearchFormContentProps {
  currentQuery: string;
}

function SearchFormContent({ currentQuery }: SearchFormContentProps) {
  const router = useRouter();
  const listboxId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(currentQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [previewValue, setPreviewValue] = useState("");

  const { recentSearches, saveRecentSearch, removeRecentSearch } =
    useSearchRecent();

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetSelection = useCallback(() => {
    setActiveIndex(-1);
    setHoveredIndex(-1);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPreviewValue("");
    resetSelection();
  }, [resetSelection]);

  const handleClear = useCallback(() => {
    setValue("");
    setPreviewValue("");
    setSuggestions([]);
    resetSelection();
  }, [resetSelection]);

  const fetchSuggestions = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const requestId = ++requestIdRef.current;

      if (!trimmed) {
        setSuggestions([]);
        resetSelection();
        return;
      }

      getSearchSuggestions(trimmed).then((results) => {
        if (requestId !== requestIdRef.current) {
          return;
        }

        setSuggestions(results);
        resetSelection();
      });
    },
    [resetSelection],
  );

  useDebouncedSearch(value, fetchSuggestions);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    // Use click listener (not pointerdown) so overlays are not unmounted mid-gesture,
    // which would otherwise cause the browser to dispatch the subsequent click to underlying links/cards
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, handleClose]);

  function performSearch(query: string) {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    saveRecentSearch(trimmed);

    setOpen(false);
    setPreviewValue("");
    resetSelection();
    setSuggestions([]);

    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    setPreviewValue("");
    setOpen(true);
    resetSelection();

    if (!newValue.trim()) {
      setSuggestions([]);
    }
  }

  function handleFocus() {
    setOpen(true);
    resetSelection();

    if (value.trim()) {
      fetchSuggestions(value);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const items = value.trim() ? suggestions : recentSearches;

    if (event.key === "Escape") {
      if (!open) {
        return;
      }

      event.preventDefault();
      handleClose();
      event.currentTarget.blur();
      return;
    }

    if (!open || items.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) => {
        const next = current < items.length - 1 ? current + 1 : 0;

        if (!value.trim() && recentSearches[next]) {
          setPreviewValue(recentSearches[next]);
        }

        return next;
      });

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) => {
        const next = current > 0 ? current - 1 : items.length - 1;

        if (!value.trim() && recentSearches[next]) {
          setPreviewValue(recentSearches[next]);
        }

        return next;
      });

      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && items[activeIndex]) {
      event.preventDefault();
      performSearch(items[activeIndex]);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const items = value.trim() ? suggestions : recentSearches;

    if (activeIndex >= 0 && items[activeIndex]) {
      performSearch(items[activeIndex]);
      return;
    }

    performSearch(value || previewValue);
  }

  function handleSelect(query: string) {
    setValue(query);
    performSearch(query);
  }

  const items = value.trim() ? suggestions : recentSearches;

  const activeDescendant =
    activeIndex >= 0 && items[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  const showRecent = value.trim() === "";

  return (
    <>
      {open &&
        mounted &&
        createPortal(
          <div
            role="presentation"
            aria-hidden="true"
            className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150 cursor-pointer select-none"
            onPointerDown={(event) => {
              // Stop propagation so document-level listeners do not tear down the backdrop mid-gesture
              event.stopPropagation();
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onTouchStart={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              // Consume the click completely on the backdrop
              event.preventDefault();
              event.stopPropagation();
              handleClose();
            }}
          />,
          document.body,
        )}

      <div ref={containerRef} className="relative z-50 w-full">
        <form role="search" autoComplete="off" onSubmit={handleSubmit}>
          <SearchInput
            value={value || previewValue}
            onChange={handleChange}
            onClear={handleClear}
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
            recent={showRecent}
            listboxId={listboxId}
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            onSelect={handleSelect}
            onActiveIndexChange={setActiveIndex}
            onHoverIndexChange={setHoveredIndex}
            onRemoveRecentSearch={showRecent ? removeRecentSearch : undefined}
            onClose={handleClose}
          />
        )}
      </div>
    </>
  );
}
