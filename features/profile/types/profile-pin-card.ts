export interface ProfilePinCardData {
  id: string;

  title: string | null;
  description: string | null;

  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  altText: string | null;

  author: {
    id: string;
    username: string | null;
    displayName: string | null;
    image: string | null;
  };

  isOwner: boolean;
  isSaved: boolean;
}