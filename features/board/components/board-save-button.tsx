"use client";

import { useState } from "react";

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

  return (
    <>
      <Button
        className="h-11 rounded-full px-6"
        onClick={() => setOpen(true)}
      >
        Save
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