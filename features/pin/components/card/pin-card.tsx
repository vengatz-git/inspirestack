import Image from "next/image";
import Link from "next/link";

import type { PinCardData } from "../../types/pin-card";

import { PinCardOverlay } from "./pin-card-overlay";

interface PinCardProps {
  pin: PinCardData;
}

export function PinCard({ pin }: PinCardProps) {
  const href =
    pin.destinationUrl ?? `/pin/${pin.id}`;

  return (
    <Link
      href={href}
      className="group block break-inside-avoid"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={pin.imageUrl}
          alt={
            pin.altText ??
            pin.title ??
            "Pin image"
          }
          width={pin.imageWidth}
          height={pin.imageHeight}
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            (max-width: 1536px) 33vw,
            25vw
          "
          className="h-auto w-full"
        />

        <PinCardOverlay pin={pin} />
      </div>
    </Link>
  );
}