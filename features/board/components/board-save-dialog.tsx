"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import type { BoardSummary } from "../types/board";

import { BoardSelector } from "./board-selector";

interface BoardSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pinId: string;
  boards: BoardSummary[];
  onSaved?: () => void;
}

export function BoardSaveDialog({
  open,
  onOpenChange,
  pinId,
  boards,
  onSaved,
}: BoardSaveDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        showCloseButton={false}
        className="
          w-[calc(100%-2rem)]
          max-w-[calc(100%-2rem)]
          overflow-hidden
          p-0
          sm:w-225
          sm:max-w-[95vw]
        "
      >
        <BoardSelector
          pinId={pinId}
          boards={boards}
          onSaved={onSaved}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}