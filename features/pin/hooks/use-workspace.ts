import { useEffect, useState } from "react";

export function useWorkspace(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setRect({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return rect;
}