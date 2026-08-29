"use client";

import { useMemo } from "react";

import { Check, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";

import type { TopicOption } from "@/features/topic/types/topic";

interface TopicSelectProps {
  topics: TopicOption[];
  value: string;
  search: string;
  isOpen: boolean;
  disabled?: boolean;
  onSearchChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onSelect: (topicId: string) => void;
}

export function TopicSelect({
  topics,
  value,
  search,
  isOpen,
  disabled = false,
  onSearchChange,
  onOpenChange,
  onSelect,
}: TopicSelectProps) {
  const selectedTopic = topics.find(
    (topic) => topic.id === value,
  );

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return topics;
    }

    return topics.filter((topic) =>
      topic.name.toLowerCase().includes(query),
    );
  }, [topics, search]);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onOpenChange(!isOpen)}
        className="bg-background hover:bg-accent flex h-9 w-full items-center justify-between rounded-md border px-3 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          className={
            selectedTopic
              ? "text-foreground"
              : "text-muted-foreground"
          }
        >
          {selectedTopic?.name ?? "Select a topic"}
        </span>

        <ChevronDown
          className={[
            "text-muted-foreground size-4 transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen ? (
        <div className="bg-popover absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-xl border p-1.5 shadow-lg">
          <Input
            autoFocus
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search topics..."
            className="mb-1.5 h-8 text-sm"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => {
                const isSelected = topic.id === value;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => onSelect(topic.id)}
                    className="hover:bg-accent flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
                  >
                    <span>{topic.name}</span>

                    {isSelected ? (
                      <Check className="size-4" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="text-muted-foreground px-3 py-3 text-center text-xs">
                No topics found.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}