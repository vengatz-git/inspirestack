"use client";

import { useState } from "react";
import Image from "next/image";

import { getPinByIdService } from "../services/get-pin-by-id";
import { PinImageActions } from "./pin-image-actions";
import { PinImageLightbox } from "./pin-image-lightbox";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinImageProps = {
  pin: Pin;
};

export function PinImage({ pin }: PinImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const ratio = pin.imageWidth / pin.imageHeight;
  const isNearSquare = ratio >= 0.8 && ratio <= 1.25;

  return (
    <>
      <div className="relative flex h-full min-h-0 w-full items-center justify-center bg-white">
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="group relative h-full w-full cursor-zoom-in overflow-hidden"
        >
          <Image
            src={pin.imageUrl}
            alt={pin.title ?? "Pin image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={isNearSquare ? "object-cover" : "object-contain"}
          />

          <PinImageActions
            imageUrl={pin.imageUrl}
            onOpenLightbox={() => setIsLightboxOpen(true)}
          />
        </div>
      </div>

      <PinImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={pin.imageUrl}
        altText={pin.title ?? "Pin image"}
        imageWidth={pin.imageWidth}
        imageHeight={pin.imageHeight}
      />
    </>
  );
}
