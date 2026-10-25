"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { updatePinSchema } from "../schemas/update-pin-schema";
import { updatePinService } from "../services/update-pin";

type UpdatePinActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function updatePinAction(
  formData: FormData,
): Promise<UpdatePinActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const destinationUrl = formData.get("destinationUrl");

  const parsed = updatePinSchema.safeParse({
    pinId: formData.get("pinId"),
    title:
      typeof title === "string" ? title : undefined,
    description:
      typeof description === "string"
        ? description
        : undefined,
    destinationUrl:
      typeof destinationUrl === "string"
        ? destinationUrl
        : undefined,
    topicId: formData.get("topicId"),
    visibility: formData.get("visibility"),
    tags: formData
      .getAll("tags")
      .filter(
        (value): value is string =>
          typeof value === "string",
      ),
  });

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Invalid form data.",
    };
  }

  try {
    await updatePinService({
      userId: session.user.id,
      ...parsed.data,
    });

    revalidatePath(`/pin/${parsed.data.pinId}`);
    revalidatePath("/feed");

    if (session.user.username) {
      revalidatePath(
        `/profile/${session.user.username}`,
      );
    }

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to update Pin.",
    };
  }
}