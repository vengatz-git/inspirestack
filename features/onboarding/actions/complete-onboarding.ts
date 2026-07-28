"use server";

import { auth, unstable_update } from "@/auth";

import { zodErrorToFieldErrors } from "@/lib/validation/zod-error";
import type { ActionResult } from "@/types/action-result";

import {
  onboardingSchema,
  type OnboardingField,
} from "../schemas/onboarding-schema";

import { completeOnboardingService } from "../services/complete-onboarding";

export async function completeOnboarding(
  input: unknown,
): Promise<ActionResult<void, OnboardingField>> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const parsed = onboardingSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: zodErrorToFieldErrors(parsed.error),
      };
    }

    const result = await completeOnboardingService({
      userId: session.user.id,
      username: parsed.data.username,
    });

    if (!result.success) {
      return result;
    }

    await unstable_update({
      ...session,
      user: {
        ...session.user,
        username: parsed.data.username,
        isOnboarded: true,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}