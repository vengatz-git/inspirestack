"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

import { removePinFromBoardAction } from "../actions/remove-pin-from-board";

type RemovePinFromBoardButtonProps = {
  boardId: string;
  pinId: string;
  onSuccess?: () => void;
};

export function RemovePinFromBoardButton({
  boardId,
  pinId,
  onSuccess,
}: RemovePinFromBoardButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleRemove() {
    const confirmed = window.confirm(
      "Remove this pin from the board?",
    );

    if (!confirmed) {
      return;
    }

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