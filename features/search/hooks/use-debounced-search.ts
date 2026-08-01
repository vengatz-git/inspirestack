"use client";

import { useEffect, useRef } from "react";

export function useDebouncedSearch(
  query: string,
  callback: (query: string) => void,
  delay: number = 300,
): void {
  const callbackRef = useRef(callback);

  // Keep the latest callback without re-triggering the timer effect
  // below — callers can pass a new closure every render.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);
}