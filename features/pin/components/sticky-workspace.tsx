import { getPinByIdService } from "../services/get-pin-by-id";

import { PinImage } from "./pin-image";
import { PinPanel } from "./pin-panel";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface StickyWorkspaceProps {
  pin: Pin;
}

export function StickyWorkspace({ pin }: StickyWorkspaceProps) {
  return (
    <section className="w-full">
      <div className="bg-card mx-auto h-[70vh] max-h-180 min-h-140 w-full max-w-7xl overflow-hidden rounded-3xl border shadow-2xl">
        <div className="grid h-full grid-cols-2">
          <PinImage pin={pin} />
          <PinPanel pin={pin} />
        </div>
      </div>
    </section>
  );
}
