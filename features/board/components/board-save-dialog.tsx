"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <DialogContent className="w-[1100px] max-w-[95vw] overflow-hidden p-0">
        <DialogHeader>
          <DialogTitle>Save to board</DialogTitle>

          <DialogDescription>
            Choose where you'd like to save this pin.
          </DialogDescription>
        </DialogHeader>

        <BoardSelector
          pinId={pinId}
          boards={boards}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
