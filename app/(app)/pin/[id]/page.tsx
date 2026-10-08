import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import type { BoardSummary } from "@/features/board/types/board";
import { getCommentsByPinService } from "@/features/comment/services/get-comments-by-pin";
import { getPinLikeData } from "@/features/like/services/get-pin-like-data";
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
  const description = pin.description ?? `Explore "${title}" on InspireStack.`;

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

export default async function PinPage({ params }: PinPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

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

  const currentUserId = session.user.id;

  const likeData = await getPinLikeData(
    pin.id,
    currentUserId,
  );

  const boards: BoardSummary[] = await getBoardsByUserService({
    userId: currentUserId,
    pinId: pin.id,
    includePrivate: true,
  });

  const isOwner = currentUserId === pin.authorId;

  return (
    <PinDetail
      pin={pin}
      relatedPins={relatedPins}
      boards={boards}
      isOwner={isOwner}
      comments={comments}
      currentUserId={currentUserId}
      likeCount={likeData.likeCount}
      isLiked={likeData.isLiked}
    />
  );
}