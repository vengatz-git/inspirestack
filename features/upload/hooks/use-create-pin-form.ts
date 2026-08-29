"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createPinFormSchema,
  type CreatePinFormValues,
} from "../schemas/create-pin-schema";

export function useCreatePinForm() {
  return useForm<CreatePinFormValues>({
    resolver: zodResolver(createPinFormSchema),

    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      topicId: "",
      tags: [],
      tagInput: "",
    },

    mode: "onBlur",
  });
}

export { CreatePinFormValues };
