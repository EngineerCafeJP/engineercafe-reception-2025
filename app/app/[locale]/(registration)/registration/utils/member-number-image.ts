type CreateMemberNumberImageBlobParams = {
  label: string;
  userId: number;
};

type DrawMemberNumberChipParams = {
  context: CanvasRenderingContext2D;
  label: string;
  memberNumber: string;
  size: number;
};

const IMAGE_SIZE = 1080;
const IMAGE_MIME_TYPE = "image/png";
const MEMBER_NUMBER_LENGTH = 6;

export function formatMemberNumber(userId: number) {
  return String(userId).padStart(MEMBER_NUMBER_LENGTH, "0");
}

export function createMemberNumberImageBlob({
  label,
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

    drawMemberNumberChip({
      context,
      label,
      memberNumber: formatMemberNumber(userId),
      size: IMAGE_SIZE,
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create image"));
        return;
      }

      resolve(blob);
    }, IMAGE_MIME_TYPE);
  });
}

export function drawMemberNumberChip({
  context,
  label,
  memberNumber,
  size,
}: DrawMemberNumberChipParams) {
  const padding = size * 0.07;
  const points = createOctagonPoints(size, padding);
  const innerPoints = createOctagonPoints(size, padding + size * 0.035);
  const gradient = context.createLinearGradient(0, 0, size, size);

  gradient.addColorStop(0, "#d89136");
  gradient.addColorStop(0.44, "#ad691f");
  gradient.addColorStop(1, "#d99a45");

  context.clearRect(0, 0, size, size);
  context.save();
  drawPath(context, points);
  context.clip();

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  drawWoodGrain(context, size);
  drawMemberNumberLabel(context, size, label);
  drawMemberNumber(context, size, memberNumber);

  context.restore();

  context.save();
  context.lineJoin = "round";
  context.strokeStyle = "#2c1a0d";
  context.lineWidth = size * 0.018;
  drawPath(context, points);
  context.stroke();

  context.globalAlpha = 0.55;
  context.lineWidth = size * 0.008;
  drawPath(context, innerPoints);
  context.stroke();
  context.restore();
}

export function downloadMemberNumberImage(blob: Blob, userId: number) {
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
  return `engineercafe-member-${formatMemberNumber(userId)}.png`;
}

function createOctagonPoints(size: number, padding: number) {
  const side = size - padding * 2;
  const corner = side / (2 + Math.SQRT2);

  return [
    [padding + corner, padding],
    [size - padding - corner, padding],
    [size - padding, padding + corner],
    [size - padding, size - padding - corner],
    [size - padding - corner, size - padding],
    [padding + corner, size - padding],
    [padding, size - padding - corner],
    [padding, padding + corner],
  ] as const;
}

function drawPath(
  context: CanvasRenderingContext2D,
  points: readonly (readonly [number, number])[],
) {
  context.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) {
      context.moveTo(x, y);
      return;
    }

    context.lineTo(x, y);
  });
  context.closePath();
}

function drawWoodGrain(context: CanvasRenderingContext2D, size: number) {
  context.save();
  context.strokeStyle = "rgba(77, 39, 11, 0.3)";
  context.lineWidth = size * 0.009;

  for (let y = size * 0.2; y < size * 0.82; y += size * 0.16) {
    context.beginPath();
    context.moveTo(size * 0.12, y);
    context.lineTo(size * 0.88, y + Math.sin(y / size) * size * 0.018);
    context.stroke();
  }

  context.globalAlpha = 0.34;
  context.lineWidth = size * 0.006;
  context.beginPath();
  context.arc(size * 0.33, size * 0.36, size * 0.1, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(size * 0.33, size * 0.36, size * 0.15, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawMemberNumberLabel(
  context: CanvasRenderingContext2D,
  size: number,
  label: string,
) {
  context.save();
  context.fillStyle = "rgba(45, 26, 12, 0.86)";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `800 ${size * 0.1}px system-ui, -apple-system, sans-serif`;
  context.fillText(label, size / 2, size * 0.4);
  context.restore();
}

function drawMemberNumber(
  context: CanvasRenderingContext2D,
  size: number,
  memberNumber: string,
) {
  context.save();
  context.fillStyle = "#050505";
  context.textAlign = "center";
  context.textBaseline = "middle";
  fitText(context, {
    maxWidth: size * 0.62,
    minSize: size * 0.14,
    size: size * 0.24,
    text: memberNumber,
    weight: 900,
  });
  context.fillText(memberNumber, size / 2, size * 0.6);
  context.restore();
}

function fitText(
  context: CanvasRenderingContext2D,
  {
    maxWidth,
    minSize,
    size,
    text,
    weight,
  }: {
    maxWidth: number;
    minSize: number;
    size: number;
    text: string;
    weight: number;
  },
) {
  let fontSize = size;

  do {
    context.font = `${weight} ${fontSize}px system-ui, -apple-system, sans-serif`;
    fontSize -= 4;
  } while (context.measureText(text).width > maxWidth && fontSize > minSize);
}
