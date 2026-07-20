"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useImageZoom } from "@/hooks/use-image-zoom";
import { useImagePan } from "@/hooks/use-image-pan";

import { ImageControls } from "./image-controls";

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
  const {
    scale,
    zoomIn,
    zoomOut,
    reset,
  } = useImageZoom();

  const {
    position,
    dragging,
    startDrag,
    moveDrag,
    endDrag,
    resetPan,
  } = useImagePan();

  const wasOpen = useRef(false);

  useEffect(() => {
    if (open && !wasOpen.current) {
      reset();
      resetPan();
    }

    wasOpen.current = open;
  }, [open, reset, resetPan]);

  useEffect(() => {
    if (!open) return;

    reset();
    resetPan();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, reset, resetPan]);

  const handleReset = () => {
    reset();
    resetPan();
  };

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

        <div
          onPointerDown={(e) => {
            if (scale === 1) return;
            startDrag(e);
          }}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={cn(
            "flex items-center justify-center select-none",
            scale > 1 &&
              (dragging ? "cursor-grabbing" : "cursor-grab")
          )}
        >
          <Image
            src={src}
            alt={alt}
            width={2500}
            height={2500}
            draggable={false}
            onWheel={(e) => {
              e.preventDefault();

              if (e.deltaY < 0) {
                zoomIn();
              } else {
                zoomOut();
              }
            }}
            style={{
              transform: `
                translate(${position.x}px, ${position.y}px)
                scale(${scale})
              `,
            }}
            className="
              max-h-[90vh]
              max-w-[90vw]
              object-contain
              transition-transform
              duration-200
              select-none
            "
          />
        </div>

        <ImageControls
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}