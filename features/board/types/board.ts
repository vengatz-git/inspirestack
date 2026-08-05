export interface BoardSummary {
  id: string;

  name: string;
  description: string | null;

  visibility: "PUBLIC" | "PRIVATE";

  coverImageUrl: string | null;

  pinCount: number;

  /**
   * Indicates whether the currently viewed pin
   * already belongs to this board.
   *
   * Defaults to false until save-state support
   * is implemented.
   */
  isSaved: boolean;

  createdAt: Date;
  updatedAt: Date;
}