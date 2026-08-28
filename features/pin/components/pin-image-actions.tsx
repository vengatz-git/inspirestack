"use client";

import { ArrowLeft, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PinImageActionsProps {
  imageUrl: string;
  altText: string;
}

export function PinImageActions({
  imageUrl,
  altText,
}: PinImageActionsProps) {
  const router = useRouter();

  function handleFullscreen() {
    const image = new Image();
    image.src = imageUrl;

    const viewer = document.createElement("div");

    Object.assign(viewer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.95)",
      cursor: "zoom-out",
      padding: "2rem",
    });

    const fullscreenImage = document.createElement("img");

    fullscreenImage.src = imageUrl;
    fullscreenImage.alt = altText;

    Object.assign(fullscreenImage.style, {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "contain",
    });

    viewer.appendChild(fullscreenImage);

    viewer.addEventListener("click", () => {
      viewer.remove();
    });

    document.body.appendChild(viewer);
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Go back"
        className="absolute left-4 top-4 z-10 size-10 rounded-md bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4.5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="View image fullscreen"
        className="absolute bottom-4 right-4 z-10 size-10 rounded-md bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
        onClick={handleFullscreen}
      >
        <Maximize2 className="size-4.5" />
      </Button>
    </>
  );
}