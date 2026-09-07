export default function BoardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative aspect-4/3 w-full shrink-0 animate-pulse overflow-hidden rounded-3xl bg-muted sm:aspect-square sm:w-48" />

        <div className="min-w-0 flex-1">
          <div className="h-10 w-2/3 max-w-xl animate-pulse rounded-lg bg-muted" />

          <div className="mt-3 max-w-2xl space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>

          <div className="mt-4 h-5 w-32 animate-pulse rounded bg-muted" />

          <div className="mt-5 h-10 w-28 animate-pulse rounded-full bg-muted" />
        </div>
      </header>

      <section className="mt-10">
        <div className="flex gap-3">
          <div className="h-64 w-48 animate-pulse rounded-2xl bg-muted" />
          <div className="h-48 w-48 animate-pulse rounded-2xl bg-muted" />
          <div className="h-72 w-48 animate-pulse rounded-2xl bg-muted" />
          <div className="h-56 w-48 animate-pulse rounded-2xl bg-muted" />
        </div>
      </section>
    </main>
  );
}