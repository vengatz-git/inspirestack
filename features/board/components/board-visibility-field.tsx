import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

interface BoardVisibilityFieldProps {
  value: "PUBLIC" | "PRIVATE";
  onChange: (
    value: "PUBLIC" | "PRIVATE",
  ) => void;
  disabled?: boolean;
}

export function BoardVisibilityField({
  value,
  onChange,
  disabled,
}: BoardVisibilityFieldProps) {
  return (
    <Field>
      <FieldLabel>
        Visibility
      </FieldLabel>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange("PUBLIC")}
          className={
            value === "PUBLIC"
              ? "rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors"
              : "rounded-full border px-4 py-2 transition-colors hover:bg-accent"
          }
        >
          🌐 Public
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange("PRIVATE")}
          className={
            value === "PRIVATE"
              ? "rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors"
              : "rounded-full border px-4 py-2 transition-colors hover:bg-accent"
          }
        >
          🔒 Private
        </button>
      </div>

      <FieldDescription>
        Private boards are only visible to you.
      </FieldDescription>
    </Field>
  );
}