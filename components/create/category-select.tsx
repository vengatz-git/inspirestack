"use client";

import { CATEGORIES, type Category } from "@/constants/categories";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value: Category | "";
  onValueChange: (value: Category) => void;
  disabled?: boolean;
}

export function CategorySelect({
  value,
  onValueChange,
  disabled,
}: CategorySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as Category)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>

      <SelectContent>
        {CATEGORIES.map((category) => (
          <SelectItem
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
