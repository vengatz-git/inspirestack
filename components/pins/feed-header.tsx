interface FeedHeaderProps {
  title: string;
  description: string;
}

export function FeedHeader({
  title,
  description,
}: FeedHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}