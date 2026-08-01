interface FeedSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function FeedSection({ title, children }: FeedSectionProps) {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="hidden text-lg font-semibold md:block">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}