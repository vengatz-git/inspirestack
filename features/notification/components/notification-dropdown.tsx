// features/notification/components/notification-dropdown.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { clearNotifications } from "../actions/clear-notifications";
import { getNotifications } from "../actions/get-notifications";
import { markAllNotificationsAsRead } from "../actions/mark-all-notifications-as-read";
import { markNotificationAsRead } from "../actions/mark-notification-as-read";
import {
  useNotificationStream,
  type NotificationStreamEvent,
} from "../hooks/use-notification-stream";
import { NotificationItem } from "./notification-item";

import type { Notification } from "../types/notification";

interface NotificationDropdownProps {
  initialUnreadCount: number;
}

export function NotificationDropdown({
  initialUnreadCount,
}: NotificationDropdownProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);

  const refreshNotifications = useCallback(async () => {
    const items = await getNotifications();
    const typedItems = items as Notification[];

    setNotifications(typedItems);
    setUnreadCount(
      typedItems.filter((notification) => notification.readAt === null).length,
    );
  }, []);

  const handleNotification = useCallback(
    async (event: NotificationStreamEvent) => {
      if (event.type === "follow-updated") {
        router.refresh();
        return;
      }

      await refreshNotifications();
    },
    [refreshNotifications, router],
  );

  useNotificationStream({
    onNotification: handleNotification,
  });

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    async function loadNotifications() {
      setLoading(true);

      try {
        await refreshNotifications();
      } finally {
        setLoading(false);
      }
    }

    void loadNotifications();
  }, [open, refreshNotifications]);

  async function handleRead(id: string) {
    const result = await markNotificationAsRead(id);

    if (!result.success) {
      return;
    }

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, readAt: new Date() }
          : notification,
      ),
    );

    setUnreadCount((current) => Math.max(current - 1, 0));
  }

  async function handleMarkAllRead() {
    const result = await markAllNotificationsAsRead();

    if (!result.success) {
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        readAt: notification.readAt ?? new Date(),
      })),
    );

    setUnreadCount(0);
  }

  async function handleClearNotifications() {
    setClearing(true);

    try {
      const result = await clearNotifications();

      if (!result.success) {
        return;
      }

      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setClearing(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Bell className="size-5" />

        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-4 text-destructive-foreground">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="fixed inset-x-3 top-16 z-50 mt-2 max-h-[75vh] overflow-hidden rounded-2xl border bg-background shadow-2xl sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:w-96 sm:max-w-sm sm:max-h-none sm:shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold">Notifications</h2>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-muted-foreground text-xs hover:text-foreground"
              >
                Mark all as read
              </button>
            )}

            {unreadCount === 0 && notifications.length > 0 && (
              <button
                type="button"
                disabled={clearing}
                onClick={handleClearNotifications}
                className="text-muted-foreground text-xs hover:text-foreground disabled:opacity-50"
              >
                {clearing ? "Clearing..." : "Clear notifications"}
              </button>
            )}
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="text-muted-foreground px-4 py-8 text-center text-sm">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-muted-foreground px-4 py-10 text-center text-sm">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={handleRead}
                />
              ))
            )}
          </div>

          <div className="border-t p-2 text-center">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
