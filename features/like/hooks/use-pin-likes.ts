"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const mutationPendingRef = useRef(false);
  const pendingRealtimeUpdateRef = useRef(false);

  useEffect(() => {
    if (mutationPendingRef.current) {
      return;
    }

    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [pinId, initialIsLiked, initialLikeCount]);

  useEffect(() => {
    const source = new EventSource(
      `/api/pin/${pinId}/likes/stream`,
    );

    function handleUpdate(event: MessageEvent) {
      try {
        const data = JSON.parse(
          event.data,
        ) as LikeEvent;

        if (data.pinId !== pinId) {
          return;
        }

        if (mutationPendingRef.current) {
          pendingRealtimeUpdateRef.current = true;
        } else {
          setLikeCount(data.likeCount);
        }
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
    if (mutationPendingRef.current) {
      return;
    }

    if (!currentUserId) {
      toast.error("Sign in to like pins.");
      return;
    }

    const nextIsLiked = !isLiked;
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    mutationPendingRef.current = true;
    pendingRealtimeUpdateRef.current = false;

    setIsLiked(nextIsLiked);
    setLikeCount((count) =>
      nextIsLiked
        ? count + 1
        : Math.max(0, count - 1),
    );

    startTransition(async () => {
      try {
        const result = nextIsLiked
          ? await likePinAction({ pinId })
          : await unlikePinAction({ pinId });

        if (result.success) {
          setIsLiked(result.data?.isLiked ?? nextIsLiked);
          setLikeCount(result.data?.likeCount ?? previousLikeCount);
          return;
        }

        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);

        toast.error(
          result.error ??
            "Unable to update like.",
        );
      } catch {
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);
        toast.error("Unable to update like. Please try again.");
      } finally {
        mutationPendingRef.current = false;

        if (pendingRealtimeUpdateRef.current) {
          pendingRealtimeUpdateRef.current = false;
          router.refresh();
        }
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