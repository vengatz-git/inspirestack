import { useEffect, useMemo, useState } from "react";

import { calculateColumns } from "../utils/calculate-columns";

const GAP = 12;

export function useMasonry(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  const columnCount = useMemo(
    () => calculateColumns({ width }),
    [width]
  );

  const columnWidth = useMemo(() => {
    if (columnCount === 0) return 0;

    return (
      (width - GAP * (columnCount - 1)) /
      columnCount
    );
  }, [width, columnCount]);

  return {
    width,
    columnCount,
    columnWidth,
    gap: GAP,
  };
}