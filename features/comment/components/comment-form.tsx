"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createCommentAction } from "../actions/create-comment";

interface CommentFormProps {
  pinId: string;
}

export function CommentForm({
  pinId,
}: CommentFormProps) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(
    null,
  );

  const [isPending, startTransition] =
    useTransition();

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
        content: trimmedContent,
      });

      if (!result.success) {
        setError(
          result.error ?? "Unable to add comment.",
        );
        return;
      }

      setContent("");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <textarea
        value={content}
        onChange={(event) => {
          setContent(event.target.value);

          if (error) {
            setError(null);
          }
        }}
        placeholder="Add a comment..."
        maxLength={1000}
        rows={3}
        disabled={isPending}
        aria-label="Comment"
        aria-invalid={error ? true : undefined}
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {error ? (
        <p
          role="alert"
          className="text-destructive text-sm"
        >
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">
          {content.length}/1000
        </span>

        <button
          type="submit"
          disabled={
            isPending || content.trim().length === 0
          }
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? "Posting..." : "Comment"}
        </button>
      </div>
    </form>
  );
}