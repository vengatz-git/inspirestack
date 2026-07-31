import { PinCard } from "@/features/pin";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface FeedGridProps {
  pins: PinCardData[];
}

export function FeedGrid({ pins }: FeedGridProps) {
  return (
    <section
      aria-label="Home feed"
      className="columns-2 gap-4 md:columns-3 xl:columns-4 2xl:columns-5"
    >
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="mb-4 break-inside-avoid"
        >
          <PinCard pin={pin} />
        </div>
      ))}
    </section>
  );
}