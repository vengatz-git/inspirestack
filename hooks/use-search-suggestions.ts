"use client";

import { useEffect, useRef, useState } from "react";

import type { SearchSuggestion } from "@/types/search";

interface UseSearchSuggestionsReturn {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
//   isOpen: boolean;
}

export function useSearchSuggestions(
  query: string
): UseSearchSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      abortControllerRef.current?.abort();
      setSuggestions([]);
    //   setIsOpen(false);
      setIsLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search suggestions.");
        }

        const data: SearchSuggestion[] = await response.json();

        setSuggestions(data);
        // setIsOpen(data.length > 0);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortControllerRef.current?.abort();
    };
  }, [query]);

    return {
        suggestions,
        isLoading,
    };
}