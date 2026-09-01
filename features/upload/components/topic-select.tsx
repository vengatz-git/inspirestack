"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

const DROPDOWN_GAP = 6;
const MIN_DROPDOWN_HEIGHT = 120;
const MAX_DROPDOWN_HEIGHT = 250;

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
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [dropdownStyle, setDropdownStyle] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

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

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) {
      setDropdownStyle(null);
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceAbove =
        rect.top - DROPDOWN_GAP;

      const spaceBelow =
        viewportHeight -
        rect.bottom -
        DROPDOWN_GAP;

      const shouldOpenUp =
        spaceBelow < MAX_DROPDOWN_HEIGHT &&
        spaceAbove > spaceBelow;

      const availableSpace = shouldOpenUp
        ? spaceAbove
        : spaceBelow;

      const maxHeight = Math.max(
        MIN_DROPDOWN_HEIGHT,
        Math.min(
          MAX_DROPDOWN_HEIGHT,
          availableSpace,
        ),
      );

      const dropdownHeight =
        Math.min(MAX_DROPDOWN_HEIGHT, maxHeight);

      const top = shouldOpenUp
        ? Math.max(
            DROPDOWN_GAP,
            rect.top - dropdownHeight - DROPDOWN_GAP,
          )
        : rect.bottom + DROPDOWN_GAP;

      const left = Math.min(
        rect.left,
        viewportWidth - rect.width - DROPDOWN_GAP,
      );

      setDropdownStyle({
        top,
        left,
        width: rect.width,
        maxHeight,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener(
      "scroll",
      updatePosition,
      true,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updatePosition,
      );

      window.removeEventListener(
        "scroll",
        updatePosition,
        true,
      );
    };
  }, [isOpen, filteredTopics.length]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => onOpenChange(!isOpen)}
        className="flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-left text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
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
            "size-4 text-muted-foreground transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen && dropdownStyle ? (
        <div
          className="bg-popover fixed z-100 overflow-hidden rounded-xl border p-1.5 shadow-xl"
          style={{
            top: dropdownStyle.top,
            left: dropdownStyle.left,
            width: dropdownStyle.width,
          }}
        >
          <Input
            autoFocus
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search topics..."
            className="mb-1.5 h-8 text-sm"
          />

          <div
            className="overflow-y-auto"
            style={{
              maxHeight:
                dropdownStyle.maxHeight - 46,
            }}
          >
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => {
                const isSelected = topic.id === value;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => onSelect(topic.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    <span>{topic.name}</span>

                    {isSelected ? (
                      <Check className="size-4" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-3 text-center text-xs text-muted-foreground">
                No topics found.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}