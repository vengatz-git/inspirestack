export default function Loading() {
  return (
    <main className="container mx-auto py-10">
      <div className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>
    </main>
  );
}