"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { ProfilePinGrid } from "./profile-pin-grid";

interface ProfileSavedPinsClientProps {
  username: string;
  initialPins: PinCardData[];
  initialCursor: string | null;
}

export function ProfileSavedPinsClient({
  username,
  initialPins,
  initialCursor,
}: ProfileSavedPinsClientProps) {
  const [pins, setPins] = useState(initialPins);
  const [nextCursor, setNextCursor] = useState(
    initialCursor,
  );
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(
    null,
  );

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !nextCursor) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(
        `/api/profile/${encodeURIComponent(username)}/saved?cursor=${encodeURIComponent(nextCursor)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load more saved pins.");
      }

      const data: {
        pins: PinCardData[];
        nextCursor: string | null;
      } = await response.json();

      setPins((currentPins) => [
        ...currentPins,
        ...data.pins,
      ]);

      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error(
        "Failed to load saved profile pins:",
        error,
      );
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [nextCursor, username]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !nextCursor) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      {
        rootMargin: "600px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, nextCursor]);

  return (
    <>
      <ProfilePinGrid pins={pins} />

      {nextCursor && (
        <div
          ref={loadMoreRef}
          className="flex min-h-20 items-center justify-center"
        >
          {loading && (
            <p className="text-muted-foreground text-sm">
              Loading more saved pins...
            </p>
          )}
        </div>
      )}
    </>
  );
}