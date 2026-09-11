"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  expanded: boolean;
  listboxId: string;
  activeDescendant?: string;
}

export function SearchInput({
  value,
  onChange,
  onFocus,
  onKeyDown,
  expanded,
  listboxId,
  activeDescendant,
}: SearchInputProps) {
  return (
    <input
      type="text"
      name="query"
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      placeholder="Search"
      aria-label="Search pins"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={expanded}
      aria-controls={listboxId}
      aria-activedescendant={activeDescendant}
      autoComplete="off"
      className="w-full rounded-full bg-muted px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  );
}