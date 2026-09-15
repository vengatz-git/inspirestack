import { subscribeToPinLikes } from "@/features/like/lib/like-events";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const { id: pinId } = await params;

  const encoder = new TextEncoder();

  let unsubscribe: (() => void) | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    start(controller) {
      function send(
        event: string,
        data: unknown,
      ) {
        controller.enqueue(
          encoder.encode(
            `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`,
          ),
        );
      }

      send("connected", {
        pinId,
      });

      unsubscribe = subscribeToPinLikes(
        pinId,
        (event) => {
          send(event.type, event);
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