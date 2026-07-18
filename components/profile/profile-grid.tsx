import type { PinWithProfile } from "@/types/pin-with-profile";

import { PinGrid } from "@/components/feed/pin-grid";

interface ProfileGridProps {
  pins: PinWithProfile[];
}

export function ProfileGrid({
  pins,
}: ProfileGridProps) {
  if (pins.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed bg-card py-20 text-center">
        <h2 className="text-2xl font-semibold">
          No Pins Yet
        </h2>

        <p className="mt-3 text-muted-foreground">
          This profile hasn't shared any inspiration yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <PinGrid pins={pins} />
    </section>
  );
}