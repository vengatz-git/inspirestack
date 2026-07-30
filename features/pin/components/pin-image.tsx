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
    <div className="flex h-full items-center justify-center bg-muted/20 p-8">
      <Image
        src={pin.imageUrl}
        alt={pin.altText ?? pin.title ?? "Pin image"}
        width={pin.imageWidth}
        height={pin.imageHeight}
        priority
        className="max-h-full max-w-full rounded-2xl object-contain"
      />
    </div>
  );
}