"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import type { BoardSummary } from "@/features/board/types/board";

interface PinBoardFieldProps {
  boards: BoardSummary[];
  value: string;
  onChange: (boardId: string) => void;
  disabled?: boolean;
}

export function PinBoardField({
  boards,
  value,
  onChange,
  disabled = false,
}: PinBoardFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="boardId">Board</FieldLabel>

      <select
        id="boardId"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">No board</option>

        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
            {board.visibility === "PRIVATE" ? " (Private)" : ""}
          </option>
        ))}
      </select>

      <FieldDescription>
        Optional. Save this Pin to one of your boards while publishing.
      </FieldDescription>
    </Field>
  );
}