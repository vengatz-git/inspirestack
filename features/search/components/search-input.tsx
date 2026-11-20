"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  expanded: boolean;
  listboxId: string;
  activeDescendant?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  expanded,
  listboxId,
  activeDescendant,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange("");
    }
    inputRef.current?.focus();
  }

  return (
    <div className="relative flex w-full items-center">
      <Search
        className="text-muted-foreground pointer-events-none absolute left-3 size-4 shrink-0"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        name="query"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onMouseDown={() => {
          if (!expanded) {
            onFocus();
          }
        }}
        onKeyDown={onKeyDown}
        placeholder="Search"
        aria-label="Search pins and people"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        autoComplete="off"
        className="w-full rounded-full bg-muted py-2 pr-9 pl-9 text-sm outline-none transition-all placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-ring"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onMouseDown={(e) => {
            // Prevent input blur when clicking clear
            e.preventDefault();
          }}
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground absolute right-2.5 flex size-6 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
