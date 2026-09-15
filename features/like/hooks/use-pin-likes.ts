"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { likePinAction } from "../actions/like-pin";
import { unlikePinAction } from "../actions/unlike-pin";

type LikeEvent = {
  type: "updated";
  pinId: string;
  likeCount: number;
};

interface UsePinLikesOptions {
  pinId: string;
  initialIsLiked: boolean;
  initialLikeCount: number;
  currentUserId: string | null;
}

export function usePinLikes({
  pinId,
  initialIsLiked,
  initialLikeCount,
  currentUserId,
}: UsePinLikesOptions) {
  const [isLiked, setIsLiked] =
    useState(initialIsLiked);

  const [likeCount, setLikeCount] =
    useState(initialLikeCount);

  const [isPending, startTransition] =
    useTransition();

  const mutationPendingRef = useRef(false);

  useEffect(() => {
    const source = new EventSource(
      `/api/pin/${pinId}/likes/stream`,
    );

    function handleUpdate(event: MessageEvent) {
      try {
        const data = JSON.parse(
          event.data,
        ) as LikeEvent;

        if (
          data.pinId !== pinId ||
          mutationPendingRef.current
        ) {
          return;
        }

        setLikeCount(data.likeCount);
      } catch {
        // Ignore malformed events.
      }
    }

    source.addEventListener(
      "updated",
      handleUpdate,
    );

    return () => {
      source.removeEventListener(
        "updated",
        handleUpdate,
      );
      source.close();
    };
  }, [pinId]);

  function handleLike() {
    if (!currentUserId) {
      toast.error("Sign in to like pins.");
      return;
    }

    const nextIsLiked = !isLiked;
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    mutationPendingRef.current = true;

    setIsLiked(nextIsLiked);
    setLikeCount((count) =>
      nextIsLiked
        ? count + 1
        : Math.max(0, count - 1),
    );

    startTransition(async () => {
      const result = nextIsLiked
        ? await likePinAction({ pinId })
        : await unlikePinAction({ pinId });

      mutationPendingRef.current = false;

      if (!result.success) {
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);

        toast.error(
          result.error ??
            "Unable to update like.",
        );
      }
    });
  }

  return {
    isLiked,
    likeCount,
    isPending,
    handleLike,
  };
}