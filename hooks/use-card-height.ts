  "use client";

import { useEffect, useRef, useState } from "react";

export function useCardHeight() {
  const ref = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.height < 220);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    compact,
  };
}