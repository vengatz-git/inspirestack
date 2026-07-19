export function PinCardSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        bg-card
        animate-pulse
      "
    >
      <div className="aspect-[3/4] w-full bg-muted" />

      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-muted" />

        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}