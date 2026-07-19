"use client";

import { PinCardActions } from "./pin-card-actions";
import type { PinWithProfile } from "@/types/pin-with-profile";

interface PinCardOverlayProps {
  pin: PinWithProfile;
  compact?: boolean;
}


export function PinCardOverlay({
  pin,
  compact = false,
}: PinCardOverlayProps) {
  return (
    <div
      className="
        absolute
        inset-0
        flex
        flex-col
        justify-between
        bg-gradient-to-t
        from-black/45
        via-black/10
        to-transparent
        opacity-0
        transition-opacity
        duration-300
        group-hover:opacity-100
      "
    >
      <PinCardActions
        pin={pin}
        compact={compact}
      />
    </div>
  );
}