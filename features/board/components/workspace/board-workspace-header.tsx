"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { BoardView } from "../../types/board-view";

import { BoardViewToggle } from "./board-view-toggle";

interface BoardWorkspaceHeaderProps {
  view: BoardView;
  onViewChange: (view: BoardView) => void;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export function BoardWorkspaceHeader({
  view,
  onViewChange,
  onClose,
  query,
  onQueryChange,
}: BoardWorkspaceHeaderProps) {
  return (
    <header className="border-border/40 border-b px-6 py-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Boards</h2>

        <div className="flex items-center gap-3">
          <BoardViewToggle view={view} onChange={onViewChange} />

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="border-border/60 bg-background/80 hover:bg-accent h-11 w-11 rounded-2xl border backdrop-blur-sm transition-colors"
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search boards..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </header>
  );
}
