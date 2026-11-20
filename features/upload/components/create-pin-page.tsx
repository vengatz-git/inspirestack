"use client";

import { useState } from "react";
import { Check, FileText, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Draft } from "@/db/schema/drafts";
import type { BoardSummary } from "@/features/board/types/board";
import type { TopicOption } from "@/features/topic/types/topic";

import { useCreatePinForm } from "../hooks/use-create-pin-form";
import { useDraftAutoSave } from "../hooks/use-draft-auto-save";
import { CreatePinForm } from "./create-pin-form";
import { DraftsDialog } from "./drafts-dialog";

interface CreatePinPageProps {
  topics: TopicOption[];
  boards: BoardSummary[];
  initialDrafts?: Draft[];
}

export function CreatePinPage({
  topics,
  boards,
  initialDrafts = [],
}: CreatePinPageProps) {
  const form = useCreatePinForm();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [draftsList, setDraftsList] = useState<Draft[]>(initialDrafts);
  const [isDraftsDialogOpen, setIsDraftsDialogOpen] = useState(false);

  const {
    draftId,
    status,
    saveInitialDraft,
    loadDraft,
    discardCurrentDraft,
  } = useDraftAutoSave({
    form,
    onDraftCreated: (newDraftId) => {
      // Add minimal entry to local drafts list so Drafts button updates
      setDraftsList((prev) => {
        if (prev.some((d) => d.id === newDraftId)) return prev;
        return [
          {
            id: newDraftId,
            authorId: "",
            topicId: form.getValues("topicId") || null,
            title: form.getValues("title") || null,
            description: form.getValues("description") || null,
            imageUrl: previewUrl ?? "",
            imagePublicId: "",
            imageWidth: 800,
            imageHeight: 800,
            tagNames: form.getValues("tags") || [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...prev,
        ];
      });
    },
    onDraftDeleted: (deletedId) => {
      setDraftsList((prev) => prev.filter((d) => d.id !== deletedId));
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    },
  });

  function handleSelectDraft(draft: Draft) {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    loadDraft(draft);
    setPreviewUrl(draft.imageUrl);
  }

  function handleDeleteDraftFromDialog(deletedId: string) {
    setDraftsList((prev) => prev.filter((d) => d.id !== deletedId));
    if (draftId === deletedId) {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      form.reset();
      setPreviewUrl(null);
    }
  }

  async function handleDiscard() {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    await discardCurrentDraft();
    setPreviewUrl(null);
  }

  function handlePublishSuccess() {
    if (draftId) {
      setDraftsList((prev) => prev.filter((d) => d.id !== draftId));
    }
    setPreviewUrl(null);
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card">
          <div className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-lg font-semibold">Create a Pin</h1>

                {status === "saving" && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Loader2 className="size-3 animate-spin text-primary" />
                    Saving draft...
                  </span>
                )}

                {status === "saved" && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="size-3.5 text-emerald-500" />
                    Draft saved
                  </span>
                )}

                {status === "error" && (
                  <span className="flex items-center gap-1.5 text-xs text-destructive">
                    Failed to save draft
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mt-1 text-sm">
                Upload an image, add context, and share your idea.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 max-sm:self-end">
              {draftsList.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDraftsDialogOpen(true)}
                  className="gap-1.5 rounded-full text-xs font-medium"
                >
                  <FileText className="size-3.5" />
                  Drafts ({draftsList.length})
                </Button>
              )}

              {draftId && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscard}
                  className="text-muted-foreground hover:text-destructive gap-1.5 rounded-full text-xs"
                >
                  <Trash2 className="size-3.5" />
                  Discard
                </Button>
              )}

              <button
                type="submit"
                form="create-pin-form"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="inline-flex h-11 min-h-[44px] shrink-0 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
              >
                {form.formState.isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:py-10">
            <CreatePinForm
              form={form}
              topics={topics}
              boards={boards}
              previewUrl={previewUrl}
              onPreviewUrlChange={setPreviewUrl}
              onImageSelected={saveInitialDraft}
              onPublishSuccess={handlePublishSuccess}
            />
          </div>
        </div>
      </div>

      <DraftsDialog
        open={isDraftsDialogOpen}
        onOpenChange={setIsDraftsDialogOpen}
        drafts={draftsList}
        onSelectDraft={handleSelectDraft}
        onDeleteDraft={handleDeleteDraftFromDialog}
      />
    </main>
  );
}
