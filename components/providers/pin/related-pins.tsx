import type { Pin } from "@/types/pin";

import { PinGrid } from "@/components/feed/pin-grid";

interface RelatedPinsProps {
  pins: Pin[];
}

export function RelatedPins({ pins }: RelatedPinsProps) {
  if (pins.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          More to Explore
        </h2>

        <p className="mt-3 text-muted-foreground">
          Keep discovering ideas inspired by this pin.
        </p>
      </div>

      <PinGrid pins={pins} />
    </section>
  );
}