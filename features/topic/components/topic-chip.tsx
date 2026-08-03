import Link from "next/link";

interface TopicChipProps {
  label: string;
  slug?: string;
  active?: boolean;
  onClick?: () => void;
}

export function TopicChip({
  label,
  slug,
  active = false,
  onClick,
}: TopicChipProps) {
  const className = active
    ? "rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background"
    : "rounded-full border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent";

  if (slug) {
    return (
      <Link
        href={`/topic/${slug}`}
        className={className}
      >
        {label}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={className}>
      {label}
    </span>
  );
}