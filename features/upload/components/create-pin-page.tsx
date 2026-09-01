"use client";

import type { TopicOption } from "@/features/topic/types/topic";

import { useCreatePinForm } from "../hooks/use-create-pin-form";
import { CreatePinForm } from "./create-pin-form";

interface CreatePinPageProps {
  topics: TopicOption[];
}

export function CreatePinPage({ topics }: CreatePinPageProps) {
  const form = useCreatePinForm();

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b px-6 py-4 sm:px-8">
            <h1 className="text-sm font-semibold">
              Create Pin
            </h1>

            <button
              type="submit"
              form="create-pin-form"
              disabled={form.formState.isSubmitting}
              className="inline-flex h-9 items-center rounded-lg bg-primary px-5 text-sm font-semibold 
              text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            >
              {form.formState.isSubmitting
                ? "Publishing..."
                : "Publish"}
            </button>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <CreatePinForm form={form} topics={topics} />
          </div>
        </div>
      </div>
    </main>
  );
}