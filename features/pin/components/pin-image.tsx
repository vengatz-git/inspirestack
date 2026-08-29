import Image from "next/image";

import { getPinByIdService } from "../services/get-pin-by-id";

import { PinImageActions } from "./pin-image-actions";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinImageProps = {
  pin: Pin;
};

export function PinImage({ pin }: PinImageProps) {
  const ratio = pin.imageWidth / pin.imageHeight;
  const isNearSquare = ratio >= 0.8 && ratio <= 1.25;

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center bg-white">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={pin.imageUrl}
          alt={pin.title ?? "Pin image"}
          fill
          priority
          sizes="50vw"
          className={isNearSquare ? "object-cover" : "object-contain"}
        />

        <PinImageActions imageUrl={pin.imageUrl} />
      </div>
    </div>
  );
}
