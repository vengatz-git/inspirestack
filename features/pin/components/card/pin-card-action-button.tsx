import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface PinCardActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PinCardActionButton({
  children,
  className,
  ...props
}: PinCardActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full",
        "bg-white/90 text-black backdrop-blur-md",
        "transition-colors duration-200",
        "hover:bg-white",
        "active:bg-zinc-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}