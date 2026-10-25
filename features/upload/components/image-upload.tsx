"use client";

import {
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import Image from "next/image";
import { ImageIcon, Upload } from "lucide-react";

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
  const [isDragging, setIsDragging] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled) {
      return;
    }

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onSelect(file);
    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    if (
      event.currentTarget.contains(
        event.relatedTarget as Node | null,
      )
    ) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const file = event.dataTransfer.files?.[0];

    if (file) {
      onSelect(file);
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor="pin-image"
        aria-disabled={disabled}
        className={cn(
          "group relative flex min-h-120 w-full items-center justify-center overflow-hidden rounded-3xl border bg-muted/30 transition-colors",
          previewUrl
            ? "border-border"
            : isDragging
              ? "border-primary bg-primary/5"
              : "border-dashed border-muted-foreground/30 hover:border-foreground/40",
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Pin preview"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-contain"
              unoptimized
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-black/40 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                <Upload className="size-3.5" />
                Change image
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-muted">
              <ImageIcon className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">
                {isDragging
                  ? "Drop your image here"
                  : "Drag and drop an image here"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                or click to browse - PNG, JPG or WEBP
              </p>
            </div>
          </div>
        )}

        <input
          id="pin-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          disabled={disabled}
          aria-invalid={!!error}
          onChange={handleChange}
        />
      </label>

      {error ? (
        <p
          className="mt-2 text-xs text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}