import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import type { BoardSummary } from "@/features/board/types/board";
import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getCommentsByPinService } from "@/features/comment/services/get-comments-by-pin";
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
    pin.description ?? `Explore "${title}" on InspireStack.`;

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
          alt: title,
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

  const comments = await getCommentsByPinService(pin.id);

  const relatedPins = await getRelatedPinsService({
    pinId: pin.id,
    limit: 40,
  });

  const session = await auth();

  const currentUserId = session?.user?.id ?? null;

  let boards: BoardSummary[] = [];

  if (session?.user?.id != null) {
    boards = await getBoardsByUserService({
      userId: session.user.id,
      pinId: pin.id,
      includePrivate: true,
    });
  }

  const isOwner = session?.user?.id === pin.authorId;

  return (
    <PinDetail
      pin={pin}
      relatedPins={relatedPins}
      boards={boards}
      isOwner={isOwner}
      comments={comments}
      currentUserId={currentUserId}
    />
  );
}