"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  onboardingSchema,
  type OnboardingFormValues,
} from "../schemas/onboarding-schema";

export function useOnboardingForm() {
  return useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
    },
    mode: "onBlur",
  });
}