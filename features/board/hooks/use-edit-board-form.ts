"use client";

import { useState, useTransition } from "react";

import { updateBoardAction } from "../actions/update-board";

type Visibility = "PUBLIC" | "PRIVATE";

interface UseEditBoardFormOptions {
  boardId: string;
  initialName: string;
  initialDescription: string | null;
  initialVisibility: Visibility;
  onSuccess?: () => void | Promise<void>;
}

export function useEditBoardForm({
  boardId,
  initialName,
  initialDescription,
  initialVisibility,
  onSuccess,
}: UseEditBoardFormOptions) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(
    initialDescription ?? "",
  );
  const [visibility, setVisibility] =
    useState<Visibility>(initialVisibility);

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    visibility?: string;
  }>({});

  const [serverError, setServerError] =
    useState<string | undefined>();

  function submit() {
    setServerError(undefined);
    setErrors({});

    startTransition(async () => {
      const result = await updateBoardAction({
        boardId,
        name,
        description,
        visibility,
      });

      if (!result.success) {
        setServerError(result.error);
        setErrors(result.fieldErrors ?? {});
        return;
      }

      await onSuccess?.();
    });
  }

  return {
    values: {
      name,
      description,
      visibility,
    },

    errors,

    serverError,

    pending: isPending,

    onChange: {
      name: setName,
      description: setDescription,
      visibility: setVisibility,
    },

    submit,
  };
}