import type { Pin } from "@/db/schema";

import { PinCard } from "./pin-card";

type ProfilePinGridProps = {
  pins: Pin[];
};

export function ProfilePinGrid({
  pins,
}: ProfilePinGridProps) {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {pins.map((pin) => (
          <PinCard
            key={pin.id}
            pin={pin}
          />
        ))}
      </div>
    </section>
  );
}