import { PinCard } from "@/features/pin";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface FeedGridProps {
  pins: PinCardData[];
}

export function FeedGrid({ pins }: FeedGridProps) {
  return (
    <section
      aria-label="Home feed"
      className="
        columns-2
        gap-3
        sm:columns-2
        md:columns-3
        lg:columns-4
        xl:columns-5
        2xl:columns-6
      "
    >
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="mb-3 
          // break-inside-avoid
          "
        >
          <PinCard pin={pin} />
        </div>
      ))}
    </section>
  );
}