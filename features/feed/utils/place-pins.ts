import type { PinCardData } from "@/features/pin/types/pin-card";

import { estimateHeight } from "./estimate-height";

import type {
  MasonryColumn,
  MasonryLayout,
} from "../types/masonry";

const GAP = 12;

interface PlacePinsOptions {
  pins: PinCardData[];
  columnCount: number;
  columnWidth: number;
}

export function placePins({
  pins,
  columnCount,
  columnWidth,
}: PlacePinsOptions): MasonryLayout {
  if (columnCount <= 0 || columnWidth <= 0) {
    return {
      columns: [],
    };
  }

  const columns: MasonryColumn[] = Array.from(
    { length: columnCount },
    (_, index) => ({
      id: index,
      pins: [],
      estimatedHeight: 0,
    })
  );

  for (const pin of pins) {
    let targetColumn = columns[0];

    for (const column of columns) {
      if (
        column.estimatedHeight <
        targetColumn.estimatedHeight
      ) {
        targetColumn = column;
      }
    }

    const estimatedHeight = estimateHeight({
      imageWidth: pin.imageWidth,
      imageHeight: pin.imageHeight,
      columnWidth,
    });

    targetColumn.pins.push(pin);

    targetColumn.estimatedHeight += estimatedHeight;

    if (targetColumn.pins.length > 1) {
      targetColumn.estimatedHeight += GAP;
    }
  }

  return {
    columns,
  };
}