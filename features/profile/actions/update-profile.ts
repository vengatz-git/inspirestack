"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/types/action-result";

import {
  profileSchema,
  type UpdateProfileInput,
} from "../schemas/profile-schema";
import { updateProfileService } from "../services/update-profile";

type ProfileField =
  | "displayName"
  | "bio"
  | "website"
  | "location";

export async function updateProfileAction(
  data: UpdateProfileInput,
): Promise<ActionResult<void, ProfileField>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = profileSchema.safeParse(data);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        displayName: fieldErrors.displayName?.[0],
        bio: fieldErrors.bio?.[0],
        website: fieldErrors.website?.[0],
        location: fieldErrors.location?.[0],
      },
    };
  }

  const profile = await updateProfileService(session.user.id, {
    displayName: validated.data.displayName || undefined,
    bio: validated.data.bio || undefined,
    website: validated.data.website || undefined,
    location: validated.data.location || undefined,
  });

  revalidatePath(`/profile/${profile.username}`);

  return {
    success: true,
  };
}