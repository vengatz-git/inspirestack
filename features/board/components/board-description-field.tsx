import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface BoardDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function BoardDescriptionField({
  value,
  onChange,
  error,
  disabled,
}: BoardDescriptionFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="board-description">
        Description
      </FieldLabel>

      <Textarea
        id="board-description"
        rows={4}
        value={value}
        disabled={disabled}
        placeholder="Tell people what this board is about..."
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <FieldDescription>
        Optional. Describe the purpose of this board.
      </FieldDescription>

      <FieldError>
        {error}
      </FieldError>
    </Field>
  );
}