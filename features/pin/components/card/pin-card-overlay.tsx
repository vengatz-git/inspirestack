import { getOverlayVariant } from "../../lib/overlay-variant";
import type { PinCardData } from "../../types/pin-card";

import { PinCardBottomActions } from "./pin-card-bottom-actions";
import { PinCardTopActions } from "./pin-card-top-actions";

interface PinCardOverlayProps {
  pin: PinCardData;
}

export function PinCardOverlay({ pin }: PinCardOverlayProps) {
  const variant = getOverlayVariant(
    pin.imageWidth,
    pin.imageHeight,
  );

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        rounded-2xl
        bg-black/0
        transition-colors
        duration-200
        group-hover:bg-black/15
      "
    >
      <PinCardTopActions />

      <PinCardBottomActions
        variant={variant}
        destinationUrl={pin.destinationUrl}
      />
    </div>
  );
}