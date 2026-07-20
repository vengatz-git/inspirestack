"use client";

import { Expand, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageOverlayProps {
  onFullscreen?: () => void;
}

export function ImageOverlay({
  onFullscreen,
}: ImageOverlayProps) {
  return (
    <div
      className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
        bg-gradient-to-t
        from-black/40
        via-transparent
        to-black/20
      "
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full backdrop-blur-md"
          onClick={onFullscreen}
        >
          <Expand className="size-4" />
        </Button>

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="rounded-full backdrop-blur-md"
        >
          <a href="#" download>
            <Download className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}