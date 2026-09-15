import { z } from "zod";

export const onboardingSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters.")
    .regex(
      /^[a-z0-9_]+$/,
      "Only lowercase letters, numbers and underscores are allowed.",
    ),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine(
      value => !Number.isNaN(new Date(value).getTime()),
      "Enter a valid date of birth.",
    )
    .refine(
      value => new Date(value) <= new Date(),
      "Date of birth cannot be in the future.",
    ),
});

export type OnboardingFormValues =
  z.infer<typeof onboardingSchema>;

export type OnboardingField =
  keyof OnboardingFormValues;