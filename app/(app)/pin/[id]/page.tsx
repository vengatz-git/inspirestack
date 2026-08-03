import { notFound } from "next/navigation";

import { PinDetail } from "@/features/pin/components/pin-detail";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";
import { getRelatedPinsService } from "@/features/pin/services/get-related-pins";

type PinPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PinPage({
  params,
}: PinPageProps) {
  const { id } = await params;

  const pin = await getPinByIdService(id);

  if (!pin) {
    notFound();
  }

  const relatedPins = await getRelatedPinsService({
    pinId: pin.id,
    limit: 40,
  });

  return (
    <PinDetail
      pin={pin}
      relatedPins={relatedPins}
    />
  );
}