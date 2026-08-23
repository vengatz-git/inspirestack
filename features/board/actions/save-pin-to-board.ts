"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { savePinSchema } from "../schemas/save-pin-schema";
import { savePinToBoardService } from "../services/save-pin-to-board";

export async function savePinToBoardAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = savePinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  await savePinToBoardService(validated.data);

  revalidatePath(`/pin/${validated.data.pinId}`);

  return {
    success: true,
  };
}
