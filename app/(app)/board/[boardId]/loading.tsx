export default function BoardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted sm:w-40" />

        <div className="min-w-0 flex-1 space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded-lg bg-muted" />

          <div className="h-5 w-full max-w-2xl animate-pulse rounded-lg bg-muted" />

          <div className="h-4 w-32 animate-pulse rounded-lg bg-muted" />

          <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </section>
    </main>
  );
}