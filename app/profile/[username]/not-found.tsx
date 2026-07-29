export default function NotFound() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold">
        Profile not found
      </h1>

      <p className="mt-2 text-muted-foreground">
        The requested user profile does not exist.
      </p>
    </main>
  );
}