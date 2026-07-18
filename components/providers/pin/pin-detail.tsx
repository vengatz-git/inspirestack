import { PinWithProfile } from "@/types/pin-with-profile";

import { PinActions } from "./pin-actions";
import { PinImage } from "./pin-image";
import { PinInfo } from "./pin-info";
import { PinLayout } from "./pin-layout";
import { PinSidebar } from "./pin-sidebar";
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
    <div className="space-y-10">
      <PinLayout
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