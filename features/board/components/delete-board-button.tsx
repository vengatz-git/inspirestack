"use client";

import { useState, useTransition } from "react";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deleteBoardAction } from "../actions/delete-board";

interface DeleteBoardButtonProps {
  boardId: string;
  boardName: string;
  ownerUsername: string;
}

export function DeleteBoardButton({
  boardId,
  boardName,
  ownerUsername,
}: DeleteBoardButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteBoardAction(boardId);

      if (!result.success) {
        toast.error(
          result.error ?? "Failed to delete board.",
        );
        return;
      }

      toast.success("Board deleted.");
      setOpen(false);
      router.push(`/profile/${ownerUsername}`);
      router.refresh();
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
        Delete Board
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete “{boardName}”?
            </DialogTitle>

            <DialogDescription>
              This removes the board and its saved Pin
              associations. The Pins themselves will not
              be deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? "Deleting..." : "Delete Board"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}