"use client";

import { Controller, type Control } from "react-hook-form";

import type { CreatePinSchema } from "../schemas/create-pin-schema";
import { ImageUpload } from "./image-upload";

interface CreatePinImageProps {
  control: Control<CreatePinSchema>;
  previewUrl: string | null;
  disabled?: boolean;
  onSelect: (file: File) => void;
}

export function CreatePinImage({
  control,
  previewUrl,
  disabled = false,
  onSelect,
}: CreatePinImageProps) {
  return (
    <Controller
      control={control}
      name="image"
      render={({ fieldState }) => (
        <ImageUpload
          previewUrl={previewUrl}
          onSelect={onSelect}
          error={fieldState.error?.message}
          disabled={disabled}
        />
      )}
    />
  );
}