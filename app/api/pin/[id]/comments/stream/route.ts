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

  let unsubscribe:
    | (() => void)
    | undefined;

  let heartbeat:
    | ReturnType<typeof setInterval>
    | undefined;

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
        await subscribeToComments(
          pinId,
          (event) => {
            send(
              JSON.stringify(event),
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
      "Cache-Control":
        "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}