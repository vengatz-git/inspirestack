"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { completeOnboarding } from "../actions/complete-onboarding";
import { useOnboardingForm } from "../hooks/use-onboarding-form";
import type { OnboardingFormValues } from "../schemas/onboarding-schema";

import { DateOfBirthField } from "./date-of-birth-field";
import { UsernameField } from "./username-field";

export function OnboardingForm() {
  const form = useOnboardingForm();
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(data: OnboardingFormValues) {
    setServerError("");
    clearErrors();

    const result = await completeOnboarding(data);

    if (!result.success) {
      if (result.error) {
        setServerError(result.error);
      }

      if (result.fieldErrors?.username) {
        setError("username", {
          type: "server",
          message: result.fieldErrors.username,
        });
      }

      if (result.fieldErrors?.dateOfBirth) {
        setError("dateOfBirth", {
          type: "server",
          message: result.fieldErrors.dateOfBirth,
        });
      }

      return;
    }

    router.replace("/feed");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <UsernameField
        registration={register("username")}
        error={errors.username}
      />

      <DateOfBirthField
        registration={register("dateOfBirth")}
        error={errors.dateOfBirth}
      />

      {serverError && (
        <p className="text-destructive text-sm">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating profile..." : "Continue"}
      </Button>
    </form>
  );
}