
import { Pin } from "@/types/pin";

import { PinCard } from "./pin-card";


interface PinGridProps {
  pins: Pin[];
}

export function PinGrid({
  pins,
}: PinGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pins.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
        />
      ))}
    </div>
  );
}