"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { removePinFromBoardAction } from "@/features/board/actions/remove-pin-from-board";
import { savePinToBoardAction } from "@/features/board/actions/save-pin-to-board";
import { removeSavedPinAction } from "@/features/saved/actions/remove-saved-pin";
import { toggleSavedPinAction } from "@/features/saved/actions/toggle-saved-pin";

interface PinCardSaveButtonProps {
  pinId: string;
  initialSaved?: boolean;
  boardId?: string | null;
  onSaved?: (saved: boolean) => void;
}

export function PinCardSaveButton({
  pinId,
  initialSaved = false,
  boardId = null,
  onSaved,
}: PinCardSaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    if (isPending) {
      return;
    }

    startTransition(async () => {
      const result = saved
        ? boardId
          ? await removePinFromBoardAction({
              boardId,
              pinId,
            })
          : await removeSavedPinAction({
              pinId,
            })
        : boardId
          ? await savePinToBoardAction({
              boardId,
              pinId,
            })
          : await toggleSavedPinAction({
              pinId,
            });

      if (!result.success) {
        toast.error(
          result.error ?? "Unable to update this Pin.",
        );
        return;
      }

      const nextSaved = !saved;

      setSaved(nextSaved);
      onSaved?.(nextSaved);
    });
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isPending}
      aria-pressed={saved}
      className={[
        "shrink-0 whitespace-nowrap rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors duration-200",
        "disabled:cursor-default disabled:opacity-80",
        saved
          ? "bg-black/60 hover:bg-black/70 active:bg-black/80"
          : "bg-red-600 hover:bg-red-700 active:bg-red-800",
      ].join(" ")}
    >
      {isPending
        ? saved
          ? "Removing..."
          : "Saving..."
        : saved
          ? "Saved"
          : "Save"}
    </button>
  );
}