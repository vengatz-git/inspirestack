"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteCommentAction } from "../actions/delete-comment";

interface CommentDeleteButtonProps {
  commentId: string;
  pinId: string;
}

export function CommentDeleteButton({
  commentId,
  pinId,
}: CommentDeleteButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteCommentAction(
        commentId,
        pinId,
      );

      if (!result.success) {
        return;
      }

      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete comment"
      className="text-muted-foreground hover:text-destructive shrink-0 rounded-md p-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-50"
    >
      <Trash2 className="size-4" />
    </button>
  );
}