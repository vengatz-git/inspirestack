"use client";

import { useRouter } from "next/navigation";
import { Send, X } from "lucide-react";
import { useState, useTransition, type Ref } from "react";

import { createCommentAction } from "../actions/create-comment";

interface CommentFormProps {
  pinId: string;
  parentId?: string;
  replyToUsername?: string;
  onCancel?: () => void;
  inputRef?: Ref<HTMLInputElement>;
}

export function CommentForm({
  pinId,
  parentId,
  replyToUsername,
  onCancel,
  inputRef,
}: CommentFormProps) {
  const router = useRouter();

  const isReplying = Boolean(parentId);

  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError(
        isReplying ? "Reply cannot be empty." : "Comment cannot be empty.",
      );
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
        setError(result.error ?? "Unable to add comment.");
        return;
      }

      setContent("");
      onCancel?.();
      router.refresh();
    });
  }

  function handleCancel() {
    if (isPending) {
      return;
    }

    setContent("");
    setError(null);
    onCancel?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {isReplying ? (
        <div className="bg-muted/50 flex items-center justify-between rounded-lg px-3 py-2">
          <p className="text-muted-foreground text-xs">
            Replying to{" "}
            <span className="text-foreground font-medium">
              @{replyToUsername ?? "unknown"}
            </span>
          </p>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            aria-label="Cancel reply"
            className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}

      <div className="border-input bg-background focus-within:ring-ring flex min-h-11 items-center rounded-full border px-3 py-1 transition-shadow focus-within:ring-2">
        <input
          ref={inputRef}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);

            if (error) {
              setError(null);
            }
          }}
          placeholder={
            isReplying ? "Write a reply..." : "Add a comment..."
          }
          maxLength={1000}
          disabled={isPending}
          aria-label={isReplying ? "Reply" : "Comment"}
          aria-invalid={error ? true : undefined}
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent px-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isPending || content.trim().length === 0}
          aria-label={isReplying ? "Post reply" : "Post comment"}
          className="text-primary hover:bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </div>

      {error ? (
        <p role="alert" className="text-destructive px-2 text-xs">
          {error}
        </p>
      ) : null}
    </form>
  );
}