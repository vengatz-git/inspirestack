"use client";

import { useState } from "react";
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

export function CommentsSection({
  pinId,
  comments,
  currentUserId,
  isExpanded,
  onExpandedChange,
}: CommentsSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  function handleReply(commentId: string) {
    setReplyingTo((current) =>
      current === commentId ? null : commentId,
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col border-t">
      <button
        type="button"
        onClick={() => onExpandedChange(!isExpanded)}
        aria-expanded={isExpanded}
        className="flex w-full shrink-0 items-center justify-between py-4 text-left"
      >
        <span className="flex items-baseline gap-1.5 text-lg font-semibold">
          <span>{comments.length}</span>
          <span>Comments</span>
        </span>

        <ChevronDown
          className={[
            "text-muted-foreground size-5 transition-transform",
            isExpanded ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isExpanded ? (
        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <p className="text-muted-foreground py-2 text-sm">
              No comments yet. Be the first to comment.
            </p>
          ) : (
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
          )}
        </div>
      ) : (
        <div className="min-h-0 flex-1" />
      )}

      <div className="shrink-0 border-t py-3">
        <CommentForm pinId={pinId} />
      </div>
    </section>
  );
}