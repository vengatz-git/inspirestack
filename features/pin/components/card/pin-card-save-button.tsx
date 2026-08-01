interface PinCardSaveButtonProps {
  saved?: boolean;
}

export function PinCardSaveButton({
  saved = false,
}: PinCardSaveButtonProps) {
  return (
    <button
      type="button"
      className="
        rounded-full
        bg-red-600
        px-5
        py-2
        text-sm
        font-semibold
        text-white

        transition-colors
        duration-200

        hover:bg-red-700
        active:bg-red-800
      "
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}