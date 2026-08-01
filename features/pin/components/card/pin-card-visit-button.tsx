interface PinCardVisitButtonProps {
  href: string;
}

export function PinCardVisitButton({
  href,
}: PinCardVisitButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        rounded-full
        bg-white/90
        px-4
        py-2
        text-sm
        font-medium
        text-black
        backdrop-blur-md

        transition-colors
        duration-200

        hover:bg-white
        active:bg-zinc-100
      "
    >
      Visit site
    </a>
  );
}