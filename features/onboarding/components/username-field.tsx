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
          {...registration}
        />

        <FieldDescription>
          This will become your public profile URL.
        </FieldDescription>

        <FieldError
          errors={error ? [error] : undefined}
        />
      </FieldContent>
    </Field>
  );
}