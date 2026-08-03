import { getPinByIdService } from "../services/get-pin-by-id";

import { PinImage } from "./pin-image";
import { PinPanel } from "./pin-panel";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface StickyWorkspaceProps {
  pin: Pin;
}

export function StickyWorkspace({ pin }: StickyWorkspaceProps) {
  return (
    <section>
      <div className="bg-card h-[56vh] max-h-[640px] min-h-[540px] overflow-hidden rounded-3xl border shadow-xl">
        <div className="grid h-full grid-cols-2">
          <PinImage pin={pin} />
          <PinPanel pin={pin} />
        </div>
      </div>
    </section>
  );
}
