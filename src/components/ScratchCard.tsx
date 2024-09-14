import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shineCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 150 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height: width / 2 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const shineCanvas = shineCanvasRef.current;
    const shineCtx = shineCanvas?.getContext("2d");

    if (ctx && shineCtx) {
      const { width, height } = dimensions;

      // Set canvas sizes
      canvas.width = width;
      canvas.height = height;
      shineCanvas.width = width;
      shineCanvas.height = height;

      // Create gold gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#ffd700");
      gradient.addColorStop(0.5, "#ffcc00");
      gradient.addColorStop(1, "#ffd700");

      const drawBackground = () => {
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

      drawBackground();

      // Shine animation
      let shinePosition = 0;
      let isAnimating = false;

      const animateShine = () => {
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
          isAnimating = false;
          setTimeout(startShineAnimation, 5000);
        } else {
          requestAnimationFrame(animateShine);
        }
      };

      const startShineAnimation = () => {
        shinePosition = 0;
        isAnimating = true;
        requestAnimationFrame(animateShine);
      };

      startShineAnimation();
    }
  }, [dimensions]);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      const rect = canvas?.getBoundingClientRect();
      const x = e.clientX - (rect?.left ?? 0);
      const y = e.clientY - (rect?.top ?? 0);

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, dimensions.width / 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <Card
      className="w-full relative overflow-hidden bg-gray-300"
      style={{ aspectRatio: "2 / 1" }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700">
        YOU WON
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={() =>
          canvasRef.current?.addEventListener("mousemove", handleScratch as any)
        }
        onMouseUp={() =>
          canvasRef.current?.removeEventListener(
            "mousemove",
            handleScratch as any
          )
        }
        onMouseLeave={() =>
          canvasRef.current?.removeEventListener(
            "mousemove",
            handleScratch as any
          )
        }
        className="absolute inset-0 w-full h-full cursor-pointer"
      />
      <canvas
        ref={shineCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </Card>
  );
}
