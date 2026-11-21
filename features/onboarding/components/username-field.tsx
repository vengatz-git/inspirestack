"use client";

import type {
  FieldError as RHFFieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

interface UsernameFieldProps {
  registration: UseFormRegisterReturn;
  error?: RHFFieldError;
}

export function UsernameField({
  registration,
  error,
}: UsernameFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="username">
        Username
      </FieldLabel>

      <FieldContent>
        <Input
          id="username"
          placeholder="guts"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          {...registration}
          onChange={(event) => {
            // Automatically turn uppercase to lowercase and allow only letters, numbers, and underscores
            const sanitized = event.target.value
              .toLowerCase()
              .replace(/[^a-z0-9_]/g, "");
            event.target.value = sanitized;
            registration.onChange(event);
          }}
        />

        <FieldDescription>
          This will become your public profile URL (lowercase letters, numbers, and _ only).
        </FieldDescription>

        <FieldError
          errors={error ? [error] : undefined}
        />
      </FieldContent>
    </Field>
  );
}
