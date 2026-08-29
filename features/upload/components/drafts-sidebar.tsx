"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DraftsSidebarProps {
  isOpen: boolean;
}

export function DraftsSidebar({
  isOpen,
}: DraftsSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="w-64 shrink-0 border-r bg-muted/20">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">
              Drafts
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Your unfinished Pins
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            aria-label="Create new draft"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center">
            <p className="text-sm font-medium">
              No drafts yet
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Your unfinished Pins will appear here.
            </p>
          </div>
        </div>

        <div className="border-t px-4 py-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Drafts are automatically deleted after
            30 days.
          </p>
        </div>
      </div>
    </aside>
  );
}