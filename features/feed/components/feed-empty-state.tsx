import { Compass } from "lucide-react";

export function FeedEmptyState() {
  return (
    <section
      aria-label="Empty feed"
      className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center"
    >
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
        <Compass className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold">
        Nothing to discover yet
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        There are no pins available right now. Check back
        later for something new to discover.
      </p>
    </section>
  );
}