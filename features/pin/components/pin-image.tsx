import Image from "next/image";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinImageProps = {
  pin: Pin;
};

export function PinImage({ pin }: PinImageProps) {
  return (
    <div className="bg-muted/30 flex h-full items-center justify-center p-6">
      <div className="bg-background relative h-full w-full overflow-hidden rounded-2xl">
        <Image
          src={pin.imageUrl}
          alt={pin.altText ?? pin.title ?? "Pin image"}
          fill
          priority
          sizes="50vw"
          className="object-contain transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
