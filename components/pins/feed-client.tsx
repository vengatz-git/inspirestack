"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { PinGrid } from "./pin-grid";

import { PinGridSkeleton } from "@/components/skeletons/pin-grid-skeleton";
import { ErrorState } from "@/components/feedback/error-state";

import { useIntersection } from "@/hooks/use-intersection";

import type { PinWithProfile } from "@/types/pin-with-profile";

interface FeedClientProps {
  initialPins: PinWithProfile[];
  initialCursor: string | null;
  initialHasMore: boolean;
}

interface FeedResponse {
  success: boolean;
  data: {
    posts: PinWithProfile[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export function FeedClient({
  initialPins,
  initialCursor,
  initialHasMore,
}: FeedClientProps) {
  const [pins, setPins] = useState(initialPins);

  const [cursor, setCursor] = useState(initialCursor);

  const [hasMore, setHasMore] = useState(initialHasMore);

  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(false);

  const loadingRef = useRef(false);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setPins(initialPins);
    setCursor(initialCursor);
    setHasMore(initialHasMore);

    setError(false);
    setLoadingMore(false);

    loadingRef.current = false;

    abortRef.current?.abort();
  }, [initialPins, initialCursor, initialHasMore]);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    if (!cursor) return;

    if (loadingRef.current) return;

    loadingRef.current = true;

    setLoadingMore(true);

    setError(false);

    abortRef.current?.abort();

    const controller = new AbortController();

    abortRef.current = controller;

    try {
      const response = await fetch(
        `/api/posts?cursor=${encodeURIComponent(cursor)}`,
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load posts.");
      }

      const result: FeedResponse = await response.json();

      const newPins = result.data.posts;

      setPins((current) => {
        const ids = new Set(current.map((pin) => pin.id));

        const uniquePins = newPins.filter(
          (pin) => !ids.has(pin.id)
        );

        return [...current, ...uniquePins];
      });

      setCursor(result.data.nextCursor);

      setHasMore(result.data.hasMore);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      console.error(err);

      setError(true);
    } finally {
      loadingRef.current = false;

      setLoadingMore(false);
    }
  }, [cursor, hasMore]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sentinelRef = useIntersection(loadMore);

  return (
    <>
      <PinGrid pins={pins} />

      {error && (
        <div className="mt-10">
          <ErrorState
            title="Couldn't load more pins"
            description="Please try again."
          />
        </div>
      )}

      {loadingMore && (
        <div className="mt-8 space-y-4">
          <PinGridSkeleton count={8} />

          <p className="text-center text-sm text-muted-foreground">
            Loading more ideas...
          </p>
        </div>
      )}

      {!loadingMore && hasMore && (
        <div
          ref={sentinelRef}
          className="h-10"
        />
      )}

      {!hasMore && pins.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">
            🎉 You've reached the end.
          </p>
        </div>
      )}
    </>
  );
}