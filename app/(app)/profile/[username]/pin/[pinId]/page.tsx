import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";

import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getCommentsByPinService } from "@/features/comment/services/get-comments-by-pin";
import { getPinLikeData } from "@/features/like/services/get-pin-like-data";
import { PinDetail } from "@/features/pin/components/pin-detail";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";
import { getRelatedPinsService } from "@/features/pin/services/get-related-pins";
import { getUserPinsService } from "@/features/pin/services/get-pins-by-user";

import { ProfileMoreFromUser } from "@/features/profile/components/profile-more-from-user";

type ProfilePinPageProps = {
  params: Promise<{
    username: string;
    pinId: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProfilePinPageProps): Promise<Metadata> {
  const { username, pinId } = await params;

  const pin = await getPinByIdService(pinId);

  if (!pin || pin.author.username !== username) {
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
      canonical: `/profile/${username}/pin/${pin.id}`,
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

export default async function ProfilePinPage({ params }: ProfilePinPageProps) {
  const { username, pinId } = await params;
  const session = await auth();

  const pin = await getPinByIdService(pinId, session?.user?.id);

  if (!pin || pin.author.username !== username) {
    notFound();
  }

  const currentUserId = session?.user?.id ?? null;

  const [comments, relatedPins, moreFromUserResult, likeData] =
    await Promise.all([
      getCommentsByPinService(pin.id),

      getRelatedPinsService({
        pinId: pin.id,
        limit: 40,
        excludeAuthorId: pin.authorId,
        viewerUserId: currentUserId,
      }),

      getUserPinsService({
        userId: pin.author.id,
        viewerUserId: currentUserId,
        limit: 40,
        excludePinId: pin.id,
      }),

      getPinLikeData(pin.id, currentUserId ?? undefined),
    ]);

  const boards = currentUserId
    ? await getBoardsByUserService({
        userId: currentUserId,
        pinId: pin.id,
        includePrivate: true,
      })
    : [];

  return (
    <main>
      <PinDetail
        pin={pin}
        relatedPins={relatedPins}
        boards={boards}
        isOwner={currentUserId === pin.authorId}
        comments={comments}
        currentUserId={currentUserId}
        likeCount={likeData.likeCount}
        isLiked={likeData.isLiked}
        afterDetail={
          <ProfileMoreFromUser
            username={username}
            pins={moreFromUserResult.pins}
          />
        }
      />

      {/* <ProfileMoreFromUser username={username} pins={moreFromUserResult.pins} /> */}
    </main>
  );
}
