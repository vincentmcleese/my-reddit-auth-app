export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // Create gold gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#ffd700");
  gradient.addColorStop(0.5, "#ffcc00");
  gradient.addColorStop(1, "#ffd700");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add shimmering effect
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

export const animateShine = (
  shineCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isAnimating: boolean,
  setIsAnimating: (value: boolean) => void
) => {
  let shinePosition = 0;

  const animate = () => {
    if (!isAnimating) return;

    shineCtx.clearRect(0, 0, width, height);

    // Create shine gradient
    const shineGradient = shineCtx.createLinearGradient(
      shinePosition - width / 6,
      height,
      shinePosition,
      0
    );
    shineGradient.addColorStop(0, "rgba(255,255,255,0)");
    shineGradient.addColorStop(0.5, "rgba(255,255,255,0.8)");
    shineGradient.addColorStop(1, "rgba(255,255,255,0)");

    shineCtx.fillStyle = shineGradient;
    shineCtx.beginPath();
    shineCtx.moveTo(shinePosition - width / 6, height);
    shineCtx.lineTo(shinePosition, 0);
    shineCtx.lineTo(shinePosition + width / 30, 0);
    shineCtx.lineTo(shinePosition - width / 7.5, height);
    shineCtx.closePath();
    shineCtx.fill();

    // Move shine
    shinePosition += width / 100;

    // Reset position when off-screen
    if (shinePosition > width + width / 6) {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 5000);
    } else {
      requestAnimationFrame(animate);
    }
  };

  animate();
};
