import { PinCardSaveButton } from "./pin-card-save-button";

interface PinCardTopActionsProps {
  saved?: boolean;
}

export function PinCardTopActions({ saved = false }: PinCardTopActionsProps) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 top-3 flex justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <PinCardSaveButton saved={saved} />
    </div>
  );
}
