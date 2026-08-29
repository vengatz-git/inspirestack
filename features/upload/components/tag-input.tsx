"use client";

import { X } from "lucide-react";
import { toast } from "sonner";

import { FieldLabel } from "@/components/ui/field";

interface TagInputProps {
  tags: string[];
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export function TagInput({
  tags,
  value,
  disabled = false,
  onChange,
  onTagsChange,
}: TagInputProps) {
  function addTag() {
    const tag = value.trim().replace(/^#+/, "").toLowerCase();

    if (!tag) {
      return;
    }

    if (tags.some((item) => item === tag)) {
      onChange("");
      return;
    }

    if (tags.length >= 10) {
      toast.error("You can add up to 10 tags.");
      return;
    }

    onTagsChange([...tags, tag]);
    onChange("");
  }

  function removeTag(tagToRemove: string) {
    onTagsChange(
      tags.filter((tag) => tag !== tagToRemove),
    );
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }

    if (
      event.key === "Backspace" &&
      !value &&
      tags.length > 0
    ) {
      onTagsChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="space-y-2">
      <FieldLabel htmlFor="tags" className="text-xs">
        Tags
      </FieldLabel>

      <div className="bg-background focus-within:ring-ring rounded-md border px-2 py-1.5 focus-within:ring-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            >
              #{tag}

              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-foreground rounded-full"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}

          <input
            id="tags"
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            disabled={disabled}
            placeholder={
              tags.length === 0
                ? "Add tags..."
                : "Add another..."
            }
            className="placeholder:text-muted-foreground h-7 min-w-24 flex-1 bg-transparent px-1 text-sm outline-none disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <p className="text-muted-foreground text-[11px]">
        Press Enter or comma to add a tag. Up to 10 tags.
      </p>
    </div>
  );
}