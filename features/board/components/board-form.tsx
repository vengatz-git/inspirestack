import { Button } from "@/components/ui/button";

import { BoardDescriptionField } from "./board-description-field";
import { BoardNameField } from "./board-name-field";
import { BoardVisibilityField } from "./board-visibility-field";

interface BoardFormProps {
  values: {
    name: string;
    description: string;
    visibility: "PUBLIC" | "PRIVATE";
  };

  errors: {
    name?: string;
    description?: string;
    visibility?: string;
  };

  pending: boolean;

  submitLabel?: string;
  pendingLabel?: string;

  onChange: {
    name: (value: string) => void;
    description: (value: string) => void;
    visibility: (value: "PUBLIC" | "PRIVATE") => void;
  };

  onSubmit: () => Promise<void> | void;
}

export function BoardForm({
  values,
  errors,
  pending,
  submitLabel = "Create Board",
  pendingLabel = "Creating...",
  onChange,
  onSubmit,
}: BoardFormProps) {
  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit();
      }}
    >
      <BoardNameField
        value={values.name}
        error={errors.name}
        disabled={pending}
        onChange={onChange.name}
      />

      <BoardDescriptionField
        value={values.description}
        error={errors.description}
        disabled={pending}
        onChange={onChange.description}
      />

      <BoardVisibilityField
        value={values.visibility}
        disabled={pending}
        onChange={onChange.visibility}
      />

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
