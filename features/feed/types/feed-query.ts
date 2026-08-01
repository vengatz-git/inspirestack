// FeedFilter does not yet exist in this codebase.
// Once defined (e.g. search term, category, author, saved, related, trending),
// import and reference it here instead of `unknown`.
export type FeedFilter = unknown;

export interface FeedQuery {
  limit?: number;
  cursor?: string;
  filter?: FeedFilter;
}