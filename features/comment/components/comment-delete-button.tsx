"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        containerRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [isOpen]);

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteCommentAction(
        commentId,
        pinId,
      );

      if (!result.success) {
        return;
      }

      setIsOpen(false);
      router.refresh();
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Comment options"
        aria-expanded={isOpen}
        className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center rounded-md transition-colors"
      >
        <MoreHorizontal className="size-3.5" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="bg-popover text-popover-foreground absolute left-0 top-full z-30 mt-1 min-w-20 rounded-md border p-1 shadow-md"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive hover:bg-destructive/10 flex w-full items-center rounded-sm px-2 py-1.5 text-left text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      ) : null}
    </div>
  );
}