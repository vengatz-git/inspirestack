import { PinCard } from "@/features/pin/components/card/pin-card";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface ProfilePinGridProps {
  pins: PinCardData[];
}

export function ProfilePinGrid({
  pins,
}: ProfilePinGridProps) {
  return (
    <section>
      <div className="columns-2 gap-5 md:columns-3 lg:columns-4">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="mb-5 break-inside-avoid"
          >
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    </section>
  );
}