export function FeedSkeleton() {
  return (
    <div className="mb-4 break-inside-avoid">
      <article className="bg-card overflow-hidden rounded-xl border">
        <div className="aspect-3/4 animate-pulse bg-muted" />

        <div className="space-y-2 p-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </article>
    </div>
  );
}