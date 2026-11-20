"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

interface NotificationsPageProps {
  initialNotifications: Notification[];
}

export function NotificationsPage({
  initialNotifications,
}: NotificationsPageProps) {
  const router = useRouter();

  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [clearing, setClearing] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);

  const refreshNotifications = useCallback(async () => {
    const items = await getNotifications();
    setNotifications(items as Notification[]);
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

  async function handleRead(id: string) {
    const notification = notifications.find((n) => n.id === id);
    if (!notification || notification.readAt !== null) {
      return;
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, readAt: new Date() } : item,
      ),
    );

    try {
      await markNotificationAsRead(id);
    } catch {
      // Rollback on error
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, readAt: null } : item,
        ),
      );
    }
  }

  async function handleMarkAllAsRead() {
    setMarkingAll(true);
    const prevNotifications = [...notifications];

    setNotifications((prev) =>
      prev.map((item) => ({ ...item, readAt: new Date() })),
    );

    try {
      await markAllNotificationsAsRead();
      toast.success("All notifications marked as read.");
    } catch {
      setNotifications(prevNotifications);
      toast.error("Failed to mark all as read.");
    } finally {
      setMarkingAll(false);
    }
  }

  async function handleClearAll() {
    if (!confirm("Are you sure you want to clear all notifications?")) {
      return;
    }

    setClearing(true);
    const prevNotifications = [...notifications];
    setNotifications([]);

    try {
      await clearNotifications();
      toast.success("Notifications cleared.");
    } catch {
      setNotifications(prevNotifications);
      toast.error("Failed to clear notifications.");
    } finally {
      setClearing(false);
    }
  }

  const unreadCount = notifications.filter((n) => n.readAt === null).length;
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => n.readAt === null)
      : notifications;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-4 sm:px-6">
      <div className="rounded-3xl border bg-card shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {unreadCount} unread
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                disabled={markingAll}
                onClick={handleMarkAllAsRead}
                className="gap-1.5 text-xs font-medium"
              >
                {markingAll ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CheckCheck className="size-3.5" />
                )}
                Mark all read
              </Button>
            )}

            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                disabled={clearing}
                onClick={handleClearAll}
                className="text-muted-foreground hover:text-destructive gap-1.5 text-xs font-medium"
              >
                {clearing ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b px-6">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              filter === "all"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              filter === "unread"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Bell className="size-6 text-muted-foreground" />
              </div>
              <p className="mt-4 font-medium">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "No notifications yet"}
              </p>
              <p className="text-muted-foreground mt-1 max-w-xs text-sm">
                {filter === "unread"
                  ? "There are no unread notifications right now."
                  : "When you receive likes, comments, saves, or follows, they'll appear here."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleRead}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
