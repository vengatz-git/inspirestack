"use client";

import { useTransition } from "react";
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
  const [pending, startTransition] =
    useTransition();

  function save(boardId: string) {
    startTransition(async () => {
      const result =
        await savePinToBoardAction({
          boardId,
          pinId,
        });

      if (!result.success) {
        toast.error(result.error);

        return;
      }

      toast.success(
        "Pin saved successfully.",
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      );

      await onSuccess?.();
    });
  }

  return {
    pending,
    save,
  };
}