import { Share2 } from "lucide-react";

import { PinCardActionButton } from "./pin-card-action-button";

export function PinCardShareButton() {
  return (
    <PinCardActionButton aria-label="Share pin">
      <Share2 size={18} />
    </PinCardActionButton>
  );
}