import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import type { PinCardData } from "../types/pin-card";

export async function getUserPinsService(
  userId: string,
): Promise<PinCardData[]> {
  const userPins = await db.query.pins.findMany({
    where: eq(pins.authorId, userId),
    orderBy: desc(pins.createdAt),
  });

  return userPins.map((pin) => ({
    id: pin.id,
    title: pin.title,
    imageUrl: pin.imageUrl,
    altText: pin.altText,
    imageWidth: pin.imageWidth,
    imageHeight: pin.imageHeight,
  }));
}
