"use client";

import { useState, useTransition } from "react";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TopicOption } from "@/features/topic/types/topic";
import { PinVisibilityField } from "@/features/upload/components/pin-visibility-field";
import { TagInput } from "@/features/upload/components/tag-input";
import { TopicSelect } from "@/features/upload/components/topic-select";

import { updatePinAction } from "../actions/update-pin";
import { getPinByIdService } from "../services/get-pin-by-id";
import {
  type UpdatePinInput,
  updatePinSchema,
} from "../schemas/update-pin-schema";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface PinEditPageProps {
  pin: Pin;
  topics: TopicOption[];
}

export function PinEditPage({ pin, topics }: PinEditPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topicSearch, setTopicSearch] = useState("");
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<UpdatePinInput>({
    resolver: zodResolver(updatePinSchema),
    defaultValues: {
      pinId: pin.id,
      title: pin.title ?? "",
      description: pin.description ?? "",
      destinationUrl: pin.destinationUrl ?? "",
      topicId: pin.topicId,
      visibility: pin.visibility,
      tags: pin.pinTags.map(({ tag }) => tag.name),
    },
    mode: "onChange",
  });

  const selectedTopicId = form.watch("topicId");
  const visibility = form.watch("visibility");
  const tags = form.watch("tags") ?? [];

  function handleTopicSelect(topicId: string) {
    form.setValue("topicId", topicId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setIsTopicOpen(false);
    setTopicSearch("");
  }

  function handleTagsChange(nextTags: string[]) {
    form.setValue("tags", nextTags, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function handleVisibilityChange(nextVisibility: "PUBLIC" | "PRIVATE") {
    form.setValue("visibility", nextVisibility, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function handleSubmit(values: UpdatePinInput) {
    const formData = new FormData();

    formData.append("pinId", values.pinId);
    formData.append("topicId", values.topicId);
    formData.append("visibility", values.visibility);

    if (values.title) {
      formData.append("title", values.title);
    }

    if (values.description) {
      formData.append("description", values.description);
    }

    if (values.destinationUrl) {
      formData.append("destinationUrl", values.destinationUrl);
    }

    for (const tag of values.tags) {
      formData.append("tags", tag);
    }

    startTransition(async () => {
      const result = await updatePinAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Pin updated successfully.");
      router.push(`/pin/${pin.id}`);
      router.refresh();
    });
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-card overflow-hidden rounded-2xl border">
          <header className="flex items-center justify-between gap-4 border-b px-6 py-5 sm:px-8">
            <div>
              <h1 className="text-lg font-semibold">Edit Pin</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Update your Pin details and visibility.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                nativeButton={false}
                render={<Link href={`/pin/${pin.id}`} />}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="edit-pin-form"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </header>

          <form
            id="edit-pin-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-10 px-6 py-8 lg:grid-cols-[minmax(280px,380px)_minmax(0,640px)] lg:justify-center lg:gap-16 lg:px-8 lg:py-10"
          >
            <div className="bg-muted relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src={pin.imageUrl}
                alt={pin.title ?? "Pin preview"}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0 space-y-6 lg:pt-2">
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  disabled={isPending}
                  {...form.register("title")}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  rows={5}
                  disabled={isPending}
                  {...form.register("description")}
                />
                <FieldError errors={[form.formState.errors.description]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="destinationUrl">
                  Destination link
                </FieldLabel>
                <Input
                  id="destinationUrl"
                  type="url"
                  placeholder="https://example.com"
                  disabled={isPending}
                  {...form.register("destinationUrl")}
                />
                <FieldError errors={[form.formState.errors.destinationUrl]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="topic">Topic</FieldLabel>
                <TopicSelect
                  topics={topics}
                  value={selectedTopicId}
                  search={topicSearch}
                  isOpen={isTopicOpen}
                  disabled={isPending}
                  onOpenChange={setIsTopicOpen}
                  onSearchChange={setTopicSearch}
                  onSelect={handleTopicSelect}
                />
                <FieldError errors={[form.formState.errors.topicId]} />
              </Field>

              <TagInput
                tags={tags}
                value={tagInput}
                disabled={isPending}
                onChange={setTagInput}
                onTagsChange={handleTagsChange}
              />

              <PinVisibilityField
                value={visibility}
                disabled={isPending}
                onChange={handleVisibilityChange}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
