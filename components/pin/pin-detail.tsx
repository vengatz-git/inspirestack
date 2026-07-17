import type { Pin } from "@/types/pin";

import { PinActions } from "./pin-actions";
import { PinHero } from "./pin-hero";
import { PinInfo } from "./pin-info";

interface PinDetailProps {
  pin: Pin;
}

export function PinDetail({ pin }: PinDetailProps) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        {/* Hero Image */}
        <div className="p-4 md:p-6">
          <PinHero pin={pin} />
        </div>

        {/* Content */}
        <div className="space-y-8 px-6 pb-8 pt-2 md:px-10">
          <PinInfo pin={pin} />

          <div className="border-t pt-6">
            <PinActions />
          </div>
        </div>
      </div>
    </section>
  );
}