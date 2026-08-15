"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { deleteProfileImage } from "../services/delete-profile-image";
import { clearProfileImageService } from "../services/clear-profile-image";
import { getProfileMediaService } from "../services/get-profile-media";
import type { ProfileImageType } from "../services/update-profile-image";

type DeleteProfileImageResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function deleteProfileImageAction(
  type: ProfileImageType,
): Promise<DeleteProfileImageResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  if (type !== "avatar" && type !== "banner") {
    return {
      success: false,
      error: "Invalid profile image type.",
    };
  }

  try {
    const currentMedia = await getProfileMediaService(
      session.user.id,
      type,
    );

    if (!currentMedia?.username) {
      return {
        success: false,
        error: "Profile could not be found.",
      };
    }

    const profile = await clearProfileImageService(
      session.user.id,
      type,
    );

    if (!profile?.username) {
      return {
        success: false,
        error: "Profile could not be updated.",
      };
    }

    if (currentMedia.publicId) {
      try {
        await deleteProfileImage(currentMedia.publicId);
      } catch {
        // The database is already cleared.
        // A failed Cloudinary cleanup should not fail the profile update.
      }
    }

    revalidatePath(`/profile/${profile.username}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete profile image.",
    };
  }
}