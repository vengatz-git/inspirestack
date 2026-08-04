import type { PinCardData } from "@/features/pin/types/pin-card";

export function distributePins(
  pins: PinCardData[],
  columnCount: number
) {
  const columns: PinCardData[][] = Array.from(
    { length: columnCount },
    () => []
  );

  pins.forEach((pin, index) => {
    columns[index % columnCount].push(pin);
  });

  return columns;
}