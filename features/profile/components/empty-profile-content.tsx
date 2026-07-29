export function EmptyProfileContent() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed">
      <h2 className="text-xl font-semibold">
        No Pins Yet
      </h2>

      <p className="text-muted-foreground mt-2">
        This user hasn't shared any inspiration yet.
      </p>
    </div>
  );
}