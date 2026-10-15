"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { removePinFromBoardAction } from "../actions/remove-pin-from-board";
import { savePinToBoardAction } from "../actions/save-pin-to-board";

interface UseBoardSaveOptions {
  pinId: string;
  onSuccess?: () => void | Promise<void>;
}

export function useBoardSave({
  pinId,
  onSuccess,
}: UseBoardSaveOptions) {
  const [pending, startTransition] = useTransition();
  const [savingBoardId, setSavingBoardId] = useState<string | null>(
    null,
  );

  function save(
    boardId: string,
    isSaved = false,
  ) {
    if (pending) {
      return;
    }

    setSavingBoardId(boardId);

    startTransition(async () => {
      try {
        const result = isSaved
          ? await removePinFromBoardAction({
              boardId,
              pinId,
            })
          : await savePinToBoardAction({
              boardId,
              pinId,
            });

        if (!result.success) {
          toast.error(
            result.error ??
              `Unable to ${
                isSaved ? "remove" : "save"
              } this Pin.`,
          );
          return;
        }

        toast.success(
          isSaved
            ? "Pin removed from board."
            : "Pin saved successfully.",
        );

        await onSuccess?.();
      } finally {
        setSavingBoardId(null);
      }
    });
  }

  return {
    pending,
    savingBoardId,
    save,
  };
}