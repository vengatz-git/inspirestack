import Link from "next/link";
import { SearchX, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Button asChild className="mt-8">
          <Link href={actionHref}>
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}