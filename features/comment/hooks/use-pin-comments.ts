"use client";

import { useEffect, useState } from "react";

import type { CommentData } from "../types/comment";

interface UsePinCommentsProps {
  pinId: string;
  initialComments: CommentData[];
}

export function usePinComments({
  pinId,
  initialComments,
}: UsePinCommentsProps) {
  const [comments, setComments] =
    useState<CommentData[]>(initialComments);

  const [replyingTo, setReplyingTo] =
    useState<string | null>(null);

  /*
   * Keep local state synchronized with server-rendered
   * comments when the parent server tree refreshes.
   */
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  /*
   * Poll only the comments endpoint.
   *
   * This keeps realtime comment updates without refreshing
   * the entire Pin Details server tree.
   */
  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      try {
        const response = await fetch(
          `/api/pin/${pinId}/comments`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as unknown;
        const nextComments = deserializeComments(data);

        if (!isMounted) {
          return;
        }

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
      }
    }

    const interval = window.setInterval(
      fetchComments,
      3000,
    );

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [pinId]);

  /*
   * If the comment being replied to disappears,
   * cancel reply mode.
   */
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