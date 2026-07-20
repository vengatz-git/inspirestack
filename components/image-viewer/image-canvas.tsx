"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { useImagePan } from "@/hooks/use-image-pan";
import { useImageZoom } from "@/hooks/use-image-zoom";

import { ImageControls } from "./image-controls";

interface ImageCanvasProps {
  src: string;
  alt: string;
}

export function ImageCanvas({
  src,
  alt,
}: ImageCanvasProps) {
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

  const handleReset = () => {
    reset();
    resetPan();
  };

  return (
    <>
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
            (dragging
              ? "cursor-grabbing"
              : "cursor-grab")
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
    </>
  );
}