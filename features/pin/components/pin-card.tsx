import Link from "next/link";
import Image from "next/image";

import { getUserPinsService } from "../services/get-user-pins";

type Pin = Awaited<ReturnType<typeof getUserPinsService>>[number];

type PinCardProps = {
  pin: Pin;
};

export function PinCard({ pin }: PinCardProps) {
  return (
    <Link
      href={`/pin/${pin.id}`}
      className="group block overflow-hidden rounded-xl"
    >
      <article className="overflow-hidden rounded-xl border bg-card transition-shadow group-hover:shadow-lg">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={pin.imageUrl}
            alt={pin.altText ?? pin.title ?? "Pin image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {pin.title ? (
          <div className="p-3">
            <h3 className="line-clamp-2 font-medium">
              {pin.title}
            </h3>
          </div>
        ) : null}
      </article>
    </Link>
  );
}