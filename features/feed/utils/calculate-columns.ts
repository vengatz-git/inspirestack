const MIN_COLUMN_WIDTH = 240;
const MAX_COLUMNS = 6;
const MIN_COLUMNS = 2;
const GAP = 12;

interface CalculateColumnsOptions {
  width: number;
}

export function calculateColumns({
  width,
}: CalculateColumnsOptions) {
  const columns = Math.floor(
    (width + GAP) / (MIN_COLUMN_WIDTH + GAP)
  );

  return Math.max(
    MIN_COLUMNS,
    Math.min(columns, MAX_COLUMNS)
  );
}