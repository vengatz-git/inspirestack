import { Ellipsis } from "lucide-react";

import { PinCardActionButton } from "./pin-card-action-button";

export function PinCardMoreButton() {
  return (
    <PinCardActionButton aria-label="More options">
      <Ellipsis size={18} />
    </PinCardActionButton>
  );
}