export interface GetRelatedPinsOptions {
  pinId: string;
  limit?: number;
  excludeAuthorId?: string;
  viewerUserId?: string | null;
}