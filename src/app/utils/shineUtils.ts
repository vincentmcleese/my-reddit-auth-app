// shineUtils.ts

export const animateShineEffect = (
  shineCtx: CanvasRenderingContext2D,
  shinePosition: number,
  width: number,
  height: number,
  isAnimating: boolean,
  startShineAnimation: () => void
) => {
  // Clear previous shine effect
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

  // Draw the shine effect
  shineCtx.fillStyle = shineGradient;
  shineCtx.beginPath();
  shineCtx.moveTo(shinePosition - width / 6, height);
  shineCtx.lineTo(shinePosition, 0);
  shineCtx.lineTo(shinePosition + width / 30, 0);
  shineCtx.lineTo(shinePosition - width / 7.5, height);
  shineCtx.closePath();
  shineCtx.fill();

  // Move the shine position for the next frame
  shinePosition += width / 100;

  // Reset the shine position when it goes off-screen
  if (shinePosition > width + width / 6) {
    isAnimating = false;
    setTimeout(startShineAnimation, 5000); // Restart shine animation after a delay
  } else {
    requestAnimationFrame(() =>
      animateShineEffect(
        shineCtx,
        shinePosition,
        width,
        height,
        isAnimating,
        startShineAnimation
      )
    );
  }
};
