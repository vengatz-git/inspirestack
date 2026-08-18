import { cloudinary } from "../lib/cloudinary";

export async function deleteImage(publicId: string) {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}