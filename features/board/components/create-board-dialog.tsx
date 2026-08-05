"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateBoardForm } from "./create-board-form";

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBoardDialog({
  open,
  onOpenChange,
}: CreateBoardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>

          <DialogDescription>
            Organize your favorite ideas into boards.
          </DialogDescription>
        </DialogHeader>

        <CreateBoardForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
