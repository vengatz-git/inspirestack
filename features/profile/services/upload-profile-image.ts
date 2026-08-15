import { UploadApiResponse } from "cloudinary";

import { cloudinary } from "@/features/upload/lib/cloudinary";

export type UploadedProfileImage = {
  imageUrl: string;
  publicId: string;
};

export async function uploadProfileImage(
  file: File,
): Promise<UploadedProfileImage> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "inspirestack/profiles",
        resource_type: "image",
      },
      (
        error,
        result: UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          reject(
            error ?? new Error("Profile image upload failed."),
          );

          return;
        }

        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
}