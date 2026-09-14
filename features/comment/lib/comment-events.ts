import postgres from "postgres";

interface CommentEvent {
  type: "created" | "deleted";
  commentId: string;
  pinId: string;
}

type Listener = (
  event: CommentEvent,
) => void;

interface CommentEventBus {
  sql: ReturnType<typeof postgres>;
  listeners: Map<string, Set<Listener>>;
  listening: boolean;
  listeningPromise: Promise<void> | null;
}

const globalForComments =
  globalThis as typeof globalThis & {
    commentEventBus?: CommentEventBus;
  };

const eventBus =
  globalForComments.commentEventBus ??
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

globalForComments.commentEventBus =
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
        "inspirestack_comments",
        (payload) => {
          try {
            const event =
              JSON.parse(
                payload,
              ) as CommentEvent;

            const listeners =
              eventBus.listeners.get(
                event.pinId,
              );

            if (!listeners) {
              return;
            }

            for (const listener of listeners) {
              listener(event);
            }
          } catch (error) {
            console.error(
              "[Comments] Failed to process comment event:",
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
          "[Comments] Failed to start comment listener:",
          error,
        );

        throw error;
      });

  return eventBus.listeningPromise;
}

export async function subscribeToComments(
  pinId: string,
  listener: Listener,
) {
  await startListening();

  const current =
    eventBus.listeners.get(pinId) ??
    new Set<Listener>();

  current.add(listener);

  eventBus.listeners.set(
    pinId,
    current,
  );

  return () => {
    const listeners =
      eventBus.listeners.get(pinId);

    if (!listeners) {
      return;
    }

    listeners.delete(listener);

    if (listeners.size === 0) {
      eventBus.listeners.delete(pinId);
    }
  };
}