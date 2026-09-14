"use client";

import { useEffect, useRef, useState } from "react";

import type { CommentData } from "../types/comment";

interface UsePinCommentsProps {
  pinId: string;
  initialComments: CommentData[];
}

interface CommentStreamEvent {
  type: "connected" | "created" | "deleted";
  commentId?: string;
  pinId?: string;
}

export function usePinComments({
  pinId,
  initialComments,
}: UsePinCommentsProps) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const [prevInitialComments, setPrevInitialComments] =
    useState(initialComments);

  if (initialComments !== prevInitialComments) {
    setPrevInitialComments(initialComments);
    setComments(initialComments);
  }

  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [prevComments, setPrevComments] = useState(comments);

  if (comments !== prevComments) {
    setPrevComments(comments);

    if (replyingTo && !comments.some((comment) => comment.id === replyingTo)) {
      setReplyingTo(null);
    }
  }

  const isFetchingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let source: EventSource | null = null;

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
        const response = await fetch(`/api/pin/${pinId}/comments`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok || !isMounted) {
          return;
        }

        const data = (await response.json()) as unknown;

        const nextComments = deserializeComments(data);

        setComments((currentComments) => {
          const previousSerialized = JSON.stringify(currentComments);

          const nextSerialized = JSON.stringify(nextComments);

          if (previousSerialized === nextSerialized) {
            return currentComments;
          }

          return nextComments;
        });
      } catch {
        // Ignore transient comment refresh failures.
      } finally {
        isFetchingRef.current = false;
      }
    }

    function connect() {
      if (source) {
        return;
      }

      source = new EventSource(`/api/pin/${pinId}/comments/stream`);

      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as CommentStreamEvent;

          if (data.type === "created" || data.type === "deleted") {
            void fetchComments();
          }
        } catch {
          // Ignore malformed SSE events.
        }
      };

      source.onerror = () => {
        // EventSource automatically reconnects.
      };
    }

    function disconnect() {
      source?.close();
      source = null;
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        connect();
        void fetchComments();
      } else {
        disconnect();
      }
    }

    if (document.visibilityState === "visible") {
      connect();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      disconnect();

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pinId]);

  function handleReply(commentId: string) {
    setReplyingTo((current) => (current === commentId ? null : commentId));
  }

  function handleCancelReply() {
    setReplyingTo(null);
  }

  const replyTarget = replyingTo
    ? comments.find((comment) => comment.id === replyingTo)
    : null;

  const replyToUsername = replyTarget?.author.username ?? "unknown";

  return {
    comments,
    replyingTo,
    replyToUsername,
    handleReply,
    handleCancelReply,
  };
}

function deserializeComments(value: unknown): CommentData[] {
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
