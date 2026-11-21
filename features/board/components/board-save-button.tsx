"use client";

import { useState, useTransition } from "react";

import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { savePinToBoardAction } from "@/features/board/actions/save-pin-to-board";
import { removePinFromBoardAction } from "@/features/board/actions/remove-pin-from-board";
import { removeSavedPinAction } from "@/features/saved/actions/remove-saved-pin";

import type { BoardSummary } from "../types/board";

import { BoardSaveDialog } from "./board-save-dialog";

interface BoardSaveButtonProps {
  pinId: string;
  boards: BoardSummary[];
  currentUserId: string | null;
}

export function BoardSaveButton({
  pinId,
  boards,
  currentUserId,
}: BoardSaveButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isSaved = boards.some((board) => board.isSaved);
  const selectedBoardName = boards[0]?.name ?? "Create board";

  function handleOpenDialog() {
    if (!currentUserId) {
      router.push("/login");
      return;
    }

    setOpen(true);
  }

  function handlePrimarySave() {
    if (!currentUserId) {
      router.push("/login");
      return;
    }

    if (isPending) {
      return;
    }

    if (isSaved) {
      startTransition(async () => {
        const savedBoards = boards.filter((board) => board.isSaved);
        let error: string | null = null;

        for (const board of savedBoards) {
          const res = await removePinFromBoardAction({
            boardId: board.id,
            pinId,
          });

          if (!res.success) {
            error = res.error ?? "Failed to remove pin";
          }
        }

        await removeSavedPinAction({ pinId });

        if (error) {
          toast.error(error);
        } else {
          toast.success("Pin unsaved successfully.");
        }

        router.refresh();
      });

      return;
    }

    // On mobile (board picker is hidden), always open the dialog to let the user choose a board.
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      setOpen(true);
      return;
    }

    const recommendedBoard = boards[0];

    if (!recommendedBoard) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const result = await savePinToBoardAction({
        boardId: recommendedBoard.id,
        pinId,
      });

      if (!result.success) {
        toast.error(result.error ?? "Unable to save this Pin.");
        return;
      }

      toast.success("Pin saved successfully.");
      router.refresh();
    });
  }

  function handleDialogSaved() {
    setOpen(false);
    router.refresh();
  }

  const saveColor = isSaved
    ? "bg-zinc-700 hover:bg-zinc-800"
    : "bg-red-600 hover:bg-red-700 active:bg-red-800";

  return (
    <>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          type="button"
          variant="outline"
          aria-label={`Choose board: ${selectedBoardName}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={handleOpenDialog}
          className="hidden h-9 max-w-20 min-w-0 rounded-xl px-2 text-xs sm:flex sm:h-10 sm:max-w-44 sm:px-3 sm:text-sm"
        >
          <span className="min-w-0 truncate">
            {selectedBoardName}
          </span>

          <ChevronDown className="size-3.5 shrink-0 sm:size-4" />
        </Button>

        <Button
          type="button"
          variant="default"
          aria-pressed={isSaved}
          disabled={isPending}
          onClick={handlePrimarySave}
          className={[
            "h-9 shrink-0 rounded-xl px-3 text-xs font-semibold text-white opacity-100 transition-colors sm:h-10 sm:min-w-20 sm:px-5 sm:text-sm",
            saveColor,
          ].join(" ")}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isSaved ? (
            "Saved"
          ) : (
            "Save"
          )}
        </Button>
      </div>

      <BoardSaveDialog
        open={open}
        onOpenChange={setOpen}
        pinId={pinId}
        boards={boards}
        onSaved={handleDialogSaved}
      />
    </>
  );
}
