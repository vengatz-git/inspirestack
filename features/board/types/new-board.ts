export interface NewBoardInput {
  ownerId: string;

  name: string;

  description?: string;

  visibility: "PUBLIC" | "PRIVATE";

  coverPinId?: string | null;
}