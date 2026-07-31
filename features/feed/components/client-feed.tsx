"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { FeedGrid } from "./feed-grid";

import type { FeedResult } from "../types/feed";
import { FeedSkeletonGrid } from "./feed-skeleton-grid";

interface ClientFeedProps {
  initialFeed: FeedResult;
}

export function ClientFeed({ initialFeed }: ClientFeedProps) {
  const [pins, setPins] = useState(initialFeed.pins);
  const [nextCursor, setNextCursor] = useState(initialFeed.nextCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialFeed.nextCursor !== null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadMorePins = useCallback(async () => {
    if (loadingRef.current || !hasMore || !nextCursor) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(
        `/api/feed?cursor=${encodeURIComponent(nextCursor)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load feed.");
      }

      const feed: FeedResult = await response.json();

      setPins((prev) => [...prev, ...feed.pins]);
      setNextCursor(feed.nextCursor);
      setHasMore(feed.nextCursor !== null);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, nextCursor]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }

        void loadMorePins();
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadMorePins]);
  return (
    <>
      <FeedGrid pins={pins} />

      <div ref={loadMoreRef} className="h-10" />

      {loading && <FeedSkeletonGrid count={6} />}
    </>
  );
}
