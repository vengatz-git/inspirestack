"use client";

import { X } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: string[];
  recent: boolean;
  listboxId: string;
  activeIndex: number;
  hoveredIndex: number;
  onSelect: (suggestion: string) => void;
  onActiveIndexChange: (index: number) => void;
  onHoverIndexChange: (index: number) => void;
  onRemoveRecentSearch?: (suggestion: string) => void;
}

export function SearchSuggestions({
  suggestions,
  recent,
  listboxId,
  activeIndex,
  hoveredIndex,
  onSelect,
  onActiveIndexChange,
  onHoverIndexChange,
  onRemoveRecentSearch,
}: SearchSuggestionsProps) {
  return (
    <div className="bg-popover absolute top-full left-0 z-50 mt-2 h-[70vh] w-full overflow-hidden rounded-2xl border shadow-xl">
      <div className="flex h-full flex-col">
        <div className="shrink-0 border-b px-5 py-4">
          <p className="text-sm font-semibold">
            {recent ? "Recent searches" : "Search suggestions"}
          </p>
        </div>

        <ul
          id={listboxId}
          role="listbox"
          aria-label={recent ? "Recent searches" : "Search suggestions"}
          className={
            recent
              ? "grid flex-1 auto-rows-min grid-cols-2 content-start gap-3 overflow-y-auto p-4"
              : "flex-1 overflow-y-auto p-4"
          }
        >
          {suggestions.map((suggestion, index) => {
            const optionId = `${listboxId}-option-${index}`;

            const isKeyboardActive = index === activeIndex;

            const isHovered = index === hoveredIndex;

            const isActive = isKeyboardActive || isHovered;

            if (recent) {
              return (
                <li
                  key={suggestion}
                  id={optionId}
                  role="option"
                  aria-selected={isKeyboardActive}
                  onMouseEnter={() => onHoverIndexChange(index)}
                  onMouseLeave={() => onHoverIndexChange(-1)}
                  className={`group flex min-w-0 items-center rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isKeyboardActive
                      ? "bg-accent"
                      : isHovered
                        ? "bg-muted"
                        : "bg-muted/30"
                  }`}
                >
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelect(suggestion)}
                    className="min-w-0 flex-1 truncate text-left focus:outline-none"
                  >
                    {suggestion}
                  </button>

                  {onRemoveRecentSearch && (
                    <button
                      type="button"
                      aria-label={`Remove ${suggestion} from recent searches`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => onRemoveRecentSearch(suggestion)}
                      className="text-muted-foreground focus:ring-ring ml-2 shrink-0 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:outline-none"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            }

            return (
              <li
                key={suggestion}
                id={optionId}
                role="option"
                aria-selected={isKeyboardActive}
                onMouseEnter={() => onHoverIndexChange(index)}
                onMouseLeave={() => onHoverIndexChange(-1)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSelect(suggestion)}
                className={`cursor-pointer rounded-xl px-3 py-3 text-sm transition-colors ${
                  isActive ? "bg-accent" : ""
                }`}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
