"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImagePickerProps {
  onImageSelect?: (file: File | null) => void;
}

export function ImagePicker({ onImageSelect }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleSelect(file: File | null) {
    setFile(file);
    onImageSelect?.(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) =>
          handleSelect(event.target.files?.[0] ?? null)
        }
      />

      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-border bg-muted/30">
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />

            <div className="absolute bottom-4">
              <Button
                variant="secondary"
                onClick={() => inputRef.current?.click()}
              >
                Change Image
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <ImagePlus className="h-14 w-14 text-muted-foreground" />

            <div>
              <h3 className="text-lg font-semibold">
                Upload an image
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                PNG, JPG or WEBP up to 5 MB
              </p>
            </div>

            <Button onClick={() => inputRef.current?.click()}>
              Select Image
            </Button>
          </div>
        )}
      </div>
    </>
  );
}