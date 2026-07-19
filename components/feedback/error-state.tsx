"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-6">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <Button
          className="mt-6 rounded-full"
          onClick={onRetry}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}