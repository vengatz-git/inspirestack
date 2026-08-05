"use client";

import { useState, useTransition } from "react";

import { createBoardAction } from "../actions/create-board";

type Visibility = "PUBLIC" | "PRIVATE";

interface UseCreateBoardFormOptions {
  onSuccess?: () => void | Promise<void>;
}

export function useCreateBoardForm({
  onSuccess,
}: UseCreateBoardFormOptions = {}) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] =
    useState<Visibility>("PUBLIC");

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    visibility?: string;
  }>({});

  const [serverError, setServerError] =
    useState<string>();

  async function reset() {
    setName("");
    setDescription("");
    setVisibility("PUBLIC");
    setErrors({});
    setServerError(undefined);
  }

  async function submit() {
    setServerError(undefined);
    setErrors({});

    startTransition(async () => {
      const result = await createBoardAction({
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

      await reset();
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

    reset,
  };
}