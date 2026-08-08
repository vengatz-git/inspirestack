"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { removePinFromBoardAction } from "../actions/remove-pin-from-board";

type RemovePinFromBoardButtonProps = {
  boardId: string;
  pinId: string;
};

export function RemovePinFromBoardButton({
  boardId,
  pinId,
}: RemovePinFromBoardButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    const confirmed = window.confirm(
      "Remove this pin from the board?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await removePinFromBoardAction({
        boardId,
        pinId,
      });
    });
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleRemove}
      disabled={isPending}
      className="rounded-full bg-background/95 shadow-sm backdrop-blur-sm"
    >
      {isPending ? "Removing..." : "Remove"}
    </Button>
  );
}