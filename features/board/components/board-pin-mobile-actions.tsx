"use client";

import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { removePinFromBoardAction } from "../actions/remove-pin-from-board";

interface BoardPinMobileActionsProps {
  boardId: string;
  pinId: string;
  onSuccess?: () => void;
}

export function BoardPinMobileActions({
  boardId,
  pinId,
  onSuccess,
}: BoardPinMobileActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleRemove() {
    setError(null);

    startTransition(async () => {
      const result = await removePinFromBoardAction({
        boardId,
        pinId,
      });

      if (!result.success) {
        setError(result.error ?? "Unable to remove pin.");
        return;
      }

      onSuccess?.();
    });
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More pin actions"
          className="flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm"
        >
          <MoreHorizontal className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={handleRemove}
          >
            {isPending ? "Removing..." : "Remove from board"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <p
          role="alert"
          className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-background p-2 text-xs text-destructive shadow-md"
        >
          {error}
        </p>
      )}
    </div>
  );
}