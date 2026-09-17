"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PinCardData } from "@/features/pin/types/pin-card";

interface LandingPinsProps {
  pins: PinCardData[];
}

export function LandingPins({ pins }: LandingPinsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className="columns-2 gap-3 sm:columns-3 lg:pt-8"
    >
      {pins.slice(0, 8).map((pin, index) => (
        <motion.div
          key={pin.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 25,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ duration: 0.45 }}
          className={`mb-3 break-inside-avoid overflow-hidden rounded-2xl ${
            index % 3 === 0 ? "lg:mt-10" : ""
          }`}
        >
          <Image
            src={pin.imageUrl}
            alt={
              pin.altText ??
              pin.title ??
              "Inspiration"
            }
            width={pin.imageWidth}
            height={pin.imageHeight}
            sizes="(max-width: 640px) 45vw, 20vw"
            className="h-auto w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}