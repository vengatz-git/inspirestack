"use client";

import { memo } from "react";

import type { PinWithProfile } from "@/types/pin-with-profile";

import { PinCard } from "./pin-card";

interface PinGridProps {
  pins: PinWithProfile[];
}

function PinGridComponent({
  pins,
}: PinGridProps) {
  return (
    <div
      className="
        columns-1
        gap-6
        sm:columns-2
        lg:columns-3
        xl:columns-4
      "
    >
      {pins.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
        />
      ))}
    </div>
  );
}

export const PinGrid = memo(PinGridComponent);