import type { Pin } from "@/db/schema";

import type { ProfilePinCardData } from "../types/profile-pin-card";

type ProfilePinWithAuthor = Pin & {
  author: {
    id: string;
    username: string | null;
    displayName: string | null;
    image: string | null;
  };
};

export function mapProfilePinToCard(
  pin: ProfilePinWithAuthor,
  viewerUserId: string | null,
  isSaved: boolean,
): ProfilePinCardData {
  return {
    id: pin.id,
    title: pin.title,
    description: pin.description,
    imageUrl: pin.imageUrl,
    imageWidth: pin.imageWidth,
    imageHeight: pin.imageHeight,
    altText: pin.title,

    author: {
      id: pin.author.id,
      username: pin.author.username,
      displayName: pin.author.displayName,
      image: pin.author.image,
    },

    isOwner:
      viewerUserId !== null &&
      pin.authorId === viewerUserId,

    isSaved,
  };
}