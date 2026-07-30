"use client";

import type { ChangeEvent } from "react";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ImageUploadProps = {
  previewUrl: string | null;
  onSelect: (file: File) => void;
  error?: string;
  disabled?: boolean;
};

export function ImageUpload({
  previewUrl,
  onSelect,
  error,
  disabled = false,
}: ImageUploadProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled) {
      return;
    }

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onSelect(file);
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor="pin-image"
        aria-disabled={disabled}
        className={cn(
          "relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-colors",
          previewUrl
            ? "border-border"
            : "border-muted-foreground/30 hover:border-primary",
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer",
        )}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Pin preview"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <ImageIcon className="text-muted-foreground h-10 w-10" />

            <div>
              <p className="font-medium">
                Upload an image
              </p>

              <p className="text-muted-foreground mt-1 text-sm">
                PNG, JPG or WEBP
              </p>
            </div>
          </div>
        )}

        <input
          id="pin-image"
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled}
          aria-invalid={!!error}
          onChange={handleChange}
        />
      </label>

      {error ? (
        <p
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}