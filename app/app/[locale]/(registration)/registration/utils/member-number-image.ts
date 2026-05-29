type CreateMemberNumberImageBlobParams = {
  label: string;
  note: string;
  title: string;
  userId: number;
};

type SaveMemberNumberImageParams = {
  blob: Blob;
  shareText: string;
  shareTitle: string;
  userId: number;
};

const IMAGE_SIZE = 1080;
const IMAGE_MIME_TYPE = "image/png";

export function createMemberNumberImageBlob({
  label,
  note,
  title,
  userId,
}: CreateMemberNumberImageBlobParams): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;

    if (!context) {
      reject(new Error("Canvas is not available"));
      return;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);

    context.fillStyle = "#111827";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.font = "700 64px system-ui, -apple-system, sans-serif";
    context.fillText(title, IMAGE_SIZE / 2, 180);

    context.font = "700 56px system-ui, -apple-system, sans-serif";
    context.fillText(label, IMAGE_SIZE / 2, 360);

    context.font = "900 180px system-ui, -apple-system, sans-serif";
    context.fillText(String(userId), IMAGE_SIZE / 2, 550);

    context.font = "400 38px system-ui, -apple-system, sans-serif";
    context.fillText(note, IMAGE_SIZE / 2, 760);

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create image"));
        return;
      }

      resolve(blob);
    }, IMAGE_MIME_TYPE);
  });
}

export async function saveMemberNumberImage({
  blob,
  shareText,
  shareTitle,
  userId,
}: SaveMemberNumberImageParams) {
  const file = new File([blob], createMemberNumberImageFileName(userId), {
    type: IMAGE_MIME_TYPE,
  });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        text: shareText,
        title: shareTitle,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      throw error;
    }

    return;
  }

  downloadMemberNumberImage(blob, userId);
}

function downloadMemberNumberImage(blob: Blob, userId: number) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = createMemberNumberImageFileName(userId);
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function createMemberNumberImageFileName(userId: number) {
  return `engineercafe-member-${userId}.png`;
}
