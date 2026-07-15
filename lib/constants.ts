export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/octet-stream", // Temporary for API client testing
] as const;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;