import { FeedSkeleton } from "./feed-skeleton";

interface FeedSkeletonGridProps {
  count?: number;
}

export function FeedSkeletonGrid({
  count = 10,
}: FeedSkeletonGridProps) {
  return (
    <section
      aria-label="Loading feed"
      className="columns-2 gap-4 md:columns-3 xl:columns-4 2xl:columns-5"
    >
      {Array.from({ length: count }).map((_, index) => (
        <FeedSkeleton key={index} />
      ))}
    </section>
  );
}