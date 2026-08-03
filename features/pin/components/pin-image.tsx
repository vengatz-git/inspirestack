import Image from "next/image";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

type PinImageProps = {
  pin: Pin;
};

export function PinImage({
  pin,
}: PinImageProps) {
  return (
    <div className="flex h-full items-center justify-center bg-muted/30 p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-background">
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