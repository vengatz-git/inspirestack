import postgres from "postgres";

type LikeEvent = {
  type: "updated";
  pinId: string;
  likeCount: number;
};

type LikeListener = (event: LikeEvent) => void;

type LikeEventState = {
  sql?: ReturnType<typeof postgres>;
  listeners: Map<string, Set<LikeListener>>;
};

const globalState = globalThis as typeof globalThis & {
  __inspireStackLikeEvents?: LikeEventState;
};

const state: LikeEventState =
  globalState.__inspireStackLikeEvents ?? {
    listeners: new Map(),
  };

globalState.__inspireStackLikeEvents = state;

function getSql() {
  if (!state.sql) {
    state.sql = postgres(
      process.env.DATABASE_DIRECT_URL!,
      {
        max: 1,
        idle_timeout: 0,
      },
    );

    state.sql.listen(
      "inspirestack_likes",
      (payload) => {
        try {
          const event = JSON.parse(
            payload,
          ) as LikeEvent;

          const listeners =
            state.listeners.get(event.pinId);

          if (!listeners) {
            return;
          }

          for (const listener of listeners) {
            listener(event);
          }
        } catch {
          // Ignore malformed notifications.
        }
      },
    );
  }

  return state.sql;
}

export function subscribeToPinLikes(
  pinId: string,
  listener: LikeListener,
) {
  getSql();

  let listeners = state.listeners.get(pinId);

  if (!listeners) {
    listeners = new Set();
    state.listeners.set(pinId, listeners);
  }

  listeners.add(listener);

  return () => {
    listeners?.delete(listener);

    if (listeners?.size === 0) {
      state.listeners.delete(pinId);
    }
  };
}

export async function publishPinLikeUpdate(
  event: LikeEvent,
) {
  const sql = getSql();

  await sql.notify(
    "inspirestack_likes",
    JSON.stringify(event),
  );
}