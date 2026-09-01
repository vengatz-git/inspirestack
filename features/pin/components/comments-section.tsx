"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { CommentForm } from "@/features/comment/components/comment-form";
import { CommentItem } from "@/features/comment/components/comment-item";
import type { CommentData } from "@/features/comment/types/comment";

interface CommentsSectionProps {
  pinId: string;
  comments: CommentData[];
  currentUserId: string | null;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export interface CommentsSectionHandle {
  focusInput: () => void;
}

export const CommentsSection = forwardRef<
  CommentsSectionHandle,
  CommentsSectionProps
>(function CommentsSection(
  { pinId, comments, currentUserId, isExpanded, onExpandedChange },
  ref,
) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus();
    },
  }));

  function handleReply(commentId: string) {
    setReplyingTo((current) => (current === commentId ? null : commentId));

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  const replyTarget = replyingTo
    ? comments.find((comment) => comment.id === replyingTo)
    : null;

  const replyToUsername = replyTarget?.author.username ?? "unknown";

  return (
    <section className="flex h-full min-h-0 flex-col">
      {comments.length > 0 ? (
        <button
          type="button"
          onClick={() => onExpandedChange(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex w-full shrink-0 items-center justify-between py-3 text-left"
        >
          <span className="text-lg font-semibold">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </span>

          <ChevronDown
            className={[
              "text-muted-foreground size-5 transition-transform",
              isExpanded ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>
      ) : null}

      {comments.length > 0 && isExpanded ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 py-2">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                pinId={pinId}
                currentUserId={currentUserId}
                replyingTo={replyingTo}
                onReply={handleReply}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-0 flex-1" />
      )}

      <div className="shrink-0 py-3">
        <CommentForm
          key={replyingTo ?? "comment"}
          pinId={pinId}
          parentId={replyingTo ?? undefined}
          replyToUsername={replyingTo ? replyToUsername : undefined}
          onCancel={() => setReplyingTo(null)}
          inputRef={inputRef}
        />
      </div>
    </section>
  );
});
