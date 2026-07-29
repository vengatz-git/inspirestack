"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  profileSchema,
  type UpdateProfileInput,
} from "../schemas/profile-schema";
import type { Profile } from "../types/profile";

export function useProfileForm(profile: Profile) {
  return useForm<UpdateProfileInput>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      displayName: profile.displayName ?? "",
      bio: profile.bio ?? "",
      website: profile.website ?? "",
      location: profile.location ?? "",
    },
  });
}