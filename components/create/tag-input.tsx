"use client";

import { KeyboardEvent, useState } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
  maxTags?: number;
}

export function TagInput({
  value,
  onChange,
  disabled,
  maxTags = 10,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim().toLowerCase();

    if (!tag) return;

    if (value.includes(tag)) {
      setInput("");
      return;
    }

    if (value.length >= maxTags) {
      return;
    }

    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }

    if (
      event.key === "Backspace" &&
      input.length === 0 &&
      value.length > 0
    ) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <div
            key={tag}
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-muted
              px-3
              py-1
              text-sm
            "
          >
            <span>#{tag}</span>

            <button
              type="button"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              className="hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          disabled={disabled}
          placeholder="Add a tag..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          type="button"
          variant="secondary"
          onClick={addTag}
          disabled={disabled || input.trim() === ""}
        >
          Add
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Press Enter to add a tag ({value.length}/{maxTags})
      </p>
    </div>
  );
}
