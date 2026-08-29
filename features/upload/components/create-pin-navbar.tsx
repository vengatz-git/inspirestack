"use client";

import { Check, Menu, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CreatePinNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isSaving?: boolean;
}

export function CreatePinNavbar({
  isSidebarOpen,
  onToggleSidebar,
  isSaving = false,
}: CreatePinNavbarProps) {
  return (
    <header className="flex h-14 items-center border-b bg-background">
      <div className="flex w-full items-center gap-3 px-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            isSidebarOpen
              ? "Collapse drafts"
              : "Open drafts"
          }
          className="size-9 rounded-lg"
          onClick={onToggleSidebar}
        >
          <Menu className="size-5" />
        </Button>

        <div className="min-w-0">
          <h1 className="text-sm font-semibold">
            Create Pin
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            {isSaving ? (
              <>
                <Save className="size-3.5" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="size-3.5" />
                <span>Draft saved</span>
              </>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-lg px-3 text-xs"
          >
            Save draft
          </Button>

          <Button
            type="submit"
            form="create-pin-form"
            size="sm"
            className="h-8 rounded-lg px-4 text-xs"
          >
            Publish Pin
          </Button>
        </div>
      </div>
    </header>
  );
}