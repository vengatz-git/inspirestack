"use client";

import { useMemo, useRef } from "react";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { useMasonry } from "../hooks/use-masonry";
import { placePins } from "../utils/place-pins";

import { MasonryItem } from "./masonry-item";

interface MasonryEngineProps {
  pins: PinCardData[];
  renderItem?: (pin: PinCardData) => React.ReactNode;
}

export function MasonryEngine({
  pins,
  renderItem,
}: MasonryEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    columnCount,
    columnWidth,
    gap,
  } = useMasonry(containerRef);

  const layoutResult = useMemo(
    () =>
      placePins({
        pins,
        columnCount,
        columnWidth,
      }),
    [pins, columnCount, columnWidth],
  );

  return (
    <div
      ref={containerRef}
      className="flex items-start"
      style={{ gap }}
    >
      {layoutResult.columns.map((column) => (
        <div
          key={column.id}
          className="flex flex-1 flex-col"
          style={{ gap }}
        >
          {column.pins.map((pin) =>
            renderItem ? (
              <div key={pin.id}>{renderItem(pin)}</div>
            ) : (
              <MasonryItem
                key={pin.id}
                pin={pin}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}