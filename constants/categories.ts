export const CATEGORIES = [
  "Photography",
  "Art",
  "Design",
  "Technology",
  "Programming",
  "Nature",
  "Travel",
  "Food",
  "Fashion",
  "Architecture",
  "Gaming",
  "Movies",
  "Music",
  "Sports",
  "Education",
  "DIY",
  "Business",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];