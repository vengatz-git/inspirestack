"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ImageCanvas } from "./image-canvas";

interface FullscreenViewerProps {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

export function FullscreenViewer({
  open,
  src,
  alt,
  onClose,
}: FullscreenViewerProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/90
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-6 top-6 z-50 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="size-4" />
        </Button>

        <ImageCanvas
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
}