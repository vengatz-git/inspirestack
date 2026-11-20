"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { FileText, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import type { Draft } from "@/db/schema/drafts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteDraftAction } from "../actions/delete-draft";

interface DraftsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drafts: Draft[];
  onSelectDraft: (draft: Draft) => void;
  onDeleteDraft: (draftId: string) => void;
}

export function DraftsDialog({
  open,
  onOpenChange,
  drafts,
  onSelectDraft,
  onDeleteDraft,
}: DraftsDialogProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(draftId: string, event: React.MouseEvent) {
    event.stopPropagation();
    try {
      setDeletingId(draftId);
      const result = await deleteDraftAction(draftId);
      if (result.success) {
        onDeleteDraft(draftId);
        toast.success("Draft deleted.");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Failed to delete draft:", error);
      toast.error("Failed to delete draft.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="size-5" />
            Saved Drafts ({drafts.length})
          </DialogTitle>
        </DialogHeader>

        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground text-sm">
              You don&apos;t have any saved drafts.
            </p>
          </div>
        ) : (
          <div className="max-h-[60vh] space-y-2.5 overflow-y-auto pr-1">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                onClick={() => {
                  onSelectDraft(draft);
                  onOpenChange(false);
                }}
                className="group hover:border-foreground/20 flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={draft.imageUrl}
                      alt={draft.title || "Draft thumbnail"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {draft.title?.trim() || "Untitled draft"}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {draft.updatedAt
                        ? `Saved ${formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true })}`
                        : "Draft"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete draft"
                    disabled={deletingId === draft.id}
                    onClick={(e) => handleDelete(draft.id, e)}
                    className="text-muted-foreground hover:text-destructive size-9 rounded-full transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-1 rounded-full text-xs font-semibold"
                  >
                    Resume
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
