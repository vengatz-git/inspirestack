export function FeedLoadingIndicator() {
  return (
    <div role="status" aria-live="polite" className="flex w-full items-center justify-center py-10">
      <div
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground"
      />
      <span className="sr-only">Loading feed…</span>
    </div>
  );
}