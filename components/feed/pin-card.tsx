"use client"

import Link from "next/link";

import { useCardHeight } from "@/hooks/use-card-height";

import type { PinWithProfile } from "@/types/pin-with-profile";

import { PinCardImage } from "./pin-card-image";
import { PinCardOverlay } from "./pin-card-overlay";

interface PinCardProps {
  pin: PinWithProfile;
}

export function PinCard({ pin }: PinCardProps) {
  const { ref, compact } = useCardHeight();

  return (
    <Link
        href={`/pin/${pin.id}`}
        className="
          group
          mb-6
          block
          break-inside-avoid
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
        "
      >
      <article
        ref={ref}
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-card
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <PinCardImage
          src={pin.imageUrl}
          alt={pin.title}
          width={pin.width}
          height={pin.height}
        />

        <PinCardOverlay
            pin={pin}
            compact={compact}
        />
      </article>
    </Link>
  );
}