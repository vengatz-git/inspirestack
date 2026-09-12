"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NotificationButtonProps {
  unreadCount: number;
}

export function NotificationButton({
  unreadCount,
}: NotificationButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative rounded-full"
      aria-label="Notifications"
    >
      <Bell className="size-5" />

      {unreadCount > 0 && (
        <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-4 text-destructive-foreground">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Button>
  );
}