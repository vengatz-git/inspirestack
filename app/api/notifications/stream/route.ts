import { auth } from "@/auth";

import { subscribeToNotifications } from "@/features/notification/lib/notification-events";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized.", {
      status: 401,
    });
  }

  const recipientId = session.user.id;

  let unsubscribe: (() => void) | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const send = (data: string) => {
        controller.enqueue(
          encoder.encode(`data: ${data}\n\n`),
        );
      };

      send(
        JSON.stringify({
          type: "connected",
        }),
      );

      unsubscribe =
        await subscribeToNotifications(
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

      heartbeat = setInterval(() => {
        controller.enqueue(
          encoder.encode(": heartbeat\n\n"),
        );
      }, 30_000);
    },

    cancel() {
      unsubscribe?.();

      if (heartbeat) {
        clearInterval(heartbeat);
      }
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