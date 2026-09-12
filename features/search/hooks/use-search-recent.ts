"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "inspirestack:recent-searches";
const MAX_RECENT_SEARCHES = 20;

export function useSearchRecent() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) return;

      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setRecentSearches(
          parsed
            .filter(
              (item): item is string =>
                typeof item === "string" && item.trim() !== "",
            )
            .slice(0, MAX_RECENT_SEARCHES),
        );
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveRecentSearch = useCallback((query: string) => {
    const normalized = query.trim();

    if (!normalized) return;

    setRecentSearches((current) => {
      const next = [
        normalized,
        ...current.filter(
          (item) =>
            item.toLowerCase() !== normalized.toLowerCase(),
        ),
      ].slice(0, MAX_RECENT_SEARCHES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches((current) => {
      const next = current.filter(
        (item) =>
          item.toLowerCase() !== query.toLowerCase(),
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  return {
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
  };
}