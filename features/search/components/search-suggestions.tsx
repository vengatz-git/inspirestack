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
  onClose?: () => void;
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
  onClose,
}: SearchSuggestionsProps) {
  return (
    <div className="bg-popover fixed inset-x-3 top-[4.25rem] z-50 max-h-[65vh] overflow-hidden rounded-2xl border shadow-xl animate-in fade-in-50 zoom-in-95 duration-150 sm:absolute sm:inset-x-auto sm:top-full sm:left-0 sm:mt-2 sm:h-[70vh] sm:max-h-none sm:w-full">
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-semibold">
            {recent ? "Recent searches" : "Search suggestions"}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors hover:bg-muted sm:hidden"
              aria-label="Close suggestions"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {suggestions.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
            {recent ? "No recent searches yet" : "No suggestions found"}
          </div>
        ) : (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={recent ? "Recent searches" : "Search suggestions"}
            className={
              recent
                ? "grid flex-1 auto-rows-min grid-cols-1 content-start gap-2 overflow-y-auto p-3 sm:grid-cols-2 sm:gap-3 sm:p-4"
                : "flex-1 overflow-y-auto p-3 sm:p-4"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveRecentSearch(suggestion);
                        }}
                        className="text-muted-foreground focus:ring-ring ml-2 shrink-0 rounded-full p-1 opacity-70 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:outline-none"
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
        )}
      </div>
    </div>
  );
}
