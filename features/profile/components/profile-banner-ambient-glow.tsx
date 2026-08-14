"use client";

import { useEffect, useState } from "react";

type ProfileBannerAmbientGlowProps = {
  imageUrl: string;
};

export function ProfileBannerAmbientGlow({
  imageUrl,
}: ProfileBannerAmbientGlowProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 24) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute -inset-8 rounded-[3rem]",
        "bg-cover bg-center blur-3xl",
        "transition-all duration-700 ease-out",
        visible
          ? "scale-100 opacity-70"
          : "scale-95 opacity-0",
      ].join(" ")}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
  );
}