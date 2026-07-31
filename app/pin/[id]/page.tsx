import { notFound } from "next/navigation";

import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";
import { PinDetail } from "@/features/pin/components/pin-detail";

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

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PinDetail pin={pin} />
    </main>
  );
}