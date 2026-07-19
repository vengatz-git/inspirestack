import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>
    </div>
  );
}