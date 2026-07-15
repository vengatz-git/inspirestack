import { NextResponse } from "next/server";
import { Readable } from "node:stream";

import { cloudinary } from "@/lib/cloudinary";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    // console.log(file);

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "No file provided.",
          },
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unsupported image type.",
          },
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Image exceeds 5MB.",
          },
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
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

          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    return NextResponse.json({
      success: true,
      data: {
        secureUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Upload failed.",
        },
      },
      {
        status: 500,
      }
    );
  }
}