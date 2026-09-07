"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import type { PinCardData } from "../types/pin-card";

interface PinCardProps {
  pin: PinCardData;
}

export function PinCard({ pin }: PinCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const href = pin.destinationUrl ?? `/pin/${pin.id}`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 animate-pulse bg-muted transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <Image
        ref={imgRef}
        src={pin.imageUrl}
        alt={pin.altText ?? pin.title ?? "Pin image"}
        width={pin.imageWidth}
        height={pin.imageHeight}
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          (max-width: 1536px) 33vw,
          25vw
        "
        className="h-auto w-full transition-all duration-300 group-hover:shadow-2xl"
        onLoad={() => setIsLoaded(true)}
      />
    </Link>
  );
}

