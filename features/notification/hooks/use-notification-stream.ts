// features/notification/hooks/use-notification-stream.ts
"use client";

import { useEffect } from "react";

export interface NotificationStreamEvent {
  type: "connected" | "created" | "deleted" | "follow-updated";
  notificationId?: string;
}

interface UseNotificationStreamOptions {
  onNotification: (event: NotificationStreamEvent) => void;
  enabled?: boolean;
}

export function useNotificationStream({
  onNotification,
  enabled = true,
}: UseNotificationStreamOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const source = new EventSource("/api/notifications/stream");

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationStreamEvent;

        if (
          data.type === "created" ||
          data.type === "deleted" ||
          data.type === "follow-updated"
        ) {
          onNotification(data);
        }
      } catch (error) {
        console.error("[Notifications] Invalid SSE event:", error);
      }
    };

    return () => {
      source.close();
    };
  }, [enabled, onNotification]);
}