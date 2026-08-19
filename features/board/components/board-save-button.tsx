"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";

import { BoardSaveDialog } from "./board-save-dialog";

interface BoardSaveButtonProps {
  pinId: string;
  boards: BoardSummary[];
}

export function BoardSaveButton({
  pinId,
  boards,
}: BoardSaveButtonProps) {
  const [open, setOpen] = useState(false);

  const isSaved = boards.some(
    (board) => board.isSaved,
  );

  return (
    <>
      <Button
        className="h-11 rounded-full px-6"
        variant={isSaved ? "secondary" : "default"}
        onClick={() => setOpen(true)}
      >
        {isSaved && <Check className="size-4" />}
        {isSaved ? "Saved" : "Save"}
      </Button>

      <BoardSaveDialog
        open={open}
        onOpenChange={setOpen}
        pinId={pinId}
        boards={boards}
      />
    </>
  );
}