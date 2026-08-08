"use client";

import { useTransition } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { removePinFromBoardAction } from "../actions/remove-pin-from-board";

interface BoardPinActionsProps {
  boardId: string;
  pinId: string;
}

export function BoardPinActions({
  boardId,
  pinId,
}: BoardPinActionsProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      await removePinFromBoardAction({
        boardId,
        pinId,
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Pin actions"
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
  );
}