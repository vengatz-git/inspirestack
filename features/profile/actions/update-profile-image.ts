"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { profileMediaSchema } from "../schemas/profile-media-schema";
import {
  type ProfileImageType,
  updateProfileImageService,
} from "../services/update-profile-image";
import { uploadProfileImage } from "../services/upload-profile-image";

type UpdateProfileImageResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function updateProfileImageAction(
  type: ProfileImageType,
  file: File,
): Promise<UpdateProfileImageResult> {
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

  const validated = profileMediaSchema.safeParse({
    image: file,
  });

  if (!validated.success) {
    return {
      success: false,
      error:
        validated.error.issues[0]?.message ??
        "Please select a valid image.",
    };
  }

  try {
    const uploaded = await uploadProfileImage(
      validated.data.image,
    );

    const profile = await updateProfileImageService(
      session.user.id,
      type,
      uploaded.imageUrl,
    );

    if (!profile?.username) {
      return {
        success: false,
        error: "Profile could not be updated.",
      };
    }

    revalidatePath(`/profile/${profile.username}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to upload profile image.",
    };
  }
}