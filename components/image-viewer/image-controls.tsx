"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ImageControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: ImageControlsProps) {
  return (
    <div
        onClick={(e) => e.stopPropagation()}
        className="
            absolute
            bottom-6
            left-1/2
            z-50
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            border
            bg-background/90
            p-2
            shadow-xl
            backdrop-blur-md
        "
        >
      <Button size="icon" variant="ghost" onClick={onZoomOut}>
        <Minus className="size-4" />
      </Button>

      <Button size="icon" variant="ghost" onClick={onReset}>
        <RotateCcw className="size-4" />
      </Button>

      <Button size="icon" variant="ghost" onClick={onZoomIn}>
        <Plus className="size-4" />
      </Button>
    </div>
  );
}