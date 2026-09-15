export interface Notification {
  id: string;
  type: "COMMENT" | "REPLY" | "SAVE" | "LIKE";
  createdAt: Date;
  readAt: Date | null;
  actorId: string;
  actorUsername: string | null;
  actorDisplayName: string | null;
  actorImage: string | null;
  pinId: string | null;
  pinTitle: string | null;
  pinImageUrl: string | null;
  commentId: string | null;
  commentContent: string | null;
}