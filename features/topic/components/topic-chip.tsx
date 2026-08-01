interface TopicChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function TopicChip({ label, active = false, onClick }: TopicChipProps) {
  const className = active
    ? "rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background"
    : "rounded-full border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent";

  if (!onClick) {
    return <span className={className}>{label}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}