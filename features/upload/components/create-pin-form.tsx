"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createPinAction } from "../actions/create-pin";
import { useCreatePinForm } from "../hooks/use-create-pin-form";
import type { CreatePinSchema } from "../schemas/create-pin-schema";
import { ImageUpload } from "./image-upload";

export function CreatePinForm() {
  const form = useCreatePinForm();
  const router = useRouter();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageSelect(file: File) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    form.setValue("image", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setPreviewUrl(URL.createObjectURL(file));
  }

  async function onSubmit(values: CreatePinSchema) {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      if (values.title) {
        formData.append("title", values.title);
      }

      if (values.description) {
        formData.append("description", values.description);
      }

      if (values.altText) {
        formData.append("altText", values.altText);
      }

      formData.append("image", values.image);

      const result = await createPinAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Pin published successfully.");

      form.reset();

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(null);

      router.push(`/profile/${result.username}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong while publishing your Pin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-10 lg:grid-cols-[380px_1fr]"
    >
      <Controller
        control={form.control}
        name="image"
        render={({ fieldState }) => (
          <ImageUpload
            previewUrl={previewUrl}
            onSelect={handleImageSelect}
            error={fieldState.error?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <div className="space-y-6">
        <Field>
          <FieldLabel htmlFor="title">
            Title
          </FieldLabel>

          <Input
            id="title"
            placeholder="Tell everyone what your Pin is about"
            disabled={isSubmitting}
            {...form.register("title")}
          />

          <FieldError
            errors={[form.formState.errors.title]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">
            Description
          </FieldLabel>

          <Textarea
            id="description"
            rows={6}
            placeholder="Describe your Pin"
            disabled={isSubmitting}
            {...form.register("description")}
          />

          <FieldError
            errors={[form.formState.errors.description]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="altText">
            Alt text
          </FieldLabel>

          <Textarea
            id="altText"
            rows={3}
            placeholder="Describe the image for accessibility"
            disabled={isSubmitting}
            {...form.register("altText")}
          />

          <FieldError
            errors={[form.formState.errors.altText]}
          />
        </Field>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Publishing..."
              : "Publish"}
          </Button>
        </div>
      </div>
    </form>
  );
}