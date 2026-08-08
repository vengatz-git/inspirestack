"use client";

import { BoardForm } from "./board-form";
import { useEditBoardForm } from "../hooks/use-edit-board-form";

interface EditBoardFormProps {
  boardId: string;
  initialName: string;
  initialDescription: string | null;
  initialVisibility: "PUBLIC" | "PRIVATE";
  onSuccess?: () => void | Promise<void>;
}

export function EditBoardForm({
  boardId,
  initialName,
  initialDescription,
  initialVisibility,
  onSuccess,
}: EditBoardFormProps) {
  const form = useEditBoardForm({
    boardId,
    initialName,
    initialDescription,
    initialVisibility,
    onSuccess,
  });

  return (
    <div className="space-y-4">
      {form.serverError && (
        <p
          role="alert"
          className="text-sm text-destructive"
        >
          {form.serverError}
        </p>
      )}

      <BoardForm
        values={form.values}
        errors={form.errors}
        pending={form.pending}
        submitLabel="Save Changes"
        pendingLabel="Saving..."
        onChange={form.onChange}
        onSubmit={form.submit}
      />
    </div>
  );
}