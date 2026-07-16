import { Readable } from "node:stream";

import { cloudinary } from "@/lib/cloudinary";

interface UploadResult {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
}

export async function uploadImage(
  file: File
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "inspirestack",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error);
          return;
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}