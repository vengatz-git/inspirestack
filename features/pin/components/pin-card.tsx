import Image from "next/image";
import Link from "next/link";

import type { PinCardData } from "../types/pin-card";

interface PinCardProps {
  pin: PinCardData;
}

export function PinCard({ pin }: PinCardProps) {
  const href =
    pin.destinationUrl ?? `/pin/${pin.id}`;

  return (
    <Link
      href={href}
      className="group block"
    >
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
        className="h-auto w-full rounded-2xl transition-all duration-300 group-hover:shadow-2xl"
      />
    </Link>
  );
}