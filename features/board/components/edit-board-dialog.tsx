"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { EditBoardForm } from "./edit-board-form";

interface EditBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
  name: string;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
}

export function EditBoardDialog({
  open,
  onOpenChange,
  boardId,
  name,
  description,
  visibility,
}: EditBoardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>

          <DialogDescription>
            Update your board name, description, or visibility.
          </DialogDescription>
        </DialogHeader>

        <EditBoardForm
          boardId={boardId}
          initialName={name}
          initialDescription={description}
          initialVisibility={visibility}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}