import { PinCardSkeleton } from "./pin-card-skeleton";

interface PinGridSkeletonProps {
  count?: number;
}

export function PinGridSkeleton({
  count = 8,
}: PinGridSkeletonProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <PinCardSkeleton key={index} />
      ))}
    </div>
  );
}