"use client";

import { useEffect, useState } from "react";

import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { TopicOption } from "@/features/topic/types/topic";

import { useCreatePinForm } from "../hooks/use-create-pin-form";
import { useCreatePinSubmit } from "../hooks/use-create-pin-submit";
import { ImageUpload } from "./image-upload";
import { TagInput } from "./tag-input";
import { TopicSelect } from "./topic-select";

interface CreatePinFormProps {
  topics: TopicOption[];
}

export function CreatePinForm({
  topics,
}: CreatePinFormProps) {
  const form = useCreatePinForm();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    null,
  );

  const [topicSearch, setTopicSearch] = useState("");
  const [isTopicOpen, setIsTopicOpen] = useState(false);

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
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageSelect(file: File) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    form.setValue("image", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setPreviewUrl(URL.createObjectURL(file));
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
      className="grid gap-10 px-6 py-8 lg:grid-cols-[minmax(280px,380px)_minmax(0,640px)] lg:justify-center lg:gap-16"
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

      <div className="min-w-0 space-y-6">
        <Field>
          <FieldLabel htmlFor="title">
            Title
          </FieldLabel>

          <Input
            id="title"
            placeholder="Tell everyone what your Pin is about"
            disabled={isSubmitting}
            {...form.register("title")}
          />

          <FieldError
            errors={[form.formState.errors.title]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">
            Description
          </FieldLabel>

          <Textarea
            id="description"
            rows={5}
            placeholder="Describe your Pin"
            disabled={isSubmitting}
            {...form.register("description")}
          />

          <FieldError
            errors={[form.formState.errors.description]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="topic">
            Topic{" "}
            <span className="text-destructive">*</span>
          </FieldLabel>

          {topics.length > 0 ? (
            <TopicSelect
              topics={topics}
              value={selectedTopicId}
              search={topicSearch}
              isOpen={isTopicOpen}
              disabled={isSubmitting}
              onSearchChange={setTopicSearch}
              onOpenChange={setIsTopicOpen}
              onSelect={handleTopicSelect}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-sm text-muted-foreground">
                No topics are available yet. Please seed
                the database before creating Pins.
              </p>
            </div>
          )}

          <FieldError
            errors={[form.formState.errors.topicId]}
          />
        </Field>

        <Controller
          control={form.control}
          name="tags"
          render={() => (
            <TagInput
              tags={tags}
              value={tagInput}
              disabled={isSubmitting}
              onChange={handleTagInputChange}
              onTagsChange={handleTagsChange}
            />
          )}
        />
      </div>
    </form>
  );
}