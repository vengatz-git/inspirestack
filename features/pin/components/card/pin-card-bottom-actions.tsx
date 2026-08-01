import type { OverlayVariant } from "../../lib/overlay-variant";

import { PinCardMoreButton } from "./pin-card-more-button";
import { PinCardShareButton } from "./pin-card-share-button";
import { PinCardVisitButton } from "./pin-card-visit-button";

interface PinCardBottomActionsProps {
  variant: OverlayVariant;
  destinationUrl: string | null;
}

export function PinCardBottomActions({
  variant,
  destinationUrl,
}: PinCardBottomActionsProps) {
  if (variant === "minimal") {
    return null;
  }

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <div>
        {destinationUrl ? <PinCardVisitButton href={destinationUrl} /> : null}
      </div>

      <div className="flex items-center gap-2">
        <PinCardShareButton />
        <PinCardMoreButton />
      </div>
    </div>
  );
}
