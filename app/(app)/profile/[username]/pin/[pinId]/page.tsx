import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";

import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { FeedGrid } from "@/features/feed/components/feed-grid";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";
import { getRelatedPinsService } from "@/features/pin/services/get-related-pins";

import { ProfilePinDetails } from "@/features/profile/components/profile-pin-details";

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

  if (
    !pin ||
    pin.author.username !== username
  ) {
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

export default async function ProfilePinPage({
  params,
}: ProfilePinPageProps) {
  const { username, pinId } = await params;

  const pin = await getPinByIdService(pinId);

  if (
    !pin ||
    pin.author.username !== username
  ) {
    notFound();
  }

  const [relatedPins, session] =
    await Promise.all([
      getRelatedPinsService({
        pinId: pin.id,
        limit: 40,
      }),
      auth(),
    ]);

  const boards =
    session?.user?.id
      ? await getBoardsByUserService({
          userId: session.user.id,
          pinId: pin.id,
          includePrivate: true,
        })
      : [];

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6">
      <ProfilePinDetails
        pin={pin}
        boards={boards}
      />

      <section className="mt-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Explore More
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Discover more inspiration from InspireStack.
            </p>
          </div>
        </div>

        <FeedGrid pins={relatedPins} />
      </section>
    </main>
  );
}