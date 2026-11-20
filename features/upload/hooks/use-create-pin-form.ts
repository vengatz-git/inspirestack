"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useContentDefaults } from "@/features/settings/components/content-defaults-provider";

import type { CreatePinFormValues } from "../schemas/create-pin-schema";
import { createPinFormSchema } from "../schemas/create-pin-schema";

export type { CreatePinFormValues } from "../schemas/create-pin-schema";

export function useCreatePinForm() {
  const { defaultPinVisibility } = useContentDefaults();

  return useForm<CreatePinFormValues>({
    resolver: zodResolver(createPinFormSchema),
    defaultValues: {
      image: undefined,
      draftId: "",
      title: "",
      description: "",
      topicId: "",
      boardId: "",
      tags: [],
      tagInput: "",
      visibility: defaultPinVisibility,
    },
    mode: "onChange",
  });
}
