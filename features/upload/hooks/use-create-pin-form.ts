"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { CreatePinFormValues } from "../schemas/create-pin-schema";
import { createPinFormSchema } from "../schemas/create-pin-schema";

export type { CreatePinFormValues } from "../schemas/create-pin-schema";

export function useCreatePinForm() {
  return useForm<CreatePinFormValues>({
    resolver: zodResolver(createPinFormSchema),
    defaultValues: {
      image: undefined as unknown as File,
      title: "",
      description: "",
      topicId: "",
      tags: [],
      tagInput: "",
    },
    mode: "onChange",
  });
}