import postgres from "postgres";

interface NotificationEvent {
  type: "created" | "deleted";
  notificationId: string;
  recipientId: string;
}

type Listener = (
  event: NotificationEvent,
) => void;

interface NotificationEventBus {
  sql: ReturnType<typeof postgres>;
  listeners: Map<string, Set<Listener>>;
  listening: boolean;
  listeningPromise: Promise<void> | null;
}

const globalForNotifications =
  globalThis as typeof globalThis & {
    notificationEventBus?: NotificationEventBus;
  };

const eventBus =
  globalForNotifications.notificationEventBus ??
  {
    sql: postgres(
      process.env.DATABASE_DIRECT_URL!,
      {
        max: 1,
      },
    ),
    listeners: new Map<
      string,
      Set<Listener>
    >(),
    listening: false,
    listeningPromise: null,
  };

globalForNotifications.notificationEventBus =
  eventBus;

async function startListening() {
  if (eventBus.listening) {
    return;
  }

  if (eventBus.listeningPromise) {
    return eventBus.listeningPromise;
  }

  eventBus.listeningPromise =
    eventBus.sql
      .listen(
        "inspirestack_notifications",
        (payload) => {
          try {
            const event =
              JSON.parse(
                payload,
              ) as NotificationEvent;

            const listeners =
              eventBus.listeners.get(
                event.recipientId,
              );

            if (!listeners) {
              return;
            }

            for (const listener of listeners) {
              listener(event);
            }
          } catch (error) {
            console.error(
              "[Notifications] Failed to process notification event:",
              error,
            );
          }
        },
      )
      .then(() => {
        eventBus.listening = true;
      })
      .catch((error) => {
        eventBus.listeningPromise = null;

        console.error(
          "[Notifications] Failed to start notification listener:",
          error,
        );

        throw error;
      });

  return eventBus.listeningPromise;
}

export async function subscribeToNotifications(
  recipientId: string,
  listener: Listener,
) {
  await startListening();

  const current =
    eventBus.listeners.get(recipientId) ??
    new Set<Listener>();

  current.add(listener);

  eventBus.listeners.set(
    recipientId,
    current,
  );

  return () => {
    const listeners =
      eventBus.listeners.get(recipientId);

    if (!listeners) {
      return;
    }

    listeners.delete(listener);

    if (listeners.size === 0) {
      eventBus.listeners.delete(
        recipientId,
      );
    }
  };
}