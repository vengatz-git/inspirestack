import { SearchX } from "lucide-react";

export function BoardSearchEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20">
      <SearchX className="text-muted-foreground size-10" />

      <h3 className="mt-5 text-lg font-semibold">
        No boards found
      </h3>

      <p className="text-muted-foreground mt-2 text-center text-sm">
        Try another search term.
      </p>
    </div>
  );
}