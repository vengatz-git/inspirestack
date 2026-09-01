"use client";

import { useEffect, useState } from "react";

import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { TopicOption } from "@/features/topic/types/topic";

import type { CreatePinFormValues } from "../hooks/use-create-pin-form";
import { useCreatePinSubmit } from "../hooks/use-create-pin-submit";
import { ImageUpload } from "./image-upload";
import { TagInput } from "./tag-input";
import { TopicSelect } from "./topic-select";

interface CreatePinFormProps {
  form: UseFormReturn<CreatePinFormValues>;
  topics: TopicOption[];
}

export function CreatePinForm({ form, topics }: CreatePinFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [topicSearch, setTopicSearch] = useState("");
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const image = form.watch("image");
  const selectedTopicId = form.watch("topicId");
  const tags = form.watch("tags") ?? [];
  const tagInput = form.watch("tagInput") ?? "";

  const { submit, isSubmitting } = useCreatePinSubmit({
    previewUrl,
    onSuccess: () => {
      form.reset();
      setPreviewUrl(null);
      setTopicSearch("");
      setIsTopicOpen(false);
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageSelect(file: File) {
    if (file.size > 20 * 1024 * 1024) {
      form.setError("image", {
        type: "validate",
        message: "Image must be 20 MB or smaller.",
      });

      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      form.setError("image", {
        type: "validate",
        message: "Only PNG, JPG, and WEBP images are supported.",
      });

      return;
    }

    form.clearErrors("image");

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(file);

    setPreviewUrl(nextPreviewUrl);

    form.setValue("image", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

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

  function handleTagInputChange(value: string) {
    form.setValue("tagInput", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  return (
    <form
      id="create-pin-form"
      onSubmit={form.handleSubmit(submit)}
      className="grid gap-10 lg:grid-cols-[minmax(280px,380px)_minmax(0,640px)] lg:justify-center lg:gap-16"
    >
      <Controller
        control={form.control}
        name="image"
        render={({ fieldState }) => (
          <ImageUpload
            previewUrl={previewUrl}
            onSelect={handleImageSelect}
            error={fieldState.error?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <div className="min-w-0 space-y-6 lg:pt-10">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>

          <Input
            id="title"
            placeholder="Tell everyone what your Pin is about"
            disabled={!image || isSubmitting}
            {...form.register("title")}
          />

          <FieldError errors={[form.formState.errors.title]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>

          <Textarea
            id="description"
            rows={5}
            placeholder="Describe your Pin"
            disabled={!image || isSubmitting}
            {...form.register("description")}
          />

          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="topic">
            Topic <span className="text-destructive">*</span>
          </FieldLabel>

          {topics.length > 0 ? (
            <TopicSelect
              topics={topics}
              value={selectedTopicId}
              search={topicSearch}
              isOpen={isTopicOpen}
              disabled={!image || isSubmitting}
              onOpenChange={setIsTopicOpen}
              onSearchChange={setTopicSearch}
              onSelect={handleTopicSelect}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-muted-foreground text-sm">
                No topics are available yet. Please seed the database before
                creating Pins.
              </p>
            </div>
          )}

          <FieldError errors={[form.formState.errors.topicId]} />
        </Field>

        <Controller
          control={form.control}
          name="tags"
          render={() => (
            <TagInput
              tags={tags}
              value={tagInput}
              disabled={!image || isSubmitting}
              onChange={handleTagInputChange}
              onTagsChange={handleTagsChange}
            />
          )}
        />
      </div>
    </form>
  );
}
