import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface BoardNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function BoardNameField({
  value,
  onChange,
  error,
  disabled,
}: BoardNameFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="board-name">
        Board name
      </FieldLabel>

      <Input
        id="board-name"
        value={value}
        disabled={disabled}
        maxLength={100}
        placeholder="Dream Kitchen"
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <FieldDescription>
        Give your board a short, memorable name.
      </FieldDescription>

      <FieldError>
        {error}
      </FieldError>
    </Field>
  );
}