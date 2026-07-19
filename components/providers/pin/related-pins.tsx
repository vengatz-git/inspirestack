import { PinGrid } from "@/components/feed/pin-grid";

import type { PinWithProfile } from "@/types/pin-with-profile";

interface RelatedPinsProps {
  pins: PinWithProfile[];
}

export function RelatedPins({
  pins,
}: RelatedPinsProps) {
  if (pins.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="mb-8 text-center">
        <h2
          className="
            text-2xl
            font-semibold
            tracking-tight
            md:text-3xl
          "
        >
          More like this
        </h2>

        <p className="mt-2 text-muted-foreground">
          Discover similar ideas curated just for you.
        </p>
      </div>

      <PinGrid pins={pins} />
    </section>
  );
}