import type { ZodError } from "zod";

export function zodErrorToFieldErrors<
  T extends Record<string, unknown>,
>(
  error: ZodError<T>,
): Partial<Record<keyof T, string>> {
  const fieldErrors: Partial<Record<keyof T, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field === "string") {
      fieldErrors[field as keyof T] = issue.message;
    }
  }

  return fieldErrors;
}