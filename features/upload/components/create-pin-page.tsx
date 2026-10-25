"use client";

import type { BoardSummary } from "@/features/board/types/board";
import type { TopicOption } from "@/features/topic/types/topic";

import { useCreatePinForm } from "../hooks/use-create-pin-form";
import { CreatePinForm } from "./create-pin-form";

interface CreatePinPageProps {
  topics: TopicOption[];
  boards: BoardSummary[];
}

export function CreatePinPage({
  topics,
  boards,
}: CreatePinPageProps) {
  const form = useCreatePinForm();

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between gap-4 border-b px-6 py-5 sm:px-8">
            <div>
              <h1 className="text-lg font-semibold">
                Create a Pin
              </h1>

              <p className="text-muted-foreground mt-1 text-sm">
                Upload an image, add context, and share your idea.
              </p>
            </div>

            <button
              type="submit"
              form="create-pin-form"
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            >
              {form.formState.isSubmitting
                ? "Publishing..."
                : "Publish"}
            </button>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:py-10">
            <CreatePinForm
              form={form}
              topics={topics}
              boards={boards}
            />
          </div>
        </div>
      </div>
    </main>
  );
}