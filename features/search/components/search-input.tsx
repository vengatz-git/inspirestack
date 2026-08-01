"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      name="query"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search pins"
      aria-label="Search"
      className="w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  );
}