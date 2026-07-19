export interface CopyLinkResult {
  success: boolean;
  message: string;
}

export async function copyLink(
  url: string
): Promise<CopyLinkResult> {
  try {
    await navigator.clipboard.writeText(url);

    return {
      success: true,
      message: "Link copied successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to copy link.",
    };
  }
}