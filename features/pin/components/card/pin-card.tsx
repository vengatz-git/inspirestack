import Image from "next/image";
import Link from "next/link";

import type { BoardSummary } from "@/features/board/types/board";
import type { PinCardData } from "../../types/pin-card";

import { PinCardOverlay } from "./pin-card-overlay";

interface PinCardProps {
  pin: PinCardData;
  boards?: BoardSummary[];
}

export function PinCard({
  pin,
  boards = [],
}: PinCardProps) {
  return (
    <div className="group block break-inside-avoid">
      <div className="relative overflow-hidden rounded-2xl">
        <Link
          href={`/pin/${pin.id}`}
          className="block"
          aria-label={pin.title ? `View ${pin.title}` : "View pin"}
        >
          <Image
            src={pin.imageUrl}
            alt={pin.altText ?? pin.title ?? "Pin image"}
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
        </Link>

        <PinCardOverlay
          pin={pin}
          boards={boards}
        />
      </div>
    </div>
  );
}