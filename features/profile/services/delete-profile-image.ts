import { cloudinary } from "@/features/upload/lib/cloudinary";

export async function deleteProfileImage(
  publicId: string,
) {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}