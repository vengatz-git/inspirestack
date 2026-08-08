"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { EditBoardDialog } from "./edit-board-dialog";

interface EditBoardButtonProps {
  boardId: string;
  name: string;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
}

export function EditBoardButton({
  boardId,
  name,
  description,
  visibility,
}: EditBoardButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Edit Board
      </Button>

      <EditBoardDialog
        open={open}
        onOpenChange={setOpen}
        boardId={boardId}
        name={name}
        description={description}
        visibility={visibility}
      />
    </>
  );
}