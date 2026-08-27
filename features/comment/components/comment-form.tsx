"use client";

import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";

import { createCommentAction } from "../actions/create-comment";

interface CommentFormProps {
  pinId: string;
  parentId?: string;
  onCancel?: () => void;
}

export function CommentForm({
  pinId,
  parentId,
  onCancel,
}: CommentFormProps) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Comment cannot be empty.");
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await createCommentAction({
        pinId,
        parentId,
        content: trimmedContent,
      });

      if (!result.success) {
        setError(
          result.error ?? "Unable to add comment.",
        );
        return;
      }

      setContent("");
      onCancel?.();
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <div className="border-input bg-background focus-within:ring-ring flex min-h-11 items-center rounded-full border px-3 py-1 transition-shadow focus-within:ring-2">
        <input
          value={content}
          onChange={(event) => {
            setContent(event.target.value);

            if (error) {
              setError(null);
            }
          }}
          placeholder={
            parentId
              ? "Write a reply..."
              : "Add a comment..."
          }
          maxLength={1000}
          disabled={isPending}
          aria-label={
            parentId ? "Reply" : "Comment"
          }
          aria-invalid={error ? true : undefined}
          className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={
            isPending ||
            content.trim().length === 0
          }
          aria-label={
            parentId
              ? "Post reply"
              : "Post comment"
          }
          className="text-primary hover:bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="text-destructive px-2 text-xs"
        >
          {error}
        </p>
      ) : null}

      {parentId && onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="text-muted-foreground hover:text-foreground px-2 text-xs font-medium"
        >
          Cancel reply
        </button>
      ) : null}
    </form>
  );
}