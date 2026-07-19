import { useCallback, useEffect, useRef } from "react";

export function useIntersection(
  onIntersect: () => void,
  options?: IntersectionObserverInit
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (!node) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry.isIntersecting) {
            callbackRef.current();
          }
        },
        {
          root: null,
          rootMargin: "300px",
          threshold: 0,
          ...options,
        }
      );

      observer.current.observe(node);
    },
    [options]
  );

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return setRef;
}