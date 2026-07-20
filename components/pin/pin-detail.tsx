import type { PinWithProfile } from "@/types/pin-with-profile";

import { DetailViewer } from "./detail-viewer";
import { PinActions } from "./pin-actions";
import { PinInfo } from "./pin-info";
import { PinSidebar } from "./pin-sidebar";
import { PinImage } from "./pin-image";
import { RelatedPins } from "./related-pins";

interface PinDetailProps {
  pin: PinWithProfile;
  relatedPins: PinWithProfile[];
}

export function PinDetail({
  pin,
  relatedPins,
}: PinDetailProps) {
  return (
    <div className="space-y-20">
      <DetailViewer
        image={
          <PinImage
            src={pin.imageUrl}
            alt={pin.title}
          />
        }
        sidebar={
          <PinSidebar
            actions={<PinActions />}
            info={<PinInfo pin={pin} />}
          />
        }
      />

      <RelatedPins pins={relatedPins} />
    </div>
  );
}