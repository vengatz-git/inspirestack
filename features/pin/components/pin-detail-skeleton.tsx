export function PinDetailSkeleton() {
  return (
    <main className="mx-auto max-w-screen-2xl px-2 pt-0 md:px-6">
      <div className="flex justify-center">
        <div
          className="
            w-full
            max-w-[1088px]
            overflow-hidden
            rounded-3xl
            border
            bg-card
            shadow-2xl
            md:h-[504px]
          "
        >
          <div className="grid min-h-0 grid-cols-1 md:h-full md:grid-cols-2">
            <div className="aspect-4/5 min-h-0 min-w-0 animate-pulse bg-muted md:aspect-auto" />

            <div className="flex min-h-0 min-w-0 flex-col gap-6 overflow-hidden p-8">
              <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />

              <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />

              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
              </div>

              <div className="mt-auto h-12 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}