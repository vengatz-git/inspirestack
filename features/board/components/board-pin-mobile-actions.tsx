"use client";

import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";

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
}

export function BoardPinMobileActions({
  boardId,
  pinId,
}: BoardPinMobileActionsProps) {
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
  );
}