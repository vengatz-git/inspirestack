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

interface DateOfBirthFieldProps {
  registration: UseFormRegisterReturn;
  error?: RHFFieldError;
}

export function DateOfBirthField({
  registration,
  error,
}: DateOfBirthFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="dateOfBirth">
        Date of birth
      </FieldLabel>

      <FieldContent>
        <Input
          id="dateOfBirth"
          type="date"
          autoComplete="bday"
          {...registration}
        />

        <FieldDescription>
          Your date of birth stays private.
        </FieldDescription>

        <FieldError
          errors={error ? [error] : undefined}
        />
      </FieldContent>
    </Field>
  );
}