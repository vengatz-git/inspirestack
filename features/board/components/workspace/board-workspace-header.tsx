"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { BoardView } from "../../types/board-view";

import { BoardSearch } from "./board-search";
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
    <header className="border-border/40 border-b px-4 py-4 md:px-6 md:py-5">
      <div className="mb-4 flex items-center justify-between gap-3 md:mb-5">
        <h2 className="text-xl font-semibold md:text-2xl">
          Boards
        </h2>

        <div className="flex items-center gap-2 md:gap-3">
          <BoardViewToggle
            view={view}
            onChange={onViewChange}
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="border-border/60 bg-background/80 hover:bg-accent h-12 w-12 rounded-2xl border backdrop-blur-sm transition-colors md:h-11 md:w-11"
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      <BoardSearch
        value={query}
        onChange={onQueryChange}
      />
    </header>
  );
}