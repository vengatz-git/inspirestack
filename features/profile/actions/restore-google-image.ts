"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { getGoogleImageService } from "../services/get-google-image";
import { restoreGoogleImageService } from "../services/restore-google-image";
import { deleteProfileImage } from "../services/delete-profile-image";
import { getProfileMediaService } from "../services/get-profile-media";

type RestoreGoogleImageResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function restoreGoogleImageAction(): Promise<RestoreGoogleImageResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  try {
    const [googleProfile, currentMedia] = await Promise.all([
      getGoogleImageService(session.user.id),
      getProfileMediaService(session.user.id, "avatar"),
    ]);

    if (!googleProfile?.username) {
      return {
        success: false,
        error: "Profile could not be found.",
      };
    }

    if (!googleProfile.googleImage) {
      return {
        success: false,
        error: "No Google profile picture is available.",
      };
    }

    const profile = await restoreGoogleImageService(
      session.user.id,
      googleProfile.googleImage,
    );

    if (!profile?.username) {
      return {
        success: false,
        error: "Profile could not be updated.",
      };
    }

    if (currentMedia?.publicId) {
      try {
        await deleteProfileImage(currentMedia.publicId);
      } catch {
        // The avatar has already been restored.
        // Cloudinary cleanup failure should not fail the update.
      }
    }

    revalidatePath(`/profile/${profile.username}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to restore Google profile picture.",
    };
  }
}