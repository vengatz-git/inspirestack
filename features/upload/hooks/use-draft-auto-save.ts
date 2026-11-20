"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { Draft } from "@/db/schema/drafts";
import { createDraftAction } from "../actions/create-draft";
import { deleteDraftAction } from "../actions/delete-draft";
import { updateDraftAction } from "../actions/update-draft";
import type { CreatePinFormValues } from "./use-create-pin-form";

export type DraftStatus = "idle" | "saving" | "saved" | "error";

interface UseDraftAutoSaveOptions {
  form: UseFormReturn<CreatePinFormValues>;
  onDraftCreated?: (draftId: string) => void;
  onDraftDeleted?: (draftId: string) => void;
}

export function useDraftAutoSave({
  form,
  onDraftCreated,
  onDraftDeleted,
}: UseDraftAutoSaveOptions) {
  const [status, setStatus] = useState<DraftStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const draftId = form.watch("draftId");
  const title = form.watch("title") ?? "";
  const description = form.watch("description") ?? "";
  const topicId = form.watch("topicId");
  const tags = form.watch("tags") ?? [];

  const lastSavedValuesRef = useRef({
    title,
    description,
    topicId,
    tags: JSON.stringify(tags),
  });

  const isSavingRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced auto-save for field changes when a draft is active
  useEffect(() => {
    if (!draftId) {
      return;
    }

    const currentTagsJson = JSON.stringify(tags);
    const hasChanged =
      title !== lastSavedValuesRef.current.title ||
      description !== lastSavedValuesRef.current.description ||
      topicId !== lastSavedValuesRef.current.topicId ||
      currentTagsJson !== lastSavedValuesRef.current.tags;

    if (!hasChanged) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      if (isSavingRef.current || !draftId) {
        return;
      }

      try {
        isSavingRef.current = true;
        setStatus("saving");

        const result = await updateDraftAction({
          draftId,
          title: title || undefined,
          description: description || undefined,
          topicId: topicId || null,
          tagNames: tags,
        });

        if (result.success) {
          lastSavedValuesRef.current = {
            title,
            description,
            topicId,
            tags: currentTagsJson,
          };
          setStatus("saved");
          setLastSaved(new Date(result.updatedAt));
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Auto-save error:", error);
        setStatus("error");
      } finally {
        isSavingRef.current = false;
      }
    }, 1200);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [draftId, title, description, topicId, tags]);

  // Initial draft creation when an image is first selected
  const saveInitialDraft = useCallback(
    async (file: File) => {
      if (draftId || isSavingRef.current) {
        return;
      }

      try {
        isSavingRef.current = true;
        setStatus("saving");

        const result = await createDraftAction({
          file,
          title: title || undefined,
          description: description || undefined,
          topicId: topicId || null,
          tagNames: tags,
        });

        if (result.success) {
          form.setValue("draftId", result.draftId, {
            shouldDirty: false,
          });
          lastSavedValuesRef.current = {
            title,
            description,
            topicId,
            tags: JSON.stringify(tags),
          };
          setStatus("saved");
          setLastSaved(new Date());
          onDraftCreated?.(result.draftId);
        } else {
          setStatus("error");
          toast.error(result.error);
        }
      } catch (error) {
        console.error("Initial draft save error:", error);
        setStatus("error");
      } finally {
        isSavingRef.current = false;
      }
    },
    [draftId, title, description, topicId, tags, form, onDraftCreated],
  );

  // Resume/Load an existing draft into the form
  const loadDraft = useCallback(
    (draft: Draft) => {
      form.reset({
        draftId: draft.id,
        image: undefined,
        title: draft.title ?? "",
        description: draft.description ?? "",
        topicId: draft.topicId ?? "",
        boardId: "",
        tags: draft.tagNames ?? [],
        tagInput: "",
        visibility: "PUBLIC",
      });

      lastSavedValuesRef.current = {
        title: draft.title ?? "",
        description: draft.description ?? "",
        topicId: draft.topicId ?? "",
        tags: JSON.stringify(draft.tagNames ?? []),
      };

      setStatus("saved");
      setLastSaved(new Date(draft.updatedAt));
    },
    [form],
  );

  // Discard current active draft
  const discardCurrentDraft = useCallback(async () => {
    if (!draftId) {
      form.reset();
      setStatus("idle");
      return;
    }

    try {
      setStatus("saving");
      const result = await deleteDraftAction(draftId);

      if (result.success) {
        onDraftDeleted?.(draftId);
        form.reset();
        setStatus("idle");
        setLastSaved(null);
        toast.success("Draft discarded.");
      } else {
        setStatus("error");
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Discard draft error:", error);
      setStatus("error");
      toast.error("Failed to discard draft.");
    }
  }, [draftId, form, onDraftDeleted]);

  return {
    draftId,
    status,
    lastSaved,
    saveInitialDraft,
    loadDraft,
    discardCurrentDraft,
    setStatus,
  };
}
