import Image from "next/image";
import Link from "next/link";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { BoardPinMobileActions } from "./board-pin-mobile-actions";
import { RemovePinFromBoardButton } from "./remove-pin-from-board-button";

type BoardPinCardProps = {
  boardId: string;
  pin: PinCardData;
  onRemove: (pinId: string) => void;
};

export function BoardPinCard({ boardId, pin, onRemove }: BoardPinCardProps) {
  return (
    <div className="group relative">
      <Link href={`/pin/${pin.id}`} className="block">
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
          className="h-auto w-full rounded-2xl transition-all duration-300 group-hover:shadow-2xl"
        />
      </Link>

      <div className="absolute top-3 right-3">
        <div className="hidden opacity-0 transition-opacity group-hover:opacity-100 sm:block">
          <RemovePinFromBoardButton
            boardId={boardId}
            pinId={pin.id}
            onSuccess={() => onRemove(pin.id)}
          />
        </div>

        <div className="sm:hidden">
          <BoardPinMobileActions
            boardId={boardId}
            pinId={pin.id}
            onSuccess={() => onRemove(pin.id)}
          />
        </div>
      </div>
    </div>
  );
}
