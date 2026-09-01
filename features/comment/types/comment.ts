export interface CommentAuthor {
  id: string;
  username: string | null;
  displayName: string | null;
  image: string | null;
}

export interface CommentData {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  author: CommentAuthor;

  replies: CommentData[];
}