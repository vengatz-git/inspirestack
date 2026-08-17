import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { deleteProfileImage } from "@/features/profile/services/delete-profile-image";

export async function deletePinService(
  userId: string,
  pinId: string,
) {
  const [pin] = await db
    .select({
      id: pins.id,
      imagePublicId: pins.imagePublicId,
    })
    .from(pins)
    .where(
      and(
        eq(pins.id, pinId),
        eq(pins.authorId, userId),
      ),
    )
    .limit(1);

  if (!pin) {
    throw new Error("Pin not found.");
  }

  await db
    .delete(pins)
    .where(eq(pins.id, pinId));

  if (pin.imagePublicId) {
    try {
      await deleteProfileImage(pin.imagePublicId);
    } catch {
      // The pin has already been deleted.
      // Cloudinary cleanup failure should not fail the deletion.
    }
  }

  return true;
}