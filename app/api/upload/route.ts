import { NextResponse } from "next/server";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/constants";
import { uploadImage } from "@/lib/services/upload-image";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "No file provided.",
          },
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unsupported image type.",
          },
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Image exceeds 5 MB.",
          },
        },
        { status: 400 }
      );
    }

    const { secureUrl, publicId } = await uploadImage(file);

    return NextResponse.json({
      success: true,
      data: {
        secureUrl,
        publicId,
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
      { status: 500 }
    );
  }
}