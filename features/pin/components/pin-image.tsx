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
    <div className="relative flex h-full items-center justify-center bg-zinc-100 p-6 dark:bg-zinc-900">
      <div className="relative h-full w-full">
        <Image
          src={pin.imageUrl}
          alt={pin.altText ?? pin.title ?? "Pin image"}
          fill
          priority
          sizes="50vw"
          className="rounded-2xl object-contain"
        />
      </div>
    </div>
  );
}