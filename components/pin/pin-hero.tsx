import Image from "next/image";

import type { Pin } from "@/types/pin";

interface PinHeroProps {
  pin: Pin;
}

export function PinHero({ pin }: PinHeroProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-muted"
      style={{
        aspectRatio: `${pin.width} / ${pin.height}`,
      }}
    >
      <Image
        src={pin.imageUrl}
        alt={pin.title}
        fill
        priority
        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
        sizes="(max-width:768px) 100vw, (max-width:1280px) 80vw, 70vw"
      />
    </div>
  );
}