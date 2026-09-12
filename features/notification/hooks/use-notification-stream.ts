"use client";

import { useEffect } from "react";

interface NotificationStreamEvent {
  type: "connected" | "notification";
  notificationId?: string;
}

interface UseNotificationStreamOptions {
  onNotification: (
    notificationId: string,
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
          data.type === "notification" &&
          data.notificationId
        ) {
          onNotification(data.notificationId);
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