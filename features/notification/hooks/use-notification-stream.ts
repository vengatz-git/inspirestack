"use client";

import { useEffect } from "react";

interface NotificationStreamEvent {
  type: "connected" | "created" | "deleted";
  notificationId?: string;
}

interface UseNotificationStreamOptions {
  onNotification: (
    event: NotificationStreamEvent,
  ) => void;
}

export function useNotificationStream({
  onNotification,
}: UseNotificationStreamOptions) {
  useEffect(() => {
    const source = new EventSource(
      "/api/notifications/stream",
    );

    source.onmessage = (event) => {
      try {
        const data =
          JSON.parse(
            event.data,
          ) as NotificationStreamEvent;

        if (
          data.type === "created" ||
          data.type === "deleted"
        ) {
          onNotification(data);
        }
      } catch (error) {
        console.error(
          "[Notifications] Invalid SSE event:",
          error,
        );
      }
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [onNotification]);
}