"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateBoardDialog } from "./create-board-dialog";

export function CreateBoardButton() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Create Board
      </Button>

      <CreateBoardDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}