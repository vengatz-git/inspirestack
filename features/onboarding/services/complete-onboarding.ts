import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { ActionResult } from "@/types/action-result";
import type { OnboardingField } from "../schemas/onboarding-schema";
import { RESERVED_USERNAMES } from "../constants/reserved-usernames";

interface CompleteOnboardingParams {
  userId: string;
  username: string;
  dateOfBirth: string;
}

export async function completeOnboardingService({
  userId,
  username,
  dateOfBirth,
}: CompleteOnboardingParams): Promise<
  ActionResult<void, OnboardingField>
> {
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
    where: (users, { eq }) =>
      eq(users.username, normalizedUsername),
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
      dateOfBirth: new Date(`${dateOfBirth}T00:00:00.000Z`),
      isOnboarded: true,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return {
    success: true,
  };
}