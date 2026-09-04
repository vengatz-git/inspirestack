"use client";

import { useEffect, useRef, useState } from "react";

import type { CommentData } from "../types/comment";

interface UsePinCommentsProps {
  pinId: string;
  initialComments: CommentData[];
}

const POLL_INTERVAL = 10_000;

export function usePinComments({
  pinId,
  initialComments,
}: UsePinCommentsProps) {
  const [comments, setComments] =
    useState<CommentData[]>(initialComments);

  const [replyingTo, setReplyingTo] =
    useState<string | null>(null);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    let isMounted = true;
    let intervalId: number | null = null;

    async function fetchComments() {
      if (
        !isMounted ||
        document.visibilityState !== "visible" ||
        isFetchingRef.current
      ) {
        return;
      }

      isFetchingRef.current = true;

      try {
        const response = await fetch(
          `/api/pin/${pinId}/comments`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok || !isMounted) {
          return;
        }

        const data = (await response.json()) as unknown;
        const nextComments = deserializeComments(data);

        setComments((currentComments) => {
          const previousSerialized =
            JSON.stringify(currentComments);

          const nextSerialized =
            JSON.stringify(nextComments);

          if (previousSerialized === nextSerialized) {
            return currentComments;
          }

          return nextComments;
        });
      } catch {
        // Ignore transient polling failures.
      } finally {
        isFetchingRef.current = false;
      }
    }

    function startPolling() {
      if (intervalId !== null) {
        return;
      }

      void fetchComments();

      intervalId = window.setInterval(
        fetchComments,
        POLL_INTERVAL,
      );
    }

    function stopPolling() {
      if (intervalId === null) {
        return;
      }

      window.clearInterval(intervalId);
      intervalId = null;
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
      }
    }

    if (document.visibilityState === "visible") {
      startPolling();
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      isMounted = false;
      stopPolling();
    };
  }, [pinId]);

  useEffect(() => {
    if (!replyingTo) {
      return;
    }

    const replyTargetExists = comments.some(
      (comment) => comment.id === replyingTo,
    );

    if (!replyTargetExists) {
      setReplyingTo(null);
    }
  }, [comments, replyingTo]);

  function handleReply(commentId: string) {
    setReplyingTo((current) =>
      current === commentId ? null : commentId,
    );
  }

  function handleCancelReply() {
    setReplyingTo(null);
  }

  const replyTarget = replyingTo
    ? comments.find(
        (comment) => comment.id === replyingTo,
      )
    : null;

  const replyToUsername =
    replyTarget?.author.username ?? "unknown";

  return {
    comments,
    replyingTo,
    replyToUsername,
    handleReply,
    handleCancelReply,
  };
}

function deserializeComments(
  value: unknown,
): CommentData[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((comment) => {
    const item = comment as CommentData;

    return {
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      replies: deserializeComments(item.replies),
    };
  });
}