"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createPinAction } from "../actions/create-pin";
import type { CreatePinFormValues } from "./use-create-pin-form";

interface UseCreatePinSubmitOptions {
  previewUrl: string | null;
  onSuccess: () => void;
}

export function useCreatePinSubmit({
  previewUrl,
  onSuccess,
}: UseCreatePinSubmitOptions) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(values: CreatePinFormValues) {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      if (values.title) {
        formData.append("title", values.title);
      }

      if (values.description) {
        formData.append("description", values.description);
      }

      formData.append("image", values.image);
      formData.append("topicId", values.topicId);

      for (const tag of values.tags) {
        formData.append("tags", tag);
      }

      const result = await createPinAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Pin published successfully.");

      onSuccess();

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      router.push(`/profile/${result.username}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong while publishing your Pin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submit,
    isSubmitting,
  };
}