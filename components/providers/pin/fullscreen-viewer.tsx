"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

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
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-6 top-6 rounded-full"
        onClick={onClose}
      >
        <X className="size-4" />
      </Button>

      <Image
        src={src}
        alt={alt}
        width={2500}
        height={2500}
        className="
          max-h-[90vh]
          max-w-[90vw]
          object-contain
        "
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}