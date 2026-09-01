import type { UploadApiResponse } from "cloudinary";

import { cloudinary } from "../lib/cloudinary";

export type UploadedDraftImage = {
  imageUrl: string;
  imagePublicId: string;
  imageWidth: number;
  imageHeight: number;
};

export async function uploadDraftImage(
  file: File,
): Promise<UploadedDraftImage> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "inspirestack/drafts",
        resource_type: "image",
      },
      (
        error,
        result: UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          reject(
            error ??
              new Error("Draft image upload failed."),
          );
          return;
        }

        resolve({
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
          imageWidth: result.width,
          imageHeight: result.height,
        });
      },
    );

    stream.end(buffer);
  });
}