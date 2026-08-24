import type { PinCardData } from "@/features/pin/types/pin-card";

import type {
  MasonryColumn,
  MasonryLayout,
} from "../types/masonry";
import { estimateHeight } from "./estimate-height";

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
    }),
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

    if (targetColumn.pins.length > 0) {
      targetColumn.estimatedHeight += GAP;
    }

    targetColumn.pins.push(pin);
    targetColumn.estimatedHeight += estimatedHeight;
  }

  return {
    columns,
  };
}