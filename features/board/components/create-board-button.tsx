"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateBoardDialog } from "./create-board-dialog";

interface CreateBoardButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export function CreateBoardButton({
  className,
  variant,
  size,
  children,
}: CreateBoardButtonProps = {}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children ?? "Create Board"}
      </Button>

      <CreateBoardDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
