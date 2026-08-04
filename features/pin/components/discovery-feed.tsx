import type { ReactNode } from "react";

import type { PinCardData } from "../types/pin-card";
import { PinCard } from "./pin-card";

import { FeedGrid } from "@/features/feed/components/feed-grid";

type DiscoveryFeedProps = {
  workspace: ReactNode;
  pins: PinCardData[];
};

export function DiscoveryFeed({
  workspace,
  pins,
}: DiscoveryFeedProps) {
  const railPins = pins.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1600px] px-6">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>{workspace}</div>

        <aside className="space-y-4">
          {railPins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </aside>
      </section>

      <section className="mt-12">
        <FeedGrid pins={pins} />
      </section>
    </div>
  );
}