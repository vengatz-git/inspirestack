"use client";

import { Globe2, LockKeyhole } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

interface PinVisibilityFieldProps {
  value: "PUBLIC" | "PRIVATE";
  onChange: (value: "PUBLIC" | "PRIVATE") => void;
  disabled?: boolean;
}

export function PinVisibilityField({
  value,
  onChange,
  disabled = false,
}: PinVisibilityFieldProps) {
  return (
    <Field>
      <FieldLabel>Visibility</FieldLabel>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={disabled}
          aria-pressed={value === "PUBLIC"}
          onClick={() => onChange("PUBLIC")}
          className={[
            "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
            value === "PUBLIC"
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:bg-accent",
            disabled ? "cursor-not-allowed opacity-50" : "",
          ].join(" ")}
        >
          <Globe2 className="size-4" />
          Public
        </button>

        <button
          type="button"
          disabled={disabled}
          aria-pressed={value === "PRIVATE"}
          onClick={() => onChange("PRIVATE")}
          className={[
            "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
            value === "PRIVATE"
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:bg-accent",
            disabled ? "cursor-not-allowed opacity-50" : "",
          ].join(" ")}
        >
          <LockKeyhole className="size-4" />
          Private
        </button>
      </div>

      <FieldDescription>
        Private Pins are only visible to you.
      </FieldDescription>
    </Field>
  );
}