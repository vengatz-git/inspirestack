"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import type { BoardSummary } from "../types/board";

import { BoardSelector } from "./board-selector";

interface BoardSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  pinId: string;
  boards: BoardSummary[];
}

export function BoardSaveDialog({
  open,
  onOpenChange,
  pinId,
  boards,
}: BoardSaveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-225 max-w-[95vw] overflow-hidden p-0 sm:max-w-[95vw]">
        <BoardSelector
          pinId={pinId}
          boards={boards}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
