interface EmptyProfileContentProps {
  title: string;
  description: string;
}

export function EmptyProfileContent({
  title,
  description,
}: EmptyProfileContentProps) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
}