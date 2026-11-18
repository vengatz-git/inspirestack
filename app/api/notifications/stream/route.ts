import { auth } from "@/auth";

import { subscribeToNotifications } from "@/features/notification/lib/notification-events";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized.", {
      status: 401,
    });
  }

  const recipientId = session.user.id;

  let unsubscribe: (() => void) | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;
  let isClosed = false;

  const cleanup = () => {
    if (isClosed) {
      return;
    }

    isClosed = true;
    unsubscribe?.();
    unsubscribe = undefined;

    if (heartbeat) {
      clearInterval(heartbeat);
      heartbeat = undefined;
    }
  };

  request.signal.addEventListener("abort", () => {
    cleanup();
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const enqueue = (data: string) => {
        if (isClosed) {
          return;
        }

        try {
          controller.enqueue(encoder.encode(data));
        } catch {
          cleanup();
        }
      };

      const send = (data: string) => {
        enqueue(`data: ${data}\n\n`);
      };

      send(
        JSON.stringify({
          type: "connected",
        }),
      );

      const stop = await subscribeToNotifications(
        recipientId,
        (event) => {
          send(
            JSON.stringify({
              type: event.type,
              notificationId:
                event.notificationId,
            }),
          );
        },
      );

      if (isClosed) {
        stop();
        return;
      }

      unsubscribe = stop;

      heartbeat = setInterval(() => {
        enqueue(": heartbeat\n\n");
      }, 30_000);
    },

    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
