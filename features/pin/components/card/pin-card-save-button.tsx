"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { removePinFromBoardAction } from "@/features/board/actions/remove-pin-from-board";
import { savePinToBoardAction } from "@/features/board/actions/save-pin-to-board";
import { removeSavedPinAction } from "@/features/saved/actions/remove-saved-pin";
import { toggleSavedPinAction } from "@/features/saved/actions/toggle-saved-pin";

type PendingAction = "saving" | "removing" | null;

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
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const isBusy = pendingAction !== null;

  async function handleSave() {
    if (isBusy) {
      return;
    }

    const action = saved ? "removing" : "saving";

    setPendingAction(action);

    try {
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
        toast.error(result.error ?? "Unable to update this Pin.");
        return;
      }

      const nextSaved = !saved;

      setSaved(nextSaved);
      onSaved?.(nextSaved);
    } finally {
      setPendingAction(null);
    }
  }

  const buttonLooksSaved =
    pendingAction === "removing"
      ? true
      : pendingAction === "saving"
        ? false
        : saved;

  const ariaLabel = isBusy
    ? pendingAction === "removing"
      ? "Removing saved Pin"
      : "Saving Pin"
    : saved
      ? "Remove saved Pin"
      : "Save Pin";

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isBusy}
      aria-label={ariaLabel}
      aria-pressed={saved}
      aria-busy={isBusy}
      className={[
        "inline-flex h-10 w-20 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200",
        "disabled:cursor-default",
        buttonLooksSaved
          ? "bg-black/60 hover:bg-black/70 active:bg-black/80"
          : "bg-red-600 hover:bg-red-700 active:bg-red-800",
      ].join(" ")}
    >
      {isBusy ? (
        <motion.span
          className="inline-flex size-4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          <LoaderCircle className="size-4" strokeWidth={3} />
        </motion.span>
      ) : saved ? (
        "Saved"
      ) : (
        "Save"
      )}
    </button>
  );
}
