export type Profile = {
  id: string;
  username: string;
  displayName: string | null;
  image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  bannerImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};