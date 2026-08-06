import { Layers3 } from "lucide-react";

export function BoardCoverPlaceholder() {
  return (
    <div className="
      from-muted via-muted/80 to-muted/50 flex h-full 
      w-full flex-col items-center justify-center bg-linear-to-br"
    >
      <Layers3 className="text-muted-foreground/70 h-7 w-7" />

      <span className="text-muted-foreground mt-2 text-xs font-medium">
        InspireStack
      </span>
    </div>
  );
}