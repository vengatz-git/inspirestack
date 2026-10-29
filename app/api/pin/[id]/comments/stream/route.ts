import { auth } from "@/auth";

import { subscribeToComments } from "@/features/comment/lib/comment-events";

export const runtime = "nodejs";

type CommentsStreamRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: CommentsStreamRouteProps,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized.", {
      status: 401,
    });
  }

  const { id: pinId } = await params;

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

      send(JSON.stringify({ type: "connected" }));

      const stop = await subscribeToComments(pinId, (event) => {
        send(JSON.stringify(event));
      });

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