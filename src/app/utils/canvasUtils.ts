// canvasUtils.ts

export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width;
  canvas.height = height;
};

export const createGoldGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#ffd700");
  gradient.addColorStop(0.5, "#ffcc00");
  gradient.addColorStop(1, "#ffd700");
  return gradient;
};

export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const gradient = createGoldGradient(ctx, width, height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const shimmer = ctx.createLinearGradient(0, 0, width, 0);
  shimmer.addColorStop(0, "rgba(255,255,255,0)");
  shimmer.addColorStop(0.5, "rgba(255,255,255,0.5)");
  shimmer.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${height / 6}px Arial`;
  ctx.fillStyle = "#8b4513";
  ctx.textAlign = "center";
  ctx.fillText("Scratch here!", width / 2, height / 2);
};
