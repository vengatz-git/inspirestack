"use client";

import { useState, useTransition } from "react";

import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { savePinToBoardAction } from "@/features/board/actions/save-pin-to-board";

import type { BoardSummary } from "../types/board";

import { BoardSaveDialog } from "./board-save-dialog";

interface BoardSaveButtonProps {
  pinId: string;
  boards: BoardSummary[];
}

export function BoardSaveButton({ pinId, boards }: BoardSaveButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isSaved = boards.some((board) => board.isSaved);

  const selectedBoardName = boards[0]?.name ?? "Create board";

  function handlePrimarySave() {
    if (isPending || isSaved) {
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
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          aria-label={`Choose board: ${selectedBoardName}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="h-10 max-w-44 min-w-0 rounded-xl px-3"
        >
          <span className="min-w-0 truncate">{selectedBoardName}</span>

          <ChevronDown className="size-4 shrink-0" />
        </Button>

        <Button
          type="button"
          variant="default"
          aria-pressed={isSaved}
          disabled={isPending}
          onClick={handlePrimarySave}
          className={[
            "h-10 min-w-20 rounded-xl px-5 text-sm font-semibold text-white opacity-100 transition-colors",
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
