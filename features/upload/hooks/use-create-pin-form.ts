"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createPinSchema,
  type CreatePinSchema,
} from "../schemas/create-pin-schema";

export function useCreatePinForm() {
  return useForm<CreatePinSchema>({
    resolver: zodResolver(createPinSchema),

    defaultValues: {
      title: "",
      description: "",
      altText: "",
      image: undefined,
      topicId: "",
    },

    mode: "onBlur",
  });
}