export interface DownloadImageResult {
  success: boolean;
  message: string;
}

export async function downloadImage(
  imageUrl: string,
  fileName: string
): Promise<DownloadImageResult> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch image.");
    }

    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    return {
      success: true,
      message: "Image downloaded successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to download image.",
    };
  }
}