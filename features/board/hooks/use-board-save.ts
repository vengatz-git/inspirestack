"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

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
  const [savingBoardId, setSavingBoardId] = useState<string | null>(null);

  function save(boardId: string) {
    setSavingBoardId(boardId);

    startTransition(async () => {
      const result = await savePinToBoardAction({
        boardId,
        pinId,
      });

      if (!result.success) {
        toast.error(result.error);

        setSavingBoardId(null);
        return;
      }

      toast.success("Pin saved successfully.");

      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      );

      await onSuccess?.();

      setSavingBoardId(null);
    });
  }

  return {
    pending,
    savingBoardId,
    save,
  };
}