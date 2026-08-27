import Image from "next/image";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinImageProps = {
  pin: Pin;
};

export function PinImage({ pin }: PinImageProps) {
  return (
    <div className="bg-muted/30 flex h-full min-h-0 items-center justify-center p-4">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src={pin.imageUrl}
          alt={pin.altText ?? pin.title ?? "Pin image"}
          fill
          priority
          sizes="50vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}