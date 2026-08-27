"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type {
  CommentData,
  CommentReplyData,
} from "../types/comment";

import { CommentDeleteButton } from "./comment-delete-button";
import { CommentForm } from "./comment-form";

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
  const username =
    comment.author.username ?? "unknown";

  const initials =
    comment.author.username?.charAt(0) ?? "?";

  return (
    <article className="group">
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${username}`}
          aria-label={`View ${username}'s profile`}
          className="shrink-0"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={comment.author.image ?? undefined}
            />
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
              ·{" "}
              {formatDistanceToNow(comment.createdAt, {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="text-muted-foreground mt-1 text-sm leading-5">
            {comment.content}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
            >
              {replyingTo === comment.id
                ? "Cancel reply"
                : "Reply"}
            </button>
          </div>

          {replyingTo === comment.id ? (
            <div className="mt-3">
              <CommentForm
                pinId={pinId}
                parentId={comment.id}
                onCancel={() => onReply(comment.id)}
              />
            </div>
          ) : null}

          {comment.replies.length > 0 ? (
            <div className="mt-4 space-y-4 border-l pl-4">
              {comment.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  pinId={pinId}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          ) : null}
        </div>

        {currentUserId === comment.author.id ? (
          <CommentDeleteButton
            commentId={comment.id}
            pinId={pinId}
          />
        ) : null}
      </div>
    </article>
  );
}

interface ReplyItemProps {
  reply: CommentReplyData;
  pinId: string;
  currentUserId: string | null;
}

function ReplyItem({
  reply,
  pinId,
  currentUserId,
}: ReplyItemProps) {
  const username =
    reply.author.username ?? "unknown";

  const initials =
    reply.author.username?.charAt(0) ?? "?";

  return (
    <div className="group flex items-start gap-3">
      <Link
        href={`/profile/${username}`}
        aria-label={`View ${username}'s profile`}
        className="shrink-0"
      >
        <Avatar className="size-7">
          <AvatarImage
            src={reply.author.image ?? undefined}
          />
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
            ·{" "}
            {formatDistanceToNow(reply.createdAt, {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className="text-muted-foreground mt-1 text-sm leading-5">
          {reply.content}
        </p>
      </div>

      {currentUserId === reply.author.id ? (
        <CommentDeleteButton
          commentId={reply.id}
          pinId={pinId}
        />
      ) : null}
    </div>
  );
}