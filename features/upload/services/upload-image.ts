import { UploadApiResponse } from "cloudinary";

import { cloudinary } from "../lib/cloudinary";

export type UploadedImage = {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

export async function uploadImage(
  file: File,
): Promise<UploadedImage> {
  const arrayBuffer = await file.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "inspirestack/pins",
        resource_type: "image",
      },
      (
        error,
        result: UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          reject(error ?? new Error("Image upload failed."));
          return;
        }

        resolve({
          imageUrl: result.secure_url,
          imageWidth: result.width,
          imageHeight: result.height,
        });
      },
    );

    stream.end(buffer);
  });
}