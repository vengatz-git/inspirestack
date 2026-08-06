"use client";

import { LayoutGrid, Rows3 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardView } from "../../types/board-view";

interface BoardViewToggleProps {
  view: BoardView;
  onChange: (view: BoardView) => void;
}

export function BoardViewToggle({
  view,
  onChange,
}: BoardViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onChange("list")}
      >
        <Rows3 className="h-4 w-4" />
      </Button>

      <Button
        variant={view === "grid" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
}