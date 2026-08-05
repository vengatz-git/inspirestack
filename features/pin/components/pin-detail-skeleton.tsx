export function PinDetailSkeleton() {
  return (
    <>
      <main className="mx-auto max-w-screen-2xl px-6 py-4">
        <div className="flex justify-center">
          <div className="h-[70vh] min-h-140 max-h-180 w-full max-w-7xl animate-pulse overflow-hidden rounded-3xl border bg-card">
            <div className="grid h-full grid-cols-2">
              <div className="bg-muted" />

              <div className="flex flex-col gap-6 p-8">
                <div className="h-8 w-2/3 rounded bg-muted" />

                <div className="h-5 w-1/3 rounded bg-muted" />

                <div className="space-y-3">
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                  <div className="h-4 w-4/6 rounded bg-muted" />
                </div>

                <div className="mt-auto h-12 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-8 flex justify-center">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="aspect-3/4 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}