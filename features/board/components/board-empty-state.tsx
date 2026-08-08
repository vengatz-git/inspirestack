export function BoardEmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">
        This board is empty
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Start saving inspiration to this board and it will appear here.
      </p>
    </div>
  );
}