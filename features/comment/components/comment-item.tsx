"use client";

import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { CommentData } from "../types/comment";

import { CommentDeleteButton } from "./comment-delete-button";
import { CommentLikeButton } from "./comment-like-button";

type CommentReplyData = CommentData["replies"][number];

interface CommentItemProps {
  comment: CommentData;
  pinId: string;
  currentUserId: string | null;
  replyingTo: string | null;
  onReply: (commentId: string) => void;
}

export function CommentItem({
  comment,
  pinId,
  currentUserId,
  replyingTo,
  onReply,
}: CommentItemProps) {
  const username = comment.author.username ?? "unknown";
  const initials = comment.author.username?.charAt(0) ?? "?";

  const isReplying = replyingTo === comment.id;
  const isOwner = currentUserId === comment.author.id;

  return (
    <article>
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${username}`}
          aria-label={`View ${username}'s profile`}
          className="shrink-0"
        >
          <Avatar className="size-8">
            <AvatarImage src={comment.author.image ?? undefined} />
            <AvatarFallback className="text-xs font-semibold">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <Link
              href={`/profile/${username}`}
              className="truncate text-sm font-semibold hover:underline"
            >
              {username}
            </Link>

            <span className="text-muted-foreground shrink-0 text-xs">
              · {formatCommentTime(comment.createdAt)}
            </span>
          </div>

          <p className="text-muted-foreground mt-1 text-sm leading-5">
            {comment.content}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <CommentLikeButton
              commentId={comment.id}
              initialLiked={comment.isLiked ?? false}
              initialCount={comment.likeCount ?? 0}
              disabled={!currentUserId}
            />

            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="text-muted-foreground hover:text-foreground rounded-md px-1 py-0.5 text-xs font-medium transition-colors"
            >
              {isReplying ? "Cancel" : "Reply"}
            </button>

            {isOwner ? (
              <CommentDeleteButton commentId={comment.id} />
            ) : null}
          </div>

          {comment.replies.length > 0 ? (
            <CommentReplies
              replies={comment.replies}
              pinId={pinId}
              currentUserId={currentUserId}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

interface CommentRepliesProps {
  replies: CommentReplyData[];
  pinId: string;
  currentUserId: string | null;
}

function CommentReplies({
  replies,
  pinId,
  currentUserId,
}: CommentRepliesProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReplies = showAll ? replies : replies.slice(0, 2);
  const remainingCount = replies.length - 2;

  return (
    <div className="mt-3 space-y-3 pl-4 border-l">
      {displayedReplies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          pinId={pinId}
          currentUserId={currentUserId}
        />
      ))}

      {replies.length > 2 && (
        <>
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-muted-foreground hover:text-foreground mt-2 text-xs font-medium transition-colors"
            >
              View {remainingCount} more {remainingCount === 1 ? "reply" : "replies"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="text-muted-foreground hover:text-foreground mt-3 text-xs font-medium transition-colors"
            >
              View less
            </button>
          )}
        </>
      )}
    </div>
  );
}

interface ReplyItemProps {
  reply: CommentReplyData;
  pinId: string;
  currentUserId: string | null;
}

function ReplyItem({
  reply,
  currentUserId,
}: ReplyItemProps) {
  const username = reply.author.username ?? "unknown";
  const initials = reply.author.username?.charAt(0) ?? "?";

  const isOwner = currentUserId === reply.author.id;

  return (
    <div className="flex items-start gap-3">
      <Link
        href={`/profile/${username}`}
        aria-label={`View ${username}'s profile`}
        className="shrink-0"
      >
        <Avatar className="size-7">
          <AvatarImage src={reply.author.image ?? undefined} />
          <AvatarFallback className="text-[10px] font-semibold">
            {initials.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <Link
            href={`/profile/${username}`}
            className="truncate text-xs font-semibold hover:underline"
          >
            {username}
          </Link>

          <span className="text-muted-foreground shrink-0 text-[11px]">
            · {formatCommentTime(reply.createdAt)}
          </span>
        </div>

        <p className="text-muted-foreground mt-1 text-sm leading-5">
          {reply.content}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <CommentLikeButton
            commentId={reply.id}
            initialLiked={reply.isLiked ?? false}
            initialCount={reply.likeCount ?? 0}
            disabled={!currentUserId}
          />

          {isOwner ? (
            <CommentDeleteButton commentId={reply.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function formatCommentTime(date: Date) {
  const distance = formatDistanceToNowStrict(date, {
    addSuffix: false,
  });

  const match = distance.match(
    /^(\d+)\s+(second|minute|hour|day|week|month|year)/,
  );

  if (!match) {
    return distance;
  }

  const [, value, unit] = match;

  const suffix: Record<string, string> = {
    second: "s",
    minute: "m",
    hour: "h",
    day: "d",
    week: "w",
    month: "mo",
    year: "y",
  };

  return `${value}${suffix[unit]}`;
}
