"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { toggleCommentLikeAction } from "../actions/toggle-comment-like";

interface CommentLikeButtonProps {
  commentId: string;
  initialLiked: boolean;
  initialCount: number;
  disabled?: boolean;
}

export function CommentLikeButton({
  commentId,
  initialLiked,
  initialCount,
  disabled = false,
}: CommentLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  async function handleToggle(event: React.MouseEvent) {
    event.stopPropagation();
    if (disabled || pending) return;

    // Optimistic update
    const nextLiked = !isLiked;
    const nextCount = nextLiked ? count + 1 : Math.max(0, count - 1);

    setIsLiked(nextLiked);
    setCount(nextCount);
    setPending(true);

    try {
      const result = await toggleCommentLikeAction(commentId);
      if (!result.success) {
        // Rollback
        setIsLiked(!nextLiked);
        setCount(count);
        toast.error(result.error ?? "Failed to like comment.");
      } else if (result.likeCount !== undefined && result.isLiked !== undefined) {
        setIsLiked(result.isLiked);
        setCount(result.likeCount);
      }
    } catch {
      // Rollback
      setIsLiked(!nextLiked);
      setCount(count);
      toast.error("Failed to like comment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      aria-label={isLiked ? "Unlike comment" : "Like comment"}
      className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors"
    >
      <Heart
        className={`size-3.5 transition-transform duration-150 ${
          isLiked
            ? "scale-110 fill-red-500 text-red-500"
            : "group-hover:scale-105"
        }`}
      />
      {count > 0 && (
        <span
          className={`text-[11px] tabular-nums ${
            isLiked ? "font-semibold text-red-500" : ""
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
