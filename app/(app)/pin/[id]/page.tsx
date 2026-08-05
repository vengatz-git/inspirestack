import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PinDetail } from "@/features/pin/components/pin-detail";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";
import { getRelatedPinsService } from "@/features/pin/services/get-related-pins";

type PinPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PinPageProps): Promise<Metadata> {
  const { id } = await params;

  const pin = await getPinByIdService(id);

  if (!pin) {
    return {
      title: "Pin not found | InspireStack",
    };
  }

  const title = pin.title ?? "Untitled Pin";

  const description =
    pin.description ??
    `Explore "${title}" on InspireStack.`;

  return {
    title: `${title} | InspireStack`,
    description,

    alternates: {
      canonical: `/pin/${pin.id}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: pin.imageUrl,
          alt: pin.altText ?? title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pin.imageUrl],
    },
  };
}

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