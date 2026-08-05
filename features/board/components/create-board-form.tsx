"use client";

import { BoardForm } from "./board-form";
import { useCreateBoardForm } from "../hooks/use-create-board-form";

interface CreateBoardFormProps {
  onSuccess?: () => void | Promise<void>;
}

export function CreateBoardForm({
  onSuccess,
}: CreateBoardFormProps) {
  const form = useCreateBoardForm({
    onSuccess,
  });

  return (
    <BoardForm
      values={form.values}
      errors={form.errors}
      pending={form.pending}
      onChange={form.onChange}
      onSubmit={form.submit}
    />
  );
}