import { notFound } from "next/navigation";

import { PinDetail } from "@/components/pin/pin-detail";
import { RelatedPins } from "@/components/pin/related-pins";
import { getPinById, getRelatedPins } from "@/lib/db/queries/posts";

interface PinPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PinPage({ params }: PinPageProps) {
  const { id } = await params;

  const pin = await getPinById(id);

  if (!pin) {
    notFound();
  }

  const relatedPins = await getRelatedPins(id);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10">
      <PinDetail pin={pin} />

      <RelatedPins pins={relatedPins} />
    </main>
  );
}