import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";
import { uploadImage } from "@/lib/services/upload-image";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      !(image instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid form data.",
          },
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        image.type as (typeof ALLOWED_IMAGE_TYPES)[number]
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

    if (image.size > MAX_IMAGE_SIZE) {
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

    const {
        secureUrl,
        publicId,
        width,
        height,
      } = await uploadImage(image);

    const [post] = await db
        .insert(posts)
        .values({
              title,
              description,
              imageUrl: secureUrl,
              publicId,
              width,
              height,
              authorId: userId,
          })
      .returning();

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to create post.",
        },
      },
      { status: 500 }
    );
  }
}