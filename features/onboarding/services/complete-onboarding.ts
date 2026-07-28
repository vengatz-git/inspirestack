import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { ActionResult } from "@/types/action-result";
import type { OnboardingField } from "../schemas/onboarding-schema";
import { RESERVED_USERNAMES } from "../constants/reserved-usernames";

interface CompleteOnboardingParams {
  userId: string;
  username: string;
}

export async function completeOnboardingService({
  userId,
  username,
}: CompleteOnboardingParams): Promise<ActionResult<void, OnboardingField>> {
  const normalizedUsername = username.trim().toLowerCase();

  if (RESERVED_USERNAMES.includes(normalizedUsername)) {
    return {
      success: false,
      fieldErrors: {
        username: "This username is reserved.",
      },
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, normalizedUsername),
  });

  if (existingUser && existingUser.id !== userId) {
    return {
      success: false,
      fieldErrors: {
        username: "Username is already taken.",
      },
    };
  }

  await db
    .update(users)
    .set({
      username: normalizedUsername,
      isOnboarded: true,
    })
    .where(eq(users.id, userId));

  return {
    success: true,
  };
}