import { auth } from "@/auth";
import { subscribeToPinLikes } from "@/features/like/lib/like-events";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";

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
  const session = await auth();
  const pin = await getPinByIdService(pinId, session?.user?.id);

  if (!pin) {
    return new Response("Pin not found.", {
      status: 404,
    });
  }

  const encoder = new TextEncoder();

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

  const stream = new ReadableStream({
    start(controller) {
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

      function send(
        event: string,
        data: unknown,
      ) {
        enqueue(
          `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`,
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