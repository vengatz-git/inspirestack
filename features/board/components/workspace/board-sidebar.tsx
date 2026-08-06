"use client";

import { Clock3 } from "lucide-react";

import { CreateBoardButton } from "../create-board-button";

export function BoardSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border/40 bg-muted/10">
      <div className="space-y-8 p-6">
        <div>
          <h2 className="text-lg font-semibold">
            Quick Access
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Save your inspiration into organized collections.
          </p>
        </div>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Clock3 className="size-4" />

            <span className="text-sm font-medium">
              Recently Used
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Your recently used boards will appear here.
          </p>
        </section>
      </div>

      <div className="mt-auto flex justify-center border-t border-border/40 p-6">
        <CreateBoardButton />
      </div>
    </aside>
  );
}